import React from 'react';
import { MICRO_APP_REGISTRY } from '../../data/microApps';
import { ApplicationCard } from '../ApplicationCard/ApplicationCard';

interface ApplicationCenterProps {
  onNavigate: (route: string) => void;
}

export const ApplicationCenter: React.FC<ApplicationCenterProps> = ({ onNavigate }) => {
  return (
    <section id="application-center-section" className="w-full bg-[#F4F8FC]/80 backdrop-blur-md py-8 lg:py-10 px-6 lg:px-12 transition-all">
      <div className="w-full max-w-[1720px] mx-auto">
        {/* Section Header with Blue Vertical Indicator Bar */}
        <div className="flex items-center mb-6 pl-1">
          {/* Blue Vertical Bar */}
          <span className="w-1.5 h-6 bg-[#1677FF] rounded-full mr-3 inline-block" />

          {/* Section Title */}
          <h2 className="text-xl lg:text-[22px] font-bold text-slate-800 tracking-tight">
            应用中心
          </h2>

          {/* Subtitle / System Tagline */}
          <span className="text-xs sm:text-sm text-slate-500 font-normal ml-3 lg:ml-4">
            7大微应用，构建地理教育全流程AI赋能体系
          </span>
        </div>

        {/* 7 Columns Micro-App Cards Grid (Automatically derived from MICRO_APP_REGISTRY) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 lg:gap-5">
          {MICRO_APP_REGISTRY.map((manifest) => (
            <ApplicationCard
              key={manifest.appId}
              app={manifest}
              onClick={(route) => onNavigate(route)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

