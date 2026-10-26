import type { Metadata } from "next";
import "./globals.css";
import NavGroup from "@/components/generated/NavGroup";
import SiteEffects from "@/components/SiteEffects";

export const metadata: Metadata = {
  title: "Grefton",
  description: "Landscaping and outdoor living in the UAE.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="js w-mod-js">
      <head>
        {/* Same font the original site loads through Google WebFont Loader */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <NavGroup />
        <div className="transition">
          <div data-transition-wrap="" className="transition">
            <div data-transition-dark="" className="transition__dark"></div>
          </div>
        </div>
        {children}
        <SiteEffects />
      </body>
    </html>
  );
}
