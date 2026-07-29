import AdminControlSection from "@/src/components/layout/AdminControlSection";
import CollaborationSection from "@/src/components/layout/CollaborationSection";
import CTASection from "@/src/components/layout/CTASection";
import FAQSection from "@/src/components/layout/FAQSection";
import FeaturesSection from "@/src/components/layout/FeaturesSection";
import HeroSection from "@/src/components/layout/HeroSection";
import IntegrationsSection from "@/src/components/layout/IntegrationsSection";
import LogoTicker from "@/src/components/layout/LogoTicker";
import ReportsSection from "@/src/components/layout/ReportsSection";
import StatsBanner from "@/src/components/layout/StatsBanner";
import TestimonialsSection from "@/src/components/layout/TestimonialsSection";

export default function Home() {
  return (
    <>
    <HeroSection />
    <LogoTicker />
    <StatsBanner />
    <FeaturesSection />
    <AdminControlSection />
    <CollaborationSection />
    <ReportsSection />
    <IntegrationsSection />
    <TestimonialsSection />
    <FAQSection />
    <CTASection />
    </>
  );
}
