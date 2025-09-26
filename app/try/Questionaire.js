"use client";
import React, { useState } from "react";
import stepsData, { conditionalFollowUps } from "../data/questions"; 

// The IDs for the branching steps (CORRECTED IDs)
const ACTIVITY_STEP_ID = 5; 
const NUTRITION_STEP_ID = 6; 
const APP_NAME = "Ayubo";

export default function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(1);
  // subStep: 0 for base question, 1 for follow-up questions
  const [subStep, setSubStep] = useState(0); 
  const [answers, setAnswers] = useState({});
  const totalSteps = stepsData.length; // totalSteps is now 6

  const currentStepData = stepsData.find(step => step.id === currentStep);
  
  // Dynamically determine the key and answer for conditional logic
  let baseConditionalKey = null;
  let baseConditionalAnswer = null;

  if (currentStep === ACTIVITY_STEP_ID) {
    baseConditionalKey = 'activityLevel';
    baseConditionalAnswer = answers.activityLevel;
  } else if (currentStep === NUTRITION_STEP_ID) {
    baseConditionalKey = 'sugarIntake';
    baseConditionalAnswer = answers.sugarIntake;
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
    const isBranchingStep = currentStep === ACTIVITY_STEP_ID || currentStep === NUTRITION_STEP_ID;


    // Case 1: Validation for Branching Steps (Step 5 & 6)
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
    
    // Case 2: Validation for NON-Branching Steps (Steps 1, 2, 3, 4)
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
    const isBranchingStep = currentStep === ACTIVITY_STEP_ID || currentStep === NUTRITION_STEP_ID;
    
    // A. If on a Branching Step's Base Question (Step 5 or 6, subStep 0)
    if (isBranchingStep && subStep === 0) {
      if (isStepValid()) {
        setSubStep(1); // Move to follow-up questions
      }
    } 
    // B. If on the FINAL STEP (Step 6) and on the follow-up questions (subStep 1)
    else if (currentStep === totalSteps && subStep === 1) { 
        if (isStepValid()) {
            console.log("Questionnaire Complete! Final Answers:", answers);
            alert("Questionnaire Complete! Check console for final answers.");
        }
    } 
    // C. If on a Branching Step's follow-ups (subStep 1) AND NOT the final step (i.e., Step 5)
    else if (isBranchingStep && subStep === 1 && currentStep < totalSteps) {
         if (isStepValid()) {
            setCurrentStep(currentStep + 1);
            setSubStep(0); // Reset subStep for the next main step
         }
    }
    // D. If on a NON-Branching Step (Steps 1, 2, 3, 4)
    else if (!isBranchingStep && currentStep < totalSteps) {
      if (isStepValid()) {
        setCurrentStep(currentStep + 1);
      }
    } 
  };
  
  const handleBack = () => {
    const isBranchingStep = currentStep === ACTIVITY_STEP_ID || currentStep === NUTRITION_STEP_ID;

    // If on a Branching Step (5 or 6) and on follow-up questions, go back to base question
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
    const isBranchingStep = currentStep === ACTIVITY_STEP_ID || currentStep === NUTRITION_STEP_ID;
    
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
    // Single-Value Steps (Age, Sex, Primary Goal, Base Activity Level, Base Sugar Intake)
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
      // Mobile Alignment Fix: Removing w-full here ensures proper width constraint from parent
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
                      flex items-center justify-between p-4 rounded-xl cursor-pointer transition 
                      ${
                        isSelected
                          ? "bg-[#e0e4ef] border-2 border-[#e72638] shadow-md"
                          : "bg-white border border-gray-200 hover:bg-gray-50"
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
  
  // Renders the Conditional Follow-Up Questions (subStep 1 of Step 5 or 6)
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

    // Handle Branching Steps (Step 5 & 6)
    if (currentStep === ACTIVITY_STEP_ID || currentStep === NUTRITION_STEP_ID) {
        if (subStep === 0) {
            // Base Question (Radio)
            return renderRadioButtons(currentStepData.options, answers[currentStepData.key]);
        }
        if (subStep === 1) {
            // Conditional Follow-ups
            return renderConditionalFollowUps();
        }
    }
    
    // Handle all non-branching steps (Steps 1, 2, 3, 4)
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
    // If it is the final main step (6) AND the final sub-step (1)
    if (currentStep === totalSteps && subStep === 1) {
      return "Finish";
    }
    // If it is any base step of a branching section (5 or 6)
    if ((currentStep === ACTIVITY_STEP_ID || currentStep === NUTRITION_STEP_ID) && subStep === 0) {
      return "Continue";
    }
    // All other steps (Steps 1, 2, 3, 4)
    return "Next";
  };
  
  // Check if it is the absolute final screen (Step 6, subStep 1)
  const isFinalScreen = currentStep === totalSteps && subStep === 1;

  // The total number of sub-steps is 2*totalSteps (12 total virtual steps)
  const currentVirtualStep = (currentStep - 1) * 2 + (subStep === 1 ? 2 : 1);
  const totalVirtualSteps = totalSteps * 2;


  return (
    <section id="questionnaire" className="w-full min-h-screen bg-gray-50">
      {/* Header (Top progress bar and Skip button) */}
      <div className="w-full bg-white shadow-sm pt-20">
        {/* MODIFIED: Reverting to moderate py-5 padding for better vertical spacing */}
        <div className="max-w-3xl mx-auto py-5 px-4 flex justify-between items-center">
          <div className="text-xl font-bold text-[#e72638]">{APP_NAME}</div>
          <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-[#e72638] rounded-full transition-all duration-500"
              style={{ width: `${(currentVirtualStep / totalVirtualSteps) * 100}%` }}
            ></div>
          </div>
          {/* Skip button is ONLY visible if it's NOT the final screen */}
          {!isFinalScreen ? (
            <button 
                onClick={handleNext}
                className="text-gray-500 hover:text-[#e72638] font-medium"
                // Simplified disabled check for Skip
                disabled={currentStepData?.required && !isStepValid() && currentStep !== ACTIVITY_STEP_ID && currentStep !== NUTRITION_STEP_ID}
            >
                Skip
            </button>
          ) : (
            // Empty placeholder to keep layout consistent when Skip is hidden
            <span className="text-gray-500 font-medium opacity-0 select-none">Skip</span> 
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {/* MODIFIED: Increased pt-16 for desktop to push content below the header, ensuring no overlap */}
      <div className="flex flex-col items-center justify-center pt-10 md:pt-16 pb-10 px-4 md:pb-20 text-center">
        <div className="w-full max-w-lg mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            {currentStepData?.title}
          </h2>
          {/* Dynamic Description/Subtitle */}
          <p className="text-base text-gray-600 mb-6">
            {currentStep === NUTRITION_STEP_ID && subStep === 1
                ? `${currentStepData?.description} Answer: ${baseConditionalAnswer}`
                : currentStep === ACTIVITY_STEP_ID && subStep === 1
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
            // Disable button if required and not valid, regardless of whether it's the final step
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

      
    </section>
  );
}