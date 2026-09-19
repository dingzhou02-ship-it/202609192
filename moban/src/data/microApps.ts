import { GeoAIMicroAppManifest } from '../types/microApp';

/**
 * 统一微应用注册中心 (MICRO_APP_REGISTRY)
 * 
 * 架构说明：
 * 1. 本平台是“南师GeoAI智教云”主平台底座。
 * 2. 7个微应用（以及未来新增微应用）由不同开发小组独立开发、独立部署。
 * 3. 接入方式支持两种 (integrationType)：
 *    - "iframe": 独立微应用URL接入（推荐，实现彻底解耦、技术栈无关与独立CI/CD部署）
 *    - "component": 本地React组件嵌入
 * 
 * 未来其他小组接入新微应用时：
 * 只需要在自有服务器完成微应用部署，提供以下信息：
 * 1. appId
 * 2. displayName (应用名称)
 * 3. version
 * 4. routePrefix
 * 5. entryUrl
 * 6. authRequired
 * 7. capabilities
 * 平台管理员只需在本注册表中追加一项，主平台即可自动完成应用中心卡片、下拉菜单及路由分发！
 * 其他小组无需修改主平台首页及核心代码。
 */
export const MICRO_APP_REGISTRY: GeoAIMicroAppManifest[] = [
  {
    appId: "knowledge",
    displayName: "地理知识库",
    version: "1.0.0",
    routePrefix: "/knowledge",
    integrationType: "iframe",
    entryUrl: "https://knowledge.example.com",
    authRequired: true,
    capabilities: [
      "课标考点图谱",
      "典型地理案例库",
      "高清GIS数字专题图",
      "地理专有名词库"
    ],
    // 视觉呈现元数据（保持主平台原有设计风格）
    englishName: "Geo Knowledge Base",
    description: ["海量地理资源", "一键检索"],
    detailDescription: "基于地理学科大模型的知识图谱与数字化教学资源中心，覆盖中学自然地理、人文地理与区域地理全学科核心知识点。",
    iconName: "BookOpen",
    color: "#1677FF",
    bgColor: "bg-[#1677FF]",
    lightBgColor: "bg-blue-50",
    textColor: "text-[#1677FF]",
    borderColor: "border-blue-200",
    badge: "学科资源"
  },
  {
    appId: "tools",
    displayName: "AI工具箱",
    version: "1.0.0",
    routePrefix: "/tools",
    integrationType: "component",
    entryUrl: "https://tools.geoai.nnu.edu.cn",
    authRequired: false,
    capabilities: [
      "等高线地形图生成",
      "太阳高度角测算器",
      "遥感影像比对工具",
      "地理板画矢量助手"
    ],
    englishName: "AI Geo Toolbox",
    description: ["多样化AI工具", "助力教学创新"],
    detailDescription: "汇聚地理教师常用智慧化生产力工具，支持等高线生成、气候类型判定、日照光照模拟与地貌图解分析。",
    iconName: "Wrench",
    color: "#00C48C",
    bgColor: "bg-[#00C48C]",
    lightBgColor: "bg-emerald-50",
    textColor: "text-[#00C48C]",
    borderColor: "border-emerald-200",
    badge: "高效教学"
  },
  {
    appId: "course-generator",
    displayName: "AI课程生成器",
    version: "1.0.0",
    routePrefix: "/course-generator",
    integrationType: "component",
    entryUrl: "https://course.geoai.nnu.edu.cn",
    authRequired: true,
    capabilities: [
      "情境化大单元教案设计",
      "自动生成课件结构大纲",
      "分层随堂学案与练习",
      "教学反思智能提示"
    ],
    englishName: "AI Course Generator",
    description: ["智能生成教案", "课件与学案"],
    detailDescription: "一键生成符合中学地理新课标的三维教学目标教案、配套可视化PPT课件与分层导学案，备课效率倍增。",
    iconName: "FileText",
    color: "#FA8C16",
    bgColor: "bg-[#FA8C16]",
    lightBgColor: "bg-amber-50",
    textColor: "text-[#FA8C16]",
    borderColor: "border-amber-200",
    badge: "智能备课"
  },
  {
    appId: "ai-assistant",
    displayName: "AI对话助教",
    version: "1.0.0",
    routePrefix: "/ai-assistant",
    integrationType: "component",
    entryUrl: "https://tutor.geoai.nnu.edu.cn",
    authRequired: false,
    capabilities: [
      "地理现象成因启发追问",
      "高考真题深度解析对话",
      "个性化分层答疑辅导",
      "教师备课教学灵感库"
    ],
    englishName: "AI Dialogue Tutor",
    description: ["随时答疑解惑", "个性化辅导"],
    detailDescription: "面向地理课堂与课后答疑的智能对话助手，具备专业地理学科推理能力，启发式辅导学生理解地理原理。",
    iconName: "MessageSquareMore",
    color: "#8B5CF6",
    bgColor: "bg-[#8B5CF6]",
    lightBgColor: "bg-purple-50",
    textColor: "text-[#8B5CF6]",
    borderColor: "border-purple-200",
    badge: "智能交互"
  },
  {
    appId: "question-generator",
    displayName: "AI辅助命题",
    version: "1.0.0",
    routePrefix: "/question-generator",
    integrationType: "component",
    entryUrl: "https://exam.geoai.nnu.edu.cn",
    authRequired: true,
    capabilities: [
      "基于真实时事的情境命题",
      "细目表自动对齐组卷",
      "智能生成参考答案与评分细则",
      "考题难度与辨别度预估"
    ],
    englishName: "AI Assessment System",
    description: ["智能出题组卷", "精准化命题"],
    detailDescription: "基于真实地理情境与实时热点素材，自动化构建选择题、综合题及原创试题，支持难度与核心素养对齐。",
    iconName: "FileCheck",
    color: "#FF4D4F",
    bgColor: "bg-[#FF4D4F]",
    lightBgColor: "bg-red-50",
    textColor: "text-[#FF4D4F]",
    borderColor: "border-red-200",
    badge: "精准测评"
  },
  {
    appId: "classroom-evaluation",
    displayName: "AI课堂教学评价系统",
    version: "1.0.0",
    routePrefix: "/classroom-evaluation",
    integrationType: "component",
    entryUrl: "https://eval.geoai.nnu.edu.cn",
    authRequired: true,
    capabilities: [
      "师生话语互动时间线分析",
      "地理高阶思维提问识别",
      "课堂教学目标达成度测度",
      "生成个性化教研改进建议"
    ],
    englishName: "AI Classroom Evaluation",
    description: ["多维课堂评价", "精准反馈"],
    detailDescription: "结合音视频多模态感知与地理课堂教学量规，自动化分析师生互动比例、地理思维层次与课堂达成度。",
    iconName: "TrendingUp",
    color: "#1890FF",
    bgColor: "bg-[#1890FF]",
    lightBgColor: "bg-blue-50",
    textColor: "text-[#1890FF]",
    borderColor: "border-blue-200",
    badge: "教学质评"
  },
  {
    appId: "lab",
    displayName: "AI实验室",
    version: "1.0.0",
    routePrefix: "/lab",
    integrationType: "component",
    entryUrl: "https://lab.geoai.nnu.edu.cn",
    authRequired: false,
    capabilities: [
      "全球三维大气环流动态模拟",
      "水循环与流域水文交互沙盘",
      "板块碰撞与褶皱断层构造仿真",
      "土壤剖面与植被演化互动"
    ],
    englishName: "AI Virtual Lab",
    description: ["虚拟仿真实验", "探索地理奥秘"],
    detailDescription: "三维数字孪生地理实验平台，支持大气环流、水循环、板块运动、地质构造与丹霞/喀斯特地貌演化沙盘模拟。",
    iconName: "FlaskConical",
    color: "#00BCD4",
    bgColor: "bg-[#00BCD4]",
    lightBgColor: "bg-cyan-50",
    textColor: "text-[#00BCD4]",
    borderColor: "border-cyan-200",
    badge: "虚拟仿真"
  }
];

/**
 * 根据路由前缀获取微应用清单
 */
export function getMicroAppByRoute(route: string): GeoAIMicroAppManifest | undefined {
  return MICRO_APP_REGISTRY.find((app) => app.routePrefix === route);
}

/**
 * 根据 appId 获取微应用清单
 */
export function getMicroAppById(appId: string): GeoAIMicroAppManifest | undefined {
  return MICRO_APP_REGISTRY.find((app) => app.appId === appId);
}
