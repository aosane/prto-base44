import React, { useState } from 'react';
import { Upload, ChevronDown, Download } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MainContent({ activeTab, setActiveTab }) {
  const templates = [
    { name: 'Early-Stage Company Founders', filters: 5 },
    { name: 'VP of Sales at SaaS Companies', filters: 4 },
    { name: 'Marketing Directors in Europe', filters: 6 },
    { name: 'Series A-B Startups (Fintech)', filters: 3 },
    { name: 'Engineering Managers at FAANG', filters: 4 },
  ];

  if (activeTab === 'lists') {
    return (
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">My Lists</h1>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#2D55EB] bg-[#2D55EB]/10 rounded-lg hover:bg-[#2D55EB]/20 transition-colors">
                <Download className="w-4 h-4" />
                Download as CSV
              </button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#2D55EB] rounded-lg hover:bg-[#2442c7] transition-colors">
                    Find People
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>Founder</DropdownMenuItem>
                  <DropdownMenuItem>CEO</DropdownMenuItem>
                  <DropdownMenuItem>Sales</DropdownMenuItem>
                  <DropdownMenuItem>Marketing</DropdownMenuItem>
                  <DropdownMenuItem>Engineering</DropdownMenuItem>
                  <DropdownMenuItem>Product</DropdownMenuItem>
                  <DropdownMenuItem>Operations</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-900 font-medium mb-2">No lists available</p>
            <p className="text-gray-500 text-sm">Create your first list to get started organizing your data</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto bg-white">
      <div className="p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Search 👥 People & 🏢 Companies
          </h1>
          <p className="text-gray-600">Find and enrich contacts and companies from our database of 700M+ profiles.</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">QUICKSTART</h2>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Upload className="w-4 h-4" />
              Upload companies
            </button>
          </div>
        </div>

        <div className="mb-8">
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