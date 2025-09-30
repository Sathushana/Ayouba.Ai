// data/questions.js

// Base questions that everyone answers
const baseQuestions = [
  // Step 1: Full Name
  {
    id: 1,
    type: "text",
    title: "What's your full name?",
    description: "We use your name to personalize your health recommendations and create a better experience for you.",
    key: "fullName",
    placeholder: "Enter your full name",
    required: true,
  },
  // Step 2: Age
  {
    id: 2,
    type: "number",
    title: "How old are you?",
    description: "Your age helps us personalise your lifestyle recommendations and identify risk early. Knowing your age helps us guide you safely and effectively.",
    key: "age",
    placeholder: "Enter age in years (e.g., 35)",
    required: true,
  },
  // Step 3: Sex
  {
    id: 3,
    type: "radio",
    title: "What is your sex?",
    description: "Men and women have different health risks and reference ranges for lab values. This helps us give you personalized advice.",
    key: "sex",
    options: ["Male", "Female"],
    required: true,
  },
  // Step 4: Height and Weight (BMI)
  {
    id: 4,
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
  // Step 5: Primary Health Goal
  {
    id: 5,
    type: "radio",
    title: "What is your main health goal right now?",
    description: "Select your primary health goal (choose one):",
    key: "primaryGoal",
    options: [
      "🥗 Eat better & get enough nutrients (Nutrition)",
      "🏃 Be more active & exercise (Physical Activity)",
      "🚭 Reduce or quit smoking / tobacco / beedi",
      "🍺 Reduce or quit alcohol use",
      "🧘 Improve my mood & reduce stress (Mental health)",
      "😴 Sleep better & feel more rested",
      "🛡️ Stay healthy & prevent future diseases (Prevent diseases)"
    ],
    required: true,
  },
];

// Goal-specific questions
const goalSpecificQuestions = {
  // Physical Activity Questions
  "Physical Activity": [
    // Q1: Baseline Activity
    {
      id: 6,
      type: "radio",
      title: "Baseline Activity",
      description: "In a normal week, how active are you?",
      key: "activityLevel",
      options: [
        "Mostly sitting (little or no exercise)",
        "Light movement (walks, chores, light activity)",
        "Moderate activity (exercise 3–4 days/week, brisk walking, cycling, sports)",
        "Very active (exercise most days / vigorous workouts/sports)"
      ],
      required: true,
    },
    // Q2: Health & Safety Check
    {
      id: 7,
      type: "radio",
      title: "Health & Safety Check",
      description: "Do you have any medical conditions or injuries that affect your ability to exercise?",
      key: "hasConditions",
      options: ["Yes", "No"],
      required: true,
    },
    // Q3 Step 1: Exercise Location
    {
      id: 8,
      type: "radio",
      title: "Exercise Location",
      description: "Where do you usually prefer to exercise or would like to exercise?",
      key: "exerciseLocation",
      options: [
        "At home",
        "Outdoors (park, streets, trails)",
        "Gym or fitness center",
        "Mixed / Any location"
      ],
      required: true,
    },
    // Q3 Step 2: Activity Type Preference
    {
      id: 9,
      type: "multiselect",
      title: "Activity Type Preference",
      description: "Which types of activities do you enjoy most or would like to try?",
      key: "activityType",
      options: [
        { id: "walking", label: "Walking / Hiking" },
        { id: "running", label: "Running / Jogging" },
        { id: "cycling", label: "Cycling" },
        { id: "strength", label: "Strength / Resistance Training" },
        { id: "yoga", label: "Yoga / Pilates / Stretching" },
        { id: "dance", label: "Dance / Aerobics" },
        { id: "sports", label: "Sports (Football, Basketball, Tennis, etc.)" },
        { id: "other", label: "Other / Not sure" }
      ],
      required: false,
    },
    // Q3 Step 4: Time Availability
    {
      id: 10,
      type: "radio",
      title: "Time Availability",
      description: "How much time can you usually dedicate to exercise per day?",
      key: "timeAvailability",
      options: [
        "<10 minutes",
        "10–20 minutes",
        "20–40 minutes",
        "40+ minutes"
      ],
      required: true,
    },
    // Q4 Step 1: Main Goal
    {
      id: 11,
      type: "radio",
      title: "Goals & Motivation",
      description: "What is your primary goal for your physical activity or fitness?",
      key: "primaryFitnessGoal",
      options: [
        "Lose weight / Fat reduction",
        "Improve stamina / Cardiovascular fitness",
        "Build strength / Muscle tone",
        "Improve flexibility / Mobility",
        "Reduce stress / Improve mental health",
        "Maintain overall fitness / health",
        "Other"
      ],
      required: true,
    },
    // Q4 Step 2: Motivation & Readiness
    {
      id: 12,
      type: "radio",
      title: "Motivation & Readiness",
      description: "How ready are you to make changes and follow a physical activity plan?",
      key: "readiness",
      options: [
        "Very ready → I’m ready to start now",
        "Somewhat ready → I can start small and gradually increase",
        "Not ready → I want to explore and prepare first"
      ],
      required: true,
    },
    // Q4 Step 3: Preferred Feedback & Motivation Style
    {
      id: 13,
      type: "multiselect",
      title: "Preferred Feedback & Motivation Style",
      description: "What motivates you most to stay consistent?",
      key: "motivationStyle",
      options: [
        { id: "tracking", label: "Tracking progress / Metrics / Stats" },
        { id: "social", label: "Social support / Friends or community" },
        { id: "rewards", label: "Rewards / Gamification / Badges" },
        { id: "visual", label: "Visual feedback / Charts / App reminders" }
      ],
      required: false,
    },
  ],

  // Nutrition Questions
  "Nutrition": [
    {
      id: 6,
      type: "radio",
      title: "Diet Type",
      description: "What type of diet do you usually follow?",
      key: "dietType",
      options: [
        "Mostly vegetables and no meat (Vegetarian)",
        "Only plant-based foods, no meat, eggs, or dairy (Vegan)",
        "Mostly meat, eggs, and low in bread/rice/potatoes (Keto / Low-carb)",
        "A mix of vegetables, fruits, grains, and some meat or fish (Balanced / Mediterranean)",
        "I eat whatever I feel like, no specific pattern (No specific diet)"
      ],
      required: true,
    },
    {
      id: 7,
      type: "multiselect",
      title: "Health Conditions",
      description: "Do you have any health conditions?",
      key: "healthConditions",
      options: [
        { id: "none", label: "None" },
        { id: "diabetes", label: "Diabetes" },
        { id: "highBloodPressure", label: "High blood pressure" },
        { id: "heartDisease", label: "Heart disease / High cholesterol" },
        { id: "kidneyLiver", label: "Kidney or liver problems" },
        { id: "cancer", label: "Cancer (history/current)" },
        { id: "otherCondition", label: "Other" }
      ],
      required: false,
    },
    {
      id: 8,
      type: "multiselect",
      title: "Substance Use",
      description: "Do you use any of the following?",
      key: "substanceUse",
      options: [
        { id: "none", label: "None" },
        { id: "alcohol", label: "Alcohol" },
        { id: "tobacco", label: "Cigarettes / Tobacco" },
        { id: "drugs", label: "Drugs (recreational / non-prescribed)" }
      ],
      required: false,
    },
    {
      id: 9,
      type: "radio",
      title: "Meal Patterns",
      description: "How do you usually eat your meals?",
      key: "mealPatterns",
      options: [
        "I eat regular meals every day",
        "I often skip breakfast",
        "I snack a lot between meals",
        "I follow intermittent fasting or skip meals"
      ],
      required: true,
    },
    {
      id: 10,
      type: "radio",
      title: "Water Intake",
      description: "How much water do you drink daily?",
      key: "waterIntake",
      options: [
        "Less than 1 liter",
        "1–2 liters",
        "More than 2 liters"
      ],
      required: true,
    },
    {
      id: 11,
      type: "radio",
      title: "Fruits and Vegetables",
      description: "How often do you eat fruits, vegetables, or whole grains?",
      key: "fruitVegFrequency",
      options: [
        "Rarely",
        "Sometimes",
        "Every day"
      ],
      required: true,
    },
    {
      id: 12,
      type: "multiselect",
      title: "Nutrition Focus",
      description: "Which of these best describes your main nutrition focus? (Select all that apply)",
      key: "nutritionFocus",
      options: [
        { id: "plantBased", label: "I follow a plant-based diet (vegan or rarely eat animal products)" },
        { id: "heartHealth", label: "I want to improve heart health" },
        { id: "diabetes", label: "I want to manage or prevent diabetes" },
        { id: "kidneyLiver", label: "I have kidney or liver problems" },
        { id: "other", label: "Other" }
      ],
      required: true,
    },
    {
      id: 13,
      type: "multiselect",
      title: "Main Nutrition Goal",
      description: "What is your main nutrition goal? (Select all that apply)",
      key: "mainNutritionGoal",
      options: [
        { id: "weightManagement", label: "Manage or reduce weight" },
        { id: "moreEnergy", label: "Have more energy and feel stronger" },
        { id: "diseasePrevention", label: "Prevent diseases and stay healthy" },
        { id: "gutHealth", label: "Improve digestion and gut health" }
      ],
      required: true,
    },
  ],

  // Tobacco Questions
  "Tobacco": [
    {
      id: 6,
      type: "radio",
      title: "Tobacco Use",
      description: "Do you currently use tobacco in any form (cigarettes, beedi, smokeless tobacco, betel, vaping)?",
      key: "tobaccoUse",
      options: [
        "Never",
        "Used in the past, but quit",
        "Occasionally (less than daily)",
        "Daily / Regular use",
      ],
      required: true,
    },
  ],

  // Alcohol Questions
  "Alcohol": [
    {
      id: 6,
      type: "radio",
      title: "Alcohol Use",
      description: "How often do you usually drink alcohol?",
      key: "alcoholUse",
      options: [
        "Never",
        "Used in the past, but quit",
        "Occasionally (1–3 times per month)",
        "Weekly (1–3 times per week)",
        "Regular / Heavy use (4+ times per week or binge drinking)",
      ],
      required: true,
    },
  ],

  // Sleep Questions
  "Sleep": [
    {
      id: 6,
      type: "radio",
      title: "Sleep Quality",
      description: "How would you rate your overall sleep quality?",
      key: "sleepQuality",
      options: [
        "Very poor",
        "Poor",
        "Fair",
        "Good",
        "Very good",
      ],
      required: true,
    },
  ],

  // Mental Health Questions
  "Mental health": [
    {
      id: 6,
      type: "radio",
      title: "Stress and Mood",
      description: "How often do you feel stressed or anxious in a typical week?",
      key: "stressLevel",
      options: [
        "Rarely",
        "Sometimes (1-2 days)",
        "Frequently (3-5 days)",
        "Almost every day",
      ],
      required: true,
    },
  ],

  // Prevent Diseases Questions
  "Prevent diseases": [
    {
      id: 6,
      type: "radio",
      title: "Prevention Focus",
      description: "What diseases are you most concerned about preventing?",
      key: "preventionFocus",
      options: [
        "Diabetes",
        "High Blood Pressure / Heart Disease",
        "Cancer",
        "General health and longevity",
      ],
      required: true,
    },
  ],
};

// Function to get all questions based on primary goal
const getQuestions = (primaryGoal = null, currentAnswers = {}) => {
  // Use a regex to extract the key from the option string
  const goalKey = primaryGoal ? primaryGoal.match(/\(([^)]+)\)/)?.[1] || primaryGoal.trim() : null;

  if (!primaryGoal) {
    return baseQuestions;
  }

  const goalQuestions = goalSpecificQuestions[goalKey] || [];

  const allQuestions = [...baseQuestions];
  goalQuestions.forEach((question, index) => {
    allQuestions.push({
      ...question,
      id: baseQuestions.length + index + 1
    });
  });

  return allQuestions;
};

