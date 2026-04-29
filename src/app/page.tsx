import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import Features from "@/components/home/Features";
import VerificationSection from "@/components/home/VerificationSection";
import ThreatIntel from "@/components/home/ThreatIntel";
import PlatformModules from "@/components/home/PlatformModules";
import ModulesGrid from "@/components/home/ModulesGrid";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <TrustStrip />
        <Features />
        <VerificationSection />
        <ThreatIntel /> 
        <ModulesGrid />
      </main>
    </>
  );
}