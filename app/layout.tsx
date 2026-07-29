import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Thermal Suite | Engineering Software Solutions",
  description: "Industrial-grade thermal engineering calculators and physical component selection software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-[#F7F8FA] text-gray-900 selection:bg-[#5648FC] selection:text-white`}>
        {children}
      </body>
    </html>
  );
}