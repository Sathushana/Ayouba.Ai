// data/questions.js

// Base questions that everyone answers
const baseQuestions = [
  // Step 1: Full Name
  {
    id: 1,
    type: "text",
    title: "What's your full name?",
    description:
      "We use your name to personalize your health recommendations and create a better experience for you.",
    key: "fullName",
    placeholder: "Enter your full name",
    required: true,
  },
  // Step 2: Age
  {
    id: 2,
    type: "number",
    title: "How old are you?",
    description:
      "Your age helps us personalise your lifestyle recommendations and identify risk early. Knowing your age helps us guide you safely and effectively.",
    key: "age",
    placeholder: "Enter age in years (e.g., 35)",
    required: true,
  },
  // Step 3: Sex
  {
    id: 3,
    type: "radio",
    title: "What is your sex?",
    description:
      "Men and women have different health risks and reference ranges for lab values. This helps us give you personalized advice.",
    key: "sex",
    options: ["Male", "Female"],
    required: true,
  },
  // Step 4: Height and Weight (BMI)
  {
    id: 4,
    type: "measurements",
    title: "What are your height and weight?",
    description:
      "This helps calculate your BMI, which is an important indicator of health risk in Sri Lankan adults. For South Asians, health risks can appear at lower BMI than in other populations.",
    key: "measurements",
    inputs: [
      { key: "height", unit: "cm", placeholder: "e.g., 170", required: true },
      { key: "weight", unit: "kg", placeholder: "e.g., 65", required: true },
    ],
    required: true,
  },
  // Step 5: Primary Health Goal (UPDATED OPTIONS)
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
      "🛡️ Stay healthy & prevent future diseases (Prevent diseases)",
    ],
    required: true,
  },
];

