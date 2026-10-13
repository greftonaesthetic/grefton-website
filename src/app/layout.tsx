import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const body = DM_Sans({ variable: "--font-body", subsets: ["latin"] });
const display = Fraunces({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Grefton | Landscaping & Outdoor Living in the UAE",
  description:
    "Grefton designs, builds and maintains gardens, pools and outdoor spaces across the UAE, from villa gardens to hospitality and community landscapes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
