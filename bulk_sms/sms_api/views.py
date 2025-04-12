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
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import RetrieveUpdateAPIView
# from utils.sms_gateways import generate_otp, send_otp_sms
import logging
from .serializers import (
    CustomTokenObtainPairSerializer, RegistrationSerializer, EmailVerificationRequestSerializer, 
    EmailVerificationConfirmSerializer, UserSerializer,
    ChangePasswordSerializer, ResetPasswordRequestSerializer, ResetPasswordConfirmSerializer,
    UserProfileUpdateSerializer, PhoneBookSerializer, ContactSerializer, 
    SMSCampaignSerializer, PaymentSerializer, SMSTemplateSerializer,
    WebhookEndpointSerializer, SMSMessageSerializer, LoginSerializer
)
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

User = get_user_model()
logger = logging.getLogger(__name__)


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Takes a set of user credentials (company_name, password) and returns an access and refresh JWT pair
    with additional user details.
    """
    serializer_class = CustomTokenObtainPairSerializer
    
    @swagger_auto_schema(
        operation_description="Obtain JWT token pair with company name and password",
        responses={
            200: openapi.Response(
                description="JWT token pair with user details",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'access': openapi.Schema(type=openapi.TYPE_STRING),
                        'refresh': openapi.Schema(type=openapi.TYPE_STRING),
                        'user_id': openapi.Schema(type=openapi.TYPE_STRING),
                        'company_name': openapi.Schema(type=openapi.TYPE_STRING),
                        'phone_number': openapi.Schema(type=openapi.TYPE_STRING),
                        'email': openapi.Schema(type=openapi.TYPE_STRING),
                        'tokens_balance': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'is_staff': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'is_phone_verified': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                    }
                )
            ),
            401: "Invalid credentials"
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


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
                        'email': openapi.Schema(type=openapi.TYPE_STRING),
                        'phone_number': openapi.Schema(type=openapi.TYPE_STRING),
                        'verification_email_sent': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                    }
                )
            ),
            400: "Bad request"
        }
    )
    def post(self, request):
        # Pre-process phone number if provided
        if 'phone_number' in request.data:
            is_valid, formatted_number, error = validate_african_phone(request.data['phone_number'])
            if not is_valid:
                return Response({'phone_number': [error]}, status=status.HTTP_400_BAD_REQUEST)
            
            # Update the request data with formatted number
            request.data['phone_number'] = formatted_number
        
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Generate verification token
            token = generate_verification_token()
            user.verification_token = token
            user.token_created_at = timezone.now()
            user.token_expiration = timezone.now() + timedelta(hours=24)
            user.save()
            
            # Send verification email
            success, message = send_verification_email(user, token)
            
            if not success:
                logger.error(f"Failed to send verification email to {user.email}: {message}")
            
            return Response({
                'message': 'User registered successfully. Please check your email for verification instructions.',
                'user_id': str(user.id),
                'email': user.email,
                'phone_number': user.phone_number,
                'verification_email_sent': success
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmailVerificationRequestView(APIView):
    """
    API endpoint for requesting email verification.
    """
    permission_classes = [AllowAny]
    
    @swagger_auto_schema(
        operation_description="Request email verification token",
        request_body=EmailVerificationRequestSerializer,
        responses={
            200: openapi.Response(
                description="Verification email sent successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                        'verification_email_sent': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                    }
                )
            ),
            404: "User not found",
            400: "Bad request"
        }
    )
    def post(self, request):
        serializer = EmailVerificationRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            
            try:
                user = User.objects.get(email=email)
                
                # If already verified, no need to send another email
                if user.email_verified:
                    return Response({
                        'message': 'Your email is already verified.',
                        'verification_email_sent': False
                    }, status=status.HTTP_200_OK)
                
                # Generate new verification token
                token = generate_verification_token()
                user.verification_token = token
                user.token_created_at = timezone.now()
                user.token_expiration = timezone.now() + timedelta(hours=24)
                user.save()
                
                # Send verification email
                success, message = send_verification_email(user, token)
                
                if not success:
                    logger.error(f"Failed to send verification email to {email}: {message}")
                
                return Response({
                    'message': 'Verification email sent successfully.',
                    'verification_email_sent': success
                }, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({
                    'message': 'User with this email does not exist.'
                }, status=status.HTTP_404_NOT_FOUND)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmailVerificationConfirmView(APIView):
    """
    API endpoint for confirming email verification with token.
    """
    permission_classes = [AllowAny]
    
    @swagger_auto_schema(
        operation_description="Confirm email verification with token",
        request_body=EmailVerificationConfirmSerializer,
        responses={
            200: openapi.Response(
                description="Email verified successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                        'email': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
            400: "Invalid token or Bad request"
        }
    )
    def post(self, request):
        serializer = EmailVerificationConfirmSerializer(data=request.data)
        if serializer.is_valid():
            token = serializer.validated_data['token']
            
            try:
                user = User.objects.get(verification_token=token)
                
                # Mark email as verified
                user.email_verified = True
                user.verification_token = None  # Clear the token
                user.token_created_at = None
                user.token_expiration = None
                user.save()
                
                return Response({
                    'message': 'Email verified successfully.',
                    'email': user.email
                }, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({
                    'message': 'Invalid verification token.'
                }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """
    API endpoint for user login with company name and password.
    """
    permission_classes = [AllowAny]
    
    @swagger_auto_schema(
        operation_description="Login with company name and password",
        request_body=LoginSerializer,
        responses={
            200: openapi.Response(
                description="Login successful with JWT tokens",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'refresh': openapi.Schema(type=openapi.TYPE_STRING),
                        'access': openapi.Schema(type=openapi.TYPE_STRING),
                        'user_id': openapi.Schema(type=openapi.TYPE_STRING),
                        'company_name': openapi.Schema(type=openapi.TYPE_STRING),
                        'email': openapi.Schema(type=openapi.TYPE_STRING),
                        'phone_number': openapi.Schema(type=openapi.TYPE_STRING),
                        'tokens_balance': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'is_email_verified': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                    }
                )
            ),
            400: "Bad request",
            401: "Invalid credentials"
        }
    )
    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            user = serializer.validated_data['user']
            
            # Get tokens for the user
            refresh = RefreshToken.for_user(user)
            
            # Update last login
            user.last_login = timezone.now()
            user.save(update_fields=['last_login'])
            
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user_id': str(user.id),
                'company_name': user.company_name,
                'email': user.email,
                'phone_number': user.phone_number,
                'tokens_balance': user.tokens_balance,
                'is_email_verified': user.email_verified,
            })
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    """
    API endpoint for user logout - blacklists the refresh token.
    """
    permission_classes = [IsAuthenticated]
    
    @swagger_auto_schema(
        operation_description="Logout a user by blacklisting their refresh token",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'refresh': openapi.Schema(type=openapi.TYPE_STRING, description='Refresh token'),
            },
            required=['refresh']
        ),
        responses={
            200: openapi.Response(
                description="Logout successful",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
            400: "Bad request"
        }
    )
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if not refresh_token:
                return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)
                
            token = RefreshToken(refresh_token)
            token.blacklist()
            
            return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


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
        operation_description="Request password reset token",
        request_body=ResetPasswordRequestSerializer,
        responses={
            200: openapi.Response(
                description="Password reset email sent",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
            400: "Bad request"
        }
    )
    def post(self, request):
        serializer = ResetPasswordRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            
            try:
                user = User.objects.get(email=email)
                
                # Check if email is verified
                if not user.email_verified:
                    return Response({
                        'message': 'Please verify your email before requesting a password reset.'
                    }, status=status.HTTP_400_BAD_REQUEST)
                
                # Generate reset token
                token = generate_verification_token()
                user.verification_token = token
                user.token_created_at = timezone.now()
                user.token_expiration = timezone.now() + timedelta(hours=24)
                user.save()
                
                # Send password reset email
                success, message = send_password_reset_email(user, token)
                
                if not success:
                    logger.error(f"Failed to send password reset email to {email}: {message}")
                
                # For security, don't reveal if the email was sent successfully
                return Response({
                    'message': 'If an account with this email exists, a password reset link has been sent.'
                }, status=status.HTTP_200_OK)
            
            except User.DoesNotExist:
                # For security, don't reveal if user exists or not
                return Response({
                    'message': 'If an account with this email exists, a password reset link has been sent.'
                }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordConfirmView(APIView):
    """
    API endpoint for confirming password reset with token.
    """
    permission_classes = [AllowAny]
    
    @method_decorator(sensitive_post_parameters('new_password', 'confirm_password'))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    
    @swagger_auto_schema(
        operation_description="Confirm password reset with token",
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
            400: "Invalid token or Bad request"
        }
    )
    def post(self, request):
        serializer = ResetPasswordConfirmSerializer(data=request.data)
        if serializer.is_valid():
            token = serializer.validated_data['token']
            new_password = serializer.validated_data['new_password']
            
            try:
                user = User.objects.get(verification_token=token)
                
                # Check if token is expired
                if not is_token_valid(user):
                    return Response({
                        'message': 'Password reset token has expired. Please request a new one.'
                    }, status=status.HTTP_400_BAD_REQUEST)
                
                # Set new password
                user.set_password(new_password)
                
                # Clear the token
                user.verification_token = None
                user.token_created_at = None
                user.token_expiration = None
                user.save()
                
                return Response({
                    'message': 'Password has been reset successfully.'
                }, status=status.HTTP_200_OK)
                
            except User.DoesNotExist:
                return Response({
                    'message': 'Invalid password reset token.'
                }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(RetrieveUpdateAPIView):
    """
    API endpoint for retrieving and updating user profile.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileUpdateSerializer
    
    def get_object(self):
        return self.request.user
    
    @swagger_auto_schema(
        operation_description="Get user profile",
        responses={
            200: UserProfileUpdateSerializer,
        }
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    
    @swagger_auto_schema(
        operation_description="Update user profile",
        request_body=UserProfileUpdateSerializer,
        responses={
            200: openapi.Response(
                description="Profile updated successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                        'email_changed': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'profile': UserProfileUpdateSerializer,
                    }
                )
            ),
            400: "Bad request"
        }
    )
    def update(self, request, *args, **kwargs):
        # Store current email to check if it changes
        current_email = request.user.email
        
        # Process the update
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        # Check if email was changed
        email_changed = current_email != instance.email
        
        if email_changed:
            return Response({
                'message': 'Profile updated successfully. Please verify your new email address.',
                'email_changed': True,
                'profile': serializer.data
            })
        else:
            return Response({
                'message': 'Profile updated successfully.',
                'email_changed': False,
                'profile': serializer.data
            })


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