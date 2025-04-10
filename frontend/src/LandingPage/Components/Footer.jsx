// Footer.jsx
import React from 'react';
import { MessageSquare } from 'lucide-react';
import NewsletterForm from '../Pages/NewsLetterForm';

function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-dark-background dark:border-dark-blue-shade-700">
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-light-blue-shade-500 dark:text-dark-blue-shade-300" />
              <span className="text-xl font-bold text-primary dark:text-white">Go Digital Africa</span>
            </div>
            <p className="text-sm text-light-blue-shade-700 dark:text-dark-blue-shade-200">
              Empowering businesses across Africa with reliable and affordable bulk SMS solutions.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary dark:text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#features"
                  className="text-light-blue-shade-700 hover:text-light-blue-shade-500 dark:text-dark-blue-shade-200 dark:hover:text-dark-blue-shade-100"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-light-blue-shade-700 hover:text-light-blue-shade-500 dark:text-dark-blue-shade-200 dark:hover:text-dark-blue-shade-100"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-light-blue-shade-700 hover:text-light-blue-shade-500 dark:text-dark-blue-shade-200 dark:hover:text-dark-blue-shade-100"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-light-blue-shade-700 hover:text-light-blue-shade-500 dark:text-dark-blue-shade-200 dark:hover:text-dark-blue-shade-100"
                >
                  Testimonials
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary dark:text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/terms"
                  className="text-light-blue-shade-700 hover:text-light-blue-shade-500 dark:text-dark-blue-shade-200 dark:hover:text-dark-blue-shade-100"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-light-blue-shade-700 hover:text-light-blue-shade-500 dark:text-dark-blue-shade-200 dark:hover:text-dark-blue-shade-100"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/compliance"
                  className="text-light-blue-shade-700 hover:text-light-blue-shade-500 dark:text-dark-blue-shade-200 dark:hover:text-dark-blue-shade-100"
                >
                  GDPR Compliance
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary dark:text-white">Subscribe to our Newsletter</h3>
            <NewsletterForm />
          </div>
        </div>
        <div className="mt-12 border-t border-light-blue-shade-200 dark:border-dark-blue-shade-700 pt-6 text-center text-sm text-light-blue-shade-600 dark:text-dark-blue-shade-300">
          &copy; {new Date().getFullYear()} Go Digital Africa. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;