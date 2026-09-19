import React, { useState } from 'react';
import {
  FileCode2,
  ArrowLeft,
  CheckCircle2,
  Layers,
  Radio,
  Copy,
  Check,
  Globe,
  Sparkles,
  ShieldCheck,
  Server,
  ArrowRight
} from 'lucide-react';
import { MICRO_APP_REGISTRY } from '../data/microApps';

interface MicroAppGuideProps {
  onNavigate: (route: string) => void;
}

export const MicroAppGuide: React.FC<MicroAppGuideProps> = ({ onNavigate }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const sampleRegistryCode = `// 平台统一微应用注册表：src/data/microApps.ts
export const MICRO_APP_REGISTRY: GeoAIMicroAppManifest[] = [
  {
    appId: "your-app-id",                 // 1. 微应用唯一标识 (英文字符串)
    displayName: "微应用中文名",           // 2. 应用名称 (显示在首页与导航)
    version: "1.0.0",                     // 3. 版本号
    routePrefix: "/your-app-id",          // 4. 主平台挂载的路由前缀
    integrationType: "iframe",            // 5. 接入类型: "iframe" (独立微应用) 或 "component"
    entryUrl: "https://your-app.nnu.edu.cn", // 6. 独立微应用线上访问URL
    authRequired: true,                   // 7. 是否需要主平台用户凭证
    capabilities: [                       // 8. 核心能力标签清单
      "核心功能点 A",
      "核心功能点 B"
    ]
  }
];`;

  const iframePostMessageCode = `// 微应用与主平台 postMessage 统一通信协议
// 1. 微应用加载完成后通知主平台
window.parent.postMessage({
  type: 'GEOAI_MICROAPP_READY',
  appId: 'your-app-id'
}, '*');

// 2. 接收主平台分发的用户凭证与全局状态
window.addEventListener('message', (event) => {
  // 验证主平台源 (如 https://geoai.nnu.edu.cn)
  if (event.data?.type === 'GEOAI_AUTH_TOKEN') {
    const { token, user } = event.data.payload;
    console.log('接收到主平台登录凭证:', user.name);
    // 在微应用内部初始化学科服务会话
  }
});`;

  return (
    <div className="min-h-[calc(100vh-92px)] bg-[#F4F8FC] py-8 px-4 sm:px-6 lg:px-12">
      <div className="w-full max-w-5xl mx-auto space-y-6">
        {/* Top bar & Breadcrumb */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                微应用独立开发接入指南
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                面向各子开发小组的“平台主应用 + 独立微应用 URL 接入”架构规范
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/80 text-xs sm:text-sm font-medium text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回主平台首页</span>
          </button>
        </div>

        {/* 核心原则声明卡片 */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              架构核心解耦原则
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
              主平台不要求其他小组修改首页代码
            </h2>

            <p className="text-sm text-blue-100/90 max-w-3xl leading-relaxed">
              南师GeoAI智教云平台采用“主平台底座壳 + 独立微应用URL接入”的现代化解耦微前端架构。
              全平台7大微应用以及未来新增的第三方教学工具均由各业务小组<strong>独立立项、独立技术栈选型、独立Git仓库维护、独立持续集成与部署</strong>。
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4 text-xs font-medium text-blue-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                零主站代码侵入
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                技术栈完全自由 (React / Vue / 原生)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                秒级注册即刻上线
              </span>
            </div>
          </div>
        </div>

        {/* 关键说明：其他小组只需要做的 4 件事 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-100/90 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>其他小组接入职责清单（只需完成以下 4 步）</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              各小组开发者无需通读主平台源码，只需按如下步骤完成自己的微应用闭环：
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 步骤 1 */}
            <div className="p-5 rounded-2xl bg-[#F8FBFF] border border-blue-100/90 flex gap-4">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-xs">
                1
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-slate-800">
                  开发自己的微应用
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  在小组专属的独立 Git 仓库中构建微应用。前端框架不受任何限制（Vue 3、React 18、Svelte 或原生均可）。
                </p>
                <div className="text-[11px] text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg inline-block font-medium">
                  建议：主色调遵循平台科技蓝，微应用内部不重复实现主平台 Header 导航栏。
                </div>
              </div>
            </div>

            {/* 步骤 2 */}
            <div className="p-5 rounded-2xl bg-[#F8FBFF] border border-blue-100/90 flex gap-4">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-xs">
                2
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-slate-800">
                  独立部署上线
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  小组将微应用构建并部署于自己的服务器、Nginx 或云容器（例如各大高校私有云或公有云环境）。
                </p>
                <div className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg inline-block font-medium">
                  要求：使用 HTTPS 协议，并在 Nginx 中配置允许主平台 iframe 嵌入（frame-ancestors）。
                </div>
              </div>
            </div>

            {/* 步骤 3 */}
            <div className="p-5 rounded-2xl bg-[#F8FBFF] border border-blue-100/90 flex gap-4">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-xs">
                3
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-slate-800">
                  提供微应用访问 URL 与元数据
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  小组只需向主平台管理员提交 7 项核心元数据（appId、名称、版本、路由、entryUrl、鉴权要求、能力标签）。
                </p>
                <div className="text-[11px] text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg inline-block font-medium">
                  无需打包代码提交给主平台，仅提供线上生产 URL 即可！
                </div>
              </div>
            </div>

            {/* 步骤 4 */}
            <div className="p-5 rounded-2xl bg-[#F8FBFF] border border-blue-100/90 flex gap-4">
              <div className="w-8 h-8 rounded-xl bg-amber-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-xs">
                4
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-slate-800">
                  按照统一 UI 和认证协议接入
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  若微应用需要教师登录凭证，通过主平台 postMessage 或 URL 参数获取 Token，实现单点登录。
                </p>
                <div className="text-[11px] text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg inline-block font-medium">
                  平台管理员只需在 MICRO_APP_REGISTRY 登记，系统自动完成路由及所有卡片生成！
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 平台管理员注册规范 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-100/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                <span>平台管理员配置示例 (MICRO_APP_REGISTRY)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                未来任何新微应用上线，只需在本注册表中新增配置，首页卡片、导航下拉菜单与路由将全部自动生成：
              </p>
            </div>

            <button
              onClick={() => copyToClipboard(sampleRegistryCode, 1)}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedIndex === 1 ? '已复制' : '复制代码'}</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto">
            <pre>{sampleRegistryCode}</pre>
          </div>
        </div>

        {/* 通信与安全规范 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-100/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <span>认证协议与 iframe 通信机制 (postMessage)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                主平台通过标准化 postMessage 双向通道向微应用派发单点登录凭证：
              </p>
            </div>

            <button
              onClick={() => copyToClipboard(iframePostMessageCode, 2)}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedIndex === 2 ? '已复制' : '复制代码'}</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto">
            <pre>{iframePostMessageCode}</pre>
          </div>
        </div>

        {/* 当前已注册的 7 大微应用状态 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-100/90 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-600" />
            <span>当前已接入微应用清单 (MICRO_APP_REGISTRY 状态监控)</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold">
                  <th className="py-3 px-4">微应用标识 (appId)</th>
                  <th className="py-3 px-4">应用名称</th>
                  <th className="py-3 px-4">接入类型</th>
                  <th className="py-3 px-4">挂载路由</th>
                  <th className="py-3 px-4">配置入口 URL (entryUrl)</th>
                  <th className="py-3 px-4">鉴权要求</th>
                  <th className="py-3 px-4">快捷操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MICRO_APP_REGISTRY.map((app) => (
                  <tr key={app.appId} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">{app.appId}</td>
                    <td className="py-3 px-4 font-medium text-slate-800">{app.displayName}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          app.integrationType === 'iframe'
                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {app.integrationType}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-blue-600">{app.routePrefix}</td>
                    <td className="py-3 px-4 font-mono text-slate-500 max-w-xs truncate">
                      {app.entryUrl || '—'}
                    </td>
                    <td className="py-3 px-4">
                      {app.authRequired ? (
                        <span className="text-amber-600 font-medium">需要登录凭证</span>
                      ) : (
                        <span className="text-slate-400">公开</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => onNavigate(app.routePrefix)}
                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <span>进入</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
