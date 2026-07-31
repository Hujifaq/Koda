"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ScrollTrigger from "gsap/ScrollTrigger";

function ScrollManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lenis = useLenis();

  // Prevent browser from jerking the scroll position on back/forward
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Handle route changes
  useEffect(() => {
    if (!lenis) return;

    // Reset scroll to top on route change
    lenis.scrollTo(0, { immediate: true });
    
    // Clear GSAP's scroll memory so it stops trying to jump back to the old page's scroll spot
    ScrollTrigger.clearScrollMemory("manual");
    window.scrollTo(0, 0);

    // Because next-transition-router takes 1-2 seconds to fully swap the DOM,
    // we continually force GSAP and Lenis to recalculate their heights during this window.
    const intervalId = setInterval(() => {
      ScrollTrigger.refresh();
      lenis.resize();
    }, 250);

    // Stop checking after 2.5 seconds (when the transition is 100% done)
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      ScrollTrigger.refresh();
      lenis.resize();
    }, 2500);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [pathname, searchParams, lenis]);

  return null;
}

export function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{
      lerp: 0.1,
      duration: 1.2
    }}>
      <ScrollManager />
      {children}
    </ReactLenis>
  );
}
