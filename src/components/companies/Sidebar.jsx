import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Plus, Zap, Search, List, Minus, RotateCcw } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import DeepsearchFilter from './DeepsearchFilter';
import HiringFilter from './HiringFilter';
import SearchFilterList from '../search/SearchFilterList';
import CompanySizeFilter from '../search/CompanySizeFilter';
import LookalikeFilter from './LookalikeFilter';
import useFilterState from '../search/useFilterState';

export default function Sidebar({ activeTab, setActiveTab, onFilterCountChange }) {
  const [expandedFilters, setExpandedFilters] = useState([]);
  const [expandedSection, setExpandedSection] = useState(null);

  // Range filter states
  const [selectedCompanySizes, setSelectedCompanySizes] = useState([]);
  const [deptHeadcountRange, setDeptHeadcountRange] = useState([0, 10000]);
  const [revenueRange, setRevenueRange] = useState([0, 1000]);
  const [headcountDept, setHeadcountDept] = useState('Accounting');
  const [headcountMin, setHeadcountMin] = useState('');
  const [headcountMax, setHeadcountMax] = useState('');

  // Deepsearch states
  const [deepsearchInput, setDeepsearchInput] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [generatedKeywords, setGeneratedKeywords] = useState(null);

  // Deepsearch keywords count
  const [deepsearchCount, setDeepsearchCount] = useState(0);
  const [deepsearchRef, setDeepsearchRef] = useState(null);
  const [industryRef, setIndustryRef] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isIndustryAnimating, setIsIndustryAnimating] = useState(false);
  const [isLookalikeGenerating, setIsLookalikeGenerating] = useState(false);

  // Include/Exclude filter state
  const { toggleInclude, toggleExclude, removeInclude, removeExclude, getFilter, getActiveCount, resetAll, bulkInclude } = useFilterState();

  const placeholders = ['Agence', 'SaaS', 'Outbound', 'Lead generation', 'AI tools', 'B2B software'];

  useEffect(() => {
    if (!expandedFilters.includes('Deepsearch')) return;
    const currentText = placeholders[placeholderIndex];
    if (isTyping) {
      if (placeholder.length < currentText.length) {
        const timeout = setTimeout(() => setPlaceholder(currentText.slice(0, placeholder.length + 1)), 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (placeholder.length > 0) {
        const timeout = setTimeout(() => setPlaceholder(placeholder.slice(0, -1)), 50);
        return () => clearTimeout(timeout);
      } else {
        setPlaceholderIndex((placeholderIndex + 1) % placeholders.length);
        setIsTyping(true);
      }
    }
  }, [placeholder, isTyping, placeholderIndex, expandedFilters]);

  const handleGenerateKeywords = () => {
    setGeneratedKeywords({
      category1: ['SaaS', 'Agency', 'Platform', 'Enterprise Software', 'Cloud Services'],
      category2: ['Outbound', 'Lead Generation', 'Sales Automation', 'Email Marketing', 'Cold Calling']
    });
  };

  const handleLookalikeGenerateDeepsearch = (keywords) => {
    setGeneratedKeywords(keywords);

    // Auto-select relevant industries
    const generatedIndustries = ['Software Development', 'Information Technology', 'E-commerce'];
    bulkInclude('Industry', generatedIndustries);

    // Expand Industry filter if not already
    if (!expandedFilters.includes('Industry')) {
      setExpandedFilters(prev => [...prev, 'Industry']);
    }

    // Trigger animation on both sections for 10 seconds
    setIsAnimating(true);
    setIsIndustryAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setIsIndustryAnimating(false);
    }, 10000);

    // Scroll to industry first, then deepsearch
    setTimeout(() => {
      if (industryRef) {
        industryRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
    setTimeout(() => {
      if (deepsearchRef) {
        deepsearchRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 2000);
  };

  const toggleFilter = (filterName) => {
    setExpandedFilters(prev => prev.includes(filterName) ? prev.filter(f => f !== filterName) : [...prev, filterName]);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Data
  const mockCompanies = [
    { name: 'Apple', sub: 'apple.com' },
    { name: 'Google', sub: 'google.com' },
    { name: 'Microsoft', sub: 'microsoft.com' },
  ];
  const mockIndustries = ['Software Development', 'Information Technology', 'Financial Services', 'E-commerce', 'Healthcare', 'Consulting', 'Manufacturing', 'Retail', 'Education', 'Marketing & Advertising'];
  const mockLocations = [
    { name: 'United States', sub: 'Country' },
    { name: 'San Francisco, CA', sub: 'City' },
    { name: 'New York, NY', sub: 'City' },
    { name: 'London, UK', sub: 'City' },
    { name: 'Paris, France', sub: 'City' },
    { name: 'Berlin, Germany', sub: 'City' },
    { name: 'California', sub: 'State' },
    { name: 'Europe', sub: 'Region' },
  ];
  const mockTechStack = ['React', 'Angular', 'Vue.js', 'Node.js', 'Python', 'AWS', 'Google Cloud', 'Salesforce', 'HubSpot', 'Shopify'];
  const mockLookalikes = [
    { name: 'Stripe', sub: 'stripe.com • Fintech' },
    { name: 'Shopify', sub: 'shopify.com • E-commerce' },
    { name: 'Slack', sub: 'slack.com • Software' },
    { name: 'Figma', sub: 'figma.com • Design Tools' },
    { name: 'Notion', sub: 'notion.so • Productivity' },
  ];
  const departments = ['Accounting', 'Sales', 'Marketing', 'Engineering', 'Product', 'Operations', 'HR', 'All Departments'];

  const renderWithSub = (item) => (
    <div>
      <div className="font-medium text-sm">{item.name}</div>
      <div className="text-xs text-gray-500">{item.sub}</div>
    </div>
  );

  const filterConfigs = [
    { label: 'Name', items: mockCompanies, placeholder: 'Search companies...', render: renderWithSub },
    { label: 'Industry', items: mockIndustries, placeholder: 'Search industries...' },
    { label: 'Location', items: mockLocations, placeholder: 'Search locations...', render: renderWithSub },
  ];

  const activeCount = getActiveCount() + deepsearchCount;

  useEffect(() => {
    if (onFilterCountChange) onFilterCountChange(activeCount);
  }, [activeCount, onFilterCountChange]);

  return (
    <aside className="w-72 bg-white border-r border-gray-200 relative z-10 flex-shrink-0 h-full flex flex-col">
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">Companies</h1>
          <div className="flex items-center gap-2">
            {activeCount > 0 && (
              <>
                <button
                  onClick={() => {
                    resetAll();
                    setSelectedCompanySizes([]);
                    setDeptHeadcountRange([0, 10000]);
                    setRevenueRange([0, 1000]);
                    setDeepsearchInput('');
                    setGeneratedKeywords(null);
                    setHeadcountMin('');
                    setHeadcountMax('');
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
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md ${activeTab === 'search' ? 'bg-[#1C64F2]/10 text-[#1C64F2]' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Search className="w-4 h-4" />
            Search
          </button>
          <button
            onClick={() => setActiveTab('lists')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md ${activeTab === 'lists' ? 'bg-[#1C64F2]/10 text-[#1C64F2]' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <List className="w-4 h-4" />
            Saved Lists
          </button>
        </div>

        <div className="border-b border-gray-200 mb-4"></div>

        {activeTab === 'search' && (
          <>
            <div className="space-y-1">
              {/* Include/Exclude filters */}
              {filterConfigs.map((config) => {
                const isIndustry = config.label === 'Industry';
                return (
                  <div key={config.label} ref={isIndustry ? setIndustryRef : undefined}>
                    <FilterSection
                      label={config.label}
                      expandedFilters={expandedFilters}
                      toggleFilter={toggleFilter}
                      filterState={getFilter(config.label)}
                      isHighlighted={isIndustry && isIndustryAnimating}
                    >
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
                  </div>
                );
              })}

              {/* Company Size */}
              <FilterSection label="Company size" expandedFilters={expandedFilters} toggleFilter={toggleFilter} count={selectedCompanySizes.length}>
                <CompanySizeFilter selected={selectedCompanySizes} setSelected={setSelectedCompanySizes} />
              </FilterSection>

              {/* Department Headcount */}
              <FilterSection label="Department headcount" expandedFilters={expandedFilters} toggleFilter={toggleFilter}>
                <div className="px-3 py-4 space-y-4 border border-gray-200 rounded-lg mx-3 mb-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Min</label>
                      <Input type="number" value={deptHeadcountRange[0]} onChange={(e) => setDeptHeadcountRange([parseInt(e.target.value) || 0, deptHeadcountRange[1]])} className="text-sm" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Max</label>
                      <Input type="number" value={deptHeadcountRange[1]} onChange={(e) => setDeptHeadcountRange([deptHeadcountRange[0], parseInt(e.target.value) || 10000])} className="text-sm" />
                    </div>
                  </div>
                  <div className="px-1">
                    <Slider min={0} max={10000} step={10} value={deptHeadcountRange} onValueChange={setDeptHeadcountRange} />
                    <div className="flex justify-between mt-1 text-xs text-gray-500"><span>0</span><span>10k+</span></div>
                  </div>
                </div>
              </FilterSection>

              {/* Annual Revenue */}
              <FilterSection label="Annual Revenue" expandedFilters={expandedFilters} toggleFilter={toggleFilter}>
                <div className="px-3 py-4 space-y-4 border border-gray-200 rounded-lg mx-3 mb-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Min</label>
                      <Input type="number" value={revenueRange[0]} onChange={(e) => setRevenueRange([parseInt(e.target.value) || 0, revenueRange[1]])} className="text-sm" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Max</label>
                      <Input type="number" value={revenueRange[1]} onChange={(e) => setRevenueRange([revenueRange[0], parseInt(e.target.value) || 1000])} className="text-sm" />
                    </div>
                  </div>
                  <div className="px-1">
                    <Slider min={0} max={1000} step={1} value={revenueRange} onValueChange={setRevenueRange} />
                    <div className="flex justify-between mt-1 text-xs text-gray-500"><span>0M</span><span>1B+</span></div>
                  </div>
                </div>
              </FilterSection>

            </div>

            {/* Signals Section */}
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
                  {/* Headcount Growth */}
                  <FilterSection label="Headcount growth" expandedFilters={expandedFilters} toggleFilter={toggleFilter}>
                    <div className="px-3 py-4 space-y-3 border border-gray-200 rounded-lg mx-3 mb-2">
                      <Select value={headcountDept} onValueChange={setHeadcountDept}>
                        <SelectTrigger className="w-full text-sm"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => <SelectItem key={dept} value={dept}>{dept}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <div className="grid grid-cols-2 gap-2">
                        <Input type="number" placeholder="Min (%)" value={headcountMin} onChange={(e) => setHeadcountMin(e.target.value)} className="text-sm" />
                        <Input type="number" placeholder="Max (%)" value={headcountMax} onChange={(e) => setHeadcountMax(e.target.value)} className="text-sm" />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">Reset</Button>
                        <Button size="sm" className="bg-[#1C64F2] hover:bg-[#1854cc]">Add</Button>
                      </div>
                    </div>
                  </FilterSection>

                  {/* Hiring */}
                  <HiringFilter expandedFilters={expandedFilters} toggleFilter={toggleFilter} />

                  {/* Tech Stack */}
                  <FilterSection label="Tech Stack" expandedFilters={expandedFilters} toggleFilter={toggleFilter} filterState={getFilter('Tech Stack')} creditBadge>
                    <SearchFilterList
                      items={mockTechStack}
                      filterName="Tech Stack"
                      filterState={getFilter('Tech Stack')}
                      toggleInclude={toggleInclude}
                      toggleExclude={toggleExclude}
                      removeInclude={removeInclude}
                      removeExclude={removeExclude}
                      placeholder="Search technologies..."
                    />
                  </FilterSection>

                  {/* Lookalike */}
                  <FilterSection label="Lookalike" expandedFilters={expandedFilters} toggleFilter={toggleFilter} filterState={getFilter('Lookalike')}>
                    <LookalikeFilter
                      items={mockLookalikes}
                      filterName="Lookalike"
                      filterState={getFilter('Lookalike')}
                      toggleInclude={toggleInclude}
                      toggleExclude={toggleExclude}
                      removeInclude={removeInclude}
                      removeExclude={removeExclude}
                      placeholder="Search company..."
                      renderItem={renderWithSub}
                      onGenerateDeepsearch={handleLookalikeGenerateDeepsearch}
                      onGeneratingChange={setIsLookalikeGenerating}
                    />
                  </FilterSection>
                </div>
              )}
            </div>

            {/* Deepsearch - after signals */}
             <div 
              ref={setDeepsearchRef}
              className={`mt-6 transition-all duration-1000 ${isAnimating ? 'ring-2 ring-purple-400 ring-opacity-60 rounded-lg p-2 shadow-lg shadow-purple-200' : ''}`}
            >
              <DeepsearchFilter
                expandedFilters={expandedFilters}
                toggleFilter={toggleFilter}
                deepsearchInput={deepsearchInput}
                setDeepsearchInput={setDeepsearchInput}
                placeholder={placeholder}
                handleGenerateKeywords={handleGenerateKeywords}
                generatedKeywords={generatedKeywords}
                onKeywordsCountChange={setDeepsearchCount}
                isGenerating={isLookalikeGenerating}
              />
            </div>
          </>
        )}

        {activeTab === 'lists' && (
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              <p className="mb-3">Organize your saved companies into lists for better targeting.</p>
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

function FilterSection({ label, expandedFilters, toggleFilter, filterState, count: externalCount, isHighlighted, creditBadge, children }) {
  const isExpanded = expandedFilters.includes(label);
  const count = externalCount ?? (filterState ? filterState.included.length + filterState.excluded.length : 0);

  return (
    <div className={`transition-all duration-1000 rounded-lg ${isHighlighted ? 'ring-2 ring-purple-400 ring-opacity-60 shadow-lg shadow-purple-200' : ''}`}>
      <button onClick={() => toggleFilter(label)} className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group">
        <div className="flex items-center gap-2">
          <span>{label}</span>
          {count > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#1C64F2] text-white text-xs flex items-center justify-center">{count}</span>
          )}
          {creditBadge && (
            <span className="text-[10px] font-semibold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded-full">1 crédit</span>
          )}
        </div>
        {isExpanded ? <Minus className="w-4 h-4 text-gray-400" /> : <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />}
      </button>
      {isExpanded && children}
    </div>
  );
}