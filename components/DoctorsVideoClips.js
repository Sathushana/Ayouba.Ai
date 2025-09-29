"use client";
import React from "react";

export default function DoctorVideoClips() {
  const APP_NAME = "Ayubo.AI";
  const PRIMARY_COLOR_TEXT = "text-[#e72638]";
  const ACCENT_BG = "bg-gray-100";
  const PRIMARY_COLOR = "#e72638";

  const doctorClips = [
    {
      name: "Dr. Liyanage",
      title: "Cardiologist",
      quote: "Ayubo.AI makes preventative care accessible to everyone.",
      videoUrl: "/videos/doctor1.mp4", 
    },
    {
      name: "Dr. Fernando",
      title: "Nutrition Specialist",
      quote: "The personalized plans drive real, measurable health changes.",
      videoUrl: "/videos/doctor2.mp4", 
    },
    {
      name: "Dr. Silva",
      title: "Public Health Expert",
      quote: "A scientifically sound approach to fight NCDs in our community.",
      videoUrl: "/videos/doctor3.mp4", 
    },
  ];

  const VideoEmbed = ({ videoUrl, name }) => (
    <div className="aspect-w-16 aspect-h-9 w-full rounded-xl shadow-2xl overflow-hidden relative bg-black">
      <video
        className="w-full h-full object-cover"
        controls 
        preload="metadata"
        autoPlay 
        muted 
        poster="https://placehold.co/640x360/e72638/ffffff?text=Click+to+Play"
        onError={(e) => console.error(`Video failed to load for ${name}. Check path: ${videoUrl}`, e)}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );

  return (
    <section id="doctor-clips" className={`w-full py-16 md:py-24 ${ACCENT_BG}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-12">
        
        {/* Section Title and CTA */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Trusted by Health Leaders
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Hear directly from doctors and specialists about the scientific rigor and positive impact of {APP_NAME}.
          </p>
        </div>

        {/* Video Clips and Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {doctorClips.map((clip, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4">
              
              {/* 1. Video Player */}
              <VideoEmbed videoUrl={clip.videoUrl} name={clip.name} />

              {/* 2. Profile and Quote Card (Testimonials Section) */}
              <div className="w-full p-6 bg-white rounded-xl shadow-lg border-t-4 border-[#e72638] transform hover:scale-[1.02] transition duration-300">
                <blockquote className="text-gray-700 italic mb-3 text-base">
                  "{clip.quote}"
                </blockquote>
                <p className="font-bold text-black mb-1">{clip.name}</p>
                <p className={`text-sm ${PRIMARY_COLOR_TEXT}`}>{clip.title}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center pt-8">
          <a
            href="/about"
            className="border-[#e72638] text-[#e72638] px-8 py-3 rounded-xl font-semibold hover:bg-[#e72638] hover:text-white transition border-2 hover:border-[#c71f40] shadow-md"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
