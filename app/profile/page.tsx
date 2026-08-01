"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiLock, FiLogOut, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import gsap from "gsap";
import ImageTrail from "../components/ImageTrail";

const trailImages = [
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

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const cursorRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const homeButtonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const leftPanel = leftPanelRef.current;
    const homeBtn = homeButtonRef.current;
    if (!cursor || !leftPanel || !homeBtn) return;

    leftPanel.style.cursor = 'none';
    homeBtn.style.cursor = 'none';

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => { xTo(e.clientX); yTo(e.clientY); };
    window.addEventListener("mousemove", onMove);

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
  }, [status, session]);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    } else if (session?.user) {
      setName(session.user.name || "");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="bg-[#f5f3ef] min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7c5cff]"></div>
      </div>
    );
  }

  if (!session) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (password && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password && password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Profile updated successfully!");
        setPassword("");
        setConfirmPassword("");
        await update({ name });
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full"
        style={{
          width: 0,
          height: 0,
          opacity: 0,
          scale: "0.2",
          backgroundColor: "#7c3aed",
          willChange: "transform, width, height, opacity",
        }}
      />

      <main className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f5f3ef]">
        <Link
          ref={homeButtonRef}
          href="/"
          className="absolute top-6 right-6 lg:left-6 lg:right-auto z-[999] flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-neutral-200/50 backdrop-blur-sm text-neutral-700 text-xs font-semibold shadow-sm transition-all hover:-translate-y-[1px]"
        >
          <FiArrowLeft className="text-sm" />
          Back to Home
        </Link>

        {/* Left Side: Interactive ImageTrail */}
        <div 
          ref={leftPanelRef}
          className="hidden lg:block lg:w-[50%] bg-[#0a0a0a] min-h-screen relative overflow-hidden"
        >
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none">
            <h2 className="text-[min(60px,5.6vw)] leading-tight font-semibold tracking-tight text-white opacity-80 text-center">
              Move Your Mouse
            </h2>
          </div>
          <ImageTrail items={trailImages} variant={4} />
        </div>

      {/* Right Side: Profile Form */}
      <div className="w-full lg:w-[50%] min-h-screen flex flex-col justify-center items-center px-6 sm:px-12 md:px-20 lg:px-16 xl:px-24 py-16">
        <div className="w-full max-w-[440px]">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-[#7c5cff] to-[#a08aff] flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-[#7c5cff]/20">
                {name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-[2rem] leading-[1.1] font-semibold tracking-tight text-neutral-900 mb-1">
                  Your Profile.
                </h1>
                <p className="text-neutral-500 text-sm font-medium">
                  Manage your account details.
                </p>
              </div>
            </div>
            
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="group flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-black hover:text-white hover:border-black transition-all duration-200 shadow-sm"
            >
              <FiLogOut className="text-base group-hover:-translate-x-[2px] transition-transform" />
              Sign Out
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm border border-red-100">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-600 p-3 rounded-xl text-sm border border-green-100">
                {success}
              </div>
            )}

            {/* Name Input */}
            <div className="flex flex-col gap-1.5 mt-2">
              <label className="text-xs font-bold text-neutral-900 pl-1" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                  <FiUser className="text-lg" />
                </span>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white text-neutral-900 placeholder-neutral-400 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c5cff]/50 shadow-sm hover:shadow transition-all text-[14px]"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5 mt-2">
              <label className="text-xs font-bold text-neutral-900 pl-1" htmlFor="email">
                Email Address <span className="text-neutral-400 font-normal">(Read-only)</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                  <FiMail className="text-lg" />
                </span>
                <input
                  id="email"
                  type="email"
                  value={(session as any).user?.email || ""}
                  disabled
                  className="w-full pl-12 pr-4 py-4 bg-[#eae8e4] text-neutral-500 border border-transparent rounded-2xl cursor-not-allowed outline-none text-[14px] opacity-70"
                />
              </div>
            </div>

            <div className="mt-4 pt-6 border-t border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-900 mb-1">Update Password</h3>
              <p className="text-xs text-neutral-500 font-medium mb-4">Leave blank to keep your current password.</p>
              
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                    <FiLock className="text-lg" />
                  </span>
                  <input
                    id="password"
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white text-neutral-900 placeholder-neutral-400 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c5cff]/50 shadow-sm hover:shadow transition-all text-[14px]"
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                    <FiLock className="text-lg" />
                  </span>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white text-neutral-900 placeholder-neutral-400 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c5cff]/50 shadow-sm hover:shadow transition-all text-[14px]"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white text-[14px] font-bold py-4 rounded-2xl transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-black/20 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 disabled:shadow-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
    </>
  );
}
