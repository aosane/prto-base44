import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Search, Tags } from 'lucide-react';

const steps = [
  {
    step: 1,
    title: "Décrivez votre cible",
    desc: "Tapez un mot-clé décrivant le type d'entreprise que vous cherchez.",
    example: '"Agence outbound"',
  },
  {
    step: 2,
    title: "L'IA génère des mots-clés",
    desc: "On analyse votre requête et on génère deux catégories de mots-clés.",
  },
  {
    step: 3,
    title: "Affinez vos résultats",
    desc: "Sélectionnez ou désélectionnez les mots-clés pour cibler précisément.",
  },
];

export default function DeepsearchTooltip() {
  const [activeStep, setActiveStep] = useState(0);
  const [demoText, setDemoText] = useState('');
  const [showKeywords, setShowKeywords] = useState(false);
  const [positionAbove, setPositionAbove] = useState(false);
  const tooltipRef = React.useRef(null);
  const parentRef = React.useRef(null);

  useEffect(() => {
    const checkPosition = () => {
      if (tooltipRef.current) {
        const rect = tooltipRef.current.getBoundingClientRect();
        if (rect.bottom > window.innerHeight - 20) {
          setPositionAbove(true);
        } else {
          setPositionAbove(false);
        }
      }
    };
    checkPosition();
    window.addEventListener('resize', checkPosition);
    return () => window.removeEventListener('resize', checkPosition);
  }, []);

  const demoInput = 'Agence outbound';
  const category1 = ['SaaS', 'Agency', 'Platform'];
  const category2 = ['Outbound', 'Lead Gen', 'Cold Email'];

  useEffect(() => {
    // Cycle through steps
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Typing animation for demo
  useEffect(() => {
    if (activeStep === 0) {
      setShowKeywords(false);
      setDemoText('');
      let i = 0;
      const interval = setInterval(() => {
        if (i < demoInput.length) {
          setDemoText(demoInput.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 80);
      return () => clearInterval(interval);
    } else if (activeStep === 1) {
      setDemoText(demoInput);
      const timeout = setTimeout(() => setShowKeywords(true), 600);
      return () => clearTimeout(timeout);
    } else {
      setDemoText(demoInput);
      setShowKeywords(true);
    }
  }, [activeStep]);

  return (
    <div 
      ref={tooltipRef}
      className={`absolute left-full ml-4 w-80 z-50 ${positionAbove ? 'bottom-0' : 'top-0'}`}
    >
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-5 shadow-xl">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-lg bg-purple-500 text-white flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h4 className="text-sm font-semibold text-purple-900">Comment ça marche ?</h4>
        </div>

        {/* Mini demo animation */}
        <div className="bg-white rounded-lg border border-purple-100 p-3 mb-4 space-y-2">
          {/* Fake input */}
          <div className="flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 rounded-md border border-gray-200">
            <Search className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-800 font-mono">
              {demoText}
              {activeStep === 0 && <span className="animate-pulse text-purple-500">|</span>}
            </span>
          </div>

          {/* Generated keywords */}
          <div
            className={`space-y-1.5 transition-all duration-500 overflow-hidden ${
              showKeywords ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex items-center gap-1.5 mt-1">
              <Tags className="w-3 h-3 text-blue-500" />
              <span className="text-[10px] font-medium text-gray-500 uppercase">Type</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {category1.map((k, i) => (
                <span
                  key={k}
                  className={`px-1.5 py-0.5 text-[10px] rounded-full transition-all duration-300 ${
                    activeStep === 2 && i === 0
                      ? 'bg-blue-500 text-white scale-105'
                      : 'bg-blue-50 text-blue-700'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {k}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <Tags className="w-3 h-3 text-purple-500" />
              <span className="text-[10px] font-medium text-gray-500 uppercase">Activité</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {category2.map((k, i) => (
                <span
                  key={k}
                  className={`px-1.5 py-0.5 text-[10px] rounded-full transition-all duration-300 ${
                    activeStep === 2 && i <= 1
                      ? 'bg-purple-500 text-white scale-105'
                      : 'bg-purple-50 text-purple-700'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {k}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-2.5">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`flex gap-2.5 p-2 rounded-lg transition-all duration-300 ${
                activeStep === i ? 'bg-white/80 shadow-sm border border-purple-100' : ''
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                  activeStep === i
                    ? 'bg-purple-500 text-white'
                    : 'bg-purple-100 text-purple-400'
                }`}
              >
                {s.step}
              </div>
              <div>
                <div className="text-xs font-semibold text-purple-900">{s.title}</div>
                <div className="text-[11px] text-purple-600 leading-relaxed">{s.desc}</div>
                {s.example && activeStep === i && (
                  <div className="mt-1 text-[10px] text-purple-400 italic">{s.example}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                activeStep === i ? 'w-4 bg-purple-500' : 'w-1 bg-purple-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}