// --- CONDITIONAL FOLLOW-UP DATA ---
const conditionalFollowUps = {
  // --- Diet Type Follow-ups ---
  "Mostly vegetables and no meat (Vegetarian)": [
    {
      subKey: "vegetarianProtein",
      subTitle: "How often do you include protein sources (lentils, beans, soy, tofu, eggs, dairy, nuts)?",
      subType: "radio",
      options: ["Rarely", "Sometimes", "Daily"],
      required: true,
    },
  ],
  "Only plant-based foods, no meat, eggs, or dairy (Vegan)": [
    {
      subKey: "veganProtein",
      subTitle: "How often do you include protein sources (lentils, beans, soy, tofu, nuts)?",
      subType: "radio",
      options: ["Rarely", "Sometimes", "Daily"],
      required: true,
    },
  ],
  "Mostly meat, eggs, and low in bread/rice/potatoes (Keto / Low-carb)": [
    {
      subKey: "ketoFiber",
      subTitle: "How often do you include fiber-rich vegetables (leafy greens, beans, local vegetables)?",
      subType: "radio",
      options: ["Rarely", "Sometimes", "Daily"],
      required: true,
    },
  ],

  // --- Substance Use Follow-ups ---
  "alcohol": [
    {
      subKey: "alcoholFrequency",
      subTitle: "How often do you drink alcohol?",
      subType: "radio",
      options: [
        "Rarely (special occasions)",
        "Sometimes (1–2 times a week)",
        "Frequently (3–5 times a week)",
        "Daily"
      ],
      required: true,
    },
    {
      subKey: "alcoholQuantity",
      subTitle: "On days you drink, how many drinks do you usually have?",
      subType: "radio",
      options: ["1–2", "3–4", "5 or more"],
      required: true,
    },
  ],
  "tobacco": [
    {
      subKey: "tobaccoFrequency",
      subTitle: "How often do you smoke?",
      subType: "radio",
      options: [
        "Rarely (less than once a week)",
        "Sometimes (1–5 cigarettes per day)",
        "Frequently (6–10 cigarettes per day)",
        "Heavy (more than 10 per day)"
      ],
      required: true,
    },
  ],
  "drugs": [
    {
      subKey: "drugsFrequency",
      subTitle: "How often do you use recreational drugs?",
      subType: "radio",
      options: [
        "Rarely",
        "Sometimes (monthly / weekends)",
        "Frequently (weekly)",
        "Daily"
      ],
      required: true,
    },
  ],

  // --- Tobacco Use Follow-ups ---
  "Never": [
    {
      subKey: "secondHandExposure",
      subTitle: "Do you feel exposed to second-hand smoke at home, work, or in public?",
      subType: "radio",
      options: ["Yes", "Sometimes", "Rarely", "No"],
      required: true,
    },
    {
      subKey: "stayTobaccoFree",
      subTitle: "Would you like to learn strategies to continue staying tobacco-free?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "Used in the past, but quit": [
    {
      subKey: "timeSinceQuit",
      subTitle: "How long ago did you quit smoking?",
      subType: "radio",
      options: [
        "Less than 6 months",
        "6–12 months",
        "1–2 years",
        "More than 2 years"
      ],
      required: true,
    },
    {
      subKey: "quitSupport",
      subTitle: "Would you like support to stay tobacco-free?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "Occasionally (less than daily)": [
    {
      subKey: "reduceTobacco",
      subTitle: "Are you interested in reducing or quitting tobacco use?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "Daily / Regular use": [
    {
      subKey: "tobaccoAmount",
      subTitle: "How many cigarettes, beedis, or equivalent do you use per day?",
      subType: "radio",
      options: [
        "1–5",
        "6–10",
        "11–20",
        "More than 20"
      ],
      required: true,
    },
    {
      subKey: "quitInterest",
      subTitle: "Are you interested in quitting or cutting down?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],

  // --- Alcohol Use Follow-ups ---
  "Used in the past, but quit": [
    {
      subKey: "timeSinceAlcoholQuit",
      subTitle: "How long ago did you quit drinking alcohol?",
      subType: "radio",
      options: [
        "Less than 6 months",
        "6–12 months",
        "1–2 years",
        "More than 2 years"
      ],
      required: true,
    },
    {
      subKey: "alcoholQuitSupport",
      subTitle: "Would you like support to stay alcohol-free?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "Occasionally (1–3 times per month)": [
    {
      subKey: "occasionalAlcoholAmount",
      subTitle: "When you drink, how many drinks do you typically have?",
      subType: "radio",
      options: [
        "1–2 drinks",
        "3–4 drinks",
        "5 or more drinks"
      ],
      required: true,
    },
  ],
  "Weekly (1–3 times per week)": [
    {
      subKey: "weeklyAlcoholAmount",
      subTitle: "On average, how many drinks do you have per week?",
      subType: "radio",
      options: [
        "1–3 drinks",
        "4–7 drinks",
        "8 or more drinks"
      ],
      required: true,
    },
    {
      subKey: "reduceWeeklyAlcohol",
      subTitle: "Are you interested in reducing your alcohol consumption?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "Regular / Heavy use (4+ times per week or binge drinking)": [
    {
      subKey: "heavyAlcoholAmount",
      subTitle: "On average, how many drinks do you have per week?",
      subType: "radio",
      options: [
        "4–7 drinks",
        "8–14 drinks",
        "15 or more drinks"
      ],
      required: true,
    },
    {
      subKey: "reduceHeavyAlcohol",
      subTitle: "Are you interested in reducing or quitting alcohol?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],

  // --- Exercise Location Follow-ups ---
  "At home": [
    {
      subKey: "homeSuggestions",
      subTitle: "Would you like suggestions for short routines that don’t need equipment?",
      subType: "radio",
      options: ["Yes", "No", "Maybe"],
      required: true,
    }
  ],
  "Outdoors (park, streets, trails)": [
    {
      subKey: "outdoorExercises",
      subTitle: "Would you like walking, running, or bodyweight exercises?",
      subType: "radio",
      options: ["Yes", "No", "Maybe"],
      required: true,
    }
  ],
  "Gym or fitness center": [
    {
      subKey: "gymAccess",
      subTitle: "Do you have access to machines, weights, or classes?",
      subType: "radio",
      options: ["Machines", "Free weights", "Classes", "Mixed"],
      required: true,
    }
  ],
  "Mixed / Any location": []
};

// Health condition specific follow-ups
const healthConditionFollowUps = {
  "diabetes": [
    {
      subKey: "diabetesType",
      subTitle: "What type of diabetes do you have?",
      subType: "radio",
      options: ["Type 1", "Type 2", "Gestational", "Not sure"],
      required: true,
    },
    {
      subKey: "diabetesControl",
      subTitle: "How well is your diabetes controlled?",
      subType: "radio",
      options: ["Well-controlled", "Somewhat controlled", "Not well-controlled"],
      required: true,
    },
  ],
  "highBloodPressure": [
    {
      subKey: "bpControl",
      subTitle: "Is your blood pressure controlled with medication or lifestyle?",
      subType: "radio",
      options: ["Yes, well-controlled", "Sometimes controlled", "Not controlled"],
      required: true,
    },
  ],
  "heartDisease": [
    {
      subKey: "heartCondition",
      subTitle: "What type of heart condition do you have?",
      subType: "radio",
      options: [
        "High cholesterol",
        "History of heart attack/stroke",
        "Other",
        "Not sure"
      ],
      required: true,
    },
  ],
  "kidneyLiver": [
    {
      subKey: "kidneyLiverDetails",
      subTitle: "Do you have kidney disease, liver disease, or both?",
      subType: "radio",
      options: ["Kidney disease", "Liver disease", "Both", "Not sure"],
      required: true,
    },
  ],
  "cancer": [
    {
      subKey: "cancerAdviceFollow",
      subTitle: "Would you like specific nutrition advice tailored for cancer patients/survivors?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],
};

// Medication-related questions
const medicationQuestion = {
  subKey: "takingMedications",
  subTitle: "Are you currently taking any medications for these conditions?",
  subType: "radio",
  options: ["Yes", "No"],
  required: true,
};

const medicationDetailsFollowUp = {
  subKey: "medicineDetails",
  subTitle: "Please provide details about your medications.",
  subType: "medications",
  required: true,
  routineOptions: [
    "Daily",
    "Twice daily",
    "Weekly",
    "As needed",
    "Other"
  ],
  defaultData: [{ id: 1, name: '', routine: 'Daily', dose: '' }],
};

const cancerYesFollowUp = {
  subKey: "cancerAdviceDetails",
  subTitle: "Please specify any details about your cancer (type, treatment stage, etc.)",
  subType: "text",
  placeholder: "E.g., Breast cancer, undergoing chemotherapy",
  required: true,
};

const otherConditionFollowUp = {
  subKey: "otherConditionDetails",
  subTitle: "Please briefly describe your condition.",
  subType: "text",
  placeholder: "E.g., Thyroid condition, autoimmune disease",
  required: true,
};

// New for Physical Activity Q1a
const frequencyDurationQuestions = [
  {
    subKey: "daysPerWeek",
    subTitle: "How many days per week do you exercise?",
    subType: "radio",
    options: ["0–1", "2–3", "4–5", "6–7"],
    required: true,
  },
  {
    subKey: "durationPerDay",
    subTitle: "On days you exercise, how long do you usually spend being active?",
    subType: "radio",
    options: ["<15", "15–30", "30–60", "60+ min"],
    required: true,
  },
  {
    subKey: "challengeLevel",
    subTitle: "How challenging do you feel your exercise is?",
    subType: "radio",
    options: ["Very easy", "Moderate", "Hard", "Very hard"],
    required: true,
  }
];

// New for Barriers
const barriersQuestion = {
  subKey: "barriers",
  subTitle: "What usually makes it hard for you to be more active?",
  subType: "multiselect",
  options: [
    { id: "lackTime", label: "Lack of time" },
    { id: "lackMotivation", label: "Lack of motivation" },
    { id: "physicalLimitations", label: "Physical limitations / health issues" },
    { id: "dontKnow", label: "Don’t know what to do" },
    { id: "nothing", label: "Nothing" }
  ],
  required: false,
};

const barrierFollowUps = {
  "lackTime": [
    {
      subKey: "shortWorkouts",
      subTitle: "Would short 5–10 min workouts at home be easier for you to try?",
      subType: "radio",
      options: ["Yes", "No", "Maybe"],
      required: true,
    }
  ],
  "lackMotivation": [
    {
      subKey: "dailyChallenges",
      subTitle: "Would you like us to set small daily challenges or reminders to help you stay consistent?",
      subType: "radio",
      options: ["Yes", "No", "Maybe"],
      required: true,
    }
  ],
  "physicalLimitations": [
    {
      subKey: "lowImpactPlan",
      subTitle: "Would you like a safe low-impact plan (walking, stretching, mobility)?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    }
  ],
  "dontKnow": [
    {
      subKey: "beginnerRoutines",
      subTitle: "Would you like us to suggest simple beginner routines you can follow?",
      subType: "radio",
      options: ["Yes", "No", "Maybe"],
      required: true,
    }
  ],
  "nothing": []
};

// New for Satisfaction
const satisfactionQuestion = {
  subKey: "satisfaction",
  subTitle: "Do you feel your current routine gives you the results you want?",
  subType: "radio",
  options: ["Yes, I’m happy", "Not sure", "No, I feel stuck / not improving"],
  required: true,
};

const maintainOrPushQuestion = {
  subKey: "maintainOrPush",
  subTitle: "Do you want to maintain or push further with new challenges?",
  subType: "radio",
  options: ["Maintain", "Push further"],
  required: true,
};

const advancedGuidanceQuestion = {
  subKey: "advancedGuidance",
  subTitle: "Would you like advanced guidance on recovery, stretching, or nutrition?",
  subType: "radio",
  options: ["Yes", "Maybe", "No"],
  required: true,
};

const structuredTrainingQuestion = {
  subKey: "structuredTraining",
  subTitle: "Would you like structured training (advanced strength, endurance, or sports-specific programs)?",
  subType: "radio",
  options: ["Yes", "Maybe", "No"],
  required: true,
};

const suggestVarietyQuestion = {
  subKey: "suggestVariety",
  subTitle: "Would you like us to suggest a variety to keep it interesting?",
  subType: "radio",
  options: ["Yes", "No"],
  required: true,
};

const focusAreaQuestion = {
  subKey: "focusArea",
  subTitle: "Would you like to focus more on strength, stamina, or flexibility?",
  subType: "radio",
  options: ["Yes", "No", "Not sure"],
  required: true,
};

const suggestInterestingQuestion = {
  subKey: "suggestInteresting",
  subTitle: "Would you like suggestions to keep it interesting?",
  subType: "radio",
  options: ["Yes", "No"],
  required: true,
};

// New for Physical Conditions
const physicalConditionsQuestion = {
  subKey: "conditions",
  subTitle: "Please select any conditions or injuries you have that may affect your exercise.",
  subType: "multiselect",
  options: [
    { id: "heartDisease", label: "Heart disease / High blood pressure" },
    { id: "diabetes", label: "Diabetes / Blood sugar issues" },
    { id: "jointIssues", label: "Joint or mobility issues (knees, hips, back)" },
    { id: "respiratory", label: "Respiratory issues (asthma, COPD)" },
    { id: "recentSurgery", label: "Recent surgery or injury" },
    { id: "tobaccoUse", label: "Tobacco use" },
    { id: "alcoholUse", label: "Alcohol use" },
    { id: "drugUse", label: "Recreational drug use" },
    { id: "other", label: "Other / Not listed" }
  ],
  required: false,
};

const physicalConditionFollowUps = {
  "heartDisease": [
    {
      subKey: "heartCondition",
      subTitle: "How would you describe your current condition?",
      subType: "radio",
      options: ["Well controlled with medication", "Sometimes fluctuates, but manageable", "Not well controlled / frequent issues"],
      required: true,
    },
    {
      subKey: "medicalClearance",
      subTitle: "Do you have medical clearance to exercise?",
      subType: "radio",
      options: ["Yes", "No", "Not sure"],
      required: true,
    }
  ],
  "diabetes": [
    {
      subKey: "bloodSugarManagement",
      subTitle: "How is your blood sugar usually managed?",
      subType: "radio",
      options: ["Controlled with medication or insulin", "Sometimes fluctuates", "Frequently unstable"],
      required: true,
    },
    {
      subKey: "hypoglycemia",
      subTitle: "Do you experience frequent low sugar episodes (hypoglycemia)?",
      subType: "radio",
      options: ["Yes", "No", "Sometimes"],
      required: true,
    }
  ],
  "jointIssues": [
    {
      subKey: "affectedAreas",
      subTitle: "Which areas are affected?",
      subType: "radio",
      options: ["Knees", "Hips", "Back", "Multiple areas"],
      required: true,
    },
    {
      subKey: "limitMovement",
      subTitle: "How much does this limit your movement?",
      subType: "radio",
      options: ["Mild (can move with little discomfort)", "Moderate (some exercises are difficult)", "Severe (movement is very limited / painful)"],
      required: true,
    }
  ],
  "respiratory": [
    {
      subKey: "symptomsFrequency",
      subTitle: "How often do you experience symptoms while moving/exercising?",
      subType: "radio",
      options: ["Rarely", "Sometimes", "Often"],
      required: true,
    },
    {
      subKey: "inhalerUse",
      subTitle: "Do you use an inhaler or medication before activity?",
      subType: "radio",
      options: ["Yes", "No", "Sometimes"],
      required: true,
    }
  ],
  "recentSurgery": [
    {
      subKey: "surgeryTime",
      subTitle: "When did this occur?",
      subType: "radio",
      options: ["Less than 2 weeks ago", "Less than 1 month ago", "Less than 3 months ago", "3–6 months ago", "More than 6 months ago"],
      required: true,
    },
    {
      subKey: "recoveryPlan",
      subTitle: "Are you currently under a doctor’s or physiotherapist’s recovery plan?",
      subType: "radio",
      options: ["Yes", "No", "Not sure"],
      required: true,
    }
  ],
  "tobaccoUse": [
    {
      subKey: "smokingFrequency",
      subTitle: "How often do you smoke?",
      subType: "radio",
      options: ["Daily / A few times a week", "Occasionally", "Rarely"],
      required: true,
    },
    {
      subKey: "staminaTips",
      subTitle: "Would you like us to suggest tips for improving stamina if you continue smoking?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    }
  ],
  "alcoholUse": [
    {
      subKey: "drinkingFrequency",
      subTitle: "How often do you drink alcohol?",
      subType: "radio",
      options: ["Daily", "Weekly", "Occasionally", "Rarely"],
      required: true,
    },
    {
      subKey: "drinksQuantity",
      subTitle: "On days you drink, how many drinks do you usually have?",
      subType: "radio",
      options: ["1–2", "3–4", "5+"],
      required: true,
    }
  ],
  "drugUse": [
    {
      subKey: "drugFrequency",
      subTitle: "How often do you use recreational drugs?",
      subType: "radio",
      options: ["Daily", "Weekly", "Occasionally", "Rarely"],
      required: true,
    },
    {
      subKey: "saferOptions",
      subTitle: "Would you like us to suggest safer exercise options that consider your lifestyle?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    }
  ],
  "other": [
    {
      subKey: "otherDescription",
      subTitle: "Please briefly describe your condition.",
      subType: "text",
      placeholder: "",
      required: true,
    },
    {
      subKey: "lowIntensity",
      subTitle: "Would you like us to recommend only safe, low-intensity activities to start with?",
      subType: "radio",
      options: ["Yes", "No", "Not sure"],
      required: true,
    }
  ]
};

// New for Primary Fitness Goal
const otherGoalText = {
  subKey: "otherGoal",
  subTitle: "Please specify your goal",
  subType: "text",
  placeholder: "",
  required: true,
};

const goalFollowUps = {
  "Lose weight / Fat reduction": [
    {
      subKey: "combinedGuidance",
      subTitle: "Would you like combined guidance on both exercise and nutrition?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    }
  ],
  "Improve stamina / Cardiovascular fitness": [
    {
      subKey: "workoutPreference",
      subTitle: "Would you prefer endurance workouts (running, cycling) or interval-style workouts?",
      subType: "radio",
      options: ["Endurance", "Interval", "Mixed"],
      required: true,
    }
  ],
  "Build strength / Muscle tone": [
    {
      subKey: "strengthAccess",
      subTitle: "Do you have access to weights or prefer bodyweight workouts?",
      subType: "radio",
      options: ["Weights", "Bodyweight", "Both"],
      required: true,
    }
  ],
  "Improve flexibility / Mobility": [
    {
      subKey: "mobilityRoutines",
      subTitle: "Would you like mobility and stretching routines to relieve discomfort?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    }
  ],
  "Reduce stress / Improve mental health": [
    {
      subKey: "exerciseStyle",
      subTitle: "Would you prefer calming exercises (yoga, stretching) or energy-boosting ones (cardio, dance)?",
      subType: "radio",
      options: ["Calming", "Energy-boosting", "Mixed"],
      required: true,
    }
  ],
  "Maintain overall fitness / health": [
    {
      subKey: "consistentGuidance",
      subTitle: "Would you like guidance on keeping your routine consistent and challenging?",
      subType: "radio",
      options: ["Yes", "No", "Maybe"],
      required: true,
    }
  ],
  "Other": [
    {
      subKey: "suggestBasedOnLifestyle",
      subTitle: "Would you like suggestions based on your lifestyle and preferences?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    }
  ]
};

export { 
  baseQuestions, 
  goalSpecificQuestions, 
  getQuestions, 
  healthConditionFollowUps, 
  conditionalFollowUps, 
  cancerYesFollowUp,
  medicationQuestion,      
  medicationDetailsFollowUp,
  otherConditionFollowUp,
  frequencyDurationQuestions,
  barriersQuestion,
  barrierFollowUps,
  satisfactionQuestion,
  maintainOrPushQuestion,
  advancedGuidanceQuestion,
  structuredTrainingQuestion,
  suggestVarietyQuestion,
  focusAreaQuestion,
  suggestInterestingQuestion,
  physicalConditionsQuestion,
  physicalConditionFollowUps,
  goalFollowUps,
  otherGoalText
};
export default getQuestions;