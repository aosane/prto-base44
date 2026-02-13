import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Check } from 'lucide-react';

export default function IncludeExcludeFilter({ isOpen, onClose, title, placeholder }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [included, setIncluded] = useState([]);
  const [excluded, setExcluded] = useState([]);

  const mockSuggestions = [
    { name: 'Apple', domain: 'apple.com' },
    { name: 'Google', domain: 'google.com' },
    { name: 'Microsoft', domain: 'microsoft.com' },
    { name: 'Amazon', domain: 'amazon.com' },
    { name: 'Meta', domain: 'meta.com' },
  ];

  const filteredSuggestions = mockSuggestions.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleInclude = (item) => {
    if (included.find(i => i.name === item.name)) {
      setIncluded(included.filter(i => i.name !== item.name));
    } else {
      setIncluded([...included, item]);
      setExcluded(excluded.filter(i => i.name !== item.name));
    }
  };

  const toggleExclude = (item) => {
    if (excluded.find(i => i.name === item.name)) {
      setExcluded(excluded.filter(i => i.name !== item.name));
    } else {
      setExcluded([...excluded, item]);
      setIncluded(included.filter(i => i.name !== item.name));
    }
  };

  const removeIncluded = (item) => {
    setIncluded(included.filter(i => i.name !== item.name));
  };

  const removeExcluded = (item) => {
    setExcluded(excluded.filter(i => i.name !== item.name));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Selected Items */}
          {(included.length > 0 || excluded.length > 0) && (
            <div className="flex flex-wrap gap-2">
              {included.map((item) => (
                <div key={item.name} className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm">
                  <Check className="w-3 h-3" />
                  <span>{item.name}</span>
                  <button onClick={() => removeIncluded(item)} className="hover:text-blue-900">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {excluded.map((item) => (
                <div key={item.name} className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm">
                  <div className="w-3 h-3 rounded-full border-2 border-red-500 flex items-center justify-center">
                    <div className="w-2 h-0.5 bg-red-500"></div>
                  </div>
                  <span>{item.name}</span>
                  <button onClick={() => removeExcluded(item)} className="hover:text-red-900">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder={placeholder || "Search..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Results */}
          <div className="border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
            {filteredSuggestions.map((item) => {
              const isIncluded = included.find(i => i.name === item.name);
              const isExcluded = excluded.find(i => i.name === item.name);
              
              return (
                <div key={item.name} className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    {item.domain && <div className="text-sm text-gray-500">{item.domain}</div>}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleInclude(item)}
                      className={`w-8 h-8 rounded flex items-center justify-center ${
                        isIncluded ? 'bg-blue-100' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <Check className={`w-4 h-4 ${isIncluded ? 'text-blue-600' : 'text-gray-400'}`} />
                    </button>
                    <button
                      onClick={() => toggleExclude(item)}
                      className={`w-8 h-8 rounded flex items-center justify-center ${
                        isExcluded ? 'bg-red-100' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        isExcluded ? 'border-red-500' : 'border-gray-400'
                      }`}>
                        <div className={`w-2.5 h-0.5 ${isExcluded ? 'bg-red-500' : 'bg-gray-400'}`}></div>
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} className="bg-[#2D55EB] hover:bg-[#2442c7]">Apply</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}