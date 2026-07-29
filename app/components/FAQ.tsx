"use client";

import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "Can I enroll in multiple courses at once?",
    answer: "Yes, absolutely! You can enroll in as many courses as you like and learn at your own pace.",
  },
  {
    question: "Are there any prerequisites for specific courses?",
    answer: "Most of our beginner courses have no prerequisites. Advanced courses will list any required prior knowledge on their overview page.",
  },
  {
    question: "How long do I have to complete a course?",
    answer: "You have lifetime access to any course you enroll in, so you can take as long as you need to complete it.",
  },
  {
    question: "Are the courses updated regularly?",
    answer: "Yes, our industry experts review and update the course materials regularly to ensure you're learning the most current practices.",
  },
  {
    question: "Can I access the course materials after I complete the course?",
    answer: "Yes! Lifetime access means you can always return to review the materials, even after you've finished the course.",
  },
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full max-w-4xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-[2.5rem] md:text-[3.5rem] leading-[1.1] font-medium tracking-tight text-[#1a1a1a] mb-6">
          You questions, we have the answers.
        </h2>
        <p className="text-[#4a4a4a] text-sm md:text-base leading-relaxed max-w-lg mx-auto">
          If you can't find the answer to your question below, please get in{" "}
          <a href="#" className="underline decoration-1 underline-offset-4 hover:text-[#7c5cff] transition-colors">
            contact
          </a>{" "}
          with us today.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-shadow hover:shadow-sm"
              onClick={() => toggleAccordion(index)}
            >
              <div className="px-8 py-6 flex items-center justify-between">
                <span className="font-medium text-[#1a1a1a] pr-8">{faq.question}</span>
                <span className="text-[#1a1a1a] flex-shrink-0">
                  {isOpen ? <FiMinus className="text-xl" /> : <FiPlus className="text-xl" />}
                </span>
              </div>
              
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-8 pb-6 text-[#4a4a4a] text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
