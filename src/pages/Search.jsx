import React, { useState } from 'react';
import Sidebar from '../components/search/Sidebar';
import MainContent from '../components/search/MainContent';

export default function Search() {
  const [activeTab, setActiveTab] = useState('search');

  return (
    <div className="h-full flex overflow-hidden bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <MainContent activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}