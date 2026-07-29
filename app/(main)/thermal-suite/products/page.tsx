import CTASection from "@/src/components/layout/CTASection";
import EngineeringTools from "@/src/components/products/EngineeringTools";
import ProductCategories from "@/src/components/products/ProductCategories";
import ProductsHero from "@/src/components/products/ProductsHero";

export const metadata = {
  title: "Products - Thermal Suite",
  description: "Thermal Engineering Software Solutions including Coil Selection, Product Selectors, and Cold Storage Solutions.",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#F7F8FA] flex flex-col">
      {/* Product Specific Sections */}
      <ProductsHero />
      <ProductCategories />
      <EngineeringTools />
      
      {/* Reusing Global Components for the footer area */}
      <CTASection />
    </main>
  );
}