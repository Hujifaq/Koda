"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import { FiClock, FiBookOpen, FiBarChart2, FiPlus, FiX } from "react-icons/fi";

interface CourseDetail {
  id: string;
  title: string;
  duration: string;
}

interface Faq {
  question: string;
  answer: string;
}

interface Course {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  coursesDtl: CourseDetail[];
  enrolled?: number;
  price?: number | string;
  length?: string;
  about?: string;
  whatYouWillLearn?: string[];
  faqs?: Faq[];
}

const avatars = [
  "https://images.unsplash.com/photo-1783881210962-1119b54ce6a4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1785088559550-23875679b825?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI4fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1780676384896-6ff19e8631d1?q=80&w=719&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1762763756344-8915e85fd4e0?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1784874939734-cf0f5f7929c9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1783881214840-f8e4cc635375?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1784035457695-42d44068a223?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1784736932860-f06f3fbb47d5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

export default function IndividualCoursePage() {
  const params = useParams();
  const router = useRouter();
  const { status } = useSession();
  const { category, id } = params;

  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"about" | "learn" | "syllabus">("about");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (course) {
      const savedProgress = localStorage.getItem(`koda_progress_${id}`);
      if (savedProgress) {
        setIsEnrolled(true);
        try {
          const completed = JSON.parse(savedProgress);
          if (completed.length === course.coursesDtl.length && course.coursesDtl.length > 0) {
            setIsFinished(true);
          }
        } catch (e) {
          console.error("Failed to parse progress", e);
        }
      }
    }
  }, [id, course]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // ยิง apiiiii
        const res = await fetch("https://course-api-983j.onrender.com/courses");
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Course[] = await res.json();
        const foundCourse = data.find((c) => c.id === id);
        setCourse(foundCourse || null);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (isLoading) {
    return (
      <div className="bg-[#f4f3f0] min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bg-[#f4f3f0] min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
        <Link href="/courses" className="text-black hover:underline">
          Return to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f3f0] text-black min-h-screen flex flex-col relative selection:bg-black selection:text-white font-sans">
      <Navbar />

      <main className="flex-grow w-full relative z-10 pt-16 pb-24">
        
        {/* Hero Section */}
        <section className="max-w-[1400px] mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          
          <div className="flex flex-col items-start lg:pr-10">
            <h1 className="text-[3rem] md:text-[4rem] lg:text-[4.5rem] leading-[1.05] font-semibold tracking-tight mb-6">
              {course.name}
            </h1>
            
            <div className="flex flex-wrap gap-5 text-[11px] text-zinc-500 font-medium mb-8">
              <div className="flex items-center gap-1.5">
                <FiClock className="text-zinc-400" /> 
                <span>{course.length || `${course.coursesDtl.length * 10} hours`}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiBookOpen className="text-zinc-400" /> 
                <span>{course.coursesDtl.length} sections</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiBarChart2 className="text-zinc-400" /> 
                <span>Beginner level</span>
              </div>
            </div>

            <p className="text-[15px] leading-[1.7] text-zinc-700 mb-10 max-w-lg font-medium">
              {course.description}
            </p>

            <div className="flex items-center flex-wrap gap-5 mb-8">
              <button 
                onClick={() => {
                  if (status === "unauthenticated") {
                    router.push("/login");
                  } else if (status === "authenticated") {
                    router.push(`/learn/${category}/${id}`);
                  }
                }}
                disabled={status === "loading"}
                className="bg-[#0f0f11] text-white text-[13px] font-semibold px-6 py-3 rounded-xl hover:bg-black/90 hover:-translate-y-[4px] hover:transition-all cursor-pointer disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {status === "loading" ? "Loading..." : isFinished ? "Finished" : isEnrolled ? "Enrolled" : "Enroll now"}
              </button>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[1.5rem] font-semibold tracking-tight">
                  {typeof course.price === 'number' ? `฿${course.price.toLocaleString()}` : course.price}
                </span>
                {typeof course.price === 'number' && (
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">excl. taxes</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {avatars.map((src, i) => (
                  <div
                    key={i}
                    className="relative h-7 w-7 overflow-hidden rounded-full border-[1.5px] border-[#f4f3f0]"
                    style={{ zIndex: 3 - i }}
                  >
                    <Image
                      src={src}
                      alt="Student avatar"
                      fill
                      className="object-cover object-center"
                      sizes="28px"
                    />
                  </div>
                ))}
              </div>
              <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider ml-1">
                {course.enrolled ? course.enrolled.toLocaleString() : "250"} enrolled
              </span>
            </div>
          </div>

          {/* Right Image Box (Template Style) */}
          <div className="w-full relative aspect-[1.4/1] rounded-[2.5rem] overflow-hidden shadow-sm bg-[#5ce4b6]">
            <Image
              src={course.image}
              alt={course.name}
              fill
              className="object-cover opacity-90"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </section>

        {/* Content Section (Tabs & FAQ) */}
        <section className="max-w-[1400px] mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Tabs & Content */}
          <div className="flex flex-col">
            
            {/* Tabs Header */}
            <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
              <button 
                onClick={() => setActiveTab("about")}
                className={`px-5 py-2.5 rounded-[0.8rem] text-[13px] font-semibold transition-all whitespace-nowrap ${
                  activeTab === "about" ? "bg-black/10 text-black" : "text-zinc-500 hover:text-black"
                }`}
              >
                About
              </button>
              <button 
                onClick={() => setActiveTab("learn")}
                className={`px-5 py-2.5 rounded-[0.8rem] text-[13px] font-semibold transition-all whitespace-nowrap ${
                  activeTab === "learn" ? "bg-black/10 text-black" : "text-zinc-500 hover:text-black"
                }`}
              >
                What you'll learn
              </button>
              <button 
                onClick={() => setActiveTab("syllabus")}
                className={`px-5 py-2.5 rounded-[0.8rem] text-[13px] font-semibold transition-all whitespace-nowrap ${
                  activeTab === "syllabus" ? "bg-black/10 text-black" : "text-zinc-500 hover:text-black"
                }`}
              >
                Syllabus
              </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
              {activeTab === "about" && (
                <div className="animate-fade-in">
                  <p className="text-[15px] leading-[1.8] text-zinc-700">
                    {course.about || course.description}
                  </p>
                </div>
              )}

              {activeTab === "learn" && (
                <div className="animate-fade-in flex flex-col gap-4">
                  {(course.whatYouWillLearn || []).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
                      <p className="text-[15px] leading-[1.6] text-zinc-700">{item}</p>
                    </div>
                  ))}
                  {(!course.whatYouWillLearn || course.whatYouWillLearn.length === 0) && (
                    <p className="text-zinc-500">No details provided.</p>
                  )}
                </div>
              )}

              {activeTab === "syllabus" && (
                <div className="animate-fade-in flex flex-col gap-3">
                  {course.coursesDtl.map((dtl, idx) => (
                    <div key={dtl.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/50 border border-black/5">
                      <div className="flex items-center gap-4">
                        <span className="text-[13px] font-bold text-zinc-400 w-5">{idx + 1}.</span>
                        <h4 className="text-[14px] font-semibold text-black">{dtl.title}</h4>
                      </div>
                      <div className="text-[12px] font-medium text-zinc-500">
                        {dtl.duration}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right: FAQs */}
          <div className="flex flex-col gap-3">
            {(course.faqs || []).map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl overflow-hidden cursor-pointer shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div className="p-5 flex items-center justify-between">
                    <h4 className="text-[14px] font-semibold text-black pr-4">{faq.question}</h4>
                    <button className="flex-shrink-0 text-black">
                      {isOpen ? <FiX className="text-xl" /> : <FiPlus className="text-xl" />}
                    </button>
                  </div>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 animate-fade-in">
                      <p className="text-[14px] leading-[1.6] text-zinc-600">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
            
            {(!course.faqs || course.faqs.length === 0) && (
              <p className="text-zinc-500">No FAQs available.</p>
            )}
          </div>

        </section>
      </main>

      <Footer />
      
      {/* Simple inline style for fade in animation */}
      <style dangerouslySetInnerHTML={{__html: `
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
