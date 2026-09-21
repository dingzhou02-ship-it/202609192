import React from 'react';
import { HelpCircle, ArrowLeft, BookOpen, Sparkles, Layers, ShieldCheck } from 'lucide-react';

interface HelpProps {
  onNavigate: (route: string) => void;
}

export const Help: React.FC<HelpProps> = ({ onNavigate }) => {
  const faqList = [
    {
      q: '平台微应用适合哪些学段的地理教学？',
      a: '南师GeoAI智教云专为中学地理教师打造，全套微应用深度贴合《普通高中地理课程标准》与《初中地理课程标准》，涵盖初中七八年级及高中必修一、必修二和选择性必修模块。'
    },
    {
      q: '如何将生成的教案和导学案导出？',
      a: '在“AI课程生成器”或“AI辅助命题”界面，完成生成后可点击底部“导出 Word”或“导出课件大纲 (PPT)”，即可直接下载标准的教学文档。'
    },
    {
      q: '微应用如何进行后续拓展与自研模块接入？',
      a: '本平台采用“平台底座壳 + 微应用总线”规范架构，各开发小组只需根据规范遵循微应用挂载清单（Manifest）即可无缝挂载新微应用。'
    },
    {
      q: 'AI 对话助教的学科准确度如何保障？',
      a: '助教底层基于南京师范大学地理教育与地理信息学科特色知识图谱进行了专门的地理学概念约束与真题对齐微调，有效避免通用大模型的地理幻觉。'
    }
  ];

  return (
    <div className="min-h-[calc(100vh-92px)] bg-[#F4F8FC] py-8 px-6 lg:px-12">
      <div className="w-full max-w-[1100px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-slate-800">帮助中心</h1>
              <p className="text-xs text-slate-500 mt-0.5">常见问题指引、微应用使用指南与地理教育赋能说明</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回首页</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 lg:p-8 border border-blue-100/70 shadow-xs space-y-6">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>常见热点问题 (FAQ)</span>
          </h2>

          <div className="space-y-4">
            {faqList.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50/60 border border-slate-100">
                <h3 className="text-sm font-bold text-slate-800 flex items-start gap-2">
                  <span className="text-blue-600 font-black">Q{idx + 1}.</span>
                  <span>{item.q}</span>
                </h3>
                <p className="text-xs text-slate-600 mt-2 pl-6 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
