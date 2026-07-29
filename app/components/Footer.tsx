"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

const footerLinks = {
  Product: ["Courses", "Pricing", "Features", "Roadmap"],
  Company: ["About us", "Careers", "Blog", "Press"],
  Resources: ["Documentation", "Community", "Support", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

const FOOTER_HEIGHT = 500;

export function Footer() {
  return (
    /*
     * Olivier Larose sticky footer technique:
     * 1. Outer div is `relative` with a fixed height = footer height.
     *    clipPath keeps the footer visually cropped to this box.
     * 2. Inner div is `fixed bottom-0` — so it always sits at the
     *    viewport bottom, but is visually clipped by the outer div's
     *    clipPath. As the user scrolls and the outer div enters the
     *    viewport, the clip region slides up and reveals the footer.
     */
    <div
      className="relative w-full"
      style={{
        height: `${FOOTER_HEIGHT}px`,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      }}
    >
      <div
        className="fixed bottom-0 left-0 w-full bg-[#111111] text-white"
        style={{ height: `${FOOTER_HEIGHT}px` }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-between py-14">
          {/* Top row */}
          <div className="flex flex-col md:flex-row justify-between gap-12">
            {/* Brand */}
            <div className="flex flex-col gap-6 max-w-xs">
              <div className="flex items-center gap-2">
                <Image
                  src="/kodalogo.svg"
                  alt="Koda Logo"
                  width={80}
                  height={40}
                  className="object-contain brightness-0 invert"
                />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Coding courses designed to empower individuals with the knowledge and skills needed to make informed decisions.
              </p>
              <Link
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-white/20 rounded-full px-5 py-2.5 w-fit hover:bg-white hover:text-black transition-all duration-200"
              >
                Get started <FiArrowUpRight />
              </Link>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category} className="flex flex-col gap-4">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{category}</h4>
                  <ul className="flex flex-col gap-3">
                    {links.map((link) => (
                      <li key={link}>
                        <Link
                          href="#"
                          className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Koda. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
