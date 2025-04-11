# sms_api/admin.py

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import (
    User, PhoneBook, Contact, SMSCampaign, 
    SMSMessage, Payment, SMSTemplate, WebhookEndpoint
)

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'company_name', 'tokens_balance', 'is_staff')
    fieldsets = BaseUserAdmin.fieldsets + (
        ('SMS Platform Info', {'fields': ('phone_number', 'company_name', 'tokens_balance', 'metadata')}),
    )


@admin.register(PhoneBook)
class PhoneBookAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'created_at')
    search_fields = ('name', 'user__username')


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('phone_number', 'phonebook', 'created_at')
    search_fields = ('phone_number', 'phonebook__name', 'phonebook__user__username')


@admin.register(SMSCampaign)
class SMSCampaignAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'status', 'created_at')
    list_filter = ('status',)
    search_fields = ('name', 'user__username', 'message')


@admin.register(SMSMessage)
class SMSMessageAdmin(admin.ModelAdmin):
    list_display = ('recipient', 'user', 'status', 'created_at')
    list_filter = ('status',)
    search_fields = ('recipient', 'content', 'user__username')


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'status', 'payment_date', 'created_at')
    list_filter = ('status',)
    search_fields = ('user__username',)


@admin.register(SMSTemplate)
class SMSTemplateAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'created_at')
    search_fields = ('name', 'content', 'user__username')


@admin.register(WebhookEndpoint)
class WebhookEndpointAdmin(admin.ModelAdmin):
    list_display = ('url', 'user', 'is_active', 'created_at')
    list_filter = ('is_active',)
    search_fields = ('url', 'user__username')