// components/Questionnaire.js
"use client";
import React, { useState, useEffect, useCallback } from "react";
import stepsData, { conditionalFollowUps } from "../data/questions"; 

// --- CONSTANTS ---
// IDs for Initial Non-Branching Steps
const INITIAL_STEP_IDS = [1, 2, 3, 4]; 
// IDs for Branching Steps (Logic now controls which ones are included)
const ACTIVITY_STEP_ID = 5; 
const NUTRITION_SUGAR_STEP_ID = 6; 
const MEAL_REGULARITY_STEP_ID = 7; 
const PROTEIN_STEP_ID = 8;
const WATER_STEP_ID = 9;
const TOBACCO_STEP_ID = 10;
const ALCOHOL_STEP_ID = 11;
const MENTAL_HEALTH_STEP_ID = 12;

const APP_NAME = "Ayubo";


// --- CUSTOM HOOK: Dynamic Step Order Logic ---
const useStepOrder = (primaryGoalAnswer) => {
    // 1. Initial Steps (1, 2, 3, 4) are always included
    let path = [...INITIAL_STEP_IDS];
    
    // 2. Define the goal-specific blocks of step IDs
    const goalPaths = {
        "Physical Activity": [
            ACTIVITY_STEP_ID, 
            PROTEIN_STEP_ID, WATER_STEP_ID, MENTAL_HEALTH_STEP_ID // Include other general health steps
        ],
        "Nutrition": [
            NUTRITION_SUGAR_STEP_ID, 
            MEAL_REGULARITY_STEP_ID, 
            PROTEIN_STEP_ID, 
            WATER_STEP_ID, 
            MENTAL_HEALTH_STEP_ID // Include other general health steps
        ],
        "Tobacco": [
            TOBACCO_STEP_ID, // Focus on tobacco
            PROTEIN_STEP_ID, WATER_STEP_ID, MENTAL_HEALTH_STEP_ID
        ],
        "Alcohol": [
            ALCOHOL_STEP_ID, // Focus on alcohol
            PROTEIN_STEP_ID, WATER_STEP_ID, MENTAL_HEALTH_STEP_ID
        ],
        "Mental Health": [
             MENTAL_HEALTH_STEP_ID, // Focus on Mental Health (Will add specific Qs later)
             PROTEIN_STEP_ID, WATER_STEP_ID
        ],
        "Sleep": [
             // Sleep questions and other general Qs
             PROTEIN_STEP_ID, WATER_STEP_ID, MENTAL_HEALTH_STEP_ID
        ]
    };

    // 3. Append the goal path if a goal is selected in Step 4
    if (primaryGoalAnswer && goalPaths[primaryGoalAnswer]) {
        path = [...path, ...goalPaths[primaryGoalAnswer]];
        // Remove duplicates and maintain order
        path = path.filter((id, index) => path.indexOf(id) === index);
    } 
    
    // 4. If no goal is selected yet, just use initial steps + the full default path 
    //    (Needed for initial rendering before Step 4 is answered)
    if (path.length === INITIAL_STEP_IDS.length) {
         path = [...path, ...goalPaths["Physical Activity"], ...goalPaths["Nutrition"], TOBACCO_STEP_ID, ALCOHOL_STEP_ID].filter((id, index, self) => self.indexOf(id) === index).sort((a,b) => a-b);
         path = path.filter(id => id <= MENTAL_HEALTH_STEP_ID); // Filter to ensure valid IDs only
    }

    return path.sort((a, b) => a - b);
};


