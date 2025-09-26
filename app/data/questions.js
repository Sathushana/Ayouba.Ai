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
  // Step 4: Physical Activity
  {
    id: 4,
    type: "radio", 
    title: "Physical Activity",
    description: "Everyone moves differently. How would you describe your activity in a typical week?",
    key: "activityLevel",
    options: [
      "Mostly sedentary",
      "Light activity (short walks, household work)",
      "Moderate activity (brisk walking, cycling, sports 3–4 days/week)",
      "Active (≥5 days/week or vigorous exercise)",
    ],
    required: true,
  },
  // --- NEW Step 5: Nutrition ---
  {
    id: 5,
    type: "radio", 
    title: "Nutrition Habits",
    description: "How often do you have sugary drinks or processed foods?",
    key: "sugarIntake",
    options: [
      "Daily",
      "Several times a week",
      "Occasionally",
      "Rarely",
    ],
    required: true,
  },
];

// --- CONDITIONAL FOLLOW-UP DATA ---
export const conditionalFollowUps = {
  // --- Physical Activity Follow-ups (Unchanged) ---
  "Mostly sedentary": [
    {
      subKey: "barrier",
      subTitle: "What usually prevents you from being more active?",
      subType: "multiselect",
      options: [
        { id: "lackTime", label: "Lack of time" },
        { id: "lackMotivation", label: "Lack of motivation" },
        { id: "physicalLimitations", label: "Physical limitations / Injuries" },
        { id: "dontKnow", label: "Don’t know what to do" },
      ],
      required: false,
    },
    {
      subKey: "beginnerSuggestion",
      subTitle: "Would you like us to suggest short, simple exercises you can do at home?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "Light activity (short walks, household work)": [
    {
      subKey: "preference",
      subTitle: "Which type of activity do you enjoy most?",
      subType: "radio", 
      options: [
        "Walking",
        "Cycling",
        "Sports (e.g., cricket, badminton)",
        "Gym / Resistance training",
        "Home exercises",
      ],
      required: true,
    },
    {
      subKey: "increaseIntensity",
      subTitle: "Would you like to gradually increase intensity or duration?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "Moderate activity (brisk walking, cycling, sports 3–4 days/week)": [
    {
      subKey: "strengthTraining",
      subTitle: "Are you interested in adding strength or resistance training?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
    {
      subKey: "enduranceFlexibility",
      subTitle: "Do you want suggestions for improving endurance or flexibility?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "Active (≥5 days/week or vigorous exercise)": [
    {
      subKey: "newChallenges",
      subTitle: "Would you like to set new fitness challenges?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
    {
      subKey: "advancedGuidance",
      subTitle: "Are you interested in advanced guidance for recovery, stretching, or nutrition for active adults?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  
  // --- NEW Nutrition Follow-ups ---
  "Daily": [
    {
      subKey: "sugarBarrier",
      subTitle: "What usually makes it hard to reduce sugary drinks or processed foods?",
      subType: "multiselect",
      options: [
        { id: "cravings", label: "Cravings" },
        { id: "busySchedule", label: "Busy schedule" },
        { id: "social", label: "Social occasions" },
        { id: "dontKnow", label: "Don’t know alternatives" },
      ],
      required: false,
    },
    {
      subKey: "easySwaps",
      subTitle: "Would you like us to suggest easy swaps or low-sugar alternatives?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "Several times a week": [
    {
      subKey: "sugarOccasions",
      subTitle: "Which occasions usually involve sugary drinks or processed foods?",
      subType: "multiselect",
      options: [
        { id: "work", label: "Work" },
        { id: "social", label: "Social gatherings" },
        { id: "home", label: "Home" },
        { id: "outings", label: "Outings" },
        { id: "other", label: "Other" },
      ],
      required: false,
    },
    {
      subKey: "sugarReductionTips",
      subTitle: "Would you like tips for reducing sugar a few times a week without feeling restricted?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "Occasionally": [
    {
      subKey: "maintainLowSugar",
      subTitle: "Do you want ideas to maintain low sugar and processed food habits?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
    {
      subKey: "occasionalIndulgence",
      subTitle: "Are you interested in learning advanced strategies for occasional indulgences?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "Rarely": [
    {
      subKey: "optimizeNutrition",
      subTitle: "Would you like advanced tips for optimizing overall nutrition and minimizing hidden sugars?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
    {
      subKey: "trackQuality",
      subTitle: "Are you interested in tracking nutrition quality to maintain excellent habits?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
};

export default questions;