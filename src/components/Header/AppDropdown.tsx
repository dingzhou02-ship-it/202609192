import React from 'react';
import {
  BookOpen,
  Wrench,
  FileText,
  MessageSquareMore,
  FileCheck,
  TrendingUp,
  FlaskConical,
  LucideIcon
} from 'lucide-react';
import { MICRO_APP_REGISTRY } from '../../data/microApps';

interface AppDropdownProps {
  isOpen: boolean;
  onSelectApp: (route: string) => void;
  onClose: () => void;
}

const ICON_COMPONENTS: Record<string, LucideIcon> = {
  BookOpen,
  Wrench,
  FileText,
  MessageSquareMore,
  FileCheck,
  TrendingUp,
  FlaskConical
};

export const AppDropdown: React.FC<AppDropdownProps> = ({ isOpen, onSelectApp, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="app-center-dropdown"
      className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[280px] bg-white rounded-2xl shadow-xl shadow-blue-900/10 border border-blue-100/90 py-2.5 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
      onMouseLeave={onClose}
    >
      <div className="flex flex-col gap-1">
        {MICRO_APP_REGISTRY.map((manifest) => {
          const Icon = (manifest.iconName && ICON_COMPONENTS[manifest.iconName]) || BookOpen;
          return (
            <button
              key={manifest.appId}
              id={`dropdown-app-${manifest.appId}`}
              onClick={() => {
                onSelectApp(manifest.routePrefix);
                onClose();
              }}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left transition-all duration-150 group hover:bg-[#F0F7FF] cursor-pointer"
            >
              {/* Colored Square Icon Badge */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white shadow-xs transition-transform duration-200 group-hover:scale-105"
                style={{ backgroundColor: manifest.color || '#1677FF' }}
              >
                <Icon className="w-4 h-4 text-white" strokeWidth={2.2} />
              </div>

              {/* App Name & Type Badge */}
              <div className="flex-1 min-w-0 flex items-center justify-between gap-1">
                <span className="text-[14.5px] font-medium text-slate-700 group-hover:text-blue-600 transition-colors block truncate">
                  {manifest.displayName}
                </span>
                {manifest.integrationType === 'iframe' && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-600 border border-indigo-200 font-mono">
                    iframe
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

