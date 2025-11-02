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
  FaCalendar,
  FaList,
} from "react-icons/fa";

const DUMMY_PLAN_DATA = {
  status: "success",
  plan: {
    "Day 1": [
      "Practice basic conversation starters with family",
      "Complete morning routine independently",
      "Prepare a simple breakfast",
      "30 minutes of light exercise",
      "Review budgeting basics",
      "Social skills worksheet",
      "Evening reflection journal",
      "Plan tomorrow's schedule",
      "Practice deep breathing exercises",
      "Read for 20 minutes"
    ],
    "Day 2": [
      "Initiate conversation with a friend",
      "Practice maintaining eye contact",
      "Follow daily hygiene routine",
      "Prepare lunch independently",
      "Track daily expenses",
      "Group interaction practice",
      "Evening wind-down routine",
      "Set weekly goals",
      "Stress management techniques",
      "Review progress notes"
    ],
    "Day 3": [
      "Join a group conversation",
      "Complete all self-care tasks",
      "Try a new recipe",
      "Create weekly budget",
      "Social scenario role-play",
      "Exercise routine completion",
      "Sleep schedule review",
      "Financial goal setting",
      "Progress assessment",
      "Relaxation practice"
    ],
    "Day 4": [
      "Practice public speaking basics",
      "Home maintenance tasks",
      "Meal planning exercise",
      "Banking simulation",
      "Social confidence building",
      "Nutrition planning",
      "Evening routine optimization",
      "Savings goal review",
      "Skill practice session",
      "Weekly reflection"
    ],
    "Day 5": [
      "Real-world social interaction",
      "Advanced cooking skills",
      "Full exercise routine",
      "Financial responsibility tasks",
      "Communication skills practice",
      "Health assessment",
      "Budget review",
      "Progress celebration",
      "Next week planning",
      "Skill consolidation"
    ],
    "Day 6": [
      "Social skills application",
      "Independent living practice",
      "Health maintenance tasks",
      "Money management review",
      "Confidence building exercises",
      "Wellness check-in",
      "Financial planning",
      "Achievement recognition",
      "Skill refinement",
      "Preparation for Day 7"
    ],
    "Day 7": [
      "Complete weekly assessment",
      "Social skills mastery practice",
      "Full independence demonstration",
      "Health and wellness review",
      "Financial independence check",
      "Progress evaluation",
      "Next week goal setting",
      "Achievement celebration",
      "Skill maintenance plan",
      "Weekly reflection journal"
    ]
  },
  week: 1,
  currentDay: 1,
  targetDuration: 8
};

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

