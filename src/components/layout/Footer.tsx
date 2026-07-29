import Link from "next/link";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 pt-20 pb-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">

          {/* Logo & Contact Info */}
          <div className="lg:col-span-2 flex flex-col pr-0 lg:pr-8">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/" className="inline-flex items-center relative z-50">
                <img
                  src="/logod.png"
                  alt="Thermal Suite Logo"
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </Link>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs">
              Enterprise-grade thermal coils and token-powered computational tools for precision engineering across India.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={18} className="text-[#5648FC]" />
                <span className="text-sm font-medium">support@thermalsuite.in</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone size={18} className="text-[#5648FC]" />
                <span className="text-sm font-medium">+91 (124) 4890-4400</span>
              </div>
            </div>
          </div>

          {/* Company & Insights */}
          <div className="flex flex-col">
            <h4 className="font-bold text-[#1E1B4B] mb-6 uppercase tracking-wider text-xs">Company</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/pricing" className="text-sm text-gray-500 hover:text-[#5648FC] transition-colors">Pricing & Tokens</Link></li>
              <li><Link href="/careers" className="text-sm text-gray-500 hover:text-[#5648FC] transition-colors">Careers</Link></li>
              <li><Link href="/blogs" className="text-sm text-gray-500 hover:text-[#5648FC] transition-colors">Engineering Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-500 hover:text-[#5648FC] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Platform & Hardware */}
          <div className="flex flex-col">
            <h4 className="font-bold text-[#1E1B4B] mb-6 uppercase tracking-wider text-xs">Platform</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/component-unit" className="text-sm text-gray-500 hover:text-[#5648FC] transition-colors">Component Units</Link></li>
              <li><Link href="/documentation" className="text-sm text-gray-500 hover:text-[#5648FC] transition-colors">Documentation</Link></li>
              <li><Link href="/login" className="text-sm text-gray-500 hover:text-[#5648FC] transition-colors">Workspace Login</Link></li>
              <li><Link href="/get-started" className="text-sm text-gray-500 hover:text-[#5648FC] transition-colors">Free Trial</Link></li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="flex flex-col">
            <h4 className="font-bold text-[#1E1B4B] mb-6 uppercase tracking-wider text-xs">Legal</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/terms-of-service" className="text-sm text-gray-500 hover:text-[#5648FC] transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-[#5648FC] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="text-sm text-gray-500 hover:text-[#5648FC] transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="w-full border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-gray-500 font-medium">
            Copyright © 2026 Thermal Suite. All Rights Reserved. Gurugram, Haryana.
          </div>

          <div className="flex items-center gap-3">
            <a href="#" className="w-10 h-10 bg-[#F7F8FA] border border-gray-200 flex items-center justify-center text-[#1E1B4B] hover:bg-[#5648FC] hover:text-white transition-colors rounded-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 bg-[#F7F8FA] border border-gray-200 flex items-center justify-center text-[#1E1B4B] hover:bg-[#5648FC] hover:text-white transition-colors rounded-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 bg-[#F7F8FA] border border-gray-200 flex items-center justify-center text-[#1E1B4B] hover:bg-[#5648FC] hover:text-white transition-colors rounded-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}