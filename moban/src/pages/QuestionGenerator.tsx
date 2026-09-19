import React, { useState } from 'react';
import { MicroAppShell } from '../components/MicroAppShell/MicroAppShell';
import { APPLICATIONS } from '../data/applications';
import { FileCheck, Sparkles, CheckCircle2, Sliders, RefreshCw } from 'lucide-react';

interface QuestionGeneratorProps {
  onNavigate: (route: string) => void;
}

export const QuestionGenerator: React.FC<QuestionGeneratorProps> = ({ onNavigate }) => {
  const app = APPLICATIONS.find((a) => a.id === 'question-generator')!;
  const [qType, setQType] = useState('综合题');
  const [difficulty, setDifficulty] = useState('中等 (0.55-0.65)');
  const [theme, setTheme] = useState('新疆阿勒泰地区“冰雪经济”与绿洲生态环境保护');
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <MicroAppShell app={app} onNavigate={onNavigate}>
      <div className="space-y-6">
        {/* Question Generation Criteria Form */}
        <div className="p-6 rounded-2xl bg-red-50/40 border border-red-200/70">
          <div className="flex items-center gap-2 text-red-800 font-bold text-base mb-4">
            <Sliders className="w-5 h-5 text-red-600" />
            <span>智能命题参数配置区</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                题型选择
              </label>
              <select
                value={qType}
                onChange={(e) => setQType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-red-500"
              >
                <option>综合大题 (主观题)</option>
                <option>单项选择题 (4选1)</option>
                <option>情境辨析题</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                预设难度系数
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-red-500"
              >
                <option>中等 (0.55-0.65 适中)</option>
                <option>基础 (0.75-0.85 巩固)</option>
                <option>拔高 (0.35-0.45 培优)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                真实情境素材关键词
              </label>
              <input
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                setIsGenerating(true);
                setTimeout(() => setIsGenerating(false), 500);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-all shadow-xs cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>依据新课标情境生成试题</span>
            </button>
          </div>
        </div>

        {/* Question Preview Box */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-red-600" />
              <span className="font-bold text-slate-800 text-base">
                【AI 原创命题预览】阅读图文材料，完成下列要求（共18分）
              </span>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-red-50 text-red-600 font-semibold">
              考查素养：综合思维 · 区域认知 · 人地协调观
            </span>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
            <p>
              <strong>材料：</strong>阿勒泰地区位于阿尔泰山南麓，水汽主要来自大西洋，冬季积雪深厚且雪期长达半年以上，素有“人类滑雪起源地”美誉。近年来，当地依托独特冰雪资源大力发展冰雪旅游与现代滑雪场建设。但生态环境脆弱，春季积雪融化易发生融雪型洪水，土地荒漠化潜在风险较高。
            </p>

            <div className="space-y-2 pt-2">
              <p><strong>(1)</strong> 从大气环流与地形地貌角度，简析阿尔泰山南麓冬季降雪丰沛的气象地理机制。（6分）</p>
              <p><strong>(2)</strong> 分析阿勒泰大规模滑雪场建设对当地水土保持及植被覆盖可能产生的潜在不利影响。（6分）</p>
              <p><strong>(3)</strong> 针对当地“绿水青山就是金山银山，冰天雪地也是金山银山”发展理念，提出两项冰雪经济可持续发展的生态协同对策。（6分）</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-xs space-y-1.5">
            <div className="font-bold text-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>智能评分参考细则与答题要点</span>
            </div>
            <p className="text-slate-600">
              第(1)小问踩分点：西风带输送大西洋湿润水汽（2分）；受阿尔泰山脉西北-东南走向的抬升阻挡（2分）；产生地形雨/雪并在逆温层下利于积雪保存（2分）。
            </p>
          </div>
        </div>
      </div>
    </MicroAppShell>
  );
};
