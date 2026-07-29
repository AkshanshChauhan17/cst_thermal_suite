export const metadata = {
  title: "Terms of Service - Thermal Suite",
  description: "Read the terms and conditions for using Thermal Suite's engineering calculation software and hardware solutions.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <section className="w-full bg-[#1E1B4B] pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-[#5648FC]/20 border border-[#5648FC]/50 text-[#86EFAC] text-xs font-bold tracking-widest uppercase px-4 py-1.5 mb-6 rounded-none">
            Legal Agreement
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-400 text-sm">
            Last updated: July 29, 2026
          </p>
        </div>
      </section>

      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-12 text-gray-700 leading-relaxed">
          
          <div>
            <h2 className="text-2xl font-bold text-[#1E1B4B] mb-4 tracking-tight">1. Acceptance of Terms</h2>
            <p>
              By accessing, registering for, or utilizing Thermal Suite software solutions, engineering calculators, or physical component units, you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a corporate entity or engineering firm, you represent that you have the legal authority to bind such entity.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1E1B4B] mb-4 tracking-tight">2. Software Usage & Computational Tokens</h2>
            <p className="mb-4">
              Thermal Suite operates on a secure, token-based computational architecture. 
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Tokens are deducted based on the complexity of thermodynamic calculations, coil selections, and report exports.</li>
              <li>Purchased tokens are non-refundable except where required by applicable Indian commercial law.</li>
              <li>Automated scraping, reverse engineering, or unauthorized batch querying of the calculation engine is strictly prohibited and will result in immediate account termination.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1E1B4B] mb-4 tracking-tight">3. Engineering Accuracy & Disclaimer</h2>
            <p>
              While Thermal Suite calculators (including Scientific, Material Weight, and Coil Selection modules) are built to rigorous industrial standards, engineering validation by a licensed professional is required prior to physical manufacturing. Thermal Suite shall not be held liable for structural failures, thermal discrepancies, or fabrication losses arising from unverified software outputs.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1E1B4B] mb-4 tracking-tight">4. Intellectual Property</h2>
            <p>
              All software interfaces, calculation models, documentation architecture, brand logos, and UI components remain the exclusive intellectual property of Thermal Suite. Unauthorized commercial distribution or white-labeling is strictly prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1E1B4B] mb-4 tracking-tight">5. Governing Law & Jurisdiction</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of India. Any legal disputes arising out of or in connection with Thermal Suite services shall be subject to the exclusive jurisdiction of the courts located in Gurugram, Haryana.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}