import React, { useState } from 'react';
import { Upload, Download, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MainContent() {
  const [activeTab, setActiveTab] = useState('search');

  const templates = [
    { name: 'Early-Stage Company Founders', filters: 5 },
    { name: 'VP of Sales at SaaS Companies', filters: 4 },
    { name: 'Marketing Directors in Europe', filters: 6 },
    { name: 'Series A-B Startups (Fintech)', filters: 3 },
    { name: 'Engineering Managers at FAANG', filters: 4 },
  ];

  const personas = [
    'Founder',
    'CEO',
    'CTO',
    'CFO',
    'VP Sales',
    'VP Marketing',
    'Head of Product',
    'Sales Manager',
    'Marketing Manager',
  ];

  return (
    <main className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Header avec tabs et CTA */}
      <div className="border-b border-gray-200">
        <div className="px-8 pt-6 pb-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveTab('search')}
                className={`text-sm font-medium pb-4 border-b-2 transition-colors ${
                  activeTab === 'search'
                    ? 'text-gray-900 border-gray-900'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                Search
              </button>
              <button
                onClick={() => setActiveTab('lists')}
                className={`text-sm font-medium pb-4 border-b-2 transition-colors ${
                  activeTab === 'lists'
                    ? 'text-gray-900 border-gray-900'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                Lists
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                Export as CSV
              </button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#2D55EB] hover:bg-[#2442c7] text-white rounded-lg text-sm font-medium transition-colors">
                    Find People
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {personas.map((persona, index) => (
                    <DropdownMenuItem key={index}>
                      {persona}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-12">
          {/* Titre principal */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-semibold text-gray-900 mb-3">
              Search 👥 People & 🏢 Companies
            </h1>
            <p className="text-gray-600">
              Find and enrich contacts and companies from our database of 700M+ profiles.
            </p>
          </div>

          {/* Section Quickstart */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Quickstart
              </h2>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Upload className="w-4 h-4" />
              Upload companies
            </button>
          </div>

          {/* Section Templates */}
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Templates
            </h2>
            <div className="space-y-2">
              {templates.map((template, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between px-4 py-3.5 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors group"
                >
                  <span className="text-sm font-medium text-gray-900">
                    {template.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {template.filters} filters
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}