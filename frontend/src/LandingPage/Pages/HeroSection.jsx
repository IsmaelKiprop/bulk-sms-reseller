import React from "react";
import { ArrowRight, MessageSquare, Zap, Shield } from "lucide-react";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-light-blue-shade-500 to-light-blue-shade-700 dark:from-dark-blue-shade-800 dark:to-dark-blue-shade-900 py-16 md:py-24 lg:py-32 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-light-blue-shade-400/30 dark:bg-dark-blue-shade-600/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-light-blue-shade-300/20 dark:bg-dark-blue-shade-400/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-white/10 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium text-white max-w-max mb-4">
            <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2"></span>
            New features available now
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-light-blue-shade-200 dark:from-white dark:to-dark-blue-shade-200">
              Powerful Bulk SMS Solutions for African Businesses
            </h1>
            <p className="text-xl text-light-blue-shade-100 dark:text-dark-blue-shade-100">
              Connect with your customers instantly through our reliable and affordable bulk SMS platform.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a 
              href="/register" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-md font-medium bg-white text-light-blue-shade-700 hover:bg-light-blue-shade-100 dark:bg-dark-blue-shade-300 dark:text-dark-background dark:hover:bg-dark-blue-shade-200 transition-all shadow-lg hover:shadow-xl"
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md font-medium bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all"
            >
              View Pricing
            </a>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-light-blue-shade-200 dark:text-dark-blue-shade-200" />
              <span className="text-sm font-medium">99.9% Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-light-blue-shade-200 dark:text-dark-blue-shade-200" />
              <span className="text-sm font-medium">Instant</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-light-blue-shade-200 dark:text-dark-blue-shade-200" />
              <span className="text-sm font-medium">Secure</span>
            </div>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-light-blue-shade-300 to-light-blue-shade-500 dark:from-dark-blue-shade-400 dark:to-dark-blue-shade-600 rounded-lg blur opacity-75"></div>
          <div className="relative h-[400px] w-full overflow-hidden rounded-lg shadow-2xl md:h-[500px] bg-white/10 backdrop-blur-sm border border-white/20">
            <img
              src="https://placehold.co/500x500/2563eb/FFFFFF/png?text=BULK+SMS"
              alt="Go Digital Africa Bulk SMS Dashboard"
              className="object-cover absolute inset-0 w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30 z-10 rounded-lg"></div>
          </div>
          
          {/* Floating badges */}
          <div className="absolute -top-4 -right-4 md:top-6 md:-right-6 bg-white dark:bg-dark-blue-shade-800 text-light-blue-shade-700 dark:text-white px-4 py-2 rounded-lg shadow-lg rotate-3 animate-float">
            <span className="font-bold">1000+</span> Businesses
          </div>
          <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white dark:bg-dark-blue-shade-800 text-light-blue-shade-700 dark:text-white px-4 py-2 rounded-lg shadow-lg -rotate-3 animate-float animation-delay-2000">
            <span className="font-bold">24/7</span> Support
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;