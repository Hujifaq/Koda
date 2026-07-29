import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiClock, FiBookOpen, FiBarChart2, FiFileText, FiRepeat, FiDollarSign, FiArrowRight } from "react-icons/fi";

const newCourses = [
  {
    title: "Mastering Stock Market Strategies",
    icon: <FiFileText className="text-5xl opacity-80" />,
    color: "bg-[#baf05f]", // Lime Green
    hours: "72 hours",
    sections: "60 sections",
    level: "Intermediate level",
    description: "Learn fundamental and technical analysis and develop a disciplined approach to stock investing.",
    price: "$ 179.00",
    enrolled: "182 enrolled",
  },
  {
    title: "Investing 101",
    icon: <FiRepeat className="text-5xl opacity-80" />,
    color: "bg-[#f472d0]", // Pink
    hours: "60 hours",
    sections: "42 sections",
    level: "Beginner level",
    description: "Discover various investment options and learn how to create a diversified portfolio.",
    price: "$ 99.00",
    enrolled: "655 enrolled",
  },
  {
    title: "Financial Foundations",
    icon: <FiDollarSign className="text-5xl opacity-80" />,
    color: "bg-[#fca55d]", // Orange
    hours: "40 hours",
    sections: "28 sections",
    level: "Beginner level",
    description: "A comprehensive introductory course that covers the essential principles of personal finance.",
    price: "$ 79.00",
    enrolled: "794 enrolled",
  },
];

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face",
];

export function NewCourses() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-20 bg-[#f3f3f3] md:bg-transparent rounded-3xl">
      {/* Header */}
      <div className="flex items-end justify-between mb-12">
        <h2 className="text-[2.5rem] md:text-[3rem] leading-tight font-medium tracking-tight">
          New courses on Filearn.
        </h2>
        <Link href="#" className="flex items-center gap-2 text-sm font-semibold hover:bg-black/5 p-3 rounded-2xl transition-all duration-200 whitespace-nowrap">
          View all <span className="bg-black text-white rounded-full p-1 text-[10px]"><FiArrowRight /></span>
        </Link>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newCourses.map((course, idx) => (
          <div key={idx} className="bg-white rounded-[2rem] p-4 pb-6 flex flex-col shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow">
            
            {/* Top Colored Block */}
            <div className={`w-full aspect-[4/3] rounded-[1.5rem] flex items-center justify-center text-black mb-6 ${course.color}`}>
              {course.icon}
            </div>

            {/* Content */}
            <div className="px-2 flex flex-col flex-1">
              <h3 className="text-[1.35rem] leading-tight font-medium mb-3 tracking-tight">
                {course.title}
              </h3>
              
              {/* Meta Info */}
              <div className="flex items-center gap-4 text-[11px] text-zinc-500 font-medium mb-4">
                <div className="flex items-center gap-1.5"><FiClock className="text-zinc-400" /> {course.hours}</div>
                <div className="flex items-center gap-1.5"><FiBookOpen className="text-zinc-400" /> {course.sections}</div>
                <div className="flex items-center gap-1.5"><FiBarChart2 className="text-zinc-400" /> {course.level}</div>
              </div>

              {/* Description */}
              <p className="text-[13px] leading-relaxed text-zinc-600 mb-6 flex-1">
                {course.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-[1.35rem] font-medium tracking-tight">{course.price} USD</span>
                <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-semibold">excl. taxes</span>
              </div>

              {/* Footer row */}
              <div className="flex items-center justify-between mt-auto">
                <button className="bg-[#0f0f11] text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-black/80 transition-colors">
                  Enroll now
                </button>
                
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    {avatars.map((src, i) => (
                      <div
                        key={i}
                        className="relative h-5 w-5 overflow-hidden rounded-full border border-white"
                        style={{ zIndex: 3 - i }}
                      >
                        <Image
                          src={src}
                          alt="Student avatar"
                          fill
                          className="object-cover object-center"
                          sizes="20px"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-[9px] text-zinc-400 font-semibold">{course.enrolled}</span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
