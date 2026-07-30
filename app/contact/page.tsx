"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FiUser, FiMail, FiMessageSquare, FiSend, FiMapPin, FiPhone } from "react-icons/fi";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    // Underline draw animation
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(pathRef.current, { strokeDashoffset: 0, duration: 1, delay: 0.3, ease: "power2.out" });
    }

    // Dots reveal
    if (dotsRef.current) {
      gsap.fromTo(
        dotsRef.current,
        { opacity: 0, scale: 0.5, transformOrigin: "center center" },
        { opacity: 0.6, scale: 1, duration: 1, delay: 0.5, ease: "back.out(1.5)" }
      );
    }

    // Bouncy reveal for text and form
    const tl = gsap.timeline();
    
    tl.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.5)" }
    )
    .fromTo(
      subRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(
      infoRef.current?.children ? Array.from(infoRef.current.children) : [],
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.2)" },
      "-=0.4"
    )
    .fromTo(
      formRef.current,
      { scale: 0.9, opacity: 0, y: 40 },
      { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "elastic.out(1, 0.6)" },
      "-=0.8"
    );

  }, []);

  return (
    <div className="bg-[#fcfbf7] text-black min-h-screen flex flex-col relative overflow-hidden" ref={containerRef}>
      
      {/* Decorative Dots Pattern Background */}
      <svg className="absolute top-20 right-10 w-[300px] h-[300px] pointer-events-none z-0 hidden md:block" viewBox="0 0 200 200">
        <g ref={dotsRef} opacity="0.6">
          {[0, 1, 2, 3, 4, 5, 6].map(row =>
            [0, 1, 2, 3, 4, 5, 6].map(col => (
              <circle key={`bg-dots-${row}-${col}`} cx={20 + col * 25} cy={20 + row * 25} r="3" fill="#d4c5b4" />
            ))
          )}
        </g>
      </svg>

      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-24 md:py-32 relative z-10">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-16 items-center lg:items-start mt-8">
          
          {/* Left Text / Info Section */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <h1 
              ref={headingRef}
              className="text-[3.5rem] md:text-[5rem] font-semibold tracking-tight mb-6 leading-[1.05] text-zinc-900 opacity-0"
            >
              Get in touch <br/> with{" "}
              <span className="relative inline-block">
                us
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
                    stroke="#00b574"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            
            <p ref={subRef} className="text-zinc-600 text-[17px] mb-12 max-w-md leading-relaxed opacity-0">
              Have a question, an idea, or just want to say hi? We'd love to hear from you. Fill out the form and our team will get back to you promptly.
            </p>

            <div ref={infoRef} className="flex flex-col gap-6 mt-auto">
              <div className="flex items-center gap-5 text-zinc-900 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm opacity-0">
                <div className="w-12 h-12 rounded-full bg-[#fcfbf7] border border-gray-100 flex items-center justify-center shrink-0">
                  <FiMail className="w-5 h-5 text-zinc-700" />
                </div>
                <div>
                  <p className="text-[13px] text-zinc-500 font-medium mb-0.5">Email us</p>
                  <p className="font-semibold text-[16px]">hello@koda.com</p>
                </div>
              </div>

              <div className="flex items-center gap-5 text-zinc-900 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm opacity-0">
                <div className="w-12 h-12 rounded-full bg-[#fcfbf7] border border-gray-100 flex items-center justify-center shrink-0">
                  <FiMapPin className="w-5 h-5 text-zinc-700" />
                </div>
                <div>
                  <p className="text-[13px] text-zinc-500 font-medium mb-0.5">Visit us</p>
                  <p className="font-semibold text-[16px]">123 Innovation Drive, Tech City</p>
                </div>
              </div>
              
              <div className="flex items-center gap-5 text-zinc-900 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm opacity-0">
                <div className="w-12 h-12 rounded-full bg-[#fcfbf7] border border-gray-100 flex items-center justify-center shrink-0">
                  <FiPhone className="w-5 h-5 text-zinc-700" />
                </div>
                <div>
                  <p className="text-[13px] text-zinc-500 font-medium mb-0.5">Call us</p>
                  <p className="font-semibold text-[16px]">+1 (555) 000-0000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="w-full lg:w-1/2 opacity-0" ref={formRef}>
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-lg relative">
              <form className="w-full flex flex-col gap-5 relative z-10" onSubmit={(e) => e.preventDefault()}>
                
                {/* Name Input */}
                <div className="w-full">
                  <label className="block text-[14px] font-semibold text-zinc-900 mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                      <FiUser className="w-[18px] h-[18px]" />
                    </div>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full pl-11 pr-4 py-3.5 bg-[#fcfbf7] border border-gray-200 rounded-xl text-[15px] placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="w-full">
                  <label className="block text-[14px] font-semibold text-zinc-900 mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                      <FiMail className="w-[18px] h-[18px]" />
                    </div>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full pl-11 pr-4 py-3.5 bg-[#fcfbf7] border border-gray-200 rounded-xl text-[15px] placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="w-full">
                  <label className="block text-[14px] font-semibold text-zinc-900 mb-2">Your Message</label>
                  <div className="relative">
                    <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none text-zinc-400">
                      <FiMessageSquare className="w-[18px] h-[18px]" />
                    </div>
                    <textarea
                      placeholder="Tell us about your project..."
                      rows={5}
                      className="w-full pl-11 pr-4 py-3.5 bg-[#fcfbf7] border border-gray-200 rounded-xl text-[15px] placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5 transition-all resize-none"
                      required
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-xl font-medium text-[15px] flex items-center justify-center gap-2 hover:bg-zinc-800 hover:-translate-y-[2px] transition-all duration-200 shadow-sm mt-4 cursor-pointer"
                >
                  Send Message
                  <FiSend className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
