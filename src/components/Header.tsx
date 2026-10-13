"use client";
import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import { nav } from "@/data/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
          {nav
            .filter((n) => n.href !== "/contact")
            .map((n) => (
              <Link key={n.href} href={n.href} className="text-ink-soft transition hover:text-brand">
                {n.label}
              </Link>
            ))}
          <Link href="/contact" className="rounded-full bg-brand px-5 py-2.5 text-white transition hover:bg-brand-dark">
            Get a quote
          </Link>
        </nav>
        <button className="lg:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span className="block h-0.5 w-6 bg-foreground" />
          <span className="mt-1.5 block h-0.5 w-6 bg-foreground" />
          <span className="mt-1.5 block h-0.5 w-6 bg-foreground" />
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-black/5 px-5 pb-5 lg:hidden">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2.5 text-ink-soft">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
