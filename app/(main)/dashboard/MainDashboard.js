'use client';
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
  FaStar,
  FaLightbulb,
} from "react-icons/fa";

const DUMMY_DATA = {
  user_prefer_name: "raya",
  target_duration: "1 year",
  plan_start_date: "2025-10-20",
  goals: [
    {
      main_goal: "🚭🍺 Cut down or quit smoking, alcohol, or drugs",
      sub_goals: [
        "Identify why you want to quit or cut down",
        "Reduce quantity gradually",
        "Learn stress management techniques",
        "Set a quit date"
      ],
    },
    {
      main_goal: "🧘 Feel calmer & reduce stress",
      sub_goals: [
        "💬 Improve social connections & relationships",
        "🧘 Build mindfulness & resilience",
        "💪 Regain motivation & self-confidence",
      ],
    },
    {
      main_goal: "🏃 Be more active & do regular exercise",
      sub_goals: [
        "🤸 Get flexible / Move better / Reduce aches",
        "🧘 Lower stress / Feel mentally better",
        "🛡️ Stay fit & healthy overall",
        "⏱️ Fit workouts into a busy schedule",
      ],
    },
  ],
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

const App = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [activeNav, setActiveNav] = useState("Home");
  const [remainingTime, setRemainingTime] = useState("");
  const planStartDate = DUMMY_DATA.plan_start_date;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const calculateRemainingTime = (initialDuration) => {
    const start = new Date(planStartDate);
    const now = new Date();
    const durationMatch = initialDuration.match(/(\d+)\s*(\w+)/);
    if (!durationMatch) return initialDuration;
    const amount = parseInt(durationMatch[1]);
    const unit = durationMatch[2].toLowerCase();
    let endDate = new Date(start);
    switch(unit) {
      case 'day':
      case 'days':
        endDate.setDate(start.getDate() + amount);
        break;
      case 'month':
      case 'months':
        endDate.setMonth(start.getMonth() + amount);
        break;
      case 'year':
      case 'years':
        endDate.setFullYear(start.getFullYear() + amount);
        break;
      default:
        return initialDuration;
    }
    const diffTime = endDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) {
      return "Plan completed!";
    }
    if (diffDays >= 365) {
      const years = Math.floor(diffDays / 365);
      const remainingDays = diffDays % 365;
      const months = Math.floor(remainingDays / 30);
      return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`;
    } else if (diffDays >= 30) {
      const months = Math.floor(diffDays / 30);
      const remainingDays = diffDays % 30;
      return `${months} month${months > 1 ? 's' : ''} ${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
    } else {
      return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDashboardData(DUMMY_DATA);
      const remaining = calculateRemainingTime(DUMMY_DATA.target_duration);
      setRemainingTime(remaining);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!dashboardData || !dashboardData.target_duration) return;
    const updateRemainingTime = () => {
      const remaining = calculateRemainingTime(dashboardData.target_duration);
      setRemainingTime(remaining);
    };
    const intervalId = setInterval(updateRemainingTime, 24 * 60 * 60 * 1000);
    updateRemainingTime();
    return () => clearInterval(intervalId);
  }, [dashboardData]);

  const handleGoalClick = (goalName) => {
    console.log(`Navigating to Plan details for "${goalName}"`);
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col font-sans">
      <header className="flex justify-between items-center bg-white text-black p-4 shadow-lg sticky top-0 z-40">
        <h1 className="text-xl font-extrabold tracking-tight truncate text-gray-800">
          👋 Hi, {dashboardData?.user_prefer_name || "User"}!
        </h1>
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
          <a
            href="/login"
            className="flex items-center justify-center mt-6 w-full px-4 py-3 text-white bg-red-600 rounded-xl shadow-lg hover:bg-red-700 transition cursor-pointer font-bold"
          >
            Go to Login
          </a>
        </nav>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={toggleMenu}
        ></div>
      )}

      <main className="p-4 flex-1 overflow-y-auto space-y-6 pb-24">
        {dashboardData ? (
          <>
            <motion.div
              className="bg-white p-5 rounded-2xl shadow-xl border-l-8 border-[#C263F2] text-center transform transition duration-300"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Remaining Plan Duration
              </p>
              <p className="text-3xl text-[#C263F2] font-extrabold mt-1">
                {remainingTime || dashboardData.target_duration}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Started on {new Date(DUMMY_DATA.plan_start_date).toLocaleDateString()}
              </p>
            </motion.div>
            <div className="flex justify-center">
              <div className="w-full max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10">
                  {dashboardData.goals.map((goal, idx) => (
                    <motion.div
                      key={idx}
                      className="flex flex-col bg-[#C263F2] p-6 rounded-3xl shadow-2xl cursor-pointer border border-gray-100 transition duration-300 transform hover:shadow-3xl hover:scale-[1.02]"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleGoalClick(goal.main_goal)}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.3 + idx * 0.1,
                        type: "spring",
                        stiffness: 100,
                      }}
                    >
                      <div className="flex items-center mb-4 border-b pb-3 border-white">
                        <FaStar className="text-yellow-400 mr-3 w-6 h-6 flex-shrink-0" />
                        <h3 className="font-bold text-white text-lg truncate leading-snug">
                          {goal.main_goal}
                        </h3>
                      </div>
                      <div className="flex flex-col gap-3 flex-grow">
                        {goal.sub_goals.map((sub, sidx) => (
                          <motion.div
                            key={sidx}
                            className="bg-gray-50 text-gray-700 px-4 py-2 rounded-xl font-medium shadow-inner flex items-center gap-3 text-sm border-l-4 border-indigo-400"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + idx * 0.1 + sidx * 0.05 }}
                          >
                            <FaLightbulb className="text-[#C263F2] w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{sub}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-6 pt-2">
            <div className="bg-white p-4 rounded-2xl shadow-lg h-24 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-200 rounded-3xl h-56 animate-pulse"></div>
              <div className="bg-gray-200 rounded-3xl h-56 animate-pulse"></div>
              <div className="bg-gray-200 rounded-3xl h-56 animate-pulse hidden lg:block"></div>
            </div>
          </div>
        )}
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

export default App;
