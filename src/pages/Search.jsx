import React, { useState } from 'react';
import LeadsSidebar from '../components/leads/LeadsSidebar';
import LeadsMainContent from '../components/leads/LeadsMainContent';

export default function Search() {
  const [filterCount, setFilterCount] = useState(0);

  return (
    <div className="h-full flex overflow-hidden bg-gray-50">
      <LeadsSidebar onFilterCountChange={setFilterCount} />
      <LeadsMainContent filterCount={filterCount} />
    </div>
  );
}