import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  ArrowLeft,
  User,
  School,
  GraduationCap,
  Save,
  CheckCircle2,
  Sliders,
  Bell,
  Shield,
  Palette
} from 'lucide-react';

interface SettingsProps {
  onNavigate: (route: string) => void;
}

export const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  const [teacherName, setTeacherName] = useState('张明华 老师');
  const [school, setSchool] = useState('南京师范大学附属实验中学');
  const [grade, setGrade] = useState('高一年级');
  const [standard, setStandard] = useState('普通高中地理课程标准 (2017版2020修订)');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-[calc(100vh-92px)] bg-[#F4F8FC] py-8 px-6 lg:px-12">
      <div className="w-full max-w-[900px] mx-auto space-y-6">
        {/* Page Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <SettingsIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-slate-800">系统设置</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                教师教研偏好、学段设定与大模型备课配置
              </p>
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

        {/* Settings Form Card */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 border border-blue-100/70 shadow-xs space-y-6">
          <form onSubmit={handleSave} className="space-y-6">
            {/* 1. Teacher Profile Section */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                <User className="w-4 h-4 text-blue-600" />
                <span>教师个人与教研室资料</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    教师姓名 / 昵称
                  </label>
                  <input
                    type="text"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-sm bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    所在单位 / 附属教研基地
                  </label>
                  <input
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-sm bg-slate-50/50"
                  />
                </div>
              </div>
            </div>

            {/* 2. Teaching Standard Preference */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>默认备课学段与课标标准</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    常驻学段
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-sm bg-slate-50/50"
                  >
                    <option value="初中七年级">初中七年级（地球与地图/世界地理）</option>
                    <option value="初中八年级">初中八年级（中国地理）</option>
                    <option value="高中必修一">高中必修一（自然地理基础与演化）</option>
                    <option value="高中必修二">高中必修二（人文地理与城镇化）</option>
                    <option value="选择性必修一">选择性必修一（自然地理原理综合）</option>
                    <option value="高三年级总复习">高三年级高考总复习与真题专题</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    课程标准依据
                  </label>
                  <input
                    type="text"
                    value={standard}
                    onChange={(e) => setStandard(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-sm bg-slate-50/50"
                  />
                </div>
              </div>
            </div>

            {/* 3. GeoAI Core Engine Preference */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Sliders className="w-4 h-4 text-blue-600" />
                <span>GeoAI 学科大模型生成策略</span>
              </h2>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-800">真实情境与高考试题关联度优先</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      命题与课程生成时，优先检索近三年高考真题及全国卷地理学科核心考点图谱
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-blue-200/40">
                  <div>
                    <span className="text-xs font-bold text-slate-800">大屏教学与三维虚拟沙盘 WebGPU 加速</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      在 AI 实验室模块中默认启用硬件加速动态物理流体仿真
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center gap-4 pt-3">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-md shadow-blue-500/20"
              >
                <Save className="w-4 h-4" />
                <span>保存个性化设置</span>
              </button>

              {saved && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>设置已成功保存！</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
