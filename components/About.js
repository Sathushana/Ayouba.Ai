"use client";
import React from "react";

export default function About() {
  const APP_NAME = "Ayubo.AI";
  const PRIMARY_COLOR = "text-[#e72638]";
  const ACCENT_BG = "bg-[#e0e4ef]";

  return (
    // Added pt-20 to push content below the fixed header
    <section id="about" className="w-full py-16 md:py-24 bg-white pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
        
        {/* Section 1: Mission and Core Philosophy */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Our Mission: Wellness Made <span className={PRIMARY_COLOR}>Effortless</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {APP_NAME} was founded on the belief that better health should not be complicated. We deliver personalized, evidence-based lifestyle coaching designed to integrate seamlessly into your daily life.
          </p>
        </div>

        {/* Section 2: Scientific Foundation (Based on Hero content) */}
        <div className={`p-8 md:p-12 rounded-2xl shadow-xl ${ACCENT_BG} space-y-8`}>
          <h3 className="text-2xl font-bold text-gray-900">
            The Science Behind the Smile
          </h3>
          <p className="text-gray-700">
            Our coaching platform is built on robust behavioral science models to drive genuine, sustainable change. We move beyond simple tracking to provide AI-powered, contextual support.
          </p>
          {/* FIX: Explicitly set grid-cols-1 for mobile, then md:grid-cols-3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col justify-start p-4 bg-white rounded-xl shadow-md">
              <span className="font-semibold text-lg text-black">Evidence-Based Focus</span>
              <ul className="text-sm text-gray-600 list-disc list-inside mt-1 space-y-1">
                <li>Noncommunicable Diseases (NCDs)</li>
                <li>Obesity & Metabolic Health</li>
                <li>Mental Health Disorders</li>
              </ul>
            </div>
            <div className="flex flex-col justify-start p-4 bg-white rounded-xl shadow-md">
              <span className="font-semibold text-lg text-black">Core Behavioral Models</span>
              <p className="text-sm text-gray-600 mt-1">
                SCT (Social Cognitive Theory), SDT (Self-Determination Theory), Transtheoretical Model, Motivational Interviewing, and Nudge Theory.
              </p>
            </div>
            <div className="flex flex-col justify-start p-4 bg-white rounded-xl shadow-md">
              <span className="font-semibold text-lg text-black">Personalized Approach</span>
              <p className="text-sm text-gray-600 mt-1">
                Assessment, Education, Goal Setting, Continuous Support, and Progress Review—tailored for every user's unique journey.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Call to Action */}
        <div className="text-center pt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to live well and smile more?
          </h3>
          <a
            href="/try"
            className="bg-[#e72638] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#c71f40] transition shadow-lg"
          >
            Try Ayubo
          </a>
        </div>
      </div>
    </section>
  );
}
