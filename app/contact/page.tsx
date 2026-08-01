"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiUser, FiMail, FiMessageSquare, FiArrowLeft, FiSend } from "react-icons/fi";
import gsap from "gsap";
import DecayCard from "../components/DecayCard";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  // ── Custom cursor effect ──────────────────────────────────────────────────
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const rightPanel = rightPanelRef.current;
    if (!cursor || !rightPanel) return;

    rightPanel.style.cursor = 'none';

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => { xTo(e.clientX); yTo(e.clientY); };
    window.addEventListener("mousemove", onMove);

    const onRightEnter = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      gsap.to(cursor, {
        width: 64,
        height: 64,
        backgroundColor: "white",
        opacity: 1,
        scale: 1,
        duration: 0.55,
        ease: "elastic.out(1.2, 0.5)",
      });
      gsap.set(cursor, { innerHTML: `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0'/><path d='M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0'/><path d='M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0'/><path d='M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'/></svg>` });
    };
    const onRightLeave = () => {
      gsap.to(cursor, {
        width: 0,
        height: 0,
        opacity: 0,
        scale: 0.2,
        duration: 0.35,
        ease: "back.in(2)",
      });
      gsap.set(cursor, { innerHTML: "" });
    };

    rightPanel.addEventListener("mouseenter", onRightEnter as EventListener);
    rightPanel.addEventListener("mouseleave", onRightLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      rightPanel.removeEventListener("mouseenter", onRightEnter as EventListener);
      rightPanel.removeEventListener("mouseleave", onRightLeave);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // Simulate sending an email/message
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <>
      {/* Custom cursor blob */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full"
        style={{
          width: 0,
          height: 0,
          opacity: 0,
          backgroundColor: "white",
          willChange: "transform, width, height, opacity",
        }}
      />

      <main className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f5f3ef]">
      <Link
        href="/"
        className="absolute top-6 right-6 lg:left-6 lg:right-auto z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-neutral-200/50 backdrop-blur-sm text-neutral-700 text-xs font-semibold shadow-sm transition-all hover:-translate-y-[1px] cursor-pointer"
      >
        <FiArrowLeft className="text-sm" />
        Back to Home
      </Link>

      {/* Left Side: Contact Form */}
      <div className="w-full lg:w-[50%] min-h-screen flex flex-col justify-center items-center px-6 sm:px-12 md:px-20 lg:px-16 xl:px-24 py-16">
        <div className="w-full max-w-[440px]">
          {/* Header */}
          <div className="mb-10 text-left">
            <h1 className="text-[2.5rem] leading-[1.1] font-semibold tracking-tight text-neutral-900 mb-3">
              Let's talk.
            </h1>
            <p className="text-neutral-500 text-sm font-medium">
              Have a question about a course or need help getting your dev environment set up? Drop us a line.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {success && (
              <div className="bg-green-50 text-green-600 p-3 rounded-xl text-sm border border-green-100 flex items-center gap-2">
                <FiSend className="text-base" />
                Your message has been sent successfully!
              </div>
            )}
            
            {/* Name Input */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                <FiUser className="text-lg" />
              </span>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 bg-white text-neutral-900 placeholder-neutral-400 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c5cff]/50 shadow-sm hover:shadow transition-all text-[14px]"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                <FiMail className="text-lg" />
              </span>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 bg-white text-neutral-900 placeholder-neutral-400 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c5cff]/50 shadow-sm hover:shadow transition-all text-[14px]"
              />
            </div>

            {/* Message Input */}
            <div className="relative">
              <span className="absolute left-4 top-6 -translate-y-1/2 text-neutral-400">
                <FiMessageSquare className="text-lg" />
              </span>
              <textarea
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="w-full pl-12 pr-4 py-4 bg-white text-neutral-900 placeholder-neutral-400 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c5cff]/50 shadow-sm hover:shadow transition-all text-[14px] resize-none"
              />
            </div>

            {/* Form Footer (Button) */}
            <div className="mt-2 flex items-center justify-start gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white text-[14px] font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:translate-y-[-4px] hover:bg-black/90 hover:shadow-black/20 active:translate-y-0 shadow-sm disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2 cursor-pointer w-full"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend className="text-base" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side: DecayCard */}
      <div 
        ref={rightPanelRef}
        className="hidden lg:block lg:w-[50%] bg-[#0a0a0a] min-h-screen relative overflow-hidden"
      >
        <section className="w-full h-full relative flex place-items-center justify-center bg-[#0a0a0a]">
          <DecayCard width={450} height={600} image="https://picsum.photos/450/600?grayscale">
            <h2>Contact<br />Us</h2>
          </DecayCard>
        </section>
      </div>
    </main>
    </>
  );
}
