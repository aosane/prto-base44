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
  handleGenerateKeywords: onGenerate,
  generatedKeywords,
}) {
  const triggerRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const [included, setIncluded] = useState([]);
  const [excluded, setExcluded] = useState([]);

  const handleGenerate = () => {
    const input = deepsearchInput.toLowerCase();

    let cat1 = [];
    let cat2 = [];

    if (input.includes('agence') || input.includes('prospection')) {
      cat1 = [
        { word: 'Agence', type: 'include' },
        { word: 'Prospection', type: 'include' },
        { word: 'B2B', type: 'include' },
        { word: 'Lead Generation', type: 'include' },
      ];
      cat2 = [
        { word: 'Outbound', type: 'include' },
        { word: 'Sales Automation', type: 'include' },
        { word: 'Email Marketing', type: 'include' },
      ];
    } else {
      cat1 = [
        { word: 'SaaS', type: 'include' },
        { word: 'Agency', type: 'include' },
        { word: 'Platform', type: 'include' },
        { word: 'Enterprise Software', type: 'include' },
      ];
      cat2 = [
        { word: 'Cloud Services', type: 'include' },
        { word: 'Outbound', type: 'include' },
        { word: 'Lead Generation', type: 'include' },
      ];
    }

    if (input.includes('sauf') || input.includes('exclu') || input.includes('pas')) {
      if (input.includes('call')) {
        cat2 = [
          ...cat2,
          { word: 'Cold Calling', type: 'exclude' },
          { word: 'Phone Sales', type: 'exclude' },
          { word: 'Telemarketing', type: 'exclude' },
          { word: 'Call Center', type: 'exclude' },
        ];
      } else {
        cat2 = [...cat2, { word: 'Consulting', type: 'exclude' }, { word: 'Freelance', type: 'exclude' }];
      }
    }

    // Merge into keywords state, avoiding duplicates
    setKeywords(prev => {
      const existingWords = new Set(prev.map(k => k.word));
      const newItems = [...cat1.map(k => ({ ...k, category: 'Business Type' })), ...cat2.map(k => ({ ...k, category: 'Activities' }))];
      return [...prev, ...newItems.filter(k => !existingWords.has(k.word))];
    });

    if (onGenerate) onGenerate();
  };

  const addManualKeyword = (type) => {
    const word = manualInput.trim();
    if (!word) return;
    if (type === 'include' && !included.includes(word)) {
      setExcluded(prev => prev.filter(k => k !== word));
      setIncluded(prev => [...prev, word]);
    } else if (type === 'exclude' && !excluded.includes(word)) {
      setIncluded(prev => prev.filter(k => k !== word));
      setExcluded(prev => [...prev, word]);
    }
    setManualInput('');
  };

  const handleManualKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addManualKeyword('include');
    }
  };

  const moveToInclude = (keyword) => {
    setExcluded(prev => prev.filter(k => k !== keyword));
    if (!included.includes(keyword)) setIncluded(prev => [...prev, keyword]);
  };

  const moveToExclude = (keyword) => {
    setIncluded(prev => prev.filter(k => k !== keyword));
    if (!excluded.includes(keyword)) setExcluded(prev => [...prev, keyword]);
  };

  const removeKeyword = (keyword) => {
    setIncluded(prev => prev.filter(k => k !== keyword));
    setExcluded(prev => prev.filter(k => k !== keyword));
  };

  const totalCount = included.length + excluded.length;

  return (
    <div ref={triggerRef}>
      <button
        onClick={() => toggleFilter('Deepsearch')}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span>Deepsearch</span>
          {totalCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#1C64F2] text-white text-xs flex items-center justify-center">{totalCount}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {expandedFilters.includes('Deepsearch') && (
            <button
              onClick={(e) => { e.stopPropagation(); setShowTooltip(prev => !prev); }}
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
          {/* AI Prompt */}
          <div className="space-y-3">
            <div className="relative">
              <Input
                type="text"
                value={deepsearchInput}
                onChange={(e) => setDeepsearchInput(e.target.value)}
                placeholder={placeholder}
                className="text-sm"
              />
            </div>
            <Button 
              onClick={handleGenerate}
              className="w-full bg-[#1C64F2] hover:bg-[#1854cc] text-white"
              size="sm"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Générer les mots-clés
            </Button>
          </div>

          {/* Keywords display */}
          {(included.length > 0 || excluded.length > 0) && (
            <div className="space-y-3 pt-3 border-t border-gray-200">
              {/* Included */}
              {included.length > 0 && (
                <div>
                  <div className="text-xs font-medium text-gray-500 mb-1.5">Inclus</div>
                  <div className="flex flex-wrap gap-1.5">
                    {included.map((keyword) => (
                      <KeywordTag key={keyword} keyword={keyword} type="include" onSwitch={() => moveToExclude(keyword)} onRemove={() => removeKeyword(keyword)} />
                    ))}
                  </div>
                </div>
              )}
              {/* Excluded */}
              {excluded.length > 0 && (
                <div>
                  <div className="text-xs font-medium text-gray-500 mb-1.5">Exclus</div>
                  <div className="flex flex-wrap gap-1.5">
                    {excluded.map((keyword) => (
                      <KeywordTag key={keyword} keyword={keyword} type="exclude" onSwitch={() => moveToInclude(keyword)} onRemove={() => removeKeyword(keyword)} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Manual add */}
          <div className="pt-2 border-t border-gray-200 space-y-2">
            <div className="text-xs font-medium text-gray-500">Ajouter manuellement</div>
            <Input
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              onKeyDown={handleManualKeyDown}
              placeholder="Taper un mot-clé..."
              className="text-sm"
            />
            {manualInput.trim() && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs text-blue-700 border-blue-200 hover:bg-blue-50" onClick={() => addManualKeyword('include')}>
                  <Check className="w-3 h-3 mr-1" /> Inclure
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-xs text-red-700 border-red-200 hover:bg-red-50" onClick={() => addManualKeyword('exclude')}>
                  <X className="w-3 h-3 mr-1" /> Exclure
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function KeywordTag({ keyword, type, onSwitch, onRemove }) {
  const isInclude = type === 'include';
  return (
    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${isInclude ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'}`}>
      {isInclude ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
      <span>{keyword}</span>
      <button onClick={onSwitch} className={`ml-0.5 rounded-full p-0.5 hover:${isInclude ? 'bg-red-100' : 'bg-blue-100'} transition-colors`} title={isInclude ? 'Exclure' : 'Inclure'}>
        {isInclude ? <X className="w-2.5 h-2.5 text-red-400" /> : <Check className="w-2.5 h-2.5 text-blue-400" />}
      </button>
      <button onClick={onRemove} className="ml-0.5 rounded-full p-0.5 hover:bg-gray-200 transition-colors" title="Supprimer">
        <X className="w-2.5 h-2.5 text-gray-400" />
      </button>
    </div>
  );
}