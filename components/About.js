"use client";
import React from "react";
const PRIMARY_COLOR_HEX = "#C263F2";
const SECONDARY_COLOR_HOVER_HEX = "#E6E6FA"; 


export default function About() {
  const APP_NAME = "Ayubo.AI";
  const PRIMARY_COLOR = `text-[${PRIMARY_COLOR_HEX}]`;
  const ACCENT_BG = "bg-[#e0e4ef]"; 

  return (
    <section
      id="about"
      className="w-full py-16 md:py-24 bg-white pt-20 md:pt-24"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Our Mission: Wellness Made{" "}
            <span className={PRIMARY_COLOR}>Effortless</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {APP_NAME} was founded on the belief that better health should not
            be complicated. We deliver personalized, evidence-based lifestyle
            coaching designed to integrate seamlessly into your daily life.
          </p>
        </div>

        <div
          className={`p-8 md:p-12 rounded-2xl shadow-xl ${ACCENT_BG} space-y-8`}
        >
          <h3 className="text-2xl font-bold text-gray-900">
            The Science Behind the Smile
          </h3>
          <p className="text-gray-700">
            Our coaching platform is built on robust behavioral science models
            to drive genuine, sustainable change. We move beyond simple tracking
            to provide AI-powered, contextual support.
          </p>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col justify-start p-4 bg-white rounded-xl shadow-md">
              <span className="font-semibold text-lg text-black">
                Evidence-Based Focus
              </span>
              <ul className="text-sm text-gray-600 list-disc list-inside mt-1 space-y-1">
                <li>Noncommunicable Diseases (NCDs)</li>
                <li>Obesity &amp; Metabolic Health</li>
                <li>Mental Health Disorders</li>
              </ul>
            </div>
            <div className="flex flex-col justify-start p-4 bg-white rounded-xl shadow-md">
              <span className="font-semibold text-lg text-black">
                Core Behavioral Models
              </span>
              <p className="text-sm text-gray-600 mt-1">
                SCT (Social Cognitive Theory), SDT (Self-Determination Theory),
                Transtheoretical Model, Motivational Interviewing, and Nudge
                Theory.
              </p>
            </div>
            <div className="flex flex-col justify-start p-4 bg-white rounded-xl shadow-md">
              <span className="font-semibold text-lg text-black">
                Personalized Approach
              </span>
              <p className="text-sm text-gray-600 mt-1">
                Assessment, Education, Goal Setting, Continuous Support, and
                Progress Review—tailored for every user&apos;s unique journey.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to live well and smile more?
          </h3>
          <a
            href="/try"
            style={{
              backgroundColor: PRIMARY_COLOR_HEX,
              color: "white",
              border: `2px solid ${PRIMARY_COLOR_HEX}`,
              transition: "all 0.3s ease",
            }}
            className={`px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[${PRIMARY_COLOR_HEX}] hover:border-[${PRIMARY_COLOR_HEX}] transition shadow-lg`}
          >
            Try Ayubo
          </a>
        </div>
      </div>
    </section>
  );
}