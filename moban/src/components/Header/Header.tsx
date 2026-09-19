import React, { useState, useRef, useEffect } from 'react';
import { Home, LayoutGrid, Bell, MessageSquare, User, ChevronDown, Menu, X, FileCode2 } from 'lucide-react';
import { Logo } from './Logo';
import { AppDropdown } from './AppDropdown';
import { ProfileDropdown } from './ProfileDropdown';
import { MICRO_APP_REGISTRY } from '../../data/microApps';

interface HeaderProps {
  currentPath: string;
  onNavigate: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [isAppDropdownOpen, setIsAppDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const appDropdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const profileDropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (appDropdownTimerRef.current) clearTimeout(appDropdownTimerRef.current);
      if (profileDropdownTimerRef.current) clearTimeout(profileDropdownTimerRef.current);
    };
  }, []);

  const handleAppMouseEnter = () => {
    if (appDropdownTimerRef.current) clearTimeout(appDropdownTimerRef.current);
    setIsAppDropdownOpen(true);
    setIsProfileDropdownOpen(false);
  };

  const handleAppMouseLeave = () => {
    appDropdownTimerRef.current = setTimeout(() => {
      setIsAppDropdownOpen(false);
    }, 180);
  };

  const handleProfileMouseEnter = () => {
    if (profileDropdownTimerRef.current) clearTimeout(profileDropdownTimerRef.current);
    setIsProfileDropdownOpen(true);
    setIsAppDropdownOpen(false);
  };

  const handleProfileMouseLeave = () => {
    profileDropdownTimerRef.current = setTimeout(() => {
      setIsProfileDropdownOpen(false);
    }, 180);
  };

  const isHome = currentPath === '/';

  return (
    <header
      id="platform-header"
      className="sticky top-0 z-50 h-[92px] w-full bg-white/85 backdrop-blur-xl border-b border-white/60 shadow-xs transition-all duration-200"
    >
      <div className="w-full max-w-[1720px] mx-auto h-full px-6 lg:px-12 flex items-center justify-between">
        {/* Left: Platform Logo & Name */}
        <Logo onClick={() => onNavigate('/')} />

        {/* Right: Desktop Navigation Items */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-2 lg:gap-4 h-full">
          {/* 1. 首页 (Home) - Active State */}
          <div className="relative h-full flex flex-col justify-center">
            <button
              id="nav-home"
              onClick={() => onNavigate('/')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[15.5px] font-semibold transition-colors cursor-pointer ${
                isHome
                  ? 'text-[#1677FF]'
                  : 'text-slate-600 hover:text-[#1677FF] hover:bg-blue-50/50'
              }`}
            >
              <Home className="w-[18px] h-[18px] text-[#1677FF]" strokeWidth={2.4} />
              <span>首页</span>
            </button>
            {/* Active Indicator Bar matching reference image */}
            {isHome && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-9 h-[3.5px] bg-[#1677FF] rounded-full" />
            )}
          </div>

          {/* 2. 应用中心 (Application Center) with Dropdown */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={handleAppMouseEnter}
            onMouseLeave={handleAppMouseLeave}
          >
            <button
              id="nav-apps-dropdown-trigger"
              onClick={() => setIsAppDropdownOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[15.5px] font-semibold transition-all cursor-pointer ${
                isAppDropdownOpen
                  ? 'bg-[#E6F4FF] text-[#1677FF] shadow-xs'
                  : 'text-slate-700 hover:text-[#1677FF] hover:bg-blue-50/60'
              }`}
            >
              <LayoutGrid className="w-[18px] h-[18px] text-[#1677FF]" strokeWidth={2.2} />
              <span>应用中心</span>
              <ChevronDown
                className={`w-4 h-4 text-[#1677FF] transition-transform duration-200 ${
                  isAppDropdownOpen ? 'rotate-180' : ''
                }`}
                strokeWidth={2.2}
              />
            </button>

            {/* Dropdown Menu */}
            <AppDropdown
              isOpen={isAppDropdownOpen}
              onSelectApp={(route) => {
                onNavigate(route);
                setIsAppDropdownOpen(false);
              }}
              onClose={() => setIsAppDropdownOpen(false)}
            />
          </div>

          {/* 3. 消息中心 (Message Center) */}
          <button
            id="nav-messages"
            onClick={() => onNavigate('/messages')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[15.5px] font-semibold transition-colors cursor-pointer ${
              currentPath === '/messages'
                ? 'text-[#1677FF] bg-[#E6F4FF]'
                : 'text-slate-700 hover:text-[#1677FF] hover:bg-blue-50/60'
            }`}
          >
            <Bell className="w-[18px] h-[18px] text-[#1677FF]" strokeWidth={2.2} />
            <span>消息中心</span>
          </button>

          {/* 4. 反馈中心 (Feedback Center) */}
          <button
            id="nav-feedback"
            onClick={() => onNavigate('/feedback')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[15.5px] font-semibold transition-colors cursor-pointer ${
              currentPath === '/feedback'
                ? 'text-[#1677FF] bg-[#E6F4FF]'
                : 'text-slate-700 hover:text-[#1677FF] hover:bg-blue-50/60'
            }`}
          >
            <MessageSquare className="w-[18px] h-[18px] text-[#1677FF]" strokeWidth={2.2} />
            <span>反馈中心</span>
          </button>

          {/* 5. 个人 (Profile) with Dropdown */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={handleProfileMouseEnter}
            onMouseLeave={handleProfileMouseLeave}
          >
            <button
              id="nav-profile-dropdown-trigger"
              onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[15.5px] font-semibold transition-all cursor-pointer ${
                isProfileDropdownOpen
                  ? 'bg-[#E6F4FF] text-[#1677FF] shadow-xs'
                  : 'text-slate-700 hover:text-[#1677FF] hover:bg-blue-50/60'
              }`}
            >
              <User className="w-[18px] h-[18px] text-[#1677FF]" strokeWidth={2.2} />
              <span>个人</span>
              <ChevronDown
                className={`w-4 h-4 text-[#1677FF] transition-transform duration-200 ${
                  isProfileDropdownOpen ? 'rotate-180' : ''
                }`}
                strokeWidth={2.2}
              />
            </button>

            {/* Profile Dropdown */}
            <ProfileDropdown
              isOpen={isProfileDropdownOpen}
              onNavigate={(route) => {
                onNavigate(route);
                setIsProfileDropdownOpen(false);
              }}
              onClose={() => setIsProfileDropdownOpen(false)}
            />
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="p-2.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden fixed top-[92px] left-0 w-full bg-white/98 backdrop-blur-md border-b border-blue-100 shadow-2xl py-4 px-6 z-40 max-h-[calc(100vh-92px)] overflow-y-auto"
        >
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigate('/');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium text-blue-600 bg-blue-50/70"
            >
              <Home className="w-5 h-5 text-blue-600" />
              <span>首页</span>
            </button>

            {/* Mobile App Center list */}
            <div className="border-t border-slate-100 pt-2">
              <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                7大微应用中心
              </div>
              <div className="grid grid-cols-1 gap-1 pl-2">
                {MICRO_APP_REGISTRY.map((manifest) => (
                  <button
                    key={manifest.appId}
                    onClick={() => {
                      onNavigate(manifest.routePrefix);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-slate-700 hover:bg-blue-50/60"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: manifest.color || '#1677FF' }} />
                      <span className="text-sm font-medium">{manifest.displayName}</span>
                    </div>
                    {manifest.integrationType === 'iframe' && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 font-mono">
                        iframe
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-2 flex flex-col gap-1">
              <button
                onClick={() => {
                  onNavigate('/messages');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left text-slate-700 hover:bg-blue-50"
              >
                <Bell className="w-5 h-5 text-blue-600" />
                <span>消息中心</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('/feedback');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left text-slate-700 hover:bg-blue-50"
              >
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span>反馈中心</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('/help');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left text-slate-700 hover:bg-blue-50"
              >
                <User className="w-5 h-5 text-blue-600" />
                <span>帮助中心 & 设置</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
