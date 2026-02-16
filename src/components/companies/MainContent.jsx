import React, { useState } from 'react';
import { Upload, ChevronDown, Download, FileText, Link as LinkIcon, List, Bell, FolderPlus, Users, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CompanyTable from './CompanyTable';
import AlertBanner from './AlertBanner';
import AlertFooterCard from './AlertFooterCard';
import AddToListDialog from './AddToListDialog';

export default function MainContent({ activeTab, setActiveTab, filterCount = 0 }) {
  const [showAddToList, setShowAddToList] = useState(false);
  const templates = [
    { name: 'SaaS Companies (Series A-B)', filters: 5 },
    { name: 'Fintech Startups', filters: 4 },
    { name: 'Tech Companies in Europe', filters: 6 },
    { name: 'Recently Funded Startups', filters: 3 },
    { name: 'Enterprise Software Companies', filters: 4 },
  ];

  if (activeTab === 'lists') {
    return (
      <main className="flex-1 overflow-y-auto bg-white p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">My Saved Lists</h2>
            <p className="text-gray-600">Manage and organize your company lists</p>
          </div>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <List className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-900 font-medium mb-2">No lists yet</p>
            <p className="text-gray-500 text-sm mb-6">Create your first list to start organizing your companies</p>
            <button className="px-6 py-2.5 bg-[#1C64F2] text-white text-sm font-medium rounded-lg hover:bg-[#1854cc] transition-colors">
              Create New List
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (filterCount > 0) {
    return (
      <main className="flex-1 overflow-y-auto bg-white relative z-0">
        <div className="px-6 py-4">
          {/* Header with count and action buttons */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">10 companies</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2 text-sm" onClick={() => setShowAddToList(true)}>
                <FolderPlus className="w-4 h-4" />
                Add to list
              </Button>
              <Button className="gap-2 text-sm bg-[#1C64F2] hover:bg-[#1854cc]">
                <Sparkles className="w-4 h-4" />
                Search employees
              </Button>
            </div>
          </div>

          {/* Option A: Alert banner under header */}
          <div className="mb-4">
            <AlertBanner />
          </div>

          {/* Company table */}
          <CompanyTable />

          {/* Option B: Alert card after results */}
          <AlertFooterCard />
        </div>

        {/* Option C: Add to list dialog with alert toggle */}
        <AddToListDialog open={showAddToList} onOpenChange={setShowAddToList} />
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto bg-white flex items-center justify-center relative z-0">
      <div className="w-full max-w-3xl px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Search 🏢 Companies
          </h1>
          <p className="text-gray-600">Find and enrich companies from our database of 700M+ profiles.</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">QUICKSTART</h2>
            <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Upload className="w-4 h-4" />
                  Import companies
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="flex items-center gap-3 py-2.5 cursor-pointer">
                  <FileText className="w-4 h-4" />
                  From CSV
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3 py-2.5 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  From CRM
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3 py-2.5 cursor-pointer">
                  <LinkIcon className="w-4 h-4" />
                  From URL
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">TEMPLATES</h3>
          <div className="bg-white rounded-lg border border-gray-200">
            {templates.map((template, index) => (
              <button
                key={index}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0"
              >
                <span className="text-sm text-gray-900">{template.name}</span>
                <span className="text-xs text-gray-500">{template.filters} Filters</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}