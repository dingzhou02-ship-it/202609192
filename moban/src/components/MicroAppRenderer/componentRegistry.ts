import React from 'react';
import { Tools } from '../../pages/Tools';
import { CourseGenerator } from '../../pages/CourseGenerator';
import { AIAssistant } from '../../pages/AIAssistant';
import { QuestionGenerator } from '../../pages/QuestionGenerator';
import { ClassroomEvaluation } from '../../pages/ClassroomEvaluation';
import { Lab } from '../../pages/Lab';
import { Knowledge } from '../../pages/Knowledge';

/**
 * 本地微应用原型组件注册表
 * 用于：
 * 1. integrationType === "component" 时的组件挂载
 * 2. integrationType === "iframe" 时供教师预览本地模拟原型
 */
export const LOCAL_MICROAPP_COMPONENTS: Record<
  string,
  React.ComponentType<{ onNavigate: (route: string) => void }>
> = {
  knowledge: Knowledge,
  tools: Tools,
  'course-generator': CourseGenerator,
  'ai-assistant': AIAssistant,
  'question-generator': QuestionGenerator,
  'classroom-evaluation': ClassroomEvaluation,
  lab: Lab
};

export function getLocalMicroAppComponent(
  appId: string
): React.ComponentType<{ onNavigate: (route: string) => void }> | undefined {
  return LOCAL_MICROAPP_COMPONENTS[appId];
}
