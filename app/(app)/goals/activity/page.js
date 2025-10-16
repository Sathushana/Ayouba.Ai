// app/(app)/goals/activity/page.js
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Placeholder for fetching personalized user data (e.g., from an API or context)
const fetchActivityPlan = () => {
    // In a real application, this would fetch data based on the logged-in user's ID.
    // The data structure below is mocked based on the questionnaire answers (e.g., activity level, barriers, time availability).
    return {
        userName: "Alex",
        primaryGoal: "Boost stamina / Cardio fitness",
        dailyTimeBudget: "10–20 minutes", // from Q208
        currentLevel: "Light movement", // from Q201
        todaysPlan: {
            title: "Quick Core & Cardio Starter 🔥",
            duration: "15 min",
            type: "Low-Impact Home Routine",
            equipment: "None needed (addressing lackTime_followup)",
            videoUrl: "/videos/quick-cardio.mp4",
        },
        progress: {
            weeklyTarget: "150 minutes",
            achieved: 110,
            streak: 7,
        },
        recommendations: [
            { text: "Try stretching before bed (targeting getFlexible goal).", link: "/app/goals/mental" },
            { text: "Boost motivation with the 'Runner' badge challenge.", link: "/app/rewards" },
        ],
    };
};

const PRIMARY_COLOR = '#C263F2';

export default function ActivityRoadmapPage() {
    const [planData, setPlanData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetching
        const data = fetchActivityPlan();
        setPlanData(data);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl font-bold" style={{ color: PRIMARY_COLOR }}>
                Loading Activity Plan...
            </div>
        );
    }

    if (!planData) {
        return <div className="p-4 pt-10 text-center">No plan found. Please update your goals in the Profile section.</div>;
    }

    const progressPercentage = Math.min(100, (planData.progress.achieved / planData.progress.weeklyTarget.match(/\d+/)[0]) * 100);

    return (
        <div className="p-4 pb-20 pt-8 max-w-xl mx-auto md:pb-4">
            <h1 className="text-3xl font-bold text-gray-900">
                Activity Roadmap 🏃
            </h1>
            <p className="text-gray-600 mt-1">
                Your plan is tailored for your goal: **{planData.primaryGoal}**.
            </p>

            {/* Daily Plan Card */}
            <div className="bg-white p-6 rounded-2xl shadow-lg mt-6 border-t-4" style={{ borderTopColor: PRIMARY_COLOR }}>
                <h2 className="text-xl font-extrabold text-gray-900 mb-2">
                    Today's AI Workout
                </h2>
                <p className="text-2xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
                    {planData.todaysPlan.title}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-700 border-t pt-3">
                    <p>🕒 Duration: <span className="font-semibold">{planData.todaysPlan.duration}</span></p>
                    <p>🏋️ Type: <span className="font-semibold">{planData.todaysPlan.type}</span></p>
                    <p>⚙️ Equipment: <span className="font-semibold">{planData.todaysPlan.equipment}</span></p>
                </div>
                <button
                    className="w-full py-3 mt-4 rounded-xl font-bold text-white transition hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: PRIMARY_COLOR }}
                >
                    Start Workout Now
                </button>
            </div>

            {/* Weekly Progress */}
            <div className="bg-white p-6 rounded-2xl shadow-lg mt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Progress</h2>
                <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold">Goal: {planData.progress.weeklyTarget}</p>
                    <p className="text-green-600 font-bold">{planData.progress.achieved} min logged</p>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full">
                    <div 
                        className="h-3 rounded-full transition-all duration-500" 
                        style={{ width: `${progressPercentage}%`, backgroundColor: PRIMARY_COLOR }}
                    ></div>
                </div>
                <div className="mt-4 flex justify-between items-center text-sm">
                    <p>🔥 Streak: <span className="font-bold text-red-500">{planData.progress.streak} Days</span></p>
                    <Link href="/app/rewards" className="text-sm font-semibold hover:underline" style={{ color: PRIMARY_COLOR }}>
                        View Badges
                    </Link>
                </div>
            </div>

            {/* Quick Tips & Recommendations */}
            <div className="mt-6 space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Coach Recommendations</h2>
                {planData.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start bg-white p-4 rounded-xl shadow-md border-l-4" style={{ borderColor: PRIMARY_COLOR }}>
                        <span className="text-xl mr-3">💡</span>
                        <p className="text-gray-700 flex-1">
                            {rec.text}
                            {rec.link && (
                                <Link href={rec.link} className="ml-2 font-semibold hover:underline" style={{ color: PRIMARY_COLOR }}>
                                    (Go)
                                </Link>
                            )}
                        </p>
                    </div>
                ))}
            </div>

            {/* Quick Log Action */}
            <div className="fixed bottom-20 left-0 right-0 md:static mt-8 flex justify-center">
                <button className="bg-gray-800 text-white px-8 py-3 rounded-full text-lg font-bold shadow-2xl hover:bg-gray-700 transition active:scale-95">
                    Log Activity
                </button>
            </div>
        </div>
    );
}