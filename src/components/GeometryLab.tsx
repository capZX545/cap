import { useState, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { useLang } from '../context/LanguageContext';
import * as THREE from 'three';

// ==================== TYPES ====================
interface Shape2D {
  id: string;
  name: { en: string; fa: string };
  icon: string;
  params: { name: string; label: { en: string; fa: string }; default: number }[];
  calcArea: (params: Record<string, number>) => number;
  calcPerimeter: (params: Record<string, number>) => number;
  formulas: { area: string; perimeter: string };
}

interface Shape3D {
  id: string;
  name: { en: string; fa: string };
  icon: string;
  params: { name: string; label: { en: string; fa: string }; default: number }[];
  calcVolume: (params: Record<string, number>) => number;
  calcSurface: (params: Record<string, number>) => number;
  formulas: { volume: string; surface: string };
}

// ==================== 2D SHAPES DATA ====================
const shapes2D: Shape2D[] = [
  {
    id: 'circle',
    name: { en: 'Circle', fa: 'دایره' },
    icon: '⭕',
    params: [{ name: 'r', label: { en: 'Radius', fa: 'شعاع' }, default: 3 }],
    calcArea: (p) => Math.PI * p.r ** 2,
    calcPerimeter: (p) => 2 * Math.PI * p.r,
    formulas: { area: 'A = πr²', perimeter: 'P = 2πr' }
  },
  {
    id: 'square',
    name: { en: 'Square', fa: 'مربع' },
    icon: '⬜',
    params: [{ name: 'a', label: { en: 'Side', fa: 'ضلع' }, default: 4 }],
    calcArea: (p) => p.a ** 2,
    calcPerimeter: (p) => 4 * p.a,
    formulas: { area: 'A = a²', perimeter: 'P = 4a' }
  },
  {
    id: 'rectangle',
    name: { en: 'Rectangle', fa: 'مستطیل' },
    icon: '▭',
    params: [
      { name: 'w', label: { en: 'Width', fa: 'عرض' }, default: 5 },
      { name: 'h', label: { en: 'Height', fa: 'ارتفاع' }, default: 3 }
    ],
    calcArea: (p) => p.w * p.h,
    calcPerimeter: (p) => 2 * (p.w + p.h),
    formulas: { area: 'A = w × h', perimeter: 'P = 2(w + h)' }
  },
  {
    id: 'triangle',
    name: { en: 'Triangle', fa: 'مثلث' },
    icon: '△',
    params: [
      { name: 'b', label: { en: 'Base', fa: 'قاعده' }, default: 4 },
      { name: 'h', label: { en: 'Height', fa: 'ارتفاع' }, default: 3 }
    ],
    calcArea: (p) => 0.5 * p.b * p.h,
    calcPerimeter: (p) => p.b + 2 * Math.sqrt((p.b / 2) ** 2 + p.h ** 2),
    formulas: { area: 'A = ½bh', perimeter: 'P = b + 2√((b/2)² + h²)' }
  },
  {
    id: 'ellipse',
    name: { en: 'Ellipse', fa: 'بیضی' },
    icon: '⬭',
    params: [
      { name: 'a', label: { en: 'Semi-major', fa: 'نیم‌محور بزرگ' }, default: 4 },
      { name: 'b', label: { en: 'Semi-minor', fa: 'نیم‌محور کوچک' }, default: 2 }
    ],
    calcArea: (p) => Math.PI * p.a * p.b,
    calcPerimeter: (p) => Math.PI * (3 * (p.a + p.b) - Math.sqrt((3 * p.a + p.b) * (p.a + 3 * p.b))),
    formulas: { area: 'A = πab', perimeter: 'P ≈ π(3(a+b) - √((3a+b)(a+3b)))' }
  },
  {
    id: 'trapezoid',
    name: { en: 'Trapezoid', fa: 'ذوزنقه' },
    icon: '⏢',
    params: [
      { name: 'a', label: { en: 'Top Base', fa: 'قاعده بالا' }, default: 3 },
      { name: 'b', label: { en: 'Bottom Base', fa: 'قاعده پایین' }, default: 5 },
      { name: 'h', label: { en: 'Height', fa: 'ارتفاع' }, default: 3 }
    ],
    calcArea: (p) => 0.5 * (p.a + p.b) * p.h,
    calcPerimeter: (p) => p.a + p.b + 2 * Math.sqrt(((p.b - p.a) / 2) ** 2 + p.h ** 2),
    formulas: { area: 'A = ½(a+b)h', perimeter: 'P = a + b + 2s' }
  },
  {
    id: 'parallelogram',
    name: { en: 'Parallelogram', fa: 'متوازی‌الاضلاع' },
    icon: '▱',
    params: [
      { name: 'b', label: { en: 'Base', fa: 'قاعده' }, default: 5 },
      { name: 'h', label: { en: 'Height', fa: 'ارتفاع' }, default: 3 },
      { name: 's', label: { en: 'Side', fa: 'ضلع' }, default: 4 }
    ],
    calcArea: (p) => p.b * p.h,
    calcPerimeter: (p) => 2 * (p.b + p.s),
    formulas: { area: 'A = bh', perimeter: 'P = 2(b + s)' }
  },
  {
    id: 'rhombus',
    name: { en: 'Rhombus', fa: 'لوزی' },
    icon: '◇',
    params: [
      { name: 'd1', label: { en: 'Diagonal 1', fa: 'قطر ۱' }, default: 6 },
      { name: 'd2', label: { en: 'Diagonal 2', fa: 'قطر ۲' }, default: 4 }
    ],
    calcArea: (p) => 0.5 * p.d1 * p.d2,
    calcPerimeter: (p) => 2 * Math.sqrt((p.d1 / 2) ** 2 + (p.d2 / 2) ** 2) * 4 / 2,
    formulas: { area: 'A = ½d₁d₂', perimeter: 'P = 4 × √((d₁/2)² + (d₂/2)²)' }
  },
  {
    id: 'pentagon',
    name: { en: 'Pentagon', fa: 'پنج‌ضلعی' },
    icon: '⬠',
    params: [{ name: 'a', label: { en: 'Side', fa: 'ضلع' }, default: 3 }],
    calcArea: (p) => 0.25 * Math.sqrt(5 * (5 + 2 * Math.sqrt(5))) * p.a ** 2,
    calcPerimeter: (p) => 5 * p.a,
    formulas: { area: 'A = ¼√(5(5+2√5))a²', perimeter: 'P = 5a' }
  },
  {
    id: 'hexagon',
    name: { en: 'Hexagon', fa: 'شش‌ضلعی' },
    icon: '⬡',
    params: [{ name: 'a', label: { en: 'Side', fa: 'ضلع' }, default: 3 }],
    calcArea: (p) => (3 * Math.sqrt(3) / 2) * p.a ** 2,
    calcPerimeter: (p) => 6 * p.a,
    formulas: { area: 'A = (3√3/2)a²', perimeter: 'P = 6a' }
  },
  {
    id: 'sector',
    name: { en: 'Sector', fa: 'قطاع دایره' },
    icon: '◔',
    params: [
      { name: 'r', label: { en: 'Radius', fa: 'شعاع' }, default: 4 },
      { name: 'angle', label: { en: 'Angle (°)', fa: 'زاویه (درجه)' }, default: 90 }
    ],
    calcArea: (p) => (p.angle / 360) * Math.PI * p.r ** 2,
    calcPerimeter: (p) => 2 * p.r + (p.angle / 360) * 2 * Math.PI * p.r,
    formulas: { area: 'A = (θ/360)πr²', perimeter: 'P = 2r + arc' }
  },
];

// ==================== 3D SHAPES DATA ====================
const shapes3D: Shape3D[] = [
  {
    id: 'sphere',
    name: { en: 'Sphere', fa: 'کره' },
    icon: '🔵',
    params: [{ name: 'r', label: { en: 'Radius', fa: 'شعاع' }, default: 2 }],
    calcVolume: (p) => (4 / 3) * Math.PI * p.r ** 3,
    calcSurface: (p) => 4 * Math.PI * p.r ** 2,
    formulas: { volume: 'V = (4/3)πr³', surface: 'S = 4πr²' }
  },
  {
    id: 'cube',
    name: { en: 'Cube', fa: 'مکعب' },
    icon: '🟦',
    params: [{ name: 'a', label: { en: 'Side', fa: 'ضلع' }, default: 3 }],
    calcVolume: (p) => p.a ** 3,
    calcSurface: (p) => 6 * p.a ** 2,
    formulas: { volume: 'V = a³', surface: 'S = 6a²' }
  },
  {
    id: 'box',
    name: { en: 'Rectangular Box', fa: 'مکعب مستطیل' },
    icon: '📦',
    params: [
      { name: 'l', label: { en: 'Length', fa: 'طول' }, default: 4 },
      { name: 'w', label: { en: 'Width', fa: 'عرض' }, default: 3 },
      { name: 'h', label: { en: 'Height', fa: 'ارتفاع' }, default: 2 }
    ],
    calcVolume: (p) => p.l * p.w * p.h,
    calcSurface: (p) => 2 * (p.l * p.w + p.w * p.h + p.h * p.l),
    formulas: { volume: 'V = lwh', surface: 'S = 2(lw + wh + hl)' }
  },
  {
    id: 'cylinder',
    name: { en: 'Cylinder', fa: 'استوانه' },
    icon: '🛢️',
    params: [
      { name: 'r', label: { en: 'Radius', fa: 'شعاع' }, default: 2 },
      { name: 'h', label: { en: 'Height', fa: 'ارتفاع' }, default: 4 }
    ],
    calcVolume: (p) => Math.PI * p.r ** 2 * p.h,
    calcSurface: (p) => 2 * Math.PI * p.r * (p.r + p.h),
    formulas: { volume: 'V = πr²h', surface: 'S = 2πr(r + h)' }
  },
  {
    id: 'cone',
    name: { en: 'Cone', fa: 'مخروط' },
    icon: '🔺',
    params: [
      { name: 'r', label: { en: 'Radius', fa: 'شعاع' }, default: 2 },
      { name: 'h', label: { en: 'Height', fa: 'ارتفاع' }, default: 4 }
    ],
    calcVolume: (p) => (1 / 3) * Math.PI * p.r ** 2 * p.h,
    calcSurface: (p) => Math.PI * p.r * (p.r + Math.sqrt(p.r ** 2 + p.h ** 2)),
    formulas: { volume: 'V = (1/3)πr²h', surface: 'S = πr(r + √(r²+h²))' }
  },
  {
    id: 'pyramid',
    name: { en: 'Pyramid', fa: 'هرم' },
    icon: '🔻',
    params: [
      { name: 'b', label: { en: 'Base Side', fa: 'ضلع قاعده' }, default: 3 },
      { name: 'h', label: { en: 'Height', fa: 'ارتفاع' }, default: 4 }
    ],
    calcVolume: (p) => (1 / 3) * p.b ** 2 * p.h,
    calcSurface: (p) => p.b ** 2 + 2 * p.b * Math.sqrt((p.b / 2) ** 2 + p.h ** 2),
    formulas: { volume: 'V = (1/3)b²h', surface: 'S = b² + 2bl' }
  },
  {
    id: 'torus',
    name: { en: 'Torus', fa: 'چنبره' },
    icon: '🍩',
    params: [
      { name: 'R', label: { en: 'Major Radius', fa: 'شعاع بزرگ' }, default: 3 },
      { name: 'r', label: { en: 'Minor Radius', fa: 'شعاع کوچک' }, default: 1 }
    ],
    calcVolume: (p) => 2 * Math.PI ** 2 * p.R * p.r ** 2,
    calcSurface: (p) => 4 * Math.PI ** 2 * p.R * p.r,
    formulas: { volume: 'V = 2π²Rr²', surface: 'S = 4π²Rr' }
  },
  {
    id: 'ellipsoid',
    name: { en: 'Ellipsoid', fa: 'بیضوی' },
    icon: '🥚',
    params: [
      { name: 'a', label: { en: 'Semi-axis a', fa: 'نیم‌محور a' }, default: 3 },
      { name: 'b', label: { en: 'Semi-axis b', fa: 'نیم‌محور b' }, default: 2 },
      { name: 'c', label: { en: 'Semi-axis c', fa: 'نیم‌محور c' }, default: 1.5 }
    ],
    calcVolume: (p) => (4 / 3) * Math.PI * p.a * p.b * p.c,
    calcSurface: (p) => 4 * Math.PI * ((p.a * p.b + p.b * p.c + p.c * p.a) / 3),
    formulas: { volume: 'V = (4/3)πabc', surface: 'S ≈ 4π((ab+bc+ca)/3)' }
  },
  {
    id: 'hemisphere',
    name: { en: 'Hemisphere', fa: 'نیم‌کره' },
    icon: '🌓',
    params: [{ name: 'r', label: { en: 'Radius', fa: 'شعاع' }, default: 2 }],
    calcVolume: (p) => (2 / 3) * Math.PI * p.r ** 3,
    calcSurface: (p) => 3 * Math.PI * p.r ** 2,
    formulas: { volume: 'V = (2/3)πr³', surface: 'S = 3πr²' }
  },
  {
    id: 'prism',
    name: { en: 'Triangular Prism', fa: 'منشور مثلثی' },
    icon: '📐',
    params: [
      { name: 'b', label: { en: 'Base', fa: 'قاعده' }, default: 3 },
      { name: 'h', label: { en: 'Triangle Height', fa: 'ارتفاع مثلث' }, default: 2 },
      { name: 'l', label: { en: 'Length', fa: 'طول' }, default: 5 }
    ],
    calcVolume: (p) => 0.5 * p.b * p.h * p.l,
    calcSurface: (p) => p.b * p.h + (p.b + 2 * Math.sqrt((p.b / 2) ** 2 + p.h ** 2)) * p.l,
    formulas: { volume: 'V = ½bhl', surface: 'S = bh + Pl' }
  },
];

// ==================== 3D SHAPE COMPONENTS ====================
function Sphere3D({ radius = 2, color = '#3b82f6' }: { radius?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.005;
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
    </mesh>
  );
}

function Cube3D({ size = 3, color = '#10b981' }: { size?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
    </mesh>
  );
}

function Box3D({ l = 4, w = 3, h = 2, color = '#8b5cf6' }: { l?: number; w?: number; h?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[l, h, w]} />
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
    </mesh>
  );
}

