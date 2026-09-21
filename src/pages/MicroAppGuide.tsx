import React, { useState } from 'react';
import {
  FileCode2,
  ArrowLeft,
  CheckCircle2,
  Layers,
  Sparkles,
  ExternalLink,
  Code2,
  ShieldCheck,
  Terminal,
  Server,
  Copy,
  Check,
  HelpCircle,
  LayoutGrid
} from 'lucide-react';

interface MicroAppGuideProps {
  onNavigate: (route: string) => void;
}

export const MicroAppGuide: React.FC<MicroAppGuideProps> = ({ onNavigate }) => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const sampleManifest = `// src/data/microApps.ts
export const MICRO_APP_REGISTRY: GeoAIMicroAppManifest[] = [
  {
    appId: "your-group-app",
    displayName: "AI气候仿真助手",
    version: "1.0.0",
    routePrefix: "/climate-sim",
    integrationType: "iframe", // "iframe" (独立部署) 或 "component" (本地组件)
    entryUrl: "https://climate-sim.geoai.nnu.edu.cn", // 微应用部署URL
    authRequired: true,
    capabilities: [
      "柯本气候分类交互推演",
      "气候图水热匹配智能评测",
      "全球变暖情境沙盘模拟"
    ],
    englishName: "AI Climate Simulator",
    description: ["气候类型交互推演", "情境沙盘智能评测"],
    detailDescription: "面向中学地理大气的交互式气候仿真微应用，支持水热直方图参数调节与全球典型气候带判定推演。",
    iconName: "Wind",
    color: "#00C48C",
    bgColor: "bg-[#00C48C]",
    lightBgColor: "bg-emerald-50",
    textColor: "text-[#00C48C]",
    borderColor: "border-emerald-200",
    badge: "学科仿真"
  }
];`;

  const postMessageSample = `// 微应用内部 (子应用端) 监听与主平台的安全通信
window.addEventListener("message", (event) => {
  // 建议校验来源域名
  // if (event.origin !== "https://geoai.nnu.edu.cn") return;

  const { type, payload } = event.data || {};
  if (type === "GEOAI_INIT_CONTEXT") {
    console.log("已接收主平台用户信息与主题:", payload.user, payload.theme);
  }
});

// 通知主平台微应用已加载就绪
window.parent?.postMessage(
  { type: "GEOAI_APP_READY", appId: "your-group-app" },
  "*"
);`;

  return (
    <div className="min-h-[calc(100vh-92px)] bg-[#F4F8FC] py-8 px-6 lg:px-12">
      <div className="w-full max-w-[1300px] mx-auto space-y-8">
        {/* Page Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <FileCode2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-800">微应用接入规范指南</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">
                  v2.0 平台底座规范
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                面向南京师范大学各小组开发团队的微应用独立部署、统一注册与集成标准
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-all cursor-pointer shadow-xs self-start md:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回平台首页</span>
          </button>
        </div>

        {/* 1. Core Architecture Overview Card */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 border border-blue-100/70 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 text-slate-800 font-bold text-lg border-b border-slate-100 pb-4">
            <Layers className="w-5 h-5 text-blue-600" />
            <span>平台底座与微应用集成架构</span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            南师GeoAI智教云遵循“<strong>主平台底座壳 + 微应用服务网格</strong>”设计范式。主平台负责统一身份鉴权、全局导航、视觉风格统一以及各小组应用中心聚合分发；各小组（Group 2 ~ Group 8）微应用可由各组技术团队选用熟悉的开发技术栈（如 React、Vue、Python Flask/FastAPI 等）独立开发、独立部署。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200/60 flex flex-col justify-between space-y-3">
              <div>
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs mb-3">
                  01
                </div>
                <h3 className="text-base font-bold text-slate-800">技术栈彻底解耦</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  微应用可以独立选择现代前端框架（React / Vue / Svelte）或后端渲染框架，无需与主平台共用构建链路。
                </p>
              </div>
              <span className="text-[11px] font-semibold text-blue-700">推荐方式：Iframe 隔离沙箱</span>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200/60 flex flex-col justify-between space-y-3">
              <div>
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs mb-3">
                  02
                </div>
                <h3 className="text-base font-bold text-slate-800">一键式声明注册</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  各组部署好专属应用后，只需在主平台 <code className="text-indigo-600 bg-white px-1.5 py-0.5 rounded border border-indigo-100">microApps.ts</code> 登记微应用清单，即可自动生成卡片与路由。
                </p>
              </div>
              <span className="text-[11px] font-semibold text-indigo-700">无需改动主平台核心代码</span>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 flex flex-col justify-between space-y-3">
              <div>
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mb-3">
                  03
                </div>
                <h3 className="text-base font-bold text-slate-800">无缝防白屏与容灾</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  主平台内置标准化 MicroAppIframeContainer 容器，提供加载骨架屏、跨域连通性探活与离线模拟原型双模切换。
                </p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700">高可用容灾与无感知降级</span>
            </div>
          </div>
        </div>

        {/* 2. Step by Step Guide */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 border border-blue-100/70 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 text-slate-800 font-bold text-lg border-b border-slate-100 pb-4">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span>三步完成新微应用接入</span>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h4 className="text-sm font-bold text-slate-800">
                    在 <code className="text-blue-600">src/data/microApps.ts</code> 登记清单（Manifest）
                  </h4>
                </div>
                <button
                  onClick={() => handleCopy(sampleManifest, 1)}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 cursor-pointer"
                >
                  {copiedCodeIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCodeIndex === 1 ? '已复制' : '复制代码'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-slate-900 text-slate-100 text-xs font-mono overflow-x-auto leading-relaxed">
                <code>{sampleManifest}</code>
              </pre>
            </div>

            {/* Step 2 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h4 className="text-sm font-bold text-slate-800">
                    微应用内部响应主平台安全通信（可选增强）
                  </h4>
                </div>
                <button
                  onClick={() => handleCopy(postMessageSample, 2)}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 cursor-pointer"
                >
                  {copiedCodeIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCodeIndex === 2 ? '已复制' : '复制代码'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-slate-900 text-slate-100 text-xs font-mono overflow-x-auto leading-relaxed">
                <code>{postMessageSample}</code>
              </pre>
            </div>

            {/* Step 3 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h4 className="text-sm font-bold text-slate-800">
                  上线与联动测试
                </h4>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-2">
                <p>
                  完成登记后，主平台的<strong>应用中心卡片</strong>、<strong>顶部应用导航下拉</strong>及<strong>路由规则</strong>将由系统自动挂载完成。
                </p>
                <p>
                  进入微应用详情页后，系统会自动检测远程服务器可达性，若远端已上线则全屏无缝嵌入；若正在测试期间，教师和开发者也可在界面中切换至<strong>本地模拟原型预览模式</strong>。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Integration Requirements & FAQ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-blue-100/70 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>安全规范要求</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>HTTPS 要求</strong>：正式生产微应用接入地址必须支持安全的 HTTPS 协议。</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>X-Frame-Options</strong>：微应用独立服务器不可配置 <code className="bg-slate-100 px-1 py-0.5 rounded">DENY</code>，需允许主平台嵌入。</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>响应式适配</strong>：微应用应自适应宽度与最小 640px 屏幕显示。</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-blue-100/70 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>开发者技术支持</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              各小组在接入过程中若遇到跨域通信、身份同步或原型联调疑问，可通过“反馈中心”直接提交需求，或联系南师地理科学学院智慧教育技术小组进行联合联调。
            </p>
            <div className="pt-2 flex gap-3">
              <button
                onClick={() => onNavigate('/feedback')}
                className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-600 font-semibold text-xs hover:bg-blue-100 transition-colors cursor-pointer"
              >
                前往反馈中心
              </button>
              <button
                onClick={() => onNavigate('/help')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 transition-colors cursor-pointer"
              >
                查看帮助中心
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
