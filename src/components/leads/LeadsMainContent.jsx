import React from 'react';
import { Users, List } from 'lucide-react';

export default function LeadsMainContent({ activeTab, filterCount = 0 }) {
  if (activeTab === 'lists') {
    return (
      <main className="flex-1 overflow-y-auto bg-white p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">My Saved Lists</h2>
            <p className="text-gray-600">Manage and organize your lead lists</p>
          </div>
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <List className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-900 font-medium mb-2">No lists yet</p>
            <p className="text-gray-500 text-sm mb-6">Create your first list to start organizing your leads</p>
            <button className="px-6 py-2.5 bg-[#1C64F2] text-white text-sm font-medium rounded-lg hover:bg-[#1854cc] transition-colors">
              Create New List
            </button>
          </div>
        </div>
      </main>
    );
  }

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