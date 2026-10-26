"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

type Anim = typeof import("@/lib/site-animations");
let lib: Promise<Anim> | null = null;
const load = () => (lib ??= import("@/lib/site-animations"));

// Runs the original site's animations and page transitions on top of Next.js routing
// (this replaces Barba.js from the Webflow version).
export default function SiteEffects() {
  const pathname = usePathname();
  const router = useRouter();

  // New page rendered -> enter animation (first load uses the "once" flow)
  useEffect(() => {
    let alive = true;
    load().then((m) => {
      if (!alive) return;
      if (document.documentElement.dataset.siteReady) m.enter(pathname);
      else {
        document.documentElement.dataset.siteReady = "true";
        m.once(pathname);
      }
    });
    return () => {
      alive = false;
    };
  }, [pathname]);

  // Internal link clicked -> leave animation, then navigate
  useEffect(() => {
    let busy = false;
    const onClick = async (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      // Menu toggle and form-submit buttons are <a> tags in the original markup but must not navigate;
      // their own handlers (in site-animations) still run.
      if (a.matches(".button-040.is--nav") || a.hasAttribute("data-form-submit")) {
        e.preventDefault();
        return;
      }
      const href = a.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        a.hasAttribute("target") ||
        a.hasAttribute("download") ||
        a.hasAttribute("data-barba-prevent") ||
        a.hasAttribute("data-form-submit")
      )
        return;
      const url = new URL(a.href, location.href);
      if (url.host !== location.host) return;
      // preventDefault only: Next's <Link> skips defaulted clicks, while the original per-link
      // handlers (e.g. closing the menu) still run.
      e.preventDefault();
      if (busy || url.pathname === location.pathname) return;
      busy = true;
      try {
        const m = await load();
        await m.leave();
      } finally {
        router.push(url.pathname + url.search + url.hash);
        busy = false;
      }
    };
    // capture so we run before Next's own <Link> handler
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
