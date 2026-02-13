import React, { useState } from 'react';
import { ChevronRight, ChevronUp, ChevronDown, Plus, Zap } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const companyFilters = [
    { label: 'Name' },
    { label: 'Job title' },
    { label: 'Company' },
    { label: 'Location' },
    { label: 'Industry' },
    { label: 'Seniority' },
    { label: 'Department' },
    { label: 'Year founded' },
  ];

  const signalFilters = [
    { label: 'New client signed', badge: 'SOON' },
    { label: 'New partnership', badge: 'SOON' },
    { label: 'New product or service', badge: 'SOON' },
    { label: 'Recently raised funds', badge: 'SOON' },
  ];

  if (activeTab === 'lists') {
    return (
      <aside className="w-72 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setActiveTab('search')}
              className="text-[#2D55EB] text-sm font-medium hover:underline flex items-center gap-1"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back to Search
            </button>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-72 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('search')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                activeTab === 'search'
                  ? 'bg-[#2D55EB] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Search Companies
            </button>
            <button
              onClick={() => setActiveTab('lists')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                activeTab === 'lists'
                  ? 'bg-[#2D55EB] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Saved Lists
            </button>
          </div>
        </div>

        <div className="border-b border-gray-200 mb-4"></div>

        {/* Company Filters */}
        <div className="space-y-1 mb-6">
          {companyFilters.map((filter, index) => (
            <button
              key={index}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
            >
              <span>{filter.label}</span>
              <div className="flex items-center gap-2">
                {filter.badge && (
                  <span className="text-xs font-medium text-[#2D55EB] bg-[#2D55EB]/10 px-2 py-0.5 rounded">
                    {filter.badge}
                  </span>
                )}
                <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </div>
            </button>
          ))}
        </div>

        {/* Signals Section */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('signals')}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-400 uppercase mb-2 hover:text-gray-600"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>SIGNALS</span>
            </div>
            {expandedSection === 'signals' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {expandedSection === 'signals' && (
            <div className="space-y-1">
              {signalFilters.map((filter, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
                >
                  <span>{filter.label}</span>
                  <div className="flex items-center gap-2">
                    {filter.badge && (
                      <span className="text-xs font-medium text-[#2D55EB] bg-[#2D55EB]/10 px-2 py-0.5 rounded">
                        {filter.badge}
                      </span>
                    )}
                    <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

function FilterItem({ label, badge }) {
  return (
    <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md group">
      <span>{label}</span>
      <div className="flex items-center gap-2">
        {badge && (
          <span className="text-xs font-medium text-[#2D55EB]">{badge}</span>
        )}
        <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
      </div>
    </button>
  );
}