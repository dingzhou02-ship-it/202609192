import React from 'react';
import {
  BookOpen,
  Wrench,
  FileText,
  MessageSquareMore,
  FileCheck,
  TrendingUp,
  FlaskConical,
  ArrowRight,
  LucideIcon
} from 'lucide-react';
import { ApplicationItem } from '../../data/applications';
import { GeoAIMicroAppManifest } from '../../types/microApp';

interface ApplicationCardProps {
  app: GeoAIMicroAppManifest | ApplicationItem;
  onClick: (route: string) => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  Wrench,
  FileText,
  MessageSquareMore,
  FileCheck,
  TrendingUp,
  FlaskConical
};

export const ApplicationCard: React.FC<ApplicationCardProps> = ({ app, onClick }) => {
  const appId = 'appId' in app ? app.appId : app.id;
  const appName = 'displayName' in app ? app.displayName : app.name;
  const appRoute = 'routePrefix' in app ? app.routePrefix : app.route;
  const description = app.description || ['智能赋能', '高效教学'];
  const color = app.color || '#1677FF';
  const iconName = app.iconName || 'BookOpen';

  const Icon = ICON_MAP[iconName] || BookOpen;

  return (
    <div
      id={`app-card-${appId}`}
      onClick={() => onClick(appRoute)}
      className="group relative bg-white rounded-2xl p-6 flex flex-col items-center text-center border border-blue-100/70 shadow-xs hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer select-none"
    >
      {/* Top: Square Rounded Colorful App Icon Badge */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xs transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundColor: color }}
      >
        <Icon className="w-7 h-7 text-white" strokeWidth={2.2} />
      </div>

      {/* Middle: Application Name */}
      <h3 className="mt-5 text-[16px] lg:text-[17px] font-bold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
        {appName}
      </h3>

      {/* Two-Line Application Description */}
      <div className="mt-2 text-xs lg:text-[13px] text-slate-400 font-normal leading-relaxed min-h-[38px] flex flex-col justify-center">
        <span>{description[0]}</span>
        <span>{description[1]}</span>
      </div>

      {/* Bottom: Circular Arrow Button */}
      <div className="mt-5 flex items-center justify-center">
        <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-500 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all duration-200 group-hover:scale-110 shadow-xs">
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.4} />
        </div>
      </div>
    </div>
  );
};

