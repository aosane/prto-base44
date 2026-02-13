import React, { useRef } from 'react';
import { Sparkles, Minus, Plus } from 'lucide-react';
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
        {expandedFilters.includes('Deepsearch') ? 
          <Minus className="w-4 h-4 text-gray-400" /> : 
          <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
        }
      </button>

      {expandedFilters.includes('Deepsearch') && (
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
              className="w-full bg-[#2D55EB] hover:bg-[#2442c7] text-white"
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