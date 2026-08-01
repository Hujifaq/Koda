"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const faqs = [
    {
        question: "How long does the coding bootcamp take?",
        answer: "Our standard full-time bootcamp runs for 12 weeks, Monday through Friday. We also offer a part-time program that extends over 24 weeks, perfect for those balancing work or other commitments.",
        color: "#fce823" 
    },
    {
        question: "Do I need prior coding experience?",
        answer: "Not at all! Our curriculum is designed to take you from a complete beginner to a job-ready developer. We start with the fundamentals before diving into advanced topics.",
        color: "#7c5cff" 
    },
    {
        question: "What kind of support is available?",
        answer: "You'll have access to 1-on-1 mentorship, daily Q&A sessions, a dedicated slack channel, and lifelong career support including resume reviews and mock interviews.",
        color: "#00afa6" 
    },
    {
        question: "Is there a job guarantee?",
        answer: "While we cannot legally guarantee a job, our career services team works tirelessly with you until you are hired. Over 90% of our graduates find employment within 6 months.",
        color: "#9C56FF"
    },
    {
        question: "Can I switch from full-time to part-time?",
        answer: "Yes! We understand that life happens. If you find the full-time pace too intense, you can request a transfer to the part-time cohort within the first 4 weeks.",
        color: "#fce823"
    }
];

function FAQRow({ faq, isOpen, onClick }: { faq: typeof faqs[0], isOpen: boolean, onClick: () => void }) {
    const rowRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const answerContainerRef = useRef<HTMLDivElement>(null);
    const answerTextRef = useRef<HTMLParagraphElement>(null);

    const isLight = faq.color === "#fce823";
    const hoverColor = isLight ? "#000" : "#fff";

    useEffect(() => {
        if (!answerContainerRef.current || !iconRef.current) return;
        
        if (isOpen) {
            gsap.to(answerContainerRef.current, { height: "auto", duration: 0.5, ease: "power3.inOut" });
            gsap.to(iconRef.current, { rotate: 45, duration: 0.5, ease: "power3.inOut" }); // Turn plus into X
        } else {
            gsap.to(answerContainerRef.current, { height: 0, duration: 0.5, ease: "power3.inOut" });
            gsap.to(iconRef.current, { rotate: 0, duration: 0.5, ease: "power3.inOut" });
        }
    }, [isOpen]);

    const handleMouseEnter = () => {
        gsap.set(bgRef.current, { transformOrigin: "bottom center" });
        gsap.to(bgRef.current, { scaleY: 1, duration: 0.5, ease: "power3.inOut" });
        gsap.to(textRef.current, { x: 30, color: hoverColor, duration: 0.5, ease: "power3.out" });
        gsap.to(answerTextRef.current, { color: hoverColor, duration: 0.5, ease: "power3.out" });
        gsap.to(iconRef.current, { 
            backgroundColor: hoverColor, 
            color: faq.color, 
            borderColor: hoverColor, 
            duration: 0.5, 
            ease: "power3.out" 
        });
    };

    const handleMouseLeave = () => {
        gsap.set(bgRef.current, { transformOrigin: "top center" });
        gsap.to(bgRef.current, { scaleY: 0, duration: 0.5, ease: "power3.inOut" });
        gsap.to(textRef.current, { x: 0, color: "#000", duration: 0.5, ease: "power3.out" });
        gsap.to(answerTextRef.current, { color: "#000", duration: 0.5, ease: "power3.out" });
        gsap.to(iconRef.current, { 
            backgroundColor: "transparent", 
            color: "#000", 
            borderColor: "rgba(0,0,0,0.2)", 
            duration: 0.5, 
            ease: "power3.out" 
        });
    };

    return (
        <div 
            ref={rowRef}
            className="relative w-full border-b border-black/10 py-12 px-6 sm:px-12 cursor-pointer overflow-hidden group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
           
            <div 
                ref={bgRef}
                className="absolute inset-0 z-0 origin-bottom scale-y-0"
                style={{ backgroundColor: faq.color }}
            ></div>
            
        
            <div className="relative z-10 flex flex-col pointer-events-none">
                <div className="flex items-center justify-between gap-8">
                    <h2 
                        ref={textRef}
                        className="text-3xl sm:text-5xl font-medium tracking-tight text-black"
                    >
                        {faq.question}
                    </h2>
                    <div 
                        ref={iconRef}
                        className="w-14 h-14 rounded-full border border-black/20 flex flex-shrink-0 items-center justify-center text-black"
                    >
                        <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </div>
                </div>

                <div 
                    ref={answerContainerRef}
                    className="h-0 overflow-hidden"
                >
                    <p 
                        ref={answerTextRef}
                        className="pt-8 text-xl text-black font-medium opacity-80 leading-relaxed max-w-3xl"
                    >
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

export function FAQGallery() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.fromTo(".faq-heading-anim", 
            { y: 150, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1.2,
                delay: 0.7,
                stagger: 0.2, 
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".faq-header-container",
                    start: "top 85%",
                }
            }
        );
    }, []);

    return (
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 py-32">
            <div className="faq-header-container flex flex-col gap-6 mb-20">
                <div className="overflow-hidden py-2">
                    <h1 className="faq-heading-anim text-[4rem] sm:text-[6rem] font-medium tracking-tight leading-none text-black">
                        Frequently Asked Questions
                    </h1>
                </div>
                <div className="overflow-hidden py-2">
                    <p className="faq-heading-anim text-xl text-zinc-600 font-medium max-w-2xl">
                        Everything you need to know about our courses, mentorship, and career placement.
                    </p>
                </div>
            </div>
            
            <div className="flex flex-col border-t border-black/10">
                {faqs.map((faq, index) => (
                    <FAQRow 
                        key={index} 
                        faq={faq} 
                        isOpen={openIndex === index}
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    />
                ))}
            </div>
        </div>
    );
}
