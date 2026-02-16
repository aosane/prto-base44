import React from 'react';
import { Bell, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Alerts() {
  return (
    <div className="h-full overflow-y-auto bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Alerts</h1>
            <p className="text-gray-600 text-sm">Recevez automatiquement les nouvelles entreprises qui correspondent à vos critères.</p>
          </div>
          <Button className="bg-[#1C64F2] hover:bg-[#1854cc] text-white gap-2">
            <Plus className="w-4 h-4" />
            Créer une alerte
          </Button>
        </div>

        <div className="bg-gray-50 rounded-lg border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-900 font-medium mb-2">Aucune alerte configurée</p>
          <p className="text-gray-500 text-sm mb-6">Créez une alerte depuis vos filtres de recherche pour être notifié des nouvelles entreprises.</p>
        </div>
      </div>
    </div>
  );
}