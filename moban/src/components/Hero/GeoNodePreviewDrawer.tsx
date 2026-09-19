import React, { useState } from 'react';
import {
  X,
  MapPin,
  ExternalLink,
  Layers,
  Database,
  CheckCircle2,
  BookmarkPlus,
  Compass,
  Sparkles,
  ArrowRight,
  Check
} from 'lucide-react';
import { GeoNodeData } from '../../data/geoNodes';

interface GeoNodePreviewDrawerProps {
  node: GeoNodeData | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const GeoNodePreviewDrawer: React.FC<GeoNodePreviewDrawerProps> = ({
  node,
  isOpen,
  onClose,
  onNavigate
}) => {
  const [copiedToLesson, setCopiedToLesson] = useState(false);

  if (!node) return null;

  const handleAddToLesson = () => {
    setCopiedToLesson(true);
    setTimeout(() => {
      setCopiedToLesson(false);
    }, 2200);
  };

  return (
    <>
      {/* Backdrop for mobile & focus (semi-transparent blur) */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-slate-950/30 backdrop-blur-xs z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide-out Drawer Panel */}
      <aside
        id="geo-node-preview-drawer"
        className={`absolute top-0 right-0 bottom-0 w-full sm:w-[440px] bg-white/95 backdrop-blur-md z-50 shadow-2xl border-l border-blue-200/80 flex flex-col justify-between transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 relative bg-gradient-to-b from-blue-50/70 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-bold px-2.5 py-0.5 rounded-full text-white shadow-xs"
                style={{ backgroundColor: node.categoryColor }}
              >
                {node.category}
              </span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                {node.coordinates}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="关闭预览"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-2.5 tracking-tight leading-snug">
            {node.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {node.subtitle} · <span className="text-blue-600 font-medium">{node.region}</span>
          </p>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-slate-700 select-text">
          {/* 1. Key Metrics 3-Col Bento Box */}
          <div className="grid grid-cols-3 gap-2.5">
            {node.keyMetrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-blue-50/50 border border-blue-100/80 flex flex-col justify-between text-center"
              >
                <div className="text-[11px] text-slate-400 font-medium truncate">
                  {metric.label}
                </div>
                <div className="mt-1 font-mono font-bold text-slate-900 text-base sm:text-lg flex items-baseline justify-center gap-0.5">
                  <span>{metric.value}</span>
                  {metric.unit && (
                    <span className="text-[10px] font-normal text-slate-500">
                      {metric.unit}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 2. Educational / Spatial Narrative Description */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 text-xs sm:text-[13px] leading-relaxed text-slate-600">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-500" />
              <span>空间地理与教研情境解析</span>
            </div>
            <p className="mt-1">{node.description}</p>
          </div>

          {/* 3. High School Curriculum Alignment Tags */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>新课标章节考点对齐</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {node.curriculumTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/60 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 4. Core Geography Competencies */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>核心素养导向培育维度</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {node.competencies.map((comp, idx) => (
                <span
                  key={idx}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200/70 font-semibold flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-amber-500" />
                  {comp}
                </span>
              ))}
            </div>
          </div>

          {/* 5. Dataset / Telemetry Specs */}
          <div className="p-3.5 rounded-xl border border-slate-200/70 bg-white space-y-2 text-[11px]">
            <div className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
              <Database className="w-3.5 h-3.5 text-blue-600" />
              <span>地理数据图层规格参数</span>
            </div>
            <div className="grid grid-cols-2 gap-y-1.5 text-slate-500 pt-1">
              <div>采样分辨率: <span className="text-slate-800 font-medium">{node.datasetStats.resolution}</span></div>
              <div>更新频率: <span className="text-slate-800 font-medium">{node.datasetStats.updateFrequency}</span></div>
              <div className="col-span-2">图谱实体量: <span className="text-slate-800 font-medium">{node.datasetStats.entitiesCount}</span></div>
            </div>
          </div>
        </div>

        {/* Drawer Bottom Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-white flex items-center gap-3">
          <button
            onClick={handleAddToLesson}
            className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              copiedToLesson
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 text-slate-700'
            }`}
          >
            {copiedToLesson ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>已调取至备课夹</span>
              </>
            ) : (
              <>
                <BookmarkPlus className="w-4 h-4 text-blue-600" />
                <span>调取至备课夹</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              onClose();
              onNavigate(node.recommendedRoute);
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            <span>{node.routeLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
    </>
  );
};
