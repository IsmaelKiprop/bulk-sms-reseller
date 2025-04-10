import React from "react";
import { ArrowRight } from "lucide-react";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-light-blue-shade-500 py-16 md:py-24 lg:py-32 text-white dark:bg-dark-background">
      <div className="container relative z-10 grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Powerful Bulk SMS Solutions for African Businesses
            </h1>
            <p className="text-xl text-light-blue-shade-100 dark:text-dark-blue-shade-100">
              Connect with your customers instantly through our reliable and affordable bulk SMS platform.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a 
              href="/register" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-md font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md font-medium bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors"
            >
              View Pricing
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm text-light-blue-shade-100 dark:text-dark-blue-shade-100">
            <span className="font-medium">Trusted by 1000+ businesses across Africa</span>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="relative h-[400px] w-full overflow-hidden rounded-lg shadow-xl md:h-[500px]">
            <img
              src="/placeholder.svg?height=500&width=500"
              alt="Go Digital Africa Bulk SMS Dashboard"
              className="object-cover absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_40%)]"></div>
    </section>
  );
}

export default HeroSection;