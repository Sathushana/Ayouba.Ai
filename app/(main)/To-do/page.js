"use client";

import React, { useState, useEffect } from "react";
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
  FaCheckCircle,
  FaPlusCircle,
  FaRegCircle,
} from "react-icons/fa";

const DUMMY_GOALS_DATA = [
  {
    id: 1,
    main_goal: "Social Skills GOALS 💬",
    sub_goals: [
      { id: "1-1", text: "Initiate conversation with peers", completed: false },
      { id: "1-2", text: "Maintain eye contact 👀", completed: false },
    ],
  },
  {
    id: 2,
    main_goal: "Level Up Daily Life 🛠️",
    sub_goals: [
      { id: "2-1", text: "Brush teeth independently 🪥", completed: false },
      { id: "2-2", text: "Dress independently 👔", completed: false },
    ],
  },
  {
    id: 3,
    main_goal: "Health & Fitness 💪",
    sub_goals: [
      { id: "3-1", text: "Drink water regularly", completed: false },
      { id: "3-2", text: "Daily stretch exercises", completed: false },
    ],
  },
  {
    id: 4,
    main_goal: "Financial Literacy 💰",
    sub_goals: [
      { id: "4-1", text: "Track daily spending", completed: false },
      { id: "4-2", text: "Set monthly savings target", completed: false },
    ],
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

const SubGoalItem = ({ goal, onToggle }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`flex items-center p-3 rounded-xl transition-all ${
      goal.completed
        ? "bg-[#f5f0fb] text-gray-500 line-through"
        : "bg-white shadow-sm hover:shadow-md text-gray-800"
    }`}
  >
    <button
      onClick={() => onToggle(goal.id)}
      className={`p-2 rounded-full mr-3 transition-colors cursor-pointer${
        goal.completed
          ? "text-[#C263F2] hover:text-[#a44ed4]"
          : "text-gray-400 hover:text-[#C263F2]"
      }`}
      aria-label={goal.completed ? "Mark as Incomplete" : "Mark as Complete"}
    >
      {goal.completed ? (
        <FaCheckCircle className="w-5 h-5" />
      ) : (
        <FaRegCircle className="w-5 h-5" />
      )}
    </button>
    <span className="flex-1 font-medium">{goal.text}</span>
  </motion.div>
);

const GoalSection = ({ mainGoal, subGoals, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const incompleteGoals = subGoals.filter((g) => !g.completed);
  const completedGoals = subGoals.filter((g) => g.completed);

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <header
        className="flex justify-between items-center p-4 cursor-pointer bg-[#C263F2] border-b border-gray-100"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={`goals-${mainGoal.replace(/\s/g, "-")}`}
      >
        <h2 className="text-lg font-bold text-white">{mainGoal}</h2>
        <span className="text-sm font-semibold text-white-500">
          {incompleteGoals.length} left
        </span>
      </header>
      <motion.div
        id={`goals-${mainGoal.replace(/\s/g, "-")}`}
        initial={false}
        animate={{ height: isExpanded ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4 space-y-3 text-black">
          {incompleteGoals.length > 0 ? (
            incompleteGoals.map((goal) => (
              <SubGoalItem key={goal.id} goal={goal} onToggle={onToggle} />
            ))
          ) : (
            <p className="text-gray-500 italic text-center py-2">
              All tasks completed for this goal! 🎉
            </p>
          )}

          {completedGoals.length > 0 && (
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                Completed Tasks ({completedGoals.length})
              </h3>
              <div className="space-y-2">
                {completedGoals.map((goal) => (
                  <SubGoalItem key={goal.id} goal={goal} onToggle={onToggle} />
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const TodoPage = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("To-do");
  const [goals, setGoals] = useState(DUMMY_GOALS_DATA);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const toggleCompletion = (subGoalId) => {
    setGoals((prevGoals) =>
      prevGoals.map((mainGoal) => ({
        ...mainGoal,
        sub_goals: mainGoal.sub_goals.map((subGoal) =>
          subGoal.id === subGoalId
            ? { ...subGoal, completed: !subGoal.completed }
            : subGoal
        ),
      }))
    );
  };

  const totalTasks = goals.reduce(
    (count, goal) => count + goal.sub_goals.length,
    0
  );
  const completedTasks = goals.reduce(
    (count, goal) => count + goal.sub_goals.filter((sg) => sg.completed).length,
    0
  );

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="flex justify-between items-center bg-white text-black p-4 shadow-lg sticky top-0 z-40">
        <h1 className="text-xl font-extrabold tracking-tight truncate text-gray-800">
          To-do List
        </h1>
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

      <main className="p-4 flex-1 overflow-y-auto space-y-6 pb-24 max-w-xl mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Today's To-do List for you
          </h2>
          <p className="text-gray-600">
            {" "}
            You've completed <b>{completedTasks}</b> of <b>{totalTasks}</b>{" "}
            tasks! Keep up the great work!
          </p>
        </div>

        {goals.map((goal) => (
          <GoalSection
            key={goal.id}
            mainGoal={goal.main_goal}
            subGoals={goal.sub_goals}
            onToggle={toggleCompletion}
          />
        ))}

        <motion.button
          onClick={() => router.push("/Plan")}
          className="w-full bg-[#C263F2] text-white px-5 py-4 rounded-xl shadow-xl hover:bg-[#a44ed4] transition cursor-pointer font-bold text-lg flex items-center justify-center gap-2 mt-8"
          whileTap={{ scale: 0.98 }}
        >
          <FaBullseye className="w-5 h-5" />
          Go to Personalised Plan
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

export default TodoPage;
