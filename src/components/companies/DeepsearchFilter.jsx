import React, { useRef, useState } from 'react';
import { Sparkles, Minus, Plus, HelpCircle, X } from 'lucide-react';
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

  return (
    <div ref={triggerRef}>
      <button
        onClick={() => toggleFilter('Deepsearch')}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span>Deepsearch</span>
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
              onClick={handleGenerateKeywords}
              className="w-full bg-[#1C64F2] hover:bg-[#1854cc] text-white"
              size="sm"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate
            </Button>
          </div>

          {generatedKeywords && (
            <div className="space-y-3 pt-2 border-t border-gray-200">
              <div>
                <div className="text-xs font-medium text-gray-600 mb-2">Business Type</div>
                <div className="flex flex-wrap gap-1.5">
                  {generatedKeywords.category1.map((keyword) => (
                    <button
                      key={keyword}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full hover:bg-blue-100 transition-colors"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-600 mb-2">Activities</div>
                <div className="flex flex-wrap gap-1.5">
                  {generatedKeywords.category2.map((keyword) => (
                    <button
                      key={keyword}
                      className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full hover:bg-purple-100 transition-colors"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}