import React, { useState } from 'react';
import { Users, Building2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import IncludeExcludeButtons from '../search/IncludeExcludeButtons';
import FilterTags from '../search/FilterTags';

const mockSavedLists = [
  { id: 1, name: 'Top Sales Prospects', type: 'lead', count: 145 },
  { id: 2, name: 'France Tech Leaders', type: 'lead', count: 89 },
  { id: 3, name: 'Enterprise Accounts', type: 'company', count: 52 },
  { id: 4, name: 'SaaS Series A-B', type: 'company', count: 34 },
  { id: 5, name: 'Marketing Directors EU', type: 'lead', count: 210 },
  { id: 6, name: 'Fintech Startups', type: 'company', count: 67 },
];

export default function SavedListFilter({ filterName, filterState, toggleInclude, toggleExclude, removeInclude, removeExclude, listType }) {
  const [search, setSearch] = useState('');
  const { included, excluded } = filterState;

  const filtered = mockSavedLists.filter(l =>
    l.type === listType &&
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-3 py-3 space-y-3 border border-gray-200 rounded-lg mx-3 mb-2">
      <FilterTags
        included={included}
        excluded={excluded}
        onRemoveInclude={(id) => removeInclude(filterName, id)}
        onRemoveExclude={(id) => removeExclude(filterName, id)}
      />
      <Input
        placeholder="Search saved lists..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-sm"
      />
      <div className="space-y-0.5 max-h-48 overflow-y-auto">
        {filtered.map((list) => (
          <div key={list.id} className="flex items-center justify-between py-1.5 text-sm hover:bg-gray-50 rounded px-2">
            <div className="flex items-center gap-2 flex-1 min-w-0 mr-2">
              {list.type === 'lead' ? (
                <Users className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
              ) : (
                <Building2 className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
              )}
              <span className="truncate">{list.name}</span>
              <span className="text-xs text-gray-400">({list.count})</span>
            </div>
            <IncludeExcludeButtons
              itemId={list.name}
              included={included}
              excluded={excluded}
              onInclude={(id) => toggleInclude(filterName, id)}
              onExclude={(id) => toggleExclude(filterName, id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}