"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiMail, FiArrowLeft } from "react-icons/fi";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center bg-[#f5f3ef] px-6">
      <Link
        href="/login"
        className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-neutral-200/50 backdrop-blur-sm text-neutral-700 text-xs font-semibold shadow-sm transition-all hover:-translate-y-[1px]"
      >
        <FiArrowLeft className="text-sm" />
        Back to Login
      </Link>

      <div className="w-full max-w-[440px]">
        {/* Header */}
        <div className="mb-10 text-left">
          <h1 className="text-[2.5rem] leading-[1.1] font-semibold tracking-tight text-neutral-900 mb-3">
            Reset Password
          </h1>
          <p className="text-neutral-500 text-sm font-medium">
            Enter your email to receive a password reset link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm border border-red-100">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded-xl text-sm border border-green-100">
              {success}
            </div>
          )}

          {/* Email Input */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
              <FiMail className="text-lg" />
            </span>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-4 bg-white text-neutral-900 placeholder-neutral-400 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c5cff]/50 shadow-sm hover:shadow transition-all text-[14px]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-black text-white text-[13px] font-bold px-7 py-4 rounded-xl transition-all duration-200 hover:translate-y-[-2px] active:translate-y-0 shadow-sm disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </main>
  );
}
