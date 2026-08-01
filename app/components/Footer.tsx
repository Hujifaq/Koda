"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

const footerLinks = {
  Navigation: [
    { label: "Home", href: "/" },
    { label: "Explore Courses", href: "/courses" }
  ],
  Account: [
    { label: "Sign In", href: "/login" },
    { label: "Create Account", href: "/signup" },
    { label: "My Profile", href: "/profile" }
  ]
};

const FOOTER_HEIGHT = 400;

export function Footer() {
  return (
 
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
         
          <div className="flex flex-col md:flex-row justify-between gap-12">
          
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
                href="/signup"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-white/20 rounded-full px-5 py-2.5 w-fit hover:bg-[#7c5cff] hover:border-[#7c5cff] transition-all duration-200"
              >
                Get started <FiArrowUpRight />
              </Link>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-8 md:gap-16">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category} className="flex flex-col gap-4">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{category}</h4>
                  <ul className="flex flex-col gap-3">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

       
          <div className="flex flex-col items-center justify-center border-t border-white/10 pt-6">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Koda. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