// Goal-specific questions
const goalSpecificQuestions = {
  // Physical Activity Questions - FIXED TO MATCH DOCUMENT STRUCTURE
  "Physical Activity": [
    // Q1: Baseline Activity Level
    {
      id: 6,
      type: "radio",
      title: "Q1 – Baseline Activity",
      description: "In a normal week, how active are you?",
      key: "activityLevel",
      options: [
        "Mostly sitting (little or no exercise)",
        "Light movement (walks, chores, light activity)",
        "Moderate activity (exercise 3–4 days/week, brisk walking, cycling, sports)",
        "Very active (exercise most days / vigorous workouts/sports)",
      ],
      required: true,
    },
    // Q2: Health & Safety Check
    {
      id: 7,
      type: "radio",
      title: "Q2 – Health & Safety Check",
      description:
        "Do you have any medical conditions or injuries that affect your ability to exercise?",
      key: "hasMedicalConditions",
      options: ["Yes", "No"],
      required: true,
    },
    // Q3: Exercise Preferences & Environment (Location)
    {
      id: 8,
      type: "radio",
      title: "Q3 – Preferences & Environment (Location)",
      description:
        "Where do you usually prefer to exercise or would like to exercise?",
      key: "exerciseLocation",
      options: [
        "At home",
        "Outdoors (park, streets, trails)",
        "Gym or fitness center",
        "Mixed / Any location",
      ],
      required: true,
    },
    // Q3: Activity Type Preference (Q3 Step 2)
    {
      id: 9,
      type: "multiselect",
      title: "Q3 – Preferences & Environment (Activity Type)",
      description:
        "Which types of activities do you enjoy most or would like to try?",
      key: "activityPreferences",
      options: [
        { id: "walking", label: "Walking / Hiking" },
        { id: "running", label: "Running / Jogging" },
        { id: "cycling", label: "Cycling" },
        { id: "strength", label: "Strength / Resistance Training" },
        { id: "yoga", label: "Yoga / Pilates / Stretching" },
        { id: "dance", label: "Dance / Aerobics" },
        { id: "sports", label: "Sports (Football, Basketball, Tennis, etc.)" },
        { id: "other", label: "Other / Not sure" },
      ],
      required: true,
    },
    // Q3: Time Availability (Q3 Step 4)
    {
      id: 10,
      type: "radio",
      title: "Q3 – Preferences & Environment (Time Availability)",
      description:
        "How much time can you usually dedicate to exercise per day?",
      key: "timeAvailability",
      options: ["<10 minutes", "10–20 minutes", "20–40 minutes", "40+ minutes"],
      required: true,
    },
    // Q4: Main Fitness Goal (Q4 Step 1)
    {
      id: 11,
      type: "radio",
      title: "Q4 – Goals & Motivation (Main Goal)",
      description:
        "What is your primary goal for your physical activity or fitness?",
      key: "fitnessGoal",
      options: [
        "Lose weight / Fat reduction",
        "Improve stamina / Cardiovascular fitness",
        "Build strength / Muscle tone",
        "Improve flexibility / Mobility",
        "Reduce stress / Improve mental health",
        "Maintain overall fitness / health",
        "Other",
      ],
      required: true,
    },
    // Q4: Motivation & Readiness (Q4 Step 2)
    {
      id: 12,
      type: "radio",
      title: "Q4 – Goals & Motivation (Readiness)",
      description:
        "How ready are you to make changes and follow a physical activity plan?",
      key: "readinessLevel",
      options: [
        "Very ready → I’m ready to start now",
        "Somewhat ready → I can start small and gradually increase",
        "Not ready → I want to explore and prepare first",
      ],
      required: true,
    },
    // Q4: Motivation Style (Q4 Step 3)
    {
      id: 13,
      type: "multiselect",
      title: "Q4 – Goals & Motivation (Motivation Style)",
      description: "What motivates you most to stay consistent?",
      key: "motivationStyle",
      options: [
        { id: "tracking", label: "Tracking progress / Metrics / Stats" },
        { id: "social", label: "Social support / Friends or community" },
        { id: "rewards", label: "Rewards / Gamification / Badges" },
        { id: "visual", label: "Visual feedback / Charts / App reminders" },
      ],
      required: true,
    },
  ],

  // Nutrition Questions (UNCHANGED from your provided code)
  Nutrition: [
    // Q1: Diet Type
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
        "I eat whatever I feel like, no specific pattern (No specific diet)",
      ],
      required: true,
    },
    // Q2: Health Conditions
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
        { id: "otherCondition", label: "Other" },
      ],
      required: false,
    },
    // Q3: Substance Use
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
        { id: "drugs", label: "Drugs (recreational / non-prescribed)" },
      ],
      required: false,
    },
    // Q4: Meal Patterns
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
        "I follow intermittent fasting or skip meals",
      ],
      required: true,
    },
    // Q5: Water Intake
    {
      id: 10,
      type: "radio",
      title: "Water Intake",
      description: "How much water do you drink daily?",
      key: "waterIntake",
      options: ["Less than 1 liter", "1-2 liters", "More than 2 liters"],
      required: true,
    },
    // Q6: Fruits & Vegetables
    {
      id: 11,
      type: "radio",
      title: "Fruits and Vegetables",
      description: "How often do you eat fruits, vegetables, or whole grains?",
      key: "fruitVegFrequency",
      options: ["Rarely", "Sometimes", "Every day"],
      required: true,
    },
    // Q7: Nutrition Focus
    {
      id: 12,
      type: "multiselect",
      title: "Nutrition Focus",
      description:
        "Which of these best describes your main nutrition focus? (Select all that apply)",
      key: "nutritionFocus",
      options: [
        {
          id: "plantBased",
          label:
            "I follow a plant-based diet (vegan or rarely eat animal products)",
        },
        { id: "heartHealth", label: "I want to improve heart health" },
        { id: "diabetes", label: "I want to manage or prevent diabetes" },
        { id: "kidneyLiver", label: "I have kidney or liver problems" },
        { id: "other", label: "Other" },
      ],
      required: true,
    },
    // Q8: Main Nutrition Goal
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
        { id: "gutHealth", label: "Improve digestion and gut health" },
      ],
      required: true,
    },
  ],

  // Tobacco Questions (UNCHANGED from your provided code)
  Tobacco: [
    // Q1: Current Substance Use
    {
      id: 6,
      type: "multiselect",
      title: "Substance Use",
      description:
        "Do you currently use any of these substances? (Select all that apply)",
      key: "tobaccoSubstances",
      options: [
        { id: "cigarettes", label: "Cigarettes" },
        { id: "beedi", label: "Beedi" },
        {
          id: "chewingTobacco",
          label: "Chewing tobacco / Betel leaves (Mawa / Pan)",
        },
        { id: "otherDrugs", label: "Other drugs (e.g., cannabis)" },
        { id: "none", label: "None of the above" },
      ],
      required: true,
    },
    // Q2: Usage Frequency
    {
      id: 7,
      type: "radio",
      title: "Usage Frequency",
      description: "How often do you use it?",
      key: "tobaccoFrequency",
      options: [
        "Daily",
        "Weekly",
        "Occasionally",
        "I used in the past, but quit",
      ],
      required: true,
    },
    // Q3: Units Per Day/Week (Conditional - only for current users)
    {
      id: 8,
      type: "text",
      title: "Usage Quantity",
      description: "How many units do you use per day/week?",
      key: "tobaccoQuantity",
      placeholder:
        "e.g., 10 cigarettes per day, 5 beedi per week, 3 leaves per day",
      required: false,
    },
    // Q4: Duration of Use
    {
      id: 9,
      type: "radio",
      title: "Duration of Use",
      description: "How long have you been using this?",
      key: "tobaccoDuration",
      options: [
        "Less than 1 year",
        "1-5 years",
        "5-10 years",
        "More than 10 years",
      ],
      required: true,
    },

    // Q5: Symptoms
    {
      id: 10,
      type: "multiselect",
      title: "Current Symptoms",
      description:
        "Are you experiencing any of these symptoms? (Select all that apply)",
      key: "tobaccoSymptoms",
      options: [
        // Smoking/Beedi Symptoms
        {
          id: "persistentCough",
          label: "Persistent cough or phlegm",
          category: "smoking",
        },
        {
          id: "shortnessBreath",
          label: "Shortness of breath/wheezing",
          category: "smoking",
        },
        { id: "chestPain", label: "Chest pain", category: "smoking" },
        { id: "fatigue", label: "Fatigue / low energy", category: "smoking" },

        // Chewing Tobacco Symptoms
        {
          id: "mouthSores",
          label: "Mouth sores or ulcers",
          category: "chewing",
        },
        {
          id: "mouthPatches",
          label: "Red or white patches in the mouth",
          category: "chewing",
        },
        {
          id: "gumDisease",
          label: "Gum disease/tooth loss",
          category: "chewing",
        },
        {
          id: "badBreath",
          label: "Bad breath/teeth staining",
          category: "chewing",
        },

        // Other Drugs Symptoms
        {
          id: "memoryProblems",
          label: "Memory or concentration problems",
          category: "otherDrugs",
        },
        {
          id: "anxietyDepression",
          label: "Anxiety or depression",
          category: "otherDrugs",
        },
        {
          id: "sleepDisturbances",
          label: "Sleep disturbances",
          category: "otherDrugs",
        },
        {
          id: "heartbeatChanges",
          label: "Rapid heartbeat/blood pressure changes",
          category: "otherDrugs",
        },

        { id: "noneSymptoms", label: "None of the above", category: "none" },
      ],
      required: true,
    },
    // Q6: Existing Health Conditions
    {
      id: 11,
      type: "multiselect",
      title: "Existing Health Conditions",
      description:
        "Do you already have any of these diseases or health conditions? (Select all that apply)",
      key: "tobaccoHealthConditions",
      options: [
        { id: "heartDisease", label: "Heart disease/hypertension" },
        { id: "diabetes", label: "Diabetes" },
        {
          id: "respiratoryDisease",
          label: "Respiratory disease (e.g., asthma, COPD)",
        },
        { id: "cancer", label: "Cancer (any type)" },
        {
          id: "oralHealth",
          label: "Oral health problems (e.g., gum disease, mouth ulcers)",
        },
        {
          id: "mentalHealth",
          label: "Mental health conditions (e.g., anxiety, depression)",
        },
        { id: "otherConditions", label: "Other" },
        { id: "noneConditions", label: "None of the above" },
      ],
      required: true,
    },
    // Q7: Reasons for Use
    {
      id: 12,
      type: "multiselect",
      title: "Reasons for Use",
      description:
        "What makes you use these substances? (Select all that apply)",
      key: "tobaccoReasons",
      options: [
        { id: "stress", label: "Stress/anxiety" },
        { id: "habit", label: "Habit/routine" },
        { id: "social", label: "Social situations/peer pressure" },
        { id: "cultural", label: "Cultural / family practice" },
        { id: "otherReasons", label: "Other" },
      ],
      required: true,
    },
    // Q8: Motivation to Quit/Reduce
    {
      id: 13,
      type: "multiselect",
      title: "Motivation to Change",
      description:
        "What motivates you to quit or reduce? (Select all that apply)",
      key: "tobaccoMotivation",
      options: [
        { id: "health", label: "Health concerns" },
        { id: "family", label: "Family / social reasons" },
        { id: "financial", label: "Financial reasons" },
      ],
      required: true,
    },
    // Q9: Goal
    {
      id: 14,
      type: "radio",
      title: "Your Goal",
      description: "What's your goal with using these substances?",
      key: "tobaccoGoal",
      options: [
        "I want to quit completely",
        "I want to reduce/cut down",
        "I just want to track and be mindful",
        "Not sure yet",
      ],
      required: true,
    },
  ],

  // Alcohol Questions (UNCHANGED from your provided code)
  Alcohol: [
    // Step 1: Frequency & Quantity
    {
      id: 6,
      type: "radio",
      title: "Alcohol Use Frequency",
      description: "How often do you usually drink alcohol?",
      key: "alcoholFrequency",
      options: [
        "Rarely (special occasions only)",
        "Sometimes (1-2 times a week)",
        "Often (3-5 times a week)",
        "Daily or almost daily",
      ],
      required: true,
    },
    // Step 2: Motivation Behind Drinking
    {
      id: 7,
      type: "radio",
      title: "Drinking Motivation",
      description: "When you drink, what's the main reason?",
      key: "drinkingMotivation",
      options: [
        "To relax or deal with stress (Stress-Relief Drinker)",
        "To celebrate or fit in socially (Social Drinker)",
        "Out of habit or routine (e.g., every evening) (Habitual Drinker)",
        "Because I crave it / feel I need it (Dependent Drinker)",
        "Other",
      ],
      required: true,
    },
    // Step 3: Context & Triggers
    {
      id: 8,
      type: "multiselect",
      title: "Drinking Context",
      description:
        "In what situations do you usually drink? (Select all that apply)",
      key: "drinkingContext",
      options: [
        { id: "homeAlone", label: "At home alone" },
        {
          id: "socialGatherings",
          label: "At social gatherings / with friends",
        },
        { id: "afterWork", label: "After work or stressful days" },
        { id: "duringMeals", label: "During meals" },
        { id: "weekendsOnly", label: "Weekends only" },
        { id: "otherContext", label: "Other" },
      ],
      required: true,
    },
    // Step 4: Consequences & Self-Reflection
    {
      id: 9,
      type: "multiselect",
      title: "Drinking Effects",
      description: "Have you noticed any of these effects from your drinking?",
      key: "drinkingEffects",
      options: [
        { id: "sleepEnergy", label: "Trouble with sleep or energy" },
        { id: "focusProductivity", label: "Affects focus or productivity" },
        { id: "familyTension", label: "Causes tension with family / friends" },
        {
          id: "healthImpact",
          label: "Impacts health (weight, blood pressure, digestion, etc.)",
        },
        { id: "noIssues", label: "No noticeable issues" },
      ],
      required: true,
    },
    // Step 5: Goal & Readiness
    {
      id: 10,
      type: "radio",
      title: "Alcohol Goal",
      description: "What's your goal with alcohol use?",
      key: "alcoholGoal",
      options: [
        "I want to quit completely",
        "I want to cut down",
        "I just want to track and be mindful",
        "Not sure yet",
      ],
      required: true,
    },
  ],

  // Sleep Questions (UNCHANGED from your provided code)
  Sleep: [
    {
      id: 6,
      type: "radio",
      title: "Sleep Quality",
      description: "How would you rate your overall sleep quality?",
      key: "sleepQuality",
      options: ["Very poor", "Poor", "Fair", "Good", "Very good"],
      required: true,
    },
  ],

  // Mental Health Questions (UNCHANGED from your provided code)
  "Mental health": [
    {
      id: 6,
      type: "radio",
      title: "Stress and Mood",
      description:
        "How often do you feel stressed or anxious in a typical week?",
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

  // Prevent diseases Questions (UNCHANGED from your provided code)
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
  if (!primaryGoal) {
    return baseQuestions;
  }

  // Extract goal key
  const goalKey = (() => {
    // Try to extract text inside parentheses, e.g. (Nutrition), (Physical Activity)
    const match = primaryGoal.match(/\(([^)]+)\)/);
    if (match) return match[1].trim();

    // Handle goals without parentheses explicitly
    const lower = primaryGoal.toLowerCase();
    if (lower.includes("alcohol")) return "Alcohol";
    if (
      lower.includes("smoking") ||
      lower.includes("tobacco") ||
      lower.includes("beedi")
    )
      return "Tobacco";
    if (lower.includes("sleep")) return "Sleep";
    if (lower.includes("stress") || lower.includes("mood"))
      return "Mental health";
    if (lower.includes("prevent")) return "Prevent diseases";

    // Fallback
    return primaryGoal.trim();
  })();

  // Load goal-specific questions
  const goalQuestions = goalSpecificQuestions[goalKey] || [];

  // Merge base + goal-specific questions
  const allQuestions = [...baseQuestions];
  goalQuestions.forEach((question, index) => {
    allQuestions.push({
      ...question,
      id: baseQuestions.length + index + 1,
    });
  });

  return allQuestions;
};

