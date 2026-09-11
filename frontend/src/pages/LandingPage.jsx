import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import LaptopGpuScroller from "../components/LaptopGpuScroller";
import FeaturesSection from "../components/FeaturesSection";
import SovereigntyArchSection from "../components/SovereigntyArchSection";
import IndustrialUseCases from "../components/IndustrialUseCases";
import LiveDemoSection from "../components/LiveDemoSection";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="landing-page-root">
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <LaptopGpuScroller />
        <FeaturesSection />
        <SovereigntyArchSection />
        <IndustrialUseCases />
        <LiveDemoSection />
      </main>
      <Footer />
    </div>
  );
}
