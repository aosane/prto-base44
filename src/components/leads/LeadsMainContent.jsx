import React, { useState } from 'react';
import { Users, List, Upload, ChevronDown, Sparkles, Share2, FolderPlus, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import LeadsTable from './LeadsTable';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const templates = [
  { name: 'Sales Leaders in SaaS', filters: 5 },
  { name: 'Marketing Directors (France)', filters: 4 },
  { name: 'CTOs at Startups', filters: 6 },
  { name: 'Recently Changed Jobs', filters: 3 },
  { name: 'VPs in Financial Services', filters: 4 },
];

export default function LeadsMainContent({ activeTab, filterCount = 0, signalFilterActive = false }) {
  const [unlocked, setUnlocked] = useState(false);
  const [showAddToListDialog, setShowAddToListDialog] = useState(false);
  const [listName, setListName] = useState('');
  const [enableAlerts, setEnableAlerts] = useState(false);
  if (activeTab === 'lists') {
    return (
      <main className="flex-1 overflow-y-auto bg-white p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">My Saved Lists</h2>
            <p className="text-gray-600">Manage and organize your lead lists</p>
          </div>
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <List className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-900 font-medium mb-2">No lists yet</p>
            <p className="text-gray-500 text-sm mb-6">Create your first list to start organizing your leads</p>
            <button className="px-6 py-2.5 bg-[#1C64F2] text-white text-sm font-medium rounded-lg hover:bg-[#1854cc] transition-colors">
              Create New List
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Show results when filters are active
  if (filterCount > 0) {
    return (
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="h-full flex flex-col">
          {/* Header with actions */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">10 leads found</h2>
                <p className="text-sm text-gray-500 mt-0.5">Based on your search criteria</p>
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Share2 className="w-4 h-4" />
                      Push to
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      <span>Salesforce</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>HubSpot</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Lemlist</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Pipedrive</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Zapier</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="outline" onClick={() => setShowAddToListDialog(true)} className="gap-2 bg-white">
                  <FolderPlus className="w-4 h-4" />
                  Add to list
                </Button>

                <Button className="bg-[#1C64F2] hover:bg-[#1854cc] gap-2">
                  <Sparkles className="w-4 h-4" />
                  Enrich all
                </Button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto px-6 py-4">
            <LeadsTable />
          </div>
        </div>

        {/* Add to List Dialog */}
        <Dialog open={showAddToListDialog} onOpenChange={setShowAddToListDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Save to list</DialogTitle>
              <DialogDescription>
                Save these leads to a list to organize and track them
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">List name</label>
                <Input
                  placeholder="Enter list name..."
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Enable alerts</p>
                  <p className="text-xs text-gray-500">Get notified when leads match your criteria</p>
                </div>
                <button
                  onClick={() => setEnableAlerts(!enableAlerts)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${enableAlerts ? 'bg-[#1C64F2]' : 'bg-gray-300'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${enableAlerts ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowAddToListDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowAddToListDialog(false);
                  setListName('');
                  setEnableAlerts(false);
                }}
                disabled={!listName.trim()}
                className="flex-1 bg-[#1C64F2] hover:bg-[#1854cc]"
              >
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto bg-white relative z-0">
      <div className="w-full max-w-2xl mx-auto px-6 pt-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Search 👤 Leads
          </h1>
          <p className="text-gray-500 text-sm">
            Find and enrich leads from our database of 700M+ profiles.
          </p>
        </div>

        {/* Quickstart */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Quickstart</h2>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Upload className="w-4 h-4" />
              Import leads
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Templates */}
        <div>
          <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-3">Templates</h2>
          <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
            {templates.map((template) => (
              <button
                key={template.name}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm text-gray-900">{template.name}</span>
                <span className="text-sm text-gray-400">{template.filters} Filters</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}