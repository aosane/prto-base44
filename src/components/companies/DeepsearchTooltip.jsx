import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

const DEMO_TEXT = 'Agence outbound';
const KEYWORDS_TYPE = ['SaaS', 'Agency', 'Platform'];
const KEYWORDS_ACTIVITY = ['Outbound', 'Lead Gen', 'Cold Email'];

const STEPS = [
  { duration: 3200, label: 'Décrivez votre cible' },
  { duration: 2800, label: "L'IA génère des mots-clés" },
  { duration: 3000, label: 'Incluez ou excluez' },
];

function AnimatedCursor({ x, y, clicking }) {
  return (
    <div
      className="absolute z-50 pointer-events-none"
      style={{
        left: x,
        top: y,
        transition: 'left 0.6s cubic-bezier(0.4, 0, 0.2, 1), top 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <svg width="20" height="24" viewBox="0 0 20 24" fill="none" className={`drop-shadow-md transition-transform duration-150 ${clicking ? 'scale-90' : 'scale-100'}`}>
        <path d="M1 1L1 17.5L5.5 13.5L9 21L12 19.5L8.5 12L14 12L1 1Z" fill="white" stroke="#1C64F2" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      {clicking && (
        <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-[#1C64F2]/30 animate-ping" />
      )}
    </div>
  );
}

export default function DeepsearchTooltip() {
  const [phase, setPhase] = useState(0); // 0=typing, 1=click generate, 2=keywords appear, 3=include/exclude
  const [typedText, setTypedText] = useState('');
  const [cursorPos, setCursorPos] = useState({ x: 120, y: 8 });
  const [clicking, setClicking] = useState(false);
  const [showKeywords, setShowKeywords] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const generateBtnRef = useRef(null);
  const keywordRefs = useRef({});

  // Main animation loop
  useEffect(() => {
    let cancelled = false;
    const delay = (ms) => new Promise(r => { const t = setTimeout(r, ms); return () => clearTimeout(t); });

    async function runAnimation() {
      while (!cancelled) {
        // Reset
        setPhase(0);
        setTypedText('');
        setShowKeywords(false);
        setSelectedKeywords({});
        setActiveStep(0);
        setCursorPos({ x: 140, y: 42 });

        await delay(600);
        if (cancelled) return;

        // Phase 0: Typing with cursor on input
        setCursorPos({ x: 55, y: 42 });
        await delay(700);

        // Click on input
        setClicking(true);
        await delay(200);
        setClicking(false);
        await delay(300);

        // Type text
        for (let i = 0; i <= DEMO_TEXT.length; i++) {
          if (cancelled) return;
          setTypedText(DEMO_TEXT.slice(0, i));
          await delay(75 + Math.random() * 40);
        }
        await delay(600);

        // Phase 1: Move to generate button and click
        setPhase(1);
        setActiveStep(1);
        setCursorPos({ x: 100, y: 90 });
        await delay(700);

        setClicking(true);
        await delay(250);
        setClicking(false);
        await delay(400);

        // Phase 2: Keywords appear
        setPhase(2);
        setShowKeywords(true);
        await delay(1200);

        // Phase 3: Include/exclude actions
        setPhase(3);
        setActiveStep(2);

        // Move to "SaaS" and include it
        setCursorPos({ x: 36, y: 148 });
        await delay(700);
        setClicking(true);
        await delay(200);
        setSelectedKeywords(prev => ({ ...prev, 'SaaS': 'included' }));
        setClicking(false);
        await delay(500);

        // Move to "Platform" and exclude it
        setCursorPos({ x: 152, y: 148 });
        await delay(700);
        setClicking(true);
        await delay(200);
        setSelectedKeywords(prev => ({ ...prev, 'Platform': 'excluded' }));
        setClicking(false);
        await delay(500);

        // Move to "Outbound" and include it
        setCursorPos({ x: 54, y: 198 });
        await delay(700);
        setClicking(true);
        await delay(200);
        setSelectedKeywords(prev => ({ ...prev, 'Outbound': 'included' }));
        setClicking(false);
        await delay(500);

        // Move to "Cold Email" and exclude it
        setCursorPos({ x: 162, y: 198 });
        await delay(700);
        setClicking(true);
        await delay(200);
        setSelectedKeywords(prev => ({ ...prev, 'Cold Email': 'excluded' }));
        setClicking(false);

        await delay(2000);
      }
    }

    runAnimation();
    return () => { cancelled = true; };
  }, []);

  const getKeywordStyle = (keyword) => {
    const state = selectedKeywords[keyword];
    if (state === 'included') return 'bg-blue-500 text-white ring-2 ring-blue-300';
    if (state === 'excluded') return 'bg-red-500 text-white ring-2 ring-red-300 line-through';
    return '';
  };

  return (
    <div className="w-[340px]">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Deepsearch</h4>
              <p className="text-[11px] text-white/70">Trouvez des entreprises par mots-clés IA</p>
            </div>
          </div>
        </div>

        {/* Interactive demo */}
        <div className="p-4 relative" ref={containerRef}>
          <AnimatedCursor x={cursorPos.x} y={cursorPos.y} clicking={clicking} />

          {/* Fake input */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 ${phase === 0 ? 'border-purple-400 ring-2 ring-purple-100 bg-white' : 'border-gray-200 bg-gray-50'}`}>
            <span className="text-xs text-gray-800 font-medium min-h-[16px] flex items-center">
              {typedText || <span className="text-gray-400">Décrivez votre cible...</span>}
              {phase === 0 && typedText.length < DEMO_TEXT.length && (
                <span className="ml-0.5 w-[2px] h-3.5 bg-purple-500 animate-pulse inline-block" />
              )}
            </span>
          </div>

          {/* Fake generate button */}
          <div
            ref={generateBtnRef}
            className={`mt-2.5 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
              phase === 1
                ? 'bg-purple-700 text-white scale-[0.98] shadow-inner'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Générer les mots-clés
          </div>

          {/* Keywords section */}
          <div className={`mt-3 space-y-3 transition-all duration-500 ${showKeywords ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
            {/* Type keywords */}
            <div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Business Type</div>
              <div className="flex flex-wrap gap-1.5">
                {KEYWORDS_TYPE.map((k) => (
                  <span
                    key={k}
                    ref={el => keywordRefs.current[k] = el}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-full cursor-pointer transition-all duration-300 ${
                      getKeywordStyle(k) || 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    }`}
                  >
                    {selectedKeywords[k] === 'included' && '✓ '}
                    {selectedKeywords[k] === 'excluded' && '✕ '}
                    {k}
                  </span>
                ))}
              </div>
            </div>

            {/* Activity keywords */}
            <div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Activities</div>
              <div className="flex flex-wrap gap-1.5">
                {KEYWORDS_ACTIVITY.map((k) => (
                  <span
                    key={k}
                    ref={el => keywordRefs.current[k] = el}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-full cursor-pointer transition-all duration-300 ${
                      getKeywordStyle(k) || 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                    }`}
                  >
                    {selectedKeywords[k] === 'included' && '✓ '}
                    {selectedKeywords[k] === 'excluded' && '✕ '}
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Steps indicator */}
        <div className="px-4 pb-4 space-y-2">
          <div className="h-px bg-gray-100 mb-3" />
          {STEPS.map((step, i) => (
            <div key={i} className={`flex items-center gap-2.5 transition-all duration-400 ${activeStep === i ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-all duration-300 ${
                activeStep === i ? 'bg-purple-600 text-white shadow-md shadow-purple-200' : activeStep > i ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {activeStep > i ? '✓' : i + 1}
              </div>
              <span className={`text-xs transition-colors duration-300 ${activeStep === i ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
          ))}

          {/* Progress bar */}
          <div className="flex gap-1 mt-2 pt-2">
            {STEPS.map((_, i) => (
              <div key={i} className="flex-1 h-1 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    activeStep >= i ? 'bg-gradient-to-r from-purple-500 to-indigo-500 w-full' : 'w-0'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}