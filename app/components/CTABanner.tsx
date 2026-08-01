"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CTABanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);
  const triangleRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      // Two circles scale up with elastic bounce
      tl.fromTo(
        [circle1Ref.current, circle2Ref.current],
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          delay: 0.5,
          ease: "elastic.out(1.2, 0.5)",
        },
        0
      )
      // Orange rectangle drops in
      .fromTo(
        orangeRef.current,
        { y: -80, 
          opacity: 0 },
        { y: 0, opacity: 1, delay: 0.5, duration: 0.7, ease: "back.out(1.5)" },
        0.1
      )
      // Triangle scales up from bottom-right
      .fromTo(
        triangleRef.current,
        { scale: 0, 
          opacity: 0, 
          delay: 0.5, 
          transformOrigin: "bottom right" },
        { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.5)" },
        0.2
      )
      // Text reveal — slide up
      .fromTo(
        headlineRef.current,
        { y: 40, 
          opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.25
      )
      // Button reveal
      .fromTo(
        buttonRef.current,
        { y: 20,
           opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        0.45
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-16">
      <div
        ref={containerRef}
        className="relative w-full rounded-3xl bg-[#111111] overflow-hidden px-10 md:px-16 py-14 flex items-center min-h-[220px]"
      >
        {/* Left text */}
        <div className="relative z-10 max-w-xs">
          <div ref={headlineRef}>
            <h2 className="text-white text-3xl md:text-4xl font-semibold leading-tight tracking-tight mb-6">
              Start building your<br />tech career today.
            </h2>
          </div>
          <div ref={buttonRef}>
            <Link href={"courses"} className="bg-white text-black text-[12px] font-semibold px-5 py-2.5 rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-200 cursor-pointer">
              View our courses
            </Link>
          </div>
        </div>

        {/* Right geometric shapes */}
        <div className="absolute right-0 top-0 bottom-0 w-[55%] md:w-[45%] pointer-events-none">
          {/* Orange rectangle — top right corner */}
          <div
            ref={orangeRef}
            className="absolute top-0 right-0 w-[140px] h-[130px] bg-[#f9a86e] rounded-bl-3xl"
          />

          {/* Teal circle */}
          <div
            ref={circle1Ref}
            className="hidden md:block absolute top-[18%] right-[38%] w-[90px] h-[90px] rounded-full bg-[#2ee8c0]"
          />

          {/* Purple/blue circle */}
          <div
            ref={circle2Ref}
            className="hidden md:block absolute top-[45%] right-[30%] w-[65px] h-[65px] rounded-full bg-[#4b52e0]"
          />

          {/* Lime green triangle (CSS clip-path) */}
          <div
            ref={triangleRef}
            className="absolute bottom-0 right-0 w-[120px] h-[110px]"
            style={{
              background: "#c6f135",
              clipPath: "polygon(0% 100%, 100% 100%, 100% 0%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
