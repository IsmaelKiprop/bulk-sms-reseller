import React from 'react';
// import TestimonialCarousel from './testimonial-carousel';
// import PricingCards from './pricing-cards';
// import FeatureSection from './feature-section';
import HeroSection from '../Pages/HeroSection';
// import StatsSection from './stats-section';
// import HowItWorks from './how-it-works';
import Header from './Header';
import Footer from './Footer';

function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        {/* <StatsSection /> */}
        {/* <FeatureSection /> */}
        {/* <HowItWorks /> */}
        {/* <PricingCards /> */}
        {/* <TestimonialCarousel /> */}
      </main>
      <Footer />
    </div>
  );
}

export default Home;