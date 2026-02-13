import React, { useRef } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TooltipPortal from './TooltipPortal';

export default function HiringFilter({ expandedFilters, toggleFilter }) {
  const triggerRef = useRef(null);

  return (
    <div ref={triggerRef}>
      <button
        onClick={() => toggleFilter('Hiring a job')}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md group"
      >
        <span>Hiring a job</span>
        {expandedFilters.includes('Hiring a job') ? 
          <Minus className="w-4 h-4 text-gray-400" /> : 
          <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
        }
      </button>

      {expandedFilters.includes('Hiring a job') && (
        <TooltipPortal triggerRef={triggerRef}>
          <div className="w-80">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-lg">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">i</div>
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">How Company Hiring Work</h4>
                  <div className="space-y-2 text-xs text-blue-800">
                    <div className="flex gap-2">
                      <span className="font-semibold flex-shrink-0">1</span>
                      <div>
                        <div className="font-semibold">Add jobtitles and filters</div>
                        <div className="text-blue-600">EXAMPLE: Growth Manager, Hubspot, 10-50 employees</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-semibold flex-shrink-0">2</span>
                      <div>
                        <div className="font-semibold">Search simultaneously on 20+ job posting platform</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-semibold flex-shrink-0">3</span>
                      <div className="font-semibold">See companies hiring</div>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-semibold flex-shrink-0">4</span>
                      <div>
                        <div className="font-semibold">Import companies</div>
                        <div className="text-blue-600">Review your results and import the companies hiring to use in your outreach campaigns.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TooltipPortal>
      )}

      {expandedFilters.includes('Hiring a job') && (
        <div className="px-3 py-4 border border-gray-200 rounded-lg mx-3 mb-2 space-y-4">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1.5 block">Job titles</label>
              <Input placeholder="e.g., Software Engineer, Product Manager" className="text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1.5 block">Keywords in job description</label>
              <Input placeholder="e.g., Ruby on Rails, React, Leadership" className="text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1.5 block">Job offer locations</label>
              <Input placeholder="e.g., San Francisco, New York, Paris" className="text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1.5 block">Published in</label>
              <Select defaultValue="24h">
                <SelectTrigger className="w-full text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">The last 24 hours</SelectItem>
                  <SelectItem value="3d">The last 3 days</SelectItem>
                  <SelectItem value="7d">The last 7 days</SelectItem>
                  <SelectItem value="30d">The last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Exclude consulting/recruiting</span>
                <div className="w-3 h-3 rounded-full bg-gray-300 flex items-center justify-center cursor-help">
                  <span className="text-white text-xs">?</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Full-time roles only</span>
                <div className="w-3 h-3 rounded-full bg-gray-300 flex items-center justify-center cursor-help">
                  <span className="text-white text-xs">?</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm">Reset</Button>
            <Button size="sm" className="bg-[#1C64F2] hover:bg-[#1854cc]">Apply</Button>
          </div>
        </div>
      )}
    </div>
  );
}