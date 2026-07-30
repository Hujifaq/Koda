"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const SLIDES = [
  {
    title: "Single Point of Contact",
    description:
      "No matter how many markets you're exploring, you'll work with one dedicated project manager who orchestrates your entire multi-market research journey.",
  },
  {
    title: "Local Experts,\nGlobal Consistency",
    description:
      "Our teams combine deep cultural understanding with international research excellence, ensuring you receive insights that are both locally authentic and globally relevant.",
  },
  {
    title: "Better Value,\nBetter Results",
    description:
      "Experience the same rigorous research standards across all markets, delivering comparable insights that inform cohesive international strategies.",
  },
  {
    title: "Time Zone\nAligned Support",
    description:
      "With offices around the globe, our team members are always available and aligned with your working hours for responsive, seamless communication.",
  },
  {
    title: "Time Zone\nAligned Support",
    description:
      "With offices around the globe, our team members are always available and aligned with your working hours for responsive, seamless communication.",
  },
  {
    title: "Time Zone\nAligned Support",
    description:
      "With offices around the globe, our team members are always available and aligned with your working hours for responsive, seamless communication.",
  },
  {
    title: "Time Zone\nAligned Support",
    description:
      "With offices around the globe, our team members are always available and aligned with your working hours for responsive, seamless communication.",
  },
  {
    title: "Time Zone\nAligned Support",
    description:
      "With offices around the globe, our team members are always available and aligned with your working hours for responsive, seamless communication.",
  },
];

export default function SliderSection() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  // Magnetic button hover effect (desktop only)
  useGSAP(() => {
    // Skip magnetic effect on touch/mobile devices
    const isTouchDevice =
      typeof window !== "undefined" &&
      (window.matchMedia("(hover: none)").matches || "ontouchstart" in window);

    if (isTouchDevice) return;

    const buttons = [prevRef.current, nextRef.current];

    buttons.forEach((btn) => {
      if (!btn) return;

      const handleMouseMove = (e: MouseEvent) => {
        // Don't animate if disabled
        if (btn.disabled) return;

        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.4, // Pull towards mouse
          y: y * 0.4,
          scale: 1.15, // Scale up
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        if (btn.disabled) return;
        
        gsap.to(btn, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)", // Very bouncy and jelly
        });
      };

      btn.addEventListener("mousemove", handleMouseMove);
      btn.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        btn.removeEventListener("mousemove", handleMouseMove);
        btn.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  return (
    <div className="w-full py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <h2 className="text-[2rem] md:text-[2.5rem] font-semibold text-[#1a1a1a] tracking-tight">
            What Sets Us Apart
          </h2>
          
          {/* Custom Navigation Buttons */}
          <div className="flex gap-4">
            <button
              ref={prevRef}
              className="w-14 h-14 rounded-full bg-[#fce823] flex items-center justify-center text-[#1a1a1a] hover:bg-white hover:text-black hover:shadow-xl transition-colors duration-300 disabled:opacity-50 disabled:hover:bg-[#fce823] disabled:hover:shadow-none cursor-pointer will-change-transform"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              ref={nextRef}
              className="w-14 h-14 rounded-full bg-[#fce823] flex items-center justify-center text-[#1a1a1a] hover:bg-white hover:text-black hover:shadow-xl transition-colors duration-300 disabled:opacity-50 disabled:hover:bg-[#fce823] disabled:hover:shadow-none cursor-pointer will-change-transform"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            // Re-assign navigation elements after init to bind them properly
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          spaceBetween={24}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 3.5 },
          }}
          className="!overflow-visible"
        >
          {SLIDES.map((slide, idx) => (
            <SwiperSlide key={idx} className="!h-auto">
              <div className="bg-white rounded-[24px] p-8 md:p-10 flex flex-col justify-between h-[450px] shadow-sm">
                <h3 className="text-[2rem] font-medium leading-[1.1] text-[#1a1a1a] whitespace-pre-line tracking-tight">
                  {slide.title}
                </h3>
                <p className="text-[#333333] text-[15px] leading-relaxed">
                  {slide.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
      </div>
    </div>
  );
}