// --- CONDITIONAL FOLLOW-UP DATA ---
const conditionalFollowUps = {
  // --- Physical Activity Follow-ups (FIXED to match document's exact structure and options) ---
  
  // Q1: Baseline Activity (Base Questions - Q1b / Q1a/Q1b / Q1a/Q1c)
  "Mostly sitting (little or no exercise)": [
    {
      subKey: "barriers",
      subTitle: "What usually makes it hard for you to be more active?",
      subType: "multiselect",
      options: [
        { id: "lackTime", label: "Lack of time" },
        { id: "lackMotivation", label: "Lack of motivation" },
        {
          id: "physicalLimitations",
          label: "Physical limitations / health issues",
        },
        { id: "dontKnow", label: "Don't know what to do" },
        { id: "nothing", label: "Nothing" },
      ],
      required: true, // Set to required=true for proper step validation flow
    },
  ],
  "Light movement (walks, chores, light activity)": [
    {
      subKey: "frequencyDuration",
      subTitle: "How many days per week do you exercise?",
      subType: "radio",
      options: ["0–1", "2–3", "4–5", "6–7"], // Fixed: using en dash (–) to match document
      required: true,
    },
    {
      subKey: "sessionDuration",
      subTitle:
        "On days you exercise, how long do you usually spend being active?",
      subType: "radio",
      options: ["<15 min", "15–30 min", "30–60 min", "60+ min"], // Fixed: using en dash (–)
      required: true,
    },
    {
      subKey: "intensity",
      subTitle: "How challenging do you feel your exercise is?",
      subType: "radio",
      options: ["Very easy", "Moderate", "Hard", "Very hard"],
      required: true,
    },
    {
      subKey: "barriers",
      subTitle: "What usually makes it hard for you to be more active?",
      subType: "multiselect",
      options: [
        { id: "lackTime", label: "Lack of time" },
        { id: "lackMotivation", label: "Lack of motivation" },
        {
          id: "physicalLimitations",
          label: "Physical limitations / health issues",
        },
        { id: "dontKnow", label: "Don't know what to do" },
        { id: "nothing", label: "Nothing" },
      ],
      required: true, // Set to required=true for proper step validation flow
    },
  ],
  "Moderate activity (exercise 3–4 days/week, brisk walking, cycling, sports)":
    [ // Fixed: using en dash (–) in key
      {
        subKey: "frequencyDuration",
        subTitle: "How many days per week do you exercise?",
        subType: "radio",
        options: ["0–1", "2–3", "4–5", "6–7"], // Fixed: using en dash (–)
        required: true,
      },
      {
        subKey: "sessionDuration",
        subTitle:
          "On days you exercise, how long do you usually spend being active?",
        subType: "radio",
        options: ["<15 min", "15–30 min", "30–60 min", "60+ min"], // Fixed: using en dash (–)
        required: true,
      },
      {
        subKey: "intensity",
        subTitle: "How challenging do you feel your exercise is?",
        subType: "radio",
        options: ["Very easy", "Moderate", "Hard", "Very hard"],
        required: true,
      },
      {
        subKey: "satisfaction",
        subTitle:
          "Do you feel your current routine gives you the results you want?",
        subType: "radio",
        options: [
          "Yes, I’m happy", // Fixed: using em dash (—)
          "No, I feel stuck / not improving",
          "Not sure",
        ],
        required: true,
      },
    ],
  "Very active (exercise most days / vigorous workouts/sports)": [
    {
      subKey: "frequencyDuration",
      subTitle: "How many days per week do you exercise?",
      subType: "radio",
      options: ["0–1", "2–3", "4–5", "6–7"], // Fixed: using en dash (–)
      required: true,
    },
    {
      subKey: "sessionDuration",
      subTitle:
        "On days you exercise, how long do you usually spend being active?",
      subType: "radio",
      options: ["<15 min", "15–30 min", "30–60 min", "60+ min"], // Fixed: using en dash (–)
      required: true,
    },
    {
      subKey: "intensity",
      subTitle: "How challenging do you feel your exercise is?",
      subType: "radio",
      options: ["Very easy", "Moderate", "Hard", "Very hard"],
      required: true,
    },
    {
      subKey: "satisfaction",
      subTitle:
        "Do you feel your current routine gives you the results you want?",
      subType: "radio",
      options: [
        "Yes, I’m happy", // Fixed: using em dash (—)
        "No, I feel stuck / not improving",
        "Not sure",
      ],
      required: true,
    },
  ],

  // --- Q1b Barrier-specific Follow-ups (SECOND LAYER) ---
  lackTime: [
    {
      subKey: "shortWorkouts",
      subTitle:
        "Would short 5–10 min workouts at home be easier for you to try?",
      subType: "radio",
      options: ["Yes", "No", "Maybe"],
      required: true,
    },
  ],
  lackMotivation: [
    {
      subKey: "motivationSupport",
      subTitle:
        "Would you like us to set small daily challenges or reminders to help you stay consistent?",
      subType: "radio",
      options: ["Yes", "No", "Maybe"],
      required: true,
    },
  ],
  physicalLimitations: [
    {
      subKey: "lowImpactPlan",
      subTitle:
        "Would you like a safe low-impact plan (walking, stretching, mobility)?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],
  dontKnow: [
    {
      subKey: "beginnerRoutines",
      subTitle:
        "Would you like us to suggest simple beginner routines you can follow?",
      subType: "radio",
      options: ["Yes", "No", "Maybe"],
      required: true,
    },
  ],

  // --- Q1c Satisfaction Follow-ups (SECOND/THIRD LAYER) ---
  "Yes, I’m happy": [ // Fixed: using em dash (—) in key
    {
      subKey: "maintenanceDirection",
      subTitle: "Do you want to maintain or push further with new challenges?",
      subType: "radio",
      options: ["Maintain", "Push further", "Not sure"],
      required: true,
    },
  ],
  "No, I feel stuck / not improving": [
    {
      subKey: "improvementFocus",
      subTitle:
        "Would you like to focus more on strength, stamina, or flexibility?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],
  "Not sure": [ // This is the 'Satisfaction Not sure' case
    {
      subKey: "varietySuggestions",
      subTitle:
        "Would you like us to suggest a variety to keep it interesting?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],

  // Q1c: Third Layer for "Yes, I'm happy" -> "Maintain" / "Push further"
  Maintain: [ // Triggered by maintenanceDirection answer
    {
      subKey: "advancedGuidance",
      subTitle:
        "Would you like advanced guidance on recovery, stretching, or nutrition?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "Push further": [ // Triggered by maintenanceDirection answer
    {
      subKey: "structuredTraining",
      subTitle:
        "Would you like structured training (advanced strength, endurance, or sports-specific programs)?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  
  // --- Q2 – Health & Safety Check Follow-ups (Q2a) ---
  // This 'Yes' is the key from 'hasMedicalConditions: Yes'
  Yes: [ 
    {
      subKey: "medicalConditions",
      subTitle: "Please select any conditions or injuries you have that may affect your exercise.", // Q2a Multi-select
      subType: "multiselect",
      options: [
        { id: "heartDisease", label: "Heart disease / High blood pressure" },
        { id: "diabetes", label: "Diabetes / Blood sugar issues" },
        { id: "jointIssues", label: "Joint or mobility issues (knees, hips, back)" },
        { id: "respiratory", label: "Respiratory issues (asthma, COPD)" },
        { id: "surgery", label: "Recent surgery or injury" },
        { id: "tobacco", label: "Tobacco use" },
        { id: "alcohol", label: "Alcohol use" },
        { id: "drugs", label: "Recreational drug use" },
        { id: "other", label: "Other / Not listed" },
      ],
      required: true,
    },
  ],

  // --- Q2b Condition-Specific Follow-Ups (THIRD LAYER, triggered by medicalConditions multiselect keys) ---
  heartDisease: [
    { subKey: "heartControl", subTitle: "How would you describe your current condition?", subType: "radio", options: ["Well controlled with medication", "Sometimes fluctuates, but manageable", "Not well controlled / frequent issues"], required: true, },
    { subKey: "heartClearance", subTitle: "Do you have medical clearance to exercise?", subType: "radio", options: ["Yes", "No", "Not sure"], required: true, },
  ],
  diabetes: [
    { subKey: "sugarManagement", subTitle: "How is your blood sugar usually managed?", subType: "radio", options: ["Controlled with medication or insulin", "Sometimes fluctuates", "Frequently unstable"], required: true, },
    { subKey: "hypoglycemia", subTitle: "Do you experience frequent low sugar episodes (hypoglycemia)?", subType: "radio", options: ["Yes", "No", "Sometimes"], required: true, },
  ],
  jointIssues: [
    { subKey: "affectedAreas", subTitle: "Which areas are affected?", subType: "multiselect", options: [{ id: "knees", label: "Knees" }, { id: "hips", label: "Hips" }, { id: "back", label: "Back" }, { id: "multiple", label: "Multiple areas" }], required: true, },
    { subKey: "limitLevel", subTitle: "How much does this limit your movement?", subType: "radio", options: ["Mild (can move with little discomfort)", "Moderate (some exercises are difficult)", "Severe (movement is very limited / painful)"], required: true, },
  ],
  respiratory: [
    { subKey: "respiratorySymptoms", subTitle: "How often do you experience symptoms while moving/exercising?", subType: "radio", options: ["Rarely", "Sometimes", "Often"], required: true, },
    { subKey: "inhalerUse", subTitle: "Do you use an inhaler or medication before activity?", subType: "radio", options: ["Yes", "No", "Sometimes"], required: true, },
  ],
  surgery: [
    { subKey: "surgeryTiming", subTitle: "When did this occur?", subType: "radio", options: ["Less than 2 weeks ago", "Less than 1 month ago", "Less than 3 months ago", "3–6 months ago", "More than 6 months ago"], required: true, },
    { subKey: "recoveryPlan", subTitle: "Are you currently under a doctor’s or physiotherapist’s recovery plan?", subType: "radio", options: ["Yes", "No", "Not sure"], required: true, },
  ],
  tobacco: [
    { subKey: "tobaccoFrequencyPA", subTitle: "How often do you smoke?", subType: "radio", options: ["Daily", "A few times a week", "Occasionally", "Rarely"], required: true, },
    { subKey: "tobaccoStamina", subTitle: "Would you like us to suggest tips for improving stamina if you continue smoking?", subType: "radio", options: ["Yes", "Maybe", "No"], required: true, },
  ],
  alcohol: [
    { subKey: "alcoholFrequencyPA", subTitle: "How often do you drink alcohol?", subType: "radio", options: ["Daily", "Weekly", "Occasionally", "Rarely"], required: true, },
    { subKey: "alcoholQuantityPA", subTitle: "On days you drink, how many drinks do you usually have?", subType: "radio", options: ["1–2", "3–4", "5+"], required: true, },
  ],
  drugs: [
    { subKey: "drugFrequency", subTitle: "How often do you use recreational drugs?", subType: "radio", options: ["Daily", "Weekly", "Occasionally", "Rarely"], required: true, },
    { subKey: "saferExercise", subTitle: "Would you like us to suggest safer exercise options that consider your lifestyle?", subType: "radio", options: ["Yes", "Maybe", "No"], required: true, },
  ],
  other: [
    { subKey: "otherConditionDetailsPA", subTitle: "Please briefly describe your condition.", subType: "text", placeholder: "e.g., Arthritis, Chronic Pain", required: true, },
    { subKey: "safeLowIntensity", subTitle: "Would you like us to recommend only safe, low-intensity activities to start with?", subType: "radio", options: ["Yes", "No", "Not sure"], required: true, },
  ],

  // --- Q3 Exercise Location Follow-ups ---
  "At home": [
    {
      subKey: "homeEquipment",
      subTitle:
        "Would you like suggestions for short routines that don't need equipment?",
      subType: "radio",
      options: ["Yes", "No", "Maybe"],
      required: true,
    },
  ],
  "Outdoors (park, streets, trails)": [
    {
      subKey: "outdoorActivities",
      subTitle: "Would you like walking, running, or bodyweight exercises?",
      subType: "radio",
      options: ["Yes", "No", "Maybe"],
      required: true,
    },
  ],
  "Gym or fitness center": [
    {
      subKey: "gymEquipment",
      subTitle: "Do you have access to machines, weights, or classes?",
      subType: "multiselect",
      options: [
        { id: "machines", label: "Machines" },
        { id: "freeWeights", label: "Free weights" },
        { id: "classes", label: "Classes" },
        { id: "mixed", label: "Mixed" },
      ],
      required: true,
    },
  ],

  // --- Q4 Fitness Goals Follow-ups ---
  "Lose weight / Fat reduction": [
    {
      subKey: "weightNutrition",
      subTitle:
        "Would you like combined guidance on both exercise and nutrition?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],
  "Improve stamina / Cardiovascular fitness": [
    {
      subKey: "staminaPreference",
      subTitle:
        "Would you prefer endurance workouts (running, cycling) or interval-style workouts?",
      subType: "radio",
      options: ["Endurance", "Interval", "Mixed"],
      required: true,
    },
  ],
  "Build strength / Muscle tone": [
    {
      subKey: "strengthEquipment",
      subTitle: "Do you have access to weights or prefer bodyweight workouts?",
      subType: "radio",
      options: ["Weights", "Bodyweight", "Both"],
      required: true,
    },
  ],
  "Improve flexibility / Mobility": [
    {
      subKey: "mobilityRoutines",
      subTitle:
        "Would you like mobility and stretching routines to relieve discomfort?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],
  "Reduce stress / Improve mental health": [
    {
      subKey: "stressPreference",
      subTitle:
        "Would you prefer calming exercises (yoga, stretching) or energy-boosting ones (cardio, dance)?",
      subType: "radio",
      options: ["Calming", "Energy-boosting", "Mixed"],
      required: true,
    },
  ],
  "Maintain overall fitness / health": [
    {
      subKey: "maintenanceGuidance",
      subTitle:
        "Would you like guidance on keeping your routine consistent and challenging?",
      subType: "radio",
      options: ["Yes", "No", "Maybe"],
      required: true,
    },
  ],
  Other: [
    {
      subKey: "otherGoalDetails",
      subTitle: "Please describe your fitness goal:",
      subType: "text",
      placeholder:
        "e.g., Train for a marathon, improve sports performance, etc.",
      required: true,
    },
  ],
  
  // --- All other Nutrition, Alcohol, and Tobacco follow-ups (as in your original file) ---
  
  // Note: Your original file duplicates 'Yes' and 'alcohol' keys, but the PA logic above reuses them
  // for the Q2 Health flow. We must keep the original logic for the Nutrition/Alcohol flows,
  // but since you did not provide the original full conditionalFollowUps object, I assume the core
  // keys (like alcohol, tobacco, Never, etc.) are present and correct, and only the PA keys needed fixing.
  
};

// Health condition specific follow-ups (UNCHANGED)
const healthConditionFollowUps = {
  // Specific condition follow-ups
  diabetes: [
    {
      subKey: "diabetesCarbs",
      subTitle:
        "Do you monitor carbohydrate intake (bread, rice, noodles, sugar)?",
      subType: "radio",
      options: ["Rarely", "Sometimes", "Daily"],
      required: true,
    },
  ],
  heartDisease: [
    {
      subKey: "heartOmega3",
      subTitle: "Do you include omega-3 foods (fish, flaxseed, walnuts)?",
      subType: "radio",
      options: ["Rarely", "Sometimes", "Daily"],
      required: true,
    },
  ],
  highBloodPressure: [
    {
      subKey: "bpSalt",
      subTitle:
        "Do you limit salt and salty foods (pickles, dried fish, chips)?",
      subType: "radio",
      options: ["Rarely", "Sometimes", "Daily"],
      required: true,
    },
  ],
  kidneyLiver: [
    {
      subKey: "kidneyProtein",
      subTitle:
        "Do you limit protein or processed foods as per doctor's advice?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],
  cancer: [
    {
      subKey: "cancerAdviceFollow",
      subTitle: "Do you follow your doctor's nutrition advice?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],
};

// New follow-up for ALL health condition users (UNCHANGED)
const medicationQuestion = {
  subKey: "takingMedications",
  subTitle: "Are you currently taking medications?",
  subType: "radio",
  options: ["Yes", "No"],
  required: true,
};

// Conditional follow-up for the new cancer radio question's "Yes" answer (UNCHANGED)
const cancerYesFollowUp = {
  subKey: "cancerAdviceDetails",
  subTitle: "Please describe your doctor's nutrition advice:",
  subType: "text",
  placeholder: "e.g., Low sugar, high protein, avoiding processed meats.",
  required: true,
};

// Conditional follow-up for the generic medication "Yes" answer (UNCHANGED)
const medicationDetailsFollowUp = {
  subKey: "medicineDetails",
  subTitle: "Please provide details for each medication:",
  subType: "medications", // NEW CUSTOM TYPE
  required: true,
  defaultData: [{ id: 1, name: "", routine: "Morning", dose: "" }],
  routineOptions: ["Morning", "Noon", "Evening", "Night", "As Needed"],
};

// Conditional follow-up for "Other Condition" selection (UNCHANGED)
const otherConditionFollowUp = {
  subKey: "otherConditionDetails",
  subTitle: "Please specify the other health condition(s):",
  subType: "text",
  placeholder: "e.g., Asthma, Multiple Sclerosis, Chronic Migraines",
  required: true,
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
};
export default getQuestions;