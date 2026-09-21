import React, { useState } from 'react';
import heroBgImage from '../../assets/hero-bg.jpg';
import { DigitalEarth } from './DigitalEarth';
import { GeoNodePreviewDrawer } from './GeoNodePreviewDrawer';
import { GEO_NODES_DATA } from '../../data/geoNodes';

interface HeroProps {
  onNavigate: (route: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const selectedNodeData = selectedNodeId ? GEO_NODES_DATA[selectedNodeId] : null;

  return (
    <section
      id="hero-section"
      className="relative w-full h-[520px] lg:h-[540px] overflow-hidden select-none bg-cover bg-center"
      style={{
        // High quality landscape backdrop using the provided image
        backgroundImage: `linear-gradient(to right, rgba(10, 37, 64, 0.42) 0%, rgba(10, 37, 64, 0.18) 50%, rgba(6, 182, 212, 0.04) 100%), url(${heroBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 35%'
      }}
    >
      {/* 1. Atmospheric Overlays & Color Gradients matching China GeoAI landscape & smart city lighting */}
      {/* Left text readability scrim & depth */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[58%] bg-gradient-to-r from-slate-950/65 via-slate-900/40 to-transparent pointer-events-none" />

      {/* Sky subtle gradient at top */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400/10 via-transparent to-blue-950/30 pointer-events-none" />

      {/* Tech Cyan & Electric Blue Volumetric Glow on right side behind the Digital Earth and Smart City */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[760px] h-[520px] bg-gradient-to-l from-cyan-400/30 via-blue-600/20 to-transparent blur-3xl pointer-events-none" />

      {/* Subtle digital coordinate grid texture on bottom/right */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#00e5ff 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />

      {/* 2. Main Content Container */}
      <div className="relative z-20 w-full max-w-[1720px] h-full mx-auto px-6 lg:px-14 flex items-center justify-between">
        {/* Left Side: Typography & Slogans (~50% width) - Shifted 1cm (38px) to the right */}
        <div className="w-full lg:w-[50%] flex flex-col justify-center text-white py-4 transform sm:translate-x-5 lg:translate-x-[38px] transition-transform duration-300">
          {/* Main Headline */}
          <div className="space-y-2.5">
            {/* First Line: [AI] 赋能地理教育， */}
            <div className="flex items-baseline flex-wrap text-4xl sm:text-5xl lg:text-[58px] font-normal tracking-wide leading-tight">
              {/* Standalone "AI" with Multilayered Luminous Blue Soft Glow */}
              <span className="relative inline-flex items-center mr-3.5 select-none group">
                {/* Ambient Soft Blue Radial Glow Backdrop */}
                <span
                  className="absolute -inset-3 bg-gradient-to-r from-cyan-400/40 via-sky-400/35 to-blue-500/20 blur-xl rounded-full pointer-events-none -z-10"
                  aria-hidden="true"
                />
                <span
                  className="font-tech font-black text-white italic tracking-tight relative z-10"
                  style={{
                    textShadow:
                      '0 0 12px rgba(56, 189, 248, 1), 0 0 24px rgba(14, 165, 233, 0.9), 0 0 40px rgba(2, 132, 199, 0.75), 0 0 64px rgba(56, 189, 248, 0.45)'
                  }}
                >
                  AI
                </span>
              </span>

              {/* Calligraphy Handwriting Text: 赋能地理教育， */}
              <span
                className="font-calligraphy text-white tracking-wider select-none transform -rotate-[0.5deg] inline-block"
                style={{
                  textShadow: '0 0 20px rgba(56, 189, 248, 0.6), 0 2px 14px rgba(10, 40, 95, 0.55)'
                }}
              >
                赋能地理教育，
              </span>
            </div>

            {/* Second Line: 智创未来课堂 */}
            <div
              className="font-calligraphy text-4xl sm:text-5xl lg:text-[64px] font-normal text-white tracking-[0.14em] leading-tight select-none transform -rotate-[0.5deg] origin-left"
              style={{
                textShadow: '0 0 24px rgba(56, 189, 248, 0.65), 0 2px 16px rgba(10, 40, 95, 0.6)'
              }}
            >
              智创未来课堂
            </div>
          </div>

          {/* Calligraphic Slender Decorative Curved Arc Underline */}
          <div className="my-5 w-full max-w-[480px]">
            <svg viewBox="0 0 460 20" className="w-full h-5" fill="none">
              <path
                d="M4 12 C 120 2, 260 4, 380 10 C 420 12, 450 14, 456 12"
                stroke="url(#curveUnderlineGrad)"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="curveUnderlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  <stop offset="60%" stopColor="#67E8F9" stopOpacity="0.85" />
                  <stop offset="90%" stopColor="#38BDF8" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Subtitles: Modern Clean Sans-Serif with Strict Typographic Hierarchy */}
          <div className="space-y-2 font-sans-modern drop-shadow-[0_2px_8px_rgba(0,30,80,0.45)]">
            {/* Subtitle Line 1: 中学地理 “备、教、学、评、研” */}
            <div className="text-xl sm:text-2xl lg:text-[25px] font-medium text-white leading-relaxed tracking-[0.15em] flex items-center flex-wrap gap-2">
              <span className="text-white/95">中学地理</span>
              <span className="font-semibold text-cyan-200 tracking-[0.24em]">
                “备、教、学、评、研”
              </span>
            </div>

            {/* Subtitle Line 2: 一站式 AI 聚合门户 */}
            <div className="text-base sm:text-lg lg:text-[20px] font-light text-cyan-100/90 tracking-[0.22em] uppercase">
              一站式 <span className="font-medium text-white">AI</span> 聚合门户
            </div>
          </div>
        </div>

        {/* Right Side: AI Digital Earth Visual Centerpiece (~50% width) */}
        <div className="hidden md:flex w-full lg:w-[50%] h-full items-center justify-end">
          <DigitalEarth
            onNodeClick={onNavigate}
            onSelectNode={(nodeId) => setSelectedNodeId(nodeId)}
            activeNodeId={selectedNodeId}
          />
        </div>
      </div>

      {/* Lightweight Side Preview Drawer for Geographic Data Nodes */}
      <GeoNodePreviewDrawer
        node={selectedNodeData}
        isOpen={Boolean(selectedNodeId && selectedNodeData)}
        onClose={() => setSelectedNodeId(null)}
        onNavigate={onNavigate}
      />
    </section>
  );
};

