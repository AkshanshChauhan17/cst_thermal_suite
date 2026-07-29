import CalculatorSuiteSection from "@/src/components/coil/CalculatorSuiteSection";
import CoilSelectionCategories from "@/src/components/coil/CoilSelectionCategories";
import CoilSelectionHero from "@/src/components/coil/CoilSelectionHero";
import CTASection from "@/src/components/layout/CTASection";

export const metadata = {
  title: "Coil Selection Software - Thermal Suite",
  description: "Select and design Steam Coils, Hot Water Coils, DX Cooling Coils, and Condenser Coils with practical thermal calculations.",
};

export default function CoilSelectionPage() {
  return (
    <main className="min-h-screen bg-[#F7F8FA] flex flex-col">      
      {/* Coil Selection Specific Sections */}
      <CoilSelectionHero />
      <CoilSelectionCategories />
      <CalculatorSuiteSection />
      
      {/* Reusing Global Components */}
      <CTASection />
    </main>
  );
}