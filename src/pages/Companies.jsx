import React, { useState } from 'react';
import Sidebar from '../components/companies/Sidebar';
import MainContent from '../components/companies/MainContent';

export default function Companies() {
  const [activeTab, setActiveTab] = useState('search');
  const [filterCount, setFilterCount] = useState(0);

  return (
    <div className="h-full flex bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onFilterCountChange={setFilterCount} />
      <MainContent activeTab={activeTab} setActiveTab={setActiveTab} filterCount={filterCount} />
    </div>
  );
}