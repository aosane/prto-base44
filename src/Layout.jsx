import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from './utils';
import { 
  Home, 
  Users, 
  Building2, 
  UserPlus, 
  Zap,
  Bell,
  Menu,
  X
} from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const navItems = [
    { name: 'Dashboard', icon: Home, path: createPageUrl('Dashboard') },
    { name: 'Companies', icon: Building2, path: createPageUrl('Companies'), isDefault: true },
    { name: 'Leads', icon: UserPlus, path: createPageUrl('Search') },
    { name: 'Alerts', icon: Bell, path: createPageUrl('Alerts') }
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname === path + '/';
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300`}>
        {/* Logo */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-gray-200">
          {isSidebarOpen ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#1C64F2] rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
                <span className="font-semibold text-gray-900">Pronto</span>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-1 hover:bg-gray-100 rounded mx-auto"
            >
              <Menu className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    active
                      ? 'bg-gray-100 text-gray-900 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {isSidebarOpen && <span>{item.name}</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        {isSidebarOpen && (
          <div className="p-4 border-t border-gray-200 space-y-3">
            {/* Monthly Limit */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">Monthly Limit</span>
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                  <span className="text-gray-700">Leads</span>
                  <span className="ml-auto font-medium text-gray-900">5082 / 50000</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                  <span className="text-gray-700">Companies</span>
                  <span className="ml-auto font-medium text-gray-900">0 / 999999</span>
                </div>
              </div>
              <button className="w-full mt-3 px-3 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-orange-500 hover:to-orange-600 transition-all">
                Subscribe to a plan
              </button>
            </div>

            {/* Credits */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">Emails & Phones</span>
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex items-center gap-2 text-sm mb-3">
                <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
                <span className="text-gray-700">Credits</span>
                <span className="ml-auto font-medium text-gray-900">878</span>
              </div>
              <button className="w-full px-3 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-orange-500 hover:to-orange-600 transition-all flex items-center justify-center gap-2">
                <span>+</span>
                <span>Add credits</span>
              </button>
            </div>

            {/* User */}
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">T</span>
                </div>
                <span className="text-gray-700 truncate">thiane@prontoiq.com</span>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}