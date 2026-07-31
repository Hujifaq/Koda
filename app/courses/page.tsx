"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FiClock, FiBookOpen, FiBarChart2, FiSearch } from "react-icons/fi";
import Link from "next/link";
import gsap from "gsap";
import RotatingText from "../components/RotatingText";

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
}

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face",
];

const MagneticLink = ({ href, children, className }: any) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    gsap.to(ref.current, { 
      x: x * 0.3, 
      y: y * 0.3, 
      duration: 0.4, 
      ease: "power2.out" 
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { 
      x: 0, 
      y: 0, 
      duration: 0.7, 
      ease: "elastic.out(1, 0.5)" 
    });
  };

  return (
    <Link 
      href={href} 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </Link>
  );
};

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <div className="bg-white rounded-[2rem] p-4 pb-6 flex flex-col shadow-sm border border-gray-100/50 transition-shadow duration-300 group">
      
      {/* Image Block from API */}
      <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6 bg-gray-100">
        <Image
          src={course.image}
          alt={course.name}
          fill
          className="object-cover transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/95 backdrop-blur-md text-black text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
            {course.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-2 flex flex-col flex-1">
        {/* Removed group-hover:text-[#7c5cff] */}
        <h3 className="text-[1.35rem] leading-[1.2] font-semibold mb-3 tracking-tight transition-colors">
          {course.name}
        </h3>
        
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-[11px] text-zinc-500 font-medium mb-4">
          <div className="flex items-center gap-1.5"><FiClock className="text-zinc-400" /> {course.coursesDtl.length * 10} hours</div>
          <div className="flex items-center gap-1.5"><FiBookOpen className="text-zinc-400" /> {course.coursesDtl.length} sections</div>
          <div className="flex items-center gap-1.5"><FiBarChart2 className="text-zinc-400" /> All levels</div>
        </div>

        <p className="text-[13px] leading-relaxed text-zinc-600 mb-6 flex-1 line-clamp-2">
          {course.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mb-6">
          <span className="text-[1.35rem] font-semibold tracking-tight">$ 129.00 USD</span>
          <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-semibold">excl. taxes</span>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between mt-auto">
          <MagneticLink 
            href={`/courses/${course.id}`} 
            className="block"
          >
            <div className="bg-[#0f0f11] text-white text-xs font-semibold px-5 py-3 rounded-xl hover:bg-black/90 hover:-translate-y-[4px] transition-all duration-300">
              Enroll now
            </div>
          </MagneticLink>
          
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {avatars.map((src, i) => (
                <div
                  key={i}
                  className="relative h-6 w-6 overflow-hidden rounded-full border border-white"
                  style={{ zIndex: 3 - i }}
                >
                  <Image
                    src={src}
                    alt="Student avatar"
                    fill
                    className="object-cover object-center"
                    sizes="24px"
                  />
                </div>
              ))}
            </div>
            <span className="text-[9px] text-zinc-400 font-semibold uppercase tracking-wider">250 enrolled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isLoading, setIsLoading] = useState(true);

  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(pathRef.current, { strokeDashoffset: 0, duration: 1, delay: 0.5, ease: "power2.out" });
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // ยิง api
        const res = await fetch("/api/courses");
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Course[] = await res.json();
        setCourses(data);
        
        const uniqueCategories = Array.from(new Set(data.map((c) => c.category)));
        setCategories(["All Categories", ...uniqueCategories]);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "All Categories" || course.category === selectedCategory;
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#fcfbf7] text-black min-h-screen flex flex-col relative">
      
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full border-[1px] border-zinc-300/40"></div>
        <div className="absolute top-[20%] left-[-20%] w-[60vw] h-[60vw] bg-[#7c5cff]/4 rounded-full blur-[100px]"></div>
      </div>

      <Navbar />

      <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-16 relative z-10">
        
       
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-[3rem] md:text-[4.5rem] leading-[1.05] font-semibold tracking-tight mb-8">
            <span className="relative inline-block">
              Courses
              <svg
                className="absolute -bottom-2 left-0 w-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 280 16"
                preserveAspectRatio="none"
                style={{ overflow: "visible" }}
              >
                <path
                  ref={pathRef}
                  d="M2 12 C 40 4, 80 18, 140 10 S 220 6, 278 11"
                  stroke="#55e0b6"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            to guide to you to a stronger financial future.
          </h1>
          <p className="text-[15px] leading-relaxed text-zinc-600 font-medium">
            Explore our comprehensive range of financial courses
          </p>
        </div>

      
        <div className="w-full max-w-4xl mx-auto relative z-20">
          <div className="relative w-full bg-white border border-gray-200/80 rounded-full shadow-sm overflow-hidden flex items-center">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none z-20">
              <FiSearch className="text-zinc-400 text-xl" />
            </div>
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-5 pl-14 pr-6 text-base font-medium focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all bg-transparent relative z-10"
            />
            
            {/* Animated Placeholder */}
            {!searchQuery && (
              <div className="absolute inset-y-0 left-0 pl-14 flex items-center pointer-events-none text-zinc-400 text-base font-medium z-0">
                
                <RotatingText
                  texts={["Javascript courses...", "Next.js courses...", "Figma coures...", "React courses..."]}
                  mainClassName="inline-flex ml-1 overflow-hidden"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={3000}
                />
              </div>
            )}
          </div>
        </div>

     
        <div className="flex flex-col md:flex-row gap-12 w-full mt-4">
          
         
          <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-10">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3 px-1">Categories</h3>
              {isLoading && categories.length === 0 ? (
                [1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-11 bg-black/5 rounded-xl animate-pulse"></div>
                ))
              ) : (
                categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left px-4 py-3 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                      selectedCategory === cat
                        ? "bg-black text-white shadow-md transform scale-[1.02]"
                        : "text-zinc-600 border border-transparent hover:bg-black/5 hover:text-black"
                    }`}
                  >
                    {cat}
                  </button>
                ))
              )}
            </div>
          </aside>

          {/* Right Content (Course Grid) */}
          <section className="flex-1 flex flex-col">
            <div className="flex items-end justify-between mb-8 pb-4 border-b border-black/5">
              <h2 className="text-2xl font-medium tracking-tight">
                {selectedCategory}
              </h2>
              <span className="text-[11px] font-semibold text-zinc-500 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                {filteredCourses.length} result{filteredCourses.length !== 1 && 's'}
              </span>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-[2rem] p-4 pb-6 flex flex-col shadow-sm border border-gray-100/50 animate-pulse">
                    <div className="w-full aspect-[4/3] rounded-[1.5rem] bg-gray-100 mb-6"></div>
                    <div className="h-6 bg-gray-100 rounded-md w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-100 rounded-md w-1/2 mb-6"></div>
                  </div>
                ))}
              </div>
            ) : filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center bg-transparent border border-dashed border-gray-300 rounded-[2rem] h-full min-h-[400px]">
                <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight mb-2">No courses found</h3>
                <p className="text-zinc-500 text-[13px] max-w-sm font-medium leading-relaxed">
                  We couldn't find any courses matching "{searchQuery}" in {selectedCategory}. Try adjusting your search or filters.
                </p>
                <button 
                  onClick={() => { setSearchQuery(""); setSelectedCategory("All Categories"); }}
                  className="mt-8 px-6 py-2.5 bg-black text-white text-[13px] font-semibold rounded-xl hover:bg-[#7c5cff] transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
