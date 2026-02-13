import React, { useState, useEffect } from 'react';
import { Sparkles, Search, MousePointerClick, SlidersHorizontal, ArrowRight } from 'lucide-react';

const demoInput = 'Agence outbound B2B';
const category1 = ['SaaS', 'Agency', 'Consulting', 'Platform'];
const category2 = ['Outbound', 'Lead Gen', 'Cold Email', 'ABM'];

export default function DeepsearchTooltip() {
  const [activeStep, setActiveStep] = useState(0);
  const [demoText, setDemoText] = useState('');
  const [showKeywords, setShowKeywords] = useState(false);
  const [selectedCat1, setSelectedCat1] = useState([]);
  const [selectedCat2, setSelectedCat2] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeStep === 0) {
      setShowKeywords(false);
      setSelectedCat1([]);
      setSelectedCat2([]);
      setDemoText('');
      let i = 0;
      const interval = setInterval(() => {
        if (i < demoInput.length) {
          setDemoText(demoInput.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 65);
      return () => clearInterval(interval);
    } else if (activeStep === 1) {
      setDemoText(demoInput);
      setSelectedCat1([]);
      setSelectedCat2([]);
      const timeout = setTimeout(() => setShowKeywords(true), 400);
      return () => clearTimeout(timeout);
    } else {
      setDemoText(demoInput);
      setShowKeywords(true);
      // Animate selections one by one
      const timers = [];
      timers.push(setTimeout(() => setSelectedCat1(['SaaS']), 300));
      timers.push(setTimeout(() => setSelectedCat1(['SaaS', 'Agency']), 700));
      timers.push(setTimeout(() => setSelectedCat2(['Outbound']), 1100));
      timers.push(setTimeout(() => setSelectedCat2(['Outbound', 'Cold Email']), 1500));
      return () => timers.forEach(clearTimeout);
    }
  }, [activeStep]);

  const steps = [
    { icon: Search, label: 'Décrivez', color: 'text-blue-500' },
    { icon: Sparkles, label: 'Générez', color: 'text-purple-500' },
    { icon: MousePointerClick, label: 'Affinez', color: 'text-emerald-500' },
  ];

  return (
    <div className="w-[340px]">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/80 overflow-hidden">
        
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 px-5 pt-5 pb-10">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)' }} />
          <div className="relative">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-white/90" />
              <span className="text-white font-semibold text-sm">Deepsearch AI</span>
            </div>
            <p className="text-white/70 text-xs leading-relaxed">
              Trouvez des entreprises avec une simple description en langage naturel.
            </p>
          </div>
        </div>

        {/* Demo card overlapping header */}
        <div className="px-4 -mt-6 mb-4 relative z-10">
          <div className="bg-gray-50 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Fake input */}
            <div className="flex items-center gap-2 px-3 py-2.5 bg-white border-b border-gray-100">
              <Search className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
              <span className="text-xs text-gray-800 font-medium truncate">
                {demoText}
                {activeStep === 0 && <span className="animate-pulse text-purple-500 ml-px">|</span>}
              </span>
              {activeStep === 0 && demoText.length === demoInput.length && (
                <div className="ml-auto flex-shrink-0">
                  <div className="px-2 py-0.5 bg-purple-600 text-white text-[9px] font-medium rounded-md flex items-center gap-1 animate-pulse">
                    <Sparkles className="w-2.5 h-2.5" /> Générer
                  </div>
                </div>
              )}
            </div>

            {/* Keywords area */}
            <div className={`transition-all duration-500 ease-out ${showKeywords ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-3 space-y-2.5">
                {/* Category 1 */}
                <div>
                  <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Type d'entreprise</div>
                  <div className="flex flex-wrap gap-1.5">
                    {category1.map((k, i) => {
                      const isSelected = selectedCat1.includes(k);
                      return (
                        <span
                          key={k}
                          className={`px-2 py-1 text-[11px] font-medium rounded-lg transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-sm shadow-blue-200 scale-105'
                              : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
                          }`}
                          style={{ transitionDelay: `${i * 80}ms` }}
                        >
                          {k}
                        </span>
                      );
                    })}
                  </div>
                </div>
                {/* Category 2 */}
                <div>
                  <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Activités</div>
                  <div className="flex flex-wrap gap-1.5">
                    {category2.map((k, i) => {
                      const isSelected = selectedCat2.includes(k);
                      return (
                        <span
                          key={k}
                          className={`px-2 py-1 text-[11px] font-medium rounded-lg transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? 'bg-purple-600 text-white shadow-sm shadow-purple-200 scale-105'
                              : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300'
                          }`}
                          style={{ transitionDelay: `${i * 80}ms` }}
                        >
                          {k}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Result hint */}
                {activeStep === 2 && selectedCat2.length > 0 && (
                  <div className="flex items-center gap-1.5 pt-1 text-[10px] text-emerald-600 font-medium animate-in fade-in">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    243 entreprises trouvées
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Step indicators */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = activeStep === i;
              const isPast = activeStep > i;
              return (
                <React.Fragment key={i}>
                  <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all duration-300 ${
                    isActive ? 'bg-gray-100' : ''
                  }`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive ? 'bg-gray-900 text-white' : isPast ? 'bg-gray-300 text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Icon className="w-2.5 h-2.5" />
                    </div>
                    <span className={`text-[11px] font-medium transition-colors duration-300 ${
                      isActive ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <ArrowRight className={`w-3 h-3 flex-shrink-0 transition-colors duration-300 ${
                      isPast ? 'text-gray-400' : 'text-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}