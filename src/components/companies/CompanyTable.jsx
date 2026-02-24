import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";

const mockCompanies = [
  { id: 1, name: 'Karbosan France', logo: '🏭', location: '—', headcount: '501-1,000 employees', industry: 'Abrasives and Nonmetalli...', type: '—' },
  { id: 2, name: 'AbraConvert SAS', logo: '📊', location: '—', headcount: '1-10 employees', industry: 'Abrasives and Nonmetalli...', type: '—' },
  { id: 3, name: 'MINERAUX INDUSTRIELS D...', logo: '⛏️', location: '—', headcount: '11-50 employees', industry: 'Abrasives and Nonmetalli...', type: '—' },
  { id: 4, name: 'ABRASIENNE', logo: '🔧', location: '—', headcount: '8', industry: 'Abrasives and Nonmetalli...', type: '—' },
  { id: 5, name: 'BARYTINE ET MINERAUX', logo: '💎', location: '—', headcount: '1-10 employees', industry: 'Abrasives and Nonmetalli...', type: '—' },
  { id: 6, name: 'MEPO-OMAM', logo: '🏗️', location: '—', headcount: '1-10 employees', industry: 'Abrasives and Nonmetalli...', type: '—' },
  { id: 7, name: 'JURABRASIFS', logo: '🔩', location: '—', headcount: '1-10 employees', industry: 'Abrasives and Nonmetalli...', type: '—' },
  { id: 8, name: 'AM2S - Spécialiste du cons...', logo: '♻️', location: '—', headcount: '1-10 employees', industry: 'Abrasives and Nonmetalli...', type: '—' },
  { id: 9, name: 'Ets Sémanaz', logo: '🏢', location: '—', headcount: '11-50 employees', industry: 'Abrasives and Nonmetalli...', type: '—' },
  { id: 10, name: 'TechAbrasion SARL', logo: '⚙️', location: '—', headcount: '1-10 employees', industry: 'Abrasives and Nonmetalli...', type: '—' },
];

export default function CompanyTable({ upgradeFilterActive = false }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const allSelected = selectedIds.length === mockCompanies.length;

  const toggleAll = () => {
    setSelectedIds(allSelected ? [] : mockCompanies.map(c => c.id));
  };

  const toggleOne = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-3 px-4 w-10">
              <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Headcount</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
          </tr>
        </thead>
        <tbody>
          {mockCompanies.map((company) => (
            <tr key={company.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4">
                <Checkbox
                  checked={selectedIds.includes(company.id)}
                  onCheckedChange={() => toggleOne(company.id)}
                />
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-sm ${upgradeFilterActive ? 'blur-sm' : ''}`}>
                    {company.logo}
                  </div>
                  <span className={`text-sm font-medium text-gray-900 truncate max-w-[180px] ${upgradeFilterActive ? 'blur-sm select-none' : ''}`}>{company.name}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-sm text-gray-500">{company.location}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{company.headcount}</td>
              <td className="py-3 px-4 text-sm text-gray-500 truncate max-w-[160px]">{company.industry}</td>
              <td className="py-3 px-4 text-sm text-gray-500">{company.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}