import React, { useState } from 'react';
import { ChevronRight, ChevronUp, ChevronDown, Plus, Zap, Search, List, Minus, X, Check } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Sidebar({ activeTab, setActiveTab }) {
  const [expandedFilters, setExpandedFilters] = useState([]);
  const [expandedSection, setExpandedSection] = useState(null);
  
  // Filter states
  const [companyIncluded, setCompanyIncluded] = useState([]);
  const [companyExcluded, setCompanyExcluded] = useState([]);
  const [companySizeRange, setCompanySizeRange] = useState([0, 300000]);
  const [deptHeadcountRange, setDeptHeadcountRange] = useState([0, 10000]);
  const [revenueRange, setRevenueRange] = useState([0, 1000]);
  const [headcountDept, setHeadcountDept] = useState('Accounting');
  const [headcountMin, setHeadcountMin] = useState('');
  const [headcountMax, setHeadcountMax] = useState('');

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

  const mockCompanies = [
    { name: 'Apple', domain: 'apple.com' },
    { name: 'Google', domain: 'google.com' },
    { name: 'Microsoft', domain: 'microsoft.com' },
  ];

  const departments = ['Accounting', 'Sales', 'Marketing', 'Engineering', 'Product', 'Operations', 'HR', 'All Departments'];

  if (activeTab === 'lists') {
    return (
      <aside className="w-72 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <button
            onClick={() => setActiveTab('search')}
            className="text-[#2D55EB] text-sm font-medium hover:underline flex items-center gap-1"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Search
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-72 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md ${
              activeTab === 'search' ? 'bg-[#2D55EB] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Search className="w-4 h-4" />
            Search
          </button>
          <button
            onClick={() => setActiveTab('lists')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md ${
              activeTab === 'lists' ? 'bg-[#2D55EB] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <List className="w-4 h-4" />
            Saved Lists
          </button>
        </div>

        <div className="border-b border-gray-200 mb-4"></div>

        {/* Company Filters */}
        <div className="space-y-1">
          {/* Name Filter */}
          <div>
            <button
              onClick={() => toggleFilter('Name')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
            >
              <span>Name</span>
              {expandedFilters.includes('Name') ? 
                <Minus className="w-4 h-4 text-gray-400" /> : 
                <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              }
            </button>
            {expandedFilters.includes('Name') && (
              <div className="px-3 py-3 space-y-3 border border-gray-200 rounded-lg mx-3 mb-2">
                {companyIncluded.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {companyIncluded.map((item) => (
                      <div key={item.name} className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                        <Check className="w-3 h-3" />
                        <span>{item.name}</span>
                        <button onClick={() => setCompanyIncluded(companyIncluded.filter(i => i.name !== item.name))}>
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <Input placeholder="Search..." className="text-sm" />
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {mockCompanies.map((company) => (
                    <div key={company.name} className="flex items-center justify-between py-2 text-sm">
                      <div>
                        <div className="font-medium">{company.name}</div>
                        <div className="text-xs text-gray-500">{company.domain}</div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setCompanyIncluded([...companyIncluded, company])}
                          className="w-6 h-6 rounded flex items-center justify-center bg-gray-100 hover:bg-blue-100"
                        >
                          <Check className="w-3 h-3 text-gray-400" />
                        </button>
                        <button
                          onClick={() => setCompanyExcluded([...companyExcluded, company])}
                          className="w-6 h-6 rounded flex items-center justify-center bg-gray-100 hover:bg-red-100"
                        >
                          <div className="w-3 h-3 rounded-full border-2 border-gray-400 flex items-center justify-center">
                            <div className="w-2 h-0.5 bg-gray-400"></div>
                          </div>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Industry Filter */}
          <div>
            <button
              onClick={() => toggleFilter('Industry')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
            >
              <span>Industry</span>
              {expandedFilters.includes('Industry') ? 
                <Minus className="w-4 h-4 text-gray-400" /> : 
                <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              }
            </button>
            {expandedFilters.includes('Industry') && (
              <div className="px-3 py-3 space-y-3 border border-gray-200 rounded-lg mx-3 mb-2">
                <Input placeholder="Search industries..." className="text-sm" />
              </div>
            )}
          </div>

          {/* Location Filter */}
          <div>
            <button
              onClick={() => toggleFilter('Location')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
            >
              <span>Location</span>
              {expandedFilters.includes('Location') ? 
                <Minus className="w-4 h-4 text-gray-400" /> : 
                <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              }
            </button>
            {expandedFilters.includes('Location') && (
              <div className="px-3 py-3 space-y-3 border border-gray-200 rounded-lg mx-3 mb-2">
                <Input placeholder="Search locations..." className="text-sm" />
              </div>
            )}
          </div>

          {/* Company Size Filter */}
          <div>
            <button
              onClick={() => toggleFilter('Company size')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
            >
              <span>Company size</span>
              {expandedFilters.includes('Company size') ? 
                <Minus className="w-4 h-4 text-gray-400" /> : 
                <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              }
            </button>
            {expandedFilters.includes('Company size') && (
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
                      placeholder="Max"
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
            )}
          </div>

          {/* Department Headcount Filter */}
          <div>
            <button
              onClick={() => toggleFilter('Department headcount')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
            >
              <span>Department headcount</span>
              {expandedFilters.includes('Department headcount') ? 
                <Minus className="w-4 h-4 text-gray-400" /> : 
                <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              }
            </button>
            {expandedFilters.includes('Department headcount') && (
              <div className="px-3 py-4 space-y-4 border border-gray-200 rounded-lg mx-3 mb-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Min</label>
                    <Input
                      type="number"
                      value={deptHeadcountRange[0]}
                      onChange={(e) => setDeptHeadcountRange([parseInt(e.target.value) || 0, deptHeadcountRange[1]])}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Max</label>
                    <Input
                      type="number"
                      value={deptHeadcountRange[1]}
                      onChange={(e) => setDeptHeadcountRange([deptHeadcountRange[0], parseInt(e.target.value) || 10000])}
                      placeholder="Max"
                      className="text-sm"
                    />
                  </div>
                </div>
                <div className="px-1">
                  <Slider
                    min={0}
                    max={10000}
                    step={10}
                    value={deptHeadcountRange}
                    onValueChange={setDeptHeadcountRange}
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>0</span>
                    <span>10k+</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Annual Revenue Filter */}
          <div>
            <button
              onClick={() => toggleFilter('Annual Revenue')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
            >
              <span>Annual Revenue</span>
              {expandedFilters.includes('Annual Revenue') ? 
                <Minus className="w-4 h-4 text-gray-400" /> : 
                <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              }
            </button>
            {expandedFilters.includes('Annual Revenue') && (
              <div className="px-3 py-4 space-y-4 border border-gray-200 rounded-lg mx-3 mb-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Min</label>
                    <Input
                      type="number"
                      value={revenueRange[0]}
                      onChange={(e) => setRevenueRange([parseInt(e.target.value) || 0, revenueRange[1]])}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Max</label>
                    <Input
                      type="number"
                      value={revenueRange[1]}
                      onChange={(e) => setRevenueRange([revenueRange[0], parseInt(e.target.value) || 1000])}
                      placeholder="Max"
                      className="text-sm"
                    />
                  </div>
                </div>
                <div className="px-1">
                  <Slider
                    min={0}
                    max={1000}
                    step={1}
                    value={revenueRange}
                    onValueChange={setRevenueRange}
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>0M</span>
                    <span>1B+</span>
                  </div>
                </div>
              </div>
            )}
          </div>
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
              {/* Headcount Growth */}
              <div>
                <button
                  onClick={() => toggleFilter('Headcount growth')}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
                >
                  <span>Headcount growth</span>
                  {expandedFilters.includes('Headcount growth') ? 
                    <Minus className="w-4 h-4 text-gray-400" /> : 
                    <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  }
                </button>
                {expandedFilters.includes('Headcount growth') && (
                  <div className="px-3 py-4 space-y-3 border border-gray-200 rounded-lg mx-3 mb-2">
                    <Select value={headcountDept} onValueChange={setHeadcountDept}>
                      <SelectTrigger className="w-full text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        placeholder="Min (%)"
                        value={headcountMin}
                        onChange={(e) => setHeadcountMin(e.target.value)}
                        className="text-sm"
                      />
                      <Input
                        type="number"
                        placeholder="Max (%)"
                        value={headcountMax}
                        onChange={(e) => setHeadcountMax(e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">Reset</Button>
                      <Button size="sm" className="bg-[#2D55EB] hover:bg-[#2442c7]">Add</Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Hiring a job */}
              <div>
                <button
                  onClick={() => toggleFilter('Hiring a job')}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
                >
                  <span>Hiring a job</span>
                  {expandedFilters.includes('Hiring a job') ? 
                    <Minus className="w-4 h-4 text-gray-400" /> : 
                    <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  }
                </button>
                {expandedFilters.includes('Hiring a job') && (
                  <div className="px-3 py-3 border border-gray-200 rounded-lg mx-3 mb-2">
                    <Input placeholder="Job title..." className="text-sm" />
                  </div>
                )}
              </div>

              {/* Tech Stack */}
              <div>
                <button
                  onClick={() => toggleFilter('Tech Stack')}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
                >
                  <span>Tech Stack</span>
                  {expandedFilters.includes('Tech Stack') ? 
                    <Minus className="w-4 h-4 text-gray-400" /> : 
                    <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  }
                </button>
                {expandedFilters.includes('Tech Stack') && (
                  <div className="px-3 py-3 border border-gray-200 rounded-lg mx-3 mb-2">
                    <Input placeholder="Technology..." className="text-sm" />
                  </div>
                )}
              </div>

              {/* Lookalike */}
              <div>
                <button
                  onClick={() => toggleFilter('Lookalike')}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
                >
                  <span>Lookalike</span>
                  {expandedFilters.includes('Lookalike') ? 
                    <Minus className="w-4 h-4 text-gray-400" /> : 
                    <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  }
                </button>
                {expandedFilters.includes('Lookalike') && (
                  <div className="px-3 py-3 border border-gray-200 rounded-lg mx-3 mb-2">
                    <Input placeholder="Company name..." className="text-sm" />
                    <p className="text-xs text-gray-500 mt-2">Find companies similar to this one</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}