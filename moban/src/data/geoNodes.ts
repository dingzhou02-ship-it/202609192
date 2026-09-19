export interface GeoNodeData {
  id: string;
  idNum?: string;
  title: string;
  subtitle: string;
  category: '资源图谱' | '空间GIS' | '模拟仿真' | '考点分析';
  categoryColor: string;
  coordinates: string;
  region: string;
  description: string;
  keyMetrics: {
    label: string;
    value: string;
    unit?: string;
  }[];
  curriculumTags: string[];
  competencies: string[];
  datasetStats: {
    resolution: string;
    updateFrequency: string;
    entitiesCount: string;
  };
  recommendedRoute: string;
  routeLabel: string;
}

export const GEO_NODES_DATA: Record<string, GeoNodeData> = {
  'knowledge-system': {
    id: 'knowledge-system',
    idNum: '01',
    title: '中学地理核心素养知识图谱',
    subtitle: '多尺度地理实体拓扑与课标考点关联网络',
    category: '资源图谱',
    categoryColor: '#1677FF',
    coordinates: '39°54\'N, 116°23\'E',
    region: '全国新课标高中地理',
    description: '汇聚人地协调观、综合思维、区域认知与地理实践力四大核心素养，贯通自然地理要素与人文经济活动的空间结构关系。',
    keyMetrics: [
      { label: '图谱知识节点', value: '12,850', unit: '个' },
      { label: '课标考点对齐', value: '100', unit: '%' },
      { label: '真题情境图解', value: '3,420', unit: '组' }
    ],
    curriculumTags: ['必修一 自然地理', '必修二 人文地理', '选择性必修 自然地理基础'],
    competencies: ['人地协调观', '区域认知', '综合思维'],
    datasetStats: {
      resolution: '概念实体级',
      updateFrequency: '每周同步教研新题',
      entitiesCount: '1.2万实体 · 4.8万关系'
    },
    recommendedRoute: '/knowledge',
    routeLabel: '进入地理知识库检索'
  },
  'gis-positioning': {
    id: 'gis-positioning',
    idNum: '02',
    title: '空间GIS定位与地形剖面分析',
    subtitle: '数字高程DEM模型与太阳光照几何测算',
    category: '空间GIS',
    categoryColor: '#06B6D4',
    coordinates: '32°03\'N, 118°47\'E',
    region: '长江中下游 · 南京紫金山',
    description: '提供精准正午太阳高度角计算、等高线三维剖面切片生成、晨昏线动态切点推演及区域气候型智能判别。',
    keyMetrics: [
      { label: '正午太阳高度角', value: '81.4', unit: '°' },
      { label: '剖面采样精度', value: '12.5', unit: 'm' },
      { label: '空间图层覆盖', value: '18', unit: '层' }
    ],
    curriculumTags: ['地球运动的地理意义', '等高线地形图判读', '区域自然地理特征'],
    competencies: ['地理实践力', '空间综合思维'],
    datasetStats: {
      resolution: '30m DEM / 矢量图层',
      updateFrequency: '实时动态计算',
      entitiesCount: '高精度全国高程与经纬网'
    },
    recommendedRoute: '/tools',
    routeLabel: '开启空间GIS工具箱'
  },
  'virtual-lab': {
    id: 'virtual-lab',
    idNum: '03',
    title: '三维大气热力环流虚拟沙盘',
    subtitle: '受热不均气压场与气流运动流体物理仿真',
    category: '模拟仿真',
    categoryColor: '#10B981',
    coordinates: '30°00\'N, 120°00\'E',
    region: '热力环流实验沙盘',
    description: '基于WebGPU与流体动力学方程，直观展示受热上升膨胀、遇冷下沉收缩、水平气压梯度力及地转偏向力对风向的偏转过程。',
    keyMetrics: [
      { label: '环流对流流速', value: '2.4', unit: 'm/s' },
      { label: '温差驱动强度', value: '65', unit: '°C' },
      { label: '偏向角模拟', value: '35', unit: '°' }
    ],
    curriculumTags: ['大气的受热过程', '热力环流与风', '气压带和风带'],
    competencies: ['科学探究', '地理综合思维'],
    datasetStats: {
      resolution: '三维流体网格 60fps',
      updateFrequency: '即时动态交互',
      entitiesCount: '多重物理参量可调'
    },
    recommendedRoute: '/lab',
    routeLabel: '进入AI实验沙盘推演'
  },
  'yangtze-delta': {
    id: 'yangtze-delta',
    idNum: '04',
    title: '长三角城市群与生态协同监测',
    subtitle: '典型城市化空间集聚与太湖流域水循环',
    category: '考点分析',
    categoryColor: '#8B5CF6',
    coordinates: '31°14\'N, 121°29\'E',
    region: '长江三角洲地区',
    description: '聚焦长三角一体化战略空间格局、城镇化对局地微气候的影响，以及沿江生态廊道保护的高考前沿综合情境考点。',
    keyMetrics: [
      { label: '城镇化率指数', value: '75.2', unit: '%' },
      { label: '近5年高考覆盖', value: '14', unit: '套' },
      { label: '情境真题配套', value: '28', unit: '道' }
    ],
    curriculumTags: ['城镇化及其影响', '流域综合开发', '区域协同发展战略'],
    competencies: ['人地协调观', '区域认知'],
    datasetStats: {
      resolution: '县域 / 地市级尺度',
      updateFrequency: '年度统计年鉴更新',
      entitiesCount: '41座城市空间指标'
    },
    recommendedRoute: '/knowledge',
    routeLabel: '调取长三角教学专题'
  },
  'qinghai-plateau': {
    id: 'qinghai-plateau',
    idNum: '05',
    title: '青藏高原隆升与季风动力效应',
    subtitle: '世界屋脊地形阻挡与热力泵效应驱动机制',
    category: '空间GIS',
    categoryColor: '#F59E0B',
    coordinates: '35°12\'N, 90°45\'E',
    region: '青藏高原大区',
    description: '解析青藏高原对西风带的分支分流、夏季强热源热力泵效应，以及对我国东部旱涝格局与亚洲季风起源的关键塑造作用。',
    keyMetrics: [
      { label: '平均海拔高度', value: '4,500', unit: 'm' },
      { label: '西风分支抬升', value: '3,200', unit: 'km' },
      { label: '高考经典大题', value: '19', unit: '题' }
    ],
    curriculumTags: ['自然地理要素的相互作用', '气候成因综合分析', '自然环境整体性'],
    competencies: ['综合思维', '区域认知'],
    datasetStats: {
      resolution: '高程与遥感融合',
      updateFrequency: '学科前沿研究对齐',
      entitiesCount: '亚洲季风耦合模型'
    },
    recommendedRoute: '/tools',
    routeLabel: '查看高原地理剖面'
  },
  'coord-navigation': {
    id: 'coord-navigation',
    idNum: '06',
    title: '智能地理经纬网络与课标导航',
    subtitle: '多维空间经纬格网与新教材章节知识锚定',
    category: '资源图谱',
    categoryColor: '#3B82F6',
    coordinates: '0°00\'N, 105°00\'E',
    region: '赤道低气压带 · 东南亚',
    description: '通过地理坐标系将全球气候带、洋流分流、板块交界与世界主要农矿带实现快速检索锚定，赋能课堂即时调取。',
    keyMetrics: [
      { label: '经纬度定位精度', value: '0.01', unit: '°' },
      { label: '全球气候型覆盖', value: '13', unit: '种' },
      { label: '教材章节锚定', value: '100', unit: '%' }
    ],
    curriculumTags: ['经纬网与地图基础', '世界地理概况', '高中选考必备基本功'],
    competencies: ['地理实践力', '空间感知'],
    datasetStats: {
      resolution: '全球 WGS84 / CGCS2000',
      updateFrequency: '全天候响应',
      entitiesCount: '全球万维坐标'
    },
    recommendedRoute: '/course-generator',
    routeLabel: '进入智能课程生成器'
  }
} as const;
