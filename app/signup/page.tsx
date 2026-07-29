"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiUser, FiMail, FiLock, FiArrowLeft, FiHome } from "react-icons/fi";
import gsap from "gsap";

const gridImages = [
  "https://madewithgsap.com/effects/free002/assets/medias/01.png",
  "https://madewithgsap.com/effects/free002/assets/medias/02.png",
  "https://madewithgsap.com/effects/free002/assets/medias/03.png",
  "https://madewithgsap.com/effects/free002/assets/medias/04.png",
  "https://madewithgsap.com/effects/free002/assets/medias/05.png",
  "https://madewithgsap.com/effects/free002/assets/medias/06.png",
  "https://madewithgsap.com/effects/free002/assets/medias/07.png",
  "https://madewithgsap.com/effects/free002/assets/medias/08.png",
  "https://madewithgsap.com/effects/free002/assets/medias/09.png",
  "https://madewithgsap.com/effects/free002/assets/medias/10.png",
  
];

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const homeButtonRef = useRef<HTMLAnchorElement>(null);

  // ── Custom cursor effect ──────────────────────────────────────────────────
  useEffect(() => {
    const cursor = cursorRef.current;
    const leftPanel = leftPanelRef.current;
    const homeBtn = homeButtonRef.current;
    if (!cursor || !leftPanel || !homeBtn) return;

    // Silky position tracking via quickTo
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => { xTo(e.clientX); yTo(e.clientY); };
    window.addEventListener("mousemove", onMove);

    // Morph → purple circle when entering left panel
    const onLeftEnter = () => {
      gsap.to(cursor, {
        width: 56,
        height: 56,
        backgroundColor: "#7c3aed",
        opacity: 1,
        scale: 1,
        duration: 0.55,
        ease: "elastic.out(1.2, 0.5)",
      });
      gsap.set(cursor, { innerHTML: "" });
    };
    const onLeftLeave = () => {
      gsap.to(cursor, {
        width: 0,
        height: 0,
        opacity: 0,
        scale: 0.2,
        duration: 0.35,
        ease: "back.in(2)",
      });
    };

    // Morph → home icon circle when entering back-to-home button
    const onHomeEnter = () => {
      gsap.to(cursor, {
        width: 64,
        height: 64,
        backgroundColor: "#1a1a1a",
        opacity: 1,
        scale: 1,
        duration: 0.55,
        ease: "elastic.out(1.2, 0.5)",
      });
      gsap.set(cursor, { innerHTML: `<svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z'/><polyline points='9 22 9 12 15 12 15 22'/></svg>` });
    };
    const onHomeLeave = () => {
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

    leftPanel.addEventListener("mouseenter", onLeftEnter);
    leftPanel.addEventListener("mouseleave", onLeftLeave);
    homeBtn.addEventListener("mouseenter", onHomeEnter);
    homeBtn.addEventListener("mouseleave", onHomeLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      leftPanel.removeEventListener("mouseenter", onLeftEnter);
      leftPanel.removeEventListener("mouseleave", onLeftLeave);
      homeBtn.removeEventListener("mouseenter", onHomeEnter);
      homeBtn.removeEventListener("mouseleave", onHomeLeave);
    };
  }, []);

  // ── Falling images GSAP effect ────────────────────────────────────────────
  useEffect(() => {
    let incr = 0;
    let oldIncrX = 0;
    let oldIncrY = 0;
    let firstMove = true;
    let indexImg = 0;

    const root = containerRef.current;
    if (!root) return;

    const isCoarsePointer = window.matchMedia('(hover: none)').matches;
    const resetDist = window.innerWidth / (isCoarsePointer ? 6 : 8);

    const W = window.innerWidth;
    const H = window.innerHeight;
    const clampX = gsap.utils.clamp(0, W);
    const clampY = gsap.utils.clamp(0, H);

    function createMedia(x: number, y: number, deltaX: number, deltaY: number) {
      if (y > H - 200) return;

      const image = document.createElement("img");
      image.setAttribute('src', gridImages[indexImg]);
      root!.appendChild(image);

      const tl = gsap.timeline({
        onComplete: () => {
          if (root && root.contains(image)) root.removeChild(image);
          if (tl) tl.kill();
        }
      });

      tl.fromTo(image, {
        xPercent: -50 + (Math.random() - 0.5) * 80,
        yPercent: -50 + (Math.random() - 0.5) * 10,
        scaleX: 1.3,
        scaleY: 1.3,
        rotation: (Math.random() - 0.5) * 20
      }, {
        scaleX: 1,
        scaleY: 1,
        ease: 'elastic.out(2, 0.6)',
        duration: 0.4
      });

      tl.fromTo(image, { x }, {
        x: '+=' + deltaX * 2,
        rotation: 0,
        ease: 'power1.in',
        duration: 0.4
      }, '<');

      tl.fromTo(image, { y }, {
        y: '+=' + (H - y),
        scale: 0.9,
        yPercent: -95,
        ease: 'back.in(1.1)',
        duration: 0.4
      }, '<');

      tl.to(image, {
        x: '+=' + deltaX * 1.6,
        rotation: (Math.random() - 0.5) * 40,
        ease: 'power1.in',
        duration: 0.3
      });
      tl.to(image, {
        yPercent: 150,
        ease: 'back.in(' + (1.5 + (1 - y / H)) + ')',
        duration: 0.3
      }, '<');

      indexImg = (indexImg + 1) % gridImages.length;
    }

    function applyMove(clientX: number, clientY: number) {
      const valX = clampX(clientX);
      const valY = clampY(clientY);

      if (firstMove) {
        firstMove = false;
        oldIncrX = valX;
        oldIncrY = valY;
        return;
      }

      incr += Math.abs(valX - oldIncrX) + Math.abs(valY - oldIncrY);

      if (incr > resetDist) {
        incr = 0;
        const rect = root!.getBoundingClientRect();
        const relX = valX - rect.left;
        const relY = valY - rect.top;
        createMedia(relX, relY, valX - oldIncrX, valY - oldIncrY);
      }

      oldIncrX = valX;
      oldIncrY = valY;
    }

    const handleMouseMove = (e: MouseEvent) => applyMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches || !e.touches[0]) return;
      applyMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    root.addEventListener('mousemove', handleMouseMove);
    root.addEventListener('touchstart', handleTouchMove, { passive: true });
    root.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      root.removeEventListener('mousemove', handleMouseMove);
      root.removeEventListener('touchstart', handleTouchMove);
      root.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signing up with:", { username, email, password, agree });
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
          scale: "0.2",
          backgroundColor: "#7c3aed",
          transform: "translate(-50%, -50%)",
          willChange: "transform, width, height, opacity",
        }}
      />

      <main className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f5f3ef]">
        <Link
          ref={homeButtonRef}
          href="/"
          className="absolute top-6 right-6 lg:left-6 lg:right-auto z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-neutral-200/50 backdrop-blur-sm text-neutral-700 text-xs font-semibold shadow-sm transition-all hover:-translate-y-[1px] cursor-none"
        >
          <FiArrowLeft className="text-sm" />
          Back to Home
        </Link>

        {/* Left Side: GSAP Interactive Panel */}
        <div
          ref={leftPanelRef}
          className="hidden lg:block lg:w-[50%] bg-[#0a0a0a] min-h-screen relative overflow-hidden cursor-none"
        >
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-[#7c5cff] rounded-full blur-[120px]" />
            <div className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] bg-[#5ef3b6] rounded-full blur-[100px]" />
          </div>

          <section ref={containerRef} className="mwg_free_effect002 w-full h-full relative z-10 text-white">
            <p className="content-effect z-10">
              <span className="font-semibold tracking-tight text-white">Move your mouse to make</span>
              <span className="font-semibold tracking-tight text-[#999]">images fall and bounce</span>
            </p>
          </section>
        </div>

        {/* Right Side: Signup Form */}
        <div className="w-full lg:w-[50%] min-h-screen flex flex-col justify-center items-center px-6 sm:px-12 md:px-20 lg:px-16 xl:px-24 py-16">
          <div className="w-full max-w-[440px]">
            {/* Header */}
            <div className="mb-10 text-left">
              <h1 className="text-[2.5rem] leading-[1.1] font-semibold tracking-tight text-neutral-900 mb-3">
                Let's get started.
              </h1>
              <p className="text-neutral-500 text-sm font-medium">
                Create your account details below.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

              {/* Email Input */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                  <FiMail className="text-lg" />
                </span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

              {/* Terms and Privacy Checkbox */}
              <div className="flex items-start gap-3 mt-2 mb-6">
                <input
                  id="agree"
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  required
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#7c5cff] focus:ring-[#7c5cff] cursor-pointer"
                />
                <label htmlFor="agree" className="text-[11px] md:text-[12px] text-neutral-500 leading-normal cursor-pointer select-none">
                  By clicking proceeding, you are agreeing to our{" "}
                  <a href="#" className="text-neutral-700 font-semibold hover:underline">
                    Privacy & Cookie policy
                  </a>
                  . Filearn is committed to protect and respect your privacy.
                </label>
              </div>

              {/* Form Footer (Button + Link) */}
              <div className="flex items-center justify-between gap-4">
                <button
                  type="submit"
                  className="bg-black text-white text-[13px] font-bold px-7 py-3 rounded-xl transition-all duration-200 hover:translate-y-[-2px] active:translate-y-0 cursor-pointer shadow-sm"
                >
                  Sign up
                </button>
                <p className="text-[12px] text-neutral-500">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-neutral-900 font-bold underline hover:text-[#7c5cff] transition-colors"
                  >
                    Sign in.
                  </Link>
                </p>
              </div>
            </form>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-neutral-200"></div>
              <span className="text-xs text-neutral-400 font-medium tracking-wider">OR</span>
              <div className="h-px flex-1 bg-neutral-200"></div>
            </div>

            <button
              type="button"
              className="mt-6 w-full flex items-center justify-center gap-3 rounded-2xl bg-white border border-neutral-200 px-4 py-3.5 text-[14px] font-semibold text-neutral-800 hover:bg-neutral-50 transition-all shadow-sm active:scale-[0.98]
              cursor-pointer"
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
      </main>

      <style>{`
        .mwg_free_effect002 {
            height: 100vh;
            overflow: hidden;
            position: relative;
        }
        .mwg_free_effect002 .content-effect {
            font-size: min(60px, 5.6vw);
            text-align: center;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            position: absolute;
            align-items: center;
            letter-spacing: -0.03em;
            pointer-events: none;
        }
        .mwg_free_effect002 .content-effect span {
            display: block;
            width: max-content;
        }
        .mwg_free_effect002 img {
            width: 15vw;
            height: 15vw;
            position: absolute;
            object-fit: cover;
            border-radius: 4%;
            z-index: 5;
            top: 0; left: 0;
            pointer-events: none;
        }
        @media (max-width: 768px) {
            .mwg_free_effect002 img {
                width: 35vw;
                height: 35vw;
            }
        }
      `}</style>
    </>
  );
}
