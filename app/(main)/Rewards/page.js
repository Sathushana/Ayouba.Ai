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
  FaStar,
  FaTrophy,
  FaMedal,
  FaCrown,
} from "react-icons/fa";

const REWARDS_DATA = [
  {
    id: 1,
    title: "Consistency Champion",
    icon: "🔥",
    points: 100,
    description: "Complete 7 days in a row",
    unlocked: true,
    progress: 100,
  },
  {
    id: 2,
    title: "Social Butterfly",
    icon: "💬",
    points: 150,
    description: "Complete all social skills tasks",
    unlocked: false,
    progress: 65,
  },
  {
    id: 3,
    title: "Health Hero",
    icon: "💪",
    points: 200,
    description: "Achieve 80% in health goals",
    unlocked: true,
    progress: 100,
  },
  {
    id: 4,
    title: "Finance Master",
    icon: "💰",
    points: 175,
    description: "Complete financial independence plan",
    unlocked: false,
    progress: 30,
  },
  {
    id: 5,
    title: "Daily Routine Pro",
    icon: "🏠",
    points: 125,
    description: "Master daily living skills",
    unlocked: false,
    progress: 45,
  },
  {
    id: 6,
    title: "Ultimate Achiever",
    icon: "👑",
    points: 500,
    description: "Complete all categories",
    unlocked: false,
    progress: 55,
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

const RewardCard = ({ reward }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${
        reward.unlocked ? "border-[#C263F2]" : "border-gray-200"
      }`}
    >
      <div
        className={`p-6 text-white ${
          reward.unlocked ? "bg-[#C263F2]" : "bg-gray-400"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-3xl">{reward.icon}</span>
            <div>
              <h3 className="text-xl font-bold">{reward.title}</h3>
              <p className="text-white text-opacity-90 mt-1">
                {reward.description}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{reward.points}</div>
            <div className="text-sm opacity-90">points</div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {reward.unlocked ? (
          <div className="flex items-center justify-center space-x-2 text-green-600 font-semibold">
            <FaTrophy className="w-5 h-5" />
            <span>Unlocked! 🎉</span>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{reward.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#C263F2] h-2 rounded-full"
                style={{ width: `${reward.progress}%` }}
              />
            </div>
            <div className="text-center text-sm text-gray-500">Keep going!</div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Rewards = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Rewards");

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const unlockedRewards = REWARDS_DATA.filter((reward) => reward.unlocked);
  const totalPoints = REWARDS_DATA.filter((reward) => reward.unlocked).reduce(
    (sum, reward) => sum + reward.points,
    0
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col font-sans">
      <header className="flex justify-between items-center bg-white text-black p-4 shadow-lg sticky top-0 z-40">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-gray-800">
            Rewards
          </h1>
          <p className="text-sm text-gray-600">Celebrate your achievements</p>
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
              <h2 className="text-2xl font-bold text-gray-800">Your Rewards</h2>
              <p className="text-gray-600">
                Earn points and unlock achievements
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#C263F2]">
                {totalPoints}
              </div>
              <div className="text-sm text-gray-600">total points</div>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <FaMedal className="text-[#C263F2] w-5 h-5" />
              <span className="font-semibold">
                {unlockedRewards.length} unlocked
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCrown className="text-yellow-500 w-5 h-5" />
              <span className="font-semibold">
                {REWARDS_DATA.length - unlockedRewards.length} to go
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REWARDS_DATA.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            How to Earn More
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-[#f5f0fb] rounded-lg">
              <FaStar className="text-[#C263F2] w-5 h-5" />
              <div>
                <div className="font-semibold">Complete daily tasks</div>
                <div className="text-sm text-gray-600">
                  Earn 10 points per task
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-[#f5f0fb] rounded-lg">
              <FaTrophy className="text-[#C263F2] w-5 h-5" />
              <div>
                <div className="font-semibold">Maintain streaks</div>
                <div className="text-sm text-gray-600">
                  Bonus points for consistency
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-[#f5f0fb] rounded-lg">
              <FaChartLine className="text-[#C263F2] w-5 h-5" />
              <div>
                <div className="font-semibold">Reach milestones</div>
                <div className="text-sm text-gray-600">
                  Complete category goals
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.button
          onClick={() => router.push("/dashboard-preview")}
          className="w-full bg-[#C263F2] text-white px-5 py-4 rounded-xl shadow-xl hover:bg-[#a44ed4] transition cursor-pointer font-bold text-lg flex items-center justify-center gap-2 mt-8"
          whileTap={{ scale: 0.98 }}
        >
          <FaHome className="w-5 h-5" />
          Go back to Dashboard
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

export default Rewards;
