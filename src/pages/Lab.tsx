import React, { useState } from 'react';
import { MicroAppShell } from '../components/MicroAppShell/MicroAppShell';
import { APPLICATIONS } from '../data/applications';
import { FlaskConical, Play, RotateCcw, Eye, Compass, Wind } from 'lucide-react';

interface LabProps {
  onNavigate: (route: string) => void;
}

export const Lab: React.FC<LabProps> = ({ onNavigate }) => {
  const app = APPLICATIONS.find((a) => a.id === 'lab')!;
  const [activeExperiment, setActiveExperiment] = useState('大气热力环流沙盘模拟');
  const [heatIntensity, setHeatIntensity] = useState(65);
  const [isRunning, setIsRunning] = useState(true);

  const experimentList = [
    { title: '大气热力环流沙盘模拟', desc: '模拟受热不均引起的空气垂直升降与同一水平面气压差异、水平风向。', status: '支持三维交互' },
    { title: '水循环与流域地表径流演变', desc: '调整降水强度与植被覆盖度，动态观察地表下渗、径流集水时间曲线。', status: '支持沙盘推演' },
    { title: '构造地貌与断层褶皱动态成因', desc: '水平挤压力与张力作用下岩层受力弯曲（背斜/向斜）与断裂错位实验。', status: '支持断裂切片' },
    { title: '河流侵蚀与堆积地貌（冲积扇/三角洲）', desc: '流水搬运能力与流速梯度物理仿真，探究颗粒沉积物分选规律。', status: '支持多参实验' }
  ];

  return (
    <MicroAppShell app={app} onNavigate={onNavigate}>
      <div className="space-y-6">
        {/* Lab Virtual Sandbox Screen */}
        <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 overflow-hidden border border-cyan-500/30 shadow-xl">
          {/* Top Control Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between pb-4 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="font-bold text-lg text-cyan-200">
                {activeExperiment}
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                WebGPU / 仿真引擎就绪
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsRunning((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  isRunning
                    ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isRunning ? '模拟运行中' : '暂停'}</span>
              </button>

              <button
                onClick={() => setHeatIntensity(50)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-white hover:bg-white/20 text-xs font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>重置参数</span>
              </button>
            </div>
          </div>

          {/* Virtual Visual Stage Simulation Representation */}
          <div className="relative z-10 my-6 h-[260px] rounded-xl bg-slate-950/60 border border-cyan-500/20 flex flex-col items-center justify-between p-6">
            {/* Air flow particle simulation cues */}
            <div className="w-full flex justify-between px-12 text-xs font-mono text-cyan-400">
              <div className="flex flex-col items-center">
                <span>高空气压: 高压 (H)</span>
                <span className="text-[10px] text-slate-400">水平气流向冷区流动 →</span>
              </div>
              <div className="flex flex-col items-center">
                <span>高空气压: 低压 (L)</span>
                <span className="text-[10px] text-slate-400">← 水平气压梯度力驱动</span>
              </div>
            </div>

            {/* Visual Streamlines */}
            <div className="relative w-full max-w-[480px] h-[120px] border-2 border-dashed border-cyan-400/40 rounded-3xl flex items-center justify-center">
              <div className="absolute left-6 bottom-4 flex flex-col items-center">
                <span className="text-red-400 text-xs font-bold animate-bounce">▲ 热气流上升</span>
                <span className="text-[11px] text-slate-400 mt-1">加热点 (近地面低压)</span>
              </div>

              <div className="text-center">
                <Wind className="w-10 h-10 text-cyan-300 mx-auto animate-pulse" />
                <span className="text-xs text-cyan-200 mt-1 block">环流闭合对流运动</span>
              </div>

              <div className="absolute right-6 top-4 flex flex-col items-center">
                <span className="text-blue-400 text-xs font-bold animate-bounce">▼ 冷气流下沉</span>
                <span className="text-[11px] text-slate-400 mt-1">冷却点 (近地面高压)</span>
              </div>
            </div>

            {/* Bottom Ground Surface */}
            <div className="w-full flex justify-between px-12 text-xs font-mono">
              <span className="text-red-300">受热区（地面受热膨胀上升）</span>
              <span className="text-cyan-300">近地面风向：← 由冷源吹向热源</span>
              <span className="text-blue-300">冷却区（冷缩下沉形成高压）</span>
            </div>
          </div>

          {/* Interactive Sliders */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="flex justify-between mb-1.5">
                <span className="text-slate-300">热源加热温差强度 (°C)</span>
                <span className="text-cyan-400 font-bold">{heatIntensity}°C</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={heatIntensity}
                onChange={(e) => setHeatIntensity(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
              <span className="text-slate-300">地转偏向力影响因子 (纬度):</span>
              <span className="text-cyan-400 font-mono font-bold">北半球 35°N (向右偏转)</span>
            </div>
          </div>
        </div>

        {/* Available Experiments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {experimentList.map((exp, idx) => (
            <div
              key={idx}
              onClick={() => setActiveExperiment(exp.title)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activeExperiment === exp.title
                  ? 'border-cyan-500 bg-cyan-50/40 shadow-sm'
                  : 'border-slate-100 bg-white hover:border-cyan-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-cyan-600" />
                  <span>{exp.title}</span>
                </h4>
                <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-medium">
                  {exp.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                {exp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </MicroAppShell>
  );
};
