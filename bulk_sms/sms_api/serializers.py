# sms_api/serializers.py

from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from phonenumber_field.serializerfields import PhoneNumberField
from django.contrib.auth import authenticate
from django.utils import timezone
from django.core.exceptions import ValidationError
from utils.sms_gateways import is_otp_valid
from .models import (
    User, PhoneBook, Contact, SMSCampaign,
    SMSMessage, Payment, SMSTemplate, WebhookEndpoint
)


User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom JWT serializer that adds user details to the token response.
    """
    username_field = 'company_name'

    def validate(self, attrs):
        # The default result (access/refresh tokens)
        data = super().validate(attrs)
        
        # Add extra responses
        user = self.user
        data['user_id'] = str(user.id)
        data['company_name'] = user.company_name
        data['phone_number'] = user.phone_number
        data['email'] = user.email
        data['is_staff'] = user.is_staff
        data['is_phone_verified'] = user.phone_verified
        
        return data


class LoginSerializer(serializers.Serializer):
    """
    Serializer for user login with company name and password.
    """
    company_name = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True, style={'input_type': 'password'})

    def validate(self, attrs):
        company_name = attrs.get('company_name')
        password = attrs.get('password')

        if company_name and password:
            user = authenticate(request=self.context.get('request'),
                                company_name=company_name, password=password)

            if not user:
                msg = 'Unable to log in with provided credentials.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Must include "company_name" and "password".'
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs

    

class UserSerializer(serializers.ModelSerializer):
    phone_number = PhoneNumberField()
    
    class Meta:
        model = User
        fields = ['id', 'phone_number', 'company_name', 'tokens_balance', 'phone_verified', 'metadata', 'date_joined']
        read_only_fields = ['id', 'tokens_balance', 'phone_verified', 'date_joined']


class RegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration with validation for phone number, company name, 
    password, and optional metadata.
    """
    phone_number = PhoneNumberField(required=True)
    company_name = serializers.CharField(required=True, max_length=255)
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        style={'input_type': 'password'},
        validators=[validate_password]
    )
    metadata = serializers.JSONField(required=False, default=dict)
    
    class Meta:
        model = User
        fields = ['phone_number', 'password', 'company_name', 'email', 'metadata']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': False},
        }
    
    def validate_phone_number(self, value):
        """
        Validate that the phone number is not already registered.
        """
        if User.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError("This phone number is already registered.")
        return value
    
    def validate_company_name(self, value):
        """
        Validate that the company name is not already registered.
        """
        if User.objects.filter(company_name=value).exists():
            raise serializers.ValidationError("This company name is already registered.")
        return value
    
    def validate_metadata(self, value):
        """
        Validate the metadata structure if provided.
        """
        if not isinstance(value, dict):
            raise serializers.ValidationError("Metadata must be a JSON object.")
        
        # Add basic validation for expected metadata structure if needed
        return value
    
    def create(self, validated_data):
        """
        Create a new user with the validated data, including proper metadata initialization.
        """
        # Remove password from validated data to handle it separately
        password = validated_data.pop('password')
        
        # Extract metadata or use default
        metadata = validated_data.pop('metadata', {})
        
        # Create base metadata structure
        default_metadata = {
            "preferences": {
                "timezone": "Africa/Nairobi",
                "notifications": {
                    "low_balance": 0,
                    "delivery_reports": False
                }
            }
        }
        
        # Merge provided metadata with defaults (preserving user values where provided)
        merged_metadata = default_metadata.copy()
        for key, value in metadata.items():
            if key in merged_metadata and isinstance(merged_metadata[key], dict) and isinstance(value, dict):
                merged_metadata[key].update(value)
            else:
                merged_metadata[key] = value
        
        # Create user without saving to DB yet
        user = User(**validated_data)
        user.set_password(password)
        user.is_active = True
        user.phone_verified = False
        user.metadata = merged_metadata
        
        # Save the user to the database
        user.save()
        
        return user
        

class PhoneVerificationRequestSerializer(serializers.Serializer):
    phone_number = PhoneNumberField(required=True)

class PhoneVerificationConfirmSerializer(serializers.Serializer):
    phone_number = PhoneNumberField(required=True)
    otp = serializers.CharField(required=True, min_length=6, max_length=6)
    
    def validate(self, attrs):
        phone_number = attrs.get('phone_number')
        otp = attrs.get('otp')
        
        try:
            user = User.objects.get(phone_number=phone_number)
        except User.DoesNotExist:
            raise serializers.ValidationError({"phone_number": "User with this phone number does not exist."})
        
        if not user.otp or user.otp != otp:
            raise serializers.ValidationError({"otp": "Invalid OTP."})
        
        if not is_otp_valid(user):
            raise serializers.ValidationError({"otp": "OTP has expired. Please request a new one."})
        
        return attrs

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])
    confirm_password = serializers.CharField(required=True)
    
    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"new_password": "Password fields didn't match."})
        return attrs

class ResetPasswordRequestSerializer(serializers.Serializer):
    phone_number = PhoneNumberField(required=True)

class ResetPasswordConfirmSerializer(serializers.Serializer):
    phone_number = PhoneNumberField(required=True)
    otp = serializers.CharField(required=True, min_length=6, max_length=6)
    new_password = serializers.CharField(required=True, validators=[validate_password])
    confirm_password = serializers.CharField(required=True)
    
    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"new_password": "Password fields didn't match."})
        
        phone_number = attrs.get('phone_number')
        otp = attrs.get('otp')
        
        try:
            user = User.objects.get(phone_number=phone_number)
        except User.DoesNotExist:
            raise serializers.ValidationError({"phone_number": "User with this phone number does not exist."})
        
        if not user.otp or user.otp != otp:
            raise serializers.ValidationError({"otp": "Invalid OTP."})
        
        if not is_otp_valid(user):
            raise serializers.ValidationError({"otp": "OTP has expired. Please request a new one."})
        
        return attrs

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    phone_number = PhoneNumberField(required=True)
    
    class Meta:
        model = User
        fields = ['phone_number', 'company_name']
    
    def validate_phone_number(self, value):
        user = self.context['request'].user
        if User.objects.exclude(pk=user.pk).filter(phone_number=value).exists():
            raise serializers.ValidationError("This phone number is already in use.")
        return value


class PhoneBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhoneBook
        fields = ('id', 'name', 'metadata', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('id', 'phonebook', 'phone_number', 'metadata', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def validate_phonebook(self, value):
        if value.user != self.context['request'].user:
            raise serializers.ValidationError("You don't have permission to add contacts to this phonebook.")
        return value


class SMSCampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = SMSCampaign
        fields = ('id', 'name', 'message', 'sender_id', 'status', 'metadata', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class SMSMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SMSMessage
        fields = ('id', 'campaign', 'recipient', 'content', 'status', 'metadata', 'created_at', 'updated_at')
        read_only_fields = ('id', 'status', 'created_at', 'updated_at')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('id', 'amount', 'status', 'payment_date', 'metadata', 'created_at', 'updated_at')
        read_only_fields = ('id', 'status', 'payment_date', 'created_at', 'updated_at')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class SMSTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SMSTemplate
        fields = ('id', 'name', 'content', 'metadata', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class WebhookEndpointSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebhookEndpoint
        fields = ('id', 'url', 'is_active', 'metadata', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)