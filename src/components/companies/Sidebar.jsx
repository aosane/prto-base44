import React, { useState } from 'react';
import { ChevronRight, ChevronUp, ChevronDown, Plus, Zap, Search, List } from 'lucide-react';
import IncludeExcludeFilter from './filters/IncludeExcludeFilter';
import RangeFilter from './filters/RangeFilter';
import HeadcountGrowthFilter from './filters/HeadcountGrowthFilter';
import SimpleFilter from './filters/SimpleFilter';

export default function Sidebar({ activeTab, setActiveTab }) {
  const [expandedSection, setExpandedSection] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const openFilter = (filterName) => {
    setActiveFilter(filterName);
  };

  const closeFilter = () => {
    setActiveFilter(null);
  };

  const companyFilters = [
    { label: 'Name', type: 'include-exclude' },
    { label: 'Industry', type: 'include-exclude' },
    { label: 'Location', type: 'include-exclude' },
    { label: 'Company size', type: 'range', min: 0, max: 300000, unit: '+' },
    { label: 'Department headcount', type: 'range', min: 0, max: 10000, unit: '+' },
    { label: 'Annual Revenue', type: 'range', min: 0, max: 1000000000, unit: 'M' },
  ];

  const signalFilters = [
    { label: 'Headcount growth', type: 'headcount-growth' },
    { label: 'Hiring a job', type: 'simple' },
    { label: 'Tech Stack', type: 'simple' },
    { label: 'Lookalike', type: 'simple', description: 'Find similar companies' },
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
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md ${
                activeTab === 'search'
                  ? 'bg-[#2D55EB] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Search className="w-4 h-4" />
              Search
            </button>
            <button
              onClick={() => setActiveTab('lists')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md ${
                activeTab === 'lists'
                  ? 'bg-[#2D55EB] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-4 h-4" />
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
              onClick={() => openFilter(filter.label)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
            >
              <span>{filter.label}</span>
              <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
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
                  onClick={() => openFilter(filter.label)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
                >
                  <span>{filter.label}</span>
                  <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter Modals */}
        {companyFilters.map((filter) => {
          if (filter.type === 'include-exclude') {
            return (
              <IncludeExcludeFilter
                key={filter.label}
                isOpen={activeFilter === filter.label}
                onClose={closeFilter}
                title={filter.label}
                placeholder={`Search ${filter.label.toLowerCase()}...`}
              />
            );
          }
          if (filter.type === 'range') {
            return (
              <RangeFilter
                key={filter.label}
                isOpen={activeFilter === filter.label}
                onClose={closeFilter}
                title={filter.label}
                min={filter.min}
                max={filter.max}
                unit={filter.unit}
              />
            );
          }
          return null;
        })}

        {signalFilters.map((filter) => {
          if (filter.type === 'headcount-growth') {
            return (
              <HeadcountGrowthFilter
                key={filter.label}
                isOpen={activeFilter === filter.label}
                onClose={closeFilter}
              />
            );
          }
          if (filter.type === 'simple') {
            return (
              <SimpleFilter
                key={filter.label}
                isOpen={activeFilter === filter.label}
                onClose={closeFilter}
                title={filter.label}
                description={filter.description}
              />
            );
          }
          return null;
        })}
      </div>
    </aside>
  );
}