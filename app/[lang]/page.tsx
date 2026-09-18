import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import BrandPillars from "@/components/sections/BrandPillars";
import Services from "@/components/sections/Services";
import EndOfLifeCare from "@/components/sections/EndOfLifeCare";
import Features from "@/components/sections/Features";
import Testimonials from "@/components/sections/Testimonials";
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
        {/* Sits directly under Services, above everything else — the client
            asked for end-of-life care to be visible early, not buried in a
            list next to nail trims. */}
        <EndOfLifeCare />
        <Features />
        <Testimonials />
        <ServiceArea />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
