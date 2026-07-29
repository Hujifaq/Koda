"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMessageCircle, FiCloudOff, FiAward, FiEye, FiThumbsUp } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Underline animation
      if (pathRef.current) {
        gsap.fromTo(
          pathRef.current,
          { strokeDasharray: 500, strokeDashoffset: 500 },
          {
            strokeDashoffset: 0,
            duration: 2,
            delay:1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            }
          }
        );
      }

      // Fade up elements stagger
      const fadeElements = gsap.utils.toArray(".feature-fade-up");
      if (fadeElements.length > 0) {
        gsap.fromTo(
          fadeElements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
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

  const features = [
    {
      icon: <FiMessageCircle className="text-xl text-[#5b61d6]" />,
      title: "Get instant chat support",
      desc: "and guidance from our dedicated chat support team throughout your learning journey.",
    },
    {
      icon: <FiCloudOff className="text-xl text-[#5b61d6]" />,
      title: "Access the course offline",
      desc: "without needing internet, allowing you to learn anytime, anywhere, and at your own convenience.",
    },
    {
      icon: <FiAward className="text-xl text-[#5b61d6]" />,
      title: "Made by industry experts",
      desc: "who curated the course content with their extensive knowledge and insights.",
    },
    {
      icon: <FiEye className="text-xl text-[#5b61d6]" />,
      title: "Enjoy unlimited, lifetime access",
      desc: "to course materials, empowering you to revisit and reinforce your knowledge at any time.",
    },
    {
      icon: <FiThumbsUp className="text-xl text-[#5b61d6]" />,
      title: "Beginner-friendly courses",
      desc: "that provide a supportive and easy-to-understand learning environment.",
    },
  ];

  return (
    <section ref={containerRef} className="w-full max-w-7xl mx-auto px-6 py-24 ">
      <div className="flex flex-col items-center text-center mb-20 max-w-3xl mx-auto">
        <h2 className="feature-fade-up text-[2.5rem] md:text-[3.5rem] leading-[1.1] font-medium tracking-tight text-[#1a1a1a] mb-6">
          Everything you need, all in <span className="relative inline-block">
            one place.
            <svg className="absolute w-full h-[12px] -bottom-1 left-0 z-[-1]" viewBox="0 0 200 20" preserveAspectRatio="none" fill="none">
              <path ref={pathRef} d="M 5 15 Q 100 0 195 15" stroke="#5ef3b6" strokeWidth="10" strokeLinecap="round" />
            </svg>
          </span>
        </h2>
        
        <p className="feature-fade-up text-[#4a4a4a] text-sm md:text-base leading-relaxed mb-8 max-w-xl">
          Experience the transformative power of Filearn as you gain financial confidence, build wealth and secure a better future.
        </p>
        
        <div className="feature-fade-up">
          <Link href={"courses"} className="bg-[#111111] text-white text-[13px] font-bold px-6 py-3 rounded-xl cursor-pointer transition-all hover:translate-y-[-4px] duration-200">
            View courses
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-12 gap-y-12 md:gap-y-16">
        {features.map((feature, index) => (
          <div key={index} className="feature-fade-up flex flex-col gap-4 text-left">
            <div className="w-10 h-10 rounded-lg flex items-center justify-start">
              {feature.icon}
            </div>
            <p className="text-[#1a1a1a] text-[13px] md:text-md lg:text-lg leading-relaxed">
              <span className="font-semibold">{feature.title}</span> {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
