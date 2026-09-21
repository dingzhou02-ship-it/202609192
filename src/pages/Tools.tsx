import React, { useState } from 'react';
import { MicroAppShell } from '../components/MicroAppShell/MicroAppShell';
import { APPLICATIONS } from '../data/applications';
import {
  Wrench,
  Sun,
  MapPin,
  Layers,
  Compass,
  Download,
  Calculator,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface ToolsProps {
  onNavigate: (route: string) => void;
}

export const Tools: React.FC<ToolsProps> = ({ onNavigate }) => {
  const app = APPLICATIONS.find((a) => a.id === 'tools')!;
  const [activeTool, setActiveTool] = useState<'solar' | 'contour' | 'remote' | 'sketch'>('solar');

  // 太阳高度角计算器参数
  const [latitude, setLatitude] = useState(32.06); // 南京纬度 32.06°N
  const [solarDeclination, setSolarDeclination] = useState(23.44); // 夏至 23.26° (23.44)
  const [calculatedHeight, setCalculatedHeight] = useState<number>(() => {
    // 正午太阳高度角公式: H = 90° - |φ - δ|
    return 90 - Math.abs(32.06 - 23.44);
  });

  const handleCalculateSolar = () => {
    const h = 90 - Math.abs(latitude - solarDeclination);
    setCalculatedHeight(Math.max(0, Math.min(90, parseFloat(h.toFixed(2)))));
  };

  // 等高线生成模拟
  const [contourInterval, setContourInterval] = useState(50);
  const [selectedTerrain, setSelectedTerrain] = useState('山顶与鞍部');

  return (
    <MicroAppShell app={app} onNavigate={onNavigate}>
      <div className="space-y-6">
        {/* Tool Sub-Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200/80">
          {[
            { id: 'solar', name: '正午太阳高度角精准测算器', icon: Sun },
            { id: 'contour', name: '等高线地形与剖面生成器', icon: Layers },
            { id: 'remote', name: '历史遥感影像智能比对分析', icon: Compass },
            { id: 'sketch', name: '地理板书板画矢量生成器', icon: Wrench }
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTool(t.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTool === t.id
                    ? 'bg-[#00C48C] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.name}</span>
              </button>
            );
          })}
        </div>

        {/* 1. Solar Height Calculator */}
        {activeTool === 'solar' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-emerald-50/40 rounded-3xl p-6 border border-emerald-200/70 space-y-5">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
                <Sun className="w-5 h-5 text-emerald-600" />
                <span>正午太阳高度角动态推演与楼间距计算</span>
              </div>
              <p className="text-xs text-slate-600">
                公式依据：<code className="bg-white px-2 py-0.5 rounded border border-emerald-200 text-emerald-800 font-mono font-bold">H = 90° - | 当地纬度(φ) - 太阳直射点纬度(δ) |</code>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    当地纬度 (°N 为正, °S 为负)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.01"
                      value={latitude}
                      onChange={(e) => setLatitude(parseFloat(e.target.value) || 0)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                    <span className="text-xs text-slate-500">°N</span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">南京：32.06°N，北京：39.9°N，海口：20.0°N</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    节气 / 太阳直射点纬度
                  </label>
                  <select
                    value={solarDeclination}
                    onChange={(e) => setSolarDeclination(parseFloat(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value={23.44}>夏至日 (北回归线 23.44°N)</option>
                    <option value={0}>春分日 / 秋分日 (赤道 0°)</option>
                    <option value={-23.44}>冬至日 (南回归线 23.44°S)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleCalculateSolar}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#00C48C] hover:bg-emerald-600 text-white font-semibold text-xs transition-colors cursor-pointer shadow-md shadow-emerald-500/20"
                >
                  <Calculator className="w-4 h-4" />
                  <span>测算正午太阳高度角</span>
                </button>
              </div>
            </div>

            {/* Result Display Box */}
            <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">计算结果推演</span>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-emerald-600 font-mono">
                    {calculatedHeight.toFixed(1)}°
                  </span>
                  <span className="text-xs text-slate-500 font-medium">正午太阳高度角 (H)</span>
                </div>

                <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1.5">
                  <div className="flex justify-between">
                    <span>所选地点纬度：</span>
                    <span className="font-semibold">{latitude}°N</span>
                  </div>
                  <div className="flex justify-between">
                    <span>太阳直射点：</span>
                    <span className="font-semibold">{solarDeclination >= 0 ? `${solarDeclination}°N` : `${Math.abs(solarDeclination)}°S`}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-1.5 font-bold text-slate-800">
                    <span>影长比 (cot H)：</span>
                    <span className="font-mono">
                      {calculatedHeight > 0
                        ? (1 / Math.tan((calculatedHeight * Math.PI) / 180)).toFixed(2)
                        : '极夜无影'}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-400">
                可直接作为随堂地理探究课件素材或楼间日照遮挡计算题目背景。
              </p>
            </div>
          </div>
        )}

        {/* 2. Contour Generator */}
        {activeTool === 'contour' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">三维地形转等高线与剖面线生成</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  设定等高距与地貌形态，自动生成对应的新课标判读试题图
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={selectedTerrain}
                  onChange={(e) => setSelectedTerrain(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                >
                  <option value="山顶与鞍部">地貌：山顶与鞍部</option>
                  <option value="陡崖与瀑布">地貌：陡崖与峡谷瀑布</option>
                  <option value="山脊与山谷">地貌：山脊分水岭与山谷集水线</option>
                </select>

                <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 cursor-pointer">
                  <Download className="w-3.5 h-3.5" />
                  <span>导出矢量图</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-4/3 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex flex-col items-center justify-center text-center p-6 border border-slate-700 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00C48C_1px,transparent_1px)] [background-size:16px_16px]" />
                <Layers className="w-16 h-16 text-emerald-400 mb-3 animate-pulse relative z-10" />
                <span className="text-sm font-bold text-white relative z-10">{selectedTerrain} 等高线剖面已实时渲染</span>
                <span className="text-xs text-slate-400 mt-1 relative z-10">等高距: {contourInterval}m · 比例尺 1:25,000</span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <h4 className="text-xs font-bold text-slate-800">等高线判读特征要点：</h4>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                    <li>凸高为低（山谷/集水线），凸低为高（山脊/分水岭）。</li>
                    <li>等高线重合处为陡崖，其相对高度公式为 <code className="bg-white px-1 font-mono">(n-1)d ≤ ΔH &lt; (n+1)d</code>。</li>
                    <li>等高线疏密代表坡度平缓与陡峭程度，密集处易发生滑坡崩塌。</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3 & 4. Other Tools */}
        {(activeTool === 'remote' || activeTool === 'sketch') && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs text-center space-y-4">
            <Sparkles className="w-10 h-10 text-emerald-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">
              {activeTool === 'remote' ? '遥感影像时空比对分析工具' : '地理板书板画矢量助手'}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              基于高分辨率卫星遥感与地理专用板画图库，支持一键载入太湖水华演变、鄱阳湖枯水期对比及课堂地理简图白板绘制。
            </p>
            <button
              onClick={() => setActiveTool('solar')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              返回太阳高度角工具
            </button>
          </div>
        )}
      </div>
    </MicroAppShell>
  );
};
