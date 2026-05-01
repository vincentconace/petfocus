import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import BrandPillars from "@/components/sections/BrandPillars";
import Services from "@/components/sections/Services";
import Features from "@/components/sections/Features";
import CoreFeatures from "@/components/sections/CoreFeatures";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import Blog from "@/components/sections/Blog";
import ServiceArea from "@/components/sections/ServiceArea";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <BrandPillars />
        <Services />
        <Features />
        <CoreFeatures />
        <Pricing />
        <Testimonials />
        <Blog />
        <ServiceArea />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
