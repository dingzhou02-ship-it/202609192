import React, { useState, useEffect } from 'react';
import {
  Globe,
  Radio,
  ExternalLink,
  RefreshCw,
  ArrowLeft,
  FileCode2,
  ShieldCheck,
  CheckCircle2,
  ServerOff,
  Sparkles,
  Layers,
  LucideIcon,
  BookOpen,
  Wrench,
  FileText,
  MessageSquareMore,
  FileCheck,
  TrendingUp,
  FlaskConical,
  Eye
} from 'lucide-react';
import { GeoAIMicroAppManifest } from '../../types/microApp';

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  Wrench,
  FileText,
  MessageSquareMore,
  FileCheck,
  TrendingUp,
  FlaskConical
};

interface MicroAppIframeContainerProps {
  manifest: GeoAIMicroAppManifest;
  onNavigate: (route: string) => void;
  fallbackComponent?: React.ComponentType<{ onNavigate: (route: string) => void }>;
}

export const MicroAppIframeContainer: React.FC<MicroAppIframeContainerProps> = ({
  manifest,
  onNavigate,
  fallbackComponent
}) => {
  // 检测 URL 是否为示例或未部署地址
  const isPlaceholderUrl =
    !manifest.entryUrl ||
    manifest.entryUrl.includes('example.com') ||
    manifest.entryUrl.includes('placeholder') ||
    manifest.entryUrl.startsWith('http://localhost:0');

  // 当前视图模式: 'placeholder' (未部署占位) | 'iframe' (尝试嵌入真实iframe) | 'preview_component' (本地模拟原型)
  const [viewMode, setViewMode] = useState<'placeholder' | 'iframe' | 'preview_component'>(
    isPlaceholderUrl ? 'placeholder' : 'iframe'
  );

  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const [connectionMessage, setConnectionMessage] = useState<string | null>(null);
  const [iframeError, setIframeError] = useState(false);

  // 当 entryUrl 发生变化时重置状态
  useEffect(() => {
    if (isPlaceholderUrl) {
      setViewMode('placeholder');
    } else {
      setViewMode('iframe');
    }
    setIframeError(false);
    setConnectionMessage(null);
  }, [manifest.entryUrl, isPlaceholderUrl]);

  const handleTestConnection = () => {
    setIsCheckingConnection(true);
    setConnectionMessage('正在检测微应用服务连通性...');

    setTimeout(() => {
      setIsCheckingConnection(false);
      if (manifest.entryUrl?.includes('example.com')) {
        setConnectionMessage(
          `探测失败: 目标地址 ${manifest.entryUrl} 为系统预留示例域名，开发小组尚未上线真实服务。`
        );
      } else {
        setConnectionMessage(
          `已向 ${manifest.entryUrl} 发起连通性检查，未接收到服务心跳响应 (ERR_CONNECTION_REFUSED)。`
        );
      }
    }, 1200);
  };

  const Icon = (manifest.iconName && ICON_MAP[manifest.iconName]) || Globe;
  const FallbackComponent = fallbackComponent || manifest.entryComponent;

  return (
    <div className="w-full flex flex-col bg-[#F4F8FC]" style={{ minHeight: 'calc(100vh - 92px)' }}>
      {/* 统一微应用控制栏 (紧贴平台Header下方，显示微应用元数据与环境切换) */}
      <div className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-2.5 flex items-center justify-between gap-4 flex-wrap select-none z-10">
        {/* 左侧：面包屑与微应用元数据 */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>返回首页</span>
          </button>
          <span className="text-slate-300">/</span>

          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs"
              style={{ backgroundColor: manifest.color || '#1677FF' }}
            >
              <Icon className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-bold text-slate-800">{manifest.displayName}</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 border border-blue-200/70 font-semibold">
              v{manifest.version}
            </span>
          </div>

          <span className="hidden sm:inline-block text-xs text-slate-400 font-mono">
            [{manifest.routePrefix}]
          </span>

          {/* 架构类型与状态标签 */}
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center gap-1 font-medium">
            <Radio className="w-3 h-3 animate-pulse" />
            独立微应用接入 (iframe)
          </span>

          {viewMode === 'placeholder' && (
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium flex items-center gap-1">
              <ServerOff className="w-3 h-3" />
              待独立部署上线
            </span>
          )}
        </div>

        {/* 右侧：操作与视图切换 */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* 切换微应用待部署说明卡 */}
          <button
            onClick={() => setViewMode('placeholder')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'placeholder'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            接入状态与指南
          </button>

          {/* 切换真实 iframe 加载模式 */}
          <button
            onClick={() => setViewMode('iframe')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'iframe'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            直接加载微应用
          </button>

          {/* 本地组件预览切换（如果有对应原型） */}
          {FallbackComponent && (
            <button
              onClick={() => setViewMode('preview_component')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
                viewMode === 'preview_component'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
              }`}
              title="切换为主工程内置的本地模拟组件原型"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>本地模拟原型</span>
            </button>
          )}

          {/* 接入文档入口 */}
          <button
            onClick={() => onNavigate('/microapp-guide')}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-200/90 text-xs font-medium text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-all cursor-pointer shadow-xs flex items-center gap-1"
          >
            <FileCode2 className="w-3.5 h-3.5 text-blue-500" />
            <span>接入规范文档</span>
          </button>

          {/* 外部打开 */}
          {manifest.entryUrl && (
            <a
              href={manifest.entryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
              title="在新窗口直接打开 entryUrl"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* 核心内容区 */}
      <div className="flex-1 w-full relative">
        {/* 模式 1: 友好占位界面 (微应用尚未部署) */}
        {viewMode === 'placeholder' && (
          <div className="w-full py-10 px-4 sm:px-6 lg:px-12 flex justify-center items-center">
            <div className="w-full max-w-4xl space-y-6">
              {/* 主提示卡片 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-blue-100/90 shadow-sm relative overflow-hidden">
                {/* 装饰性光晕 */}
                <div
                  className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none opacity-15"
                  style={{ backgroundColor: manifest.color || '#1677FF' }}
                />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 pb-6 border-b border-slate-100">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0"
                    style={{ backgroundColor: manifest.color || '#1677FF' }}
                  >
                    <Icon className="w-10 h-10 text-white" strokeWidth={2.2} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                        {manifest.displayName}
                      </h1>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                        独立微应用 (iframe 模式)
                      </span>
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                        <ServerOff className="w-3.5 h-3.5" />
                        微应用尚未部署
                      </span>
                    </div>

                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                      当前微应用由开发小组独立负责开发与部署。主平台已完成接入点注册，当前已配置的目标入口地址尚未上线或处于联调阶段。
                    </p>
                  </div>
                </div>

                {/* 详细配置与参数对照 */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-slate-400 font-medium">微应用唯一标识 (appId)</div>
                    <div className="text-slate-800 font-mono font-bold mt-1 text-sm">
                      {manifest.appId}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-slate-400 font-medium">主平台挂载路由 (routePrefix)</div>
                    <div className="text-slate-800 font-mono font-bold mt-1 text-sm text-blue-600">
                      {manifest.routePrefix}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-slate-400 font-medium">微应用版本号 (version)</div>
                    <div className="text-slate-800 font-mono font-bold mt-1 text-sm">
                      v{manifest.version}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 sm:col-span-2">
                    <div className="text-slate-400 font-medium">配置的微应用入口地址 (entryUrl)</div>
                    <div className="text-slate-800 font-mono font-medium mt-1 text-xs break-all flex items-center gap-2">
                      <span className="bg-slate-200/80 px-2 py-0.5 rounded text-blue-700 font-semibold">
                        {manifest.entryUrl || '未配置'}
                      </span>
                      {manifest.entryUrl?.includes('example.com') && (
                        <span className="text-[11px] text-amber-600 font-sans">
                          (示例占位地址，待替换为线上部署URL)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-slate-400 font-medium">主平台身份凭证 (authRequired)</div>
                    <div className="text-slate-800 font-bold mt-1 text-xs flex items-center gap-1 text-indigo-600">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {manifest.authRequired ? '需要用户鉴权 (Token透传)' : '公共无状态免登录'}
                    </div>
                  </div>
                </div>

                {/* 核心支撑能力清单 */}
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-500 mb-2.5">
                    该微应用声明的核心能力 (capabilities):
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {manifest.capabilities.map((cap, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 flex items-center gap-1.5 font-medium"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 连通性测试回显信息 */}
                {connectionMessage && (
                  <div className="mt-5 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/90 text-amber-800 text-xs leading-relaxed flex items-start gap-2.5">
                    <ServerOff className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>{connectionMessage}</span>
                  </div>
                )}

                {/* 操作按钮组 */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleTestConnection}
                    disabled={isCheckingConnection}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-60"
                  >
                    <RefreshCw
                      className={`w-4 h-4 ${isCheckingConnection ? 'animate-spin' : ''}`}
                    />
                    <span>{isCheckingConnection ? '正在探测服务...' : '检测服务连通性'}</span>
                  </button>

                  <button
                    onClick={() => setViewMode('iframe')}
                    className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-xs"
                  >
                    尝试以 iframe 方式渲染
                  </button>

                  {FallbackComponent && (
                    <button
                      onClick={() => setViewMode('preview_component')}
                      className="px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                    >
                      <Eye className="w-4 h-4" />
                      <span>查看本地功能原型</span>
                    </button>
                  )}

                  <button
                    onClick={() => onNavigate('/microapp-guide')}
                    className="px-4 py-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                  >
                    <FileCode2 className="w-4 h-4" />
                    <span>查看独立开发接入指南</span>
                  </button>
                </div>
              </div>

              {/* 致开发小组快速指引卡片 */}
              <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>致微应用开发小组：4 步极简接入指南</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100/80">
                    <div className="text-xs font-bold text-blue-600 flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                        1
                      </span>
                      <span>独立开发微应用</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      小组在自有独立仓库中开发微应用，支持 Vue、React、Svelte 等任意技术栈。
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100/80">
                    <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                        2
                      </span>
                      <span>独立部署上线</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      部署在小组专属服务器或云容器上，配置 HTTPS 及允许 iframe 嵌入。
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100/80">
                    <div className="text-xs font-bold text-purple-600 flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">
                        3
                      </span>
                      <span>提供应用线上 URL</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      将生产环境访问 URL (如 https://knowledge.nnu.edu.cn) 提交给主平台管理员。
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100/80">
                    <div className="text-xs font-bold text-amber-700 flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">
                        4
                      </span>
                      <span>免改主站无感接入</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      平台管理员仅在 MICRO_APP_REGISTRY 中填入 entryUrl，其他小组完全无需修改主平台首页代码！
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 模式 2: 真实 iframe 渲染 */}
        {viewMode === 'iframe' && (
          <div className="w-full relative" style={{ height: 'calc(100vh - 92px - 45px)' }}>
            {iframeError && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 text-center">
                <ServerOff className="w-12 h-12 text-amber-500 mb-3" />
                <h3 className="text-lg font-bold text-slate-800">
                  微应用嵌入失败或地址不可达
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md">
                  当前微应用地址 <code className="text-blue-600">{manifest.entryUrl}</code> 无法被加载或设置了禁止跨域嵌入响应头。
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <button
                    onClick={() => setViewMode('placeholder')}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-medium cursor-pointer shadow-xs"
                  >
                    查看微应用接入指南
                  </button>
                  {FallbackComponent && (
                    <button
                      onClick={() => setViewMode('preview_component')}
                      className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-medium cursor-pointer"
                    >
                      切换本地模拟原型
                    </button>
                  )}
                </div>
              </div>
            )}

            <iframe
              id={`micro-app-iframe-${manifest.appId}`}
              src={manifest.entryUrl}
              title={manifest.displayName}
              onError={() => setIframeError(true)}
              className="w-full h-full border-0 block bg-white"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                outline: 'none'
              }}
              allow="camera; microphone; geolocation; clipboard-write; encrypted-media"
            />
          </div>
        )}

        {/* 模式 3: 本地组件模拟原型 */}
        {viewMode === 'preview_component' && FallbackComponent && (
          <div className="w-full">
            <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2 text-xs text-emerald-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>当前正在展示：【{manifest.displayName}】主平台内置的本地开发原型组件</span>
              </div>
              <button
                onClick={() => setViewMode('placeholder')}
                className="text-emerald-700 hover:underline cursor-pointer font-medium"
              >
                返回待部署接入指引
              </button>
            </div>
            <FallbackComponent onNavigate={onNavigate} />
          </div>
        )}
      </div>
    </div>
  );
};
