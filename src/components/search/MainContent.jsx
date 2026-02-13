import React from 'react';
import { Search, Upload, ChevronDown } from 'lucide-react';

export default function MainContent({ activeTab, setActiveTab }) {
  const quickstartItems = [
    { name: 'Early-Stage Company Founders', filters: 5 },
    { name: 'VP Sales in Software Companies', filters: 7 },
    { name: 'Agency Owners', filters: 3 },
    { name: 'Head of Marketing at Large Companies', filters: 3 },
    { name: 'Early-Stage Software Companies', filters: 2 },
    { name: 'Mid-Size Tech Companies', filters: 3 },
    { name: 'Manufacturing Companies in United States', filters: 2 },
    { name: 'Financial Services Companies in Europe', filters: 5 },
  ];

  if (activeTab === 'lists') {
    return (
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('people')}
              className="px-1 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              People
            </button>
            <button
              onClick={() => setActiveTab('companies')}
              className="px-1 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Companies
            </button>
            <button
              onClick={() => setActiveTab('lists')}
              className="px-1 py-2 text-sm font-medium text-[#2D55EB] border-b-2 border-[#2D55EB]"
            >
              Lists
            </button>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="flex items-center gap-4 mb-6">
            <button className="px-4 py-2 text-sm font-medium text-gray-900 border-b-2 border-gray-900">
              My lists
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">
              Workspace lists
            </button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or owner"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2D55EB] focus:border-transparent"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-900 font-medium mb-2">No lists available</p>
            <p className="text-gray-500 text-sm">Create your first list to get started organizing your data</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50">
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab('people')}
            className={`px-1 py-2 text-sm font-medium ${
              activeTab === 'people'
                ? 'text-[#2D55EB] border-b-2 border-[#2D55EB]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            People
          </button>
          <button
            onClick={() => setActiveTab('companies')}
            className={`px-1 py-2 text-sm font-medium ${
              activeTab === 'companies'
                ? 'text-[#2D55EB] border-b-2 border-[#2D55EB]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Companies
          </button>
          <button
            onClick={() => setActiveTab('lists')}
            className="px-1 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Lists
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Search{' '}
            <span className="inline-flex items-center gap-2">
              <svg className="w-7 h-7 text-[#2D55EB]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              People &
            </span>{' '}
            <span className="inline-flex items-center gap-2">
              <svg className="w-7 h-7 text-[#2D55EB]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Companies
            </span>
          </h1>
          <p className="text-gray-600">Apply filters on the left to find people and companies to enrich.</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-medium text-gray-900">Quickstart</h2>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
              <Upload className="w-4 h-4" />
              Upload companies
            </button>
          </div>
          
          <div className="divide-y divide-gray-100">
            {quickstartItems.map((item, index) => (
              <button
                key={index}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Search className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{item.filters} filters</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            How is FullEnrich working for you?{' '}
            <a href="#" className="text-[#2D55EB] hover:underline">
              Share feedback ↗
            </a>{' '}
            or{' '}
            <a href="#" className="text-[#2D55EB] hover:underline">
              Request new filters ↗
            </a>
          </p>
        </div>
      </div>

      {/* Floating Help Button */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-[#2D55EB] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#2442c7] transition-colors">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    </main>
  );
}