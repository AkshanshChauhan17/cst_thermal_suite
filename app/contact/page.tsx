import ContactSection from "@/src/components/contact/ContactSection";

export const metadata = {
  title: "Contact Us - Thermal Suite",
  description: "Get in touch with Thermal Suite engineering and support specialists for software inquiries and enterprise solutions.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <ContactSection />
    </main>
  );
}