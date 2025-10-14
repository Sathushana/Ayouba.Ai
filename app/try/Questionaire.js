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
  alcoholFrequency: "Alcohol",
  drinkingContext: "Alcohol",
  drinkingEffects: "Alcohol",
  tobaccoUse: "Tobacco",
  currentSituation: "Mental health",
  healthConditionsMH: "Mental health",
  dailyRoutine: "Mental health",
  stressFrequency: "Mental health",
  recentFeelings: "Mental health",
  rootCauses: "Mental health",
  sleepChallenge: "Sleep",
  sleepDisorderDiagnosis: "Sleep",
};

const APP_NAME = "Lifeshift";

export default function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(1);
  const [subStep, setSubStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [branchingSteps, setBranchingSteps] = useState([]);
  const [healthConditionQuestions, setHealthConditionQuestions] = useState([]);
  const [substanceUseQuestions, setSubstanceUseQuestions] = useState([]);
  const [physicalActivityQuestions, setPhysicalActivityQuestions] = useState(
    []
  );
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
  }, [answers.primaryGoal, answers.activityLevel]); // Added activityLevel dependency for dynamic filtering

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
    // Check if any key is true AND the key is not 'noIssues'
    return Object.entries(effects || {}).some(
      ([key, isSelected]) => isSelected && key !== "noIssues"
    );
  };

  // Helper to check if any mental health condition (excluding 'none') is selected
  const isAnyMentalHealthConditionSelected = (mentalHealthConditions) => {
    return Object.entries(mentalHealthConditions || {}).some(
      ([key, isSelected]) => isSelected && key !== "none"
    );
  };

  // Helper to check if any feeling (excluding 'noneFeelings') is selected
  const isAnyFeelingSelected = (recentFeelings) => {
    return Object.entries(recentFeelings || {}).some(
      ([key, isSelected]) => isSelected && key !== "noneFeelings"
    );
  };

  // Helper to check if any root cause (excluding 'otherRoot') is selected
  const isAnyRootCauseSelected = (rootCauses) => {
    return Object.entries(rootCauses || {}).some(
      ([key, isSelected]) => isSelected && key !== "otherRoot"
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

  // Handle mental health branching logic - COMPLETELY UPDATED
  useEffect(() => {
    if (currentStepData && isBranchingStep && subStep === 1) {
      const followUpAnswers = answers.followUps || {};
      let mentalHealthFollowUps = [];

      console.log("Mental health branching triggered:", {
        baseConditionalKey,
        baseConditionalAnswer,
        currentStep: currentStepData.key,
      });

      // Handle current situation follow-ups (Step 1)
      if (baseConditionalKey === "currentSituation" && baseConditionalAnswer) {
        console.log("Processing current situation:", baseConditionalAnswer);
        if (conditionalFollowUps[baseConditionalAnswer]) {
          mentalHealthFollowUps.push(
            ...conditionalFollowUps[baseConditionalAnswer]
          );
        }
      }

      // Handle health conditions follow-ups (Step 2)
      if (
        baseConditionalKey === "healthConditionsMH" &&
        baseConditionalAnswer
      ) {
        console.log("Processing health conditions:", baseConditionalAnswer);
        const selectedConditions = baseConditionalAnswer || {};

        Object.keys(selectedConditions).forEach((conditionId) => {
          let lookupKey = conditionId;

          // Apply 'mh_' prefix for non-mental health conditions for consistent lookup
          if (
            [
              "heartDisease",
              "diabetes",
              "respiratoryDisease",
              "cancer",
              "oralHealth",
              "otherCondition",
            ].includes(conditionId)
          ) {
            lookupKey = `mh_${conditionId}`;
          }

          if (
            selectedConditions[conditionId] &&
            conditionalFollowUps[lookupKey]
          ) {
            mentalHealthFollowUps.push(...conditionalFollowUps[lookupKey]);
          }
        });

        // Handle mental health diagnosis and treatment follow-ups
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
                conditionalFollowUps[treatmentId] &&
                treatmentId !== "noneTreatment"
              ) {
                mentalHealthFollowUps.push(
                  ...conditionalFollowUps[treatmentId]
                );
              }
            }
          );
        }

        // Handle physical condition mental impact
        const physicalConditionKeys = [
          "heartDiseaseMentalImpact",
          "diabetesMentalImpact",
          "respiratoryMentalImpact",
          "cancerMentalImpact",
          "oralHealthMentalImpact",
          "otherConditionMentalImpact",
        ];

        physicalConditionKeys.forEach((impactKey) => {
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

        // Handle "Other" impact details
        if (followUpAnswers.mentalImpactAreas?.otherImpact) {
          mentalHealthFollowUps.push(...conditionalFollowUps.otherImpact);
        }
        if (followUpAnswers.mentalImpactAreasSometimes?.otherImpactSometimes) {
          mentalHealthFollowUps.push(
            ...conditionalFollowUps.otherImpactSometimes
          );
        }
      }

      // Handle daily routine follow-ups (Step 3)
      if (baseConditionalKey === "dailyRoutine" && baseConditionalAnswer) {
        console.log("Processing daily routine:", baseConditionalAnswer);
        const selectedRoutines = baseConditionalAnswer || {};

        Object.keys(selectedRoutines).forEach((routineId) => {
          if (selectedRoutines[routineId] && conditionalFollowUps[routineId]) {
            mentalHealthFollowUps.push(...conditionalFollowUps[routineId]);
          }
        });
      }

      // Handle stress frequency follow-ups (Step 4)
      if (baseConditionalKey === "stressFrequency" && baseConditionalAnswer) {
        console.log("Processing stress frequency:", baseConditionalAnswer);
        if (conditionalFollowUps[baseConditionalAnswer]) {
          mentalHealthFollowUps.push(
            ...conditionalFollowUps[baseConditionalAnswer]
          );
        }
      }

      // Handle recent feelings follow-ups (Step 4)
      if (baseConditionalKey === "recentFeelings" && baseConditionalAnswer) {
        console.log("Processing recent feelings:", baseConditionalAnswer);
        const selectedFeelings = baseConditionalAnswer || {};

        Object.keys(selectedFeelings).forEach((feelingId) => {
          if (selectedFeelings[feelingId] && conditionalFollowUps[feelingId]) {
            mentalHealthFollowUps.push(...conditionalFollowUps[feelingId]);
          }
        });

        // Handle "Other" follow-ups for concentration and interest
        if (followUpAnswers.concentrationAreas?.otherConcentration) {
          mentalHealthFollowUps.push(
            ...conditionalFollowUps.otherConcentration
          );
        }
        if (followUpAnswers.interestAreas?.otherInterest) {
          mentalHealthFollowUps.push(...conditionalFollowUps.otherInterest);
        }
      }

      // Handle root causes follow-ups (Step 5)
      if (baseConditionalKey === "rootCauses" && baseConditionalAnswer) {
        console.log("Processing root causes:", baseConditionalAnswer);
        const selectedCauses = baseConditionalAnswer || {};

        Object.keys(selectedCauses).forEach((causeId) => {
          if (selectedCauses[causeId] && conditionalFollowUps[causeId]) {
            mentalHealthFollowUps.push(...conditionalFollowUps[causeId]);
          }
        });
      }

      console.log("Final mental health follow-ups:", mentalHealthFollowUps);
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

  // Handle physical activity branching logic - COMPLETELY UPDATED WITH NEW FLOW
  useEffect(() => {
    if (currentStepData && isBranchingStep && subStep === 1) {
      const followUpAnswers = answers.followUps || {};
      let physicalActivityFollowUps = [];

      console.log("Physical Activity branching triggered:", {
        baseConditionalKey,
        baseConditionalAnswer,
        currentStep: currentStepData.key,
      });

      // Handle activity level follow-ups
      if (
        (baseConditionalKey === "activityLevel" && baseConditionalAnswer) ||
        (baseConditionalKey === "exerciseIntensity" && answers.activityLevel)
      ) {
        const activityLevel = answers.activityLevel;

        // Q1b: Add barriers if needed (triggered by activityLevel or exerciseIntensity)
        if (
          baseConditionalKey === "activityLevel" &&
          (activityLevel === "Mostly sitting (little or no exercise)" ||
            activityLevel ===
              "Light movement (walks, chores, light activity)") &&
          conditionalFollowUps[activityLevel]
        ) {
          console.log("Adding initial barriers question");
          physicalActivityFollowUps.push(
            ...conditionalFollowUps[activityLevel]
          );
        }

        // Q1c: Add satisfaction if needed (triggered by exerciseIntensity)
        if (
          baseConditionalKey === "exerciseIntensity" &&
          (activityLevel ===
            "Moderate activity (exercise 3–4 days/week, brisk walking, cycling, sports)" ||
            activityLevel ===
              "Very active (exercise most days / vigorous workouts/sports)") &&
          conditionalFollowUps[activityLevel]
        ) {
          console.log("Adding initial satisfaction question");
          physicalActivityFollowUps.push(
            ...conditionalFollowUps[activityLevel]
          );
        }

        // Handle barrier-specific follow-ups (nested after Q1b)
        if (
          (activityLevel === "Mostly sitting (little or no exercise)" ||
            activityLevel ===
              "Light movement (walks, chores, light activity)") &&
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

        // Handle maintenance direction for satisfied users (nested after Q1c)
        if (
          (activityLevel ===
            "Moderate activity (exercise 3–4 days/week, brisk walking, cycling, sports)" ||
            activityLevel ===
              "Very active (exercise most days / vigorous workouts/sports)") &&
          followUpAnswers.satisfaction
        ) {
          if (
            followUpAnswers.satisfaction === "Yes, I'm happy" &&
            followUpAnswers.maintenanceDirection &&
            conditionalFollowUps[followUpAnswers.maintenanceDirection]
          ) {
            physicalActivityFollowUps.push(
              ...conditionalFollowUps[followUpAnswers.maintenanceDirection]
            );
          } else if (
            followUpAnswers.satisfaction ===
              "No, I feel stuck / not improving" &&
            conditionalFollowUps[followUpAnswers.satisfaction]
          ) {
            physicalActivityFollowUps.push(
              ...conditionalFollowUps[followUpAnswers.satisfaction]
            );
          } else if (
            followUpAnswers.satisfaction === "Not sure" &&
            conditionalFollowUps[followUpAnswers.satisfaction]
          ) {
            physicalActivityFollowUps.push(
              ...conditionalFollowUps[followUpAnswers.satisfaction]
            );
          }
        }
      }

      // Handle medical conditions follow-up (Q2)
      if (
        baseConditionalKey === "hasMedicalConditions" &&
        baseConditionalAnswer === "Yes"
      ) {
        const uniqueKey = "PA_hasMedicalConditions_Yes";
        if (conditionalFollowUps[uniqueKey]) {
          physicalActivityFollowUps.push(...conditionalFollowUps[uniqueKey]);
        }

        // Handle condition-specific follow-ups
        const selectedMedicalConditions =
          followUpAnswers.medicalConditions || {};
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

      // Handle exercise location follow-up (Q3)
      if (baseConditionalKey === "exerciseLocation" && baseConditionalAnswer) {
        if (conditionalFollowUps[baseConditionalAnswer]) {
          physicalActivityFollowUps.push(
            ...conditionalFollowUps[baseConditionalAnswer]
          );
        }
      }

      // Handle fitness goal follow-up (Q4)
      if (baseConditionalKey === "fitnessGoal" && baseConditionalAnswer) {
        if (conditionalFollowUps[baseConditionalAnswer]) {
          physicalActivityFollowUps.push(
            ...conditionalFollowUps[baseConditionalAnswer]
          );
        }
      }

      console.log(
        "Final physical activity follow-ups:",
        physicalActivityFollowUps
      );
      setPhysicalActivityQuestions(physicalActivityFollowUps);
    }
  }, [
    baseConditionalKey,
    baseConditionalAnswer,
    answers.followUps,
    answers.activityLevel, // Added dependency
    currentStepData,
    subStep,
    isBranchingStep,
  ]);

  // Handle alcohol branching logic - COMPLETELY UPDATED WITH HEALTH IMPACT FIX
  useEffect(() => {
    if (currentStepData && isBranchingStep && subStep === 1) {
      const followUpAnswers = answers.followUps || {};
      let alcoholFollowUps = [];

      console.log("Alcohol branching triggered:", {
        baseConditionalKey,
        baseConditionalAnswer,
        currentStep: currentStepData.key,
        followUpAnswers,
      });

      // Handle alcohol frequency follow-ups (Step 1: Q2 Quantity)
      if (baseConditionalKey === "alcoholFrequency" && baseConditionalAnswer) {
        console.log("Processing alcohol frequency:", baseConditionalAnswer);

        // Only show quantity question for Sometimes, Often, Daily (not Rarely)
        if (baseConditionalAnswer !== "Rarely (special occasions only)") {
          if (conditionalFollowUps[baseConditionalAnswer]) {
            alcoholFollowUps.push(
              ...conditionalFollowUps[baseConditionalAnswer]
            );
            console.log("Added alcohol quantity follow-up");
          }
        }
      }

      // Handle drinking context follow-ups (Step 3: Q4b Adaptive Follow-Ups)
      if (baseConditionalKey === "drinkingContext" && baseConditionalAnswer) {
        console.log("Processing drinking context:", baseConditionalAnswer);
        const selectedContexts = baseConditionalAnswer || {};

        Object.keys(selectedContexts).forEach((contextId) => {
          if (selectedContexts[contextId] && conditionalFollowUps[contextId]) {
            alcoholFollowUps.push(...conditionalFollowUps[contextId]);
            console.log("Added context follow-up for:", contextId);
          }
        });
      }

      // Handle drinking effects follow-ups (Step 4: Q5 Adaptive Follow-Ups)
      if (baseConditionalKey === "drinkingEffects" && baseConditionalAnswer) {
        console.log("Processing drinking effects:", baseConditionalAnswer);
        const selectedEffects = baseConditionalAnswer || {};

        Object.keys(selectedEffects).forEach((effectId) => {
          if (selectedEffects[effectId] && conditionalFollowUps[effectId]) {
            alcoholFollowUps.push(...conditionalFollowUps[effectId]);
            console.log("Added effect follow-up for:", effectId);
          }
        });

        // Special case: Health impact doctor advice follow-up (Q6)
        if (selectedEffects.healthImpact) {
          console.log(
            "Health impact selected, checking doctor advice:",
            followUpAnswers.doctorAdvice
          );

          // Add Q6/doctorAdvice follow-up
          if (followUpAnswers.doctorAdvice) {
            if (followUpAnswers.doctorAdvice === "Yes") {
              if (conditionalFollowUps["doctorAdviceYes"]) {
                alcoholFollowUps.push(
                  ...conditionalFollowUps["doctorAdviceYes"]
                );
                console.log("Added doctor advice Yes follow-up (Q6a)");
              }

              // Handle specific health areas affected (Q6a multi-select follow-up)
              if (followUpAnswers.healthAreasAffected) {
                console.log(
                  "Health areas affected:",
                  followUpAnswers.healthAreasAffected
                );

                Object.keys(followUpAnswers.healthAreasAffected).forEach(
                  (healthArea) => {
                    if (
                      followUpAnswers.healthAreasAffected[healthArea] &&
                      conditionalFollowUps[healthArea] &&
                      healthArea !== "none"
                    ) {
                      alcoholFollowUps.push(
                        ...conditionalFollowUps[healthArea]
                      );
                      console.log(
                        "Added health area follow-up for:",
                        healthArea
                      );
                    }
                  }
                );
              }
            } else if (followUpAnswers.doctorAdvice === "No") {
              if (conditionalFollowUps["doctorAdviceNo"]) {
                alcoholFollowUps.push(
                  ...conditionalFollowUps["doctorAdviceNo"]
                );
                console.log("Added doctor advice No follow-up (Q6b)");
              }
            }
          }
        }

        // Special case: No issues follow-up (Q7)
        if (selectedEffects.noIssues) {
          if (conditionalFollowUps["noIssues"]) {
            alcoholFollowUps.push(...conditionalFollowUps["noIssues"]);
            console.log("Added no issues follow-up (Q7)");
          }
        }
      }

      console.log("Final alcohol follow-ups:", alcoholFollowUps);
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

  // Handle sleep branching logic - UPDATED TO MATCH DOCUMENT STRUCTURE
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
          const uniqueKey = "Sleep_hasDiagnosis_Yes"; // Use the new unique key
          if (conditionalFollowUps[uniqueKey]) {
            sleepFollowUps.push(...conditionalFollowUps[uniqueKey]);
            // ...
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

        // Add the main challenge follow-up question
        if (conditionalFollowUps[baseConditionalAnswer]) {
          sleepFollowUps.push(...conditionalFollowUps[baseConditionalAnswer]);
          console.log("Added sleep challenge follow-up");
        }

        // Handle nested sleep challenge reasons with their follow-ups
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

        // Handle deeply nested follow-ups for racing thoughts
        if (followUpAnswers.mentalHealthDiagnosisSleep === "Yes") {
          sleepFollowUps.push(
            ...conditionalFollowUps["mentalHealthDiagnosisSleep_Yes"]
          );

          if (followUpAnswers.sleepMedication === "Yes") {
            sleepFollowUps.push(...conditionalFollowUps["sleepMedication_Yes"]);
          }
        }

        // Handle physical discomfort type follow-ups
        if (followUpAnswers.physicalDiscomfortType) {
          if (conditionalFollowUps[followUpAnswers.physicalDiscomfortType]) {
            sleepFollowUps.push(
              ...conditionalFollowUps[followUpAnswers.physicalDiscomfortType]
            );
          }
        }

        // Handle bathroom conditions follow-up
        if (followUpAnswers.bathroomConditions === "Yes") {
          sleepFollowUps.push(
            ...conditionalFollowUps["bathroomConditions_Yes"]
          );
        }

        // Handle partner noise follow-up
        if (followUpAnswers.noiseSource === "Inside/partner noise") {
          sleepFollowUps.push(...conditionalFollowUps["Inside/partner noise"]);
        }

        // Handle nap frequency follow-up
        if (followUpAnswers.napFrequency === "Yes") {
          sleepFollowUps.push(...conditionalFollowUps["napFrequency_Yes"]);
        }

        // Handle morning routine follow-up
        if (followUpAnswers.morningPhoneUse === "No") {
          sleepFollowUps.push(...conditionalFollowUps["morningPhoneUse_No"]);
        }

        // Handle sleep hours follow-up
        if (followUpAnswers.averageSleepHours === "6-7.5") {
          sleepFollowUps.push(
            ...conditionalFollowUps["averageSleepHours_6-7.5"]
          );
        }

        // Handle evening alcohol follow-up
        if (followUpAnswers.eveningAlcohol === "Yes") {
          sleepFollowUps.push(...conditionalFollowUps["eveningAlcohol_Yes"]);
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
          // IMPORTANT: Check if the question is currently being rendered/required based on parent logic
          let isSkippedByParent = false;
          if (
            q.subKey === "cancerAdviceDetails" &&
            followUpAnswers.cancerAdviceFollow !== "Yes"
          ) {
            isSkippedByParent = true;
          }
          if (
            q.subKey === "medicineDetails" &&
            followUpAnswers.takingMedications !== "Yes"
          ) {
            isSkippedByParent = true;
          }
          if (
            q.subKey === "healthAreasAffected" &&
            followUpAnswers.doctorAdvice !== "Yes"
          ) {
            isSkippedByParent = true;
          }
          // Check for all Q6a nested follow-ups (liverDiagnosis, heartConditionLink, etc.)
          // The parent of these is 'healthAreasAffected'. They should be validated only if their key is selected in healthAreasAffected.
          const isHealthAreaFollowUp = [
            "liverDiagnosis",
            "alcoholAvoidance",
            "heartConditionLink",
            "medicalClearance",
            "digestiveIssues",
            "symptomWorsening",
            "weightConcern",
            "brainMentalImpact",
            "mentalHealthClearance",
            "cancerAlcoholLink",
            "cancerAlcoholGuidance",
            "otherHealthDetails",
          ].includes(q.subKey);

          if (
            isHealthAreaFollowUp &&
            (!followUpAnswers.healthAreasAffected ||
              !Object.keys(followUpAnswers.healthAreasAffected).includes(
                q.subKey.replace(
                  /Diagnosis|Avoidance|ConditionLink|Clearance|Issues|Worsening|Concern|Impact|Guidance|Details/g,
                  ""
                )
              )) // Simplified check for parent area
          ) {
            // Check if the parent area that triggers this specific sub-key is actually selected
            const parentKey = q.subKey.replace(
              /Diagnosis|Avoidance|ConditionLink|Clearance|Issues|Worsening|Concern|Impact|Guidance|Details/g,
              ""
            );
            if (
              (q.subKey === "liverDiagnosis" &&
                !followUpAnswers.healthAreasAffected?.liver) ||
              (q.subKey === "alcoholAvoidance" &&
                !followUpAnswers.healthAreasAffected?.liver) ||
              (q.subKey === "heartConditionLink" &&
                !followUpAnswers.healthAreasAffected?.heartBP) ||
              (q.subKey === "medicalClearance" &&
                !followUpAnswers.healthAreasAffected?.heartBP) ||
              (q.subKey === "digestiveIssues" &&
                !followUpAnswers.healthAreasAffected?.digestion) ||
              (q.subKey === "symptomWorsening" &&
                !followUpAnswers.healthAreasAffected?.digestion) ||
              (q.subKey === "weightConcern" &&
                !followUpAnswers.healthAreasAffected?.weight) ||
              (q.subKey === "brainMentalImpact" &&
                !followUpAnswers.healthAreasAffected?.brainMental) ||
              (q.subKey === "mentalHealthClearance" &&
                !followUpAnswers.healthAreasAffected?.brainMental) ||
              (q.subKey === "cancerAlcoholLink" &&
                !followUpAnswers.healthAreasAffected?.cancer) ||
              (q.subKey === "cancerAlcoholGuidance" &&
                !followUpAnswers.healthAreasAffected?.cancer) ||
              (q.subKey === "otherHealthDetails" &&
                !followUpAnswers.healthAreasAffected?.otherHealth)
            ) {
              isSkippedByParent = true;
            }
          }

          if (isSkippedByParent) return true;

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

  // UPDATED HANDLE NEXT FUNCTION WITH PROPER PHYSICAL ACTIVITY FLOW
  const handleNext = () => {
    console.log("HandleNext called:", {
      currentStep,
      subStep,
      isBranchingStep,
      currentStepData: currentStepData?.key,
      baseConditionalAnswer,
      activityLevel: answers.activityLevel,
    });

    // A. If on a Branching Step's Base Question (subStep 0)
    if (isBranchingStep && subStep === 0) {
      if (isStepValid()) {
        console.log("Branching step valid, moving to follow-ups");

        // SPECIAL PHYSICAL ACTIVITY LOGIC - FIXED
        if (currentStepData.key === "activityLevel") {
          const activityLevel = answers.activityLevel;

          console.log("Processing activity level:", activityLevel);

          // 1. Mostly sitting goes directly to barriers (Q1b) ONLY
          if (activityLevel === "Mostly sitting (little or no exercise)") {
            console.log(
              "Mostly sitting - going directly to barriers (subStep 1)"
            );
            setSubStep(1); // Go directly to barriers follow-ups
            return;
          }
          // 2. Light movement, Moderate, Very active go to Q1a questions (next main step)
          else {
            console.log("Movement active - going to Q1a questions (next step)");
            setCurrentStep(currentStep + 1);
            setSubStep(0);
            return;
          }
        }

        // Special logic for when we reach the end of Q1a questions (exerciseIntensity is the last Q1a question)
        if (currentStepData.key === "exerciseIntensity") {
          const activityLevel = answers.activityLevel;

          console.log(
            "Reached end of Q1a questions, activity level:",
            activityLevel
          );

          // Light movement goes to barriers (Q1b) after Q1a
          if (
            activityLevel === "Light movement (walks, chores, light activity)"
          ) {
            console.log(
              "Light movement - showing barriers (subStep 1) after Q1a"
            );
            setSubStep(1); // Show barriers follow-ups
            return;
          }
          // Moderate/Very active goes to satisfaction (Q1c) after Q1a
          else if (
            activityLevel ===
              "Moderate activity (exercise 3–4 days/week, brisk walking, cycling, sports)" ||
            activityLevel ===
              "Very active (exercise most days / vigorous workouts/sports)"
          ) {
            console.log(
              "Moderate/Very active - showing satisfaction (subStep 1) after Q1a"
            );
            setSubStep(1); // Show satisfaction follow-ups
            return;
          }
        }

        // [Rest of your existing branching logic for other goals...]
        // Special logic for healthConditionsMH (Mental Health)
        if (currentStepData.key === "healthConditionsMH") {
          const selectedConditions = answers.healthConditionsMH || {};
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

        // Special logic for rootCauses
        if (currentStepData.key === "rootCauses") {
          const selectedCauses = answers.rootCauses || {};
          const anyCauseSelected = isAnyRootCauseSelected(selectedCauses);

          // If the user selects ONLY 'Other' or nothing at all, skip all follow-ups
          if (!anyCauseSelected) {
            setCurrentStep(currentStep + 1);
            setSubStep(0);
            return;
          }
        }

        // Special logic for healthConditions (Nutrition)
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

        // UPDATED ALCOHOL LOGIC - NEW FLOW
        // Skip alcohol quantity follow-up if user answers "Rarely" to frequency
        if (currentStepData.key === "alcoholFrequency") {
          if (baseConditionalAnswer === "Rarely (special occasions only)") {
            console.log(
              "Skipping alcohol quantity follow-ups (answered Rarely)"
            );
            setCurrentStep(currentStep + 1);
            setSubStep(0);
            return;
          }
          // For other frequency answers, show quantity follow-up
          else {
            console.log("Showing alcohol quantity follow-ups");
            setSubStep(1);
            return;
          }
        }

        // Special logic for drinking effects
        if (currentStepData.key === "drinkingEffects") {
          const selectedEffects = answers.drinkingEffects || {};
          const anyEffectSelected = isAnyEffectSelected(selectedEffects);
          const noIssuesSelected = selectedEffects.noIssues;

          // If the user selects ONLY 'No noticeable issues' OR (selects nothing AND 'noIssues' is an option)
          if (!anyEffectSelected || noIssuesSelected) {
            // This is Q7 logic, which is the final adaptive question for this branch.
            console.log(
              "Showing 'No issues' follow-up (Q7) or skipping other effects."
            );
            setSubStep(1);
            return;
          }

          // If ANY other effect is selected, show follow-ups
          console.log(
            "Showing drinking effects follow-ups (effects selected):",
            selectedEffects
          );
          setSubStep(1);
          return;
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

        // Special logic for sleepChallenge
        if (currentStepData.key === "sleepChallenge") {
          console.log("Sleep challenge answered:", baseConditionalAnswer);
          // Always show follow-ups for sleep challenge
          setSubStep(1);
          return;
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
        console.log(
          "Branching step follow-ups valid, moving to next main step"
        );

        // Special logic for Physical Activity: Barriers flow needs to skip to the next main question (Q2)
        if (
          currentStepData.key === "activityLevel" ||
          currentStepData.key === "exerciseIntensity"
        ) {
          const activityLevel = answers.activityLevel;
          const isSittingOrLightMovement =
            activityLevel === "Mostly sitting (little or no exercise)" ||
            activityLevel === "Light movement (walks, chores, light activity)";

          // Check if we were in the barriers flow
          if (isSittingOrLightMovement) {
            // After barriers (Q1b), move to the next main question (Q2: hasMedicalConditions)
            // The step ID for Q2 is 12. We need to find the step after the one we are on.
            const currentQuestionIndex = questions.findIndex(
              (q) => q.id === currentStepData.id
            );
            const nextStep = questions.find(
              (q, index) =>
                index > currentQuestionIndex && q.key === "hasMedicalConditions"
            );

            if (nextStep) {
              console.log(
                "Skipping to next main step (Q2: hasMedicalConditions)"
              );
              setCurrentStep(nextStep.id);
              setSubStep(0);
              return;
            }
          }

          // Check if we were in the satisfaction flow
          const isModerateOrVeryActive =
            activityLevel ===
              "Moderate activity (exercise 3–4 days/week, brisk walking, cycling, sports)" ||
            activityLevel ===
              "Very active (exercise most days / vigorous workouts/sports)";

          if (isModerateOrVeryActive) {
            // After satisfaction (Q1c), move to the next main question (Q2: hasMedicalConditions)
            const currentQuestionIndex = questions.findIndex(
              (q) => q.id === currentStepData.id
            );
            const nextStep = questions.find(
              (q, index) =>
                index > currentQuestionIndex && q.key === "hasMedicalConditions"
            );

            if (nextStep) {
              console.log(
                "Skipping to next main step (Q2: hasMedicalConditions)"
              );
              setCurrentStep(nextStep.id);
              setSubStep(0);
              return;
            }
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
        // AND if it changes to 'Yes', clear healthInfo
        else if (subKey === "doctorAdvice" && value === "No") {
          const {
            healthAreasAffected,
            liverDiagnosis,
            alcoholAvoidance,
            heartConditionLink,
            medicalClearance,
            digestiveIssues,
            symptomWorsening,
            weightConcern,
            brainMentalImpact,
            mentalHealthClearance,
            cancerAlcoholLink,
            cancerAlcoholGuidance,
            otherHealthDetails,
            ...restFollowUps
          } = prevAnswers.followUps || {};
          return {
            ...prevAnswers,
            followUps: {
              ...restFollowUps,
              [subKey]: value,
              healthInfo: undefined, // Clear Q6b if it was set
            },
          };
        } else if (subKey === "doctorAdvice" && value === "Yes") {
          const { healthInfo, ...restFollowUps } = prevAnswers.followUps || {};
          return {
            ...prevAnswers,
            followUps: {
              ...restFollowUps,
              [subKey]: value,
            },
          };
        }
        // Special Case: If mental health treatment is changed to 'none', clear treatment details
        else if (
          subKey === "mentalHealthTreatment" &&
          followUpAnswers.mentalHealthTreatment?.noneTreatment
        ) {
          const {
            medicationDetails,
            counselingDetails,
            otherTherapyDetails,
            ...restFollowUps
          } = prevAnswers.followUps;
          return {
            ...prevAnswers,
            followUps: {
              ...restFollowUps,
              [subKey]: newSubAnswer,
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
          // If 'noIssues' is selected, clear other effects follow-ups to prevent validation errors on step change
          if (!isCurrentlySelected && currentKey === "drinkingEffects") {
            const {
              sleepEnergy,
              focusProductivity,
              familyTension,
              healthImpact,
              ...restEffects
            } = newSelections;
            // Clear related follow-up answers when 'noIssues' is selected
            const {
              sleepEnergyFrequency,
              sleepEnergyTips,
              focusAffectedAreas,
              focusStrategies,
              conflictTiming,
              conflictGuidance,
              doctorAdvice,
              healthRiskAssessment,
              ...restFollowUps
            } = prevAnswers.followUps || {};
            return {
              ...prevAnswers,
              [currentKey]: newSelections,
              followUps: {
                ...restFollowUps,
              },
            };
          }
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

          // If a non-special option is selected for drinkingEffects, deselect 'noIssues'
          if (currentKey === "drinkingEffects" && newSelections[key]) {
            newSelections.noIssues = false;
          }

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
              currentStepData.key === "substanceUse" ||
              currentStepData.key === "healthConditionsMH"
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
              currentStepData.key === "substanceUse" ||
              currentStepData.key === "healthConditionsMH"
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
                ? "bg-[#e0e4ef] border-[#C263F2] shadow-md"
                : "bg-white border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => handleInputChange(option, option, subKey, "radio")}
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
                        ? "bg-[#e0e4ef] border-[#C263F2] shadow-md"
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
                    ? "bg-[#e0e4ef] border-[#C263F2] shadow-md"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => handleUnitSelect(option)}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center transition ${
                    unitSystem === option
                      ? "bg-[#C263F2] border-[#C263F2]"
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
                  className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#C263F2] focus:ring-0 transition text-black"
                  min="1"
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
                className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#C263F2] focus:ring-0 transition sm:ml-2 text-black"
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
                className="w-full p-3 border-2 border-gray-300 rounded-lg text-sm focus:border-[#C263F2] focus:ring-0 text-black"
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
                  className="p-3 border-2 border-gray-300 rounded-lg text-sm focus:border-[#C263F2] focus:ring-0 text-black"
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
                  className="p-3 border-2 border-gray-300 rounded-lg text-sm focus:border-[#C263F2] focus:ring-0 text-black"
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
                className="w-full p-3 border-2 border-gray-300 rounded-lg text-sm focus:border-[#C263F2] focus:ring-0 text-black"
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
                className="w-full p-3 border-2 border-gray-300 rounded-lg text-sm focus:border-[#C263F2] focus:ring-0 text-black"
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
          // Example: Skip healthInfo (Q6b) if doctorAdvice is 'Yes'
          if (
            q.subKey === "healthInfo" &&
            followUpAnswers.doctorAdvice === "Yes"
          ) {
            isSkippedByParent = true;
          }

          // Check for all Q6a nested follow-ups (liverDiagnosis, heartConditionLink, etc.)
          const isHealthAreaFollowUp = [
            "liverDiagnosis",
            "alcoholAvoidance",
            "heartConditionLink",
            "medicalClearance",
            "digestiveIssues",
            "symptomWorsening",
            "weightConcern",
            "brainMentalImpact",
            "mentalHealthClearance",
            "cancerAlcoholLink",
            "cancerAlcoholGuidance",
            "otherHealthDetails",
          ].includes(q.subKey);

          if (isHealthAreaFollowUp) {
            // Determine the parent key from the subKey
            const parentKeyMap = {
              liver: ["liverDiagnosis", "alcoholAvoidance"],
              heartBP: ["heartConditionLink", "medicalClearance"],
              digestion: ["digestiveIssues", "symptomWorsening"],
              weight: ["weightConcern"],
              brainMental: ["brainMentalImpact", "mentalHealthClearance"],
              cancer: ["cancerAlcoholLink", "cancerAlcoholGuidance"],
              otherHealth: ["otherHealthDetails"],
            };
            const parentArea = Object.keys(parentKeyMap).find((key) =>
              parentKeyMap[key].includes(q.subKey)
            );

            // Skip if doctorAdvice is not Yes OR the parent area wasn't selected in healthAreasAffected
            if (
              followUpAnswers.doctorAdvice !== "Yes" ||
              !followUpAnswers.healthAreasAffected?.[parentArea]
            ) {
              isSkippedByParent = true;
            }
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
                {q.required && <span className="text-[#C263F2] ml-1">*</span>}
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
                  className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#C263F2] focus:ring-0 transition text-black"
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
            className="w-full max-w-lg p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#C263F2] focus:ring-0 transition text-black"
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
             hover:bg-[#C263F2] hover:text-white hover:border-[#C263F2] 
             transition-colors duration-200 mr-10"
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
          {/* Skip button logic */}
          {!isFinalScreen ? (
            <button
              onClick={handleNext}
              className="text-gray-500 hover:text-[#C263F2] font-medium"
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

        <div className="w-full max-w-lg px-2">{renderStepContent()}</div>

        {/* Navigation Buttons */}
        <div className="mt-10 flex gap-4 w-full max-w-lg">
          {/* Show Back button if not on Step 1 (or if on subStep 1 of branching step) */}
          {(currentStep > 1 || subStep === 1) && (
            <button
              onClick={handleBack}
              className="flex-1 py-3 rounded-xl font-semibold border-2 border-[#C263F2] text-[#C263F2] bg-white hover:bg-[#C263F2] hover:text-white transition"
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
                : "bg-[#C263F2] text-white hover:bg-[#ffffff] hover:text-black hover:border-[#C263F2] border-2"
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
