"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";

// Stock Unsplash images — education/learning themed
const IMAGES = [
  "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1773828948581-5b50c6ee17a2?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1690788210614-9052cffd8a14?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];


export default function ZoomParallax() {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scaleCenter = useTransform(scrollYProgress, [0, 0.75, 1], [1, 4, 4]);

  // Adjacent images: slightly larger to exit viewport as center fills in
  const scaleAdj = useTransform(scrollYProgress, [0, 0.75, 1], [1, 5, 5]);

  // Outer images: faster zoom — they fly past the viewport edges early
  const scaleOuter = useTransform(scrollYProgress, [0, 0.75, 1], [1, 6, 6]);

  // Corner/small images: fastest zoom
  const scaleCorner = useTransform(scrollYProgress, [0, 0.75, 1], [1, 8, 8]);

  
  const pictures = [
    // ── 1: Large portrait square, LEFT side spanning rows 1–2 ──
    {
      src: IMAGES[0],
      scale: scaleAdj,     // scale 5 → exits left edge
      dx: "-27.6vw",
      dy: "-10.4vh",
      width: "22.9vw",
      height: "47.9vh",
    },
    // ── 2: Wide landscape, TOP CENTER-RIGHT ──
    {
      src: IMAGES[1],
      scale: scaleAdj,     // scale 5 → exits top edge
      dx: "5.4vw",
      dy: "-32.3vh",
      width: "38.1vw",
      height: "35.4vh",
    },
    // ── 3: MIDDLE CENTER — fills viewport exactly at scale 4, then pins ──
    {
      src: IMAGES[2],
      scale: scaleCenter,  // scale 4 = 100vh fill, PINNED after 75% scroll
      dx: "0vw",
      dy: "0vh",
      width: "27.3vw",
      height: "25.5vh",
    },
    // ── 4: Medium landscape, MIDDLE RIGHT ──
    {
      src: IMAGES[3],
      scale: scaleAdj,     // scale 5 → exits right edge
      dx: "30.3vw",
      dy: "0vh",
      width: "30.3vw",
      height: "25vh",
    },
    // ── 5: Wide landscape, BOTTOM LEFT ──
    {
      src: IMAGES[4],
      scale: scaleOuter,   // scale 6 → exits bottom-left
      dx: "-23.4vw",
      dy: "29.7vh",
      width: "31.3vw",
      height: "26vh",
    },
    // ── 6: Portrait, BOTTOM CENTER ──
    {
      src: IMAGES[5],
      scale: scaleOuter,   // scale 6 → exits bottom
      dx: "3.4vw",
      dy: "29.7vh",
      width: "19.5vw",
      height: "26vh",
    },
    // ── 7: Small landscape, BOTTOM RIGHT ──
    {
      src: IMAGES[6],
      scale: scaleCorner,  // scale 8 → fastest, exits bottom-right first
      dx: "24.9vw",
      dy: "29.7vh",
      width: "19.5vw",
      height: "26vh",
    },
  ];

  return (
    <div ref={container} style={{ height: "300vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#6ee7b7",
        }}
      >
        {pictures.map(({ src, scale, dx, dy, width, height }, i) => (
          <motion.div
            key={i}
            style={{
              scale,
              position: "absolute",
              inset: 0,
              // Scale originates from the viewport center (motion.div center = viewport center)
            }}
          >
            {/*
             * Anchor to viewport center via left/top: 50%,
             * then offset from that center using translate.
             * Image 3: translate(-50%, -50%) → exactly at center, always.
             */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${dx}), calc(-50% + ${dy}))`,
                width,
                height,
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <Image
                src={src}
                alt={`Koda learning image ${i + 1}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 50vw, 33vw"
                priority={i === 0}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
