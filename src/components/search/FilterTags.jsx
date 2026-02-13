import React from 'react';
import { X, Check, Ban } from 'lucide-react';

export default function FilterTags({ included, excluded, onRemoveInclude, onRemoveExclude }) {
  if (included.length === 0 && excluded.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 mb-2">
      {included.map((item) => (
        <span key={`inc-${item}`} className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs">
          <Check className="w-3 h-3" />
          <span>{item}</span>
          <button onClick={() => onRemoveInclude(item)}>
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      {excluded.map((item) => (
        <span key={`exc-${item}`} className="flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-700 rounded-full text-xs">
          <Ban className="w-3 h-3" />
          <span>{item}</span>
          <button onClick={() => onRemoveExclude(item)}>
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
    </div>
  );
}