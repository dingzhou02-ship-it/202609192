import React, { useState } from 'react';
import { MicroAppShell } from '../components/MicroAppShell/MicroAppShell';
import { APPLICATIONS } from '../data/applications';
import { Compass, Sun, Mountain, Map, Calculator, ArrowUpRight } from 'lucide-react';

interface ToolsProps {
  onNavigate: (route: string) => void;
}

export const Tools: React.FC<ToolsProps> = ({ onNavigate }) => {
  const app = APPLICATIONS.find((a) => a.id === 'tools')!;
  const [lat, setLat] = useState('32.06');
  const [date, setDate] = useState('06-22');
  const [calcResult, setCalcResult] = useState('81.4° (正午太阳高度角)');

  const toolsList = [
    {
      title: '正午太阳高度角快速测算器',
      desc: '输入任意纬度与节气日期，自动计算正午太阳高度及晨昏线切点分布。',
      icon: Sun,
      color: 'bg-amber-500'
    },
    {
      title: '等高线地形与剖面线生成器',
      desc: '支持在三维地貌上划定剖面线，智能绘制地形起伏剖面图及坡度分析。',
      icon: Mountain,
      color: 'bg-emerald-500'
    },
    {
      title: '世界气候类型特征判定向导',
      desc: '基于以温定带、以水定型逻辑，输入气温降水柱状图即可精准判别。',
      icon: Compass,
      color: 'bg-blue-500'
    },
    {
      title: '智能地理板图与矢量标绘工具',
      desc: '一键生成中国政区、主要山脉水系轮廓线，支持快速嵌入课件。',
      icon: Map,
      color: 'bg-purple-500'
    }
  ];

  const handleCalc = () => {
    const latitude = parseFloat(lat) || 32.06;
    // rough calculation demo for display
    const declination = date === '06-22' ? 23.5 : date === '12-22' ? -23.5 : 0;
    const h = 90 - Math.abs(latitude - declination);
    setCalcResult(`${h.toFixed(1)}° (正午太阳高度角)`);
  };

  return (
    <MicroAppShell app={app} onNavigate={onNavigate}>
      <div className="space-y-6">
        {/* Interactive Mini-Tool Sandbox */}
        <div className="p-6 rounded-2xl bg-[#F0FDF4] border border-emerald-200/80">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-base mb-3">
            <Calculator className="w-5 h-5 text-emerald-600" />
            <span>在线快速测算试验区：正午太阳高度角 (H = 90° - |φ - δ|)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                所在地纬度 (°N)
              </label>
              <input
                type="number"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-emerald-500"
                placeholder="例如 32.06 (南京)"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                节气 / 日期
              </label>
              <select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="06-22">夏至日 (赤纬 +23.5°)</option>
                <option value="03-21">春分 / 秋分 (赤纬 0°)</option>
                <option value="12-22">冬至日 (赤纬 -23.5°)</option>
              </select>
            </div>

            <div>
              <button
                onClick={handleCalc}
                className="w-full py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors cursor-pointer shadow-sm"
              >
                运行即时测算
              </button>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white rounded-xl border border-emerald-100 flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-500">计算结果：</span>
            <span className="font-bold text-emerald-700 font-mono text-base">{calcResult}</span>
          </div>
        </div>

        {/* Tools Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {toolsList.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:shadow-md transition-all flex items-start justify-between group"
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-xl ${tool.color} text-white flex items-center justify-center flex-shrink-0 shadow-xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                      {tool.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                </div>

                <div className="text-slate-300 group-hover:text-emerald-500 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MicroAppShell>
  );
};
