// components/Questionnaire.js
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getQuestions, {
  conditionalFollowUps,
  healthConditionFollowUps,
  cancerYesFollowUp,
  medicationQuestion,
  medicationDetailsFollowUp,
  otherConditionFollowUp,
} from "../data/questions";

// Branching step IDs (will be dynamically determined based on selected goal)
const BRANCHING_KEYS = {
  dietType: "Nutrition",
  healthConditions: "Nutrition",
  substanceUse: "Nutrition",
  activityLevel: "Physical Activity", 
  hasMedicalConditions: "Physical Activity",
  medicalConditions: "Physical Activity",
  exerciseLocation: "Physical Activity",
  fitnessGoal: "Physical Activity",
  drinkingEffects: "Alcohol",
  tobaccoUse: "Tobacco",
  //currentSituation: "Mental health",
  //mentalHealthConditions: "Mental health",
  //dailyRoutine: "Mental health",
  stressFrequency: "Mental health",
  recentFeelings: "Mental health",
  sleepChallenge: "Sleep",
};

const APP_NAME = "Ayubo";

export default function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(1);
  const [subStep, setSubStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [branchingSteps, setBranchingSteps] = useState([]);
  const [healthConditionQuestions, setHealthConditionQuestions] = useState([]);
  const [substanceUseQuestions, setSubstanceUseQuestions] = useState([]);
  const [physicalActivityQuestions, setPhysicalActivityQuestions] = useState([]);
  const [alcoholQuestions, setAlcoholQuestions] = useState([]);
  const [mentalHealthQuestions, setMentalHealthQuestions] = useState([]);
  const [sleepQuestions, setSleepQuestions] = useState([]);
  const router = useRouter();

  // Utility function to extract the clean goal key from the option string
  const extractGoalKey = (optionString) => {
    if (!optionString) return null;
    const match = optionString.match(/\(([^)]+)\)/);
    return match ? match[1].trim() : optionString.trim();
  };

  // Initialize questions based on primary goal
  useEffect(() => {
    const primaryGoal = answers.primaryGoal;
    const goalKey = extractGoalKey(primaryGoal);

    // Pass the extracted key to getQuestions
    const allQuestions = getQuestions(goalKey, answers);
    setQuestions(allQuestions);

    // Identify branching steps based on the current question set
    const branchingStepIds = allQuestions
      .filter((question) => Object.keys(BRANCHING_KEYS).includes(question.key))
      .map((question) => question.id);

    setBranchingSteps(branchingStepIds);
  }, [answers.primaryGoal]);

  const totalSteps = questions.length;
  const currentStepData = questions.find((step) => step.id === currentStep);

  const isBranchingStep = currentStepData
    ? branchingSteps.includes(currentStepData.id)
    : false;

  // Dynamically determine the key and answer for conditional logic
  let baseConditionalKey = null;
  let baseConditionalAnswer = null;

  if (currentStepData && isBranchingStep) {
    baseConditionalKey = currentStepData.key;
    baseConditionalAnswer = answers[baseConditionalKey];
  }

  // Helper to check if any condition (excluding 'none') is selected
  const isAnyConditionSelected = (healthConditions) => {
    return Object.entries(healthConditions || {}).some(
      ([key, isSelected]) => isSelected && key !== "none"
    );
  };

  // Helper to check if any substance (excluding 'none') is selected
  const isAnySubstanceSelected = (substanceUse) => {
    return Object.entries(substanceUse || {}).some(
      ([key, isSelected]) => isSelected && key !== "none"
    );
  };

  // Helper to check if any barrier (excluding 'nothing') is selected
  const isAnyBarrierSelected = (barriers) => {
    return Object.entries(barriers || {}).some(
      ([key, isSelected]) => isSelected && key !== "nothing"
    );
  };

  // Helper to check if any drinking effect (excluding 'noIssues') is selected
  const isAnyEffectSelected = (effects) => {
    return Object.entries(effects || {}).some(
      ([key, isSelected]) => isSelected && key !== "noIssues"
    );
  };

  // Helper to check if any mental health condition (excluding 'noneMH') is selected
  const isAnyMentalHealthConditionSelected = (mentalHealthConditions) => {
    return Object.entries(mentalHealthConditions || {}).some(
      ([key, isSelected]) => isSelected && key !== "noneMH"
    );
  };

  // Helper to check if any feeling (excluding 'noneFeelings') is selected
  const isAnyFeelingSelected = (recentFeelings) => {
    return Object.entries(recentFeelings || {}).some(
      ([key, isSelected]) => isSelected && key !== "noneFeelings"
    );
  };

  // Handle health conditions multiselect conditional logic
  useEffect(() => {
    if (currentStepData?.key === "healthConditions" && subStep === 1) {
      const selectedConditions = answers.healthConditions || {};
      const followUpAnswers = answers.followUps || {};
      const conditionQuestions = [];

      const anyConditionSelected = isAnyConditionSelected(selectedConditions);

      // 1. Add GENERIC MEDICATION question if ANY condition is selected (except 'none')
      if (anyConditionSelected) {
        conditionQuestions.push(medicationQuestion);

        // 1b. Add MEDICATION DETAILS if user answered "Yes" to takingMedications
        if (followUpAnswers.takingMedications === "Yes") {
          conditionQuestions.push(medicationDetailsFollowUp);
        }
      }

      // 2. Add SPECIFIC CONDITION follow-ups
      Object.keys(selectedConditions).forEach((conditionId) => {
        if (selectedConditions[conditionId] && conditionId !== "none") {
          // SPECIAL CASE: Other Condition (triggers text box)
          if (conditionId === "otherCondition") {
            conditionQuestions.push(otherConditionFollowUp);
          }

          // Add standard condition follow-ups (if they exist)
          if (healthConditionFollowUps[conditionId]) {
            conditionQuestions.push(...healthConditionFollowUps[conditionId]);
          }

          // SPECIAL CASE: Nested logic for Cancer nutrition advice details
          if (conditionId === "cancer") {
            if (followUpAnswers.cancerAdviceFollow === "Yes") {
              conditionQuestions.push(cancerYesFollowUp);
            }
          }
        }
      });

      setHealthConditionQuestions(conditionQuestions);
    }
  }, [answers.healthConditions, answers.followUps, currentStepData, subStep]);

  // Handle substance use multiselect conditional logic
  useEffect(() => {
    if (currentStepData?.key === "substanceUse" && subStep === 1) {
      const selectedSubstances = answers.substanceUse || {};
      const substanceQuestions = [];

      Object.keys(selectedSubstances).forEach((substanceId) => {
        if (
          selectedSubstances[substanceId] &&
          conditionalFollowUps[substanceId] &&
          substanceId !== "none"
        ) {
          substanceQuestions.push(...conditionalFollowUps[substanceId]);
        }
      });

      setSubstanceUseQuestions(substanceQuestions);
    }
  }, [answers.substanceUse, currentStepData, subStep]);

  // Handle physical activity branching logic - UPDATED
  useEffect(() => {
    if (currentStepData && isBranchingStep && subStep === 1) {
      const followUpAnswers = answers.followUps || {};
      let physicalActivityFollowUps = [];

      // Handle different physical activity branching scenarios
      if (baseConditionalKey === "activityLevel" && baseConditionalAnswer) {
        // Add activity level specific follow-ups
        if (conditionalFollowUps[baseConditionalAnswer]) {
          physicalActivityFollowUps.push(
            ...conditionalFollowUps[baseConditionalAnswer]
          );
        }

        // Handle barrier-specific follow-ups for sitting and light activity
        if (
          (baseConditionalAnswer === "Mostly sitting (little or no exercise)" ||
           baseConditionalAnswer === "Light movement (walks, chores, light activity)") &&
          followUpAnswers.barriers
        ) {
          Object.keys(followUpAnswers.barriers).forEach((barrierId) => {
            if (
              followUpAnswers.barriers[barrierId] &&
              conditionalFollowUps[barrierId] &&
              barrierId !== "nothing"
            ) {
              physicalActivityFollowUps.push(
                ...conditionalFollowUps[barrierId]
              );
            }
          });
        }

        // Handle satisfaction follow-ups for moderate and very active
        if (
          (baseConditionalAnswer === "Moderate activity (exercise 3–4 days/week, brisk walking, cycling, sports)" ||
           baseConditionalAnswer === "Very active (exercise most days / vigorous workouts/sports)") &&
          followUpAnswers.satisfaction
        ) {
          if (conditionalFollowUps[followUpAnswers.satisfaction]) {
            physicalActivityFollowUps.push(
              ...conditionalFollowUps[followUpAnswers.satisfaction]
            );
          }

          // Handle maintenance direction for satisfied users
          if (
            followUpAnswers.satisfaction === "Yes, I'm happy" &&
            followUpAnswers.maintenanceDirection
          ) {
            if (conditionalFollowUps[followUpAnswers.maintenanceDirection]) {
              physicalActivityFollowUps.push(
                ...conditionalFollowUps[followUpAnswers.maintenanceDirection]
              );
            }
          }
        }
      }

      // Handle medical conditions follow-up
      if (
        baseConditionalKey === "hasMedicalConditions" &&
        baseConditionalAnswer === "Yes"
      ) {
        if (conditionalFollowUps[baseConditionalAnswer]) {
          physicalActivityFollowUps.push(
            ...conditionalFollowUps[baseConditionalAnswer]
          );
        }

        // Handle condition-specific follow-ups
        const selectedMedicalConditions = followUpAnswers.medicalConditions || {};
        Object.keys(selectedMedicalConditions).forEach((conditionId) => {
          if (
            selectedMedicalConditions[conditionId] &&
            conditionalFollowUps[conditionId]
          ) {
            physicalActivityFollowUps.push(
              ...conditionalFollowUps[conditionId]
            );
          }
        });
      }

      // Handle exercise location follow-up
      if (baseConditionalKey === "exerciseLocation" && baseConditionalAnswer) {
        if (conditionalFollowUps[baseConditionalAnswer]) {
          physicalActivityFollowUps.push(
            ...conditionalFollowUps[baseConditionalAnswer]
          );
        }
      }

      // Handle fitness goal follow-up
      if (baseConditionalKey === "fitnessGoal" && baseConditionalAnswer) {
        if (conditionalFollowUps[baseConditionalAnswer]) {
          physicalActivityFollowUps.push(
            ...conditionalFollowUps[baseConditionalAnswer]
          );
        }

        // Handle maintenance direction for satisfied users
        if (
          baseConditionalAnswer === "Maintain overall fitness / health" &&
          followUpAnswers.maintenanceDirection
        ) {
          if (conditionalFollowUps[followUpAnswers.maintenanceDirection]) {
            physicalActivityFollowUps.push(
              ...conditionalFollowUps[followUpAnswers.maintenanceDirection]
            );
          }
        }
      }

      setPhysicalActivityQuestions(physicalActivityFollowUps);
    }
  }, [
    baseConditionalKey,
    baseConditionalAnswer,
    answers.followUps,
    currentStepData,
    subStep,
    isBranchingStep,
  ]);

  // Handle alcohol branching logic
  useEffect(() => {
    if (currentStepData && isBranchingStep && subStep === 1) {
      const followUpAnswers = answers.followUps || {};
      let alcoholFollowUps = [];

      // Handle alcohol frequency follow-ups
      if (baseConditionalKey === "alcoholFrequency" && baseConditionalAnswer) {
        if (conditionalFollowUps[baseConditionalAnswer]) {
          alcoholFollowUps.push(...conditionalFollowUps[baseConditionalAnswer]);
        }
      }

      // Handle drinking context follow-ups
      if (baseConditionalKey === "drinkingContext" && baseConditionalAnswer) {
        const selectedContexts = baseConditionalAnswer || {};

        Object.keys(selectedContexts).forEach((contextId) => {
          if (selectedContexts[contextId] && conditionalFollowUps[contextId]) {
            alcoholFollowUps.push(...conditionalFollowUps[contextId]);
          }
        });
      }

      // Handle drinking effects follow-ups (Q5 Adaptive Follow-Ups)
      if (baseConditionalKey === "drinkingEffects" && baseConditionalAnswer) {
        const selectedEffects = baseConditionalAnswer || {};

        Object.keys(selectedEffects).forEach((effectId) => {
          if (selectedEffects[effectId] && conditionalFollowUps[effectId]) {
            alcoholFollowUps.push(...conditionalFollowUps[effectId]);
          }
        });

        // Special case: Health impact doctor advice follow-up (Q6)
        if (
          selectedEffects.healthImpact &&
          followUpAnswers.doctorAdvice === "Yes"
        ) {
          if (conditionalFollowUps["doctorAdviceYes"]) {
            alcoholFollowUps.push(...conditionalFollowUps["doctorAdviceYes"]);
          }
        } else if (
          selectedEffects.healthImpact &&
          followUpAnswers.doctorAdvice === "No"
        ) {
          if (conditionalFollowUps["doctorAdviceNo"]) {
            alcoholFollowUps.push(...conditionalFollowUps["doctorAdviceNo"]);
          }
        }

        // Handle specific health areas affected (Q6a multi-select follow-up)
        if (
          selectedEffects.healthImpact &&
          followUpAnswers.doctorAdvice === "Yes" &&
          followUpAnswers.healthAreasAffected
        ) {
          Object.keys(followUpAnswers.healthAreasAffected).forEach(
            (healthArea) => {
              if (
                followUpAnswers.healthAreasAffected[healthArea] &&
                conditionalFollowUps[healthArea]
              ) {
                alcoholFollowUps.push(...conditionalFollowUps[healthArea]);
              }
            }
          );
        }
      }

      setAlcoholQuestions(alcoholFollowUps);
    }
  }, [
    baseConditionalKey,
    baseConditionalAnswer,
    answers.followUps,
    currentStepData,
    subStep,
    isBranchingStep,
  ]);

  // Handle mental health branching logic
  useEffect(() => {
    if (currentStepData && isBranchingStep && subStep === 1) {
      const followUpAnswers = answers.followUps || {};
      let mentalHealthFollowUps = [];

      // Handle current situation follow-ups
      if (baseConditionalKey === "currentSituation" && baseConditionalAnswer) {
        if (conditionalFollowUps[baseConditionalAnswer]) {
          mentalHealthFollowUps.push(
            ...conditionalFollowUps[baseConditionalAnswer]
          );
        }
      }

      // Handle mental health conditions follow-ups
      if (
        baseConditionalKey === "mentalHealthConditions" &&
        baseConditionalAnswer
      ) {
        const selectedConditions = baseConditionalAnswer || {};

        Object.keys(selectedConditions).forEach((conditionId) => {
          if (
            selectedConditions[conditionId] &&
            conditionalFollowUps[conditionId]
          ) {
            mentalHealthFollowUps.push(...conditionalFollowUps[conditionId]);
          }
        });

        // Handle mental health diagnosis and treatment follow-ups
        // Handle diagnosis follow-ups
        if (followUpAnswers.mentalHealthDiagnosis) {
          Object.keys(followUpAnswers.mentalHealthDiagnosis).forEach(
            (diagnosisId) => {
              if (
                followUpAnswers.mentalHealthDiagnosis[diagnosisId] &&
                conditionalFollowUps[diagnosisId]
              ) {
                mentalHealthFollowUps.push(
                  ...conditionalFollowUps[diagnosisId]
                );
              }
            }
          );
        }

        // Handle treatment follow-ups
        if (followUpAnswers.mentalHealthTreatment) {
          Object.keys(followUpAnswers.mentalHealthTreatment).forEach(
            (treatmentId) => {
              if (
                followUpAnswers.mentalHealthTreatment[treatmentId] &&
                conditionalFollowUps[treatmentId]
              ) {
                mentalHealthFollowUps.push(
                  ...conditionalFollowUps[treatmentId]
                );
              }
            }
          );
        }

        // Handle physical condition mental impact (only for physical health conditions)
        const physicalConditionImpactKeys = [
          "heartDiseaseMentalImpact",
          "diabetesMentalImpact",
          "respiratoryMentalImpact",
          "cancerMentalImpact",
          "oralHealthMentalImpact",
          "otherConditionMentalImpact",
        ];

        physicalConditionImpactKeys.forEach((impactKey) => {
          const impactAnswer = followUpAnswers[impactKey];
          if (
            impactAnswer &&
            (impactAnswer === "Yes" || impactAnswer === "Sometimes")
          ) {
            if (conditionalFollowUps[impactAnswer]) {
              mentalHealthFollowUps.push(...conditionalFollowUps[impactAnswer]);
            }
          }
        });

        // Handle "Other" impact details for physical conditions only
        if (
          followUpAnswers.mentalImpactAreas?.otherImpact &&
          conditionalFollowUps.otherImpact
        ) {
          mentalHealthFollowUps.push(...conditionalFollowUps.otherImpact);
        }
        if (
          followUpAnswers.mentalImpactAreasSometimes?.otherImpactSometimes &&
          conditionalFollowUps.otherImpactSometimes
        ) {
          mentalHealthFollowUps.push(
            ...conditionalFollowUps.otherImpactSometimes
          );
        }
      }

      // Handle daily routine follow-ups
      if (baseConditionalKey === "dailyRoutine" && baseConditionalAnswer) {
        const selectedRoutines = baseConditionalAnswer || {};

        Object.keys(selectedRoutines).forEach((routineId) => {
          if (selectedRoutines[routineId] && conditionalFollowUps[routineId]) {
            mentalHealthFollowUps.push(...conditionalFollowUps[routineId]);
          }
        });
      }

      // Handle stress frequency follow-ups
      if (baseConditionalKey === "stressFrequency" && baseConditionalAnswer) {
        if (conditionalFollowUps[baseConditionalAnswer]) {
          mentalHealthFollowUps.push(
            ...conditionalFollowUps[baseConditionalAnswer]
          );
        }
      }

      // Handle recent feelings follow-ups
      if (baseConditionalKey === "recentFeelings" && baseConditionalAnswer) {
        const selectedFeelings = baseConditionalAnswer || {};

        // Add follow-ups for specific feelings
        Object.keys(selectedFeelings).forEach((feelingId) => {
          if (selectedFeelings[feelingId] && conditionalFollowUps[feelingId]) {
            mentalHealthFollowUps.push(...conditionalFollowUps[feelingId]);
          }
        });

        // Handle "Other" follow-ups for concentration and interest
        if (
          followUpAnswers.concentrationAreas?.otherConcentration &&
          conditionalFollowUps.otherConcentration
        ) {
          mentalHealthFollowUps.push(
            ...conditionalFollowUps.otherConcentration
          );
        }

        if (
          followUpAnswers.interestAreas?.otherInterest &&
          conditionalFollowUps.otherInterest
        ) {
          mentalHealthFollowUps.push(...conditionalFollowUps.otherInterest);
        }
      }

      setMentalHealthQuestions(mentalHealthFollowUps);
    }
  }, [
    baseConditionalKey,
    baseConditionalAnswer,
    answers.followUps,
    currentStepData,
    subStep,
    isBranchingStep,
  ]);

  // Handle sleep branching logic
  useEffect(() => {
    if (currentStepData && isBranchingStep && subStep === 1) {
      const followUpAnswers = answers.followUps || {};
      let sleepFollowUps = [];

      console.log("Sleep branching triggered:", {
        baseConditionalKey,
        baseConditionalAnswer,
        currentStep: currentStepData.key,
      });

      // Handle sleep disorder diagnosis follow-up
      if (baseConditionalKey === "sleepDisorderDiagnosis") {
        console.log(
          "Processing sleep disorder diagnosis:",
          baseConditionalAnswer
        );

        if (baseConditionalAnswer === "Yes") {
          // Add the sleep treatments question
          if (conditionalFollowUps[baseConditionalAnswer]) {
            sleepFollowUps.push(...conditionalFollowUps[baseConditionalAnswer]);
            console.log("Added sleep treatments question");
          }

          // Handle treatment type follow-ups if treatments are already selected
          const selectedTreatments = followUpAnswers.sleepTreatments || {};
          console.log("Selected treatments:", selectedTreatments);

          Object.keys(selectedTreatments).forEach((treatmentId) => {
            if (
              selectedTreatments[treatmentId] &&
              conditionalFollowUps[treatmentId] &&
              treatmentId !== "noneTreatment"
            ) {
              sleepFollowUps.push(...conditionalFollowUps[treatmentId]);
              console.log("Added treatment follow-up for:", treatmentId);
            }
          });
        }
      }

      // Handle sleep challenge follow-ups
      if (baseConditionalKey === "sleepChallenge" && baseConditionalAnswer) {
        console.log("Processing sleep challenge:", baseConditionalAnswer);

        if (conditionalFollowUps[baseConditionalAnswer]) {
          sleepFollowUps.push(...conditionalFollowUps[baseConditionalAnswer]);
          console.log("Added sleep challenge follow-up");
        }

        // Handle nested sleep challenge reasons
        const challengeReasonKeys = [
          "fallingAsleepReason",
          "wakingUpReason",
          "earlyWakingReason",
          "unrefreshedFeeling",
          "irregularScheduleReason",
        ];

        challengeReasonKeys.forEach((reasonKey) => {
          const reasonAnswer = followUpAnswers[reasonKey];
          if (reasonAnswer && conditionalFollowUps[reasonAnswer]) {
            sleepFollowUps.push(...conditionalFollowUps[reasonAnswer]);
            console.log("Added reason follow-up for:", reasonKey, reasonAnswer);
          }
        });

        // Handle specific condition follow-ups
        if (followUpAnswers.mentalHealthDiagnosisSleep === "Yes") {
          sleepFollowUps.push({
            subKey: "sleepMedication",
            subTitle:
              "Are you on any sleep-related medication (sleeping pills, anti-anxiety, antidepressants)?",
            subType: "radio",
            options: ["Yes", "No"],
            required: true,
          });

          if (followUpAnswers.sleepMedication === "Yes") {
            sleepFollowUps.push({
              subKey: "sleepMedicationDetails",
              subTitle:
                "Please provide details for your sleep-related medication:",
              subType: "medications",
              required: true,
              defaultData: [
                { id: 1, name: "", routine: "Night", dose: "", duration: "" },
              ],
              routineOptions: [
                "Morning",
                "Noon",
                "Evening",
                "Night",
                "As Needed",
              ],
            });
          }
        }
      }

      console.log("Final sleep follow-ups:", sleepFollowUps);
      setSleepQuestions(sleepFollowUps);
    }
  }, [
    baseConditionalKey,
    baseConditionalAnswer,
    answers.followUps,
    currentStepData,
    subStep,
    isBranchingStep,
  ]);

  const conditionalQuestions = baseConditionalAnswer
    ? conditionalFollowUps[baseConditionalAnswer]
    : [];

  // --- Utility Functions ---

  // Converts Imperial to Metric (cm, kg)
  const convertToMetric = (measurements) => {
    const { unitSystem, height, weight, heightFt, heightIn } = measurements;

    if (unitSystem === "Metric (cm, kg)") {
      // Already metric
      return {
        heightCm: parseFloat(height) || 0,
        weightKg: parseFloat(weight) || 0,
      };
    } else if (unitSystem === "Imperial (ft/in, lbs)") {
      // Convert Imperial to Metric (kg, cm)

      // Height: ft to inches + inches, then to cm
      const totalInches =
        parseFloat(heightFt) * 12 + (parseFloat(heightIn) || 0);
      const heightCm = totalInches * 2.54;

      // Weight: lbs to kg
      const weightKg = (parseFloat(weight) || 0) * 0.453592;

      return { heightCm, weightKg };
    }
    return { heightCm: 0, weightKg: 0 };
  };

  const calculateBMI = (measurements) => {
    const { heightCm, weightKg } = convertToMetric(measurements);

    if (heightCm > 0 && weightKg > 0) {
      const heightM = heightCm / 100;
      const bmi = weightKg / (heightM * heightM);
      return bmi.toFixed(1);
    }
    return "N/A";
  };

  // Helper function to calculate sleep duration
  const calculateSleepDuration = (bedtime, waketime) => {
    if (!bedtime || !waketime) return "N/A";

    const bed = new Date(`2000-01-01T${bedtime}`);
    let wake = new Date(`2000-01-01T${waketime}`);

    // If wake time is before bedtime, assume it's the next day
    if (wake < bed) {
      wake = new Date(wake.getTime() + 24 * 60 * 60 * 1000);
    }

    const diffMs = wake - bed;
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${diffHrs}h ${diffMins}m`;
  };

  // --- Validation and Navigation Handlers ---
  const isStepValid = () => {
    if (!currentStepData) return false;
    const currentAnswer = answers[currentStepData.key];

    // Case 1: Validation for Branching Steps
    if (isBranchingStep) {
      // subStep 0: Validate the base question
      if (subStep === 0) {
        // Health conditions, substance use, and drinking context are required: false, so they are valid by default
        // Activity preferences, motivation style, and drinking effects are required: true
        // The multiselect logic in handleInputChange should ensure at least one is selected if required: true
        if (currentStepData.type === "multiselect") {
          const hasSelection = Object.values(currentAnswer || {}).some(
            (v) => v === true
          );
          return currentStepData.required ? hasSelection : true;
        }

        return currentStepData.required ? !!baseConditionalAnswer : true;
      }
      // subStep 1: Validate all conditional questions
      if (subStep === 1) {
        const followUpAnswers = answers.followUps || {};

        let questionsToValidate = [];
        if (currentStepData.key === "healthConditions") {
          // Use the dynamically generated list which includes nested logic
          questionsToValidate = healthConditionQuestions;
        } else if (currentStepData.key === "substanceUse") {
          questionsToValidate = substanceUseQuestions;
        } else if (
          BRANCHING_KEYS[currentStepData.key] === "Physical Activity"
        ) {
          questionsToValidate = physicalActivityQuestions;
        } else if (BRANCHING_KEYS[currentStepData.key] === "Alcohol") {
          questionsToValidate = alcoholQuestions;
        } else if (BRANCHING_KEYS[currentStepData.key] === "Mental health") {
          questionsToValidate = mentalHealthQuestions;

          // Special validation for mental health impact questions
          // Check if we have impact questions that need validation
          questionsToValidate = questionsToValidate.filter((q) => {
            // Skip questions that are conditionally hidden based on parent answers
            if (
              q.subKey === "mentalImpactAreas" ||
              q.subKey === "mentalImpactAreasSometimes"
            ) {
              const parentAnswer = Object.values(followUpAnswers).find(
                (val) => val === "Yes" || val === "Sometimes"
              );
              return !!parentAnswer;
            }
            return true;
          });
        } else if (BRANCHING_KEYS[currentStepData.key] === "Sleep") {
          questionsToValidate = sleepQuestions;
        } else {
          // Other single-select branching steps
          questionsToValidate =
            conditionalQuestions && Array.isArray(conditionalQuestions)
              ? conditionalQuestions
              : [];
        }

        return questionsToValidate.every((q) => {
          if (q.required) {
            const answer = followUpAnswers[q.subKey];

            // Check for the new custom medication type validation
            if (q.subType === "medications") {
              const meds = answer || [];
              // Must have at least one entry, and all required fields in that entry must be filled
              if (meds.length === 0) return false;
              return meds.every((med) => med.name && med.routine && med.dose);
              // Note: duration and sideEffects are optional
            }

            if (q.subType === "radio") return !!answer;
            if (q.subType === "multiselect")
              return Object.values(answer || {}).some((v) => v === true);
            if (q.subType === "text")
              return !!answer && answer.trim().length > 0;
          }
          return true;
        });
      }
    }
    // Case 2: Validation for NON-Branching Steps
    else {
      if (!currentStepData.required) return true;

      // Handle different input types
      if (currentStepData.type === "text") {
        return !!currentAnswer && currentAnswer.trim().length > 0;
      }
      if (
        currentStepData.type === "number" ||
        currentStepData.type === "radio"
      ) {
        return !!currentAnswer;
      }
      if (currentStepData.type === "measurements") {
        const { unitSystem, height, weight, heightFt, heightIn } =
          currentAnswer || {};

        // 1. Must select a unit system
        if (!unitSystem) return false;

        // 2. Validate inputs based on unit system
        if (unitSystem === "Metric (cm, kg)") {
          // Check Height (cm) AND Weight (kg)
          return !!height && !!weight && height > 0 && weight > 0;
        }

        if (unitSystem === "Imperial (ft/in, lbs)") {
          // Check Weight (lbs) AND Height (ft) AND Height (in)
          const totalInches =
            parseFloat(heightFt) * 12 + (parseFloat(heightIn) || 0);

          return (
            !!weight &&
            weight > 0 &&
            (!!heightFt || heightFt === 0) &&
            (!!heightIn || heightIn === 0) &&
            totalInches > 0
          ); // Total height > 0 inches
        }
        return false;
      }
      if (currentStepData.type === "sleepSchedule") {
        const { bedtime, waketime } = currentAnswer || {};
        return !!bedtime && !!waketime;
      }
      if (currentStepData.type === "multiselect") {
        // Must have at least one selection if required: true
        if (!currentStepData.required) return true;
        return Object.values(currentAnswer || {}).some((v) => v === true);
      }
      return false;
    }
  };

  // UPDATED HANDLE NEXT FUNCTION WITH NEW PHYSICAL ACTIVITY FLOW
  const handleNext = () => {
    console.log("HandleNext called:", {
      currentStep,
      subStep,
      isBranchingStep,
      currentStepData: currentStepData?.key,
      baseConditionalAnswer,
    });

    // A. If on a Branching Step's Base Question (subStep 0)
    if (isBranchingStep && subStep === 0) {
      if (isStepValid()) {
        console.log("Branching step valid, moving to follow-ups");

        // Special logic for healthConditions
        if (currentStepData.key === "healthConditions") {
          const selectedConditions = answers.healthConditions || {};
          const anyConditionSelected =
            isAnyConditionSelected(selectedConditions);

          // If the user selects ONLY 'None' or nothing at all, skip all follow-ups
          if (!anyConditionSelected) {
            setCurrentStep(currentStep + 1);
            setSubStep(0);
            return;
          }
        }

        // Special logic for substanceUse
        if (currentStepData.key === "substanceUse") {
          const selectedSubstances = answers.substanceUse || {};
          const anySubstanceSelected =
            isAnySubstanceSelected(selectedSubstances);

          // If the user selects ONLY 'None' or nothing at all, skip all follow-ups
          if (!anySubstanceSelected) {
            setCurrentStep(currentStep + 1);
            setSubStep(0);
            return;
          }
        }

        // Special logic for mentalHealthConditions
        if (currentStepData.key === "mentalHealthConditions") {
          const selectedConditions = answers.mentalHealthConditions || {};
          const anyConditionSelected =
            isAnyMentalHealthConditionSelected(selectedConditions);

          // If the user selects ONLY 'None' or nothing at all, skip all follow-ups
          if (!anyConditionSelected) {
            setCurrentStep(currentStep + 1);
            setSubStep(0);
            return;
          }
        }

        // Special logic for recentFeelings
        if (currentStepData.key === "recentFeelings") {
          const selectedFeelings = answers.recentFeelings || {};
          const anyFeelingSelected = isAnyFeelingSelected(selectedFeelings);

          // If the user selects ONLY 'None' or nothing at all, skip all follow-ups
          if (!anyFeelingSelected) {
            setCurrentStep(currentStep + 1);
            setSubStep(0);
            return;
          }
        }

        // UPDATED PHYSICAL ACTIVITY LOGIC - NEW FLOW
        if (currentStepData.key === "activityLevel") {
          const activityLevel = answers.activityLevel;
          
          // 1. Mostly sitting goes directly to barriers (Q1b) ONLY
          if (activityLevel === "Mostly sitting (little or no exercise)") {
            setSubStep(1); // Go directly to barriers follow-ups
            return;
          }
          // 2. Light movement goes to Q1a questions first, then barriers
          else if (activityLevel === "Light movement (walks, chores, light activity)") {
            // Continue to Q1a questions (they are the next main steps)
            setCurrentStep(currentStep + 1);
            setSubStep(0);
            return;
          }
          // 3. Moderate/Very active goes to Q1a questions first, then satisfaction (Q1c)
          else if (
            activityLevel === "Moderate activity (exercise 3–4 days/week, brisk walking, cycling, sports)" ||
            activityLevel === "Very active (exercise most days / vigorous workouts/sports)"
          ) {
            // Continue to Q1a questions (they are the next main steps)
            setCurrentStep(currentStep + 1);
            setSubStep(0);
            return;
          }
        }

        // Special logic for when we reach the end of Q1a questions (exerciseIntensity is the last Q1a question)
        if (currentStepData.key === "exerciseIntensity") {
          const activityLevel = answers.activityLevel;
          
          // Light movement goes to barriers (Q1b) after Q1a
          if (activityLevel === "Light movement (walks, chores, light activity)") {
            setSubStep(1); // Show barriers follow-ups
            return;
          }
          // Moderate/Very active goes to satisfaction (Q1c) after Q1a  
          else if (
            activityLevel === "Moderate activity (exercise 3–4 days/week, brisk walking, cycling, sports)" ||
            activityLevel === "Very active (exercise most days / vigorous workouts/sports)"
          ) {
            setSubStep(1); // Show satisfaction follow-ups
            return;
          }
        }

        // Special logic for drinking effects
        if (currentStepData.key === "drinkingEffects") {
          const selectedEffects = answers.drinkingEffects || {};
          const anyEffectSelected = isAnyEffectSelected(selectedEffects);

          // If the user selects ONLY 'No noticeable issues' or nothing at all, skip all follow-ups
          if (!anyEffectSelected) {
            setCurrentStep(currentStep + 1);
            setSubStep(0);
            return;
          }
        }

        // Special logic for sleepDisorderDiagnosis
        if (currentStepData.key === "sleepDisorderDiagnosis") {
          console.log(
            "Sleep disorder diagnosis answered:",
            baseConditionalAnswer
          );

          // If user answers "No", skip follow-ups
          if (baseConditionalAnswer === "No") {
            console.log("Skipping sleep disorder follow-ups (answered No)");
            setCurrentStep(currentStep + 1);
            setSubStep(0);
            return;
          }
          // If user answers "Yes", show follow-ups
          else if (baseConditionalAnswer === "Yes") {
            console.log("Showing sleep disorder follow-ups");
            setSubStep(1);
            return;
          }
        }

        // Skip Q2 medical conditions if user answered "No" to hasMedicalConditions
        if (
          currentStepData.key === "hasMedicalConditions" &&
          baseConditionalAnswer === "No"
        ) {
          setCurrentStep(currentStep + 1);
          setSubStep(0);
          return;
        }

        // Skip follow-ups for Diet Type's Balanced/Mediterranean and No specific diet
        if (
          currentStepData.key === "dietType" &&
          (baseConditionalAnswer ===
            "A mix of vegetables, fruits, grains, and some meat or fish (Balanced / Mediterranean)" ||
            baseConditionalAnswer ===
              "I eat whatever I feel like, no specific pattern (No specific diet)")
        ) {
          setCurrentStep(currentStep + 1);
          setSubStep(0);
          return;
        }

        // DEFAULT: Move to follow-up questions for all other branching steps
        setSubStep(1);
      }
    }
    // B. If on a Branching Step's Follow-ups (subStep 1)
    else if (isBranchingStep && subStep === 1) {
      if (isStepValid()) {
        console.log("Branching step follow-ups valid, moving to next main step");
        
        // Special logic for barriers - if user selects 'nothing', skip to next main step
        if (currentStepData.key === "activityLevel" || currentStepData.key === "exerciseIntensity") {
          const activityLevel = answers.activityLevel;
          const barriers = answers.followUps?.barriers || {};
          
          // Check if we're in barriers (Q1b) and user selects 'nothing'
          const isMostlySitting = activityLevel === "Mostly sitting (little or no exercise)";
          const isLightMovement = activityLevel === "Light movement (walks, chores, light activity)";
          
          if ((isMostlySitting || isLightMovement) && barriers.nothing) {
            // Skip to next main step (Q2 - Health & Safety Check)
            setCurrentStep(currentStep + 1);
            setSubStep(0);
            return;
          }
        }
        
        // For all other branching steps with follow-ups, move to next main step
        setCurrentStep(currentStep + 1);
        setSubStep(0);
      }
    }
    // C. If on the FINAL STEP
    else if (currentStep === totalSteps) {
      if (isStepValid()) {
        console.log("Questionnaire Complete! Final Answers:", answers);
        alert("Questionnaire Complete! Check console for final answers.");
      }
    }
    // D. If on a NON-Branching Step
    else if (!isBranchingStep && currentStep < totalSteps) {
      if (isStepValid()) {
        // Special case: When primary goal is selected, move to the first goal-specific question
        if (currentStepData.key === "primaryGoal") {
          setCurrentStep(currentStep + 1); // This will be the first goal-specific question
        } else {
          setCurrentStep(currentStep + 1);
        }
      }
    }
  };

  const handleBack = () => {
    // If on a Branching Step and on follow-up questions, go back to base question
    if (isBranchingStep && subStep === 1) {
      setSubStep(0);
    }
    // Normal step navigation
    else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setSubStep(0);
    }
  };

  // --- Input Change Handler ---
  const handleInputChange = (
    key,
    value,
    subKey = null,
    type = null,
    itemIndex = null
  ) => {
    const currentKey = currentStepData.key;

    // Conditional Follow-Ups (Stored under the 'followUps' key)
    if (subKey) {
      // subKey is present when answering a conditional follow-up question
      setAnswers((prevAnswers) => {
        const followUpAnswers = prevAnswers.followUps || {};
        let newSubAnswer;

        if (type === "multiselect") {
          const subSectionAnswer = followUpAnswers[subKey] || {};
          newSubAnswer = { ...subSectionAnswer, [key]: !subSectionAnswer[key] };
        } else if (type === "medications") {
          // key is the field (name/routine/dose/duration/sideEffects), value is the input value, itemIndex is the row index
          const meds = followUpAnswers[subKey] || [
            {
              id: 1,
              name: "",
              routine: "Morning",
              dose: "",
              duration: "",
              sideEffects: "",
            },
          ];
          const updatedMeds = meds.map((item, index) =>
            index === itemIndex ? { ...item, [key]: value } : item
          );
          newSubAnswer = updatedMeds;
        } else {
          // This handles radio and text inputs for follow-ups
          newSubAnswer = value;
        }

        // Special Case: If the base 'cancerAdviceFollow' is changed to 'No', clear the nested detail box answer
        if (
          subKey === "cancerAdviceFollow" &&
          value === "No" &&
          prevAnswers.followUps?.cancerAdviceDetails
        ) {
          const { cancerAdviceDetails, ...restFollowUps } =
            prevAnswers.followUps;
          return {
            ...prevAnswers,
            followUps: {
              ...restFollowUps,
              [subKey]: value, // Set the new 'No' answer
            },
          };
        }
        // Special Case: If 'takingMedications' is changed to 'No', clear the details
        else if (
          subKey === "takingMedications" &&
          value === "No" &&
          prevAnswers.followUps?.medicineDetails
        ) {
          const { medicineDetails, ...restFollowUps } = prevAnswers.followUps;
          return {
            ...prevAnswers,
            followUps: {
              ...restFollowUps,
              [subKey]: value,
            },
          };
        }
        // Special Case: If 'doctorAdvice' is changed to 'No', clear health areas affected
        else if (
          subKey === "doctorAdvice" &&
          value === "No" &&
          prevAnswers.followUps?.healthAreasAffected
        ) {
          const { healthAreasAffected, ...restFollowUps } =
            prevAnswers.followUps;
          return {
            ...prevAnswers,
            followUps: {
              ...restFollowUps,
              [subKey]: value,
            },
          };
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
    // Simple Multi-Inputs (Height/Weight)
    else if (currentStepData.type === "measurements") {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentKey]: {
          ...(prevAnswers[currentKey] || {}),
          [key]: value,
        },
      }));
    }
    // Sleep Schedule Inputs
    else if (currentStepData.type === "sleepSchedule") {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentKey]: {
          ...(prevAnswers[currentKey] || {}),
          [key]: value,
        },
      }));
    }
    // Simple Multi-Select (FIXED: Wrapped in setAnswers callback)
    else if (currentStepData.type === "multiselect") {
      setAnswers((prevAnswers) => {
        // Logic for selecting 'none' to deselect all others, and vice versa
        let newSelections = prevAnswers[currentKey] || {};

        if (key === "none") {
          // If 'none' is selected, clear all others and toggle 'none'
          const isCurrentlySelected = !!newSelections.none;
          newSelections = { none: !isCurrentlySelected };
        } else if (key === "nothing") {
          // If 'nothing' is selected (for barriers), clear all others and toggle 'nothing'
          const isCurrentlySelected = !!newSelections.nothing;
          newSelections = { nothing: !isCurrentlySelected };
        } else if (key === "noIssues") {
          // If 'noIssues' is selected (for drinking effects), clear all others and toggle 'noIssues'
          const isCurrentlySelected = !!newSelections.noIssues;
          newSelections = { noIssues: !isCurrentlySelected };
        } else if (key === "noneMH") {
          // If 'noneMH' is selected (for mental health), clear all others and toggle 'noneMH'
          const isCurrentlySelected = !!newSelections.noneMH;
          newSelections = { noneMH: !isCurrentlySelected };
        } else if (key === "noneFeelings") {
          // If 'noneFeelings' is selected, clear all others and toggle 'noneFeelings'
          const isCurrentlySelected = !!newSelections.noneFeelings;
          newSelections = { noneFeelings: !isCurrentlySelected };
        } else {
          // If any other option is selected/deselected, ensure 'none'/'nothing'/'noIssues'/'noneMH'/'noneFeelings' is deselected
          newSelections = { ...newSelections, [key]: !newSelections[key] };

          // Re-check: if no other options are selected, automatically check 'none' or 'nothing' or 'noIssues' or 'noneMH' or 'noneFeelings'
          const selectedKeys = Object.keys(newSelections).filter(
            (k) =>
              k !== "none" &&
              k !== "nothing" &&
              k !== "noIssues" &&
              k !== "noneMH" &&
              k !== "noneFeelings" &&
              newSelections[k]
          );
          if (selectedKeys.length === 0) {
            if (
              currentStepData.key === "healthConditions" ||
              currentStepData.key === "substanceUse"
            ) {
              newSelections.none = true;
            } else if (currentStepData.key === "barriers") {
              newSelections.nothing = true;
            } else if (currentStepData.key === "drinkingEffects") {
              newSelections.noIssues = true;
            } else if (currentStepData.key === "mentalHealthConditions") {
              newSelections.noneMH = true;
            } else if (currentStepData.key === "recentFeelings") {
              newSelections.noneFeelings = true;
            }
          } else {
            if (
              currentStepData.key === "healthConditions" ||
              currentStepData.key === "substanceUse"
            ) {
              newSelections.none = false;
            } else if (currentStepData.key === "barriers") {
              newSelections.nothing = false;
            } else if (currentStepData.key === "drinkingEffects") {
              newSelections.noIssues = false;
            } else if (currentStepData.key === "mentalHealthConditions") {
              newSelections.noneMH = false;
            } else if (currentStepData.key === "recentFeelings") {
              newSelections.noneFeelings = false;
            }
          }
        }

        return {
          ...prevAnswers,
          [currentKey]: newSelections,
        };
      });
    }
    // Single-Value Steps (Radio, Text, Number)
    else {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentKey]: value,
      }));
    }
  };

  // Handlers for the dynamic medication list (used directly in the renderer)
  const handleAddMedication = () => {
    const meds = answers.followUps?.medicineDetails || [];
    const newId = meds.length > 0 ? Math.max(...meds.map((m) => m.id)) + 1 : 1;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      followUps: {
        ...prevAnswers.followUps,
        medicineDetails: [
          ...meds,
          {
            id: newId,
            name: "",
            routine: "Morning",
            dose: "",
            duration: "",
            sideEffects: "",
          },
        ],
      },
    }));
  };

  const handleRemoveMedication = (idToRemove) => {
    const meds = answers.followUps?.medicineDetails || [];
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      followUps: {
        ...prevAnswers.followUps,
        medicineDetails: meds.filter((m) => m.id !== idToRemove),
      },
    }));
  };

  // --- Step UI Renderers ---
  // Renders Radio Buttons
  const renderRadioButtons = (options, currentAnswer, subKey = null) => {
    return (
      <div className="space-y-4">
        {options.map((option) => (
          <div
            key={option}
            className={`flex items-center p-4 rounded-xl cursor-pointer border-2 transition ${
              currentAnswer === option
                ? "bg-[#e0e4ef] border-[#e72638] shadow-md"
                : "bg-white border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => handleInputChange(option, option, subKey, "radio")}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition ${
                currentAnswer === option
                  ? "bg-[#e72638] border-[#e72638]"
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

  // Renders Multiselect Options with categorization
  const renderMultiselectOptions = (options, currentAnswer, subKey = null) => {
    // Group options by category
    const groupedOptions = {};
    options.forEach((option) => {
      // Use option.category if available, otherwise assume no category
      const categoryKey = option.category || "default";
      if (!groupedOptions[categoryKey]) {
        groupedOptions[categoryKey] = [];
      }
      groupedOptions[categoryKey].push(option);
    });

    // Define category labels (optional - if you want to show headers)
    const categoryLabels = {
      smoking: "Smoking / Beedi Symptoms",
      chewing: "Chewing Tobacco / Betel Leaves Symptoms",
      otherDrugs: "Other Drugs Symptoms",
      none: "No Symptoms",
    };

    return (
      <div className="space-y-6 w-full">
        {Object.keys(groupedOptions).map((category) => (
          <div key={category} className="space-y-4">
            {category !== "default" && category !== "none" && (
              <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                {categoryLabels[category] || category}
              </h4>
            )}

            <div className="space-y-3">
              {groupedOptions[category].map((option) => {
                const isSelected = currentAnswer?.[option.id] || false;
                return (
                  <div
                    key={option.id}
                    className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border-2 transition ${
                      isSelected
                        ? "bg-[#e0e4ef] border-[#e72638] shadow-md"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() =>
                      handleInputChange(
                        option.id,
                        isSelected,
                        subKey,
                        "multiselect"
                      )
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
                          ? "bg-[#e72638] border-[#e72638]"
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
          </div>
        ))}
      </div>
    );
  };

  // Renders Height/Weight Inputs (type: measurements)
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

    // Handler for measurement inputs
    const handleMeasurementInput = (key, value) => {
      // Ensure only positive numbers or empty string if input is cleared
      const parsedValue = value === "" || parseFloat(value) >= 0 ? value : "";
      handleInputChange(key, parsedValue, null, "measurements");
    };

    // Handler for unit system selection
    const handleUnitSelect = (value) => {
      // Clear previous system's non-unit-system measurements when switching
      const clearedMeasurements = {
        height: "",
        weight: "",
        heightFt: "",
        heightIn: "",
      };

      // This is a complex change to state, doing it directly here for clarity
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentStepData.key]: {
          ...prevAnswers[currentStepData.key],
          ...clearedMeasurements,
          unitSystem: value,
        },
      }));
    };

    // Get unit options from the first input element (the unit selector)
    const unitOptions =
      currentStepData.inputs.find((input) => input.key === "unitSystem")
        ?.options || [];

    return (
      <div className="w-full max-w-lg space-y-4">
        {/* 1. Unit System Selector (Always visible) */}
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
                    ? "bg-[#e0e4ef] border-[#e72638] shadow-md"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => handleUnitSelect(option)}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center transition ${
                    unitSystem === option
                      ? "bg-[#e72638] border-[#e72638]"
                      : "bg-white border-gray-400"
                  }`}
                >
                  {unitSystem === option && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-sm text-gray-700">{option}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Metric Inputs (Conditional) */}
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
                className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#e72638] focus:ring-0 transition ml-2 text-black"
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
                className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#e72638] focus:ring-0 transition ml-2 text-black"
                min="1"
              />
            </div>
          </div>
        )}
        {isImperial && (
          <div className="space-y-4 pt-2">
            {/* Height (Feet and Inches) - Responsive Fix Applied */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-0">
              {/* Label: Full width on mobile, w-14 on small/medium screens up to align with metric/weight */}
              <label className="w-full text-gray-700 font-medium mb-1 sm:mb-0 sm:w-14">
                Height:
              </label>

              {/* Input Group: Takes full remaining width on mobile, aligns horizontally on small/medium screens up */}
              <div className="flex flex-1 gap-2 sm:ml-2">
                <input
                  type="number"
                  value={heightFt}
                  onChange={(e) =>
                    handleMeasurementInput("heightFt", e.target.value)
                  }
                  placeholder="Feet (e.g., 5)"
                  className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#e72638] focus:ring-0 transition text-black"
                  min="1"
                />
                <input
                  type="number"
                  value={heightIn}
                  onChange={(e) =>
                    handleMeasurementInput("heightIn", e.target.value)
                  }
                  placeholder="Inches (e.g., 8)"
                  className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#e72638] focus:ring-0 transition text-black"
                  min="0"
                  max="11"
                />
              </div>
            </div>

            {/* Weight (Lbs) - Responsive Fix Applied */}
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
                className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#e72638] focus:ring-0 transition sm:ml-2 text-black"
                min="1"
              />
            </div>
          </div>
        )}
        {/* 4. BMI Output (Always visible after unit selection) */}
        <div className="mt-4 p-4 bg-[#e0e4ef] rounded-lg text-lg font-semibold flex justify-between">
          <span className="text-black">BMI:</span>
          <span className="text-black">{bmi}</span>
        </div>
      </div>
    );
  };

  // Renders Sleep Schedule Inputs (type: sleepSchedule)
  const renderSleepSchedule = () => {
    const scheduleAnswers = answers[currentStepData.key] || {};
    const { bedtime = "", waketime = "" } = scheduleAnswers;

    const handleScheduleInput = (key, value) => {
      handleInputChange(key, value, null, "sleepSchedule");
    };

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
              className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#e72638] focus:ring-0 transition text-black"
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
              className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#e72638] focus:ring-0 transition text-black"
              required
            />
          </div>
        </div>

        {/* Display sleep duration if both times are provided */}
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

  // Renders the new custom medication input
  const renderMedicationInputs = (q) => {
    // Use answers.followUps for the data, falling back to defaultData if empty
    const medications = answers.followUps?.[q.subKey] ||
      q.defaultData || [
        {
          id: 1,
          name: "",
          routine: "Morning",
          dose: "",
          duration: "",
          sideEffects: "",
        },
      ];
    const subKey = q.subKey;

    return (
      <div className="w-full space-y-4">
        {medications.map((med, index) => (
          <div
            key={med.id}
            className="p-4 border border-gray-200 rounded-lg space-y-3 bg-white shadow-sm"
          >
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-gray-700">
                Medication #{index + 1}
              </h4>
              {medications.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveMedication(med.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-3">
              {/* Medicine Name */}
              <input
                type="text"
                value={med.name}
                onChange={(e) =>
                  handleInputChange(
                    "name",
                    e.target.value,
                    subKey,
                    "medications",
                    index
                  )
                }
                placeholder="Medicine Name"
                className="w-full p-3 border-2 border-gray-300 rounded-lg text-sm focus:border-[#e72638] focus:ring-0 text-black"
                required
              />

              <div className="grid grid-cols-2 gap-3">
                {/* Routine Dropdown */}
                <select
                  value={med.routine}
                  onChange={(e) =>
                    handleInputChange(
                      "routine",
                      e.target.value,
                      subKey,
                      "medications",
                      index
                    )
                  }
                  className="p-3 border-2 border-gray-300 rounded-lg text-sm focus:border-[#e72638] focus:ring-0 text-black"
                  required
                >
                  {q.routineOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                {/* Dose */}
                <input
                  type="text"
                  value={med.dose}
                  onChange={(e) =>
                    handleInputChange(
                      "dose",
                      e.target.value,
                      subKey,
                      "medications",
                      index
                    )
                  }
                  placeholder="Dose (e.g., 50mg)"
                  className="p-3 border-2 border-gray-300 rounded-lg text-sm focus:border-[#e72638] focus:ring-0 text-black"
                  required
                />
              </div>

              {/* Duration */}
              <input
                type="text"
                value={med.duration || ""}
                onChange={(e) =>
                  handleInputChange(
                    "duration",
                    e.target.value,
                    subKey,
                    "medications",
                    index
                  )
                }
                placeholder="Duration (e.g., 6 months, ongoing)"
                className="w-full p-3 border-2 border-gray-300 rounded-lg text-sm focus:border-[#e72638] focus:ring-0 text-black"
              />

              {/* Side Effects */}
              <input
                type="text"
                value={med.sideEffects || ""}
                onChange={(e) =>
                  handleInputChange(
                    "sideEffects",
                    e.target.value,
                    subKey,
                    "medications",
                    index
                  )
                }
                placeholder="Side effects (if any)"
                className="w-full p-3 border-2 border-gray-300 rounded-lg text-sm focus:border-[#e72638] focus:ring-0 text-black"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddMedication}
          className="w-full py-3 rounded-xl font-semibold border-2 border-gray-400 text-gray-700 bg-gray-100 hover:bg-gray-200 transition mt-2"
        >
          + Add Another Medication
        </button>
      </div>
    );
  };

  // Renders the Conditional Follow-Up Questions (subStep 1 of branching steps)
  const renderConditionalFollowUps = () => {
    const followUpAnswers = answers.followUps || {};

    // Determine the correct set of questions to render
    let questionsToRender = [];
    if (currentStepData.key === "healthConditions") {
      // Use the dynamically generated list which includes the nested logic
      questionsToRender = healthConditionQuestions;
    } else if (currentStepData.key === "substanceUse") {
      questionsToRender = substanceUseQuestions;
    } else if (BRANCHING_KEYS[currentStepData.key] === "Physical Activity") {
      questionsToRender = physicalActivityQuestions;
    } else if (BRANCHING_KEYS[currentStepData.key] === "Alcohol") {
      questionsToRender = alcoholQuestions;
    } else if (BRANCHING_KEYS[currentStepData.key] === "Mental health") {
      questionsToRender = mentalHealthQuestions;
    } else if (BRANCHING_KEYS[currentStepData.key] === "Sleep") {
      questionsToRender = sleepQuestions;
      console.log("Rendering sleep questions:", questionsToRender);
    } else {
      questionsToRender = conditionalQuestions || [];
    }

    return (
      <div className="w-full max-w-lg space-y-12 text-left">
        {questionsToRender.map((q) => {
          // If a question is nested deep and the parent radio is NO, skip rendering.
          // This prevents validation errors on skipped but required fields.

          let isSkippedByParent = false;
          // Example: Skip cancerAdviceDetails if cancerAdviceFollow is 'No'
          if (
            q.subKey === "cancerAdviceDetails" &&
            followUpAnswers.cancerAdviceFollow !== "Yes"
          ) {
            isSkippedByParent = true;
          }
          // Example: Skip medicineDetails if takingMedications is 'No'
          if (
            q.subKey === "medicineDetails" &&
            followUpAnswers.takingMedications !== "Yes"
          ) {
            isSkippedByParent = true;
          }
          // Example: Skip healthAreasAffected if doctorAdvice is 'No' (or not answered Yes)
          if (
            q.subKey === "healthAreasAffected" &&
            followUpAnswers.doctorAdvice !== "Yes"
          ) {
            isSkippedByParent = true;
          }
          // Skip mental impact areas if parent answer doesn't require them
          if (
            (q.subKey === "mentalImpactAreas" ||
              q.subKey === "mentalImpactAreasSometimes") &&
            !Object.values(followUpAnswers).some(
              (val) => val === "Yes" || val === "Sometimes"
            )
          ) {
            isSkippedByParent = true;
          }
          // Skip treatment follow-ups if "None" is selected for treatment
          if (
            (q.subKey === "medicationDetails" ||
              q.subKey === "counselingDetails" ||
              q.subKey === "otherTherapyDetails") &&
            followUpAnswers.mentalHealthTreatment?.noneTreatment
          ) {
            isSkippedByParent = true;
          }

          if (isSkippedByParent) return null;

          const currentSubAnswer = followUpAnswers[q.subKey];
          let answerValue = currentSubAnswer;

          return (
            <div key={q.subKey} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {q.subTitle}
                {q.required && <span className="text-[#e72638] ml-1">*</span>}
              </h3>
              {q.subType === "radio" &&
                renderRadioButtons(q.options, answerValue, q.subKey)}
              {q.subType === "multiselect" &&
                renderMultiselectOptions(q.options, answerValue, q.subKey)}
              {q.subType === "text" && (
                <input
                  type="text"
                  // For text type follow-ups, the answer is the direct value under subKey
                  value={answerValue || ""}
                  onChange={(e) =>
                    handleInputChange(
                      q.subKey,
                      e.target.value,
                      q.subKey,
                      "text"
                    )
                  }
                  placeholder={q.placeholder}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#e72638] focus:ring-0 transition text-black"
                />
              )}
              {/* NEW CUSTOM TYPE RENDERER */}
              {q.subType === "medications" && renderMedicationInputs(q)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderStepContent = () => {
    if (!currentStepData) return <p>Step not found.</p>;

    // Handle Branching Steps
    if (isBranchingStep) {
      if (subStep === 0) {
        // Base Question
        if (currentStepData.type === "radio") {
          return renderRadioButtons(
            currentStepData.options,
            answers[currentStepData.key]
          );
        } else if (currentStepData.type === "multiselect") {
          return renderMultiselectOptions(
            currentStepData.options,
            answers[currentStepData.key]
          );
        }
      }
      if (subStep === 1) {
        // Conditional Follow-ups
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
            className="w-full max-w-lg p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#e72638] focus:ring-0 transition text-black"
          />
        );
      case "number":
        return (
          <input
            type="number"
            value={answers[currentStepData.key] || ""}
            onChange={(e) =>
              handleInputChange(
                currentStepData.key,
                parseInt(e.target.value) || ""
              )
            }
            placeholder={currentStepData.placeholder}
            className="w-full max-w-lg p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#e72638] focus:ring-0 transition text-black"
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
        return renderMultiselectOptions(
          currentStepData.options,
          answers[currentStepData.key]
        );
      default:
        return <p>Invalid step type.</p>;
    }
  };

  // Determine button text dynamically
  const getButtonText = () => {
    if (currentStep === totalSteps) {
      return "Finish";
    }
    if (isBranchingStep && subStep === 0) {
      return "Continue";
    }
    return "Next";
  };

  // Check if it is the absolute final screen
  const isFinalScreen = currentStep === totalSteps;

  // Calculate progress
  const calculateProgress = () => {
    if (questions.length === 0) return 0;

    let totalVirtualSteps = questions.length;
    let currentVirtualStep = currentStep;

    // Add extra virtual steps for branching follow-ups
    questions.forEach((question) => {
      if (branchingSteps.includes(question.id)) {
        totalVirtualSteps += 1;
      }
    });

    // Calculate current virtual step
    if (isBranchingStep && subStep === 1) {
      currentVirtualStep += 1;
    }

    return Math.min(100, (currentVirtualStep / totalVirtualSteps) * 100);
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section
      id="questionnaire"
      className="w-full min-h-screen bg-gray-50 flex flex-col pt-14"
    >
      {/* Header (Top progress bar and Skip button) */}
      <div className="w-full bg-white shadow-sm ">
        <div className="max-w-3xl mx-auto py-5 px-4 flex justify-between items-center">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-2 py-2 rounded-lg border border-gray-300 
             bg-white text-gray-900 font-medium shadow-sm 
             hover:bg-[#e72638] hover:text-white hover:border-[#e72638] 
             transition-colors duration-200 mr-10"
          >
            ← Back
          </button>
          <div className="text-xl font-bold text-[#e72638]">{APP_NAME}</div>
          <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-[#e72638] rounded-full transition-all duration-500"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          {/* Skip button logic */}
          {!isFinalScreen ? (
            <button
              onClick={handleNext}
              className="text-gray-500 hover:text-[#e72638] font-medium"
              disabled={
                currentStepData?.required &&
                !isStepValid() &&
                isBranchingStep &&
                subStep === 0
              }
            >
              Skip
            </button>
          ) : (
            <span className="text-gray-500 font-medium opacity-0 select-none">
              Skip
            </span>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center pt-10 md:pt-16 pb-10 px-4 md:pb-20 text-center">
        <div className="w-full max-w-lg mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            {currentStepData?.title}
          </h2>
          {/* Dynamic Description/Subtitle */}
          <p className="text-base text-gray-600 mb-6">
            {currentStepData?.description}
          </p>
        </div>

        {/* Step-specific Input/Options */}
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="mt-10 flex gap-4 w-full max-w-lg">
          {/* Show Back button if not on Step 1 (or if on subStep 1 of branching step) */}
          {(currentStep > 1 || subStep === 1) && (
            <button
              onClick={handleBack}
              className="flex-1 py-3 rounded-xl font-semibold border-2 border-[#e72638] text-[#e72638] bg-white hover:bg-[#e72638] hover:text-white transition"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={currentStepData?.required && !isStepValid()}
            className={`flex-1 py-3 rounded-xl font-semibold transition ${
              currentStepData?.required && !isStepValid()
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-[#e72638] text-white hover:bg-[#c71f40]"
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