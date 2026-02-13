import React from 'react';
import { Check, X } from 'lucide-react';

export default function IncludeExcludeButtons({ itemId, included, excluded, onInclude, onExclude }) {
  const isIncluded = included.includes(itemId);
  const isExcluded = excluded.includes(itemId);

  return (
    <div className="flex gap-1">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onInclude(itemId);
        }}
        className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
          isIncluded ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-blue-100 text-gray-400'
        }`}
      >
        <Check className="w-3 h-3" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onExclude(itemId);
        }}
        className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
          isExcluded ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-red-100 text-gray-400'
        }`}
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}