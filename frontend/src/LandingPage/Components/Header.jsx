// Header.jsx
import React, { useState } from 'react';
import { MessageSquare, Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../../Utils/ThemeProvider';

function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-dark-background/95 dark:border-dark-blue-shade-700 dark:supports-[backdrop-filter]:bg-dark-background/60">
      <div className="container mx-auto px-4 sm:px-6 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-light-blue-shade-500 dark:text-dark-blue-shade-300" />
          <span className="text-xl font-bold text-primary dark:text-white">Go Digital Africa</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#features"
            className="text-sm font-medium text-light-blue-shade-700 hover:text-light-blue-shade-500 dark:text-dark-blue-shade-200 dark:hover:text-dark-blue-shade-100 transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-light-blue-shade-700 hover:text-light-blue-shade-500 dark:text-dark-blue-shade-200 dark:hover:text-dark-blue-shade-100 transition-colors"
          >
            Pricing
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-light-blue-shade-700 hover:text-light-blue-shade-500 dark:text-dark-blue-shade-200 dark:hover:text-dark-blue-shade-100 transition-colors"
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            className="text-sm font-medium text-light-blue-shade-700 hover:text-light-blue-shade-500 dark:text-dark-blue-shade-200 dark:hover:text-dark-blue-shade-100 transition-colors"
          >
            Testimonials
          </a>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          {/* Theme toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-blue-shade-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-dark-blue-shade-200" />
            ) : (
              <Moon className="h-5 w-5 text-light-blue-shade-700" />
            )}
          </button>
          
          <a
            href="/login"
            className="text-sm font-medium text-light-blue-shade-700 hover:text-light-blue-shade-500 dark:text-dark-blue-shade-200 dark:hover:text-dark-blue-shade-100 transition-colors"
          >
            Login
          </a>
          <a
            href="/register"
            className="text-sm font-medium px-4 py-2 rounded-md bg-light-blue-shade-500 hover:bg-light-blue-shade-600 text-white dark:bg-dark-blue-shade-500 dark:hover:bg-dark-blue-shade-400 transition-colors"
          >
            Get Started
          </a>
        </div>
        
        {/* Mobile menu button */}
        <div className="flex items-center md:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-blue-shade-800 transition-colors mr-2"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-dark-blue-shade-200" />
            ) : (
              <Moon className="h-5 w-5 text-light-blue-shade-700" />
            )}
          </button>
          
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-light-blue-shade-700 hover:text-light-blue-shade-500 dark:text-dark-blue-shade-200 dark:hover:text-dark-blue-shade-100"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-6 space-y-4 bg-white dark:bg-dark-background border-t dark:border-dark-blue-shade-700">
          <a
            href="#features"
            className="block py-2 text-sm font-medium text-light-blue-shade-700 hover:text-light-blue-shade-500 dark:text-dark-blue-shade-200 dark:hover:text-dark-blue-shade-100"
            onClick={toggleMenu}
          >
            Features
          </a>
          <a
            href="#pricing"
            className="block py-2 text-sm font-medium text-light-blue-shade-700 hover:text-light-blue-shade-500 dark:text-dark-blue-shade-200 dark:hover:text-dark-blue-shade-100"
            onClick={toggleMenu}
          >
            Pricing
          </a>
          <a
            href="#how-it-works"
            className="block py-2 text-sm font-medium text-light-blue-shade-700 hover:text-light-blue-shade-500 dark:text-dark-blue-shade-200 dark:hover:text-dark-blue-shade-100"
            onClick={toggleMenu}
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            className="block py-2 text-sm font-medium text-light-blue-shade-700 hover:text-light-blue-shade-500 dark:text-dark-blue-shade-200 dark:hover:text-dark-blue-shade-100"
            onClick={toggleMenu}
          >
            Testimonials
          </a>
          <div className="pt-2 flex flex-col space-y-3">
            <a
              href="/login"
              className="py-2 text-sm font-medium text-light-blue-shade-700 hover:text-light-blue-shade-500 dark:text-dark-blue-shade-200 dark:hover:text-dark-blue-shade-100"
              onClick={toggleMenu}
            >
              Login
            </a>
            <a
              href="/register"
              className="text-sm font-medium px-4 py-2 rounded-md bg-light-blue-shade-500 hover:bg-light-blue-shade-600 text-white dark:bg-dark-blue-shade-500 dark:hover:bg-dark-blue-shade-400 inline-block text-center"
              onClick={toggleMenu}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;