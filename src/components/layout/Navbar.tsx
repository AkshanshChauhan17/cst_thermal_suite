"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const navigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Coils", 
    items: [
      { label: "Air to Air Coolers", href: "/thermal-suite/coils#coil-1" },
      { label: "Chilled Water Coils", href: "/thermal-suite/coils#coil-2" },
      { label: "DX Coils", href: "/thermal-suite/coils#coil-3" },
      { label: "Special Fluids Coils", href: "/thermal-suite/coils#coil-4" },
      { label: "Steam Heating Coils", href: "/thermal-suite/coils#coil-5" },
      { label: "Turbine Inlet Coils", href: "/thermal-suite/coils#coil-6" },
      { label: "Condenser Coils", href: "/thermal-suite/coils#coil-7" },
      { label: "Evaporator Coils", href: "/thermal-suite/coils#coil-8" },
    ],
  },
  {
    label: "Products", // Component aur Products ka single merged dropdown
    items: [
      // 10 Products ke links
      { label: "Process Cooling", href: "/thermal-suite/products#product-1" },
      { label: "Chiller Applications", href: "/thermal-suite/products#product-2" },
      { label: "Data Centers Cooling", href: "/thermal-suite/products#product-3" },
      { label: "Oil Coolers (Quenching)", href: "/thermal-suite/products#product-4" },
      { label: "Ammonia Adiabatic Cooler", href: "/thermal-suite/products#product-5" },
      { label: "Ammonia Air Cooling", href: "/thermal-suite/products#product-6" },
      { label: "Refrigeration Equipment", href: "/thermal-suite/products#product-7" },
      { label: "Heat Recovery Boiler", href: "/thermal-suite/products#product-8" },
      { label: "Oil Coolers (Hydraulic)", href: "/thermal-suite/products#product-9" },
      { label: "Advanced Selection", href: "/thermal-suite/products#product-10" },
      
      // 6 Components ke links (Ab yahan Products dropdown mein hi hain)
      { label: "Charge Air Coolers", href: "/thermal-suite/products#component-1" },
      { label: "Dry Cooler Selection", href: "/thermal-suite/products#component-2" },
      { label: "Open Cycle Cooling Tower", href: "/thermal-suite/products#component-3" },
      { label: "Remote Radiators", href: "/thermal-suite/products#component-4" },
      { label: "Turbine Inlet Cooling", href: "/thermal-suite/products#component-5" },
      { label: "Heat Recovery Exhaust", href: "/thermal-suite/products#component-6" },
    ]
  },
  {
    label: "Documentation",
    href: "/documentation",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const actions = [
  {
    label: "Log In",
    href: "/login",
    variant: "outline",
  },
  {
    label: "Get Started",
    href: "/get-started",
    variant: "primary",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  const navLink = "text-sm font-medium text-gray-600 hover:text-[#1E1B4B] transition-colors";

  // Universal Handle Scroll Function
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      
      // Agar user already usi page par hai to seedha smooth scroll karo
      if (pathname === path && hash) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          setMobileOpen(false); 
        }
      } else {
        // Agar doosre page par hai, to Next.js link handle karega
        setMobileOpen(false);
      }
    }
  };

  return (
    <nav className="border-b border-gray-200 bg-[#F7F8FA] sticky top-0 z-40">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-0">

        <Link href="/" className="inline-flex items-center relative z-50">
          <img
            src="/logod.png"
            alt="Thermal Suite Logo"
            className="h-8 md:h-10 w-auto object-contain"
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden items-center gap-8 md:flex">
          {navigation.map((item) =>
            item.items ? (
              <div key={item.label} className="group relative">
                <button className={`${navLink} flex items-center gap-1 py-2`}>
                  {item.label}
                  <ChevronDown
                    size={16}
                    className="transition-transform duration-300 group-hover:rotate-180"
                  />
                </button>

                {/* Dropdown Box - overflow aur max-height control set hai */}
                <div className="absolute left-0 top-full hidden min-w-[260px] rounded-lg border border-gray-200 bg-white py-2 shadow-xl group-hover:block z-50 max-h-[70vh] overflow-y-auto">
                  {item.items.map((sub, index) => (
                    <div key={sub.href}>
                      {/* Products list mein 10 ke baad separator divider taaki user ko components easily dikh jaye */}
                      {item.label === "Products" && index === 10 && (
                        <div className="border-t border-gray-100 my-1"></div>
                      )}
                      <Link
                        href={sub.href}
                        onClick={(e) => handleScroll(e, sub.href)} 
                        className={`block px-5 py-3 text-sm hover:bg-gray-50 hover:text-[#5648FC] ${index >= 10 && item.label === "Products" ? "font-semibold text-gray-800" : ""}`}
                      >
                        {sub.label}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className={`${navLink} ${pathname === item.href ? "text-[#5648FC]" : ""}`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="hidden items-center gap-4 md:flex">
          {actions.map((button) => (
            <Link
              key={button.href}
              href={button.href}
              className={
                button.variant === "primary"
                  ? "bg-[#0F0C29] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#1E1B4B]"
                  : "text-sm font-semibold text-[#1E1B4B]"
              }
            >
              {button.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="border-t bg-white md:hidden absolute w-full left-0 shadow-lg max-h-[80vh] overflow-y-auto">
          {navigation.map((item) =>
            item.items ? (
              <div key={item.label}>
                <button
                  onClick={() => setMobileDropdown(mobileDropdown === item.label ? null : item.label)}
                  className="flex w-full items-center justify-between px-5 py-4 font-medium"
                >
                  {item.label}
                  <ChevronDown className={`transition ${mobileDropdown === item.label ? "rotate-180" : ""}`} />
                </button>

                {mobileDropdown === item.label && (
                  <div className="bg-gray-50 border-t border-b border-gray-100">
                    {item.items.map((sub, index) => (
                      <div key={sub.href}>
                        {item.label === "Products" && index === 10 && (
                          <div className="border-t border-gray-200 my-1 mx-4"></div>
                        )}
                        <Link
                          href={sub.href}
                          onClick={(e) => handleScroll(e, sub.href)}
                          className={`block px-10 py-3 text-sm text-gray-600 hover:text-[#5648FC] ${index >= 10 && item.label === "Products" ? "font-semibold" : ""}`}
                        >
                          {sub.label}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                onClick={() => setMobileOpen(false)}
                className="block px-5 py-4 font-medium"
              >
                {item.label}
              </Link>
            )
          )}

          <div className="space-y-3 border-t p-5">
            {actions.map((button) => (
              <Link
                key={button.href}
                href={button.href}
                className={`block w-full py-3 text-center rounded-md font-semibold ${
                  button.variant === "primary"
                    ? "bg-[#0F0C29] text-white"
                    : "border border-[#0F0C29] text-[#0F0C29]"
                }`}
              >
                {button.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}