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
    title: "Primary Health Goal",
    description: "Select your primary health goal (choose one):",
    key: "primaryGoal",
    options: [
      "Physical Activity",
      "Nutrition",
      "Tobacco",
      "Alcohol",
      "Sleep"
    ],
    required: true,
  },
];

// Goal-specific questions
const goalSpecificQuestions = {
  // Physical Activity Questions
  "Physical Activity": [
    {
      id: 6,
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
  ],

  // Nutrition Questions
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
        "1–2 liters",
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
    // Q7: Nutrition Focus (UPDATED TO MULTISELECT)
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
    // Q8: Main Nutrition Goal (UPDATED TO MULTISELECT)
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
};

// Function to get all questions based on primary goal
const getQuestions = (primaryGoal = null, currentAnswers = {}) => {
  if (!primaryGoal) {
    return baseQuestions;
  }
  
  const goalQuestions = goalSpecificQuestions[primaryGoal] || [];
  
  // For Nutrition goal, no need for conditional filtering since medication questions are removed
  if (primaryGoal === "Nutrition") {
    const allQuestions = [...baseQuestions];
    goalQuestions.forEach((question, index) => {
      allQuestions.push({
        ...question,
        id: baseQuestions.length + index + 1
      });
    });
    
    return allQuestions;
  }
  
  // For other goals
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

  // --- Physical Activity Follow-ups ---
  "Mostly sedentary": [
    {
      subKey: "barrier",
      subTitle: "What usually prevents you from being more active?",
      subType: "multiselect",
      options: [
        { id: "lackTime", label: "Lack of time" },
        { id: "lackMotivation", label: "Lack of motivation" },
        { id: "physicalLimitations", label: "Physical limitations / Injuries" },
        { id: "dontKnow", label: "Don't know what to do" },
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

  // --- Alcohol Use Follow-ups ---
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
  "Occasionally (1–3 times per month)": [
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
  "Weekly (1–3 times per week)": [
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

// Health condition specific follow-ups
const healthConditionFollowUps = {
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
      subKey: "cancerAdvice",
      subTitle: "Do you follow your doctor's nutrition advice?",
      subType: "text",
      placeholder: "Please describe your doctor's nutrition advice",
      required: false,
    },
  ],
};

export { baseQuestions, goalSpecificQuestions, getQuestions, healthConditionFollowUps, conditionalFollowUps };
export default getQuestions;