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
  const [keywords, setKeywords] = useState([]); // { text, status: 'included' | 'excluded' | 'neutral', source: 'manual' | 'ai' }

  const addManualKeyword = () => {
    const text = manualInput.trim();
    if (!text || keywords.some(k => k.text.toLowerCase() === text.toLowerCase())) return;
    setKeywords(prev => [...prev, { text, status: 'included', source: 'manual' }]);
    setManualInput('');
  };

  const handleManualKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addManualKeyword();
    }
  };

  const toggleKeywordStatus = (text) => {
    setKeywords(prev => prev.map(k => {
      if (k.text !== text) return k;
      if (k.status === 'neutral') return { ...k, status: 'included' };
      if (k.status === 'included') return { ...k, status: 'excluded' };
      return { ...k, status: 'neutral' };
    }));
  };

  const removeKeyword = (text) => {
    setKeywords(prev => prev.filter(k => k.text !== text));
  };

  const handleGenerate = () => {
    handleGenerateKeywords();
  };

  // Sync generated keywords into the keywords list
  React.useEffect(() => {
    if (!generatedKeywords) return;
    const allGenerated = [...(generatedKeywords.category1 || []), ...(generatedKeywords.category2 || [])];
    setKeywords(prev => {
      const existing = prev.map(k => k.text.toLowerCase());
      const newKeywords = allGenerated
        .filter(k => !existing.includes(k.toLowerCase()))
        .map(k => ({ text: k, status: 'neutral', source: 'ai' }));
      return [...prev, ...newKeywords];
    });
  }, [generatedKeywords]);

  const includedCount = keywords.filter(k => k.status === 'included').length;
  const excludedCount = keywords.filter(k => k.status === 'excluded').length;
  const totalActive = includedCount + excludedCount;

  const getTagStyle = (status) => {
    if (status === 'included') return 'bg-blue-500 text-white';
    if (status === 'excluded') return 'bg-red-500 text-white line-through';
    return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  };

  const getTagIcon = (status) => {
    if (status === 'included') return <Check className="w-3 h-3" />;
    if (status === 'excluded') return <X className="w-3 h-3" />;
    return null;
  };

  return (
    <div ref={triggerRef}>
      <button
        onClick={() => toggleFilter('Deepsearch')}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span>Deepsearch</span>
          {totalActive > 0 && (
            <span className="w-5 h-5 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center">{totalActive}</span>
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
              title={showTooltip ? "Fermer l'aide" : "Comment ça marche ?"}
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
          {/* AI generation */}
          <div className="space-y-2.5">
            <div className="relative">
              <Input
                type="text"
                value={deepsearchInput}
                onChange={(e) => setDeepsearchInput(e.target.value)}
                placeholder={placeholder || 'Décrivez votre cible...'}
                className="text-sm"
              />
            </div>
            <Button
              onClick={handleGenerate}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              size="sm"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Générer
            </Button>
          </div>

          {/* Manual keyword input */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500">Ajouter un mot-clé</label>
            <div className="flex gap-1.5">
              <Input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                onKeyDown={handleManualKeyDown}
                placeholder="Ex: SaaS, B2B..."
                className="text-sm flex-1"
              />
              <Button onClick={addManualKeyword} size="sm" variant="outline" className="px-2.5 flex-shrink-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Keywords list */}
          {keywords.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">
                  Mots-clés ({keywords.length})
                </span>
                <div className="flex gap-2 text-[10px]">
                  {includedCount > 0 && <span className="text-blue-600 font-medium">{includedCount} inclus</span>}
                  {excludedCount > 0 && <span className="text-red-600 font-medium">{excludedCount} exclus</span>}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {keywords.map((kw) => (
                  <div key={kw.text} className="flex items-center group">
                    <button
                      onClick={() => toggleKeywordStatus(kw.text)}
                      className={`flex items-center gap-1 pl-2 pr-1 py-1 rounded-l-full text-xs font-medium transition-all duration-200 ${getTagStyle(kw.status)}`}
                    >
                      {getTagIcon(kw.status)}
                      <span>{kw.text}</span>
                      {kw.source === 'ai' && (
                        <Sparkles className="w-2.5 h-2.5 opacity-60 ml-0.5" />
                      )}
                    </button>
                    <button
                      onClick={() => removeKeyword(kw.text)}
                      className={`py-1 pr-2 pl-0.5 rounded-r-full text-xs transition-all duration-200 ${
                        kw.status === 'included' ? 'bg-blue-500 text-white/70 hover:text-white' :
                        kw.status === 'excluded' ? 'bg-red-500 text-white/70 hover:text-white' :
                        'bg-gray-100 text-gray-400 hover:text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 leading-tight">
                Cliquez pour alterner : neutre → inclus → exclu
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}