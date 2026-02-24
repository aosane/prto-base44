import React, { useState } from 'react';
import LeadsSidebar from '../components/leads/LeadsSidebar';
import LeadsMainContent from '../components/leads/LeadsMainContent';

export default function Search() {
  const [activeTab, setActiveTab] = useState('search');
  const [filterCount, setFilterCount] = useState(0);
  const [signalFilterActive, setSignalFilterActive] = useState(false);

  return (
    <div className="h-full flex overflow-hidden bg-gray-50">
      <LeadsSidebar activeTab={activeTab} setActiveTab={setActiveTab} onFilterCountChange={setFilterCount} onSignalFilterChange={setSignalFilterActive} />
      <LeadsMainContent activeTab={activeTab} filterCount={filterCount} signalFilterActive={signalFilterActive} />
    </div>
  );
}