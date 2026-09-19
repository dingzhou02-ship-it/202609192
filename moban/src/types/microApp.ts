import React from 'react';

/**
 * GeoAI 微应用接入清单规范
 * 支持两种接入方式：
 * 1. component: 直接挂载主工程中的 React 组件
 * 2. iframe: 独立微应用通过 URL 嵌入接入
 */
export interface GeoAIMicroAppManifest {
  appId: string;
  displayName: string;
  version: string;
  routePrefix: string;

  integrationType: "component" | "iframe";

  entryComponent?: React.ComponentType<{ onNavigate?: (route: string) => void }>;

  entryUrl?: string;

  authRequired: boolean;

  capabilities: string[];

  // 可选的视觉呈现与元数据字段（供主平台应用中心、下拉菜单与卡片展示）
  description?: [string, string];
  detailDescription?: string;
  englishName?: string;
  iconName?: 'BookOpen' | 'Wrench' | 'FileText' | 'MessageSquareMore' | 'FileCheck' | 'TrendingUp' | 'FlaskConical';
  color?: string;
  bgColor?: string;
  lightBgColor?: string;
  textColor?: string;
  borderColor?: string;
  badge?: string;
}
