// data/questions.js

// Base questions that everyone answers
const baseQuestions = [
  // Step 1: Full Name
  {
    id: 1,
    type: "text",
    title: "What is your preferred first name?",
    key: "fullName",
    placeholder: "Enter your Preferred first name",
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
      "This helps calculate your BMI, which is an important indicator of health risk in Sri Lankan adults. For South Asians, health risks can appear at lower BMI than in other populations. Please select your preferred unit system.",
    key: "measurements",
    inputs: [
      {
        key: "unitSystem",
        type: "radio",
        options: ["Metric (cm, kg)", "Imperial (ft/in, lbs)"],
        required: true,
      },
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
    description:
      "Everyone's health journey starts with one clear goal. Pick the area you'd most like to focus on — we'll personalize your plan around it.",
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
  // Physical Activity Questions - COMPLETELY UPDATED TO MATCH DOCUMENT FLOW
  "Physical Activity": [
    // Q1: Baseline Activity Level (BRANCHING STEP)
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
        "Very active (exercise most days / vigorous workouts/sports)",
      ],
      required: true,
    },

    // Q1a: Frequency & Duration (Asked if activity > Mostly Sitting)
    // These questions will only be shown for Light movement, Moderate, and Very active
    {
      id: 7,
      type: "radio",
      title: "Frequency & Duration",
      description: "How many days per week do you exercise?",
      key: "exerciseFrequency",
      options: ["0–1", "2–3", "4–5", "6–7"],
      required: true,
    },

    // Q2: Weekly Minutes of Activity
    {
      id: 8,
      type: "radio",
      title: "Weekly Activity Minutes",
      description:
        "In a typical week, how much time do you spend doing moderate or vigorous physical activity?",
      key: "weeklyMinutes",
      options: [
        "Less than 30 minutes (< 0.5 hours)",
        "30–149 minutes (0.5–2.5 hours)",
        "150–300 minutes (2.5–5 hours)",
        "More than 300 minutes (5+ hours)",
      ],
      required: true,
    },

    // Q3: Type of Physical Activity
    {
      id: 9,
      type: "multiselect",
      title: "Activity Types",
      description:
        "Which of these best describes your usual physical activities? (choose all that apply)",
      key: "activityTypes",
      options: [
        {
          id: "light",
          label:
            "Light (e.g., walking slowly, light household work, playing cards)",
        },
        {
          id: "moderate",
          label:
            "Moderate (e.g., brisk walking, cycling at light effort, recreational badminton, doubles tennis)",
        },
        {
          id: "vigorous",
          label:
            "Vigorous (e.g., jogging, competitive sports, singles tennis, basketball, swimming, running)",
        },
      ],
      required: true,
    },

    {
      id: 10,
      type: "radio",
      title: "Exercise Intensity",
      description: "How challenging do you feel your exercise is?",
      key: "exerciseIntensity",
      options: ["Very easy", "Moderate", "Hard", "Very hard"],
      required: true,
    },

    // Q2: Health & Safety Check (Next main step after Q1 series)
    {
      id: 11,
      type: "radio",
      title: "Health & Safety Check",
      description:
        "Do you have any medical conditions or injuries that affect your ability to exercise?",
      key: "hasMedicalConditions",
      options: ["Yes", "No"],
      required: true,
    },

    // Q3: Exercise Preferences & Environment (Location)
    {
      id: 12,
      type: "radio",
      title: "Exercise Location",
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

    // Q3: Activity Type Preference
    {
      id: 13,
      type: "multiselect",
      title: "Activity Preferences",
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

    // Q3: Time Availability
    {
      id: 14,
      type: "radio",
      title: "Time Availability",
      description:
        "How much time can you usually dedicate to exercise per day?",
      key: "timeAvailability",
      options: ["<10 minutes", "10–20 minutes", "20–40 minutes", "40+ minutes"],
      required: true,
    },

    // Q4: Main Fitness Goal
    {
      id: 15,
      type: "radio",
      title: "Main Fitness Goal",
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

    // Q4: Motivation & Readiness
    {
      id: 16,
      type: "radio",
      title: "Readiness Level",
      description:
        "How ready are you to make changes and follow a physical activity plan?",
      key: "readinessLevel",
      options: [
        "Very ready → I'm ready to start now",
        "Somewhat ready → I can start small and gradually increase",
        "Not ready → I want to explore and prepare first",
      ],
      required: true,
    },

    // Q4: Motivation Style
    {
      id: 17,
      type: "multiselect",
      title: "Motivation Style",
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

  // Nutrition Questions
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

  // Tobacco Questions
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
        { id: "personal", label: "Personal/Other reasons" },
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

  // Alcohol Questions (COMPLETELY UPDATED TO MATCH DOCUMENT STRUCTURE)
  Alcohol: [
    // Step 1: Frequency & Quantity
    {
      id: 6,
      type: "radio",
      title: "How often do you usually drink alcohol?",
      key: "alcoholFrequency",
      options: [
        "Rarely (special occasions only)",
        "Sometimes (1–2 times a week)",
        "Often (3–5 times a week)",
        "Daily or almost daily",
      ],
      required: true,
    },
    // Step 2: Motivation Behind Drinking (Key for user type)
    {
      id: 7,
      type: "radio",
      title: "When you drink, what's the main reason?",
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
    // Step 3: Context & Triggers - BRANCHING STEP
    {
      id: 8,
      type: "multiselect",
      title: "In what situations do you usually drink?",
      key: "drinkingContext",
      options: [
        { id: "homeAlone", label: "At home alone" },
        { id: "socialGatherings", label: "At social gatherings / with friends" },
        { id: "afterWork", label: "After work or stressful days" },
        { id: "duringMeals", label: "During meals" },
        { id: "weekendsOnly", label: "Weekends only" },
        { id: "otherContext", label: "Other" },
      ],
      required: true,
    },
    // Step 4: Consequences & Self-Reflection - BRANCHING STEP
    {
      id: 9,
      type: "multiselect",
      title: "Have you noticed any of these effects from your drinking?",
      key: "drinkingEffects",
      options: [
        { id: "sleepEnergy", label: "Trouble with sleep or energy" },
        { id: "focusProductivity", label: "Affects focus or productivity" },
        { id: "familyTension", label: "Causes tension with family / friends" },
        { id: "healthImpact", label: "Impacts health (weight, blood pressure, digestion, etc.)" },
        { id: "noIssues", label: "No noticeable issues" },
      ],
      required: true,
    },
    // Step 5: Goal & Readiness
    {
      id: 10,
      type: "radio",
      title: "What's your goal with alcohol use?",
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

  // Sleep Questions - UPDATED TO MATCH DOCUMENT STRUCTURE
  Sleep: [
    // Q1: Daily Life & Responsibilities
    {
      id: 6,
      type: "radio",
      title: "Daily Life & Responsibilities",
      description:
        "Which of these best describes your daily life and primary responsibilities?",
      key: "sleepDailyLife",
      options: [
        "Student (University, School, other education)",
        "Working Professional (Employed/Self-Employed)",
        "Homemaker / Caregiver / Parent",
        "Retired / Currently Not Working",
        "Other / Multiple roles",
      ],
      required: true,
    },
    // Q2: Sleep Schedule
    {
      id: 7,
      type: "sleepSchedule",
      title: "Sleep Schedule",
      description:
        "What time are you trying to sleep and what time do you usually wake up?",
      key: "sleepSchedule",
      inputs: [
        { key: "bedtime", type: "time", placeholder: "HH:MM", required: true },
        { key: "waketime", type: "time", placeholder: "HH:MM", required: true },
      ],
      required: true,
    },
    // Q3: Sleep Disorder Diagnosis - BRANCHING STEP
    {
      id: 8,
      type: "radio",
      title: "Sleep Disorder Diagnosis",
      description:
        "Have you been diagnosed with insomnia or another sleep disorder?",
      key: "sleepDisorderDiagnosis",
      options: ["Yes", "No"],
      required: true,
    },
    // Q4: Biggest Sleep Challenge - BRANCHING STEP
    {
      id: 9,
      type: "radio",
      title: "Biggest Sleep Challenge",
      description: "What is your biggest challenge when it comes to sleep?",
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
    // Q5: Last Meal Timing
    {
      id: 10,
      type: "radio",
      title: "Last Meal Timing",
      description:
        "How much time is there usually between your last main meal (dinner/supper) and when you go to bed?",
      key: "lastMealTiming",
      options: [
        "Less than 30 minutes",
        "30 min - 1 hour",
        "1-2 hours",
        "More than 2 hours",
        "No fixed pattern",
      ],
      required: true,
    },
  ],

  // Mental Health Questions - COMPLETELY UPDATED TO MATCH DOCUMENT STRUCTURE
  "Mental health": [
    // Step 1: Baseline & Life Situation
    {
      id: 6,
      type: "radio",
      title: "Which of these best describes your current situation?",
      key: "currentSituation",
      options: [
        "Student (school, college, university)",
        "Employed (full-time or part-time, private or government sector)",
        "Self-employed / small business owner",
        "Unemployed / looking for work",
        "Homemaker / caregiver",
        "Retired",
        "Other",
      ],
      required: true,
    },
    {
      id: 7,
      type: "radio",
      title: "Who do you currently live with?",
      key: "livingSituation",
      options: [
        "With parents/family",
        "With spouse/children",
        "Alone",
        "Hostel/boarding/friends",
      ],
      required: true,
    },
    {
      id: 8,
      type: "radio",
      title: "How would you describe your financial situation?",
      key: "financialSituation",
      options: [
        "Comfortable -- basic needs met without worry",
        "Manageable -- some challenges, but okay",
        "Struggling -- financial stress is frequent",
        "Severe -- unable to meet basic needs",
      ],
      required: true,
    },

    // Step 2: Medical & Mental Health History
    {
      id: 9,
      type: "multiselect",
      title: "Do you already have any of these diseases or health conditions? (Select all that apply)",
      key: "healthConditionsMH",
      options: [
        { id: "heartDisease", label: "Heart disease / Hypertension" },
        { id: "diabetes", label: "Diabetes" },
        { id: "respiratoryDisease", label: "Respiratory disease (e.g., asthma, COPD)" },
        { id: "cancer", label: "Cancer (any type)" },
        { id: "oralHealth", label: "Oral health problems (e.g., gum disease, mouth ulcers)" },
        { id: "mentalHealthCondition", label: "Mental health conditions (e.g., anxiety, depression)" },
        { id: "otherCondition", label: "Other (please specify)" },
        { id: "none", label: "None of the above" },
      ],
      required: true,
    },

    // Step 3: Lifestyle & Daily Routine
    {
      id: 10,
      type: "multiselect",
      title: "How would you describe your daily routine?",
      key: "dailyRoutine",
      options: [
        { id: "sedentary", label: "Mostly sedentary / desk work / studying" },
        { id: "active", label: "Physically active (walking, sports, exercise)" },
        { id: "irregularMeals", label: "Irregular meals / poor diet" },
        { id: "goodSleep", label: "Sleep 6-8 hours / good sleep hygiene" },
        { id: "poorSleep", label: "Sleep <6 hours / poor sleep quality" },
        { id: "heavyScreen", label: "Heavy screen time / social media" },
        { id: "socialActive", label: "Socially active / regular friends or family interaction" },
        { id: "socialIsolated", label: "Socially isolated / limited contact" },
      ],
      required: true,
    },
    {
      id: 11,
      type: "multiselect",
      title: "When you feel stressed, how do you usually cope?",
      key: "copingMechanisms",
      options: [
        { id: "talkToOthers", label: "Talk to friends/family" },
        { id: "keepToMyself", label: "Keep it to myself" },
        { id: "distract", label: "Distract with phone/social media/TV" },
        { id: "sleep", label: "Sleep it off" },
        { id: "eat", label: "Eat/snack" },
        { id: "substances", label: "Use alcohol/smoking" },
        { id: "otherCoping", label: "Other" },
      ],
      required: true,
    },

    // Step 4: Mental & Emotional State
    {
      id: 12,
      type: "radio",
      title: "How often do you feel stressed, anxious, or low in mood?",
      key: "stressFrequency",
      options: [
        "Rarely -- I feel calm most of the time",
        "Sometimes -- stress a few times a week",
        "Often -- stress or low mood is frequent",
        "Almost always -- I feel overwhelmed nearly every day",
      ],
      required: true,
    },
    {
      id: 13,
      type: "radio",
      title: "How connected and supported do you feel socially?",
      key: "socialConnection",
      options: [
        "Very connected -- I have friends/family to talk to",
        "Moderately connected -- sometimes I feel supported",
        "Rarely connected -- I often feel alone",
        "Not connected -- I feel isolated",
      ],
      required: true,
    },
    {
      id: 14,
      type: "multiselect",
      title: "In the past month, have you felt any of the following?",
      key: "recentFeelings",
      options: [
        { id: "hopeless", label: "Hopeless about the future" },
        { id: "concentration", label: "Difficulty concentrating" },
        { id: "lossInterest", label: "Loss of interest in activities" },
        { id: "nervousness", label: "Nervousness or excessive worry" },
        { id: "sleepIssues", label: "Trouble sleeping or oversleeping" },
        { id: "sadness", label: "Feeling down or sad most of the day" },
        { id: "noneFeelings", label: "None of the above" },
      ],
      required: true,
    },

    // Step 5: Identify Root Causes / Triggers
    {
      id: 15,
      type: "multiselect",
      title: "Which areas do you think are most affecting your mood or stress?",
      key: "rootCauses",
      options: [
        { id: "workStudies", label: "Work / studies / routine pressure" },
        { id: "family", label: "Family / household responsibilities" },
        { id: "financial", label: "Financial stress" },
        { id: "healthLifestyle", label: "Physical health / exercise / diet / sleep" },
        { id: "social", label: "Social / relationships" },
        { id: "otherRoot", label: "Other" },
      ],
      required: true,
    },

    // Step 7: Goals & Readiness
    {
      id: 16,
      type: "multiselect",
      title: "What would you like to achieve?",
      key: "mentalHealthGoals",
      options: [
        { id: "reduceStress", label: "Reduce stress / improve mood" },
        { id: "improveSleep", label: "Improve sleep / energy" },
        { id: "improveHealth", label: "Improve health / lifestyle habits" },
        { id: "improveSocial", label: "Improve social connections / relationships" },
        { id: "otherGoals", label: "Other (please specify)" },
      ],
      required: true,
    },
  ],

  // Prevent diseases Questions
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

  // SPECIAL LOGIC FOR PHYSICAL ACTIVITY: Filter Q1a questions based on activity level
  let filteredGoalQuestions = [...goalQuestions];
  
  if (goalKey === "Physical Activity" && currentAnswers.activityLevel) {
    const activityLevel = currentAnswers.activityLevel;
    
    // If user selected "Mostly sitting", skip Q1a questions (Frequency & Duration)
    if (activityLevel === "Mostly sitting (little or no exercise)") {
      // Remove Q1a questions (exerciseFrequency, sessionDuration, weeklyMinutes, activityTypes, exerciseIntensity)
      filteredGoalQuestions = goalQuestions.filter(question => 
        !['exerciseFrequency', 'sessionDuration', 'weeklyMinutes', 'activityTypes', 'exerciseIntensity'].includes(question.key)
      );
    }
  }

  // Merge base + goal-specific questions
  const allQuestions = [...baseQuestions];
  filteredGoalQuestions.forEach((question, index) => {
    allQuestions.push({
      ...question,
      id: baseQuestions.length + index + 1,
    });
  });

  return allQuestions;
};

// --- CONDITIONAL FOLLOW-UP DATA
const conditionalFollowUps = {
  // --- NUTRITION FOLLOW-UPS ---
  "Mostly vegetables and no meat (Vegetarian)": [
    {
      subKey: "vegetarianProtein",
      subTitle:
        "How often do you include protein sources (lentils, beans, soy, tofu, eggs, dairy, nuts)?",
      subType: "radio",
      options: ["Rarely", "Sometimes", "Daily"],
      required: true,
    },
  ],
  "Only plant-based foods, no meat, eggs, or dairy (Vegan)": [
    {
      subKey: "veganProtein",
      subTitle:
        "How often do you include protein sources (lentils, beans, soy, tofu, nuts)?",
      subType: "radio",
      options: ["Rarely", "Sometimes", "Daily"],
      required: true,
    },
  ],
  "Mostly meat, eggs, and low in bread/rice/potatoes (Keto / Low-carb)": [
    {
      subKey: "ketoFiber",
      subTitle:
        "How often do you include fiber-rich vegetables (leafy greens, beans, local vegetables)?",
      subType: "radio",
      options: ["Rarely", "Sometimes", "Daily"],
      required: true,
    },
  ],
  // --- END NUTRITION FOLLOW-UPS ---

  // --- MENTAL HEALTH FOLLOW-UPS ---
  
  // Step 1: Current Situation Follow-ups
  "Student (school, college, university)": [
    {
      subKey: "studentStress",
      subTitle: "What usually causes you the most stress at school or university?",
      subType: "multiselect",
      options: [
        { id: "academicPressure", label: "Academic pressure / exams / results" },
        { id: "tuitionPressure", label: "Tuition / extra classes pressure" },
        { id: "timeManagement", label: "Managing time between studies and family expectations" },
        { id: "peerPressure", label: "Peer pressure / social life" },
        { id: "financialConcerns", label: "Financial concerns (fees, travel, living costs)" },
        { id: "otherStudent", label: "Other" },
      ],
      required: true,
    },
  ],
  "Employed (full-time or part-time, private or government sector)": [
    {
      subKey: "workStress",
      subTitle: "What usually causes you the most stress at work?",
      subType: "multiselect",
      options: [
        { id: "workload", label: "Heavy workload / long hours" },
        { id: "jobInsecurity", label: "Job insecurity / contract uncertainty" },
        { id: "workplaceConflict", label: "Difficult boss / workplace conflict" },
        { id: "lowPay", label: "Low pay or limited benefits" },
        { id: "commuteStress", label: "Commute / travel stress (traffic is a big factor in Colombo & other cities)" },
        { id: "otherWork", label: "Other" },
      ],
      required: true,
    },
  ],
  "Self-employed / small business owner": [
    {
      subKey: "businessStress",
      subTitle: "What is your biggest stress factor in running your business?",
      subType: "multiselect",
      options: [
        { id: "financialUncertainty", label: "Financial uncertainty / cash flow" },
        { id: "governmentRegulations", label: "Government regulations or taxes" },
        { id: "customerIssues", label: "Customer or client issues" },
        { id: "lackStability", label: "Lack of stability / market changes" },
        { id: "workLifeBalance", label: "Work-life balance" },
        { id: "otherBusiness", label: "Other" },
      ],
      required: true,
    },
  ],
  "Unemployed / looking for work": [
    {
      subKey: "unemployedStress",
      subTitle: "What's the biggest source of stress while not working?",
      subType: "multiselect",
      options: [
        { id: "financialWorries", label: "Financial worries / supporting family" },
        { id: "familyPressure", label: "Pressure from family / society to find a job" },
        { id: "lowSelfEsteem", label: "Low self-esteem / confidence" },
        { id: "difficultyFinding", label: "Difficulty finding opportunities" },
        { id: "otherUnemployed", label: "Other" },
      ],
      required: true,
    },
  ],
  "Homemaker / caregiver": [
    {
      subKey: "homemakerStress",
      subTitle: "What usually feels most stressful in your role?",
      subType: "multiselect",
      options: [
        { id: "householdResponsibilities", label: "Household responsibilities" },
        { id: "caringForOthers", label: "Caring for children / elderly / family members" },
        { id: "lackPersonalTime", label: "Lack of personal time / self-care" },
        { id: "feelingUnrecognized", label: "Feeling unrecognized / unsupported" },
        { id: "financialDependency", label: "Financial dependency / constraints" },
        { id: "otherHomemaker", label: "Other" },
      ],
      required: true,
    },
  ],
  "Retired": [
    {
      subKey: "retiredChallenges",
      subTitle: "What is your biggest challenge in retirement?",
      subType: "multiselect",
      options: [
        { id: "loneliness", label: "Loneliness / isolation" },
        { id: "healthIssues", label: "Health issues / managing chronic conditions" },
        { id: "financialConcernsRetired", label: "Financial concerns / pension limitations" },
        { id: "lackRoutine", label: "Lack of routine or purpose" },
        { id: "otherRetired", label: "Other" },
      ],
      required: true,
    },
  ],

  // Step 2: Health Conditions Follow-ups (using mh_ prefix for non-mental health conditions)
  "mh_heartDisease": [
    {
      subKey: "heartDiseaseMentalImpact",
      subTitle: "Does this condition affect your mental health or daily functioning?",
      subType: "radio",
      options: ["Yes", "Sometimes", "No"],
      required: true,
    },
  ],
  "mh_diabetes": [
    {
      subKey: "diabetesMentalImpact",
      subTitle: "Does this condition affect your mental health or daily functioning?",
      subType: "radio",
      options: ["Yes", "Sometimes", "No"],
      required: true,
    },
  ],
  "mh_respiratoryDisease": [
    {
      subKey: "respiratoryMentalImpact",
      subTitle: "Does this condition affect your mental health or daily functioning?",
      subType: "radio",
      options: ["Yes", "Sometimes", "No"],
      required: true,
    },
  ],
  "mh_cancer": [
    {
      subKey: "cancerMentalImpact",
      subTitle: "Does this condition affect your mental health or daily functioning?",
      subType: "radio",
      options: ["Yes", "Sometimes", "No"],
      required: true,
    },
  ],
  "mh_oralHealth": [
    {
      subKey: "oralHealthMentalImpact",
      subTitle: "Does this condition affect your mental health or daily functioning?",
      subType: "radio",
      options: ["Yes", "Sometimes", "No"],
      required: true,
    },
  ],
  "mh_otherCondition": [
    {
      subKey: "otherConditionMentalImpact",
      subTitle: "Does this condition affect your mental health or daily functioning?",
      subType: "radio",
      options: ["Yes", "Sometimes", "No"],
      required: true,
    },
    {
      subKey: "otherConditionDetails",
      subTitle: "Please specify your condition:",
      subType: "text",
      placeholder: "Enter your specific health condition",
      required: true,
    },
  ],
  "mentalHealthCondition": [
    {
      subKey: "mentalHealthDiagnosis",
      subTitle: "Which condition(s) have you been diagnosed with?",
      subType: "multiselect",
      options: [
        { id: "depression", label: "Depression" },
        { id: "anxiety", label: "Anxiety" },
        { id: "bipolar", label: "Bipolar disorder" },
        { id: "adhd", label: "ADHD" },
        { id: "ptsd", label: "PTSD" },
        { id: "otherDiagnosis", label: "Other (please specify)" },
      ],
      required: true,
    },
    {
      subKey: "mentalHealthTreatment",
      subTitle: "Are you currently receiving any treatment or support?",
      subType: "multiselect",
      options: [
        { id: "medication", label: "Medication prescribed by a doctor" },
        { id: "counseling", label: "Counseling / psychotherapy" },
        { id: "otherTherapies", label: "Other therapies (e.g., group therapy, support groups)" },
        { id: "noneTreatment", label: "None" },
      ],
      required: true,
    },
  ],

  // Treatment type follow-ups
  "medication": [
    {
      subKey: "medicationDetails",
      subTitle: "Please provide details about your medication:",
      subType: "medications",
      required: true,
      defaultData: [{ id: 1, name: "", routine: "Morning", dose: "", duration: "", sideEffects: "" }],
      routineOptions: ["Morning", "Noon", "Evening", "Night", "As Needed"],
    },
  ],
  "counseling": [
    {
      subKey: "counselingDetails",
      subTitle: "Please provide details about your counseling/therapy:",
      subType: "text",
      placeholder: "Type and frequency (e.g., CBT weekly)",
      required: true,
    },
  ],
  "otherTherapies": [
    {
      subKey: "otherTherapyDetails",
      subTitle: "Please provide details about your other therapies:",
      subType: "text",
      placeholder: "Type and frequency (e.g., group therapy bi-weekly)",
      required: true,
    },
  ],

  // Mental impact answers follow-ups
  "Yes": [
    {
      subKey: "mentalImpactAreas",
      subTitle: "How does it affect you?",
      subType: "multiselect",
      options: [
        { id: "causesStress", label: "Causes stress / anxiety" },
        { id: "lowersMood", label: "Lowers mood / depressive feelings" },
        { id: "affectsSleep", label: "Affects sleep" },
        { id: "affectsEnergy", label: "Affects energy / motivation" },
        { id: "affectsRelationships", label: "Affects social relationships" },
        { id: "otherImpact", label: "Other (please specify)" },
      ],
      required: true,
    },
  ],
  "Sometimes": [
    {
      subKey: "mentalImpactAreasSometimes",
      subTitle: "Which aspects are sometimes affected?",
      subType: "multiselect",
      options: [
        { id: "causesStressSometimes", label: "Causes stress / anxiety" },
        { id: "lowersMoodSometimes", label: "Lowers mood / depressive feelings" },
        { id: "affectsSleepSometimes", label: "Affects sleep" },
        { id: "affectsEnergySometimes", label: "Affects energy / motivation" },
        { id: "affectsRelationshipsSometimes", label: "Affects social relationships" },
        { id: "otherImpactSometimes", label: "Other (please specify)" },
      ],
      required: true,
    },
  ],

  // Other impact details
  "otherImpact": [
    {
      subKey: "otherImpactDetails",
      subTitle: "Please specify other ways it affects you:",
      subType: "text",
      placeholder: "Describe other impacts on your mental health",
      required: true,
    },
  ],
  "otherImpactSometimes": [
    {
      subKey: "otherImpactDetailsSometimes",
      subTitle: "Please specify other ways it sometimes affects you:",
      subType: "text",
      placeholder: "Describe other impacts on your mental health",
      required: true,
    },
  ],

  // Step 3: Lifestyle Follow-ups
  "poorSleep": [
    {
      subKey: "sleepDisruption",
      subTitle: "What usually disrupts your sleep?",
      subType: "multiselect",
      options: [
        { id: "stressAnxiety", label: "Stress / anxiety" },
        { id: "screenTime", label: "Screen time / late-night phone use" },
        { id: "familyResponsibilities", label: "Family responsibilities" },
        { id: "healthIssuesSleep", label: "Health issues" },
      ],
      required: true,
    },
  ],
  "sedentary": [
    {
      subKey: "movementBarriers",
      subTitle: "What prevents you from moving more?",
      subType: "multiselect",
      options: [
        { id: "lackTime", label: "Lack of time" },
        { id: "lackMotivation", label: "Lack of motivation" },
        { id: "physicalLimitations", label: "Physical limitations" },
        { id: "dontKnowWhatToDo", label: "Don't know what to do" },
      ],
      required: true,
    },
  ],
  "irregularMeals": [
    {
      subKey: "mealPatterns",
      subTitle: "Which meals are usually skipped or unhealthy?",
      subType: "multiselect",
      options: [
        { id: "breakfast", label: "Breakfast" },
        { id: "lunch", label: "Lunch" },
        { id: "dinner", label: "Dinner" },
        { id: "snacks", label: "Snacks / sugary drinks" },
        { id: "fastFood", label: "Mostly fast food / processed meals" },
      ],
      required: true,
    },
  ],

  // Step 4: Mental & Emotional State Follow-ups
  "Rarely -- I feel calm most of the time": [
    {
      subKey: "stressRarelyFollowUp",
      subTitle: "That's great! Would you like tips on maintaining your calm mood?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
],

"Sometimes -- stress a few times a week": [
    {
      subKey: "stressSometimesFollowUp",
      subTitle: "When you feel stressed a few times a week, what is the main trigger?",
      subType: "multiselect",
      options: [
        { id: "work", label: "Work/Studies" },
        { id: "family", label: "Family/Relationships" },
        { id: "financial", label: "Financial Concerns" },
        { id: "other", label: "Other" },
      ],
      required: true,
    },
],

  "Often -- stress or low mood is frequent": [
    {
      subKey: "stressSymptoms",
      subTitle: "When you feel stressed or low, what do you notice first?",
      subType: "multiselect",
      options: [
        { id: "lackMotivation", label: "Lack of motivation" },
        { id: "racingThoughts", label: "Racing thoughts / worry" },
        { id: "fatigue", label: "Fatigue / low energy" },
        { id: "irritability", label: "Irritability / mood swings" },
        { id: "tension", label: "Tension / headaches" },
        { id: "sleepProblems", label: "Sleep problems" },
        { id: "otherSymptoms", label: "Other (please specify)" },
      ],
      required: true,
    },
  ],
  "Almost always -- I feel overwhelmed nearly every day": [
    {
      subKey: "stressSymptomsOverwhelmed",
      subTitle: "When you feel stressed or low, what do you notice first?",
      subType: "multiselect",
      options: [
        { id: "lackMotivationOverwhelmed", label: "Lack of motivation" },
        { id: "racingThoughtsOverwhelmed", label: "Racing thoughts / worry" },
        { id: "fatigueOverwhelmed", label: "Fatigue / low energy" },
        { id: "irritabilityOverwhelmed", label: "Irritability / mood swings" },
        { id: "tensionOverwhelmed", label: "Tension / headaches" },
        { id: "sleepProblemsOverwhelmed", label: "Sleep problems" },
        { id: "otherSymptomsOverwhelmed", label: "Other (please specify)" },
      ],
      required: true,
    },
  ],

  // Recent Feelings Follow-ups
  "hopeless": [
    {
      subKey: "hopelessFrequency",
      subTitle: "How often do you feel hopeless?",
      subType: "radio",
      options: ["Rarely (a few days in the month)", "Sometimes (a few days each week)", "Often (most days)", "Almost always"],
      required: true,
    },
    {
      subKey: "hopelessMotivation",
      subTitle: "Does this affect your motivation to do daily tasks?",
      subType: "radio",
      options: ["Yes, a lot", "Sometimes", "No"],
      required: true,
    },
  ],
  "concentration": [
    {
      subKey: "concentrationAreas",
      subTitle: "In which areas do you notice poor concentration most?",
      subType: "multiselect",
      options: [
        { id: "studiesWork", label: "Studies/work" },
        { id: "dailyChores", label: "Daily chores/household" },
        { id: "conversations", label: "Conversations/social life" },
        { id: "otherConcentration", label: "Other" },
      ],
      required: true,
    },
    {
      subKey: "concentrationPerformance",
      subTitle: "Has this caused problems with performance (work, studies, daily tasks)?",
      subType: "radio",
      options: ["Yes", "Sometimes", "No"],
      required: true,
    },
  ],
  "lossInterest": [
    {
      subKey: "interestAreas",
      subTitle: "Which activities have you lost interest in?",
      subType: "multiselect",
      options: [
        { id: "hobbies", label: "Hobbies/leisure" },
        { id: "socialActivities", label: "Spending time with friends/family" },
        { id: "workStudies", label: "Work/studies" },
        { id: "selfCare", label: "Self-care/personal goals" },
        { id: "otherInterest", label: "Other" },
      ],
      required: true,
    },
    {
      subKey: "interestImpact",
      subTitle: "How much does this affect your daily life?",
      subType: "radio",
      options: ["A lot -- I avoid most activities", "Somewhat -- I still do things but without interest", "Little to none"],
      required: true,
    },
  ],
  "nervousness": [
    {
      subKey: "anxietySymptoms",
      subTitle: "When you feel anxious, what happens most?",
      subType: "multiselect",
      options: [
        { id: "racingThoughtsAnxiety", label: "Racing thoughts" },
        { id: "restlessness", label: "Restlessness / can't relax" },
        { id: "physicalSymptoms", label: "Fast heartbeat / body tension" },
        { id: "avoidance", label: "Avoiding situations" },
      ],
      required: true,
    },
    {
      subKey: "worryImpact",
      subTitle: "How often does worry stop you from doing things you want/need to do?",
      subType: "radio",
      options: ["Very often", "Sometimes", "Rarely", "Never"],
      required: true,
    },
  ],
  "sleepIssues": [
    {
      subKey: "sleepProblemsType",
      subTitle: "Which of these best describes your sleep issue?",
      subType: "multiselect",
      options: [
        { id: "troubleFallingAsleep", label: "Trouble falling asleep" },
        { id: "wakeUpOften", label: "Wake up often at night" },
        { id: "wakeUpEarly", label: "Wake up too early" },
        { id: "sleepingTooMuch", label: "Sleeping too much" },
      ],
      required: true,
    },
    {
      subKey: "sleepRestfulness",
      subTitle: "Do you feel rested after sleep?",
      subType: "radio",
      options: ["Rarely / Never", "Sometimes", "Yes, most of the time"],
      required: true,
    },
  ],
  "sadness": [
    {
      subKey: "sadnessFrequency",
      subTitle: "How many days in the past month did you feel this way?",
      subType: "radio",
      options: ["Less than 5 days", "5-10 days", "More than 10 days", "Almost every day"],
      required: true,
    },
    {
      subKey: "sadnessImpact",
      subTitle: "Did this sadness affect your daily routine (work, studies, relationships, self-care)?",
      subType: "radio",
      options: ["Yes, significantly", "Yes, somewhat", "No"],
      required: true,
    },
  ],

  // Step 5: Root Causes Follow-ups
  "workStudies": [
    {
      subKey: "workStudiesImpact",
      subTitle: "Does this affect your sleep, energy, or relationships?",
      subType: "radio",
      options: ["Yes", "Sometimes", "No"],
      required: true,
    },
  ],
  "family": [
    {
      subKey: "familyImpact",
      subTitle: "Does this limit your personal time or self-care?",
      subType: "radio",
      options: ["Yes", "Sometimes", "No"],
      required: true,
    },
  ],
  "financial": [
    {
      subKey: "financialImpact",
      subTitle: "Do financial concerns impact your mood or motivation?",
      subType: "radio",
      options: ["Yes", "Sometimes", "No"],
      required: true,
    },
  ],
  "healthLifestyle": [
    {
      subKey: "healthLifestyleImpact",
      subTitle: "Do you feel tired or low energy due to lifestyle habits?",
      subType: "radio",
      options: ["Yes", "Sometimes", "No"],
      required: true,
    },
  ],
  "social": [
    {
      subKey: "socialImpact",
      subTitle: "Do you feel isolated or unsupported?",
      subType: "radio",
      options: ["Yes", "Sometimes", "No"],
      required: true,
    },
  ],

  // --- END MENTAL HEALTH FOLLOW-UPS ---

  // --- PHYSICAL ACTIVITY FOLLOW-UPS ---
  // Q1: Baseline Activity Level Follow-ups
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
        { id: "nothing", label: "Nothing" },
      ],
      required: true,
    },
  ],

  "Light movement (walks, chores, light activity)": [
    {
      subKey: "barriers",
      subTitle: "What usually makes it hard for you to be more active?",
      subType: "multiselect",
      options: [
        { id: "lackTime", label: "Lack of time" },
        { id: "lackMotivation", label: "Lack of motivation" },
        { id: "physicalLimitations", label: "Physical limitations / health issues" },
        { id: "dontKnow", label: "Don't know what to do" },
        { id: "nothing", label: "Nothing" },
      ],
      required: true,
    },
  ],

  "Moderate activity (exercise 3–4 days/week, brisk walking, cycling, sports)":
    [
      {
        subKey: "satisfaction",
        subTitle:
          "Do you feel your current routine gives you the results you want?",
        subType: "radio",
        options: [
          "Yes, I'm happy",
          "No, I feel stuck / not improving",
          "Not sure",
        ],
        required: true,
      },
    ],

  "Very active (exercise most days / vigorous workouts/sports)": [
    {
      subKey: "satisfaction",
      subTitle:
        "Do you feel your current routine gives you the results you want?",
      subType: "radio",
      options: [
        "Yes, I'm happy",
        "No, I feel stuck / not improving",
        "Not sure",
      ],
      required: true,
    },
  ],

  // Barrier follow-ups
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

  // Satisfaction follow-ups
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
      subTitle:
        "Would you like to focus more on strength, stamina, or flexibility?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],

  "Not sure": [
    {
      subKey: "varietySuggestions",
      subTitle:
        "Would you like us to suggest a variety to keep it interesting?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],

  // Maintenance direction follow-ups
  Maintain: [
    {
      subKey: "advancedGuidance",
      subTitle:
        "Would you like advanced guidance on recovery, stretching, or nutrition?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],

  "Push further": [
    {
      subKey: "structuredTraining",
      subTitle:
        "Would you like structured training (advanced strength, endurance, or sports-specific programs)?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],

  // Health conditions (Q2)
  Yes: [
    {
      subKey: "medicalConditions",
      subTitle:
        "Please select any conditions or injuries you have that may affect your exercise.",
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
        { id: "overweight", label: "Overweight and Obesity" },
        { id: "hypertension", label: "Hypertension" },
        { id: "coronaryHeart", label: "Coronary Heart Disease" },
        { id: "stroke", label: "Cerebrovascular Accidents" },
        { id: "diabetesMellitus", label: "Diabetes Mellitus" },
        { id: "kidneyDisease", label: "Chronic Kidney Diseases" },
        { id: "arthritis", label: "Arthritis" },
        { id: "other", label: "Other / Not listed" },
      ],
      required: true,
    },
  ],

  heartDisease: [
    {
      subKey: "heartControl",
      subTitle: "How would you describe your current condition?",
      subType: "radio",
      options: [
        "Well controlled with medication",
        "Sometimes fluctuates, but manageable",
        "Not well controlled / frequent issues",
      ],
      required: true,
    },
    {
      subKey: "heartClearance",
      subTitle: "Do you have medical clearance to exercise?",
      subType: "radio",
      options: ["Yes", "No", "Not sure"],
      required: true,
    },
  ],
  diabetes: [
    {
      subKey: "sugarManagement",
      subTitle: "How is your blood sugar usually managed?",
      subType: "radio",
      options: [
        "Controlled with medication or insulin",
        "Sometimes fluctuates",
        "Frequently unstable",
      ],
      required: true,
    },
    {
      subKey: "hypoglycemia",
      subTitle: "Do you experience frequent low sugar episodes (hypoglycemia)?",
      subType: "radio",
      options: ["Yes", "No", "Sometimes"],
      required: true,
    },
  ],
  jointIssues: [
    {
      subKey: "affectedAreas",
      subTitle: "Which areas are affected?",
      subType: "multiselect",
      options: [
        { id: "knees", label: "Knees" },
        { id: "hips", label: "Hips" },
        { id: "back", label: "Back" },
        { id: "multiple", label: "Multiple areas" },
      ],
      required: true,
    },
    {
      subKey: "limitLevel",
      subTitle: "How much does this limit your movement?",
      subType: "radio",
      options: [
        "Mild (can move with little discomfort)",
        "Moderate (some exercises are difficult)",
        "Severe (movement is very limited / painful)",
      ],
      required: true,
    },
  ],
  respiratory: [
    {
      subKey: "respiratorySymptoms",
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
    },
  ],
  surgery: [
    {
      subKey: "surgeryTiming",
      subTitle: "When did this occur?",
      subType: "radio",
      options: [
        "Less than 2 weeks ago",
        "Less than 1 month ago",
        "Less than 3 months ago",
        "3–6 months ago",
        "More than 6 months ago",
      ],
      required: true,
    },
    {
      subKey: "recoveryPlan",
      subTitle:
        "Are you currently under a doctor's or physiotherapist's recovery plan?",
      subType: "radio",
      options: ["Yes", "No", "Not sure"],
      required: true,
    },
  ],
  tobacco: [
    {
      subKey: "tobaccoFrequencyPA",
      subTitle: "How often do you smoke?",
      subType: "radio",
      options: ["Daily", "A few times a week", "Occasionally", "Rarely"],
      required: true,
    },
    {
      subKey: "tobaccoStamina",
      subTitle:
        "Would you like us to suggest tips for improving stamina if you continue smoking?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  alcohol: [
    {
      subKey: "alcoholFrequencyPA",
      subTitle: "How often do you drink alcohol?",
      subType: "radio",
      options: ["Daily", "Weekly", "Occasionally", "Rarely"],
      required: true,
    },
    {
      subKey: "alcoholQuantityPA",
      subTitle: "On days you drink, how many drinks do you usually have?",
      subType: "radio",
      options: ["1–2", "3–4", "5+"],
      required: true,
    },
  ],
  drugs: [
    {
      subKey: "drugFrequency",
      subTitle: "How often do you use recreational drugs?",
      subType: "radio",
      options: ["Daily", "Weekly", "Occasionally", "Rarely"],
      required: true,
    },
    {
      subKey: "saferExercise",
      subTitle:
        "Would you like us to suggest safer exercise options that consider your lifestyle?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  other: [
    {
      subKey: "otherConditionDetailsPA",
      subTitle: "Please briefly describe your condition.",
      subType: "text",
      placeholder: "e.g., Arthritis, Chronic Pain",
      required: true,
    },
    {
      subKey: "safeLowIntensity",
      subTitle:
        "Would you like us to recommend only safe, low-intensity activities to start with?",
      subType: "radio",
      options: ["Yes", "No", "Not sure"],
      required: true,
    },
  ],

  // Location follow-ups
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

  // Fitness goal follow-ups
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
  // --- END PA FOLLOW-UPS ---

  // ========== ALCOHOL FOLLOW-UPS ==========
  
  // Step 1: Frequency & Quantity Follow-ups (Q2)
  "Sometimes (1–2 times a week)": [
    {
      subKey: "alcoholQuantity",
      subTitle: "When you drink, how much do you usually have?",
      subType: "radio",
      options: ["1–2 drinks", "3–4 drinks", "5+ drinks"],
      required: true,
    },
  ],
  "Often (3–5 times a week)": [
    {
      subKey: "alcoholQuantity",
      subTitle: "When you drink, how much do you usually have?",
      subType: "radio",
      options: ["1–2 drinks", "3–4 drinks", "5+ drinks"],
      required: true,
    },
  ],
  "Daily or almost daily": [
    {
      subKey: "alcoholQuantity",
      subTitle: "When you drink, how much do you usually have?",
      subType: "radio",
      options: ["1–2 drinks", "3–4 drinks", "5+ drinks"],
      required: true,
    },
  ],

  // Step 3: Context & Triggers Follow-ups (Q4b Adaptive Follow-Ups)
  homeAlone: [
    {
      subKey: "homeAloneReason",
      subTitle: "When you drink at home, is it usually because you feel bored, lonely, or stressed?",
      subType: "radio",
      options: ["Boredom", "Loneliness", "Stress", "Habit", "Other"],
      required: true,
    },
  ],
  socialGatherings: [
    {
      subKey: "socialPressure",
      subTitle: "Do you feel pressured to drink in social settings, or is it mostly by choice?",
      subType: "radio",
      options: ["Peer pressure", "By choice", "Both"],
      required: true,
    },
  ],
  afterWork: [
    {
      subKey: "stressCoping",
      subTitle: "Do you usually drink as your main way to cope with stress?",
      subType: "radio",
      options: ["Yes, often", "Sometimes", "Rarely", "No"],
      required: true,
    },
  ],
  duringMeals: [
    {
      subKey: "mealDrinkingReason",
      subTitle: "Is drinking with meals more of a routine, cultural habit, or for taste/enjoyment?",
      subType: "radio",
      options: ["Routine", "Cultural", "For taste", "Other"],
      required: true,
    },
  ],
  weekendsOnly: [
    {
      subKey: "weekendDrinkingPattern",
      subTitle: "When you drink on weekends, is it usually moderate or heavy (more than 4–5 drinks at a time)?",
      subType: "radio",
      options: ["Always moderate", "Sometimes heavy", "Often heavy", "Not sure"],
      required: true,
    },
  ],
  otherContext: [
    {
      subKey: "otherContextDetails",
      subTitle: "Please describe when you usually drink.",
      subType: "text",
      placeholder: "e.g., During business meetings, at family events, etc.",
      required: true,
    },
  ],

  // Step 4: Consequences & Self-Reflection Follow-ups (Q5 Adaptive Follow-Ups)
  sleepEnergy: [
    {
      subKey: "sleepEnergyFrequency",
      subTitle: "How often do you notice these sleep or energy problems after drinking?",
      subType: "radio",
      options: ["Every time I drink", "Sometimes", "Rarely"],
      required: true,
    },
    {
      subKey: "sleepEnergyTips",
      subTitle: "Would you like tips on improving sleep and energy while managing alcohol?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  focusProductivity: [
    {
      subKey: "focusAffectedAreas",
      subTitle: "Do you notice this mainly at work, home, or both?",
      subType: "radio",
      options: ["Work", "Home", "Both"],
      required: true,
    },
    {
      subKey: "focusStrategies",
      subTitle: "Would you like strategies to maintain focus while reducing alcohol effects?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  familyTension: [
    {
      subKey: "conflictTiming",
      subTitle: "Do conflicts usually happen when you drink or after drinking?",
      subType: "radio",
      options: ["During drinking", "After drinking", "Both"],
      required: true,
    },
    {
      subKey: "conflictGuidance",
      subTitle: "Would you like guidance on reducing social conflicts related to alcohol?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],
  healthImpact: [
    {
      subKey: "doctorAdvice",
      subTitle: "Have you been told by a doctor that alcohol is affecting your health?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],
  noIssues: [
    {
      subKey: "healthRiskAssessment",
      subTitle: "Even if you haven't noticed effects, alcohol can still impact long-term health. Would you like a personalized health risk assessment?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],

  // Doctor Advice Follow-ups
  doctorAdviceYes: [
    {
      subKey: "healthAreasAffected",
      subTitle: "Which health area is most affected?",
      subType: "multiselect",
      options: [
        { id: "liver", label: "Liver" },
        { id: "heartBP", label: "Heart/Blood pressure" },
        { id: "digestion", label: "Digestion" },
        { id: "weight", label: "Weight" },
        { id: "brainMental", label: "Brain & mental health" },
        { id: "cancer", label: "Cancer" },
        { id: "none", label: "None of above" },
        { id: "otherHealth", label: "Other" },
      ],
      required: true,
    },
  ],
  doctorAdviceNo: [
    {
      subKey: "healthInfo",
      subTitle: "Would you like us to provide information on how alcohol may affect your health?",
      subType: "radio",
      options: ["Yes", "Maybe", "No"],
      required: true,
    },
  ],

  // Specific Health Areas Affected Follow-ups (Q6a) - FIXED KEYS
  liver: [
    {
      subKey: "liverDiagnosis",
      subTitle: "Has a doctor diagnosed liver damage or elevated liver enzymes?",
      subType: "radio",
      options: ["Yes, confirmed diagnosis", "Suspected / borderline results", "No"],
      required: true,
    },
    {
      subKey: "alcoholAvoidance",
      subTitle: "Have you been advised to avoid alcohol completely?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],
  heartBP: [
    {
      subKey: "heartConditionLink",
      subTitle: "Has alcohol been linked to your blood pressure or heart condition?",
      subType: "radio",
      options: ["Yes, diagnosed condition", "Suspected / borderline", "No"],
      required: true,
    },
    {
      subKey: "medicalClearance",
      subTitle: "Do you have medical clearance to drink in moderation?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],
  digestion: [
    {
      subKey: "digestiveIssues",
      subTitle: "Which digestive issues are affected?",
      subType: "radio",
      options: ["Stomach irritation / gastritis", "Acid reflux / heartburn", "Pancreatitis", "Other"],
      required: true,
    },
    {
      subKey: "symptomWorsening",
      subTitle: "Have symptoms worsened after drinking?",
      subType: "radio",
      options: ["Yes, frequently", "Sometimes", "Rarely"],
      required: true,
    },
  ],
  weight: [
    {
      subKey: "weightConcern",
      subTitle: "Are you concerned about alcohol contributing to weight gain?",
      subType: "radio",
      options: ["Yes", "Somewhat", "No"],
      required: true,
    },
  ],
  brainMental: [
    {
      subKey: "brainMentalImpact",
      subTitle: "Has alcohol been linked to your mental health or cognitive function?",
      subType: "radio",
      options: ["Yes, diagnosed condition", "Suspected / borderline", "No"],
      required: true,
    },
    {
      subKey: "mentalHealthClearance",
      subTitle: "Have you been advised to reduce or stop drinking for mental health reasons?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],
  cancer: [
    {
      subKey: "cancerAlcoholLink",
      subTitle: "Has your doctor advised limiting alcohol due to cancer risk or history?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
    {
      subKey: "cancerAlcoholGuidance",
      subTitle: "Have you received specific guidance on alcohol consumption?",
      subType: "radio",
      options: ["Yes, avoid completely", "Yes, limit to occasional", "No specific guidance"],
      required: true,
    },
  ],
  otherHealth: [
    {
      subKey: "otherHealthDetails",
      subTitle: "Please specify the health impact.",
      subType: "text",
      placeholder: "e.g., Mental health, skin conditions, etc.",
      required: true,
    },
  ],

  // ========== TOBACCO FOLLOW-UPS ==========
  "I used in the past, but quit": [
    {
      subKey: "quitDuration",
      subTitle: "How long ago did you quit?",
      subType: "radio",
      options: [
        "Less than 1 month ago",
        "1-6 months ago",
        "6-12 months ago",
        "More than 1 year ago",
      ],
      required: true,
    },
  ],
  cigarettes: [
    {
      subKey: "cigarettesQuantity",
      subTitle:
        "For cigarettes, how many do you smoke per day (for daily) or per week (for weekly/occasional)?",
      subType: "text",
      placeholder: "e.g., 10 per day, 20 per week",
      required: false,
    },
  ],
  beedi: [
    {
      subKey: "beediQuantity",
      subTitle:
        "For beedi, how many do you smoke per day (for daily) or per week (for weekly/occasional)?",
      subType: "text",
      placeholder: "e.g., 5 per day, 15 per week",
      required: false,
    },
  ],
  chewingTobacco: [
    {
      subKey: "chewingQuantity",
      subTitle:
        "For chewing tobacco/betel leaves, how many leaves/grams per day (or per week)?",
      subType: "text",
      placeholder: "e.g., 3 leaves per day, 10 grams per week",
      required: false,
    },
  ],
  otherDrugs: [
    {
      subKey: "otherDrugsFrequency",
      subTitle: "For other drugs, what is the frequency per week/day?",
      subType: "text",
      placeholder: "e.g., 2 times per week, daily",
      required: false,
    },
  ],

  // ========== SLEEP FOLLOW-UPS ==========
  
  // Q3: Sleep Disorder Diagnosis Follow-ups
  Yes: [
    {
      subKey: "sleepTreatments",
      subTitle:
        "Are you currently using any treatments, medications, or supplements for sleep?",
      subType: "multiselect",
      options: [
        { id: "prescription", label: "Prescription medication" },
        { id: "overTheCounter", label: "Over-the-counter sleep aids" },
        { id: "herbal", label: "Herbal / natural remedies" },
        { id: "noneTreatment", label: "None" },
      ],
      required: true,
    },
  ],

  // Sleep treatment type follow-ups
  prescription: [
    {
      subKey: "prescriptionDetails",
      subTitle: "Please provide details for your prescription medication:",
      subType: "medications",
      required: true,
      defaultData: [{ id: 1, name: "", routine: "Night", dose: "", duration: "" }],
      routineOptions: ["Morning", "Noon", "Evening", "Night", "As Needed"],
    },
  ],

  overTheCounter: [
    {
      subKey: "otcDetails",
      subTitle: "Please provide details for over-the-counter sleep aids:",
      subType: "medications",
      required: true,
      defaultData: [{ id: 1, name: "", routine: "Night", dose: "", duration: "" }],
      routineOptions: ["Morning", "Noon", "Evening", "Night", "As Needed"],
    },
  ],

  herbal: [
    {
      subKey: "herbalDetails",
      subTitle: "Please provide details for herbal/natural remedies:",
      subType: "medications",
      required: true,
      defaultData: [{ id: 1, name: "", routine: "Night", dose: "", duration: "" }],
      routineOptions: ["Morning", "Noon", "Evening", "Night", "As Needed"],
    },
  ],

  // Q4: Sleep Challenge Follow-ups
  "Difficulty falling asleep": [
    {
      subKey: "fallingAsleepReason",
      subTitle:
        "When you're trying to fall asleep, what is the primary thing keeping you awake?",
      subType: "radio",
      options: [
        "Racing thoughts / Stress / Anxiety",
        "Physical discomfort (pain, heat, noise, hunger)",
        "Not feeling tired (too much energy, late activity)",
      ],
      required: true,
    },
  ],

  "Waking up frequently during the night": [
    {
      subKey: "wakingUpReason",
      subTitle: "When you wake up at night, what usually causes it?",
      subType: "radio",
      options: [
        "Need to use the bathroom",
        "Temperature (too hot or too cold)",
        "Noise or a partner's movement",
        "I just woke up and can't go back to sleep (no clear reason)",
      ],
      required: true,
    },
  ],

  "Waking up too early and can't go back to sleep": [
    {
      subKey: "earlyWakingReason",
      subTitle:
        "When you wake up too early, what is your first thought or feeling?",
      subType: "radio",
      options: [
        "Worrying about things I can't control (family, work, future)",
        "Hunger or a desire for a morning beverage",
        "It's just my internal clock; I feel done sleeping",
      ],
      required: true,
    },
  ],

  "Feeling unrefreshed/tired even after a full night's sleep": [
    {
      subKey: "unrefreshedFeeling",
      subTitle: "How do you feel after waking up?",
      subType: "radio",
      options: ["Crash mid-day", "Groggy, need caffeine", "Rarely feel rested"],
      required: true,
    },
  ],

  "My schedule is irregular (e.g., shift work)": [
    {
      subKey: "irregularScheduleReason",
      subTitle:
        "What is the main reason your bedtime and wake time change so much?",
      subType: "radio",
      options: [
        "Necessary late work/studying or early duties",
        "Social activities, chats or calls with friends or partner, late-night movies, or gaming",
        "I have no fixed schedule/routine",
      ],
      required: true,
    },
  ],

  // ========== DIFFICULTY FALLING ASLEEP BRANCHES ==========
  
  // Racing thoughts branch
  "Racing thoughts / Stress / Anxiety": [
    {
      subKey: "racingThoughtsContext",
      subTitle: "What is usually on your mind when trying to sleep?",
      subType: "multiselect",
      options: [
        { id: "academic", label: "Upcoming exams, assignments, or project deadlines" },
        { id: "professional", label: "Work emails or planning next day's meetings/tasks" },
        { id: "homeFamily", label: "Family logistics, chores, or well-being of others" },
        { id: "general", label: "General worries, anxious or restless feelings" },
      ],
      required: true,
    },
    {
      subKey: "mentalHealthDiagnosisSleep",
      subTitle: "Do you have any diagnosed mental health condition (anxiety, depression, stress disorder)?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],

  // Physical discomfort branch
  "Physical discomfort (pain, heat, noise, hunger)": [
    {
      subKey: "physicalDiscomfortType",
      subTitle: "Which discomfort is most common?",
      subType: "radio",
      options: ["Pain", "Noise", "Heat", "Hunger", "Other"],
      required: true,
    },
    {
      subKey: "physicalDiscomfortDiagnosis",
      subTitle: "Do you have a medical diagnosis related to this?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],

  // Not feeling tired branch
  "Not feeling tired (too much energy, late activity)": [
    {
      subKey: "caffeineBeforeBed",
      subTitle: "Do you drink tea/coffee/energy drinks within 4 hrs of bedtime?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
    {
      subKey: "lateActivity",
      subTitle: "Do you exercise or use screens late at night?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],

  // ========== WAKING UP FREQUENTLY BRANCHES ==========
  
  "Need to use the bathroom": [
    {
      subKey: "bathroomFrequency",
      subTitle: "How many times do you wake to urinate?",
      subType: "radio",
      options: ["1", "2", "3+"],
      required: true,
    },
    {
      subKey: "bathroomConditions",
      subTitle: "Do you have diabetes, prostate issues, or kidney/liver problems?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],

  "Temperature (too hot or too cold)": [
    {
      subKey: "temperatureSymptoms",
      subTitle: "Do you often wake sweating/throwing blankets?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
    {
      subKey: "temperatureManagement",
      subTitle: "Do you use a fan/AC or open windows?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],

  "Noise or a partner's movement": [
    {
      subKey: "noiseSource",
      subTitle: "Is it outside noise (traffic, dogs, neighbors) or inside (partner snoring, movement)?",
      subType: "radio",
      options: ["Outside noise", "Inside/partner noise"],
      required: true,
    },
  ],

  "I just woke up and can't go back to sleep (no clear reason)": [
    {
      subKey: "physicalSymptoms",
      subTitle: "Do you feel your heart racing or gasping for breath?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],

  // ========== EARLY WAKING BRANCHES ==========
  
  "Worrying about things I can't control (family, work, future)": [
    {
      subKey: "worryDuration",
      subTitle: "How long do you stay awake?",
      subType: "radio",
      options: ["<30 mins", "30-60 mins", ">1 hr"],
      required: true,
    },
    {
      subKey: "mentalHealthDiagnosisEarly",
      subTitle: "Any mental health diagnosis?",
      subType: "radio",
      options: ["Depression", "Anxiety", "None", "Other"],
      required: true,
    },
  ],

  "Hunger or a desire for a morning beverage": [
    {
      subKey: "lateEating",
      subTitle: "Do you eat heavy meals or drink tea/coffee close to bedtime?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],

  "It's just my internal clock; I feel done sleeping": [
    {
      subKey: "sleepDurationEarly",
      subTitle: "Average sleep duration when this happens?",
      subType: "radio",
      options: ["<6 hrs", "6-7 hrs", ">7 hrs"],
      required: true,
    },
  ],

  // ========== UNREFRESHED FEELING BRANCHES ==========
  
  "Crash mid-day": [
    {
      subKey: "napFrequency",
      subTitle: "Do you nap during the day?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],

  "Groggy, need caffeine": [
    {
      subKey: "morningPhoneUse",
      subTitle: "Do you check your phone immediately after waking?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],

  "Rarely feel rested": [
    {
      subKey: "averageSleepHours",
      subTitle: "Average hours of sleep?",
      subType: "radio",
      options: ["<6", "6-7.5", ">7.5"],
      required: true,
    },
  ],

  // ========== IRREGULAR SCHEDULE BRANCHES ==========
  
  "Necessary late work/studying or early duties": [
    {
      subKey: "lateCaffeine",
      subTitle: "On a late study/work night, are you usually consuming caffeinated drinks within 4 hours of sleep?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
    {
      subKey: "shiftWork",
      subTitle: "Does your work require you to be awake at different hours more than twice a week?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],

  "Social activities, chats or calls with friends or partner, late-night movies, or gaming": [
    {
      subKey: "eveningAlcohol",
      subTitle: "Do you drink alcohol at night?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
    {
      subKey: "eveningScreenUse",
      subTitle: "Do you use your phone/TV/games until bedtime?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],

  "I have no fixed schedule/routine": [
    {
      subKey: "lateBedtimeFrequency",
      subTitle: "Do you go to sleep later than midnight at least 3 times per week?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],

  // ========== NESTED FOLLOW-UPS ==========
  
  // Mental health diagnosis follow-up for racing thoughts
  "mentalHealthDiagnosisSleep_Yes": [
    {
      subKey: "sleepMedication",
      subTitle: "Are you on any sleep-related medication (sleeping pills, anti-anxiety, antidepressants)?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],

  // Sleep medication follow-up
  "sleepMedication_Yes": [
    {
      subKey: "sleepMedicationDetails",
      subTitle: "Please provide details for your sleep-related medication:",
      subType: "medications",
      required: true,
      defaultData: [{ id: 1, name: "", routine: "Night", dose: "", duration: "" }],
      routineOptions: ["Morning", "Noon", "Evening", "Night", "As Needed"],
    },
  ],

  // Physical discomfort type follow-ups
  "Pain": [
    {
      subKey: "painType",
      subTitle: "What type of pain?",
      subType: "radio",
      options: ["Arthritis", "Back pain", "Other"],
      required: true,
    },
  ],

  // Bathroom conditions follow-up
  "bathroomConditions_Yes": [
    {
      subKey: "diureticMedication",
      subTitle: "Do you take diuretic tablets?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],

  // Partner snoring follow-up
  "Inside/partner noise": [
    {
      subKey: "partnerBreathing",
      subTitle: "Partner snoring: Have you noticed pauses in their breathing?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],

  // Nap duration follow-up
  "napFrequency_Yes": [
    {
      subKey: "napDuration",
      subTitle: "Nap duration?",
      subType: "radio",
      options: ["<30 mins", ">30 mins"],
      required: true,
    },
  ],

  // Morning routine follow-up
  "morningPhoneUse_No": [
    {
      subKey: "morningSunlight",
      subTitle: "Do you get sunlight within 1 hr of waking?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],

  // Sleep hours follow-up
  "averageSleepHours_6-7.5": [
    {
      subKey: "alarmUse",
      subTitle: "Do you use an alarm regularly?",
      subType: "radio",
      options: ["Yes", "No"],
      required: true,
    },
  ],

  // Alcohol quantity follow-up
  "eveningAlcohol_Yes": [
    {
      subKey: "alcoholQuantity",
      subTitle: "How many drinks?",
      subType: "text",
      placeholder: "e.g., 2 glasses of wine, 3 beers",
      required: true,
    },
  ],
};

// Health condition specific follow-ups
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

const medicationQuestion = {
  subKey: "takingMedications",
  subTitle: "Are you currently taking medications?",
  subType: "radio",
  options: ["Yes", "No"],
  required: true,
};

// Conditional follow-up for the new cancer radio question's "Yes" answer
const cancerYesFollowUp = {
  subKey: "cancerAdviceDetails",
  subTitle: "Please describe your doctor's nutrition advice:",
  subType: "text",
  placeholder: "e.g., Low sugar, high protein, avoiding processed meats.",
  required: true,
};

// Conditional follow-up for the generic medication "Yes" answer
const medicationDetailsFollowUp = {
  subKey: "medicineDetails",
  subTitle: "Please provide details for each medication:",
  subType: "medications",
  required: true,
  defaultData: [{ id: 1, name: "", routine: "Morning", dose: "" }],
  routineOptions: ["Morning", "Noon", "Evening", "Night", "As Needed"],
};

// Conditional follow-up for "Other Condition" selection
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