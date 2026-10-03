"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Hand-lettered centerline paths let each cursive stroke write itself on screen.
const letters = [
  "M48 103 C64 55 135 27 158 43 C177 57 122 161 107 187",
  "M131 121 C169 103 214 47 223 47 C240 45 206 91 163 112 C148 119 144 122 152 134 C178 171 191 193 219 158",
  "M219 158 C239 136 258 109 250 101 C235 86 204 114 207 146 C210 177 242 164 254 139 C267 110 254 100 247 109 C237 122 260 132 282 113",
  "M310 111 C296 92 267 114 268 145 C269 176 296 167 312 135 C335 90 375 21 361 28 C341 35 307 139 315 157 C320 174 342 153 356 134",
  "M399 110 C381 92 351 118 353 147 C355 178 383 163 400 124 L409 104 C397 127 386 158 399 162 C416 169 438 138 454 125 C464 117 474 124 466 134",
];

export function KodaSignature() {
  const signatureRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const paths = Array.from(
      signatureRef.current?.querySelectorAll<SVGPathElement>("[data-letter]") ?? [],
    );
    const totalLength = paths.reduce((sum, path) => sum + path.getTotalLength(), 0);
    if (!totalLength) return;

    const underline = signatureRef.current?.querySelector<SVGPathElement>("[data-underline]");
    const allPaths = underline ? [...paths, underline] : paths;
    allPaths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: `${length} ${length}`,
        strokeDashoffset: length,
        opacity: 0,
      });
    });
    const writing = gsap.timeline({ paused: true });

    // Match time to stroke length so the pen keeps a consistent speed across
    // letters, rather than restarting an easing curve for every character.
    paths.forEach((path) => {
      writing.set(path, { opacity: 1 }).to(path, {
        strokeDashoffset: 0,
        duration: (path.getTotalLength() / totalLength) * 2.6,
        ease: "none",
      });
    });

    if (underline) {
      writing.set(underline, { opacity: 1 }, "+=0.08")
        .to(underline, {
          strokeDashoffset: 0, duration: 0.9, ease: "none",
        });
    }

    // Ease the complete drawing once, keeping the strokes connected in rhythm.
    gsap.to(writing, {
      time: writing.duration(),
      duration: writing.duration() / 2.25,
      delay: 0.35 / 3,
      ease: "power1.inOut",
    });
  }, { scope: signatureRef });

  return (
    <svg
      ref={signatureRef}
      viewBox="20 10 480 220"
      className="h-auto w-[min(80vw,620px)] overflow-visible"
      role="img"
      aria-label="Koda"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {letters.map((d, index) => (
        <path key={index} data-letter d={d} />
      ))}
      <path
        data-underline
        d="M84 209 C183 188 335 189 451 199 C461 200 466 202 457 204 C371 201 260 208 217 216"
        stroke="#7c5cff"
        strokeWidth="5"
      />
    </svg>
  );
}
