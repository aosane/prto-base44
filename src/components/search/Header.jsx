import React from 'react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_6963ade0463e29a0a9820782/656f37feb_Pronto-logo.png" 
            alt="Pronto" 
            className="h-8"
          />
        </div>
        <nav className="flex items-center gap-1">
          <button className="px-3 py-1.5 rounded-md text-sm font-medium text-white bg-[#2D55EB] flex items-center gap-2">
            Search
            <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded">New</span>
          </button>
          <button className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">
            Enrichment
          </button>
          <button className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">
            API Console
          </button>
          <button className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">
            Integrations
          </button>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-md px-3 py-1.5">
          <div className="w-5 h-5 bg-orange-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
            C
          </div>
          <span className="text-sm font-medium text-gray-900">100 Credits</span>
        </div>
        <button className="px-4 py-1.5 rounded-md text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700">
          Upgrade
        </button>
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <span className="font-medium">Settings</span>
          <span className="text-xs text-gray-500">gmail.com</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </header>
  );
}