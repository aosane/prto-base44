import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FolderPlus, Bell, Crown, Plus } from 'lucide-react';

const existingLists = [
  { id: 1, name: 'SaaS France', count: 234 },
  { id: 2, name: 'Fintech Europe', count: 89 },
  { id: 3, name: 'Prospects Q1', count: 156 },
];

export default function AddToListDialog({ open, onOpenChange }) {
  const [selectedList, setSelectedList] = useState(null);
  const [newListName, setNewListName] = useState('');
  const [showNewList, setShowNewList] = useState(false);
  const [alertEnabled, setAlertEnabled] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderPlus className="w-5 h-5 text-gray-600" />
            Ajouter à une liste
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Existing lists */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Listes existantes</p>
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {existingLists.map((list) => (
                <button
                  key={list.id}
                  onClick={() => { setSelectedList(list.id); setShowNewList(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    selectedList === list.id 
                      ? 'bg-[#1C64F2]/10 border border-[#1C64F2]/30 text-[#1C64F2]' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-transparent'
                  }`}
                >
                  <span className="font-medium">{list.name}</span>
                  <span className="text-xs text-gray-400">{list.count} entreprises</span>
                </button>
              ))}
            </div>
          </div>

          {/* Create new list */}
          {!showNewList ? (
            <button
              onClick={() => { setShowNewList(true); setSelectedList(null); }}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-[#1C64F2] hover:bg-[#1C64F2]/5 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Créer une nouvelle liste
            </button>
          ) : (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Nouvelle liste</p>
              <Input
                placeholder="Nom de la liste..."
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                autoFocus
              />
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Alert upsell */}
          <div className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${alertEnabled ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50 border border-gray-200'}`}>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
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

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button 
              className="bg-[#1C64F2] hover:bg-[#1854cc]"
              disabled={!selectedList && !newListName.trim()}
            >
              {alertEnabled ? 'Sauvegarder & Surveiller' : 'Sauvegarder'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}