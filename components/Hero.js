// components/Hero.js
"use client";
import React from "react";


export default function Hero() {
  return (
    <>
    <section id="hero" className="w-full">

      <div className="flex flex-col md:flex-row max-w-7xl mx-auto relative">

        {/* Left Images */}
        <div className="md:flex-[3] w-full h-[100px] md:h-[600px] bg-[#e0e4ef] bg-no-repeat bg-cover bg-right relative"
         style={{ backgroundImage: 'url("/hero_img_4.png")', }} >
        </div>

        {/* Right Text */}
        <div className="md:flex-[1] w-full flex flex-col justify-center bg-[#e0e4ef] px-6 md:px-8 py-6 md:py-0">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-black">
            Live Well. Smile More. Ayouba.
          </h1>
          <p className="text-base md:text-lg mb-6 text-black">
            Your smart health companion to make wellness fun, personalized, and effortless.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/try"
              className="bg-[#e72638] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#c71f40] transition"
            >
              Try Ayouba
            </a>
            <a
              href="#learn"
              className="border border-[#e72638] text-[#e72638] px-6 py-3 rounded-xl font-semibold hover:bg-[#e72638] hover:text-white transition"
            >
              Learn More
            </a>
          </div>
        </div>

      </div>

      {/* Other Sections */}
      {/* <div className="w-full h-[25vh] bg-[#e0f7fa] flex justify-center items-center">
        <h2 className="text-3xl font-semibold">Section 2 Content</h2>
      </div>

      <div className="w-full h-[25vh] bg-[#cdeff0] flex justify-center items-center">
        <h2 className="text-3xl font-semibold">Section 3 Content</h2>
      </div>

      <div className="w-full h-[25vh] bg-[#b2e4ea] flex justify-center items-center">
        <h2 className="text-3xl font-semibold">Section 4 Content</h2>
      </div> */}

    </section>
    <section id="section2" className="w-full py-10">
          <div className="max-w-7xl mx-auto flex flex-col items-center space-y-10">

            {/* Main Section: Text & Image Side by Side */}
            <div className="w-full flex flex-col md:flex-row">

              {/* Left Side: Text */}
              <div className="md:flex-1 flex flex-col justify-center px-6 md:px-0 py-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  AI Lifestyle Prevention & Wellness Coach
                </h2>
                <p className="text-base md:text-lg mb-4">
                  Delivering scalable, personalised, evidence-based lifestyle coaching to reduce risk 
                  of noncommunicable diseases and mental health disorders.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Unhealthy diet & physical activity</li>
                  <li>Obesity & metabolic health</li>
                  <li>Tobacco & alcohol use</li>
                  <li>Mental health & stress management</li>
                  <li>Sleep & recovery</li>
                </ul>
                <p className="mt-4 text-gray-700">
                  The AI uses behavioural science models (SCT, SDT, Transtheoretical Model, Motivational Interviewing, Nudge Theory) 
                  to assess, educate, set goals, support, and review progress for every user.
                </p>
              </div>

              {/* Right Side: Image matching text height */}
              <div className="md:flex-1 w-full flex">
                <img
                  src="/hero_img.png"
                  alt="Hero"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>

            {/* Bottom Symbols Row: 5 icons in a row */}
            <div className="w-full bg-[#f0f0f0] flex justify-between items-center mt-10 px-6 md:px-0">
              <img src="/img_1.png" alt="Backed by AI" className="w-40 h-40" />
              <img src="/img_2.png" alt="Prevention" className="w-40 h-40" />
              <img src="/img_5.png" alt="Smart Goals" className="w-40 h-40" />
              <img src="/img_3.png" alt="Progress Reviews" className="w-40 h-40" />
              <img src="/img_4.png" alt="Rewards" className="w-40 h-40" />
            </div>

          </div>
        </section>

        {/* Section 3 */}
        <section id="how-it-works" className="w-full py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto text-center space-y-12">
              <h2 className="text-3xl font-bold text-gray-900">How Ayouba.AI Works</h2>
              <div className="flex flex-col md:flex-row justify-center items-center gap-10">

                {/* Step 1: Build Your Digital Profile */}
                <div className="flex flex-col justify-center items-center text-center space-y-4 p-6 bg-white rounded-2xl shadow-md w-64 h-80">
                  <div className="bg-[#e72638] text-white p-4 rounded-full text-2xl">
                    1
                  </div>
                  <h3 className="text-xl font-semibold">Build Your Digital Health Profile</h3>
                  <p className="text-gray-600">
                    Enter your age, lifestyle habits, and medical history to create a personalized profile.
                  </p>
                </div>

                {/* Step 2: Health Check & Risk Assessment for Person*/}
                <div className="flex flex-col justify-center items-center text-center space-y-4 p-6 bg-white rounded-2xl shadow-md w-64 h-80">
                  <div className="bg-[#e72638] text-white p-4 rounded-full text-2xl">
                    2
                  </div>
                  <h3 className="text-xl font-semibold">Take a Health Check & Learn Your Risks</h3>
                  <p className="text-gray-600">
                    Get AI-powered insights into your lifestyle, habits, and potential health risks.
                  </p>
                </div>

                {/* Step 3: Personalized Guidance & Rewards */}
                <div className="flex flex-col justify-center items-center text-center space-y-4 p-6 bg-white rounded-2xl shadow-md w-64 h-80">
                  <div className="bg-[#e72638] text-white p-4 rounded-full text-2xl">
                    3
                  </div>
                  <h3 className="text-xl font-semibold">Follow Guidance & Earn Rewards</h3>
                  <p className="text-gray-600">
                    Follow AI-recommended actions, track your progress, and earn badges, milestones, and motivational rewards as you improve your health.
                  </p>
                </div>

              </div>
            </div>
          </section>


        {/* Section 4 */}
        <section id="build-life" className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6 md:px-12">
          
          {/* Left Side - Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img 
              src="/hero_img_5.png" 
              alt="Build a happy life with Ayouba.AI" 
              className="rounded-2xl shadow-lg w-full max-w-md"
            />
          </div>

          {/* Right Side - Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Build Your Happier, Healthier Life <span className="text-[#e72638]">with Ayouba.AI</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Your personal AI lifestyle coach helps you set goals, stay motivated, and celebrate milestones — 
              one small change at a time.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/try"
                className="bg-[#e72638] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#c71f40] transition"
              >
                Try Ayouba
              </a>
            </div>
          </div>

        </div>
      </section>

    </>
  );
}
