"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function TextGradientScroll({ text }: { text: string }) {
  const container = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(wordsRef.current, {
      opacity: 1,
      ease: "none",
      stagger: 0.1,
      scrollTrigger: {
        trigger: container.current,
        scrub: true,
        start: "top 75%",
        end: "bottom 60%",
      },
    });
  }, { scope: container });

  const words = text.split(" ");

  return (
    <div className="w-full flex justify-center py-24 md:py-48 px-6 md:px-12 bg-[#6ee7b7]">
      <div ref={container} className="max-w-[1400px] w-full mx-auto">
        <p className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] font-medium leading-[1.2] text-[#163d1a] m-0 selection:bg-white selection:text-[#6ee7b7]">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => {
                wordsRef.current[i] = el;
              }}
              className="opacity-20 transition-opacity duration-75"
            >
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
