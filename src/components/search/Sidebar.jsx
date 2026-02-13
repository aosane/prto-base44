import React from 'react';

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex-shrink-0 h-full flex flex-col">
      <div className="p-4 flex-1 overflow-y-auto">
        <h1 className="text-xl font-semibold text-gray-900 mb-4">Leads</h1>
        <p className="text-sm text-gray-400">Utilisez la page Companies pour rechercher.</p>
      </div>
    </aside>
  );
}