import ComponentCatalog from "@/src/components/component-unit/ComponentCatalog";
import ComponentHero from "@/src/components/component-unit/ComponentHero";
import ComponentScrolling from "@/src/components/component-unit/ComponentScrolling";
import SoftwareIntegration from "@/src/components/component-unit/SoftwareIntegration";
import TechnicalSpecs from "@/src/components/component-unit/TechnicalSpecs";
import CTASection from "@/src/components/layout/CTASection";

export const metadata = {
  title: "Component Units - Thermal Suite",
  description: "Industrial-grade physical thermal components and hardware systems engineered for absolute precision and extreme thresholds.",
};

export default function ComponentUnitPage() {
  return (
    <main className="min-h-screen bg-[#F7F8FA] flex flex-col">
      <ComponentHero />
      <ComponentScrolling />
      {/* <ComponentCatalog />
      <TechnicalSpecs />
      <SoftwareIntegration /> */}
      <CTASection />
    </main>
  );
}