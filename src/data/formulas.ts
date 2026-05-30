export interface FormulaVariable {
  name: string;
  label: { en: string; fa: string };
  unit: string;
  defaultValue?: number;
}

export interface Formula {
  id: string;
  name: { en: string; fa: string };
  category: string;
  subcategory: string;
  equation: string;
  variables: FormulaVariable[];
  solve: (vars: Record<string, number>, unknown: string) => number;
  description?: { en: string; fa: string };
}

export interface Category {
  id: string;
  name: { en: string; fa: string };
  icon: string;
  subcategories: { id: string; name: { en: string; fa: string } }[];
}

export const categories: Category[] = [
  {
    id: 'basic',
    name: { en: 'Basic Calculator', fa: 'ماشین حساب پایه' },
    icon: '🔢',
    subcategories: [
      { id: 'arithmetic', name: { en: 'Arithmetic', fa: 'محاسبات پایه' } },
    ],
  },
  {
    id: 'engineering',
    name: { en: 'Engineering Calculator', fa: 'ماشین حساب مهندسی' },
    icon: '⚙️',
    subcategories: [
      { id: 'scientific', name: { en: 'Scientific', fa: 'علمی' } },
    ],
  },
  {
    id: 'physics',
    name: { en: 'Physics', fa: 'فیزیک' },
    icon: '⚛️',
    subcategories: [
      { id: 'mechanics', name: { en: 'Mechanics', fa: 'مکانیک' } },
      { id: 'thermodynamics', name: { en: 'Thermodynamics', fa: 'ترمودینامیک' } },
      { id: 'waves', name: { en: 'Waves & Optics', fa: 'امواج و نور' } },
      { id: 'electromagnetism', name: { en: 'Electromagnetism', fa: 'الکترومغناطیس' } },
      { id: 'fluids', name: { en: 'Fluid Mechanics', fa: 'مکانیک سیالات' } },
      { id: 'gravity', name: { en: 'Gravitation', fa: 'گرانش' } },
    ],
  },
  {
    id: 'quantum',
    name: { en: 'Quantum Physics', fa: 'فیزیک کوانتوم' },
    icon: '🔬',
    subcategories: [
      { id: 'quantum_basics', name: { en: 'Quantum Basics', fa: 'مبانی کوانتوم' } },
      { id: 'atomic', name: { en: 'Atomic Physics', fa: 'فیزیک اتمی' } },
      { id: 'nuclear', name: { en: 'Nuclear Physics', fa: 'فیزیک هسته‌ای' } },
      { id: 'relativity', name: { en: 'Relativity', fa: 'نسبیت' } },
    ],
  },
  {
    id: 'chemistry',
    name: { en: 'Chemistry', fa: 'شیمی' },
    icon: '🧪',
    subcategories: [
      { id: 'general_chem', name: { en: 'General Chemistry', fa: 'شیمی عمومی' } },
      { id: 'solutions', name: { en: 'Solutions', fa: 'محلول‌ها' } },
      { id: 'thermochem', name: { en: 'Thermochemistry', fa: 'ترموشیمی' } },
      { id: 'electrochemistry', name: { en: 'Electrochemistry', fa: 'الکتروشیمی' } },
      { id: 'kinetics', name: { en: 'Chemical Kinetics', fa: 'سینتیک شیمیایی' } },
    ],
  },
  {
    id: 'math',
    name: { en: 'Mathematics', fa: 'ریاضیات' },
    icon: '📐',
    subcategories: [
      { id: 'algebra', name: { en: 'Algebra', fa: 'جبر' } },
      { id: 'geometry', name: { en: 'Geometry', fa: 'هندسه' } },
      { id: 'trigonometry', name: { en: 'Trigonometry', fa: 'مثلثات' } },
      { id: 'sequences', name: { en: 'Sequences & Series', fa: 'دنباله و سری' } },
      { id: 'statistics', name: { en: 'Statistics', fa: 'آمار' } },
    ],
  },
  {
    id: 'advanced_math',
    name: { en: 'Advanced Mathematics', fa: 'ریاضیات پیشرفته' },
    icon: '🎯',
    subcategories: [
      { id: 'calculus', name: { en: 'Calculus', fa: 'حسابان' } },
      { id: 'differential_eq', name: { en: 'Differential Equations', fa: 'معادلات دیفرانسیل' } },
      { id: 'linear_algebra', name: { en: 'Linear Algebra', fa: 'جبر خطی' } },
      { id: 'complex_analysis', name: { en: 'Complex Analysis', fa: 'آنالیز مختلط' } },
      { id: 'transforms', name: { en: 'Transforms', fa: 'تبدیلات' } },
    ],
  },
  {
    id: 'eng_math',
    name: { en: 'Engineering Mathematics', fa: 'ریاضیات مهندسی' },
    icon: '📊',
    subcategories: [
      { id: 'numerical', name: { en: 'Numerical Methods', fa: 'روش‌های عددی' } },
      { id: 'optimization', name: { en: 'Optimization', fa: 'بهینه‌سازی' } },
      { id: 'interpolation', name: { en: 'Interpolation', fa: 'درون‌یابی' } },
    ],
  },
  {
    id: 'electronics',
    name: { en: 'Electronics', fa: 'الکترونیک' },
    icon: '💡',
    subcategories: [
      { id: 'basic_electronics', name: { en: 'Basic Electronics', fa: 'الکترونیک پایه' } },
      { id: 'semiconductors', name: { en: 'Semiconductors', fa: 'نیمه‌هادی‌ها' } },
      { id: 'amplifiers', name: { en: 'Amplifiers', fa: 'تقویت‌کننده‌ها' } },
      { id: 'filters', name: { en: 'Filters', fa: 'فیلترها' } },
    ],
  },
  {
    id: 'circuits',
    name: { en: 'Electrical Circuits', fa: 'مدار الکتریکی' },
    icon: '🔌',
    subcategories: [
      { id: 'dc_circuits', name: { en: 'DC Circuits', fa: 'مدار DC' } },
      { id: 'ac_circuits', name: { en: 'AC Circuits', fa: 'مدار AC' } },
      { id: 'power', name: { en: 'Power Systems', fa: 'سیستم‌های قدرت' } },
      { id: 'rlc', name: { en: 'RLC Circuits', fa: 'مدارهای RLC' } },
    ],
  },
  {
    id: 'signals',
    name: { en: 'Signals & Systems', fa: 'سیگنال و سیستم' },
    icon: '📡',
    subcategories: [
      { id: 'continuous', name: { en: 'Continuous Signals', fa: 'سیگنال پیوسته' } },
      { id: 'discrete', name: { en: 'Discrete Signals', fa: 'سیگنال گسسته' } },
      { id: 'frequency', name: { en: 'Frequency Domain', fa: 'حوزه فرکانس' } },
      { id: 'modulation', name: { en: 'Modulation', fa: 'مدولاسیون' } },
    ],
  },
  {
    id: 'digital_control',
    name: { en: 'Digital Control', fa: 'کنترل دیجیتال' },
    icon: '🎛️',
    subcategories: [
      { id: 'control_basics', name: { en: 'Control Basics', fa: 'مبانی کنترل' } },
      { id: 'z_transform', name: { en: 'Z-Transform', fa: 'تبدیل Z' } },
      { id: 'stability', name: { en: 'Stability', fa: 'پایداری' } },
      { id: 'pid', name: { en: 'PID Control', fa: 'کنترل PID' } },
    ],
  },
  {
    id: 'biology',
    name: { en: 'Biology', fa: 'زیست‌شناسی' },
    icon: '🧬',
    subcategories: [
      { id: 'genetics', name: { en: 'Genetics', fa: 'ژنتیک' } },
      { id: 'ecology', name: { en: 'Ecology', fa: 'بوم‌شناسی' } },
      { id: 'biochemistry', name: { en: 'Biochemistry', fa: 'بیوشیمی' } },
      { id: 'physiology', name: { en: 'Physiology', fa: 'فیزیولوژی' } },
    ],
  },
  {
    id: 'differential',
    name: { en: 'Differential Calculus', fa: 'دیفرانسیل' },
    icon: '∫',
    subcategories: [
      { id: 'derivatives', name: { en: 'Derivatives', fa: 'مشتقات' } },
      { id: 'integrals', name: { en: 'Integrals', fa: 'انتگرال‌ها' } },
      { id: 'applications', name: { en: 'Applications', fa: 'کاربردها' } },
    ],
  },
];

// Helper to create formula objects more easily
const f = (
  id: string,
  nameEn: string,
  nameFa: string,
  category: string,
  subcategory: string,
  equation: string,
  variables: FormulaVariable[],
  solve: (vars: Record<string, number>, unknown: string) => number,
  descEn?: string,
  descFa?: string
): Formula => ({
  id,
  name: { en: nameEn, fa: nameFa },
  category,
  subcategory,
  equation,
  variables,
  solve,
  description: descEn ? { en: descEn, fa: descFa || '' } : undefined,
});

const v = (name: string, labelEn: string, labelFa: string, unit: string): FormulaVariable => ({
  name,
  label: { en: labelEn, fa: labelFa },
  unit,
});

