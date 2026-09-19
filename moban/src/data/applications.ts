import { MICRO_APP_REGISTRY } from './microApps';
import { GeoAIMicroAppManifest } from '../types/microApp';

export interface ApplicationItem {
  id: string;
  name: string;
  englishName: string;
  description: [string, string];
  detailDescription: string;
  iconName: 'BookOpen' | 'Wrench' | 'FileText' | 'MessageSquareMore' | 'FileCheck' | 'TrendingUp' | 'FlaskConical';
  color: string; // Primary hex color
  bgColor: string; // Tailwind background class for icon badge
  lightBgColor: string; // Light tint for cards/badges
  textColor: string;
  borderColor: string;
  route: string;
  badge?: string;
  keyFeatures: string[];
  integrationType?: "component" | "iframe";
  entryUrl?: string;
}

/**
 * 自动从 MICRO_APP_REGISTRY 派生全站应用列表，不再单独手工维护
 */
export const APPLICATIONS: ApplicationItem[] = MICRO_APP_REGISTRY.map((manifest) => ({
  id: manifest.appId,
  name: manifest.displayName,
  englishName: manifest.englishName || manifest.displayName,
  description: manifest.description || ['智能赋能', '高效教学'],
  detailDescription: manifest.detailDescription || '',
  iconName: manifest.iconName || 'BookOpen',
  color: manifest.color || '#1677FF',
  bgColor: manifest.bgColor || 'bg-[#1677FF]',
  lightBgColor: manifest.lightBgColor || 'bg-blue-50',
  textColor: manifest.textColor || 'text-[#1677FF]',
  borderColor: manifest.borderColor || 'border-blue-200',
  route: manifest.routePrefix,
  badge: manifest.badge,
  keyFeatures: manifest.capabilities,
  integrationType: manifest.integrationType,
  entryUrl: manifest.entryUrl
}));

export interface NavItem {
  id: string;
  name: string;
  route: string;
  iconName: 'Home' | 'LayoutGrid' | 'Bell' | 'MessageSquare' | 'User';
  hasDropdown?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', name: '首页', route: '/', iconName: 'Home' },
  { id: 'apps', name: '应用中心', route: '#apps', iconName: 'LayoutGrid', hasDropdown: true },
  { id: 'messages', name: '消息中心', route: '/messages', iconName: 'Bell' },
  { id: 'feedback', name: '反馈中心', route: '/feedback', iconName: 'MessageSquare' },
  { id: 'profile', name: '个人', route: '#profile', iconName: 'User', hasDropdown: true }
];

