export const dynamic = 'force-dynamic';
import GetStartedSection from "@/src/components/get-started/GetStartedSection";

export const metadata = {
  title: "Get Started - Thermal Suite",
  description: "Create your Thermal Suite account and start optimizing your thermal engineering calculations today.",
};

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <GetStartedSection /> 
    </main>
  );
}