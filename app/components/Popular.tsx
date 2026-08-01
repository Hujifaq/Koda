"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiClock, FiBookOpen, FiBarChart2, FiArrowRight } from "react-icons/fi";

interface CourseDetail {
  id: string;
  title: string;
  duration: string;
}

interface Course {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  coursesDtl: CourseDetail[];
  enrolled?: number;
  price?: number;
  length?: string;
}

const avatars = [
  "https://images.unsplash.com/photo-1781730655180-194353c635fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1785452957211-d3857fdf387b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8bjY4aTFIZ25IZWN8fGVufDB8fHx8fA%3D%3D",
];

export function Popular() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("https://course-api-983j.onrender.com/courses");
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Course[] = await res.json();
        // Pick 3 random courses
        const shuffled = data.sort(() => 0.5 - Math.random());
        setCourses(shuffled.slice(0, 3));
      } catch (error) {
        console.error("Error fetching popular courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="flex items-end justify-between mb-12">
        <h2 className="text-[2.5rem] md:text-[3rem] leading-tight font-medium tracking-tight">
          Browse our most popular courses.
        </h2>
        <Link href="/courses" className="flex items-center gap-2 text-sm font-semibold hover:bg-black/5 p-3 rounded-2xl transition-all duration-200 whitespace-nowrap">
          View all <span className="bg-black text-white rounded-full p-1 text-[10px]"><FiArrowRight /></span>
        </Link>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-[2rem] p-4 pb-6 flex flex-col shadow-sm border border-gray-100/50 animate-pulse">
              <div className="w-full aspect-[4/3] rounded-[1.5rem] bg-gray-100 mb-6"></div>
              <div className="h-6 bg-gray-100 rounded-md w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-100 rounded-md w-1/2 mb-6"></div>
            </div>
          ))
        ) : (
          courses.map((course) => (
            <div key={course.id} className="bg-white rounded-[2rem] p-4 pb-6 flex flex-col shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow group">
              
              
              <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6 bg-gray-100">
                <Image
                  src={course.image}
                  alt={course.name}
                  fill
                  className="object-cover transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/95 backdrop-blur-md text-black text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                    {course.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="px-2 flex flex-col flex-1">
                <h3 className="text-[1.35rem] leading-tight font-medium mb-3 tracking-tight">
                  {course.name}
                </h3>
                
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-[11px] text-zinc-500 font-medium mb-4">
                  <div className="flex items-center gap-1.5"><FiClock className="text-zinc-400" /> {course.length || `${course.coursesDtl.length * 10} hours`}</div>
                  <div className="flex items-center gap-1.5"><FiBookOpen className="text-zinc-400" /> {course.coursesDtl.length} sections</div>
                  <div className="flex items-center gap-1.5"><FiBarChart2 className="text-zinc-400" /> All levels</div>
                </div>

                {/* Description */}
                <p className="text-[13px] leading-relaxed text-zinc-600 mb-6 flex-1 line-clamp-2">
                  {course.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-1.5 mb-6">
                  <span className="text-[1.35rem] font-medium tracking-tight">{course.price ? course.price.toLocaleString() : "1,200"} </span>
                  <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-semibold">excl. taxes</span>
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between mt-auto">
                  <Link 
                    href={`/courses/${course.category.toLowerCase().replace(/\s+/g, '-')}/${course.id}`} 
                    className="block"
                  >
                    <div className="bg-[#0f0f11] text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-black/90 transition-all hover:-translate-y-[4px]">
                      Enroll now
                    </div>
                  </Link>
                  
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
                    <span className="text-[9px] text-zinc-400 font-semibold uppercase tracking-wider">{course.enrolled ? course.enrolled.toLocaleString() : "250"} enrolled</span>
                  </div>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
