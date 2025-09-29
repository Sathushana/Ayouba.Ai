"use client";
import React from "react";

export default function Contact() {
  const PRIMARY_COLOR_BG = "bg-[#e72638]";
  const PRIMARY_COLOR_TEXT = "text-[#e72638]";

  return (
    // Added pt-20 to push content below the fixed header
    <section id="contact" className="w-full py-16 md:py-24 bg-gray-100 pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Get In <span className={PRIMARY_COLOR_TEXT}>Touch</span>
          </h2>
          <p className="text-lg text-gray-600">
            We'd love to hear from you. Fill out the form or reach us directly via email.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Contact Form */}
          <div className="lg:w-2/3 p-8 bg-white rounded-2xl shadow-xl">
            {/* Note: This form is decorative; actual submission requires backend logic. */}
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#e72638] focus:border-[#e72638] transition text-black"
                  placeholder="Your Full Name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#e72638] focus:border-[#e72638] transition text-black"
                  placeholder="name@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#e72638] focus:border-[#e72638] transition text-black"
                  placeholder="How can we help?"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-semibold text-white ${PRIMARY_COLOR_BG} hover:bg-[#c71f40] transition shadow-md`}
              >
                Send Message
              </button>
            </form>
          </div>
          
          {/* Contact Details */}
          <div className="lg:w-1/3 p-6 space-y-6 bg-white rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold text-gray-900">Details</h3>
            
            <div className="space-y-2">
              <p className="font-semibold text-gray-700">Email Support</p>
              <p className={PRIMARY_COLOR_TEXT}>support@ayubo.ai</p>
            </div>
            
            <div className="space-y-2">
              <p className="font-semibold text-gray-700">Media Inquiries</p>
              <p className={PRIMARY_COLOR_TEXT}>press@ayubo.ai</p>
            </div>
            
            <div className="space-y-2">
              <p className="font-semibold text-gray-700">Head Office</p>
              <p className="text-gray-700">Colombo, Sri Lanka</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
