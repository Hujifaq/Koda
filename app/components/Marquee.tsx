"use client";

import React from "react";
const technologies = [
  { name: "NEXT.JS", className: "devicon-nextjs-original-wordmark text-[6rem]", hasWordmark: true },
  { name: "C++", className: "devicon-cplusplus-plain colored text-[4rem]", hasWordmark: true },
  { name: "React", className: "devicon-react-original-wordmark colored text-[5rem]", hasWordmark: true },
  { name: "Tailwind CSS", className: "devicon-tailwindcss-plain-wordmark colored text-[9rem]", hasWordmark: true },
  { name: "ThreeJS", className: "devicon-threejs-original-wordmark text-[5rem]", hasWordmark: true },
  { name: "Typescript", className: "devicon-typescript-plain colored text-[3rem]", hasWordmark: false },
  { name: "Javascript", className: "devicon-javascript-plain colored text-[3rem]", hasWordmark: false },
];

export const MarqueeTrack = ({ isReversed = false }: { isReversed?: boolean }) => {
  return (
    <div className="group flex overflow-hidden py-0 [--gap:4rem] [gap:var(--gap)] flex-row max-w-full [--duration:40s] [mask-image:linear-gradient(to_right,_rgba(0,_0,_0,_0),rgba(0,_0,_0,_1)_10%,rgba(0,_0,_0,_1)_90%,rgba(0,_0,_0,_0))]">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div
            className={`flex shrink-0 justify-around [gap:var(--gap)] ${
              isReversed ? "animate-marquee-reverse" : "animate-marquee"
            } flex-row`}
            key={i}
          >
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="marquee-item transition-all cursor-default flex items-center justify-center gap-2 pr-6 opacity-90 "
              >
                <i className={tech.className}></i>
                {!tech.hasWordmark && <span className="text-xl font-semibold tracking-wide whitespace-nowrap">{tech.name}</span>}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export function Marquee() {
  return (
    <div className="w-full bg-gray-200/15 text-black flex flex-col gap-1">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% - var(--gap))); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(calc(-100% - var(--gap))); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee var(--duration) linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse var(--duration) linear infinite;
        }
      `}</style>
      <MarqueeTrack />
    </div>
  );
}
