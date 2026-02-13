import React from 'react';
import Sidebar from '../components/search/Sidebar';
import MainContent from '../components/search/MainContent';

export default function Search() {
  return (
    <div className="h-full flex overflow-hidden bg-gray-50">
      <Sidebar />
      <MainContent />
    </div>
  );
}