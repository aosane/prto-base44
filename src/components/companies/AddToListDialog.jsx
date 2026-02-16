import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell, Crown, X } from 'lucide-react';

export default function AddToListDialog({ open, onOpenChange }) {
  const [listName, setListName] = useState('Pronto - Google lookalike');
  const [alertEnabled, setAlertEnabled] = useState(false);
  const maxChars = 75;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 [&>button]:hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 className="text-lg font-semibold text-gray-900">Save list to your account</h2>
          <button onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-5">
          {/* List name input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Your list name (max {maxChars} characters)</label>
              <span className="text-sm text-gray-400">{listName.length}/{maxChars}</span>
            </div>
            <Input
              value={listName}
              onChange={(e) => {
                if (e.target.value.length <= maxChars) setListName(e.target.value);
              }}
              placeholder="Enter a list name..."
              className="h-10"
            />
          </div>

          {/* Alert upsell */}
          <div className={`flex items-start gap-3 p-3.5 rounded-lg transition-colors ${alertEnabled ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50 border border-gray-200'}`}>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <Bell className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-gray-900">Surveiller cette recherche</span>
                <span className="text-[10px] font-semibold bg-amber-600 text-white px-1.5 py-0.5 rounded-full">PRO</span>
              </div>
              <p className="text-xs text-gray-500">
                Recevez une notification quand de nouvelles entreprises correspondent à ces filtres.
              </p>
            </div>
            <Switch
              checked={alertEnabled}
              onCheckedChange={setAlertEnabled}
            />
          </div>

          {/* Save button */}
          <div className="flex justify-center pt-1">
            <Button 
              className="bg-[#1C64F2] hover:bg-[#1854cc] px-6"
              disabled={!listName.trim()}
            >
              {alertEnabled ? 'Save & activate alerts' : 'Save list to your account'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}