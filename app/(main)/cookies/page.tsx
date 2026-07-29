export const metadata = {
  title: "Cookie Policy - Thermal Suite",
  description: "Understand how Thermal Suite uses cookies and tracking technologies to optimize your browsing and calculation experience.",
};

export default function Cookies() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <section className="w-full bg-[#1E1B4B] pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-[#5648FC]/20 border border-[#5648FC]/50 text-[#86EFAC] text-xs font-bold tracking-widest uppercase px-4 py-1.5 mb-6 rounded-none">
            Tracking Preferences
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-400 text-sm">
            Last updated: July 29, 2026
          </p>
        </div>
      </section>

      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-12 text-gray-700 leading-relaxed">
          
          <div>
            <h2 className="text-2xl font-bold text-[#1E1B4B] mb-4 tracking-tight">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you load a website. They are widely used to make websites work efficiently, as well as to provide reporting information to platform operators.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1E1B4B] mb-4 tracking-tight">2. How Thermal Suite Uses Cookies</h2>
            <p className="mb-4">
              We utilize cookies for essential functional and analytical purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li><strong>Authentication Cookies:</strong> To keep you logged securely into your engineering dashboard and remember your session state.</li>
              <li><strong>Preference Cookies:</strong> To remember your unit conversion settings (Metric vs. Imperial) and UI preferences.</li>
              <li><strong>Analytics Cookies:</strong> To monitor application speed, search query performance, and user navigation paths to improve our zero-latency calculation engine.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1E1B4B] mb-4 tracking-tight">3. Managing or Disabling Cookies</h2>
            <p>
              Most web browsers allow you to control cookies through their settings preferences. However, disabling essential authentication cookies may prevent you from logging into your Thermal Suite workspace or executing calculations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1E1B4B] mb-4 tracking-tight">4. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy periodically to reflect changes in technology or legal regulations. Check this page regularly for any modifications.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}