import React, { useState } from 'react';
import { MicroAppShell } from '../components/MicroAppShell/MicroAppShell';
import { APPLICATIONS } from '../data/applications';
import { Sparkles, FileSpreadsheet, Presentation, BookOpenCheck, Copy, Check } from 'lucide-react';

interface CourseGeneratorProps {
  onNavigate: (route: string) => void;
}

export const CourseGenerator: React.FC<CourseGeneratorProps> = ({ onNavigate }) => {
  const app = APPLICATIONS.find((a) => a.id === 'course-generator')!;
  const [topic, setTopic] = useState('常见天气系统——锋与天气（冷锋与暖锋）');
  const [grade, setGrade] = useState('高中必修一');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [generatedOutline, setGeneratedOutline] = useState([
    { stage: '环节一：情境导入', duration: '5分钟', content: '播放中央气象台寒潮降温预警视频，引导学生思考天气剧烈变化背后的气团运动规律。' },
    { stage: '环节二：原理探究', duration: '15分钟', content: '动画演示冷气团主动向暖气团移动过程，学生分组标绘锋面降水区域与过境前、过境时、过境后气温气压变化。' },
    { stage: '环节三：案例辨析', duration: '12分钟', content: '结合我国北方冬春季沙尘暴与江淮地区梅雨天气案例，对比冷锋与准静止锋形成机制。' },
    { stage: '环节四：素养达成', duration: '8分钟', content: '完成基于真实卫星云图的随堂锋线判读学案，达成区域认知与综合思维素养目标。' },
  ]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedOutline([
        { stage: '环节一：情境导入', duration: '5分钟', content: `基于《${topic}》课标要求，展示真实遥感与地面实况影像，激活学生已有经验。` },
        { stage: '环节二：核心概念建构', duration: '15分钟', content: `引导学生运用综合思维，建构地理要素在空间与时间维度的相互作用机制模型。` },
        { stage: '环节三：合作探究与实践', duration: '15分钟', content: `结合图表分析与小组协作，完成真实地理情境问题的归纳与推演。` },
        { stage: '环节四：总结反思与迁移', duration: '5分钟', content: `总结规律，引导人地协调观与家国情怀素养的自然升华。` },
      ]);
    }, 600);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MicroAppShell app={app} onNavigate={onNavigate}>
      <div className="space-y-6">
        {/* Course Generation Configuration Panel */}
        <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/70">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-base mb-4">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span>智能教案与课件大纲生成器</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                教学课题 / 课标内容点
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-amber-500 shadow-xs"
                placeholder="例如：常见天气系统——锋与天气"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                学段年级
              </label>
              <div className="flex gap-2">
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-amber-500 shadow-xs"
                >
                  <option>高中必修一</option>
                  <option>高中必修二</option>
                  <option>高中选择性必修一</option>
                  <option>初中地理七年级</option>
                  <option>初中地理八年级</option>
                </select>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-all whitespace-nowrap cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {isGenerating ? '生成中...' : '生成大纲'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Generated Lesson Plan View */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <BookOpenCheck className="w-5 h-5 text-amber-500" />
                <span>【智能教案生成预览】{topic}（{grade}）</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                已自动对齐《普通高中地理课程标准》核心素养维度（人地协调观、综合思维、区域认知、地理实践力）
              </p>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '已复制大纲' : '复制大纲'}</span>
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {generatedOutline.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                <div className="w-28 flex-shrink-0">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                    {item.stage}
                  </span>
                  <div className="text-[11px] text-slate-400 mt-1">耗时: {item.duration}</div>
                </div>
                <div className="flex-1 text-xs text-slate-600 leading-relaxed">
                  {item.content}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50">
              <Presentation className="w-4 h-4 text-amber-600" />
              <span>导出配套课件大纲 (PPT)</span>
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs">
              <FileSpreadsheet className="w-4 h-4" />
              <span>一键生成随堂导学案 (Word)</span>
            </button>
          </div>
        </div>
      </div>
    </MicroAppShell>
  );
};
