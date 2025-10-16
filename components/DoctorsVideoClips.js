"use client";
import React from "react";

const PRIMARY_COLOR_HEX = "#C263F2";
const ACCENT_BG = "bg-gray-100";

// Doctor's details for the page
const DOCTOR_DETAILS = {
  name: "Dr. Noel Somasundaram",
  titles: "MBBS MD FRCP FSLCE FCCP",
  specialty: "Consultant Endocrinologist",
  clinic: "Diabetes and Hormone Center, Colombo",
};

export default function DoctorVideoClips() {
  const APP_NAME = "Lifeshift";

  // All three videos belong to one doctor now
  // Quotes are removed as requested
  const doctorClips = [
    {
      videoUrl: "/videos/video1.mp4",
    },
    {
      videoUrl: "/videos/video2.mp4",
    },
    {
      videoUrl: "/videos/video3.mp4",
    },
  ];

  // Updated VideoEmbed for portrait videos (9:16 aspect ratio)
  const VideoEmbed = ({ videoUrl }) => (
    <div className="aspect-[9/16] w-full max-w-xs md:max-w-none rounded-xl shadow-2xl overflow-hidden relative bg-black">
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        playsInline
        controls
        preload="metadata"
        muted
        onError={(e) =>
          console.error(`Video failed to load: ${videoUrl}`, e)
        }
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );

  return (
    <section id="doctor-clips" className={`w-full py-16 md:py-24 ${ACCENT_BG}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-12">
        {/* Section Header - Updated for a single doctor */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Insights from {DOCTOR_DETAILS.name}
          </h2>
          <div className="text-lg text-gray-600 max-w-3xl mx-auto space-y-1">
            <p className="font-medium text-gray-700">{DOCTOR_DETAILS.specialty}</p>
            <p className="text-base">{DOCTOR_DETAILS.titles}</p>
            <p className="text-sm italic">{DOCTOR_DETAILS.clinic}</p>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto pt-4">
            Hear from Dr. Somasundaram on how {APP_NAME} drives real preventative health change.
          </p>
        </div>

        {/* Video Grid - Adjusted for portrait videos and removed quotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {doctorClips.map((clip, index) => (
            <div key={index} className="flex flex-col items-center space-y-4">
              <VideoEmbed videoUrl={clip.videoUrl} />
              {/* Removed Blockquote/Quote as requested */}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center pt-8">
          <a
            href="/about"
            className={`border-[${PRIMARY_COLOR_HEX}] text-[${PRIMARY_COLOR_HEX}] px-8 py-3 rounded-xl font-semibold hover:bg-[${PRIMARY_COLOR_HEX}] hover:text-white transition border-2 shadow-md`}
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}