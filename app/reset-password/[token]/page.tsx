"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiLock } from "react-icons/fi";

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen w-full flex flex-col justify-center items-center bg-[#f5f3ef] px-6">
        <div className="w-full max-w-[440px] text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Password Reset Successful!</h1>
          <p className="text-neutral-500">Redirecting to login...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center bg-[#f5f3ef] px-6">
      <div className="w-full max-w-[440px]">
        {/* Header */}
        <div className="mb-10 text-left">
          <h1 className="text-[2.5rem] leading-[1.1] font-semibold tracking-tight text-neutral-900 mb-3">
            Set New Password
          </h1>
          <p className="text-neutral-500 text-sm font-medium">
            Please enter your new password below.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm border border-red-100">
              {error}
            </div>
          )}

          {/* Password Input */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
              <FiLock className="text-lg" />
            </span>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full pl-12 pr-4 py-4 bg-white text-neutral-900 placeholder-neutral-400 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c5cff]/50 shadow-sm hover:shadow transition-all text-[14px]"
            />
          </div>
          
          {/* Confirm Password Input */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
              <FiLock className="text-lg" />
            </span>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="w-full pl-12 pr-4 py-4 bg-white text-neutral-900 placeholder-neutral-400 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c5cff]/50 shadow-sm hover:shadow transition-all text-[14px]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-black text-white text-[13px] font-bold px-7 py-4 rounded-xl transition-all duration-200 hover:translate-y-[-2px] active:translate-y-0 shadow-sm disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </main>
  );
}
