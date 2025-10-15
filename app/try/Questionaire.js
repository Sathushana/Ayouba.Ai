// components/Questionnaire.js
"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  getQuestions,
  conditionalFollowUps,
  healthConditionFollowUps,
  substanceQuantityFollowUps,
} from "../data/questions";

const BRANCHING_KEYS = [
  "sex",
  "isPregnant",
  "diagnosedConditions",
  "dietType",
  "substanceUseNutrition",
  "activityLevel",
  "exerciseChallenge",
  "exerciseLocation",
  "wl_lifeSituation",
  "wl_dietType",
  "wl_substanceUse",
  "wl_triedBefore",
  "substanceType",
  "substanceFrequency",
  "substanceDetailsPlaceholder",
  "substanceSituations",
  "substanceConsequences",
  "mh_lifeSituation",
  "mh_medicalConditionAffects",
  "mh_dailyRoutine",
  "mh_stressFrequency",
  "mh_recentFeelings",
  "mh_rootCauses",
  "sleepDisorderDiagnosis",
  "sleepChallenge",
];

const APP_NAME = "Lifeshift";

export default function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(1);
  const [subStep, setSubStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const router = useRouter();

  const currentStepData = useMemo(
    () => questions.find((step) => step.id === currentStep),
    [questions, currentStep]
  );
  const isBranchingStep = useMemo(
    () =>
      currentStepData ? BRANCHING_KEYS.includes(currentStepData.key) : false,
    [currentStepData]
  );
  const totalSteps = questions.length;

  const currentAge = useMemo(() => parseInt(answers.age) || 0, [answers.age]);
  const currentSex = useMemo(() => answers.sex || "", [answers.sex]);
  const currentLifestyle = useMemo(
    () => answers.lifestyle || "",
    [answers.lifestyle]
  );

  const diagnosedConditions = useMemo(
    () => answers.diagnosedConditions || {},
    [answers.diagnosedConditions]
  );
  const substanceType = useMemo(
    () => answers.substanceType || {},
    [answers.substanceType]
  );
  const substanceFrequency = useMemo(
    () => answers.substanceFrequency || "",
    [answers.substanceFrequency]
  );
  const activityLevel = useMemo(
    () => answers.activityLevel || "",
    [answers.activityLevel]
  );
  const dietType = useMemo(() => answers.dietType || "", [answers.dietType]);
  const substanceUseNutrition = useMemo(
    () => answers.substanceUseNutrition || {},
    [answers.substanceUseNutrition]
  );
  const wlSubstanceUse = useMemo(
    () => answers.wl_substanceUse || {},
    [answers.wl_substanceUse]
  );
  const wlTriedBefore = useMemo(
    () => answers.wl_triedBefore || "",
    [answers.wl_triedBefore]
  );
  const mhMedicalConditionAffects = useMemo(
    () => answers.mh_medicalConditionAffects || "",
    [answers.mh_medicalConditionAffects]
  );
  const mhStressFrequency = useMemo(
    () => answers.mh_stressFrequency || "",
    [answers.mh_stressFrequency]
  );
  const mhRecentFeelings = useMemo(
    () => answers.mh_recentFeelings || {},
    [answers.mh_recentFeelings]
  );
  const sleepDisorderDiagnosis = useMemo(
    () => answers.sleepDisorderDiagnosis || "",
    [answers.sleepDisorderDiagnosis]
  );

  const followUpAnswers = useMemo(
    () => answers.followUps || {},
    [answers.followUps]
  );

  // --- Core State and Question Initialization ---

  useEffect(() => {
    const primaryGoals = answers.primaryGoals || [];
    const age = parseInt(answers.age) || 0;
    const sex = answers.sex || "";

    const allQuestions = getQuestions(primaryGoals, answers, age, sex);
    setQuestions(allQuestions);
  }, [answers.primaryGoals, answers.age, answers.sex]);

  // --- Adaptive Follow-up Logic Generation ---

  const [followUpQuestions, setFollowUpQuestions] = useState([]);

  useEffect(() => {
    if (!currentStepData || subStep !== 1) {
      setFollowUpQuestions([]);
      return;
    }

    const key = currentStepData.key;
    const baseAnswer = answers[key];
    const newFollowUps = [];

    // --- 1. BASE PROFILE (Pregnancy & Diagnosed Conditions) ---

    // Pregnancy check (Q2.1)
    if (key === "sex" && baseAnswer === "Female" && currentAge > 18) {
      const pregnantQ = conditionalFollowUps["pregnantQuestion"];
      if (pregnantQ) newFollowUps.push(pregnantQ);
    }

    // Diagnosed Conditions (Q6) -> 5.1 & 5.2
    if (key === "diagnosedConditions" && baseAnswer) {
      const selectedConditions = Object.keys(diagnosedConditions).filter(
        (c) => diagnosedConditions[c] && c !== "none"
      );

      if (selectedConditions.length > 0) {
        selectedConditions.forEach((conditionId) => {
          const followUpKeys = healthConditionFollowUps[conditionId];
          if (followUpKeys) {
            followUpKeys.forEach((followUpKey) => {
              if (Array.isArray(conditionalFollowUps[followUpKey])) {
                newFollowUps.push(
                  ...conditionalFollowUps[followUpKey].map((q) => ({
                    ...q,
                    parentKey: conditionId,
                  }))
                );
              } else if (conditionalFollowUps[followUpKey]) {
                const q = conditionalFollowUps[followUpKey];
                newFollowUps.push({ ...q, parentKey: conditionId });
              }
            });
          }
        });
      }
    }

    // --- 2. NUTRITION GOAL ---
    // Q1. Diet Type (Q1a/Q1b)
    if (key === "dietType" && baseAnswer) {
      const adaptiveDiets = [
        "Mostly vegetables and no meat (Vegetarian)",
        "Only plant-based foods, no meat, eggs, or dairy (Vegan)",
        "Mostly meat, eggs, and low in bread/rice/potatoes (Keto / Low-carb)",
      ];

      if (adaptiveDiets.includes(baseAnswer)) {
        const q = conditionalFollowUps[baseAnswer];
        if (q) newFollowUps.push(q);
      }
    }

    // Q2. Substance Use (Q2.1-Q2.4)
    if (key === "substanceUseNutrition" && baseAnswer) {
      const selectedSubstances = Object.keys(substanceUseNutrition).filter(
        (s) => substanceUseNutrition[s] && s !== "none"
      );
      selectedSubstances.forEach((substanceId) => {
        const q = conditionalFollowUps[`${substanceId}_nutrition`];
        if (q) newFollowUps.push({ ...q, parentKey: substanceId });
      });

      // Nested Q2.2 for alcohol frequency
      if (
        substanceUseNutrition.alcohol &&
        followUpAnswers.alcoholFrequencyNutrition
      ) {
        const freqKey = followUpAnswers.alcoholFrequencyNutrition;
        const quantityQ =
          conditionalFollowUps[`${freqKey}`] ||
          conditionalFollowUps["alcohol_quantity_nutrition"];
        if (quantityQ)
          newFollowUps.push({ ...quantityQ, parentKey: "alcoholQuantity" });
      }
    }

    // --- 3. ACTIVITY GOAL ---
    // Q1b: Barriers (if Mostly Sitting/Light Movement)
    if (
      (key === "activityLevel" || key === "exerciseChallenge") &&
      (activityLevel === "Mostly sitting (little or no exercise)" ||
        activityLevel === "Light movement (walks, chores, light activity)")
    ) {
      const barriersQ =
        conditionalFollowUps["Mostly sitting (little or no exercise)"];
      if (barriersQ) newFollowUps.push(barriersQ);

      // Nested barrier follow-ups
      if (followUpAnswers.activityBarriers) {
        Object.keys(followUpAnswers.activityBarriers)
          .filter((b) => followUpAnswers.activityBarriers[b] && b !== "nothing")
          .forEach((barrierId) => {
            const q = conditionalFollowUps[barrierId];
            if (q && q.subType !== "suggestion") newFollowUps.push(q);
          });
      }
    }

    // Q1c: Satisfaction (if Moderate/Very Active)
    if (
      (key === "activityLevel" || key === "exerciseChallenge") &&
      (activityLevel ===
        "Moderate activity (exercise 3–4 days/week, brisk walking, cycling, sports)" ||
        activityLevel ===
          "Very active (exercise most days / vigorous workouts/sports)")
    ) {
      const satisfactionQ =
        conditionalFollowUps[
          "Moderate activity (exercise 3–4 days/week, brisk walking, cycling, sports)"
        ];
      if (satisfactionQ) newFollowUps.push(satisfactionQ);

      // Nested satisfaction follow-ups
      const satisfaction = followUpAnswers.activitySatisfaction;
      if (satisfaction && conditionalFollowUps[satisfaction]) {
        newFollowUps.push(conditionalFollowUps[satisfaction]);
      }

      // Deeply nested Maintain/Push Further follow-ups
      if (
        satisfaction === "Yes, I'm happy" &&
        followUpAnswers.happyDirection &&
        conditionalFollowUps[followUpAnswers.happyDirection]
      ) {
        newFollowUps.push(conditionalFollowUps[followUpAnswers.happyDirection]);
      }
    }

    // Q3: Location
    if (
      key === "exerciseLocation" &&
      baseAnswer &&
      conditionalFollowUps[baseAnswer]
    ) {
      const q = conditionalFollowUps[baseAnswer];
      if (q && q.subType !== "suggestion") newFollowUps.push(q);
    }

    // --- 4. WEIGHT LOSS GOAL ---
    // WL Life Situation (Q8) - Adaptive based on BASE Q5
    if (key === "wl_lifeSituation" && currentLifestyle) {
      const questions = conditionalFollowUps[currentLifestyle];
      if (questions) {
        if (Array.isArray(questions)) {
          questions.forEach((q) => newFollowUps.push(q));
        } else {
          newFollowUps.push(questions);
        }
      }
    }

    // WL Diet Type (Q1a/Q1b)
    if (
      key === "wl_dietType" &&
      baseAnswer &&
      conditionalFollowUps[baseAnswer]
    ) {
      const q = conditionalFollowUps[baseAnswer];
      newFollowUps.push({ ...q, parentKey: "wl_dietType" });
    }

    // WL Substance Use (Q2.1-Q2.4)
    if (key === "wl_substanceUse" && baseAnswer) {
      const selectedSubstances = Object.keys(wlSubstanceUse).filter(
        (s) => wlSubstanceUse[s] && s !== "none"
      );
      selectedSubstances.forEach((substanceId) => {
        const q = conditionalFollowUps[`${substanceId}_nutrition`];
        if (q) newFollowUps.push({ ...q, parentKey: `wl_${substanceId}` });
      });

      if (
        wlSubstanceUse.alcohol &&
        followUpAnswers.alcoholFrequencyNutrition &&
        followUpAnswers.alcoholFrequencyNutrition !==
          "Rarely (special occasions)"
      ) {
        const freqKey = followUpAnswers.alcoholFrequencyNutrition;
        const q =
          conditionalFollowUps[`${freqKey}`] ||
          conditionalFollowUps["alcohol_quantity_nutrition"];
        if (q) newFollowUps.push({ ...q, parentKey: "wl_alcoholQuantity" });
      }
    }

    // WL Tried Before (Q1a/Q1b)
    if (
      key === "wl_triedBefore" &&
      wlTriedBefore === "Yes" &&
      conditionalFollowUps.Yes
    ) {
      conditionalFollowUps.Yes.forEach((q) => newFollowUps.push(q));
    }

    // --- 5. SUBSTANCE GOAL ---
    // Q2: Frequency (Q2a)
    if (
      key === "substanceFrequency" &&
      substanceFrequency === "I used in the past, but quit" &&
      conditionalFollowUps[substanceFrequency]
    ) {
      newFollowUps.push(conditionalFollowUps[substanceFrequency]);
    }

    // Q3: Quantity/Details
    if (key === "substanceDetailsPlaceholder" && baseAnswer) {
      const selectedSubstances = Object.keys(substanceType).filter(
        (s) => substanceType[s] && s !== "none"
      );
      selectedSubstances.forEach((substanceId) => {
        const quantityKey = substanceQuantityFollowUps[substanceId];
        if (quantityKey) {
          const q = conditionalFollowUps[quantityKey];
          if (q) newFollowUps.push({ ...q, parentKey: substanceId });
        }

        // Special handling for alcohol frequency in substance goal
        if (
          substanceId === "alcohol" &&
          substanceFrequency &&
          substanceFrequency !== "I used in the past, but quit"
        ) {
          const freqQ = conditionalFollowUps["alcohol"];
          if (freqQ && Array.isArray(freqQ)) {
            freqQ.forEach((q) =>
              newFollowUps.push({ ...q, parentKey: "alcohol_frequency" })
            );
          }

          // Nested alcohol quantity
          if (
            followUpAnswers.alcoholFrequencyGoal &&
            followUpAnswers.alcoholFrequencyGoal !==
              "Rarely (special occasions only)"
          ) {
            const quantityQ =
              conditionalFollowUps[
                `${followUpAnswers.alcoholFrequencyGoal}_goal`
              ] || conditionalFollowUps["Sometimes (1–2 times a week)_goal"];
            if (quantityQ)
              newFollowUps.push({
                ...quantityQ,
                parentKey: "alcohol_quantity",
              });
          }
        }
      });
    }

    // Q6: Situations for Use
    if (key === "substanceSituations" && baseAnswer) {
      Object.keys(baseAnswer)
        .filter((s) => baseAnswer[s])
        .forEach((situationId) => {
          const q = conditionalFollowUps[situationId];
          if (q && !Array.isArray(q)) newFollowUps.push(q);
        });
    }

    // Consequences & Self-Reflection
    if (key === "substanceConsequences" && baseAnswer) {
      Object.keys(baseAnswer)
        .filter((c) => baseAnswer[c] && c !== "noNoticeableIssues")
        .forEach((consequenceId) => {
          const questionsArray = conditionalFollowUps[consequenceId];
          if (questionsArray) {
            if (Array.isArray(questionsArray)) {
              questionsArray.forEach((q) => newFollowUps.push(q));
            } else {
              newFollowUps.push(questionsArray);
            }
          }
        });
    }

    // --- 6. MENTAL HEALTH GOAL ---
    // Life Situation (Adaptive based on lifestyle)
    if (key === "mh_lifeSituation" && currentLifestyle) {
      const lifeSituationQ = conditionalFollowUps[currentLifestyle];
      if (lifeSituationQ) {
        if (Array.isArray(lifeSituationQ)) {
          lifeSituationQ.forEach((q) => newFollowUps.push(q));
        } else {
          newFollowUps.push(lifeSituationQ);
        }
      }
    }

    // Q1. Medical condition affects mental health
    if (
      key === "mh_medicalConditionAffects" &&
      mhMedicalConditionAffects === "Yes"
    ) {
      newFollowUps.push(conditionalFollowUps.mh_medicalConditionAffects_Yes);
    }

    // Q2. Daily Routine Adaptive Follow-ups
    if (key === "mh_dailyRoutine" && baseAnswer) {
      Object.keys(baseAnswer)
        .filter((r) => baseAnswer[r])
        .forEach((routineKey) => {
          const q = conditionalFollowUps[routineKey];
          if (q) newFollowUps.push(q);
        });
    }

    // Q4. Stress Frequency Adaptive Follow-ups
    if (
      key === "mh_stressFrequency" &&
      mhStressFrequency &&
      conditionalFollowUps[mhStressFrequency]
    ) {
      const q = conditionalFollowUps[mhStressFrequency];
      if (q) newFollowUps.push(q);
    }

    // Q3. Recent Feelings Adaptive Follow-ups
    if (key === "mh_recentFeelings" && baseAnswer) {
      Object.keys(mhRecentFeelings)
        .filter((f) => mhRecentFeelings[f] && f !== "noneFeelings")
        .forEach((feelingKey) => {
          const q = conditionalFollowUps[feelingKey];
          if (q) newFollowUps.push(q);
        });
    }

    // Q1. Root Causes Adaptive Follow-ups
    if (key === "mh_rootCauses" && baseAnswer) {
      Object.keys(baseAnswer)
        .filter((c) => baseAnswer[c])
        .forEach((causeKey) => {
          const q = conditionalFollowUps[causeKey];
          if (q) newFollowUps.push(q);
        });
    }

    // --- 7. SLEEP GOAL ---
    // Q2. Sleep Disorder Diagnosis
    if (key === "sleepDisorderDiagnosis" && sleepDisorderDiagnosis === "Yes") {
      newFollowUps.push(conditionalFollowUps.sleepDisorderDiagnosis_Yes);
    }

    // Q3. Biggest Sleep Challenge Adaptive Flow
    if (
      key === "sleepChallenge" &&
      baseAnswer &&
      conditionalFollowUps[baseAnswer]
    ) {
      newFollowUps.push(conditionalFollowUps[baseAnswer]);
    }

    // Set final, deduplicated list
    const uniqueFollowUps = newFollowUps.filter(
      (q, i, arr) => arr.findIndex((t) => t.subKey === q.subKey) === i
    );
    setFollowUpQuestions(uniqueFollowUps);
  }, [
    currentStepData,
    subStep,
    currentAge,
    currentSex,
    currentLifestyle,
    diagnosedConditions,
    substanceType,
    substanceFrequency,
    activityLevel,
    dietType,
    substanceUseNutrition,
    wlSubstanceUse,
    wlTriedBefore,
    mhMedicalConditionAffects,
    mhStressFrequency,
    mhRecentFeelings,
    sleepDisorderDiagnosis,
    followUpAnswers,
  ]);

  // --- Utility Functions ---
  const isAnyConditionSelected = useCallback(
    (conditions) =>
      Object.entries(conditions || {}).some(
        ([key, isSelected]) => isSelected && key !== "none"
      ),
    []
  );

  const isAnySubstanceSelected = useCallback(
    (substances) =>
      Object.entries(substances || {}).some(
        ([key, isSelected]) => isSelected && key !== "none"
      ),
    []
  );

  const convertToMetric = useCallback((measurements) => {
    const { unitSystem, height, weight, heightFt, heightIn } = measurements;
    if (unitSystem === "Metric (cm, kg)")
      return {
        heightCm: parseFloat(height) || 0,
        weightKg: parseFloat(weight) || 0,
      };
    if (unitSystem === "Imperial (ft/in, lbs)") {
      const totalInches =
        parseFloat(heightFt) * 12 + (parseFloat(heightIn) || 0);
      return {
        heightCm: totalInches * 2.54,
        weightKg: (parseFloat(weight) || 0) * 0.453592,
      };
    }
    return { heightCm: 0, weightKg: 0 };
  }, []);

  const calculateBMI = useCallback(
    (measurements) => {
      const { heightCm, weightKg } = convertToMetric(measurements);
      if (heightCm > 0 && weightKg > 0) {
        const heightM = heightCm / 100;
        const bmi = weightKg / (heightM * heightM);
        return bmi.toFixed(1);
      }
      return "N/A";
    },
    [convertToMetric]
  );

  const calculateSleepDuration = useCallback((bedtime, waketime) => {
    if (!bedtime || !waketime) return "N/A";
    const bed = new Date(`2000-01-01T${bedtime}`);
    let wake = new Date(`2000-01-01T${waketime}`);
    if (wake < bed) wake = new Date(wake.getTime() + 24 * 60 * 60 * 1000);
    const diffMs = wake - bed;
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHrs}h ${diffMins}m`;
  }, []);

  // --- Validation Logic ---
  const isStepValid = useCallback(() => {
    if (!currentStepData) return false;
    const currentAnswer = answers[currentStepData.key];

    // Case 1: Validation for Branching Steps
    if (isBranchingStep) {
      // subStep 0: Validate the base question
      if (subStep === 0) {
        if (!currentStepData.required) return true;

        if (currentStepData.type === "placeholder") return true;

        if (currentStepData.type === "multiselect")
          return Object.values(currentAnswer || {}).some((v) => v === true);
        if (currentStepData.type === "radio") return !!currentAnswer;
        return !!currentAnswer;
      }
      // subStep 1: Validate all conditional questions
      if (subStep === 1) {
        return followUpQuestions.every((q) => {
          if (!q.required) return true;

          const answer = followUpAnswers[q.subKey];

          // Special logic for Recent Surgery 9.4
          if (
            currentStepData.key === "diagnosedConditions" &&
            q.subKey === "surgeryCurrentSymptoms"
          ) {
            if (diagnosedConditions.recentSurgery) {
              return Object.values(answer || {}).some((v) => v === true);
            }
            return true;
          }

          if (q.subType === "radio") return !!answer;
          if (q.subType === "multiselect")
            return Object.values(answer || {}).some((v) => v === true);
          if (q.subType === "text" || q.subType === "textarea")
            return !!answer && answer.trim().length > 0;

          return true;
        });
      }
    }
    // Case 2: Validation for NON-Branching Steps
    else {
      if (!currentStepData.required) return true;
      if (!currentAnswer) return false;

      if (
        currentStepData.type === "text" ||
        currentStepData.type === "number" ||
        currentStepData.type === "radio"
      ) {
        return (
          !!currentAnswer &&
          (currentStepData.type === "text"
            ? currentAnswer.trim().length > 0
            : true)
        );
      }
      if (currentStepData.type === "multiselect") {
        const isMultiselectValid = Object.values(currentAnswer || {}).some(
          (v) => v === true
        );

        // Custom logic for Activity Type Preference's inline follow-up
        if (
          currentStepData.key === "activityTypePreference" &&
          currentAnswer.otherNotSure
        ) {
          return isMultiselectValid && !!answers.activitySuggestion;
        }

        return isMultiselectValid;
      }
      if (currentStepData.type === "measurements") {
        const { unitSystem, height, weight, heightFt, heightIn } =
          currentAnswer;
        if (!unitSystem) return false;
        if (unitSystem === "Metric (cm, kg)")
          return !!height && !!weight && height > 0 && weight > 0;
        if (unitSystem === "Imperial (ft/in, lbs)")
          return (
            !!weight &&
            weight > 0 &&
            (!!heightFt || heightFt === 0) &&
            (!!heightIn || heightIn === 0)
          );
        return false;
      }
      if (currentStepData.type === "sleepSchedule") {
        const { bedtime, waketime } = currentAnswer;
        return !!bedtime && !!waketime;
      }
      if (currentStepData.type === "placeholder") {
        return true;
      }
      return false;
    }
  }, [
    currentStepData,
    answers,
    isBranchingStep,
    subStep,
    followUpQuestions,
    followUpAnswers,
    diagnosedConditions,
  ]);

  // --- Navigation Handlers ---

  const handleNext = useCallback(() => {
    if (!isStepValid()) {
      console.log("Validation failed for current step.");
      return;
    }

    // A. If on a Branching Step's Base Question (subStep 0)
    if (isBranchingStep && subStep === 0) {
      // SPECIAL LOGIC: Placeholder steps immediately jump to subStep 1
      if (
        currentStepData.key === "wl_lifeSituation" ||
        currentStepData.key === "mh_lifeSituation"
      ) {
        setSubStep(1);
        return;
      }

      // Special logic to skip subStep 1 (Follow-ups) if no conditions/substances selected/relevant
      const isSkippingFollowUps = (() => {
        if (currentStepData.key === "sex") {
          // Only show pregnancy follow-up for females over 18
          return !(currentSex === "Female" && currentAge > 18);
        }
        if (currentStepData.key === "diagnosedConditions") {
  // We want to SKIP follow-ups only when NO conditions are selected
  return !isAnyConditionSelected(diagnosedConditions);
}

        // FIXED: Diet type logic - only show follow-ups for specific diets
        if (currentStepData.key === "dietType") {
          const adaptiveDiets = [
            "Mostly vegetables and no meat (Vegetarian)",
            "Only plant-based foods, no meat, eggs, or dairy (Vegan)",
            "Mostly meat, eggs, and low in bread/rice/potatoes (Keto / Low-carb)",
          ];
          return !adaptiveDiets.includes(dietType);
        }

        if (currentStepData.key === "substanceUseNutrition")
          return !isAnySubstanceSelected(substanceUseNutrition);
        if (currentStepData.key === "wl_substanceUse")
          return !isAnySubstanceSelected(wlSubstanceUse);
        if (currentStepData.key === "wl_triedBefore" && wlTriedBefore === "No")
          return true;
        if (
          currentStepData.key === "substanceType" &&
          (!substanceType || substanceType.none)
        )
          return true;
        if (
          currentStepData.key === "substanceFrequency" &&
          substanceFrequency === "I used in the past, but quit"
        )
          return false;
        if (
          currentStepData.key === "substanceDetailsPlaceholder" &&
          (!substanceType || substanceType.none)
        )
          return true;
        if (
          currentStepData.key === "substanceSituations" &&
          answers.substanceSituations?.otherSituation
        )
          return false;
        if (
          currentStepData.key === "substanceConsequences" &&
          answers.substanceConsequences?.noNoticeableIssues
        )
          return true;

        if (
          currentStepData.key === "mh_medicalConditionAffects" &&
          mhMedicalConditionAffects === "No"
        )
          return true;
        if (
          currentStepData.key === "mh_stressFrequency" &&
          mhStressFrequency === "Rarely – I feel calm most of the time"
        )
          return true;
        if (
          currentStepData.key === "mh_recentFeelings" &&
          mhRecentFeelings?.noneFeelings
        )
          return true;
        if (
          currentStepData.key === "sleepDisorderDiagnosis" &&
          sleepDisorderDiagnosis === "No"
        )
          return true;

        // Activity Goal logic
        if (currentStepData.key === "activityLevel") {
          // Check if activity follow-ups should be shown
          return !(
            activityLevel === "Mostly sitting (little or no exercise)" ||
            activityLevel === "Light movement (walks, chores, light activity)"
          );
        }
        if (currentStepData.key === "exerciseChallenge") {
          // Check if satisfaction follow-ups should be shown
          return !(
            activityLevel ===
              "Moderate activity (exercise 3–4 days/week, brisk walking, cycling, sports)" ||
            activityLevel ===
              "Very active (exercise most days / vigorous workouts/sports)"
          );
        }

        return false;
      })();

      if (isSkippingFollowUps) {
        setCurrentStep(currentStep + 1);
        setSubStep(0);
        return;
      }

      // If follow-ups are needed, move to subStep 1
      setSubStep(1);
    }
    // B. If on a Branching Step's Follow-ups (subStep 1)
    else if (isBranchingStep && subStep === 1) {
      if (followUpQuestions.length === 0) {
        setCurrentStep(currentStep + 1);
        setSubStep(0);
        return;
      }

      setCurrentStep(currentStep + 1);
      setSubStep(0);
    }
    // C. If on the FINAL STEP
    else if (currentStep === totalSteps) {
      console.log("Questionnaire Complete! Final Answers:", answers);
      alert("Questionnaire Complete! Check console for final answers.");
      router.push("/thank-you");
    }
    // D. If on a NON-Branching Step
    else if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  }, [
    isStepValid,
    isBranchingStep,
    subStep,
    currentStepData,
    currentSex,
    currentAge,
    currentStep,
    totalSteps,
    isAnyConditionSelected,
    diagnosedConditions,
    dietType,
    isAnySubstanceSelected,
    substanceUseNutrition,
    wlSubstanceUse,
    wlTriedBefore,
    substanceType,
    substanceFrequency,
    mhMedicalConditionAffects,
    mhStressFrequency,
    mhRecentFeelings,
    sleepDisorderDiagnosis,
    activityLevel,
    answers,
    router,
  ]);

  const handleBack = useCallback(() => {
    // If on a Branching Step and on follow-up questions, go back to base question
    if (isBranchingStep && subStep === 1) {
      setSubStep(0);
    }
    // Normal step navigation
    else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setSubStep(0);
    }
  }, [isBranchingStep, subStep, currentStep]);

  // --- Input Change Handler ---
  const handleInputChange = useCallback(
    (key, value, subKey = null, type = null, itemIndex = null) => {
      const currentQuestionKey = currentStepData.key;

      // Conditional Follow-Ups (Stored under the 'followUps' key)
      if (subKey && subKey !== "activitySuggestion") {
        setAnswers((prevAnswers) => {
          const followUpAnswers = prevAnswers.followUps || {};
          let newSubAnswer = value;

          if (type === "multiselect") {
            const subSectionAnswer = followUpAnswers[subKey] || {};
            newSubAnswer = {
              ...subSectionAnswer,
              [key]: !subSectionAnswer[key],
            };
            // Multiselect 'none' logic
            if (
              key === "none" ||
              key === "nothing" ||
              key === "noNoticeableIssues" ||
              key === "noneFeelings"
            ) {
              newSubAnswer = { [key]: !subSectionAnswer[key] };
            }
          } else if (type === "medications") {
            const meds = followUpAnswers[subKey] || [];
            newSubAnswer = meds.map((item, index) =>
              index === itemIndex ? { ...item, [key]: value } : item
            );
          }

          return {
            ...prevAnswers,
            followUps: {
              ...followUpAnswers,
              [subKey]: newSubAnswer,
            },
          };
        });
      }
      // Multi-Inputs (Height/Weight, Sleep Schedule)
      else if (
        currentStepData.type === "measurements" ||
        currentStepData.type === "sleepSchedule"
      ) {
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [currentQuestionKey]: {
            ...(prevAnswers[currentQuestionKey] || {}),
            [key]: value,
          },
        }));
      }
      // Simple Multi-Select (Handles 'none', 'nothing', 'noIssues' exclusion logic)
      else if (
        currentStepData.type === "multiselect" &&
        subKey !== "activitySuggestion"
      ) {
        setAnswers((prevAnswers) => {
          let newSelections = prevAnswers[currentQuestionKey] || {};
          const isSelected = !!newSelections[key];
          const isExclusiveKey =
            key === "none" ||
            key === "nothing" ||
            key === "noNoticeableIssues" ||
            key === "noneFeelings";

          if (isExclusiveKey) {
            newSelections = { [key]: !isSelected };
          } else {
            newSelections = { ...newSelections, [key]: !isSelected };
            if (!isSelected) {
              delete newSelections.none;
              delete newSelections.nothing;
              delete newSelections.noNoticeableIssues;
              delete newSelections.noneFeelings;
            }
          }

          // Special check to clear inline activity suggestion if 'Other/Not sure' is deselected
          if (
            currentQuestionKey === "activityTypePreference" &&
            key === "otherNotSure" &&
            isSelected
          ) {
            delete prevAnswers.activitySuggestion;
          }

          return { ...prevAnswers, [currentQuestionKey]: newSelections };
        });
      }
      // Inline Activity Suggestion (Stored in root answers)
      else if (subKey === "activitySuggestion") {
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [subKey]: value,
        }));
      }
      // Single-Value Steps (Radio, Text, Number, Placeholder)
      else {
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [currentQuestionKey]: value,
        }));
      }
    },
    [currentStepData]
  );

  // --- UI Renderers ---
  const renderRadioButtons = (options, currentAnswer, subKey = null) => {
    const isInlineActivitySuggestion = subKey === "activitySuggestion";

    return (
      <div className="space-y-4">
        {options.map((option) => (
          <div
            key={option}
            className={`flex items-center p-4 rounded-xl cursor-pointer border-2 transition ${
              currentAnswer === option
                ? "bg-[#e0e4ef] border-[#C263F2] shadow-md"
                : "bg-white border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => {
              if (isInlineActivitySuggestion) {
                handleInputChange(
                  option,
                  option,
                  "activitySuggestion",
                  "radio"
                );
              } else {
                handleInputChange(option, option, subKey, "radio");
              }
            }}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition ${
                currentAnswer === option
                  ? "bg-[#C263F2] border-[#C263F2]"
                  : "bg-white border-gray-400"
              }`}
            >
              {currentAnswer === option && (
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
              )}
            </div>
            <span className="text-base text-gray-700 font-medium text-left flex-1 break-words">
              {option}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderMultiselectOptions = (options, currentAnswer, subKey = null) => {
    currentAnswer = currentAnswer || {};

    return (
      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = currentAnswer[option.id] || false;
          return (
            <div
              key={option.id}
              className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border-2 transition ${
                isSelected
                  ? "bg-[#e0e4ef] border-[#C263F2] shadow-md"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() =>
                handleInputChange(option.id, isSelected, subKey, "multiselect")
              }
            >
              <div className="flex items-center">
                {option.icon && (
                  <span className="mr-3 text-xl">{option.icon}</span>
                )}
                <span className="text-base text-gray-700 font-medium">
                  {option.label}
                </span>
              </div>
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                  isSelected
                    ? "bg-[#C263F2] border-[#C263F2]"
                    : "bg-white border-gray-400"
                }`}
              >
                {isSelected && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderConditionalFollowUps = () => {
    const followUpAnswers = answers.followUps || {};

    return (
      <div className="w-full max-w-lg space-y-8 text-left">
        {followUpQuestions.map((q) => {
          if (q.subType === "suggestion") return null;

          if (
            q.parentKey === "recentSurgery" &&
            !answers.diagnosedConditions?.recentSurgery
          )
            return null;

          const currentSubAnswer = followUpAnswers[q.subKey];

          return (
            <div key={q.subKey} className="space-y-3 border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {q.subTitle}
                {q.required && <span className="text-[#C263F2] ml-1">*</span>}
              </h3>
              {q.description && (
                <p className="text-sm text-gray-500">{q.description}</p>
              )}
              {q.subType === "radio" &&
                renderRadioButtons(q.options, currentSubAnswer, q.subKey)}
              {q.subType === "multiselect" &&
                renderMultiselectOptions(q.options, currentSubAnswer, q.subKey)}
              {q.subType === "text" && (
                <input
                  type="text"
                  value={currentSubAnswer || ""}
                  onChange={(e) =>
                    handleInputChange(
                      q.subKey,
                      e.target.value,
                      q.subKey,
                      "text"
                    )
                  }
                  placeholder={q.placeholder || "Enter your answer"}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#C263F2] focus:ring-0 transition text-black"
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderMeasurements = () => {
    const measurementAnswers = answers[currentStepData.key] || {};
    const {
      unitSystem,
      height: currentHeight = "",
      weight: currentWeight = "",
      heightFt = "",
      heightIn = "",
    } = measurementAnswers;
    const bmi = calculateBMI(measurementAnswers);
    const isMetric = unitSystem === "Metric (cm, kg)";
    const isImperial = unitSystem === "Imperial (ft/in, lbs)";

    const handleMeasurementInput = (key, value) => {
      const parsedValue = value === "" || parseFloat(value) >= 0 ? value : "";
      handleInputChange(key, parsedValue, null, "measurements");
    };

    const handleUnitSelect = (value) => {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentStepData.key]: {
          unitSystem: value,
          height: "",
          weight: "",
          heightFt: "",
          heightIn: "",
        },
      }));
    };

    const unitOptions = currentStepData.inputs?.[0]?.options || [];

    return (
      <div className="w-full max-w-lg space-y-4">
        {/* 1. Unit System Selector */}
        <div className="space-y-3">
          <label className="w-full text-gray-700 font-medium block">
            Select Unit System:
          </label>
          <div className="flex gap-4">
            {unitOptions.map((option) => (
              <div
                key={option}
                className={`flex-1 flex items-center p-3 rounded-xl cursor-pointer border-2 transition ${
                  unitSystem === option
                    ? "bg-[#e0e4ef] border-[#C263F2] shadow-md"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => handleUnitSelect(option)}
              >
                <span className="text-sm text-gray-700">{option}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Metric Inputs */}
        {isMetric && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center">
              <label
                htmlFor="height"
                className="w-24 text-gray-700 font-medium"
              >
                Height (cm):
              </label>
              <input
                id="height"
                type="number"
                value={currentHeight}
                onChange={(e) =>
                  handleMeasurementInput("height", e.target.value)
                }
                placeholder="e.g., 170"
                className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#C263F2] focus:ring-0 transition ml-2 text-black"
                min="1"
              />
            </div>
            <div className="flex items-center">
              <label
                htmlFor="weight"
                className="w-24 text-gray-700 font-medium"
              >
                Weight (kg):
              </label>
              <input
                id="weight"
                type="number"
                value={currentWeight}
                onChange={(e) =>
                  handleMeasurementInput("weight", e.target.value)
                }
                placeholder="e.g., 65"
                className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#C263F2] focus:ring-0 transition ml-2 text-black"
                min="1"
              />
            </div>
          </div>
        )}
        {/* 3. Imperial Inputs */}
        {isImperial && (
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-0">
              <label className="w-full text-gray-700 font-medium mb-1 sm:mb-0 sm:w-14">
                Height:
              </label>
              <div className="flex flex-1 gap-2 sm:ml-2">
                <input
                  type="number"
                  value={heightFt}
                  onChange={(e) =>
                    handleMeasurementInput("heightFt", e.target.value)
                  }
                  placeholder="Feet (e.g., 5)"
                  className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#C263F2] focus:ring-0 transition text-black"
                  min="0"
                />
                <input
                  type="number"
                  value={heightIn}
                  onChange={(e) =>
                    handleMeasurementInput("heightIn", e.target.value)
                  }
                  placeholder="Inches (e.g., 8)"
                  className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#C263F2] focus:ring-0 transition text-black"
                  min="0"
                  max="11"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label
                htmlFor="weightLbs"
                className="w-full text-gray-700 font-medium mb-1 sm:mb-0 sm:w-24"
              >
                Weight (lbs):
              </label>
              <input
                id="weightLbs"
                type="number"
                value={currentWeight}
                onChange={(e) =>
                  handleMeasurementInput("weight", e.target.value)
                }
                placeholder="e.g., 143"
                className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#C263F2] focus:ring-0 transition sm:ml-2 text-black"
                min="1"
              />
            </div>
          </div>
        )}
        {/* 4. BMI Output */}
        {unitSystem && (
          <div className="mt-4 p-4 bg-[#e0e4ef] rounded-lg text-lg font-semibold flex justify-between">
            <span className="text-black">BMI:</span>
            <span className="text-black">{bmi}</span>
          </div>
        )}
      </div>
    );
  };

  const renderSleepSchedule = () => {
    const scheduleAnswers = answers[currentStepData.key] || {};
    const { bedtime = "", waketime = "" } = scheduleAnswers;
    const handleScheduleInput = (key, value) =>
      handleInputChange(key, value, null, "sleepSchedule");

    return (
      <div className="w-full max-w-lg space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <label className="w-full sm:w-32 text-gray-700 font-medium">
              Bedtime:
            </label>
            <input
              type="time"
              value={bedtime}
              onChange={(e) => handleScheduleInput("bedtime", e.target.value)}
              className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#C263F2] focus:ring-0 transition text-black"
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <label className="w-full sm:w-32 text-gray-700 font-medium">
              Wake Time:
            </label>
            <input
              type="time"
              value={waketime}
              onChange={(e) => handleScheduleInput("waketime", e.target.value)}
              className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#C263F2] focus:ring-0 transition text-black"
              required
            />
          </div>
        </div>
        {bedtime && waketime && (
          <div className="mt-4 p-4 bg-[#e0e4ef] rounded-lg text-lg font-semibold flex justify-between">
            <span className="text-black">Estimated Sleep Duration:</span>
            <span className="text-black">
              {calculateSleepDuration(bedtime, waketime)}
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderStepContent = () => {
    if (!currentStepData) return <p>Step not found.</p>;

    // Handle Branching Steps
    if (isBranchingStep) {
      if (subStep === 0) {
        // Base Question
        if (currentStepData.type === "radio")
          return renderRadioButtons(
            currentStepData.options,
            answers[currentStepData.key]
          );
        if (currentStepData.type === "multiselect")
          return renderMultiselectOptions(
            currentStepData.options,
            answers[currentStepData.key]
          );
        if (currentStepData.type === "placeholder")
          return (
            <p className="text-gray-500 italic">
              This step is used to gather further details based on your previous
              answers.
            </p>
          );
      }
      if (subStep === 1) {
        // FIX: Check if there are actually follow-up questions to display
        if (followUpQuestions.length === 0) {
          setTimeout(() => {
            setCurrentStep(currentStep + 1);
            setSubStep(0);
          }, 0);
          return (
            <div className="w-full max-w-lg text-center py-8">
              <p className="text-gray-500 italic">Loading next question...</p>
            </div>
          );
        }
        return renderConditionalFollowUps();
      }
    }
    // Handle all non-branching steps
    switch (currentStepData.type) {
      case "text":
        return (
          <input
            type="text"
            value={answers[currentStepData.key] || ""}
            onChange={(e) =>
              handleInputChange(currentStepData.key, e.target.value)
            }
            placeholder={currentStepData.placeholder}
            className="w-full max-w-lg p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#C263F2] focus:ring-0 transition text-black"
          />
        );
      case "number":
        return (
          <input
            type="number"
            value={answers[currentStepData.key] || ""}
            onChange={(e) =>
              handleInputChange(currentStepData.key, e.target.value)
            }
            placeholder={currentStepData.placeholder}
            className="w-full max-w-lg p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#C263F2] focus:ring-0 transition text-black"
            min="1"
            max="120"
          />
        );
      case "radio":
        return renderRadioButtons(
          currentStepData.options,
          answers[currentStepData.key]
        );
      case "measurements":
        return renderMeasurements();
      case "sleepSchedule":
        return renderSleepSchedule();
      case "multiselect":
        const currentAnswer = answers[currentStepData.key] || {};
        const isActivityTypePreference =
          currentStepData.key === "activityTypePreference";
        const isOtherNotSureSelected =
          isActivityTypePreference && currentAnswer.otherNotSure;

        return (
          <>
            {renderMultiselectOptions(currentStepData.options, currentAnswer)}

            {/* Inline follow-up for 'Other/Not sure' in Activity Type Preference */}
            {isOtherNotSureSelected && (
              <div className="mt-8 pt-4 border-t-2 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Would you like the app to suggest activities based on your
                  goals and environment?
                  <span className="text-[#C263F2] ml-1">*</span>
                </h3>
                {/* Store this answer under a dedicated key 'activitySuggestion' in the root answers object */}
                {renderRadioButtons(
                  ["Yes", "No"],
                  answers.activitySuggestion || null,
                  "activitySuggestion"
                )}
              </div>
            )}
          </>
        );
      case "placeholder":
        return (
          <p className="text-gray-500 italic">
            This step contains adaptive questions that will be shown based on
            your previous answers.
          </p>
        );
      default:
        return <p>Invalid step type or Placeholder reached.</p>;
    }
  };

  // Determine button text dynamically
  const getButtonText = () => {
    if (currentStep === totalSteps) return "Finish";
    // If the step is branching and we are on subStep 0, the text should be "Continue"
    if (isBranchingStep && subStep === 0) return "Continue";
    return "Next";
  };

  const calculateProgress = () => {
    if (questions.length === 0) return 0;
    let totalVirtualSteps = questions.length;
    let currentVirtualStep =
      currentStep + (isBranchingStep && subStep === 1 ? 0.5 : 0);
    return Math.min(100, (currentVirtualStep / totalVirtualSteps) * 100);
  };

  if (questions.length === 0 || !currentStepData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-medium text-[#C263F2]">
          Loading Questionnaire...
        </div>
      </div>
    );
  }

  const isFinalScreen = currentStep === totalSteps;

  return (
    <section
      id="questionnaire"
      className="w-full min-h-screen bg-gray-50 flex flex-col pt-14"
    >
      {/* Header */}
      <div className="w-full bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto py-5 px-4 flex justify-between items-center">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-2 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 font-medium shadow-sm hover:bg-[#C263F2] hover:text-white hover:border-[#C263F2] transition-colors duration-200 mr-10"
            disabled={currentStep === 1 && subStep === 0}
          >
            ← Back
          </button>
          <div className="text-xl font-bold text-[#C263F2]">{APP_NAME}</div>
          <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-[#C263F2] rounded-full transition-all duration-500"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          <button
            onClick={handleNext}
            className={`text-gray-500 hover:text-[#C263F2] font-medium ${
              isFinalScreen && "opacity-0 select-none"
            }`}
            disabled={!isStepValid()}
          >
            Skip
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center pt-10 md:pt-16 pb-10 px-4 md:pb-20 text-center">
        <div className="w-full max-w-lg mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            {currentStepData.title}
            {currentStepData.required && (
              <span className="text-red-500 ml-1 text-base">*</span>
            )}
          </h2>
          <p className="text-base text-gray-600 mb-6">
            {currentStepData.description}
          </p>
        </div>

        <div className="w-full max-w-lg px-2">{renderStepContent()}</div>

        {/* Navigation Buttons */}
        <div className="mt-10 flex gap-4 w-full max-w-lg">
          {(currentStep > 1 || subStep === 1) && (
            <button
              onClick={handleBack}
              className="flex-1 py-3 rounded-xl font-semibold border-2 border-[#C263F2] text-[#C263F2] bg-white hover:bg-[#e0e4ef] transition"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`flex-1 py-3 rounded-xl font-semibold transition ${
              !isStepValid()
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-[#C263F2] text-white hover:bg-[#9E47CC] border-2 border-[#C263F2]"
            }`}
          >
            {getButtonText()}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-white py-3 text-center border-t border-gray-200 text-xs text-gray-500">
        Copyright © 2025 {APP_NAME}. All rights reserved.
      </div>
    </section>
  );
}