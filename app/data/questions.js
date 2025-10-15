// data/questions.js

//BASE QUESTIONS 
const baseQuestions = [
  // 1. Preferred First Name
  {
    id: 1,
    type: "text",
    title: "1. What is your preferred first name?",
    key: "firstName",
    placeholder: "Enter your preferred first name",
    required: true,
  },
  // 2. Age
  {
    id: 2,
    type: "number",
    title: "2. Age",
    description: "Your age helps us give you the right health advice for your stage of life. It also helps us identify health risks early and create a plan that suits your needs safely and effectively.",
    key: "age",
    placeholder: "Enter age in years (e.g., 35)",
    required: true,
  },
  // 3. Sex 
  {
    id: 3,
    type: "radio",
    title: "3. Sex",
    description: "Men and women have different health risks and reference ranges for lab values. This helps us give you personalized advice.",
    key: "sex",
    options: ["Male", "Female"],
    required: true,
  },
  // 4. Height and Weight
  {
    id: 4,
    type: "measurements",
    title: "4. Height and Weight",
    description: "This helps us calculate your Body Mass Index (BMI), which is an important measure of your overall health. It helps identify if your weight is in a healthy range and detect possible health risks early.",
    key: "measurements",
    inputs: [
      { key: "unitSystem", type: "radio", options: ["Metric (cm, kg)", "Imperial (ft/in, lbs)"], required: true },
    ],
    required: true,
  },
  //  Current Lifestyle
  {
    id: 5,
    type: "radio",
    title: "Which of these best describes your current lifestyle?",
    key: "lifestyle",
    options: [
      "Student / Studying",
      "Employed – Office-based (mostly sitting)",
      "Employed – Active work (standing, moving around)",
      "Employed – Shift work / irregular hours",
      "Self-employed / Business owner",
      "Homemaker / Caregiver",
      "Retired",
      "Other",
    ],
    required: true,
  },
  // 5. Diagnosed Conditions 
  {
    id: 6,
    type: "multiselect",
    title: "5. Are you diagnosed with any of the following conditions?",
    description: "Knowing your medical conditions helps us provide you with safe, personalised advice and create a plan tailored to your health needs.",
    key: "diagnosedConditions",
    options: [
      { id: "heartDisease", label: "Heart disease" },
      { id: "stroke", label: "Stroke" },
      { id: "diabetes", label: "Diabetes / Blood sugar issues" },
      { id: "jointMobility", label: "Joint or mobility issues (knees, hips, back)" },
      { id: "respiratory", label: "Respiratory issues (asthma, COPD)" },
      { id: "recentSurgery", label: "Recent surgery or injury" },
      { id: "anemia", label: "Anemia" },
      { id: "osteoarthritis", label: "Osteoarthritis" },
      { id: "cancer", label: "Cancer" },
      { id: "mentalHealthDisorders", label: "Mental Health Disorders (e.g., depression, anxiety)" },
      { id: "obesity", label: "Obesity" },
      { id: "ckd", label: "Chronic Kidney Disease (CKD)" },
      { id: "cld", label: "Chronic Liver Disease" },
      { id: "thyroid", label: "Thyroid Disorders" },
      { id: "pcos", label: "Polycystic Ovary Syndrome (PCOS)" },
      { id: "other", label: "Other" },
      { id: "none", label: "None" },
    ],
    required: true,
  },
  // 6. Pick Your Goals 
  {
    id: 7,
    type: "multiselect",
    title: "6. Pick your goals (you can choose more than one)",
    description: "Your health journey starts with a few small steps. Select what you want to work on — we'll make a plan that suits you best.",
    key: "primaryGoals",
    options: [
      { id: "nutrition", label: "🥗 Eat healthy & get enough nutrition" },
      { id: "activity", label: "🏃 Be more active & do regular exercise" },
      { id: "weight", label: "⚖️ Lose weight & stay in good shape" },
      { id: "substance", label: "🚭🍺 Cut down or quit smoking, alcohol, or drugs" },
      { id: "mental", label: "🧘 Feel calmer & reduce stress" },
      { id: "sleep", label: "😴 Sleep better & wake up fresh" },
    ],
    required: true,
  },
];

