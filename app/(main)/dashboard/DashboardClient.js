"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const PRIMARY_COLOR = "#C263F2";
const SECONDARY_COLOR = "#E6E6FA";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/dashboard", {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "test_key", // for dev only
          },
        });
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading your dashboard...</p>;
  if (!data) return <p className="text-center mt-8">Failed to load dashboard</p>;

  const goalsMap = {
    nutrition: "🥗 Eat Healthy & Get Enough Nutrition",
    activity: "🏃 Be More Active",
    mental: "🧘 Improve Mental Wellness",
    sleep: "😴 Sleep Better",
    weight: "⚖️ Maintain Healthy Weight",
    substance: "🚭 Cut Down or Quit Unhealthy Habits",
  };

  const goalCards = data.primaryGoals
    .filter((goal) => data.selectedGoals?.includes(goal))
    .map((goal) => {
      const subKey = `${goal}Goals`;
      const subgoals = data[subKey] || [];
      return {
        title: goalsMap[goal] || goal,
        subgoals: subgoals.map((g) => g.replace(/([A-Z])/g, " $1").trim()),
        duration: data.targetDuration || "3 months",
      };
    });

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4">
      <motion.h1
        className="text-2xl font-bold mb-4"
        style={{ color: PRIMARY_COLOR }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🌸 Hi {data.preferredName || "User"}!
      </motion.h1>

      <motion.p
        className="text-gray-600 mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Here’s your personalized wellness plan overview:
      </motion.p>

      <div className="w-full max-w-sm space-y-4">
        {goalCards.map((goal, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card
              className="rounded-2xl shadow-md border-0"
              style={{ backgroundColor: SECONDARY_COLOR }}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-semibold text-lg" style={{ color: PRIMARY_COLOR }}>
                    {goal.title}
                  </h2>
                  <span
                    className="text-sm font-medium bg-white rounded-full px-3 py-1 shadow"
                    style={{ color: PRIMARY_COLOR }}
                  >
                    {goal.duration}
                  </span>
                </div>

                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-3">
                  {goal.subgoals.map((sub, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {sub}
                    </motion.li>
                  ))}
                </ul>

                <Button
                  className="w-full flex justify-center items-center gap-2 rounded-full shadow-md"
                  style={{ backgroundColor: PRIMARY_COLOR }}
                  onClick={() => window.location.href = `/plan/${goal.title.toLowerCase()}`}
                >
                  View Plan <ChevronRight size={18} />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
