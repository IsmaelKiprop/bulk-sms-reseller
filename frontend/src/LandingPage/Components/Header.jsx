// Header.jsx
import React from 'react';
import { MessageSquare } from 'lucide-react';

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-dark-background/95 dark:border-dark-blue-shade-700 dark:supports-[backdrop-filter]:bg-dark-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-light-blue-shade-500 dark:text-dark-blue-shade-300" />
          <span className="text-xl font-bold text-primary dark:text-white">Go Digital Africa</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <a
            href="#features"
            className="text-sm font-medium text-light-blue-shade-700 hover:text-light-blue-shade-500 dark:text-dark-blue-shade-200 dark:hover:text-dark-blue-shade-100"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-light-blue-shade-700 hover:text-light-blue-shade-500 dark:text-dark-blue-shade-200 dark:hover:text-dark-blue-shade-100"
          >
            Pricing
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-light-blue-shade-700 hover:text-light-blue-shade-500 dark:text-dark-blue-shade-200 dark:hover:text-dark-blue-shade-100"
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            className="text-sm font-medium text-light-blue-shade-700 hover:text-light-blue-shade-500 dark:text-dark-blue-shade-200 dark:hover:text-dark-blue-shade-100"
          >
            Testimonials
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <a
            href="/login"
            className="text-sm font-medium text-light-blue-shade-700 hover:text-light-blue-shade-500 dark:text-dark-blue-shade-200 dark:hover:text-dark-blue-shade-100"
          >
            Login
          </a>
          <button
            as="a"
            href="/register"
            className="bg-light-blue-shade-500 hover:bg-light-blue-shade-600 text-white dark:bg-dark-blue-shade-500 dark:hover:bg-dark-blue-shade-400"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;