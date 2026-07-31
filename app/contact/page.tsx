"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      [text1Ref.current, text2Ref.current],
      { y: 150, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power4.out" }
    ).fromTo(
      formRef.current,
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "back.out(1.2)" },
      "-=0.8"
    );
  }, []);

  return (
    <div 
      className="bg-[#fcfbf7] text-black min-h-screen flex flex-col relative" 
      ref={containerRef}
    >
      
      
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full border-[1px] border-zinc-300/40"></div>
        <div className="absolute top-[10%] right-[-10%] w-[60vw] h-[60vw] rounded-full border-[1px] border-zinc-300/40"></div>
        
      
        <div className="absolute bottom-[0%] left-[20%] w-[40vw] h-[40vw] bg-pink-400/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[0%] right-[10%] w-[30vw] h-[30vw] bg-teal-400/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[30%] w-[40vw] h-[40vw] bg-orange-400/20 rounded-full blur-[100px]"></div>
      </div>

      <Navbar />
      
      <main className="flex-grow flex flex-col relative w-full pt-[20vh] pb-0 px-4 sm:px-8 md:px-16 mx-auto overflow-hidden">
        
       
        <div className="absolute top-[15vh] left-0 w-full flex flex-col pointer-events-none z-0 px-4 sm:px-8 md:px-16">
          <h1 
            ref={text1Ref} 
            className="text-[20vw] leading-[0.85] tracking-[-0.05em] font-medium text-zinc-900 opacity-0"
          >
            LETS
          </h1>
          <h1 
            ref={text2Ref} 
            className="text-[20vw] leading-[0.85] tracking-[-0.05em] font-medium text-zinc-900 text-right opacity-0 flex items-center justify-end"
          >
            <span className="font-light mr-[2vw]">+</span> TALK
          </h1>
        </div>

        
        <div 
          ref={formRef} 
          className="relative z-10 w-full max-w-6xl mx-auto mt-auto pt-[40vh] md:pt-[35vh] opacity-0"
        >
          <div className="bg-[#f3f2eb]/90 backdrop-blur-sm rounded-t-[2rem] p-8 md:p-16 border-t border-x border-white/50  relative">
            <form className="w-full flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
              
              <div className="flex flex-col md:flex-row gap-10 w-full">
              
                <div className="w-full md:w-1/2 flex flex-col gap-3">
                  <label className="text-[12px] md:text-[14px] font-semibold text-zinc-800 tracking-wide uppercase">
                    What's your name?
                  </label>
                  <input
                    type="text"
                    placeholder="FULL NAME"
                    className="w-full px-5 py-4 bg-[#e5e4dc]/60 border border-black/5 rounded-xl text-[14px] md:text-[15px] placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 focus:bg-[#e9e8e2] transition-colors"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="w-full md:w-1/2 flex flex-col gap-3">
                  <label className="text-[12px] md:text-[14px] font-semibold text-zinc-800 tracking-wide uppercase">
                    What's your email?
                  </label>
                  <input
                    type="email"
                    placeholder="YOUR@EMAIL.COM"
                    className="w-full px-5 py-4 bg-[#e5e4dc]/60 border border-black/5 rounded-xl text-[14px] md:text-[15px] placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 focus:bg-[#e9e8e2] transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div className="w-full flex flex-col gap-3">
                <label className="text-[12px] md:text-[14px] font-semibold text-zinc-800 tracking-wide uppercase">
                  What's your brief?
                </label>
                <textarea
                  placeholder="WRITE YOUR BRIEF HERE IN NO MORE THAN FIVE HUNDRED WORDS..."
                  rows={4}
                  className="w-full px-5 py-4 bg-[#e5e4dc]/60 border border-black/5 rounded-xl text-[14px] md:text-[15px] placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 focus:bg-[#e9e8e2] transition-colors resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="w-full flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-black text-white px-10 py-4 rounded-full font-medium text-[15px] hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg cursor-pointer"
                >
                  Submit Brief
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </main>
      
      {/* We can hide footer on contact page or leave it. The reference has a clean bottom. 
          We will wrap Footer so it goes below the form container naturally. */}
      <div className="relative z-10 w-full bg-[#f3f2eb]">
        <Footer />
      </div>
      
    </div>
  );
}
