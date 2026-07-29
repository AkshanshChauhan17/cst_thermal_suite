"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, CreditCard, FileText, Settings, ChevronRight, PlayCircle, Download } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DocsContent() {
  // State to track the currently active section for the scroll spy
  const [activeSection, setActiveSection] = useState("getting-started");

  useEffect(() => {
    // Intersection Observer to detect which section is on screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      // rootMargin adjusts when the section is considered "active" (triggers slightly before hitting the top)
      { rootMargin: "-20% 0px -60% 0px" } 
    );

    const sectionIds = [
      "getting-started",
      "dashboard-overview",
      "purchasing-tokens",
      "running-calculations",
      "exporting-reports"
    ];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const sidebarLinks = [
    { id: "getting-started", name: "Getting Started", icon: <PlayCircle size={16} />, href: "#getting-started" },
    { id: "dashboard-overview", name: "Dashboard Overview", icon: <LayoutDashboard size={16} />, href: "#dashboard-overview" },
    { id: "purchasing-tokens", name: "Purchasing & Tokens", icon: <CreditCard size={16} />, href: "#purchasing-tokens" },
    { id: "running-calculations", name: "Running Calculations", icon: <Settings size={16} />, href: "#running-calculations" },
    { id: "exporting-reports", name: "Exporting Reports", icon: <Download size={16} />, href: "#exporting-reports" },
  ];

  // Function for smooth scrolling when a sidebar link is clicked
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* Sticky Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-3 flex flex-col sticky top-24"
        >
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Table of Contents</h3>
          
          <ul className="flex flex-col border-l border-gray-200">
            {sidebarLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.id)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-l-2 ${
                      isActive
                        ? "border-[#5648FC] text-[#5648FC] bg-[#5648FC]/5"
                        : "border-transparent text-gray-500 hover:text-[#1E1B4B] hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-12 p-6 bg-[#F7F8FA] border border-gray-200">
            <h4 className="text-sm font-bold text-[#1E1B4B] mb-2">Need direct help?</h4>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">Our engineering support team is available 24/7 for enterprise clients.</p>
            <button className="w-full bg-[#1E1B4B] text-white py-2 text-sm font-bold hover:bg-[#5648FC] transition-colors">
              Contact Support
            </button>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-9 flex flex-col max-w-4xl"
        >

          {/* Section 1: Getting Started */}
          <div id="getting-started" className="mb-20 scroll-mt-32">
            <h2 className="text-3xl font-bold text-[#1E1B4B] mb-6 tracking-tight">Getting Started</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Welcome to Thermal Suite. Our platform bridges the gap between physical thermal engineering and next-generation computational SaaS. Before running your first calculation, ensure your workspace is configured properly.
            </p>
            <div className="bg-[#F7F8FA] border border-gray-200 p-6">
              <h4 className="font-bold text-[#1E1B4B] mb-3">System Requirements</h4>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
                <li>A modern web browser (Chrome 90+, Firefox 88+, Edge 90+)</li>
                <li>Stable internet connection for real-time calculation telemetry</li>
                <li>An active engineering account with a positive token balance</li>
              </ul>
            </div>
          </div>

          <hr className="border-gray-200 mb-20" />

          {/* Section 2: Dashboard Overview */}
          <div id="dashboard-overview" className="mb-20 scroll-mt-32">
            <h2 className="text-3xl font-bold text-[#1E1B4B] mb-6 tracking-tight">Dashboard Overview</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Your dashboard is the central command center for all your thermal engineering projects. Upon logging in, you will be presented with a real-time overview of your computational telemetry, token ledger, and recent calculation reports.
            </p>

            <div className="bg-[#1E1B4B] p-1 shadow-xl mb-8 border border-gray-200">
              <div className="w-full h-[300px] bg-[#110f2a] flex items-center justify-center relative overflow-hidden">
                <span className="text-white/30 font-mono text-sm tracking-widest border border-white/10 px-4 py-2">DASHBOARD_INTERFACE_PREVIEW</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-[#1E1B4B] mb-4">Key Dashboard Areas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-[#F7F8FA] border border-gray-200 hover:border-[#5648FC]/30 transition-colors">
                <h4 className="font-bold text-[#1E1B4B] mb-2 flex items-center gap-2">
                  <LayoutDashboard size={18} className="text-[#5648FC]" /> Active Projects
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">View and resume your recent coil selections and thermodynamic models without losing state.</p>
              </div>
              <div className="p-6 bg-[#F7F8FA] border border-gray-200 hover:border-[#5648FC]/30 transition-colors">
                <h4 className="font-bold text-[#1E1B4B] mb-2 flex items-center gap-2">
                  <CreditCard size={18} className="text-[#5648FC]" /> Token Ledger
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">Monitor your real-time computational token balance and view historical deduction logs.</p>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 mb-20" />

          {/* Section 3: Purchasing and Tokens */}
          <div id="purchasing-tokens" className="mb-20 scroll-mt-32">
            <h2 className="text-3xl font-bold text-[#1E1B4B] mb-6 tracking-tight">Purchasing & Managing Tokens</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Thermal Suite operates on a transparent token-based ecosystem. Instead of rigid monthly tiers, you only pay for the exact computational power you consume.
            </p>

            <div className="bg-[#E8F5E9] border border-[#10B981]/30 p-6 mb-8 flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 bg-[#10B981] text-white flex items-center justify-center font-bold text-xs">i</div>
              </div>
              <div>
                <h4 className="font-bold text-[#065F46] mb-1">Pro Tip: Auto-Top Up</h4>
                <p className="text-sm text-[#065F46]/80 leading-relaxed">
                  We highly recommend enabling the "Auto-Top Up" feature in your billing settings to prevent calculation interruptions when running complex batch simulations.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-[#1E1B4B] mb-4">How to purchase tokens:</h3>
            <ol className="flex flex-col gap-4 mb-10">
              <li className="flex items-center gap-4 bg-white border border-gray-200 p-4">
                <div className="w-8 h-8 bg-[#F7F8FA] border border-gray-200 text-[#1E1B4B] font-bold flex items-center justify-center text-sm">1</div>
                <span className="text-gray-600 font-medium">Navigate to the <strong>Billing & Tokens</strong> tab in the left-hand navigation of your dashboard.</span>
              </li>
              <li className="flex items-center gap-4 bg-white border border-gray-200 p-4">
                <div className="w-8 h-8 bg-[#F7F8FA] border border-gray-200 text-[#1E1B4B] font-bold flex items-center justify-center text-sm">2</div>
                <span className="text-gray-600 font-medium">Click the <strong className="text-[#5648FC]">"Top Up Balance"</strong> button located in the top right corner.</span>
              </li>
              <li className="flex items-center gap-4 bg-white border border-gray-200 p-4">
                <div className="w-8 h-8 bg-[#F7F8FA] border border-gray-200 text-[#1E1B4B] font-bold flex items-center justify-center text-sm">3</div>
                <span className="text-gray-600 font-medium">Select your desired token package (e.g., 50k, 100k, or Custom Enterprise Volume).</span>
              </li>
              <li className="flex items-center gap-4 bg-white border border-gray-200 p-4">
                <div className="w-8 h-8 bg-[#F7F8FA] border border-gray-200 text-[#1E1B4B] font-bold flex items-center justify-center text-sm">4</div>
                <span className="text-gray-600 font-medium">Complete the secure checkout using Credit Card, UPI, or Invoice (for Enterprise clients).</span>
              </li>
            </ol>

            <h3 className="text-xl font-bold text-[#1E1B4B] mb-4">Understanding Token Deductions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-[#F7F8FA]">
                    <th className="border border-gray-200 px-6 py-4 text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">Calculation Type</th>
                    <th className="border border-gray-200 px-6 py-4 text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">Base Weight</th>
                    <th className="border border-gray-200 px-6 py-4 text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-6 py-4 text-sm font-medium text-gray-700">Basic Unit Conversion</td>
                    <td className="border border-gray-200 px-6 py-4 text-sm font-mono text-[#5648FC]">0 Tokens</td>
                    <td className="border border-gray-200 px-6 py-4 text-sm text-gray-500">Free forever on all tiers.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-6 py-4 text-sm font-medium text-gray-700">Standard Coil Selection</td>
                    <td className="border border-gray-200 px-6 py-4 text-sm font-mono text-[#5648FC]">10 Tokens</td>
                    <td className="border border-gray-200 px-6 py-4 text-sm text-gray-500">Standard HVAC fluid dynamic calculation.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-6 py-4 text-sm font-medium text-gray-700">Complex Fluid Cooler Export</td>
                    <td className="border border-gray-200 px-6 py-4 text-sm font-mono text-[#5648FC]">50 Tokens</td>
                    <td className="border border-gray-200 px-6 py-4 text-sm text-gray-500">Full PDF specification and raw data export.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <hr className="border-gray-200 mb-20" />

          {/* Section 4: Running Calculations */}
          <div id="running-calculations" className="mb-20 scroll-mt-32">
            <h2 className="text-3xl font-bold text-[#1E1B4B] mb-6 tracking-tight">Running Calculations</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Thermal Suite’s Zero-Latency Engine allows you to input thermodynamics parameters and receive physical hardware selection matches instantly.
            </p>
            <div className="bg-[#F7F8FA] border border-gray-200 p-6 flex flex-col gap-3">
              <p className="text-sm text-gray-600"><strong>1. Select Suite:</strong> Choose between Coil Selection, Fluid Coolers, or Cold Storage.</p>
              <p className="text-sm text-gray-600"><strong>2. Input Metrics:</strong> Enter Airside Data, Waterside Data, and physical dimension limitations.</p>
              <p className="text-sm text-gray-600"><strong>3. Execute:</strong> Click "Calculate." Tokens will be deducted only upon a successful result generation.</p>
            </div>
          </div>

          <hr className="border-gray-200 mb-20" />

          {/* Section 5: Exporting Reports */}
          <div id="exporting-reports" className="mb-20 scroll-mt-32">
            <h2 className="text-3xl font-bold text-[#1E1B4B] mb-6 tracking-tight">Exporting Reports</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Generate enterprise-grade, client-ready engineering reports directly from your successful calculations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 p-6 text-center">
                <FileText size={32} className="text-[#1E1B4B] mx-auto mb-4" />
                <h4 className="font-bold text-[#1E1B4B] mb-2">PDF Datasheets</h4>
                <p className="text-sm text-gray-500">Download formatted datasheets containing theoretical performance graphs and hardware specs.</p>
              </div>
              <div className="bg-white border border-gray-200 p-6 text-center">
                <Settings size={32} className="text-[#5648FC] mx-auto mb-4" />
                <h4 className="font-bold text-[#1E1B4B] mb-2">CSV / ERP Data</h4>
                <p className="text-sm text-gray-500">Export raw comma-separated data to directly inject into your internal CAD or ERP software.</p>
              </div>
            </div>
          </div>

          {/* Footer Pagination style buttons */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
            <Link href="#dashboard-overview" className="flex items-center gap-2 text-gray-500 hover:text-[#1E1B4B] font-medium text-sm transition-colors">
              Back to Top
            </Link>
            <Link href="/get-started" className="flex items-center gap-2 text-[#5648FC] hover:text-[#1E1B4B] font-bold text-sm transition-colors group">
              Start your free trial
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
}