import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import * as math from 'mathjs';

type MathMode = 'derivative' | 'integral' | 'equation' | 'limit' | 'matrix' | 'polynomial';

interface SolveResult {
  input: string;
  output: string;
  steps: string[];
  type: MathMode;
}

// ============ SYMBOLIC DERIVATIVE ENGINE ============
function symbolicDerivative(expr: string, variable = 'x'): { result: string; steps: string[] } {
  const steps: string[] = [];
  const v = variable;
  let clean = expr.trim().replace(/\s+/g, '');

  steps.push(`d/d${v} [${expr}]`);

  // Handle sum/difference: split by + or - (not inside parens)
  const terms = splitTerms(clean);
  if (terms.length > 1) {
    const derivedTerms: string[] = [];
    for (const term of terms) {
      const d = deriveSingleTerm(term.expr, v);
      derivedTerms.push((term.sign === '-' ? '-' : '') + d.result);
      steps.push(`d/d${v}[${term.sign}${term.expr}] = ${term.sign === '-' ? '-' : ''}${d.result}`);
    }
    const result = derivedTerms.join(' + ').replace(/\+ -/g, '- ').replace(/\+ \+/g, '+ ');
    steps.push(`= ${result}`);
    return { result: simplifyExpr(result), steps };
  }

  const d = deriveSingleTerm(clean, v);
  steps.push(...d.steps);
  steps.push(`= ${d.result}`);
  return { result: simplifyExpr(d.result), steps };
}

function splitTerms(expr: string): { sign: string; expr: string }[] {
  const terms: { sign: string; expr: string }[] = [];
  let depth = 0;
  let current = '';
  let sign = '+';

  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (depth === 0 && (ch === '+' || ch === '-') && i > 0) {
      if (current) terms.push({ sign, expr: current });
      sign = ch;
      current = '';
    } else {
      current += ch;
    }
  }
  if (current) terms.push({ sign, expr: current });
  return terms;
}

