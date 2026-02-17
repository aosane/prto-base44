import React from 'react';
import { Users, Search } from 'lucide-react';

export default function LeadsMainContent({ filterCount = 0 }) {
  return (
    <main className="flex-1 overflow-y-auto bg-white flex items-center justify-center relative z-0">
      <div className="w-full max-w-3xl px-6 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-gray-400" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Search 👤 Leads
        </h1>
        <p className="text-gray-500 text-sm">
          Use the filters on the left to find leads matching your criteria.
        </p>
      </div>
    </main>
  );
}