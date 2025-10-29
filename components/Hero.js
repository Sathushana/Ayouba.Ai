"use client";
import React from "react";


const PRIMARY_COLOR_HEX = "#C263F2"; 
const SECONDARY_COLOR_HEX = "#E6E6FA"; 


export default function Hero() {
  const PATTERN_SVG_URL = `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.5' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <>
      <section id="hero" className="w-full bg-white pt-20 py-12 md:py-16">
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto relative px-4 md:px-0">
          <div
            className="md:flex-2 w-full h-[250px] md:h-[600px] bg-[#e0e4ef] bg-no-repeat bg-cover relative"
            style={{
              backgroundImage: 'url("/hero_img_4.png")',
              backgroundPosition: "center 15%",
            }}
          ></div>

          <div className="md:flex-1 w-full flex flex-col justify-center bg-[#f4f4f4] px-6 md:px-8 py-10 md:py-16">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-black leading-tight">
              <span className="block">Live Well.</span>
              <span className="block">Smile More.</span>
              <span className="block">Lifeshift.</span>
            </h1>

            <p className="text-base md:text-lg mb-6 text-black">
              Your smart health companion to make wellness fun, personalized,
              and effortless.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
              
              <a
                href="/try"
                style={{
                  backgroundColor: PRIMARY_COLOR_HEX,
                  color: "white",
                  border: `2px solid ${PRIMARY_COLOR_HEX}`, 
                  transition: "all 0.3s ease",
                }}
                
                className={`px-6 py-3 rounded-xl font-semibold text-center hover:bg-[${SECONDARY_COLOR_HEX}] hover:text-[${PRIMARY_COLOR_HEX}] hover:border-[${PRIMARY_COLOR_HEX}]`}
              >
                Try Lifeshift
              </a>

              
              <a
                href="/about"
                style={{
                  border: `2px solid ${PRIMARY_COLOR_HEX}`,
                  color: PRIMARY_COLOR_HEX,
                  transition: "all 0.3s ease",
                }}
                
                className={`px-6 py-3 rounded-xl font-semibold text-center hover:bg-[${SECONDARY_COLOR_HEX}] hover:text-[${PRIMARY_COLOR_HEX}]`}
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */} 
      {/* new part */}
      {/* <section id="section2" className="w-full py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-10 md:space-y-16 px-4 md:px-0">
          <div className="w-full flex flex-col md:flex-row gap-8">
            <div className="md:flex-1 flex flex-col justify-center px-4 md:px-0 py-4 bg-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
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
                src="/logo.jpg"
                alt="Hero"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

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
      </section> */}

      
      <section id="how-it-works" className="w-full py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center space-y-12 px-4 md:px-0">
          <h2 className="text-3xl font-bold text-gray-900">
            How Lifeshift Works
          </h2>

          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
            {[1, 2, 3].map((num, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-start items-center text-center space-y-4 p-6 bg-white rounded-2xl shadow-xl w-full max-w-xs mx-auto"
              >
                <div
                  className="text-white p-4 rounded-full text-2xl"
                  style={{ backgroundColor: PRIMARY_COLOR_HEX }} 
                >
                  {num}
                </div>
                <h3 className="text-xl font-semibold text-black">
                  {num === 1
                    ? "Build Your Digital Health Profile"
                    : num === 2
                    ? "Take a Health Check & Learn Your Risks"
                    : "Follow Guidance & Earn Rewards"}
                </h3>
                <p className="text-gray-600">
                  {num === 1
                    ? "Enter your age, lifestyle habits, and medical history to create a personalized profile."
                    : num === 2
                    ? "Get AI-powered insights into your lifestyle, habits, and potential health risks."
                    : "Follow AI-recommended actions, track progress, and earn rewards as you improve your health."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
            <section 
        id="build-life" 
        className="w-full py-16 md:py-20 bg-white relative overflow-hidden"
        style={{ backgroundImage: PATTERN_SVG_URL }} 
      >
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 px-4 md:px-8 relative z-10">
          <div className="w-full md:w-3/5 text-center md:text-left space-y-5">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Build Your Happier, Healthier Life{" "}
              <span style={{ color: PRIMARY_COLOR_HEX }}>with Lifeshift</span>{" "}
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Your AI coach helps you set achievable goals, keeps you motivated through fun challenges, and celebrates every milestone. Start your journey of sustainable change today.
            </p>

            <div className="flex justify-center md:justify-start pt-4">
              
              <a
                href="/try"
                style={{
                  backgroundColor: PRIMARY_COLOR_HEX,
                  color: "white",
                }}
                
                className={`px-8 py-3 rounded-xl font-bold transition duration-300 shadow-lg hover:shadow-xl hover:bg-opacity-90 active:scale-95`}
              >
                Join the Movement
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-2/5 flex justify-center">
            <img
              src="/hero_img_51.png"
              alt="Build a happy life with LifeShift"
              className="rounded-3xl shadow-2xl w-full max-w-xs md:max-w-md transition duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      
      
    </>
  );
}