import React, { useState } from 'react';
import { MicroAppShell } from '../components/MicroAppShell/MicroAppShell';
import { APPLICATIONS } from '../data/applications';
import { TrendingUp, BarChart3, Clock, MessageSquare, Award, CheckCircle } from 'lucide-react';

interface ClassroomEvaluationProps {
  onNavigate: (route: string) => void;
}

export const ClassroomEvaluation: React.FC<ClassroomEvaluationProps> = ({ onNavigate }) => {
  const app = APPLICATIONS.find((a) => a.id === 'classroom-evaluation')!;
  const [selectedLesson, setSelectedLesson] = useState('高一地理《大气的受热过程》研讨课');

  return (
    <MicroAppShell app={app} onNavigate={onNavigate}>
      <div className="space-y-6">
        {/* Evaluation Summary Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
            <div className="text-xs font-semibold text-slate-500">课堂综合评价得分</div>
            <div className="text-3xl font-black text-blue-600 mt-2 font-sans">92.8 <span className="text-xs font-normal text-slate-500">/ 100</span></div>
            <div className="text-xs text-blue-700 mt-1 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>等级: 优秀公开展示课</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-semibold text-slate-500">师生话语互动时长比</div>
            <div className="text-3xl font-black text-slate-800 mt-2 font-sans">48 : 52</div>
            <div className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>生生与师生探究占比优良</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-semibold text-slate-500">地理高阶思维提问数</div>
            <div className="text-3xl font-black text-slate-800 mt-2 font-sans">14 <span className="text-xs font-normal text-slate-500">次</span></div>
            <div className="text-xs text-blue-600 mt-1">包含“分析成因”与“推演规律”</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-semibold text-slate-500">课标素养目标达成度</div>
            <div className="text-3xl font-black text-emerald-600 mt-2 font-sans">94.5%</div>
            <div className="text-xs text-slate-500 mt-1">基于课后随堂练习即时反馈</div>
          </div>
        </div>

        {/* Timeline Interaction Analysis Chart Representation */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span>40分钟地理课堂互动时序轨迹多维分析</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">当前分析课例：{selectedLesson}</p>
            </div>

            <span className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">
              视频多模态感知已就绪
            </span>
          </div>

          <div className="mt-6 space-y-3">
            <div className="text-xs font-medium text-slate-500 flex justify-between">
              <span>0-10min (生活情境激活)</span>
              <span>10-25min (大气削弱与保温原理解构)</span>
              <span>25-35min (农业霜冻防控实践探究)</span>
              <span>35-40min (检测与评价)</span>
            </div>

            {/* Visual Color-coded timeline bar */}
            <div className="h-6 w-full rounded-xl overflow-hidden flex shadow-inner">
              <div className="w-[25%] bg-amber-400 h-full flex items-center justify-center text-[10px] text-white font-bold" title="教师情境讲授">
                讲授 25%
              </div>
              <div className="w-[40%] bg-blue-500 h-full flex items-center justify-center text-[10px] text-white font-bold" title="小组实验探究">
                学生探究互动 40%
              </div>
              <div className="w-[20%] bg-emerald-500 h-full flex items-center justify-center text-[10px] text-white font-bold" title="学生成果展示">
                展示展示 20%
              </div>
              <div className="w-[15%] bg-purple-500 h-full flex items-center justify-center text-[10px] text-white font-bold" title="智能随堂测评">
                素养测评 15%
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-slate-700 leading-relaxed space-y-1.5">
            <div className="font-bold text-blue-900">AI 教研诊断建议：</div>
            <p>1. 本节课在引导学生探究“温室大棚保温原理与大气受热对应关系”时提问梯度优异，层层递进；</p>
            <p>2. 建议在第 28 分钟针对“地面辐射与大气逆辐射波长差异”预留多 1 分钟让后进生深入思考交流。</p>
          </div>
        </div>
      </div>
    </MicroAppShell>
  );
};
