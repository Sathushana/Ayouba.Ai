// components/Hero.js
"use client";
import React from "react";

export default function Hero() {
  return (
    <>
      <section id="hero" className="w-full bg-white pt-20 md:pt-0">
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto relative px-4 md:px-0">
          {/* Left Images (Original Code Reverted as requested) */}
          <div
            className="md:flex-2 w-full h-[250px] md:h-[600px] bg-[#e0e4ef] bg-no-repeat bg-cover relative"
            style={{
              backgroundImage: 'url("/hero_img_4.png")',
              backgroundPosition: "center 15%",
            }}
          ></div>

          {/* Right Text (With Improvements) */}
          <div
            className="md:flex-1 w-full flex flex-col justify-center bg-[#f4f4f4] px-6 md:px-8 py-10 md:py-16"
          >
            {/* HEADLINE CHANGE: Separated into 3 lines and increased font weight */}
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-black leading-tight">
              <span className="block">Live Well.</span>
              <span className="block">Smile More.</span>
              <span className="block">Ayubo.</span>
            </h1>

            <p className="text-base md:text-lg mb-6 text-black">
              Your smart health companion to make wellness fun, personalized,
              and effortless.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
              <a
                href="/try"
                className="bg-[#e72638] text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#c71f40] transition border-2 border-transparent hover:border-[#c71f40] text-center"
              >
                Try Ayubo
              </a>
              <a
                href="#learn"
                className="border-[#e72638] text-[#e72638] px-6 py-3 rounded-xl font-semibold hover:bg-[#e72638] hover:text-white transition border-2 hover:border-[#c71f40] text-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: AI Lifestyle Coach (Text, Image & Icons) */}
      <section id="section2" className="w-full py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-10 md:space-y-16 px-4 md:px-0">
          {/* Text and Image Row */}
          <div className="w-full flex flex-col md:flex-row gap-8">
            <div className="md:flex-1 flex flex-col justify-center px-4 md:px-0 py-4 bg-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black ">
                AI Lifestyle Prevention & Wellness Coach
              </h2>
              <p className="text-base md:text-lg mb-4 text-black">
                Delivering scalable, personalised, evidence-based lifestyle
                coaching to reduce risk of noncommunicable diseases and mental
                health disorders.
              </p>
              <ul className="list-disc list-inside space-y-2 text-black"> 
                <li>Unhealthy diet & physical activity</li>
                <li>Obesity & metabolic health</li>
                <li>Tobacco & alcohol use</li>
                <li>Mental health & stress management</li>
                <li>Sleep & recovery</li>
              </ul>
              <p className="mt-4 text-black">
                The AI uses behavioural science models (SCT, SDT,
                Transtheoretical Model, Motivational Interviewing, Nudge Theory)
                to assess, educate, set goals, support, and review progress for
                every user.
              </p>
            </div>

            <div className="md:flex-1 w-full flex h-64 md:h-auto">
              <img
                src="/hero_img.png"
                alt="Hero"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Bottom Symbols Row: Responsive icon sizing and justify-around for spacing */}
          <div className="w-full bg-[#f0f0f0] flex justify-around items-center py-6 mt-10">
            <img
              src="/img_1.png"
              alt="Backed by AI"
              className="size-16 md:size-24 object-contain"
            />
            <img
              src="/img_2.png"
              alt="Prevention"
              className="size-16 md:size-24 object-contain"
            />
            <img
              src="/img_5.png"
              alt="Smart Goals"
              className="size-16 md:size-24 object-contain"
            />
            <img
              src="/img_3.png"
              alt="Progress Reviews"
              className="size-16 md:size-24 object-contain"
            />
            <img
              src="/img_4.png"
              alt="Rewards"
              className="size-16 md:size-24 object-contain"
            />
          </div>
        </div>
      </section>

      {/* SECTION 3: How It Works (Steps) */}
      <section id="how-it-works" className="w-full py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center space-y-12 px-4 md:px-0">
          <h2 className="text-3xl font-bold text-gray-900">
            How Ayubo.AI Works
          </h2>

          {/* Cards: items-stretch fixes vertical misalignment of the numbers */}
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
            {/* Card 1 */}
            <div className="flex flex-col justify-start items-center text-center space-y-4 p-6 bg-white rounded-2xl shadow-xl w-full max-w-xs mx-auto">
              <div className="bg-[#e72638] text-white p-4 rounded-full text-2xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-black">
                Build Your Digital Health Profile
              </h3>
              <p className="text-gray-600">
                Enter your age, lifestyle habits, and medical history to create
                a personalized profile.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col justify-start items-center text-center space-y-4 p-6 bg-white rounded-2xl shadow-xl w-full max-w-xs mx-auto">
              <div className="bg-[#e72638] text-white p-4 rounded-full text-2xl">
                2
              </div>
              <h3 className="text-xl font-semibold text-black">
                Take a Health Check & Learn Your Risks
              </h3>
              <p className="text-gray-600">
                Get AI-powered insights into your lifestyle, habits, and
                potential health risks.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col justify-start items-center text-center space-y-4 p-6 bg-white rounded-2xl shadow-xl w-full max-w-xs mx-auto">
              <div className="bg-[#e72638] text-white p-4 rounded-full text-2xl">
                3
              </div>
              <h3 className="text-xl font-semibold text-black">
                Follow Guidance & Earn Rewards
              </h3>
              <p className="text-gray-600">
                Follow AI-recommended actions, track your progress, and earn
                badges, milestones, and motivational rewards as you improve your
                health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Build Life (CTA) */}
      <section id="build-life" className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 px-4 md:px-8">
          {/* Image */}
          <div className="w-full md:w-2/5 flex justify-center">
            <img
              src="/hero_img_5.png"
              alt="Build a happy life with Ayubo.AI"
              className="rounded-2xl shadow-lg w-full max-w-xs md:max-w-md"
            />
          </div>

          {/* Text Content */}
          <div className="w-full md:w-3/5 text-center md:text-left space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              Build Your Happier, Healthier Life{" "}
              <span className="text-[#e72638]">with Ayubo.AI</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Your personal AI lifestyle coach helps you set goals, stay
              motivated, and celebrate milestones — one small change at a time.
            </p>

            <div className="flex justify-center md:justify-start">
              <a
                href="/try"
                className="bg-[#e72638] text-white px-6 py-3 rounded-xl font-semibold  hover:bg-white hover:text-[#c71f40] transition border-2 border-transparent hover:border-[#c71f40]"
              >
                Try Ayubo
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
