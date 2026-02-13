import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronUp, ChevronDown, Plus, Zap, Search, List, Minus, X, Check, Sparkles } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Sidebar({ activeTab, setActiveTab }) {
  const [expandedFilters, setExpandedFilters] = useState([]);
  const [expandedSection, setExpandedSection] = useState(null);

  // Filter states
  const [nameIncluded, setNameIncluded] = useState([]);
  const [companySizeRange, setCompanySizeRange] = useState([0, 300000]);

  const toggleFilter = (filterName) => {
    setExpandedFilters(prev =>
      prev.includes(filterName)
        ? prev.filter(f => f !== filterName)
        : [...prev, filterName]
    );
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const mockNames = [
    { name: 'John Doe', title: 'CEO' },
    { name: 'Jane Smith', title: 'CTO' },
    { name: 'Alex Johnson', title: 'VP Sales' },
  ];

  const mockJobTitles = [
    'CEO', 'CTO', 'VP of Sales', 'Marketing Director', 'Product Manager',
    'Software Engineer', 'Head of Growth', 'Founder', 'COO', 'CFO',
  ];

  const mockCompanies = [
    { name: 'Apple', domain: 'apple.com' },
    { name: 'Google', domain: 'google.com' },
    { name: 'Microsoft', domain: 'microsoft.com' },
    { name: 'Stripe', domain: 'stripe.com' },
  ];

  const mockLocations = [
    { name: 'United States', type: 'Country' },
    { name: 'San Francisco, CA', type: 'City' },
    { name: 'New York, NY', type: 'City' },
    { name: 'London, UK', type: 'City' },
    { name: 'Paris, France', type: 'City' },
    { name: 'Berlin, Germany', type: 'City' },
  ];

  const mockIndustries = [
    'Software Development', 'Information Technology', 'Financial Services',
    'E-commerce', 'Healthcare', 'Consulting', 'Manufacturing', 'Retail',
    'Education', 'Marketing & Advertising',
  ];

  const seniorityLevels = [
    'Intern', 'Entry Level', 'Mid Level', 'Senior', 'Manager',
    'Director', 'VP', 'C-Suite', 'Owner / Partner',
  ];

  const departments = [
    'Sales', 'Marketing', 'Engineering', 'Product', 'Operations',
    'HR', 'Finance', 'Legal', 'Customer Success', 'Design',
  ];

  const signalFilters = [
    { label: 'New client signed', badge: 'SOON' },
    { label: 'New partnership', badge: 'SOON' },
    { label: 'New product or service', badge: 'SOON' },
    { label: 'Recently raised funds', badge: 'SOON' },
  ];

  if (activeTab === 'lists') {
    return (
      <aside className="w-72 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0 h-full">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setActiveTab('search')}
              className="text-[#1C64F2] text-sm font-medium hover:underline flex items-center gap-1"
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
    <aside className="w-72 bg-white border-r border-gray-200 flex-shrink-0 h-full flex flex-col">
      <div className="p-4 flex-1 overflow-y-auto">
        <h1 className="text-xl font-semibold text-gray-900 mb-4">Leads</h1>

        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md ${
              activeTab === 'search' ? 'bg-[#1C64F2] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Search className="w-4 h-4" />
            Search
          </button>
          <button
            onClick={() => setActiveTab('lists')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md ${
              activeTab === 'lists' ? 'bg-[#1C64F2] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <List className="w-4 h-4" />
            Saved Lists
          </button>
        </div>

        <div className="border-b border-gray-200 mb-4"></div>

        {activeTab === 'search' && (
          <>
            <div className="space-y-1">
              {/* Name Filter */}
              <FilterSection
                label="Name"
                expandedFilters={expandedFilters}
                toggleFilter={toggleFilter}
              >
                <div className="px-3 py-3 space-y-3 border border-gray-200 rounded-lg mx-3 mb-2">
                  <Input placeholder="Search people..." className="text-sm" />
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {mockNames.map((person) => (
                      <div key={person.name} className="flex items-center justify-between py-2 text-sm">
                        <div>
                          <div className="font-medium">{person.name}</div>
                          <div className="text-xs text-gray-500">{person.title}</div>
                        </div>
                        <IncludeExcludeButtons />
                      </div>
                    ))}
                  </div>
                </div>
              </FilterSection>

              {/* Job Title Filter */}
              <FilterSection
                label="Job title"
                expandedFilters={expandedFilters}
                toggleFilter={toggleFilter}
              >
                <div className="px-3 py-3 space-y-3 border border-gray-200 rounded-lg mx-3 mb-2">
                  <Input placeholder="Search job titles..." className="text-sm" />
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {mockJobTitles.map((title) => (
                      <div key={title} className="flex items-center justify-between py-2 text-sm hover:bg-gray-50 rounded px-2 cursor-pointer">
                        <span>{title}</span>
                        <IncludeExcludeButtons />
                      </div>
                    ))}
                  </div>
                </div>
              </FilterSection>

              {/* Company Filter */}
              <FilterSection
                label="Company"
                expandedFilters={expandedFilters}
                toggleFilter={toggleFilter}
              >
                <div className="px-3 py-3 space-y-3 border border-gray-200 rounded-lg mx-3 mb-2">
                  <Input placeholder="Search companies..." className="text-sm" />
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {mockCompanies.map((company) => (
                      <div key={company.name} className="flex items-center justify-between py-2 text-sm">
                        <div>
                          <div className="font-medium">{company.name}</div>
                          <div className="text-xs text-gray-500">{company.domain}</div>
                        </div>
                        <IncludeExcludeButtons />
                      </div>
                    ))}
                  </div>
                </div>
              </FilterSection>

              {/* Location Filter */}
              <FilterSection
                label="Location"
                expandedFilters={expandedFilters}
                toggleFilter={toggleFilter}
              >
                <div className="px-3 py-3 space-y-3 border border-gray-200 rounded-lg mx-3 mb-2">
                  <Input placeholder="Search locations..." className="text-sm" />
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {mockLocations.map((location) => (
                      <div key={location.name} className="flex items-center justify-between py-2 text-sm hover:bg-gray-50 rounded px-2 cursor-pointer">
                        <div>
                          <div className="font-medium">{location.name}</div>
                          <div className="text-xs text-gray-500">{location.type}</div>
                        </div>
                        <IncludeExcludeButtons />
                      </div>
                    ))}
                  </div>
                </div>
              </FilterSection>

              {/* Industry Filter */}
              <FilterSection
                label="Industry"
                expandedFilters={expandedFilters}
                toggleFilter={toggleFilter}
              >
                <div className="px-3 py-3 space-y-3 border border-gray-200 rounded-lg mx-3 mb-2">
                  <Input placeholder="Search industries..." className="text-sm" />
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {mockIndustries.map((industry) => (
                      <div key={industry} className="flex items-center justify-between py-2 text-sm hover:bg-gray-50 rounded px-2 cursor-pointer">
                        <span>{industry}</span>
                        <IncludeExcludeButtons />
                      </div>
                    ))}
                  </div>
                </div>
              </FilterSection>

              {/* Seniority Filter */}
              <FilterSection
                label="Seniority"
                expandedFilters={expandedFilters}
                toggleFilter={toggleFilter}
              >
                <div className="px-3 py-3 space-y-3 border border-gray-200 rounded-lg mx-3 mb-2">
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {seniorityLevels.map((level) => (
                      <div key={level} className="flex items-center justify-between py-2 text-sm hover:bg-gray-50 rounded px-2 cursor-pointer">
                        <span>{level}</span>
                        <IncludeExcludeButtons />
                      </div>
                    ))}
                  </div>
                </div>
              </FilterSection>

              {/* Department Filter */}
              <FilterSection
                label="Department"
                expandedFilters={expandedFilters}
                toggleFilter={toggleFilter}
              >
                <div className="px-3 py-3 space-y-3 border border-gray-200 rounded-lg mx-3 mb-2">
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {departments.map((dept) => (
                      <div key={dept} className="flex items-center justify-between py-2 text-sm hover:bg-gray-50 rounded px-2 cursor-pointer">
                        <span>{dept}</span>
                        <IncludeExcludeButtons />
                      </div>
                    ))}
                  </div>
                </div>
              </FilterSection>

              {/* Company Size Filter */}
              <FilterSection
                label="Company size"
                expandedFilters={expandedFilters}
                toggleFilter={toggleFilter}
              >
                <div className="px-3 py-4 space-y-4 border border-gray-200 rounded-lg mx-3 mb-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Min</label>
                      <Input
                        type="number"
                        value={companySizeRange[0]}
                        onChange={(e) => setCompanySizeRange([parseInt(e.target.value) || 0, companySizeRange[1]])}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Max</label>
                      <Input
                        type="number"
                        value={companySizeRange[1]}
                        onChange={(e) => setCompanySizeRange([companySizeRange[0], parseInt(e.target.value) || 300000])}
                        className="text-sm"
                      />
                    </div>
                  </div>
                  <div className="px-1">
                    <Slider
                      min={0}
                      max={300000}
                      step={100}
                      value={companySizeRange}
                      onValueChange={setCompanySizeRange}
                    />
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>0</span>
                      <span>300k+</span>
                    </div>
                  </div>
                </div>
              </FilterSection>
            </div>

            {/* Signals Section */}
            <div className="mt-6">
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
                  {signalFilters.map((filter) => (
                    <button
                      key={filter.label}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
                    >
                      <span>{filter.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-[#1C64F2] bg-[#1C64F2]/10 px-2 py-0.5 rounded">
                          {filter.badge}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'lists' && (
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              <p className="mb-3">Organize your saved leads into lists for better targeting.</p>
            </div>
            <button className="w-full px-4 py-2.5 bg-[#1C64F2] text-white text-sm font-medium rounded-lg hover:bg-[#1854cc] transition-colors">
              + Create New List
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

function FilterSection({ label, expandedFilters, toggleFilter, children }) {
  const isExpanded = expandedFilters.includes(label);

  return (
    <div>
      <button
        onClick={() => toggleFilter(label)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
      >
        <span>{label}</span>
        {isExpanded ?
          <Minus className="w-4 h-4 text-gray-400" /> :
          <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
        }
      </button>
      {isExpanded && children}
    </div>
  );
}

function IncludeExcludeButtons() {
  return (
    <div className="flex gap-1">
      <button className="w-6 h-6 rounded flex items-center justify-center bg-gray-100 hover:bg-blue-100">
        <Check className="w-3 h-3 text-gray-400" />
      </button>
      <button className="w-6 h-6 rounded flex items-center justify-center bg-gray-100 hover:bg-red-100">
        <div className="w-3 h-3 rounded-full border-2 border-gray-400 flex items-center justify-center">
          <div className="w-2 h-0.5 bg-gray-400"></div>
        </div>
      </button>
    </div>
  );
}