import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { BookOpen, MapPin, Microscope, Navigation, RotateCw, Sparkles, CheckCircle2 } from 'lucide-react';
import earthTextureUrl from '../../assets/earth_texture.jpg';

interface DigitalEarthProps {
  onNodeClick?: (route: string) => void;
  onSelectNode?: (nodeId: string) => void;
  activeNodeId?: string | null;
}

export const DigitalEarth: React.FC<DigitalEarthProps> = ({
  onNodeClick,
  onSelectNode,
  activeNodeId
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isRotating, setIsRotating] = useState(true);

  const handleNodeTrigger = (nodeId: string, fallbackRoute: string) => {
    if (onSelectNode) {
      onSelectNode(nodeId);
    } else if (onNodeClick) {
      onNodeClick(fallbackRoute);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Scene & Renderer Setup
    const scene = new THREE.Scene();
    const width = 420;
    const height = 420;

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 1000);
    camera.position.set(0, 0.4, 5.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Lighting for Scientific Realism & Depth
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Directional light from upper left mimicking sun angle
    const sunLight = new THREE.DirectionalLight(0xe0f2fe, 2.2);
    sunLight.position.set(-5, 4, 4);
    scene.add(sunLight);

    // Subtle cyan backlight for atmospheric rim effect
    const rimLight = new THREE.DirectionalLight(0x06b6d4, 1.6);
    rimLight.position.set(4, -2, -3);
    scene.add(rimLight);

    // 3. Realistic Earth Globe with NASA Satellite Land/Ocean Topography
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // Axial tilt of the Earth (~23.5 degrees)
    earthGroup.rotation.z = (23.44 * Math.PI) / 180;

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(earthTextureUrl);
    earthTexture.colorSpace = THREE.SRGBColorSpace;

    const earthRadius = 1.68;
    const earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.6,
      metalness: 0.1,
      bumpScale: 0.05
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earthMesh);

    // 4. Atmosphere Rim Glow Layer
    const atmoGeo = new THREE.SphereGeometry(earthRadius * 1.025, 48, 48);
    const atmoMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.72 - dot(vNormal, vec3(0, 0, 1.0)), 2.2);
          gl_FragColor = vec4(0.15, 0.78, 1.0, 1.0) * intensity * 1.5;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    earthGroup.add(atmoMesh);

    // 5. Scientific Graticule: 3D Latitude Parallels & Longitude Meridians
    const graticuleGroup = new THREE.Group();
    const graticuleMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.32,
      linewidth: 1
    });

    const gratRadius = earthRadius * 1.004;

    // Latitude parallels at -60, -30, 0 (Equator), 30, 60, and 23.5 (Tropic of Cancer)
    const latitudes = [-60, -30, 0, 23.44, 30, 60];
    latitudes.forEach((latDeg) => {
      const latRad = (latDeg * Math.PI) / 180;
      const r = gratRadius * Math.cos(latRad);
      const y = gratRadius * Math.sin(latRad);
      const points: THREE.Vector3[] = [];
      const segments = 64;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta)));
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeo, graticuleMat);
      graticuleGroup.add(line);
    });

    // Longitude meridians every 30 degrees
    for (let lonDeg = 0; lonDeg < 180; lonDeg += 30) {
      const points: THREE.Vector3[] = [];
      const segments = 64;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            gratRadius * Math.sin(theta) * Math.cos((lonDeg * Math.PI) / 180),
            gratRadius * Math.cos(theta),
            gratRadius * Math.sin(theta) * Math.sin((lonDeg * Math.PI) / 180)
          )
        );
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeo, graticuleMat);
      graticuleGroup.add(line);
    }
    earthGroup.add(graticuleGroup);

    // 6. Glowing Orbital Data Ring (AI Tech Ring 1)
    const orbit1Group = new THREE.Group();
    orbit1Group.rotation.x = (18 * Math.PI) / 180;
    orbit1Group.rotation.y = (-15 * Math.PI) / 180;
    scene.add(orbit1Group);

    const ringRadius = earthRadius * 1.35;
    const ringPoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      ringPoints.push(new THREE.Vector3(ringRadius * Math.cos(theta), 0, ringRadius * Math.sin(theta)));
    }
    const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPoints);
    const ringMat = new THREE.LineDashedMaterial({
      color: 0x00e5ff,
      dashSize: 0.18,
      gapSize: 0.08,
      transparent: true,
      opacity: 0.85
    });
    const orbitRing1 = new THREE.Line(ringGeo, ringMat);
    orbitRing1.computeLineDistances();
    orbit1Group.add(orbitRing1);

    // Satellite Data Node 1 on Orbit 1
    const satGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const satMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const satMesh = new THREE.Mesh(satGeo, satMat);
    orbit1Group.add(satMesh);

    // Second inclined data ring
    const orbit2Group = new THREE.Group();
    orbit2Group.rotation.x = (-28 * Math.PI) / 180;
    orbit2Group.rotation.z = (25 * Math.PI) / 180;
    scene.add(orbit2Group);

    const ring2Radius = earthRadius * 1.48;
    const ring2Points: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      ring2Points.push(new THREE.Vector3(ring2Radius * Math.cos(theta), 0, ring2Radius * Math.sin(theta)));
    }
    const ring2Geo = new THREE.BufferGeometry().setFromPoints(ring2Points);
    const ring2Mat = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.55
    });
    const orbitRing2 = new THREE.Line(ring2Geo, ring2Mat);
    orbit2Group.add(orbitRing2);

    // Satellite Data Node 2 on Orbit 2
    const sat2Mesh = new THREE.Mesh(satGeo, new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
    orbit2Group.add(sat2Mesh);

    // 7. Particle Swarm (Data Stream Points)
    const particleCount = 75;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = earthRadius * (1.1 + Math.random() * 0.45);
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      particlePositions[i * 3] = r * Math.cos(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi);
      particlePositions[i * 3 + 2] = r * Math.cos(phi) * Math.sin(theta);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    earthGroup.add(particlePoints);

    // Initial orientation: display China / East Asia facing forward
    // 116°E longitude facing viewer
    earthMesh.rotation.y = 2.4;

    // 8. Animation Loop
    let animId: number;
    let orbitAngle1 = 0;
    let orbitAngle2 = Math.PI;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Scientific West-to-East rotation (visually moving left-to-right on front side)
      // Positive Y rotation turns front face from west to east
      const rotationSpeed = isHovered ? 0.0012 : 0.0028;
      earthMesh.rotation.y += rotationSpeed;
      graticuleGroup.rotation.y += rotationSpeed;

      // Orbiting data nodes
      orbitAngle1 += 0.015;
      satMesh.position.set(ringRadius * Math.cos(orbitAngle1), 0, ringRadius * Math.sin(orbitAngle1));

      orbitAngle2 -= 0.012;
      sat2Mesh.position.set(ring2Radius * Math.cos(orbitAngle2), 0, ring2Radius * Math.sin(orbitAngle2));

      // Slow precession of data rings
      orbit1Group.rotation.y += 0.001;
      orbit2Group.rotation.y -= 0.0008;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      earthGeo.dispose();
      earthMat.dispose();
      atmoGeo.dispose();
      atmoMat.dispose();
      earthTexture.dispose();
    };
  }, [isHovered]);

  return (
    <div
      id="ai-digital-earth-container"
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-[500px] h-[460px] lg:h-[490px] xl:h-[510px] mx-auto flex items-center justify-center select-none"
    >
      {/* Dynamic Rotation Status Pill on Hover */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium transition-all duration-300 pointer-events-none ${
          isHovered
            ? 'bg-cyan-950/80 text-cyan-200 border border-cyan-400/50 backdrop-blur-md opacity-100 translate-y-0 shadow-[0_0_18px_rgba(6,182,212,0.4)]'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <RotateCw className="w-3.5 h-3.5 animate-spin text-cyan-300" style={{ animationDuration: '3s' }} />
        <span>自西向东科学自转中 · 点击功能节点查看</span>
      </div>

      {/* 1. Perspective Holographic Base Platform at Bottom (GIS Visualization Platform) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[390px] h-[95px] pointer-events-none z-10 flex items-center justify-center">
        {/* Outermost glowing holographic ring */}
        <div className="absolute w-[360px] h-[68px] rounded-[100%] border border-cyan-400/40 shadow-[0_0_24px_rgba(6,182,212,0.35)]" />

        {/* Middle concentric calibrated ring */}
        <div className="absolute w-[275px] h-[52px] rounded-[100%] border-2 border-blue-400/60 shadow-[0_0_18px_rgba(37,99,235,0.4)]" />

        {/* Inner bright platform ring */}
        <div className="absolute w-[185px] h-[35px] rounded-[100%] border border-cyan-300/80 bg-cyan-400/15 shadow-[0_0_20px_rgba(34,211,238,0.5)]" />

        {/* Central glowing platform hub */}
        <div className="absolute w-[105px] h-[20px] rounded-[100%] bg-gradient-to-t from-blue-500/50 via-cyan-300/70 to-white blur-xs" />

        {/* Upward holographic projection beam */}
        <div className="absolute bottom-6 w-[200px] h-[85px] bg-gradient-to-t from-cyan-400/20 to-transparent blur-md pointer-events-none" />
      </div>

      {/* 2. Three.js Canvas: Real World Textured Earth with Atmosphere & Graticule */}
      <div className="relative z-20 w-[420px] h-[420px] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full drop-shadow-[0_12px_36px_rgba(0,120,255,0.35)]"
        />

        {/* 3. Center Glowing Translucent AI Core Bubble (Anchored in Exact Center) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center">
          {/* Glass Bubble Outer Ring */}
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-white/90 via-sky-300/60 to-blue-600/80 border-2 border-white/80 shadow-[0_0_28px_rgba(34,211,238,0.85)] flex items-center justify-center backdrop-blur-xs">
            {/* Dashed Inner Tech Ring */}
            <div className="absolute inset-1.5 rounded-full border border-dashed border-white/70 animate-spin" style={{ animationDuration: '24s' }} />

            {/* Specular Glint */}
            <div className="absolute top-3 left-4 w-7 h-3 rounded-full bg-white/60 transform -rotate-45 blur-[0.5px]" />

            {/* Center "AI" Tech Typography */}
            <span
              className="font-tech text-[44px] font-black text-white italic tracking-wider select-none transform -translate-y-0.5"
              style={{
                textShadow: '0 0 16px rgba(56, 189, 248, 0.95), 0 0 28px rgba(14, 165, 233, 0.75)'
              }}
            >
              AI
            </span>
          </div>
        </div>
      </div>

      {/* 4. Floating Feature Badge Nodes with Tether Lines around the Globe */}

      {/* Node 1: Top-Right Knowledge Book Node */}
      <div
        className="absolute top-8 right-24 lg:right-28 z-30 group cursor-pointer"
        onMouseEnter={() => setActiveTooltip('地理核心素养知识图谱')}
        onMouseLeave={() => setActiveTooltip(null)}
        onClick={() => handleNodeTrigger('knowledge-system', '/knowledge')}
      >
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1677FF] to-[#0958D9] p-2.5 text-white shadow-[0_8px_20px_rgba(22,119,255,0.45)] border border-blue-200/50 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_12px_28px_rgba(22,119,255,0.6)] ${
            activeNodeId === 'knowledge-system' ? 'ring-4 ring-cyan-300 scale-110' : ''
          }`}
        >
          <BookOpen className="w-6 h-6 text-white drop-shadow-sm" strokeWidth={2.4} />
        </div>
        {activeTooltip === '地理核心素养知识图谱' && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900/90 text-white text-xs font-medium rounded-lg whitespace-nowrap shadow-lg flex items-center gap-1.5 border border-cyan-400/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>核心素养图谱数据预览</span>
          </div>
        )}
      </div>

      {/* Node 2: Middle-Right Location / Map Node */}
      <div
        className="absolute top-36 right-2 lg:right-4 z-30 group cursor-pointer"
        onMouseEnter={() => setActiveTooltip('空间GIS与地形剖面')}
        onMouseLeave={() => setActiveTooltip(null)}
        onClick={() => handleNodeTrigger('gis-positioning', '/tools')}
      >
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1677FF] to-[#0958D9] p-2.5 text-white shadow-[0_8px_20px_rgba(22,119,255,0.45)] border border-blue-200/50 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_12px_28px_rgba(22,119,255,0.6)] ${
            activeNodeId === 'gis-positioning' ? 'ring-4 ring-cyan-300 scale-110' : ''
          }`}
        >
          <MapPin className="w-6 h-6 text-white drop-shadow-sm" strokeWidth={2.4} />
        </div>
        {activeTooltip === '空间GIS与地形剖面' && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900/90 text-white text-xs font-medium rounded-lg whitespace-nowrap shadow-lg flex items-center gap-1.5 border border-cyan-400/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>空间GIS分析与太阳方位测算</span>
          </div>
        )}
      </div>

      {/* Node 3: Bottom-Right Microscope / Lab Experiment Node */}
      <div
        className="absolute bottom-20 right-6 lg:right-8 z-30 group cursor-pointer"
        onMouseEnter={() => setActiveTooltip('三维大气热力环流沙盘')}
        onMouseLeave={() => setActiveTooltip(null)}
        onClick={() => handleNodeTrigger('virtual-lab', '/lab')}
      >
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1677FF] to-[#0958D9] p-2.5 text-white shadow-[0_8px_20px_rgba(22,119,255,0.45)] border border-blue-200/50 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_12px_28px_rgba(22,119,255,0.6)] ${
            activeNodeId === 'virtual-lab' ? 'ring-4 ring-cyan-300 scale-110' : ''
          }`}
        >
          <Microscope className="w-6 h-6 text-white drop-shadow-sm" strokeWidth={2.4} />
        </div>
        {activeTooltip === '三维大气热力环流沙盘' && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900/90 text-white text-xs font-medium rounded-lg whitespace-nowrap shadow-lg flex items-center gap-1.5 border border-cyan-400/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>热力环流流体物理仿真</span>
          </div>
        )}
      </div>

      {/* Node 4: Bottom-Center-Left Navigation Node */}
      <div
        className="absolute bottom-10 left-12 lg:left-16 z-30 group cursor-pointer"
        onMouseEnter={() => setActiveTooltip('经纬空间网格与大江大河')}
        onMouseLeave={() => setActiveTooltip(null)}
        onClick={() => handleNodeTrigger('yangtze-delta', '/knowledge')}
      >
        <div
          className={`w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1677FF] to-[#0958D9] p-2 text-white shadow-[0_8px_20px_rgba(22,119,255,0.45)] border border-blue-200/50 flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
            activeNodeId === 'yangtze-delta' ? 'ring-4 ring-cyan-300 scale-110' : ''
          }`}
        >
          <Navigation className="w-5 h-5 text-white drop-shadow-sm" strokeWidth={2.4} />
        </div>
        {activeTooltip === '经纬空间网格与大江大河' && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900/90 text-white text-xs font-medium rounded-lg whitespace-nowrap shadow-lg flex items-center gap-1.5 border border-cyan-400/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>长三角城市群与生态协同监测</span>
          </div>
        )}
      </div>
    </div>
  );
};
