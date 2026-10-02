"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";
import gsap from "gsap";

export function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let animation: AnimationItem | undefined;
    let entrance: gsap.Context | undefined;
    const finishEntrance = () => {
      entrance?.revert();
      entrance = undefined;
      animation?.play();
    };

    void import("lottie-web").then(({ default: lottie }) => {
      if (disposed || !containerRef.current) return;

      animation = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: false,
        path: "/Young%20Woman%20Giving%20a%20Presentation%20Online.json",
        rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
      });

      animation.addEventListener("DOMLoaded", () => {
        if (disposed) return;
        const paths = Array.from(
          containerRef.current?.querySelectorAll<SVGPathElement>("svg path") ?? [],
        ).filter((path) => !path.closest("defs, mask, clipPath") && path.getTotalLength() > 0);

        if (paths.length === 0) {
          animation?.play();
          return;
        }

        // Freeze the first frame while drawing its SVG outlines. Reverting the
        // context restores Lottie's original styles before its playback starts.
        entrance = gsap.context(() => {
          const filledPaths = paths.filter((path) => getComputedStyle(path).stroke === "none");
          const fillOpacities = paths.map((path) => Number(getComputedStyle(path).fillOpacity));
          gsap.set(filledPaths, { stroke: "#67538f", strokeWidth: 2, strokeOpacity: 1 });
          gsap.set(paths, {
            fillOpacity: 0,
            strokeDasharray: (_index, path: SVGPathElement) => path.getTotalLength(),
            strokeDashoffset: (_index, path: SVGPathElement) => path.getTotalLength(),
          });

          gsap.timeline({ onComplete: finishEntrance })
            .to(paths, {
              strokeDashoffset: 0,
              duration: 1.1,
              stagger: { amount: 0.3 },
              ease: "power2.inOut",
            })
            .to(paths, {
              fillOpacity: (index) => fillOpacities[index],
              duration: 1.15,
              stagger: { amount: 0.35 },
              ease: "sine.inOut",
            }, "<0.1")
            .to(filledPaths, {
              strokeOpacity: 0,
              duration: 0.95,
              stagger: { amount: 0.25 },
              ease: "sine.inOut",
            }, "<0.55");
        }, containerRef);
      });
    });

    return () => {
      disposed = true;
      entrance?.revert();
      animation?.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative hidden aspect-square w-full max-w-[540px] md:block md:translate-x-14 md:translate-y-10 md:scale-150 lg:scale-160"
      role="img"
      aria-label="Young woman giving an online presentation"
    />
  );
}
