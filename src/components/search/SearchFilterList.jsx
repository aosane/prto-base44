import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import IncludeExcludeButtons from './IncludeExcludeButtons';
import FilterTags from './FilterTags';

export default function SearchFilterList({
  items,
  filterName,
  filterState,
  toggleInclude,
  toggleExclude,
  removeInclude,
  removeExclude,
  placeholder = "Search...",
  renderItem,
}) {
  const [search, setSearch] = useState('');
  const { included, excluded } = filterState;

  const filtered = items.filter(item => {
    const label = typeof item === 'string' ? item : (item.name || item.label || '');
    return label.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="px-3 py-3 space-y-3 border border-gray-200 rounded-lg mx-3 mb-2">
      <FilterTags
        included={included}
        excluded={excluded}
        onRemoveInclude={(id) => removeInclude(filterName, id)}
        onRemoveExclude={(id) => removeExclude(filterName, id)}
      />
      <Input
        placeholder={placeholder}
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
                excluded={excluded}
                onInclude={(id) => toggleInclude(filterName, id)}
                onExclude={(id) => toggleExclude(filterName, id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}