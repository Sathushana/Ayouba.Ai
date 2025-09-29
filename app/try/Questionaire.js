// components/Questionnaire.js
"use client";
import React, { useState } from "react";
import stepsData, { conditionalFollowUps } from "../data/questions"; 

// The IDs for the branching steps (UPDATED)
const ACTIVITY_STEP_ID = 5; 
const NUTRITION_STEP_ID = 6; 
const MEAL_REGULARITY_STEP_ID = 7; 
const TOBACCO_STEP_ID = 10; // NEW BRANCHING STEP ID
const ALCOHOL_STEP_ID = 11; // NEW BRANCHING STEP ID
const APP_NAME = "Ayubo";

export default function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(1);
  // subStep: 0 for base question, 1 for follow-up questions
  const [subStep, setSubStep] = useState(0); 
  const [answers, setAnswers] = useState({});
  const totalSteps = stepsData.length; // totalSteps is now 12

  const currentStepData = stepsData.find(step => step.id === currentStep);
  
  // Define all branching steps for central logic checks
  const branchingSteps = [ACTIVITY_STEP_ID, NUTRITION_STEP_ID, MEAL_REGULARITY_STEP_ID, TOBACCO_STEP_ID, ALCOHOL_STEP_ID];
  const isBranchingStep = branchingSteps.includes(currentStep);

  // Dynamically determine the key and answer for conditional logic
  let baseConditionalKey = null;
  let baseConditionalAnswer = null;

  if (currentStep === ACTIVITY_STEP_ID) {
    baseConditionalKey = 'activityLevel';
  } else if (currentStep === NUTRITION_STEP_ID) {
    baseConditionalKey = 'sugarIntake';
  } else if (currentStep === MEAL_REGULARITY_STEP_ID) {
    baseConditionalKey = 'mealRegularity';
  } else if (currentStep === TOBACCO_STEP_ID) { // NEW
    baseConditionalKey = 'tobaccoUse';
  } else if (currentStep === ALCOHOL_STEP_ID) { // NEW
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


    // Case 1: Validation for Branching Steps (Step 5, 6, 7, 10, 11)
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
    
    // Case 2: Validation for NON-Branching Steps (Steps 1, 2, 3, 4, 8, 9, 12)
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
    
    // A. If on a Branching Step's Base Question (subStep 0)
    if (isBranchingStep && subStep === 0) {
      if (isStepValid()) {
        setSubStep(1); // Move to follow-up questions
      }
    } 
    // B. If on the FINAL STEP (Step 12) 
    else if (currentStep === totalSteps) { 
        if (isStepValid()) {
            console.log("Questionnaire Complete! Final Answers:", answers);
            alert("Questionnaire Complete! Check console for final answers.");
        }
    } 
    // C. If on a Branching Step's follow-ups (subStep 1) AND NOT the final step (i.e., Step 5, 6, 7, 10, 11)
    else if (isBranchingStep && subStep === 1 && currentStep < totalSteps) {
         if (isStepValid()) {
            setCurrentStep(currentStep + 1);
            setSubStep(0); // Reset subStep for the next main step
         }
    }
    // D. If on a NON-Branching Step (Steps 1, 2, 3, 4, 8, 9, 12)
    else if (!isBranchingStep && currentStep < totalSteps) {
      if (isStepValid()) {
        setCurrentStep(currentStep + 1);
      }
    } 
  };
  
  const handleBack = () => {
    // If on a Branching Step (5, 6, 7, 10, or 11) and on follow-up questions, go back to base question
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
    // Single-Value Steps (Age, Sex, Primary Goal, Base Activity Level, Base Sugar Intake, Meal Regularity, etc.)
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
      // Mobile Alignment Fix: Removed w-full here to prevent overflow
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
    
    // Handle all non-branching steps (Steps 1, 2, 3, 4, 8, 9, 12)
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
    // If it is the final main step (12) AND is a non-branching step
    if (currentStep === totalSteps) {
      return "Finish";
    }
    // If it is any base step of a branching section (5, 6, 7, 10, 11)
    if (isBranchingStep && subStep === 0) {
      return "Continue";
    }
    // All other steps (including branching follow-ups)
    return "Next";
  };
  
  // Check if it is the absolute final screen (Step 12)
  const isFinalScreen = currentStep === totalSteps;

  // The total number of sub-steps calculation
  const totalBranchingSteps = branchingSteps.length; // 5
  const totalNonBranchingSteps = totalSteps - totalBranchingSteps; // 12 - 5 = 7
  const totalVirtualSteps = totalNonBranchingSteps + (totalBranchingSteps * 2); // 7 + 10 = 17

  let currentVirtualStep = 0;
  for (let i = 1; i <= currentStep; i++) {
    if (branchingSteps.includes(i)) {
      currentVirtualStep += 1; // Add 1 for the base step
      if (i === currentStep && subStep === 1) {
        currentVirtualStep += 1; // Add 1 for the follow-up step
      }
    } else {
      currentVirtualStep += 1;
    }
  }


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
              style={{ width: `${(currentVirtualStep / totalVirtualSteps) * 100}%` }}
            ></div>
          </div>
          {/* Skip button logic */}
          {!isFinalScreen ? (
            <button 
                onClick={handleNext}
                className="text-gray-500 hover:text-[#e72638] font-medium"
                // Skip button should advance even if the current required step is invalid, UNLESS it's a branching base step (subStep 0)
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