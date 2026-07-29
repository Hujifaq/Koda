"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { JellyCursor } from "./components/JellyCursor";

export default function NotFoundPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const num4_1Ref = useRef<HTMLDivElement>(null);
  const num0Ref = useRef<HTMLDivElement>(null);
  const num4_2Ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Entrance animation
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      [num4_1Ref.current, num0Ref.current, num4_2Ref.current],
      { y: -200, opacity: 0, rotateZ: -15, scale: 0.5 },
      {
        y: 0,
        opacity: 1,
        rotateZ: 0,
        scale: 1,
        duration: 1.5,
        stagger: 0.1,
        ease: "elastic.out(1, 0.4)",
        delay: 0.2
      }
    )
    .fromTo(
      textRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=1.0"
    )
    .fromTo(
      buttonRef.current,
      { y: 30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" },
      "-=0.6"
    );
  }, []);

  // Magnetic Repel Effect for the 404 numbers
  useEffect(() => {
    const numbers = [num4_1Ref.current, num0Ref.current, num4_2Ref.current];
    
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      numbers.forEach((num) => {
        if (!num) return;
        
        const rect = num.getBoundingClientRect();
        const numX = rect.left + rect.width / 2;
        const numY = rect.top + rect.height / 2;
        
        const distX = mouseX - numX;
        const distY = mouseY - numY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        // Repel threshold
        const maxDist = 200;
        
        if (distance < maxDist) {
          // Calculate push strength (closer = stronger push)
          const strength = (maxDist - distance) / maxDist;
          
          // Push away from mouse
          const moveX = -(distX / distance) * (strength * 40);
          const moveY = -(distY / distance) * (strength * 40);
          const rotate = (distX / distance) * (strength * 15);
          
          gsap.to(num, {
            x: moveX,
            y: moveY,
            rotation: rotate,
            duration: 0.4,
            ease: "power2.out"
          });
        } else {
          // Spring back to origin
          gsap.to(num, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.4)"
          });
        }
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Magnetic button hover effect
  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    
    const handleBtnMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btn, {
        x: x * 0.3, // Move slightly towards mouse
        y: y * 0.3,
        duration: 0.4,
        ease: "power2.out"
      });
    };
    
    const handleBtnMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)"
      });
    };
    
    btn.addEventListener("mousemove", handleBtnMouseMove);
    btn.addEventListener("mouseleave", handleBtnMouseLeave);
    
    return () => {
      btn.removeEventListener("mousemove", handleBtnMouseMove);
      btn.removeEventListener("mouseleave", handleBtnMouseLeave);
    };
  }, []);

  return (
    <div className="bg-[#f5f4ee] min-h-screen flex flex-col relative text-black overflow-hidden" ref={containerRef}>
      <JellyCursor />
      
      {/* Background ambient shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-30">
        <div className="absolute w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-[#6ee7b7]/40 to-[#6c6bc2]/20 blur-[100px] transform -translate-x-1/4 -translate-y-1/4" />
        <div className="absolute w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#ec4e39]/20 to-[#6ee7b7]/30 blur-[80px] transform translate-x-1/3 translate-y-1/3" />
      </div>

      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 py-20">
        
        {/* Playful 404 Numbers */}
        <div className="flex items-center justify-center gap-2 md:gap-8 font-bold text-[10rem] md:text-[22rem] leading-none tracking-tighter text-[#1a1a1a]">
          <div ref={num4_1Ref} className="cursor-none select-none transform will-change-transform drop-shadow-2xl text-[#6c6bc2]">4</div>
          <div ref={num0Ref} className="cursor-none select-none transform will-change-transform drop-shadow-2xl text-[#f7c53f]">0</div>
          <div ref={num4_2Ref} className="cursor-none select-none transform will-change-transform drop-shadow-2xl text-[#6ee7b7]">4</div>
        </div>
        
        <div ref={textRef} className="mt-8 flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">
            Looks like you're lost.
          </h1>
          <p className="text-zinc-500 text-lg md:text-xl text-center max-w-md mb-12 leading-relaxed">
            The page you're looking for has drifted into the void. Let's get you back on track.
          </p>
          
          <Link 
            href="/" 
            ref={buttonRef}
            className="inline-flex items-center justify-center px-8 py-4 bg-[#1a1a1a] text-white rounded-full font-medium text-lg hover:bg-[#333] transition-colors will-change-transform shadow-lg"
          >
            Take Me Home
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </main>
      
      <div className="relative z-10 bg-white">
        <Footer />
      </div>
    </div>
  );
}
