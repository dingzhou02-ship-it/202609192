import React, { useState } from 'react';
import { MicroAppShell } from '../components/MicroAppShell/MicroAppShell';
import { APPLICATIONS } from '../data/applications';
import {
  FileCheck,
  Sparkles,
  Copy,
  Check,
  Download,
  BookOpen,
  HelpCircle,
  BarChart2,
  RefreshCw
} from 'lucide-react';

interface QuestionGeneratorProps {
  onNavigate: (route: string) => void;
}

export const QuestionGenerator: React.FC<QuestionGeneratorProps> = ({ onNavigate }) => {
  const app = APPLICATIONS.find((a) => a.id === 'question-generator')!;
  const [contextTopic, setContextTopic] = useState('新疆南疆塔里木盆地“光伏治沙”与新型农牧业协同发展');
  const [questionType, setQuestionType] = useState('综合题（大题）');
  const [difficulty, setDifficulty] = useState('中等 (0.55~0.65)');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const [generatedQuestion, setGeneratedQuestion] = useState({
    title: '阅读图文材料，完成下列要求。(14分)',
    background: '近年来，新疆塔里木盆地南缘在推进光伏治沙工程中，首创“板上双玻发电、板间生态种植、板下特色养殖”的立体循环模式。光伏组件遮光率达40%，使地表风速降低50%以上，土壤水分蒸发量显著减少。',
    subQuestions: [
      {
        no: '(1)',
        q: '从区域自然地理环境特征角度，分析塔里木盆地南缘太阳能资源丰富的核心原因。(4分)',
        answer: '深居内陆，远离海洋，水汽难以到达；终年受温带大陆性气候控制，晴天多、降水稀少；日照时数长；空气稀薄干燥，大气对太阳辐射的削弱作用弱。(每点1分，答满4分)'
      },
      {
        no: '(2)',
        q: '结合水循环与微气候原理，说明光伏板铺设对板下土壤水分蒸发减少的作用机制。(6分)',
        answer: '光伏板遮挡太阳直射光，降低地表受热量与地表温度，减少蒸发动能(2分)；光伏板增加地表粗糙度，显著削减近地面风速，降低空气流动对水分的抽吸作用(2分)；板面夜间利于空气中微量水汽冷凝并滴落板下土壤，补充表层水分(2分)。'
      },
      {
        no: '(3)',
        q: '简述该“立体循环模式”对实现当地“人地协调观”素养培养的现实价值。(4分)',
        answer: '将荒漠化防治与清洁能源开发、特色农牧业有机结合，既改善了脆弱生态，又促进了农牧民增收，实现了生态效益、经济效益与社会效益的协同统一。(答出生态改善得2分，经济或社会效益得2分)'
      }
    ],
    competencies: ['区域认知 (高)', '综合思维 (极高)', '人地协调观 (高)']
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedQuestion({
        title: `阅读图文材料，完成下列要求。(14分)`,
        background: `围绕【${contextTopic}】命制试题：材料聚焦该典型区域人地关系变迁与地理要素综合作用。`,
        subQuestions: [
          {
            no: '(1)',
            q: `说明该区域实施【${contextTopic.slice(0, 15)}】所依托的独特优势区位条件。(4分)`,
            answer: '区位自然本底优越；政策支持与绿色技术支撑；契合绿色可持续发展战略。(共4分)'
          },
          {
            no: '(2)',
            q: `运用地理综合思维，推演该举措对当地水土要素及局地微气候产生的积极联动效应。(6分)`,
            answer: '减缓地表风蚀；增加下渗与持水能力；改善植被覆盖，调节气温日较差。(共6分)'
          },
          {
            no: '(3)',
            q: `针对该模式在西北干旱半干旱区的规模化推广，提出两项合理的因地制宜防范建议。(4分)`,
            answer: '合理测算水资源承载力，避免过度取水；因地制宜选择耐旱本土灌木草种。(共4分)'
          }
        ],
        competencies: ['区域认知', '综合思维', '地理实践力']
      });
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${generatedQuestion.title}\n${generatedQuestion.background}\n` +
      generatedQuestion.subQuestions.map(sq => `${sq.no} ${sq.q}\n【参考答案】${sq.answer}`).join('\n')
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MicroAppShell app={app} onNavigate={onNavigate}>
      <div className="space-y-6">
        {/* Question Generation Configuration */}
        <div className="p-6 rounded-3xl bg-red-50/50 border border-red-200/70 space-y-4">
          <div className="flex items-center gap-2 text-red-900 font-bold text-base">
            <Sparkles className="w-5 h-5 text-red-600" />
            <span>新课标情境化地理命题工作台</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                真实情境热点素材 / 命题主题
              </label>
              <input
                type="text"
                value={contextTopic}
                onChange={(e) => setContextTopic(e.target.value)}
                placeholder="例如：雅鲁藏布江下游大峡谷水汽通道变化"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                试题类型
              </label>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-red-500"
              >
                <option value="综合题（大题）">新高考综合主观题 (12-16分)</option>
                <option value="情境选择题组">单题多问情境选择题组 (3道)</option>
                <option value="实验探究题">地理综合实践与仿真探究题</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                预估难度系数
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-red-500"
              >
                <option value="中等 (0.55~0.65)">中等压轴题 (0.55~0.65)</option>
                <option value="基础 (0.70~0.85)">基础达标题 (0.70~0.85)</option>
                <option value="高难 (0.35~0.45)">拔高培优题 (0.35~0.45)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#FF4D4F] hover:bg-red-600 text-white font-semibold text-xs transition-colors cursor-pointer shadow-md shadow-red-500/20 disabled:opacity-50"
            >
              {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isGenerating ? 'AI精准命题中...' : '生成原创试题与细目表'}</span>
            </button>
          </div>
        </div>

        {/* Generated Question Paper Card */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 border border-red-100 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
                  高考模拟·原创预测
                </span>
                <span className="text-xs text-slate-400">预估难度: {difficulty}</span>
              </div>
              <h3 className="text-base font-bold text-slate-800 mt-2">
                {generatedQuestion.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '已复制试卷' : '复制试卷'}</span>
              </button>

              <button
                className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>导出 Word 试卷</span>
              </button>
            </div>
          </div>

          {/* Context Background */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed font-serif">
            {generatedQuestion.background}
          </div>

          {/* Sub-Questions & Mark Scheme */}
          <div className="space-y-4">
            {generatedQuestion.subQuestions.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-100 bg-white space-y-2.5 shadow-2xs">
                <p className="text-xs font-bold text-slate-800">
                  {item.no} {item.q}
                </p>
                <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/50 text-[11px] text-emerald-900 leading-relaxed">
                  <span className="font-bold text-emerald-700">【参考答案与评分细则】</span>
                  <p className="mt-1">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Core Competencies Tagging */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500">考查素养：</span>
            {generatedQuestion.competencies.map((comp, idx) => (
              <span key={idx} className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                {comp}
              </span>
            ))}
          </div>
        </div>
      </div>
    </MicroAppShell>
  );
};