function deriveSingleTerm(expr: string, v: string): { result: string; steps: string[] } {
  const steps: string[] = [];

  // constant
  if (!expr.includes(v)) {
    steps.push(`${expr} is constant → 0`);
    return { result: '0', steps };
  }

  // just x
  if (expr === v) {
    return { result: '1', steps: [`d/d${v}[${v}] = 1`] };
  }

  // a*x^n pattern
  const powerMatch = expr.match(/^(-?\d*\.?\d*)\*?(\w)\^(-?\d+\.?\d*)$/);
  if (powerMatch && powerMatch[2] === v) {
    const coeff = powerMatch[1] === '' || powerMatch[1] === undefined ? 1 : parseFloat(powerMatch[1]);
    const n = parseFloat(powerMatch[3]);
    const newCoeff = coeff * n;
    const newPow = n - 1;
    if (newPow === 0) {
      steps.push(`Power rule: ${coeff}·${n}·${v}^(${n}-1) = ${newCoeff}`);
      return { result: String(newCoeff), steps };
    }
    if (newPow === 1) {
      steps.push(`Power rule: ${coeff}·${n}·${v}^(${n}-1) = ${newCoeff}${v}`);
      return { result: `${newCoeff}${v}`, steps };
    }
    steps.push(`Power rule: ${coeff}·${n}·${v}^(${n}-1) = ${newCoeff}${v}^${newPow}`);
    return { result: `${newCoeff}${v}^${newPow}`, steps };
  }

  // a*x pattern
  const linearMatch = expr.match(/^(-?\d+\.?\d*)\*?(\w)$/);
  if (linearMatch && linearMatch[2] === v) {
    steps.push(`d/d${v}[${expr}] = ${linearMatch[1]}`);
    return { result: linearMatch[1], steps };
  }

  // x^n without coefficient
  const simplePow = expr.match(/^(\w)\^(-?\d+\.?\d*)$/);
  if (simplePow && simplePow[1] === v) {
    const n = parseFloat(simplePow[2]);
    const newPow = n - 1;
    if (newPow === 0) return { result: String(n), steps: [`Power rule: ${n}·${v}^${n - 1} = ${n}`] };
    if (newPow === 1) return { result: `${n}${v}`, steps: [`Power rule: ${n}·${v}^${n - 1} = ${n}${v}`] };
    return { result: `${n}${v}^${newPow}`, steps: [`Power rule: ${n}·${v}^${n - 1} = ${n}${v}^${newPow}`] };
  }

  // sin(x)
  if (expr === `sin(${v})`) return { result: `cos(${v})`, steps: [`d/d${v}[sin(${v})] = cos(${v})`] };
  // cos(x)
  if (expr === `cos(${v})`) return { result: `-sin(${v})`, steps: [`d/d${v}[cos(${v})] = -sin(${v})`] };
  // tan(x)
  if (expr === `tan(${v})`) return { result: `sec²(${v})`, steps: [`d/d${v}[tan(${v})] = sec²(${v})`] };
  // e^x
  if (expr === `e^${v}` || expr === `exp(${v})`) return { result: `e^${v}`, steps: [`d/d${v}[e^${v}] = e^${v}`] };
  // ln(x)
  if (expr === `ln(${v})` || expr === `log(${v})`) return { result: `1/${v}`, steps: [`d/d${v}[ln(${v})] = 1/${v}`] };
  // sqrt(x)
  if (expr === `sqrt(${v})`) return { result: `1/(2sqrt(${v}))`, steps: [`d/d${v}[√${v}] = 1/(2√${v})`] };
  // 1/x
  if (expr === `1/${v}`) return { result: `-1/${v}^2`, steps: [`d/d${v}[1/${v}] = -1/${v}²`] };

  // Chain rule patterns
  const sinMatch = expr.match(/^sin\((.+)\)$/);
  if (sinMatch) {
    const inner = sinMatch[1];
    const innerD = deriveSingleTerm(inner, v);
    steps.push(`Chain rule: cos(${inner}) · d/d${v}[${inner}]`);
    steps.push(`Inner: d/d${v}[${inner}] = ${innerD.result}`);
    return { result: `cos(${inner})·(${innerD.result})`, steps };
  }

  const cosMatch = expr.match(/^cos\((.+)\)$/);
  if (cosMatch) {
    const inner = cosMatch[1];
    const innerD = deriveSingleTerm(inner, v);
    steps.push(`Chain rule: -sin(${inner}) · d/d${v}[${inner}]`);
    return { result: `-sin(${inner})·(${innerD.result})`, steps };
  }

  const expMatch = expr.match(/^e\^(.+)$/) || expr.match(/^exp\((.+)\)$/);
  if (expMatch) {
    const inner = expMatch[1];
    const innerD = deriveSingleTerm(inner, v);
    steps.push(`Chain rule: e^(${inner}) · d/d${v}[${inner}]`);
    return { result: `e^(${inner})·(${innerD.result})`, steps };
  }

  const lnMatch = expr.match(/^ln\((.+)\)$/);
  if (lnMatch) {
    const inner = lnMatch[1];
    const innerD = deriveSingleTerm(inner, v);
    steps.push(`Chain rule: (1/(${inner})) · d/d${v}[${inner}]`);
    return { result: `(${innerD.result})/(${inner})`, steps };
  }

  // Fallback: try numerical
  steps.push(`Using numerical differentiation`);
  return { result: `d/d${v}[${expr}]`, steps };
}

function simplifyExpr(expr: string): string {
  return expr
    .replace(/\+ 0/g, '').replace(/0 \+/g, '')
    .replace(/\b1\*/g, '').replace(/\*1\b/g, '')
    .replace(/\+ -/g, '- ')
    .replace(/^0$/, '0')
    .trim() || '0';
}