function Cylinder3D({ r = 2, h = 4, color = '#f59e0b' }: { r?: number; h?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.005;
  });
  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[r, r, h, 32]} />
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
    </mesh>
  );
}

function Cone3D({ r = 2, h = 4, color = '#ef4444' }: { r?: number; h?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.005;
  });
  return (
    <mesh ref={meshRef}>
      <coneGeometry args={[r, h, 32]} />
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
    </mesh>
  );
}

function Pyramid3D({ b = 3, h = 4, color = '#ec4899' }: { b?: number; h?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.005;
  });
  return (
    <mesh ref={meshRef}>
      <coneGeometry args={[b * 0.7, h, 4]} />
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
    </mesh>
  );
}

function Torus3D({ R = 3, r = 1, color = '#06b6d4' }: { R?: number; r?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });
  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[R, r, 16, 48]} />
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
    </mesh>
  );
}

function Ellipsoid3D({ a = 3, b = 2, c = 1.5, color = '#84cc16' }: { a?: number; b?: number; c?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });
  return (
    <mesh ref={meshRef} scale={[a, c, b]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
    </mesh>
  );
}

function Hemisphere3D({ r = 2, color = '#14b8a6' }: { r?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.005;
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[r, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Prism3D({ b = 3, h = 2, l = 5, color = '#f97316' }: { b?: number; h?: number; l?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });
  
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-b / 2, -h / 2);
    shape.lineTo(b / 2, -h / 2);
    shape.lineTo(0, h / 2);
    shape.closePath();
    
    const extrudeSettings = { depth: l, bevelEnabled: false };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [b, h, l]);
  
  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, -l / 2]}>
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
    </mesh>
  );
}

