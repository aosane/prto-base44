import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DEMO_TEXT = 'Agence outbound';
const KEYWORDS_1 = ['SaaS', 'Agency', 'Platform'];
const KEYWORDS_2 = ['Outbound', 'Lead Gen', 'Cold Email'];

// Timeline phases (ms)
const PHASE = {
  CURSOR_TO_INPUT: 800,
  CLICK_INPUT: 200,
  TYPE_DELAY: 80,
  PAUSE_AFTER_TYPE: 400,
  CURSOR_TO_BUTTON: 600,
  CLICK_BUTTON: 200,
  KEYWORDS_APPEAR: 600,
  CURSOR_TO_KEYWORD_1: 500,
  CLICK_KEYWORD: 200,
  CURSOR_TO_KEYWORD_2: 400,
  SHOW_RESULT: 1200,
  RESET_PAUSE: 800,
};

export default function DeepsearchTooltip() {
  const [cursorPos, setCursorPos] = useState({ x: 160, y: -10 });
  const [cursorScale, setCursorScale] = useState(1);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [demoText, setDemoText] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [showKeywords, setShowKeywords] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [phase, setPhase] = useState('idle');
  const animRef = useRef(null);

  const clickCursor = () => {
    setCursorScale(0.8);
    setTimeout(() => setCursorScale(1), 150);
  };

  useEffect(() => {
    let cancelled = false;
    const delay = (ms) => new Promise(r => { animRef.current = setTimeout(r, ms); });

    const runAnimation = async () => {
      while (!cancelled) {
        // Reset
        setDemoText('');
        setInputFocused(false);
        setButtonPressed(false);
        setShowKeywords(false);
        setSelectedKeywords([]);
        setCursorVisible(true);
        setCursorPos({ x: 160, y: -10 });
        setPhase('idle');
        await delay(400);

        if (cancelled) break;

        // 1. Move cursor to input
        setCursorPos({ x: 80, y: 46 });
        setPhase('moving');
        await delay(PHASE.CURSOR_TO_INPUT);
        if (cancelled) break;

        // 2. Click input
        clickCursor();
        setInputFocused(true);
        setPhase('typing');
        await delay(PHASE.CLICK_INPUT);
        if (cancelled) break;

        // 3. Type text
        for (let i = 0; i < DEMO_TEXT.length; i++) {
          if (cancelled) break;
          setDemoText(DEMO_TEXT.slice(0, i + 1));
          await delay(PHASE.TYPE_DELAY);
        }
        if (cancelled) break;
        await delay(PHASE.PAUSE_AFTER_TYPE);
        if (cancelled) break;

        // 4. Move cursor to Generate button
        setCursorPos({ x: 155, y: 88 });
        setPhase('moving');
        await delay(PHASE.CURSOR_TO_BUTTON);
        if (cancelled) break;

        // 5. Click button
        clickCursor();
        setButtonPressed(true);
        setPhase('generating');
        await delay(PHASE.CLICK_BUTTON);
        setButtonPressed(false);
        if (cancelled) break;

        // 6. Keywords appear
        await delay(PHASE.KEYWORDS_APPEAR);
        setShowKeywords(true);
        if (cancelled) break;
        await delay(500);
        if (cancelled) break;

        // 7. Move cursor to first keyword (SaaS)
        setCursorPos({ x: 50, y: 144 });
        setPhase('selecting');
        await delay(PHASE.CURSOR_TO_KEYWORD_1);
        if (cancelled) break;
        clickCursor();
        setSelectedKeywords(['SaaS']);
        await delay(PHASE.CLICK_KEYWORD);
        if (cancelled) break;

        // 8. Move to second keyword (Outbound)
        setCursorPos({ x: 60, y: 186 });
        await delay(PHASE.CURSOR_TO_KEYWORD_2);
        if (cancelled) break;
        clickCursor();
        setSelectedKeywords(['SaaS', 'Outbound']);
        await delay(PHASE.CLICK_KEYWORD);
        if (cancelled) break;

        // 9. Show result
        setPhase('done');
        await delay(PHASE.SHOW_RESULT);
        if (cancelled) break;

        // 10. Fade cursor out, pause, restart
        setCursorVisible(false);
        await delay(PHASE.RESET_PAUSE);
      }
    };

    runAnimation();
    return () => {
      cancelled = true;
      if (animRef.current) clearTimeout(animRef.current);
    };
  }, []);

  return (
    <div className="w-80">
      <div className="bg-gradient-to-br from-[#1C64F2]/5 via-white to-[#1C64F2]/10 border border-[#1C64F2]/20 rounded-xl p-5 shadow-2xl relative overflow-hidden">
        {/* Decorative bg glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#1C64F2]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#1C64F2]/8 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4 relative z-10">
          <div className="w-7 h-7 rounded-lg bg-[#1C64F2] text-white flex items-center justify-center shadow-md shadow-[#1C64F2]/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">Comment ça marche ?</h4>
            <p className="text-[10px] text-gray-500">Découvrez Deepsearch en action</p>
          </div>
        </div>

        {/* Demo area */}
        <div className="relative bg-white rounded-lg border border-gray-200 shadow-sm z-10">
          {/* Animated cursor */}
          <AnimatePresence>
            {cursorVisible && (
              <motion.div
                className="absolute z-50 pointer-events-none"
                animate={{ x: cursorPos.x, y: cursorPos.y, scale: cursorScale, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.8 }}
              >
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                  <path d="M1 1L1 14.5L4.5 11L8.5 18L11 17L7 10L12 10L1 1Z" fill="white" stroke="#1C64F2" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
                {/* Click ripple */}
                <motion.div
                  className="absolute top-0 left-0 w-4 h-4 rounded-full bg-[#1C64F2]/20"
                  animate={{ scale: cursorScale < 1 ? [1, 2.5] : 0, opacity: cursorScale < 1 ? [0.6, 0] : 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fake input */}
          <div className={`mx-3 mt-3 flex items-center gap-2 px-2.5 py-2 rounded-md border transition-all duration-200 ${inputFocused ? 'border-[#1C64F2] ring-2 ring-[#1C64F2]/20 bg-white' : 'border-gray-200 bg-gray-50'}`}>
            <Sparkles className="w-3 h-3 text-[#1C64F2] flex-shrink-0" />
            <span className="text-xs text-gray-800 font-medium min-h-[16px] flex items-center">
              {demoText || <span className="text-gray-400">Décrivez votre cible...</span>}
              {inputFocused && phase === 'typing' && (
                <motion.span
                  className="inline-block w-[2px] h-3.5 bg-[#1C64F2] ml-0.5"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              )}
            </span>
          </div>

          {/* Generate button */}
          <div className="mx-3 mt-2">
            <div className={`w-full py-1.5 rounded-md text-[11px] font-semibold text-center transition-all duration-150 ${
              buttonPressed 
                ? 'bg-[#1854cc] text-white scale-[0.97] shadow-sm' 
                : 'bg-[#1C64F2] text-white shadow-md shadow-[#1C64F2]/25'
            }`}>
              <span className="flex items-center justify-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                Generate
              </span>
            </div>
          </div>

          {/* Keywords area */}
          <motion.div 
            className="mx-3 mt-2 mb-3 overflow-hidden"
            animate={{ height: showKeywords ? 'auto' : 0, opacity: showKeywords ? 1 : 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div className="pt-2 border-t border-gray-100 space-y-2.5">
              {/* Category 1 */}
              <div>
                <div className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Type d'entreprise</div>
                <div className="flex flex-wrap gap-1.5">
                  {KEYWORDS_1.map((k, i) => (
                    <motion.span
                      key={k}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.1, type: 'spring', stiffness: 300 }}
                      className={`px-2 py-0.5 text-[10px] font-medium rounded-full cursor-pointer transition-all duration-200 ${
                        selectedKeywords.includes(k)
                          ? 'bg-[#1C64F2] text-white shadow-sm shadow-[#1C64F2]/30 scale-105'
                          : 'bg-[#1C64F2]/10 text-[#1C64F2] hover:bg-[#1C64F2]/20'
                      }`}
                    >
                      {k}
                    </motion.span>
                  ))}
                </div>
              </div>
              {/* Category 2 */}
              <div>
                <div className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Activités</div>
                <div className="flex flex-wrap gap-1.5">
                  {KEYWORDS_2.map((k, i) => (
                    <motion.span
                      key={k}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 300 }}
                      className={`px-2 py-0.5 text-[10px] font-medium rounded-full cursor-pointer transition-all duration-200 ${
                        selectedKeywords.includes(k)
                          ? 'bg-[#1C64F2] text-white shadow-sm shadow-[#1C64F2]/30 scale-105'
                          : 'bg-[#1C64F2]/10 text-[#1C64F2] hover:bg-[#1C64F2]/20'
                      }`}
                    >
                      {k}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Steps indicator */}
        <div className="mt-4 space-y-2 relative z-10">
          {[
            { n: 1, title: 'Décrivez', desc: 'votre cible', active: phase === 'typing' },
            { n: 2, title: 'Générez', desc: 'des mots-clés IA', active: phase === 'generating' || (showKeywords && phase !== 'selecting' && phase !== 'done') },
            { n: 3, title: 'Affinez', desc: 'vos résultats', active: phase === 'selecting' || phase === 'done' },
          ].map((s) => (
            <div key={s.n} className="flex items-center gap-2.5">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-all duration-300 ${
                s.active 
                  ? 'bg-[#1C64F2] text-white shadow-md shadow-[#1C64F2]/30' 
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {s.n}
              </div>
              <div className={`transition-colors duration-300 ${s.active ? 'text-gray-900' : 'text-gray-400'}`}>
                <span className="text-[11px] font-semibold">{s.title}</span>
                <span className="text-[11px]"> {s.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-3 flex gap-1 relative z-10">
          {[0, 1, 2].map((i) => {
            const stepPhases = [['typing'], ['generating'], ['selecting', 'done']];
            const isActive = stepPhases[i].includes(phase);
            const isPast = i === 0 && !['idle', 'moving', 'typing'].includes(phase) ||
                           i === 1 && ['selecting', 'done'].includes(phase);
            return (
              <motion.div
                key={i}
                className="h-1 rounded-full flex-1"
                animate={{ 
                  backgroundColor: isActive ? '#1C64F2' : isPast ? '#1C64F2' : '#e5e7eb',
                  opacity: isActive ? 1 : isPast ? 0.4 : 0.3
                }}
                transition={{ duration: 0.3 }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}