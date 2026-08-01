"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiUser, FiLock, FiArrowLeft } from "react-icons/fi";
import gsap from "gsap";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const gridImages = [
  "https://madewithgsap.com/effects/free001/assets/medias/01.png",
  "https://madewithgsap.com/effects/free001/assets/medias/02.png",
  "https://madewithgsap.com/effects/free001/assets/medias/03.png",
  "https://madewithgsap.com/effects/free001/assets/medias/04.png",
  "https://madewithgsap.com/effects/free001/assets/medias/05.png",
  "https://madewithgsap.com/effects/free001/assets/medias/06.png",
  "https://madewithgsap.com/effects/free001/assets/medias/07.png",
  "https://madewithgsap.com/effects/free001/assets/medias/08.png",
  "https://madewithgsap.com/effects/free001/assets/medias/09.png",
  "https://madewithgsap.com/effects/free001/assets/medias/10.png",
  "https://madewithgsap.com/effects/free001/assets/medias/11.png",
  "https://madewithgsap.com/effects/free001/assets/medias/12.png"
];

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
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

    // Use xPercent/yPercent to center the cursor so GSAP x/y doesn't conflict
    // with an inline transform: translate(-50%, -50%)
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    // Silky position tracking via quickTo
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => { xTo(e.clientX); yTo(e.clientY); };
    window.addEventListener("mousemove", onMove);

    // Morph → white circle with hand icon when entering right panel
    const onRightEnter = (e: MouseEvent) => {
      // Seed position immediately so cursor appears under the pointer, not at (0,0)
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

  useEffect(() => {
    let oldX = 0, oldY = 0, deltaX = 0, deltaY = 0;
    const root = containerRef.current;
    if (!root) return;

    const handleMouseMove = (e: MouseEvent) => {
      deltaX = e.clientX - oldX;
      deltaY = e.clientY - oldY;
      oldX = e.clientX;
      oldY = e.clientY;
    };
    
    root.addEventListener("mousemove", handleMouseMove);
    const mediaElements = root.querySelectorAll('.media');
    
    const handleMouseEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const image = el.querySelector('img');
      if (!image) return;

      const tl = gsap.timeline();
      tl.timeScale(1.2);

      // Simulate inertia fling and bounce back
      tl.fromTo(image, {
        x: deltaX * 3,
        y: deltaY * 3,
      }, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.3)'
      });

      tl.fromTo(image, {
        rotate: 0
      }, {
        duration: 0.4,
        rotate: (Math.random() - 0.5) * 30,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut'
      }, '<');
    };

    mediaElements.forEach(el => el.addEventListener('mouseenter', handleMouseEnter));

    return () => {
      root.removeEventListener("mousemove", handleMouseMove);
      mediaElements.forEach(el => el.removeEventListener('mouseenter', handleMouseEnter));
    };
  }, []);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid username or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
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
        className="absolute top-6 right-6 lg:left-6 lg:right-auto z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-neutral-200/50 backdrop-blur-sm text-neutral-700 text-xs font-semibold shadow-sm transition-all hover:-translate-y-[1px]"
      >
        <FiArrowLeft className="text-sm" />
        Back to Home
      </Link>

      {/* Left Side: Login Form */}
      <div className="w-full lg:w-[50%] min-h-screen flex flex-col justify-center items-center px-6 sm:px-12 md:px-20 lg:px-16 xl:px-24 py-16">
        <div className="w-full max-w-[440px]">
          {/* Header */}
          <div className="mb-10 text-left">
            <h1 className="text-[2.5rem] leading-[1.1] font-semibold tracking-tight text-neutral-900 mb-3">
              Welcome back.
            </h1>
            <p className="text-neutral-500 text-sm font-medium">
              Sign into your account below.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm border border-red-100">
                {error}
              </div>
            )}
            
            {/* Username Input */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                <FiUser className="text-lg" />
              </span>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 bg-white text-neutral-900 placeholder-neutral-400 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c5cff]/50 shadow-sm hover:shadow transition-all text-[14px]"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                <FiLock className="text-lg" />
              </span>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 bg-white text-neutral-900 placeholder-neutral-400 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c5cff]/50 shadow-sm hover:shadow transition-all text-[14px]"
              />
            </div>

            {/* Form Footer (Button + Links) */}
            <div className="mt-2 flex items-center justify-between gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white text-[13px] font-bold px-7 py-3 rounded-xl transition-all duration-200 hover:translate-y-[-2px] active:translate-y-0 shadow-sm disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
              <Link
                href="/forgot-password"
                className="text-[12px] text-neutral-900 font-bold underline hover:text-[#7c5cff] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <p className="mt-6 text-[12px] text-neutral-500">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-neutral-900 font-bold underline hover:text-[#7c5cff] transition-colors"
              >
                Sign up today.
              </Link>
            </p>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-neutral-200"></div>
            <span className="text-xs text-neutral-400 font-medium tracking-wider">OR</span>
            <div className="h-px flex-1 bg-neutral-200"></div>
          </div>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="mt-6 w-full flex items-center justify-center gap-3 rounded-2xl bg-white border border-neutral-200 px-4 py-3.5 text-[14px] font-semibold text-neutral-800 hover:bg-neutral-50 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>

      {/* Right Side: Interactive GSAP Grid */}
      <div 
        ref={rightPanelRef}
        className="hidden lg:block lg:w-[50%] bg-[#0a0a0a] min-h-screen relative overflow-hidden"
      >
        <section ref={containerRef} className="w-full h-full relative grid place-items-center bg-[#0a0a0a]">
          

          {/* Grid */}
          <div className="grid grid-cols-4 gap-[1vw] mt-24 p-8 w-full max-w-[800px] mx-auto">
            {gridImages.map((src, i) => (
              <div key={i} className="media group">
                <img 
                  src={src} 
                  alt="" 
                  className="w-[11vw] h-[11vw] object-cover rounded-[4%] block pointer-events-none will-change-transform shadow-lg group-hover:shadow-xl transition-shadow drag-none" 
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
    </>
  );
}
