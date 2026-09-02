import AboutBrandsSection from "@/src/components/about/AboutBrandsSection";
import AboutExpert from "@/src/components/about/AboutExpert";
import AboutHero from "@/src/components/about/AboutHero";
import AboutStatsSection from "@/src/components/about/AboutStatsSection";
import AboutTeamSection from "@/src/components/about/AboutTeamSection";
import FAQSection from "@/src/components/layout/FAQSection";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#F7F8FA] flex flex-col">
            <AboutHero />
            <AboutStatsSection />
            {/* <AboutTeamSection /> */}
            <AboutExpert />
            {/* <AboutBrandsSection /> */}
            <FAQSection />
        </main>
    );
}