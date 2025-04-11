# sms_api/urls.py
from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, PhoneBookViewSet, ContactViewSet, SMSCampaignViewSet,
    SMSMessageViewSet, PaymentViewSet, SMSTemplateViewSet, WebhookEndpointViewSet, CustomTokenObtainPairView, RegisterView, PhoneVerificationRequestView, PhoneVerificationConfirmView,
    ChangePasswordView, ResetPasswordRequestView, ResetPasswordConfirmView, UserProfileView
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'phonebooks', PhoneBookViewSet, basename='phonebook')
router.register(r'contacts', ContactViewSet, basename='contact')
router.register(r'campaigns', SMSCampaignViewSet, basename='campaign')
router.register(r'messages', SMSMessageViewSet, basename='message')
router.register(r'payments', PaymentViewSet, basename='payment')
router.register(r'templates', SMSTemplateViewSet, basename='template')
router.register(r'webhooks', WebhookEndpointViewSet, basename='webhook')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('verify-phone/request/', PhoneVerificationRequestView.as_view(), name='verify_phone_request'),
    path('verify-phone/confirm/', PhoneVerificationConfirmView.as_view(), name='verify_phone_confirm'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('reset-password/request/', ResetPasswordRequestView.as_view(), name='reset_password_request'),
    path('reset-password/confirm/', ResetPasswordConfirmView.as_view(), name='reset_password_confirm'),
    path('profile/', UserProfileView.as_view(), name='profile'),
]