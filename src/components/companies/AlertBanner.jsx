import React from 'react';
import { Bell, Crown } from 'lucide-react';

export default function AlertBanner() {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
          <Bell className="w-4 h-4 text-amber-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">
            Surveiller cette recherche
          </p>
          <p className="text-xs text-gray-500">
            Recevez un email quand de nouvelles entreprises correspondent à vos filtres
          </p>
        </div>
      </div>
      <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-amber-700 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors">
        <Crown className="w-3.5 h-3.5" />
        <span>Activer</span>
        <span className="text-[10px] font-semibold bg-amber-600 text-white px-1.5 py-0.5 rounded-full ml-1">PRO</span>
      </button>
    </div>
  );
}