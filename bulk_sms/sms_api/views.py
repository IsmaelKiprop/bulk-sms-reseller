# sms_api/views.py

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.utils.decorators import method_decorator
from django.views.decorators.debug import sensitive_post_parameters
from utils.sms_gateways import generate_otp, send_otp_sms
import logging
from .serializers import (
    CustomTokenObtainPairSerializer, RegistrationSerializer, UserSerializer,
    ChangePasswordSerializer, ResetPasswordRequestSerializer, ResetPasswordConfirmSerializer,
    UserProfileUpdateSerializer, PhoneVerificationRequestSerializer, PhoneVerificationConfirmSerializer, 
    PhoneBookSerializer, ContactSerializer, SMSCampaignSerializer, PaymentSerializer, SMSTemplateSerializer,
    WebhookEndpointSerializer, SMSMessageSerializer
)
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

User = get_user_model()
logger = logging.getLogger(__name__)

class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Takes a set of user credentials and returns an access and refresh JSON web
    token pair to prove the authentication of those credentials.
    """
    serializer_class = CustomTokenObtainPairSerializer

class RegisterView(APIView):
    """
    API endpoint that allows users to register.
    """
    permission_classes = [AllowAny]
    
    @method_decorator(sensitive_post_parameters('password'))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    
    @swagger_auto_schema(
        operation_description="Register a new user account",
        request_body=RegistrationSerializer,
        responses={
            201: openapi.Response(
                description="User registered successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                        'user_id': openapi.Schema(type=openapi.TYPE_STRING),
                        'phone_number': openapi.Schema(type=openapi.TYPE_STRING),
                        'otp_sent': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                    }
                )
            ),
            400: "Bad request"
        }
    )
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Generate OTP for verification
            otp = generate_otp()
            user.otp = otp
            user.otp_created_at = timezone.now()
            user.save()
            
            # Send OTP via SMS
            success, message = send_otp_sms(user.phone_number, otp)
            
            if not success:
                logger.error(f"Failed to send OTP to {user.phone_number}: {message}")
            
            return Response({
                'message': 'User registered successfully. Please verify your phone number with the OTP sent.',
                'user_id': str(user.id),
                'phone_number': str(user.phone_number),
                'otp_sent': success
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PhoneVerificationRequestView(APIView):
    """
    API endpoint for requesting phone verification OTP.
    """
    permission_classes = [AllowAny]
    
    @swagger_auto_schema(
        operation_description="Request OTP for phone verification",
        request_body=PhoneVerificationRequestSerializer,
        responses={
            200: openapi.Response(
                description="OTP sent successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                        'otp_sent': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                    }
                )
            ),
            404: "User not found",
            400: "Bad request"
        }
    )
    def post(self, request):
        serializer = PhoneVerificationRequestSerializer(data=request.data)
        if serializer.is_valid():
            phone_number = serializer.validated_data['phone_number']
            
            try:
                user = User.objects.get(phone_number=phone_number)
                
                # Generate new OTP
                otp = generate_otp()
                user.otp = otp
                user.otp_created_at = timezone.now()
                user.save()
                
                # Send OTP via SMS
                success, message = send_otp_sms(phone_number, otp)
                
                if not success:
                    logger.error(f"Failed to send OTP to {phone_number}: {message}")
                
                return Response({
                    'message': 'OTP sent successfully.',
                    'otp_sent': success
                }, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({
                    'message': 'User with this phone number does not exist.'
                }, status=status.HTTP_404_NOT_FOUND)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PhoneVerificationConfirmView(APIView):
    """
    API endpoint for confirming phone verification with OTP.
    """
    permission_classes = [AllowAny]
    
    @swagger_auto_schema(
        operation_description="Confirm phone verification with OTP",
        request_body=PhoneVerificationConfirmSerializer,
        responses={
            200: openapi.Response(
                description="Phone number verified successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
            400: "Invalid OTP or Bad request"
        }
    )
    def post(self, request):
        serializer = PhoneVerificationConfirmSerializer(data=request.data)
        if serializer.is_valid():
            phone_number = serializer.validated_data['phone_number']
            
            user = User.objects.get(phone_number=phone_number)
            user.phone_verified = True
            user.otp = None  # Clear the OTP
            user.otp_created_at = None
            user.save()
            
            return Response({
                'message': 'Phone number verified successfully.'
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView(UpdateAPIView):
    """
    API endpoint for changing user password.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer
    
    @method_decorator(sensitive_post_parameters('old_password', 'new_password', 'confirm_password'))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    
    def get_object(self):
        return self.request.user
    
    @swagger_auto_schema(
        operation_description="Change user password",
        request_body=ChangePasswordSerializer,
        responses={
            200: openapi.Response(
                description="Password updated successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
            400: "Wrong password or Bad request"
        }
    )
    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            # Check old password
            if not user.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            
            # Set new password
            user.set_password(serializer.data.get("new_password"))
            user.save()
            return Response({
                'message': 'Password updated successfully'
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordRequestView(APIView):
    """
    API endpoint for requesting a password reset.
    """
    permission_classes = [AllowAny]
    
    @swagger_auto_schema(
        operation_description="Request password reset OTP",
        request_body=ResetPasswordRequestSerializer,
        responses={
            200: openapi.Response(
                description="OTP for password reset sent",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                        'otp_sent': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                    }
                )
            ),
            400: "Bad request"
        }
    )
    def post(self, request):
        serializer = ResetPasswordRequestSerializer(data=request.data)
        if serializer.is_valid():
            phone_number = serializer.validated_data['phone_number']
            
            try:
                user = User.objects.get(phone_number=phone_number)
                
                # Generate OTP for password reset
                otp = generate_otp()
                user.otp = otp
                user.otp_created_at = timezone.now()
                user.save()
                
                # Send OTP via SMS
                success, message = send_otp_sms(phone_number, otp)
                
                if not success:
                    logger.error(f"Failed to send password reset OTP to {phone_number}: {message}")
                
                return Response({
                    'message': 'OTP for password reset sent successfully.',
                    'otp_sent': success
                }, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                # For security, don't reveal if user exists or not
                return Response({
                    'message': 'If a user with this phone number exists, an OTP has been sent.'
                }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordConfirmView(APIView):
    """
    API endpoint for confirming password reset with OTP.
    """
    permission_classes = [AllowAny]
    
    @method_decorator(sensitive_post_parameters('new_password', 'confirm_password'))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    
    @swagger_auto_schema(
        operation_description="Confirm password reset with OTP",
        request_body=ResetPasswordConfirmSerializer,
        responses={
            200: openapi.Response(
                description="Password reset successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
            400: "Invalid OTP or Bad request"
        }
    )
    def post(self, request):
        serializer = ResetPasswordConfirmSerializer(data=request.data)
        if serializer.is_valid():
            phone_number = serializer.validated_data['phone_number']
            new_password = serializer.validated_data['new_password']
            
            user = User.objects.get(phone_number=phone_number)
            user.set_password(new_password)
            user.otp = None  # Clear the OTP
            user.otp_created_at = None
            user.save()
            
            return Response({
                'message': 'Password has been reset successfully.'
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(APIView):
    """
    API endpoint for retrieving and updating user profile.
    """
    permission_classes = [IsAuthenticated]
    
    @swagger_auto_schema(
        operation_description="Get user profile information",
        responses={
            200: UserSerializer
        }
    )
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
    @swagger_auto_schema(
        operation_description="Update user profile information",
        request_body=UserProfileUpdateSerializer,
        responses={
            200: UserSerializer,
            400: "Bad request"
        }
    )
    def put(self, request):
        serializer = UserProfileUpdateSerializer(request.user, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited by admins.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

    @swagger_auto_schema(
        operation_description="Get current user information",
        responses={
            200: UserSerializer
        }
    )
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        """
        Return the authenticated user's details
        """
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


class PhoneBookViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows phone books to be viewed or edited.
    """
    serializer_class = PhoneBookSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        This view returns phone books for the currently authenticated user.
        """
        return PhoneBook.objects.filter(user=self.request.user)

    @swagger_auto_schema(
        operation_description="List all phonebooks belonging to the authenticated user"
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Create a new phonebook"
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Retrieve a specific phonebook by ID"
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Update a specific phonebook"
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Delete a specific phonebook"
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class ContactViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows contacts to be viewed or edited.
    """
    serializer_class = ContactSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        This view returns contacts in phonebooks owned by the currently authenticated user.
        """
        return Contact.objects.filter(phonebook__user=self.request.user)

    @swagger_auto_schema(
        operation_description="List all contacts in user's phonebooks"
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Create a new contact in one of user's phonebooks"
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Retrieve a specific contact by ID"
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Update a specific contact"
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Delete a specific contact"
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class SMSCampaignViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows SMS campaigns to be viewed or edited.
    """
    serializer_class = SMSCampaignSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        This view returns campaigns for the currently authenticated user.
        """
        return SMSCampaign.objects.filter(user=self.request.user)

    @swagger_auto_schema(
        operation_description="List all SMS campaigns belonging to the authenticated user"
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Create a new SMS campaign"
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Send an SMS campaign",
        responses={
            200: openapi.Response(
                description="Campaign sending initiated",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'status': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
            400: "Campaign not in draft status"
        }
    )
    @action(detail=True, methods=['post'])
    def send(self, request, pk=None):
        """
        Initiate sending of a draft campaign
        """
        campaign = self.get_object()
        if campaign.status != 'draft':
            return Response(
                {"error": "Only draft campaigns can be sent"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Here you would implement the logic to send the campaign
        # This is a placeholder for now
        campaign.status = 'sending'
        campaign.save()
        
        return Response({"status": "Campaign sending initiated"})


class SMSMessageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows SMS messages to be viewed or edited.
    """
    serializer_class = SMSMessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        This view returns messages for the currently authenticated user.
        """
        return SMSMessage.objects.filter(user=self.request.user)

    @swagger_auto_schema(
        operation_description="Send a quick SMS message",
        request_body=SMSMessageSerializer,
        responses={
            201: SMSMessageSerializer,
            400: "Bad request"
        }
    )
    @action(detail=False, methods=['post'])
    def quick_send(self, request):
        """
        Send a single SMS message without creating a campaign
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Here you would implement the logic to send the message
        # This is a placeholder
        message = serializer.instance
        message.status = 'sending'
        message.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PaymentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows payments to be viewed or edited.
    """
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        This view returns payments for the currently authenticated user.
        """
        return Payment.objects.filter(user=self.request.user)

    @swagger_auto_schema(
        operation_description="List all payments made by the authenticated user"
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Create a new payment record"
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)


class SMSTemplateViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows SMS templates to be viewed or edited.
    """
    serializer_class = SMSTemplateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        This view returns templates for the currently authenticated user.
        """
        return SMSTemplate.objects.filter(user=self.request.user)

    @swagger_auto_schema(
        operation_description="List all SMS templates belonging to the authenticated user"
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Create a new SMS template"
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)


class WebhookEndpointViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows webhook endpoints to be viewed or edited.
    """
    serializer_class = WebhookEndpointSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        This view returns webhook endpoints for the currently authenticated user.
        """
        return WebhookEndpoint.objects.filter(user=self.request.user)

    @swagger_auto_schema(
        operation_description="List all webhook endpoints configured by the authenticated user"
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Create a new webhook endpoint"
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)