import React, { useState } from 'react';
import { Filter, SlidersHorizontal, User, Building2, ChevronUp, ChevronDown, RotateCcw, Search, Bookmark } from 'lucide-react';
import LeadsFilterSection from './LeadsFilterSection';
import SearchFilterList from '../search/SearchFilterList';
import useFilterState from '../search/useFilterState';
import CompanySizeFilter from '../search/CompanySizeFilter';

export default function LeadsSidebar({ onFilterCountChange }) {
  const [expandedFilters, setExpandedFilters] = useState([]);
  const [peopleExpanded, setPeopleExpanded] = useState(true);
  const [companyExpanded, setCompanyExpanded] = useState(true);
  const [companyTimeFilter, setCompanyTimeFilter] = useState('current'); // 'current' or 'past'
  const [selectedCompanySizes, setSelectedCompanySizes] = useState([]);

  const { toggleInclude, toggleExclude, removeInclude, removeExclude, getFilter, getActiveCount, resetAll } = useFilterState();

  const toggleFilter = (name) => {
    setExpandedFilters(prev => prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]);
  };

  const activeCount = getActiveCount() + selectedCompanySizes.length;

  React.useEffect(() => {
    if (onFilterCountChange) onFilterCountChange(activeCount);
  }, [activeCount, onFilterCountChange]);

  // Mock data
  const mockJobTitles = ['CEO', 'CTO', 'VP Sales', 'Head of Marketing', 'Product Manager', 'Software Engineer', 'Data Scientist', 'Sales Director', 'CMO', 'COO'];
  const mockLocations = [
    { name: 'United States', sub: 'Country' },
    { name: 'France', sub: 'Country' },
    { name: 'San Francisco, CA', sub: 'City' },
    { name: 'Paris', sub: 'City' },
    { name: 'London, UK', sub: 'City' },
    { name: 'New York, NY', sub: 'City' },
  ];
  const mockUniversities = ['Harvard', 'Stanford', 'MIT', 'HEC Paris', 'Oxford', 'Cambridge', 'Polytechnique', 'INSEAD'];
  const mockSkills = ['Sales', 'Marketing', 'Leadership', 'Python', 'JavaScript', 'Data Analysis', 'Project Management', 'Negotiation'];
  const mockCompanies = [
    { name: 'Apple', sub: 'apple.com' },
    { name: 'Google', sub: 'google.com' },
    { name: 'Microsoft', sub: 'microsoft.com' },
    { name: 'Salesforce', sub: 'salesforce.com' },
  ];
  const mockIndustries = ['Software Development', 'Financial Services', 'Healthcare', 'Consulting', 'E-commerce', 'Manufacturing'];
  const mockTypes = ['Public', 'Private', 'Nonprofit', 'Government', 'Education'];
  const mockHQ = [
    { name: 'United States', sub: 'Country' },
    { name: 'France', sub: 'Country' },
    { name: 'Germany', sub: 'Country' },
    { name: 'United Kingdom', sub: 'Country' },
  ];
  const mockSpecialties = ['SaaS', 'AI/ML', 'Fintech', 'Healthtech', 'E-commerce', 'Cybersecurity', 'Cloud Computing'];

  const renderWithSub = (item) => (
    <div>
      <div className="font-medium text-sm">{item.name}</div>
      <div className="text-xs text-gray-500">{item.sub}</div>
    </div>
  );

  const changedJobsOptions = ['Last 30 days', 'Last 90 days', 'Last 6 months', 'Last 12 months'];
  const yearsOptions = ['< 1 year', '1-2 years', '3-5 years', '5-10 years', '10+ years'];

  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex-shrink-0 h-full flex flex-col">
      <div className="p-4 flex-1 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              {activeCount} FILTER{activeCount !== 1 ? 'S' : ''}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {activeCount > 0 && (
              <button
                onClick={() => {
                  resetAll();
                  setSelectedCompanySizes([]);
                }}
                className="text-xs font-medium text-gray-500 hover:text-red-600 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Bookmark className="w-3.5 h-3.5" />
              Saved searches
            </button>
          </div>
        </div>

        <div className="border-b border-gray-200 mb-4"></div>

        {/* PEOPLE section */}
        <div className="mb-2">
          <button
            onClick={() => setPeopleExpanded(!peopleExpanded)}
            className="w-full flex items-center justify-between px-1 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700"
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>People</span>
            </div>
            {peopleExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {peopleExpanded && (
            <div className="space-y-0.5">
              {/* Job title */}
              <LeadsFilterSection label="Job title" isExpanded={expandedFilters.includes('Job title')} onToggle={() => toggleFilter('Job title')}>
                <SearchFilterList items={mockJobTitles} filterName="Job title" filterState={getFilter('Job title')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Search job titles..." />
              </LeadsFilterSection>

              {/* Location */}
              <LeadsFilterSection label="Location" isExpanded={expandedFilters.includes('Location')} onToggle={() => toggleFilter('Location')}>
                <SearchFilterList items={mockLocations} filterName="Location" filterState={getFilter('Location')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Search locations..." renderItem={renderWithSub} />
              </LeadsFilterSection>

              {/* Years in current role */}
              <LeadsFilterSection label="Years in current role" isExpanded={expandedFilters.includes('Years in current role')} onToggle={() => toggleFilter('Years in current role')}>
                <SearchFilterList items={yearsOptions} filterName="Years in current role" filterState={getFilter('Years in current role')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Select range..." />
              </LeadsFilterSection>

              {/* Years at current company */}
              <LeadsFilterSection label="Years at current company" isExpanded={expandedFilters.includes('Years at current company')} onToggle={() => toggleFilter('Years at current company')}>
                <SearchFilterList items={yearsOptions} filterName="Years at current company" filterState={getFilter('Years at current company')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Select range..." />
              </LeadsFilterSection>

              {/* University */}
              <LeadsFilterSection label="University" isExpanded={expandedFilters.includes('University')} onToggle={() => toggleFilter('University')}>
                <SearchFilterList items={mockUniversities} filterName="University" filterState={getFilter('University')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Search universities..." />
              </LeadsFilterSection>

              {/* Changed jobs */}
              <LeadsFilterSection label="Changed jobs" isExpanded={expandedFilters.includes('Changed jobs')} onToggle={() => toggleFilter('Changed jobs')}>
                <SearchFilterList items={changedJobsOptions} filterName="Changed jobs" filterState={getFilter('Changed jobs')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Select period..." />
              </LeadsFilterSection>

              {/* Name */}
              <LeadsFilterSection label="Name" isExpanded={expandedFilters.includes('Name')} onToggle={() => toggleFilter('Name')}>
                <SearchFilterList items={[]} filterName="Name" filterState={getFilter('Name')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Search by name..." />
              </LeadsFilterSection>

              {/* Skills */}
              <LeadsFilterSection label="Skills" isExpanded={expandedFilters.includes('Skills')} onToggle={() => toggleFilter('Skills')}>
                <SearchFilterList items={mockSkills} filterName="Skills" filterState={getFilter('Skills')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Search skills..." />
              </LeadsFilterSection>

              {/* CRM - with SOON badge */}
              <LeadsFilterSection label="CRM" badge="Soon" isExpanded={false} onToggle={() => {}} />
            </div>
          )}
        </div>

        <div className="border-b border-gray-200 mb-2"></div>

        {/* COMPANY section */}
        <div>
          <button
            onClick={() => setCompanyExpanded(!companyExpanded)}
            className="w-full flex items-center justify-between px-1 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700"
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>Company</span>
            </div>
            {companyExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {companyExpanded && (
            <div className="space-y-0.5">
              {/* Company - with current/past toggle */}
              <LeadsFilterSection label="Company" isExpanded={expandedFilters.includes('Company')} onToggle={() => toggleFilter('Company')}>
                <div className="px-3 mb-2">
                  <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                    <button
                      onClick={() => setCompanyTimeFilter('current')}
                      className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-colors ${companyTimeFilter === 'current' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Current
                    </button>
                    <button
                      onClick={() => setCompanyTimeFilter('past')}
                      className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-colors ${companyTimeFilter === 'past' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Past
                    </button>
                  </div>
                </div>
                <SearchFilterList items={mockCompanies} filterName="Company" filterState={getFilter('Company')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Search companies..." renderItem={renderWithSub} />
              </LeadsFilterSection>

              {/* Headcount */}
              <LeadsFilterSection label="Headcount" isExpanded={expandedFilters.includes('Headcount')} onToggle={() => toggleFilter('Headcount')}>
                <CompanySizeFilter selected={selectedCompanySizes} setSelected={setSelectedCompanySizes} />
              </LeadsFilterSection>

              {/* Industry */}
              <LeadsFilterSection label="Industry" isExpanded={expandedFilters.includes('Industry')} onToggle={() => toggleFilter('Industry')}>
                <SearchFilterList items={mockIndustries} filterName="Industry" filterState={getFilter('Industry')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Search industries..." />
              </LeadsFilterSection>

              {/* Type */}
              <LeadsFilterSection label="Type" isExpanded={expandedFilters.includes('Type')} onToggle={() => toggleFilter('Type')}>
                <SearchFilterList items={mockTypes} filterName="Type" filterState={getFilter('Type')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Search types..." />
              </LeadsFilterSection>

              {/* Headquarters */}
              <LeadsFilterSection label="Headquarters" isExpanded={expandedFilters.includes('Headquarters')} onToggle={() => toggleFilter('Headquarters')}>
                <SearchFilterList items={mockHQ} filterName="Headquarters" filterState={getFilter('Headquarters')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Search locations..." renderItem={renderWithSub} />
              </LeadsFilterSection>

              {/* Specialties */}
              <LeadsFilterSection label="Specialties" isExpanded={expandedFilters.includes('Specialties')} onToggle={() => toggleFilter('Specialties')}>
                <SearchFilterList items={mockSpecialties} filterName="Specialties" filterState={getFilter('Specialties')} toggleInclude={toggleInclude} toggleExclude={toggleExclude} removeInclude={removeInclude} removeExclude={removeExclude} placeholder="Search specialties..." />
              </LeadsFilterSection>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}