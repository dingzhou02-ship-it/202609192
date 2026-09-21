import React, { useState } from 'react';
import { MicroAppShell } from '../components/MicroAppShell/MicroAppShell';
import { APPLICATIONS } from '../data/applications';
import { Search, BookMarked, Globe, Filter, Download } from 'lucide-react';

interface KnowledgeProps {
  onNavigate: (route: string) => void;
}

export const Knowledge: React.FC<KnowledgeProps> = ({ onNavigate }) => {
  const app = APPLICATIONS.find((a) => a.id === 'knowledge')!;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const categories = ['全部', '自然地理', '人文地理', '区域地理', 'GIS空间数据', '高考典型图解'];

  const demoResources = [
    { title: '全球气压带与风带季节性移动三维剖面图解', tag: '自然地理', type: '高清专题图', views: '2,480' },
    { title: '我国主要喀斯特地貌与流水溶蚀发育典型案例图库', tag: '自然地理', type: '案例图库', views: '1,920' },
    { title: '成渝双城经济圈城镇体系与产业空间集聚分析', tag: '人文地理', type: '矢量数据', views: '1,350' },
    { title: '中学地理新课标核心素养关联知识图谱 (2026版)', tag: '高考典型图解', type: '知识图谱', views: '4,100' },
  ];

  return (
    <MicroAppShell app={app} onNavigate={onNavigate}>
      <div className="space-y-6">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索地理资源、课标考点、地形图谱..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-sm bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <Filter className="w-4 h-4 text-slate-400 mr-1 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Demo Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {demoResources.map((res, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-blue-100/80 bg-white hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <BookMarked className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {res.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-600 font-medium">
                        {res.tag}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                        {res.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>浏览量: {res.views} 次</span>
                <button className="flex items-center gap-1 text-blue-600 font-medium hover:underline">
                  <Download className="w-3.5 h-3.5" />
                  <span>调取至备课夹</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Developer Sandbox Notice */}
        <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/60 flex items-center gap-3 text-xs text-blue-800">
          <Globe className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span>微应用研发状态：当前接入「地理学科图谱服务 v1.2」，底层支持万亿级地理实体与拓扑检索。</span>
        </div>
      </div>
    </MicroAppShell>
  );
};
