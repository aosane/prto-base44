import React, { useState } from 'react';
import { ChevronRight, ChevronUp, ChevronDown, Plus, Zap, Search, List, Minus, RotateCcw } from 'lucide-react';
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import SearchFilterList from './SearchFilterList';
import CompanySizeFilter from './CompanySizeFilter';
import useFilterState from './useFilterState';

export default function Sidebar({ activeTab, setActiveTab }) {
  const [expandedFilters, setExpandedFilters] = useState([]);
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedCompanySizes, setSelectedCompanySizes] = useState([]);
  const { toggleInclude, toggleExclude, removeInclude, removeExclude, getFilter, getActiveCount, resetAll } = useFilterState();

  const toggleFilter = (name) => {
    setExpandedFilters(prev => prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const mockNames = [
    { name: 'John Doe', sub: 'CEO' },
    { name: 'Jane Smith', sub: 'CTO' },
    { name: 'Alex Johnson', sub: 'VP Sales' },
  ];

  const mockJobTitles = ['CEO', 'CTO', 'VP of Sales', 'Marketing Director', 'Product Manager', 'Software Engineer', 'Head of Growth', 'Founder', 'COO', 'CFO'];

  const mockCompanies = [
    { name: 'Apple', sub: 'apple.com' },
    { name: 'Google', sub: 'google.com' },
    { name: 'Microsoft', sub: 'microsoft.com' },
    { name: 'Stripe', sub: 'stripe.com' },
  ];

  const mockLocations = [
    { name: 'United States', sub: 'Country' },
    { name: 'San Francisco, CA', sub: 'City' },
    { name: 'New York, NY', sub: 'City' },
    { name: 'London, UK', sub: 'City' },
    { name: 'Paris, France', sub: 'City' },
    { name: 'Berlin, Germany', sub: 'City' },
  ];

  const mockIndustries = ['Software Development', 'Information Technology', 'Financial Services', 'E-commerce', 'Healthcare', 'Consulting', 'Manufacturing', 'Retail', 'Education', 'Marketing & Advertising'];

  const seniorityLevels = ['Intern', 'Entry Level', 'Mid Level', 'Senior', 'Manager', 'Director', 'VP', 'C-Suite', 'Owner / Partner'];

  const departments = ['Sales', 'Marketing', 'Engineering', 'Product', 'Operations', 'HR', 'Finance', 'Legal', 'Customer Success', 'Design'];

  const signalFilters = [
    { label: 'New client signed', badge: 'SOON' },
    { label: 'New partnership', badge: 'SOON' },
    { label: 'New product or service', badge: 'SOON' },
    { label: 'Recently raised funds', badge: 'SOON' },
  ];

  const renderWithSub = (item) => (
    <div>
      <div className="font-medium text-sm">{item.name}</div>
      <div className="text-xs text-gray-500">{item.sub}</div>
    </div>
  );

  const filterConfigs = [
    { label: 'Name', items: mockNames, placeholder: 'Search people...', render: renderWithSub },
    { label: 'Job title', items: mockJobTitles, placeholder: 'Search job titles...' },
    { label: 'Company', items: mockCompanies, placeholder: 'Search companies...', render: renderWithSub },
    { label: 'Location', items: mockLocations, placeholder: 'Search locations...', render: renderWithSub },
    { label: 'Industry', items: mockIndustries, placeholder: 'Search industries...' },
    { label: 'Seniority', items: seniorityLevels, placeholder: 'Search seniority...' },
    { label: 'Department', items: departments, placeholder: 'Search departments...' },
  ];

  const activeCount = getActiveCount();

  if (activeTab === 'lists') {
    return (
      <aside className="w-72 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0 h-full">
        <div className="p-4">
          <button onClick={() => setActiveTab('search')} className="text-[#1C64F2] text-sm font-medium hover:underline flex items-center gap-1">
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Search
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex-shrink-0 h-full flex flex-col">
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">Leads</h1>
          <div className="flex items-center gap-2">
            {activeCount > 0 && (
              <>
                <button
                  onClick={() => {
                    resetAll();
                    setSelectedCompanySizes([]);
                  }}
                  className="text-xs font-medium text-gray-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
                <span className="text-xs font-medium text-[#1C64F2] bg-[#1C64F2]/10 px-2 py-0.5 rounded-full">
                  {activeCount} filter{activeCount > 1 ? 's' : ''}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md ${
              activeTab === 'search' ? 'bg-[#1C64F2]/10 text-[#1C64F2]' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Search className="w-4 h-4" />
            Search
          </button>
          <button
            onClick={() => setActiveTab('lists')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md ${
              activeTab === 'lists' ? 'bg-[#1C64F2]/10 text-[#1C64F2]' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <List className="w-4 h-4" />
            Saved Lists
          </button>
        </div>

        <div className="border-b border-gray-200 mb-4"></div>

        <div className="space-y-1">
          {filterConfigs.map((config) => (
            <FilterSection key={config.label} label={config.label} expandedFilters={expandedFilters} toggleFilter={toggleFilter} filterState={getFilter(config.label)}>
              <SearchFilterList
                items={config.items}
                filterName={config.label}
                filterState={getFilter(config.label)}
                toggleInclude={toggleInclude}
                toggleExclude={toggleExclude}
                removeInclude={removeInclude}
                removeExclude={removeExclude}
                placeholder={config.placeholder}
                renderItem={config.render}
              />
            </FilterSection>
          ))}

          {/* Company Size */}
          <FilterSection label="Company size" expandedFilters={expandedFilters} toggleFilter={toggleFilter} count={selectedCompanySizes.length}>
            <CompanySizeFilter selected={selectedCompanySizes} setSelected={setSelectedCompanySizes} />
          </FilterSection>
        </div>

        {/* Signals */}
        <div className="mt-6">
          <button onClick={() => toggleSection('signals')} className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-400 uppercase mb-2 hover:text-gray-600">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>SIGNALS</span>
            </div>
            {expandedSection === 'signals' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {expandedSection === 'signals' && (
            <div className="space-y-1">
              {signalFilters.map((filter) => (
                <button key={filter.label} className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  <span>{filter.label}</span>
                  <span className="text-xs font-medium text-[#1C64F2] bg-[#1C64F2]/10 px-2 py-0.5 rounded">{filter.badge}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

function FilterSection({ label, expandedFilters, toggleFilter, filterState, count: externalCount, children }) {
  const isExpanded = expandedFilters.includes(label);
  const count = externalCount ?? (filterState ? filterState.included.length + filterState.excluded.length : 0);

  return (
    <div>
      <button onClick={() => toggleFilter(label)} className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group">
        <div className="flex items-center gap-2">
          <span>{label}</span>
          {count > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#1C64F2] text-white text-xs flex items-center justify-center">{count}</span>
          )}
        </div>
        {isExpanded ? <Minus className="w-4 h-4 text-gray-400" /> : <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />}
      </button>
      {isExpanded && children}
    </div>
  );
}