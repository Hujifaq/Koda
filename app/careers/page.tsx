"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { JellyCursor } from "../components/JellyCursor";
import TextGradientScroll from "../components/TextGradientScroll";
import SliderSection from "../components/SliderSection";
import SvgDraw from "../components/SvgDraw";

// Dynamically import ZoomParallax to avoid SSR issues with framer-motion
const ZoomParallaxSection = dynamic(() => import("../components/ZoomParallax"), { ssr: false });

export default function CareersPage() {
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const maskTextRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const maskContainerRef = useRef<HTMLDivElement>(null);
  const missionContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const tl = gsap.timeline();

    // 1. Text Reveal Animation (Slide up and fade in)
    tl.fromTo(
      text1Ref.current,
      { y: 150, opacity: 0, rotateZ: 5 },
      {
        y: 0,
        opacity: 1,
        rotateZ: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
      }
    )
    .fromTo(
      [text2Ref.current, maskTextRef.current],
      { y: 150, opacity: 0, rotateZ: 5 },
      {
        y: 0,
        opacity: 1,
        rotateZ: 0,
        duration: 1.2,
        ease: "power4.out",
      },
      "<0.15"
    )
    .fromTo(
        subTextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.6"
      );

    // 2. Mission Section Scroll Animations
    if (missionContainerRef.current) {
      // Underline animation
      gsap.fromTo(
        ".mission-path",
        { strokeDasharray: 500, strokeDashoffset: 500 },
        {
          strokeDashoffset: 0,
          duration: 2.5,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: missionContainerRef.current,
            start: "top 75%",
          }
        }
      );

      // Bouncy hoverable items reveal
      gsap.fromTo(
        ".mission-item",
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: missionContainerRef.current,
            start: "top 75%",
          }
        }
      );
    }
  });

  return (
    <div className="bg-[#f5f4ee] text-black relative">
      <JellyCursor />

      
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <Navbar />
      </div>
      
     
      <div className="sticky top-0 w-full h-screen flex flex-col z-0 overflow-hidden bg-[#f5f4ee]">
        
        
        <div 
          ref={maskContainerRef}
          className="absolute inset-0 z-20 pointer-events-none bg-[#6c6bc2] flex flex-col overflow-hidden"
          style={{
            clipPath: "circle(var(--mask-radius, 0px) at var(--jelly-x, 50vw) var(--jelly-y, 50vh))",
            "--mask-radius": "0px"
          } as any}
        >
         
          <div className="opacity-0"><Navbar /></div>
          
          <div className="flex-1 flex flex-col items-center justify-center relative w-full px-6">
            <div className="text-center font-medium tracking-tight text-gray-700 leading-[1.05] z-10 flex flex-col items-center relative">
              <div className="overflow-hidden pb-2 md:pb-4 opacity-0 pointer-events-none">
                <div className="text-[4rem] md:text-[8rem] transform origin-bottom-left">
                  We are
                </div>
              </div>
              
            </div>
            {/* Fake Subtext */}
            <div className="mt-6 md:mt-10 max-w-md mx-auto text-[15px] md:text-[18px] opacity-0 pointer-events-none">
              Koda is a global learning platform that helps individuals connect with real knowledge — in every field, and on their terms.
            </div>
          </div>
        </div>

        {/* Fake Navbar to maintain layout for the real hero text */}
        <div className="opacity-0 pointer-events-none"><Navbar /></div>

        <div className="flex-1 flex flex-col items-center justify-center relative w-full px-6 z-10">

          {/* Big Heading Text */}
          <div 
            className="text-center font-medium tracking-tight text-[#1a1a1a] leading-[1.05] flex flex-col items-center relative" >
            <div className="overflow-hidden pb-2 md:pb-4 pointer-events-none">
              <div ref={text1Ref} className="text-[4rem] md:text-[8rem] transform origin-bottom-left">
                We are
              </div>
            </div>
            <div className="overflow-hidden pb-2 md:pb-4 pointer-events-none">
              <div ref={text2Ref} className="text-[8rem] md:text-[16rem] transform origin-bottom-left">
                Koda
              </div>
            </div>
          </div>

          {/* Subtext */}
          <div
            ref={subTextRef}
            className="mt-6 md:mt-10 text-center text-zinc-600 text-[15px] md:text-[18px] max-w-md mx-auto leading-relaxed z-10"
          >
            Koda is a global learning platform that helps individuals connect with real knowledge — in every field, and on their terms.
          </div>

        </div>
      </div>

      {/* 
        GREEN OVERLAPPING SECTION 
        It sits in normal document flow below the 100vh sticky hero. 
        As the user scrolls, it moves up (z-10) and overlaps the hero (z-0).
      */}
      <div className="relative z-10 w-full bg-[#6ee7b7] rounded-t-[40px] rounded-b-[40px] md:rounded-t-[60px] -mt-6 md:-mt-12 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        
        {/* ZOOM PARALLAX — fills 300vh inside the green section */}
        

        {/* MISSION CONTENT */}
        <div ref={missionContainerRef} className="py-24 md:py-32 px-6 md:px-12 max-w-6xl mx-auto flex flex-col items-center text-center">
          <h2 className="mission-item text-[2.5rem] md:text-[4rem] font-bold text-[#1a4a1f] mb-8 leading-tight">
            Our <span className="relative inline-block">
              Mission
              {/* Hand-drawn underline SVG */}
              <svg className="absolute w-full h-[16px] -bottom-2 left-0 z-[1]" viewBox="0 0 200 20" preserveAspectRatio="none" fill="none">
                <path
                  className="mission-path"
                  d="M 5 15 Q 100 0 195 15"
                  stroke="#163d1a"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="mission-item text-[#2a6631] text-[17px] md:text-[22px] leading-relaxed max-w-2xl mb-20 font-medium">
            We believe that high-quality education should be accessible to everyone. Our platform breaks down barriers and opens doors to new opportunities.
          </p>

          <div className="grid md:grid-cols-3 gap-12 text-left w-full">
            <div className="mission-item flex flex-col gap-3 bg-white px-8 py-8 rounded-lg shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-[#163d1a]">Accessible Education</h3>
              <p className="text-[#2a6631] leading-relaxed">
                We believe that high-quality education should be available to everyone, regardless of background or location.
              </p>
            </div>
            <div className="mission-item flex flex-col gap-3 bg-white px-8 py-8 rounded-lg shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-[#163d1a]">Expert-Led Learning</h3>
              <p className="text-[#2a6631] leading-relaxed">
                Every course is crafted by industry professionals who bring real-world experience into every lesson.
              </p>
            </div>
            <div className="mission-item flex flex-col gap-3 bg-white px-8 py-8 rounded-lg shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-[#163d1a]">Community First</h3>
              <p className="text-[#2a6631] leading-relaxed">
                Join a thriving community of learners and mentors. Grow together, share insights, and build connections.
              </p>
            </div>
          </div>
        </div>
        <ZoomParallaxSection />
        
        {/* TEXT GRADIENT SCROLL SECTION */}
        <TextGradientScroll text="Our mission is to make international research feel simple, efficient, and deeply human. We blend cultural intelligence with operational precision to deliver insights that move business forward. With a lean, expert-led model and a truly global network, we're not just here to manage research — we're here to help you make smarter decisions through deep, nuanced understanding." /> 
        {/* SWIPER SLIDER SECTION */}
      <SliderSection />
      </div>
      <SvgDraw />

     

      {/* FOOTER */}
      <div className="relative z-10 bg-white">
        <Footer />
      </div>

    </div>
  );
}
