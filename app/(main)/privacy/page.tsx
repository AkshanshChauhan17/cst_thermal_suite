export const metadata = {
  title: "Privacy Policy - Thermal Suite",
  description: "Learn how Thermal Suite collects, protects, and handles your professional and personal data.",
};

export default function Privacy() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <section className="w-full bg-[#1E1B4B] pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-[#5648FC]/20 border border-[#5648FC]/50 text-[#86EFAC] text-xs font-bold tracking-widest uppercase px-4 py-1.5 mb-6 rounded-none">
            Data Protection
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm">
            Last updated: July 29, 2026
          </p>
        </div>
      </section>

      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-12 text-gray-700 leading-relaxed">
          
          <div>
            <h2 className="text-2xl font-bold text-[#1E1B4B] mb-4 tracking-tight">1. Information We Collect</h2>
            <p className="mb-4">
              To provide enterprise-grade thermal engineering solutions, we collect specific data categories:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li><strong>Account Information:</strong> Full name, corporate email address, password hash, and company name.</li>
              <li><strong>Technical Metrics:</strong> Calculation inputs, coil geometry parameters, and exported report preferences.</li>
              <li><strong>Billing Data:</strong> Transaction history and token ledger updates (payment card details are processed securely via encrypted gateway partners).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1E1B4B] mb-4 tracking-tight">2. How We Use Your Data</h2>
            <p>
              Your data is strictly utilized to execute thermal calculation models, maintain your token balance, provide customer and engineering support, and send critical system status notifications regarding our computational infrastructure.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1E1B4B] mb-4 tracking-tight">3. Data Security & Encryption</h2>
            <p>
              We implement robust enterprise security protocols, including SSL/TLS encryption for data in transit and AES-256 encryption for data at rest within our Gurugram-based cloud infrastructure.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1E1B4B] mb-4 tracking-tight">4. Sharing of Information</h2>
            <p>
              We do not sell, rent, or trade your engineering data or personal identifiers to third parties. Information is only shared with verified infrastructure providers strictly required to operate our SaaS platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1E1B4B] mb-4 tracking-tight">5. Contact Our Privacy Officer</h2>
            <p>
              If you have any questions regarding your data or wish to request account data deletion, contact our privacy team at <strong>privacy@thermalsuite.in</strong>.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}