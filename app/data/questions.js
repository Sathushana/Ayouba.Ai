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
      "🛡️ Stay healthy & prevent future diseases (Prevent diseases)"
    ],
    required: true,
  },
];

// Goal-specific questions
const goalSpecificQuestions = {
  // Physical Activity Questions - COMPLETELY UPDATED
  "Physical Activity": [
    // Q1: Baseline Activity Level
    {
      id: 6,
      type: "radio",
      title: "Physical Activity",
      description: "In a normal week, how active are you?",
      key: "activityLevel",
      options: [
        "Mostly sitting (little or no exercise)",
        "Light movement (walks, chores, light activity)",
        "Moderate activity (exercise 3-4 days/week, brisk walking, cycling, sports)",
        "Very active (exercise most days / vigorous workouts/sports)"
      ],
      required: true,
    },
    // Q2: Health & Safety Check
    {
      id: 7,
      type: "radio",
      title: "Health & Safety",
      description: "Do you have any medical conditions or injuries that affect your ability to exercise?",
      key: "hasMedicalConditions",
      options: ["Yes", "No"],
      required: true,
    },
    // Q3: Exercise Preferences & Environment
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
    // Q4: Activity Type Preference
    {
      id: 9,
      type: "multiselect",
      title: "Activity Preferences",
      description: "Which types of activities do you enjoy most or would like to try?",
      key: "activityPreferences",
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
      required: true,
    },
    // Q5: Time Availability
    {
      id: 10,
      type: "radio",
      title: "Time Availability",
      description: "How much time can you usually dedicate to exercise per day?",
      key: "timeAvailability",
      options: [
        "<10 minutes",
        "10-20 minutes",
        "20-40 minutes",
        "40+ minutes"
      ],
      required: true,
    },
    // Q6: Main Fitness Goal
    {
      id: 11,
      type: "radio",
      title: "Fitness Goals",
      description: "What is your primary goal for your physical activity or fitness?",
      key: "fitnessGoal",
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
    // Q7: Motivation & Readiness
    {
      id: 12,
      type: "radio",
      title: "Motivation & Readiness",
      description: "How ready are you to make changes and follow a physical activity plan?",
      key: "readinessLevel",
      options: [
        "Very ready → I'm ready to start now",
        "Somewhat ready → I can start small and gradually increase",
        "Not ready → I want to explore and prepare first"
      ],
      required: true,
    },
    // Q8: Motivation Style
    {
      id: 13,
      type: "multiselect",
      title: "Motivation Style",
      description: "What motivates you most to stay consistent?",
      key: "motivationStyle",
      options: [
        { id: "tracking", label: "Tracking progress / Metrics / Stats" },
        { id: "social", label: "Social support / Friends or community" },
        { id: "rewards", label: "Rewards / Gamification / Badges" },
        { id: "visual", label: "Visual feedback / Charts / App reminders" }
      ],
      required: true,
    },
  ],

  // Nutrition Questions (UNCHANGED)
  "Nutrition": [
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
        "I eat whatever I feel like, no specific pattern (No specific diet)"
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
        { id: "otherCondition", label: "Other" }
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
        { id: "drugs", label: "Drugs (recreational / non-prescribed)" }
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
        "I follow intermittent fasting or skip meals"
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
      options: [
        "Less than 1 liter",
        "1-2 liters",
        "More than 2 liters"
      ],
      required: true,
    },
    // Q6: Fruits & Vegetables
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
    // Q7: Nutrition Focus
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
        { id: "gutHealth", label: "Improve digestion and gut health" }
      ],
      required: true,
    },
  ],

  // Tobacco Questions (UNCHANGED)
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

  // Alcohol Questions (UNCHANGED)
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
        "Occasionally (1-3 times per month)",
        "Weekly (1-3 times per week)",
        "Regular / Heavy use (4+ times per week or binge drinking)",
      ],
      required: true,
    },
  ],

  // Sleep Questions (UNCHANGED)
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
  
  // Mental Health Questions (UNCHANGED)
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
  
  // Prevent diseases Questions (UNCHANGED)
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
  // --- Physical Activity Follow-ups (COMPLETELY UPDATED) ---
  "Mostly sitting (little or no exercise)": [
    {
      subKey: "barriers",
      subTitle: "What usually makes it hard for you to be more active?",
      subType: "multiselect",
      options: [
        { id: "lackTime", label: "Lack of time" },
        { id: "lackMotivation", label: "Lack of motivation" },
        { id: "physicalLimitations", label: "Physical limitations / health issues" },
        { id: "dontKnow", label: "Don't know what to do" },
        { id: "nothing", label: "Nothing" }
      ],
      required: false,
    },
  ],
  "Light movement (walks, chores, light activity)": [
    {
      subKey: "frequencyDuration",
      subTitle: "How many days per week do you exercise?",
      subType: "radio",
      options: ["0-1", "2-3", "4-5", "6-7"],
      required: true,
    },
    {
      subKey: "sessionDuration",
      subTitle: "On days you exercise, how long do you usually spend being active?",
      subType: "radio",
      options: ["<15 min", "15-30 min", "30-60 min", "60+ min"],
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
        { id: "physicalLimitations", label: "Physical limitations / health issues" },
        { id: "dontKnow", label: "Don't know what to do" },
        { id: "nothing", label: "Nothing" }
      ],
      required: false,
    },
  ],
  "Moderate activity (exercise 3-4 days/week, brisk walking, cycling, sports)": [
    {
      subKey: "frequencyDuration",
      subTitle: "How many days per week do you exercise?",
      subType: "radio",
      options: ["0-1", "2-3", "4-5", "6-7"],
      required: true,
    },
    {
      subKey: "sessionDuration",
      subTitle: "On days you exercise, how long do you usually spend being active?",
      subType: "radio",
      options: ["<15 min", "15-30 min", "30-60 min", "60+ min"],
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
      subTitle: "Do you feel your current routine gives you the results you want?",
      subType: "radio",
      options: ["Yes, I'm happy", "No, I feel stuck / not improving", "Not sure"],
      required: true,
    },
  ],
  "Very active (exercise most days / vigorous workouts/sports)": [
    {
      subKey: "frequencyDuration",
      subTitle: "How many days per week do you exercise?",
      subType: "radio",
      options: ["0-1", "2-3", "4-5", "6-7"],
      required: true,
    },
    {
      subKey: "sessionDuration",
      subTitle: "On days you exercise, how long do you usually spend being active?",
      subType: "radio",
      options: ["<15 min", "15-30 min", "30-60 min", "60+ min"],
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
      subTitle: "Do you feel your current routine gives you the results you want?",
      subType: "radio",
      options: ["Yes, I'm happy", "No, I feel stuck / not improving", "Not sure"],
      required: true,
    },
  ],

  // --- Medical Conditions Follow-ups ---
  "Yes": [
    {
      subKey: "medicalConditions",
      subTitle: "Please select any conditions or injuries you have that may affect your exercise.",
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
        { id: "other", label: "Other / Not listed" }
      ],
      required: true,
    },
  ],

  // --- Exercise Location Follow-ups ---
  "At home": [
    {
      subKey: "homeEquipment",
      subTitle: "Would you like suggestions for short routines that don't need equipment?",
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
        { id: "mixed", label: "Mixed" }
      ],
      required: true,
    },
  ],

  // --- Fitness Goals Follow-ups ---
  "Lose weight / Fat reduction": [
    {
      subKey: "weightNutrition",
      subTitle: "Would you like combined guidance on both exercise and nutrition?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],
  "Improve stamina / Cardiovascular fitness": [
    {
      subKey: "staminaPreference",
      subTitle: "Would you prefer endurance workouts (running, cycling) or interval-style workouts?",
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
      subTitle: "Would you like mobility and stretching routines to relieve discomfort?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],
  "Reduce stress / Improve mental health": [
    {
      subKey: "stressPreference",
      subTitle: "Would you prefer calming exercises (yoga, stretching) or energy-boosting ones (cardio, dance)?",
      subType: "radio",
      options: ["Calming", "Energy-boosting", "Mixed"],
      required: true,
    },
  ],
  "Maintain overall fitness / health": [
    {
      subKey: "maintenanceGuidance",
      subTitle: "Would you like guidance on keeping your routine consistent and challenging?",
      subType: "radio",
      options: ["Yes", "No", "Maybe"],
      required: true,
    },
  ],
  "Other": [
    {
      subKey: "otherGoalDetails",
      subTitle: "Please describe your fitness goal:",
      subType: "text",
      placeholder: "e.g., Train for a marathon, improve sports performance, etc.",
      required: true,
    },
  ],

  // --- Barrier-specific Follow-ups ---
  "lackTime": [
    {
      subKey: "shortWorkouts",
      subTitle: "Would short 5-10 min workouts at home be easier for you to try?",
      subType: "radio",
      options: ["Yes", "No", "Maybe"],
      required: true,
    },
  ],
  "lackMotivation": [
    {
      subKey: "motivationSupport",
      subTitle: "Would you like us to set small daily challenges or reminders to help you stay consistent?",
      subType: "radio",
      options: ["Yes", "No", "Maybe"],
      required: true,
    },
  ],
  "physicalLimitations": [
    {
      subKey: "lowImpactPlan",
      subTitle: "Would you like a safe low-impact plan (walking, stretching, mobility)?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],
  "dontKnow": [
    {
      subKey: "beginnerRoutines",
      subTitle: "Would you like us to suggest simple beginner routines you can follow?",
      subType: "radio",
      options: ["Yes", "No", "Maybe"],
      required: true,
    },
  ],

  // --- Satisfaction Follow-ups ---
  "Yes, I'm happy": [
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
      subTitle: "Would you like to focus more on strength, stamina, or flexibility?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],
  "Not sure": [
    {
      subKey: "varietySuggestions",
      subTitle: "Would you like us to suggest a variety to keep it interesting?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],

  // --- Maintenance Direction Follow-ups ---
  "Maintain": [
    {
      subKey: "advancedGuidance",
      subTitle: "Would you like advanced guidance on recovery, stretching, or nutrition?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "Push further": [
    {
      subKey: "structuredTraining",
      subTitle: "Would you like structured training (advanced strength, endurance, or sports-specific programs)?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],

  // --- Diet Type Follow-ups (UNCHANGED) ---
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

  // --- Substance Use Follow-ups (UNCHANGED) ---
  "alcohol": [
    {
      subKey: "alcoholFrequency",
      subTitle: "How often do you drink alcohol?",
      subType: "radio",
      options: [
        "Rarely (special occasions)",
        "Sometimes (1-2 times a week)",
        "Frequently (3-5 times a week)",
        "Daily"
      ],
      required: true,
    },
    {
      subKey: "alcoholQuantity",
      subTitle: "On days you drink, how many drinks do you usually have?",
      subType: "radio",
      options: ["1-2", "3-4", "5 or more"],
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
        "Sometimes (1-5 cigarettes per day)",
        "Frequently (6-10 cigarettes per day)",
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

  // --- Tobacco Use Follow-ups (UNCHANGED) ---
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
      subKey: "quittingHelp",
      subTitle: "What helped you the most in quitting tobacco?",
      subType: "radio",
      options: ["Willpower", "Family support", "Medical advice", "Other"],
      required: true,
    },
    {
      subKey: "avoidRelapseTobacco",
      subTitle: "Would you like tips to avoid relapse in the future?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "Occasionally (less than daily)": [
    {
      subKey: "tobaccoSituations",
      subTitle: "In what situations do you usually use tobacco?",
      subType: "multiselect",
      options: [
        { id: "social", label: "Social gatherings" },
        { id: "stress", label: "Stress" },
        { id: "meals", label: "After meals" },
        { id: "other", label: "Other" },
      ],
      required: false,
    },
    {
      subKey: "cutDownTobacco",
      subTitle: "Would you like suggestions to cut down or quit completely?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "Daily / Regular use": [
    {
      subKey: "quittingChallenge",
      subTitle: "What do you feel is the biggest challenge in quitting tobacco?",
      subType: "radio",
      options: ["Cravings", "Stress relief", "Social circle", "Don't feel ready"],
      required: true,
    },
    {
      subKey: "quitPlanTobacco",
      subTitle: "Would you like us to guide you with a personalized quit plan or professional resources?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],

  // --- Alcohol Use Follow-ups (UNCHANGED) ---
  "Never": [
    {
      subKey: "pressureToDrink",
      subTitle: "Have you ever felt pressured by friends, family, or work culture to drink?",
      subType: "radio",
      options: ["Yes", "Sometimes", "Rarely", "No"],
      required: true,
    },
    {
      subKey: "stayAlcoholFree",
      subTitle: "Would you like strategies on how to confidently stay alcohol-free in social settings?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "Used in the past, but quit": [
    {
      subKey: "motivationToQuitAlcohol",
      subTitle: "What motivated you the most to stop drinking?",
      subType: "radio",
      options: ["Health reasons", "Family", "Financial", "Other"],
      required: true,
    },
    {
      subKey: "avoidRelapseAlcohol",
      subTitle: "Would you like reminders and tips to stay alcohol-free long term?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "Occasionally (1-3 times per month)": [
    {
      subKey: "alcoholSituations",
      subTitle: "In what situations do you usually drink?",
      subType: "multiselect",
      options: [
        { id: "social", label: "Social gatherings" },
        { id: "stress", label: "Stress relief" },
        { id: "celebrations", label: "Celebrations" },
        { id: "other", label: "Other" },
      ],
      required: false,
    },
    {
      subKey: "healthierAlternatives",
      subTitle: "Would you like to learn about healthier alternatives for those situations?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "Weekly (1-3 times per week)": [
    {
      subKey: "drinkingImpact",
      subTitle: "Do you ever feel your drinking affects your sleep, work, or relationships?",
      subType: "radio",
      options: ["Yes", "Sometimes", "Rarely", "No"],
      required: true,
    },
    {
      subKey: "reduceDrinking",
      subTitle: "Would you like practical tips to reduce how much or how often you drink?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "Regular / Heavy use (4+ times per week or binge drinking)": [
    {
      subKey: "drinkingChallenge",
      subTitle: "What do you feel makes it hardest to cut down or stop drinking?",
      subType: "radio",
      options: ["Stress", "Cravings", "Social circle", "Don't feel ready"],
      required: true,
    },
    {
      subKey: "quitPlanAlcohol",
      subTitle: "Would you like help with a personalized quit plan or professional resources?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
};

// Health condition specific follow-ups (UNCHANGED)
const healthConditionFollowUps = {
  // Generic medical follow-up triggered if ANY condition is selected (added via logic in Questionnaire.js)
  // Specific condition follow-ups
  "diabetes": [
    {
      subKey: "diabetesCarbs",
      subTitle: "Do you monitor carbohydrate intake (bread, rice, noodles, sugar)?",
      subType: "radio",
      options: ["Rarely", "Sometimes", "Daily"],
      required: true,
    },
  ],
  "heartDisease": [
    {
      subKey: "heartOmega3",
      subTitle: "Do you include omega-3 foods (fish, flaxseed, walnuts)?",
      subType: "radio",
      options: ["Rarely", "Sometimes", "Daily"],
      required: true,
    },
  ],
  "highBloodPressure": [
    {
      subKey: "bpSalt",
      subTitle: "Do you limit salt and salty foods (pickles, dried fish, chips)?",
      subType: "radio",
      options: ["Rarely", "Sometimes", "Daily"],
      required: true,
    },
  ],
  "kidneyLiver": [
    {
      subKey: "kidneyProtein",
      subTitle: "Do you limit protein or processed foods as per doctor's advice?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],
  "cancer": [
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
    defaultData: [{ id: 1, name: '', routine: 'Morning', dose: '' }],
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
  otherConditionFollowUp 
};
export default getQuestions;