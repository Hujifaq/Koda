"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function JellyCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || !cursorRef.current) return;

    const elasticCursor = cursorRef.current;
    const pos = { x: 0, y: 0 };
    const vel = { x: 0, y: 0 };
    let targetPos = { x: 0, y: 0 };
    let isHoveringClickable = false;
    let animationFrameId: number;

    // Use gsap.quickSetter for optimized property setting
    const setX = gsap.quickSetter(elasticCursor, "x", "px");
    const setY = gsap.quickSetter(elasticCursor, "y", "px");
    const setRotation = gsap.quickSetter(elasticCursor, "rotate", "deg");
    const setScaleX = gsap.quickSetter(elasticCursor, "scaleX");
    const setScaleY = gsap.quickSetter(elasticCursor, "scaleY");

    function getScale(diffX: number, diffY: number) {
      const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
      return Math.min(distance / 100, 0.25);
    }

    function getAngle(diffX: number, diffY: number) {
      return (Math.atan2(diffY, diffX) * 180) / Math.PI;
    }

    function update() {
      const rotation = getAngle(vel.x, vel.y);
      const scale = getScale(vel.x, vel.y);

      // Apply jelly-like effect (position and rotation)
      // Note: translate(-50%, -50%) is handled in initial CSS, so we just set x and y
      setX(pos.x);
      setY(pos.y);
      setRotation(rotation);

      // If not hovering, apply the jelly scale effect
      if (!isHoveringClickable) {
        setScaleX(1 + scale);
        setScaleY(1 - scale);
      }

      // Expose position to CSS for masking effects
      document.body.style.setProperty('--jelly-x', `${pos.x}px`);
      document.body.style.setProperty('--jelly-y', `${pos.y}px`);
    }

    function animate() {
      const speed = 0.35;

      // Update cursor's position based on targetPos
      pos.x += (targetPos.x - pos.x) * speed;
      pos.y += (targetPos.y - pos.y) * speed;
      vel.x = targetPos.x - pos.x;
      vel.y = targetPos.y - pos.y;

      update();
      animationFrameId = requestAnimationFrame(animate);
    }

    const onMouseMove = (e: MouseEvent) => {
      targetPos.x = e.clientX;
      targetPos.y = e.clientY;
      update();
    };

    const handleCursorHover = (isHovering: boolean) => {
      isHoveringClickable = isHovering;

      gsap.to(elasticCursor, {
        scaleX: isHovering ? 0.5 : 1,
        scaleY: isHovering ? 0.5 : 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onMouseEnterElement = () => handleCursorHover(true);
    const onMouseLeaveElement = () => handleCursorHover(false);

    // Initial attachment for existing elements
    const attachHoverEvents = () => {
      document.querySelectorAll('a, button').forEach((element) => {
        element.addEventListener('mouseenter', onMouseEnterElement);
        element.addEventListener('mouseleave', onMouseLeaveElement);
      });
    };

    const hideCursor = () => gsap.to(elasticCursor, { opacity: 0, duration: 0.7, ease: 'power2.out' });
    const showCursor = () => gsap.to(elasticCursor, { opacity: 1, duration: 0.7, ease: 'power2.out' });

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mouseenter', showCursor);

    // Attach to existing elements
    attachHoverEvents();

    // We can also use a MutationObserver to attach to dynamically added links/buttons
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            const elements = node.querySelectorAll('a, button');
            if (node.matches && node.matches('a, button')) {
              node.addEventListener('mouseenter', onMouseEnterElement);
              node.addEventListener('mouseleave', onMouseLeaveElement);
            }
            elements.forEach((element) => {
              element.addEventListener('mouseenter', onMouseEnterElement);
              element.addEventListener('mouseleave', onMouseLeaveElement);
            });
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Start animation loop
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener('mouseleave', hideCursor);
      document.removeEventListener('mouseenter', showCursor);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();

      document.querySelectorAll('a, button').forEach((element) => {
        element.removeEventListener('mouseenter', onMouseEnterElement);
        element.removeEventListener('mouseleave', onMouseLeaveElement);
      });
    };
  }, []);

  return (
    <>
      <style>{`
  
        @media (pointer: fine) {
          html, body, a, [role=button], button, [type=button]:not(:disabled) {
            cursor: none !important;
          }
        }
        
        
        @media (pointer: coarse), (hover: none) {
          #jelly-cursor {
            display: none !important;
          }
        }
      `}</style>
      <div
        id="jelly-cursor"
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-[#6c6bc2] rounded-full z-[99999] pointer-events-none"
        style={{
          transformOrigin: '50% 50%',
          transform: 'translate(-50%, -50%)',
          willChange: 'width, height, transform, border'
        }}
      />
    </>
  );
}
