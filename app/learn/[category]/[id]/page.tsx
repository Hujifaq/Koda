"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FiCheckCircle, FiCircle, FiPlayCircle, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { Navbar } from "../../../components/Navbar";

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
  coursesDtl: CourseDetail[];
}

export default function LearnPage() {
  const { category, id } = useParams();
  const router = useRouter();
  const { status } = useSession();

  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSubjectId, setActiveSubjectId] = useState<string | null>(null);
  const [completedSubjects, setCompletedSubjects] = useState<string[]>([]);
  
  const STORAGE_KEY = `koda_progress_${id}`;

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Load course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch("https://course-api-983j.onrender.com/courses");
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Course[] = await res.json();
        const foundCourse = data.find((c) => c.id === id);
        
        if (foundCourse) {
          setCourse(foundCourse);
          if (foundCourse.coursesDtl.length > 0) {
            setActiveSubjectId(foundCourse.coursesDtl[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  // Load progress from local storage
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      try {
        setCompletedSubjects(JSON.parse(savedProgress));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, [STORAGE_KEY]);

  // Save progress to local storage when it changes
  useEffect(() => {
    if (completedSubjects.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedSubjects));
    }
  }, [completedSubjects, STORAGE_KEY]);

  if (status === "loading" || isLoading) {
    return (
      <div className="bg-[#f5f4ee] min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bg-[#f5f4ee] min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
        <Link href="/courses" className="text-black hover:underline">
          Return to Courses
        </Link>
      </div>
    );
  }

  const activeSubject = course.coursesDtl.find(s => s.id === activeSubjectId);
  const isFinishedAll = completedSubjects.length === course.coursesDtl.length && course.coursesDtl.length > 0;

  const handleComplete = () => {
    if (activeSubjectId && !completedSubjects.includes(activeSubjectId)) {
      setCompletedSubjects([...completedSubjects, activeSubjectId]);
    }
  };

  return (
    <div className="bg-[#f5f4ee] text-black min-h-screen flex flex-col font-sans selection:bg-black selection:text-white">
      <Navbar />

      <main className="flex-grow w-full max-w-[1600px] mx-auto px-4 md:px-8 pt-24 pb-12 flex flex-col lg:flex-row gap-8">
        
        {/* Left Side*/}
        <aside className="w-full lg:w-[350px] flex-shrink-0 flex flex-col gap-6">
          <Link href={`/courses/${category}/${id}`} className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-black transition-colors w-fit">
            <FiArrowLeft /> Back to Course Info
          </Link>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-200/60">
            <h2 className="text-xl font-bold tracking-tight mb-2">{course.name}</h2>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-6">
              <span>{completedSubjects.length} / {course.coursesDtl.length} Completed</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-zinc-100 rounded-full h-2 mb-6 overflow-hidden">
              <div 
                className="bg-green-500 h-full transition-all duration-500 ease-out rounded-full"
                style={{ width: `${(completedSubjects.length / Math.max(1, course.coursesDtl.length)) * 100}%` }}
              />
            </div>

            <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {course.coursesDtl.map((subject, idx) => {
                const isActive = activeSubjectId === subject.id;
                const isCompleted = completedSubjects.includes(subject.id);

                return (
                  <button
                    key={subject.id}
                    onClick={() => setActiveSubjectId(subject.id)}
                    className={`flex items-start text-left gap-3 p-4 rounded-2xl transition-all cursor-pointer ${
                      isActive 
                        ? "bg-black text-white shadow-md" 
                        : "bg-zinc-50/50 hover:bg-zinc-100 text-zinc-800"
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {isCompleted ? (
                        <FiCheckCircle className={`text-lg ${isActive ? 'text-green-400' : 'text-green-500'}`} />
                      ) : isActive ? (
                        <FiPlayCircle className="text-lg text-white" />
                      ) : (
                        <FiCircle className="text-lg text-zinc-300" />
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className={`text-[11px] font-bold tracking-wider uppercase ${isActive ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        Lesson {idx + 1}
                      </span>
                      <span className={`text-[14px] font-medium leading-snug ${isActive ? 'text-white' : 'text-zinc-900'}`}>
                        {subject.title}
                      </span>
                      <span className={`text-[12px] font-medium ${isActive ? 'text-zinc-300' : 'text-zinc-500'}`}>
                        {subject.duration}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Side */}
        <section className="flex-grow flex flex-col min-w-0">
          <div className="bg-white rounded-[2.5rem] p-4 md:p-6 shadow-sm border border-neutral-200/60 w-full mb-8">
            <div className="w-full aspect-video bg-black rounded-3xl overflow-hidden relative shadow-inner">
              
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Course Video"
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {activeSubject && (
            <div className="px-2 md:px-6">
              <h1 className="text-[2rem] md:text-[2.5rem] font-bold tracking-tight mb-4 text-[#1a1a1a]">
                {activeSubject.title}
              </h1>
              <p className="text-zinc-500 font-medium mb-8">
                Duration: {activeSubject.duration}
              </p>
              
              <div className="flex items-center gap-4">
                {isFinishedAll ? (
                  <button 
                    disabled
                    className="bg-green-500 text-white font-bold text-sm px-8 py-4 rounded-xl flex items-center gap-2 cursor-default shadow-sm shadow-green-500/20"
                  >
                    <FiCheckCircle className="text-lg" />
                    Course Finished!
                  </button>
                ) : (
                  <button
                    onClick={handleComplete}
                    disabled={completedSubjects.includes(activeSubject.id)}
                    className={`font-bold text-sm px-8 py-4 rounded-xl flex items-center gap-2 transition-all ${
                      completedSubjects.includes(activeSubject.id)
                        ? "bg-zinc-200 text-zinc-500 cursor-not-allowed"
                        : "bg-black text-white hover:bg-black/90 hover:-translate-y-1 shadow-md shadow-black/10 cursor-pointer"
                    }`}
                  >
                    <FiCheckCircle className="text-lg" />
                    {completedSubjects.includes(activeSubject.id) ? "Subject Completed" : "Complete Subject"}
                  </button>
                )}
              </div>
            </div>
          )}
        </section>

      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e5e5;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d4d4d4;
        }
      `}} />
    </div>
  );
}
