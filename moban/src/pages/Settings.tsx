import React, { useState } from 'react';
import { Settings as SettingsIcon, ArrowLeft, Moon, Bell, Monitor, Globe, Check } from 'lucide-react';

interface SettingsProps {
  onNavigate: (route: string) => void;
}

export const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  const [themeMode, setThemeMode] = useState('light');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [school, setSchool] = useState('南京师范大学附属中学 (地理教研组)');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-[calc(100vh-92px)] bg-[#F4F8FC] py-8 px-6 lg:px-12">
      <div className="w-full max-w-[1000px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <SettingsIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-slate-800">个人与系统设置</h1>
              <p className="text-xs text-slate-500 mt-0.5">教师账号偏好、微应用展示风格与备课空间配置</p>
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
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider text-slate-400">
              教师身份与学校信息
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  任教机构 / 所在中学
                </label>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-50/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  主修教材版本体系
                </label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-50/40">
                  <option>人教版 (新课标高中必修一/二)</option>
                  <option>中图版 (高中地理新课标)</option>
                  <option>湘教版 (高中地理新课标)</option>
                  <option>鲁教版 (高中地理新课标)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider text-slate-400">
              系统显示与交互设置
            </h2>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div>
                <div className="text-sm font-semibold text-slate-800">桌面端视觉模式</div>
                <div className="text-xs text-slate-400 mt-0.5">保持官方高品质清爽高校教育蓝白视觉主题</div>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-blue-100 text-blue-700 rounded-lg">
                科技蓝标准模式
              </span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div>
                <div className="text-sm font-semibold text-slate-800">微应用消息更新即时提示</div>
                <div className="text-xs text-slate-400 mt-0.5">当考点素材或新教学工具有版本更新时自动通知</div>
              </div>
              <button
                onClick={() => setSoundEnabled((prev) => !prev)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  soundEnabled ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    soundEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all shadow-xs cursor-pointer"
            >
              {saved && <Check className="w-4 h-4" />}
              <span>{saved ? '配置已保存' : '保存偏好配置'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
