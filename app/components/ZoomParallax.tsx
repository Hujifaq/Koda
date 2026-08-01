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

  
  const scaleAdj = useTransform(scrollYProgress, [0, 0.75, 1], [1, 5, 5]);

  
  const scaleOuter = useTransform(scrollYProgress, [0, 0.75, 1], [1, 6, 6]);

  
  const scaleCorner = useTransform(scrollYProgress, [0, 0.75, 1], [1, 8, 8]);

  
  const pictures = [
    
    {
      src: IMAGES[0],
      scale: scaleAdj,    
      dx: "-27.6vw",
      dy: "-10.4vh",
      width: "22.9vw",
      height: "47.9vh",
    },
    
    {
      src: IMAGES[1],
      scale: scaleAdj,     
      dx: "5.4vw",
      dy: "-32.3vh",
      width: "38.1vw",
      height: "35.4vh",
    },
  
    {
      src: IMAGES[2],
      scale: scaleCenter,  
      dx: "0vw",
      dy: "0vh",
      width: "27.3vw",
      height: "25.5vh",
    },
   
    {
      src: IMAGES[3],
      scale: scaleAdj,  
      dx: "30.3vw",
      dy: "0vh",
      width: "30.3vw",
      height: "25vh",
    },
   
    {
      src: IMAGES[4],
      scale: scaleOuter,  
      dx: "-23.4vw",
      dy: "29.7vh",
      width: "31.3vw",
      height: "26vh",
    },
  
    {
      src: IMAGES[5],
      scale: scaleOuter,  
      dx: "3.4vw",
      dy: "29.7vh",
      width: "19.5vw",
      height: "26vh",
    },
   
    {
      src: IMAGES[6],
      scale: scaleCorner, 
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
            
            }}
          >
            
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
