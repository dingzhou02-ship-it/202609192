import React from 'react';
import { HelpCircle, Settings, FileCode2 } from 'lucide-react';

interface ProfileDropdownProps {
  isOpen: boolean;
  onNavigate: (route: string) => void;
  onClose: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ isOpen, onNavigate, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="profile-dropdown-menu"
      className="absolute top-[calc(100%+8px)] right-0 w-[200px] bg-white rounded-2xl shadow-xl shadow-blue-900/10 border border-blue-100/90 py-2 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
      onMouseLeave={onClose}
    >
      <div className="flex flex-col gap-1">
        <button
          id="profile-dropdown-guide"
          onClick={() => {
            onNavigate('/microapp-guide');
            onClose();
          }}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left transition-all duration-150 group hover:bg-[#F0F7FF] cursor-pointer"
        >
          <FileCode2 className="w-4 h-4 text-indigo-500 group-hover:text-indigo-600 transition-colors" strokeWidth={2} />
          <span className="text-[14px] font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
            微应用接入指南
          </span>
        </button>

        <button
          id="profile-dropdown-help"
          onClick={() => {
            onNavigate('/help');
            onClose();
          }}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left transition-all duration-150 group hover:bg-[#F0F7FF] cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 text-blue-500 group-hover:text-blue-600 transition-colors" strokeWidth={2} />
          <span className="text-[14px] font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
            帮助中心
          </span>
        </button>

        <button
          id="profile-dropdown-settings"
          onClick={() => {
            onNavigate('/settings');
            onClose();
          }}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left transition-all duration-150 group hover:bg-[#F0F7FF] cursor-pointer"
        >
          <Settings className="w-4 h-4 text-blue-500 group-hover:text-blue-600 transition-colors" strokeWidth={2} />
          <span className="text-[14px] font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
            设置
          </span>
        </button>
      </div>
    </div>
  );
};

