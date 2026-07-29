import CareerForm from "@/src/components/careers/CareerForm";
import CareersHero from "@/src/components/careers/CareersHero";
import JobOpenings from "@/src/components/careers/JobOpenings";
import CTASection from "@/src/components/layout/CTASection";

export const metadata = {
  title: "Careers - Thermal Suite",
  description: "Join Thermal Suite's engineering and product teams building the future of industrial thermodynamic software.",
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <CareersHero />
      <JobOpenings />
      <CareerForm />
      <CTASection />
    </main>
  );
}