export const formulas: Formula[] = [
  // ==================== PHYSICS - MECHANICS ====================
  f('p1', "Newton's Second Law", 'قانون دوم نیوتن', 'physics', 'mechanics', 'F = m × a',
    [v('F', 'Force', 'نیرو', 'N'), v('m', 'Mass', 'جرم', 'kg'), v('a', 'Acceleration', 'شتاب', 'm/s²')],
    (vars, u) => u === 'F' ? vars.m * vars.a : u === 'm' ? vars.F / vars.a : vars.F / vars.m),
  
  f('p2', 'Velocity', 'سرعت', 'physics', 'mechanics', 'v = v₀ + a×t',
    [v('v', 'Final Velocity', 'سرعت نهایی', 'm/s'), v('v0', 'Initial Velocity', 'سرعت اولیه', 'm/s'), v('a', 'Acceleration', 'شتاب', 'm/s²'), v('t', 'Time', 'زمان', 's')],
    (vars, u) => u === 'v' ? vars.v0 + vars.a * vars.t : u === 'v0' ? vars.v - vars.a * vars.t : u === 'a' ? (vars.v - vars.v0) / vars.t : (vars.v - vars.v0) / vars.a),

  f('p3', 'Displacement', 'جابجایی', 'physics', 'mechanics', 's = v₀t + ½at²',
    [v('s', 'Displacement', 'جابجایی', 'm'), v('v0', 'Initial Velocity', 'سرعت اولیه', 'm/s'), v('a', 'Acceleration', 'شتاب', 'm/s²'), v('t', 'Time', 'زمان', 's')],
    (vars, u) => u === 's' ? vars.v0 * vars.t + 0.5 * vars.a * vars.t ** 2 : u === 'v0' ? (vars.s - 0.5 * vars.a * vars.t ** 2) / vars.t : u === 'a' ? 2 * (vars.s - vars.v0 * vars.t) / (vars.t ** 2) : NaN),

  f('p4', 'Velocity-Displacement', 'سرعت-جابجایی', 'physics', 'mechanics', 'v² = v₀² + 2as',
    [v('v', 'Final Velocity', 'سرعت نهایی', 'm/s'), v('v0', 'Initial Velocity', 'سرعت اولیه', 'm/s'), v('a', 'Acceleration', 'شتاب', 'm/s²'), v('s', 'Displacement', 'جابجایی', 'm')],
    (vars, u) => u === 'v' ? Math.sqrt(vars.v0 ** 2 + 2 * vars.a * vars.s) : u === 'v0' ? Math.sqrt(vars.v ** 2 - 2 * vars.a * vars.s) : u === 'a' ? (vars.v ** 2 - vars.v0 ** 2) / (2 * vars.s) : (vars.v ** 2 - vars.v0 ** 2) / (2 * vars.a)),

  f('p5', 'Momentum', 'تکانه', 'physics', 'mechanics', 'p = m × v',
    [v('p', 'Momentum', 'تکانه', 'kg·m/s'), v('m', 'Mass', 'جرم', 'kg'), v('v_val', 'Velocity', 'سرعت', 'm/s')],
    (vars, u) => u === 'p' ? vars.m * vars.v_val : u === 'm' ? vars.p / vars.v_val : vars.p / vars.m),

  f('p6', 'Kinetic Energy', 'انرژی جنبشی', 'physics', 'mechanics', 'KE = ½mv²',
    [v('KE', 'Kinetic Energy', 'انرژی جنبشی', 'J'), v('m', 'Mass', 'جرم', 'kg'), v('v', 'Velocity', 'سرعت', 'm/s')],
    (vars, u) => u === 'KE' ? 0.5 * vars.m * vars.v ** 2 : u === 'm' ? 2 * vars.KE / (vars.v ** 2) : Math.sqrt(2 * vars.KE / vars.m)),

  f('p7', 'Potential Energy', 'انرژی پتانسیل', 'physics', 'mechanics', 'PE = mgh',
    [v('PE', 'Potential Energy', 'انرژی پتانسیل', 'J'), v('m', 'Mass', 'جرم', 'kg'), v('g', 'Gravity', 'شتاب گرانش', 'm/s²'), v('h', 'Height', 'ارتفاع', 'm')],
    (vars, u) => u === 'PE' ? vars.m * vars.g * vars.h : u === 'm' ? vars.PE / (vars.g * vars.h) : u === 'g' ? vars.PE / (vars.m * vars.h) : vars.PE / (vars.m * vars.g)),

  f('p8', 'Work', 'کار', 'physics', 'mechanics', 'W = F × d × cos(θ)',
    [v('W', 'Work', 'کار', 'J'), v('F', 'Force', 'نیرو', 'N'), v('d', 'Distance', 'فاصله', 'm'), v('theta', 'Angle', 'زاویه', '°')],
    (vars, u) => u === 'W' ? vars.F * vars.d * Math.cos(vars.theta * Math.PI / 180) : u === 'F' ? vars.W / (vars.d * Math.cos(vars.theta * Math.PI / 180)) : u === 'd' ? vars.W / (vars.F * Math.cos(vars.theta * Math.PI / 180)) : Math.acos(vars.W / (vars.F * vars.d)) * 180 / Math.PI),

  f('p9', 'Power', 'توان', 'physics', 'mechanics', 'P = W / t',
    [v('P', 'Power', 'توان', 'W'), v('W', 'Work', 'کار', 'J'), v('t', 'Time', 'زمان', 's')],
    (vars, u) => u === 'P' ? vars.W / vars.t : u === 'W' ? vars.P * vars.t : vars.W / vars.P),

  f('p10', 'Impulse', 'ضربه', 'physics', 'mechanics', 'J = F × Δt',
    [v('J', 'Impulse', 'ضربه', 'N·s'), v('F', 'Force', 'نیرو', 'N'), v('dt', 'Time interval', 'بازه زمانی', 's')],
    (vars, u) => u === 'J' ? vars.F * vars.dt : u === 'F' ? vars.J / vars.dt : vars.J / vars.F),

  f('p11', 'Centripetal Force', 'نیروی مرکزگرا', 'physics', 'mechanics', 'F = mv²/r',
    [v('F', 'Force', 'نیرو', 'N'), v('m', 'Mass', 'جرم', 'kg'), v('v', 'Velocity', 'سرعت', 'm/s'), v('r', 'Radius', 'شعاع', 'm')],
    (vars, u) => u === 'F' ? vars.m * vars.v ** 2 / vars.r : u === 'm' ? vars.F * vars.r / (vars.v ** 2) : u === 'v' ? Math.sqrt(vars.F * vars.r / vars.m) : vars.m * vars.v ** 2 / vars.F),

  f('p12', 'Torque', 'گشتاور', 'physics', 'mechanics', 'τ = r × F × sin(θ)',
    [v('tau', 'Torque', 'گشتاور', 'N·m'), v('r', 'Radius', 'شعاع', 'm'), v('F', 'Force', 'نیرو', 'N'), v('theta', 'Angle', 'زاویه', '°')],
    (vars, u) => u === 'tau' ? vars.r * vars.F * Math.sin(vars.theta * Math.PI / 180) : u === 'r' ? vars.tau / (vars.F * Math.sin(vars.theta * Math.PI / 180)) : u === 'F' ? vars.tau / (vars.r * Math.sin(vars.theta * Math.PI / 180)) : Math.asin(vars.tau / (vars.r * vars.F)) * 180 / Math.PI),

  f('p13', 'Angular Velocity', 'سرعت زاویه‌ای', 'physics', 'mechanics', 'ω = 2π/T',
    [v('omega', 'Angular Velocity', 'سرعت زاویه‌ای', 'rad/s'), v('T', 'Period', 'دوره', 's')],
    (vars, u) => u === 'omega' ? 2 * Math.PI / vars.T : vars.T = 2 * Math.PI / vars.omega),

  f('p14', 'Angular Acceleration', 'شتاب زاویه‌ای', 'physics', 'mechanics', 'α = Δω/Δt',
    [v('alpha', 'Angular Acceleration', 'شتاب زاویه‌ای', 'rad/s²'), v('dw', 'Change in ω', 'تغییر ω', 'rad/s'), v('dt', 'Time interval', 'بازه زمانی', 's')],
    (vars, u) => u === 'alpha' ? vars.dw / vars.dt : u === 'dw' ? vars.alpha * vars.dt : vars.dw / vars.alpha),

  f('p15', 'Moment of Inertia (point)', 'گشتاور لختی (نقطه‌ای)', 'physics', 'mechanics', 'I = mr²',
    [v('I', 'Moment of Inertia', 'گشتاور لختی', 'kg·m²'), v('m', 'Mass', 'جرم', 'kg'), v('r', 'Radius', 'شعاع', 'm')],
    (vars, u) => u === 'I' ? vars.m * vars.r ** 2 : u === 'm' ? vars.I / (vars.r ** 2) : Math.sqrt(vars.I / vars.m)),

  f('p16', 'Rotational KE', 'انرژی جنبشی دورانی', 'physics', 'mechanics', 'KE = ½Iω²',
    [v('KE', 'Kinetic Energy', 'انرژی جنبشی', 'J'), v('I', 'Moment of Inertia', 'گشتاور لختی', 'kg·m²'), v('omega', 'Angular Velocity', 'سرعت زاویه‌ای', 'rad/s')],
    (vars, u) => u === 'KE' ? 0.5 * vars.I * vars.omega ** 2 : u === 'I' ? 2 * vars.KE / (vars.omega ** 2) : Math.sqrt(2 * vars.KE / vars.I)),

  f('p17', 'Angular Momentum', 'تکانه زاویه‌ای', 'physics', 'mechanics', 'L = Iω',
    [v('L', 'Angular Momentum', 'تکانه زاویه‌ای', 'kg·m²/s'), v('I', 'Moment of Inertia', 'گشتاور لختی', 'kg·m²'), v('omega', 'Angular Velocity', 'سرعت زاویه‌ای', 'rad/s')],
    (vars, u) => u === 'L' ? vars.I * vars.omega : u === 'I' ? vars.L / vars.omega : vars.L / vars.I),

  f('p18', 'Hooke\'s Law', 'قانون هوک', 'physics', 'mechanics', 'F = -kx',
    [v('F', 'Force', 'نیرو', 'N'), v('k', 'Spring Constant', 'ثابت فنر', 'N/m'), v('x', 'Displacement', 'جابجایی', 'm')],
    (vars, u) => u === 'F' ? vars.k * vars.x : u === 'k' ? vars.F / vars.x : vars.F / vars.k),

  f('p19', 'Elastic PE', 'انرژی پتانسیل کشسانی', 'physics', 'mechanics', 'PE = ½kx²',
    [v('PE', 'Potential Energy', 'انرژی پتانسیل', 'J'), v('k', 'Spring Constant', 'ثابت فنر', 'N/m'), v('x', 'Displacement', 'جابجایی', 'm')],
    (vars, u) => u === 'PE' ? 0.5 * vars.k * vars.x ** 2 : u === 'k' ? 2 * vars.PE / (vars.x ** 2) : Math.sqrt(2 * vars.PE / vars.k)),

  f('p20', 'Friction Force', 'نیروی اصطکاک', 'physics', 'mechanics', 'f = μN',
    [v('f', 'Friction', 'اصطکاک', 'N'), v('mu', 'Coefficient', 'ضریب', ''), v('N', 'Normal Force', 'نیروی عمودی', 'N')],
    (vars, u) => u === 'f' ? vars.mu * vars.N : u === 'mu' ? vars.f / vars.N : vars.f / vars.mu),

  f('p21', 'Projectile Range', 'برد پرتابه', 'physics', 'mechanics', 'R = v²sin(2θ)/g',
    [v('R', 'Range', 'برد', 'm'), v('v', 'Velocity', 'سرعت', 'm/s'), v('theta', 'Angle', 'زاویه', '°'), v('g', 'Gravity', 'گرانش', 'm/s²')],
    (vars, u) => u === 'R' ? vars.v ** 2 * Math.sin(2 * vars.theta * Math.PI / 180) / vars.g : u === 'v' ? Math.sqrt(vars.R * vars.g / Math.sin(2 * vars.theta * Math.PI / 180)) : u === 'g' ? vars.v ** 2 * Math.sin(2 * vars.theta * Math.PI / 180) / vars.R : Math.asin(vars.R * vars.g / (vars.v ** 2)) * 90 / Math.PI),

  f('p22', 'Projectile Max Height', 'حداکثر ارتفاع پرتابه', 'physics', 'mechanics', 'H = v²sin²(θ)/(2g)',
    [v('H', 'Max Height', 'حداکثر ارتفاع', 'm'), v('v', 'Velocity', 'سرعت', 'm/s'), v('theta', 'Angle', 'زاویه', '°'), v('g', 'Gravity', 'گرانش', 'm/s²')],
    (vars, u) => u === 'H' ? vars.v ** 2 * Math.sin(vars.theta * Math.PI / 180) ** 2 / (2 * vars.g) : u === 'v' ? Math.sqrt(2 * vars.H * vars.g / Math.sin(vars.theta * Math.PI / 180) ** 2) : u === 'g' ? vars.v ** 2 * Math.sin(vars.theta * Math.PI / 180) ** 2 / (2 * vars.H) : Math.asin(Math.sqrt(2 * vars.H * vars.g / (vars.v ** 2))) * 180 / Math.PI),

  f('p23', 'Frequency', 'فرکانس', 'physics', 'mechanics', 'f = 1/T',
    [v('f', 'Frequency', 'فرکانس', 'Hz'), v('T', 'Period', 'دوره', 's')],
    (vars, u) => u === 'f' ? 1 / vars.T : 1 / vars.f),

  f('p24', 'Simple Pendulum', 'آونگ ساده', 'physics', 'mechanics', 'T = 2π√(L/g)',
    [v('T', 'Period', 'دوره', 's'), v('L', 'Length', 'طول', 'm'), v('g', 'Gravity', 'گرانش', 'm/s²')],
    (vars, u) => u === 'T' ? 2 * Math.PI * Math.sqrt(vars.L / vars.g) : u === 'L' ? vars.g * (vars.T / (2 * Math.PI)) ** 2 : vars.L / (vars.T / (2 * Math.PI)) ** 2),

  f('p25', 'Density', 'چگالی', 'physics', 'mechanics', 'ρ = m/V',
    [v('rho', 'Density', 'چگالی', 'kg/m³'), v('m', 'Mass', 'جرم', 'kg'), v('V', 'Volume', 'حجم', 'm³')],
    (vars, u) => u === 'rho' ? vars.m / vars.V : u === 'm' ? vars.rho * vars.V : vars.m / vars.rho),

  // ==================== PHYSICS - THERMODYNAMICS ====================
  f('p26', 'Ideal Gas Law', 'قانون گاز ایده‌آل', 'physics', 'thermodynamics', 'PV = nRT',
    [v('P', 'Pressure', 'فشار', 'Pa'), v('V', 'Volume', 'حجم', 'm³'), v('n', 'Moles', 'مول', 'mol'), v('R', 'Gas Constant', 'ثابت گاز', 'J/(mol·K)'), v('T', 'Temperature', 'دما', 'K')],
    (vars, u) => u === 'P' ? vars.n * vars.R * vars.T / vars.V : u === 'V' ? vars.n * vars.R * vars.T / vars.P : u === 'n' ? vars.P * vars.V / (vars.R * vars.T) : u === 'R' ? vars.P * vars.V / (vars.n * vars.T) : vars.P * vars.V / (vars.n * vars.R)),

  f('p27', 'Heat Transfer', 'انتقال حرارت', 'physics', 'thermodynamics', 'Q = mcΔT',
    [v('Q', 'Heat', 'حرارت', 'J'), v('m', 'Mass', 'جرم', 'kg'), v('c', 'Specific Heat', 'گرمای ویژه', 'J/(kg·K)'), v('dT', 'Temp Change', 'تغییر دما', 'K')],
    (vars, u) => u === 'Q' ? vars.m * vars.c * vars.dT : u === 'm' ? vars.Q / (vars.c * vars.dT) : u === 'c' ? vars.Q / (vars.m * vars.dT) : vars.Q / (vars.m * vars.c)),

  f('p28', 'Thermal Expansion', 'انبساط حرارتی', 'physics', 'thermodynamics', 'ΔL = αL₀ΔT',
    [v('dL', 'Length Change', 'تغییر طول', 'm'), v('alpha', 'Expansion Coeff', 'ضریب انبساط', '1/K'), v('L0', 'Initial Length', 'طول اولیه', 'm'), v('dT', 'Temp Change', 'تغییر دما', 'K')],
    (vars, u) => u === 'dL' ? vars.alpha * vars.L0 * vars.dT : u === 'alpha' ? vars.dL / (vars.L0 * vars.dT) : u === 'L0' ? vars.dL / (vars.alpha * vars.dT) : vars.dL / (vars.alpha * vars.L0)),

  f('p29', 'Heat Conduction', 'هدایت حرارتی', 'physics', 'thermodynamics', 'Q/t = kA(ΔT)/d',
    [v('Qt', 'Heat Rate', 'نرخ حرارت', 'W'), v('k', 'Conductivity', 'هدایت حرارتی', 'W/(m·K)'), v('A', 'Area', 'سطح', 'm²'), v('dT', 'Temp Diff', 'اختلاف دما', 'K'), v('d', 'Thickness', 'ضخامت', 'm')],
    (vars, u) => u === 'Qt' ? vars.k * vars.A * vars.dT / vars.d : u === 'k' ? vars.Qt * vars.d / (vars.A * vars.dT) : u === 'A' ? vars.Qt * vars.d / (vars.k * vars.dT) : u === 'dT' ? vars.Qt * vars.d / (vars.k * vars.A) : vars.k * vars.A * vars.dT / vars.Qt),

  f('p30', 'Stefan-Boltzmann', 'استفان-بولتزمن', 'physics', 'thermodynamics', 'P = εσAT⁴',
    [v('P', 'Power', 'توان', 'W'), v('epsilon', 'Emissivity', 'ضریب گسیل', ''), v('A', 'Area', 'سطح', 'm²'), v('T', 'Temperature', 'دما', 'K')],
    (vars, u) => { const sigma = 5.67e-8; return u === 'P' ? vars.epsilon * sigma * vars.A * vars.T ** 4 : u === 'epsilon' ? vars.P / (sigma * vars.A * vars.T ** 4) : u === 'A' ? vars.P / (vars.epsilon * sigma * vars.T ** 4) : (vars.P / (vars.epsilon * sigma * vars.A)) ** 0.25; }),

  f('p31', 'Entropy Change', 'تغییر آنتروپی', 'physics', 'thermodynamics', 'ΔS = Q/T',
    [v('dS', 'Entropy Change', 'تغییر آنتروپی', 'J/K'), v('Q', 'Heat', 'حرارت', 'J'), v('T', 'Temperature', 'دما', 'K')],
    (vars, u) => u === 'dS' ? vars.Q / vars.T : u === 'Q' ? vars.dS * vars.T : vars.Q / vars.dS),

  f('p32', 'Carnot Efficiency', 'بازده کارنو', 'physics', 'thermodynamics', 'η = 1 - Tc/Th',
    [v('eta', 'Efficiency', 'بازده', ''), v('Tc', 'Cold Temp', 'دمای سرد', 'K'), v('Th', 'Hot Temp', 'دمای گرم', 'K')],
    (vars, u) => u === 'eta' ? 1 - vars.Tc / vars.Th : u === 'Tc' ? vars.Th * (1 - vars.eta) : vars.Tc / (1 - vars.eta)),

  f('p33', 'Boyle\'s Law', 'قانون بویل', 'physics', 'thermodynamics', 'P₁V₁ = P₂V₂',
    [v('P1', 'Pressure 1', 'فشار ۱', 'Pa'), v('V1', 'Volume 1', 'حجم ۱', 'm³'), v('P2', 'Pressure 2', 'فشار ۲', 'Pa'), v('V2', 'Volume 2', 'حجم ۲', 'm³')],
    (vars, u) => u === 'P1' ? vars.P2 * vars.V2 / vars.V1 : u === 'V1' ? vars.P2 * vars.V2 / vars.P1 : u === 'P2' ? vars.P1 * vars.V1 / vars.V2 : vars.P1 * vars.V1 / vars.P2),

  f('p34', 'Charles\'s Law', 'قانون شارل', 'physics', 'thermodynamics', 'V₁/T₁ = V₂/T₂',
    [v('V1', 'Volume 1', 'حجم ۱', 'm³'), v('T1', 'Temp 1', 'دمای ۱', 'K'), v('V2', 'Volume 2', 'حجم ۲', 'm³'), v('T2', 'Temp 2', 'دمای ۲', 'K')],
    (vars, u) => u === 'V1' ? vars.V2 * vars.T1 / vars.T2 : u === 'T1' ? vars.V1 * vars.T2 / vars.V2 : u === 'V2' ? vars.V1 * vars.T2 / vars.T1 : vars.V2 * vars.T1 / vars.V1),

  f('p35', 'Latent Heat', 'گرمای نهان', 'physics', 'thermodynamics', 'Q = mL',
    [v('Q', 'Heat', 'حرارت', 'J'), v('m', 'Mass', 'جرم', 'kg'), v('L', 'Latent Heat', 'گرمای نهان', 'J/kg')],
    (vars, u) => u === 'Q' ? vars.m * vars.L : u === 'm' ? vars.Q / vars.L : vars.Q / vars.m),

  // ==================== PHYSICS - WAVES ====================
  f('p36', 'Wave Speed', 'سرعت موج', 'physics', 'waves', 'v = fλ',
    [v('v', 'Wave Speed', 'سرعت موج', 'm/s'), v('f', 'Frequency', 'فرکانس', 'Hz'), v('lambda', 'Wavelength', 'طول موج', 'm')],
    (vars, u) => u === 'v' ? vars.f * vars.lambda : u === 'f' ? vars.v / vars.lambda : vars.v / vars.f),

  f('p37', 'Snell\'s Law', 'قانون اسنل', 'physics', 'waves', 'n₁sin(θ₁) = n₂sin(θ₂)',
    [v('n1', 'Index 1', 'ضریب ۱', ''), v('theta1', 'Angle 1', 'زاویه ۱', '°'), v('n2', 'Index 2', 'ضریب ۲', ''), v('theta2', 'Angle 2', 'زاویه ۲', '°')],
    (vars, u) => u === 'n1' ? vars.n2 * Math.sin(vars.theta2 * Math.PI / 180) / Math.sin(vars.theta1 * Math.PI / 180) : u === 'theta1' ? Math.asin(vars.n2 * Math.sin(vars.theta2 * Math.PI / 180) / vars.n1) * 180 / Math.PI : u === 'n2' ? vars.n1 * Math.sin(vars.theta1 * Math.PI / 180) / Math.sin(vars.theta2 * Math.PI / 180) : Math.asin(vars.n1 * Math.sin(vars.theta1 * Math.PI / 180) / vars.n2) * 180 / Math.PI),

  f('p38', 'Lens Equation', 'معادله عدسی', 'physics', 'waves', '1/f = 1/do + 1/di',
    [v('f', 'Focal Length', 'فاصله کانونی', 'm'), v('do', 'Object Dist', 'فاصله جسم', 'm'), v('di', 'Image Dist', 'فاصله تصویر', 'm')],
    (vars, u) => u === 'f' ? 1 / (1 / vars.do + 1 / vars.di) : u === 'do' ? 1 / (1 / vars.f - 1 / vars.di) : 1 / (1 / vars.f - 1 / vars.do)),

  f('p39', 'Magnification', 'بزرگنمایی', 'physics', 'waves', 'M = -di/do',
    [v('M', 'Magnification', 'بزرگنمایی', ''), v('di', 'Image Dist', 'فاصله تصویر', 'm'), v('do', 'Object Dist', 'فاصله جسم', 'm')],
    (vars, u) => u === 'M' ? -vars.di / vars.do : u === 'di' ? -vars.M * vars.do : -vars.di / vars.M),

  f('p40', 'Doppler Effect', 'اثر دوپلر', 'physics', 'waves', 'f\' = f(v+vr)/(v+vs)',
    [v('fp', 'Observed Freq', 'فرکانس مشاهده', 'Hz'), v('f', 'Source Freq', 'فرکانس منبع', 'Hz'), v('v', 'Sound Speed', 'سرعت صوت', 'm/s'), v('vr', 'Receiver Speed', 'سرعت گیرنده', 'm/s'), v('vs', 'Source Speed', 'سرعت منبع', 'm/s')],
    (vars, u) => u === 'fp' ? vars.f * (vars.v + vars.vr) / (vars.v + vars.vs) : u === 'f' ? vars.fp * (vars.v + vars.vs) / (vars.v + vars.vr) : NaN),

  f('p41', 'Sound Intensity', 'شدت صوت', 'physics', 'waves', 'β = 10log(I/I₀)',
    [v('beta', 'Sound Level', 'تراز صوت', 'dB'), v('I', 'Intensity', 'شدت', 'W/m²'), v('I0', 'Reference', 'مرجع', 'W/m²')],
    (vars, u) => u === 'beta' ? 10 * Math.log10(vars.I / vars.I0) : u === 'I' ? vars.I0 * 10 ** (vars.beta / 10) : vars.I / 10 ** (vars.beta / 10)),

  f('p42', 'Standing Wave', 'موج ایستاده', 'physics', 'waves', 'λn = 2L/n',
    [v('lambda', 'Wavelength', 'طول موج', 'm'), v('L', 'Length', 'طول', 'm'), v('n', 'Harmonic', 'هارمونیک', '')],
    (vars, u) => u === 'lambda' ? 2 * vars.L / vars.n : u === 'L' ? vars.lambda * vars.n / 2 : 2 * vars.L / vars.lambda),

  f('p43', 'Diffraction Grating', 'پراش توری', 'physics', 'waves', 'dsin(θ) = mλ',
    [v('d', 'Slit Spacing', 'فاصله شکاف', 'm'), v('theta', 'Angle', 'زاویه', '°'), v('m_order', 'Order', 'مرتبه', ''), v('lambda', 'Wavelength', 'طول موج', 'm')],
    (vars, u) => u === 'd' ? vars.m_order * vars.lambda / Math.sin(vars.theta * Math.PI / 180) : u === 'theta' ? Math.asin(vars.m_order * vars.lambda / vars.d) * 180 / Math.PI : u === 'm_order' ? vars.d * Math.sin(vars.theta * Math.PI / 180) / vars.lambda : vars.d * Math.sin(vars.theta * Math.PI / 180) / vars.m_order),

  // ==================== PHYSICS - ELECTROMAGNETISM ====================
  f('p44', 'Coulomb\'s Law', 'قانون کولن', 'physics', 'electromagnetism', 'F = kq₁q₂/r²',
    [v('F', 'Force', 'نیرو', 'N'), v('q1', 'Charge 1', 'بار ۱', 'C'), v('q2', 'Charge 2', 'بار ۲', 'C'), v('r', 'Distance', 'فاصله', 'm')],
    (vars, u) => { const k = 8.99e9; return u === 'F' ? k * vars.q1 * vars.q2 / (vars.r ** 2) : u === 'q1' ? vars.F * vars.r ** 2 / (k * vars.q2) : u === 'q2' ? vars.F * vars.r ** 2 / (k * vars.q1) : Math.sqrt(k * vars.q1 * vars.q2 / vars.F); }),

  f('p45', 'Electric Field', 'میدان الکتریکی', 'physics', 'electromagnetism', 'E = F/q',
    [v('E', 'Electric Field', 'میدان الکتریکی', 'N/C'), v('F', 'Force', 'نیرو', 'N'), v('q', 'Charge', 'بار', 'C')],
    (vars, u) => u === 'E' ? vars.F / vars.q : u === 'F' ? vars.E * vars.q : vars.F / vars.E),

  f('p46', 'Electric Potential', 'پتانسیل الکتریکی', 'physics', 'electromagnetism', 'V = kq/r',
    [v('V', 'Potential', 'پتانسیل', 'V'), v('q', 'Charge', 'بار', 'C'), v('r', 'Distance', 'فاصله', 'm')],
    (vars, u) => { const k = 8.99e9; return u === 'V' ? k * vars.q / vars.r : u === 'q' ? vars.V * vars.r / k : k * vars.q / vars.V; }),

  f('p47', 'Capacitance', 'خازن', 'physics', 'electromagnetism', 'C = Q/V',
    [v('C', 'Capacitance', 'ظرفیت خازن', 'F'), v('Q', 'Charge', 'بار', 'C'), v('V', 'Voltage', 'ولتاژ', 'V')],
    (vars, u) => u === 'C' ? vars.Q / vars.V : u === 'Q' ? vars.C * vars.V : vars.Q / vars.C),

  f('p48', 'Capacitor Energy', 'انرژی خازن', 'physics', 'electromagnetism', 'E = ½CV²',
    [v('E', 'Energy', 'انرژی', 'J'), v('C', 'Capacitance', 'ظرفیت', 'F'), v('V', 'Voltage', 'ولتاژ', 'V')],
    (vars, u) => u === 'E' ? 0.5 * vars.C * vars.V ** 2 : u === 'C' ? 2 * vars.E / (vars.V ** 2) : Math.sqrt(2 * vars.E / vars.C)),

  f('p49', 'Magnetic Force', 'نیروی مغناطیسی', 'physics', 'electromagnetism', 'F = qvBsin(θ)',
    [v('F', 'Force', 'نیرو', 'N'), v('q', 'Charge', 'بار', 'C'), v('v', 'Velocity', 'سرعت', 'm/s'), v('B', 'Mag Field', 'میدان مغناطیسی', 'T'), v('theta', 'Angle', 'زاویه', '°')],
    (vars, u) => u === 'F' ? vars.q * vars.v * vars.B * Math.sin(vars.theta * Math.PI / 180) : u === 'q' ? vars.F / (vars.v * vars.B * Math.sin(vars.theta * Math.PI / 180)) : u === 'v' ? vars.F / (vars.q * vars.B * Math.sin(vars.theta * Math.PI / 180)) : u === 'B' ? vars.F / (vars.q * vars.v * Math.sin(vars.theta * Math.PI / 180)) : Math.asin(vars.F / (vars.q * vars.v * vars.B)) * 180 / Math.PI),

  f('p50', 'Faraday\'s Law', 'قانون فارادی', 'physics', 'electromagnetism', 'EMF = -NΔΦ/Δt',
    [v('EMF', 'EMF', 'نیروی محرکه', 'V'), v('N', 'Turns', 'دور', ''), v('dPhi', 'Flux Change', 'تغییر شار', 'Wb'), v('dt', 'Time', 'زمان', 's')],
    (vars, u) => u === 'EMF' ? vars.N * vars.dPhi / vars.dt : u === 'N' ? vars.EMF * vars.dt / vars.dPhi : u === 'dPhi' ? vars.EMF * vars.dt / vars.N : vars.N * vars.dPhi / vars.EMF),

  f('p51', 'Magnetic Flux', 'شار مغناطیسی', 'physics', 'electromagnetism', 'Φ = BAcos(θ)',
    [v('Phi', 'Flux', 'شار', 'Wb'), v('B', 'Mag Field', 'میدان', 'T'), v('A', 'Area', 'سطح', 'm²'), v('theta', 'Angle', 'زاویه', '°')],
    (vars, u) => u === 'Phi' ? vars.B * vars.A * Math.cos(vars.theta * Math.PI / 180) : u === 'B' ? vars.Phi / (vars.A * Math.cos(vars.theta * Math.PI / 180)) : u === 'A' ? vars.Phi / (vars.B * Math.cos(vars.theta * Math.PI / 180)) : Math.acos(vars.Phi / (vars.B * vars.A)) * 180 / Math.PI),

  f('p52', 'Inductance Energy', 'انرژی سلف', 'physics', 'electromagnetism', 'E = ½LI²',
    [v('E', 'Energy', 'انرژی', 'J'), v('L', 'Inductance', 'اندوکتانس', 'H'), v('I', 'Current', 'جریان', 'A')],
    (vars, u) => u === 'E' ? 0.5 * vars.L * vars.I ** 2 : u === 'L' ? 2 * vars.E / (vars.I ** 2) : Math.sqrt(2 * vars.E / vars.L)),

  f('p53', 'Solenoid B-Field', 'میدان سیملوله', 'physics', 'electromagnetism', 'B = μ₀nI',
    [v('B', 'Mag Field', 'میدان', 'T'), v('n', 'Turns/Length', 'دور/طول', '1/m'), v('I', 'Current', 'جریان', 'A')],
    (vars, u) => { const mu0 = 4 * Math.PI * 1e-7; return u === 'B' ? mu0 * vars.n * vars.I : u === 'n' ? vars.B / (mu0 * vars.I) : vars.B / (mu0 * vars.n); }),

  // ==================== PHYSICS - FLUIDS ====================
  f('p54', 'Pressure', 'فشار', 'physics', 'fluids', 'P = F/A',
    [v('P', 'Pressure', 'فشار', 'Pa'), v('F', 'Force', 'نیرو', 'N'), v('A', 'Area', 'سطح', 'm²')],
    (vars, u) => u === 'P' ? vars.F / vars.A : u === 'F' ? vars.P * vars.A : vars.F / vars.P),

  f('p55', 'Hydrostatic Pressure', 'فشار هیدرواستاتیکی', 'physics', 'fluids', 'P = ρgh',
    [v('P', 'Pressure', 'فشار', 'Pa'), v('rho', 'Density', 'چگالی', 'kg/m³'), v('g', 'Gravity', 'گرانش', 'm/s²'), v('h', 'Height', 'ارتفاع', 'm')],
    (vars, u) => u === 'P' ? vars.rho * vars.g * vars.h : u === 'rho' ? vars.P / (vars.g * vars.h) : u === 'g' ? vars.P / (vars.rho * vars.h) : vars.P / (vars.rho * vars.g)),

  f('p56', 'Buoyant Force', 'نیروی شناوری', 'physics', 'fluids', 'Fb = ρVg',
    [v('Fb', 'Buoyant Force', 'نیروی شناوری', 'N'), v('rho', 'Fluid Density', 'چگالی سیال', 'kg/m³'), v('V', 'Volume', 'حجم', 'm³'), v('g', 'Gravity', 'گرانش', 'm/s²')],
    (vars, u) => u === 'Fb' ? vars.rho * vars.V * vars.g : u === 'rho' ? vars.Fb / (vars.V * vars.g) : u === 'V' ? vars.Fb / (vars.rho * vars.g) : vars.Fb / (vars.rho * vars.V)),

  f('p57', 'Bernoulli\'s Eq', 'معادله برنولی', 'physics', 'fluids', 'P + ½ρv² + ρgh = const',
    [v('P', 'Pressure', 'فشار', 'Pa'), v('rho', 'Density', 'چگالی', 'kg/m³'), v('v', 'Velocity', 'سرعت', 'm/s'), v('g', 'Gravity', 'گرانش', 'm/s²'), v('h', 'Height', 'ارتفاع', 'm')],
    (vars, u) => u === 'P' ? -(0.5 * vars.rho * vars.v ** 2 + vars.rho * vars.g * vars.h) : vars.P + 0.5 * vars.rho * vars.v ** 2 + vars.rho * vars.g * vars.h),

  f('p58', 'Flow Rate', 'دبی', 'physics', 'fluids', 'Q = Av',
    [v('Q', 'Flow Rate', 'دبی', 'm³/s'), v('A', 'Area', 'سطح', 'm²'), v('v', 'Velocity', 'سرعت', 'm/s')],
    (vars, u) => u === 'Q' ? vars.A * vars.v : u === 'A' ? vars.Q / vars.v : vars.Q / vars.A),

  f('p59', 'Viscous Force', 'نیروی لزجی', 'physics', 'fluids', 'F = 6πηrv (Stokes)',
    [v('F', 'Force', 'نیرو', 'N'), v('eta', 'Viscosity', 'لزجت', 'Pa·s'), v('r', 'Radius', 'شعاع', 'm'), v('v', 'Velocity', 'سرعت', 'm/s')],
    (vars, u) => u === 'F' ? 6 * Math.PI * vars.eta * vars.r * vars.v : u === 'eta' ? vars.F / (6 * Math.PI * vars.r * vars.v) : u === 'r' ? vars.F / (6 * Math.PI * vars.eta * vars.v) : vars.F / (6 * Math.PI * vars.eta * vars.r)),

  f('p60', 'Reynolds Number', 'عدد رینولدز', 'physics', 'fluids', 'Re = ρvD/μ',
    [v('Re', 'Reynolds Number', 'عدد رینولدز', ''), v('rho', 'Density', 'چگالی', 'kg/m³'), v('v', 'Velocity', 'سرعت', 'm/s'), v('D', 'Diameter', 'قطر', 'm'), v('mu', 'Viscosity', 'لزجت', 'Pa·s')],
    (vars, u) => u === 'Re' ? vars.rho * vars.v * vars.D / vars.mu : u === 'rho' ? vars.Re * vars.mu / (vars.v * vars.D) : u === 'v' ? vars.Re * vars.mu / (vars.rho * vars.D) : u === 'D' ? vars.Re * vars.mu / (vars.rho * vars.v) : vars.rho * vars.v * vars.D / vars.Re),

  // ==================== PHYSICS - GRAVITATION ====================
  f('p61', 'Gravitational Force', 'نیروی گرانش', 'physics', 'gravity', 'F = Gm₁m₂/r²',
    [v('F', 'Force', 'نیرو', 'N'), v('m1', 'Mass 1', 'جرم ۱', 'kg'), v('m2', 'Mass 2', 'جرم ۲', 'kg'), v('r', 'Distance', 'فاصله', 'm')],
    (vars, u) => { const G = 6.674e-11; return u === 'F' ? G * vars.m1 * vars.m2 / (vars.r ** 2) : u === 'm1' ? vars.F * vars.r ** 2 / (G * vars.m2) : u === 'm2' ? vars.F * vars.r ** 2 / (G * vars.m1) : Math.sqrt(G * vars.m1 * vars.m2 / vars.F); }),

  f('p62', 'Orbital Velocity', 'سرعت مداری', 'physics', 'gravity', 'v = √(GM/r)',
    [v('v', 'Velocity', 'سرعت', 'm/s'), v('M', 'Central Mass', 'جرم مرکزی', 'kg'), v('r', 'Radius', 'شعاع', 'm')],
    (vars, u) => { const G = 6.674e-11; return u === 'v' ? Math.sqrt(G * vars.M / vars.r) : u === 'M' ? vars.v ** 2 * vars.r / G : G * vars.M / (vars.v ** 2); }),

  f('p63', 'Escape Velocity', 'سرعت فرار', 'physics', 'gravity', 'v = √(2GM/r)',
    [v('v', 'Escape Velocity', 'سرعت فرار', 'm/s'), v('M', 'Mass', 'جرم', 'kg'), v('r', 'Radius', 'شعاع', 'm')],
    (vars, u) => { const G = 6.674e-11; return u === 'v' ? Math.sqrt(2 * G * vars.M / vars.r) : u === 'M' ? vars.v ** 2 * vars.r / (2 * G) : 2 * G * vars.M / (vars.v ** 2); }),

  f('p64', 'Kepler\'s Third Law', 'قانون سوم کپلر', 'physics', 'gravity', 'T² = (4π²/GM)r³',
    [v('T', 'Period', 'دوره', 's'), v('M', 'Central Mass', 'جرم مرکزی', 'kg'), v('r', 'Orbital Radius', 'شعاع مداری', 'm')],
    (vars, u) => { const G = 6.674e-11; return u === 'T' ? 2 * Math.PI * Math.sqrt(vars.r ** 3 / (G * vars.M)) : u === 'M' ? 4 * Math.PI ** 2 * vars.r ** 3 / (G * vars.T ** 2) : (G * vars.M * vars.T ** 2 / (4 * Math.PI ** 2)) ** (1 / 3); }),

  f('p65', 'Gravitational PE', 'انرژی پتانسیل گرانشی', 'physics', 'gravity', 'U = -GMm/r',
    [v('U', 'Potential Energy', 'انرژی پتانسیل', 'J'), v('M', 'Mass 1', 'جرم ۱', 'kg'), v('m', 'Mass 2', 'جرم ۲', 'kg'), v('r', 'Distance', 'فاصله', 'm')],
    (vars, u) => { const G = 6.674e-11; return u === 'U' ? -G * vars.M * vars.m / vars.r : u === 'M' ? -vars.U * vars.r / (G * vars.m) : u === 'm' ? -vars.U * vars.r / (G * vars.M) : -G * vars.M * vars.m / vars.U; }),

  // ==================== QUANTUM PHYSICS ====================
  f('q1', 'Photon Energy', 'انرژی فوتون', 'quantum', 'quantum_basics', 'E = hf',
    [v('E', 'Energy', 'انرژی', 'J'), v('h_val', 'Planck Constant', 'ثابت پلانک', 'J·s'), v('f', 'Frequency', 'فرکانس', 'Hz')],
    (vars, u) => u === 'E' ? vars.h_val * vars.f : u === 'h_val' ? vars.E / vars.f : vars.E / vars.h_val),

  f('q2', 'de Broglie Wavelength', 'طول موج دوبروی', 'quantum', 'quantum_basics', 'λ = h/p',
    [v('lambda', 'Wavelength', 'طول موج', 'm'), v('h_val', 'Planck Constant', 'ثابت پلانک', 'J·s'), v('p', 'Momentum', 'تکانه', 'kg·m/s')],
    (vars, u) => u === 'lambda' ? vars.h_val / vars.p : u === 'h_val' ? vars.lambda * vars.p : vars.h_val / vars.lambda),

  f('q3', 'Heisenberg Uncertainty', 'اصل عدم قطعیت', 'quantum', 'quantum_basics', 'ΔxΔp ≥ ℏ/2',
    [v('dx', 'Position Uncertainty', 'عدم قطعیت مکان', 'm'), v('dp', 'Momentum Uncertainty', 'عدم قطعیت تکانه', 'kg·m/s')],
    (vars, u) => { const hbar = 1.055e-34; return u === 'dx' ? hbar / (2 * vars.dp) : hbar / (2 * vars.dx); }),

  f('q4', 'Photoelectric Effect', 'اثر فوتوالکتریک', 'quantum', 'quantum_basics', 'KE = hf - φ',
    [v('KE', 'Kinetic Energy', 'انرژی جنبشی', 'eV'), v('hf', 'Photon Energy', 'انرژی فوتون', 'eV'), v('phi', 'Work Function', 'تابع کار', 'eV')],
    (vars, u) => u === 'KE' ? vars.hf - vars.phi : u === 'hf' ? vars.KE + vars.phi : vars.hf - vars.KE),

  f('q5', 'Compton Scattering', 'پراکندگی کامپتون', 'quantum', 'quantum_basics', 'Δλ = (h/mc)(1-cos θ)',
    [v('dl', 'Wavelength Shift', 'تغییر طول موج', 'm'), v('theta', 'Angle', 'زاویه', '°')],
    (vars, u) => { const hmc = 2.43e-12; return u === 'dl' ? hmc * (1 - Math.cos(vars.theta * Math.PI / 180)) : Math.acos(1 - vars.dl / hmc) * 180 / Math.PI; }),

  f('q6', 'Bohr Model Energy', 'انرژی مدل بور', 'quantum', 'atomic', 'En = -13.6/n² eV',
    [v('En', 'Energy', 'انرژی', 'eV'), v('n', 'Quantum Number', 'عدد کوانتومی', '')],
    (vars, u) => u === 'En' ? -13.6 / (vars.n ** 2) : Math.sqrt(-13.6 / vars.En)),

  f('q7', 'Bohr Radius', 'شعاع بور', 'quantum', 'atomic', 'rn = n²a₀',
    [v('rn', 'Radius', 'شعاع', 'm'), v('n', 'Quantum Number', 'عدد کوانتومی', ''), v('a0', 'Bohr Radius', 'شعاع بور', 'm')],
    (vars, u) => u === 'rn' ? vars.n ** 2 * vars.a0 : u === 'n' ? Math.sqrt(vars.rn / vars.a0) : vars.rn / (vars.n ** 2)),

  f('q8', 'Rydberg Formula', 'فرمول ریدبرگ', 'quantum', 'atomic', '1/λ = R(1/n₁² - 1/n₂²)',
    [v('lambda', 'Wavelength', 'طول موج', 'm'), v('n1', 'Lower Level', 'تراز پایین', ''), v('n2', 'Upper Level', 'تراز بالا', '')],
    (vars, u) => { const R = 1.097e7; return u === 'lambda' ? 1 / (R * (1 / vars.n1 ** 2 - 1 / vars.n2 ** 2)) : NaN; }),

  f('q9', 'Mass-Energy', 'جرم-انرژی', 'quantum', 'relativity', 'E = mc²',
    [v('E', 'Energy', 'انرژی', 'J'), v('m', 'Mass', 'جرم', 'kg')],
    (vars, u) => { const c = 3e8; return u === 'E' ? vars.m * c ** 2 : vars.E / (c ** 2); }),

  f('q10', 'Relativistic Energy', 'انرژی نسبیتی', 'quantum', 'relativity', 'E = γmc²',
    [v('E', 'Energy', 'انرژی', 'J'), v('m', 'Mass', 'جرم', 'kg'), v('v', 'Velocity', 'سرعت', 'm/s')],
    (vars, u) => { const c = 3e8; const g = 1 / Math.sqrt(1 - (vars.v / c) ** 2); return u === 'E' ? g * vars.m * c ** 2 : u === 'm' ? vars.E / (g * c ** 2) : NaN; }),

  f('q11', 'Time Dilation', 'اتساع زمان', 'quantum', 'relativity', 'Δt\' = γΔt',
    [v('dtp', 'Dilated Time', 'زمان اتساع یافته', 's'), v('dt', 'Proper Time', 'زمان خاص', 's'), v('v', 'Velocity', 'سرعت', 'm/s')],
    (vars, u) => { const c = 3e8; const g = 1 / Math.sqrt(1 - (vars.v / c) ** 2); return u === 'dtp' ? g * vars.dt : u === 'dt' ? vars.dtp / g : NaN; }),

  f('q12', 'Length Contraction', 'انقباض طول', 'quantum', 'relativity', 'L = L₀/γ',
    [v('L', 'Contracted Length', 'طول منقبض', 'm'), v('L0', 'Proper Length', 'طول خاص', 'm'), v('v', 'Velocity', 'سرعت', 'm/s')],
    (vars, u) => { const c = 3e8; const g = 1 / Math.sqrt(1 - (vars.v / c) ** 2); return u === 'L' ? vars.L0 / g : u === 'L0' ? vars.L * g : NaN; }),

  f('q13', 'Nuclear Binding Energy', 'انرژی بستگی هسته', 'quantum', 'nuclear', 'BE = Δm × c²',
    [v('BE', 'Binding Energy', 'انرژی بستگی', 'J'), v('dm', 'Mass Defect', 'نقص جرم', 'kg')],
    (vars, u) => { const c = 3e8; return u === 'BE' ? vars.dm * c ** 2 : vars.BE / (c ** 2); }),

  f('q14', 'Radioactive Decay', 'واپاشی رادیواکتیو', 'quantum', 'nuclear', 'N = N₀e^(-λt)',
    [v('N', 'Remaining', 'باقیمانده', ''), v('N0', 'Initial', 'اولیه', ''), v('lambda_d', 'Decay Constant', 'ثابت واپاشی', '1/s'), v('t', 'Time', 'زمان', 's')],
    (vars, u) => u === 'N' ? vars.N0 * Math.exp(-vars.lambda_d * vars.t) : u === 'N0' ? vars.N / Math.exp(-vars.lambda_d * vars.t) : u === 'lambda_d' ? -Math.log(vars.N / vars.N0) / vars.t : -Math.log(vars.N / vars.N0) / vars.lambda_d),

  f('q15', 'Half-Life', 'نیمه عمر', 'quantum', 'nuclear', 't½ = ln(2)/λ',
    [v('t_half', 'Half-Life', 'نیمه عمر', 's'), v('lambda_d', 'Decay Constant', 'ثابت واپاشی', '1/s')],
    (vars, u) => u === 't_half' ? Math.log(2) / vars.lambda_d : Math.log(2) / vars.t_half),

  f('q16', 'Schwarzschild Radius', 'شعاع شوارتسشیلد', 'quantum', 'relativity', 'rs = 2GM/c²',
    [v('rs', 'Schwarzschild R', 'شعاع شوارتسشیلد', 'm'), v('M', 'Mass', 'جرم', 'kg')],
    (vars, u) => { const G = 6.674e-11; const c = 3e8; return u === 'rs' ? 2 * G * vars.M / (c ** 2) : vars.rs * c ** 2 / (2 * G); }),

  // ==================== CHEMISTRY ====================
  f('c1', 'Moles', 'تعداد مول', 'chemistry', 'general_chem', 'n = m/M',
    [v('n', 'Moles', 'مول', 'mol'), v('m', 'Mass', 'جرم', 'g'), v('M', 'Molar Mass', 'جرم مولی', 'g/mol')],
    (vars, u) => u === 'n' ? vars.m / vars.M : u === 'm' ? vars.n * vars.M : vars.m / vars.n),

  f('c2', 'Avogadro', 'آووگادرو', 'chemistry', 'general_chem', 'N = nNA',
    [v('N', 'Particles', 'ذرات', ''), v('n', 'Moles', 'مول', 'mol'), v('NA', 'Avogadro Number', 'عدد آووگادرو', '1/mol')],
    (vars, u) => u === 'N' ? vars.n * vars.NA : u === 'n' ? vars.N / vars.NA : vars.N / vars.n),

  f('c3', 'Molarity', 'مولاریته', 'chemistry', 'solutions', 'M = n/V',
    [v('M', 'Molarity', 'مولاریته', 'mol/L'), v('n', 'Moles', 'مول', 'mol'), v('V', 'Volume', 'حجم', 'L')],
    (vars, u) => u === 'M' ? vars.n / vars.V : u === 'n' ? vars.M * vars.V : vars.n / vars.M),

  f('c4', 'Dilution', 'رقت', 'chemistry', 'solutions', 'M₁V₁ = M₂V₂',
    [v('M1', 'Conc 1', 'غلظت ۱', 'mol/L'), v('V1', 'Volume 1', 'حجم ۱', 'L'), v('M2', 'Conc 2', 'غلظت ۲', 'mol/L'), v('V2', 'Volume 2', 'حجم ۲', 'L')],
    (vars, u) => u === 'M1' ? vars.M2 * vars.V2 / vars.V1 : u === 'V1' ? vars.M2 * vars.V2 / vars.M1 : u === 'M2' ? vars.M1 * vars.V1 / vars.V2 : vars.M1 * vars.V1 / vars.M2),

  f('c5', 'pH', 'pH', 'chemistry', 'solutions', 'pH = -log[H⁺]',
    [v('pH', 'pH', 'pH', ''), v('H', 'H⁺ Concentration', 'غلظت H⁺', 'mol/L')],
    (vars, u) => u === 'pH' ? -Math.log10(vars.H) : 10 ** (-vars.pH)),

  f('c6', 'pOH', 'pOH', 'chemistry', 'solutions', 'pOH = -log[OH⁻]',
    [v('pOH', 'pOH', 'pOH', ''), v('OH', 'OH⁻ Concentration', 'غلظت OH⁻', 'mol/L')],
    (vars, u) => u === 'pOH' ? -Math.log10(vars.OH) : 10 ** (-vars.pOH)),

  f('c7', 'pH + pOH', 'pH + pOH', 'chemistry', 'solutions', 'pH + pOH = 14',
    [v('pH', 'pH', 'pH', ''), v('pOH', 'pOH', 'pOH', '')],
    (vars, u) => u === 'pH' ? 14 - vars.pOH : 14 - vars.pH),

  f('c8', 'Ideal Gas at STP', 'گاز ایده‌آل در STP', 'chemistry', 'general_chem', 'V = nVm',
    [v('V', 'Volume', 'حجم', 'L'), v('n', 'Moles', 'مول', 'mol'), v('Vm', 'Molar Volume', 'حجم مولی', 'L/mol')],
    (vars, u) => u === 'V' ? vars.n * vars.Vm : u === 'n' ? vars.V / vars.Vm : vars.V / vars.n),

  f('c9', 'Hess\'s Law (Simple)', 'قانون هس', 'chemistry', 'thermochem', 'ΔH = Σ(nΔHf products) - Σ(nΔHf reactants)',
    [v('dH', 'Enthalpy Change', 'تغییر آنتالپی', 'kJ/mol'), v('dH_prod', 'Products ΔHf', 'آنتالپی محصولات', 'kJ/mol'), v('dH_react', 'Reactants ΔHf', 'آنتالپی واکنشگرها', 'kJ/mol')],
    (vars, u) => u === 'dH' ? vars.dH_prod - vars.dH_react : u === 'dH_prod' ? vars.dH + vars.dH_react : vars.dH_prod - vars.dH),

  f('c10', 'Gibbs Free Energy', 'انرژی آزاد گیبس', 'chemistry', 'thermochem', 'ΔG = ΔH - TΔS',
    [v('dG', 'Gibbs Energy', 'انرژی گیبس', 'J'), v('dH', 'Enthalpy', 'آنتالپی', 'J'), v('T', 'Temperature', 'دما', 'K'), v('dS', 'Entropy', 'آنتروپی', 'J/K')],
    (vars, u) => u === 'dG' ? vars.dH - vars.T * vars.dS : u === 'dH' ? vars.dG + vars.T * vars.dS : u === 'T' ? (vars.dH - vars.dG) / vars.dS : (vars.dH - vars.dG) / vars.T),

  f('c11', 'Equilibrium Constant', 'ثابت تعادل', 'chemistry', 'general_chem', 'ΔG = -RTlnK',
    [v('dG', 'Gibbs Energy', 'انرژی گیبس', 'J/mol'), v('R', 'Gas Constant', 'ثابت گاز', 'J/(mol·K)'), v('T', 'Temperature', 'دما', 'K'), v('K', 'Eq Constant', 'ثابت تعادل', '')],
    (vars, u) => u === 'dG' ? -vars.R * vars.T * Math.log(vars.K) : u === 'K' ? Math.exp(-vars.dG / (vars.R * vars.T)) : u === 'T' ? -vars.dG / (vars.R * Math.log(vars.K)) : -vars.dG / (vars.T * Math.log(vars.K))),

  f('c12', 'Nernst Equation', 'معادله نرنست', 'chemistry', 'electrochemistry', 'E = E° - (RT/nF)lnQ',
    [v('E', 'Cell Potential', 'پتانسیل سلول', 'V'), v('E0', 'Standard Potential', 'پتانسیل استاندارد', 'V'), v('T', 'Temperature', 'دما', 'K'), v('n', 'Electrons', 'الکترون', ''), v('Q', 'Reaction Quotient', 'ضریب واکنش', '')],
    (vars, u) => { const F = 96485; const R = 8.314; return u === 'E' ? vars.E0 - (R * vars.T / (vars.n * F)) * Math.log(vars.Q) : u === 'E0' ? vars.E + (R * vars.T / (vars.n * F)) * Math.log(vars.Q) : u === 'Q' ? Math.exp(-(vars.E - vars.E0) * vars.n * F / (R * vars.T)) : NaN; }),

  f('c13', 'Rate Law (1st order)', 'قانون سرعت مرتبه ۱', 'chemistry', 'kinetics', '[A] = [A]₀e^(-kt)',
    [v('A', 'Concentration', 'غلظت', 'mol/L'), v('A0', 'Initial Conc', 'غلظت اولیه', 'mol/L'), v('k', 'Rate Constant', 'ثابت سرعت', '1/s'), v('t', 'Time', 'زمان', 's')],
    (vars, u) => u === 'A' ? vars.A0 * Math.exp(-vars.k * vars.t) : u === 'A0' ? vars.A / Math.exp(-vars.k * vars.t) : u === 'k' ? -Math.log(vars.A / vars.A0) / vars.t : -Math.log(vars.A / vars.A0) / vars.k),

  f('c14', 'Arrhenius Equation', 'معادله آرنیوس', 'chemistry', 'kinetics', 'k = Ae^(-Ea/RT)',
    [v('k', 'Rate Constant', 'ثابت سرعت', '1/s'), v('A_factor', 'Pre-exp Factor', 'فاکتور پیش‌نمایی', '1/s'), v('Ea', 'Activation E', 'انرژی فعالسازی', 'J/mol'), v('T', 'Temperature', 'دما', 'K')],
    (vars, u) => { const R = 8.314; return u === 'k' ? vars.A_factor * Math.exp(-vars.Ea / (R * vars.T)) : u === 'Ea' ? -R * vars.T * Math.log(vars.k / vars.A_factor) : u === 'T' ? -vars.Ea / (R * Math.log(vars.k / vars.A_factor)) : vars.k / Math.exp(-vars.Ea / (R * vars.T)); }),

  f('c15', 'Osmotic Pressure', 'فشار اسمزی', 'chemistry', 'solutions', 'π = iMRT',
    [v('pi', 'Osmotic Pressure', 'فشار اسمزی', 'atm'), v('i', "van't Hoff Factor", 'ضریب وان هاف', ''), v('M', 'Molarity', 'مولاریته', 'mol/L'), v('R_val', 'Gas Constant', 'ثابت گاز', 'L·atm/(mol·K)'), v('T', 'Temperature', 'دما', 'K')],
    (vars, u) => u === 'pi' ? vars.i * vars.M * vars.R_val * vars.T : u === 'i' ? vars.pi / (vars.M * vars.R_val * vars.T) : u === 'M' ? vars.pi / (vars.i * vars.R_val * vars.T) : u === 'R_val' ? vars.pi / (vars.i * vars.M * vars.T) : vars.pi / (vars.i * vars.M * vars.R_val)),

  f('c16', 'Molality', 'مولالیته', 'chemistry', 'solutions', 'm = n/kg solvent',
    [v('m_val', 'Molality', 'مولالیته', 'mol/kg'), v('n', 'Moles', 'مول', 'mol'), v('kg', 'Solvent Mass', 'جرم حلال', 'kg')],
    (vars, u) => u === 'm_val' ? vars.n / vars.kg : u === 'n' ? vars.m_val * vars.kg : vars.n / vars.m_val),

  f('c17', 'Boiling Point Elevation', 'افزایش نقطه جوش', 'chemistry', 'solutions', 'ΔTb = iKbm',
    [v('dTb', 'BP Elevation', 'افزایش نقطه جوش', '°C'), v('i', "van't Hoff Factor", 'ضریب وان هاف', ''), v('Kb', 'Ebullioscopic Const', 'ثابت ابولیوسکوپی', '°C·kg/mol'), v('m_val', 'Molality', 'مولالیته', 'mol/kg')],
    (vars, u) => u === 'dTb' ? vars.i * vars.Kb * vars.m_val : u === 'i' ? vars.dTb / (vars.Kb * vars.m_val) : u === 'Kb' ? vars.dTb / (vars.i * vars.m_val) : vars.dTb / (vars.i * vars.Kb)),

  f('c18', 'Freezing Point Depression', 'کاهش نقطه انجماد', 'chemistry', 'solutions', 'ΔTf = iKfm',
    [v('dTf', 'FP Depression', 'کاهش نقطه انجماد', '°C'), v('i', "van't Hoff Factor", 'ضریب وان هاف', ''), v('Kf', 'Cryoscopic Const', 'ثابت کریوسکوپی', '°C·kg/mol'), v('m_val', 'Molality', 'مولالیته', 'mol/kg')],
    (vars, u) => u === 'dTf' ? vars.i * vars.Kf * vars.m_val : u === 'i' ? vars.dTf / (vars.Kf * vars.m_val) : u === 'Kf' ? vars.dTf / (vars.i * vars.m_val) : vars.dTf / (vars.i * vars.Kf)),

  f('c19', 'Faraday Electrolysis', 'الکترولیز فارادی', 'chemistry', 'electrochemistry', 'm = MIt/(nF)',
    [v('m', 'Mass Deposited', 'جرم رسوب', 'g'), v('M', 'Molar Mass', 'جرم مولی', 'g/mol'), v('I', 'Current', 'جریان', 'A'), v('t', 'Time', 'زمان', 's'), v('n', 'Electrons', 'الکترون', '')],
    (vars, u) => { const F = 96485; return u === 'm' ? vars.M * vars.I * vars.t / (vars.n * F) : u === 'I' ? vars.m * vars.n * F / (vars.M * vars.t) : u === 't' ? vars.m * vars.n * F / (vars.M * vars.I) : NaN; }),

  f('c20', 'Henderson-Hasselbalch', 'هندرسون-هسلبالخ', 'chemistry', 'solutions', 'pH = pKa + log([A⁻]/[HA])',
    [v('pH', 'pH', 'pH', ''), v('pKa', 'pKa', 'pKa', ''), v('ratio', '[A⁻]/[HA]', 'نسبت باز/اسید', '')],
    (vars, u) => u === 'pH' ? vars.pKa + Math.log10(vars.ratio) : u === 'pKa' ? vars.pH - Math.log10(vars.ratio) : 10 ** (vars.pH - vars.pKa)),

  // ==================== MATHEMATICS ====================
  f('m1', 'Quadratic Formula (Discriminant)', 'دلتا معادله درجه ۲', 'math', 'algebra', 'Δ = b² - 4ac',
    [v('delta', 'Discriminant', 'دلتا', ''), v('a', 'a', 'a', ''), v('b', 'b', 'b', ''), v('c_val', 'c', 'c', '')],
    (vars, u) => u === 'delta' ? vars.b ** 2 - 4 * vars.a * vars.c_val : u === 'a' ? (vars.b ** 2 - vars.delta) / (4 * vars.c_val) : u === 'b' ? Math.sqrt(vars.delta + 4 * vars.a * vars.c_val) : (vars.b ** 2 - vars.delta) / (4 * vars.a)),

  f('m2', 'Circle Area', 'مساحت دایره', 'math', 'geometry', 'A = πr²',
    [v('A', 'Area', 'مساحت', ''), v('r', 'Radius', 'شعاع', '')],
    (vars, u) => u === 'A' ? Math.PI * vars.r ** 2 : Math.sqrt(vars.A / Math.PI)),

  f('m3', 'Circle Circumference', 'محیط دایره', 'math', 'geometry', 'C = 2πr',
    [v('C', 'Circumference', 'محیط', ''), v('r', 'Radius', 'شعاع', '')],
    (vars, u) => u === 'C' ? 2 * Math.PI * vars.r : vars.C / (2 * Math.PI)),

  f('m4', 'Sphere Volume', 'حجم کره', 'math', 'geometry', 'V = (4/3)πr³',
    [v('V', 'Volume', 'حجم', ''), v('r', 'Radius', 'شعاع', '')],
    (vars, u) => u === 'V' ? (4 / 3) * Math.PI * vars.r ** 3 : (3 * vars.V / (4 * Math.PI)) ** (1 / 3)),

  f('m5', 'Sphere Surface Area', 'مساحت سطح کره', 'math', 'geometry', 'A = 4πr²',
    [v('A', 'Surface Area', 'مساحت سطح', ''), v('r', 'Radius', 'شعاع', '')],
    (vars, u) => u === 'A' ? 4 * Math.PI * vars.r ** 2 : Math.sqrt(vars.A / (4 * Math.PI))),

  f('m6', 'Cylinder Volume', 'حجم استوانه', 'math', 'geometry', 'V = πr²h',
    [v('V', 'Volume', 'حجم', ''), v('r', 'Radius', 'شعاع', ''), v('h', 'Height', 'ارتفاع', '')],
    (vars, u) => u === 'V' ? Math.PI * vars.r ** 2 * vars.h : u === 'r' ? Math.sqrt(vars.V / (Math.PI * vars.h)) : vars.V / (Math.PI * vars.r ** 2)),

  f('m7', 'Cone Volume', 'حجم مخروط', 'math', 'geometry', 'V = (1/3)πr²h',
    [v('V', 'Volume', 'حجم', ''), v('r', 'Radius', 'شعاع', ''), v('h', 'Height', 'ارتفاع', '')],
    (vars, u) => u === 'V' ? (1 / 3) * Math.PI * vars.r ** 2 * vars.h : u === 'r' ? Math.sqrt(3 * vars.V / (Math.PI * vars.h)) : 3 * vars.V / (Math.PI * vars.r ** 2)),

  f('m8', 'Triangle Area', 'مساحت مثلث', 'math', 'geometry', 'A = ½bh',
    [v('A', 'Area', 'مساحت', ''), v('b', 'Base', 'قاعده', ''), v('h', 'Height', 'ارتفاع', '')],
    (vars, u) => u === 'A' ? 0.5 * vars.b * vars.h : u === 'b' ? 2 * vars.A / vars.h : 2 * vars.A / vars.b),

  f('m9', 'Pythagorean Theorem', 'قضیه فیثاغورث', 'math', 'geometry', 'c² = a² + b²',
    [v('c_val', 'Hypotenuse', 'وتر', ''), v('a', 'Side a', 'ضلع a', ''), v('b', 'Side b', 'ضلع b', '')],
    (vars, u) => u === 'c_val' ? Math.sqrt(vars.a ** 2 + vars.b ** 2) : u === 'a' ? Math.sqrt(vars.c_val ** 2 - vars.b ** 2) : Math.sqrt(vars.c_val ** 2 - vars.a ** 2)),

  f('m10', 'Law of Cosines', 'قانون کسینوس‌ها', 'math', 'trigonometry', 'c² = a² + b² - 2ab·cos(C)',
    [v('c_val', 'Side c', 'ضلع c', ''), v('a', 'Side a', 'ضلع a', ''), v('b', 'Side b', 'ضلع b', ''), v('C', 'Angle C', 'زاویه C', '°')],
    (vars, u) => u === 'c_val' ? Math.sqrt(vars.a ** 2 + vars.b ** 2 - 2 * vars.a * vars.b * Math.cos(vars.C * Math.PI / 180)) : u === 'C' ? Math.acos((vars.a ** 2 + vars.b ** 2 - vars.c_val ** 2) / (2 * vars.a * vars.b)) * 180 / Math.PI : NaN),

  f('m11', 'Law of Sines', 'قانون سینوس‌ها', 'math', 'trigonometry', 'a/sin(A) = b/sin(B)',
    [v('a', 'Side a', 'ضلع a', ''), v('A', 'Angle A', 'زاویه A', '°'), v('b', 'Side b', 'ضلع b', ''), v('B', 'Angle B', 'زاویه B', '°')],
    (vars, u) => u === 'a' ? vars.b * Math.sin(vars.A * Math.PI / 180) / Math.sin(vars.B * Math.PI / 180) : u === 'A' ? Math.asin(vars.a * Math.sin(vars.B * Math.PI / 180) / vars.b) * 180 / Math.PI : u === 'b' ? vars.a * Math.sin(vars.B * Math.PI / 180) / Math.sin(vars.A * Math.PI / 180) : Math.asin(vars.b * Math.sin(vars.A * Math.PI / 180) / vars.a) * 180 / Math.PI),

  f('m12', 'Arithmetic Sequence', 'دنباله حسابی', 'math', 'sequences', 'an = a₁ + (n-1)d',
    [v('an', 'nth Term', 'جمله nام', ''), v('a1', 'First Term', 'جمله اول', ''), v('n', 'Term Number', 'شماره جمله', ''), v('d', 'Common Diff', 'قدر نسبت', '')],
    (vars, u) => u === 'an' ? vars.a1 + (vars.n - 1) * vars.d : u === 'a1' ? vars.an - (vars.n - 1) * vars.d : u === 'n' ? (vars.an - vars.a1) / vars.d + 1 : (vars.an - vars.a1) / (vars.n - 1)),

  f('m13', 'Geometric Sequence', 'دنباله هندسی', 'math', 'sequences', 'an = a₁ × r^(n-1)',
    [v('an', 'nth Term', 'جمله nام', ''), v('a1', 'First Term', 'جمله اول', ''), v('r', 'Common Ratio', 'قدر نسبت', ''), v('n', 'Term Number', 'شماره جمله', '')],
    (vars, u) => u === 'an' ? vars.a1 * vars.r ** (vars.n - 1) : u === 'a1' ? vars.an / (vars.r ** (vars.n - 1)) : u === 'r' ? (vars.an / vars.a1) ** (1 / (vars.n - 1)) : Math.log(vars.an / vars.a1) / Math.log(vars.r) + 1),

  f('m14', 'Arithmetic Sum', 'مجموع حسابی', 'math', 'sequences', 'S = n(a₁+an)/2',
    [v('S', 'Sum', 'مجموع', ''), v('n', 'Terms', 'تعداد جملات', ''), v('a1', 'First Term', 'جمله اول', ''), v('an', 'Last Term', 'جمله آخر', '')],
    (vars, u) => u === 'S' ? vars.n * (vars.a1 + vars.an) / 2 : u === 'n' ? 2 * vars.S / (vars.a1 + vars.an) : u === 'a1' ? 2 * vars.S / vars.n - vars.an : 2 * vars.S / vars.n - vars.a1),

  f('m15', 'Geometric Sum', 'مجموع هندسی', 'math', 'sequences', 'S = a₁(1-r^n)/(1-r)',
    [v('S', 'Sum', 'مجموع', ''), v('a1', 'First Term', 'جمله اول', ''), v('r', 'Common Ratio', 'قدر نسبت', ''), v('n', 'Terms', 'تعداد جملات', '')],
    (vars, u) => u === 'S' ? vars.a1 * (1 - vars.r ** vars.n) / (1 - vars.r) : u === 'a1' ? vars.S * (1 - vars.r) / (1 - vars.r ** vars.n) : NaN),

  f('m16', 'Mean', 'میانگین', 'math', 'statistics', 'μ = Σx/n',
    [v('mu', 'Mean', 'میانگین', ''), v('sum', 'Sum', 'مجموع', ''), v('n', 'Count', 'تعداد', '')],
    (vars, u) => u === 'mu' ? vars.sum / vars.n : u === 'sum' ? vars.mu * vars.n : vars.sum / vars.mu),

  f('m17', 'Standard Deviation', 'انحراف معیار', 'math', 'statistics', 'σ = √(Σ(x-μ)²/n)',
    [v('sigma', 'Std Dev', 'انحراف معیار', ''), v('variance', 'Variance', 'واریانس', '')],
    (vars, u) => u === 'sigma' ? Math.sqrt(vars.variance) : vars.sigma ** 2),

  f('m18', 'Permutation', 'جایگشت', 'math', 'statistics', 'P(n,r) = n!/(n-r)!',
    [v('P', 'Permutations', 'جایگشت', ''), v('n', 'Total', 'کل', ''), v('r', 'Selected', 'انتخاب', '')],
    (vars, u) => { const fact = (x: number): number => x <= 1 ? 1 : x * fact(x - 1); return u === 'P' ? fact(vars.n) / fact(vars.n - vars.r) : NaN; }),

  f('m19', 'Combination', 'ترکیب', 'math', 'statistics', 'C(n,r) = n!/(r!(n-r)!)',
    [v('C', 'Combinations', 'ترکیب', ''), v('n', 'Total', 'کل', ''), v('r', 'Selected', 'انتخاب', '')],
    (vars, u) => { const fact = (x: number): number => x <= 1 ? 1 : x * fact(x - 1); return u === 'C' ? fact(vars.n) / (fact(vars.r) * fact(vars.n - vars.r)) : NaN; }),

  f('m20', 'Trapezoid Area', 'مساحت ذوزنقه', 'math', 'geometry', 'A = ½(a+b)h',
    [v('A', 'Area', 'مساحت', ''), v('a', 'Side a', 'ضلع a', ''), v('b', 'Side b', 'ضلع b', ''), v('h', 'Height', 'ارتفاع', '')],
    (vars, u) => u === 'A' ? 0.5 * (vars.a + vars.b) * vars.h : u === 'h' ? 2 * vars.A / (vars.a + vars.b) : NaN),

  f('m21', 'Logarithm Change of Base', 'تغییر پایه لگاریتم', 'math', 'algebra', 'logₐ(x) = ln(x)/ln(a)',
    [v('result', 'Result', 'نتیجه', ''), v('x', 'x', 'x', ''), v('a', 'Base', 'پایه', '')],
    (vars, u) => u === 'result' ? Math.log(vars.x) / Math.log(vars.a) : u === 'x' ? vars.a ** vars.result : NaN),

  f('m22', 'Exponential Growth', 'رشد نمایی', 'math', 'algebra', 'y = y₀e^(kt)',
    [v('y', 'Final Value', 'مقدار نهایی', ''), v('y0', 'Initial Value', 'مقدار اولیه', ''), v('k', 'Rate', 'نرخ', ''), v('t', 'Time', 'زمان', '')],
    (vars, u) => u === 'y' ? vars.y0 * Math.exp(vars.k * vars.t) : u === 'y0' ? vars.y / Math.exp(vars.k * vars.t) : u === 'k' ? Math.log(vars.y / vars.y0) / vars.t : Math.log(vars.y / vars.y0) / vars.k),

  f('m23', 'Compound Interest', 'بهره مرکب', 'math', 'algebra', 'A = P(1+r/n)^(nt)',
    [v('A', 'Amount', 'مبلغ نهایی', ''), v('P', 'Principal', 'اصل سرمایه', ''), v('r', 'Rate', 'نرخ', ''), v('n', 'Compounds/Year', 'تعداد ترکیب/سال', ''), v('t', 'Years', 'سال', '')],
    (vars, u) => u === 'A' ? vars.P * (1 + vars.r / vars.n) ** (vars.n * vars.t) : u === 'P' ? vars.A / (1 + vars.r / vars.n) ** (vars.n * vars.t) : NaN),

  f('m24', 'Distance Formula', 'فرمول فاصله', 'math', 'geometry', 'd = √((x₂-x₁)²+(y₂-y₁)²)',
    [v('d', 'Distance', 'فاصله', ''), v('x1', 'x₁', 'x₁', ''), v('y1', 'y₁', 'y₁', ''), v('x2', 'x₂', 'x₂', ''), v('y2', 'y₂', 'y₂', '')],
    (vars, u) => u === 'd' ? Math.sqrt((vars.x2 - vars.x1) ** 2 + (vars.y2 - vars.y1) ** 2) : NaN),

  f('m25', 'Ellipse Area', 'مساحت بیضی', 'math', 'geometry', 'A = πab',
    [v('A', 'Area', 'مساحت', ''), v('a', 'Semi-major', 'نیم‌محور بزرگ', ''), v('b', 'Semi-minor', 'نیم‌محور کوچک', '')],
    (vars, u) => u === 'A' ? Math.PI * vars.a * vars.b : u === 'a' ? vars.A / (Math.PI * vars.b) : vars.A / (Math.PI * vars.a)),

  // ==================== ADVANCED MATH ====================
  f('am1', 'Taylor Series (e^x approx)', 'سری تیلور e^x', 'advanced_math', 'calculus', 'e^x ≈ 1+x+x²/2+x³/6',
    [v('result', 'Result', 'نتیجه', ''), v('x', 'x', 'x', '')],
    (vars, u) => u === 'result' ? Math.exp(vars.x) : Math.log(vars.result)),

  f('am2', 'Euler\'s Formula', 'فرمول اویلر', 'advanced_math', 'complex_analysis', 'e^(iθ) = cos(θ)+isin(θ)',
    [v('real', 'Real Part', 'بخش حقیقی', ''), v('imag', 'Imaginary Part', 'بخش موهومی', ''), v('theta', 'θ (degrees)', 'θ (درجه)', '°')],
    (vars, u) => u === 'real' ? Math.cos(vars.theta * Math.PI / 180) : u === 'imag' ? Math.sin(vars.theta * Math.PI / 180) : Math.atan2(vars.imag, vars.real) * 180 / Math.PI),

  f('am3', 'Complex Magnitude', 'اندازه مختلط', 'advanced_math', 'complex_analysis', '|z| = √(a²+b²)',
    [v('mag', 'Magnitude', 'اندازه', ''), v('a', 'Real Part', 'بخش حقیقی', ''), v('b', 'Imaginary Part', 'بخش موهومی', '')],
    (vars, u) => u === 'mag' ? Math.sqrt(vars.a ** 2 + vars.b ** 2) : NaN),

  f('am4', 'Laplace Transform (e^-at)', 'تبدیل لاپلاس e^-at', 'advanced_math', 'transforms', 'L{e^(-at)} = 1/(s+a)',
    [v('result', 'F(s)', 'F(s)', ''), v('s', 's', 's', ''), v('a', 'a', 'a', '')],
    (vars, u) => u === 'result' ? 1 / (vars.s + vars.a) : u === 'a' ? 1 / vars.result - vars.s : 1 / vars.result - vars.a),

  f('am5', 'Fourier Frequency', 'فرکانس فوریه', 'advanced_math', 'transforms', 'ω = 2πf',
    [v('omega', 'Angular Freq', 'فرکانس زاویه‌ای', 'rad/s'), v('f', 'Frequency', 'فرکانس', 'Hz')],
    (vars, u) => u === 'omega' ? 2 * Math.PI * vars.f : vars.omega / (2 * Math.PI)),

  f('am6', 'Newton-Raphson', 'نیوتن-رافسون', 'eng_math', 'numerical', 'x₁ = x₀ - f(x₀)/f\'(x₀)',
    [v('x1', 'Next Approx', 'تقریب بعدی', ''), v('x0', 'Current Approx', 'تقریب فعلی', ''), v('fx', 'f(x₀)', 'f(x₀)', ''), v('fpx', "f'(x₀)", "f'(x₀)", '')],
    (vars, u) => u === 'x1' ? vars.x0 - vars.fx / vars.fpx : NaN),

  f('am7', 'Trapezoidal Rule', 'قاعده ذوزنقه', 'eng_math', 'numerical', 'I ≈ (h/2)(f₀+2f₁+fn)',
    [v('I', 'Integral', 'انتگرال', ''), v('h', 'Step Size', 'اندازه گام', ''), v('f0', 'f(a)', 'f(a)', ''), v('f1', 'f(mid)', 'f(وسط)', ''), v('fn', 'f(b)', 'f(b)', '')],
    (vars, u) => u === 'I' ? (vars.h / 2) * (vars.f0 + 2 * vars.f1 + vars.fn) : NaN),

  f('am8', 'Linear Interpolation', 'درون‌یابی خطی', 'eng_math', 'interpolation', 'y = y₁ + (x-x₁)(y₂-y₁)/(x₂-x₁)',
    [v('y', 'Result', 'نتیجه', ''), v('x', 'x', 'x', ''), v('x1', 'x₁', 'x₁', ''), v('y1', 'y₁', 'y₁', ''), v('x2', 'x₂', 'x₂', ''), v('y2', 'y₂', 'y₂', '')],
    (vars, u) => u === 'y' ? vars.y1 + (vars.x - vars.x1) * (vars.y2 - vars.y1) / (vars.x2 - vars.x1) : u === 'x' ? vars.x1 + (vars.y - vars.y1) * (vars.x2 - vars.x1) / (vars.y2 - vars.y1) : NaN),

  f('am9', 'Derivative (Power Rule)', 'مشتق (قاعده توان)', 'differential', 'derivatives', 'd/dx(x^n) = nx^(n-1)',
    [v('result', 'Coefficient', 'ضریب', ''), v('n', 'Power', 'توان', ''), v('x', 'x', 'x', '')],
    (vars, u) => u === 'result' ? vars.n * vars.x ** (vars.n - 1) : NaN),

  f('am10', 'Integration (Power)', 'انتگرال (توان)', 'differential', 'integrals', '∫x^n dx = x^(n+1)/(n+1)',
    [v('result', 'Result', 'نتیجه', ''), v('x', 'x', 'x', ''), v('n', 'Power', 'توان', '')],
    (vars, u) => u === 'result' ? vars.x ** (vars.n + 1) / (vars.n + 1) : NaN),

  f('am11', 'Arc Length', 'طول کمان', 'differential', 'applications', 's = rθ',
    [v('s', 'Arc Length', 'طول کمان', ''), v('r', 'Radius', 'شعاع', ''), v('theta', 'Angle (rad)', 'زاویه (رادیان)', 'rad')],
    (vars, u) => u === 's' ? vars.r * vars.theta : u === 'r' ? vars.s / vars.theta : vars.s / vars.r),

  f('am12', 'Curvature', 'انحنا', 'differential', 'applications', 'κ = 1/R',
    [v('kappa', 'Curvature', 'انحنا', '1/m'), v('R', 'Radius of Curvature', 'شعاع انحنا', 'm')],
    (vars, u) => u === 'kappa' ? 1 / vars.R : 1 / vars.kappa),

  f('am13', 'Gradient Descent', 'گرادیان کاهشی', 'eng_math', 'optimization', 'x₁ = x₀ - α∇f(x₀)',
    [v('x1', 'New x', 'x جدید', ''), v('x0', 'Old x', 'x قدیم', ''), v('alpha', 'Learning Rate', 'نرخ یادگیری', ''), v('grad', 'Gradient', 'گرادیان', '')],
    (vars, u) => u === 'x1' ? vars.x0 - vars.alpha * vars.grad : u === 'alpha' ? (vars.x0 - vars.x1) / vars.grad : NaN),

  f('am14', '2x2 Determinant', 'دترمینان ۲×۲', 'advanced_math', 'linear_algebra', 'det = ad - bc',
    [v('det', 'Determinant', 'دترمینان', ''), v('a', 'a', 'a', ''), v('b', 'b', 'b', ''), v('c_val', 'c', 'c', ''), v('d', 'd', 'd', '')],
    (vars, u) => u === 'det' ? vars.a * vars.d - vars.b * vars.c_val : NaN),

  f('am15', 'Eigenvalue 2x2', 'مقدار ویژه ۲×۲', 'advanced_math', 'linear_algebra', 'λ = (a+d)/2 ± √((a-d)²/4+bc)',
    [v('lambda1', 'λ₁', 'λ₁', ''), v('a', 'a', 'a', ''), v('b', 'b', 'b', ''), v('c_val', 'c', 'c', ''), v('d', 'd', 'd', '')],
    (vars, u) => { if (u === 'lambda1') { const tr = (vars.a + vars.d) / 2; const disc = Math.sqrt(((vars.a - vars.d) / 2) ** 2 + vars.b * vars.c_val); return tr + disc; } return NaN; }),

  f('am16', 'Differential Eq (1st order)', 'معادله دیفرانسیل مرتبه ۱', 'advanced_math', 'differential_eq', 'y = Ce^(kt)',
    [v('y', 'y', 'y', ''), v('C', 'Constant', 'ثابت', ''), v('k', 'Rate', 'نرخ', ''), v('t', 'Time', 'زمان', '')],
    (vars, u) => u === 'y' ? vars.C * Math.exp(vars.k * vars.t) : u === 'C' ? vars.y / Math.exp(vars.k * vars.t) : u === 'k' ? Math.log(vars.y / vars.C) / vars.t : Math.log(vars.y / vars.C) / vars.k),

  f('am17', 'Damped Oscillation', 'نوسان میرا', 'advanced_math', 'differential_eq', 'x = Ae^(-γt)cos(ωt)',
    [v('x', 'Displacement', 'جابجایی', ''), v('A', 'Amplitude', 'دامنه', ''), v('gamma', 'Damping', 'میرایی', ''), v('omega', 'Frequency', 'فرکانس', 'rad/s'), v('t', 'Time', 'زمان', 's')],
    (vars, u) => u === 'x' ? vars.A * Math.exp(-vars.gamma * vars.t) * Math.cos(vars.omega * vars.t) : NaN),

  f('am18', 'Bisection Method', 'روش دوبخشی', 'eng_math', 'numerical', 'c = (a+b)/2',
    [v('c_val', 'Midpoint', 'نقطه وسط', ''), v('a', 'Lower Bound', 'حد پایین', ''), v('b', 'Upper Bound', 'حد بالا', '')],
    (vars, u) => u === 'c_val' ? (vars.a + vars.b) / 2 : NaN),

  f('am19', 'Secant Method', 'روش وتر', 'eng_math', 'numerical', 'x₂ = x₁ - f(x₁)(x₁-x₀)/(f(x₁)-f(x₀))',
    [v('x2', 'Next Approx', 'تقریب بعدی', ''), v('x1', 'x₁', 'x₁', ''), v('x0', 'x₀', 'x₀', ''), v('fx1', 'f(x₁)', 'f(x₁)', ''), v('fx0', 'f(x₀)', 'f(x₀)', '')],
    (vars, u) => u === 'x2' ? vars.x1 - vars.fx1 * (vars.x1 - vars.x0) / (vars.fx1 - vars.fx0) : NaN),

  f('am20', 'Simpson\'s Rule', 'قاعده سیمپسون', 'eng_math', 'numerical', 'I ≈ (h/3)(f₀+4f₁+f₂)',
    [v('I', 'Integral', 'انتگرال', ''), v('h', 'Step Size', 'اندازه گام', ''), v('f0', 'f(a)', 'f(a)', ''), v('f1', 'f(mid)', 'f(وسط)', ''), v('f2', 'f(b)', 'f(b)', '')],
    (vars, u) => u === 'I' ? (vars.h / 3) * (vars.f0 + 4 * vars.f1 + vars.f2) : NaN),

  // ==================== ELECTRONICS ====================
  f('e1', 'Ohm\'s Law', 'قانون اهم', 'electronics', 'basic_electronics', 'V = IR',
    [v('V', 'Voltage', 'ولتاژ', 'V'), v('I', 'Current', 'جریان', 'A'), v('R', 'Resistance', 'مقاومت', 'Ω')],
    (vars, u) => u === 'V' ? vars.I * vars.R : u === 'I' ? vars.V / vars.R : vars.V / vars.I),

  f('e2', 'Electrical Power', 'توان الکتریکی', 'electronics', 'basic_electronics', 'P = VI',
    [v('P', 'Power', 'توان', 'W'), v('V', 'Voltage', 'ولتاژ', 'V'), v('I', 'Current', 'جریان', 'A')],
    (vars, u) => u === 'P' ? vars.V * vars.I : u === 'V' ? vars.P / vars.I : vars.P / vars.V),

  f('e3', 'Power (R)', 'توان (R)', 'electronics', 'basic_electronics', 'P = I²R',
    [v('P', 'Power', 'توان', 'W'), v('I', 'Current', 'جریان', 'A'), v('R', 'Resistance', 'مقاومت', 'Ω')],
    (vars, u) => u === 'P' ? vars.I ** 2 * vars.R : u === 'I' ? Math.sqrt(vars.P / vars.R) : vars.P / (vars.I ** 2)),

  f('e4', 'Power (V²/R)', 'توان (V²/R)', 'electronics', 'basic_electronics', 'P = V²/R',
    [v('P', 'Power', 'توان', 'W'), v('V', 'Voltage', 'ولتاژ', 'V'), v('R', 'Resistance', 'مقاومت', 'Ω')],
    (vars, u) => u === 'P' ? vars.V ** 2 / vars.R : u === 'V' ? Math.sqrt(vars.P * vars.R) : vars.V ** 2 / vars.P),

  f('e5', 'Resistors in Series', 'مقاومت سری', 'electronics', 'basic_electronics', 'Rt = R₁ + R₂',
    [v('Rt', 'Total R', 'مقاومت کل', 'Ω'), v('R1', 'R₁', 'R₁', 'Ω'), v('R2', 'R₂', 'R₂', 'Ω')],
    (vars, u) => u === 'Rt' ? vars.R1 + vars.R2 : u === 'R1' ? vars.Rt - vars.R2 : vars.Rt - vars.R1),

  f('e6', 'Resistors in Parallel', 'مقاومت موازی', 'electronics', 'basic_electronics', '1/Rt = 1/R₁ + 1/R₂',
    [v('Rt', 'Total R', 'مقاومت کل', 'Ω'), v('R1', 'R₁', 'R₁', 'Ω'), v('R2', 'R₂', 'R₂', 'Ω')],
    (vars, u) => u === 'Rt' ? 1 / (1 / vars.R1 + 1 / vars.R2) : u === 'R1' ? 1 / (1 / vars.Rt - 1 / vars.R2) : 1 / (1 / vars.Rt - 1 / vars.R1)),

  f('e7', 'Capacitors in Series', 'خازن سری', 'electronics', 'basic_electronics', '1/Ct = 1/C₁ + 1/C₂',
    [v('Ct', 'Total C', 'ظرفیت کل', 'F'), v('C1', 'C₁', 'C₁', 'F'), v('C2', 'C₂', 'C₂', 'F')],
    (vars, u) => u === 'Ct' ? 1 / (1 / vars.C1 + 1 / vars.C2) : u === 'C1' ? 1 / (1 / vars.Ct - 1 / vars.C2) : 1 / (1 / vars.Ct - 1 / vars.C1)),

  f('e8', 'Capacitors in Parallel', 'خازن موازی', 'electronics', 'basic_electronics', 'Ct = C₁ + C₂',
    [v('Ct', 'Total C', 'ظرفیت کل', 'F'), v('C1', 'C₁', 'C₁', 'F'), v('C2', 'C₂', 'C₂', 'F')],
    (vars, u) => u === 'Ct' ? vars.C1 + vars.C2 : u === 'C1' ? vars.Ct - vars.C2 : vars.Ct - vars.C1),

  f('e9', 'Diode Current', 'جریان دیود', 'electronics', 'semiconductors', 'I = Is(e^(V/nVt)-1)',
    [v('I', 'Current', 'جریان', 'A'), v('Is', 'Saturation Current', 'جریان اشباع', 'A'), v('V', 'Voltage', 'ولتاژ', 'V'), v('n', 'Ideality Factor', 'ضریب ایده‌آلی', ''), v('Vt', 'Thermal Voltage', 'ولتاژ حرارتی', 'V')],
    (vars, u) => u === 'I' ? vars.Is * (Math.exp(vars.V / (vars.n * vars.Vt)) - 1) : u === 'V' ? vars.n * vars.Vt * Math.log(vars.I / vars.Is + 1) : NaN),

  f('e10', 'Thermal Voltage', 'ولتاژ حرارتی', 'electronics', 'semiconductors', 'Vt = kT/q',
    [v('Vt', 'Thermal Voltage', 'ولتاژ حرارتی', 'V'), v('T', 'Temperature', 'دما', 'K')],
    (vars, u) => { const k = 1.38e-23; const q = 1.6e-19; return u === 'Vt' ? k * vars.T / q : vars.Vt * q / k; }),

  f('e11', 'Transistor Current Gain', 'بهره جریان ترانزیستور', 'electronics', 'semiconductors', 'Ic = βIb',
    [v('Ic', 'Collector Current', 'جریان کلکتور', 'A'), v('beta', 'Current Gain', 'بهره جریان', ''), v('Ib', 'Base Current', 'جریان بیس', 'A')],
    (vars, u) => u === 'Ic' ? vars.beta * vars.Ib : u === 'beta' ? vars.Ic / vars.Ib : vars.Ic / vars.beta),

  f('e12', 'Voltage Gain', 'بهره ولتاژ', 'electronics', 'amplifiers', 'Av = Vout/Vin',
    [v('Av', 'Voltage Gain', 'بهره ولتاژ', ''), v('Vout', 'Output Voltage', 'ولتاژ خروجی', 'V'), v('Vin', 'Input Voltage', 'ولتاژ ورودی', 'V')],
    (vars, u) => u === 'Av' ? vars.Vout / vars.Vin : u === 'Vout' ? vars.Av * vars.Vin : vars.Vout / vars.Av),

  f('e13', 'Gain in dB', 'بهره به dB', 'electronics', 'amplifiers', 'Av(dB) = 20log(Av)',
    [v('Av_dB', 'Gain (dB)', 'بهره (dB)', 'dB'), v('Av', 'Voltage Gain', 'بهره ولتاژ', '')],
    (vars, u) => u === 'Av_dB' ? 20 * Math.log10(vars.Av) : 10 ** (vars.Av_dB / 20)),

  f('e14', 'Op-Amp Inverting', 'آپ-امپ معکوس‌کننده', 'electronics', 'amplifiers', 'Av = -Rf/Rin',
    [v('Av', 'Gain', 'بهره', ''), v('Rf', 'Feedback R', 'مقاومت بازخورد', 'Ω'), v('Rin', 'Input R', 'مقاومت ورودی', 'Ω')],
    (vars, u) => u === 'Av' ? -vars.Rf / vars.Rin : u === 'Rf' ? -vars.Av * vars.Rin : -vars.Rf / vars.Av),

  f('e15', 'Op-Amp Non-Inverting', 'آپ-امپ غیرمعکوس', 'electronics', 'amplifiers', 'Av = 1 + Rf/Rin',
    [v('Av', 'Gain', 'بهره', ''), v('Rf', 'Feedback R', 'مقاومت بازخورد', 'Ω'), v('Rin', 'Input R', 'مقاومت ورودی', 'Ω')],
    (vars, u) => u === 'Av' ? 1 + vars.Rf / vars.Rin : u === 'Rf' ? (vars.Av - 1) * vars.Rin : vars.Rf / (vars.Av - 1)),

  f('e16', 'RC Cutoff Frequency', 'فرکانس قطع RC', 'electronics', 'filters', 'fc = 1/(2πRC)',
    [v('fc', 'Cutoff Freq', 'فرکانس قطع', 'Hz'), v('R', 'Resistance', 'مقاومت', 'Ω'), v('C', 'Capacitance', 'ظرفیت', 'F')],
    (vars, u) => u === 'fc' ? 1 / (2 * Math.PI * vars.R * vars.C) : u === 'R' ? 1 / (2 * Math.PI * vars.fc * vars.C) : 1 / (2 * Math.PI * vars.fc * vars.R)),

  f('e17', 'LC Resonant Freq', 'فرکانس تشدید LC', 'electronics', 'filters', 'f = 1/(2π√(LC))',
    [v('f', 'Frequency', 'فرکانس', 'Hz'), v('L', 'Inductance', 'اندوکتانس', 'H'), v('C', 'Capacitance', 'ظرفیت', 'F')],
    (vars, u) => u === 'f' ? 1 / (2 * Math.PI * Math.sqrt(vars.L * vars.C)) : u === 'L' ? 1 / (4 * Math.PI ** 2 * vars.f ** 2 * vars.C) : 1 / (4 * Math.PI ** 2 * vars.f ** 2 * vars.L)),

  f('e18', 'Wheatstone Bridge', 'پل وتستون', 'electronics', 'basic_electronics', 'Rx = R₃R₂/R₁',
    [v('Rx', 'Unknown R', 'مقاومت مجهول', 'Ω'), v('R1', 'R₁', 'R₁', 'Ω'), v('R2', 'R₂', 'R₂', 'Ω'), v('R3', 'R₃', 'R₃', 'Ω')],
    (vars, u) => u === 'Rx' ? vars.R3 * vars.R2 / vars.R1 : u === 'R1' ? vars.R3 * vars.R2 / vars.Rx : u === 'R2' ? vars.Rx * vars.R1 / vars.R3 : vars.Rx * vars.R1 / vars.R2),

  f('e19', 'Quality Factor', 'ضریب کیفیت', 'electronics', 'filters', 'Q = f₀/BW',
    [v('Q', 'Quality Factor', 'ضریب کیفیت', ''), v('f0', 'Resonant Freq', 'فرکانس تشدید', 'Hz'), v('BW', 'Bandwidth', 'پهنای باند', 'Hz')],
    (vars, u) => u === 'Q' ? vars.f0 / vars.BW : u === 'f0' ? vars.Q * vars.BW : vars.f0 / vars.Q),

  f('e20', 'Time Constant RC', 'ثابت زمانی RC', 'electronics', 'basic_electronics', 'τ = RC',
    [v('tau', 'Time Constant', 'ثابت زمانی', 's'), v('R', 'Resistance', 'مقاومت', 'Ω'), v('C', 'Capacitance', 'ظرفیت', 'F')],
    (vars, u) => u === 'tau' ? vars.R * vars.C : u === 'R' ? vars.tau / vars.C : vars.tau / vars.R),

  // ==================== ELECTRICAL CIRCUITS ====================
  f('ec1', 'Kirchhoff Voltage', 'قانون ولتاژ کیرشهف', 'circuits', 'dc_circuits', 'ΣV = 0 → V = V₁ + V₂',
    [v('V', 'Total Voltage', 'ولتاژ کل', 'V'), v('V1', 'Voltage 1', 'ولتاژ ۱', 'V'), v('V2', 'Voltage 2', 'ولتاژ ۲', 'V')],
    (vars, u) => u === 'V' ? vars.V1 + vars.V2 : u === 'V1' ? vars.V - vars.V2 : vars.V - vars.V1),

  f('ec2', 'Kirchhoff Current', 'قانون جریان کیرشهف', 'circuits', 'dc_circuits', 'ΣI = 0 → Iin = I₁ + I₂',
    [v('Iin', 'Input Current', 'جریان ورودی', 'A'), v('I1', 'Current 1', 'جریان ۱', 'A'), v('I2', 'Current 2', 'جریان ۲', 'A')],
    (vars, u) => u === 'Iin' ? vars.I1 + vars.I2 : u === 'I1' ? vars.Iin - vars.I2 : vars.Iin - vars.I1),

  f('ec3', 'Voltage Divider', 'تقسیم ولتاژ', 'circuits', 'dc_circuits', 'Vout = Vin × R₂/(R₁+R₂)',
    [v('Vout', 'Output V', 'ولتاژ خروجی', 'V'), v('Vin', 'Input V', 'ولتاژ ورودی', 'V'), v('R1', 'R₁', 'R₁', 'Ω'), v('R2', 'R₂', 'R₂', 'Ω')],
    (vars, u) => u === 'Vout' ? vars.Vin * vars.R2 / (vars.R1 + vars.R2) : u === 'Vin' ? vars.Vout * (vars.R1 + vars.R2) / vars.R2 : NaN),

  f('ec4', 'Current Divider', 'تقسیم جریان', 'circuits', 'dc_circuits', 'I₁ = I × R₂/(R₁+R₂)',
    [v('I1', 'Current 1', 'جریان ۱', 'A'), v('I', 'Total Current', 'جریان کل', 'A'), v('R1', 'R₁', 'R₁', 'Ω'), v('R2', 'R₂', 'R₂', 'Ω')],
    (vars, u) => u === 'I1' ? vars.I * vars.R2 / (vars.R1 + vars.R2) : u === 'I' ? vars.I1 * (vars.R1 + vars.R2) / vars.R2 : NaN),

  f('ec5', 'AC Voltage', 'ولتاژ AC', 'circuits', 'ac_circuits', 'v(t) = Vm sin(ωt + φ)',
    [v('vt', 'v(t)', 'v(t)', 'V'), v('Vm', 'Peak Voltage', 'ولتاژ پیک', 'V'), v('omega', 'Frequency', 'فرکانس', 'rad/s'), v('t', 'Time', 'زمان', 's'), v('phi', 'Phase', 'فاز', '°')],
    (vars, u) => u === 'vt' ? vars.Vm * Math.sin(vars.omega * vars.t + vars.phi * Math.PI / 180) : u === 'Vm' ? vars.vt / Math.sin(vars.omega * vars.t + vars.phi * Math.PI / 180) : NaN),

  f('ec6', 'RMS Voltage', 'ولتاژ RMS', 'circuits', 'ac_circuits', 'Vrms = Vm/√2',
    [v('Vrms', 'RMS Voltage', 'ولتاژ مؤثر', 'V'), v('Vm', 'Peak Voltage', 'ولتاژ پیک', 'V')],
    (vars, u) => u === 'Vrms' ? vars.Vm / Math.sqrt(2) : vars.Vrms * Math.sqrt(2)),

  f('ec7', 'Capacitive Reactance', 'راکتانس خازنی', 'circuits', 'ac_circuits', 'Xc = 1/(2πfC)',
    [v('Xc', 'Reactance', 'راکتانس', 'Ω'), v('f', 'Frequency', 'فرکانس', 'Hz'), v('C', 'Capacitance', 'ظرفیت', 'F')],
    (vars, u) => u === 'Xc' ? 1 / (2 * Math.PI * vars.f * vars.C) : u === 'f' ? 1 / (2 * Math.PI * vars.Xc * vars.C) : 1 / (2 * Math.PI * vars.f * vars.Xc)),

  f('ec8', 'Inductive Reactance', 'راکتانس سلفی', 'circuits', 'ac_circuits', 'XL = 2πfL',
    [v('XL', 'Reactance', 'راکتانس', 'Ω'), v('f', 'Frequency', 'فرکانس', 'Hz'), v('L', 'Inductance', 'اندوکتانس', 'H')],
    (vars, u) => u === 'XL' ? 2 * Math.PI * vars.f * vars.L : u === 'f' ? vars.XL / (2 * Math.PI * vars.L) : vars.XL / (2 * Math.PI * vars.f)),

  f('ec9', 'Impedance (RLC Series)', 'امپدانس (RLC سری)', 'circuits', 'rlc', 'Z = √(R²+(XL-Xc)²)',
    [v('Z', 'Impedance', 'امپدانس', 'Ω'), v('R', 'Resistance', 'مقاومت', 'Ω'), v('XL', 'Inductive X', 'راکتانس سلفی', 'Ω'), v('Xc', 'Capacitive X', 'راکتانس خازنی', 'Ω')],
    (vars, u) => u === 'Z' ? Math.sqrt(vars.R ** 2 + (vars.XL - vars.Xc) ** 2) : u === 'R' ? Math.sqrt(vars.Z ** 2 - (vars.XL - vars.Xc) ** 2) : NaN),

  f('ec10', 'Power Factor', 'ضریب توان', 'circuits', 'ac_circuits', 'PF = cos(φ) = R/Z',
    [v('PF', 'Power Factor', 'ضریب توان', ''), v('R', 'Resistance', 'مقاومت', 'Ω'), v('Z', 'Impedance', 'امپدانس', 'Ω')],
    (vars, u) => u === 'PF' ? vars.R / vars.Z : u === 'R' ? vars.PF * vars.Z : vars.R / vars.PF),

  f('ec11', 'Real Power', 'توان حقیقی', 'circuits', 'power', 'P = VIcos(φ)',
    [v('P', 'Real Power', 'توان حقیقی', 'W'), v('V', 'Voltage', 'ولتاژ', 'V'), v('I', 'Current', 'جریان', 'A'), v('phi', 'Phase Angle', 'زاویه فاز', '°')],
    (vars, u) => u === 'P' ? vars.V * vars.I * Math.cos(vars.phi * Math.PI / 180) : u === 'V' ? vars.P / (vars.I * Math.cos(vars.phi * Math.PI / 180)) : u === 'I' ? vars.P / (vars.V * Math.cos(vars.phi * Math.PI / 180)) : Math.acos(vars.P / (vars.V * vars.I)) * 180 / Math.PI),

  f('ec12', 'Reactive Power', 'توان راکتیو', 'circuits', 'power', 'Q = VIsin(φ)',
    [v('Q', 'Reactive Power', 'توان راکتیو', 'VAR'), v('V', 'Voltage', 'ولتاژ', 'V'), v('I', 'Current', 'جریان', 'A'), v('phi', 'Phase Angle', 'زاویه فاز', '°')],
    (vars, u) => u === 'Q' ? vars.V * vars.I * Math.sin(vars.phi * Math.PI / 180) : NaN),

  f('ec13', 'Apparent Power', 'توان ظاهری', 'circuits', 'power', 'S = VI',
    [v('S', 'Apparent Power', 'توان ظاهری', 'VA'), v('V', 'Voltage', 'ولتاژ', 'V'), v('I', 'Current', 'جریان', 'A')],
    (vars, u) => u === 'S' ? vars.V * vars.I : u === 'V' ? vars.S / vars.I : vars.S / vars.V),

  f('ec14', 'Transformer Ratio', 'نسبت ترانسفورماتور', 'circuits', 'power', 'V₁/V₂ = N₁/N₂',
    [v('V1', 'Primary V', 'ولتاژ اولیه', 'V'), v('V2', 'Secondary V', 'ولتاژ ثانویه', 'V'), v('N1', 'Primary Turns', 'دور اولیه', ''), v('N2', 'Secondary Turns', 'دور ثانویه', '')],
    (vars, u) => u === 'V1' ? vars.V2 * vars.N1 / vars.N2 : u === 'V2' ? vars.V1 * vars.N2 / vars.N1 : u === 'N1' ? vars.V1 * vars.N2 / vars.V2 : vars.V2 * vars.N1 / vars.V1),

  f('ec15', 'RLC Resonant Freq', 'فرکانس تشدید RLC', 'circuits', 'rlc', 'f₀ = 1/(2π√(LC))',
    [v('f0', 'Resonant Freq', 'فرکانس تشدید', 'Hz'), v('L', 'Inductance', 'اندوکتانس', 'H'), v('C', 'Capacitance', 'ظرفیت', 'F')],
    (vars, u) => u === 'f0' ? 1 / (2 * Math.PI * Math.sqrt(vars.L * vars.C)) : u === 'L' ? 1 / (4 * Math.PI ** 2 * vars.f0 ** 2 * vars.C) : 1 / (4 * Math.PI ** 2 * vars.f0 ** 2 * vars.L)),

  f('ec16', 'Q Factor RLC', 'ضریب Q مدار RLC', 'circuits', 'rlc', 'Q = (1/R)√(L/C)',
    [v('Q', 'Quality Factor', 'ضریب کیفیت', ''), v('R', 'Resistance', 'مقاومت', 'Ω'), v('L', 'Inductance', 'اندوکتانس', 'H'), v('C', 'Capacitance', 'ظرفیت', 'F')],
    (vars, u) => u === 'Q' ? (1 / vars.R) * Math.sqrt(vars.L / vars.C) : u === 'R' ? Math.sqrt(vars.L / vars.C) / vars.Q : NaN),

  f('ec17', 'Time Constant RL', 'ثابت زمانی RL', 'circuits', 'rlc', 'τ = L/R',
    [v('tau', 'Time Constant', 'ثابت زمانی', 's'), v('L', 'Inductance', 'اندوکتانس', 'H'), v('R', 'Resistance', 'مقاومت', 'Ω')],
    (vars, u) => u === 'tau' ? vars.L / vars.R : u === 'L' ? vars.tau * vars.R : vars.L / vars.tau),

  f('ec18', 'RC Charging', 'شارژ خازن RC', 'circuits', 'rlc', 'V(t) = V₀(1-e^(-t/RC))',
    [v('Vt', 'V(t)', 'V(t)', 'V'), v('V0', 'Supply V', 'ولتاژ منبع', 'V'), v('t', 'Time', 'زمان', 's'), v('R', 'Resistance', 'مقاومت', 'Ω'), v('C', 'Capacitance', 'ظرفیت', 'F')],
    (vars, u) => u === 'Vt' ? vars.V0 * (1 - Math.exp(-vars.t / (vars.R * vars.C))) : u === 't' ? -vars.R * vars.C * Math.log(1 - vars.Vt / vars.V0) : NaN),

  f('ec19', 'Three Phase Power', 'توان سه فاز', 'circuits', 'power', 'P = √3 VL IL cos(φ)',
    [v('P', 'Power', 'توان', 'W'), v('VL', 'Line Voltage', 'ولتاژ خط', 'V'), v('IL', 'Line Current', 'جریان خط', 'A'), v('phi', 'Phase Angle', 'زاویه فاز', '°')],
    (vars, u) => u === 'P' ? Math.sqrt(3) * vars.VL * vars.IL * Math.cos(vars.phi * Math.PI / 180) : u === 'VL' ? vars.P / (Math.sqrt(3) * vars.IL * Math.cos(vars.phi * Math.PI / 180)) : u === 'IL' ? vars.P / (Math.sqrt(3) * vars.VL * Math.cos(vars.phi * Math.PI / 180)) : NaN),

  f('ec20', 'Max Power Transfer', 'حداکثر انتقال توان', 'circuits', 'dc_circuits', 'Pmax = Vs²/(4RL)',
    [v('Pmax', 'Max Power', 'حداکثر توان', 'W'), v('Vs', 'Source Voltage', 'ولتاژ منبع', 'V'), v('RL', 'Load R', 'مقاومت بار', 'Ω')],
    (vars, u) => u === 'Pmax' ? vars.Vs ** 2 / (4 * vars.RL) : u === 'Vs' ? Math.sqrt(4 * vars.Pmax * vars.RL) : vars.Vs ** 2 / (4 * vars.Pmax)),

  // ==================== SIGNALS & SYSTEMS ====================
  f('s1', 'Sampling Theorem', 'قضیه نمونه‌برداری', 'signals', 'discrete', 'fs ≥ 2fmax',
    [v('fs', 'Sampling Freq', 'فرکانس نمونه‌برداری', 'Hz'), v('fmax', 'Max Freq', 'حداکثر فرکانس', 'Hz')],
    (vars, u) => u === 'fs' ? 2 * vars.fmax : vars.fs / 2),

  f('s2', 'DFT Resolution', 'تفکیک DFT', 'signals', 'frequency', 'Δf = fs/N',
    [v('df', 'Freq Resolution', 'تفکیک فرکانس', 'Hz'), v('fs', 'Sampling Freq', 'فرکانس نمونه‌برداری', 'Hz'), v('N', 'Number of Points', 'تعداد نقاط', '')],
    (vars, u) => u === 'df' ? vars.fs / vars.N : u === 'fs' ? vars.df * vars.N : vars.fs / vars.df),

  f('s3', 'Signal Energy', 'انرژی سیگنال', 'signals', 'continuous', 'E = ∫|x(t)|²dt ≈ A²T',
    [v('E', 'Energy', 'انرژی', 'J'), v('A', 'Amplitude', 'دامنه', ''), v('T', 'Duration', 'مدت', 's')],
    (vars, u) => u === 'E' ? vars.A ** 2 * vars.T : u === 'A' ? Math.sqrt(vars.E / vars.T) : vars.E / (vars.A ** 2)),

  f('s4', 'Signal Power', 'توان سیگنال', 'signals', 'continuous', 'P = E/T',
    [v('P', 'Power', 'توان', 'W'), v('E', 'Energy', 'انرژی', 'J'), v('T', 'Period', 'دوره', 's')],
    (vars, u) => u === 'P' ? vars.E / vars.T : u === 'E' ? vars.P * vars.T : vars.E / vars.P),

  f('s5', 'SNR (dB)', 'نسبت سیگنال به نویز', 'signals', 'continuous', 'SNR = 10log(Ps/Pn)',
    [v('SNR', 'SNR (dB)', 'SNR (dB)', 'dB'), v('Ps', 'Signal Power', 'توان سیگنال', 'W'), v('Pn', 'Noise Power', 'توان نویز', 'W')],
    (vars, u) => u === 'SNR' ? 10 * Math.log10(vars.Ps / vars.Pn) : u === 'Ps' ? vars.Pn * 10 ** (vars.SNR / 10) : vars.Ps / (10 ** (vars.SNR / 10))),

  f('s6', 'AM Modulation', 'مدولاسیون AM', 'signals', 'modulation', 's(t) = Ac(1+m·cos ωmt)cos ωct',
    [v('m', 'Modulation Index', 'شاخص مدولاسیون', ''), v('Am', 'Message Amp', 'دامنه پیام', ''), v('Ac', 'Carrier Amp', 'دامنه حامل', '')],
    (vars, u) => u === 'm' ? vars.Am / vars.Ac : u === 'Am' ? vars.m * vars.Ac : vars.Am / vars.m),

  f('s7', 'FM Deviation', 'انحراف FM', 'signals', 'modulation', 'Δf = kf × Am',
    [v('df', 'Freq Deviation', 'انحراف فرکانس', 'Hz'), v('kf', 'Sensitivity', 'حساسیت', 'Hz/V'), v('Am', 'Message Amp', 'دامنه پیام', 'V')],
    (vars, u) => u === 'df' ? vars.kf * vars.Am : u === 'kf' ? vars.df / vars.Am : vars.df / vars.kf),

  f('s8', 'FM Modulation Index', 'شاخص مدولاسیون FM', 'signals', 'modulation', 'β = Δf/fm',
    [v('beta', 'Modulation Index', 'شاخص مدولاسیون', ''), v('df', 'Freq Deviation', 'انحراف فرکانس', 'Hz'), v('fm', 'Message Freq', 'فرکانس پیام', 'Hz')],
    (vars, u) => u === 'beta' ? vars.df / vars.fm : u === 'df' ? vars.beta * vars.fm : vars.df / vars.beta),

  f('s9', 'Bandwidth (Carson)', 'پهنای باند (کارسون)', 'signals', 'modulation', 'BW = 2(Δf + fm)',
    [v('BW', 'Bandwidth', 'پهنای باند', 'Hz'), v('df', 'Freq Deviation', 'انحراف فرکانس', 'Hz'), v('fm', 'Message Freq', 'فرکانس پیام', 'Hz')],
    (vars, u) => u === 'BW' ? 2 * (vars.df + vars.fm) : u === 'df' ? vars.BW / 2 - vars.fm : vars.BW / 2 - vars.df),

  f('s10', 'Convolution Length', 'طول کانولوشن', 'signals', 'discrete', 'L = N + M - 1',
    [v('L', 'Output Length', 'طول خروجی', ''), v('N', 'Input Length', 'طول ورودی', ''), v('M', 'Filter Length', 'طول فیلتر', '')],
    (vars, u) => u === 'L' ? vars.N + vars.M - 1 : u === 'N' ? vars.L - vars.M + 1 : vars.L - vars.N + 1),

  // ==================== DIGITAL CONTROL ====================
  f('dc1', 'Transfer Function', 'تابع تبدیل', 'digital_control', 'control_basics', 'H(s) = Y(s)/X(s)',
    [v('H', 'Transfer Function', 'تابع تبدیل', ''), v('Y', 'Output', 'خروجی', ''), v('X', 'Input', 'ورودی', '')],
    (vars, u) => u === 'H' ? vars.Y / vars.X : u === 'Y' ? vars.H * vars.X : vars.Y / vars.H),

  f('dc2', 'Closed-Loop TF', 'تابع تبدیل حلقه بسته', 'digital_control', 'control_basics', 'T = G/(1+GH)',
    [v('T', 'Closed-Loop TF', 'تابع تبدیل حلقه بسته', ''), v('G', 'Forward Gain', 'بهره مستقیم', ''), v('H', 'Feedback', 'بازخورد', '')],
    (vars, u) => u === 'T' ? vars.G / (1 + vars.G * vars.H) : u === 'G' ? vars.T / (1 - vars.T * vars.H) : (vars.G / vars.T - 1) / vars.G),

  f('dc3', 'Steady-State Error', 'خطای حالت ماندگار', 'digital_control', 'control_basics', 'ess = 1/(1+Kp)',
    [v('ess', 'Steady-State Error', 'خطای ماندگار', ''), v('Kp', 'Position Constant', 'ثابت موقعیت', '')],
    (vars, u) => u === 'ess' ? 1 / (1 + vars.Kp) : 1 / vars.ess - 1),

  f('dc4', 'Z-Transform (a^n)', 'تبدیل Z (a^n)', 'digital_control', 'z_transform', 'Z{aⁿ} = z/(z-a)',
    [v('result', 'F(z)', 'F(z)', ''), v('z', 'z', 'z', ''), v('a', 'a', 'a', '')],
    (vars, u) => u === 'result' ? vars.z / (vars.z - vars.a) : u === 'a' ? vars.z - vars.z / vars.result : NaN),

  f('dc5', 'Z-Transform (Unit Step)', 'تبدیل Z (پله واحد)', 'digital_control', 'z_transform', 'Z{u[n]} = z/(z-1)',
    [v('result', 'F(z)', 'F(z)', ''), v('z', 'z', 'z', '')],
    (vars, u) => u === 'result' ? vars.z / (vars.z - 1) : NaN),

  f('dc6', 'Sampling Period', 'دوره نمونه‌برداری', 'digital_control', 'z_transform', 'T = 1/fs',
    [v('T', 'Sampling Period', 'دوره نمونه‌برداری', 's'), v('fs', 'Sampling Freq', 'فرکانس نمونه‌برداری', 'Hz')],
    (vars, u) => u === 'T' ? 1 / vars.fs : 1 / vars.T),

  f('dc7', 'PID Output', 'خروجی PID', 'digital_control', 'pid', 'u = Kp·e + Ki·∫e + Kd·de/dt',
    [v('u', 'Control Signal', 'سیگنال کنترل', ''), v('Kp', 'Proportional', 'تناسبی', ''), v('e', 'Error', 'خطا', ''), v('Ki_int', 'Ki×∫e', 'Ki×∫e', ''), v('Kd_de', 'Kd×de/dt', 'Kd×de/dt', '')],
    (vars, u) => u === 'u' ? vars.Kp * vars.e + vars.Ki_int + vars.Kd_de : NaN),

  f('dc8', 'Gain Margin', 'حاشیه بهره', 'digital_control', 'stability', 'GM = -20log|G(jω)|',
    [v('GM', 'Gain Margin', 'حاشیه بهره', 'dB'), v('G_mag', '|G(jω)|', '|G(jω)|', '')],
    (vars, u) => u === 'GM' ? -20 * Math.log10(vars.G_mag) : 10 ** (-vars.GM / 20)),

  f('dc9', 'Phase Margin', 'حاشیه فاز', 'digital_control', 'stability', 'PM = 180° + ∠G(jω)',
    [v('PM', 'Phase Margin', 'حاشیه فاز', '°'), v('phase', 'Phase', 'فاز', '°')],
    (vars, u) => u === 'PM' ? 180 + vars.phase : vars.PM - 180),

  f('dc10', 'Natural Frequency', 'فرکانس طبیعی', 'digital_control', 'control_basics', 'ωn = √(a₀)',
    [v('wn', 'Natural Freq', 'فرکانس طبیعی', 'rad/s'), v('a0', 'Coefficient', 'ضریب', '')],
    (vars, u) => u === 'wn' ? Math.sqrt(vars.a0) : vars.wn ** 2),

  f('dc11', 'Damping Ratio', 'نسبت میرایی', 'digital_control', 'control_basics', 'ζ = a₁/(2ωn)',
    [v('zeta', 'Damping Ratio', 'نسبت میرایی', ''), v('a1', 'Coefficient', 'ضریب', ''), v('wn', 'Natural Freq', 'فرکانس طبیعی', 'rad/s')],
    (vars, u) => u === 'zeta' ? vars.a1 / (2 * vars.wn) : u === 'a1' ? 2 * vars.zeta * vars.wn : vars.a1 / (2 * vars.zeta)),

  f('dc12', 'Settling Time', 'زمان نشست', 'digital_control', 'control_basics', 'ts ≈ 4/(ζωn)',
    [v('ts', 'Settling Time', 'زمان نشست', 's'), v('zeta', 'Damping Ratio', 'نسبت میرایی', ''), v('wn', 'Natural Freq', 'فرکانس طبیعی', 'rad/s')],
    (vars, u) => u === 'ts' ? 4 / (vars.zeta * vars.wn) : u === 'zeta' ? 4 / (vars.ts * vars.wn) : 4 / (vars.ts * vars.zeta)),

  f('dc13', 'Rise Time', 'زمان خیز', 'digital_control', 'control_basics', 'tr ≈ π/ωd',
    [v('tr', 'Rise Time', 'زمان خیز', 's'), v('wd', 'Damped Freq', 'فرکانس میرا', 'rad/s')],
    (vars, u) => u === 'tr' ? Math.PI / vars.wd : Math.PI / vars.tr),

  f('dc14', 'Damped Frequency', 'فرکانس میرا', 'digital_control', 'control_basics', 'ωd = ωn√(1-ζ²)',
    [v('wd', 'Damped Freq', 'فرکانس میرا', 'rad/s'), v('wn', 'Natural Freq', 'فرکانس طبیعی', 'rad/s'), v('zeta', 'Damping Ratio', 'نسبت میرایی', '')],
    (vars, u) => u === 'wd' ? vars.wn * Math.sqrt(1 - vars.zeta ** 2) : u === 'wn' ? vars.wd / Math.sqrt(1 - vars.zeta ** 2) : Math.sqrt(1 - (vars.wd / vars.wn) ** 2)),

  f('dc15', 'Overshoot', 'فراجهش', 'digital_control', 'control_basics', 'Mp = e^(-ζπ/√(1-ζ²))×100%',
    [v('Mp', 'Overshoot %', 'فراجهش %', '%'), v('zeta', 'Damping Ratio', 'نسبت میرایی', '')],
    (vars, u) => u === 'Mp' ? Math.exp(-vars.zeta * Math.PI / Math.sqrt(1 - vars.zeta ** 2)) * 100 : NaN),

  // ==================== BIOLOGY ====================
  f('b1', 'Hardy-Weinberg (p+q)', 'هاردی-واینبرگ', 'biology', 'genetics', 'p + q = 1',
    [v('p', 'Dominant Freq', 'فراوانی غالب', ''), v('q', 'Recessive Freq', 'فراوانی مغلوب', '')],
    (vars, u) => u === 'p' ? 1 - vars.q : 1 - vars.p),

  f('b2', 'Hardy-Weinberg Genotypes', 'ژنوتیپ هاردی-واینبرگ', 'biology', 'genetics', 'p² + 2pq + q² = 1',
    [v('p2', 'AA Freq', 'فراوانی AA', ''), v('pq2', 'Aa Freq', 'فراوانی Aa', ''), v('q2', 'aa Freq', 'فراوانی aa', '')],
    (vars, u) => u === 'p2' ? 1 - vars.pq2 - vars.q2 : u === 'pq2' ? 1 - vars.p2 - vars.q2 : 1 - vars.p2 - vars.pq2),

  f('b3', 'Population Growth', 'رشد جمعیت', 'biology', 'ecology', 'N = N₀e^(rt)',
    [v('N', 'Population', 'جمعیت', ''), v('N0', 'Initial Pop', 'جمعیت اولیه', ''), v('r', 'Growth Rate', 'نرخ رشد', ''), v('t', 'Time', 'زمان', '')],
    (vars, u) => u === 'N' ? vars.N0 * Math.exp(vars.r * vars.t) : u === 'N0' ? vars.N / Math.exp(vars.r * vars.t) : u === 'r' ? Math.log(vars.N / vars.N0) / vars.t : Math.log(vars.N / vars.N0) / vars.r),

  f('b4', 'Logistic Growth', 'رشد لجستیک', 'biology', 'ecology', 'dN/dt = rN(1-N/K)',
    [v('dNdt', 'Growth Rate', 'نرخ رشد', ''), v('r', 'Intrinsic Rate', 'نرخ ذاتی', ''), v('N', 'Population', 'جمعیت', ''), v('K', 'Carrying Capacity', 'ظرفیت تحمل', '')],
    (vars, u) => u === 'dNdt' ? vars.r * vars.N * (1 - vars.N / vars.K) : u === 'K' ? vars.N / (1 - vars.dNdt / (vars.r * vars.N)) : NaN),

  f('b5', 'Michaelis-Menten', 'میکائیلیس-منتن', 'biology', 'biochemistry', 'v = Vmax[S]/(Km+[S])',
    [v('v_rate', 'Reaction Rate', 'سرعت واکنش', ''), v('Vmax', 'Max Rate', 'حداکثر سرعت', ''), v('S', 'Substrate Conc', 'غلظت سوبسترا', ''), v('Km', 'Michaelis Const', 'ثابت میکائیلیس', '')],
    (vars, u) => u === 'v_rate' ? vars.Vmax * vars.S / (vars.Km + vars.S) : u === 'Vmax' ? vars.v_rate * (vars.Km + vars.S) / vars.S : u === 'Km' ? vars.S * (vars.Vmax / vars.v_rate - 1) : vars.v_rate * vars.Km / (vars.Vmax - vars.v_rate)),

  f('b6', 'BMI', 'شاخص توده بدنی', 'biology', 'physiology', 'BMI = m/h²',
    [v('BMI', 'BMI', 'BMI', 'kg/m²'), v('m', 'Mass', 'جرم', 'kg'), v('h', 'Height', 'قد', 'm')],
    (vars, u) => u === 'BMI' ? vars.m / (vars.h ** 2) : u === 'm' ? vars.BMI * vars.h ** 2 : Math.sqrt(vars.m / vars.BMI)),

  f('b7', 'Cardiac Output', 'برون‌ده قلبی', 'biology', 'physiology', 'CO = HR × SV',
    [v('CO', 'Cardiac Output', 'برون‌ده قلبی', 'L/min'), v('HR', 'Heart Rate', 'ضربان قلب', 'bpm'), v('SV', 'Stroke Volume', 'حجم ضربه‌ای', 'L')],
    (vars, u) => u === 'CO' ? vars.HR * vars.SV : u === 'HR' ? vars.CO / vars.SV : vars.CO / vars.HR),

  f('b8', 'Allele Frequency', 'فراوانی آلل', 'biology', 'genetics', 'f(A) = (2AA + Aa)/(2N)',
    [v('fA', 'Allele Freq', 'فراوانی آلل', ''), v('AA', 'Homozygous', 'هموزیگوت', ''), v('Aa', 'Heterozygous', 'هتروزیگوت', ''), v('N', 'Total', 'کل', '')],
    (vars, u) => u === 'fA' ? (2 * vars.AA + vars.Aa) / (2 * vars.N) : NaN),

  f('b9', 'Shannon Diversity', 'تنوع شانون', 'biology', 'ecology', 'H = -Σ(pi × ln(pi))',
    [v('H', 'Diversity Index', 'شاخص تنوع', ''), v('p1', 'Species 1 Prop', 'نسبت گونه ۱', ''), v('p2', 'Species 2 Prop', 'نسبت گونه ۲', '')],
    (vars, u) => u === 'H' ? -(vars.p1 * Math.log(vars.p1) + vars.p2 * Math.log(vars.p2)) : NaN),

  f('b10', 'GFR Estimation', 'تخمین GFR', 'biology', 'physiology', 'GFR = (UV)/P',
    [v('GFR', 'GFR', 'GFR', 'mL/min'), v('U', 'Urine Conc', 'غلظت ادرار', 'mg/mL'), v('V_flow', 'Urine Flow', 'دبی ادرار', 'mL/min'), v('P', 'Plasma Conc', 'غلظت پلاسما', 'mg/mL')],
    (vars, u) => u === 'GFR' ? vars.U * vars.V_flow / vars.P : u === 'U' ? vars.GFR * vars.P / vars.V_flow : u === 'V_flow' ? vars.GFR * vars.P / vars.U : vars.U * vars.V_flow / vars.GFR),

  // ==================== MORE FORMULAS TO REACH 500+ ====================
  // Additional Physics
  f('p66', 'Resistivity', 'مقاومت ویژه', 'electronics', 'basic_electronics', 'R = ρL/A',
    [v('R', 'Resistance', 'مقاومت', 'Ω'), v('rho', 'Resistivity', 'مقاومت ویژه', 'Ω·m'), v('L', 'Length', 'طول', 'm'), v('A', 'Area', 'سطح', 'm²')],
    (vars, u) => u === 'R' ? vars.rho * vars.L / vars.A : u === 'rho' ? vars.R * vars.A / vars.L : u === 'L' ? vars.R * vars.A / vars.rho : vars.rho * vars.L / vars.R),

  f('p67', 'Parallel Plate Capacitor', 'خازن صفحه‌ای', 'electronics', 'basic_electronics', 'C = ε₀εrA/d',
    [v('C', 'Capacitance', 'ظرفیت', 'F'), v('er', 'Relative Permittivity', 'ضریب دی‌الکتریک', ''), v('A', 'Area', 'سطح', 'm²'), v('d', 'Separation', 'فاصله', 'm')],
    (vars, u) => { const e0 = 8.854e-12; return u === 'C' ? e0 * vars.er * vars.A / vars.d : u === 'er' ? vars.C * vars.d / (e0 * vars.A) : u === 'A' ? vars.C * vars.d / (e0 * vars.er) : e0 * vars.er * vars.A / vars.C; }),

  f('p68', 'Drift Velocity', 'سرعت دریفت', 'electronics', 'semiconductors', 'vd = I/(nAq)',
    [v('vd', 'Drift Velocity', 'سرعت دریفت', 'm/s'), v('I', 'Current', 'جریان', 'A'), v('n_density', 'Carrier Density', 'چگالی حامل', '1/m³'), v('A', 'Area', 'سطح', 'm²'), v('q', 'Charge', 'بار', 'C')],
    (vars, u) => u === 'vd' ? vars.I / (vars.n_density * vars.A * vars.q) : u === 'I' ? vars.vd * vars.n_density * vars.A * vars.q : NaN),

  f('p69', 'Magnetic Force on Wire', 'نیروی مغناطیسی روی سیم', 'physics', 'electromagnetism', 'F = BILsin(θ)',
    [v('F', 'Force', 'نیرو', 'N'), v('B', 'Mag Field', 'میدان', 'T'), v('I', 'Current', 'جریان', 'A'), v('L', 'Length', 'طول', 'm'), v('theta', 'Angle', 'زاویه', '°')],
    (vars, u) => u === 'F' ? vars.B * vars.I * vars.L * Math.sin(vars.theta * Math.PI / 180) : u === 'B' ? vars.F / (vars.I * vars.L * Math.sin(vars.theta * Math.PI / 180)) : u === 'I' ? vars.F / (vars.B * vars.L * Math.sin(vars.theta * Math.PI / 180)) : u === 'L' ? vars.F / (vars.B * vars.I * Math.sin(vars.theta * Math.PI / 180)) : Math.asin(vars.F / (vars.B * vars.I * vars.L)) * 180 / Math.PI),

  f('p70', 'Gauss\'s Law', 'قانون گاوس', 'physics', 'electromagnetism', 'Φ = Q/ε₀',
    [v('Phi', 'Electric Flux', 'شار الکتریکی', 'N·m²/C'), v('Q', 'Charge', 'بار', 'C')],
    (vars, u) => { const e0 = 8.854e-12; return u === 'Phi' ? vars.Q / e0 : vars.Phi * e0; }),

  // More Geometry
  f('m26', 'Parallelogram Area', 'مساحت متوازی‌الاضلاع', 'math', 'geometry', 'A = bh',
    [v('A', 'Area', 'مساحت', ''), v('b', 'Base', 'قاعده', ''), v('h', 'Height', 'ارتفاع', '')],
    (vars, u) => u === 'A' ? vars.b * vars.h : u === 'b' ? vars.A / vars.h : vars.A / vars.b),

  f('m27', 'Regular Polygon Area', 'مساحت چندضلعی منتظم', 'math', 'geometry', 'A = ½nsa',
    [v('A', 'Area', 'مساحت', ''), v('n', 'Sides', 'اضلاع', ''), v('s', 'Side Length', 'طول ضلع', ''), v('a', 'Apothem', 'آپوتم', '')],
    (vars, u) => u === 'A' ? 0.5 * vars.n * vars.s * vars.a : NaN),

  f('m28', 'Sector Area', 'مساحت قطاع', 'math', 'geometry', 'A = ½r²θ',
    [v('A', 'Area', 'مساحت', ''), v('r', 'Radius', 'شعاع', ''), v('theta', 'Angle (rad)', 'زاویه (رادیان)', 'rad')],
    (vars, u) => u === 'A' ? 0.5 * vars.r ** 2 * vars.theta : u === 'r' ? Math.sqrt(2 * vars.A / vars.theta) : 2 * vars.A / (vars.r ** 2)),

  f('m29', 'Frustum Volume', 'حجم خرپا', 'math', 'geometry', 'V = (πh/3)(r₁²+r₁r₂+r₂²)',
    [v('V', 'Volume', 'حجم', ''), v('h', 'Height', 'ارتفاع', ''), v('r1', 'Radius 1', 'شعاع ۱', ''), v('r2', 'Radius 2', 'شعاع ۲', '')],
    (vars, u) => u === 'V' ? Math.PI * vars.h / 3 * (vars.r1 ** 2 + vars.r1 * vars.r2 + vars.r2 ** 2) : NaN),

  f('m30', 'Torus Volume', 'حجم چنبره', 'math', 'geometry', 'V = 2π²Rr²',
    [v('V', 'Volume', 'حجم', ''), v('R', 'Major Radius', 'شعاع بزرگ', ''), v('r', 'Minor Radius', 'شعاع کوچک', '')],
    (vars, u) => u === 'V' ? 2 * Math.PI ** 2 * vars.R * vars.r ** 2 : u === 'R' ? vars.V / (2 * Math.PI ** 2 * vars.r ** 2) : Math.sqrt(vars.V / (2 * Math.PI ** 2 * vars.R))),

  // More advanced formulas
  f('s11', 'Channel Capacity', 'ظرفیت کانال', 'signals', 'frequency', 'C = B log₂(1+SNR)',
    [v('C', 'Capacity', 'ظرفیت', 'bps'), v('B', 'Bandwidth', 'پهنای باند', 'Hz'), v('SNR_linear', 'SNR (linear)', 'SNR (خطی)', '')],
    (vars, u) => u === 'C' ? vars.B * Math.log2(1 + vars.SNR_linear) : u === 'B' ? vars.C / Math.log2(1 + vars.SNR_linear) : 2 ** (vars.C / vars.B) - 1),

  f('s12', 'Bit Rate', 'نرخ بیت', 'signals', 'discrete', 'Rb = fs × b',
    [v('Rb', 'Bit Rate', 'نرخ بیت', 'bps'), v('fs', 'Sampling Freq', 'فرکانس نمونه‌برداری', 'Hz'), v('b', 'Bits/Sample', 'بیت/نمونه', '')],
    (vars, u) => u === 'Rb' ? vars.fs * vars.b : u === 'fs' ? vars.Rb / vars.b : vars.Rb / vars.fs),

  f('s13', 'Quantization Levels', 'سطوح کوانتیزاسیون', 'signals', 'discrete', 'L = 2^b',
    [v('L', 'Levels', 'سطوح', ''), v('b', 'Bits', 'بیت', '')],
    (vars, u) => u === 'L' ? 2 ** vars.b : Math.log2(vars.L)),

  f('s14', 'SQNR', 'SQNR', 'signals', 'discrete', 'SQNR = 6.02b + 1.76 dB',
    [v('SQNR', 'SQNR', 'SQNR', 'dB'), v('b', 'Bits', 'بیت', '')],
    (vars, u) => u === 'SQNR' ? 6.02 * vars.b + 1.76 : (vars.SQNR - 1.76) / 6.02),

  f('dc16', 'Bilinear Transform', 'تبدیل بیلینیر', 'digital_control', 'z_transform', 's = (2/T)(z-1)/(z+1)',
    [v('s_val', 's', 's', ''), v('T', 'Period', 'دوره', 's'), v('z', 'z', 'z', '')],
    (vars, u) => u === 's_val' ? (2 / vars.T) * (vars.z - 1) / (vars.z + 1) : NaN),

  f('dc17', 'Routh Stability (2nd order)', 'پایداری روث (مرتبه ۲)', 'digital_control', 'stability', 'All coefficients > 0',
    [v('a2', 'a₂', 'a₂', ''), v('a1', 'a₁', 'a₁', ''), v('a0', 'a₀', 'a₀', '')],
    (vars, u) => u === 'a2' ? (vars.a1 > 0 && vars.a0 > 0) ? 1 : 0 : NaN),

  f('c21', 'Raoult\'s Law', 'قانون رائول', 'chemistry', 'solutions', 'P = xP°',
    [v('P', 'Vapor Pressure', 'فشار بخار', 'atm'), v('x', 'Mole Fraction', 'کسر مولی', ''), v('P0', 'Pure VP', 'فشار بخار خالص', 'atm')],
    (vars, u) => u === 'P' ? vars.x * vars.P0 : u === 'x' ? vars.P / vars.P0 : vars.P / vars.x),

  f('c22', 'Henry\'s Law', 'قانون هنری', 'chemistry', 'solutions', 'C = kH × P',
    [v('C', 'Concentration', 'غلظت', 'mol/L'), v('kH', 'Henry Constant', 'ثابت هنری', 'mol/(L·atm)'), v('P', 'Pressure', 'فشار', 'atm')],
    (vars, u) => u === 'C' ? vars.kH * vars.P : u === 'kH' ? vars.C / vars.P : vars.C / vars.kH),

  f('c23', 'Clausius-Clapeyron', 'کلازیوس-کلاپیرون', 'chemistry', 'thermochem', 'ln(P₂/P₁) = (ΔHvap/R)(1/T₁-1/T₂)',
    [v('P1', 'Pressure 1', 'فشار ۱', 'atm'), v('P2', 'Pressure 2', 'فشار ۲', 'atm'), v('dHvap', 'ΔHvap', 'ΔHvap', 'J/mol'), v('T1', 'Temp 1', 'دمای ۱', 'K'), v('T2', 'Temp 2', 'دمای ۲', 'K')],
    (vars, u) => { const R = 8.314; return u === 'P2' ? vars.P1 * Math.exp(vars.dHvap / R * (1 / vars.T1 - 1 / vars.T2)) : u === 'P1' ? vars.P2 / Math.exp(vars.dHvap / R * (1 / vars.T1 - 1 / vars.T2)) : NaN; }),

  f('c24', 'Rate Law (2nd order)', 'قانون سرعت مرتبه ۲', 'chemistry', 'kinetics', '1/[A] = 1/[A]₀ + kt',
    [v('A_final', '1/[A]', '1/[A]', 'L/mol'), v('A0_inv', '1/[A]₀', '1/[A]₀', 'L/mol'), v('k', 'Rate Constant', 'ثابت سرعت', 'L/(mol·s)'), v('t', 'Time', 'زمان', 's')],
    (vars, u) => u === 'A_final' ? vars.A0_inv + vars.k * vars.t : u === 'A0_inv' ? vars.A_final - vars.k * vars.t : u === 'k' ? (vars.A_final - vars.A0_inv) / vars.t : (vars.A_final - vars.A0_inv) / vars.k),

  f('c25', 'Half-Life (1st order)', 'نیمه‌عمر (مرتبه ۱)', 'chemistry', 'kinetics', 't½ = 0.693/k',
    [v('t_half', 'Half-Life', 'نیمه‌عمر', 's'), v('k', 'Rate Constant', 'ثابت سرعت', '1/s')],
    (vars, u) => u === 't_half' ? 0.693 / vars.k : 0.693 / vars.t_half),

  // More physics formulas
  f('p71', 'Wave Equation Speed', 'سرعت موج در ریسمان', 'physics', 'waves', 'v = √(T/μ)',
    [v('v', 'Wave Speed', 'سرعت موج', 'm/s'), v('T_tension', 'Tension', 'کشش', 'N'), v('mu', 'Linear Density', 'چگالی خطی', 'kg/m')],
    (vars, u) => u === 'v' ? Math.sqrt(vars.T_tension / vars.mu) : u === 'T_tension' ? vars.v ** 2 * vars.mu : vars.T_tension / (vars.v ** 2)),

  f('p72', 'Beat Frequency', 'فرکانس ضربان', 'physics', 'waves', 'fb = |f₁ - f₂|',
    [v('fb', 'Beat Freq', 'فرکانس ضربان', 'Hz'), v('f1', 'Freq 1', 'فرکانس ۱', 'Hz'), v('f2', 'Freq 2', 'فرکانس ۲', 'Hz')],
    (vars, u) => u === 'fb' ? Math.abs(vars.f1 - vars.f2) : u === 'f1' ? vars.f2 + vars.fb : vars.f1 - vars.fb),

  f('p73', 'Surface Tension', 'کشش سطحی', 'physics', 'fluids', 'F = γL',
    [v('F', 'Force', 'نیرو', 'N'), v('gamma', 'Surface Tension', 'کشش سطحی', 'N/m'), v('L', 'Length', 'طول', 'm')],
    (vars, u) => u === 'F' ? vars.gamma * vars.L : u === 'gamma' ? vars.F / vars.L : vars.F / vars.gamma),

  f('p74', 'Poiseuille\'s Law', 'قانون پوازی', 'physics', 'fluids', 'Q = πr⁴ΔP/(8ηL)',
    [v('Q', 'Flow Rate', 'دبی', 'm³/s'), v('r', 'Radius', 'شعاع', 'm'), v('dP', 'Pressure Diff', 'اختلاف فشار', 'Pa'), v('eta', 'Viscosity', 'لزجت', 'Pa·s'), v('L', 'Length', 'طول', 'm')],
    (vars, u) => u === 'Q' ? Math.PI * vars.r ** 4 * vars.dP / (8 * vars.eta * vars.L) : NaN),

  f('p75', 'Capacitor Charge', 'بار خازن', 'physics', 'electromagnetism', 'Q = CV',
    [v('Q', 'Charge', 'بار', 'C'), v('C', 'Capacitance', 'ظرفیت', 'F'), v('V', 'Voltage', 'ولتاژ', 'V')],
    (vars, u) => u === 'Q' ? vars.C * vars.V : u === 'C' ? vars.Q / vars.V : vars.Q / vars.C),

  // More Signals
  f('s15', 'Autocorrelation Power', 'توان خودهمبستگی', 'signals', 'continuous', 'Rxx(0) = Power',
    [v('P', 'Power', 'توان', ''), v('A', 'Amplitude', 'دامنه', '')],
    (vars, u) => u === 'P' ? vars.A ** 2 / 2 : Math.sqrt(2 * vars.P)),

  f('s16', 'Parseval\'s Theorem', 'قضیه پارسوال', 'signals', 'frequency', 'E = (1/2π)∫|X(ω)|²dω',
    [v('E', 'Energy', 'انرژی', ''), v('X_mag', '|X(ω)|', '|X(ω)|', ''), v('BW', 'Bandwidth', 'پهنای باند', 'rad/s')],
    (vars, u) => u === 'E' ? vars.X_mag ** 2 * vars.BW / (2 * Math.PI) : NaN),

  // More Control
  f('dc18', 'Loop Gain', 'بهره حلقه', 'digital_control', 'control_basics', 'L = GH',
    [v('L_gain', 'Loop Gain', 'بهره حلقه', ''), v('G', 'Forward Gain', 'بهره مستقیم', ''), v('H', 'Feedback', 'بازخورد', '')],
    (vars, u) => u === 'L_gain' ? vars.G * vars.H : u === 'G' ? vars.L_gain / vars.H : vars.L_gain / vars.G),

  f('dc19', 'Sensitivity', 'حساسیت', 'digital_control', 'control_basics', 'S = 1/(1+GH)',
    [v('S', 'Sensitivity', 'حساسیت', ''), v('G', 'Forward Gain', 'بهره مستقیم', ''), v('H', 'Feedback', 'بازخورد', '')],
    (vars, u) => u === 'S' ? 1 / (1 + vars.G * vars.H) : NaN),

  f('dc20', 'Peak Time', 'زمان اوج', 'digital_control', 'control_basics', 'tp = π/ωd',
    [v('tp', 'Peak Time', 'زمان اوج', 's'), v('wd', 'Damped Freq', 'فرکانس میرا', 'rad/s')],
    (vars, u) => u === 'tp' ? Math.PI / vars.wd : Math.PI / vars.tp),

  // Additional Electronics
  f('e21', 'MOSFET Drain Current', 'جریان درین MOSFET', 'electronics', 'semiconductors', 'Id = K(Vgs-Vt)²',
    [v('Id', 'Drain Current', 'جریان درین', 'A'), v('K', 'Transconductance', 'ترانس‌هدایت', 'A/V²'), v('Vgs', 'Gate-Source V', 'ولتاژ گیت-سورس', 'V'), v('Vt', 'Threshold V', 'ولتاژ آستانه', 'V')],
    (vars, u) => u === 'Id' ? vars.K * (vars.Vgs - vars.Vt) ** 2 : u === 'Vgs' ? vars.Vt + Math.sqrt(vars.Id / vars.K) : NaN),

  f('e22', 'BJT Emitter Current', 'جریان امیتر BJT', 'electronics', 'semiconductors', 'Ie = Ic + Ib',
    [v('Ie', 'Emitter Current', 'جریان امیتر', 'A'), v('Ic', 'Collector Current', 'جریان کلکتور', 'A'), v('Ib', 'Base Current', 'جریان بیس', 'A')],
    (vars, u) => u === 'Ie' ? vars.Ic + vars.Ib : u === 'Ic' ? vars.Ie - vars.Ib : vars.Ie - vars.Ic),

  f('e23', 'Power Gain (dB)', 'بهره توان', 'electronics', 'amplifiers', 'Gp = 10log(Pout/Pin)',
    [v('Gp', 'Power Gain', 'بهره توان', 'dB'), v('Pout', 'Output Power', 'توان خروجی', 'W'), v('Pin', 'Input Power', 'توان ورودی', 'W')],
    (vars, u) => u === 'Gp' ? 10 * Math.log10(vars.Pout / vars.Pin) : u === 'Pout' ? vars.Pin * 10 ** (vars.Gp / 10) : vars.Pout / (10 ** (vars.Gp / 10))),

  f('e24', 'Bandpass BW', 'پهنای باند میان‌گذر', 'electronics', 'filters', 'BW = fH - fL',
    [v('BW', 'Bandwidth', 'پهنای باند', 'Hz'), v('fH', 'High Cutoff', 'فرکانس بالا', 'Hz'), v('fL', 'Low Cutoff', 'فرکانس پایین', 'Hz')],
    (vars, u) => u === 'BW' ? vars.fH - vars.fL : u === 'fH' ? vars.fL + vars.BW : vars.fH - vars.BW),

  f('e25', 'Voltage Regulator', 'رگولاتور ولتاژ', 'electronics', 'basic_electronics', 'Vout = Vref(1+R₂/R₁)',
    [v('Vout', 'Output V', 'ولتاژ خروجی', 'V'), v('Vref', 'Reference V', 'ولتاژ مرجع', 'V'), v('R1', 'R₁', 'R₁', 'Ω'), v('R2', 'R₂', 'R₂', 'Ω')],
    (vars, u) => u === 'Vout' ? vars.Vref * (1 + vars.R2 / vars.R1) : u === 'Vref' ? vars.Vout / (1 + vars.R2 / vars.R1) : NaN),

  // More Chemistry
  f('c26', 'Van der Waals', 'وان در والس', 'chemistry', 'general_chem', '(P+a/V²)(V-b) = RT',
    [v('P', 'Pressure', 'فشار', 'atm'), v('V', 'Volume', 'حجم', 'L'), v('a', 'a constant', 'ثابت a', 'atm·L²/mol²'), v('b', 'b constant', 'ثابت b', 'L/mol'), v('T', 'Temperature', 'دما', 'K')],
    (vars, u) => { const R = 0.0821; return u === 'P' ? R * vars.T / (vars.V - vars.b) - vars.a / (vars.V ** 2) : u === 'T' ? (vars.P + vars.a / (vars.V ** 2)) * (vars.V - vars.b) / R : NaN; }),

  f('c27', 'Percent Yield', 'بازده درصدی', 'chemistry', 'general_chem', '%yield = (actual/theoretical)×100',
    [v('yield_pct', 'Percent Yield', 'بازده درصدی', '%'), v('actual', 'Actual Yield', 'بازده واقعی', 'g'), v('theoretical', 'Theoretical Yield', 'بازده نظری', 'g')],
    (vars, u) => u === 'yield_pct' ? (vars.actual / vars.theoretical) * 100 : u === 'actual' ? vars.yield_pct * vars.theoretical / 100 : vars.actual * 100 / vars.yield_pct),

  f('c28', 'Mass Percent', 'درصد جرمی', 'chemistry', 'solutions', '%mass = (solute/solution)×100',
    [v('mass_pct', 'Mass Percent', 'درصد جرمی', '%'), v('m_solute', 'Solute Mass', 'جرم حل‌شونده', 'g'), v('m_solution', 'Solution Mass', 'جرم محلول', 'g')],
    (vars, u) => u === 'mass_pct' ? (vars.m_solute / vars.m_solution) * 100 : u === 'm_solute' ? vars.mass_pct * vars.m_solution / 100 : vars.m_solute * 100 / vars.mass_pct),

  f('c29', 'Cell Potential', 'پتانسیل سلول', 'chemistry', 'electrochemistry', 'E°cell = E°cathode - E°anode',
    [v('Ecell', 'Cell Potential', 'پتانسیل سلول', 'V'), v('Ecathode', 'Cathode E°', 'پتانسیل کاتد', 'V'), v('Eanode', 'Anode E°', 'پتانسیل آند', 'V')],
    (vars, u) => u === 'Ecell' ? vars.Ecathode - vars.Eanode : u === 'Ecathode' ? vars.Ecell + vars.Eanode : vars.Ecathode - vars.Ecell),

  f('c30', 'Mole Fraction', 'کسر مولی', 'chemistry', 'solutions', 'χA = nA/(nA+nB)',
    [v('chi', 'Mole Fraction', 'کسر مولی', ''), v('nA', 'Moles A', 'مول A', 'mol'), v('nB', 'Moles B', 'مول B', 'mol')],
    (vars, u) => u === 'chi' ? vars.nA / (vars.nA + vars.nB) : NaN),

  // More Biology
  f('b11', 'Doubling Time', 'زمان دوبرابر شدن', 'biology', 'ecology', 'td = ln(2)/r',
    [v('td', 'Doubling Time', 'زمان دوبرابر شدن', ''), v('r', 'Growth Rate', 'نرخ رشد', '')],
    (vars, u) => u === 'td' ? Math.log(2) / vars.r : Math.log(2) / vars.td),

  f('b12', 'Dilution Factor', 'فاکتور رقت', 'biology', 'biochemistry', 'DF = Vi/Vf',
    [v('DF', 'Dilution Factor', 'فاکتور رقت', ''), v('Vi', 'Initial Volume', 'حجم اولیه', 'mL'), v('Vf', 'Final Volume', 'حجم نهایی', 'mL')],
    (vars, u) => u === 'DF' ? vars.Vi / vars.Vf : u === 'Vi' ? vars.DF * vars.Vf : vars.Vi / vars.DF),

  f('b13', 'Beer-Lambert', 'بیر-لامبرت', 'biology', 'biochemistry', 'A = εcl',
    [v('A', 'Absorbance', 'جذب', ''), v('epsilon', 'Molar Absorptivity', 'ضریب جذب مولی', 'L/(mol·cm)'), v('c_conc', 'Concentration', 'غلظت', 'mol/L'), v('l', 'Path Length', 'طول مسیر', 'cm')],
    (vars, u) => u === 'A' ? vars.epsilon * vars.c_conc * vars.l : u === 'epsilon' ? vars.A / (vars.c_conc * vars.l) : u === 'c_conc' ? vars.A / (vars.epsilon * vars.l) : vars.A / (vars.epsilon * vars.c_conc)),

  f('b14', 'Henderson Eq (Biology)', 'معادله هندرسون', 'biology', 'biochemistry', 'pH = pKa + log([A⁻]/[HA])',
    [v('pH', 'pH', 'pH', ''), v('pKa', 'pKa', 'pKa', ''), v('conj_base', '[A⁻]', '[A⁻]', 'mol/L'), v('acid', '[HA]', '[HA]', 'mol/L')],
    (vars, u) => u === 'pH' ? vars.pKa + Math.log10(vars.conj_base / vars.acid) : u === 'pKa' ? vars.pH - Math.log10(vars.conj_base / vars.acid) : NaN),

  f('b15', 'Mean Arterial Pressure', 'فشار شریانی میانگین', 'biology', 'physiology', 'MAP = DBP + ⅓(SBP-DBP)',
    [v('MAP', 'MAP', 'MAP', 'mmHg'), v('SBP', 'Systolic BP', 'فشار سیستولی', 'mmHg'), v('DBP', 'Diastolic BP', 'فشار دیاستولی', 'mmHg')],
    (vars, u) => u === 'MAP' ? vars.DBP + (vars.SBP - vars.DBP) / 3 : u === 'SBP' ? 3 * (vars.MAP - vars.DBP) + vars.DBP : vars.MAP - (vars.SBP - vars.MAP) / 2),

  // Additional formulas for more coverage
  f('p76', 'Stress', 'تنش', 'physics', 'mechanics', 'σ = F/A',
    [v('sigma', 'Stress', 'تنش', 'Pa'), v('F', 'Force', 'نیرو', 'N'), v('A', 'Area', 'سطح', 'm²')],
    (vars, u) => u === 'sigma' ? vars.F / vars.A : u === 'F' ? vars.sigma * vars.A : vars.F / vars.sigma),

  f('p77', 'Strain', 'کرنش', 'physics', 'mechanics', 'ε = ΔL/L₀',
    [v('epsilon', 'Strain', 'کرنش', ''), v('dL', 'Change in Length', 'تغییر طول', 'm'), v('L0', 'Original Length', 'طول اولیه', 'm')],
    (vars, u) => u === 'epsilon' ? vars.dL / vars.L0 : u === 'dL' ? vars.epsilon * vars.L0 : vars.dL / vars.epsilon),

  f('p78', 'Young\'s Modulus', 'مدول یانگ', 'physics', 'mechanics', 'E = σ/ε',
    [v('E_mod', 'Young\'s Modulus', 'مدول یانگ', 'Pa'), v('sigma', 'Stress', 'تنش', 'Pa'), v('epsilon', 'Strain', 'کرنش', '')],
    (vars, u) => u === 'E_mod' ? vars.sigma / vars.epsilon : u === 'sigma' ? vars.E_mod * vars.epsilon : vars.sigma / vars.E_mod),

  f('p79', 'Spring-Mass Period', 'دوره فنر-جرم', 'physics', 'mechanics', 'T = 2π√(m/k)',
    [v('T', 'Period', 'دوره', 's'), v('m', 'Mass', 'جرم', 'kg'), v('k', 'Spring Constant', 'ثابت فنر', 'N/m')],
    (vars, u) => u === 'T' ? 2 * Math.PI * Math.sqrt(vars.m / vars.k) : u === 'm' ? vars.k * (vars.T / (2 * Math.PI)) ** 2 : vars.m / (vars.T / (2 * Math.PI)) ** 2),

  f('p80', 'Bulk Modulus', 'مدول حجمی', 'physics', 'mechanics', 'B = -V(ΔP/ΔV)',
    [v('B', 'Bulk Modulus', 'مدول حجمی', 'Pa'), v('V', 'Volume', 'حجم', 'm³'), v('dP', 'Pressure Change', 'تغییر فشار', 'Pa'), v('dV', 'Volume Change', 'تغییر حجم', 'm³')],
    (vars, u) => u === 'B' ? -vars.V * vars.dP / vars.dV : NaN),

  // More electrical formulas
  f('ec21', 'Mutual Inductance', 'القای متقابل', 'circuits', 'rlc', 'M = k√(L₁L₂)',
    [v('M', 'Mutual Inductance', 'القای متقابل', 'H'), v('k', 'Coupling', 'ضریب جفتگی', ''), v('L1', 'L₁', 'L₁', 'H'), v('L2', 'L₂', 'L₂', 'H')],
    (vars, u) => u === 'M' ? vars.k * Math.sqrt(vars.L1 * vars.L2) : u === 'k' ? vars.M / Math.sqrt(vars.L1 * vars.L2) : NaN),

  f('ec22', 'Energy in Capacitor', 'انرژی خازن', 'circuits', 'dc_circuits', 'W = ½CV²',
    [v('W', 'Energy', 'انرژی', 'J'), v('C', 'Capacitance', 'ظرفیت', 'F'), v('V', 'Voltage', 'ولتاژ', 'V')],
    (vars, u) => u === 'W' ? 0.5 * vars.C * vars.V ** 2 : u === 'C' ? 2 * vars.W / (vars.V ** 2) : Math.sqrt(2 * vars.W / vars.C)),

  f('ec23', 'Energy in Inductor', 'انرژی سلف', 'circuits', 'dc_circuits', 'W = ½LI²',
    [v('W', 'Energy', 'انرژی', 'J'), v('L', 'Inductance', 'اندوکتانس', 'H'), v('I', 'Current', 'جریان', 'A')],
    (vars, u) => u === 'W' ? 0.5 * vars.L * vars.I ** 2 : u === 'L' ? 2 * vars.W / (vars.I ** 2) : Math.sqrt(2 * vars.W / vars.L)),

  f('ec24', 'Conductance', 'هدایت', 'circuits', 'dc_circuits', 'G = 1/R',
    [v('G', 'Conductance', 'هدایت', 'S'), v('R', 'Resistance', 'مقاومت', 'Ω')],
    (vars, u) => u === 'G' ? 1 / vars.R : 1 / vars.G),

  f('ec25', 'Complex Power', 'توان مختلط', 'circuits', 'power', 'S = √(P²+Q²)',
    [v('S', 'Apparent Power', 'توان ظاهری', 'VA'), v('P', 'Real Power', 'توان حقیقی', 'W'), v('Q', 'Reactive Power', 'توان راکتیو', 'VAR')],
    (vars, u) => u === 'S' ? Math.sqrt(vars.P ** 2 + vars.Q ** 2) : u === 'P' ? Math.sqrt(vars.S ** 2 - vars.Q ** 2) : Math.sqrt(vars.S ** 2 - vars.P ** 2)),

  // Additional quantum formulas
  f('q17', 'Photon Momentum', 'تکانه فوتون', 'quantum', 'quantum_basics', 'p = h/λ',
    [v('p', 'Momentum', 'تکانه', 'kg·m/s'), v('h_val', 'Planck Constant', 'ثابت پلانک', 'J·s'), v('lambda', 'Wavelength', 'طول موج', 'm')],
    (vars, u) => u === 'p' ? vars.h_val / vars.lambda : u === 'h_val' ? vars.p * vars.lambda : vars.h_val / vars.p),

  f('q18', 'Photon Energy-Wavelength', 'انرژی-طول موج فوتون', 'quantum', 'quantum_basics', 'E = hc/λ',
    [v('E', 'Energy', 'انرژی', 'J'), v('lambda', 'Wavelength', 'طول موج', 'm')],
    (vars, u) => { const hc = 6.626e-34 * 3e8; return u === 'E' ? hc / vars.lambda : hc / vars.E; }),

  f('q19', 'Wien\'s Law', 'قانون وین', 'quantum', 'quantum_basics', 'λmax = b/T',
    [v('lambda_max', 'Peak Wavelength', 'طول موج پیک', 'm'), v('T', 'Temperature', 'دما', 'K')],
    (vars, u) => { const b = 2.898e-3; return u === 'lambda_max' ? b / vars.T : b / vars.lambda_max; }),

  f('q20', 'Planck\'s Radiation', 'تابش پلانک', 'quantum', 'quantum_basics', 'E = nhf',
    [v('E', 'Energy', 'انرژی', 'J'), v('n', 'Quantum Number', 'عدد کوانتومی', ''), v('h_val', 'Planck Const', 'ثابت پلانک', 'J·s'), v('f', 'Frequency', 'فرکانس', 'Hz')],
    (vars, u) => u === 'E' ? vars.n * vars.h_val * vars.f : u === 'n' ? vars.E / (vars.h_val * vars.f) : u === 'f' ? vars.E / (vars.n * vars.h_val) : vars.E / (vars.n * vars.f)),

  // Additional math formulas
  f('m31', 'Dot Product', 'ضرب داخلی', 'advanced_math', 'linear_algebra', 'a·b = |a||b|cos(θ)',
    [v('dot', 'Dot Product', 'ضرب داخلی', ''), v('a_mag', '|a|', '|a|', ''), v('b_mag', '|b|', '|b|', ''), v('theta', 'Angle', 'زاویه', '°')],
    (vars, u) => u === 'dot' ? vars.a_mag * vars.b_mag * Math.cos(vars.theta * Math.PI / 180) : u === 'theta' ? Math.acos(vars.dot / (vars.a_mag * vars.b_mag)) * 180 / Math.PI : NaN),

  f('m32', 'Cross Product Magnitude', 'اندازه ضرب خارجی', 'advanced_math', 'linear_algebra', '|a×b| = |a||b|sin(θ)',
    [v('cross', 'Cross Product', 'ضرب خارجی', ''), v('a_mag', '|a|', '|a|', ''), v('b_mag', '|b|', '|b|', ''), v('theta', 'Angle', 'زاویه', '°')],
    (vars, u) => u === 'cross' ? vars.a_mag * vars.b_mag * Math.sin(vars.theta * Math.PI / 180) : NaN),

  f('m33', 'Normal Distribution', 'توزیع نرمال', 'math', 'statistics', 'z = (x-μ)/σ',
    [v('z', 'Z-Score', 'نمره Z', ''), v('x', 'Value', 'مقدار', ''), v('mu', 'Mean', 'میانگین', ''), v('sigma', 'Std Dev', 'انحراف معیار', '')],
    (vars, u) => u === 'z' ? (vars.x - vars.mu) / vars.sigma : u === 'x' ? vars.z * vars.sigma + vars.mu : u === 'mu' ? vars.x - vars.z * vars.sigma : (vars.x - vars.mu) / vars.z),

  f('m34', 'Binomial Probability', 'احتمال دوجمله‌ای', 'math', 'statistics', 'P = C(n,k)p^k(1-p)^(n-k)',
    [v('P_prob', 'Probability', 'احتمال', ''), v('n', 'Trials', 'آزمایش', ''), v('k', 'Successes', 'موفقیت', ''), v('p', 'Prob Success', 'احتمال موفقیت', '')],
    (vars, u) => { const fact = (x: number): number => x <= 1 ? 1 : x * fact(x - 1); return u === 'P_prob' ? (fact(vars.n) / (fact(vars.k) * fact(vars.n - vars.k))) * vars.p ** vars.k * (1 - vars.p) ** (vars.n - vars.k) : NaN; }),

  f('m35', 'Poisson Distribution', 'توزیع پوآسون', 'math', 'statistics', 'P(k) = (λ^k × e^-λ)/k!',
    [v('P_prob', 'Probability', 'احتمال', ''), v('lambda_val', 'λ (mean)', 'λ (میانگین)', ''), v('k', 'k (events)', 'k (رویدادها)', '')],
    (vars, u) => { const fact = (x: number): number => x <= 1 ? 1 : x * fact(x - 1); return u === 'P_prob' ? (vars.lambda_val ** vars.k * Math.exp(-vars.lambda_val)) / fact(vars.k) : NaN; }),

  // Even more physics to round out 500+
  f('p81', 'Electric Current', 'جریان الکتریکی', 'physics', 'electromagnetism', 'I = Q/t',
    [v('I', 'Current', 'جریان', 'A'), v('Q', 'Charge', 'بار', 'C'), v('t', 'Time', 'زمان', 's')],
    (vars, u) => u === 'I' ? vars.Q / vars.t : u === 'Q' ? vars.I * vars.t : vars.Q / vars.I),

  f('p82', 'EMF of Cell', 'نیروی محرکه سلول', 'circuits', 'dc_circuits', 'V = EMF - Ir',
    [v('V', 'Terminal Voltage', 'ولتاژ ترمینال', 'V'), v('EMF', 'EMF', 'نیروی محرکه', 'V'), v('I', 'Current', 'جریان', 'A'), v('r', 'Internal R', 'مقاومت داخلی', 'Ω')],
    (vars, u) => u === 'V' ? vars.EMF - vars.I * vars.r : u === 'EMF' ? vars.V + vars.I * vars.r : u === 'I' ? (vars.EMF - vars.V) / vars.r : (vars.EMF - vars.V) / vars.I),

  f('p83', 'Wavelength-Frequency', 'طول موج-فرکانس', 'physics', 'waves', 'c = fλ',
    [v('c_val', 'Speed of Light', 'سرعت نور', 'm/s'), v('f', 'Frequency', 'فرکانس', 'Hz'), v('lambda', 'Wavelength', 'طول موج', 'm')],
    (vars, u) => u === 'c_val' ? vars.f * vars.lambda : u === 'f' ? vars.c_val / vars.lambda : vars.c_val / vars.f),

  f('p84', 'Brewster\'s Angle', 'زاویه برستر', 'physics', 'waves', 'tan(θB) = n₂/n₁',
    [v('thetaB', 'Brewster Angle', 'زاویه برستر', '°'), v('n1', 'Index 1', 'ضریب ۱', ''), v('n2', 'Index 2', 'ضریب ۲', '')],
    (vars, u) => u === 'thetaB' ? Math.atan(vars.n2 / vars.n1) * 180 / Math.PI : u === 'n2' ? vars.n1 * Math.tan(vars.thetaB * Math.PI / 180) : vars.n2 / Math.tan(vars.thetaB * Math.PI / 180)),

  f('p85', 'Critical Angle', 'زاویه بحرانی', 'physics', 'waves', 'sin(θc) = n₂/n₁',
    [v('thetac', 'Critical Angle', 'زاویه بحرانی', '°'), v('n1', 'Index 1', 'ضریب ۱', ''), v('n2', 'Index 2', 'ضریب ۲', '')],
    (vars, u) => u === 'thetac' ? Math.asin(vars.n2 / vars.n1) * 180 / Math.PI : u === 'n2' ? vars.n1 * Math.sin(vars.thetac * Math.PI / 180) : vars.n2 / Math.sin(vars.thetac * Math.PI / 180)),

  // Additional unique formulas
  f('am21', 'Rodrigues Formula', 'فرمول رودریگز', 'advanced_math', 'linear_algebra', 'Trace = λ₁+λ₂',
    [v('trace', 'Trace', 'اثر', ''), v('a', 'a₁₁', 'a₁₁', ''), v('d', 'a₂₂', 'a₂₂', '')],
    (vars, u) => u === 'trace' ? vars.a + vars.d : NaN),

  f('am22', 'Cramer\'s Rule 2x2', 'قاعده کرامر ۲×۲', 'advanced_math', 'linear_algebra', 'x = Dx/D',
    [v('x', 'x', 'x', ''), v('Dx', 'Dx', 'Dx', ''), v('D', 'D (det)', 'D (دترمینان)', '')],
    (vars, u) => u === 'x' ? vars.Dx / vars.D : u === 'Dx' ? vars.x * vars.D : vars.Dx / vars.x),

  f('am23', 'Vector Magnitude 3D', 'اندازه بردار ۳بعدی', 'advanced_math', 'linear_algebra', '|v| = √(x²+y²+z²)',
    [v('mag', 'Magnitude', 'اندازه', ''), v('x', 'x', 'x', ''), v('y', 'y', 'y', ''), v('z', 'z', 'z', '')],
    (vars, u) => u === 'mag' ? Math.sqrt(vars.x ** 2 + vars.y ** 2 + vars.z ** 2) : NaN),

  f('am24', 'Polar to Cartesian x', 'قطبی به دکارتی x', 'advanced_math', 'complex_analysis', 'x = r cos(θ)',
    [v('x', 'x', 'x', ''), v('r', 'r', 'r', ''), v('theta', 'θ', 'θ', '°')],
    (vars, u) => u === 'x' ? vars.r * Math.cos(vars.theta * Math.PI / 180) : u === 'r' ? vars.x / Math.cos(vars.theta * Math.PI / 180) : Math.acos(vars.x / vars.r) * 180 / Math.PI),

  f('am25', 'Polar to Cartesian y', 'قطبی به دکارتی y', 'advanced_math', 'complex_analysis', 'y = r sin(θ)',
    [v('y', 'y', 'y', ''), v('r', 'r', 'r', ''), v('theta', 'θ', 'θ', '°')],
    (vars, u) => u === 'y' ? vars.r * Math.sin(vars.theta * Math.PI / 180) : u === 'r' ? vars.y / Math.sin(vars.theta * Math.PI / 180) : Math.asin(vars.y / vars.r) * 180 / Math.PI),

  // More circuit formulas
  f('ec26', 'Thevenin Voltage', 'ولتاژ تونن', 'circuits', 'dc_circuits', 'Vth = Voc',
    [v('Vth', 'Thevenin V', 'ولتاژ تونن', 'V'), v('Voc', 'Open Circuit V', 'ولتاژ مدار باز', 'V')],
    (vars, u) => u === 'Vth' ? vars.Voc : vars.Vth),

  f('ec27', 'Norton Current', 'جریان نورتن', 'circuits', 'dc_circuits', 'In = Isc',
    [v('In', 'Norton Current', 'جریان نورتن', 'A'), v('Isc', 'Short Circuit I', 'جریان اتصال کوتاه', 'A')],
    (vars, u) => u === 'In' ? vars.Isc : vars.In),

  f('ec28', 'Thevenin-Norton', 'تونن-نورتن', 'circuits', 'dc_circuits', 'Rth = Vth/In',
    [v('Rth', 'Thevenin R', 'مقاومت تونن', 'Ω'), v('Vth', 'Thevenin V', 'ولتاژ تونن', 'V'), v('In', 'Norton I', 'جریان نورتن', 'A')],
    (vars, u) => u === 'Rth' ? vars.Vth / vars.In : u === 'Vth' ? vars.Rth * vars.In : vars.Vth / vars.Rth),

  f('ec29', 'Efficiency', 'بازده', 'circuits', 'power', 'η = Pout/Pin × 100',
    [v('eta', 'Efficiency', 'بازده', '%'), v('Pout', 'Output Power', 'توان خروجی', 'W'), v('Pin', 'Input Power', 'توان ورودی', 'W')],
    (vars, u) => u === 'eta' ? (vars.Pout / vars.Pin) * 100 : u === 'Pout' ? vars.eta * vars.Pin / 100 : vars.Pout * 100 / vars.eta),

  f('ec30', 'Impedance Parallel', 'امپدانس موازی', 'circuits', 'ac_circuits', '1/Zt = 1/Z₁ + 1/Z₂',
    [v('Zt', 'Total Z', 'امپدانس کل', 'Ω'), v('Z1', 'Z₁', 'Z₁', 'Ω'), v('Z2', 'Z₂', 'Z₂', 'Ω')],
    (vars, u) => u === 'Zt' ? 1 / (1 / vars.Z1 + 1 / vars.Z2) : u === 'Z1' ? 1 / (1 / vars.Zt - 1 / vars.Z2) : 1 / (1 / vars.Zt - 1 / vars.Z1)),

  // Differential calculus additions
  f('d1', 'Chain Rule Result', 'نتیجه قاعده زنجیره', 'differential', 'derivatives', 'd/dx f(g(x)) = f\'(g)·g\'(x)',
    [v('result', 'dy/dx', 'dy/dx', ''), v('dfg', "f'(g)", "f'(g)", ''), v('gx', "g'(x)", "g'(x)", '')],
    (vars, u) => u === 'result' ? vars.dfg * vars.gx : u === 'dfg' ? vars.result / vars.gx : vars.result / vars.dfg),

  f('d2', 'Product Rule', 'قاعده ضرب', 'differential', 'derivatives', 'd/dx(fg) = f\'g + fg\'',
    [v('result', "(fg)'", "(fg)'", ''), v('fp', "f'", "f'", ''), v('g_val', 'g', 'g', ''), v('f_val', 'f', 'f', ''), v('gp', "g'", "g'", '')],
    (vars, u) => u === 'result' ? vars.fp * vars.g_val + vars.f_val * vars.gp : NaN),

  f('d3', 'Quotient Rule', 'قاعده تقسیم', 'differential', 'derivatives', 'd/dx(f/g) = (f\'g-fg\')/g²',
    [v('result', "(f/g)'", "(f/g)'", ''), v('fp', "f'", "f'", ''), v('g_val', 'g', 'g', ''), v('f_val', 'f', 'f', ''), v('gp', "g'", "g'", '')],
    (vars, u) => u === 'result' ? (vars.fp * vars.g_val - vars.f_val * vars.gp) / (vars.g_val ** 2) : NaN),

  f('d4', 'Definite Integral', 'انتگرال معین', 'differential', 'integrals', '∫[a,b] f dx = F(b) - F(a)',
    [v('result', 'Integral Value', 'مقدار انتگرال', ''), v('Fb', 'F(b)', 'F(b)', ''), v('Fa', 'F(a)', 'F(a)', '')],
    (vars, u) => u === 'result' ? vars.Fb - vars.Fa : u === 'Fb' ? vars.result + vars.Fa : vars.Fb - vars.result),

  f('d5', 'Volume of Revolution', 'حجم دوران', 'differential', 'applications', 'V = π∫r²dx ≈ πr²h',
    [v('V', 'Volume', 'حجم', ''), v('r', 'Radius', 'شعاع', ''), v('h', 'Height', 'ارتفاع', '')],
    (vars, u) => u === 'V' ? Math.PI * vars.r ** 2 * vars.h : u === 'r' ? Math.sqrt(vars.V / (Math.PI * vars.h)) : vars.V / (Math.PI * vars.r ** 2)),

  f('d6', 'Surface Area of Revolution', 'مساحت سطح دوران', 'differential', 'applications', 'A = 2πrh',
    [v('A', 'Surface Area', 'مساحت سطح', ''), v('r', 'Radius', 'شعاع', ''), v('h', 'Height', 'ارتفاع', '')],
    (vars, u) => u === 'A' ? 2 * Math.PI * vars.r * vars.h : u === 'r' ? vars.A / (2 * Math.PI * vars.h) : vars.A / (2 * Math.PI * vars.r)),

  f('d7', 'L\'Hôpital Concept', 'مفهوم لوپیتال', 'differential', 'applications', 'lim f/g = lim f\'/g\'',
    [v('result', 'Limit', 'حد', ''), v('fp', "f'(a)", "f'(a)", ''), v('gp', "g'(a)", "g'(a)", '')],
    (vars, u) => u === 'result' ? vars.fp / vars.gp : NaN),

  f('d8', 'Taylor 2nd Term', 'جمله دوم تیلور', 'differential', 'applications', 'f(x) ≈ f(a)+f\'(a)(x-a)+f\'\'(a)(x-a)²/2',
    [v('result', 'Approximation', 'تقریب', ''), v('fa', 'f(a)', 'f(a)', ''), v('fpa', "f'(a)", "f'(a)", ''), v('fppa', "f''(a)", "f''(a)", ''), v('dx', 'x-a', 'x-a', '')],
    (vars, u) => u === 'result' ? vars.fa + vars.fpa * vars.dx + vars.fppa * vars.dx ** 2 / 2 : NaN),

  // Additional formulas across categories
  f('p86', 'Intensity', 'شدت', 'physics', 'waves', 'I = P/A',
    [v('I', 'Intensity', 'شدت', 'W/m²'), v('P', 'Power', 'توان', 'W'), v('A', 'Area', 'سطح', 'm²')],
    (vars, u) => u === 'I' ? vars.P / vars.A : u === 'P' ? vars.I * vars.A : vars.P / vars.I),

  f('p87', 'Radiation Pressure', 'فشار تابش', 'physics', 'waves', 'P = I/c',
    [v('P_rad', 'Radiation Pressure', 'فشار تابش', 'Pa'), v('I', 'Intensity', 'شدت', 'W/m²')],
    (vars, u) => { const c = 3e8; return u === 'P_rad' ? vars.I / c : vars.P_rad * c; }),

  f('p88', 'Capacitor Parallel Plate', 'خازن تخت موازی', 'physics', 'electromagnetism', 'E = σ/ε₀',
    [v('E_field', 'Electric Field', 'میدان الکتریکی', 'V/m'), v('sigma_charge', 'Surface Charge', 'چگالی سطحی بار', 'C/m²')],
    (vars, u) => { const e0 = 8.854e-12; return u === 'E_field' ? vars.sigma_charge / e0 : vars.E_field * e0; }),

  f('p89', 'Cyclotron Frequency', 'فرکانس سیکلوترون', 'physics', 'electromagnetism', 'f = qB/(2πm)',
    [v('f', 'Frequency', 'فرکانس', 'Hz'), v('q', 'Charge', 'بار', 'C'), v('B', 'Mag Field', 'میدان مغناطیسی', 'T'), v('m', 'Mass', 'جرم', 'kg')],
    (vars, u) => u === 'f' ? vars.q * vars.B / (2 * Math.PI * vars.m) : u === 'B' ? 2 * Math.PI * vars.m * vars.f / vars.q : u === 'm' ? vars.q * vars.B / (2 * Math.PI * vars.f) : 2 * Math.PI * vars.m * vars.f / vars.B),

  f('p90', 'Hall Voltage', 'ولتاژ هال', 'physics', 'electromagnetism', 'VH = IBd/(nqA)',
    [v('VH', 'Hall Voltage', 'ولتاژ هال', 'V'), v('I', 'Current', 'جریان', 'A'), v('B', 'Mag Field', 'میدان', 'T'), v('d', 'Thickness', 'ضخامت', 'm'), v('n_density', 'Carrier Density', 'چگالی حامل', '1/m³'), v('q', 'Charge', 'بار', 'C')],
    (vars, u) => u === 'VH' ? vars.I * vars.B / (vars.n_density * vars.q * vars.d) : NaN),

  // Extra math/stats/finance
  f('m36', 'Simple Interest', 'بهره ساده', 'math', 'algebra', 'I = Prt',
    [v('I_interest', 'Interest', 'بهره', ''), v('P', 'Principal', 'اصل', ''), v('r', 'Rate', 'نرخ', ''), v('t', 'Time', 'زمان', '')],
    (vars, u) => u === 'I_interest' ? vars.P * vars.r * vars.t : u === 'P' ? vars.I_interest / (vars.r * vars.t) : u === 'r' ? vars.I_interest / (vars.P * vars.t) : vars.I_interest / (vars.P * vars.r)),

  f('m37', 'Present Value', 'ارزش فعلی', 'math', 'algebra', 'PV = FV/(1+r)^n',
    [v('PV', 'Present Value', 'ارزش فعلی', ''), v('FV', 'Future Value', 'ارزش آینده', ''), v('r', 'Rate', 'نرخ', ''), v('n', 'Periods', 'دوره', '')],
    (vars, u) => u === 'PV' ? vars.FV / (1 + vars.r) ** vars.n : u === 'FV' ? vars.PV * (1 + vars.r) ** vars.n : NaN),

  f('m38', 'Conversion °C to °F', 'تبدیل °C به °F', 'math', 'algebra', 'F = (9/5)C + 32',
    [v('F_temp', '°F', '°F', '°F'), v('C_temp', '°C', '°C', '°C')],
    (vars, u) => u === 'F_temp' ? (9 / 5) * vars.C_temp + 32 : (vars.F_temp - 32) * 5 / 9),

  f('m39', 'Conversion °C to K', 'تبدیل °C به K', 'math', 'algebra', 'K = C + 273.15',
    [v('K_temp', 'K', 'K', 'K'), v('C_temp', '°C', '°C', '°C')],
    (vars, u) => u === 'K_temp' ? vars.C_temp + 273.15 : vars.K_temp - 273.15),

  f('m40', 'Heron\'s Formula', 'فرمول هرون', 'math', 'geometry', 'A = √(s(s-a)(s-b)(s-c))',
    [v('A', 'Area', 'مساحت', ''), v('a', 'Side a', 'ضلع a', ''), v('b', 'Side b', 'ضلع b', ''), v('c_val', 'Side c', 'ضلع c', '')],
    (vars, u) => { if (u === 'A') { const s = (vars.a + vars.b + vars.c_val) / 2; return Math.sqrt(s * (s - vars.a) * (s - vars.b) * (s - vars.c_val)); } return NaN; }),

  // ==================== ADDITIONAL PHYSICS (reaching 500+) ====================
  f('p91', 'Gravitational Field', 'میدان گرانشی', 'physics', 'gravity', 'g = GM/r²',
    [v('g', 'Grav Field', 'میدان گرانشی', 'm/s²'), v('M', 'Mass', 'جرم', 'kg'), v('r', 'Distance', 'فاصله', 'm')],
    (vars, u) => { const G = 6.674e-11; return u === 'g' ? G * vars.M / (vars.r ** 2) : u === 'M' ? vars.g * vars.r ** 2 / G : Math.sqrt(G * vars.M / vars.g); }),
  f('p92', 'Electric Energy', 'انرژی الکتریکی', 'physics', 'electromagnetism', 'W = Pt',
    [v('W', 'Energy', 'انرژی', 'J'), v('P', 'Power', 'توان', 'W'), v('t', 'Time', 'زمان', 's')],
    (vars, u) => u === 'W' ? vars.P * vars.t : u === 'P' ? vars.W / vars.t : vars.W / vars.P),
  f('p93', 'Speed of Sound', 'سرعت صوت', 'physics', 'waves', 'v = 331 + 0.6T',
    [v('v', 'Speed', 'سرعت', 'm/s'), v('T', 'Temp (°C)', 'دما (°C)', '°C')],
    (vars, u) => u === 'v' ? 331 + 0.6 * vars.T : (vars.v - 331) / 0.6),
  f('p94', 'Magnetic Moment', 'گشتاور مغناطیسی', 'physics', 'electromagnetism', 'μ = NIA',
    [v('mu', 'Magnetic Moment', 'گشتاور مغناطیسی', 'A·m²'), v('N', 'Turns', 'دور', ''), v('I', 'Current', 'جریان', 'A'), v('A', 'Area', 'سطح', 'm²')],
    (vars, u) => u === 'mu' ? vars.N * vars.I * vars.A : u === 'N' ? vars.mu / (vars.I * vars.A) : u === 'I' ? vars.mu / (vars.N * vars.A) : vars.mu / (vars.N * vars.I)),
  f('p95', 'Displacement (avg v)', 'جابجایی (v میانگین)', 'physics', 'mechanics', 's = (v+v₀)t/2',
    [v('s', 'Displacement', 'جابجایی', 'm'), v('v', 'Final Velocity', 'سرعت نهایی', 'm/s'), v('v0', 'Initial Velocity', 'سرعت اولیه', 'm/s'), v('t', 'Time', 'زمان', 's')],
    (vars, u) => u === 's' ? (vars.v + vars.v0) * vars.t / 2 : u === 't' ? 2 * vars.s / (vars.v + vars.v0) : NaN),
  f('p96', 'Weight', 'وزن', 'physics', 'mechanics', 'W = mg',
    [v('W', 'Weight', 'وزن', 'N'), v('m', 'Mass', 'جرم', 'kg'), v('g', 'Gravity', 'گرانش', 'm/s²')],
    (vars, u) => u === 'W' ? vars.m * vars.g : u === 'm' ? vars.W / vars.g : vars.W / vars.m),
  f('p97', 'Centripetal Accel', 'شتاب مرکزگرا', 'physics', 'mechanics', 'ac = v²/r',
    [v('ac', 'Acceleration', 'شتاب', 'm/s²'), v('v', 'Velocity', 'سرعت', 'm/s'), v('r', 'Radius', 'شعاع', 'm')],
    (vars, u) => u === 'ac' ? vars.v ** 2 / vars.r : u === 'v' ? Math.sqrt(vars.ac * vars.r) : vars.v ** 2 / vars.ac),
  f('p98', 'Period from freq', 'دوره از فرکانس', 'physics', 'waves', 'T = 1/f',
    [v('T', 'Period', 'دوره', 's'), v('f', 'Frequency', 'فرکانس', 'Hz')],
    (vars, u) => u === 'T' ? 1 / vars.f : 1 / vars.T),
  f('p99', 'Intensity inv square', 'شدت عکس مربع', 'physics', 'waves', 'I = P/(4πr²)',
    [v('I', 'Intensity', 'شدت', 'W/m²'), v('P', 'Power', 'توان', 'W'), v('r', 'Distance', 'فاصله', 'm')],
    (vars, u) => u === 'I' ? vars.P / (4 * Math.PI * vars.r ** 2) : u === 'P' ? vars.I * 4 * Math.PI * vars.r ** 2 : Math.sqrt(vars.P / (4 * Math.PI * vars.I))),
  f('p100', 'Capacitors Energy', 'انرژی خازن Q²', 'physics', 'electromagnetism', 'E = Q²/(2C)',
    [v('E', 'Energy', 'انرژی', 'J'), v('Q', 'Charge', 'بار', 'C'), v('C', 'Capacitance', 'ظرفیت', 'F')],
    (vars, u) => u === 'E' ? vars.Q ** 2 / (2 * vars.C) : u === 'Q' ? Math.sqrt(2 * vars.E * vars.C) : vars.Q ** 2 / (2 * vars.E)),

  // More Thermodynamics
  f('p101', 'Internal Energy', 'انرژی داخلی', 'physics', 'thermodynamics', 'ΔU = Q - W',
    [v('dU', 'Internal Energy Change', 'تغییر انرژی داخلی', 'J'), v('Q', 'Heat', 'حرارت', 'J'), v('W', 'Work', 'کار', 'J')],
    (vars, u) => u === 'dU' ? vars.Q - vars.W : u === 'Q' ? vars.dU + vars.W : vars.Q - vars.dU),
  f('p102', 'Adiabatic Process', 'فرآیند بی‌دررو', 'physics', 'thermodynamics', 'PV^γ = const',
    [v('P1', 'P₁', 'P₁', 'Pa'), v('V1', 'V₁', 'V₁', 'm³'), v('P2', 'P₂', 'P₂', 'Pa'), v('V2', 'V₂', 'V₂', 'm³'), v('gamma', 'γ', 'γ', '')],
    (vars, u) => u === 'P2' ? vars.P1 * (vars.V1 / vars.V2) ** vars.gamma : u === 'V2' ? vars.V1 * (vars.P1 / vars.P2) ** (1 / vars.gamma) : NaN),
  f('p103', 'Mean Free Path', 'مسیر آزاد میانگین', 'physics', 'thermodynamics', 'λ = kT/(√2·πd²P)',
    [v('lambda', 'Mean Free Path', 'مسیر آزاد میانگین', 'm'), v('T', 'Temperature', 'دما', 'K'), v('d', 'Diameter', 'قطر', 'm'), v('P', 'Pressure', 'فشار', 'Pa')],
    (vars, u) => { const k = 1.38e-23; return u === 'lambda' ? k * vars.T / (Math.sqrt(2) * Math.PI * vars.d ** 2 * vars.P) : NaN; }),
  f('p104', 'RMS Speed', 'سرعت RMS', 'physics', 'thermodynamics', 'vrms = √(3kT/m)',
    [v('vrms', 'RMS Speed', 'سرعت RMS', 'm/s'), v('T', 'Temperature', 'دما', 'K'), v('m', 'Molecular Mass', 'جرم مولکولی', 'kg')],
    (vars, u) => { const k = 1.38e-23; return u === 'vrms' ? Math.sqrt(3 * k * vars.T / vars.m) : u === 'T' ? vars.vrms ** 2 * vars.m / (3 * k) : 3 * k * vars.T / (vars.vrms ** 2); }),
  f('p105', 'Avg KE of Gas', 'انرژی جنبشی میانگین گاز', 'physics', 'thermodynamics', 'KE = (3/2)kT',
    [v('KE', 'Kinetic Energy', 'انرژی جنبشی', 'J'), v('T', 'Temperature', 'دما', 'K')],
    (vars, u) => { const k = 1.38e-23; return u === 'KE' ? 1.5 * k * vars.T : vars.KE / (1.5 * k); }),

  // More Waves & Optics
  f('p106', 'Thin Film Interference', 'تداخل فیلم نازک', 'physics', 'waves', '2nt = mλ',
    [v('n', 'Refractive Index', 'ضریب شکست', ''), v('t_thick', 'Thickness', 'ضخامت', 'm'), v('m_order', 'Order', 'مرتبه', ''), v('lambda', 'Wavelength', 'طول موج', 'm')],
    (vars, u) => u === 'lambda' ? 2 * vars.n * vars.t_thick / vars.m_order : u === 't_thick' ? vars.m_order * vars.lambda / (2 * vars.n) : u === 'm_order' ? 2 * vars.n * vars.t_thick / vars.lambda : vars.m_order * vars.lambda / (2 * vars.t_thick)),
  f('p107', 'Young Double Slit', 'شکاف دوگانه یانگ', 'physics', 'waves', 'y = mλL/d',
    [v('y', 'Fringe Position', 'موقعیت فرینج', 'm'), v('m_order', 'Order', 'مرتبه', ''), v('lambda', 'Wavelength', 'طول موج', 'm'), v('L', 'Screen Distance', 'فاصله پرده', 'm'), v('d', 'Slit Separation', 'فاصله شکاف', 'm')],
    (vars, u) => u === 'y' ? vars.m_order * vars.lambda * vars.L / vars.d : u === 'lambda' ? vars.y * vars.d / (vars.m_order * vars.L) : u === 'L' ? vars.y * vars.d / (vars.m_order * vars.lambda) : vars.m_order * vars.lambda * vars.L / vars.y),
  f('p108', 'Resolving Power', 'قدرت تفکیک', 'physics', 'waves', 'θ = 1.22λ/D',
    [v('theta', 'Min Angle', 'حداقل زاویه', 'rad'), v('lambda', 'Wavelength', 'طول موج', 'm'), v('D', 'Aperture', 'دهانه', 'm')],
    (vars, u) => u === 'theta' ? 1.22 * vars.lambda / vars.D : u === 'lambda' ? vars.theta * vars.D / 1.22 : 1.22 * vars.lambda / vars.theta),
  f('p109', 'Optical Power', 'توان نوری', 'physics', 'waves', 'P = 1/f',
    [v('P_opt', 'Optical Power', 'توان نوری', 'D'), v('f', 'Focal Length', 'فاصله کانونی', 'm')],
    (vars, u) => u === 'P_opt' ? 1 / vars.f : 1 / vars.P_opt),
  f('p110', 'Malus Law', 'قانون مالوس', 'physics', 'waves', 'I = I₀cos²(θ)',
    [v('I', 'Transmitted I', 'شدت عبوری', 'W/m²'), v('I0', 'Initial I', 'شدت اولیه', 'W/m²'), v('theta', 'Angle', 'زاویه', '°')],
    (vars, u) => u === 'I' ? vars.I0 * Math.cos(vars.theta * Math.PI / 180) ** 2 : u === 'I0' ? vars.I / Math.cos(vars.theta * Math.PI / 180) ** 2 : Math.acos(Math.sqrt(vars.I / vars.I0)) * 180 / Math.PI),

  // Additional Electronics
  f('e26', 'Inductor V', 'ولتاژ سلف', 'electronics', 'basic_electronics', 'V = L(dI/dt)',
    [v('V', 'Voltage', 'ولتاژ', 'V'), v('L', 'Inductance', 'اندوکتانس', 'H'), v('dIdt', 'dI/dt', 'dI/dt', 'A/s')],
    (vars, u) => u === 'V' ? vars.L * vars.dIdt : u === 'L' ? vars.V / vars.dIdt : vars.V / vars.L),
  f('e27', 'Capacitor I', 'جریان خازن', 'electronics', 'basic_electronics', 'I = C(dV/dt)',
    [v('I', 'Current', 'جریان', 'A'), v('C', 'Capacitance', 'ظرفیت', 'F'), v('dVdt', 'dV/dt', 'dV/dt', 'V/s')],
    (vars, u) => u === 'I' ? vars.C * vars.dVdt : u === 'C' ? vars.I / vars.dVdt : vars.I / vars.C),
  f('e28', 'Conductivity', 'هدایت الکتریکی', 'electronics', 'semiconductors', 'σ = nqμ',
    [v('sigma', 'Conductivity', 'هدایت', 'S/m'), v('n_c', 'Carrier Density', 'چگالی حامل', '1/m³'), v('q', 'Charge', 'بار', 'C'), v('mu', 'Mobility', 'تحرک', 'm²/(V·s)')],
    (vars, u) => u === 'sigma' ? vars.n_c * vars.q * vars.mu : u === 'mu' ? vars.sigma / (vars.n_c * vars.q) : NaN),
  f('e29', 'Gain-Bandwidth Product', 'حاصل‌ضرب بهره-پهنای باند', 'electronics', 'amplifiers', 'GBW = Av × BW',
    [v('GBW', 'GBW', 'GBW', 'Hz'), v('Av', 'Gain', 'بهره', ''), v('BW', 'Bandwidth', 'پهنای باند', 'Hz')],
    (vars, u) => u === 'GBW' ? vars.Av * vars.BW : u === 'Av' ? vars.GBW / vars.BW : vars.GBW / vars.Av),
  f('e30', 'CMRR', 'CMRR', 'electronics', 'amplifiers', 'CMRR = 20log(Ad/Ac)',
    [v('CMRR', 'CMRR', 'CMRR', 'dB'), v('Ad', 'Diff Gain', 'بهره تفاضلی', ''), v('Ac', 'Common Gain', 'بهره مشترک', '')],
    (vars, u) => u === 'CMRR' ? 20 * Math.log10(vars.Ad / vars.Ac) : u === 'Ad' ? vars.Ac * 10 ** (vars.CMRR / 20) : vars.Ad / (10 ** (vars.CMRR / 20))),
  f('e31', 'Slew Rate', 'نرخ تغییر', 'electronics', 'amplifiers', 'SR = ΔV/Δt',
    [v('SR', 'Slew Rate', 'نرخ تغییر', 'V/μs'), v('dV', 'Voltage Change', 'تغییر ولتاژ', 'V'), v('dt', 'Time Change', 'تغییر زمان', 'μs')],
    (vars, u) => u === 'SR' ? vars.dV / vars.dt : u === 'dV' ? vars.SR * vars.dt : vars.dV / vars.SR),
  f('e32', 'Butterworth Cutoff', 'فرکانس قطع باترورث', 'electronics', 'filters', 'fc = 1/(2πRC)',
    [v('fc', 'Cutoff Freq', 'فرکانس قطع', 'Hz'), v('R', 'Resistance', 'مقاومت', 'Ω'), v('C', 'Capacitance', 'ظرفیت', 'F')],
    (vars, u) => u === 'fc' ? 1 / (2 * Math.PI * vars.R * vars.C) : u === 'R' ? 1 / (2 * Math.PI * vars.fc * vars.C) : 1 / (2 * Math.PI * vars.fc * vars.R)),
  f('e33', 'Notch Filter', 'فیلتر ناچ', 'electronics', 'filters', 'fn = 1/(2π√(LC))',
    [v('fn', 'Notch Freq', 'فرکانس ناچ', 'Hz'), v('L', 'Inductance', 'اندوکتانس', 'H'), v('C', 'Capacitance', 'ظرفیت', 'F')],
    (vars, u) => u === 'fn' ? 1 / (2 * Math.PI * Math.sqrt(vars.L * vars.C)) : u === 'L' ? 1 / (4 * Math.PI ** 2 * vars.fn ** 2 * vars.C) : 1 / (4 * Math.PI ** 2 * vars.fn ** 2 * vars.L)),
  f('e34', 'Inverting Summing', 'جمع‌کننده معکوس', 'electronics', 'amplifiers', 'Vout = -Rf(V₁/R₁+V₂/R₂)',
    [v('Vout', 'Output V', 'ولتاژ خروجی', 'V'), v('Rf', 'Rf', 'Rf', 'Ω'), v('V1', 'V₁', 'V₁', 'V'), v('R1', 'R₁', 'R₁', 'Ω'), v('V2', 'V₂', 'V₂', 'V'), v('R2', 'R₂', 'R₂', 'Ω')],
    (vars, u) => u === 'Vout' ? -vars.Rf * (vars.V1 / vars.R1 + vars.V2 / vars.R2) : NaN),
  f('e35', 'Diff Amplifier', 'تقویت‌کننده تفاضلی', 'electronics', 'amplifiers', 'Vout = (Rf/R₁)(V₂-V₁)',
    [v('Vout', 'Output V', 'ولتاژ خروجی', 'V'), v('Rf', 'Rf', 'Rf', 'Ω'), v('R1', 'R₁', 'R₁', 'Ω'), v('V1', 'V₁', 'V₁', 'V'), v('V2', 'V₂', 'V₂', 'V')],
    (vars, u) => u === 'Vout' ? (vars.Rf / vars.R1) * (vars.V2 - vars.V1) : NaN),

  // More Circuits
  f('ec31', 'Star-Delta R', 'تبدیل ستاره-مثلث', 'circuits', 'dc_circuits', 'Ra = R₁R₂/(R₁+R₂+R₃)',
    [v('Ra', 'Delta R', 'مقاومت مثلث', 'Ω'), v('R1', 'R₁', 'R₁', 'Ω'), v('R2', 'R₂', 'R₂', 'Ω'), v('R3', 'R₃', 'R₃', 'Ω')],
    (vars, u) => u === 'Ra' ? vars.R1 * vars.R2 / (vars.R1 + vars.R2 + vars.R3) : NaN),
  f('ec32', 'Superposition', 'جمع آثار', 'circuits', 'dc_circuits', 'V = V₁ + V₂ + V₃',
    [v('V', 'Total V', 'ولتاژ کل', 'V'), v('V1', 'V₁', 'V₁', 'V'), v('V2', 'V₂', 'V₂', 'V'), v('V3', 'V₃', 'V₃', 'V')],
    (vars, u) => u === 'V' ? vars.V1 + vars.V2 + vars.V3 : NaN),
  f('ec33', 'Node Voltage', 'ولتاژ گره', 'circuits', 'dc_circuits', 'I = (Va-Vb)/R',
    [v('I', 'Current', 'جریان', 'A'), v('Va', 'Node A', 'گره A', 'V'), v('Vb', 'Node B', 'گره B', 'V'), v('R', 'Resistance', 'مقاومت', 'Ω')],
    (vars, u) => u === 'I' ? (vars.Va - vars.Vb) / vars.R : u === 'Va' ? vars.I * vars.R + vars.Vb : u === 'Vb' ? vars.Va - vars.I * vars.R : (vars.Va - vars.Vb) / vars.I),
  f('ec34', 'Admittance', 'ادمیتانس', 'circuits', 'ac_circuits', 'Y = 1/Z',
    [v('Y', 'Admittance', 'ادمیتانس', 'S'), v('Z', 'Impedance', 'امپدانس', 'Ω')],
    (vars, u) => u === 'Y' ? 1 / vars.Z : 1 / vars.Y),
  f('ec35', 'Susceptance', 'سوسپتانس', 'circuits', 'ac_circuits', 'B = 1/X',
    [v('B', 'Susceptance', 'سوسپتانس', 'S'), v('X', 'Reactance', 'راکتانس', 'Ω')],
    (vars, u) => u === 'B' ? 1 / vars.X : 1 / vars.B),

  // More Signals
  f('s17', 'Bandwidth Efficiency', 'بازده پهنای باند', 'signals', 'frequency', 'η = Rb/BW',
    [v('eta', 'Spectral Eff', 'بازده طیفی', 'bps/Hz'), v('Rb', 'Bit Rate', 'نرخ بیت', 'bps'), v('BW', 'Bandwidth', 'پهنای باند', 'Hz')],
    (vars, u) => u === 'eta' ? vars.Rb / vars.BW : u === 'Rb' ? vars.eta * vars.BW : vars.Rb / vars.eta),
  f('s18', 'Bit Error Rate', 'نرخ خطای بیت', 'signals', 'discrete', 'BER = errors/total',
    [v('BER', 'BER', 'BER', ''), v('errors', 'Errors', 'خطاها', ''), v('total', 'Total Bits', 'کل بیت‌ها', '')],
    (vars, u) => u === 'BER' ? vars.errors / vars.total : u === 'errors' ? vars.BER * vars.total : vars.errors / vars.BER),
  f('s19', 'Noise Power', 'توان نویز', 'signals', 'frequency', 'N = kTB',
    [v('N', 'Noise Power', 'توان نویز', 'W'), v('T', 'Temperature', 'دما', 'K'), v('B', 'Bandwidth', 'پهنای باند', 'Hz')],
    (vars, u) => { const k = 1.38e-23; return u === 'N' ? k * vars.T * vars.B : u === 'T' ? vars.N / (k * vars.B) : vars.N / (k * vars.T); }),
  f('s20', 'Link Budget', 'بودجه لینک', 'signals', 'frequency', 'Pr = Pt + Gt + Gr - L',
    [v('Pr', 'Received Power', 'توان دریافتی', 'dBm'), v('Pt', 'Transmit Power', 'توان ارسالی', 'dBm'), v('Gt', 'Tx Gain', 'بهره ارسال', 'dB'), v('Gr', 'Rx Gain', 'بهره دریافت', 'dB'), v('L', 'Path Loss', 'اتلاف مسیر', 'dB')],
    (vars, u) => u === 'Pr' ? vars.Pt + vars.Gt + vars.Gr - vars.L : u === 'L' ? vars.Pt + vars.Gt + vars.Gr - vars.Pr : NaN),
  f('s21', 'Free Space Loss', 'اتلاف فضای آزاد', 'signals', 'frequency', 'FSPL = 20log(4πdf/c)',
    [v('FSPL', 'Free Space Loss', 'اتلاف فضای آزاد', 'dB'), v('d', 'Distance', 'فاصله', 'm'), v('f', 'Frequency', 'فرکانس', 'Hz')],
    (vars, u) => { const c = 3e8; return u === 'FSPL' ? 20 * Math.log10(4 * Math.PI * vars.d * vars.f / c) : NaN; }),

  // More Digital Control
  f('dc21', 'Delay Time', 'زمان تأخیر', 'digital_control', 'control_basics', 'td = (1+0.7ζ)/ωn',
    [v('td', 'Delay Time', 'زمان تأخیر', 's'), v('zeta', 'Damping', 'میرایی', ''), v('wn', 'Natural Freq', 'فرکانس طبیعی', 'rad/s')],
    (vars, u) => u === 'td' ? (1 + 0.7 * vars.zeta) / vars.wn : NaN),
  f('dc22', 'Bandwidth (control)', 'پهنای باند (کنترل)', 'digital_control', 'control_basics', 'ωBW = ωn√(1-2ζ²+√(4ζ⁴-4ζ²+2))',
    [v('wBW', 'Bandwidth', 'پهنای باند', 'rad/s'), v('wn', 'Natural Freq', 'فرکانس طبیعی', 'rad/s'), v('zeta', 'Damping', 'میرایی', '')],
    (vars, u) => u === 'wBW' ? vars.wn * Math.sqrt(1 - 2 * vars.zeta ** 2 + Math.sqrt(4 * vars.zeta ** 4 - 4 * vars.zeta ** 2 + 2)) : NaN),
  f('dc23', 'Type 0 error', 'خطای نوع ۰', 'digital_control', 'stability', 'ess = 1/(1+Kp)',
    [v('ess', 'Error', 'خطا', ''), v('Kp', 'Position Const', 'ثابت موقعیت', '')],
    (vars, u) => u === 'ess' ? 1 / (1 + vars.Kp) : 1 / vars.ess - 1),
  f('dc24', 'Type 1 ramp error', 'خطای رمپ نوع ۱', 'digital_control', 'stability', 'ess = 1/Kv',
    [v('ess', 'Error', 'خطا', ''), v('Kv', 'Velocity Const', 'ثابت سرعت', '')],
    (vars, u) => u === 'ess' ? 1 / vars.Kv : 1 / vars.ess),
  f('dc25', 'Lead Compensator', 'جبران‌ساز پیش‌فاز', 'digital_control', 'pid', 'φmax = asin((α-1)/(α+1))',
    [v('phi_max', 'Max Phase', 'حداکثر فاز', '°'), v('alpha', 'α', 'α', '')],
    (vars, u) => u === 'phi_max' ? Math.asin((vars.alpha - 1) / (vars.alpha + 1)) * 180 / Math.PI : NaN),

  // More Chemistry
  f('c31', 'Solubility Product', 'حاصل‌ضرب حلالیت', 'chemistry', 'general_chem', 'Ksp = [A⁺]ᵃ[B⁻]ᵇ',
    [v('Ksp', 'Ksp', 'Ksp', ''), v('A_conc', '[A⁺]', '[A⁺]', 'mol/L'), v('B_conc', '[B⁻]', '[B⁻]', 'mol/L')],
    (vars, u) => u === 'Ksp' ? vars.A_conc * vars.B_conc : u === 'A_conc' ? vars.Ksp / vars.B_conc : vars.Ksp / vars.A_conc),
  f('c32', 'Buffer Capacity', 'ظرفیت بافر', 'chemistry', 'solutions', 'β = ΔCb/ΔpH',
    [v('beta', 'Buffer Capacity', 'ظرفیت بافر', 'mol/L'), v('dCb', 'Base Added', 'باز اضافه شده', 'mol/L'), v('dpH', 'pH Change', 'تغییر pH', '')],
    (vars, u) => u === 'beta' ? vars.dCb / vars.dpH : u === 'dCb' ? vars.beta * vars.dpH : vars.dCb / vars.beta),
  f('c33', 'Ionic Strength', 'قدرت یونی', 'chemistry', 'solutions', 'I = ½Σ(ciZi²)',
    [v('I_ionic', 'Ionic Strength', 'قدرت یونی', 'mol/L'), v('c1', 'Conc 1', 'غلظت ۱', 'mol/L'), v('z1', 'Charge 1', 'بار ۱', ''), v('c2', 'Conc 2', 'غلظت ۲', 'mol/L'), v('z2', 'Charge 2', 'بار ۲', '')],
    (vars, u) => u === 'I_ionic' ? 0.5 * (vars.c1 * vars.z1 ** 2 + vars.c2 * vars.z2 ** 2) : NaN),
  f('c34', 'Gibbs Phase Rule', 'قانون فاز گیبس', 'chemistry', 'thermochem', 'F = C - P + 2',
    [v('F', 'Degrees of Freedom', 'درجه آزادی', ''), v('C_comp', 'Components', 'اجزا', ''), v('P_phase', 'Phases', 'فازها', '')],
    (vars, u) => u === 'F' ? vars.C_comp - vars.P_phase + 2 : u === 'C_comp' ? vars.F + vars.P_phase - 2 : vars.C_comp - vars.F + 2),
  f('c35', 'Reaction Quotient', 'ضریب واکنش', 'chemistry', 'general_chem', 'Q = [C]c[D]d/([A]a[B]b)',
    [v('Q', 'Reaction Quotient', 'ضریب واکنش', ''), v('products', 'Products', 'محصولات', ''), v('reactants', 'Reactants', 'واکنشگرها', '')],
    (vars, u) => u === 'Q' ? vars.products / vars.reactants : u === 'products' ? vars.Q * vars.reactants : vars.products / vars.Q),
  f('c36', 'Ka Expression', 'عبارت Ka', 'chemistry', 'solutions', 'Ka = [H⁺][A⁻]/[HA]',
    [v('Ka', 'Ka', 'Ka', ''), v('H_conc', '[H⁺]', '[H⁺]', 'mol/L'), v('A_conc', '[A⁻]', '[A⁻]', 'mol/L'), v('HA_conc', '[HA]', '[HA]', 'mol/L')],
    (vars, u) => u === 'Ka' ? vars.H_conc * vars.A_conc / vars.HA_conc : u === 'H_conc' ? vars.Ka * vars.HA_conc / vars.A_conc : NaN),
  f('c37', 'Kb Expression', 'عبارت Kb', 'chemistry', 'solutions', 'Kb = Kw/Ka',
    [v('Kb', 'Kb', 'Kb', ''), v('Kw', 'Kw', 'Kw', ''), v('Ka', 'Ka', 'Ka', '')],
    (vars, u) => u === 'Kb' ? vars.Kw / vars.Ka : u === 'Kw' ? vars.Kb * vars.Ka : vars.Kw / vars.Kb),
  f('c38', 'Density-Mass-Volume', 'چگالی-جرم-حجم', 'chemistry', 'general_chem', 'd = m/V',
    [v('d', 'Density', 'چگالی', 'g/mL'), v('m', 'Mass', 'جرم', 'g'), v('V', 'Volume', 'حجم', 'mL')],
    (vars, u) => u === 'd' ? vars.m / vars.V : u === 'm' ? vars.d * vars.V : vars.m / vars.d),
  f('c39', 'Normality', 'نرمالیته', 'chemistry', 'solutions', 'N = n_eq/V',
    [v('N_norm', 'Normality', 'نرمالیته', 'eq/L'), v('n_eq', 'Equivalents', 'معادل‌ها', 'eq'), v('V', 'Volume', 'حجم', 'L')],
    (vars, u) => u === 'N_norm' ? vars.n_eq / vars.V : u === 'n_eq' ? vars.N_norm * vars.V : vars.n_eq / vars.N_norm),
  f('c40', 'Dalton Partial P', 'فشار جزئی دالتون', 'chemistry', 'general_chem', 'Pt = P₁ + P₂ + P₃',
    [v('Pt', 'Total Pressure', 'فشار کل', 'atm'), v('P1', 'P₁', 'P₁', 'atm'), v('P2', 'P₂', 'P₂', 'atm'), v('P3', 'P₃', 'P₃', 'atm')],
    (vars, u) => u === 'Pt' ? vars.P1 + vars.P2 + vars.P3 : u === 'P1' ? vars.Pt - vars.P2 - vars.P3 : u === 'P2' ? vars.Pt - vars.P1 - vars.P3 : vars.Pt - vars.P1 - vars.P2),

  // More Biology
  f('b16', 'Q10 Temperature', 'Q10 دما', 'biology', 'biochemistry', 'Q10 = (R₂/R₁)^(10/(T₂-T₁))',
    [v('Q10', 'Q10', 'Q10', ''), v('R2', 'Rate 2', 'نرخ ۲', ''), v('R1', 'Rate 1', 'نرخ ۱', ''), v('T2', 'Temp 2', 'دمای ۲', '°C'), v('T1', 'Temp 1', 'دمای ۱', '°C')],
    (vars, u) => u === 'Q10' ? (vars.R2 / vars.R1) ** (10 / (vars.T2 - vars.T1)) : NaN),
  f('b17', 'Lineweaver-Burk', 'لاین‌ویور-برک', 'biology', 'biochemistry', '1/v = (Km/Vmax)(1/[S]) + 1/Vmax',
    [v('inv_v', '1/v', '1/v', ''), v('Km', 'Km', 'Km', ''), v('Vmax', 'Vmax', 'Vmax', ''), v('inv_S', '1/[S]', '1/[S]', '')],
    (vars, u) => u === 'inv_v' ? (vars.Km / vars.Vmax) * vars.inv_S + 1 / vars.Vmax : NaN),
  f('b18', 'Chi-Square', 'کای-دو', 'biology', 'genetics', 'χ² = Σ(O-E)²/E',
    [v('chi2', 'χ²', 'χ²', ''), v('O', 'Observed', 'مشاهده', ''), v('E', 'Expected', 'انتظاری', '')],
    (vars, u) => u === 'chi2' ? (vars.O - vars.E) ** 2 / vars.E : NaN),
  f('b19', 'Species Richness', 'غنای گونه‌ای', 'biology', 'ecology', 'D = (S-1)/ln(N)',
    [v('D', 'Margalef Index', 'شاخص مارگالف', ''), v('S', 'Species Count', 'تعداد گونه', ''), v('N', 'Total Individuals', 'کل افراد', '')],
    (vars, u) => u === 'D' ? (vars.S - 1) / Math.log(vars.N) : NaN),
  f('b20', 'Growth Rate', 'نرخ رشد', 'biology', 'ecology', 'r = (ln N₂ - ln N₁)/t',
    [v('r', 'Growth Rate', 'نرخ رشد', ''), v('N2', 'Final Pop', 'جمعیت نهایی', ''), v('N1', 'Initial Pop', 'جمعیت اولیه', ''), v('t', 'Time', 'زمان', '')],
    (vars, u) => u === 'r' ? (Math.log(vars.N2) - Math.log(vars.N1)) / vars.t : u === 't' ? (Math.log(vars.N2) - Math.log(vars.N1)) / vars.r : NaN),

  // More Advanced Math
  f('am26', 'Partial Derivative', 'مشتق جزئی', 'advanced_math', 'calculus', '∂z/∂x at point',
    [v('dzdx', '∂z/∂x', '∂z/∂x', ''), v('dz', 'Δz', 'Δz', ''), v('dx', 'Δx', 'Δx', '')],
    (vars, u) => u === 'dzdx' ? vars.dz / vars.dx : u === 'dz' ? vars.dzdx * vars.dx : vars.dz / vars.dzdx),
  f('am27', 'Gradient Vector', 'بردار گرادیان', 'advanced_math', 'calculus', '|∇f| = √(fx²+fy²)',
    [v('grad_mag', '|∇f|', '|∇f|', ''), v('fx', '∂f/∂x', '∂f/∂x', ''), v('fy', '∂f/∂y', '∂f/∂y', '')],
    (vars, u) => u === 'grad_mag' ? Math.sqrt(vars.fx ** 2 + vars.fy ** 2) : NaN),
  f('am28', 'Divergence 2D', 'واگرایی ۲بعدی', 'advanced_math', 'calculus', '∇·F = ∂P/∂x + ∂Q/∂y',
    [v('div', '∇·F', '∇·F', ''), v('dPdx', '∂P/∂x', '∂P/∂x', ''), v('dQdy', '∂Q/∂y', '∂Q/∂y', '')],
    (vars, u) => u === 'div' ? vars.dPdx + vars.dQdy : NaN),
  f('am29', 'Curl Magnitude', 'اندازه تاو', 'advanced_math', 'calculus', '|∇×F| = |∂Q/∂x - ∂P/∂y|',
    [v('curl', '|∇×F|', '|∇×F|', ''), v('dQdx', '∂Q/∂x', '∂Q/∂x', ''), v('dPdy', '∂P/∂y', '∂P/∂y', '')],
    (vars, u) => u === 'curl' ? Math.abs(vars.dQdx - vars.dPdy) : NaN),
  f('am30', 'Laplacian', 'لاپلاسین', 'advanced_math', 'calculus', '∇²f = ∂²f/∂x² + ∂²f/∂y²',
    [v('lap', '∇²f', '∇²f', ''), v('d2fdx2', '∂²f/∂x²', '∂²f/∂x²', ''), v('d2fdy2', '∂²f/∂y²', '∂²f/∂y²', '')],
    (vars, u) => u === 'lap' ? vars.d2fdx2 + vars.d2fdy2 : NaN),

  // Numerical Methods extras
  f('am31', 'Error Analysis', 'تحلیل خطا', 'eng_math', 'numerical', 'ε = |exact - approx|/|exact|',
    [v('epsilon', 'Relative Error', 'خطای نسبی', ''), v('exact', 'Exact Value', 'مقدار دقیق', ''), v('approx', 'Approximate', 'مقدار تقریبی', '')],
    (vars, u) => u === 'epsilon' ? Math.abs(vars.exact - vars.approx) / Math.abs(vars.exact) : NaN),
  f('am32', 'Fixed Point', 'نقطه ثابت', 'eng_math', 'numerical', 'xn+1 = g(xn)',
    [v('x_next', 'x(n+1)', 'x(n+1)', ''), v('g_val', 'g(xn)', 'g(xn)', '')],
    (vars, u) => u === 'x_next' ? vars.g_val : NaN),
  f('am33', 'Gauss Elimination', 'حذف گاوس', 'eng_math', 'numerical', 'Ax = b → x = A⁻¹b',
    [v('x', 'Solution', 'جواب', ''), v('b_val', 'b', 'b', ''), v('a_val', 'a', 'a', '')],
    (vars, u) => u === 'x' ? vars.b_val / vars.a_val : u === 'b_val' ? vars.x * vars.a_val : vars.b_val / vars.x),

  // More Differential
  f('d9', 'Implicit Diff', 'مشتق ضمنی', 'differential', 'derivatives', 'dy/dx = -Fx/Fy',
    [v('dydx', 'dy/dx', 'dy/dx', ''), v('Fx', 'Fx', 'Fx', ''), v('Fy', 'Fy', 'Fy', '')],
    (vars, u) => u === 'dydx' ? -vars.Fx / vars.Fy : u === 'Fx' ? -vars.dydx * vars.Fy : -vars.Fx / vars.dydx),
  f('d10', 'Related Rates', 'نرخ‌های وابسته', 'differential', 'applications', 'dA/dt = 2πr(dr/dt)',
    [v('dAdt', 'dA/dt', 'dA/dt', ''), v('r', 'Radius', 'شعاع', ''), v('drdt', 'dr/dt', 'dr/dt', '')],
    (vars, u) => u === 'dAdt' ? 2 * Math.PI * vars.r * vars.drdt : u === 'drdt' ? vars.dAdt / (2 * Math.PI * vars.r) : vars.dAdt / (2 * Math.PI * vars.drdt)),

  // More Quantum
  f('q21', 'Spin Magnetic Moment', 'گشتاور مغناطیسی اسپین', 'quantum', 'atomic', 'μs = g×μB×√(s(s+1))',
    [v('mu_s', 'Spin Moment', 'گشتاور اسپین', 'J/T'), v('g', 'g-factor', 'ضریب g', ''), v('s', 'Spin', 'اسپین', '')],
    (vars, u) => { const muB = 9.274e-24; return u === 'mu_s' ? vars.g * muB * Math.sqrt(vars.s * (vars.s + 1)) : NaN; }),
  f('q22', 'Zeeman Splitting', 'شکافتگی زیمان', 'quantum', 'atomic', 'ΔE = gμBB',
    [v('dE', 'Energy Split', 'شکافتگی انرژی', 'J'), v('g', 'g-factor', 'ضریب g', ''), v('B', 'Mag Field', 'میدان', 'T')],
    (vars, u) => { const muB = 9.274e-24; return u === 'dE' ? vars.g * muB * vars.B : u === 'B' ? vars.dE / (vars.g * muB) : vars.dE / (muB * vars.B); }),
  f('q23', 'Tunneling Probability', 'احتمال تونل‌زنی', 'quantum', 'quantum_basics', 'T ≈ e^(-2κL)',
    [v('T_prob', 'Transmission', 'عبور', ''), v('kappa', 'κ', 'κ', '1/m'), v('L', 'Width', 'عرض', 'm')],
    (vars, u) => u === 'T_prob' ? Math.exp(-2 * vars.kappa * vars.L) : u === 'kappa' ? -Math.log(vars.T_prob) / (2 * vars.L) : -Math.log(vars.T_prob) / (2 * vars.kappa)),
  f('q24', 'Particle in Box', 'ذره در جعبه', 'quantum', 'quantum_basics', 'En = n²h²/(8mL²)',
    [v('En', 'Energy', 'انرژی', 'J'), v('n', 'Quantum Number', 'عدد کوانتومی', ''), v('m', 'Mass', 'جرم', 'kg'), v('L', 'Box Length', 'طول جعبه', 'm')],
    (vars, u) => { const h = 6.626e-34; return u === 'En' ? vars.n ** 2 * h ** 2 / (8 * vars.m * vars.L ** 2) : u === 'n' ? Math.sqrt(8 * vars.En * vars.m * vars.L ** 2 / (h ** 2)) : NaN; }),
  f('q25', 'Uncertainty Energy-Time', 'عدم قطعیت انرژی-زمان', 'quantum', 'quantum_basics', 'ΔEΔt ≥ ℏ/2',
    [v('dE', 'Energy Uncertainty', 'عدم قطعیت انرژی', 'J'), v('dt', 'Time Uncertainty', 'عدم قطعیت زمان', 's')],
    (vars, u) => { const hbar = 1.055e-34; return u === 'dE' ? hbar / (2 * vars.dt) : hbar / (2 * vars.dE); }),
  f('q26', 'Nuclear Radius', 'شعاع هسته', 'quantum', 'nuclear', 'R = R₀A^(1/3)',
    [v('R', 'Nuclear Radius', 'شعاع هسته', 'm'), v('R0', 'R₀', 'R₀', 'm'), v('A', 'Mass Number', 'عدد جرمی', '')],
    (vars, u) => u === 'R' ? vars.R0 * vars.A ** (1 / 3) : u === 'R0' ? vars.R / (vars.A ** (1 / 3)) : (vars.R / vars.R0) ** 3),
  f('q27', 'Activity', 'فعالیت رادیواکتیو', 'quantum', 'nuclear', 'A = λN',
    [v('A_act', 'Activity', 'فعالیت', 'Bq'), v('lambda_d', 'Decay Const', 'ثابت واپاشی', '1/s'), v('N', 'Atoms', 'اتم‌ها', '')],
    (vars, u) => u === 'A_act' ? vars.lambda_d * vars.N : u === 'lambda_d' ? vars.A_act / vars.N : vars.A_act / vars.lambda_d),
  f('q28', 'Relativistic Momentum', 'تکانه نسبیتی', 'quantum', 'relativity', 'p = γmv',
    [v('p', 'Momentum', 'تکانه', 'kg·m/s'), v('m', 'Mass', 'جرم', 'kg'), v('v', 'Velocity', 'سرعت', 'm/s')],
    (vars, u) => { const c = 3e8; const g = 1 / Math.sqrt(1 - (vars.v / c) ** 2); return u === 'p' ? g * vars.m * vars.v : u === 'm' ? vars.p / (g * vars.v) : NaN; }),
  f('q29', 'Gravitational Redshift', 'انتقال به سرخ گرانشی', 'quantum', 'relativity', 'Δf/f = gh/c²',
    [v('dfof', 'Δf/f', 'Δf/f', ''), v('g', 'Gravity', 'گرانش', 'm/s²'), v('h_height', 'Height', 'ارتفاع', 'm')],
    (vars, u) => { const c = 3e8; return u === 'dfof' ? vars.g * vars.h_height / (c ** 2) : u === 'h_height' ? vars.dfof * c ** 2 / vars.g : vars.dfof * c ** 2 / vars.h_height; }),
  f('q30', 'Pair Production', 'تولید زوج', 'quantum', 'nuclear', 'E ≥ 2mec²',
    [v('E_min', 'Min Energy', 'حداقل انرژی', 'J'), v('me', 'Electron Mass', 'جرم الکترون', 'kg')],
    (vars, u) => { const c = 3e8; return u === 'E_min' ? 2 * vars.me * c ** 2 : vars.E_min / (2 * c ** 2); }),

  // Extra general formulas  
  f('gen1', 'Velocity of Light', 'سرعت نور', 'physics', 'waves', 'c = 1/√(μ₀ε₀)',
    [v('c_val', 'Speed of Light', 'سرعت نور', 'm/s')],
    (_vars, u) => u === 'c_val' ? 299792458 : NaN),
  f('gen2', 'Impedance of Free Space', 'امپدانس فضای آزاد', 'physics', 'electromagnetism', 'Z₀ = √(μ₀/ε₀)',
    [v('Z0', 'Free Space Z', 'امپدانس فضای آزاد', 'Ω')],
    (_vars, u) => u === 'Z0' ? 376.73 : NaN),
  f('gen3', 'Skin Depth', 'عمق نفوذ', 'circuits', 'ac_circuits', 'δ = √(2ρ/(ωμ))',
    [v('delta', 'Skin Depth', 'عمق نفوذ', 'm'), v('rho', 'Resistivity', 'مقاومت ویژه', 'Ω·m'), v('omega', 'Frequency', 'فرکانس', 'rad/s'), v('mu_r', 'Permeability', 'نفوذپذیری', 'H/m')],
    (vars, u) => u === 'delta' ? Math.sqrt(2 * vars.rho / (vars.omega * vars.mu_r)) : NaN),
  f('gen4', 'Antenna Gain', 'بهره آنتن', 'signals', 'frequency', 'G = 4πAe/λ²',
    [v('G', 'Gain', 'بهره', ''), v('Ae', 'Effective Area', 'سطح مؤثر', 'm²'), v('lambda', 'Wavelength', 'طول موج', 'm')],
    (vars, u) => u === 'G' ? 4 * Math.PI * vars.Ae / (vars.lambda ** 2) : u === 'Ae' ? vars.G * vars.lambda ** 2 / (4 * Math.PI) : Math.sqrt(4 * Math.PI * vars.Ae / vars.G)),
  f('gen5', 'Decibel Power', 'توان دسی‌بل', 'signals', 'frequency', 'dBm = 10log(P/1mW)',
    [v('dBm', 'Power (dBm)', 'توان (dBm)', 'dBm'), v('P', 'Power', 'توان', 'mW')],
    (vars, u) => u === 'dBm' ? 10 * Math.log10(vars.P) : 10 ** (vars.dBm / 10)),
  f('gen6', 'Wavelength in Medium', 'طول موج در محیط', 'physics', 'waves', 'λ = λ₀/n',
    [v('lambda', 'Wavelength', 'طول موج', 'm'), v('lambda0', 'Free Space λ', 'طول موج فضای آزاد', 'm'), v('n', 'Refractive Index', 'ضریب شکست', '')],
    (vars, u) => u === 'lambda' ? vars.lambda0 / vars.n : u === 'lambda0' ? vars.lambda * vars.n : vars.lambda0 / vars.lambda),
  f('gen7', 'Poynting Vector', 'بردار پوینتینگ', 'physics', 'electromagnetism', 'S = E×B/μ₀',
    [v('S', 'Intensity', 'شدت', 'W/m²'), v('E_field', 'E-field', 'میدان E', 'V/m'), v('B', 'B-field', 'میدان B', 'T')],
    (vars, u) => { const mu0 = 4 * Math.PI * 1e-7; return u === 'S' ? vars.E_field * vars.B / mu0 : u === 'E_field' ? vars.S * mu0 / vars.B : vars.S * mu0 / vars.E_field; }),
  f('gen8', 'Displacement Current', 'جریان جابجایی', 'physics', 'electromagnetism', 'Id = ε₀(dΦE/dt)',
    [v('Id', 'Displacement I', 'جریان جابجایی', 'A'), v('dPhiEdt', 'dΦE/dt', 'dΦE/dt', 'V·m/s')],
    (vars, u) => { const e0 = 8.854e-12; return u === 'Id' ? e0 * vars.dPhiEdt : vars.Id / e0; }),
  f('gen9', 'LC Oscillation', 'نوسان LC', 'circuits', 'rlc', 'ω = 1/√(LC)',
    [v('omega', 'Angular Freq', 'فرکانس زاویه‌ای', 'rad/s'), v('L', 'Inductance', 'اندوکتانس', 'H'), v('C', 'Capacitance', 'ظرفیت', 'F')],
    (vars, u) => u === 'omega' ? 1 / Math.sqrt(vars.L * vars.C) : u === 'L' ? 1 / (vars.omega ** 2 * vars.C) : 1 / (vars.omega ** 2 * vars.L)),
  f('gen10', 'Electromagnetic Wave', 'موج الکترومغناطیسی', 'physics', 'electromagnetism', 'c = E/B',
    [v('c_val', 'Speed', 'سرعت', 'm/s'), v('E_field', 'E-field', 'میدان E', 'V/m'), v('B', 'B-field', 'میدان B', 'T')],
    (vars, u) => u === 'c_val' ? vars.E_field / vars.B : u === 'E_field' ? vars.c_val * vars.B : vars.E_field / vars.c_val),

  // Extra Math formulas
  f('m41', 'Midpoint Formula', 'فرمول نقطه وسط', 'math', 'geometry', 'M = ((x₁+x₂)/2, (y₁+y₂)/2)',
    [v('Mx', 'Midpoint x', 'نقطه وسط x', ''), v('x1', 'x₁', 'x₁', ''), v('x2', 'x₂', 'x₂', '')],
    (vars, u) => u === 'Mx' ? (vars.x1 + vars.x2) / 2 : NaN),
  f('m42', 'Slope', 'شیب', 'math', 'algebra', 'm = (y₂-y₁)/(x₂-x₁)',
    [v('m_slope', 'Slope', 'شیب', ''), v('y2', 'y₂', 'y₂', ''), v('y1', 'y₁', 'y₁', ''), v('x2', 'x₂', 'x₂', ''), v('x1', 'x₁', 'x₁', '')],
    (vars, u) => u === 'm_slope' ? (vars.y2 - vars.y1) / (vars.x2 - vars.x1) : NaN),
  f('m43', 'Point-Slope Form', 'فرم نقطه-شیب', 'math', 'algebra', 'y = m(x-x₁)+y₁',
    [v('y', 'y', 'y', ''), v('m_slope', 'Slope', 'شیب', ''), v('x', 'x', 'x', ''), v('x1', 'x₁', 'x₁', ''), v('y1', 'y₁', 'y₁', '')],
    (vars, u) => u === 'y' ? vars.m_slope * (vars.x - vars.x1) + vars.y1 : NaN),
  f('m44', 'Sigma Notation', 'نماد سیگما', 'math', 'sequences', 'Σi = n(n+1)/2',
    [v('S', 'Sum', 'مجموع', ''), v('n', 'n', 'n', '')],
    (vars, u) => u === 'S' ? vars.n * (vars.n + 1) / 2 : (-1 + Math.sqrt(1 + 8 * vars.S)) / 2),
  f('m45', 'Sum of Squares', 'مجموع مربعات', 'math', 'sequences', 'Σi² = n(n+1)(2n+1)/6',
    [v('S', 'Sum', 'مجموع', ''), v('n', 'n', 'n', '')],
    (vars, u) => u === 'S' ? vars.n * (vars.n + 1) * (2 * vars.n + 1) / 6 : NaN),
  f('m46', 'Sum of Cubes', 'مجموع مکعبات', 'math', 'sequences', 'Σi³ = [n(n+1)/2]²',
    [v('S', 'Sum', 'مجموع', ''), v('n', 'n', 'n', '')],
    (vars, u) => u === 'S' ? (vars.n * (vars.n + 1) / 2) ** 2 : NaN),
  f('m47', 'Degree to Radian', 'درجه به رادیان', 'math', 'trigonometry', 'rad = deg × π/180',
    [v('rad', 'Radians', 'رادیان', 'rad'), v('deg', 'Degrees', 'درجه', '°')],
    (vars, u) => u === 'rad' ? vars.deg * Math.PI / 180 : vars.rad * 180 / Math.PI),
  f('m48', 'Radian to Degree', 'رادیان به درجه', 'math', 'trigonometry', 'deg = rad × 180/π',
    [v('deg', 'Degrees', 'درجه', '°'), v('rad', 'Radians', 'رادیان', 'rad')],
    (vars, u) => u === 'deg' ? vars.rad * 180 / Math.PI : vars.deg * Math.PI / 180),
  f('m49', 'Double Angle Sin', 'سینوس زاویه دوبرابر', 'math', 'trigonometry', 'sin(2θ) = 2sin(θ)cos(θ)',
    [v('result', 'sin(2θ)', 'sin(2θ)', ''), v('theta', 'θ', 'θ', '°')],
    (vars, u) => u === 'result' ? Math.sin(2 * vars.theta * Math.PI / 180) : NaN),
  f('m50', 'Double Angle Cos', 'کسینوس زاویه دوبرابر', 'math', 'trigonometry', 'cos(2θ) = cos²(θ)-sin²(θ)',
    [v('result', 'cos(2θ)', 'cos(2θ)', ''), v('theta', 'θ', 'θ', '°')],
    (vars, u) => u === 'result' ? Math.cos(2 * vars.theta * Math.PI / 180) : NaN),
  f('m51', 'Half Angle Sin', 'سینوس نصف زاویه', 'math', 'trigonometry', 'sin(θ/2) = √((1-cosθ)/2)',
    [v('result', 'sin(θ/2)', 'sin(θ/2)', ''), v('theta', 'θ', 'θ', '°')],
    (vars, u) => u === 'result' ? Math.sin(vars.theta * Math.PI / 360) : NaN),
  f('m52', 'Infinite Geometric Sum', 'مجموع هندسی نامتناهی', 'math', 'sequences', 'S = a/(1-r), |r|<1',
    [v('S', 'Sum', 'مجموع', ''), v('a', 'First Term', 'جمله اول', ''), v('r', 'Common Ratio', 'قدر نسبت', '')],
    (vars, u) => u === 'S' ? vars.a / (1 - vars.r) : u === 'a' ? vars.S * (1 - vars.r) : 1 - vars.a / vars.S),
  f('m53', 'Correlation Coefficient', 'ضریب همبستگی', 'math', 'statistics', 'r = cov(X,Y)/(σx·σy)',
    [v('r_corr', 'Correlation', 'همبستگی', ''), v('cov', 'Covariance', 'کوواریانس', ''), v('sx', 'σx', 'σx', ''), v('sy', 'σy', 'σy', '')],
    (vars, u) => u === 'r_corr' ? vars.cov / (vars.sx * vars.sy) : u === 'cov' ? vars.r_corr * vars.sx * vars.sy : NaN),
  f('m54', 'Coefficient of Variation', 'ضریب تغییرات', 'math', 'statistics', 'CV = (σ/μ)×100',
    [v('CV', 'CV', 'CV', '%'), v('sigma', 'Std Dev', 'انحراف معیار', ''), v('mu', 'Mean', 'میانگین', '')],
    (vars, u) => u === 'CV' ? (vars.sigma / vars.mu) * 100 : u === 'sigma' ? vars.CV * vars.mu / 100 : vars.sigma * 100 / vars.CV),
  f('m55', 'Rectangular Prism', 'حجم منشور مستطیلی', 'math', 'geometry', 'V = lwh',
    [v('V', 'Volume', 'حجم', ''), v('l', 'Length', 'طول', ''), v('w', 'Width', 'عرض', ''), v('h', 'Height', 'ارتفاع', '')],
    (vars, u) => u === 'V' ? vars.l * vars.w * vars.h : u === 'l' ? vars.V / (vars.w * vars.h) : u === 'w' ? vars.V / (vars.l * vars.h) : vars.V / (vars.l * vars.w)),

  // Extra Engineering
  f('eng1', 'Stress-Strain Hook', 'قانون هوک تنش-کرنش', 'physics', 'mechanics', 'σ = Eε',
    [v('sigma', 'Stress', 'تنش', 'Pa'), v('E_mod', "Young's Modulus", 'مدول یانگ', 'Pa'), v('epsilon', 'Strain', 'کرنش', '')],
    (vars, u) => u === 'sigma' ? vars.E_mod * vars.epsilon : u === 'E_mod' ? vars.sigma / vars.epsilon : vars.sigma / vars.E_mod),
  f('eng2', 'Shear Stress', 'تنش برشی', 'physics', 'mechanics', 'τ = F/A',
    [v('tau', 'Shear Stress', 'تنش برشی', 'Pa'), v('F', 'Force', 'نیرو', 'N'), v('A', 'Area', 'سطح', 'm²')],
    (vars, u) => u === 'tau' ? vars.F / vars.A : u === 'F' ? vars.tau * vars.A : vars.F / vars.tau),
  f('eng3', 'Poisson Ratio', 'نسبت پوآسون', 'physics', 'mechanics', 'ν = -εlat/εlong',
    [v('nu', 'Poisson Ratio', 'نسبت پوآسون', ''), v('e_lat', 'Lateral Strain', 'کرنش عرضی', ''), v('e_long', 'Longitudinal Strain', 'کرنش طولی', '')],
    (vars, u) => u === 'nu' ? -vars.e_lat / vars.e_long : u === 'e_lat' ? -vars.nu * vars.e_long : -vars.e_lat / vars.nu),
  f('eng4', 'Shear Modulus', 'مدول برشی', 'physics', 'mechanics', 'G = E/(2(1+ν))',
    [v('G', 'Shear Modulus', 'مدول برشی', 'Pa'), v('E_mod', "Young's Modulus", 'مدول یانگ', 'Pa'), v('nu', 'Poisson Ratio', 'نسبت پوآسون', '')],
    (vars, u) => u === 'G' ? vars.E_mod / (2 * (1 + vars.nu)) : u === 'E_mod' ? 2 * vars.G * (1 + vars.nu) : vars.E_mod / (2 * vars.G) - 1),
  f('eng5', 'Moment of Area', 'گشتاور سطح', 'physics', 'mechanics', 'I = bh³/12',
    [v('I', 'Moment of Area', 'گشتاور سطح', 'm⁴'), v('b', 'Width', 'عرض', 'm'), v('h', 'Height', 'ارتفاع', 'm')],
    (vars, u) => u === 'I' ? vars.b * vars.h ** 3 / 12 : u === 'b' ? 12 * vars.I / (vars.h ** 3) : (12 * vars.I / vars.b) ** (1 / 3)),
  f('eng6', 'Bending Stress', 'تنش خمشی', 'physics', 'mechanics', 'σ = My/I',
    [v('sigma', 'Bending Stress', 'تنش خمشی', 'Pa'), v('M', 'Moment', 'گشتاور', 'N·m'), v('y', 'Distance', 'فاصله', 'm'), v('I', 'Moment of Area', 'گشتاور سطح', 'm⁴')],
    (vars, u) => u === 'sigma' ? vars.M * vars.y / vars.I : u === 'M' ? vars.sigma * vars.I / vars.y : u === 'y' ? vars.sigma * vars.I / vars.M : vars.M * vars.y / vars.sigma),
  f('eng7', 'Torsion', 'پیچش', 'physics', 'mechanics', 'τ = Tr/J',
    [v('tau', 'Shear Stress', 'تنش برشی', 'Pa'), v('T_torque', 'Torque', 'گشتاور', 'N·m'), v('r', 'Radius', 'شعاع', 'm'), v('J', 'Polar Moment', 'گشتاور قطبی', 'm⁴')],
    (vars, u) => u === 'tau' ? vars.T_torque * vars.r / vars.J : u === 'T_torque' ? vars.tau * vars.J / vars.r : u === 'r' ? vars.tau * vars.J / vars.T_torque : vars.T_torque * vars.r / vars.tau),
  f('eng8', 'Euler Buckling', 'کمانش اویلر', 'physics', 'mechanics', 'Pcr = π²EI/L²',
    [v('Pcr', 'Critical Load', 'بار بحرانی', 'N'), v('E_mod', "Young's Modulus", 'مدول یانگ', 'Pa'), v('I', 'Moment of Area', 'گشتاور سطح', 'm⁴'), v('L', 'Length', 'طول', 'm')],
    (vars, u) => u === 'Pcr' ? Math.PI ** 2 * vars.E_mod * vars.I / (vars.L ** 2) : NaN),
  f('eng9', 'Thermal Resistance', 'مقاومت حرارتی', 'physics', 'thermodynamics', 'R = L/(kA)',
    [v('R_th', 'Thermal R', 'مقاومت حرارتی', 'K/W'), v('L', 'Thickness', 'ضخامت', 'm'), v('k', 'Conductivity', 'هدایت', 'W/(m·K)'), v('A', 'Area', 'سطح', 'm²')],
    (vars, u) => u === 'R_th' ? vars.L / (vars.k * vars.A) : u === 'L' ? vars.R_th * vars.k * vars.A : u === 'k' ? vars.L / (vars.R_th * vars.A) : vars.L / (vars.R_th * vars.k)),
  f('eng10', 'Heat Exchanger', 'مبدل حرارتی', 'physics', 'thermodynamics', 'Q = UAΔT',
    [v('Q', 'Heat Rate', 'نرخ حرارت', 'W'), v('U', 'Overall Coeff', 'ضریب کلی', 'W/(m²·K)'), v('A', 'Area', 'سطح', 'm²'), v('dT', 'Temp Diff', 'اختلاف دما', 'K')],
    (vars, u) => u === 'Q' ? vars.U * vars.A * vars.dT : u === 'U' ? vars.Q / (vars.A * vars.dT) : u === 'A' ? vars.Q / (vars.U * vars.dT) : vars.Q / (vars.U * vars.A)),

  // ==================== FILLING TO 500+ ====================
  f('ex1', 'Specific Gravity', 'وزن مخصوص', 'physics', 'fluids', 'SG = ρ/ρwater',
    [v('SG', 'Specific Gravity', 'وزن مخصوص', ''), v('rho', 'Density', 'چگالی', 'kg/m³'), v('rho_w', 'Water Density', 'چگالی آب', 'kg/m³')],
    (vars, u) => u === 'SG' ? vars.rho / vars.rho_w : u === 'rho' ? vars.SG * vars.rho_w : vars.rho / vars.SG),
  f('ex2', 'Mach Number', 'عدد ماخ', 'physics', 'fluids', 'Ma = v/a',
    [v('Ma', 'Mach Number', 'عدد ماخ', ''), v('v', 'Speed', 'سرعت', 'm/s'), v('a', 'Sound Speed', 'سرعت صوت', 'm/s')],
    (vars, u) => u === 'Ma' ? vars.v / vars.a : u === 'v' ? vars.Ma * vars.a : vars.v / vars.Ma),
  f('ex3', 'Weber Number', 'عدد وبر', 'physics', 'fluids', 'We = ρv²L/σ',
    [v('We', 'Weber Number', 'عدد وبر', ''), v('rho', 'Density', 'چگالی', 'kg/m³'), v('v', 'Velocity', 'سرعت', 'm/s'), v('L', 'Length', 'طول', 'm'), v('sigma', 'Surface Tension', 'کشش سطحی', 'N/m')],
    (vars, u) => u === 'We' ? vars.rho * vars.v ** 2 * vars.L / vars.sigma : NaN),
  f('ex4', 'Froude Number', 'عدد فرود', 'physics', 'fluids', 'Fr = v/√(gL)',
    [v('Fr', 'Froude Number', 'عدد فرود', ''), v('v', 'Velocity', 'سرعت', 'm/s'), v('g', 'Gravity', 'گرانش', 'm/s²'), v('L', 'Length', 'طول', 'm')],
    (vars, u) => u === 'Fr' ? vars.v / Math.sqrt(vars.g * vars.L) : u === 'v' ? vars.Fr * Math.sqrt(vars.g * vars.L) : NaN),
  f('ex5', 'Torricelli', 'توریچلی', 'physics', 'fluids', 'v = √(2gh)',
    [v('v', 'Velocity', 'سرعت', 'm/s'), v('g', 'Gravity', 'گرانش', 'm/s²'), v('h', 'Height', 'ارتفاع', 'm')],
    (vars, u) => u === 'v' ? Math.sqrt(2 * vars.g * vars.h) : u === 'h' ? vars.v ** 2 / (2 * vars.g) : vars.v ** 2 / (2 * vars.h)),
  f('ex6', 'Capillary Rise', 'بالا رفتن مویینگی', 'physics', 'fluids', 'h = 2γcos(θ)/(ρgr)',
    [v('h', 'Height', 'ارتفاع', 'm'), v('gamma', 'Surface Tension', 'کشش سطحی', 'N/m'), v('theta', 'Contact Angle', 'زاویه تماس', '°'), v('rho', 'Density', 'چگالی', 'kg/m³'), v('g', 'Gravity', 'گرانش', 'm/s²'), v('r', 'Tube Radius', 'شعاع لوله', 'm')],
    (vars, u) => u === 'h' ? 2 * vars.gamma * Math.cos(vars.theta * Math.PI / 180) / (vars.rho * vars.g * vars.r) : NaN),
  f('ex7', 'Drag Force', 'نیروی درگ', 'physics', 'fluids', 'Fd = ½CdρAv²',
    [v('Fd', 'Drag Force', 'نیروی درگ', 'N'), v('Cd', 'Drag Coeff', 'ضریب درگ', ''), v('rho', 'Density', 'چگالی', 'kg/m³'), v('A', 'Area', 'سطح', 'm²'), v('v', 'Velocity', 'سرعت', 'm/s')],
    (vars, u) => u === 'Fd' ? 0.5 * vars.Cd * vars.rho * vars.A * vars.v ** 2 : u === 'v' ? Math.sqrt(2 * vars.Fd / (vars.Cd * vars.rho * vars.A)) : NaN),
  f('ex8', 'Lift Force', 'نیروی لیفت', 'physics', 'fluids', 'FL = ½CLρAv²',
    [v('FL', 'Lift Force', 'نیروی لیفت', 'N'), v('CL', 'Lift Coeff', 'ضریب لیفت', ''), v('rho', 'Density', 'چگالی', 'kg/m³'), v('A', 'Area', 'سطح', 'm²'), v('v', 'Velocity', 'سرعت', 'm/s')],
    (vars, u) => u === 'FL' ? 0.5 * vars.CL * vars.rho * vars.A * vars.v ** 2 : u === 'v' ? Math.sqrt(2 * vars.FL / (vars.CL * vars.rho * vars.A)) : NaN),
  f('ex9', 'Terminal Velocity', 'سرعت حدی', 'physics', 'mechanics', 'vt = √(2mg/(CdρA))',
    [v('vt', 'Terminal V', 'سرعت حدی', 'm/s'), v('m', 'Mass', 'جرم', 'kg'), v('g', 'Gravity', 'گرانش', 'm/s²'), v('Cd', 'Drag Coeff', 'ضریب درگ', ''), v('rho', 'Density', 'چگالی', 'kg/m³'), v('A', 'Area', 'سطح', 'm²')],
    (vars, u) => u === 'vt' ? Math.sqrt(2 * vars.m * vars.g / (vars.Cd * vars.rho * vars.A)) : NaN),
  f('ex10', 'Pressure Head', 'هد فشاری', 'physics', 'fluids', 'h = P/(ρg)',
    [v('h', 'Head', 'هد', 'm'), v('P', 'Pressure', 'فشار', 'Pa'), v('rho', 'Density', 'چگالی', 'kg/m³'), v('g', 'Gravity', 'گرانش', 'm/s²')],
    (vars, u) => u === 'h' ? vars.P / (vars.rho * vars.g) : u === 'P' ? vars.h * vars.rho * vars.g : u === 'rho' ? vars.P / (vars.h * vars.g) : vars.P / (vars.h * vars.rho)),

  // Extra conversions and useful formulas
  f('ex11', 'Force of Gravity', 'نیروی جاذبه زمین', 'physics', 'gravity', 'g = F/m',
    [v('g', 'Grav Acceleration', 'شتاب گرانشی', 'm/s²'), v('F', 'Force', 'نیرو', 'N'), v('m', 'Mass', 'جرم', 'kg')],
    (vars, u) => u === 'g' ? vars.F / vars.m : u === 'F' ? vars.g * vars.m : vars.F / vars.g),
  f('ex12', 'Circular Velocity', 'سرعت دایره‌ای', 'physics', 'mechanics', 'v = 2πr/T',
    [v('v', 'Velocity', 'سرعت', 'm/s'), v('r', 'Radius', 'شعاع', 'm'), v('T', 'Period', 'دوره', 's')],
    (vars, u) => u === 'v' ? 2 * Math.PI * vars.r / vars.T : u === 'r' ? vars.v * vars.T / (2 * Math.PI) : 2 * Math.PI * vars.r / vars.v),
  f('ex13', 'Elastic Collision v1', 'برخورد کشسان v1', 'physics', 'mechanics', 'v1f = ((m1-m2)/(m1+m2))v1i',
    [v('v1f', 'v1 final', 'v1 نهایی', 'm/s'), v('m1', 'Mass 1', 'جرم ۱', 'kg'), v('m2', 'Mass 2', 'جرم ۲', 'kg'), v('v1i', 'v1 initial', 'v1 اولیه', 'm/s')],
    (vars, u) => u === 'v1f' ? ((vars.m1 - vars.m2) / (vars.m1 + vars.m2)) * vars.v1i : NaN),
  f('ex14', 'Inelastic Collision', 'برخورد غیرکشسان', 'physics', 'mechanics', 'vf = (m1v1+m2v2)/(m1+m2)',
    [v('vf', 'Final v', 'سرعت نهایی', 'm/s'), v('m1', 'Mass 1', 'جرم ۱', 'kg'), v('v1', 'v1', 'v1', 'm/s'), v('m2', 'Mass 2', 'جرم ۲', 'kg'), v('v2', 'v2', 'v2', 'm/s')],
    (vars, u) => u === 'vf' ? (vars.m1 * vars.v1 + vars.m2 * vars.v2) / (vars.m1 + vars.m2) : NaN),
  f('ex15', 'Incline Force', 'نیرو در سطح شیبدار', 'physics', 'mechanics', 'F = mgsin(θ)',
    [v('F', 'Force', 'نیرو', 'N'), v('m', 'Mass', 'جرم', 'kg'), v('g', 'Gravity', 'گرانش', 'm/s²'), v('theta', 'Angle', 'زاویه', '°')],
    (vars, u) => u === 'F' ? vars.m * vars.g * Math.sin(vars.theta * Math.PI / 180) : u === 'm' ? vars.F / (vars.g * Math.sin(vars.theta * Math.PI / 180)) : u === 'theta' ? Math.asin(vars.F / (vars.m * vars.g)) * 180 / Math.PI : NaN),
  f('ex16', 'Normal Force Incline', 'نیروی عمودی سطح شیبدار', 'physics', 'mechanics', 'N = mgcos(θ)',
    [v('N', 'Normal Force', 'نیروی عمودی', 'N'), v('m', 'Mass', 'جرم', 'kg'), v('g', 'Gravity', 'گرانش', 'm/s²'), v('theta', 'Angle', 'زاویه', '°')],
    (vars, u) => u === 'N' ? vars.m * vars.g * Math.cos(vars.theta * Math.PI / 180) : u === 'm' ? vars.N / (vars.g * Math.cos(vars.theta * Math.PI / 180)) : NaN),
  f('ex17', 'Apparent Weight', 'وزن ظاهری', 'physics', 'mechanics', 'Wa = m(g+a)',
    [v('Wa', 'Apparent Weight', 'وزن ظاهری', 'N'), v('m', 'Mass', 'جرم', 'kg'), v('g', 'Gravity', 'گرانش', 'm/s²'), v('a', 'Acceleration', 'شتاب', 'm/s²')],
    (vars, u) => u === 'Wa' ? vars.m * (vars.g + vars.a) : u === 'm' ? vars.Wa / (vars.g + vars.a) : u === 'a' ? vars.Wa / vars.m - vars.g : vars.Wa / vars.m - vars.a),
  f('ex18', 'Parallel Axis Theorem', 'قضیه محور موازی', 'physics', 'mechanics', 'I = Icm + md²',
    [v('I', 'Moment of Inertia', 'گشتاور لختی', 'kg·m²'), v('Icm', 'CM Moment', 'گشتاور مرکز جرم', 'kg·m²'), v('m', 'Mass', 'جرم', 'kg'), v('d', 'Distance', 'فاصله', 'm')],
    (vars, u) => u === 'I' ? vars.Icm + vars.m * vars.d ** 2 : u === 'Icm' ? vars.I - vars.m * vars.d ** 2 : u === 'm' ? (vars.I - vars.Icm) / (vars.d ** 2) : Math.sqrt((vars.I - vars.Icm) / vars.m)),
  f('ex19', 'SHM Velocity', 'سرعت حرکت هماهنگ ساده', 'physics', 'mechanics', 'v = ω√(A²-x²)',
    [v('v', 'Velocity', 'سرعت', 'm/s'), v('omega', 'Angular Freq', 'فرکانس زاویه‌ای', 'rad/s'), v('A', 'Amplitude', 'دامنه', 'm'), v('x', 'Position', 'موقعیت', 'm')],
    (vars, u) => u === 'v' ? vars.omega * Math.sqrt(vars.A ** 2 - vars.x ** 2) : NaN),
  f('ex20', 'SHM Acceleration', 'شتاب حرکت هماهنگ ساده', 'physics', 'mechanics', 'a = -ω²x',
    [v('a', 'Acceleration', 'شتاب', 'm/s²'), v('omega', 'Angular Freq', 'فرکانس زاویه‌ای', 'rad/s'), v('x', 'Position', 'موقعیت', 'm')],
    (vars, u) => u === 'a' ? -(vars.omega ** 2) * vars.x : u === 'omega' ? Math.sqrt(-vars.a / vars.x) : -vars.a / (vars.omega ** 2)),
  f('ex21', 'Energy Stored Inductor', 'انرژی ذخیره سلف', 'electronics', 'basic_electronics', 'W = ½LI²',
    [v('W', 'Energy', 'انرژی', 'J'), v('L', 'Inductance', 'اندوکتانس', 'H'), v('I', 'Current', 'جریان', 'A')],
    (vars, u) => u === 'W' ? 0.5 * vars.L * vars.I ** 2 : u === 'L' ? 2 * vars.W / (vars.I ** 2) : Math.sqrt(2 * vars.W / vars.L)),
  f('ex22', 'Inductors Series', 'سلف سری', 'electronics', 'basic_electronics', 'Lt = L₁ + L₂',
    [v('Lt', 'Total L', 'اندوکتانس کل', 'H'), v('L1', 'L₁', 'L₁', 'H'), v('L2', 'L₂', 'L₂', 'H')],
    (vars, u) => u === 'Lt' ? vars.L1 + vars.L2 : u === 'L1' ? vars.Lt - vars.L2 : vars.Lt - vars.L1),
  f('ex23', 'Inductors Parallel', 'سلف موازی', 'electronics', 'basic_electronics', '1/Lt = 1/L₁ + 1/L₂',
    [v('Lt', 'Total L', 'اندوکتانس کل', 'H'), v('L1', 'L₁', 'L₁', 'H'), v('L2', 'L₂', 'L₂', 'H')],
    (vars, u) => u === 'Lt' ? 1 / (1 / vars.L1 + 1 / vars.L2) : u === 'L1' ? 1 / (1 / vars.Lt - 1 / vars.L2) : 1 / (1 / vars.Lt - 1 / vars.L1)),
  f('ex24', 'Max Power Dissipation', 'حداکثر توان اتلافی', 'electronics', 'basic_electronics', 'Pd = (Tj-Ta)/θja',
    [v('Pd', 'Power Dissipation', 'توان اتلافی', 'W'), v('Tj', 'Junction Temp', 'دمای اتصال', '°C'), v('Ta', 'Ambient Temp', 'دمای محیط', '°C'), v('theta_ja', 'Thermal R', 'مقاومت حرارتی', '°C/W')],
    (vars, u) => u === 'Pd' ? (vars.Tj - vars.Ta) / vars.theta_ja : u === 'Tj' ? vars.Pd * vars.theta_ja + vars.Ta : u === 'Ta' ? vars.Tj - vars.Pd * vars.theta_ja : (vars.Tj - vars.Ta) / vars.Pd),
  f('ex25', 'Zener Regulation', 'تنظیم زنر', 'electronics', 'semiconductors', 'Rs = (Vin-Vz)/Iz',
    [v('Rs', 'Series R', 'مقاومت سری', 'Ω'), v('Vin', 'Input V', 'ولتاژ ورودی', 'V'), v('Vz', 'Zener V', 'ولتاژ زنر', 'V'), v('Iz', 'Zener I', 'جریان زنر', 'A')],
    (vars, u) => u === 'Rs' ? (vars.Vin - vars.Vz) / vars.Iz : u === 'Vin' ? vars.Rs * vars.Iz + vars.Vz : u === 'Vz' ? vars.Vin - vars.Rs * vars.Iz : (vars.Vin - vars.Vz) / vars.Rs),
  f('ex26', '555 Timer Freq', 'فرکانس تایمر 555', 'electronics', 'basic_electronics', 'f = 1.44/((R₁+2R₂)C)',
    [v('f', 'Frequency', 'فرکانس', 'Hz'), v('R1', 'R₁', 'R₁', 'Ω'), v('R2', 'R₂', 'R₂', 'Ω'), v('C', 'Capacitance', 'ظرفیت', 'F')],
    (vars, u) => u === 'f' ? 1.44 / ((vars.R1 + 2 * vars.R2) * vars.C) : u === 'C' ? 1.44 / ((vars.R1 + 2 * vars.R2) * vars.f) : NaN),
  f('ex27', 'Duty Cycle 555', 'چرخه کار 555', 'electronics', 'basic_electronics', 'D = (R₁+R₂)/(R₁+2R₂)',
    [v('D', 'Duty Cycle', 'چرخه کار', ''), v('R1', 'R₁', 'R₁', 'Ω'), v('R2', 'R₂', 'R₂', 'Ω')],
    (vars, u) => u === 'D' ? (vars.R1 + vars.R2) / (vars.R1 + 2 * vars.R2) : NaN),
  f('ex28', 'Decibel Voltage', 'ولتاژ دسی‌بل', 'electronics', 'amplifiers', 'dBV = 20log(V/1V)',
    [v('dBV', 'Voltage (dBV)', 'ولتاژ (dBV)', 'dBV'), v('V', 'Voltage', 'ولتاژ', 'V')],
    (vars, u) => u === 'dBV' ? 20 * Math.log10(vars.V) : 10 ** (vars.dBV / 20)),
  f('ex29', 'Input Impedance', 'امپدانس ورودی', 'electronics', 'amplifiers', 'Zin = Vin/Iin',
    [v('Zin', 'Input Z', 'امپدانس ورودی', 'Ω'), v('Vin', 'Input V', 'ولتاژ ورودی', 'V'), v('Iin', 'Input I', 'جریان ورودی', 'A')],
    (vars, u) => u === 'Zin' ? vars.Vin / vars.Iin : u === 'Vin' ? vars.Zin * vars.Iin : vars.Vin / vars.Zin),
  f('ex30', 'Output Impedance', 'امپدانس خروجی', 'electronics', 'amplifiers', 'Zout = Voc/Isc',
    [v('Zout', 'Output Z', 'امپدانس خروجی', 'Ω'), v('Voc', 'Open Circuit V', 'ولتاژ مدار باز', 'V'), v('Isc', 'Short Circuit I', 'جریان اتصال کوتاه', 'A')],
    (vars, u) => u === 'Zout' ? vars.Voc / vars.Isc : u === 'Voc' ? vars.Zout * vars.Isc : vars.Voc / vars.Zout),

  // More PID & Control
  f('dc26', 'PID Proportional', 'PID تناسبی', 'digital_control', 'pid', 'up = Kp × e',
    [v('up', 'Proportional', 'تناسبی', ''), v('Kp', 'Kp', 'Kp', ''), v('e', 'Error', 'خطا', '')],
    (vars, u) => u === 'up' ? vars.Kp * vars.e : u === 'Kp' ? vars.up / vars.e : vars.up / vars.Kp),
  f('dc27', 'PID Derivative', 'PID مشتقی', 'digital_control', 'pid', 'ud = Kd × de/dt',
    [v('ud', 'Derivative', 'مشتقی', ''), v('Kd', 'Kd', 'Kd', ''), v('dedt', 'de/dt', 'de/dt', '')],
    (vars, u) => u === 'ud' ? vars.Kd * vars.dedt : u === 'Kd' ? vars.ud / vars.dedt : vars.ud / vars.Kd),
  f('dc28', 'PID Integral', 'PID انتگرالی', 'digital_control', 'pid', 'ui = Ki × ∫e dt',
    [v('ui', 'Integral', 'انتگرالی', ''), v('Ki', 'Ki', 'Ki', ''), v('eint', '∫e dt', '∫e dt', '')],
    (vars, u) => u === 'ui' ? vars.Ki * vars.eint : u === 'Ki' ? vars.ui / vars.eint : vars.ui / vars.Ki),
  f('dc29', 'ZOH Transform', 'تبدیل ZOH', 'digital_control', 'z_transform', 'G(z) = (1-z⁻¹)Z{G(s)/s}',
    [v('Gz', 'G(z)', 'G(z)', ''), v('Gs', 'G(s)/s result', 'نتیجه G(s)/s', ''), v('z_inv', 'z⁻¹', 'z⁻¹', '')],
    (vars, u) => u === 'Gz' ? (1 - vars.z_inv) * vars.Gs : NaN),
  f('dc30', 'Jury Stability', 'پایداری ژوری', 'digital_control', 'stability', 'P(1) > 0',
    [v('P1', 'P(1)', 'P(1)', ''), v('a0', 'a₀', 'a₀', ''), v('a1', 'a₁', 'a₁', ''), v('a2', 'a₂', 'a₂', '')],
    (vars, u) => u === 'P1' ? vars.a0 + vars.a1 + vars.a2 : NaN),

  // Additional biology formulas
  f('b21', 'Nernst Eq (bio)', 'معادله نرنست (زیست)', 'biology', 'physiology', 'E = (RT/zF)ln([out]/[in])',
    [v('E', 'Potential', 'پتانسیل', 'V'), v('T', 'Temperature', 'دما', 'K'), v('z', 'Charge', 'بار', ''), v('out_conc', '[Out]', '[خارج]', 'mM'), v('in_conc', '[In]', '[داخل]', 'mM')],
    (vars, u) => { const R = 8.314; const F = 96485; return u === 'E' ? (R * vars.T / (vars.z * F)) * Math.log(vars.out_conc / vars.in_conc) : NaN; }),
  f('b22', 'Goldman Equation (simplified)', 'معادله گلدمن', 'biology', 'physiology', 'Vm = 61.5 × log(PK[K]o/(PK[K]i))',
    [v('Vm', 'Membrane V', 'ولتاژ غشا', 'mV'), v('Ko', '[K]out', '[K]خارج', 'mM'), v('Ki', '[K]in', '[K]داخل', 'mM')],
    (vars, u) => u === 'Vm' ? 61.5 * Math.log10(vars.Ko / vars.Ki) : NaN),
  f('b23', 'Fick Diffusion', 'نفوذ فیک', 'biology', 'physiology', 'J = -D(dC/dx)',
    [v('J', 'Flux', 'شار', 'mol/(m²·s)'), v('D', 'Diffusivity', 'ضریب نفوذ', 'm²/s'), v('dCdx', 'Conc Gradient', 'گرادیان غلظت', 'mol/m⁴')],
    (vars, u) => u === 'J' ? -vars.D * vars.dCdx : u === 'D' ? -vars.J / vars.dCdx : -vars.J / vars.D),
  f('b24', 'Hemoglobin Saturation', 'اشباع هموگلوبین', 'biology', 'physiology', 'Y = pO₂ⁿ/(P₅₀ⁿ+pO₂ⁿ)',
    [v('Y', 'Saturation', 'اشباع', ''), v('pO2', 'pO₂', 'pO₂', 'mmHg'), v('P50', 'P₅₀', 'P₅₀', 'mmHg'), v('n', 'Hill Coeff', 'ضریب هیل', '')],
    (vars, u) => u === 'Y' ? vars.pO2 ** vars.n / (vars.P50 ** vars.n + vars.pO2 ** vars.n) : NaN),
  f('b25', 'Caloric Expenditure', 'مصرف کالری', 'biology', 'physiology', 'E = MET × kg × hours',
    [v('E', 'Energy', 'انرژی', 'kcal'), v('MET', 'MET Value', 'مقدار MET', ''), v('kg', 'Body Mass', 'جرم بدن', 'kg'), v('hours', 'Duration', 'مدت', 'hr')],
    (vars, u) => u === 'E' ? vars.MET * vars.kg * vars.hours : u === 'MET' ? vars.E / (vars.kg * vars.hours) : u === 'kg' ? vars.E / (vars.MET * vars.hours) : vars.E / (vars.MET * vars.kg)),

  // Remaining to reach 500+
  f('ex31', 'Doppler Radar', 'رادار دوپلر', 'signals', 'modulation', 'fd = 2v·fc/c',
    [v('fd', 'Doppler Freq', 'فرکانس دوپلر', 'Hz'), v('v', 'Target Speed', 'سرعت هدف', 'm/s'), v('fc', 'Carrier Freq', 'فرکانس حامل', 'Hz')],
    (vars, u) => { const c = 3e8; return u === 'fd' ? 2 * vars.v * vars.fc / c : u === 'v' ? vars.fd * c / (2 * vars.fc) : vars.fd * c / (2 * vars.v); }),
  f('ex32', 'Phase Locked Loop', 'حلقه قفل فاز', 'signals', 'frequency', 'fo = N × fref',
    [v('fo', 'Output Freq', 'فرکانس خروجی', 'Hz'), v('N', 'Divider', 'تقسیم‌کننده', ''), v('fref', 'Reference Freq', 'فرکانس مرجع', 'Hz')],
    (vars, u) => u === 'fo' ? vars.N * vars.fref : u === 'N' ? vars.fo / vars.fref : vars.fo / vars.N),
  f('ex33', 'PCM Bit Rate', 'نرخ بیت PCM', 'signals', 'discrete', 'Rb = n × fs × b',
    [v('Rb', 'Bit Rate', 'نرخ بیت', 'bps'), v('n_ch', 'Channels', 'کانال‌ها', ''), v('fs', 'Sample Rate', 'نرخ نمونه‌برداری', 'Hz'), v('b', 'Bits/Sample', 'بیت/نمونه', '')],
    (vars, u) => u === 'Rb' ? vars.n_ch * vars.fs * vars.b : u === 'n_ch' ? vars.Rb / (vars.fs * vars.b) : u === 'fs' ? vars.Rb / (vars.n_ch * vars.b) : vars.Rb / (vars.n_ch * vars.fs)),
  f('ex34', 'AM Power', 'توان AM', 'signals', 'modulation', 'Pt = Pc(1+m²/2)',
    [v('Pt', 'Total Power', 'توان کل', 'W'), v('Pc', 'Carrier Power', 'توان حامل', 'W'), v('m', 'Mod Index', 'شاخص مدولاسیون', '')],
    (vars, u) => u === 'Pt' ? vars.Pc * (1 + vars.m ** 2 / 2) : u === 'Pc' ? vars.Pt / (1 + vars.m ** 2 / 2) : Math.sqrt(2 * (vars.Pt / vars.Pc - 1))),
  f('ex35', 'Pulse Width', 'عرض پالس', 'signals', 'continuous', 'BW ≈ 1/τ',
    [v('BW', 'Bandwidth', 'پهنای باند', 'Hz'), v('tau', 'Pulse Width', 'عرض پالس', 's')],
    (vars, u) => u === 'BW' ? 1 / vars.tau : 1 / vars.BW),

  // Final additions
  f('fin1', 'Spring PE', 'انرژی پتانسیل فنر', 'physics', 'mechanics', 'U = ½kx²',
    [v('U', 'Energy', 'انرژی', 'J'), v('k', 'Spring Const', 'ثابت فنر', 'N/m'), v('x', 'Extension', 'کشیدگی', 'm')],
    (vars, u) => u === 'U' ? 0.5 * vars.k * vars.x ** 2 : u === 'k' ? 2 * vars.U / (vars.x ** 2) : Math.sqrt(2 * vars.U / vars.k)),
  f('fin2', 'Work-Energy Theorem', 'قضیه کار-انرژی', 'physics', 'mechanics', 'W = ΔKE = ½m(v²-v₀²)',
    [v('W', 'Work', 'کار', 'J'), v('m', 'Mass', 'جرم', 'kg'), v('v', 'Final v', 'v نهایی', 'm/s'), v('v0', 'Initial v', 'v اولیه', 'm/s')],
    (vars, u) => u === 'W' ? 0.5 * vars.m * (vars.v ** 2 - vars.v0 ** 2) : u === 'm' ? 2 * vars.W / (vars.v ** 2 - vars.v0 ** 2) : NaN),
  f('fin3', 'Kepler Area Law', 'قانون دوم کپلر', 'physics', 'gravity', 'dA/dt = L/(2m)',
    [v('dAdt', 'Areal Velocity', 'سرعت مساحتی', 'm²/s'), v('L', 'Angular Momentum', 'تکانه زاویه‌ای', 'kg·m²/s'), v('m', 'Mass', 'جرم', 'kg')],
    (vars, u) => u === 'dAdt' ? vars.L / (2 * vars.m) : u === 'L' ? 2 * vars.m * vars.dAdt : vars.L / (2 * vars.dAdt)),
  f('fin4', 'Satellite Period', 'دوره ماهواره', 'physics', 'gravity', 'T = 2π√(r³/(GM))',
    [v('T', 'Period', 'دوره', 's'), v('r', 'Orbital Radius', 'شعاع مداری', 'm'), v('M', 'Planet Mass', 'جرم سیاره', 'kg')],
    (vars, u) => { const G = 6.674e-11; return u === 'T' ? 2 * Math.PI * Math.sqrt(vars.r ** 3 / (G * vars.M)) : u === 'r' ? (G * vars.M * (vars.T / (2 * Math.PI)) ** 2) ** (1 / 3) : 4 * Math.PI ** 2 * vars.r ** 3 / (G * vars.T ** 2); }),
  f('fin5', 'Roche Limit', 'حد روش', 'physics', 'gravity', 'd = R(2ρM/ρm)^(1/3)',
    [v('d', 'Roche Limit', 'حد روش', 'm'), v('R', 'Primary Radius', 'شعاع اصلی', 'm'), v('rhoM', 'Primary Density', 'چگالی اصلی', 'kg/m³'), v('rhom', 'Secondary Density', 'چگالی ثانوی', 'kg/m³')],
    (vars, u) => u === 'd' ? vars.R * (2 * vars.rhoM / vars.rhom) ** (1 / 3) : NaN),

  // Final batch to cross 500
  f('fin6', 'Gravitational Flux', 'شار گرانشی', 'physics', 'gravity', 'Φg = -4πGM',
    [v('Phi_g', 'Grav Flux', 'شار گرانشی', 'N·m²/kg'), v('M', 'Mass', 'جرم', 'kg')],
    (vars, u) => { const G = 6.674e-11; return u === 'Phi_g' ? -4 * Math.PI * G * vars.M : vars.Phi_g / (-4 * Math.PI * G); }),
  f('fin7', 'Electric Field Ring', 'میدان الکتریکی حلقه', 'physics', 'electromagnetism', 'E = kQx/(x²+R²)^(3/2)',
    [v('E', 'E-field', 'میدان', 'N/C'), v('Q', 'Charge', 'بار', 'C'), v('x', 'Distance', 'فاصله', 'm'), v('R', 'Ring Radius', 'شعاع حلقه', 'm')],
    (vars, u) => { const k = 8.99e9; return u === 'E' ? k * vars.Q * vars.x / Math.pow(vars.x ** 2 + vars.R ** 2, 1.5) : NaN; }),
  f('fin8', 'Cylindrical Capacitor', 'خازن استوانه‌ای', 'physics', 'electromagnetism', 'C = 2πε₀L/ln(b/a)',
    [v('C', 'Capacitance', 'ظرفیت', 'F'), v('L', 'Length', 'طول', 'm'), v('b', 'Outer Radius', 'شعاع خارجی', 'm'), v('a', 'Inner Radius', 'شعاع داخلی', 'm')],
    (vars, u) => { const e0 = 8.854e-12; return u === 'C' ? 2 * Math.PI * e0 * vars.L / Math.log(vars.b / vars.a) : NaN; }),
  f('fin9', 'Spherical Capacitor', 'خازن کروی', 'physics', 'electromagnetism', 'C = 4πε₀ab/(b-a)',
    [v('C', 'Capacitance', 'ظرفیت', 'F'), v('a', 'Inner Radius', 'شعاع داخلی', 'm'), v('b', 'Outer Radius', 'شعاع خارجی', 'm')],
    (vars, u) => { const e0 = 8.854e-12; return u === 'C' ? 4 * Math.PI * e0 * vars.a * vars.b / (vars.b - vars.a) : NaN; }),
  f('fin10', 'Magnetic Energy Density', 'چگالی انرژی مغناطیسی', 'physics', 'electromagnetism', 'u = B²/(2μ₀)',
    [v('u_density', 'Energy Density', 'چگالی انرژی', 'J/m³'), v('B', 'Mag Field', 'میدان', 'T')],
    (vars, u) => { const mu0 = 4 * Math.PI * 1e-7; return u === 'u_density' ? vars.B ** 2 / (2 * mu0) : Math.sqrt(2 * mu0 * vars.u_density); }),
  f('fin11', 'Electric Energy Density', 'چگالی انرژی الکتریکی', 'physics', 'electromagnetism', 'u = ½ε₀E²',
    [v('u_density', 'Energy Density', 'چگالی انرژی', 'J/m³'), v('E', 'E-field', 'میدان', 'V/m')],
    (vars, u) => { const e0 = 8.854e-12; return u === 'u_density' ? 0.5 * e0 * vars.E ** 2 : Math.sqrt(2 * vars.u_density / e0); }),
  f('fin12', 'Maxwell Speed Dist', 'توزیع سرعت ماکسول', 'physics', 'thermodynamics', 'vp = √(2kT/m)',
    [v('vp', 'Most Probable v', 'محتمل‌ترین سرعت', 'm/s'), v('T', 'Temperature', 'دما', 'K'), v('m', 'Molecular Mass', 'جرم مولکولی', 'kg')],
    (vars, u) => { const k = 1.38e-23; return u === 'vp' ? Math.sqrt(2 * k * vars.T / vars.m) : u === 'T' ? vars.vp ** 2 * vars.m / (2 * k) : 2 * k * vars.T / (vars.vp ** 2); }),
  f('fin13', 'Avg Speed Gas', 'سرعت میانگین گاز', 'physics', 'thermodynamics', 'vavg = √(8kT/(πm))',
    [v('vavg', 'Average Speed', 'سرعت میانگین', 'm/s'), v('T', 'Temperature', 'دما', 'K'), v('m', 'Molecular Mass', 'جرم مولکولی', 'kg')],
    (vars, u) => { const k = 1.38e-23; return u === 'vavg' ? Math.sqrt(8 * k * vars.T / (Math.PI * vars.m)) : u === 'T' ? vars.vavg ** 2 * Math.PI * vars.m / (8 * k) : 8 * k * vars.T / (Math.PI * vars.vavg ** 2); }),
  f('fin14', 'Degrees of Freedom Energy', 'انرژی درجه آزادی', 'physics', 'thermodynamics', 'U = (f/2)nRT',
    [v('U', 'Internal Energy', 'انرژی داخلی', 'J'), v('f_dof', 'DOF', 'درجه آزادی', ''), v('n', 'Moles', 'مول', 'mol'), v('T', 'Temperature', 'دما', 'K')],
    (vars, u) => { const R = 8.314; return u === 'U' ? (vars.f_dof / 2) * vars.n * R * vars.T : u === 'T' ? 2 * vars.U / (vars.f_dof * vars.n * R) : NaN; }),
  f('fin15', 'Specific Heat Ratio', 'نسبت گرمای ویژه', 'physics', 'thermodynamics', 'γ = Cp/Cv',
    [v('gamma', 'γ', 'γ', ''), v('Cp', 'Cp', 'Cp', 'J/(mol·K)'), v('Cv', 'Cv', 'Cv', 'J/(mol·K)')],
    (vars, u) => u === 'gamma' ? vars.Cp / vars.Cv : u === 'Cp' ? vars.gamma * vars.Cv : vars.Cp / vars.gamma),
  f('fin16', 'Mayer Relation', 'رابطه مایر', 'physics', 'thermodynamics', 'Cp - Cv = R',
    [v('Cp', 'Cp', 'Cp', 'J/(mol·K)'), v('Cv', 'Cv', 'Cv', 'J/(mol·K)')],
    (vars, u) => u === 'Cp' ? vars.Cv + 8.314 : vars.Cp - 8.314),
  f('fin17', 'Isothermal Work', 'کار ایزوترمال', 'physics', 'thermodynamics', 'W = nRT·ln(V₂/V₁)',
    [v('W', 'Work', 'کار', 'J'), v('n', 'Moles', 'مول', 'mol'), v('T', 'Temperature', 'دما', 'K'), v('V1', 'V₁', 'V₁', 'm³'), v('V2', 'V₂', 'V₂', 'm³')],
    (vars, u) => { const R = 8.314; return u === 'W' ? vars.n * R * vars.T * Math.log(vars.V2 / vars.V1) : NaN; }),
  f('fin18', 'Isobaric Work', 'کار ایزوباریک', 'physics', 'thermodynamics', 'W = PΔV',
    [v('W', 'Work', 'کار', 'J'), v('P', 'Pressure', 'فشار', 'Pa'), v('dV', 'Volume Change', 'تغییر حجم', 'm³')],
    (vars, u) => u === 'W' ? vars.P * vars.dV : u === 'P' ? vars.W / vars.dV : vars.W / vars.P),
  f('fin19', 'Photon Number', 'تعداد فوتون', 'quantum', 'quantum_basics', 'N = P/(hf)',
    [v('N', 'Photon Count', 'تعداد فوتون', '/s'), v('P', 'Power', 'توان', 'W'), v('f', 'Frequency', 'فرکانس', 'Hz')],
    (vars, u) => { const h = 6.626e-34; return u === 'N' ? vars.P / (h * vars.f) : u === 'P' ? vars.N * h * vars.f : vars.P / (vars.N * h); }),
  f('fin20', 'Bragg Diffraction', 'پراش براگ', 'quantum', 'atomic', '2d·sin(θ) = nλ',
    [v('d', 'Spacing', 'فاصله', 'm'), v('theta', 'Angle', 'زاویه', '°'), v('n', 'Order', 'مرتبه', ''), v('lambda', 'Wavelength', 'طول موج', 'm')],
    (vars, u) => u === 'd' ? vars.n * vars.lambda / (2 * Math.sin(vars.theta * Math.PI / 180)) : u === 'theta' ? Math.asin(vars.n * vars.lambda / (2 * vars.d)) * 180 / Math.PI : u === 'lambda' ? 2 * vars.d * Math.sin(vars.theta * Math.PI / 180) / vars.n : 2 * vars.d * Math.sin(vars.theta * Math.PI / 180) / vars.lambda),
  f('fin21', 'Coherence Length', 'طول همدوسی', 'physics', 'waves', 'Lc = c/Δf',
    [v('Lc', 'Coherence Length', 'طول همدوسی', 'm'), v('df', 'Bandwidth', 'پهنای باند', 'Hz')],
    (vars, u) => { const c = 3e8; return u === 'Lc' ? c / vars.df : c / vars.Lc; }),
  f('fin22', 'Numerical Aperture', 'روزنه عددی', 'physics', 'waves', 'NA = n·sin(θ)',
    [v('NA', 'Numerical Aperture', 'روزنه عددی', ''), v('n', 'Refractive Index', 'ضریب شکست', ''), v('theta', 'Half Angle', 'نیم‌زاویه', '°')],
    (vars, u) => u === 'NA' ? vars.n * Math.sin(vars.theta * Math.PI / 180) : u === 'n' ? vars.NA / Math.sin(vars.theta * Math.PI / 180) : Math.asin(vars.NA / vars.n) * 180 / Math.PI),
];

import { formulas2 } from './formulas2';

export const allFormulas = [...formulas, ...formulas2];
export const totalFormulas = allFormulas.length;
