"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import CTASection from "@/src/components/layout/CTASection";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  // Pricing calculations
  const plans = [
    {
      name: "Starter",
      desc: "For individual users & solo engineers",
      monthlyPrice: 8,
      yearlyPrice: 6,
      features: [
        "2 team members",
        "1,000 Calculation Tokens",
        "5 Campaign Workflows",
        "5 Nodes Per Campaign",
        "2 Automation Rules (Triggers)"
      ],
      popular: false
    },
    {
      name: "Professional",
      desc: "Best for small engineering teams",
      monthlyPrice: 88,
      yearlyPrice: 70,
      features: [
        "10 team members",
        "2,500 Calculation Tokens",
        "5 Campaign Workflows",
        "10 Nodes Per Campaign",
        "5 Automation Rules (Triggers)"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      desc: "Perfect for large enterprise manufacturing",
      monthlyPrice: 188,
      yearlyPrice: 150,
      features: [
        "Unlimited team members",
        "5,000 Calculation Tokens",
        "25 Campaign Workflows",
        "20 Nodes Per Campaign",
        "15 Automation Rules (Triggers)"
      ],
      popular: false
    }
  ];

  return (
    <main className="min-h-screen bg-[#F7F8FA] flex flex-col font-sans">
      {/* Hero Header with Purple Background */}
      <section className="w-full bg-[#1E1B4B] pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#86EFAC 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            Choose the plan that's right for you
          </h1>
          <p className="text-gray-400 text-base md:text-lg mb-10">
            All of our plans are customized to fit the needs of small and large teams.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="inline-flex items-center bg-[#110f2a] border border-gray-700 p-1.5 rounded-none">
            <button 
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2.5 text-sm font-bold transition-all rounded-none ${!isYearly ? 'bg-[#5648FC] text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2.5 text-sm font-bold transition-all rounded-none ${isYearly ? 'bg-[#5648FC] text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Yearly <span className="text-[#86EFAC] text-xs ml-1 font-mono">(Save 20%)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white border flex flex-col justify-between shadow-2xl relative rounded-none ${
                  plan.popular ? 'border-[#5648FC] ring-2 ring-[#5648FC]/20 lg:-translate-y-4' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="bg-[#86EFAC] text-[#1E1B4B] text-center text-xs font-bold uppercase tracking-widest py-2">
                    Recommended
                  </div>
                )}

                <div className="p-8 md:p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-[#1E1B4B] mb-2">{plan.name}</h3>
                  <p className="text-gray-500 text-sm mb-6">{plan.desc}</p>
                  
                  <div className="flex items-baseline gap-1 mb-8 pb-8 border-b border-gray-100">
                    <span className="text-4xl md:text-5xl font-extrabold text-[#1E1B4B] font-mono">${price}</span>
                    <span className="text-gray-400 text-sm font-medium">/ billed {isYearly ? 'yearly' : 'monthly'}</span>
                  </div>

                  <p className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-4">This plan includes:</p>
                  <ul className="flex flex-col gap-4 mb-8 flex-grow">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3 text-sm text-gray-600">
                        <div className="w-5 h-5 bg-[#E8F5E9] flex items-center justify-center flex-shrink-0 mt-0.5 rounded-none">
                          <Check size={14} className="text-[#10B981] font-bold" />
                        </div>
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href="/get-started"
                    className={`w-full py-4 text-center font-bold text-sm tracking-wide transition-colors flex items-center justify-center gap-2 rounded-none ${
                      plan.popular 
                        ? 'bg-[#5648FC] text-white hover:bg-[#4336d6]' 
                        : 'bg-[#1E1B4B] text-white hover:bg-[#5648FC]'
                    }`}
                  >
                    Get Started Now
                    <ArrowRight size={16} />
                  </Link>
                  <p className="text-center text-xs text-gray-400 mt-3">No credit card required.</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Feature Comparison Matrix Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#1E1B4B] tracking-tight mb-3">Compare Features & Specifications</h2>
          <p className="text-gray-500 text-base">Detailed breakdown of computational capabilities across all tiers.</p>
        </div>

        <div className="bg-white border border-gray-200 shadow-xl overflow-x-auto rounded-none">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-200 bg-[#F7F8FA]">
                <th className="p-6 text-xs font-bold text-[#1E1B4B] uppercase tracking-wider w-2/5">Features Name</th>
                <th className="p-6 text-xs font-bold text-[#1E1B4B] uppercase tracking-wider text-center w-1/5">Starter</th>
                <th className="p-6 text-xs font-bold text-[#1E1B4B] uppercase tracking-wider text-center w-1/5 text-[#5648FC]">Professional</th>
                <th className="p-6 text-xs font-bold text-[#1E1B4B] uppercase tracking-wider text-center w-1/5">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              
              {/* Category: Analytics */}
              <tr className="bg-[#F7F8FA]/50">
                <td colSpan={4} className="px-6 py-3 font-bold text-[#1E1B4B] text-xs uppercase tracking-widest">Analytics</td>
              </tr>
              <tr>
                <td className="p-6 text-gray-700 font-medium">Marketing Automation</td>
                <td className="p-6 text-center"><Check size={18} className="text-[#10B981] mx-auto" /></td>
                <td className="p-6 text-center bg-[#5648FC]/5"><Check size={18} className="text-[#10B981] mx-auto" /></td>
                <td className="p-6 text-center"><Check size={18} className="text-[#10B981] mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-6 text-gray-700 font-medium">Realtime analytics</td>
                <td className="p-6 text-center"><Check size={18} className="text-[#10B981] mx-auto" /></td>
                <td className="p-6 text-center bg-[#5648FC]/5"><Check size={18} className="text-[#10B981] mx-auto" /></td>
                <td className="p-6 text-center"><Check size={18} className="text-[#10B981] mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-6 text-gray-700 font-medium">Funnel optimization</td>
                <td className="p-6 text-center"><X size={18} className="text-gray-300 mx-auto" /></td>
                <td className="p-6 text-center bg-[#5648FC]/5"><Check size={18} className="text-[#10B981] mx-auto" /></td>
                <td className="p-6 text-center"><Check size={18} className="text-[#10B981] mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-6 text-gray-700 font-medium">User analytics</td>
                <td className="p-6 text-center"><X size={18} className="text-gray-300 mx-auto" /></td>
                <td className="p-6 text-center bg-[#5648FC]/5"><X size={18} className="text-gray-300 mx-auto" /></td>
                <td className="p-6 text-center"><Check size={18} className="text-[#10B981] mx-auto" /></td>
              </tr>

              {/* Category: Reports */}
              <tr className="bg-[#F7F8FA]/50">
                <td colSpan={4} className="px-6 py-3 font-bold text-[#1E1B4B] text-xs uppercase tracking-widest">Reports</td>
              </tr>
              <tr>
                <td className="p-6 text-gray-700 font-medium">Automated reports</td>
                <td className="p-6 text-center text-gray-500 font-mono text-xs">2,500 reports</td>
                <td className="p-6 text-center text-gray-500 font-mono text-xs bg-[#5648FC]/5">5,000 reports</td>
                <td className="p-6 text-center text-gray-500 font-mono text-xs">Unlimited reports</td>
              </tr>
              <tr>
                <td className="p-6 text-gray-700 font-medium">AI data predictions</td>
                <td className="p-6 text-center"><X size={18} className="text-gray-300 mx-auto" /></td>
                <td className="p-6 text-center bg-[#5648FC]/5"><Check size={18} className="text-[#10B981] mx-auto" /></td>
                <td className="p-6 text-center"><Check size={18} className="text-[#10B981] mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-6 text-gray-700 font-medium">Funnel optimization</td>
                <td className="p-6 text-center"><X size={18} className="text-gray-300 mx-auto" /></td>
                <td className="p-6 text-center bg-[#5648FC]/5"><X size={18} className="text-gray-300 mx-auto" /></td>
                <td className="p-6 text-center"><Check size={18} className="text-[#10B981] mx-auto" /></td>
              </tr>

              {/* Category: Integrations */}
              <tr className="bg-[#F7F8FA]/50">
                <td colSpan={4} className="px-6 py-3 font-bold text-[#1E1B4B] text-xs uppercase tracking-widest">Integrations</td>
              </tr>
              <tr>
                <td className="p-6 text-gray-700 font-medium">Integrations tool</td>
                <td className="p-6 text-center text-gray-500 font-mono text-xs">5</td>
                <td className="p-6 text-center text-gray-500 font-mono text-xs bg-[#5648FC]/5">10</td>
                <td className="p-6 text-center text-gray-500 font-mono text-xs">20+</td>
              </tr>
              <tr>
                <td className="p-6 text-gray-700 font-medium">Seamless data sync</td>
                <td className="p-6 text-center"><X size={18} className="text-gray-300 mx-auto" /></td>
                <td className="p-6 text-center bg-[#5648FC]/5"><X size={18} className="text-gray-300 mx-auto" /></td>
                <td className="p-6 text-center"><Check size={18} className="text-[#10B981] mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-6 text-gray-700 font-medium">Data enrichment</td>
                <td className="p-6 text-center"><X size={18} className="text-gray-300 mx-auto" /></td>
                <td className="p-6 text-center bg-[#5648FC]/5"><Check size={18} className="text-[#10B981] mx-auto" /></td>
                <td className="p-6 text-center"><Check size={18} className="text-[#10B981] mx-auto" /></td>
              </tr>

              {/* Bottom Action Row */}
              <tr className="bg-[#F7F8FA]">
                <td className="p-6"></td>
                <td className="p-6 text-center">
                  <Link href="/get-started" className="inline-block bg-[#1E1B4B] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#5648FC] transition-colors rounded-none">
                    Get Started Now
                  </Link>
                </td>
                <td className="p-6 text-center bg-[#5648FC]/5">
                  <Link href="/get-started" className="inline-block bg-[#5648FC] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#4336d6] transition-colors rounded-none">
                    Get Started Now
                  </Link>
                </td>
                <td className="p-6 text-center">
                  <Link href="/get-started" className="inline-block bg-[#1E1B4B] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#5648FC] transition-colors rounded-none">
                    Get Started Now
                  </Link>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </section>

      <CTASection />
    </main>
  );
}