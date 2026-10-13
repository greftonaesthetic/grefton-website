import Link from "next/link";
import Logo from "./Logo";
import { nav, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <Logo variant="white" />
          <p className="mt-4 max-w-xs text-sm text-white/70">Landscape design, build and maintenance across the UAE.</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-brand-light">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>{site.phone}</li>
            <li>{site.email}</li>
            <li>{site.location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Grefton. All rights reserved.
      </div>
    </footer>
  );
}
