"use client";
import React from "react";
const PRIMARY_COLOR_HEX = "#C263F2";
const SECONDARY_COLOR_HOVER_HEX = "#E6E6FA"; 


export default function About() {
  const APP_NAME = "Lifeshift";
  const PRIMARY_COLOR_TEXT = `text-[${PRIMARY_COLOR_HEX}]`;
  const ACCENT_BG = `bg-[${SECONDARY_COLOR_HOVER_HEX}]`; 

  return (
    <section
      id="about"
      className="w-full py-16 md:py-20 bg-white pt-20 md:pt-24"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12 md:space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Our Mission: Wellness Made{" "}
            <span className={PRIMARY_COLOR_TEXT}>Effortless</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            {APP_NAME} was founded on the belief that better health should not
            be complicated. We deliver personalized, evidence-based lifestyle
            coaching designed to integrate seamlessly into your daily life.
          </p>
        </div>

        <div
          className={`p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl ${ACCENT_BG} space-y-8 md:space-y-10 border border-gray-100`}
        >
          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center">
            The Science Behind the Smile
          </h3>
          <p className="text-gray-700 text-base md:text-lg max-w-4xl mx-auto text-center">
            Our coaching platform is built on robust behavioral science models
            to drive genuine, sustainable change. We move beyond simple tracking
            to provide AI-powered, contextual support.
          </p>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Evidence-Based Focus",
                content: (
                  <ul className="text-sm text-gray-600 list-disc list-inside mt-1 space-y-1">
                    <li>Noncommunicable Diseases (NCDs)</li>
                    <li>Obesity &amp; Metabolic Health</li>
                    <li>Mental Health Disorders</li>
                  </ul>
                ),
              },
              {
                title: "Core Behavioral Models",
                content: (
                  <p className="text-sm text-gray-600 mt-1">
                    SCT, SDT, Transtheoretical Model, Motivational Interviewing, and Nudge
                    Theory.
                  </p>
                ),
              },
              {
                title: "Personalized Approach",
                content: (
                  <p className="text-sm text-gray-600 mt-1">
                    Assessment, Education, Goal Setting, Continuous Support, and
                    Progress Review-tailored for every user&apos;s unique journey.
                  </p>
                ),
              },
            ].map((item, index) => (
              <div key={index} 
                className="flex flex-col justify-start p-5 bg-white rounded-xl shadow-lg border-t-4 transition duration-300 hover:shadow-xl hover:scale-[1.01]"
                style={{ borderColor: PRIMARY_COLOR_HEX }}
              >
                <span className="font-bold text-lg text-gray-900 mb-2">
                  {item.title}
                </span>
                {item.content}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-8 space-y-4">
          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Ready to live well and smile more?
          </h3>
          <a
            href="/try"
            style={{
              backgroundColor: PRIMARY_COLOR_HEX,
              color: "white",
            }}
            className={`inline-block px-10 py-3 rounded-xl font-bold shadow-lg transition duration-300 hover:shadow-xl hover:bg-opacity-90 active:scale-95`}
          >
            Try {APP_NAME.replace(".AI", "")}
          </a>
        </div>
      </div>
    </section>
  );
}