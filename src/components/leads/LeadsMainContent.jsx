import React from 'react';
import { Users, List, Upload, ChevronDown } from 'lucide-react';

const templates = [
  { name: 'Sales Leaders in SaaS', filters: 5 },
  { name: 'Marketing Directors (France)', filters: 4 },
  { name: 'CTOs at Startups', filters: 6 },
  { name: 'Recently Changed Jobs', filters: 3 },
  { name: 'VPs in Financial Services', filters: 4 },
];

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
    <main className="flex-1 overflow-y-auto bg-white relative z-0">
      <div className="w-full max-w-2xl mx-auto px-6 pt-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Search 👤 Leads
          </h1>
          <p className="text-gray-500 text-sm">
            Find and enrich leads from our database of 700M+ profiles.
          </p>
        </div>

        {/* Quickstart */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Quickstart</h2>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Upload className="w-4 h-4" />
              Import leads
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Templates */}
        <div>
          <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-3">Templates</h2>
          <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
            {templates.map((template) => (
              <button
                key={template.name}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm text-gray-900">{template.name}</span>
                <span className="text-sm text-gray-400">{template.filters} Filters</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}