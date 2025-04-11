# utils/sms_gateways.py

import requests
import json
import os
from dotenv import load_dotenv
import africastalking
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
import random
import logging

load_dotenv()

# Set up logging
logger = logging.getLogger(__name__)

# Initialize Africa's Talking client
try:
    username = settings.AFRICASTALKING_USERNAME
    api_key = settings.AFRICASTALKING_API_KEY
    africastalking.initialize(username, api_key)
    sms = africastalking.SMS
except Exception as e:
    logger.error(f"Failed to initialize Africa's Talking: {str(e)}")

def generate_otp():
    """Generate a 6-digit OTP"""
    return str(random.randint(100000, 999999))

def send_otp_sms(phone_number, otp):
    """Send OTP via SMS using Africa's Talking"""
    try:
        # Ensure phone_number is formatted with country code
        message = f"Your verification code is: {otp}"
        sender_id = getattr(settings, 'AFRICASTALKING_SENDER_ID', None)
        
        # Send the message
        kwargs = {"message": message, "recipients": [str(phone_number)]}
        if sender_id:
            kwargs["sender_id"] = sender_id
            
        response = sms.send(**kwargs)
        
        # Process the response
        if response and len(response['SMSMessageData']['Recipients']) > 0:
            recipient = response['SMSMessageData']['Recipients'][0]
            if recipient['status'] == 'Success':
                logger.info(f"SMS sent successfully to {phone_number}, messageId: {recipient['messageId']}")
                return True, recipient['messageId']
            else:
                logger.error(f"Failed to send SMS to {phone_number}: {recipient['status']}")
                return False, recipient['status']
        else:
            logger.error(f"No recipients in Africa's Talking response")
            return False, "Failed to send SMS"
    except Exception as e:
        logger.error(f"Error sending SMS via Africa's Talking: {str(e)}")
        return False, str(e)

def is_otp_valid(user):
    """Check if OTP is still valid (within expiration time)"""
    if not user.otp or not user.otp_created_at:
        return False
    
    expiration_time = user.otp_created_at + timedelta(minutes=10)  # OTP valid for 10 minutes
    return timezone.now() <= expiration_time


class SMSGatewayInterface:
    """Base interface for SMS gateways"""
    def send_sms(self, to, message, sender=None):
        """Send an SMS message"""
        raise NotImplementedError("Subclasses must implement this method")
    
    def check_delivery_status(self, message_id):
        """Check the delivery status of a message"""
        raise NotImplementedError("Subclasses must implement this method")


class AfricasTalkingGateway(SMSGatewayInterface):
    """Integration with Africa's Talking SMS Gateway"""
    def __init__(self):
        self.api_key = os.getenv('AT_API_KEY')
        self.username = os.getenv('AT_USERNAME')
        self.api_url = "https://api.africastalking.com/version1/messaging"
        
    def send_sms(self, to, message, sender=None):
        """Send an SMS message via Africa's Talking"""
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'ApiKey': self.api_key
        }
        
        data = {
            'username': self.username,
            'message': message,
            'to': to
        }
        
        if sender:
            data['from'] = sender
            
        response = requests.post(self.api_url, headers=headers, data=data)
        
        return response.json()
    
    def check_delivery_status(self, message_id):
        """Check the delivery status of a message via Africa's Talking"""
        # Implementation varies based on Africa's Talking API for delivery reports
        pass


class TwilioGateway(SMSGatewayInterface):
    """Integration with Twilio SMS Gateway"""
    def __init__(self):
        self.account_sid = os.getenv('TWILIO_ACCOUNT_SID')
        self.auth_token = os.getenv('TWILIO_AUTH_TOKEN')
        self.api_url = f"https://api.twilio.com/2010-04-01/Accounts/{self.account_sid}/Messages.json"
        
    def send_sms(self, to, message, sender=None):
        """Send an SMS message via Twilio"""
        if not sender:
            sender = os.getenv('TWILIO_PHONE_NUMBER')
            
        auth = (self.account_sid, self.auth_token)
        data = {
            'To': to,
            'From': sender,
            'Body': message
        }
        
        response = requests.post(self.api_url, auth=auth, data=data)
        
        return response.json()
    
    def check_delivery_status(self, message_id):
        """Check the delivery status of a message via Twilio"""
        url = f"{self.api_url.replace('.json', '')}/{message_id}.json"
        auth = (self.account_sid, self.auth_token)
        
        response = requests.get(url, auth=auth)
        
        return response.json()


class SMSGatewayFactory:
    """Factory to create SMS gateway instances"""
    @staticmethod
    def get_gateway(provider_name):
        """Get an instance of the specified SMS gateway"""
        if provider_name.lower() == 'africastalking':
            return AfricasTalkingGateway()
        elif provider_name.lower() == 'twilio':
            return TwilioGateway()
        else:
            raise ValueError(f"Unsupported SMS gateway provider: {provider_name}")