import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Search, Check, X } from 'lucide-react';

const steps = [
  { title: "Décrivez votre cible", desc: "Tapez un mot-clé décrivant le type d'entreprise recherché." },
  { title: "L'IA génère des mots-clés", desc: "Des mots-clés pertinents sont générés automatiquement." },
  { title: "Incluez ou excluez", desc: "Cliquez sur chaque mot pour l'inclure ou l'exclure de la recherche." },
  { title: "Ajoutez les vôtres", desc: "Tapez vos propres mots-clés pour affiner encore plus." },
];

const demoInput = 'Agence outbound';
const keywords = [
  { label: 'SaaS', cat: 'type' },
  { label: 'Agency', cat: 'type' },
  { label: 'Platform', cat: 'type' },
  { label: 'Outbound', cat: 'activity' },
  { label: 'Lead Gen', cat: 'activity' },
  { label: 'Cold Email', cat: 'activity' },
];

export default function DeepsearchTooltip() {
  const [activeStep, setActiveStep] = useState(0);
  const [demoText, setDemoText] = useState('');
  const [showKeywords, setShowKeywords] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState({});
  const [cursorPos, setCursorPos] = useState({ x: 140, y: 30 });
  const [cursorVisible, setCursorVisible] = useState(true);
  const [cursorClicking, setCursorClicking] = useState(false);
  const [customWord, setCustomWord] = useState('');
  const containerRef = useRef(null);

  // Step cycle
  useEffect(() => {
    const durations = [3200, 2800, 4000, 3500];
    const timeout = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, durations[activeStep]);
    return () => clearTimeout(timeout);
  }, [activeStep]);

  // Animations per step
  useEffect(() => {
    if (activeStep === 0) {
      setShowKeywords(false);
      setSelectedKeywords({});
      setDemoText('');
      setCustomWord('');
      setCursorPos({ x: 100, y: 32 });
      let i = 0;
      const interval = setInterval(() => {
        if (i < demoInput.length) {
          setDemoText(demoInput.slice(0, i + 1));
          setCursorPos({ x: 100 + (i * 5), y: 32 });
          i++;
        } else {
          clearInterval(interval);
          // Move cursor to generate button
          setTimeout(() => {
            setCursorPos({ x: 140, y: 68 });
            setTimeout(() => {
              setCursorClicking(true);
              setTimeout(() => setCursorClicking(false), 200);
            }, 400);
          }, 300);
        }
      }, 90);
      return () => clearInterval(interval);
    } else if (activeStep === 1) {
      setDemoText(demoInput);
      setCursorPos({ x: 140, y: 100 });
      const timeout = setTimeout(() => setShowKeywords(true), 500);
      return () => clearTimeout(timeout);
    } else if (activeStep === 2) {
      setDemoText(demoInput);
      setShowKeywords(true);
      // Simulate cursor clicking on keywords
      const positions = [
        { x: 30, y: 120 }, // SaaS - include
        { x: 90, y: 120 }, // Agency - include
        { x: 40, y: 162 }, // Outbound - include
        { x: 120, y: 162 }, // Lead Gen - exclude
      ];
      const actions = ['include', 'include', 'include', 'exclude'];
      const kws = ['SaaS', 'Agency', 'Outbound', 'Lead Gen'];
      let step = 0;
      const animateClicks = () => {
        if (step >= positions.length) return;
        setCursorPos(positions[step]);
        setTimeout(() => {
          setCursorClicking(true);
          setSelectedKeywords(prev => ({ ...prev, [kws[step]]: actions[step] }));
          setTimeout(() => {
            setCursorClicking(false);
            step++;
            setTimeout(animateClicks, 400);
          }, 200);
        }, 500);
      };
      const t = setTimeout(animateClicks, 300);
      return () => clearTimeout(t);
    } else if (activeStep === 3) {
      setDemoText(demoInput);
      setShowKeywords(true);
      // Simulate typing a custom word
      const word = 'B2B';
      setCursorPos({ x: 100, y: 205 });
      let i = 0;
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          if (i < word.length) {
            setCustomWord(word.slice(0, i + 1));
            i++;
          } else {
            clearInterval(interval);
            // Click add
            setTimeout(() => {
              setCursorPos({ x: 200, y: 205 });
              setTimeout(() => {
                setCursorClicking(true);
                setSelectedKeywords(prev => ({ ...prev, 'B2B': 'include' }));
                setTimeout(() => setCursorClicking(false), 200);
              }, 400);
            }, 300);
          }
        }, 120);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [activeStep]);

  const getKeywordStyle = (label) => {
    const state = selectedKeywords[label];
    if (state === 'include') return 'bg-blue-500 text-white ring-2 ring-blue-300';
    if (state === 'exclude') return 'bg-red-500 text-white ring-2 ring-red-300';
    return '';
  };

  return (
    <div className="w-[340px]">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3.5 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Deepsearch</h4>
            <p className="text-[11px] text-purple-200">Recherche intelligente par mots-clés</p>
          </div>
        </div>

        {/* Demo area */}
        <div className="p-4 relative" ref={containerRef}>
          {/* Animated cursor */}
          {cursorVisible && (
            <div
              className="absolute z-50 pointer-events-none"
              style={{
                left: cursorPos.x,
                top: cursorPos.y,
                transition: 'left 0.5s cubic-bezier(0.22, 1, 0.36, 1), top 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <svg width="20" height="24" viewBox="0 0 20 24" fill="none" style={{
                transform: cursorClicking ? 'scale(0.85)' : 'scale(1)',
                transition: 'transform 0.15s ease',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
              }}>
                <path d="M1 1L1 18L5.5 13.5L9.5 21L12.5 19.5L8.5 12L14.5 12L1 1Z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
              {cursorClicking && (
                <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-purple-400/30 animate-ping" />
              )}
            </div>
          )}

          {/* Fake input */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 mb-2">
            <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="text-xs text-gray-800 font-medium">
              {demoText}
              {activeStep === 0 && <span className="inline-block w-0.5 h-3.5 bg-purple-500 ml-0.5 animate-pulse" />}
            </span>
          </div>

          {/* Fake generate button */}
          <div className="flex mb-3">
            <div className={`w-full text-center py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              activeStep === 0 ? 'bg-purple-600 text-white shadow-md shadow-purple-200' : 'bg-purple-100 text-purple-700'
            }`}>
              <Sparkles className="w-3 h-3 inline mr-1" />
              Générer
            </div>
          </div>

          {/* Keywords */}
          <div className={`space-y-2.5 transition-all duration-500 ${showKeywords ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
            <div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Type</div>
              <div className="flex flex-wrap gap-1.5">
                {keywords.filter(k => k.cat === 'type').map((k) => (
                  <span key={k.label} className={`px-2.5 py-1 text-[11px] font-medium rounded-full transition-all duration-300 ${getKeywordStyle(k.label) || 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
                    {selectedKeywords[k.label] === 'include' && <Check className="w-3 h-3 inline mr-0.5" />}
                    {selectedKeywords[k.label] === 'exclude' && <X className="w-3 h-3 inline mr-0.5" />}
                    {k.label}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Activité</div>
              <div className="flex flex-wrap gap-1.5">
                {keywords.filter(k => k.cat === 'activity').map((k) => (
                  <span key={k.label} className={`px-2.5 py-1 text-[11px] font-medium rounded-full transition-all duration-300 ${getKeywordStyle(k.label) || 'bg-purple-50 text-purple-700 border border-purple-200'}`}>
                    {selectedKeywords[k.label] === 'include' && <Check className="w-3 h-3 inline mr-0.5" />}
                    {selectedKeywords[k.label] === 'exclude' && <X className="w-3 h-3 inline mr-0.5" />}
                    {k.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Fake manual add */}
            <div className="pt-1">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Ajouter manuellement</div>
              <div className="flex items-center gap-1.5">
                <div className="flex-1 px-2.5 py-1.5 bg-gray-50 rounded-md border border-gray-200 text-[11px] text-gray-700 min-h-[26px]">
                  {customWord}
                  {activeStep === 3 && <span className="inline-block w-0.5 h-3 bg-purple-500 ml-0.5 animate-pulse" />}
                </div>
                <div className="px-2 py-1.5 bg-gray-100 rounded-md text-[11px] text-gray-500 font-medium">+ Ajouter</div>
              </div>
              {selectedKeywords['B2B'] && (
                <div className="mt-1.5 flex gap-1">
                  <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-blue-500 text-white">
                    <Check className="w-3 h-3 inline mr-0.5" />B2B
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="px-4 pb-4 space-y-1">
          {steps.map((s, i) => (
            <div key={i} className={`flex gap-2.5 px-3 py-2 rounded-xl transition-all duration-400 ${activeStep === i ? 'bg-purple-50 border border-purple-100' : 'opacity-60'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 transition-all duration-300 ${activeStep === i ? 'bg-purple-600 text-white shadow-md shadow-purple-200' : 'bg-gray-200 text-gray-400'}`}>
                {i + 1}
              </div>
              <div className="min-w-0">
                <div className={`text-xs font-semibold transition-colors duration-300 ${activeStep === i ? 'text-purple-900' : 'text-gray-500'}`}>{s.title}</div>
                {activeStep === i && (
                  <div className="text-[11px] text-purple-600 leading-relaxed mt-0.5">{s.desc}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="px-6 pb-4">
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-gray-100">
                <div className={`h-full rounded-full transition-all duration-500 ${activeStep === i ? 'bg-purple-500 w-full' : activeStep > i ? 'bg-purple-300 w-full' : 'w-0'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}