"use client";
import React from "react";

const PRIMARY_COLOR_HEX = "#C263F2";
const PRIMARY_COLOR_HOVER_DARKER_HEX = "#A44DE2";

export default function DoctorVideoClips() {
  const APP_NAME = "Lifeshift";
  const PRIMARY_COLOR_TEXT = `text-[${PRIMARY_COLOR_HEX}]`;
  const ACCENT_BG = "bg-gray-100";

  const doctorClips = [
    {
      name: "Dr. Liyanage",
      title: "Cardiologist",
      quote: "Lifeshift makes preventative care accessible to everyone.",
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
    <div className="aspect-video w-full rounded-xl shadow-2xl overflow-hidden relative bg-black">
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        playsInline
        controls
        preload="metadata"
        muted
        poster={`https://placehold.co/640x360/${PRIMARY_COLOR_HEX.slice(
          1
        )}/ffffff?text=Click+to+Play`}
        onError={(e) =>
          console.error(
            `Video failed to load for ${name}. Check path: ${videoUrl}`,
            e
          )
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
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Trusted by Health Leaders
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Hear directly from doctors and specialists about the scientific
            rigor and positive impact of {APP_NAME}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {doctorClips.map((clip, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4"
            >
              <VideoEmbed videoUrl={clip.videoUrl} name={clip.name} />
              <div
                className={`w-full p-6 bg-white rounded-xl shadow-lg border-t-4 border-[${PRIMARY_COLOR_HEX}] transform hover:scale-[1.02] transition duration-300`}
              >
                <blockquote className="text-gray-700 italic mb-3 text-base">
                  &quot;{clip.quote}&quot;
                </blockquote>
                <p className="font-bold text-black mb-1">{clip.name}</p>
                <p className={`text-sm ${PRIMARY_COLOR_TEXT}`}>{clip.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <a
            href="/about"
            className="border-[#C263F2] text-[#C263F2] px-8 py-3 rounded-xl font-semibold hover:bg-[#C263F2] hover:text-white transition border-2 hover:border-[#A44DE2] shadow-md"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
