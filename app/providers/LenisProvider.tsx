"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ScrollTrigger from "gsap/ScrollTrigger";

function ScrollManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lenis = useLenis();

  // Prevent browser from jerking the scroll position on back/forward, which freezes Lenis
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Refresh GSAP ScrollTrigger after a route change completes
  useEffect(() => {
    if (!lenis) return;

    // 1. Instantly reset to the top of the new page so you don't spawn at the bottom
    lenis.scrollTo(0, { immediate: true });

    // 2. Tell Lenis to recalculate its internal max-height whenever GSAP refreshes its spacers
    const onRefresh = () => {
      lenis.resize();
    };
    ScrollTrigger.addEventListener("refresh", onRefresh);

    // 3. Force GSAP to refresh slightly after the new page mounts (which triggers the resize above)
    const timeout1 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    const timeout2 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500); // Safety backup for slow images

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
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
