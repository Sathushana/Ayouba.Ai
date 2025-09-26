"use client";
import React, { useState, useEffect } from "react";
// Import the data from the new file
import stepsData from "../data/questions"; 

export default function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const totalSteps = stepsData.length;
  const currentStepData = stepsData.find(step => step.id === currentStep);

  // --- BMI Calculation Function ---
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

    if (!currentStepData.required) return true;
    
    // Logic for single-value inputs (Age, Radio)
    if (currentStepData.type === 'number' || currentStepData.type === 'radio') {
      return !!currentAnswer;
    }

    // Logic for multi-inputs (Height/Weight)
    if (currentStepData.type === 'measurements') {
      const { height, weight } = currentAnswer || {};
      return !!height && !!weight && height > 0 && weight > 0;
    }

    // Logic for multi-select (Goals)
    if (currentStepData.type === 'multiselect') {
      return Object.values(currentAnswer || {}).some(v => v === true);
    }

    return false;
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      // You can still navigate forward even if the step is invalid, by clicking "Skip"
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Questionnaire Complete! Final Answers:", answers);
      alert("Questionnaire Complete! Check console for final answers.");
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // --- Input Change Handler (used by all input types) ---

  const handleInputChange = (key, value) => {
    const currentKey = currentStepData.key;

    if (currentStepData.type === 'measurements') {
      // For multi-input steps, update the nested object
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        [currentKey]: {
          ...(prevAnswers[currentKey] || {}),
          [key]: value
        }
      }));
    } else if (currentStepData.type === 'multiselect') {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [currentKey]: {
                ...(prevAnswers[currentKey] || {}),
                [key]: !prevAnswers[currentKey]?.[key]
            }
        }));
    } else {
   
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        [currentKey]: value
      }));
    }
  };


  // --- Step UI Renderers ---
  

  const renderNumberInput = () => {
    const currentAnswer = answers[currentStepData.key] || '';
    return (
      <input
        type="number"
        value={currentAnswer}
        onChange={(e) => handleInputChange(currentStepData.key, parseInt(e.target.value) || '')}
        placeholder={currentStepData.placeholder}
        className="w-full max-w-lg p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-[#e72638] focus:ring-0 transition text-black"
        min="1"
        max="120"
      />
    );
  };

  // Renders the Sex Radio Buttons (type: radio)
  const renderRadioButtons = () => {
    const currentAnswer = answers[currentStepData.key];
    return (
      <div className="space-y-4 w-full max-w-lg">
        {currentStepData.options.map((option) => (
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
            onClick={() => handleInputChange(currentStepData.key, option)}
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
            <span className="text-base text-gray-700 font-medium">{option}</span>
          </div>
        ))}
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

  // Renders the Goals Multi-Select (type: multiselect)
  const renderGoalsMultiSelect = () => {
    const currentAnswer = answers[currentStepData.key] || {};
    return (
      <div className="space-y-4 w-full max-w-lg">
        {currentStepData.options.map((option) => (
          <div
            key={option.id}
            className={`
              flex items-center justify-between p-4 rounded-xl cursor-pointer transition 
              ${
                currentAnswer[option.id]
                  ? "bg-[#e0e4ef] border-2 border-[#e72638] shadow-md"
                  : "bg-white border border-gray-200 hover:bg-gray-50"
              }
            `}
            onClick={() => handleInputChange(option.id, currentAnswer[option.id] || false)}
          >
            <div className="flex items-center">
              <span className="mr-3 text-xl">{option.icon}</span>
              <span className="text-base text-gray-700 font-medium">
                {option.label}
              </span>
            </div>
            {/* The checkbox indicator */}
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition 
                ${
                  currentAnswer[option.id]
                    ? "bg-[#e72638] border-[#e72638]"
                    : "bg-white border-gray-400"
                }`}
            >
              {currentAnswer[option.id] && (
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
        ))}
      </div>
    );
  };

  const renderStepContent = () => {
    if (!currentStepData) return <p>Step not found.</p>;

    switch (currentStepData.type) {
      case 'number':
        return renderNumberInput();
      case 'radio':
        return renderRadioButtons();
      case 'measurements':
        return renderMeasurements();
      case 'multiselect':
        return renderGoalsMultiSelect();
      default:
        return <p>Invalid step type.</p>;
    }
  };

  return (
    <section id="questionnaire" className="w-full min-h-screen bg-gray-50">
      {/* Header (Top progress bar and Skip button) */}
      <div className="w-full bg-white shadow-sm">
        <div className="max-w-3xl mx-auto py-4 px-4 flex justify-between items-center">
          <div className="text-xl font-bold text-[#e72638]">Ayouba.AI</div>
          <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-[#e72638] rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          {currentStep < totalSteps ? (
            <button 
                onClick={handleNext}
                className="text-gray-500 hover:text-[#e72638] font-medium"
            >
                Skip
            </button>
          ) : (
            <span className="text-gray-500 font-medium">Final Step</span>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-center py-10 px-4 md:py-20">
        <div className="w-full max-w-lg text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            {currentStepData?.title}
          </h2>
          <p className="text-base text-gray-600 mb-6">
            {currentStepData?.description}
          </p>
        </div>

        {/* Step-specific Input/Options */}
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="mt-10 flex gap-4 w-full max-w-lg">
          {currentStep > 1 && (
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
            className={`flex-1 py-3 rounded-xl font-semibold transition 
              ${
                currentStepData?.required && !isStepValid() && currentStep < totalSteps
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-[#e72638] text-white hover:bg-[#c71f40]"
              }`}
          >
            {currentStep < totalSteps ? "Next" : "Finish"}
          </button>
        </div>
      </div>

    </section>
  );
}