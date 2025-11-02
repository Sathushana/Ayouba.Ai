'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../../(app)/context/auth'; // your auth context

const PRIMARY_COLOR_HEX = "#C263F2";
const SECONDARY_COLOR_HEX = "#E6E6FA";

export default function DashboardPage() {
  const { token, logout, loading } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [expandedGoal, setExpandedGoal] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!token) return;

      try {
        const res = await fetch("http://127.0.0.1:8000/api/dashboard", {
          headers: {
            "Authorization": `Bearer ${token}`, // token only
          },
        });

        if (!res.ok) throw new Error("Failed to fetch dashboard");
        const data = await res.json();
        setDashboard(data);
      } catch (err) {
        console.error(err);
        alert("Session expired. Please login again.");
        setTimeout(() => (window.location.href = "/login"), 1500);
      }
    };

    fetchDashboard();
  }, [token]);

  if (loading || !dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-4 py-6 flex flex-col items-center"
      style={{ backgroundColor: SECONDARY_COLOR_HEX }}
    >
      {/* Greeting */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: PRIMARY_COLOR_HEX }}
        >
          Hi, {dashboard.user_prefer_name}! 👋
        </h1>
        <p className="text-gray-700 text-sm">
          Duration: <span className="font-semibold">{dashboard.duration}</span>
        </p>
      </motion.div>

      {/* Goals */}
      <div className="w-full max-w-md space-y-4">
        {dashboard.goals.map((goal, index) => {
          const isExpanded = expandedGoal === index;
          return (
            <motion.div
              key={index}
              className="rounded-2xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() =>
                  setExpandedGoal(isExpanded ? null : index)
                }
                className="w-full flex justify-between items-center px-4 py-3 text-left"
                style={{ backgroundColor: PRIMARY_COLOR_HEX, color: 'white' }}
              >
                <span className="font-semibold">{goal.main_goal}</span>
                {isExpanded ? <ChevronUp /> : <ChevronDown />}
              </button>

              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white px-4 py-3 text-gray-700 text-sm"
                >
                  {goal.sub_goals.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {goal.sub_goals.map((sub, subIdx) => (
                        <li key={subIdx}>{sub}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="italic text-gray-400">
                      No sub-goals available
                    </p>
                  )}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="mt-6 px-6 py-3 bg-purple-500 text-white font-semibold rounded-xl shadow hover:bg-purple-600 transition w-full max-w-md"
      >
        Logout
      </button>
    </div>
  );
}
