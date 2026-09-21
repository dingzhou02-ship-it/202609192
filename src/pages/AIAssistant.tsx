import React, { useState } from 'react';
import { MicroAppShell } from '../components/MicroAppShell/MicroAppShell';
import { APPLICATIONS } from '../data/applications';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface AIAssistantProps {
  onNavigate: (route: string) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ onNavigate }) => {
  const app = APPLICATIONS.find((a) => a.id === 'ai-assistant')!;
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: '您好！我是南师GeoAI学科对话助教。我可以协助您解析高考地理压轴题、梳理地貌成因逻辑链条、提供课堂探究问题设计灵感，请问今天想探讨哪个地理主题？'
    },
    {
      role: 'user',
      text: '请帮我梳理：南亚季风在夏季和冬季的形成机制有何不同？如何向学生做启发式提问？'
    },
    {
      role: 'ai',
      text: `针对南亚季风的成因差异，建议采用“海陆热力性质差异 + 气压带风带季节性移动”双驱动对比法：

1. **冬季风（东北季风）**：主要由海陆热力性质差异驱动。亚洲大陆内陆降温快形成高压，海洋形成低压，风从内陆吹向海洋。
2. **夏季风（西南季风）**：不仅受海陆温差影响，核心是**南半球东南信风越过赤道，受地转偏向力右偏**形成西南季风，给南亚带来丰沛降水。

💡 **启发式课堂追问示例**：
- “请大家观察7月份赤道低气压带的位置，为什么它会大幅北移并跨过南亚次大陆？”
- “如果青藏高原不存在，南亚西南季风的降水量和推进速度会发生什么改变？”`
    }
  ]);

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    const userText = inputMessage;
    setInputMessage('');
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: `针对您提出的“${userText}”，从地理学科核心素养分析：
1. **空间认知维度**：建议结合等温线与纬度、洋流空间叠加图进行解构。
2. **综合思维维度**：关注“气候-水文-地貌-生物-土壤”五大自然地理要素的牵一发而动全身效应。
需要我为您生成相关的随堂思考小练习吗？`
        }
      ]);
    }, 600);
  };

  const sampleQuestions = [
    '黄土高原水土流失的自然原因与人为原因综合分析框架',
    '如何用通俗语言解释“厄尔尼诺与拉尼娜”现象对我国汛期的影响？',
    '设计一堂关于“城市化对城市微气候影响”的探究课问题链'
  ];

  return (
    <MicroAppShell app={app} onNavigate={onNavigate}>
      <div className="flex flex-col h-[520px] bg-white rounded-2xl border border-purple-100 overflow-hidden">
        {/* Chat History Box */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/40">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-xs ${
                  msg.role === 'user' ? 'bg-slate-700' : 'bg-purple-600'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[78%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-purple-600 text-white rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-slate-200/70 shadow-xs rounded-tl-xs'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-5 py-2.5 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 flex items-center gap-1 flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            推荐提问:
          </span>
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setInputMessage(q)}
              className="px-2.5 py-1 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 text-[11px] whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Input Box */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="输入您在地理备课、学生答疑或考点阐释中的任何问题..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500 bg-slate-50/50"
          />

          <button
            onClick={handleSend}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-1.5 text-sm font-medium transition-colors shadow-xs cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>发送</span>
          </button>
        </div>
      </div>
    </MicroAppShell>
  );
};
