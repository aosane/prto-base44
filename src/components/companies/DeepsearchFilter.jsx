import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, Minus, Plus, HelpCircle, X, Check, Ban } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  onKeywordsCountChange,
  isGenerating = false,
}) {
  const triggerRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const [manualCategory, setManualCategory] = useState('Business Type');
  // Each keyword: { word, type: 'include'|'exclude', category?: string }
  const [keywords, setKeywords] = useState([]);

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
    setKeywords(prev => {
      const without = prev.filter(k => k.word !== word);
      return [...without, { word, type, category: manualCategory }];
    });
    setManualInput('');
  };

  const handleManualKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addManualKeyword('include');
    }
  };

  const toggleKeywordType = (word) => {
    setKeywords(prev => prev.map(k => k.word === word ? { ...k, type: k.type === 'include' ? 'exclude' : 'include' } : k));
  };

  const removeKeyword = (word) => {
    setKeywords(prev => prev.filter(k => k.word !== word));
  };

  const included = keywords.filter(k => k.type === 'include');
  const excluded = keywords.filter(k => k.type === 'exclude');
  const totalCount = keywords.length;

  useEffect(() => {
    if (onKeywordsCountChange) onKeywordsCountChange(totalCount);
  }, [totalCount]);

  // Group by category for display
  const categories = [...new Set(keywords.map(k => k.category || 'Other'))];

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
        <div className={`px-3 py-4 space-y-4 border-2 rounded-lg mx-3 mb-2 transition-all duration-1000 ${
          isGenerating 
            ? 'border-purple-500 bg-purple-50 animate-pulse shadow-lg shadow-purple-200' 
            : 'border-gray-200'
        }`}>
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

          {/* Keywords display grouped by category */}
          {keywords.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-gray-200">
              {categories.map((cat) => (
                <div key={cat}>
                  <div className="text-xs font-medium text-gray-600 mb-2">{cat}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {keywords.filter(k => (k.category || 'Other') === cat).map((k) => (
                      <KeywordTag key={k.word} keyword={k.word} type={k.type} onSwitch={() => toggleKeywordType(k.word)} onRemove={() => removeKeyword(k.word)} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Manual add */}
          <div className="pt-2 border-t border-gray-200 space-y-2">
            <div className="text-xs font-medium text-gray-500">Ajouter manuellement</div>
            <Select value={manualCategory} onValueChange={setManualCategory}>
              <SelectTrigger className="text-xs h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Business Type">Business Type</SelectItem>
                <SelectItem value="Activities">Activities</SelectItem>
              </SelectContent>
            </Select>
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
                  <Ban className="w-3 h-3 mr-1" /> Exclure
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
    <div className={`inline-flex items-center rounded text-xs font-medium ${isInclude ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'}`}>
      <span className="px-2 py-1">{keyword}</span>
      <div className="flex items-center border-l border-gray-200">
        <button
          onClick={onSwitch}
          className={`p-1 ${isInclude ? 'hover:bg-red-100' : 'hover:bg-blue-100'} transition-colors`}
          title={isInclude ? 'Exclure' : 'Inclure'}
        >
          {isInclude ? <Ban className="w-3 h-3 text-red-400" /> : <Check className="w-3 h-3 text-blue-400" />}
        </button>
        <button
          onClick={onRemove}
          className="p-1 hover:bg-gray-200 transition-colors rounded-r"
          title="Supprimer"
        >
          <X className="w-3 h-3 text-gray-400" />
        </button>
      </div>
    </div>
  );
}