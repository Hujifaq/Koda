"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

function KodaLogo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/kodalogo.svg"
        alt="Koda Logo"
        width={90}
        height={90}
        className="object-contain"
      />
    </div>
  );
}



function SplitText({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (!containerRef.current) return;
    const topLetters = containerRef.current.querySelectorAll('.hover-letter-top');
    const bottomLetters = containerRef.current.querySelectorAll('.hover-letter-bottom');

    gsap.to(topLetters, { yPercent: -100, duration: 0.3, stagger: 0.015, ease: "power2.inOut", overwrite: "auto" });
    gsap.to(bottomLetters, { yPercent: -100, duration: 0.3, stagger: 0.015, ease: "power2.inOut", overwrite: "auto" });
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    const topLetters = containerRef.current.querySelectorAll('.hover-letter-top');
    const bottomLetters = containerRef.current.querySelectorAll('.hover-letter-bottom');

    gsap.to(topLetters, { yPercent: 0, duration: 0.3, stagger: 0.015, ease: "power2.inOut", overwrite: "auto" });
    gsap.to(bottomLetters, { yPercent: 0, duration: 0.3, stagger: 0.015, ease: "power2.inOut", overwrite: "auto" });
  };

  return (
    <span
      ref={containerRef}
      className={`inline-flex ${className || ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="menu-letter relative inline-flex overflow-hidden translate-y-[120%] opacity-0"
          style={{ willChange: "transform, opacity" }}
        >
          <span className="hover-letter-top inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
          <span className="hover-letter-bottom absolute left-0 top-full inline-block text-[#7c5cff]">
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
}

export function Navbar() {
  const navLinks = [
    { label: "Courses", href: "/courses" },
    { label: "Careers", href: "/careers" },
    { label: "FAQ's", href: "/faq" },
    { label: "Contact", href: "/contact" }
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const cartOverlayRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!menuRef.current) return;


    tl.current = gsap.timeline({ paused: true });

    // 1. Menu morph expand
    tl.current.to(menuRef.current, {
      clipPath: "circle(150% at 100% 0%)",
      duration: 0.8,
      ease: "power3.inOut",
    });

    // 2. Letters bounce up
    const letters = menuRef.current.querySelectorAll(".menu-letter");
    tl.current.to(
      letters,
      {
        y: "0%",
        opacity: 1,
        duration: 0.6,
        stagger: 0.02,
        ease: "back.out(1.7)",
      },
      "-=0.6" // start before menu bounce finishes
    );

    // 3. Fade in contact info
    const contactInfo = menuRef.current.querySelector(".menu-contact");
    tl.current.fromTo(
      contactInfo,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4 },
      "-=0.4"
    );

    // 4. Fade in actions
    const menuActions = menuRef.current.querySelector(".menu-actions");
    if (menuActions) {
      tl.current.fromTo(
        menuActions,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.4"
      );
    }

    return () => {
      tl.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      tl.current?.play();
      document.body.style.overflow = "hidden";
      if (menuRef.current) menuRef.current.style.pointerEvents = "auto";
    } else {
      tl.current?.reverse();
      if (!isCartOpen) document.body.style.overflow = "";
      if (menuRef.current) menuRef.current.style.pointerEvents = "none";
    }
  }, [isOpen, isCartOpen]);

  useEffect(() => {
    if (!cartRef.current || !cartOverlayRef.current) return;

    // Select the text elements we want to animate
    const cartTexts = cartRef.current.querySelectorAll(".cart-text");

    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      cartOverlayRef.current.style.pointerEvents = "auto";

      // Animate overlay
      gsap.to(cartOverlayRef.current, { opacity: 1, duration: 0.3 });

      // Animate panel morph (clip-path)
      gsap.to(cartRef.current, {
        clipPath: "circle(150% at 100% 0%)",
        duration: 0.8,
        ease: "power3.inOut"
      });

      // Animate text slide up
      gsap.fromTo(cartTexts,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.5)",
          delay: 0.3
        }
      );
    } else {
      if (!isOpen) document.body.style.overflow = "";
      cartOverlayRef.current.style.pointerEvents = "none";

      gsap.to(cartOverlayRef.current, { opacity: 0, duration: 0.3, delay: 0.2 });

      // Fade text out quickly
      gsap.to(cartTexts, {
        y: 10,
        opacity: 0,
        duration: 0.2,
      });

      // Animate panel morph out
      gsap.to(cartRef.current, {
        clipPath: "circle(0% at 100% 0%)",
        duration: 0.6,
        ease: "power3.inOut",
        delay: 0.1
      });
    }
  }, [isCartOpen, isOpen]);

  return (
    <div className="sticky top-0 z-50 w-full bg-[#fcfbf7]">
      {/* Announcement bar */}
      <div className="bg-[#7c5cff] py-2.5 text-center text-sm text-white">
        Get a free starter guide when you sign up for any of our{" "}
        <Link href="/courses" className="underline">
          courses.
        </Link>
      </div>

      {/* Main header */}
      <header className="relative mx-auto flex w-full max-w-[1120px] items-center justify-between pl-6 md:pl-12 pt-0 pr-6">
        <Link href="/" className="flex items-center">
          <KodaLogo />
        </Link>

      
        <nav className="hidden md:flex flex-1 justify-center items-center gap-1 lg:gap-5 text-[14px] lg:text-[15px] mx-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-2 lg:px-3 py-2 font-medium hover:bg-black/5 transition-colors ease-in-out duration-200 whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Cart */}
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl px-4 py-2 hover:bg-black/5 transition-all duration-200 cursor-pointer"
            aria-label="Cart"
            onClick={() => setIsCartOpen(true)}
          >
            <div className="relative">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 6h15l-1.5 9h-12L6 6Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6 5 3H2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="9" cy="20" r="1.5" fill="currentColor" />
                <circle cx="18" cy="20" r="1.5" fill="currentColor" />
              </svg>
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#7c5cff] text-[10px] text-white font-medium">
                0
              </span>
            </div>
            <span className="text-[15px] font-medium">Cart</span>
          </button>

          {/* Login */}
          <Link href={"/login"}

            className="flex items-center hover:bg-black/5 rounded-xl px-4 py-2 transition-all duration-200 cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.7" />
              <path
                d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-sm">Login</span>
          </Link>

          {/* Sign up */}
          <Link
            href="/signup"
            className="rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 cursor-pointer transition-all duration-200 hover:translate-y-[-2px] inline-flex items-center"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden flex items-center justify-center bg-[#7c5cff] rounded-full p-2.5 hover:scale-105 transition-transform cursor-pointer"
          onClick={() => setIsOpen(true)}
          aria-label="Open mobile menu"
        >
          <Image
            src="/undraw_asymmetric-parallels.svg"
            alt="Menu"
            width={24}
            height={24}
            className="invert" // Make SVG white
          />
        </button>
      </header>

      {/* Full Screen Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-50 bg-[#f3f2f0] flex flex-col pointer-events-none overflow-y-auto"
        style={{ clipPath: "circle(0% at 100% 0%)" }}
      >
        {/* Top Header of Menu */}
        <div className="flex items-center justify-between px-6 md:px-12 py-5 max-w-7xl w-full mx-auto">
          <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
            <KodaLogo />
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-md font-bold tracking-[0.2em] hover:bg-[#7c5cff] hover:text-white rounded-full p-2 transition-all duration-200 cursor-pointer"
          >
            CLOSE
          </button>
        </div>

        {/* Content Container */}
        <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto px-6 md:px-12 pb-12 pt-6">

          {/* Left Column - Contact Info (Bottom Left on Desktop) */}
          <div className="menu-contact opacity-0 flex flex-col justify-end md:w-1/2 order-2 md:order-1 mt-16 md:mt-0 text-left">
            <h3 className="text-[11px] md:text-sm font-bold tracking-[0.3em] text-[#7c5cff] mb-4">
              GET IN TOUCH
            </h3>
            <div className="text-[17px] md:text-xl font-medium leading-relaxed mb-6">
              <a href="mailto:studio@clikd.co" className="block hover:underline">
                studio@clikd.co
              </a>
              <a href="tel:+14379824412" className="block hover:underline">
                +1 (437) 982 4412
              </a>
            </div>
            <div className="text-sm md:text-base font-medium text-zinc-800">
              42 Mercer Street<br />
              Toronto, ON M5V
            </div>
          </div>

          {/* Right Column - Giant Links (Center Right on Desktop) */}
          <div className="flex flex-col justify-center md:w-1/2 order-1 md:order-2 gap-0 md:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-[4.5rem] md:text-[7rem] lg:text-[4.5rem] leading-[0.9] font-bold tracking-tighter text-black hover:text-[#7c5cff] transition-colors overflow-hidden"
              >
                <SplitText text={link.label} />
              </Link>
            ))}
            <div className="menu-actions opacity-0 flex items-center gap-3 mt-6 pt-6 border-t border-black/10">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-6 py-3 text-sm font-semibold border border-black/20 hover:bg-black hover:text-white transition-all duration-200"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className="rounded-xl bg-[#7c5cff] px-6 py-3 text-sm font-semibold text-white hover:bg-[#6a4de0] transition-all duration-200"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Side Panel */}
      <div
        ref={cartOverlayRef}
        className="fixed inset-0 z-[60] bg-black/40 opacity-0 pointer-events-none transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      <div
        ref={cartRef}
        className="fixed top-0 right-0 h-full w-[400px] max-w-full bg-white z-[70] shadow-2xl flex flex-col rounded-l-2xl"
        style={{ clipPath: "circle(0% at 100% 0%)" }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
          <h2 className="cart-text text-lg font-medium opacity-0">Your Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-black/5 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="cart-text text-[15px] font-medium text-black opacity-0">No items found.</p>
        </div>
      </div>
    </div>
  );
}