// ==================== 2D SHAPE VISUALIZATION ====================
function Shape2DCanvas({ shape, params }: { shape: Shape2D; params: Record<string, number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useMemo(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 25;

    // Clear
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= width; x += scale) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += scale) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Draw shape
    ctx.strokeStyle = '#3b82f6';
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.lineWidth = 2;

    switch (shape.id) {
      case 'circle': {
        const r = params.r * scale;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        break;
      }
      case 'square': {
        const a = params.a * scale;
        ctx.beginPath();
        ctx.rect(centerX - a / 2, centerY - a / 2, a, a);
        ctx.fill();
        ctx.stroke();
        break;
      }
      case 'rectangle': {
        const w = params.w * scale;
        const h = params.h * scale;
        ctx.beginPath();
        ctx.rect(centerX - w / 2, centerY - h / 2, w, h);
        ctx.fill();
        ctx.stroke();
        break;
      }
      case 'triangle': {
        const b = params.b * scale;
        const h = params.h * scale;
        ctx.beginPath();
        ctx.moveTo(centerX - b / 2, centerY + h / 2);
        ctx.lineTo(centerX + b / 2, centerY + h / 2);
        ctx.lineTo(centerX, centerY - h / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      }
      case 'ellipse': {
        const a = params.a * scale;
        const b = params.b * scale;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, a, b, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        break;
      }
      case 'trapezoid': {
        const a = params.a * scale;
        const b = params.b * scale;
        const h = params.h * scale;
        ctx.beginPath();
        ctx.moveTo(centerX - b / 2, centerY + h / 2);
        ctx.lineTo(centerX + b / 2, centerY + h / 2);
        ctx.lineTo(centerX + a / 2, centerY - h / 2);
        ctx.lineTo(centerX - a / 2, centerY - h / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      }
      case 'parallelogram': {
        const b = params.b * scale;
        const h = params.h * scale;
        const offset = scale;
        ctx.beginPath();
        ctx.moveTo(centerX - b / 2 + offset, centerY - h / 2);
        ctx.lineTo(centerX + b / 2 + offset, centerY - h / 2);
        ctx.lineTo(centerX + b / 2 - offset, centerY + h / 2);
        ctx.lineTo(centerX - b / 2 - offset, centerY + h / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      }
      case 'rhombus': {
        const d1 = params.d1 * scale;
        const d2 = params.d2 * scale;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - d2 / 2);
        ctx.lineTo(centerX + d1 / 2, centerY);
        ctx.lineTo(centerX, centerY + d2 / 2);
        ctx.lineTo(centerX - d1 / 2, centerY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      }
      case 'pentagon':
      case 'hexagon': {
        const a = params.a * scale;
        const sides = shape.id === 'pentagon' ? 5 : 6;
        const angle = (2 * Math.PI) / sides;
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
          const x = centerX + a * Math.cos(angle * i - Math.PI / 2);
          const y = centerY + a * Math.sin(angle * i - Math.PI / 2);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      }
      case 'sector': {
        const r = params.r * scale;
        const angle = (params.angle * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, r, -angle / 2, angle / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      }
    }

    // Labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px monospace';
    ctx.fillText('x', width - 15, centerY - 5);
    ctx.fillText('y', centerX + 5, 15);

  }, [shape, params]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={300}
      className="rounded-xl border border-slate-700/50 w-full"
    />
  );
}

// ==================== 3D SCENE ====================
function Scene3D({ shape, params }: { shape: Shape3D; params: Record<string, number> }) {
  const renderShape = () => {
    switch (shape.id) {
      case 'sphere':
        return <Sphere3D radius={params.r || 2} />;
      case 'cube':
        return <Cube3D size={params.a || 3} />;
      case 'box':
        return <Box3D l={params.l || 4} w={params.w || 3} h={params.h || 2} />;
      case 'cylinder':
        return <Cylinder3D r={params.r || 2} h={params.h || 4} />;
      case 'cone':
        return <Cone3D r={params.r || 2} h={params.h || 4} />;
      case 'pyramid':
        return <Pyramid3D b={params.b || 3} h={params.h || 4} />;
      case 'torus':
        return <Torus3D R={params.R || 3} r={params.r || 1} />;
      case 'ellipsoid':
        return <Ellipsoid3D a={params.a || 3} b={params.b || 2} c={params.c || 1.5} />;
      case 'hemisphere':
        return <Hemisphere3D r={params.r || 2} />;
      case 'prism':
        return <Prism3D b={params.b || 3} h={params.h || 2} l={params.l || 5} />;
      default:
        return <Cube3D />;
    }
  };

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      {renderShape()}
      <Grid args={[20, 20]} cellColor="#334155" sectionColor="#475569" fadeDistance={30} />
      <OrbitControls enableZoom={true} enablePan={true} />
    </>
  );
}

// ==================== MAIN COMPONENT ====================
export default function GeometryLab() {
  const { lang } = useLang();
  const [mode, setMode] = useState<'2d' | '3d'>('3d');
  const [selectedShape2D, setSelectedShape2D] = useState(shapes2D[0]);
  const [selectedShape3D, setSelectedShape3D] = useState(shapes3D[0]);
  const [params2D, setParams2D] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    shapes2D[0].params.forEach(p => initial[p.name] = p.default);
    return initial;
  });
  const [params3D, setParams3D] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    shapes3D[0].params.forEach(p => initial[p.name] = p.default);
    return initial;
  });

  const handleShapeChange2D = (shape: Shape2D) => {
    setSelectedShape2D(shape);
    const newParams: Record<string, number> = {};
    shape.params.forEach(p => newParams[p.name] = p.default);
    setParams2D(newParams);
  };

  const handleShapeChange3D = (shape: Shape3D) => {
    setSelectedShape3D(shape);
    const newParams: Record<string, number> = {};
    shape.params.forEach(p => newParams[p.name] = p.default);
    setParams3D(newParams);
  };

  const formatNumber = (n: number) => {
    if (Math.abs(n) < 0.01 || Math.abs(n) > 10000) return n.toExponential(3);
    return parseFloat(n.toFixed(4)).toString();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-slate-800/60 backdrop-blur rounded-2xl border border-slate-700/50 overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-b border-slate-700/40">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-xl">📐</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  {lang === 'fa' ? 'آزمایشگاه هندسه' : 'Geometry Lab'}
                </h2>
                <p className="text-xs text-slate-400">
                  {lang === 'fa' ? 'نمایش دو بعدی و سه بعدی تعاملی' : 'Interactive 2D & 3D Visualization'}
                </p>
              </div>
            </div>

            {/* Mode Toggle */}
            <div className="flex gap-2 bg-slate-900/50 rounded-xl p-1">
              <button
                onClick={() => setMode('2d')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  mode === '2d' 
                    ? 'bg-emerald-500 text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'fa' ? '۲ بعدی' : '2D'}
              </button>
              <button
                onClick={() => setMode('3d')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  mode === '3d' 
                    ? 'bg-cyan-500 text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'fa' ? '۳ بعدی' : '3D'}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left Panel - Shape Selection */}
          <div className="lg:w-64 border-b lg:border-b-0 lg:border-l border-slate-700/40 p-4">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">
              {lang === 'fa' ? 'انتخاب شکل' : 'Select Shape'}
            </h3>
            <div className="grid grid-cols-3 lg:grid-cols-2 gap-2 max-h-64 lg:max-h-96 overflow-y-auto">
              {mode === '2d' ? (
                shapes2D.map(shape => (
                  <button
                    key={shape.id}
                    onClick={() => handleShapeChange2D(shape)}
                    className={`p-2 rounded-lg text-center transition-all ${
                      selectedShape2D.id === shape.id
                        ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400'
                        : 'bg-slate-700/30 border border-slate-700/50 text-slate-400 hover:bg-slate-700/50'
                    }`}
                  >
                    <span className="text-xl block">{shape.icon}</span>
                    <span className="text-[10px] block mt-1">{shape.name[lang]}</span>
                  </button>
                ))
              ) : (
                shapes3D.map(shape => (
                  <button
                    key={shape.id}
                    onClick={() => handleShapeChange3D(shape)}
                    className={`p-2 rounded-lg text-center transition-all ${
                      selectedShape3D.id === shape.id
                        ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400'
                        : 'bg-slate-700/30 border border-slate-700/50 text-slate-400 hover:bg-slate-700/50'
                    }`}
                  >
                    <span className="text-xl block">{shape.icon}</span>
                    <span className="text-[10px] block mt-1">{shape.name[lang]}</span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Center - Visualization */}
          <div className="flex-1 p-4">
            <div className="bg-slate-900/50 rounded-xl overflow-hidden" style={{ height: '400px' }}>
              {mode === '2d' ? (
                <Shape2DCanvas shape={selectedShape2D} params={params2D} />
              ) : (
                <Canvas camera={{ position: [8, 6, 8], fov: 50 }}>
                  <Suspense fallback={null}>
                    <Scene3D shape={selectedShape3D} params={params3D} />
                  </Suspense>
                </Canvas>
              )}
            </div>
            <p className="text-xs text-slate-500 text-center mt-2">
              {mode === '3d' && (lang === 'fa' ? '🖱️ بکشید برای چرخش • اسکرول برای زوم' : '🖱️ Drag to rotate • Scroll to zoom')}
            </p>
          </div>

          {/* Right Panel - Parameters & Results */}
          <div className="lg:w-72 border-t lg:border-t-0 lg:border-r border-slate-700/40 p-4">
            {/* Parameters */}
            <h3 className="text-sm font-semibold text-slate-300 mb-3">
              {lang === 'fa' ? 'پارامترها' : 'Parameters'}
            </h3>
            <div className="space-y-3 mb-4">
              {mode === '2d' ? (
                selectedShape2D.params.map(param => (
                  <div key={param.name}>
                    <label className="text-xs text-slate-400 block mb-1">
                      {param.label[lang]}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={params2D[param.name] || param.default}
                      onChange={(e) => setParams2D(prev => ({ 
                        ...prev, 
                        [param.name]: parseFloat(e.target.value) || param.default 
                      }))}
                      className="w-full bg-slate-900/60 text-white border border-slate-700/50 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                ))
              ) : (
                selectedShape3D.params.map(param => (
                  <div key={param.name}>
                    <label className="text-xs text-slate-400 block mb-1">
                      {param.label[lang]}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={params3D[param.name] || param.default}
                      onChange={(e) => setParams3D(prev => ({ 
                        ...prev, 
                        [param.name]: parseFloat(e.target.value) || param.default 
                      }))}
                      className="w-full bg-slate-900/60 text-white border border-slate-700/50 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                ))
              )}
            </div>

            {/* Formulas */}
            <div className="bg-slate-900/50 rounded-xl p-3 mb-4">
              <h4 className="text-xs font-semibold text-slate-400 mb-2">
                {lang === 'fa' ? 'فرمول‌ها' : 'Formulas'}
              </h4>
              {mode === '2d' ? (
                <>
                  <div className="text-xs text-cyan-400 font-mono mb-1">{selectedShape2D.formulas.area}</div>
                  <div className="text-xs text-emerald-400 font-mono">{selectedShape2D.formulas.perimeter}</div>
                </>
              ) : (
                <>
                  <div className="text-xs text-cyan-400 font-mono mb-1">{selectedShape3D.formulas.volume}</div>
                  <div className="text-xs text-emerald-400 font-mono">{selectedShape3D.formulas.surface}</div>
                </>
              )}
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-xl p-3 border border-emerald-500/20">
              <h4 className="text-xs font-semibold text-slate-300 mb-3">
                {lang === 'fa' ? 'نتایج محاسبات' : 'Calculation Results'}
              </h4>
              {mode === '2d' ? (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-slate-400">{lang === 'fa' ? 'مساحت:' : 'Area:'}</span>
                    <span className="text-sm font-bold text-cyan-400 font-mono">
                      {formatNumber(selectedShape2D.calcArea(params2D))}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">{lang === 'fa' ? 'محیط:' : 'Perimeter:'}</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      {formatNumber(selectedShape2D.calcPerimeter(params2D))}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-slate-400">{lang === 'fa' ? 'حجم:' : 'Volume:'}</span>
                    <span className="text-sm font-bold text-cyan-400 font-mono">
                      {formatNumber(selectedShape3D.calcVolume(params3D))}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">{lang === 'fa' ? 'مساحت سطح:' : 'Surface:'}</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      {formatNumber(selectedShape3D.calcSurface(params3D))}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
