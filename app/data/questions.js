// Base questions that everyone answers
const baseQuestions = [
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
  // Step 3: Height and Weight (BMI)
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
  // Step 4: Primary Health Goal
  {
    id: 4,
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
      id: 5,
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
    // Step 5: Fruits and Vegetables Intake
    {
      id: 5,
      type: "radio",
      title: "Fruits and Vegetables Intake",
      description: "We all eat differently. How many servings of fruits and vegetables do you usually have in a day?",
      key: "fruitVegIntake",
      options: [
        "0 (Low intake)",
        "1–2 (Low-moderate intake)",
        "3–4 (Moderate intake)",
        "5+ (High intake)",
      ],
      required: true,
    },
    // Step 6: Nutrition (Sugary Foods, Branching)
    {
      id: 6,
      type: "radio",
      title: "Nutrition Habits: Processed Foods",
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
    // Step 7: Meal Regularity (Branching)
    {
      id: 7,
      type: "radio",
      title: "Nutrition Habits: Meal Regularity",
      description: "How regularly do you eat your meals each day?",
      key: "mealRegularity",
      options: [
        "Skipped often",
        "Mostly regular",
        "Very regular",
      ],
      required: true,
    },
    // Step 8: Protein Intake
    {
      id: 8,
      type: "radio",
      title: "Nutrition Habits: Protein",
      description: "Do you regularly include protein-rich foods like eggs, fish, lentils, or meat?",
      key: "proteinIntake",
      options: [
        "Yes",
        "Sometimes",
        "Rarely",
        "No",
      ],
      required: true,
    },
    // Step 9: Water Intake
    {
      id: 9,
      type: "radio",
      title: "Nutrition Habits: Water Intake",
      description: "How many glasses of water do you drink on a typical day?",
      key: "waterIntake",
      options: [
        "<4",
        "4–6",
        "6–8",
        "8+",
      ],
      required: true,
    },
  ],

  // Tobacco Questions
  "Tobacco": [
    {
      id: 5,
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
      id: 5,
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

  // Sleep Questions (placeholder - you can add specific sleep questions later)
  "Sleep": [
    {
      id: 5,
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
const getQuestions = (primaryGoal = null) => {
  if (!primaryGoal) {
    return baseQuestions;
  }
  
  const goalQuestions = goalSpecificQuestions[primaryGoal] || [];
  
  // Reassign IDs to maintain sequence
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
export const conditionalFollowUps = {
  // --- Fruits & Vegetables Intake Follow-ups ---
  "0 (Low intake)": [
    {
      subKey: "fruitVegBarrier",
      subTitle: "What usually makes it hard to eat more fruits and vegetables?",
      subType: "multiselect",
      options: [
        { id: "tooExpensive", label: "Too expensive" },
        { id: "hardToFind", label: "Hard to find" },
        { id: "dontLikeTaste", label: "Don't like the taste" },
        { id: "noTime", label: "Don't have time" },
      ],
      required: false,
    },
    {
      subKey: "fruitVegSuggestions",
      subTitle: "Would you like us to suggest easy ways to include more fruits and vegetables in your meals?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "1–2 (Low-moderate intake)": [
    {
      subKey: "fruitVegBarrier",
      subTitle: "What usually makes it hard to eat more fruits and vegetables?",
      subType: "multiselect",
      options: [
        { id: "tooExpensive", label: "Too expensive" },
        { id: "hardToFind", label: "Hard to find" },
        { id: "dontLikeTaste", label: "Don't like the taste" },
        { id: "noTime", label: "Don't have time" },
      ],
      required: false,
    },
    {
      subKey: "fruitVegSuggestions",
      subTitle: "Would you like us to suggest easy ways to include more fruits and vegetables in your meals?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "3–4 (Moderate intake)": [
    {
      subKey: "foodPreferences",
      subTitle: "Which type of foods would you like to include more in your diet?",
      subType: "multiselect",
      options: [
        { id: "fruits", label: "Fruits" },
        { id: "vegetables", label: "Vegetables" },
        { id: "protein", label: "Protein-rich foods" },
        { id: "wholeGrains", label: "Whole grains" },
      ],
      required: false,
    },
    {
      subKey: "mealSwapSuggestions",
      subTitle: "Would you like personalized meal swap suggestions or portion tips?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "5+ (High intake)": [
    {
      subKey: "advancedNutritionTips",
      subTitle: "Would you like new recipes or advanced tips to optimize nutrition?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
    {
      subKey: "trackNutrition",
      subTitle: "Are you interested in tracking your nutrient intake or hydration more closely?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
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

  // --- Nutrition (Sugary Foods) Follow-ups ---
  "Daily": [
    {
      subKey: "sugarBarrier",
      subTitle: "What usually makes it hard to reduce sugary drinks or processed foods?",
      subType: "multiselect",
      options: [
        { id: "cravings", label: "Cravings" },
        { id: "busySchedule", label: "Busy schedule" },
        { id: "social", label: "Social occasions" },
        { id: "dontKnow", label: "Don't know alternatives" },
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

  // --- Nutrition (Meal Regularity) Follow-ups ---
  "Skipped often": [
    {
      subKey: "skipBarrier",
      subTitle: "What usually causes you to skip meals?",
      subType: "multiselect",
      options: [
        { id: "busySchedule", label: "Busy schedule" },
        { id: "forget", label: "Forget to eat" },
        { id: "lackAppetite", label: "Lack of appetite" },
        { id: "irregular", label: "Irregular lifestyle" },
      ],
      required: false,
    },
    {
      subKey: "mealPrepTips",
      subTitle: "Would you like tips for quick, healthy snacks or easy meal prep?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "Mostly regular": [
    {
      subKey: "struggleMeal",
      subTitle: "Which meal do you struggle with most to keep regular?",
      subType: "radio",
      options: ["Breakfast", "Lunch", "Dinner", "Snacks"],
      required: true,
    },
    {
      subKey: "improveRegularity",
      subTitle: "Would you like suggestions to improve the regularity of that meal?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  "Very regular": [
    {
      subKey: "optimizeTiming",
      subTitle: "Would you like advanced tips for optimizing meal timing, such as for energy or weight management?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
    {
      subKey: "portionMindful",
      subTitle: "Are you interested in learning about portion timing or mindful eating practices?",
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

export { baseQuestions, goalSpecificQuestions, getQuestions };
export default getQuestions;