// ============ SYMBOLIC INTEGRAL ENGINE ============
function symbolicIntegral(expr: string, variable = 'x'): { result: string; steps: string[] } {
  const steps: string[] = [];
  const v = variable;
  let clean = expr.trim().replace(/\s+/g, '');

  steps.push(`∫ ${expr} d${v}`);

  const terms = splitTerms(clean);
  if (terms.length > 1) {
    const intTerms: string[] = [];
    for (const term of terms) {
      const intg = integrateSingleTerm(term.expr, v);
      intTerms.push((term.sign === '-' ? '-' : '') + intg.result);
      steps.push(`∫${term.sign}${term.expr} d${v} = ${term.sign === '-' ? '-' : ''}${intg.result}`);
    }
    const result = intTerms.join(' + ').replace(/\+ -/g, '- ') + ' + C';
    steps.push(`= ${result}`);
    return { result, steps };
  }

  const intg = integrateSingleTerm(clean, v);
  steps.push(...intg.steps);
  const result = intg.result + ' + C';
  steps.push(`= ${result}`);
  return { result, steps };
}

function integrateSingleTerm(expr: string, v: string): { result: string; steps: string[] } {
  const steps: string[] = [];

  // constant (no variable)
  if (!expr.includes(v)) {
    steps.push(`∫${expr} d${v} = ${expr}·${v}`);
    return { result: `${expr}·${v}`, steps };
  }

  // x
  if (expr === v) {
    steps.push(`∫${v} d${v} = ${v}²/2`);
    return { result: `${v}²/2`, steps };
  }

  // x^n
  const simplePow = expr.match(/^(\w)\^(-?\d+\.?\d*)$/);
  if (simplePow && simplePow[1] === v) {
    const n = parseFloat(simplePow[2]);
    if (n === -1) {
      steps.push(`∫${v}^(-1) d${v} = ln|${v}|`);
      return { result: `ln|${v}|`, steps };
    }
    const newPow = n + 1;
    steps.push(`Power rule: ${v}^${newPow}/${newPow}`);
    return { result: `${v}^${newPow}/${newPow}`, steps };
  }

  // a*x^n
  const powerMatch = expr.match(/^(-?\d+\.?\d*)\*?(\w)\^(-?\d+\.?\d*)$/);
  if (powerMatch && powerMatch[2] === v) {
    const coeff = parseFloat(powerMatch[1]);
    const n = parseFloat(powerMatch[3]);
    if (n === -1) {
      steps.push(`∫${coeff}/${v} d${v} = ${coeff}·ln|${v}|`);
      return { result: `${coeff}·ln|${v}|`, steps };
    }
    const newPow = n + 1;
    const newCoeff = coeff / newPow;
    steps.push(`Power rule: ${newCoeff}·${v}^${newPow}`);
    return { result: `${parseFloat(newCoeff.toFixed(6))}${v}^${newPow}`, steps };
  }

  // a*x
  const linearMatch = expr.match(/^(-?\d+\.?\d*)\*?(\w)$/);
  if (linearMatch && linearMatch[2] === v) {
    const a = parseFloat(linearMatch[1]);
    steps.push(`∫${a}${v} d${v} = ${a / 2}${v}²`);
    return { result: `${a / 2}${v}²`, steps };
  }

  // sin(x)
  if (expr === `sin(${v})`) return { result: `-cos(${v})`, steps: [`∫sin(${v}) d${v} = -cos(${v})`] };
  if (expr === `cos(${v})`) return { result: `sin(${v})`, steps: [`∫cos(${v}) d${v} = sin(${v})`] };
  if (expr === `e^${v}` || expr === `exp(${v})`) return { result: `e^${v}`, steps: [`∫e^${v} d${v} = e^${v}`] };
  if (expr === `1/${v}`) return { result: `ln|${v}|`, steps: [`∫1/${v} d${v} = ln|${v}|`] };
  if (expr === `sec^2(${v})` || expr === `sec²(${v})`) return { result: `tan(${v})`, steps: [`∫sec²(${v}) d${v} = tan(${v})`] };
  if (expr === `1/sqrt(${v})` || expr === `${v}^(-0.5)`) return { result: `2sqrt(${v})`, steps: [`∫${v}^(-1/2) d${v} = 2√${v}`] };

  steps.push(`Cannot integrate symbolically: ∫${expr} d${v}`);
  return { result: `∫${expr} d${v}`, steps };
}

