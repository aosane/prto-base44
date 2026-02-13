import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';

export default function Sidebar({ activeTab }) {
  const [expandedSection, setExpandedSection] = useState('company');
  const [expandedFilter, setExpandedFilter] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  if (activeTab === 'lists') {
    return (
      <aside className="w-72 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="font-medium">0 FILTERS</span>
          </div>
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span>Saved searches</span>
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-72 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="font-medium">0 FILTERS</span>
        </div>
        
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <span>Saved searches</span>
        </button>

        {/* COMPANY Section */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('company')}
            className="w-full flex items-center justify-between text-xs font-medium text-gray-400 uppercase mb-3 hover:text-gray-600"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>COMPANY</span>
            </div>
            {expandedSection === 'company' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {expandedSection === 'company' && (
            <div className="space-y-1">
              <FilterItem label="Company" />
              <FilterItem label="Headcount" />
              <FilterItem label="Industry" />
              <FilterItem label="Type" />
              <FilterItem label="Headquarters" />
              <FilterItem label="Specialties" />
              <FilterItem label="Year founded" />
              <FilterItem label="Funding" badge="SOON" />
              <FilterItem label="Technology" badge="SOON" />
              <FilterItem label="Hiring" badge="SOON" />
              <FilterItem label="CRM" badge="SOON" />
              <FilterItem label="Annual revenue" badge="SOON" />
              <FilterItem label="Number of followers" badge="SOON" />
            </div>
          )}
        </div>

        {/* SIGNALS Section */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('signals')}
            className="w-full flex items-center justify-between text-xs font-medium text-gray-400 uppercase mb-3 hover:text-gray-600"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>SIGNALS</span>
            </div>
            {expandedSection === 'signals' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {expandedSection === 'signals' && (
            <div className="space-y-1">
              <FilterItem label="New client signed" badge="SOON" />
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