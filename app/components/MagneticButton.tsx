"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export function MagneticButton({ children, className, onClick }: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        // Create quickTo animations for highly performant mouse tracking
        const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = button.getBoundingClientRect();
            
            // Calculate distance from center of button to mouse
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            
            // Attract button towards mouse (multiply by factor for strength)
            xTo(x * 0.4);
            yTo(y * 0.4);
        };

        const handleMouseLeave = () => {
            // Snap back to original position
            xTo(0);
            yTo(0);
        };

        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            button.removeEventListener("mousemove", handleMouseMove);
            button.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <button ref={buttonRef} className={className} onClick={onClick}>
            {children}
        </button>
    );
}
