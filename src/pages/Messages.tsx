import React, { useState } from 'react';
import {
  Bell,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookOpen,
  Calendar,
  CheckCheck,
  Trash2
} from 'lucide-react';

interface MessagesProps {
  onNavigate: (route: string) => void;
}

interface MessageItem {
  id: string;
  type: 'system' | 'course' | 'research';
  title: string;
  content: string;
  time: string;
  isRead: boolean;
  tag: string;
}

export const Messages: React.FC<MessagesProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'system' | 'course'>('all');
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'msg-1',
      type: 'course',
      title: '教案生成任务已完成',
      content: '您请求的《常见天气系统——锋与天气》大单元教案与配套导学案已自动生成完毕，可在课程生成器中预览或导出。',
      time: '10分钟前',
      isRead: false,
      tag: '智能备课'
    },
    {
      id: 'msg-2',
      type: 'system',
      title: '南师GeoAI智教云平台升级公告 (v2.0)',
      content: '本周平台完成微应用总线全新升级，新增独立微应用标准化接入框架，支持各开发团队微应用跨域隔离与无缝预览。',
      time: '2小时前',
      isRead: false,
      tag: '系统更新'
    },
    {
      id: 'msg-3',
      type: 'research',
      title: '高三一模地理综合题智能解析报告已就绪',
      content: 'AI辅助命题系统已完成最新江浙沪名校联考试卷分析，提供难度辨析度预估与细目表核心素养对齐数据。',
      time: '昨天 15:30',
      isRead: true,
      tag: '精准测评'
    },
    {
      id: 'msg-4',
      type: 'course',
      title: '虚拟实验模拟参数已重置就绪',
      content: '大气热力环流三维仿真沙盘已支持最新WebGPU加速通道，渲染流畅度提升40%，适合多媒体大屏教学。',
      time: '3天前',
      isRead: true,
      tag: '虚拟仿真'
    }
  ]);

  const markAllAsRead = () => {
    setMessages((prev) => prev.map((m) => ({ ...m, isRead: true })));
  };

  const clearReadMessages = () => {
    setMessages((prev) => prev.filter((m) => !m.isRead));
  };

  const toggleRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isRead: !m.isRead } : m))
    );
  };

  const filteredMessages = messages.filter((m) => {
    if (activeFilter === 'unread') return !m.isRead;
    if (activeFilter === 'system') return m.type === 'system';
    if (activeFilter === 'course') return m.type === 'course';
    return true;
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="min-h-[calc(100vh-92px)] bg-[#F4F8FC] py-8 px-6 lg:px-12">
      <div className="w-full max-w-[1000px] mx-auto space-y-6">
        {/* Page Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-slate-800">消息中心</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                教研备课进度、微应用运行动态与系统通知
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-all cursor-pointer shadow-xs"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>全部设为已读</span>
            </button>
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-all cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>返回首页</span>
            </button>
          </div>
        </div>

        {/* Message Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
          {[
            { key: 'all', label: '全部消息', count: messages.length },
            { key: 'unread', label: '未读', count: unreadCount },
            { key: 'course', label: '备课生成', count: messages.filter((m) => m.type === 'course').length },
            { key: 'system', label: '平台公告', count: messages.filter((m) => m.type === 'system').length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilter === tab.key
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeFilter === tab.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Message List */}
        <div className="space-y-3">
          {filteredMessages.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Bell className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-700">暂无消息通知</h4>
              <p className="text-xs text-slate-400 mt-1">这里暂时没有符合筛选条件的新动态</p>
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => toggleRead(msg.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative ${
                  msg.isRead
                    ? 'bg-white/80 border-slate-200/70 text-slate-600'
                    : 'bg-white border-blue-200 shadow-xs ring-1 ring-blue-100'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      {!msg.isRead && (
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                      )}
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 border border-blue-100">
                        {msg.tag}
                      </span>
                      <h3 className={`text-sm font-bold ${msg.isRead ? 'text-slate-700' : 'text-slate-900'}`}>
                        {msg.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed pl-4">
                      {msg.content}
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-400 shrink-0 mt-0.5">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
