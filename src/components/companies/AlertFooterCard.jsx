import React from 'react';
import { Bell, ArrowRight, Crown } from 'lucide-react';

export default function AlertFooterCard() {
  return (
    <div className="mt-6 mx-auto max-w-lg">
      <div className="relative overflow-hidden rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-6 text-center">
        {/* Decorative circles */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-100 rounded-full opacity-50" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-indigo-100 rounded-full opacity-50" />
        
        <div className="relative z-10">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Bell className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            Ne ratez aucune nouvelle entreprise
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Activez les alertes sur cette recherche et recevez un récap quotidien des changements.
          </p>
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
            <Crown className="w-4 h-4" />
            Activer la surveillance
            <span className="text-[10px] font-semibold bg-white/20 px-1.5 py-0.5 rounded-full">PRO</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}