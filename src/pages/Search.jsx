import React, { useState } from 'react';
import Sidebar from '../components/search/Sidebar';
import MainContent from '../components/search/MainContent';

export default function Search() {
  return (
    <div className="h-screen flex bg-white">
      <Sidebar />
      <MainContent />
    </div>
  );
}