"use client";

import React from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLenis } from 'lenis/react'

function SvgDraw() {

    gsap.registerPlugin(ScrollTrigger);

    useLenis(ScrollTrigger.update);

    useGSAP(() => {
        const path = document.getElementById("stroke-path") as SVGPathElement | null;
        if (path) {
            const pathLength = path.getTotalLength();
            path.style.strokeDasharray = `${pathLength}`;
            path.style.strokeDashoffset = `${pathLength}`;

            gsap.to(path, {
                strokeDashoffset: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: ".spotlight",
                    start: "top 20%",
                    end: "80% bottom",
                    scrub: true,
                },
            });
        }

        const textPath = document.querySelector('.anim-text-path');
        if (textPath) {
            
            const proxy = { offset: 120 };
            gsap.to(proxy, {
                offset: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: ".text-path-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
                onUpdate: () => {
                    textPath.setAttribute("startOffset", `${proxy.offset}%`);
                }
            });
        }

        const handleMouseEnter = () => {
            const cursor = document.getElementById('jelly-cursor');
            if (cursor) {
                gsap.to(cursor, {
                    backgroundColor: '#00afa6ff', // yellow-400
                    width: '2rem',
                    height: '2rem',
                    duration: 1.2,
                    ease: 'elastic.out(1, 0.3)'
                });
            }
        };

        const handleMouseLeave = () => {
            const cursor = document.getElementById('jelly-cursor');
            if (cursor) {
                gsap.to(cursor, {
                    backgroundColor: '#6c6bc2',
                    width: '1rem',
                    height: '1rem',
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        };

        const container = document.querySelector('.svgdraw-container');
        let mouseX = -1000;
        let mouseY = -1000;
        let isHovering = false;

        const updateCursorState = () => {
            if (!container) return;
            const rect = container.getBoundingClientRect();
            const isInside = (
                mouseX >= rect.left &&
                mouseX <= rect.right &&
                mouseY >= rect.top &&
                mouseY <= rect.bottom
            );

            if (isInside && !isHovering) {
                isHovering = true;
                handleMouseEnter();
            } else if (!isInside && isHovering) {
                isHovering = false;
                handleMouseLeave();
            }
        };

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            updateCursorState();
        };

        const onScroll = () => {
            updateCursorState();
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('scroll', onScroll);
        };
    }, { dependencies: [] });


    return (
        <main className='relative bg-[#f5f4ee] z-20 svgdraw-container'>
            <div className='bg-[#f5f4ee] w-full min-h-screen rounded-t-3xl'>
                <section className="relative w-full h-[100svh] p-8 bg-[var(--base-200)] flex justify-center items-center overflow-hidden">
                    <h1 className="w-[60%] max-[1000px]:w-full text-center font-medium leading-[1.1] text-[4rem] max-[1000px]:text-[2rem] tracking-[-0.1rem] max-[1000px]:tracking-normal">Design to keep information clear and connected</h1>
                </section>

                <section className="relative z-0 w-full h-full p-8 flex flex-col gap-40 max-[1000px]:gap-20 overflow-hidden spotlight">
                    <div className="relative z-10 flex flex-col items-center gap-12">
                        <div className="w-[80%] max-[1000px]:w-full flex justify-center">
                            <Image src="/1.svg" alt="image1" width={1000} height={800} className="w-full h-auto object-contain bg-transparent max-[1000px]:scale-[2] max-[1000px]:mt-14" />
                        </div>
                    </div>

                    <div className="relative z-10 flex justify-center gap-8 max-[1000px]:flex-col">
                        <div className="flex-1 flex flex-col justify-center">
                            <div className="w-[75%] max-[1000px]:w-full mx-auto p-8 bg-[var(--base-200)] rounded-2xl flex flex-col gap-4">
                                <h2 className="font-medium leading-[1.1] text-[2.5rem] max-[1000px]:text-[1.5rem] tracking-[-0.075rem] max-[1000px]:tracking-normal">Built for increasing information demands</h2>
                                <p className="text-[1.125rem] max-[1000px]:text-[1rem] font-medium">
                                    Whether it is files, notes, or incoming messages, the app sorts and prioritizes items automatically. It prevents clutter and helps maintain clarity during busy periods.
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <div>
                                <Image src="/2.svg" alt="image2" width={500} height={400} className="w-full h-full object-cover bg-transparent min-[1000px]:scale-[1.8] sm:rotate-10 scale-[2] sm:mt-0 mt-10" />
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 flex justify-center gap-8 max-[1000px]:flex-col">
                        <div className="flex-1 flex flex-col justify-center">
                            <div>
                                <Image src="/3.svg" alt="image3" width={500} height={400} className="w-full h-full object-cover bg-transparent min-[1000px]:scale-[1.8] sm:-rotate-5 scale-[2] sm:mt-0 mt-10 " />
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <div className="w-[75%] max-[1000px]:w-full mx-auto p-8 bg-[var(--base-200)] rounded-2xl flex flex-col gap-4">
                                <h2 className="font-medium leading-[1.1] text-[2.5rem] max-[1000px]:text-[1.5rem] tracking-[-0.075rem] max-[1000px]:tracking-normal">Built for increasing information demands</h2>
                                <p className="text-[1.125rem] max-[1000px]:text-[1rem] font-medium">
                                    Whether it is files, notes, or incoming messages, the app sorts and prioritizes items automatically. It prevents clutter and helps maintain clarity during busy periods.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-10 mb-[5rem] sm:mb-0 flex justify-center gap-8 max-[1000px]:flex-col">
                        <div className="w-[100%] max-[1000px]:scale-[2]"><Image src='/4.svg' alt='image4' width={1000} height={800} className="w-full h-full object-cover bg-transparent" /></div>

                    </div>

                    <div className="absolute top-[25svh] max-[1000px]:top-[15svh] left-1/2 -translate-x-1/2 w-[90%] max-[1000px]:w-[275%] h-full -z-[1] svg-path">
                        <svg className="w-[100%] sm:w-full h-[85%] md:h-[85%]" width="350" height="600" viewBox="0 0 291 559" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path id="stroke-path" d="M127.938 22.504C127.938 22.504 51.9378 36.504 59.9378 119.504C67.9378 202.504 243.16 120.618 264.938 204.504C286.67 288.215 179.938 370.504 145.938 385.504C111.938 400.504 76.9378 399.504 42.9378 370.504C8.93781 341.504 21.1162 293.981 51.9378 268.504C81.8115 243.81 125.938 242.504 150.938 257.504C175.938 272.504 244.938 338.504 233.938 410.504C222.938 482.504 150.938 536.504 150.938 536.504" stroke="#9C56FF" strokeWidth="45" strokeLinecap="round" />
                        </svg>

                    </div>
                </section>

                <section className="relative w-full h-[100svh] bg-[var(--base-200)] flex justify-center items-center overflow-hidden text-path-section">
                    <svg className="w-full max-w-[1400px] h-auto overflow-visible min-w-[1000px]" viewBox="0 0 1000 300">
                        <path 
                            id="text-curve" 
                            d="M -200 150 C 200 450, 800 -150, 1200 150" 
                            fill="none" 
                            stroke="transparent" 
                        />
                        <text className="fill-black font-semibold tracking-tight uppercase" fontSize="38" dominantBaseline="middle">
                            <textPath 
                                className="anim-text-path"
                                href="#text-curve" 
                                startOffset="50%"
                                textAnchor="middle"
                            >
                                Clearer organization ready for whatever comes next.
                            </textPath>
                        </text>
                    </svg>
                </section>



            </div>
        </main>
    )
}

export default SvgDraw 