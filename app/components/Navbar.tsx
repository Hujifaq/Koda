"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useSession, signOut } from "next-auth/react";

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
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const cartOverlayRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const announcementRef = useRef<HTMLDivElement>(null);
  const announcementContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId = 0;

    const updateCompactState = () => {
      // Tailwind 'lg' breakpoint is 1024px
      if (window.innerWidth < 1300) {
        setIsCompact(false);
        return;
      }
      const nextCompact = window.scrollY > 8;
      setIsCompact((current) => (current === nextCompact ? current : nextCompact));
    };

    updateCompactState();

    const handleScrollOrResize = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateCompactState);
    };

    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (!shellRef.current) return;

    const morphTimeline = gsap.timeline({ defaults: { overwrite: "auto" } });

    // Disable compact shape if the mobile menu is open
    const shouldBeCompact = isCompact && !isOpen;

    morphTimeline.to(
      shellRef.current,
      {
        width: shouldBeCompact ? "calc(100% - 32rem)" : "100%",
        maxWidth: shouldBeCompact ? 850 : "none",
        borderRadius: shouldBeCompact ? 30 : 0,
        marginTop: shouldBeCompact ? 16 : 0,
        boxShadow: shouldBeCompact ? "0px 10px 40px -10px rgba(0,0,0,0.15)" : "0px 0px 0px 0px rgba(0,0,0,0)",
        duration: 0.7,
        ease: shouldBeCompact ? "back.out(1.4)" : "power2.out",
        force3D: false,
      },
      0
    );

    if (headerRef.current) {
      const isMobile = window.innerWidth < 768;
      morphTimeline.to(
        headerRef.current,
        {
          paddingTop: shouldBeCompact ? 0 : (isMobile ? 0 : 16),
          paddingBottom: shouldBeCompact ? 0 : (isMobile ? 0 : 16),
          duration: 0.7,
          ease: shouldBeCompact ? "back.out(1.4)" : "power2.out",
        },
        0
      );
    }

    if (announcementRef.current && announcementContentRef.current) {
      morphTimeline.to(
        announcementRef.current,
        {
          height: shouldBeCompact ? 0 : "auto",
          duration: 0.7,
          ease: shouldBeCompact ? "back.out(1.4)" : "power2.out",
        },
        0
      );

      morphTimeline.to(
        announcementContentRef.current,
        {
          yPercent: shouldBeCompact ? 100 : 0,
          opacity: shouldBeCompact ? 0 : 1,
          duration: 0.7,
          ease: shouldBeCompact ? "back.out(1.4)" : "power2.out",
        },
        0
      );
    }

    return () => {
      morphTimeline.kill();
    };
  }, [isCompact, isOpen]);

  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      if (tl.current) tl.current.kill();
      tl.current = gsap.timeline();

      let x = "calc(100% - 46px)";
      let y = "85px";

      if (toggleButtonRef.current) {
        const rect = toggleButtonRef.current.getBoundingClientRect();
        x = `${rect.left + rect.width / 2}px`;
        y = `${rect.top + rect.height / 2}px`;
      }

  
      tl.current.fromTo(menuRef.current, {
        backgroundColor: "#7c5cff",
        clipPath: `circle(0% at ${x} ${y})`,
      }, {
        backgroundColor: "#f3f2f0",
        clipPath: `circle(150% at ${x} ${y})`,
        duration: 0.8,
        ease: "power3.inOut",
      });

  
      const letters = menuRef.current.querySelectorAll(".menu-letter");
      tl.current.fromTo(
        letters,
        { y: "120%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.6,
          stagger: 0.02,
          ease: "back.out(1.7)",
        },
        "-=0.6"
      );

    
      const contactInfo = menuRef.current.querySelector(".menu-contact");
      if (contactInfo) {
        tl.current.fromTo(
          contactInfo,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4 },
          "-=0.4"
        );
      }

    
      const menuActions = menuRef.current.querySelector(".menu-actions");
      if (menuActions) {
        tl.current.fromTo(
          menuActions,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4 },
          "-=0.4"
        );
      }

      document.body.style.overflow = "hidden";
      menuRef.current.style.pointerEvents = "auto";
    } else {
      if (tl.current) {
        tl.current.reverse().then(() => {
          if (!isCartOpen) document.body.style.overflow = "";
          if (menuRef.current) menuRef.current.style.pointerEvents = "none";
        });
      } else {
        if (!isCartOpen) document.body.style.overflow = "";
        if (menuRef.current) menuRef.current.style.pointerEvents = "none";
      }
    }
 
  }, [isOpen]);

  useEffect(() => {
    if (!cartRef.current || !cartOverlayRef.current) return;

    
    const cartTexts = cartRef.current.querySelectorAll(".cart-text");

    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      cartOverlayRef.current.style.pointerEvents = "auto";

      
      gsap.to(cartOverlayRef.current, { opacity: 1, duration: 0.3 });

    
      gsap.to(cartRef.current, {
        clipPath: "circle(150% at 100% 0%)",
        duration: 0.8,
        ease: "power3.inOut"
      });

     
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

    
      gsap.to(cartTexts, {
        y: 10,
        opacity: 0,
        duration: 0.2,
      });

     
      gsap.to(cartRef.current, {
        clipPath: "circle(0% at 100% 0%)",
        duration: 0.6,
        ease: "power3.inOut",
        delay: 0.1
      });
    }
  }, [isCartOpen, isOpen]);

  return (
    <div className="sticky top-0 z-50 w-full bg-transparent flex flex-col">
      <div
        ref={shellRef}
        className={`relative z-[60] mx-auto w-full overflow-hidden transition-colors duration-500 ${isOpen ? 'bg-transparent' : 'bg-white'}`}
      >
      
        <div ref={announcementRef} className="relative z-0 w-full overflow-hidden bg-[#7c5cff]">
          <div ref={announcementContentRef} className="py-2.5 text-center text-sm text-white flex items-center justify-center">
            <span>
              Get a free starter guide when you sign up for any of our{" "}
              <Link href="/courses" className="underline">
                courses.
              </Link>
            </span>
          </div>
        </div>

     
        <header ref={headerRef} className={`relative mx-auto flex w-full items-center justify-between px-6 py-0 md:px-12 md:py-4 transition-colors duration-500 ${isOpen ? 'bg-transparent' : 'bg-white'}`}>
          <Link href="/" className="flex items-center" data-nav-logo>
            <KodaLogo />
          </Link>


          <nav className="hidden md:flex flex-1 justify-center items-center gap-1 lg:gap-5 text-[14px] lg:text-[15px] mx-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-lg px-2 lg:px-3 py-2 font-medium hover:bg-black/5 transition-colors ease-in-out duration-200 whitespace-nowrap"
                data-nav-link
              >
                {link.label}
              </Link>
            ))}
          </nav>

       
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl px-4 py-2 hover:bg-black/5 transition-all duration-200 cursor-pointer"
              aria-label="Cart"
              onClick={() => setIsCartOpen(true)}
              data-nav-action
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

            {/* Auth Actions */}
            {status === "authenticated" ? (
              <>
                <Link href="/profile"
                  className="flex items-center hover:bg-black/5 rounded-xl px-4 py-2 transition-all duration-200 cursor-pointer"
                  data-nav-action
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm ml-2">Profile</span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center"
                  data-nav-action
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href={"/login"}
                  className="flex items-center hover:bg-black/5 rounded-xl px-4 py-2 transition-all duration-200 cursor-pointer"
                  data-nav-action
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

                <Link
                  href="/signup"
                  className="rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center"
                  data-nav-action
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

       
          <button
            ref={toggleButtonRef}
            className={`md:hidden flex items-center justify-center rounded-full w-11 h-7.5 transition-all duration-500 cursor-pointer relative z-[60] ${isOpen ? "bg-transparent scale-110" : "bg-[#7c5cff] hover:scale-105"
              }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-6 h-6">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 58.02589 26.60658"
                className={`absolute inset-0 w-full h-full transition-all duration-500 transform ${isOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                  }`}
              >
                <path
                  d="M2.41118,6.6878c14.19251-.5618,28.38501-1.1236,42.57752-1.6854,3.20675-.12694,3.22305-5.12758,0-5C30.79619,.5642,16.60368,1.126,2.41118,1.6878c-3.20675,.12694-3.22305,5.12758,0,5h0Z"
                  fill="white"
                />
                <path
                  d="M17.48464,16.40381l19.28969-.83323c1.34932-.05828,2.5-1.1073,2.5-2.5,0-1.30902-1.14461-2.55855-2.5-2.5l-19.28969,.83323c-1.34932,.05828-2.5,1.1073-2.5,2.5,0,1.30902,1.14461,2.55855,2.5,2.5h0Z"
                  fill="white"
                />
                <path
                  d="M9.51605,26.60099c15.36792-.9339,30.73584-1.86779,46.10377-2.80169,3.19703-.19428,3.21916-5.19563,0-5-15.36792,.9339-30.73584,1.86779-46.10377,2.80169-3.19703,.19428-3.21916,5.19563,0,5h0Z"
                  fill="white"
                />
              </svg>

           
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2.5"
                strokeLinecap="round"
                className={`absolute inset-0 w-full h-full transition-all duration-500 transform ${isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                  }`}
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </button>
        </header>
      </div>

    
      <div
        ref={menuRef}
        className="fixed inset-0 z-50 bg-[#f3f2f0] flex flex-col pointer-events-none overflow-y-auto"
        style={{ clipPath: "circle(0% at calc(100% - 46px) 85px)" }}
      >


      
        <div className="flex-1 flex flex-col mt-48 md:flex-row max-w-7xl w-full mx-auto px-6 md:px-12 pb-12 pt-6">

       
          <div className="menu-contact opacity-0 flex flex-col justify-end md:w-1/2 order-2 md:order-1 mt-16 md:mt-0 text-left">
            <h3 className="text-[11px] md:text-sm font-bold tracking-[0.3em] text-[#7c5cff] mb-4">
              GET IN TOUCH
            </h3>
            <div className="text-[17px] md:text-xl font-medium leading-relaxed mb-6">
              <a href="mailto:palise.watana@gmail.com" className="block hover:underline">
                palise.watana@gmail.com
              </a>
              <a href="tel:+66612279966" className="block hover:underline">
                +66 61 227 9966
              </a>
            </div>
            <div className="text-sm md:text-base font-medium text-zinc-800">
              Sukhumvit101/1<br />
              Bangkok, Thailand
            </div>
          </div>

        
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
            <div className="menu-actions opacity-0 flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-black/10">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => setIsCartOpen(true), 300); // Wait a bit for menu to close before showing cart
                }}
                className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold border border-black/20 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
              >
                <div className="relative">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
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
                  <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#7c5cff] text-[9px] text-white font-bold">
                    0
                  </span>
                </div>
                Cart
              </button>
              {status === "authenticated" ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl px-6 py-3 text-sm font-semibold border border-black/20 hover:bg-black hover:text-white transition-all duration-200"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="rounded-xl bg-[#7c5cff] px-6 py-3 text-sm font-semibold text-white hover:bg-[#6a4de0] transition-all duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>

     
      <div
        ref={cartOverlayRef}
        className="fixed inset-0 z-60 bg-black/40 opacity-0 pointer-events-none transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      <div
        ref={cartRef}
        className="fixed top-0 right-0 h-full w-100 max-w-full bg-white z-70 shadow-2xl flex flex-col rounded-l-2xl"
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
