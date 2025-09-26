// data/questions.js

const questions = [
  // Step 1: Age
  {
    id: 1,
    type: "number",
    title: "How old are you?",
    description: "Your age helps us personalise your lifestyle recommendations and identify risk early. In Sri Lanka, certain conditions like diabetes, hypertension, and heart disease can develop earlier than in other populations, so knowing your age helps us guide you safely and effectively.",
    key: "age",
    placeholder: "Enter age in years (e.g., 35)",
    required: true,
  },
  // Step 2: Sex
  {
    id: 2,
    type: "radio",
    title: "What is your sex?",
    description: "Men and women have different health risks and reference ranges for lab values. This helps us give you personalized advice.",
    key: "sex",
    options: ["Male", "Female", "Prefer not to say"],
    required: true,
  },
  // Step 3: Height and Weight
  {
    id: 3,
    type: "measurements",
    title: "What are your height and weight?",
    description: "This helps calculate your BMI, which is an important indicator of health risk in Sri Lankan adults. For South Asians, health risks can appear at lower BMI than in other populations.",
    key: "measurements",
    inputs: [
      { key: "height", unit: "cm", placeholder: "e.g., 170", required: true },
      { key: "weight", unit: "kg", placeholder: "e.g., 65", required: true },
    ],
    required: true,
  },
  // Step 4: Goals (The initial multi-select step)
  {
    id: 4,
    type: "multiselect",
    title: "What would you like to accomplish?",
    description: "Select all that apply.",
    key: "goals",
    options: [
      { id: "eatHealthier", label: "Eat and live healthier", icon: "🍎" },
      { id: "boostEnergy", label: "Boost my energy and mood", icon: "☀️" },
      { id: "stayConsistent", label: "Stay motivated and consistent", icon: "💪" },
      { id: "feelBetter", label: "Feel better about my body", icon: "✨" },
    ],
    required: true,
  },
];

export default questions;