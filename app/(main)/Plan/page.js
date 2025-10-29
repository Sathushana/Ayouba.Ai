"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FaUserCircle,
  FaTimes,
  FaBullseye,
  FaHome,
  FaTasks,
  FaChartLine,
  FaGift,
  FaInfoCircle,
  FaPhoneAlt,
} from "react-icons/fa";

const PLANS_DATA = [
  {
    id: 1,
    title: "Social Skills Development",
    icon: "💬",
    description: "Build confidence in social interactions and communication",
    steps: [
      "Week 1-2: Basic conversation starters",
      "Week 3-4: Maintaining eye contact practice",
      "Week 5-6: Group interaction exercises",
      "Week 7-8: Real-world social scenarios"
    ]
  },
  {
    id: 2,
    title: "Daily Living Skills",
    icon: "🏠",
    description: "Master essential daily routines and self-care tasks",
    steps: [
      "Morning routine establishment",
      "Personal hygiene independence",
      "Meal preparation basics",
      "Home maintenance skills"
    ]
  },
  {
    id: 3,
    title: "Health & Wellness",
    icon: "💪",
    description: "Develop healthy habits and physical well-being",
    steps: [
      "Regular exercise routine",
      "Balanced nutrition plan",
      "Sleep schedule optimization",
      "Stress management techniques"
    ]
  },
  {
    id: 4,
    title: "Financial Independence",
    icon: "💰",
    description: "Learn money management and financial responsibility",
    steps: [
      "Basic budgeting skills",
      "Banking and savings",
      "Smart shopping habits",
      "Financial goal setting"
    ]
  }
];

const NavButton = ({ icon: Icon, label, active, onClick }) => (
  <motion.button
    className={`flex flex-col items-center justify-center transition-colors px-3 py-1 cursor-pointer ${
      active ? "text-[#C263F2] scale-105" : "text-gray-500 hover:text-gray-700"
    }`}
    onClick={onClick}
    whileTap={{ scale: 0.9 }}
    aria-current={active ? "page" : undefined}
  >
    <Icon className="text-2xl w-6 h-6" />
    <span className="text-xs font-semibold mt-1 truncate">{label}</span>
  </motion.button>
);

const PlanCard = ({ plan }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
    >
      <div className="bg-[#C263F2] p-6 text-white">
        <div className="flex items-center space-x-4">
          <span className="text-3xl">{plan.icon}</span>
          <div>
            <h3 className="text-xl font-bold">{plan.title}</h3>
            <p className="text-white text-opacity-90 mt-1">{plan.description}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-left mb-4"
        >
          <span className="font-semibold text-gray-800">Development Plan</span>
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-[#C263F2] text-lg"
          >
            ▼
          </motion.span>
        </button>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0 }}
          className="overflow-hidden"
        >
          <div className="space-y-3">
            {plan.steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-[#C263F2] text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  {index + 1}
                </div>
                <span className="text-gray-700 flex-1">{step}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Plan = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Plan");

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col font-sans">
      <header className="flex justify-between items-center bg-white text-black p-4 shadow-lg sticky top-0 z-40">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-gray-800">
            Personalised Plan
          </h1>
          <p className="text-sm text-gray-600">Your structured development journey</p>
        </div>
        <button
          onClick={toggleMenu}
          className="p-2 text-2xl text-[#C263F2] rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#C263F2]"
          aria-label="Open User Menu"
        >
          <FaUserCircle className="w-6 h-6" />
        </button>
      </header>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="font-bold text-lg text-[#C263F2]">Lifeshift</h2>
          <button onClick={toggleMenu} className="p-1 rounded hover:bg-red-100" aria-label="Close User Menu">
            <FaTimes className="w-6 h-6 text-red-600" />
          </button>
        </div>

        <nav className="flex flex-col mt-6 space-y-2 px-4">
          <button className="flex items-center gap-3 text-left hover:bg-gray-50 px-3 py-3 rounded-xl transition-colors text-gray-700 font-medium">
            <FaPhoneAlt className="text-[#C263F2] w-5 h-5" /> Contact Support
          </button>
          <button className="flex items-center gap-3 text-left hover:bg-gray-50 px-3 py-3 rounded-xl transition-colors text-gray-700 font-medium">
            <FaInfoCircle className="text-[#C263F2] w-5 h-5" /> About App
          </button>
          <button
            onClick={() => console.log("Logout action")}
            className="flex items-center justify-center mt-6 w-full px-4 py-3 text-white bg-red-600 rounded-xl shadow-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={toggleMenu}
          aria-hidden="true"
        ></div>
      )}

      <main className="p-4 flex-1 overflow-y-auto pb-24 max-w-4xl mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Development Roadmap</h2>
          <p className="text-gray-600">Follow this structured plan to achieve your independence goals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PLANS_DATA.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Next Steps</h3>
          <p className="text-gray-600 mb-4">
            Your personalized plan is designed to help you build skills progressively. 
            Each area focuses on practical, achievable steps toward greater independence.
          </p>
          <div className="bg-[#f5f0fb] p-4 rounded-lg border-l-4 border-[#C263F2]">
            <p className="text-sm text-gray-700">
              <strong>Tip:</strong> Focus on one area at a time and celebrate small victories along the way!
            </p>
          </div>
        </div>

        <motion.button
          onClick={() => router.push("/Progress")}
          className="w-full bg-[#C263F2] text-white px-5 py-4 rounded-xl shadow-xl hover:bg-[#a44ed4] transition cursor-pointer font-bold text-lg flex items-center justify-center gap-2 mt-8"
          whileTap={{ scale: 0.98 }}
        >
          <FaChartLine className="w-5 h-5" />
          Go to Progress Tracker
        </motion.button>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl flex justify-around items-center h-16 md:h-20 border-t border-gray-100 z-50 p-2 md:p-0 cursor-pointer">
        <NavButton
          icon={FaHome}
          label="Home"
          active={activeNav === "Home"}
          onClick={() => {
            setActiveNav("Home");
            router.push("/dashboard-preview");
          }}
        />
        <NavButton
          icon={FaTasks}
          label="To-do"
          active={activeNav === "To-do"}
          onClick={() => {
            setActiveNav("To-do");
            router.push("/To-do");
          }}
        />
        <NavButton
          icon={FaBullseye}
          label="Plan"
          active={activeNav === "Plan"}
          onClick={() => {
            setActiveNav("Plan");
            router.push("/Plan");
          }}
        />
        <NavButton
          icon={FaChartLine}
          label="Progress"
          active={activeNav === "Progress"}
          onClick={() => {
            setActiveNav("Progress");
            router.push("/Progress");
          }}
        />
        <NavButton
          icon={FaGift}
          label="Rewards"
          active={activeNav === "Rewards"}
          onClick={() => {
            setActiveNav("Rewards");
            router.push("/Rewards");
          }}
        />
      </nav>
    </div>
  );
};

export default Plan;