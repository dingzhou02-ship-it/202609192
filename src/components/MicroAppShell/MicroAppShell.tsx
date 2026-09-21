import React, { useState } from 'react';
import {
  BookOpen,
  Wrench,
  FileText,
  MessageSquareMore,
  FileCheck,
  TrendingUp,
  FlaskConical,
  ArrowLeft,
  Layers,
  Code2,
  Sparkles,
  CheckCircle2,
  LucideIcon
} from 'lucide-react';
import { ApplicationItem, APPLICATIONS } from '../../data/applications';

const ICON_COMPONENTS: Record<ApplicationItem['iconName'], LucideIcon> = {
  BookOpen,
  Wrench,
  FileText,
  MessageSquareMore,
  FileCheck,
  TrendingUp,
  FlaskConical
};

interface MicroAppShellProps {
  app: ApplicationItem;
  onNavigate: (route: string) => void;
  children?: React.ReactNode;
}

export const MicroAppShell: React.FC<MicroAppShellProps> = ({ app, onNavigate, children }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'specs' | 'features'>('preview');
  const Icon = ICON_COMPONENTS[app.iconName];

  return (
    <div className="min-h-[calc(100vh-92px)] bg-[#F4F8FC] py-8 px-6 lg:px-12">
      <div className="w-full max-w-[1520px] mx-auto space-y-6">
        {/* Breadcrumbs & Back Navigation */}
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-blue-600 font-medium transition-colors cursor-pointer"
            >
              首页
            </button>
            <span>/</span>
            <span className="text-slate-400">应用中心</span>
            <span>/</span>
            <span className="text-slate-800 font-semibold">{app.name}</span>
          </nav>

          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/80 text-sm font-medium text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回平台首页</span>
          </button>
        </div>

        {/* Micro-App Header Banner */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 border border-blue-100/70 shadow-xs relative overflow-hidden">
          {/* Subtle decorative background gradient */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none opacity-20"
            style={{ backgroundColor: app.color }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* App Large Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-md flex-shrink-0"
                style={{ backgroundColor: app.color }}
              >
                <Icon className="w-8 h-8 text-white" strokeWidth={2.2} />
              </div>

              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">
                    {app.name}
                  </h1>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                    {app.englishName}
                  </span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    功能开发中
                  </span>
                </div>

                <p className="text-slate-500 text-sm lg:text-base mt-2 max-w-3xl leading-relaxed">
                  {app.detailDescription}
                </p>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 font-medium">
                微应用标识: #{app.id}
              </span>
              <span className="text-xs px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600 font-medium border border-blue-200">
                独立微应用接入模式
              </span>
            </div>
          </div>

          {/* Core Feature Tags */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap gap-2">
            <span className="text-xs font-medium text-slate-400 self-center mr-2">
              核心支撑能力:
            </span>
            {app.keyFeatures.map((feat, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 rounded-lg bg-slate-50 text-slate-600 border border-slate-200/60 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-3 border-b border-slate-200/80 pb-1">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-t-xl transition-all cursor-pointer ${
              activeTab === 'preview'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>微应用交互工作台</span>
          </button>

          <button
            onClick={() => setActiveTab('specs')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-t-xl transition-all cursor-pointer ${
              activeTab === 'specs'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>子小组接入标准与规范</span>
          </button>

          <button
            onClick={() => setActiveTab('features')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-t-xl transition-all cursor-pointer ${
              activeTab === 'features'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>全平台 7 大微应用快速切换</span>
          </button>
        </div>

        {/* Content Body */}
        {activeTab === 'preview' && (
          <div className="bg-white rounded-3xl p-6 lg:p-8 border border-blue-100/70 shadow-xs min-h-[420px]">
            {children}
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="bg-white rounded-3xl p-6 lg:p-8 border border-blue-100/70 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-blue-600" />
              <span>微应用独立开发接入指南 (面向开发小组)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#F8FBFF] border border-blue-100">
                <div className="text-sm font-bold text-blue-600">1. 路由与命名空间规范</div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  本微应用在平台壳中的挂载路由统一为 <code className="bg-blue-50 px-1 py-0.5 rounded text-blue-600">{app.route}</code>，所有子页面及内部模块建议在同名作用域内分发。
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FBFF] border border-blue-100">
                <div className="text-sm font-bold text-blue-600">2. 样式隔离与规范</div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  必须遵守主视觉系统规范：科技蓝主调、深蓝字号、微圆角卡片、平滑动效（200ms-500ms），严禁引起全站全局 CSS 污染。
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FBFF] border border-blue-100">
                <div className="text-sm font-bold text-blue-600">3. 统一用户凭证接入</div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  微应用共享平台导航栏 Header 的全局用户登录态，可直接调用平台级 API 通道进行地理学科模型推理与数据共享。
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto">
              <div className="text-slate-400 mb-2">// 微应用挂载接口定义 (GeoAIMicroAppManifest)</div>
              <pre>{`export interface GeoAIMicroAppManifest {
  appId: "${app.id}";
  displayName: "${app.name}";
  version: "1.0.0";
  routePrefix: "${app.route}";
  integrationType: "component" | "iframe";
  entryComponent?: React.ComponentType;
  entryUrl?: "${app.entryUrl || 'https://' + app.id + '.geoai.nnu.edu.cn'}";
  authRequired: boolean;
  capabilities: [
    ${app.keyFeatures.map(f => `"${f}"`).join(',\n    ')}
  ];
}`}</pre>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="bg-white rounded-3xl p-6 lg:p-8 border border-blue-100/70 shadow-xs">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              快速直达其他 6 大微应用
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {APPLICATIONS.filter((a) => a.id !== app.id).map((otherApp) => {
                const OtherIcon = ICON_COMPONENTS[otherApp.iconName];
                return (
                  <button
                    key={otherApp.id}
                    onClick={() => onNavigate(otherApp.route)}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/50 text-left transition-all group cursor-pointer"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: otherApp.color }}
                    >
                      <OtherIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {otherApp.name}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {otherApp.description.join(' · ')}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
