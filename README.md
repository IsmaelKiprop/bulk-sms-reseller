# Bulk SMS Reseller System

## Overview
The **Bulk SMS Reseller System** is a web-based platform that allows businesses to send SMS messages to their customers efficiently. It supports bulk messaging, scheduling, and API integration for automation. The system is built using **Laravel** (PHP) for the backend and **React.js** for the frontend.

## Features
✅ User Registration & Login  
✅ Buy SMS credits online  
✅ Send bulk SMS to multiple contacts  
✅ Schedule SMS for future delivery  
✅ SMS delivery reports & analytics  
✅ API access for SMS automation  
✅ Admin Dashboard for user & credit management  

## Technology Stack
### Backend:
- **Laravel (PHP 8+)** - REST API development
- **MySQL / PostgreSQL** - Database management
- **Africa’s Talking / Twilio / Infobip** - SMS API integration
- **Redis & Queues** - Efficient SMS processing

### Frontend:
- **React.js / Next.js** - Interactive user interface
- **Bootstrap / Tailwind CSS** - Styling & UI components
- **Redux / Context API** - State management

### Hosting & Deployment:
- **AWS / DigitalOcean / VPS** - Scalable hosting
- **Nginx / Apache** - Web server
- **SSL & HTTPS** - Secure data transmission

## Installation & Setup
### Prerequisites:
Ensure you have the following installed:
- PHP 8+
- Composer
- Node.js & npm
- MySQL/PostgreSQL
- Git
- SMS API Provider Account (e.g., Africa’s Talking, Twilio)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/bulk-sms-reseller.git
cd bulk-sms-reseller
```

### 2. Set Up Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```
Configure `.env` with your **database** and **SMS API credentials**:
```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bulk_sms
DB_USERNAME=root
DB_PASSWORD=yourpassword
SMS_API_KEY=your_sms_api_key
SMS_SENDER_ID=YourSenderID
```
Run database migrations:
```bash
php artisan migrate
```
Start the backend server:
```bash
php artisan serve
```

### 3. Set Up Frontend (React.js)
```bash
cd ../frontend
npm install
npm start
```
This will start the React development server.

## API Documentation
The backend provides a **REST API** for integrating SMS services into external applications.
### Authentication:
- `POST /api/register` - Create a new user account
- `POST /api/login` - Authenticate user

### SMS Management:
- `POST /api/send-sms` - Send bulk SMS
- `GET /api/sms-reports` - Get SMS delivery reports
- `POST /api/schedule-sms` - Schedule SMS for later

## Deployment
### Deploy Backend:
```bash
php artisan migrate --force
php artisan config:cache
php artisan serve --host=0.0.0.0 --port=8000
```
### Deploy Frontend:
```bash
npm run build
```
Upload the `build/` folder to a web server (e.g., **Netlify, Vercel, or an Nginx server**).

## Pricing & Revenue Model
💰 **Pay-As-You-Go** - Businesses buy SMS credits (KES 2 per SMS)  
💰 **Subscription Plans:**  
- **Basic:** 5,000 SMS/month – $50/month  
- **Pro:** 20,000 SMS/month – $150/month  
- **Enterprise:** 50,000+ SMS/month – Custom pricing  
💰 **Reseller Model:** Agencies can buy credits in bulk & resell

## Roadmap
✅ Phase 1: Backend & API Development  
✅ Phase 2: Frontend Dashboard & UI  
✅ Phase 3: SMS API Integration & Testing  
🚀 Phase 4: Deployment & Scaling  

## Contributors
- **Ismael Kiprop** - Project Lead
- **Charlene Ruto** - Full-Stack Developer

## License
This project is licensed under the **MIT License**.