export default function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(1);
  const [subStep, setSubStep] = useState(0); 
  const [answers, setAnswers] = useState({});
  
  const primaryGoalAnswer = answers.primaryGoal;
  const stepOrder = useStepOrder(primaryGoalAnswer);
  const totalSteps = stepOrder.length; // Use the length of the dynamic order array

  // Determine the index of the current step in the order
  const currentStepIndex = stepOrder.indexOf(currentStep); 

  const currentStepData = stepsData.find(step => step.id === currentStep);
  
  // Define all branching steps
  const branchingSteps = [ACTIVITY_STEP_ID, NUTRITION_SUGAR_STEP_ID, MEAL_REGULARITY_STEP_ID, TOBACCO_STEP_ID, ALCOHOL_STEP_ID];
  const isBranchingStep = branchingSteps.includes(currentStep);

  // Dynamically determine the key and answer for conditional logic
  let baseConditionalKey = null;
  let baseConditionalAnswer = null;

  if (currentStep === ACTIVITY_STEP_ID) {
    baseConditionalKey = 'activityLevel';
  } else if (currentStep === NUTRITION_SUGAR_STEP_ID) {
    baseConditionalKey = 'sugarIntake';
  } else if (currentStep === MEAL_REGULARITY_STEP_ID) {
    baseConditionalKey = 'mealRegularity';
  } else if (currentStep === TOBACCO_STEP_ID) {
    baseConditionalKey = 'tobaccoUse';
  } else if (currentStep === ALCOHOL_STEP_ID) {
    baseConditionalKey = 'alcoholUse';
  }
  
  if (baseConditionalKey) {
    baseConditionalAnswer = answers[baseConditionalKey];
  }

  const conditionalQuestions = baseConditionalAnswer ? conditionalFollowUps[baseConditionalAnswer] : [];


  // --- Utility Functions ---
  const calculateBMI = (heightCm, weightKg) => {
    if (heightCm > 0 && weightKg > 0) {
      const heightM = heightCm / 100;
      const bmi = weightKg / (heightM * heightM);
      return bmi.toFixed(1);
    }
    return 'N/A';
  };
  
  // --- Validation and Navigation Handlers ---

  const isStepValid = () => {
    if (!currentStepData) return false;
    const currentAnswer = answers[currentStepData.key];

    // Case 1: Validation for Branching Steps
    if (isBranchingStep) {
        // subStep 0: Validate the base radio button
        if (subStep === 0) {
            return !!baseConditionalAnswer;
        }
        // subStep 1: Validate all conditional questions
        if (subStep === 1) {
            const followUpAnswers = answers.followUps || {};
            return conditionalQuestions.every(q => {
                if (q.required) {
                    const answer = followUpAnswers[q.subKey];
                    // Check if a radio answer exists, or if a multiselect has any true value
                    if (q.subType === 'radio') return !!answer;
                    if (q.subType === 'multiselect') return Object.values(answer || {}).some(v => v === true);
                }
                return true;
            });
        }
    } 
    
    // Case 2: Validation for NON-Branching Steps
    else {
        if (!currentStepData.required) return true;
        
        if (currentStepData.type === 'number' || currentStepData.type === 'radio') {
            return !!currentAnswer;
        }
        if (currentStepData.type === 'measurements') {
            const { height, weight } = currentAnswer || {};
            return !!height && !!weight && height > 0 && weight > 0;
        }
        if (currentStepData.type === 'multiselect') {
            return Object.values(currentAnswer || {}).some(v => v === true);
        }
        return false;
    } 
  };

  const handleNext = () => {
    const isLastStepInOrder = currentStepIndex === totalSteps - 1;

    // A. If on a Branching Step's Base Question (subStep 0)
    if (isBranchingStep && subStep === 0) {
      if (isStepValid()) {
        setSubStep(1); // Move to follow-up questions
      }
    } 
    // B. If on the FINAL STEP of the personalized order
    else if (isLastStepInOrder && (subStep === 1 || !isBranchingStep)) {
        if (isStepValid()) {
            console.log("Questionnaire Complete! Final Answers:", answers);
            alert("Questionnaire Complete! Check console for final answers.");
        }
    } 
    // C. If moving to the NEXT STEP in the order
    else if (currentStepIndex < totalSteps - 1) {
        if (isStepValid()) {
            // Determine the ID of the next step in the dynamic order
            const nextStepId = stepOrder[currentStepIndex + 1]; 
            setCurrentStep(nextStepId);
            setSubStep(0); // Reset subStep for the new step
        }
    } 
  };
  
  const handleBack = () => {
    // If on a Branching Step (subStep 1), go back to subStep 0
    if (isBranchingStep && subStep === 1) {
        setSubStep(0);
    } 
    // If NOT on the first step, go back to the PREVIOUS step in the dynamic order
    else if (currentStepIndex > 0) {
      const prevStepId = stepOrder[currentStepIndex - 1];
      setCurrentStep(prevStepId);
      setSubStep(0);
    }
  };

  // --- Input Change Handler ---

  const handleInputChange = (key, value, subKey = null, type = null) => {
    const currentKey = currentStepData.key;
    
    // Conditional Follow-Ups (Stored under the 'followUps' key)
    if (subKey && isBranchingStep) {
        setAnswers(prevAnswers => {
            const followUpAnswers = prevAnswers.followUps || {};
            const subSectionAnswer = followUpAnswers[subKey] || {};
            
            let newSubAnswer;
            if (type === 'multiselect') {
                newSubAnswer = {
                    ...subSectionAnswer,
                    [key]: !subSectionAnswer[key]
                };
            } else {
                newSubAnswer = value;
            }

            return {
                ...prevAnswers,
                followUps: {
                    ...followUpAnswers,
                    [subKey]: newSubAnswer
                }
            };
        });
    }
    // Simple Multi-Inputs (Height/Weight)
    else if (currentStepData.type === 'measurements') {
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        [currentKey]: {
          ...(prevAnswers[currentKey] || {}),
          [key]: value
        }
      }));
    } 
    // Simple Multi-Select (Goals)
    else if (currentStepData.type === 'multiselect') {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [currentKey]: {
                ...(prevAnswers[currentKey] || {}),
                [key]: !prevAnswers[currentKey]?.[key]
            }
        }));
    } 
    // Single-Value Steps (including Primary Goal)
    else {
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        [currentKey]: value
      }));
    }
  };


  // --- Step UI Renderers ---

  // Renders Radio Buttons 
  const renderRadioButtons = (options, currentAnswer, subKey = null) => {
    return (
      <div className="space-y-4"> 
        {options.map((option) => (
          <div
            key={option}
            className={`
              flex items-center p-4 rounded-xl cursor-pointer border-2 transition 
              ${
                currentAnswer === option
                  ? "bg-[#e0e4ef] border-[#e72638] shadow-md"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }
            `}
            onClick={() => handleInputChange(option, option, subKey, 'radio')} 
          >
            <div
              className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition 
                ${
                  currentAnswer === option
                    ? "bg-[#e72638] border-[#e72638]"
                    : "bg-white border-gray-400"
                }`}
            >
              {currentAnswer === option && (
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
              )}
            </div>
            {/* Allowing text to wrap */}
            <span className="text-base text-gray-700 font-medium text-left flex-1 break-words"> 
                {option}
            </span>
          </div>
        ))}
      </div>
    );
  };
  
  // Renders Multiselect Options
  const renderMultiselectOptions = (options, currentAnswer, subKey = null) => {
    return (
      <div className="space-y-4 w-full">
        {options.map((option) => {
            const isSelected = currentAnswer?.[option.id] || false;
            
            return (
                <div
                    key={option.id}
                    className={`
                      flex items-center justify-between p-4 rounded-xl cursor-pointer border-2 transition 
                      ${
                        isSelected
                          ? "bg-[#e0e4ef] border-[#e72638] shadow-md"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      }
                    `}
                    onClick={() => handleInputChange(option.id, isSelected, subKey, 'multiselect')}
                >
                    <div className="flex items-center">
                        {option.icon && <span className="mr-3 text-xl">{option.icon}</span>}
                        <span className="text-base text-gray-700 font-medium">
                            {option.label}
                        </span>
                    </div>
                    {/* The checkbox indicator */}
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition 
                        ${
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
            )
        })}
      </div>
    );
  };

  // Renders Height/Weight Inputs (type: measurements)
  const renderMeasurements = () => {
    const { height: currentHeight = '', weight: currentWeight = '' } = answers[currentStepData.key] || {};
    const bmi = calculateBMI(currentHeight, currentWeight);

    return (
      <div className="w-full max-w-lg space-y-4">
        {currentStepData.inputs.map((input) => (
          <div key={input.key} className="flex items-center">
            <label htmlFor={input.key} className="w-24 text-gray-700 font-medium">
              {input.key.charAt(0).toUpperCase() + input.key.slice(1)} ({input.unit}):
            </label>
            <input
              id={input.key}
              type="number"
              value={input.key === 'height' ? currentHeight : currentWeight}
              onChange={(e) => handleInputChange(input.key, parseFloat(e.target.value) || '')}
              placeholder={input.placeholder}
              className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#e72638] focus:ring-0 transition ml-2 text-black" 
              min="1"
            />
          </div>
        ))}
        
        <div className="mt-4 p-4 bg-[#e0e4ef] rounded-lg text-lg font-semibold flex justify-between">
          <span className="text-black">BMI:</span>
          <span className="text-black">{bmi}</span>
        </div>
      </div>
    );
  };
  
  // Renders the Conditional Follow-Up Questions (subStep 1 of branching steps)
  const renderConditionalFollowUps = () => {
    const followUpAnswers = answers.followUps || {};

    return (
      <div className="w-full max-w-lg space-y-12 text-left">
        {conditionalQuestions.map((q) => {
            const currentSubAnswer = followUpAnswers[q.subKey];
            
            let answerValue = currentSubAnswer; 
            
            if (q.subType === 'multiselect') {
                answerValue = currentSubAnswer;
            }

            return (
                <div key={q.subKey} className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {q.subTitle} 
                        {q.required && <span className="text-[#e72638] ml-1">*</span>}
                    </h3>
                    
                    {q.subType === 'radio' && 
                        renderRadioButtons(q.options, answerValue, q.subKey)
                    }
                    
                    {q.subType === 'multiselect' && 
                        renderMultiselectOptions(q.options, answerValue, q.subKey)
                    }
                </div>
            );
        })}
      </div>
    );
  };


  const renderStepContent = () => {
    if (!currentStepData) return <p>Step not found.</p>;

    // Handle Branching Steps (Step 5, 6, 7, 10, 11)
    if (isBranchingStep) {
        if (subStep === 0) {
            // Base Question (Radio)
            return renderRadioButtons(currentStepData.options, answers[currentStepData.key]);
        }
        if (subStep === 1) {
            // Conditional Follow-ups
            return renderConditionalFollowUps();
        }
    }
    
    // Handle all non-branching steps
    switch (currentStepData.type) {
      case 'number':
        return (
            <input
              type="number"
              value={answers[currentStepData.key] || ''}
              onChange={(e) => handleInputChange(currentStepData.key, parseInt(e.target.value) || '')}
              placeholder={currentStepData.placeholder}
              className="w-full max-w-lg p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#e72638] focus:ring-0 transition text-black" 
              min="1"
              max="120"
            />
        );
      case 'radio':
        return renderRadioButtons(currentStepData.options, answers[currentStepData.key]);
      case 'measurements':
        return renderMeasurements(); 
      case 'multiselect':
        return renderMultiselectOptions(currentStepData.options, answers[currentStepData.key]);
      default:
        return <p>Invalid step type.</p>;
    }
  };

  // Determine button text dynamically
  const getButtonText = () => {
    const isLastStepInOrder = currentStepIndex === stepOrder.length - 1;
    
    // If it is the final step in the personalized order 
    if (isLastStepInOrder && (subStep === 1 || !isBranchingStep)) {
      return "Finish";
    }
    // If it is any base step of a branching section (5, 6, 7, 10, 11)
    if (isBranchingStep && subStep === 0) {
      return "Continue";
    }
    // All other steps (Steps 1, 2, 3, 4, 8, 9, 12 and branching follow-ups)
    return "Next";
  };
  
  // Check if it is the absolute final screen 
  const isLastStepInOrder = currentStepIndex === stepOrder.length - 1;
  const isFinalScreen = isLastStepInOrder && (subStep === 1 || !isBranchingStep);

  // The total number of virtual steps calculation (based on the dynamic stepOrder)
  const calculateVirtualStep = () => {
    let virtualStep = 0;
    for (let i = 0; i <= currentStepIndex; i++) {
        const stepId = stepOrder[i];
        if (branchingSteps.includes(stepId)) {
            virtualStep += 1; // Base Q
            if (i === currentStepIndex && subStep === 1) {
                virtualStep += 1; // Follow-up Q
            } else if (i < currentStepIndex) {
                 virtualStep += 1; // Past follow-up Q
            }
        } else {
            virtualStep += 1;
        }
    }
    return virtualStep;
  };
  
  const totalVirtualSteps = stepOrder.reduce((acc, stepId) => {
      return acc + (branchingSteps.includes(stepId) ? 2 : 1);
  }, 0);
  const currentVirtualStep = calculateVirtualStep();
  const progressPercentage = (currentVirtualStep / totalVirtualSteps) * 100;


  return (
    <section id="questionnaire" className="w-full min-h-screen bg-gray-50">
      {/* Header (Top progress bar and Skip button) */}
      <div className="w-full bg-white shadow-sm">
        {/* Padding set to py-5 for moderate vertical spacing */}
        <div className="max-w-3xl mx-auto py-5 px-4 flex justify-between items-center">
          <div className="text-xl font-bold text-[#e72638]">{APP_NAME}</div>
          <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-[#e72638] rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          {/* Skip button logic */}
          {!isFinalScreen ? (
            <button 
                onClick={handleNext}
                className="text-gray-500 hover:text-[#e72638] font-medium"
                // Simplified disabled check for Skip
                disabled={currentStepData?.required && !isStepValid() && isBranchingStep && subStep === 0}
            >
                Skip
            </button>
          ) : (
            // Hide Skip button on the final screen
            <span className="text-gray-500 font-medium opacity-0 select-none">Skip</span> 
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {/* Increased pt-16 for desktop to push content below the header */}
      <div className="flex flex-col items-center justify-center pt-10 md:pt-16 pb-10 px-4 md:pb-20 text-center">
        <div className="w-full max-w-lg mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            {currentStepData?.title}
          </h2>
          {/* Dynamic Description/Subtitle */}
          <p className="text-base text-gray-600 mb-6">
            {isBranchingStep && subStep === 1
                ? `${currentStepData?.description} Answer: ${baseConditionalAnswer}`
                : currentStepData?.description}
          </p>
        </div>

        {/* Step-specific Input/Options */}
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="mt-10 flex gap-4 w-full max-w-lg">
          {/* Show Back button if not on Step 1 (or if on subStep 1 of branching step) */}
          {(currentStepIndex > 0 || subStep === 1) && (
            <button
              onClick={handleBack}
              className="flex-1 py-3 rounded-xl font-semibold border-2 border-[#e72638] text-[#e72638] bg-white hover:bg-[#e72638] hover:text-white transition"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            // Disable button if required and not valid
            disabled={currentStepData?.required && !isStepValid()}
            className={`flex-1 py-3 rounded-xl font-semibold transition 
              ${
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