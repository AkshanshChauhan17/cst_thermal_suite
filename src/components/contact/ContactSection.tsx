// app/contact/page.tsx
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section className="w-full min-h-screen flex flex-col lg:flex-row bg-white">
      
      {/* Left Side - Static Server Rendered Contact Info */}
      <div className="w-full lg:w-5/12 bg-[#1E1B4B] p-8 md:p-16 lg:p-20 flex flex-col justify-between relative overflow-hidden">
        
        {/* Background Blur Elements */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-[#5648FC] rounded-full blur-[120px] opacity-20"></div>
          <div className="absolute top-[10%] -left-[20%] w-[60%] h-[60%] bg-[#86EFAC] rounded-full blur-[120px] opacity-10"></div>
        </div>

        <div className="relative z-10">
          <div className="inline-block bg-[#5648FC]/20 border border-[#5648FC]/50 text-[#86EFAC] text-xs font-bold tracking-widest uppercase px-4 py-1.5 mb-6">
            Get in Touch
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            Contact Our Support Team
          </h1>
          
          <p className="text-gray-400 text-lg mb-12 max-w-md leading-relaxed">
            Whether you need custom coil selection support, enterprise billing assistance, or technical documentation queries, our team responds within 2 hours.
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#5648FC]/20 border border-[#5648FC]/50 flex items-center justify-center flex-shrink-0 mt-1">
                <MapPin size={20} className="text-[#86EFAC]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Headquarters</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Cyber City, DLF Phase 2, Sector 24, Gurugram, Haryana 122002
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#5648FC]/20 border border-[#5648FC]/50 flex items-center justify-center flex-shrink-0 mt-1">
                <Mail size={20} className="text-[#86EFAC]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Direct Email</h3>
                <p className="text-gray-400 text-sm">support@thermalsuite.in | enterprise@thermalsuite.in</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#5648FC]/20 border border-[#5648FC]/50 flex items-center justify-center flex-shrink-0 mt-1">
                <Phone size={20} className="text-[#86EFAC]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Telephone Support</h3>
                <p className="text-gray-400 text-sm">+91 (124) 4890-4400 (Mon - Sat, 9am - 7pm IST)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-16 pt-8 border-t border-gray-700/50">
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-[#86EFAC]" />
            <span className="text-sm text-gray-300 font-medium">Average Response Time: <strong className="text-white">Under 45 Minutes</strong></span>
          </div>
        </div>
      </div>

      {/* Right Side - Interactive Form Component */}
      <ContactForm />

    </section>
  );
}