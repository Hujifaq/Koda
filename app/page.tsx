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
import { HeroAnimation } from "./components/HeroAnimation";


gsap.registerPlugin(ScrollTrigger);

const avatars = [
  "https://images.unsplash.com/photo-1783881210962-1119b54ce6a4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1785088559550-23875679b825?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI4fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1780676384896-6ff19e8631d1?q=80&w=719&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];


function Hero() {
  const pathRef = useRef<SVGPathElement>(null);
  useEffect(() => {
   
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(pathRef.current, { strokeDashoffset: 0, duration: 0.8, delay: 0.2, ease: "power2.out" });
    }

    
  }, []);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 pb-28 pt-16 flex flex-col md:flex-row items-center justify-between gap-12">
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
          Start writing code today. We&apos;ve built practical, hands-on courses that actually teach you how to build real apps, not just copy-paste tutorials.
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

      
      <HeroAnimation />
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