// ============ EQUATION SOLVER ============
function solveEquation(equation: string): { solutions: string[]; steps: string[] } {
  const steps: string[] = [];
  let eq = equation.replace(/\s+/g, '');

  steps.push(`Solve: ${equation}`);

  // Split by =
  const sides = eq.split('=');
  if (sides.length !== 2) {
    // Assume = 0
    sides.push('0');
    sides[0] = eq;
  }

  // Move everything to left: LHS - RHS = 0
  const lhs = sides[0];
  const rhs = sides[1];
  steps.push(`${lhs} - (${rhs}) = 0`);

  // Try to detect quadratic: ax² + bx + c = 0
  const quadMatch = eq.match(/(-?\d*\.?\d*)x\^2([+-]\d*\.?\d*)?x?([+-]\d*\.?\d*)?=(-?\d*\.?\d*)?/);
  if (quadMatch) {
    let a = parseFloat(quadMatch[1] || '1') || 1;
    let b = parseFloat(quadMatch[2] || '0') || 0;
    let c = parseFloat(quadMatch[3] || '0') || 0;
    const rhs_val = parseFloat(quadMatch[4] || '0') || 0;
    c -= rhs_val;

    steps.push(`Quadratic: ${a}x² + ${b}x + ${c} = 0`);
    const discriminant = b * b - 4 * a * c;
    steps.push(`Δ = b² - 4ac = ${b}² - 4(${a})(${c}) = ${discriminant}`);

    if (discriminant > 0) {
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      steps.push(`x₁ = (-b + √Δ)/(2a) = ${x1.toFixed(6)}`);
      steps.push(`x₂ = (-b - √Δ)/(2a) = ${x2.toFixed(6)}`);
      return { solutions: [x1.toFixed(6), x2.toFixed(6)], steps };
    } else if (discriminant === 0) {
      const x = -b / (2 * a);
      steps.push(`Δ = 0 → double root`);
      steps.push(`x = -b/(2a) = ${x.toFixed(6)}`);
      return { solutions: [x.toFixed(6)], steps };
    } else {
      const real = -b / (2 * a);
      const imag = Math.sqrt(-discriminant) / (2 * a);
      steps.push(`Δ < 0 → complex roots`);
      steps.push(`x₁ = ${real.toFixed(4)} + ${imag.toFixed(4)}i`);
      steps.push(`x₂ = ${real.toFixed(4)} - ${imag.toFixed(4)}i`);
      return { solutions: [`${real.toFixed(4)} + ${imag.toFixed(4)}i`, `${real.toFixed(4)} - ${imag.toFixed(4)}i`], steps };
    }
  }

  // Try linear: ax + b = c
  const linMatch = eq.match(/(-?\d*\.?\d*)x([+-]\d*\.?\d*)?=(-?\d*\.?\d*)/);
  if (linMatch) {
    const a = parseFloat(linMatch[1] || '1') || 1;
    const b = parseFloat(linMatch[2] || '0') || 0;
    const c = parseFloat(linMatch[3] || '0') || 0;
    const x = (c - b) / a;
    steps.push(`Linear: ${a}x + ${b} = ${c}`);
    steps.push(`x = (${c} - ${b}) / ${a} = ${x}`);
    return { solutions: [x.toFixed(6)], steps };
  }

  // Try numerical (Newton-Raphson)
  try {
    steps.push('Using numerical method (Newton-Raphson)...');
    const f = (x: number) => {
      try {
        const scope = { x };
        const leftVal = math.evaluate(lhs, scope);
        const rightVal = math.evaluate(rhs, scope);
        return (leftVal as number) - (rightVal as number);
      } catch { return NaN; }
    };

    const solutions: string[] = [];
    for (const x0 of [-10, -1, 0, 1, 10]) {
      let x = x0;
      for (let i = 0; i < 100; i++) {
        const fx = f(x);
        const fxh = f(x + 1e-8);
        const fpx = (fxh - fx) / 1e-8;
        if (Math.abs(fpx) < 1e-15) break;
        const xNew = x - fx / fpx;
        if (Math.abs(xNew - x) < 1e-10) {
          const rounded = parseFloat(xNew.toFixed(8));
          if (!solutions.some(s => Math.abs(parseFloat(s) - rounded) < 1e-6)) {
            solutions.push(rounded.toString());
            steps.push(`Found root near x₀=${x0}: x = ${rounded}`);
          }
          break;
        }
        x = xNew;
      }
    }

    if (solutions.length > 0) return { solutions, steps };
    steps.push('No roots found in search range');
    return { solutions: ['No solution found'], steps };
  } catch {
    return { solutions: ['Error'], steps: [...steps, 'Numerical method failed'] };
  }
}

