import React from 'react';
import { LayoutDashboard, Users, Building2, Target, Zap, ChevronRight, Info, Menu } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: false },
    { icon: Users, label: 'Personas', active: false },
    { icon: Building2, label: 'Companies', active: false },
    { icon: Target, label: 'Leads', active: false },
    { icon: Zap, label: 'Signals', active: false },
  ];

  const filters = [
    'Name',
    'Job title',
    'Company',
    'Location',
    'Industry',
    'Seniority',
    'Department',
  ];

  return (
    <aside className="w-72 border-r border-gray-200 flex flex-col bg-white">
      {/* Logo et menu toggle */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_6963ade0463e29a0a9820782/656f37feb_Pronto-logo.png" 
            alt="Pronto" 
            className="h-6"
          />
        </div>
        <button className="p-1.5 hover:bg-gray-100 rounded">
          <Menu className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Menu de navigation */}
      <nav className="px-2 py-3 border-b border-gray-200">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg mb-1 ${
              item.active
                ? 'bg-gray-100 text-gray-900 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Section Search avec filtres */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="mb-4">
            <div className="text-xs font-medium text-gray-900 mb-3">Search</div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span className="font-medium">0 FILTERS</span>
            </div>
            <button className="text-xs text-[#2D55EB] hover:underline">
              Saved searches
            </button>
          </div>

          {/* Liste des filtres */}
          <div className="space-y-1">
            {filters.map((filter, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
              >
                <span>{filter}</span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section inférieure avec limites et crédits */}
      <div className="border-t border-gray-200 p-4 space-y-4">
        {/* Monthly Limit */}
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-700 mb-2">
            <span>Monthly Limit</span>
            <Info className="w-3.5 h-3.5 text-gray-400" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-gray-600">Leads</span>
              </div>
              <span className="text-gray-900 font-medium">5082 / 50000</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-gray-600">Companies</span>
              </div>
              <span className="text-gray-900 font-medium">0 / 500000</span>
            </div>
          </div>
          <button className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium rounded-lg transition-colors">
            <Zap className="w-3.5 h-3.5" />
            Subscribe to a plan
          </button>
        </div>

        {/* Emails & Phones */}
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-700 mb-2">
            <span>Emails & Phones</span>
            <Info className="w-3.5 h-3.5 text-gray-400" />
          </div>
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
              <span className="text-gray-600">Credits</span>
            </div>
            <span className="text-gray-900 font-medium">878</span>
          </div>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium rounded-lg transition-colors">
            Add credits
          </button>
        </div>

        {/* Email utilisateur */}
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">M</span>
            </div>
            <span className="text-xs text-gray-600">thiane@prontohs.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
}