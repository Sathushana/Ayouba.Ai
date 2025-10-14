"use client";
import React from "react";
const PRIMARY_COLOR_HEX = "#C263F2"; 
const PRIMARY_COLOR_DARKER_HEX = "#A326E7"; 
const SECONDARY_COLOR_HOVER_HEX = "#E6E6FA"; 


export default function Contact() {
  const PRIMARY_COLOR_TEXT = `text-[${PRIMARY_COLOR_HEX}]`;

  return (
    <section
      id="contact"
      className="w-full py-16 md:py-20 bg-gray-50 pt-20 md:pt-24"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-12 space-y-3">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Get In <span className={PRIMARY_COLOR_TEXT}>Touch</span>
          </h2>
          <p className="text-lg text-gray-600">
            We&apos;d love to hear from you. Fill out the form or reach us directly.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="lg:w-2/3 p-6 sm:p-8 bg-white rounded-2xl shadow-xl transition duration-300 hover:shadow-2xl">
            <form className="space-y-6">
              {[
                { id: "name", label: "Name", type: "text", placeholder: "Your Full Name" },
                { id: "email", label: "Email", type: "email", placeholder: "name@example.com" },
              ].map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[${PRIMARY_COLOR_HEX}] focus:border-transparent transition duration-200 text-gray-900`}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  
                  className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[${PRIMARY_COLOR_HEX}] focus:border-transparent transition duration-200 text-gray-900`}
                  placeholder="How can we help?"
                ></textarea>
              </div>

              
              <button
                type="submit"
                style={{
                  backgroundColor: PRIMARY_COLOR_HEX,
                  color: "white",
                }}
                className={`w-full py-3 rounded-xl font-bold shadow-lg transition duration-300 hover:shadow-xl hover:bg-opacity-90 active:scale-95`}
              >
                Send Message
              </button>
            </form>
          </div>

          
          <div className="lg:w-1/3 p-6 space-y-8 bg-white rounded-2xl shadow-xl">
            <h3 className="text-xl font-extrabold text-gray-900 border-b pb-3" style={{ borderColor: SECONDARY_COLOR_HOVER_HEX }}>
              Contact Details
            </h3>

            <div className="space-y-2">
              <p className="font-bold text-gray-700">Email Support</p>
              <a href="mailto:support@ayubo.ai" className={PRIMARY_COLOR_TEXT + " font-medium text-sm transition duration-300 hover:underline"}>
                support@lifeshift.ai
              </a>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-gray-700">Media Inquiries</p>
              <a href="mailto:press@ayubo.ai" className={PRIMARY_COLOR_TEXT + " font-medium text-sm transition duration-300 hover:underline"}>
                press@lifeshift.ai
              </a>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-gray-700">Head Office</p>
              <p className="text-gray-700 text-sm">Colombo, Sri Lanka 🇱🇰</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}