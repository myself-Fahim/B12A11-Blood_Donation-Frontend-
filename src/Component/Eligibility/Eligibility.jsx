import React, { useState } from 'react';
import { CheckCircle, AlertCircle, ArrowRight, Activity, Heart, Calendar } from 'lucide-react';

const EligibilityChecker = () => {
  const [step, setStep] = useState(0); // 0: Start, 1: Quiz, 2: Result
  const [isEligible, setIsEligible] = useState(true);

  const quizQuestions = [
    "Are you between 18 and 65 years old?",
    "Do you weigh at least 50kg (110lbs)?",
    "Have you had a tattoo or piercing in the last 6 months?",
    "Are you currently taking any antibiotics or feeling unwell?"
  ];

  const handleAnswer = (answer, index) => {
    // Basic logic: "No" to the last two questions is required for eligibility
    if ((index >= 2 && answer === true) || (index < 2 && answer === false)) {
      setIsEligible(false);
    }
    
    if (index < quizQuestions.length - 1) {
      // Move to next question logic could go here
    } else {
      setStep(2);
    }
  };

  return (
    <section className="py-16 px-6 bg-slate-50">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Check Your Eligibility to Donate
        </h2>
        <p className="text-slate-600 mb-12 max-w-2xl mx-auto">
          Take our quick 3-step quiz to find out if you can help save lives today. 
          It only takes a minute!
        </p>

        {step === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Age & Weight Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <Activity className="text-blue-500 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800">Age & Weight</h3>
              <p className="text-slate-500 text-sm mb-6">Minimum 18 years and at least 50kg.</p>
              <button 
                onClick={() => setStep(1)}
                className="mt-auto w-full py-2 px-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Start
              </button>
            </div>

            {/* Health Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 flex flex-col items-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-red-400"></div>
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <Heart className="text-red-500 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800">Health</h3>
              <p className="text-slate-500 text-sm mb-6">General wellness and medication status.</p>
              <button 
                onClick={() => setStep(1)}
                className="mt-auto w-full py-2 px-4 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Take the Quiz
              </button>
            </div>

            {/* Recent Events Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                <Calendar className="text-orange-500 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800">Recent Events</h3>
              <p className="text-slate-500 text-sm mb-6">Recent travel, tattoos, or piercings.</p>
              <button 
                onClick={() => setStep(1)}
                className="mt-auto w-full py-2 px-4 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Check Now
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white p-10 rounded-3xl shadow-xl max-w-2xl mx-auto border border-slate-100">
             <div className="mb-8">
                <div className="h-2 w-full bg-slate-100 rounded-full">
                    <div className="h-2 bg-red-500 rounded-full w-1/2"></div>
                </div>
             </div>
             <h3 className="text-2xl font-bold mb-8 text-slate-800 italic">"Are you feeling healthy and well today?"</h3>
             <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => {
                    setIsEligible(false)
                    setStep(2)
                  }}
                  className="px-10 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all"
                >
                  No
                </button>

                <button 
                  onClick={() => setStep(2)}
                  className="px-10 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 shadow-lg shadow-red-200 transition-all"
                >
                  Yes
                </button>
             </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white p-10 rounded-3xl shadow-xl max-w-2xl mx-auto text-center border border-slate-100">
            {isEligible ? (
              <>
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-800">You are likely eligible!</h3>
                <p className="text-slate-600 mt-2 mb-8">Your contribution can save up to 3 lives.</p>
                <button className="bg-red-500 text-white px-8 py-3 rounded-xl font-bold flex items-center mx-auto hover:bg-red-600 transition-all">
                  Book an Appointment <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-800">Check with a Specialist</h3>
                <p className="text-slate-600 mt-2 mb-8">Based on your answers, you might need to wait a bit longer to donate.</p>
                <button onClick={() => setStep(0)} className="text-red-500 font-bold hover:underline">Try again</button>
              </>
            )}
          </div>
        )}

        <p className="mt-12 text-sm text-slate-400">
          * For specific medical questions, please consult with your healthcare provider or contact our team.
        </p>
      </div>
    </section>
  );
};

export default EligibilityChecker;