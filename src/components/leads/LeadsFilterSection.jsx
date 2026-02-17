import React from 'react';
import { Plus, Minus } from 'lucide-react';

export default function LeadsFilterSection({ label, isExpanded, onToggle, badge, children }) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
      >
        <div className="flex items-center gap-2">
          <span>{label}</span>
          {badge && (
            <span className="text-[10px] font-medium text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full uppercase">
              {badge}
            </span>
          )}
        </div>
        {isExpanded ? (
          <Minus className="w-4 h-4 text-gray-400" />
        ) : (
          <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
        )}
      </button>
      {isExpanded && children}
    </div>
  );
}