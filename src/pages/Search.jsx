import React, { useState } from 'react';
import Header from '../components/search/Header';
import Sidebar from '../components/search/Sidebar';
import MainContent from '../components/search/MainContent';

export default function Search() {
  const [activeTab, setActiveTab] = useState('companies');

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeTab={activeTab} />
        <MainContent activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}