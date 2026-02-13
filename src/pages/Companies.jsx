import React, { useState } from 'react';
import Sidebar from '../components/companies/Sidebar';
import MainContent from '../components/companies/MainContent';

export default function Companies() {
  const [activeTab, setActiveTab] = useState('search');

  return (
    <div className="h-full flex overflow-hidden bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <MainContent activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}