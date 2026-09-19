import React, { useState } from 'react';
import { MessageSquare, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

interface FeedbackProps {
  onNavigate: (route: string) => void;
}

export const Feedback: React.FC<FeedbackProps> = ({ onNavigate }) => {
  const [feedbackType, setFeedbackType] = useState('微应用功能建议');
  const [content, setContent] = useState('');
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setContent('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-[calc(100vh-92px)] bg-[#F4F8FC] py-8 px-6 lg:px-12">
      <div className="w-full max-w-[900px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-slate-800">反馈中心</h1>
              <p className="text-xs text-slate-500 mt-0.5">欢迎对南师GeoAI智教云提出宝贵意见，助力地理教学创新</p>
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

        <div className="bg-white rounded-3xl p-6 lg:p-8 border border-blue-100/70 shadow-xs">
          {submitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              <h3 className="text-lg font-bold text-slate-800">反馈已成功送达！</h3>
              <p className="text-xs text-slate-500 max-w-sm">
                感谢您对南师GeoAI智教云平台的支持与建议。教研技术支持团队将认真评估并持续迭代。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  反馈类型
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {['微应用功能建议', '地理学科资源补全', '试题命题算法优化', '界面与交互优化'].map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setFeedbackType(t)}
                      className={`p-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                        feedbackType === t
                          ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  反馈详细内容与具体情境
                </label>
                <textarea
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="请详细描述您在高中地理备课、授课或评价过程中遇到的问题或改进建议..."
                  className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-50/40"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  联系方式（选填，邮箱或手机号，便于教研人员回访）
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="例如：teacher@nnu.edu.cn"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-50/40"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all shadow-xs cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>提交反馈</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
