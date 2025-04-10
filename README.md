# Go Digital Africa Bulk SMS Platform

This is the Django backend for the Go Digital Africa Bulk SMS Platform, a comprehensive solution for businesses to send SMS messages in bulk to their customers.

## Features

- User management with subscription plans
- Contact management with phonebooks
- SMS campaign creation and scheduling
- Message template management
- Payment processing with M-Pesa integration
- Webhook support for real-time notifications
- Comprehensive API for integration with frontend and third-party services

## Getting Started

### Prerequisites

- Python 3.8+
- PostgreSQL 12+
- Virtual environment (recommended)

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/bulk-sms-reseller.git
cd bulk-sms-reseller
```

2. Create and activate a virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Set up environment variables
Create a `.env` file in the project root and add the following:
```
# Database settings
DB_NAME=bulk_sms_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

# Django settings
SECRET_KEY=your_django_secret_key
DEBUG=True

# JWT settings
JWT_SECRET=your_jwt_secret_key
JWT_ALGORITHM=HS256

# SMS Gateway settings (choose one provider)
# Africa's Talking
AT_API_KEY=your_africastalking_api_key
AT_USERNAME=your_africastalking_username

# Twilio
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_
