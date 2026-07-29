import DocsContent from "@/src/components/docs/DocsContent";
import DocsHero from "@/src/components/docs/DocsHero";
import CTASection from "@/src/components/layout/CTASection";

export const metadata = {
  title: "Documentation - Thermal Suite",
  description: "Learn how to navigate the Thermal Suite dashboard, manage tokens, and run complex engineering calculations.",
};

export default function DocumentationPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <DocsHero />
      <DocsContent />
      <CTASection />
    </main>
  );
}