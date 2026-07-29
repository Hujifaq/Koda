"use client";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FiUser, FiMail, FiMessageSquare } from "react-icons/fi";

export default function ContactPage() {
  return (
    <div className="bg-[#fcfbf7] text-black min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-24 md:py-32">
        {/* Contact Form */}
        <div className="w-full max-w-2xl flex flex-col items-center">
          <h1 className="text-[3rem] md:text-[4rem] font-semibold tracking-tight text-center mb-4 leading-tight text-zinc-900">
            Here to help you.
          </h1>
          <p className="text-zinc-600 text-[15px] text-center mb-12">
            Fill out the form and we'll get back to you as soon as possible.
          </p>

          <form className="w-full flex flex-col gap-4">
            {/* Name Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                <FiUser className="w-[18px] h-[18px]" />
              </div>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full pl-12 pr-4 py-4 bg-white border border-black/5 rounded-xl text-[15px] placeholder:text-zinc-400 focus:outline-none focus:border-[#7c5cff] focus:ring-1 focus:ring-[#7c5cff] transition-all shadow-sm"
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                <FiMail className="w-[18px] h-[18px]" />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-4 bg-white border border-black/5 rounded-xl text-[15px] placeholder:text-zinc-400 focus:outline-none focus:border-[#7c5cff] focus:ring-1 focus:ring-[#7c5cff] transition-all shadow-sm"
                required
              />
            </div>

            {/* Message Textarea */}
            <div className="relative">
              <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none text-zinc-400">
                <FiMessageSquare className="w-[18px] h-[18px]" />
              </div>
              <textarea
                placeholder="Example Text"
                rows={5}
                className="w-full pl-12 pr-4 py-4 bg-white border border-black/5 rounded-xl text-[15px] placeholder:text-zinc-400 focus:outline-none focus:border-[#7c5cff] focus:ring-1 focus:ring-[#7c5cff] transition-all resize-y shadow-sm"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="bg-black text-white px-7 py-3 rounded-xl font-medium text-sm hover:bg-zinc-800 transition-colors shadow-sm"
              >
                Submit form
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