// ============ NUMERICAL DERIVATIVE/INTEGRAL ============
function numericalDerivative(expr: string, x0: number): number {
  const h = 1e-8;
  try {
    const f = (x: number) => math.evaluate(expr, { x }) as number;
    return (f(x0 + h) - f(x0 - h)) / (2 * h);
  } catch { return NaN; }
}

function numericalIntegral(expr: string, a: number, b: number, n = 1000): number {
  try {
    const f = (x: number) => math.evaluate(expr, { x }) as number;
    const h = (b - a) / n;
    let sum = f(a) + f(b);
    for (let i = 1; i < n; i++) {
      sum += (i % 2 === 0 ? 2 : 4) * f(a + i * h);
    }
    return (h / 3) * sum;
  } catch { return NaN; }
}

// ============ MAIN COMPONENT ============
export default function MathSolver() {
  const { lang } = useLang();
  const [mode, setMode] = useState<MathMode>('derivative');
  const [expression, setExpression] = useState('');
  const [variable, setVariable] = useState('x');
  const [param1, setParam1] = useState('');
  const [param2, setParam2] = useState('');
  const [result, setResult] = useState<SolveResult | null>(null);
  const [history, setHistory] = useState<SolveResult[]>([]);

  const modes: { id: MathMode; icon: string; label: { en: string; fa: string } }[] = [
    { id: 'derivative', icon: '∂', label: { en: 'Derivative', fa: 'مشتق' } },
    { id: 'integral', icon: '∫', label: { en: 'Integral', fa: 'انتگرال' } },
    { id: 'equation', icon: '=', label: { en: 'Equation', fa: 'معادله' } },
    { id: 'limit', icon: 'lim', label: { en: 'Limit / Eval', fa: 'حد / مقدار' } },
    { id: 'polynomial', icon: 'xⁿ', label: { en: 'Polynomial', fa: 'چندجمله‌ای' } },
    { id: 'matrix', icon: '▦', label: { en: 'Matrix', fa: 'ماتریس' } },
  ];

  const solve = () => {
    if (!expression.trim()) return;

    let res: SolveResult;

    switch (mode) {
      case 'derivative': {
        const symbolic = symbolicDerivative(expression, variable);
        const numVal = param1 ? numericalDerivative(expression, parseFloat(param1)) : null;
        const steps = [...symbolic.steps];
        if (numVal !== null && !isNaN(numVal)) {
          steps.push(`At ${variable}=${param1}: f'(${param1}) = ${numVal.toFixed(8)}`);
        }
        res = {
          input: `d/d${variable} [${expression}]`,
          output: symbolic.result + (numVal !== null && !isNaN(numVal) ? `\nf'(${param1}) = ${numVal.toFixed(8)}` : ''),
          steps,
          type: 'derivative'
        };
        break;
      }
      case 'integral': {
        const symbolic = symbolicIntegral(expression, variable);
        const a = parseFloat(param1);
        const b = parseFloat(param2);
        const steps = [...symbolic.steps];
        if (!isNaN(a) && !isNaN(b)) {
          const numVal = numericalIntegral(expression, a, b);
          steps.push(`Definite integral [${a}, ${b}]:`);
          steps.push(`∫[${a},${b}] ${expression} d${variable} ≈ ${numVal.toFixed(8)}`);
          res = {
            input: `∫[${a},${b}] ${expression} d${variable}`,
            output: `${symbolic.result}\nDefinite: ${numVal.toFixed(8)}`,
            steps,
            type: 'integral'
          };
        } else {
          res = { input: `∫ ${expression} d${variable}`, output: symbolic.result, steps, type: 'integral' };
        }
        break;
      }
      case 'equation': {
        const { solutions, steps } = solveEquation(expression);
        res = {
          input: expression,
          output: solutions.join(', '),
          steps,
          type: 'equation'
        };
        break;
      }
      case 'limit': {
        try {
          const x0 = parseFloat(param1 || '0');
          const h = 1e-10;
          const f = (x: number) => math.evaluate(expression, { x, e: Math.E, pi: Math.PI }) as number;
          const left = f(x0 - h);
          const right = f(x0 + h);
          const val = f(x0);
          const steps = [
            `lim(${variable}→${x0}) [${expression}]`,
            `f(${x0}) = ${isNaN(val) || !isFinite(val) ? 'undefined' : val}`,
            `Left limit: f(${x0}⁻) ≈ ${left.toFixed(8)}`,
            `Right limit: f(${x0}⁺) ≈ ${right.toFixed(8)}`,
            Math.abs(left - right) < 1e-4 ? `Limit exists: ${((left + right) / 2).toFixed(8)}` : 'Limit does not exist (left ≠ right)'
          ];
          res = {
            input: `lim(${variable}→${x0}) ${expression}`,
            output: Math.abs(left - right) < 1e-4 ? ((left + right) / 2).toFixed(8) : 'DNE',
            steps,
            type: 'limit'
          };
        } catch {
          res = { input: expression, output: 'Error', steps: ['Evaluation failed'], type: 'limit' };
        }
        break;
      }
      case 'polynomial': {
        try {
          const coeffs = expression.split(',').map(Number);
          const steps = [`Polynomial: ${coeffs.map((c, i) => `${c}x^${coeffs.length - 1 - i}`).join(' + ')}`];
          // Find roots using companion matrix / Newton for small degree
          const roots: string[] = [];
          if (coeffs.length === 3) {
            const [a, b, c] = coeffs;
            const disc = b * b - 4 * a * c;
            steps.push(`Quadratic: a=${a}, b=${b}, c=${c}`);
            steps.push(`Δ = ${disc}`);
            if (disc >= 0) {
              roots.push(((-b + Math.sqrt(disc)) / (2 * a)).toFixed(6));
              roots.push(((-b - Math.sqrt(disc)) / (2 * a)).toFixed(6));
            } else {
              const re = -b / (2 * a); const im = Math.sqrt(-disc) / (2 * a);
              roots.push(`${re.toFixed(4)}+${im.toFixed(4)}i`, `${re.toFixed(4)}-${im.toFixed(4)}i`);
            }
          } else if (coeffs.length === 2) {
            roots.push((-coeffs[1] / coeffs[0]).toFixed(6));
          } else {
            steps.push('Using numerical method for higher degree...');
            const f = (x: number) => coeffs.reduce((sum, c, i) => sum + c * x ** (coeffs.length - 1 - i), 0);
            for (const x0 of [-10, -5, -1, 0, 1, 5, 10]) {
              let x = x0;
              for (let i = 0; i < 200; i++) {
                const fx = f(x);
                const fpx = (f(x + 1e-8) - f(x - 1e-8)) / 2e-8;
                if (Math.abs(fpx) < 1e-15) break;
                x -= fx / fpx;
                if (Math.abs(f(x)) < 1e-10) {
                  const r = parseFloat(x.toFixed(6));
                  if (!roots.some(rr => Math.abs(parseFloat(rr) - r) < 1e-4)) roots.push(r.toString());
                  break;
                }
              }
            }
          }
          steps.push(`Roots: ${roots.join(', ')}`);
          res = { input: `P(x) = ${expression}`, output: `Roots: ${roots.join(', ')}`, steps, type: 'polynomial' };
        } catch {
          res = { input: expression, output: 'Error', steps: ['Invalid coefficients'], type: 'polynomial' };
        }
        break;
      }
      case 'matrix': {
        try {
          const mat = math.evaluate(expression);
          const steps = [`Matrix: ${expression}`];
          let output = '';
          if (typeof mat === 'object' && 'size' in (mat as any)) {
            const m = mat as math.Matrix;
            const det = math.det(m);
            steps.push(`Determinant = ${det}`);
            output += `det = ${det}\n`;
            try {
              const inv = math.inv(m);
              steps.push(`Inverse exists`);
              output += `Inverse = ${math.format(inv, { precision: 4 })}`;
            } catch { steps.push('Singular (no inverse)'); output += 'Singular matrix'; }
          } else {
            output = String(mat);
          }
          res = { input: expression, output, steps, type: 'matrix' };
        } catch {
          res = { input: expression, output: 'Error', steps: ['Invalid matrix'], type: 'matrix' };
        }
        break;
      }
    }

    setResult(res);
    setHistory(prev => [res, ...prev].slice(0, 20));
  };

  const examples: Record<MathMode, string[]> = {
    derivative: ['x^3+2x^2-5x+1', 'sin(x)', 'e^x', 'ln(x)', '3x^4-2x^2', 'cos(2x)'],
    integral: ['x^2', '3x^3', 'sin(x)', 'e^x', '1/x', 'x^5+2x^3'],
    equation: ['x^2-5x+6=0', '2x+3=11', 'x^3-6x^2+11x-6=0', 'x^2+1=0', '3x^2-12=0'],
    limit: ['sin(x)/x', '(x^2-1)/(x-1)', 'e^x', '1/x', '(1+1/x)^x'],
    polynomial: ['1,-5,6', '1,0,-4', '1,-6,11,-6', '2,0,-8,0'],
    matrix: ['[[1,2],[3,4]]', '[[2,1,0],[1,3,1],[0,1,2]]', '[[1,0],[0,1]]'],
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-slate-800/60 backdrop-blur rounded-2xl border border-slate-700/50 overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border-b border-slate-700/40">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center text-xl">∫</div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {lang === 'fa' ? 'حل‌کننده ریاضی پیشرفته' : 'Advanced Math Solver'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'fa' ? 'مشتق • انتگرال • معادلات • ماتریس' : 'Derivatives • Integrals • Equations • Matrix'}
              </p>
            </div>
          </div>

          {/* Mode selector */}
          <div className="flex gap-1.5 overflow-x-auto">
            {modes.map(m => (
              <button key={m.id} onClick={() => { setMode(m.id); setResult(null); }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  mode === m.id ? 'bg-violet-500/20 text-violet-400' : 'text-slate-400 hover:bg-slate-700/30'
                }`}>
                <span className="font-mono text-sm">{m.icon}</span>
                <span>{m.label[lang]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Input */}
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">
                {mode === 'polynomial' ? (lang === 'fa' ? 'ضرایب (با کاما)' : 'Coefficients (comma-separated)') :
                 mode === 'matrix' ? (lang === 'fa' ? 'ماتریس مثل [[1,2],[3,4]]' : 'Matrix like [[1,2],[3,4]]') :
                 mode === 'equation' ? (lang === 'fa' ? 'معادله (مثل x^2-5x+6=0)' : 'Equation (e.g. x^2-5x+6=0)') :
                 (lang === 'fa' ? 'عبارت ریاضی' : 'Math Expression')}
              </label>
              <input value={expression} onChange={e => setExpression(e.target.value)}
                placeholder={examples[mode][0]}
                className="w-full bg-slate-900/60 text-white border border-slate-700/50 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                dir="ltr"
                onKeyDown={e => e.key === 'Enter' && solve()}
              />
            </div>

            <div className="flex gap-3">
              {(mode === 'derivative' || mode === 'integral' || mode === 'limit') && (
                <div className="w-20">
                  <label className="text-[10px] text-slate-500">{lang === 'fa' ? 'متغیر' : 'Variable'}</label>
                  <input value={variable} onChange={e => setVariable(e.target.value)}
                    className="w-full bg-slate-900/60 text-white border border-slate-700/50 rounded-lg px-2 py-1.5 text-sm font-mono" dir="ltr" />
                </div>
              )}
              {(mode === 'derivative' || mode === 'limit') && (
                <div className="flex-1">
                  <label className="text-[10px] text-slate-500">
                    {mode === 'derivative' ? (lang === 'fa' ? 'نقطه (اختیاری)' : 'Point (optional)') : (lang === 'fa' ? 'x →' : 'x →')}
                  </label>
                  <input value={param1} onChange={e => setParam1(e.target.value)} placeholder="0"
                    className="w-full bg-slate-900/60 text-white border border-slate-700/50 rounded-lg px-2 py-1.5 text-sm font-mono" dir="ltr" />
                </div>
              )}
              {mode === 'integral' && (
                <>
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-500">{lang === 'fa' ? 'حد پایین' : 'Lower'}</label>
                    <input value={param1} onChange={e => setParam1(e.target.value)} placeholder="a"
                      className="w-full bg-slate-900/60 text-white border border-slate-700/50 rounded-lg px-2 py-1.5 text-sm font-mono" dir="ltr" />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-500">{lang === 'fa' ? 'حد بالا' : 'Upper'}</label>
                    <input value={param2} onChange={e => setParam2(e.target.value)} placeholder="b"
                      className="w-full bg-slate-900/60 text-white border border-slate-700/50 rounded-lg px-2 py-1.5 text-sm font-mono" dir="ltr" />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Examples */}
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {examples[mode].map((ex, i) => (
              <button key={i} onClick={() => setExpression(ex)}
                className="flex-shrink-0 px-2.5 py-1 bg-slate-700/30 hover:bg-slate-700/60 text-slate-400 text-xs rounded-full font-mono transition-all border border-slate-700/30">
                {ex}
              </button>
            ))}
          </div>

          {/* Solve button */}
          <button onClick={solve}
            className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl py-3 font-semibold hover:from-violet-600 hover:to-fuchsia-600 transition-all active:scale-[0.99] shadow-lg shadow-violet-500/20">
            ⚡ {lang === 'fa' ? 'حل کن' : 'Solve'}
          </button>

          {/* Result */}
          {result && (
            <div className="space-y-3">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                <div className="text-xs text-emerald-400 mb-1">{lang === 'fa' ? 'نتیجه' : 'Result'}</div>
                <div className="text-lg font-bold text-white font-mono whitespace-pre-wrap" dir="ltr">{result.output}</div>
              </div>

              <div className="bg-slate-900/50 rounded-xl border border-slate-700/30 overflow-hidden">
                <div className="p-3 border-b border-slate-700/30">
                  <span className="text-xs text-slate-400 font-semibold">
                    📝 {lang === 'fa' ? 'مراحل حل' : 'Solution Steps'}
                  </span>
                </div>
                <div className="p-3 space-y-1.5">
                  {result.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                        i === result.steps.length - 1 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700/50 text-slate-400'
                      }`}>{i + 1}</span>
                      <span className={`text-sm font-mono ${
                        i === result.steps.length - 1 ? 'text-emerald-300 font-semibold' : 'text-slate-300'
                      }`} dir="ltr">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* History */}
          {history.length > 0 && (
            <div className="border-t border-slate-700/30 pt-3">
              <h4 className="text-xs text-slate-500 mb-2">📋 {lang === 'fa' ? 'تاریخچه' : 'History'}</h4>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {history.map((h, i) => (
                  <button key={i} onClick={() => setResult(h)}
                    className="w-full text-left p-2 rounded-lg bg-slate-900/30 hover:bg-slate-700/30 transition-all">
                    <div className="text-[10px] text-slate-500">{h.type}</div>
                    <div className="text-xs text-slate-300 font-mono truncate" dir="ltr">{h.input} → {h.output.split('\n')[0]}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
