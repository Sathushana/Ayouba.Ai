"use client";
import { useState } from "react";

export default function TryPage() {
  const [step, setStep] = useState(0);
  const questions = [
    "What’s your main wellness goal?",
    "How active are you daily?",
    "How do you feel about trying new routines?"
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        {step < questions.length ? (
          <>
            <h2 className="text-xl font-semibold mb-4">{questions[step]}</h2>
            <input
              type="text"
              className="border p-2 rounded w-full mb-4"
            />
            <button
              onClick={() => setStep(step + 1)}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </>
        ) : (
          <h2 className="text-2xl font-bold text-purple-600">
            Welcome to Ayubo.AI!
          </h2>
        )}
      </div>
    </section>
  );
}
