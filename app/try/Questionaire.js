// components/Questionnaire.js
"use client";
import React, { useState, useEffect } from "react";
import getQuestions, { conditionalFollowUps, healthConditionFollowUps } from "../data/questions";

// Branching step IDs (will be dynamically determined based on selected goal)
const BRANCHING_KEYS = {
  'dietType': 'Nutrition',
  'healthConditions': 'Nutrition', 
  'substanceUse': 'Nutrition',
  'activityLevel': 'Physical Activity',
  'tobaccoUse': 'Tobacco',
  'alcoholUse': 'Alcohol'
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

  // Initialize questions based on primary goal
  useEffect(() => {
    const primaryGoal = answers.primaryGoal;
    const allQuestions = getQuestions(primaryGoal, answers);
    setQuestions(allQuestions);
    
    // Identify branching steps based on the current question set
    const branchingStepIds = allQuestions
      .filter(question => Object.keys(BRANCHING_KEYS).includes(question.key))
      .map(question => question.id);
    
    setBranchingSteps(branchingStepIds);
  }, [answers.primaryGoal]);

  const totalSteps = questions.length;
  const currentStepData = questions.find(step => step.id === currentStep);
  
  const isBranchingStep = currentStepData ? branchingSteps.includes(currentStepData.id) : false;

  // Dynamically determine the key and answer for conditional logic
  let baseConditionalKey = null;
  let baseConditionalAnswer = null;
  
  if (currentStepData && isBranchingStep) {
    baseConditionalKey = currentStepData.key;
    baseConditionalAnswer = answers[baseConditionalKey];
  }

  // Handle health conditions multiselect conditional logic
  useEffect(() => {
    if (currentStepData?.key === 'healthConditions' && subStep === 1) {
      const selectedConditions = answers.healthConditions || {};
      const conditionQuestions = [];
      
      Object.keys(selectedConditions).forEach(conditionId => {
        if (selectedConditions[conditionId] && healthConditionFollowUps[conditionId] && conditionId !== 'none') {
          conditionQuestions.push(...healthConditionFollowUps[conditionId]);
        }
      });
      
      setHealthConditionQuestions(conditionQuestions);
    }
  }, [answers.healthConditions, currentStepData, subStep]);

  // Handle substance use multiselect conditional logic
  useEffect(() => {
    if (currentStepData?.key === 'substanceUse' && subStep === 1) {
      const selectedSubstances = answers.substanceUse || {};
      const substanceQuestions = [];
      
      Object.keys(selectedSubstances).forEach(substanceId => {
        if (selectedSubstances[substanceId] && conditionalFollowUps[substanceId] && substanceId !== 'none') {
          substanceQuestions.push(...conditionalFollowUps[substanceId]);
        }
      });
      
      setSubstanceUseQuestions(substanceQuestions);
    }
  }, [answers.substanceUse, currentStepData, subStep]);

  const conditionalQuestions = baseConditionalAnswer ? conditionalFollowUps[baseConditionalAnswer] : [];

  // Format health conditions for display (No longer used in description, but kept for console logging/debugging)
  const formatHealthConditions = (healthConditions) => {
    if (!healthConditions) return "None";
    
    const selectedConditions = Object.entries(healthConditions)
      .filter(([key, isSelected]) => isSelected && key !== 'none')
      .map(([conditionId]) => {
        const conditionMap = {
          'diabetes': 'Diabetes',
          'highBloodPressure': 'High blood pressure',
          'heartDisease': 'Heart disease / High cholesterol',
          'kidneyLiver': 'Kidney or liver problems',
          'cancer': 'Cancer (history/current)',
          'otherCondition': 'Other'
        };
        return conditionMap[conditionId] || conditionId;
      });
    
    return selectedConditions.length > 0 ? selectedConditions.join(', ') : "None";
  };

  // Format substance use for display (No longer used in description, but kept for console logging/debugging)
  const formatSubstanceUse = (substanceUse) => {
    if (!substanceUse) return "None";
    
    const selectedSubstances = Object.entries(substanceUse)
      .filter(([key, isSelected]) => isSelected && key !== 'none')
      .map(([substanceId]) => {
        const substanceMap = {
          'alcohol': 'Alcohol',
          'tobacco': 'Cigarettes / Tobacco',
          'drugs': 'Drugs (recreational / non-prescribed)'
        };
        return substanceMap[substanceId] || substanceId;
      });
    
    return selectedSubstances.length > 0 ? selectedSubstances.join(', ') : "None";
  };

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
      // subStep 0: Validate the base question
      if (subStep === 0) {
        if (currentStepData.key === 'healthConditions' || currentStepData.key === 'substanceUse') {
          // Health conditions and substance use are optional, so always valid unless required changes
          // The data in questions.js has 'required: false' for these, so they are valid.
          // For other branching radio types, baseConditionalAnswer (which is currentAnswer) must exist.
          return currentStepData.required ? !!baseConditionalAnswer : true;
        }
        return !!baseConditionalAnswer;
      }
      // subStep 1: Validate all conditional questions
      if (subStep === 1) {
        const followUpAnswers = answers.followUps || {};
        
        let questionsToValidate = [];
        if (currentStepData.key === 'healthConditions') {
          questionsToValidate = healthConditionQuestions;
        } else if (currentStepData.key === 'substanceUse') {
          questionsToValidate = substanceUseQuestions;
        } else {
          // Check if conditionalQuestions is an array before using it
          questionsToValidate = conditionalQuestions && Array.isArray(conditionalQuestions) ? conditionalQuestions : [];
        }

        return questionsToValidate.every(q => {
          if (q.required) {
            const answer = followUpAnswers[q.subKey];
            if (q.subType === 'radio') return !!answer;
            if (q.subType === 'multiselect') return Object.values(answer || {}).some(v => v === true);
            if (q.subType === 'text') return !!answer && answer.trim().length > 0;
          }
          return true;
        });
      }
    }
    // Case 2: Validation for NON-Branching Steps
    else {
      if (!currentStepData.required) return true;
      
      // Handle different input types
      if (currentStepData.type === 'text') {
        return !!currentAnswer && currentAnswer.trim().length > 0;
      }
      if (currentStepData.type === 'number' || currentStepData.type === 'radio') {
        return !!currentAnswer;
      }
      if (currentStepData.type === 'measurements') {
        const { height, weight } = currentAnswer || {};
        return !!height && !!weight && height > 0 && weight > 0;
      }
      if (currentStepData.type === 'multiselect') {
        // Now covers 'healthConditions', 'substanceUse', 'nutritionFocus', 'mainNutritionGoal'
        // 'healthConditions' and 'substanceUse' are required: false in questions.js, so they are technically valid if empty.
        // 'nutritionFocus' and 'mainNutritionGoal' are required: true, so they must have at least one selection.
        if (!currentStepData.required) return true;
        return Object.values(currentAnswer || {}).some(v => v === true);
      }
      return false;
    }
  };

  const handleNext = () => {
    // A. If on a Branching Step's Base Question (subStep 0)
    if (isBranchingStep && subStep === 0) {
      if (isStepValid()) {
        // Skip follow-ups for Balanced/Mediterranean and No specific diet
        if (currentStepData.key === 'dietType' && 
            (baseConditionalAnswer === "A mix of vegetables, fruits, grains, and some meat or fish (Balanced / Mediterranean)" ||
             baseConditionalAnswer === "I eat whatever I feel like, no specific pattern (No specific diet)")) {
          setCurrentStep(currentStep + 1);
          setSubStep(0);
        } else {
          setSubStep(1); // Move to follow-up questions
        }
      }
    }
    // B. If on the FINAL STEP
    else if (currentStep === totalSteps) {
      if (isStepValid()) {
        console.log("Questionnaire Complete! Final Answers:", answers);
        alert("Questionnaire Complete! Check console for final answers.");
      }
    }
    // C. If on a Branching Step's follow-ups (subStep 1) AND NOT the final step
    else if (isBranchingStep && subStep === 1 && currentStep < totalSteps) {
      if (isStepValid()) {
        setCurrentStep(currentStep + 1);
        setSubStep(0); // Reset subStep for the next main step
      }
    }
    // D. If on a NON-Branching Step
    else if (!isBranchingStep && currentStep < totalSteps) {
      if (isStepValid()) {
        // Special case: When primary goal is selected, move to the first goal-specific question
        if (currentStepData.key === 'primaryGoal') {
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
  const handleInputChange = (key, value, subKey = null, type = null) => {
    const currentKey = currentStepData.key;

    // Conditional Follow-Ups (Stored under the 'followUps' key)
    if (subKey && isBranchingStep) {
      setAnswers(prevAnswers => {
        const followUpAnswers = prevAnswers.followUps || {};
        const subSectionAnswer = followUpAnswers[subKey] || {};
        let newSubAnswer;
        if (type === 'multiselect') {
          newSubAnswer = { ...subSectionAnswer, [key]: !subSectionAnswer[key] };
        } else {
          // This handles radio and text inputs for follow-ups
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
    // Simple Multi-Select (Goals, Health Conditions, Substance Use, NutritionFocus, MainNutritionGoal)
    else if (currentStepData.type === 'multiselect') {
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        [currentKey]: {
          ...(prevAnswers[currentKey] || {}),
          [key]: !prevAnswers[currentKey]?.[key]
        }
      }));
    }
    // Single-Value Steps (Radio, Text, Number)
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
            className={`flex items-center p-4 rounded-xl cursor-pointer border-2 transition ${
              currentAnswer === option
                ? "bg-[#e0e4ef] border-[#e72638] shadow-md"
                : "bg-white border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => handleInputChange(option, option, subKey, 'radio')}
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

  // Renders Multiselect Options
  const renderMultiselectOptions = (options, currentAnswer, subKey = null) => {
    // Note: The key for handleInputChange is `option.id` for multiselect
    return (
      <div className="space-y-4 w-full">
        {options.map((option) => {
          const isSelected = currentAnswer?.[option.id] || false;
          return (
            <div
              key={option.id}
              className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border-2 transition ${
                isSelected
                  ? "bg-[#e0e4ef] border-[#e72638] shadow-md"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => handleInputChange(option.id, isSelected, subKey, 'multiselect')}
            >
              <div className="flex items-center">
                {option.icon && <span className="mr-3 text-xl">{option.icon}</span>}
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
    
    // Determine the correct set of questions to render
    let questionsToRender = [];
    if (currentStepData.key === 'healthConditions') {
      questionsToRender = healthConditionQuestions;
    } else if (currentStepData.key === 'substanceUse') {
      questionsToRender = substanceUseQuestions;
    } else {
      questionsToRender = conditionalQuestions || [];
    }

    return (
      <div className="w-full max-w-lg space-y-12 text-left">
        {questionsToRender.map((q) => {
          const currentSubAnswer = followUpAnswers[q.subKey];
          let answerValue = currentSubAnswer;
          // For multiselect/radio/text, answerValue is determined differently
          if (q.subType === 'multiselect') {
            answerValue = currentSubAnswer; // It's an object of {id: bool}
          }
          
          // Note: handleInputChange needs to be called correctly for text inputs
          // Since text inputs for follow-ups only take a single value, 
          // we pass null for subKey/type in handleInputChange
          return (
            <div key={q.subKey} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {q.subTitle}
                {q.required && <span className="text-[#e72638] ml-1">*</span>}
              </h3>
              {q.subType === 'radio' && renderRadioButtons(q.options, answerValue, q.subKey)}
              {q.subType === 'multiselect' && renderMultiselectOptions(q.options, answerValue, q.subKey)}
              {q.subType === 'text' && (
                <input
                  type="text"
                  // For text type follow-ups, the answer is the direct value under subKey, not an object/array
                  value={answerValue || ''}
                  onChange={(e) => handleInputChange(e.target.value, e.target.value, q.subKey, 'text')}
                  placeholder={q.placeholder}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#e72638] focus:ring-0 transition text-black"
                />
              )}
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
        if (currentStepData.type === 'radio') {
          return renderRadioButtons(currentStepData.options, answers[currentStepData.key]);
        } else if (currentStepData.type === 'multiselect') {
          return renderMultiselectOptions(currentStepData.options, answers[currentStepData.key]);
        }
      }
      if (subStep === 1) {
        // Conditional Follow-ups
        return renderConditionalFollowUps();
      }
    }

    // Handle all non-branching steps
    switch (currentStepData.type) {
      case 'text':
        return (
          <input
            type="text"
            value={answers[currentStepData.key] || ''}
            onChange={(e) => handleInputChange(currentStepData.key, e.target.value)}
            placeholder={currentStepData.placeholder}
            className="w-full max-w-lg p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#e72638] focus:ring-0 transition text-black"
          />
        );
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
    questions.forEach(question => {
      if (branchingSteps.includes(question.id)) {
        // Only count the branching step's base question if an answer was provided 
        // that triggers follow-ups. If the answer skips follow-ups, it's just 1 step.
        // For simplicity and a smoother progress bar, we count all branching steps as 2 
        // virtual steps unless the 'dietType' skip is triggered, but since the complexity 
        // is high, let's stick to the base logic for now, or simplify it to only main steps.
        // Sticking to original logic: each branching step has up to 2 steps.
        totalVirtualSteps += 1; 
      }
    });
    
    // Calculate current virtual step
    if (isBranchingStep && subStep === 1) {
      currentVirtualStep += 1;
    }
    
    // Clamp to 100% just in case of rounding errors on the final step
    return Math.min(100, (currentVirtualStep / totalVirtualSteps) * 100);
  };


  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section id="questionnaire" className="w-full min-h-screen bg-gray-50">
      {/* Header (Top progress bar and Skip button) */}
      <div className="w-full bg-white shadow-sm">
        <div className="max-w-3xl mx-auto py-5 px-4 flex justify-between items-center">
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
              // The skip button should be disabled only if the current step is required AND invalid
              // and if we are NOT on the final sub-step of a branching question, where 'Next' is the only option.
              disabled={currentStepData?.required && !isStepValid() && isBranchingStep && subStep === 0}
            >
              Skip
            </button>
          ) : (
            <span className="text-gray-500 font-medium opacity-0 select-none">Skip</span>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-center pt-10 md:pt-16 pb-10 px-4 md:pb-20 text-center">
        <div className="w-full max-w-lg mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            {currentStepData?.title}
          </h2>
          {/* Dynamic Description/Subtitle - REMOVED ANSWER DISPLAY */}
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