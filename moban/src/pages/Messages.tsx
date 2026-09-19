import React from 'react';
import { Bell, ArrowLeft, CheckCircle2, Clock } from 'lucide-react';

interface MessagesProps {
  onNavigate: (route: string) => void;
}

export const Messages: React.FC<MessagesProps> = ({ onNavigate }) => {
  const notifications = [
    {
      id: 1,
      title: '【系统通知】2026年高考地理新课标命题情境素材库已更新',
      time: '10分钟前',
      unread: true,
      desc: '新增关于“深中通道通车区域效应”、“塔克拉玛干沙漠锁边工程”等6组高中地理综合大题真实情境案例。'
    },
    {
      id: 2,
      title: '【教研动态】南师大地理科学学院专家在线备课研讨会预约开启',
      time: '昨天 15:30',
      unread: false,
      desc: '本周五晚将举行“GeoAI技术在高中自然地理难点教学中的实践应用”专题教研交流。'
    },
    {
      id: 3,
      title: '【微应用发布】AI课堂教学评价系统 v2.0 正式上线测试',
      time: '3天前',
      unread: false,
      desc: '现已全面开放地理高阶思维提问识别算法与生生探究互动时序分析功能，欢迎教师体验使用。'
    }
  ];

  return (
    <div className="min-h-[calc(100vh-92px)] bg-[#F4F8FC] py-8 px-6 lg:px-12">
      <div className="w-full max-w-[1200px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-slate-800">消息中心</h1>
              <p className="text-xs text-slate-500 mt-0.5">平台系统公告、备课教研动态与微应用更新提醒</p>
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

        <div className="bg-white rounded-3xl p-6 border border-blue-100/70 shadow-xs space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-5 rounded-2xl border transition-all ${
                n.unread ? 'bg-blue-50/40 border-blue-200' : 'bg-white border-slate-100 hover:border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  {n.unread && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                  <h3 className="text-sm font-bold text-slate-800">{n.title}</h3>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400 whitespace-nowrap">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{n.time}</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed pl-4">
                {n.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
