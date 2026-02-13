import React, { useRef, useState } from 'react';
import { Sparkles, Minus, Plus, HelpCircle, X, Check } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DeepsearchTooltip from './DeepsearchTooltip';
import TooltipPortal from './TooltipPortal';

export default function DeepsearchFilter({
  expandedFilters,
  toggleFilter,
  deepsearchInput,
  setDeepsearchInput,
  placeholder,
  handleGenerateKeywords,
  generatedKeywords,
}) {
  const triggerRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [manualInput, setManualInput] = useState('');
  // Track keyword states: { keyword: 'included' | 'excluded' | null }
  const [keywordStates, setKeywordStates] = useState({});

  const toggleKeywordState = (keyword, targetState) => {
    setKeywordStates(prev => ({
      ...prev,
      [keyword]: prev[keyword] === targetState ? null : targetState,
    }));
  };

  const removeKeyword = (keyword) => {
    setKeywordStates(prev => {
      const next = { ...prev };
      delete next[keyword];
      return next;
    });
  };

  const handleAddManual = () => {
    const trimmed = manualInput.trim();
    if (!trimmed) return;
    // Add as included by default
    setKeywordStates(prev => ({ ...prev, [trimmed]: 'included' }));
    setManualInput('');
  };

  const handleManualKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddManual();
    }
  };

  // Collect all keywords: generated + manual
  const allKeywords = new Set();
  if (generatedKeywords) {
    generatedKeywords.category1.forEach(k => allKeywords.add(k));
    generatedKeywords.category2.forEach(k => allKeywords.add(k));
  }
  Object.keys(keywordStates).forEach(k => allKeywords.add(k));

  const includedKeywords = [...allKeywords].filter(k => keywordStates[k] === 'included');
  const excludedKeywords = [...allKeywords].filter(k => keywordStates[k] === 'excluded');

  return (
    <div ref={triggerRef}>
      <button
        onClick={() => toggleFilter('Deepsearch')}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span>Deepsearch</span>
          {(includedKeywords.length + excludedKeywords.length) > 0 && (
            <span className="w-5 h-5 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center">
              {includedKeywords.length + excludedKeywords.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {expandedFilters.includes('Deepsearch') && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(prev => !prev);
              }}
              className="p-0.5 rounded hover:bg-gray-100 text-gray-400 hover:text-purple-500 transition-colors"
            >
              {showTooltip ? <X className="w-3.5 h-3.5" /> : <HelpCircle className="w-3.5 h-3.5" />}
            </button>
          )}
          {expandedFilters.includes('Deepsearch') ? 
            <Minus className="w-4 h-4 text-gray-400" /> : 
            <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          }
        </div>
      </button>

      {showTooltip && expandedFilters.includes('Deepsearch') && (
        <TooltipPortal triggerRef={triggerRef}>
          <DeepsearchTooltip />
        </TooltipPortal>
      )}

      {expandedFilters.includes('Deepsearch') && (
        <div className="px-3 py-4 space-y-4 border border-gray-200 rounded-lg mx-3 mb-2">
          {/* Prompt input */}
          <div className="space-y-3">
            <Input
              type="text"
              value={deepsearchInput}
              onChange={(e) => setDeepsearchInput(e.target.value)}
              placeholder={placeholder}
              className="text-sm"
            />
            <Button 
              onClick={handleGenerateKeywords}
              className="w-full bg-[#1C64F2] hover:bg-[#1854cc] text-white"
              size="sm"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Générer
            </Button>
          </div>

          {/* Active tags summary */}
          {(includedKeywords.length > 0 || excludedKeywords.length > 0) && (
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-200">
              {includedKeywords.map(k => (
                <span key={`inc-${k}`} className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs">
                  <Check className="w-3 h-3" />
                  <span>{k}</span>
                  <button onClick={() => removeKeyword(k)}><X className="w-3 h-3" /></button>
                </span>
              ))}
              {excludedKeywords.map(k => (
                <span key={`exc-${k}`} className="flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-700 rounded-full text-xs">
                  <X className="w-3 h-3" />
                  <span>{k}</span>
                  <button onClick={() => removeKeyword(k)}><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
          )}

          {/* Generated keywords with include/exclude */}
          {generatedKeywords && (
            <div className="space-y-3 pt-2 border-t border-gray-200">
              <div>
                <div className="text-xs font-medium text-gray-600 mb-2">Business Type</div>
                <div className="flex flex-wrap gap-1.5">
                  {generatedKeywords.category1.map((keyword) => (
                    <KeywordChip
                      key={keyword}
                      keyword={keyword}
                      state={keywordStates[keyword]}
                      onToggle={toggleKeywordState}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-600 mb-2">Activities</div>
                <div className="flex flex-wrap gap-1.5">
                  {generatedKeywords.category2.map((keyword) => (
                    <KeywordChip
                      key={keyword}
                      keyword={keyword}
                      state={keywordStates[keyword]}
                      onToggle={toggleKeywordState}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Manual keyword add */}
          <div className="pt-2 border-t border-gray-200">
            <div className="text-xs font-medium text-gray-600 mb-2">Ajouter manuellement</div>
            <div className="flex gap-2">
              <Input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                onKeyDown={handleManualKeyDown}
                placeholder="Mot-clé..."
                className="text-sm flex-1"
              />
              <Button
                onClick={handleAddManual}
                variant="outline"
                size="sm"
                disabled={!manualInput.trim()}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function KeywordChip({ keyword, state, onToggle }) {
  const baseClass = "relative group flex items-center gap-1 px-2.5 py-1 text-xs rounded-full transition-all duration-200 cursor-pointer select-none";

  if (state === 'included') {
    return (
      <span className={`${baseClass} bg-blue-500 text-white ring-2 ring-blue-200`}>
        <Check className="w-3 h-3" />
        {keyword}
        <button onClick={(e) => { e.stopPropagation(); onToggle(keyword, 'excluded'); }} className="ml-0.5 hover:bg-blue-600 rounded-full p-0.5">
          <X className="w-2.5 h-2.5" />
        </button>
      </span>
    );
  }

  if (state === 'excluded') {
    return (
      <span className={`${baseClass} bg-red-500 text-white ring-2 ring-red-200 line-through`}>
        <X className="w-3 h-3" />
        {keyword}
        <button onClick={(e) => { e.stopPropagation(); onToggle(keyword, 'excluded'); }} className="ml-0.5 hover:bg-red-600 rounded-full p-0.5">
          <X className="w-2.5 h-2.5" />
        </button>
      </span>
    );
  }

  return (
    <span className={`${baseClass} bg-gray-100 text-gray-700 hover:bg-gray-200`}>
      {keyword}
      <span className="hidden group-hover:flex items-center gap-0.5 ml-1">
        <button onClick={(e) => { e.stopPropagation(); onToggle(keyword, 'included'); }} className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600">
          <Check className="w-2.5 h-2.5" />
        </button>
        <button onClick={(e) => { e.stopPropagation(); onToggle(keyword, 'excluded'); }} className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600">
          <X className="w-2.5 h-2.5" />
        </button>
      </span>
    </span>
  );
}