import React, { useState, useEffect } from 'react';
import { Search, List, Plus, Minus, ChevronUp, ChevronDown, User, Building2, RotateCcw, Zap } from 'lucide-react';
import SearchFilterList from '../search/SearchFilterList';
import CompanySizeFilter from '../search/CompanySizeFilter';
import useFilterState from '../search/useFilterState';

export default function LeadsSidebar({ activeTab, setActiveTab, onFilterCountChange }) {
  const [expandedFilters, setExpandedFilters] = useState([]);
  const [peopleExpanded, setPeopleExpanded] = useState(true);
  const [companyExpanded, setCompanyExpanded] = useState(true);
  const [signalsExpanded, setSignalsExpanded] = useState(true);
  const [signalViewedProfile, setSignalViewedProfile] = useState(false);
  const [signalPostedLinkedin, setSignalPostedLinkedin] = useState(false);
  const [followCompetitorInput, setFollowCompetitorInput] = useState('');
  const [engagedPostInput, setEngagedPostInput] = useState('');

  const [selectedCompanySizes, setSelectedCompanySizes] = useState([]);

  const { toggleInclude, toggleExclude, removeInclude, removeExclude, getFilter, getActiveCount, resetAll } = useFilterState();

  const toggleFilter = (name) => {
    setExpandedFilters(prev => prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]);
  };

  const activeCount = getActiveCount() + selectedCompanySizes.length;

  useEffect(() => {
    if (onFilterCountChange) onFilterCountChange(activeCount);
  }, [activeCount, onFilterCountChange]);

  // Mock data
  const mockJobTitles = ['CEO', 'CTO', 'VP Sales', 'Head of Marketing', 'Product Manager', 'Software Engineer', 'Data Scientist', 'Sales Director', 'CMO', 'COO'];
  const mockLocations = [
    { name: 'United States', sub: 'Country' }, { name: 'France', sub: 'Country' },
    { name: 'San Francisco, CA', sub: 'City' }, { name: 'Paris', sub: 'City' },
    { name: 'London, UK', sub: 'City' }, { name: 'New York, NY', sub: 'City' },
  ];
  const mockUniversities = ['Harvard', 'Stanford', 'MIT', 'HEC Paris', 'Oxford', 'Cambridge', 'Polytechnique', 'INSEAD'];
  const mockSkills = ['Sales', 'Marketing', 'Leadership', 'Python', 'JavaScript', 'Data Analysis', 'Project Management', 'Negotiation'];
  const mockCompanies = [
    { name: 'Apple', sub: 'apple.com' }, { name: 'Google', sub: 'google.com' },
    { name: 'Microsoft', sub: 'microsoft.com' }, { name: 'Salesforce', sub: 'salesforce.com' },
  ];
  const mockIndustries = ['Software Development', 'Financial Services', 'Healthcare', 'Consulting', 'E-commerce', 'Manufacturing'];
  const mockTypes = ['Public', 'Private', 'Nonprofit', 'Government', 'Education'];
  const mockHQ = [
    { name: 'United States', sub: 'Country' }, { name: 'France', sub: 'Country' },
    { name: 'Germany', sub: 'Country' }, { name: 'United Kingdom', sub: 'Country' },
  ];
  const mockSpecialties = ['SaaS', 'AI/ML', 'Fintech', 'Healthtech', 'E-commerce', 'Cybersecurity', 'Cloud Computing'];
  const changedJobsOptions = ['Last 30 days', 'Last 90 days', 'Last 6 months', 'Last 12 months'];
  const yearsOptions = ['< 1 year', '1-2 years', '3-5 years', '5-10 years', '10+ years'];

  const renderWithSub = (item) => (
    <div>
      <div className="font-medium text-sm">{item.name}</div>
      <div className="text-xs text-gray-500">{item.sub}</div>
    </div>
  );

  return (
    <aside className="w-72 bg-white border-r border-gray-200 relative z-10 flex-shrink-0 h-full flex flex-col">
      <div className="p-4 flex-1 overflow-y-auto">
        {/* Title + filter count */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">Leads</h1>
          <div className="flex items-center gap-2">
            {activeCount > 0 && (
              <>
                <button
                  onClick={() => { resetAll(); setSelectedCompanySizes([]); }}
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

        {/* Tabs */}
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
            {/* PEOPLE section */}
            <div className="mb-2">
              <button
                onClick={() => setPeopleExpanded(!peopleExpanded)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-400 uppercase mb-2 hover:text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>PEOPLE</span>
                </div>
                {peopleExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {peopleExpanded && (
                <div className="space-y-1">
                  <FilterSection label="Job title" expandedFilters={expandedFilters} toggleFilter={toggleFilter} filterState={getFilter('Job title')}>
                    <SearchFilterList items={mockJobTitles} filterName="Job title" filterState={getFilter('Job title')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Search job titles..." />
                  </FilterSection>

                  <FilterSection label="Location" expandedFilters={expandedFilters} toggleFilter={toggleFilter} filterState={getFilter('Location')}>
                    <SearchFilterList items={mockLocations} filterName="Location" filterState={getFilter('Location')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Search locations..." renderItem={renderWithSub} />
                  </FilterSection>

                  <FilterSection label="Years in current role" expandedFilters={expandedFilters} toggleFilter={toggleFilter} filterState={getFilter('Years in current role')}>
                    <SearchFilterList items={yearsOptions} filterName="Years in current role" filterState={getFilter('Years in current role')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Select range..." />
                  </FilterSection>

                  <FilterSection label="Years at current company" expandedFilters={expandedFilters} toggleFilter={toggleFilter} filterState={getFilter('Years at current company')}>
                    <SearchFilterList items={yearsOptions} filterName="Years at current company" filterState={getFilter('Years at current company')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Select range..." />
                  </FilterSection>

                  <FilterSection label="University" expandedFilters={expandedFilters} toggleFilter={toggleFilter} filterState={getFilter('University')}>
                    <SearchFilterList items={mockUniversities} filterName="University" filterState={getFilter('University')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Search universities..." />
                  </FilterSection>


                  <FilterSection label="First name" expandedFilters={expandedFilters} toggleFilter={toggleFilter} filterState={getFilter('First name')}>
                    <SearchFilterList items={[]} filterName="First name" filterState={getFilter('First name')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Search first name..." />
                  </FilterSection>

                  <FilterSection label="Last name" expandedFilters={expandedFilters} toggleFilter={toggleFilter} filterState={getFilter('Last name')}>
                    <SearchFilterList items={[]} filterName="Last name" filterState={getFilter('Last name')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Search last name..." />
                  </FilterSection>

                  {/* CRM - with SOON badge, not expandable */}
                  <div>
                    <button className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group cursor-default">
                      <div className="flex items-center gap-2">
                        <span>CRM</span>
                        <span className="text-[10px] font-medium text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full uppercase">Soon</span>
                      </div>
                      <Plus className="w-4 h-4 text-gray-300" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="border-b border-gray-200 my-2"></div>

            {/* SIGNALS section */}
            <div className="mb-2">
              <button
                onClick={() => setSignalsExpanded(!signalsExpanded)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-400 uppercase mb-2 hover:text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>SIGNALS</span>
                </div>
                {signalsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {signalsExpanded && (
                <div className="space-y-1">
                  {/* Viewed your profile - simple toggle */}
                  <div className="flex items-center justify-between px-3 py-2.5">
                    <span className="text-sm text-gray-700">Viewed your profile recently</span>
                    <button
                      onClick={() => setSignalViewedProfile(!signalViewedProfile)}
                      className={`w-9 h-5 rounded-full transition-colors relative ${signalViewedProfile ? 'bg-[#1C64F2]' : 'bg-gray-300'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${signalViewedProfile ? 'translate-x-4' : 'translate-x-0.5'}`} />
                    </button>
                  </div>

                  {/* Posted on LinkedIn - simple toggle */}
                  <div className="flex items-center justify-between px-3 py-2.5">
                    <span className="text-sm text-gray-700">Posted on LinkedIn</span>
                    <button
                      onClick={() => setSignalPostedLinkedin(!signalPostedLinkedin)}
                      className={`w-9 h-5 rounded-full transition-colors relative ${signalPostedLinkedin ? 'bg-[#1C64F2]' : 'bg-gray-300'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${signalPostedLinkedin ? 'translate-x-4' : 'translate-x-0.5'}`} />
                    </button>
                  </div>

                  {/* Changed Jobs - with 3 months / 1 year choice */}
                  <FilterSection label="Changed jobs" expandedFilters={expandedFilters} toggleFilter={toggleFilter} filterState={getFilter('Changed jobs signal')}>
                    <div className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleInclude('Changed jobs signal', '3 months')}
                          className={`flex-1 text-xs font-medium py-2 rounded-md border transition-colors ${getFilter('Changed jobs signal').included.includes('3 months') ? 'bg-[#1C64F2] text-white border-[#1C64F2]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                        >
                          3 months
                        </button>
                        <button
                          onClick={() => toggleInclude('Changed jobs signal', '1 year')}
                          className={`flex-1 text-xs font-medium py-2 rounded-md border transition-colors ${getFilter('Changed jobs signal').included.includes('1 year') ? 'bg-[#1C64F2] text-white border-[#1C64F2]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                        >
                          1 year
                        </button>
                      </div>
                    </div>
                  </FilterSection>

                  {/* Follow competitor */}
                  <FilterSection label="Follow competitor" expandedFilters={expandedFilters} toggleFilter={toggleFilter} filterState={getFilter('Follow competitor')}>
                    <div className="px-3 py-2">
                      <input
                        type="text"
                        placeholder="Name or LinkedIn URL..."
                        value={followCompetitorInput}
                        onChange={(e) => setFollowCompetitorInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && followCompetitorInput.trim()) {
                            toggleInclude('Follow competitor', followCompetitorInput.trim());
                            setFollowCompetitorInput('');
                          }
                        }}
                        className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1C64F2] focus:border-[#1C64F2]"
                      />
                      {followCompetitorInput.trim() && (
                        <div className="mt-1 border border-gray-200 rounded-md bg-white shadow-sm max-h-32 overflow-y-auto">
                          {['John Doe', 'Jane Smith', 'Marc Dupont'].filter(n => n.toLowerCase().includes(followCompetitorInput.toLowerCase())).map(name => (
                            <button key={name} onClick={() => { toggleInclude('Follow competitor', name); setFollowCompetitorInput(''); }} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              {name}
                            </button>
                          ))}
                        </div>
                      )}
                      {getFilter('Follow competitor').included.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {getFilter('Follow competitor').included.map(item => (
                            <span key={item} className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {item}
                              <button onClick={() => removeInclude('Follow competitor', item)} className="hover:text-blue-600">×</button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </FilterSection>

                  {/* Engaged with a post */}
                  <FilterSection label="Engaged with a post" expandedFilters={expandedFilters} toggleFilter={toggleFilter} filterState={getFilter('Engaged with a post')}>
                    <div className="px-3 py-2">
                      <input
                        type="text"
                        placeholder="Paste LinkedIn post URL..."
                        value={engagedPostInput}
                        onChange={(e) => setEngagedPostInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && engagedPostInput.trim()) {
                            toggleInclude('Engaged with a post', engagedPostInput.trim());
                            setEngagedPostInput('');
                          }
                        }}
                        className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1C64F2] focus:border-[#1C64F2]"
                      />
                      {getFilter('Engaged with a post').included.length > 0 && (
                        <div className="flex flex-col gap-1 mt-2">
                          {getFilter('Engaged with a post').included.map(url => (
                            <span key={url} className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full truncate max-w-full">
                              <span className="truncate">{url}</span>
                              <button onClick={() => removeInclude('Engaged with a post', url)} className="hover:text-blue-600 flex-shrink-0">×</button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </FilterSection>
                </div>
              )}
            </div>

            <div className="border-b border-gray-200 my-2"></div>

            {/* COMPANY section */}
            <div>
              <button
                onClick={() => setCompanyExpanded(!companyExpanded)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-400 uppercase mb-2 hover:text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>COMPANY</span>
                </div>
                {companyExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {companyExpanded && (
                <div className="space-y-1">
                  {/* Current Company */}
                  <FilterSection label="Current company" expandedFilters={expandedFilters} toggleFilter={toggleFilter} filterState={getFilter('Current company')}>
                    <SearchFilterList items={mockCompanies} filterName="Current company" filterState={getFilter('Current company')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Search current companies..." renderItem={renderWithSub} />
                  </FilterSection>

                  {/* Past Company */}
                  <FilterSection label="Past company" expandedFilters={expandedFilters} toggleFilter={toggleFilter} filterState={getFilter('Past company')}>
                    <SearchFilterList items={mockCompanies} filterName="Past company" filterState={getFilter('Past company')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Search past companies..." renderItem={renderWithSub} />
                  </FilterSection>

                  <FilterSection label="Headcount" expandedFilters={expandedFilters} toggleFilter={toggleFilter} count={selectedCompanySizes.length}>
                    <CompanySizeFilter selected={selectedCompanySizes} setSelected={setSelectedCompanySizes} />
                  </FilterSection>

                  <FilterSection label="Headquarters" expandedFilters={expandedFilters} toggleFilter={toggleFilter} filterState={getFilter('Headquarters')}>
                    <SearchFilterList items={mockHQ} filterName="Headquarters" filterState={getFilter('Headquarters')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Search locations..." renderItem={renderWithSub} />
                  </FilterSection>

                  <FilterSection label="Specialties" expandedFilters={expandedFilters} toggleFilter={toggleFilter} filterState={getFilter('Specialties')}>
                    <SearchFilterList items={mockSpecialties} filterName="Specialties" filterState={getFilter('Specialties')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Search specialties..." />
                  </FilterSection>
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