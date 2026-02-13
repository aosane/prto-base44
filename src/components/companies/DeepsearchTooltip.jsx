import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Search, MousePointer2 } from 'lucide-react';

const PHASES = {
  IDLE: 0,
  TYPING: 1,
  MOVE_TO_BUTTON: 2,
  CLICK_BUTTON: 3,
  GENERATING: 4,
  KEYWORDS_APPEAR: 5,
  MOVE_TO_KEYWORD_1: 6,
  CLICK_KEYWORD_1: 7,
  MOVE_TO_KEYWORD_2: 8,
  CLICK_KEYWORD_2: 9,
  DONE: 10,
};

export default function DeepsearchTooltip() {
  const [phase, setPhase] = useState(PHASES.IDLE);
  const [typedText, setTypedText] = useState('');
  const [cursorPos, setCursorPos] = useState({ x: 140, y: 36 });
  const [showKeywords, setShowKeywords] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [cursorClick, setCursorClick] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const inputText = 'Agence outbound';
  const category1 = ['SaaS', 'Agency', 'Platform', 'Consulting'];
  const category2 = ['Outbound', 'Lead Gen', 'Cold Email'];

  const buttonRef = useRef(null);
  const keyword1Ref = useRef(null);
  const keyword2Ref = useRef(null);
  const containerRef = useRef(null);

  // Utility: get position relative to container
  const getRelPos = (elRef) => {
    if (!elRef.current || !containerRef.current) return { x: 140, y: 100 };
    const container = containerRef.current.getBoundingClientRect();
    const el = elRef.current.getBoundingClientRect();
    return {
      x: el.left - container.left + el.width / 2,
      y: el.top - container.top + el.height / 2,
    };
  };

  const triggerClick = () => {
    setCursorClick(true);
    setTimeout(() => setCursorClick(false), 200);
  };

  // Main animation orchestrator
  useEffect(() => {
    let timeout;
    const reset = () => {
      setTypedText('');
      setShowKeywords(false);
      setSelectedKeywords([]);
      setShowSpinner(false);
      setCursorPos({ x: 140, y: 36 });
      setPhase(PHASES.TYPING);
    };

    switch (phase) {
      case PHASES.IDLE:
        timeout = setTimeout(reset, 800);
        break;

      case PHASES.TYPING:
        // Already handled by separate effect
        break;

      case PHASES.MOVE_TO_BUTTON:
        timeout = setTimeout(() => {
          const pos = getRelPos(buttonRef);
          setCursorPos(pos);
          timeout = setTimeout(() => setPhase(PHASES.CLICK_BUTTON), 600);
        }, 300);
        break;

      case PHASES.CLICK_BUTTON:
        triggerClick();
        setShowSpinner(true);
        timeout = setTimeout(() => setPhase(PHASES.GENERATING), 250);
        break;

      case PHASES.GENERATING:
        timeout = setTimeout(() => {
          setShowSpinner(false);
          setShowKeywords(true);
          setPhase(PHASES.KEYWORDS_APPEAR);
        }, 1200);
        break;

      case PHASES.KEYWORDS_APPEAR:
        timeout = setTimeout(() => setPhase(PHASES.MOVE_TO_KEYWORD_1), 700);
        break;

      case PHASES.MOVE_TO_KEYWORD_1:
        timeout = setTimeout(() => {
          const pos = getRelPos(keyword1Ref);
          setCursorPos(pos);
          timeout = setTimeout(() => setPhase(PHASES.CLICK_KEYWORD_1), 500);
        }, 200);
        break;

      case PHASES.CLICK_KEYWORD_1:
        triggerClick();
        setSelectedKeywords(['SaaS']);
        timeout = setTimeout(() => setPhase(PHASES.MOVE_TO_KEYWORD_2), 600);
        break;

      case PHASES.MOVE_TO_KEYWORD_2:
        timeout = setTimeout(() => {
          const pos = getRelPos(keyword2Ref);
          setCursorPos(pos);
          timeout = setTimeout(() => setPhase(PHASES.CLICK_KEYWORD_2), 500);
        }, 200);
        break;

      case PHASES.CLICK_KEYWORD_2:
        triggerClick();
        setSelectedKeywords(['SaaS', 'Outbound']);
        timeout = setTimeout(() => setPhase(PHASES.DONE), 800);
        break;

      case PHASES.DONE:
        timeout = setTimeout(() => {
          setPhase(PHASES.IDLE);
        }, 2000);
        break;
    }

    return () => clearTimeout(timeout);
  }, [phase]);

  // Typing animation
  useEffect(() => {
    if (phase !== PHASES.TYPING) return;
    let i = 0;
    setCursorPos({ x: 140, y: 36 });
    const interval = setInterval(() => {
      if (i < inputText.length) {
        setTypedText(inputText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setPhase(PHASES.MOVE_TO_BUTTON), 400);
      }
    }, 70);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="w-[340px]">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3.5 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Deepsearch</h4>
            <p className="text-[10px] text-white/70">Trouvez des entreprises par IA</p>
          </div>
        </div>

        {/* Demo area */}
        <div ref={containerRef} className="relative p-5 select-none" style={{ minHeight: 240 }}>

          {/* Animated cursor */}
          <div
            className="absolute z-50 pointer-events-none transition-all ease-out"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              transitionDuration: '500ms',
            }}
          >
            <div className={`transition-transform duration-150 ${cursorClick ? 'scale-75' : 'scale-100'}`}>
              <MousePointer2
                className="w-5 h-5 drop-shadow-lg"
                style={{
                  color: '#7c3aed',
                  fill: '#7c3aed',
                  filter: 'drop-shadow(0 2px 4px rgba(124,58,237,0.3))',
                }}
              />
            </div>
            {cursorClick && (
              <div className="absolute -top-1 -left-1 w-7 h-7 rounded-full bg-purple-400/30 animate-ping" />
            )}
          </div>

          {/* Fake search input */}
          <div className="relative mb-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
              <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="text-xs text-gray-800 font-mono min-h-[16px]">
                {typedText}
                {phase === PHASES.TYPING && (
                  <span className="inline-block w-[2px] h-3 bg-purple-500 ml-px animate-pulse align-middle" />
                )}
              </span>
            </div>
          </div>

          {/* Generate button */}
          <button
            ref={buttonRef}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 mb-3 ${
              phase >= PHASES.CLICK_BUTTON && phase <= PHASES.GENERATING
                ? 'bg-purple-700 text-white scale-[0.98]'
                : 'bg-purple-600 text-white'
            }`}
          >
            {showSpinner ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Génération en cours...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Générer les mots-clés</span>
              </>
            )}
          </button>

          {/* Keywords */}
          <div
            className={`space-y-2.5 transition-all duration-500 overflow-hidden ${
              showKeywords ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Type d'entreprise</div>
              <div className="flex flex-wrap gap-1.5">
                {category1.map((k, i) => (
                  <span
                    key={k}
                    ref={i === 0 ? keyword1Ref : undefined}
                    className={`px-2.5 py-1 text-[11px] rounded-full font-medium transition-all duration-300 cursor-default ${
                      selectedKeywords.includes(k)
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-200 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={{
                      animationDelay: `${i * 80}ms`,
                      animation: showKeywords ? `fadeInUp 0.3s ease-out ${i * 80}ms both` : 'none',
                    }}
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Activité</div>
              <div className="flex flex-wrap gap-1.5">
                {category2.map((k, i) => (
                  <span
                    key={k}
                    ref={i === 0 ? keyword2Ref : undefined}
                    className={`px-2.5 py-1 text-[11px] rounded-full font-medium transition-all duration-300 cursor-default ${
                      selectedKeywords.includes(k)
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={{
                      animationDelay: `${(i + category1.length) * 80}ms`,
                      animation: showKeywords ? `fadeInUp 0.3s ease-out ${(i + category1.length) * 80}ms both` : 'none',
                    }}
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <style>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(8px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>

        {/* Steps footer */}
        <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-3.5">
          <div className="flex items-start gap-6">
            {[
              { n: '1', label: 'Décrivez', sub: 'votre cible' },
              { n: '2', label: 'Générez', sub: 'les mots-clés' },
              { n: '3', label: 'Affinez', sub: 'vos résultats' },
            ].map((s, i) => {
              const isActive =
                (i === 0 && phase >= PHASES.TYPING && phase <= PHASES.TYPING) ||
                (i === 1 && phase >= PHASES.MOVE_TO_BUTTON && phase <= PHASES.KEYWORDS_APPEAR) ||
                (i === 2 && phase >= PHASES.MOVE_TO_KEYWORD_1);

              return (
                <div key={i} className="flex items-start gap-2 flex-1">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-all duration-300 ${
                    isActive ? 'bg-purple-600 text-white shadow-sm' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {s.n}
                  </div>
                  <div className="min-w-0">
                    <div className={`text-[11px] font-semibold transition-colors ${isActive ? 'text-purple-700' : 'text-gray-600'}`}>{s.label}</div>
                    <div className="text-[10px] text-gray-400 leading-tight">{s.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}