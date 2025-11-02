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
  FaTrophy,
  FaStar,
  FaCalendar,
} from "react-icons/fa";

const PROGRESS_DATA = [
  {
    id: 1,
    category: "Social Skills",
    icon: "💬",
    progress: 65,
    completed: 13,
    total: 20,
    streak: 7,
  },
  {
    id: 2,
    category: "Daily Living",
    icon: "🏠",
    progress: 45,
    completed: 9,
    total: 20,
    streak: 5,
  },
  {
    id: 3,
    category: "Health & Wellness",
    icon: "💪",
    progress: 80,
    completed: 16,
    total: 20,
    streak: 12,
  },
  {
    id: 4,
    category: "Financial Skills",
    icon: "💰",
    progress: 30,
    completed: 6,
    total: 20,
    streak: 3,
  },
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

const ProgressCard = ({ item }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
    >
      <div className="bg-[#C263F2] p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-3xl">{item.icon}</span>
            <div>
              <h3 className="text-xl font-bold">{item.category}</h3>
              <p className="text-white text-opacity-90 mt-1">
                {item.completed}/{item.total} tasks completed
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{item.progress}%</div>
            <div className="text-sm opacity-90">{item.streak} day streak</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <motion.div
            className="bg-[#C263F2] h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${item.progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Current streak: {item.streak} days 🔥</span>
          <span>{item.progress}% complete</span>
        </div>
      </div>
    </motion.div>
  );
};

const Progress = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Progress");

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const totalCompleted = PROGRESS_DATA.reduce(
    (sum, item) => sum + item.completed,
    0
  );
  const totalTasks = PROGRESS_DATA.reduce((sum, item) => sum + item.total, 0);
  const overallProgress = Math.round((totalCompleted / totalTasks) * 100);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col font-sans">
      <header className="flex justify-between items-center bg-white text-black p-4 shadow-lg sticky top-0 z-40">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-gray-800">
            Progress Tracker
          </h1>
          <p className="text-sm text-gray-600">
            Track your journey to independence
          </p>
        </div>
        <button
          onClick={toggleMenu}
          className="p-2 text-2xl text-[#C263F2] rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#C263F2]"
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
          <button onClick={toggleMenu} className="p-1 rounded hover:bg-red-100">
            <FaTimes className="w-6 h-6 text-red-600 cursor-pointer" />
          </button>
        </div>

       <nav className="flex flex-col mt-6 space-y-2 px-4">
                 <button
                   onClick={() => router.push("/")}
                   className="flex items-center gap-3 text-left hover:bg-gray-50 px-3 py-3 rounded-xl transition-colors text-gray-700 font-medium cursor-pointer"
                 >
                   <FaHome className="text-[#C263F2] w-5 h-5" /> Home
                 </button>
                 <button
                   onClick={() => router.push("/contact")}
                   className="flex items-center gap-3 text-left hover:bg-gray-50 px-3 py-3 rounded-xl transition-colors text-gray-700 font-medium cursor-pointer"
                 >
                   <FaPhoneAlt className="text-[#C263F2] w-5 h-5" /> Contact Support
                 </button>
                 <button
                   onClick={() => router.push("/about")}
                   className="flex items-center gap-3 text-left hover:bg-gray-50 px-3 py-3 rounded-xl transition-colors text-gray-700 font-medium cursor-pointer"
                 >
                   <FaInfoCircle className="text-[#C263F2] w-5 h-5" /> About App
                 </button>
                 <button
                   onClick={() => console.log("Logout action")}
                   className="flex items-center justify-center mt-6 w-full px-4 py-3 text-white bg-red-600 rounded-xl shadow-lg hover:bg-red-700 transition cursor-pointer"
                 >
                   Logout
                 </button>
               </nav>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={toggleMenu}
        ></div>
      )}

      <main className="p-4 flex-1 overflow-y-auto pb-24 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Overall Progress
              </h2>
              <p className="text-gray-600">{`You're doing amazing! Keep it up!`}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#C263F2]">
                {overallProgress}%
              </div>
              <div className="text-sm text-gray-600">
                {totalCompleted}/{totalTasks} tasks
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
            <motion.div
              className="bg-[#C263F2] h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROGRESS_DATA.map((item) => (
            <ProgressCard key={item.id} item={item} />
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Achievements</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-[#f5f0fb] rounded-lg">
              <FaTrophy className="text-[#C263F2] w-6 h-6" />
              <div>
                <div className="font-semibold text-black">Consistency King</div>
                <div className="text-sm text-gray-600">7+ day streak</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-[#f5f0fb] rounded-lg">
              <FaStar className="text-[#C263F2] w-6 h-6" />
              <div>
                <div className="font-semibold text-black">Health Hero</div>
                <div className="text-sm text-gray-600">80% completed</div>
              </div>
            </div>
          </div>
        </div>

        <motion.button
          onClick={() => router.push("/Rewards")}
          className="w-full bg-[#C263F2] text-white px-5 py-4 rounded-xl shadow-xl hover:bg-[#a44ed4] transition cursor-pointer font-bold text-lg flex items-center justify-center gap-2 mt-8"
          whileTap={{ scale: 0.98 }}
        >
          <FaGift className="w-5 h-5" />
          Go to Your Rewards
        </motion.button>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl flex justify-around items-center h-16 md:h-20 border-t border-gray-100 z-50 p-2 md:p-0 cursor-pointer">
        <NavButton
          icon={FaHome}
          label="Home"
          active={activeNav === "Home"}
          onClick={() => {
            setActiveNav("Home");
            router.push("/dashboard");
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
          icon={FaTasks}
          label="To-do"
          active={activeNav === "To-do"}
          onClick={() => {
            setActiveNav("To-do");
            router.push("/To-do");
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

export default Progress;
