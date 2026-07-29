"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiZap, FiAperture, FiSun, FiHexagon, FiCompass, FiArrowUpRight, FiAward } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export function Curated() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  
  // Bezier curve divider
  const dividerRef = useRef<HTMLDivElement>(null);
  const curvePathRef = useRef<SVGPathElement>(null);
  // mutable ref for the control-point position (avoids re-renders)
  const cpRef = useRef({ cx: 50, cy: 10 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Underline animation
      const paths = gsap.utils.toArray<SVGPathElement>(".curated-path");
      paths.forEach((path) => {
        gsap.fromTo(
          path,
          { strokeDasharray: 500, strokeDashoffset: 500 },
          {
            strokeDashoffset: 0,
            duration: 2.5,
            delay: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            }
          }
        );
      });

      // Badge bounce animation
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
            delay: 0.3,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
            }
          }
        );
      }
      // Text Reveal Animation
      const textElements = gsap.utils.toArray(".curated-reveal");
      if (textElements.length > 0) {
        gsap.fromTo(
          textElements,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Bezier curve mouse handlers
  const handleDividerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!curvePathRef.current || !dividerRef.current) return;
    const rect = dividerRef.current.getBoundingClientRect();
    const cx = ((e.clientX - rect.left) / rect.width) * 100;
    const cy = 10 + (e.clientY - rect.top - rect.height / 2) * 0.5; // dampen pull
    cpRef.current = { cx, cy };
    curvePathRef.current.setAttribute('d', `M 0 10 Q ${cx} ${cy} 100 10`);
  };

  const handleDividerMouseLeave = () => {
    if (!curvePathRef.current) return;
    gsap.to(cpRef.current, {
      cx: 50,
      cy: 10,
      duration: 1.5,
      ease: "elastic.out(2.5, 0.2)",
      onUpdate: () => {
        if (curvePathRef.current) {
          curvePathRef.current.setAttribute(
            'd',
            `M 0 10 Q ${cpRef.current.cx} ${cpRef.current.cy} 100 10`
          );
        }
      },
    });
  };

  return (
    <section ref={containerRef} className="w-full max-w-7xl mx-auto px-6 md:px-2 py-16 md:py-24 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 mb-16 md:mb-24">

        {/* Left Content */}
        <div className="w-full md:w-1/2">
          {/* Desktop Heading */}
          <h2 className="hidden md:block text-[3.5rem] leading-[1.1] font-medium tracking-tight text-[#1a1a1a] mb-6">
            <div className="overflow-hidden py-1"><div className="curated-reveal">Curated to <span className="relative inline-block">
              help you
              {/* Hand-drawn underline SVG */}
              <svg className="absolute w-full h-[12px] -bottom-1 left-0 z-[1]" viewBox="0 0 200 20" preserveAspectRatio="none" fill="none">
                <path
                  className="curated-path"
                  d="M 5 15 Q 100 0 195 15"
                  stroke="#5ef3b6"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              </svg>
            </span></div></div>
            <div className="overflow-hidden py-1"><div className="curated-reveal">be smarter,</div></div>
            <div className="overflow-hidden py-1"><div className="curated-reveal">more responsible financially.</div></div>
          </h2>

          {/* Mobile Heading */}
          <h2 className="block md:hidden text-[2.5rem] sm:text-[3rem] leading-[1.15] font-medium tracking-tight text-[#1a1a1a] mb-6">
            <div className="overflow-hidden py-1"><div className="curated-reveal">Curated to <span className="relative inline-block">
              help you
              <svg className="absolute w-full h-[12px] -bottom-1 left-0 z-[1]" viewBox="0 0 200 20" preserveAspectRatio="none" fill="none">
                <path className="curated-path" d="M 5 15 Q 100 0 195 15" stroke="#5ef3b6" strokeWidth="10" strokeLinecap="round" />
              </svg>
            </span> be</div></div>
            <div className="overflow-hidden py-1"><div className="curated-reveal">smarter, more responsible</div></div>
            <div className="overflow-hidden py-1"><div className="curated-reveal">financially.</div></div>
          </h2>

          <div className="overflow-hidden py-1">
            <p className="curated-reveal text-[#4a4a4a] text-sm md:text-base leading-relaxed max-w-md mb-8">
              We use the latest technologies and tools backed by industry experts that will help secure you dream universities, jobs and set you up for the future.
            </p>
          </div>
          <div className="curated-reveal">
            <button className="bg-[#111111] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:translate-y-[-4px] transition-all transform duration-200 cursor-pointer">
              Learn about us
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 flex justify-center relative ml-9 md:ml-0">
          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-[#c2f866] rounded-full flex items-center justify-center">
            <Image
              src="/man.svg"
              alt="Happy student"
              fill
              className="object-cover rounded-full"
            />
          </div>

          {/* Floating Badge */}
          <div ref={badgeRef} className="absolute left-[-20px] top-[60%] transform -translate-y-1/2 bg-white px-5 py-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 z-10">
            <div className="text-[#5b61d6]">
              <FiAward className="text-2xl" />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-gray-900 leading-tight">Mark Henry</span>
              <span className="text-[10px] font-medium text-gray-500">Now working at <span className="text-[#5b61d6] font-bold">JP Morgan</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Logos — Bezier Curve Divider */}
      <div
        ref={dividerRef}
        className="relative pt-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4"
        onMouseMove={handleDividerMouseMove}
        onMouseLeave={handleDividerMouseLeave}
        
      >
        {/* Interactive SVG bezier line */}
        <div className="absolute top-0 left-0 w-full" style={{ height: '30px', marginTop: '-15px' }}>
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
          >
            <path
              ref={curvePathRef}
              d={`M 0 10 Q 50 10 100 10`}
              stroke="#0c0c0cff"
              strokeWidth="0.4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p className="text-[10px] text-black/80 font-medium max-w-[120px] leading-tight">
          Used by leading financial companies to train their employees.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-black/60">
          <div className="flex items-center gap-2 font-bold text-sm md:text-lg transition-colors">
            <FiZap className="text-2xl" /> Proline
          </div>
          <div className="flex items-center gap-2 font-bold text-sm md:text-lg transition-colors">
            <FiAperture className="text-2xl" /> Vertigo
          </div>
          <div className="flex items-center gap-2 font-bold text-sm md:text-lg transition-colors">
            <FiSun className="text-2xl" /> Sitemark
          </div>
          <div className="flex items-center gap-2 font-bold text-sm md:text-lg transition-colors">
            <FiHexagon className="text-2xl" /> Orbitc
          </div>
          <div className="flex items-center gap-2 font-bold text-sm md:text-lg transition-colors">
            <FiCompass className="text-2xl" /> Trace
          </div>
          <div className="flex items-center gap-2 font-bold text-sm md:text-lg transition-colors">
            <FiArrowUpRight className="text-2xl" /> Penta
          </div>
        </div>
      </div>
    </section>
  );
}
