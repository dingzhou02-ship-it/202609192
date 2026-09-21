import React from 'react';
import { GeoAIMicroAppManifest } from '../../types/microApp';
import { MicroAppIframeContainer } from './MicroAppIframeContainer';
import { getLocalMicroAppComponent } from './componentRegistry';

interface MicroAppRendererProps {
  manifest: GeoAIMicroAppManifest;
  onNavigate: (route: string) => void;
}

/**
 * MicroAppRenderer - 统一微应用渲染分发引擎
 * 
 * 根据微应用清单中的 integrationType 自动决定加载策略：
 * 1. 当 integrationType === "component" 时：
 *    动态加载 entryComponent 或本地组件注册表中的组件，实现工程内部组件无缝挂载；
 * 2. 当 integrationType === "iframe" 时：
 *    加载统一规范的 Iframe 容器 MicroAppIframeContainer，
 *    提供宽高标准化、跨域状态感知、Header 保留及“微应用尚未部署”防白屏友好占位机制。
 */
export const MicroAppRenderer: React.FC<MicroAppRendererProps> = ({ manifest, onNavigate }) => {
  const localComponent = manifest.entryComponent || getLocalMicroAppComponent(manifest.appId);

  // 1. 如果是 iframe 接入方式，加载统一的 iframe 容器
  if (manifest.integrationType === 'iframe') {
    return (
      <MicroAppIframeContainer
        manifest={manifest}
        onNavigate={onNavigate}
        fallbackComponent={localComponent}
      />
    );
  }

  // 2. 如果是 component 接入方式，加载 entryComponent
  if (manifest.integrationType === 'component') {
    const Component = localComponent;

    if (Component) {
      return <Component onNavigate={onNavigate} />;
    }

    // 防御性占位：如果声明了 component 但未提供 entryComponent
    return (
      <div className="w-full min-h-[calc(100vh-92px)] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl p-6 border border-amber-200 text-center shadow-xs">
          <div className="text-amber-500 font-bold text-base mb-2">未找到微应用入口组件</div>
          <p className="text-xs text-slate-500 mb-4">
            微应用 <code className="text-blue-600">{manifest.displayName}</code> 接入类型为 component，但未找到匹配的入口组件。
          </p>
          <button
            onClick={() => onNavigate('/')}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  // 默认 fallback
  return null;
};
