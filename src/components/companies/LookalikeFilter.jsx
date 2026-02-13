import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import IncludeExcludeButtons from '../search/IncludeExcludeButtons';
import FilterTags from '../search/FilterTags';
import { Sparkles } from 'lucide-react';

export default function LookalikeFilter({
  items,
  filterName,
  filterState,
  toggleInclude,
  toggleExclude,
  removeInclude,
  removeExclude,
  onGenerateDeepsearch,
  renderItem,
}) {
  const [search, setSearch] = useState('');
  const { included } = filterState;

  const filtered = items.filter(item => {
    const label = typeof item === 'string' ? item : (item.name || item.label || '');
    return label.toLowerCase().includes(search.toLowerCase());
  });

  const handleGenerateDeepsearch = () => {
    if (included.length === 0) return;
    
    // Générer des mots-clés basés sur les lookalikes sélectionnés
    const keywords = included.map(company => ({
      word: company,
      type: 'include',
      category: 'Lookalike Companies'
    }));

    onGenerateDeepsearch(keywords);
  };

  return (
    <div className="px-3 py-3 space-y-3 border border-gray-200 rounded-lg mx-3 mb-2">
      <FilterTags
        included={included}
        excluded={filterState.excluded}
        onRemoveInclude={(id) => removeInclude(filterName, id)}
        onRemoveExclude={(id) => removeExclude(filterName, id)}
      />
      <Input
        placeholder="Search company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-sm"
      />
      <div className="space-y-0.5 max-h-48 overflow-y-auto">
        {filtered.map((item) => {
          const id = typeof item === 'string' ? item : item.name;
          return (
            <div key={id} className="flex items-center justify-between py-1.5 text-sm hover:bg-gray-50 rounded px-2">
              <div className="flex-1 min-w-0 mr-2">
                {renderItem ? renderItem(item) : (
                  <span className="truncate block">{id}</span>
                )}
              </div>
              <IncludeExcludeButtons
                itemId={id}
                included={included}
                excluded={filterState.excluded}
                onInclude={(id) => toggleInclude(filterName, id)}
                onExclude={(id) => toggleExclude(filterName, id)}
              />
            </div>
          );
        })}
      </div>
      
      {included.length > 0 && (
        <div className="pt-2 border-t border-gray-200">
          <Button
            onClick={handleGenerateDeepsearch}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white text-xs gap-2"
            size="sm"
          >
            <Sparkles className="w-3 h-3" />
            Generate Deepsearch
          </Button>
        </div>
      )}
    </div>
  );
}