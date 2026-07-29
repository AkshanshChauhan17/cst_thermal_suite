"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
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
    label: "Thermal Suite",
    items: [
      {
        label: "Coils",
        href: "/thermal-suite/coils",
      },
      {
        label: "Products",
        href: "/thermal-suite/products",
      },
    ],
  },
  {
    label: "Component Unit",
    href: "/component-unit",
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

  const navLink =
    "text-sm font-medium text-gray-600 hover:text-[#1E1B4B] transition-colors";

  return (
    <nav className="border-b border-gray-200 bg-[#F7F8FA]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-0">

        <Link href="/" className="inline-flex items-center relative z-50">
          <img
            src="/logod.png"
            alt="Thermal Suite Logo"
            className="h-8 md:h-10 w-auto object-contain"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">

          {navigation.map((item) =>

            item.items ? (

              <div
                key={item.label}
                className="group relative"
              >
                <button className={`${navLink} flex items-center gap-1`}>

                  {item.label}

                  <ChevronDown
                    size={16}
                    className="transition-transform duration-300 group-hover:rotate-180"
                  />
                </button>

                <div className="absolute left-0 top-full hidden min-w-[260px] rounded-lg border border-gray-200 bg-white py-2 shadow-xl group-hover:block z-100">

                  {item.items.map((sub) => (

                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block px-5 py-3 text-sm hover:bg-gray-50 hover:text-[#5648FC]"
                    >
                      {sub.label}
                    </Link>

                  ))}

                </div>
              </div>

            ) : (

              <Link
                key={item.href}
                href={item.href!}
                className={`${navLink} ${pathname === item.href
                  ? "text-[#5648FC]"
                  : ""
                  }`}
              >
                {item.label}
              </Link>

            )

          )}

        </div>


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

      {mobileOpen && (

        <div className="border-t bg-white md:hidden">

          {navigation.map((item) =>

            item.items ? (

              <div key={item.label}>

                <button
                  onClick={() =>
                    setMobileDropdown(
                      mobileDropdown === item.label
                        ? null
                        : item.label
                    )
                  }
                  className="flex w-full items-center justify-between px-5 py-4"
                >
                  {item.label}

                  <ChevronDown
                    className={`transition ${mobileDropdown === item.label
                      ? "rotate-180"
                      : ""
                      }`}
                  />
                </button>

                {mobileDropdown === item.label && (

                  <div className="bg-gray-50">

                    {item.items.map((sub) => (

                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block px-10 py-3 text-sm text-gray-600"
                      >
                        {sub.label}
                      </Link>

                    ))}

                  </div>

                )}

              </div>

            ) : (

              <Link
                key={item.href}
                href={item.href!}
                className="block px-5 py-4"
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
                className={`block w-full py-3 text-center ${button.variant === "primary"
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