//2. GOAL-SPECIFIC QUESTIONS
const goalSpecificQuestions = {
  // Goal: 🥗 Eat healthy & get enough nutrition
  nutrition: [
    // Diet Type 
    {
      id: 101,
      type: "radio",
      title: "What type of diet do you usually follow?",
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
    //  Do you use any of the following? 
    {
      id: 102,
      type: "multiselect",
      title: " Do you use any of the following?",
      key: "substanceUseNutrition",
      options: [
        { id: "alcohol", label: "Alcohol" },
        { id: "tobacco", label: "Cigarettes / Tobacco" },
        { id: "drugs", label: "Drugs (recreational / non-prescribed)" },
        { id: "none", label: "None" },
      ],
      required: false,
    },
    //  Meal Patterns
    {
      id: 103,
      type: "radio",
      title: " How do you usually eat your meals?",
      key: "mealEatingHabits",
      options: [
        "I eat regular meals every day",
        "I often skip breakfast",
        "I snack a lot between meals",
        "I follow intermittent fasting or skip meals",
      ],
      required: true,
    },
    //  Eating Out
    {
      id: 104,
      type: "radio",
      title: " How often do you eat out (restaurants, takeaways, bakery, etc.)?",
      key: "eatingOutFrequency",
      options: [
        "Rarely",
        "1–2 times a week",
        "3–4 times a week",
        "Almost every day",
      ],
      required: true,
    },
    //  Sugary Drinks/Snacks
    {
      id: 105,
      type: "radio",
      title: " How often do you consume sugary drinks or snacks (soft drinks, sweets, cakes)?",
      key: "sugarySnackFrequency",
      options: [
        "Rarely",
        "Occasionally (1–2 times per week)",
        "Frequently (daily or more than once a day)",
      ],
      required: true,
    },
    //  Track What You Eat
    {
      id: 106,
      type: "radio",
      title: " Do you track what you eat (calories, portions, food diary, app)?",
      key: "foodTracking",
      options: ["Yes, regularly", "Sometimes", "No"],
      required: true,
    },
    //  Water Intake
    {
      id: 107,
      type: "radio",
      title: " How much water do you drink daily?",
      key: "waterIntakeNutrition",
      options: ["Less than 1 liter", "1–2 liters", "More than 2 liters"],
      required: true,
    },
    //  Fruits, Veg, Whole Grains
    {
      id: 108,
      type: "radio",
      title: " How often do you eat fruits, vegetables, or whole grains?",
      key: "healthyFoodFrequency",
      options: ["Rarely", "Sometimes", "Every day"],
      required: true,
    },
    //  Main Nutrition Focus
    {
      id: 109,
      type: "multiselect",
      title: " Which of these best describes your main nutrition focus?",
      key: "mainNutritionFocus",
      options: [
        { id: "plantBased", label: "I follow a plant-based diet" },
        { id: "improveHeart", label: "I want to improve heart health" },
        { id: "manageDiabetes", label: "I want to manage or prevent diabetes" },
        { id: "kidneyLiver", label: "I have kidney or liver problems" },
        { id: "other", label: "Other" },
      ],
      required: true,
    },
    // Main Nutrition Goal
    {
      id: 110,
      type: "multiselect",
      title: "What's your main nutrition goal?",
      description: "Pick one or more.",
      key: "nutritionGoals",
      options: [
        { id: "boostNutrients", label: "🩸 Boost Essential Nutrients" },
        { id: "balancedDiet", label: "🥗 Eat a Diverse, Balanced Diet" },
        { id: "healthyWeight", label: "⚖️ Maintain Healthy Weight & Body Composition" },
        { id: "limitUnhealthy", label: "🍬 Limit Sugary, Salty, & Processed Foods" },
        { id: "improveGut", label: "🌿 Improve Gut & Digestive Health" },
        { id: "mindfulEating", label: "💡 Mindful & Sustainable Eating" },
        { id: "buildEnergy", label: "💪 Build Energy & Strength" },
        { id: "preventDiseases", label: "🛡️ Prevent Future Diseases" },
        { id: "other", label: "✏️ Other" },
      ],
      required: true,
    },
  ],

  // Goal: 🏃 Be more active & do regular exercise
  activity: [
    // Baseline Activity
    {
      id: 201,
      type: "radio",
      title: "In a normal week, how active are you?",
      key: "activityLevel",
      options: [
        "Mostly sitting (little or no exercise)",
        "Light movement (walks, chores, light activity)",
        "Moderate activity (exercise 3–4 days/week, brisk walking, cycling, sports)",
        "Very active (exercise most days / vigorous workouts/sports)",
      ],
      required: true,
    },
    // Frequency & Duration 
    {
      id: 202,
      type: "radio",
      title: "2. Frequency & Duration : How many days per week do you exercise?",
      key: "exerciseDays",
      options: ["0–1", "2–3", "4–5", "6–7"],
      required: true,
      showCondition: (answers) => {
        const activityLevel = answers.activityLevel;
        return activityLevel && activityLevel !== "Mostly sitting (little or no exercise)";
      }
    },
    //  Weekly Minutes of Activity
    {
      id: 203,
      type: "radio",
      title: "Step  Weekly Minutes of Activity (Q2)",
      description: "In a typical week, how much time do you spend doing moderate or vigorous physical activity?",
      key: "weeklyActivityMinutes",
      options: [
        "Less than 30 minutes (< 0.5 hours)",
        "30–149 minutes (0.5–2.5 hours)",
        "150–300 minutes (2.5–5 hours)",
        "More than 300 minutes (5+ hours)",
      ],
      required: true,
      showCondition: (answers) => {
        const activityLevel = answers.activityLevel;
        return activityLevel && activityLevel !== "Mostly sitting (little or no exercise)";
      }
    },
    //  Type of Physical Activity
    {
      id: 204,
      type: "multiselect",
      title: "Step  Type of Physical Activity (Q3)",
      description: "Which of these best describes your usual physical activities? (choose all that apply)",
      key: "usualActivityTypes",
      options: [
        { id: "light", label: "Light (e.g., walking slowly, light household work, playing cards)" },
        { id: "moderate", label: "Moderate (e.g., brisk walking, cycling at light effort, cleaning)" },
        { id: "vigorous", label: "Vigorous (e.g., jogging, competitive sports, running)" },
      ],
      required: true,
      showCondition: (answers) => {
        const activityLevel = answers.activityLevel;
        return activityLevel && activityLevel !== "Mostly sitting (little or no exercise)";
      }
    },
    //  Challenge Level 
    {
      id: 205,
      type: "radio",
      title: "How challenging do you feel your exercise is?",
      key: "exerciseChallenge",
      options: ["Very easy", "Moderate", "Hard", "Very hard"],
      required: true,
      showCondition: (answers) => {
        const activityLevel = answers.activityLevel;
        return activityLevel && activityLevel !== "Mostly sitting (little or no exercise)";
      }
    },
    // Q Preferences & Environment - Location
    {
      id: 206,
      type: "radio",
      title: "Step  Exercise Location",
      description: "Where do you usually prefer to exercise or would like to exercise?",
      key: "exerciseLocation",
      options: [
        "At home",
        "Outdoors (park, streets, trails)",
        "Gym or fitness center",
        "Mixed / Any location",
      ],
      required: true,
    },
    // Q Preferences & Environment - Activity Type Preference
    {
      id: 207,
      type: "multiselect",
      title: "Step  Activity Type Preference",
      description: "Which types of activities do you enjoy most or would like to try? (multi-select)",
      key: "activityTypePreference",
      options: [
        { id: "walking", label: "Walking / Hiking" },
        { id: "running", label: "Running / Jogging" },
        { id: "cycling", label: "Cycling" },
        { id: "strength", label: "Strength / Resistance Training" },
        { id: "yoga", label: "Yoga / Pilates / Stretching" },
        { id: "dance", label: "Dance / Aerobics" },
        { id: "sports", label: "Sports (Football, Basketball, Tennis, etc.)" },
        { id: "otherNotSure", label: "Other / Not sure" },
      ],
      required: true,
    },
    // Q Preferences & Environment - Time Availability
    {
      id: 208,
      type: "radio",
      title: "Step  Time Availability",
      description: "How much time can you usually dedicate to exercise per day?",
      key: "timeAvailability",
      options: ["<10 minutes", "10–20 minutes", "20–40 minutes", "40+ minutes"],
      required: true,
    },
    // Fitness & Health Goals
    {
      id: 209,
      type: "multiselect",
      title: "Fitness & Health Goals: What do you want to achieve with your workouts?",
      key: "fitnessHealthGoals",
      options: [
        { id: "loseWeight", label: "🏋️ Lose weight / Tone up" },
        { id: "boostStamina", label: "🏃 Boost stamina / Cardio fitness" },
        { id: "buildStrength", label: "💪 Build strength / Muscles" },
        { id: "getFlexible", label: "🤸 Get flexible / Move better / Reduce aches" },
        { id: "lowerStress", label: "🧘 Lower stress / Feel mentally better" },
        { id: "stayFit", label: "🛡️ Stay fit & healthy overall" },
        { id: "fitBusy", label: "⏱️ Fit workouts into a busy schedule" },
        { id: "stayActiveHome", label: "🏠 Stay active while working from home" },
        { id: "other", label: "✏️ Other" },
      ],
      required: true,
    },
  ],

  // Goal: ⚖️ Lose weight & stay in good shape
  weight: [
    // Step  Baseline & Life Situation 
    {
      id: 301,
      type: "placeholder",
      title: "Life Situation Details",
      description: "Based on your 'Current Lifestyle' answer, please provide more details.",
      key: "wl_lifeSituation",
      required: true,
    },
    //  Sleep Hours
    {
      id: 302,
      type: "radio",
      title: " How many hours do you sleep at night?",
      key: "wl_sleepHours",
      options: ["Less than 5 hours", "5–6 hours", "7–8 hours", "More than 8 hours"],
      required: true,
    },
    // Step  Current Physical Activity Level
    {
      id: 303,
      type: "radio",
      title: "Step  In a normal week, how active are you?",
      key: "wl_activityLevel",
      options: [
        "Mostly sitting (little or no exercise)",
        "Light movement (walks, chores, light activity)",
        "Moderate activity (exercise 3–4 days/week, brisk walking, cycling, sports)",
        "Very active (exercise most days / vigorous workouts/sports)",
      ],
      required: true,
    },
    // Step  Eating Habits (Weight-Related)
    {
      id: 304,
      type: "radio",
      title: "What type of diet do you usually follow?",
      key: "wl_dietType",
      options: [
        "Mostly vegetables and no meat (Vegetarian)",
        "Only plant-based foods, no meat, eggs, or dairy (Vegan)",
        "Mostly meat, eggs, and low in bread/rice/potatoes (Keto / Low-carb)",
        "A mix of vegetables, fruits, grains, and some meat or fish (Balanced / Mediterranean)",
        "I eat whatever I feel like, no specific pattern (No specific diet)",
      ],
      required: true,
    },
    //  Do you use any of the following? 
    {
      id: 305,
      type: "multiselect",
      title: " Do you use any of the following?",
      key: "wl_substanceUse",
      options: [
        { id: "alcohol", label: "Alcohol" },
        { id: "tobacco", label: "Cigarettes / Tobacco" },
        { id: "drugs", label: "Drugs (recreational / non-prescribed)" },
        { id: "none", label: "None" },
      ],
      required: false,
    },
    //  Meal Patterns
    {
      id: 306,
      type: "radio",
      title: " How do you usually eat your meals?",
      key: "wl_mealEatingHabits",
      options: [
        "I eat regular meals every day",
        "I often skip breakfast",
        "I snack a lot between meals",
        "I follow intermittent fasting or skip meals",
      ],
      required: true,
    },
    //  Eating Out
    {
      id: 307,
      type: "radio",
      title: " How often do you eat out (restaurants, takeaways, bakery, etc.)?",
      key: "wl_eatingOutFrequency",
      options: [
        "Rarely",
        "1–2 times a week",
        "3–4 times a week",
        "Almost every day",
      ],
      required: true,
    },
    //  Sugary Drinks/Snacks
    {
      id: 308,
      type: "radio",
      title: " How often do you consume sugary drinks or snacks (soft drinks, sweets, cakes)?",
      key: "wl_sugarySnackFrequency",
      options: [
        "Rarely",
        "Occasionally (1–2 times per week)",
        "Frequently (daily or more than once a day)",
      ],
      required: true,
    },
    //  Track What You Eat
    {
      id: 309,
      type: "radio",
      title: " Do you track what you eat (calories, portions, food diary, app)?",
      key: "wl_foodTracking",
      options: ["Yes, regularly", "Sometimes", "No"],
      required: true,
    },
    //  Water Intake
    {
      id: 310,
      type: "radio",
      title: " How much water do you drink daily?",
      key: "wl_waterIntake",
      options: ["Less than 1 liter", "1–2 liters", "More than 2 liters"],
      required: true,
    },
    //  Fruits, Veg, Whole Grains
    {
      id: 311,
      type: "radio",
      title: " How often do you eat fruits, vegetables, or whole grains?",
      key: "wl_healthyFoodFrequency",
      options: ["Rarely", "Sometimes", "Every day"],
      required: true,
    },
    // Step  Barriers & Preferences
    {
      id: 312,
      type: "radio",
      title: "Have you tried to lose weight before?",
      key: "wl_triedBefore",
      options: ["Yes", "No"],
      required: true,
    },
    //  What usually makes it hard for you to maintain a healthy weight?
    {
      id: 313,
      type: "multiselect",
      title: " What usually makes it hard for you to maintain a healthy weight?",
      key: "wl_barriers",
      options: [
        { id: "busySchedule", label: "Busy schedule / lack of time" },
        { id: "emotionalEating", label: "Stress or emotional eating" },
        { id: "cravings", label: "Cravings or late-night eating" },
        { id: "lackMotivation", label: "Lack of motivation" },
        { id: "dontEnjoyExercise", label: "Don't enjoy exercise" },
        { id: "dontKnowWhatToEat", label: "Don't know what to eat or how to plan" },
        { id: "healthConditionLimits", label: "Health condition limits activity" },
        { id: "other", label: "Other" },
      ],
      required: true,
    },
    //  What kind of plan would suit you best?
    {
      id: 314,
      type: "radio",
      title: " What kind of plan would suit you best?",
      key: "wl_planType",
      options: [
        "Gradual, small lifestyle changes",
        "Fast, focused short-term challenge",
        "Flexible plan with variety",
        "Structured, detailed schedule",
      ],
      required: true,
    },
    // Step  Motivation & Goal Setting
    {
      id: 315,
      type: "radio",
      title: "What's your main reason for wanting to lose weight?",
      key: "wl_mainReason",
      options: [
        "To look and feel better",
        "For health reasons (doctor's advice)",
        "To increase energy and fitness",
        "To manage a condition (diabetes, PCOS, etc.)",
        "Other",
      ],
      required: true,
    },
    //  Main weight loss goal
    {
      id: 316,
      type: "multiselect",
      title: " What's your main weight loss goal?",
      description: "Pick one or more.",
      key: "wl_goals",
      options: [
        { id: "safeSustainable", label: "⚖️ Lose weight safely & sustainably" },
        { id: "burnFatTone", label: "🔥 Burn fat & tone up" },
        { id: "buildMuscle", label: "💪 Build lean muscle" },
        { id: "boostEnergyStamina", label: "⚡ Boost energy & stamina" },
        { id: "improveMoodStress", label: "🧘 Improve mood & reduce stress" },
        { id: "preventHealthIssues", label: "🛡️ Prevent future health issues" },
        { id: "fitBusySchedule", label: "⏱️ Fit weight loss into a busy schedule" },
        { id: "loseWeightAtHome", label: "🏠 Lose weight at home" },
        { id: "other", label: "✏️ Other" },
      ],
      required: true,
    },
  ],

  // Goal: 🚭🍺 Cut down or quit smoking, alcohol, or drugs
  substance: [
    //Current Substance Use 
    {
      id: 401,
      type: "multiselect",
      title: "Do you currently use any of these substances?",
      key: "substanceType",
      options: [
        { id: "cigarettes", label: "Cigarettes" },
        { id: "beedi", label: "Beedi" },
        { id: "chewingTobacco", label: "Chewing tobacco / Betel leaves (Mawa / Pan)" },
        { id: "alcohol", label: "Alcohol" },
        { id: "otherDrugs", label: "Other drugs (e.g., cannabis)" },
        { id: "none", label: "None of the above" },
      ],
      required: true,
    },
    //  Usage Frequency
    {
      id: 402,
      type: "radio",
      title: " How often do you use it?",
      key: "substanceFrequency",
      options: [
        "Daily",
        "Weekly",
        "Occasionally",
        "I used in the past, but quit",
      ],
      required: true,
    },
    //  Quantity/Details Placeholder
    {
      id: 403,
      type: "placeholder",
      title: "Substance Usage Details (Quantity/Duration)",
      key: "substanceDetailsPlaceholder",
      required: false,
    },
    //  Duration of Use
    {
      id: 404,
      type: "radio",
      title: "How long have you been using this?",
      key: "substanceDuration",
      options: [
        "Less than 1 year",
        "1–5 years",
        "5–10 years",
        "More than 10 years",
      ],
      required: true,
    },
    //  Reasons for Use
    {
      id: 405,
      type: "multiselect",
      title: "What makes you use these substances?",
      key: "substanceReasons",
      options: [
        { id: "stressAnxiety", label: "Stress/anxiety" },
        { id: "habitRoutine", label: "Habit/routine" },
        { id: "socialPressure", label: "Social situations/peer pressure" },
        { id: "culturalFamily", label: "Cultural / family practice" },
        { id: "other", label: "Other" },
      ],
      required: true,
    },
    //  Situations for Use
    {
      id: 406,
      type: "multiselect",
      title: "In what situations do you usually taken these substances?",
      key: "substanceSituations",
      options: [
        { id: "atHomeAlone", label: "At home alone" },
        { id: "socialGatherings", label: "At social gatherings / with friends" },
        { id: "afterWorkStress", label: "After work or stressful days" },
        { id: "duringMeals", label: "During meals" },
        { id: "weekendsOnly", label: "Weekends only" },
        { id: "otherSituation", label: "Other" },
      ],
      required: true,
    },
    // Consequences & Self-Reflection 
    {
      id: 407,
      type: "multiselect",
      title: "Consequences & Self-Reflection: Have you noticed any of these effects?",
      key: "substanceConsequences",
      options: [
        { id: "troubleSleep", label: "Trouble with sleep or low energy" },
        { id: "difficultyFocusing", label: "Difficulty focusing or reduced productivity" },
        { id: "tensionConflict", label: "Tension or conflict with family or friends" },
        { id: "changesHealth", label: "Changes in health (weight, breathing, blood pressure, digestion, etc.)" },
        { id: "moodChanges", label: "Mood changes (irritability, anxiety, or sadness)" },
        { id: "cravingsDependent", label: "Cravings or feeling dependent on it" },
        { id: "noNoticeableIssues", label: "No noticeable issues" },
      ],
      required: true,
    },
  ],

  // Goal: 🧘 Feel calmer & reduce stress
  mental: [
    // Step  Baseline & Life Situation
    {
      id: 501,
      type: "placeholder",
      title: "Step  Baseline & Life Situation",
      description: "Based on your 'Current Lifestyle' answer, please provide more details on your main stress factor.",
      key: "mh_lifeSituation",
      required: true,
    },
    //  Who do you currently live with?
    {
      id: 502,
      type: "radio",
      title: " Who do you currently live with?",
      key: "mh_livingSituation",
      options: [
        "With parents/family",
        "With spouse/children",
        "Alone",
        "Hostel/boarding/friends",
      ],
      required: true,
    },
    //  Financial situation
    {
      id: 503,
      type: "radio",
      title: " How would you describe your financial situation?",
      key: "mh_financialSituation",
      options: [
        "Comfortable – basic needs met without worry",
        "Manageable – some challenges, but okay",
        "Struggling – financial stress is frequent",
        "Severe – unable to meet basic needs",
      ],
      required: true,
    },
    // Step  Lifestyle & Daily Routine
    {
      id: 504,
      type: "radio",
      title: "Does your medical condition affect your mental health or daily functioning?",
      key: "mh_medicalConditionAffects",
      options: ["No", "Yes"],
      required: true,
    },
    //  Daily Routine
    {
      id: 505,
      type: "multiselect",
      title: "Q How would you describe your daily routine?",
      key: "mh_dailyRoutine",
      options: [
        { id: "sedentary", label: "Mostly sedentary / desk work / studying" },
        { id: "active", label: "Physically active (walking, sports, exercise)" },
        { id: "irregularMeals", label: "Irregular meals / poor diet" },
        { id: "goodSleep", label: "Sleep 6–8 hours / good sleep hygiene" },
        { id: "poorSleep", label: "Sleep <6 hours / poor sleep quality" },
        { id: "heavyScreenTime", label: "Heavy screen time / social media" },
        { id: "socialActive", label: "Socially active / regular friends or family interaction" },
        { id: "socialIsolated", label: "Socially isolated / limited contact" },
      ],
      required: true,
    },
    //  Coping Mechanisms
    {
      id: 506,
      type: "multiselect",
      title: " When you feel stressed, how do you usually cope?",
      key: "mh_copingMechanisms",
      options: [
        { id: "talk", label: "Talk to friends/family" },
        { id: "keep", label: "Keep it to myself" },
        { id: "distract", label: "Distract with phone/social media/TV" },
        { id: "sleep", label: "Sleep it off" },
        { id: "eat", label: "Eat/snack" },
        { id: "alcoholSmoking", label: "Use alcohol/smoking" },
        { id: "other", label: "Other" },
      ],
      required: true,
    },
    // Step  Mental & Emotional State
    {
      id: 507,
      type: "radio",
      title: "How often do you feel stressed, anxious, or low in mood?",
      key: "mh_stressFrequency",
      options: [
        "Rarely – I feel calm most of the time",
        "Sometimes – stress a few times a week",
        "Often – stress or low mood is frequent",
        "Almost always – I feel overwhelmed nearly every day",
      ],
      required: true,
    },
    //  Social Connection
    {
      id: 508,
      type: "radio",
      title: "Q How connected and supported do you feel socially?",
      key: "mh_socialConnection",
      options: [
        "Very connected – I have friends/family to talk to",
        "Moderately connected – sometimes I feel supported",
        "Rarely connected – I often feel alone",
        "Not connected – I feel isolated",
      ],
      required: true,
    },
    //  Recent Feelings 
    {
      id: 509,
      type: "multiselect",
      title: " In the past month, have you felt any of the following?",
      key: "mh_recentFeelings",
      options: [
        { id: "hopeless", label: "Hopeless about the future" },
        { id: "difficultyConcentrating", label: "Difficulty concentrating" },
        { id: "lossOfInterest", label: "Loss of interest in activities" },
        { id: "nervousnessWorry", label: "Nervousness or excessive worry" },
        { id: "troubleSleep", label: "Trouble sleeping or oversleeping" },
        { id: "feelingDownSad", label: "Feeling down or sad most of the day" },
        { id: "noneFeelings", label: "None of the above" },
      ],
      required: true,
    },
    // Step  Identify Root Causes / Triggers
    {
      id: 510,
      type: "multiselect",
      title: "Which areas do you think are most affecting your mood or stress?",
      key: "mh_rootCauses",
      options: [
        { id: "workStudies", label: "Work / studies / routine pressure" },
        { id: "familyHousehold", label: "Family / household responsibilities" },
        { id: "financialStress", label: "Financial stress" },
        { id: "healthLifestyle", label: "Physical health / exercise / diet / sleep" },
        { id: "socialRelationships", label: "Social / relationships" },
        { id: "other", label: "Other" },
      ],
      required: true,
    },
    // Step Goals & Readiness
    {
      id: 511,
      type: "multiselect",
      title: "What would you like to achieve?",
      key: "mh_goals",
      options: [
        { id: "feelCalmer", label: "🌈 Feel Calmer & Less Stressed" },
        { id: "improveMood", label: "🙂 Improve mood & emotional balance" },
        { id: "sleepBetter", label: "😴 Sleep better & feel more rested" },
        { id: "boostFocus", label: "⚡ Boost focus & energy" },
        { id: "improveSocialConnections", label: "💬 Improve social connections & relationships" },
        { id: "buildMindfulness", label: "🧘 Build mindfulness & resilience" },
        { id: "regainMotivation", label: "💪 Regain motivation & self-confidence" },
        { id: "healBurnout", label: "❤️ Heal from emotional stress or burnout" },
        { id: "manageDigitalStress", label: "📵 Manage digital stress" },
        { id: "preventRelapse", label: "🛡️ Prevent mental health relapse" },
        { id: "other", label: "✏️ Other" },
      ],
      required: true,
    },
  ],

  // Goal: 😴 Sleep better & wake up fresh
  sleep: [
    // Sleep and Wake Time
    {
      id: 601,
      type: "sleepSchedule",
      title: "What time are you trying to sleep and what time do you wake up usually?",
      key: "sleepSchedule",
      inputs: [
        { key: "bedtime", type: "time", placeholder: "HH:MM", required: true },
        { key: "waketime", type: "time", placeholder: "HH:MM", required: true },
      ],
      required: true,
    },
    //  Sleep Disorder Diagnosis 
    {
      id: 602,
      type: "radio",
      title: "Q2)Have you been diagnosed with insomnia or another sleep disorder?",
      key: "sleepDisorderDiagnosis",
      options: ["Yes", "No"],
      required: true,
    },
    //  Biggest Sleep Challenge 
    {
      id: 603,
      type: "radio",
      title: "(Q3): What is your biggest challenge when it comes to sleep?",
      key: "sleepChallenge",
      options: [
        "Difficulty falling asleep",
        "Waking up frequently during the night",
        "Waking up too early and can't go back to sleep",
        "Feeling unrefreshed/tired even after a full night's sleep",
        "My schedule is irregular (e.g., shift work)",
      ],
      required: true,
    },
    //  Last Meal Timing
    {
      id: 604,
      type: "radio",
      title: "How much time is there usually between your last main meal (dinner/supper) and when you go to bed?",
      key: "lastMealTimingSleep",
      options: [
        "Less than 30 minutes",
        "30 min – 1 hour",
        "1–2 hours",
        "More than 2 hours",
        "No fixed pattern",
      ],
      required: true,
    },
    //  Sleep Goals
    {
      id: 605,
      type: "multiselect",
      title: " What would you like to improve about your sleep?",
      description: "Choose one or more.",
      key: "sleepGoals",
      options: [
        { id: "fallAsleepFaster", label: "😴 Fall asleep faster" },
        { id: "stayAsleep", label: "🌙 Stay asleep through the night" },
        { id: "wakeUpRefreshed", label: "⏰ Wake up feeling more refreshed" },
        { id: "reduceRacingThoughts", label: "🧘 Reduce racing thoughts or stress at bedtime" },
        { id: "cutScreenTime", label: "📱 Cut down on late-night screen time" },
        { id: "improveFocusMood", label: "🧠 Improve focus and mood during the day" },
        { id: "improveFitnessRecovery", label: "💪 Improve fitness or recovery with better sleep" },
        { id: "manageHealthCondition", label: "🛡️ Manage a health condition that affects sleep" },
        { id: "other", label: "✏️ Other" },
      ],
      required: true,
    },
  ],
};

// CONDITIONAL FOLLOW-UP DATA 
const conditionalFollowUps = {
  //  BASE PROFILE FOLLOW-UPS ( Sex) 
  "pregnantQuestion": {
    subKey: "isPregnant",
    subTitle: " Are you currently pregnant? (Yes/No)",
    description: "This helps us tailor your health plan safely, as your nutrition, activity, and lifestyle needs can change during pregnancy.",
    subType: "radio",
    options: ["Yes", "No"],
    required: true,
  },

  //DIAGNOSED CONDITIONS FOLLOW-UPS 
  heartDisease_type: {
    subKey: "heartDiseaseType",
    subTitle: "1. Heart disease: Which type of heart problem do you have?",
    subType: "radio",
    options: ["Heart attack (Myocardial infarction / blocked arteries)", "High blood pressure (Hypertension)", "Low blood pressure (Hypotension)", "Heart rhythm problems (irregular heartbeat, palpitations)", "Heart failure (heart is weak, shortness of breath)", "Other (please specify)"],
    required: true,
  },
  stroke_type: {
    subKey: "strokeType",
    subTitle: "2. Stroke: Which type of stroke have you had?",
    subType: "radio",
    options: ["Ischemic stroke (blood clot in the brain)", "Hemorrhagic stroke (bleeding in the brain)", "Mini-stroke / TIA (temporary symptoms)", "Not sure"],
    required: true,
  },
  diabetes_type: {
    subKey: "diabetesType",
    subTitle: "3. Diabetes / Blood sugar problems: Which type of diabetes do you have?",
    subType: "radio",
    options: ["Type 1 diabetes (usually starts in children or young adults)", "Type 2 diabetes (most common, often linked to lifestyle)", "Gestational diabetes (during pregnancy)", "Not sure"],
    required: true,
  },
  cancer_type: {
    subKey: "cancerType",
    subTitle: "4. Cancer: Which type of cancer have you been diagnosed with?",
    subType: "radio",
    options: ["Mouth or Lip Cancer", "Lung Cancer", "Colon or Bowel Cancer", "Food Pipe Cancer", "Prostate Cancer", "Breast Cancer", "Cervical Cancer", "Thyroid Cancer", "Ovary Cancer", "Other (please specify)"],
    required: true,
  },
  respiratory_type: {
    subKey: "respiratoryType",
    subTitle: "5. Respiratory problems: Which breathing problem do you have?",
    subType: "radio",
    options: ["Asthma (wheezing, shortness of breath)", "COPD / Chronic bronchitis / Emphysema", "Allergic rhinitis / Hay fever", "Pneumonia (past or chronic lung infection)", "Tuberculosis (past or current TB infection)", "Sleep apnea / Breathing problems during sleep", "Other (please specify)"],
    required: true,
  },
  cld_type: {
    subKey: "cldType",
    subTitle: "6. Chronic Liver Disease: Which type of liver problem do you have?",
    subType: "radio",
    options: ["Fatty liver (non-alcoholic or due to lifestyle)", "Hepatitis (viral infection of the liver)", "Cirrhosis (scarring of the liver)", "Alcohol-related liver disease", "Other (please specify)"],
    required: true,
  },
  thyroid_type: {
    subKey: "thyroidType",
    subTitle: "6. Thyroid Disorders: Which thyroid problem do you have?",
    subType: "radio",
    options: ["Hypothyroidism (low thyroid, feeling tired, gaining weight)", "Hyperthyroidism (high thyroid, feeling anxious, losing weight)", "Other (please specify)"],
    required: true,
  },
  mentalHealthDisorders_type: {
    subKey: "mentalHealthDisordersType",
    subTitle: "7. Mental Health Disorders: Which mental health condition do you have?",
    subType: "radio",
    options: ["Depression (feeling very low or sad for long periods)", "Anxiety (constant worry, nervousness, tension)", "Bipolar disorder (mood swings from very high to very low)", "Other (please specify)"],
    required: true,
  },
  ckd_type: {
    subKey: "ckdType",
    subTitle: "8. Chronic Kidney Disease (CKD): Which CKD type do you have?",
    subType: "radio",
    options: ["Diabetes-related kidney problems", "High blood pressure-related kidney problem", "Kidney inflammation (glomerulonephritis)", "Kidney stones or blockage causing kidney damage", "Genetic kidney disease (Polycystic Kidney Disease)", "Other (please specify)"],
    required: true,
  },
  recentSurgery: [
    {
      subKey: "surgeryInjuryType",
      subTitle: "1 Please select the type of surgery or injury you have had:",
      subType: "radio",
      options: ["Bone or joint surgery (e.g., knee, hip, back)", "Heart or cardiovascular surgery (e.g., bypass, stent)", "Abdominal or digestive surgery (e.g., appendix, gallbladder)", "Eye, ear, or ENT surgery", "Sports or muscle injury (sprain, strain, ligament injury)", "Accident-related injury (e.g., fracture, road traffic injury)", "Other (please specify)"],
      required: true,
    },
    {
      subKey: "surgeryInjuryTiming",
      subTitle: " When did this occur?",
      subType: "radio",
      options: ["Less than 2 weeks ago", "Less than 1 month ago", "Less than 3 months ago", "3–6 months ago", "More than 6 months ago"],
      required: true,
    },
    {
      subKey: "surgeryRecovery",
      subTitle: "How well have you recovered from this surgery or injury?",
      subType: "radio",
      options: ["Fully recovered – no pain or limitations", "Mostly recovered – minor discomfort or limitations", "Partially recovered – moderate pain or restricted movement", "Not recovered – severe pain or major limitations"],
      required: true,
    },
    {
      subKey: "surgeryCurrentSymptoms",
      subTitle: "Are you currently experiencing any of the following due to this surgery/injury?",
      subType: "multiselect",
      options: [
        { id: "painSoreness", label: "Pain or soreness" },
        { id: "swellingInflammation", label: "Swelling or inflammation" },
        { id: "reducedStrength", label: "Reduced strength or mobility" },
        { id: "difficultyDailyActivities", label: "Difficulty performing daily activities" },
        { id: "other", label: "Other (please specify)" },
      ],
      required: true,
    },
  ],
  otherCondition_details: {
    subKey: "otherConditionDetails",
    subTitle: "Please specify the other health condition(s):",
    subType: "text",
    placeholder: "e.g., Asthma, Multiple Sclerosis, Chronic Migraines",
    required: true,
  },

  // Follow-up Question for Identifying Disease Levels
  disease_control: {
    subKey: "diseaseControlLevel",
    subTitle: "How well is your condition currently controlled or managed?",
    subType: "radio",
    options: ["Very well – minimal or no symptoms", "Moderately well – occasional symptoms", "Poorly – frequent symptoms or flare-ups", "Not sure"],
    required: true,
  },

  // NUTRITION FOLLOW-UPS 
  "Mostly vegetables and no meat (Vegetarian)": {
    subKey: "vegetarianProtein",
    subTitle: " How often do you include protein sources (lentils, beans, soy, tofu, eggs, dairy, nuts)?",
    subType: "radio",
    options: ["Rarely", "Sometimes", "Daily"],
    required: true,
  },
  "Only plant-based foods, no meat, eggs, or dairy (Vegan)": {
    subKey: "veganProtein",
    subTitle: " How often do you include protein sources (lentils, beans, soy, tofu, nuts)?",
    subType: "radio",
    options: ["Rarely", "Sometimes", "Daily"],
    required: true,
  },
  "Mostly meat, eggs, and low in bread/rice/potatoes (Keto / Low-carb)": {
    subKey: "ketoFiber",
    subTitle: " How often do you include fiber-rich vegetables (leafy greens, beans, local vegetables)?",
    subType: "radio",
    options: ["Rarely", "Sometimes", "Daily"],
    required: true,
  },
  
  //  Substance Use (Nutrition)
  alcohol_nutrition: {
    subKey: "alcoholFrequencyNutrition",
    subTitle: "1. How often do you drink alcohol?",
    subType: "radio",
    options: ["Rarely (special occasions)", "Sometimes (1–2 times a week)", "Frequently (3–5 times a week)", "Daily"],
    required: true,
  },
  alcohol_quantity_nutrition: {
    subKey: "alcoholQuantityNutrition",
    subTitle: "2. On days you drink, how many drinks do you usually have?",
    subType: "radio",
    options: ["1–2", "3–4", "5 or more"],
    required: true,
  },
  tobacco_nutrition: {
    subKey: "tobaccoFrequencyNutrition",
    subTitle: "3. How often do you smoke?",
    subType: "radio",
    options: ["Rarely (less than once a week)", "Sometimes (1–5 cigarettes per day)", "Frequently (6–10 cigarettes per day)", "Heavy (more than 10 per day)"],
    required: true,
  },
  drugs_nutrition: {
    subKey: "drugsFrequencyNutrition",
    subTitle: "4. How often do you use recreational drugs?",
    subType: "radio",
    options: ["Rarely", "Sometimes (monthly / weekends)", "Frequently (weekly)", "Daily"],
    required: true,
  },

  // Substance use quantity checks
  "Rarely (special occasions)": null,
  "Sometimes (1–2 times a week)": "alcohol_quantity_nutrition",
  "Frequently (3–5 times a week)": "alcohol_quantity_nutrition",
  "Daily": "alcohol_quantity_nutrition",

  //  ACTIVITY FOLLOW-UPS 
  "Mostly sitting (little or no exercise)": {
    subKey: "activityBarriers",
    subTitle: "3. Barriers : What usually makes it hard for you to be more active?",
    subType: "multiselect",
    options: [
      { id: "lackTime", label: "Lack of time" },
      { id: "lackMotivation", label: "Lack of motivation" },
      { id: "physicalLimitations", label: "Physical limitations / health issues" },
      { id: "dontKnowWhatToDo", label: "Don't know what to do" },
      { id: "nothing", label: "Nothing" },
    ],
    required: true,
  },
  "Light movement (walks, chores, light activity)": "Mostly sitting (little or no exercise)",

  // Barrier adaptive follow-ups
  lackTime: { subKey: "lackTime_followup", subTitle: "Would short 5–10 min workouts at home be easier for you to try?", subType: "radio", options: ["Yes", "No", "Maybe"], required: true },
  lackMotivation: { subKey: "lackMotivation_followup", subTitle: "Would you like us to set small daily challenges or reminders to help you stay consistent?", subType: "radio", options: ["Yes", "No", "Maybe"], required: true },
  physicalLimitations: { subKey: "physicalLimitations_followup", subTitle: "Would you like a safe low-impact plan (walking, stretching, mobility)?", subType: "radio", options: ["Yes", "No"], required: true },
  dontKnowWhatToDo: { subKey: "dontKnowWhatToDo_followup", subTitle: "Would you like us to suggest simple beginner routines you can follow?", subType: "radio", options: ["Yes", "No", "Maybe"], required: true },

  // Satisfaction & Goals
  "Moderate activity (exercise 3–4 days/week, brisk walking, cycling, sports)": {
    subKey: "activitySatisfaction",
    subTitle: "4. Satisfaction & Goals : Do you feel your current routine gives you the results you want?",
    subType: "radio",
    options: ["Yes, I'm happy", "Not sure", "No, I feel stuck / not improving"],
    required: true,
  },
  "Very active (exercise most days / vigorous workouts/sports)": "Moderate activity (exercise 3–4 days/week, brisk walking, cycling, sports)",

  // Satisfaction adaptive follow-ups
  "Yes, I'm happy": { subKey: "happyDirection", subTitle: "Do you want to maintain or push further with new challenges?", subType: "radio", options: ["Maintain", "Push further"], required: true },
  "No, I feel stuck / not improving": { subKey: "stuckFocus", subTitle: "Would you like to focus more on strength, stamina, or flexibility?", subType: "radio", options: ["Yes", "No"], required: true },
  "Not sure": { subKey: "notSureVariety", subTitle: "Would you like us to suggest a variety to keep it interesting?", subType: "radio", options: ["Yes", "No"], required: true },
  Maintain: { subKey: "maintainGuidance", subTitle: "Would you like advanced guidance on recovery, stretching, or nutrition?", subType: "radio", options: ["Yes", "Maybe", "No"], required: true },
  "Push further": { subKey: "pushFurtherTraining", subTitle: "Would you like structured training (advanced strength, endurance, or sports-specific programs)?", subType: "radio", options: ["Yes", "Maybe", "No"], required: true },

  // Q Preferences & Environment (Location)
  "At home": { subKey: "homeEquipment", subTitle: "Would you like suggestions for short routines that don't need equipment?", subType: "radio", options: ["Yes", "No", "Maybe"], required: true },
  "Outdoors (park, streets, trails)": { subKey: "outdoorActivities", subTitle: "Would you like walking, running, or bodyweight exercises?", subType: "radio", options: ["Yes", "No", "Maybe"], required: true },
  "Gym or fitness center": { subKey: "gymEquipment", subTitle: "Do you have access to machines, weights, or classes?", subType: "multiselect", options: [{ id: "machines", label: "Machines" }, { id: "freeWeights", label: "Free weights" }, { id: "classes", label: "Classes" }, { id: "mixed", label: "Mixed" }], required: true },

  // Q Preferences & Environment (Activity Type)

  // WEIGHT LOSS FOLLOW-UPS 
"Student / Studying": [
    { subKey: "studentSitting", subTitle: "a. How many hours a day do you usually sit for classes or study?", subType: "radio", options: ["Less than 3 hours", "3–6 hours", "More than 6 hours"], required: true },
    { subKey: "studentLiving", subTitle: "b. Do you live in a hostel or at home?", subType: "radio", options: ["Hostel / Shared accommodation", "At home with family"], required: true },
    { subKey: "studentGym", subTitle: "c. Do you have access to a gym, playground, or space for exercise?", subType: "radio", options: ["Yes", "No"], required: true },
  ],
  "Employed – Office-based (mostly sitting)": [
    { subKey: "officeWorkday", subTitle: "a. How long is your average workday?", subType: "radio", options: ["Less than 6 hours", "6–8 hours", "More than 8 hours"], required: true },
    { subKey: "officeBreaks", subTitle: "b. Do you usually take breaks to move around or stretch during work?", subType: "radio", options: ["Rarely", "Sometimes", "Regularly"], required: true },
    { subKey: "officeWellness", subTitle: "c. Do you have any wellness or fitness programs at your workplace?", subType: "radio", options: ["Yes", "No"], required: true },
  ],
  "Employed – Active work (standing, moving around)": [
    { subKey: "activeWorkType", subTitle: "a. What type of physical work do you do most of the day?", subType: "radio", options: ["Walking / Standing", "Lifting / Carrying", "Manual labor or field work", "Other --> Please specify"], required: true },
    { subKey: "activeWorkFatigue", subTitle: "b. After work, how tired do you usually feel?", subType: "radio", options: ["Not tired – can still exercise", "Somewhat tired – light exercise only", "Very tired – no energy left"], required: true },
  ],
  "Employed – Shift work / irregular hours": [
    { subKey: "shiftWorkType", subTitle: "a. What shift do you usually work?", subType: "radio", options: ["Day", "Night", "Rotating"], required: true },
    { subKey: "shiftWorkSleep", subTitle: "b. How well do you sleep with your current schedule?", subType: "radio", options: ["Well", "Irregular / poor sleep", "Hardly get enough sleep"], required: true },
  ],
  "Self-employed / Business owner": [
    { subKey: "selfEmployedWorkType", subTitle: "a. What type of work do you do?", subType: "text", placeholder: "e.g., Online store, retail shop, professional services", required: true }, 
    { subKey: "selfEmployedHours", subTitle: "b. How many hours a day do you typically work?", subType: "radio", options: ["Less than 6", "6–8", "More than 8"], required: true },
    { subKey: "selfEmployedFlexibility", subTitle: "c. How flexible is your daily schedule for exercise or meal planning?", subType: "radio", options: ["Very flexible", "Somewhat flexible", "Not flexible"], required: true },
  ],
  "Homemaker / Caregiver": [
    { subKey: "homemakerTasks", subTitle: "a. What kind of daily tasks do you usually do?", subType: "radio", options: ["Cooking and cleaning", "Childcare / Elder care", "Gardening / Errands", "All of the above"], required: true },
    { subKey: "homemakerDemand", subTitle: "b. How physically demanding do you find your daily routine?", subType: "radio", options: ["Light", "Moderate", "Heavy"], required: true },
    { subKey: "homemakerSelfCare", subTitle: "c. Do you get any time for self-care or exercise?", subType: "radio", options: ["Yes, regularly", "Occasionally", "Rarely / Never"], required: true },
  ],
  "Retired": [
    { subKey: "retiredActivity", subTitle: "a. How active are you on a typical day?", subType: "radio", options: ["Mostly resting / sitting", "Light household work or walks", "Regular outdoor activity or exercise"], required: true },
    { subKey: "retiredMobility", subTitle: "b. Do you have any mobility limitations or pain that affects movement?", subType: "radio", options: ["Yes", "No"], required: true },
  ],
  "Other": [
    { subKey: "otherLifestyleDetails", subTitle: "a. Please describe your lifestyle:", subType: "text", placeholder: "e.g., Unemployed, volunteer, etc.", required: true },
  ],

  // Step  Barriers & Preferences
  Yes: [
    { subKey: "wl_methodsTried", subTitle: " What methods have you tried?", subType: "multiselect", options: [{ id: "dietPlan", label: "Diet plan" }, { id: "exerciseRoutine", label: "Exercise routine" }, { id: "fastingSkipping", label: "Fasting / skipping meals" }, { id: "supplements", label: "Supplements or shakes" }, { id: "medication", label: "Medication" }, { id: "other", label: "Other" }], required: true },
    { subKey: "wl_previousResult", subTitle: " What was the result of your previous attempt(s)?" , subType: "radio", options: ["Lost weight and maintained it", "Lost weight but regained it", "Didn't see much change", "Other"], required: true },
  ],

  // SUBSTANCE GOAL FOLLOW-UPS 
  "I used in the past, but quit": {
    subKey: "substanceQuitDuration",
    subTitle: "Q2a: How long ago did you quit?",
    subType: "radio",
    options: ["Less than 1 month ago", "1–6 months ago", "6–12 months ago", "More than 1 year ago"],
    required: true,
  },
  alcohol: [
    { subKey: "alcoholFrequencyGoal", subTitle: " How often do you usually drink alcohol?", subType: "radio", options: ["Rarely (special occasions only)", "Sometimes (1–2 times a week)", "Often (3–5 times a week)", "Daily or almost daily"], required: true },
  ],
  "Sometimes (1–2 times a week)_goal": { subKey: "alcoholQuantityGoal", subTitle: " When you drink, how much do you usually have?", subType: "radio", options: ["1–2 drinks", "3–4 drinks", "5+ drinks"], required: true },
  "Often (3–5 times a week)_goal": "Sometimes (1–2 times a week)_goal",
  "Daily or almost daily_goal": "Sometimes (1–2 times a week)_goal",
  "Rarely (special occasions only)_goal": null,

  cigarettes: { subKey: "cigarettesQuantityGoal", subTitle: "Q Number smoked per day (for daily) or per week (for weekly/occasional)", subType: "text", placeholder: "e.g., 10 per day", required: true },
  beedi: { subKey: "beediQuantityGoal", subTitle: "Q Number smoked per day (for daily) or per week (for weekly/occasional)", subType: "text", placeholder: "e.g., 5 per day", required: true },
  chewingTobacco: { subKey: "chewingQuantityGoal", subTitle: "Q Number of leaves/grams per day (or per week)", subType: "text", placeholder: "e.g., 3 leaves per day", required: true },
  otherDrugs: { subKey: "otherDrugsFrequencyGoal", subTitle: "Q Frequency per week/day", subType: "text", placeholder: "e.g., 2 times per week", required: true },

  // Q Situations for Use
  atHomeAlone: { subKey: "atHomeAloneReason", subTitle: "Q4b When you consume at home, is it usually because you feel bored, lonely, or stressed?", subType: "radio", options: ["Boredom", "Loneliness", "Stress", "Habit", "Other"], required: true },
  socialGatherings: { subKey: "socialPressureGoal", subTitle: "Q4b When you consume in social settings, do you feel pressured by others, or is it mostly by choice?", subType: "radio", options: ["Peer pressure", "By choice", "Both"], required: true },
  afterWorkStress: { subKey: "stressCopingGoal", subTitle: "Q4b Do you usually consume as your main way to cope with stress or unwind?", subType: "radio", options: ["Yes, often", "Sometimes", "Rarely", "No"], required: true },
  duringMeals: { subKey: "mealRoutineCultural", subTitle: "Q4b When you consume during meals, is it more of a routine, cultural habit, or for enjoyment?", subType: "radio", options: ["Routine", "Cultural", "For enjoyment/taste", "Other"], required: true },
  weekendsOnly: { subKey: "weekendConsumptionPattern", subTitle: "Q4b When you consume on weekends, is it usually moderate or heavy (more than your usual amount)?", subType: "radio", options: ["Always moderate", "Sometimes heavy", "Often heavy", "Not sure"], required: true },
  otherSituation: { subKey: "otherSituationDetails", subTitle: "Q4b Please describe when and why you usually consume", subType: "text", placeholder: "Open text response", required: true },

  // Consequences & Self-Reflection
  troubleSleep: [
    { subKey: "sleepEnergyFrequencyConsequence", subTitle: "Q5a: How often do you notice sleep or energy problems after [using/consuming]?", subType: "radio", options: ["Every time I [use/consume]", "Sometimes", "Rarely"], required: true },
    { subKey: "sleepEnergyTipsConsequence", subTitle: "Q5b: Would you like tips on improving sleep and energy while managing [your use/consumption]?", subType: "radio", options: ["Yes", "Maybe", "No"], required: true },
  ],
  difficultyFocusing: [
    { subKey: "focusAffectedAreasConsequence", subTitle: "Q5c: Do you notice this effect mainly at work, home, or both?", subType: "radio", options: ["Work", "Home", "Both"], required: true },
    { subKey: "focusStrategiesConsequence", subTitle: "Q5d: Would you like strategies to maintain focus and productivity while reducing [your use/consumption]?", subType: "radio", options: ["Yes", "Maybe", "No"], required: true },
  ],
  tensionConflict: [
    { subKey: "conflictTimingConsequence", subTitle: "Q5e: Do conflicts usually happen when you [use/consume] or after it?", subType: "radio", options: ["During", "After", "Both"], required: true },
    { subKey: "conflictGuidanceConsequence", subTitle: "Q5f: Would you like guidance on reducing relationships or social tension related to [your use/consumption]?", subType: "radio", options: ["Yes", "Maybe", "No"], required: true },
  ],
  changesHealth: [
    { subKey: "doctorAdviceConsequence", subTitle: "Q Have you been told by a doctor or health professional that [smoking / drinking / tobacco / drug use] is affecting your health?", subType: "radio", options: ["Yes", "No"], required: true },
  ],

  // MENTAL HEALTH FOLLOW-UPS 
  mh_medicalConditionAffects_Yes: {
    subKey: "mh_impactAreas",
    subTitle: "Q2a: How does it affect you?",
    subType: "multiselect",
    options: [
      { id: "causesStress", label: "Causes stress / anxiety" },
      { id: "lowersMood", label: "Lowers mood / depressive feelings" },
      { id: "affectsSleep", label: "Affects sleep" },
      { id: "affectsEnergy", label: "Affects energy / motivation" },
      { id: "affectsRelationships", label: "Affects social relationships" },
      { id: "other", label: "Other (please specify)" },
    ],
    required: true,
  },
  sedentary: { subKey: "sedentary_barrier", subTitle: "Mostly sedentary: What prevents you from moving more?", subType: "radio", options: ["Lack of time", "Lack of motivation", "Physical limitations", "Don't know what to do"], required: true },
  irregularMeals: { subKey: "irregularMeals_type", subTitle: "Irregular meals / poor diet: Which meals are usually skipped or unhealthy?", subType: "multiselect", options: [{ id: "breakfast", label: "Breakfast" }, { id: "lunch", label: "Lunch" }, { id: "dinner", label: "Dinner" }, { id: "snacks", label: "Snacks / sugary drinks" }, { id: "fastFood", label: "Mostly fast food / processed meals" }], required: true },
  poorSleep: { subKey: "poorSleep_disruption", subTitle: "Sleep <6 hours / poor sleep quality: What usually disrupts your sleep?", subType: "radio", options: ["Stress / anxiety", "Screen time / late-night phone use", "Family responsibilities", "Health issues"], required: true },

  "Rarely – I feel calm most of the time": null,
  "Sometimes – stress a few times a week": { subKey: "sometimes_trigger", subTitle: "When you feel stressed a few times a week, what is the main trigger?", subType: "radio", options: ["Work/Studies", "Family/Relationships", "Financial Concerns", "Other"], required: true },
  "Often – stress or low mood is frequent": { subKey: "often_symptoms", subTitle: "When you feel stressed or low, what do you notice first?", subType: "multiselect", options: [{ id: "lackMotivation", label: "Lack of motivation" }, { id: "racingThoughts", label: "Racing thoughts / worry" }, { id: "fatigue", label: "Fatigue / low energy" }, { id: "irritability", label: "Irritability / mood swings" }, { id: "tension", label: "Tension / headaches" }, { id: "sleepProblems", label: "Sleep problems" }, { id: "other", label: "Other (please specify)" }], required: true },
  "Almost always – I feel overwhelmed nearly every day": { subKey: "always_symptoms", subTitle: "When you feel stressed or low, what do you notice first?", subType: "multiselect", options: [{ id: "lackMotivation", label: "Lack of motivation" }, { id: "racingThoughts", label: "Racing thoughts / worry" }, { id: "fatigue", label: "Fatigue / low energy" }, { id: "irritability", label: "Irritability / mood swings" }, { id: "tension", label: "Tension / headaches" }, { id: "sleepProblems", label: "Sleep problems" }, { id: "other", label: "Other (please specify)" }], required: true },

  hopeless: { subKey: "hopeless_followup", subTitle: "Does this affect your motivation to do daily tasks?", subType: "radio", options: ["Yes, a lot", "Sometimes", "No"], required: true },
  difficultyConcentrating: { subKey: "concentration_area", subTitle: "In which area do you notice poor concentration most?", subType: "radio", options: ["Studies/work", "Daily chores/household", "Conversations/social life", "Other"], required: true },
  lossOfInterest: { subKey: "lossOfInterest_impact", subTitle: "Which activities have you lost interest in?", subType: "multiselect", options: [{ id: "hobbies", label: "Hobbies/leisure" }, { id: "social", label: "Spending time with friends/family" }, { id: "workStudies", label: "Work/studies" }, { id: "selfCare", label: "Self-care/personal goals" }, { id: "other", label: "Other" }], required: true },
  nervousnessWorry: { subKey: "nervousness_impact", subTitle: "How often does worry stop you from doing things you want/need to do?", subType: "radio", options: ["Very often", "Sometimes", "Rarely", "Never"], required: true },
  troubleSleep: { subKey: "troubleSleep_type", subTitle: "Which of these best describes your sleep issue?", subType: "radio", options: ["Trouble falling asleep", "Wake up often at night", "Wake up too early", "Sleeping too much"], required: true },
  feelingDownSad: { subKey: "sadness_impact", subTitle: "Did this sadness affect your daily routine (work, studies, relationships, self-care)?", subType: "radio", options: ["Yes, significantly", "Yes, somewhat", "No"], required: true },

  workStudies: { subKey: "workStudies_impact", subTitle: "Work / studies: Does this affect your sleep, energy, or relationships?", subType: "radio", options: ["Yes", "Sometimes", "No"], required: true },
  familyHousehold: { subKey: "familyHousehold_impact", subTitle: "Family / household: Does this limit your personal time or self-care?", subType: "radio", options: ["Yes", "Sometimes", "No"], required: true },
  financialStress: { subKey: "financialStress_impact", subTitle: "Financial: Do financial concerns impact your mood or motivation?", subType: "radio", options: ["Yes", "Sometimes", "No"], required: true },
  healthLifestyle: { subKey: "healthLifestyle_impact", subTitle: "Health / lifestyle: Do you feel tired or low energy due to lifestyle habits?", subType: "radio", options: ["Yes", "Sometimes", "No"], required: true },
  socialRelationships: { subKey: "socialRelationships_impact", subTitle: "Social: Do you feel isolated or unsupported?", subType: "radio", options: ["Yes", "Sometimes", "No"], required: true },

  // === SLEEP FOLLOW-UPS ===
  "sleepDisorderDiagnosis_Yes": { subKey: "sleepDiagnosisDetails", subTitle: "Please provide details of your diagnosis and treatment (if any).", subType: "text", placeholder: "e.g., Sleep Apnea treated with CPAP, Insomnia treated with CBT-I", required: true },
  "Difficulty falling asleep": { subKey: "fallingAsleepReason", subTitle: "When you're trying to fall asleep, what is the primary thing keeping you awake?", subType: "radio", options: ["Racing thoughts / Stress / Anxiety", "Physical discomfort (pain, heat, noise, hunger)", "Not feeling tired (too much energy, late activity)"], required: true },
  "Waking up frequently during the night": { subKey: "wakingUpReason", subTitle: "When you wake up at night, what usually causes it?", subType: "radio", options: ["Need to use the bathroom", "Temperature (too hot or too cold)", "Noise or a partner's movement", "I just woke up and can't go back to sleep (no clear reason)"], required: true },
  "Waking up too early and can't go back to sleep": { subKey: "earlyWakingReason", subTitle: "When you wake up too early, what is your first thought or feeling?", subType: "radio", options: ["Worrying about things I can't control (family, work, future).", "Hunger or a desire for a morning beverage", "It's just my internal clock; I feel done sleeping"], required: true },
  "Feeling unrefreshed/tired even after a full night's sleep": { subKey: "unrefreshedFeeling", subTitle: "How do you feel after waking up?", subType: "radio", options: ["Crash mid-day", "Groggy, need caffeine", "Rarely feel rested"], required: true },
  "My schedule is irregular (e.g., shift work)": { subKey: "irregularScheduleReason", subTitle: "What is the main reason your bedtime and wake time change so much?", subType: "radio", options: ["Necessary late work/studying or early duties", "Social activities, chats or calls with friends or partner, late-night movies, or gaming", "I have no fixed schedule/routine"], required: true },
};

// EXPORT FUNCTIONS
const getQuestions = (primaryGoals = [], currentAnswers = {}, age = 0, sex = "") => {
  let allQuestions = [...baseQuestions];
  let currentId = Math.max(...baseQuestions.map(q => q.id));

  //Conditional Pregnancy Check
  if (sex === "Female" && age > 18) {
    const pregnantQuestion = conditionalFollowUps["pregnantQuestion"];
    currentId++;
    const insertionIndex = allQuestions.findIndex(q => q.key === "sex") + 1;
    allQuestions.splice(insertionIndex, 0, {
      ...pregnantQuestion,
      id: currentId,
      type: pregnantQuestion.subType,
      title: pregnantQuestion.subTitle,
      description: pregnantQuestion.description,
      key: "isPregnant",
      required: pregnantQuestion.required,
    });
  }

  let selectedGoals = [];

   if (Array.isArray(primaryGoals)) {
    // If it's already an array, use it directly
    selectedGoals = primaryGoals;
  } else if (typeof primaryGoals === 'object' && primaryGoals !== null) {
    // If it's an object (from multiselect), convert to array of selected keys
    selectedGoals = Object.keys(primaryGoals).filter(key => primaryGoals[key] && key !== "none");
  }

  selectedGoals.forEach(goalKey => {
    const key = goalKey.id || goalKey;
    if (goalSpecificQuestions[key]) {
      goalSpecificQuestions[key].forEach(q => {
        if (q.showCondition && !q.showCondition(currentAnswers)) {
          return; 
        }
        
        currentId++;
        allQuestions.push({ ...q, id: currentId });
      });
    }
  });

  // 2. Add Goal-Specific Questions with proper ID sequencing
  // primaryGoals.forEach(goalKey => {
  //   const key = goalKey.id || goalKey;
  //   if (goalSpecificQuestions[key]) {
  //     goalSpecificQuestions[key].forEach(q => {
  //       // Check if question should be shown based on conditions
  //       if (q.showCondition && !q.showCondition(currentAnswers)) {
  //         return; // Skip this question
  //       }
        
  //       currentId++;
  //       allQuestions.push({ ...q, id: currentId });
  //     });
  //   }
  // });

  return allQuestions.sort((a, b) => a.id - b.id);
};

// Map condition keys to their follow-up logic
const healthConditionFollowUps = {
  heartDisease: ["heartDisease_type", "disease_control"],
  stroke: ["stroke_type", "disease_control"],
  diabetes: ["diabetes_type", "disease_control"],
  jointMobility: ["disease_control"],
  respiratory: ["respiratory_type", "disease_control"],
  recentSurgery: ["recentSurgery"],
  anemia: ["disease_control"],
  osteoarthritis: ["disease_control"],
  cancer: ["cancer_type", "disease_control"],
  mentalHealthDisorders: ["mentalHealthDisorders_type", "disease_control"],
  obesity: ["disease_control"],
  ckd: ["ckd_type", "disease_control"],
  cld: ["cld_type", "disease_control"],
  thyroid: ["thyroid_type", "disease_control"],
  pcos: ["disease_control"],
  other: ["otherCondition_details", "disease_control"],
};

// Map substance keys to their quantity/details follow-up
const substanceQuantityFollowUps = {
  cigarettes: "cigarettes",
  beedi: "beedi",
  chewingTobacco: "chewingTobacco",
  otherDrugs: "otherDrugs",
};

export {
  getQuestions,
  conditionalFollowUps,
  healthConditionFollowUps,
  substanceQuantityFollowUps,
};