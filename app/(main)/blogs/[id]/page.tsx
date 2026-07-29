import CTASection from "@/src/components/layout/CTASection";
import { Clock, ArrowLeft, Share2, Bookmark, Check, User, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Optimizing Heat Exchanger Fin Geometries - Thermal Suite",
  description: "An in-depth look at how computational fluid dynamics (CFD) and token-based simulations reduce prototyping cycles for condenser coils.",
};

export default function BlogDetail() {
  return (
    <main className="min-h-screen bg-white flex flex-col font-sans">
      <section className="w-full bg-[#1E1B4B] pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#5648FC]/5 border-l border-[#5648FC]/10 skew-x-12 translate-x-16 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest mb-8 transition-colors">
            <ArrowLeft size={16} />
            Back to Engineering Insights
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#5648FC] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-none">
              Thermodynamics
            </span>
            <span className="text-gray-400 text-xs font-mono">July 24, 2026</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
            Optimizing Heat Exchanger Fin Geometries for Extreme Industrial Environments
          </h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#5648FC]/20 border border-[#5648FC]/50 flex items-center justify-center rounded-none text-white font-bold">
                <User size={24} className="text-[#86EFAC]" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Dr. Rajesh Varma</p>
                <p className="text-gray-400 text-xs">Chief Thermodynamic Architect, Thermal Suite</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-400 text-xs font-mono">
              <span className="flex items-center gap-1.5"><Clock size={14} /> 6 min read</span>
              <div className="flex items-center gap-2 border-l border-gray-700 pl-4">
                <button className="p-2 bg-white/5 hover:bg-white/10 text-white transition-colors rounded-none" title="Share Article">
                  <Share2 size={16} />
                </button>
                <button className="p-2 bg-white/5 hover:bg-white/10 text-white transition-colors rounded-none" title="Bookmark">
                  <Bookmark size={16} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-16">
        <div className="bg-[#1E1B4B] p-2 shadow-2xl border border-gray-200 rounded-none">
          <div className="w-full h-[350px] md:h-[480px] relative overflow-hidden bg-[#110f2a]">
            <img 
              src="/coil_img1.webp" 
              alt="Heat Exchanger Fin Geometries"
              className="absolute inset-0 w-full h-full object-cover filter contrast-125"
            />
            <div className="absolute bottom-4 right-4 bg-[#1E1B4B] text-white text-xs font-mono px-3 py-1 border border-gray-700">
              FIG_01: CFD_FIN_STRESS_ANALYSIS
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-10 text-gray-700 text-lg leading-relaxed">
          
          <p className="font-medium text-xl text-[#1E1B4B] leading-relaxed">
            In modern industrial refrigeration and HVAC design, optimizing heat exchanger fin geometries is no longer just about maximizing surface area—it is about balancing pressure drop, condensate retention, and structural integrity under high ambient loads.
          </p>

          <h2 className="text-3xl font-bold text-[#1E1B4B] mt-6 mb-2 tracking-tight">
            1. The Limitation of Traditional Prototyping
          </h2>
          <p>
            Historically, engineers relied on empirical formulas and physical wind-tunnel testing to determine coil thermal performance. This trial-and-error cycle often took weeks per iteration, delaying manufacturing timelines across heavy industries in India.
          </p>
          <p>
            With the advent of zero-latency computational SaaS tools like Thermal Suite, thermodynamic teams can now simulate hundreds of fin configurations—ranging from corrugated louvered fins to flat plate configurations—instantly.
          </p>

          <div className="bg-[#F7F8FA] border-l-4 border-[#5648FC] p-8 my-6">
            <p className="text-xl font-bold text-[#1E1B4B] italic mb-3">
              "Moving from physical prototyping to token-based digital simulation reduced our coil design cycle by over 75%."
            </p>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">— Senior Lead Engineer, Industrial HVAC Corp</span>
          </div>

          <h2 className="text-3xl font-bold text-[#1E1B4B] mt-6 mb-2 tracking-tight">
            2. Key Variables in Airside & Waterside Efficiency
          </h2>
          <p>
            When running calculations through our Scientific and Material Weight calculators, engineers must account for three critical performance metrics:
          </p>

          <ul className="flex flex-col gap-4 my-2">
            <li className="flex items-start gap-4 p-4 bg-[#F7F8FA] border border-gray-200 rounded-none">
              <div className="flex-shrink-0 w-6 h-6 bg-[#1E1B4B] text-white flex items-center justify-center mt-0.5 rounded-none font-bold text-xs">
                <Check size={14} className="text-[#86EFAC]" />
              </div>
              <span className="text-gray-700 text-base"><strong>Fin Pitch & Thickness:</strong> Determining optimal turbulence without creating excessive airside pressure drop.</span>
            </li>
            <li className="flex items-start gap-4 p-4 bg-[#F7F8FA] border border-gray-200 rounded-none">
              <div className="flex-shrink-0 w-6 h-6 bg-[#1E1B4B] text-white flex items-center justify-center mt-0.5 rounded-none font-bold text-xs">
                <Check size={14} className="text-[#86EFAC]" />
              </div>
              <span className="text-gray-700 text-base"><strong>Metallurgy Selection:</strong> Balancing copper tube thermal conductivity with anti-corrosion epoxy fin coatings.</span>
            </li>
            <li className="flex items-start gap-4 p-4 bg-[#F7F8FA] border border-gray-200 rounded-none">
              <div className="flex-shrink-0 w-6 h-6 bg-[#1E1B4B] text-white flex items-center justify-center mt-0.5 rounded-none font-bold text-xs">
                <Check size={14} className="text-[#86EFAC]" />
              </div>
              <span className="text-gray-700 text-base"><strong>Refrigerant Velocity:</strong> Ensuring uniform distribution across multi-row circuits to eliminate dead zones.</span>
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-[#1E1B4B] mt-6 mb-2 tracking-tight">
            3. Conclusion & Future Outlook
          </h2>
          <p>
            As industrial plants push toward stricter energy efficiency norms (such as BEE star ratings and ISO standards), precision engineering is mandatory. By integrating cloud-based calculators directly with physical component manufacturing, teams can eliminate errors before a single tube is bent.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 mt-10 border-t border-gray-200">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2">Tags:</span>
              <span className="bg-[#F7F8FA] border border-gray-200 px-3 py-1 text-xs font-bold text-gray-700 rounded-none">Thermodynamics</span>
              <span className="bg-[#F7F8FA] border border-gray-200 px-3 py-1 text-xs font-bold text-gray-700 rounded-none">CFD Simulation</span>
              <span className="bg-[#F7F8FA] border border-gray-200 px-3 py-1 text-xs font-bold text-gray-700 rounded-none">HVAC</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Share:</span>
              <button className="bg-[#1E1B4B] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#5648FC] transition-colors rounded-none">
                Copy Link
              </button>
            </div>
          </div>

        </div>
      </section>

      <section className="w-full bg-[#F7F8FA] py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs font-bold text-[#5648FC] uppercase tracking-widest block mb-2">Further Reading</span>
              <h3 className="text-3xl font-bold text-[#1E1B4B] tracking-tight">Related Technical Articles</h3>
            </div>
            <Link href="/blogs" className="hidden sm:inline-flex items-center gap-2 text-[#1E1B4B] font-bold text-sm hover:text-[#5648FC] transition-colors uppercase tracking-wide">
              View All Articles <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 p-8 flex flex-col justify-between shadow-sm hover:border-[#5648FC] transition-all rounded-none group">
              <div>
                <span className="text-xs font-bold text-[#5648FC] uppercase tracking-wider block mb-2">SaaS Architecture</span>
                <h4 className="text-xl font-bold text-[#1E1B4B] mb-3 group-hover:text-[#5648FC] transition-colors">
                  Why Zero-Latency Calculation Engines Matter in Modern HVAC Software
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Exploring the backend architectural shifts required to process complex thermodynamic calculations in milliseconds.
                </p>
              </div>
              <Link href="/blogs/2" className="inline-flex items-center gap-2 text-[#1E1B4B] font-bold text-xs uppercase tracking-wider group-hover:text-[#5648FC]">
                Read Article <ArrowRight size={14} />
              </Link>
            </div>

            <div className="bg-white border border-gray-200 p-8 flex flex-col justify-between shadow-sm hover:border-[#5648FC] transition-all rounded-none group">
              <div>
                <span className="text-xs font-bold text-[#5648FC] uppercase tracking-wider block mb-2">Engineering Reports</span>
                <h4 className="text-xl font-bold text-[#1E1B4B] mb-3 group-hover:text-[#5648FC] transition-colors">
                  Automating Enterprise Engineering Reports for CAD and ERP Sync
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  How manufacturing plants bridge the gap between theoretical software outputs and physical shop-floor fabrication data.
                </p>
              </div>
              <Link href="/blogs/4" className="inline-flex items-center gap-2 text-[#1E1B4B] font-bold text-xs uppercase tracking-wider group-hover:text-[#5648FC]">
                Read Article <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}