import React, { useState, useEffect } from 'react';
import heroBgImage from './assets/hero-bg.jpg';
import { Header } from './components/Header/Header';
import { Home } from './pages/Home';
import { MicroAppGuide } from './pages/MicroAppGuide';
import { Messages } from './pages/Messages';
import { Feedback } from './pages/Feedback';
import { Help } from './pages/Help';
import { Settings } from './pages/Settings';
import { getMicroAppByRoute, MICRO_APP_REGISTRY } from './data/microApps';
import { MicroAppRenderer } from './components/MicroAppRenderer/MicroAppRenderer';

export default function App() {
  // Simple client-side routing state supporting both direct hash and paths
  const getInitialRoute = () => {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash && hash.startsWith('/')) return hash;
    return '/';
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash && hash.startsWith('/')) {
        setCurrentRoute(hash);
      } else if (!hash || hash === '') {
        setCurrentRoute('/');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: string) => {
    if (route === '#apps') {
      // Scroll to application center section if on home
      if (currentRoute !== '/') {
        setCurrentRoute('/');
        window.location.hash = '/';
        setTimeout(() => {
          const el = document.getElementById('application-center-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById('application-center-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (route === '#profile') {
      return;
    }

    setCurrentRoute(route);
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 动态路由解析：优先匹配 MICRO_APP_REGISTRY，其次匹配平台静态管理页面
  const matchedMicroApp = getMicroAppByRoute(currentRoute);

  const renderCurrentPage = () => {
    // 1. 如果匹配到注册表中的微应用，统一由 MicroAppRenderer 按其 integrationType 分发
    if (matchedMicroApp) {
      return <MicroAppRenderer manifest={matchedMicroApp} onNavigate={navigateTo} />;
    }

    // 2. 平台基础页面
    switch (currentRoute) {
      case '/':
        return <Home onNavigate={navigateTo} />;
      case '/microapp-guide':
        return <MicroAppGuide onNavigate={navigateTo} />;
      case '/messages':
        return <Messages onNavigate={navigateTo} />;
      case '/feedback':
        return <Feedback onNavigate={navigateTo} />;
      case '/help':
        return <Help onNavigate={navigateTo} />;
      case '/settings':
        return <Settings onNavigate={navigateTo} />;
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  // 如果当前是 iframe 微应用，由于 iframe 占据全屏高度 calc(100vh - 92px)，不需要滚动出底部footer
  const isIframeMicroApp = matchedMicroApp?.integrationType === 'iframe';

  return (
    <div
      id="geoai-app-root"
      className="min-h-screen flex flex-col font-sans text-slate-800 relative bg-slate-900 bg-cover bg-fixed bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 0%, rgba(244, 248, 252, 0.72) 540px, rgba(244, 248, 252, 0.95) 960px, #F4F8FC 1300px), url(${heroBgImage})`
      }}
    >
      {/* 1. Universal Top Navigation Bar (保留平台统一 Header) */}
      <Header currentPath={currentRoute} onNavigate={navigateTo} />

      {/* 2. Main Page Content View (动态微应用渲染区 / 平台主页) */}
      <div className="flex-1 w-full">
        {renderCurrentPage()}
      </div>

      {/* 3. High-End Educational Platform Footer (非全屏 iframe 时展示) */}
      {!isIframeMicroApp && (
        <footer id="platform-footer" className="w-full bg-white border-t border-slate-200/80 py-8 px-6 lg:px-12 text-slate-500 select-none">
          <div className="w-full max-w-[1720px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-700">南师GeoAI智教云</span>
              <span className="text-slate-300">|</span>
              <span>GeoAI Education Cloud</span>
              <span className="text-slate-300">|</span>
              <span>面向中学地理教师的 AI 教育综合服务平台</span>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <span>南京师范大学 地理科学学院 / 地理教育智慧化团队</span>
              <span>·</span>
              <span>“AI赋能地理教育 智创未来课堂”</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

