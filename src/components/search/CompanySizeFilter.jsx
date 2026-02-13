import React from 'react';
import { Check } from 'lucide-react';

const SIZE_RANGES = [
  { label: '1-10', min: 1, max: 10 },
  { label: '11-50', min: 11, max: 50 },
  { label: '51-200', min: 51, max: 200 },
  { label: '201-500', min: 201, max: 500 },
  { label: '501-1,000', min: 501, max: 1000 },
  { label: '1,001-5,000', min: 1001, max: 5000 },
  { label: '5,001-10,000', min: 5001, max: 10000 },
  { label: '10,001+', min: 10001, max: null },
];

export default function CompanySizeFilter({ selected, setSelected }) {
  const toggle = (range) => {
    setSelected(prev => {
      const exists = prev.some(r => r.label === range.label);
      if (exists) return prev.filter(r => r.label !== range.label);
      return [...prev, range];
    });
  };

  return (
    <div className="mx-3 mb-2 border border-gray-200 rounded-lg overflow-hidden">
      {SIZE_RANGES.map((range) => {
        const isSelected = selected.some(r => r.label === range.label);
        return (
          <button
            key={range.label}
            onClick={() => toggle(range)}
            className={`w-full flex items-center justify-between px-3 py-2.5 text-sm transition-colors ${
              isSelected ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>{range.label}</span>
            {isSelected && <Check className="w-4 h-4 text-blue-600" />}
          </button>
        );
      })}
    </div>
  );
}