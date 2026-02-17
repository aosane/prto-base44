import React, { useState } from 'react';
import { Users, Building2, X } from 'lucide-react';

const mockSavedLists = [
  { id: 1, name: 'Top Sales Prospects', type: 'lead', count: 145 },
  { id: 2, name: 'France Tech Leaders', type: 'lead', count: 89 },
  { id: 3, name: 'Enterprise Accounts', type: 'company', count: 52 },
  { id: 4, name: 'SaaS Series A-B', type: 'company', count: 34 },
  { id: 5, name: 'Marketing Directors EU', type: 'lead', count: 210 },
  { id: 6, name: 'Fintech Startups', type: 'company', count: 67 },
];

export default function SavedListFilter({ selectedLists, setSelectedLists, listType }) {
  const [search, setSearch] = useState('');

  const filtered = mockSavedLists.filter(l =>
    l.type === listType &&
    l.name.toLowerCase().includes(search.toLowerCase()) &&
    !selectedLists.find(s => s.id === l.id)
  );

  const addList = (list) => {
    setSelectedLists(prev => [...prev, list]);
    setSearch('');
  };

  const removeList = (id) => {
    setSelectedLists(prev => prev.filter(l => l.id !== id));
  };

  return (
    <div className="px-3 py-2">
      <input
        type="text"
        placeholder="Search saved lists..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1C64F2] focus:border-[#1C64F2]"
      />

      {search.trim() && filtered.length > 0 && (
        <div className="mt-1 border border-gray-200 rounded-md bg-white shadow-sm max-h-40 overflow-y-auto">
          {filtered.map(list => (
            <button
              key={list.id}
              onClick={() => addList(list)}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              {list.type === 'lead' ? (
                <Users className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
              ) : (
                <Building2 className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
              )}
              <span className="flex-1 truncate">{list.name}</span>
              <span className="text-xs text-gray-400">{list.count}</span>
            </button>
          ))}
        </div>
      )}

      {search.trim() && filtered.length === 0 && (
        <p className="text-xs text-gray-400 mt-2 px-1">No lists found.</p>
      )}

      {selectedLists.length > 0 && (
        <div className="flex flex-col gap-1 mt-2">
          {selectedLists.map(list => (
            <span
              key={list.id}
              className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full ${
                list.type === 'lead' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
              }`}
            >
              {list.type === 'lead' ? (
                <Users className="w-3 h-3 flex-shrink-0" />
              ) : (
                <Building2 className="w-3 h-3 flex-shrink-0" />
              )}
              <span className="truncate">{list.name}</span>
              <button onClick={() => removeList(list.id)} className="hover:opacity-70 flex-shrink-0">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}