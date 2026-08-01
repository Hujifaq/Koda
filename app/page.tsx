"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "./components/Navbar";
import { Marquee } from "./components/Marquee";
import { Popular } from "./components/Popular";
import { NewCourses } from "./components/NewCourses";
import { Curated } from "./components/Curated";
import { Features } from "./components/Features";
import { FAQ } from "./components/FAQ";
import { CTABanner } from "./components/CTABanner";
import { Footer } from "./components/Footer";
import Link from "next/link";
import RotatingText from "./components/RotatingText";


gsap.registerPlugin(ScrollTrigger);

const avatars = [
  "https://images.unsplash.com/photo-1783881210962-1119b54ce6a4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1785088559550-23875679b825?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI4fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1780676384896-6ff19e8631d1?q=80&w=719&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];


function Hero() {
  const pathRef = useRef<SVGPathElement>(null);
  const arcRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const dotsTopRef = useRef<SVGGElement>(null);
  const dotsBottomRef = useRef<SVGGElement>(null);
  const badgeLeftRef = useRef<HTMLDivElement>(null);
  const badgeRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
   
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(pathRef.current, { strokeDashoffset: 0, duration: 0.8, delay: 0.2, ease: "power2.out" });
    }

    
    if (arcRef.current) {
      const arcLength = arcRef.current.getTotalLength();
      gsap.set(arcRef.current, 
        { strokeDasharray: arcLength, 
          strokeDashoffset: arcLength });
      gsap.to(arcRef.current, 
        { strokeDashoffset: 0, 
          duration: 1.5, 
          delay: 0.3, 
          ease: "power3.inOut" });
    }
    if (circleRef.current) {
      gsap.fromTo(circleRef.current,
        { scale: 0,
           transformOrigin: "center center" },
        { scale: 1, 
          duration: 1, 
          delay: 0.5, 
          ease: "back.out(1.5)" }
      );
    }
    if (dotsTopRef.current && dotsBottomRef.current) {
      gsap.fromTo([dotsTopRef.current, 
        dotsBottomRef.current],
        { opacity: 0, 
          scale: 0.8, 
          transformOrigin: "center center" },
        { opacity: 0.5, 
          scale: 1, 
          duration: 1, 
          delay: 0.8, 
          stagger: 0.2, 
          ease: "power2.out" }
      );
    }
    if (badgeLeftRef.current && badgeRightRef.current) {
      gsap.fromTo([badgeLeftRef.current, 
        badgeRightRef.current],
        { scale: 0, 
          opacity: 0 },
        { scale: 1, 
          opacity: 1, 
          duration: 1, 
          delay: 1, 
          stagger: 0.2, 
          ease: "elastic.out(1, 0.5)" }
      );
    }

    return () => {
    
    };
  }, []);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 pb-28 pt-16 overflow-x-hidden flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="relative z-10 flex max-w-2xl flex-col items-start text-left">
        {/* Heading */}
        <h1 className="text-[4rem] font-semibold leading-[1.12] tracking-tight">
          Level up your skills,
          <br />
          master{" "}
          <span className="relative inline-block">
            <RotatingText
              texts={['React', 'Next.js', 'coding', 'yourself']}
              mainClassName="inline-flex overflow-hidden text-[#03a5fc]"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
            <svg
              className="absolute -bottom-2 left-0 w-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 280 16"
              preserveAspectRatio="none"
              style={{ overflow: "visible" }}
            >
              <path
                ref={pathRef}
                d="M2 12 C 40 4, 80 18, 140 10 S 220 6, 278 11"
                stroke="#6ee7b7"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

       
        <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-zinc-900">
          Start writing code today. We've built practical, hands-on courses that actually teach you how to build real apps, not just copy-paste tutorials.
        </p>

        
        <Link href={"/courses"}
          type="button"
          className="mt-9 rounded-xl bg-black/95 px-5 py-3 text-sm font-medium text-white hover:translate-y-[-2px] transition-all duration-200 cursor-pointer"
        >
          View courses
        </Link>

       
        <div className="mt-8 flex items-center gap-3">
          <div className="flex -space-x-2">
            {avatars.map((src, i) => (
              <div
                key={src}
                className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-[#f3f3f3]"
                style={{ zIndex: 3 - i }}
              >
                <Image
                  src={src}
                  alt="Trusted user"
                  fill
                  className="object-cover object-center"
                  sizes="36px"
                />
              </div>
            ))}
          </div>
          <p className="text-sm text-zinc-600">
            Trusted by over 200k users.
          </p>
        </div>
      </div>

      
      <div className="hidden md:flex relative w-full max-w-[500px] aspect-square items-center justify-center">
        
        <svg
          className="absolute inset-0 w-full h-full z-0"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
         
          <path
            ref={arcRef}
            d="M 80 460 A 260 260 0 1 1 460 250"
            stroke="#d4c5b4"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          
          <circle ref={circleRef} cx="250" cy="270" r="195" fill="#f0eae3" />
          
          <g ref={dotsTopRef} opacity="0.5">
            {[0, 1, 2, 3, 4].map(row =>
              [0, 1, 2, 3, 4].map(col => (
                <circle key={`tl-${row}-${col}`} cx={60 + col * 14} cy={60 + row * 14} r="2.5" fill="#a89484" />
              ))
            )}
          </g>
          
          <g ref={dotsBottomRef} opacity="0.5">
            {[0, 1, 2, 3, 4].map(row =>
              [0, 1, 2, 3, 4].map(col => (
                <circle key={`br-${row}-${col}`} cx={350 + col * 14} cy={370 + row * 14} r="2.5" fill="#a89484" />
              ))
            )}
          </g>
        </svg>

       
        <Image
          src="/person1.svg"
          alt="Invest in yourself"
          fill
          className="object-contain z-10"
        />

        
        <div ref={badgeLeftRef} className="absolute top-1/4 -left-4 z-20 flex items-center gap-3 bg-white px-4 py-2.5 rounded-full shadow-lg border border-gray-100">
          <div className="bg-[#00b574] p-2 rounded-full text-white">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="14" width="14" xmlns="http://www.w3.org/2000/svg"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight">5K</span>
            <span className="text-[10px] text-gray-500 font-medium">Online Classes</span>
          </div>
        </div>

       
        <div ref={badgeRightRef} className="absolute top-12 -right-4 z-20 flex items-center gap-3 bg-white px-4 py-2.5 rounded-full shadow-lg border border-gray-100">
          <div className="bg-[#ff4f4f] p-2 rounded-full text-white">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="14" width="14" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight">250K</span>
            <span className="text-[10px] text-gray-500 font-medium">Online Tutors</span>
          </div>
        </div>
      </div>
    </section>
  );
}


export default function Home() {
  return (
    <div className="bg-[#fcfbf7] text-black">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Popular />
        <NewCourses />
        <Curated />
        <Features />
        <FAQ />
        <CTABanner />
       
        <Footer />
      </main>
    </div>
  );
}
