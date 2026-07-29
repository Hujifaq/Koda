"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";

// Stock Unsplash images — education/learning themed
const IMAGES = [
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
  "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1200&q=80",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1000&q=80",
  "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80",
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80",
];

/**
 * ZoomParallax — Olivier Larose tutorial implementation.
 *
 * KEY CENTERING APPROACH:
 * Every image container uses `left: 50%; top: 50%` (anchors to viewport center),
 * then `transform: translate(calc(-50% + dxvw), calc(-50% + dyvh))` offsets
 * it from that center point.
 *
 * Image 3 (middle) uses dx=0, dy=0 → always EXACTLY centered at 50vw/50vh
 * on every screen resolution.
 *
 * All other images are offset from that center point, maintaining
 * their relative positions regardless of viewport size.
 *
 * Grid layout (matches reference image):
 *
 *   [1 tall left]  [2 wide top               ]
 *   [1 tall left]  [3 mid CENTER]  [4 mid right]
 *                  [5 wide btm L]  [6 btm ctr]  [7 btm R]
 */
export default function ZoomParallax() {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  /**
   * Two-phase scroll:
   *   Phase 1 [0 → 0.75]: images zoom in towards their final scale
   *   Phase 2 [0.75 → 1.0]: scale is HELD flat → "pinned fullscreen" feel
   *
   * Center image (27.3vw × 25vh) needs exactly scale=4 to fill 100vh viewport.
   * Outer images use higher scales so they zoom past the viewport edges.
   */

  // Center image: reaches fullscreen at 75% scroll, stays pinned after
  const scaleCenter = useTransform(scrollYProgress, [0, 0.75, 1], [1, 4, 4]);

  // Adjacent images: slightly larger to exit viewport as center fills in
  const scaleAdj = useTransform(scrollYProgress, [0, 0.75, 1], [1, 5, 5]);

  // Outer images: faster zoom — they fly past the viewport edges early
  const scaleOuter = useTransform(scrollYProgress, [0, 0.75, 1], [1, 6, 6]);

  // Corner/small images: fastest zoom
  const scaleCorner = useTransform(scrollYProgress, [0, 0.75, 1], [1, 8, 8]);

  /**
   * Each image is positioned via:
   *   left: 50%, top: 50%   ← anchors to viewport center
   *   transform: translate(calc(-50% + dx), calc(-50% + dy))
   *
   * dx / dy = offset of the image CENTER from the VIEWPORT CENTER (in vw/vh).
   * Image 3 has dx=0, dy=0 → always perfectly centered.
   */
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
