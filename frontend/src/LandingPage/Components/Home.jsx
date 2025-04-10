import React from 'react';
import TestimonialCarousel from '../Pages/TestimonialCarousel';
import PricingCards from '../Pages/PricingCards';
import FeatureSection from '../Pages/FeatureSection';
import HeroSection from '../Pages/HeroSection';
import StatsSection from '../Pages/StatsSection';
import HowItWorks from '../Pages/HowItWorks';
import Header from './Header';
import Footer from './Footer';

function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeatureSection />
        <HowItWorks />
        <PricingCards />
        <TestimonialCarousel />
      </main>
      <Footer />
    </div>
  );
}

export default Home;