const DayPlanCard = ({ day, tasks, isCurrentDay, onViewDetails }) => {
  const dayNumber = day.split(" ")[1];
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${
        isCurrentDay ? "border-[#C263F2]" : "border-gray-100"
      }`}
    >
      <div className={`p-6 text-white ${isCurrentDay ? "bg-[#C263F2]" : "bg-gray-400"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FaCalendar className="text-2xl" />
            <div>
              <h3 className="text-xl font-bold">{day}</h3>
              <p className="text-white text-opacity-90 mt-1">
                {tasks.length} tasks to complete
                {isCurrentDay && " • Today's Plan"}
              </p>
            </div>
          </div>
          {isCurrentDay && (
            <span className="bg-white text-[#C263F2] px-3 py-1 rounded-full text-sm font-bold">
              Active
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-3 mb-4">
          {tasks.slice(0, 3).map((task, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className={`w-6 h-6 ${
                isCurrentDay ? "bg-[#C263F2]" : "bg-gray-400"
              } text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5`}>
                {index + 1}
              </div>
              <span className="text-gray-700 flex-1 text-sm">{task}</span>
            </div>
          ))}
          {tasks.length > 3 && (
            <div className="text-center text-gray-500 text-sm">
              + {tasks.length - 3} more tasks
            </div>
          )}
        </div>

        <button
          onClick={() => onViewDetails(day, tasks)}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            isCurrentDay 
              ? "bg-[#C263F2] text-white hover:bg-[#a44ed4]" 
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          View Full Plan
        </button>
      </div>
    </motion.div>
  );
};

const Plan = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Plan");
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDayTasks, setSelectedDayTasks] = useState([]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleViewDetails = (day, tasks) => {
    setSelectedDay(day);
    setSelectedDayTasks(tasks);
  };

  const handleCloseDetails = () => {
    setSelectedDay(null);
    setSelectedDayTasks([]);
  };

  const handleGoToTodo = () => {
    router.push("/To-do");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col font-sans">
      <header className="flex justify-between items-center bg-white text-black p-4 shadow-lg sticky top-0 z-40">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-gray-800">
            Weekly Development Plan
          </h1>
          <p className="text-sm text-gray-600">
            Week {DUMMY_PLAN_DATA.week} • Day {DUMMY_PLAN_DATA.currentDay}
          </p>
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
          <button
            onClick={toggleMenu}
            className="p-1 rounded hover:bg-red-100"
            aria-label="Close User Menu"
          >
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
          aria-hidden="true"
        ></div>
      )}

      <main className="p-4 flex-1 overflow-y-auto pb-24 max-w-6xl mx-auto w-full">
        <div className={`p-4 rounded-lg mb-6 ${
          DUMMY_PLAN_DATA.status === "success" 
            ? "bg-green-100 border border-green-200" 
            : "bg-red-100 border border-red-200"
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-800">
                {DUMMY_PLAN_DATA.status === "success" ? "Plan Loaded Successfully" : "Plan Update Required"}
              </h3>
              <p className="text-sm text-gray-600">
                {DUMMY_PLAN_DATA.status === "success" 
                  ? `Week ${DUMMY_PLAN_DATA.week} of ${DUMMY_PLAN_DATA.targetDuration} • ${DUMMY_PLAN_DATA.currentDay}/7 days completed`
                  : "Please check your connection or contact support"}
              </p>
            </div>
            <motion.button
              onClick={handleGoToTodo}
              className="bg-[#C263F2] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#a44ed4] transition cursor-pointer"
              whileTap={{ scale: 0.95 }}
            >
              <FaList className="w-4 h-4" />
              Go to To-Do List
            </motion.button>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Your Weekly Development Plan
          </h2>
          <p className="text-gray-600">
            Follow your daily tasks to build skills progressively toward independence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(DUMMY_PLAN_DATA.plan).map(([day, tasks]) => (
            <DayPlanCard
              key={day}
              day={day}
              tasks={tasks}
              isCurrentDay={day === `Day ${DUMMY_PLAN_DATA.currentDay}`}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Weekly Progress</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Week Completion</span>
              <span className="font-bold text-[#C263F2]">
                {Math.round((DUMMY_PLAN_DATA.currentDay / 7) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-[#C263F2] h-3 rounded-full transition-all duration-500"
                style={{ width: `${(DUMMY_PLAN_DATA.currentDay / 7) * 100}%` }}
              ></div>
            </div>
            <div className="bg-[#f5f0fb] p-4 rounded-lg border-l-4 border-[#C263F2]">
              <p className="text-sm text-gray-700">
                <strong>Tip:</strong> {`Complete today's tasks to unlock tomorrow's plan. 
                Consistency is key to building lasting skills!`}
              </p>
            </div>
          </div>
        </div>
      </main>

      {selectedDay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          >
            <div className="bg-[#C263F2] p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <FaCalendar className="text-2xl" />
                  <div>
                    <h3 className="text-xl font-bold">{selectedDay}</h3>
                    <p className="text-white text-opacity-90">
                      Complete all tasks for optimal progress
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCloseDetails}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-3">
                {selectedDayTasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="w-8 h-8 bg-[#C263F2] text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 flex-1">{task}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <button
                onClick={handleGoToTodo}
                className="w-full bg-[#C263F2] text-white py-3 rounded-lg font-semibold hover:bg-[#a44ed4] transition-colors flex items-center justify-center gap-2"
              >
                <FaList className="w-5 h-5" />
                Go to To-Do List to Start Tasks
              </button>
            </div>
          </motion.div>
        </div>
      )}

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

export default Plan;
