import { useState, useRef, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  analysis?: SystemAnalysis | MathAnalysis | CircuitAnalysis | GeneralAnalysis;
}

interface SystemAnalysis {
  type: 'system';
  equation: string;
  systemType: 'IIR' | 'FIR' | 'unknown';
  isLinear: boolean | 'unknown';
  isTimeInvariant: boolean | 'unknown';
  isCausal: boolean | 'unknown';
  isStable: boolean | 'unknown';
  order: number;
  transferFunction?: string;
  poles?: string[];
  zeros?: string[];
  impulseResponse?: string;
  explanation: { en: string; fa: string };
}

interface MathAnalysis {
  type: 'math';
  expression: string;
  result: number | string;
  steps?: string[];
}

interface CircuitAnalysis {
  type: 'circuit';
  circuitType: string;
  components: string[];
  analysis: string;
}

interface GeneralAnalysis {
  type: 'general';
  topic: string;
  explanation: { en: string; fa: string };
}

// ==================== SYSTEM ANALYZER ====================
class SystemAnalyzer {
  
  // Parse difference equation
  static parseEquation(input: string): { 
    yCoeffs: { delay: number; coeff: number }[];
    xCoeffs: { delay: number; coeff: number }[];
    raw: string;
  } | null {
    const cleaned = input
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/\[n\]/g, '[k]')
      .replace(/\(n\)/g, '(k)')
      .replace(/n-/g, 'k-')
      .replace(/n\+/g, 'k+');

    const yCoeffs: { delay: number; coeff: number }[] = [];
    const xCoeffs: { delay: number; coeff: number }[] = [];

    // Split by = to get left and right sides
    const sides = cleaned.split('=');
    if (sides.length !== 2) return null;

    const parseTerms = (side: string, isOutput: boolean) => {
      const coeffs = isOutput ? yCoeffs : xCoeffs;
      const varName = isOutput ? 'y' : 'x';
      
      // Match patterns like: 2y[k-1], -3x[k], y[k+2], 0.5x[k-3]
      const patterns = [
        new RegExp(`([+-]?\\d*\\.?\\d*)${varName}\\[k([+-]\\d+)?\\]`, 'g'),
        new RegExp(`([+-]?\\d*\\.?\\d*)${varName}\\(k([+-]\\d+)?\\)`, 'g'),
      ];

      for (const pattern of patterns) {
        let match;
        while ((match = pattern.exec(side)) !== null) {
          let coeff = match[1];
          if (coeff === '' || coeff === '+') coeff = '1';
          if (coeff === '-') coeff = '-1';
          
          const delay = match[2] ? -parseInt(match[2]) : 0;
          coeffs.push({ delay, coeff: parseFloat(coeff) });
        }
      }
    };

    // Parse both sides
    parseTerms(sides[0], true);
    parseTerms(sides[0], false);
    parseTerms(sides[1], true);
    parseTerms(sides[1], false);

    // Move terms to correct sides (y on left, x on right)
    // This is simplified - assumes standard form

    return { yCoeffs, xCoeffs, raw: input };
  }

  // Determine if system is IIR or FIR
  static classifySystem(input: string): {
    type: 'IIR' | 'FIR' | 'unknown';
    reason: { en: string; fa: string };
  } {
    const cleaned = input.toLowerCase().replace(/\s+/g, '');
    
    // Check for y[k-n] terms (feedback)
    const hasFeedback = /y\[k-\d+\]|y\(k-\d+\)|y\[n-\d+\]|y\(n-\d+\)/.test(cleaned);
    const hasYDelayed = /y\[k[+-]\d|y\(k[+-]\d|y\[n[+-]\d|y\(n[+-]\d/.test(cleaned);
    
    // Check for recursive definition
    const hasRecursion = cleaned.includes('y[k-') || cleaned.includes('y(k-') ||
                         cleaned.includes('y[n-') || cleaned.includes('y(n-');
    
    // Check if it's pure feedforward (only x terms on right side)
    const sides = cleaned.split('=');
    if (sides.length === 2) {
      const rightSide = sides[1];
      const leftSide = sides[0];
      
      // If right side has no y terms with delay, it's FIR
      const rightHasYDelay = /y\[k-|y\(k-|y\[n-|y\(n-/.test(rightSide);
      const leftHasYDelay = /y\[k-|y\(k-|y\[n-|y\(n-/.test(leftSide);
      
      if (!rightHasYDelay && !leftHasYDelay) {
        return {
          type: 'FIR',
          reason: {
            en: 'No feedback (y[k-n]) terms found. System only depends on current and past inputs.',
            fa: 'هیچ ترم بازخوردی (y[k-n]) یافت نشد. سیستم فقط به ورودی‌های فعلی و گذشته وابسته است.'
          }
        };
      }
    }

    if (hasFeedback || hasYDelayed || hasRecursion) {
      return {
        type: 'IIR',
        reason: {
          en: 'Contains feedback terms (y[k-n]). System has infinite impulse response due to recursion.',
          fa: 'شامل ترم‌های بازخورد (y[k-n]) است. سیستم به دلیل بازگشتی بودن، پاسخ ضربه نامتناهی دارد.'
        }
      };
    }

    return {
      type: 'FIR',
      reason: {
        en: 'No feedback terms detected. System has finite impulse response.',
        fa: 'هیچ ترم بازخوردی تشخیص داده نشد. سیستم پاسخ ضربه متناهی دارد.'
      }
    };
  }

  // Check linearity
  static checkLinearity(input: string): { isLinear: boolean; reason: { en: string; fa: string } } {
    const cleaned = input.toLowerCase();
    
    // Non-linear indicators
    const nonLinearPatterns = [
      /y\^2|y²|y\*y|y\s*\*\s*y/,  // y squared
      /x\^2|x²|x\*x|x\s*\*\s*x/,  // x squared
      /sin\(|cos\(|tan\(/,         // trig functions of signal
      /log\(|ln\(/,                // logarithm
      /sqrt\(|√/,                  // square root
      /\|y\||abs\(y\)/,            // absolute value
      /y\s*\*\s*x|x\s*\*\s*y/,     // product of input and output
      /e\^y|e\^x/,                 // exponential
    ];

    for (const pattern of nonLinearPatterns) {
      if (pattern.test(cleaned)) {
        return {
          isLinear: false,
          reason: {
            en: 'Non-linear operation detected (power, trig, log, or product of signals)',
            fa: 'عملیات غیرخطی تشخیص داده شد (توان، مثلثاتی، لگاریتم، یا ضرب سیگنال‌ها)'
          }
        };
      }
    }

    return {
      isLinear: true,
      reason: {
        en: 'System appears linear: satisfies superposition (additivity and homogeneity)',
        fa: 'سیستم خطی به نظر می‌رسد: خاصیت جمع‌پذیری و همگنی برقرار است'
      }
    };
  }

  // Check time invariance
  static checkTimeInvariance(input: string): { isTimeInvariant: boolean; reason: { en: string; fa: string } } {
    const cleaned = input.toLowerCase();
    
    // Time-variant indicators
    const timeVariantPatterns = [
      /\dk\s*\*|k\s*\*\s*[xy]/,    // k multiplied by signal (e.g., k*x[k])
      /n\s*\*\s*[xy]|[xy]\s*\*\s*n/, // n multiplied by signal
      /\(\-1\)\^k|\(-1\)\^n/,      // (-1)^k or (-1)^n
      /cos\(k\)|sin\(k\)|cos\(n\)|sin\(n\)/, // time-varying coefficient
      /2\^k|2\^n/,                 // exponential time-varying
    ];

    for (const pattern of timeVariantPatterns) {
      if (pattern.test(cleaned)) {
        return {
          isTimeInvariant: false,
          reason: {
            en: 'Time-variant: coefficients depend on time index k (or n)',
            fa: 'متغیر با زمان: ضرایب به شاخص زمانی k (یا n) وابسته‌اند'
          }
        };
      }
    }

    return {
      isTimeInvariant: true,
      reason: {
        en: 'Time-invariant: shift in input causes same shift in output',
        fa: 'نامتغیر با زمان: شیفت در ورودی باعث همان شیفت در خروجی می‌شود'
      }
    };
  }

  // Check causality
  static checkCausality(input: string): { isCausal: boolean; reason: { en: string; fa: string } } {
    const cleaned = input.toLowerCase().replace(/\s+/g, '');
    
    // Look for future terms: x[k+n] or y[k+n] where n > 0
    const futurePattern = /[xy]\[k\+\d+\]|[xy]\(k\+\d+\)|[xy]\[n\+\d+\]|[xy]\(n\+\d+\)/;
    
    if (futurePattern.test(cleaned)) {
      return {
        isCausal: false,
        reason: {
          en: 'Non-causal: depends on future values (k+n terms found)',
          fa: 'غیرعلّی: به مقادیر آینده وابسته است (ترم‌های k+n یافت شد)'
        }
      };
    }

    return {
      isCausal: true,
      reason: {
        en: 'Causal: output depends only on present and past inputs',
        fa: 'علّی: خروجی فقط به ورودی‌های حال و گذشته وابسته است'
      }
    };
  }

  // Estimate system order
  static getOrder(input: string): number {
    const cleaned = input.toLowerCase().replace(/\s+/g, '');
    
    let maxOrder = 0;
    
    // Find maximum delay in y terms
    const yDelays = cleaned.match(/y\[k-(\d+)\]|y\(k-(\d+)\)/g) || [];
    for (const match of yDelays) {
      const num = match.match(/\d+/);
      if (num) {
        maxOrder = Math.max(maxOrder, parseInt(num[0]));
      }
    }

    return maxOrder;
  }

  // Get transfer function (simplified)
  static getTransferFunction(input: string, systemType: 'IIR' | 'FIR'): string {
    const order = this.getOrder(input);
    
    if (systemType === 'FIR') {
      return `H(z) = b₀ + b₁z⁻¹ + ... + bₘz⁻ᴹ`;
    } else {
      return `H(z) = (b₀ + b₁z⁻¹ + ...)/(1 + a₁z⁻¹ + ... + a${order}z⁻${order})`;
    }
  }

  // Full system analysis
  static analyzeSystem(input: string): SystemAnalysis {
    const classification = this.classifySystem(input);
    const linearity = this.checkLinearity(input);
    const timeInvariance = this.checkTimeInvariance(input);
    const causality = this.checkCausality(input);
    const order = this.getOrder(input);
    const transferFunction = classification.type !== 'unknown' 
      ? this.getTransferFunction(input, classification.type) 
      : '';

    let explanation = {
      en: `**System Type: ${classification.type}**\n\n`,
      fa: `**نوع سیستم: ${classification.type === 'IIR' ? 'IIR (پاسخ ضربه نامتناهی)' : 'FIR (پاسخ ضربه متناهی)'}**\n\n`
    };

    explanation.en += `• ${classification.reason.en}\n`;
    explanation.fa += `• ${classification.reason.fa}\n`;

    explanation.en += `• Order: ${order}\n`;
    explanation.fa += `• مرتبه: ${order}\n`;

    explanation.en += `• Linear: ${linearity.isLinear ? 'Yes ✓' : 'No ✗'} - ${linearity.reason.en}\n`;
    explanation.fa += `• خطی: ${linearity.isLinear ? 'بله ✓' : 'خیر ✗'} - ${linearity.reason.fa}\n`;

    explanation.en += `• Time-Invariant: ${timeInvariance.isTimeInvariant ? 'Yes ✓' : 'No ✗'} - ${timeInvariance.reason.en}\n`;
    explanation.fa += `• نامتغیر با زمان: ${timeInvariance.isTimeInvariant ? 'بله ✓' : 'خیر ✗'} - ${timeInvariance.reason.fa}\n`;

    explanation.en += `• Causal: ${causality.isCausal ? 'Yes ✓' : 'No ✗'} - ${causality.reason.en}\n`;
    explanation.fa += `• علّی: ${causality.isCausal ? 'بله ✓' : 'خیر ✗'} - ${causality.reason.fa}\n`;

    if (classification.type === 'IIR') {
      explanation.en += `\n**Note:** IIR systems have infinite impulse response because output feeds back into the system. They can be unstable if poles are outside the unit circle.`;
      explanation.fa += `\n**نکته:** سیستم‌های IIR پاسخ ضربه نامتناهی دارند چون خروجی به سیستم بازخورد می‌شود. اگر قطب‌ها خارج دایره واحد باشند، می‌توانند ناپایدار باشند.`;
    } else {
      explanation.en += `\n**Note:** FIR systems are always stable and have linear phase response. They have no poles (except at z=0).`;
      explanation.fa += `\n**نکته:** سیستم‌های FIR همیشه پایدار هستند و پاسخ فاز خطی دارند. هیچ قطبی ندارند (به جز در z=0).`;
    }

    return {
      type: 'system',
      equation: input,
      systemType: classification.type,
      isLinear: linearity.isLinear,
      isTimeInvariant: timeInvariance.isTimeInvariant,
      isCausal: causality.isCausal,
      isStable: classification.type === 'FIR' ? true : 'unknown',
      order,
      transferFunction,
      explanation
    };
  }
}

// ==================== KNOWLEDGE BASE ====================
const knowledgeBase: Record<string, { en: string; fa: string; keywords: string[] }> = {
  iir_fir: {
    keywords: ['iir', 'fir', 'تفاوت', 'difference', 'مقایسه', 'compare'],
    en: `**IIR vs FIR Filters:**

**FIR (Finite Impulse Response):**
• Impulse response has finite duration
• No feedback (only feedforward)
• Always stable
• Linear phase possible
• Form: y[n] = Σ bₖ·x[n-k]
• Example: y[n] = x[n] + x[n-1] + x[n-2]

**IIR (Infinite Impulse Response):**
• Impulse response is infinite
• Has feedback (recursive)
• Can be unstable
• Non-linear phase
• Form: y[n] = Σ bₖ·x[n-k] - Σ aₖ·y[n-k]
• Example: y[n] = x[n] + 0.5·y[n-1]

**How to identify:**
- If equation has y[n-k] terms on right side → IIR
- If equation only has x[n-k] terms → FIR`,
    fa: `**مقایسه فیلترهای IIR و FIR:**

**FIR (پاسخ ضربه متناهی):**
• پاسخ ضربه مدت محدود دارد
• بدون بازخورد (فقط پیش‌خور)
• همیشه پایدار
• فاز خطی ممکن است
• فرم: y[n] = Σ bₖ·x[n-k]
• مثال: y[n] = x[n] + x[n-1] + x[n-2]

**IIR (پاسخ ضربه نامتناهی):**
• پاسخ ضربه نامتناهی است
• دارای بازخورد (بازگشتی)
• می‌تواند ناپایدار باشد
• فاز غیرخطی
• فرم: y[n] = Σ bₖ·x[n-k] - Σ aₖ·y[n-k]
• مثال: y[n] = x[n] + 0.5·y[n-1]

**تشخیص:**
- اگر معادله ترم y[n-k] در سمت راست دارد ← IIR
- اگر فقط ترم x[n-k] دارد ← FIR`
  },

  stability: {
    keywords: ['پایداری', 'stability', 'stable', 'پایدار', 'ناپایدار', 'unstable', 'bibo'],
    en: `**System Stability:**

**BIBO Stability:** Bounded Input → Bounded Output

**For Discrete-Time Systems:**
• System is stable if all poles are inside unit circle (|z| < 1)
• FIR systems are always stable (no poles)
• IIR systems need pole analysis

**For Continuous-Time Systems:**
• System is stable if all poles are in left half of s-plane (Re(s) < 0)

**Checking Stability:**
1. Find transfer function H(z) or H(s)
2. Find poles (roots of denominator)
3. Check pole locations

**Routh-Hurwitz Criterion:** For continuous systems
**Jury Stability Test:** For discrete systems`,
    fa: `**پایداری سیستم:**

**پایداری BIBO:** ورودی محدود ← خروجی محدود

**برای سیستم‌های گسسته:**
• سیستم پایدار است اگر همه قطب‌ها داخل دایره واحد باشند (|z| < 1)
• سیستم‌های FIR همیشه پایدارند (بدون قطب)
• سیستم‌های IIR نیاز به بررسی قطب دارند

**برای سیستم‌های پیوسته:**
• سیستم پایدار است اگر همه قطب‌ها در نیم‌صفحه چپ s باشند (Re(s) < 0)

**بررسی پایداری:**
1. تابع تبدیل H(z) یا H(s) را بیابید
2. قطب‌ها (ریشه‌های مخرج) را پیدا کنید
3. مکان قطب‌ها را بررسی کنید

**معیار روث-هرویتز:** برای سیستم‌های پیوسته
**آزمون پایداری ژوری:** برای سیستم‌های گسسته`
  },

  z_transform: {
    keywords: ['تبدیل z', 'z transform', 'z-transform', 'زد ترنسفورم'],
    en: `**Z-Transform:**

**Definition:** X(z) = Σ x[n]·z⁻ⁿ (sum from n=-∞ to ∞)

**Common Pairs:**
• δ[n] ↔ 1
• u[n] ↔ z/(z-1)
• aⁿu[n] ↔ z/(z-a)
• n·aⁿu[n] ↔ az/(z-a)²
• cos(ω₀n)u[n] ↔ z(z-cos(ω₀))/(z²-2cos(ω₀)z+1)

**Properties:**
• Linearity: ax[n]+by[n] ↔ aX(z)+bY(z)
• Time shift: x[n-k] ↔ z⁻ᵏX(z)
• Convolution: x[n]*h[n] ↔ X(z)·H(z)

**Region of Convergence (ROC):**
• Causal signals: ROC is outside a circle
• Anti-causal: ROC is inside a circle`,
    fa: `**تبدیل Z:**

**تعریف:** X(z) = Σ x[n]·z⁻ⁿ (مجموع از n=-∞ تا ∞)

**جفت‌های معروف:**
• δ[n] ↔ 1
• u[n] ↔ z/(z-1)
• aⁿu[n] ↔ z/(z-a)
• n·aⁿu[n] ↔ az/(z-a)²
• cos(ω₀n)u[n] ↔ z(z-cos(ω₀))/(z²-2cos(ω₀)z+1)

**خواص:**
• خطی بودن: ax[n]+by[n] ↔ aX(z)+bY(z)
• شیفت زمانی: x[n-k] ↔ z⁻ᵏX(z)
• کانولوشن: x[n]*h[n] ↔ X(z)·H(z)

**ناحیه همگرایی (ROC):**
• سیگنال‌های علّی: ROC خارج یک دایره
• ضدعلّی: ROC داخل یک دایره`
  },

  laplace: {
    keywords: ['لاپلاس', 'laplace', 'تبدیل لاپلاس'],
    en: `**Laplace Transform:**

**Definition:** X(s) = ∫ x(t)·e⁻ˢᵗ dt (from 0 to ∞)

**Common Pairs:**
• δ(t) ↔ 1
• u(t) ↔ 1/s
• e⁻ᵃᵗu(t) ↔ 1/(s+a)
• t·u(t) ↔ 1/s²
• sin(ωt)u(t) ↔ ω/(s²+ω²)
• cos(ωt)u(t) ↔ s/(s²+ω²)

**Properties:**
• Linearity: af(t)+bg(t) ↔ aF(s)+bG(s)
• Differentiation: f'(t) ↔ sF(s)-f(0)
• Integration: ∫f(t)dt ↔ F(s)/s
• Time shift: f(t-a)u(t-a) ↔ e⁻ᵃˢF(s)`,
    fa: `**تبدیل لاپلاس:**

**تعریف:** X(s) = ∫ x(t)·e⁻ˢᵗ dt (از 0 تا ∞)

**جفت‌های معروف:**
• δ(t) ↔ 1
• u(t) ↔ 1/s
• e⁻ᵃᵗu(t) ↔ 1/(s+a)
• t·u(t) ↔ 1/s²
• sin(ωt)u(t) ↔ ω/(s²+ω²)
• cos(ωt)u(t) ↔ s/(s²+ω²)

**خواص:**
• خطی بودن: af(t)+bg(t) ↔ aF(s)+bG(s)
• مشتق‌گیری: f'(t) ↔ sF(s)-f(0)
• انتگرال‌گیری: ∫f(t)dt ↔ F(s)/s
• شیفت زمانی: f(t-a)u(t-a) ↔ e⁻ᵃˢF(s)`
  },

  fourier: {
    keywords: ['فوریه', 'fourier', 'dft', 'fft', 'تبدیل فوریه'],
    en: `**Fourier Transform:**

**Continuous-Time Fourier Transform (CTFT):**
X(ω) = ∫ x(t)·e⁻ʲωᵗ dt

**Discrete-Time Fourier Transform (DTFT):**
X(eʲω) = Σ x[n]·e⁻ʲωⁿ

**Discrete Fourier Transform (DFT):**
X[k] = Σ x[n]·e⁻ʲ²πkn/N (n=0 to N-1)

**FFT:** Fast algorithm for computing DFT in O(N log N)

**Properties:**
• Parseval's theorem: Energy in time = Energy in frequency
• Convolution ↔ Multiplication
• Shift → Phase change`,
    fa: `**تبدیل فوریه:**

**تبدیل فوریه پیوسته (CTFT):**
X(ω) = ∫ x(t)·e⁻ʲωᵗ dt

**تبدیل فوریه گسسته-زمان (DTFT):**
X(eʲω) = Σ x[n]·e⁻ʲωⁿ

**تبدیل فوریه گسسته (DFT):**
X[k] = Σ x[n]·e⁻ʲ²πkn/N (n=0 تا N-1)

**FFT:** الگوریتم سریع محاسبه DFT با O(N log N)

**خواص:**
• قضیه پارسوال: انرژی در زمان = انرژی در فرکانس
• کانولوشن ↔ ضرب
• شیفت → تغییر فاز`
  },

  convolution: {
    keywords: ['کانولوشن', 'convolution', 'پیچش', 'کانولوشن'],
    en: `**Convolution:**

**Continuous:** y(t) = x(t) * h(t) = ∫ x(τ)·h(t-τ) dτ

**Discrete:** y[n] = x[n] * h[n] = Σ x[k]·h[n-k]

**Properties:**
• Commutative: x*h = h*x
• Associative: (x*h)*g = x*(h*g)
• Distributive: x*(h+g) = x*h + x*g

**Output Length:**
If x has N samples and h has M samples:
y has N+M-1 samples

**Circular Convolution:**
Used in DFT: y[n] = Σ x[k]·h[(n-k) mod N]`,
    fa: `**کانولوشن (پیچش):**

**پیوسته:** y(t) = x(t) * h(t) = ∫ x(τ)·h(t-τ) dτ

**گسسته:** y[n] = x[n] * h[n] = Σ x[k]·h[n-k]

**خواص:**
• جابجایی: x*h = h*x
• شرکت‌پذیری: (x*h)*g = x*(h*g)
• توزیع‌پذیری: x*(h+g) = x*h + x*g

**طول خروجی:**
اگر x دارای N نمونه و h دارای M نمونه:
y دارای N+M-1 نمونه است

**کانولوشن دایره‌ای:**
در DFT استفاده می‌شود: y[n] = Σ x[k]·h[(n-k) mod N]`
  },

  sampling: {
    keywords: ['نمونه‌برداری', 'sampling', 'nyquist', 'نایکوئیست', 'aliasing', 'آلیاسینگ'],
    en: `**Sampling Theorem (Nyquist):**

**Condition:** fs ≥ 2·fmax (sampling freq ≥ 2× max signal freq)

**Nyquist Frequency:** fN = fs/2

**Aliasing:** When fs < 2·fmax, high frequencies fold back

**Anti-Aliasing Filter:** Low-pass filter before sampling

**Reconstruction:**
• Ideal: sinc interpolation
• Practical: Zero-order hold, linear interpolation

**Oversampling:** Sampling at rate higher than Nyquist`,
    fa: `**قضیه نمونه‌برداری (نایکوئیست):**

**شرط:** fs ≥ 2·fmax (فرکانس نمونه‌برداری ≥ 2× حداکثر فرکانس سیگنال)

**فرکانس نایکوئیست:** fN = fs/2

**آلیاسینگ:** وقتی fs < 2·fmax، فرکانس‌های بالا تاخورده می‌شوند

**فیلتر ضد آلیاسینگ:** فیلتر پایین‌گذر قبل از نمونه‌برداری

**بازسازی:**
• ایده‌آل: درون‌یابی sinc
• عملی: نگهدارنده مرتبه صفر، درون‌یابی خطی

**بیش‌نمونه‌برداری:** نمونه‌برداری با نرخ بالاتر از نایکوئیست`
  },

  transfer_function: {
    keywords: ['تابع تبدیل', 'transfer function', 'h(s)', 'h(z)'],
    en: `**Transfer Function:**

**Definition:** H(s) = Y(s)/X(s) or H(z) = Y(z)/X(z)

**General Form:**
H(s) = (bₘsᵐ + ... + b₁s + b₀)/(aₙsⁿ + ... + a₁s + a₀)

**Poles:** Roots of denominator (affect stability)
**Zeros:** Roots of numerator (affect frequency response)

**Frequency Response:**
• Continuous: H(jω) - substitute s = jω
• Discrete: H(eʲω) - substitute z = eʲω

**Bode Plot:** Magnitude and phase vs frequency (log scale)`,
    fa: `**تابع تبدیل:**

**تعریف:** H(s) = Y(s)/X(s) یا H(z) = Y(z)/X(z)

**فرم کلی:**
H(s) = (bₘsᵐ + ... + b₁s + b₀)/(aₙsⁿ + ... + a₁s + a₀)

**قطب‌ها:** ریشه‌های مخرج (بر پایداری تأثیر دارند)
**صفرها:** ریشه‌های صورت (بر پاسخ فرکانسی تأثیر دارند)

**پاسخ فرکانسی:**
• پیوسته: H(jω) - جایگذاری s = jω
• گسسته: H(eʲω) - جایگذاری z = eʲω

**نمودار بود:** دامنه و فاز بر حسب فرکانس (مقیاس لگاریتمی)`
  },

  lti_system: {
    keywords: ['lti', 'خطی', 'نامتغیر', 'linear', 'time invariant', 'سیستم خطی'],
    en: `**LTI Systems (Linear Time-Invariant):**

**Linearity:**
• Superposition: T{ax₁ + bx₂} = aT{x₁} + bT{x₂}
• Additivity + Homogeneity

**Time-Invariance:**
• Shift in input → Same shift in output
• T{x(t-τ)} = y(t-τ)

**Properties of LTI:**
• Fully characterized by impulse response h(t)
• Output = Input * Impulse Response
• y(t) = x(t) * h(t)

**Examples:**
• LTI: y[n] = 2x[n] + 3x[n-1]
• Non-LTI: y[n] = x²[n] (non-linear)
• Non-LTI: y[n] = n·x[n] (time-variant)`,
    fa: `**سیستم‌های LTI (خطی نامتغیر با زمان):**

**خطی بودن:**
• جمع‌پذیری: T{ax₁ + bx₂} = aT{x₁} + bT{x₂}
• جمع‌پذیری + همگنی

**نامتغیر با زمان:**
• شیفت در ورودی → همان شیفت در خروجی
• T{x(t-τ)} = y(t-τ)

**خواص LTI:**
• کاملاً با پاسخ ضربه h(t) مشخص می‌شود
• خروجی = ورودی * پاسخ ضربه
• y(t) = x(t) * h(t)

**مثال‌ها:**
• LTI: y[n] = 2x[n] + 3x[n-1]
• غیر-LTI: y[n] = x²[n] (غیرخطی)
• غیر-LTI: y[n] = n·x[n] (متغیر با زمان)`
  },
  
  pid: {
    keywords: ['pid', 'کنترل', 'controller', 'کنترلر'],
    en: `**PID Controller:**

**Formula:** u(t) = Kp·e(t) + Ki·∫e(t)dt + Kd·de/dt

**Components:**
• P (Proportional): Kp·e - Responds to current error
• I (Integral): Ki·∫e - Eliminates steady-state error
• D (Derivative): Kd·de/dt - Predicts future error

**Transfer Function:** G(s) = Kp + Ki/s + Kd·s

**Tuning Methods:**
• Ziegler-Nichols
• Cohen-Coon
• Trial and error

**Effects:**
• ↑Kp: Faster response, more overshoot
• ↑Ki: Eliminates error, can cause oscillation
• ↑Kd: Reduces overshoot, sensitive to noise`,
    fa: `**کنترلر PID:**

**فرمول:** u(t) = Kp·e(t) + Ki·∫e(t)dt + Kd·de/dt

**اجزا:**
• P (تناسبی): Kp·e - پاسخ به خطای فعلی
• I (انتگرالی): Ki·∫e - حذف خطای حالت ماندگار
• D (مشتقی): Kd·de/dt - پیش‌بینی خطای آینده

**تابع تبدیل:** G(s) = Kp + Ki/s + Kd·s

**روش‌های تنظیم:**
• زیگلر-نیکولز
• کوهن-کون
• آزمون و خطا

**اثرات:**
• ↑Kp: پاسخ سریع‌تر، فراجهش بیشتر
• ↑Ki: حذف خطا، ممکن است نوسان ایجاد کند
• ↑Kd: کاهش فراجهش، حساس به نویز`
  },

  bode: {
    keywords: ['bode', 'بود', 'نمودار بود', 'فرکانس'],
    en: `**Bode Plot:**

**Components:**
• Magnitude plot: 20log|H(jω)| vs log(ω) [dB]
• Phase plot: ∠H(jω) vs log(ω) [degrees]

**Rules for sketching:**
• Constant K: 20log(K) dB, 0° phase
• Zero at origin (s): +20 dB/decade, +90°
• Pole at origin (1/s): -20 dB/decade, -90°
• Zero at s=-a: +20 dB/dec after ω=a
• Pole at s=-a: -20 dB/dec after ω=a

**Gain Margin:** How much gain can increase before instability
**Phase Margin:** How much phase can decrease before instability`,
    fa: `**نمودار بود:**

**اجزا:**
• نمودار دامنه: 20log|H(jω)| بر حسب log(ω) [dB]
• نمودار فاز: ∠H(jω) بر حسب log(ω) [درجه]

**قواعد رسم:**
• ثابت K: 20log(K) dB، فاز 0°
• صفر در مبدأ (s): +20 dB/دهه، +90°
• قطب در مبدأ (1/s): -20 dB/دهه، -90°
• صفر در s=-a: +20 dB/دهه بعد از ω=a
• قطب در s=-a: -20 dB/دهه بعد از ω=a

**حاشیه بهره:** چقدر می‌توان بهره را افزایش داد قبل از ناپایداری
**حاشیه فاز:** چقدر می‌توان فاز را کاهش داد قبل از ناپایداری`
  }
};

// ==================== SMART ANALYZER COMPONENT ====================
export default function SmartAnalyzer() {
  const { lang } = useLang();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      type: 'ai',
      content: lang === 'fa' 
        ? `🧠 **دستیار هوشمند سیگنال و سیستم**

من می‌توانم:
• معادلات تفاضلی را تحلیل کنم (IIR/FIR، خطی، علّی، پایدار)
• مفاهیم را توضیح دهم (تبدیل Z، لاپلاس، فوریه، ...)
• سوالات مهندسی پاسخ دهم

**مثال‌ها:**
• "y[k] + 2y[k-1] + y[k-2] = x[k] + x[k-1]"
• "تفاوت IIR و FIR چیست؟"
• "تبدیل لاپلاس را توضیح بده"
• "این سیستم پایدار است؟ y[n] = 0.5y[n-1] + x[n]"`
        : `🧠 **Smart Signal & System Assistant**

I can:
• Analyze difference equations (IIR/FIR, linear, causal, stable)
• Explain concepts (Z-transform, Laplace, Fourier, ...)
• Answer engineering questions

**Examples:**
• "y[k] + 2y[k-1] + y[k-2] = x[k] + x[k-1]"
• "What's the difference between IIR and FIR?"
• "Explain Laplace transform"
• "Is this system stable? y[n] = 0.5y[n-1] + x[n]"`
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Detect if input is a system equation
  const isSystemEquation = (text: string): boolean => {
    const patterns = [
      /y\[.*\]\s*[+=]/,
      /y\(.*\)\s*[+=]/,
      /=.*x\[/,
      /=.*x\(/,
      /y\[k|y\[n|y\(k|y\(n/i,
    ];
    return patterns.some(p => p.test(text));
  };

  // Find relevant knowledge base entry
  const findKnowledge = (text: string): { en: string; fa: string } | null => {
    const lowerText = text.toLowerCase();
    
    for (const [, value] of Object.entries(knowledgeBase)) {
      for (const keyword of value.keywords) {
        if (lowerText.includes(keyword.toLowerCase())) {
          return { en: value.en, fa: value.fa };
        }
      }
    }
    return null;
  };

  // Process user message
  const processMessage = async (userMessage: string) => {
    const userMsg: Message = {
      id: Date.now(),
      type: 'user',
      content: userMessage,
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    setInput('');

    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));

    let aiResponse: Message;

    // Check if it's a system equation
    if (isSystemEquation(userMessage)) {
      const analysis = SystemAnalyzer.analyzeSystem(userMessage);
      
      aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: analysis.explanation[lang],
        analysis
      };
    } 
    // Check knowledge base
    else {
      const knowledge = findKnowledge(userMessage);
      
      if (knowledge) {
        aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: knowledge[lang],
        };
      } else {
        // Default response
        aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: lang === 'fa'
            ? `🤔 متوجه سوال شما نشدم. می‌توانید:

• یک معادله تفاضلی وارد کنید:
  مثال: y[n] = x[n] + 0.5y[n-1]

• درباره مفاهیم بپرسید:
  - تفاوت IIR و FIR
  - تبدیل Z یا لاپلاس
  - پایداری سیستم
  - نمونه‌برداری و نایکوئیست
  - کنترلر PID
  - نمودار بود`
            : `🤔 I didn't understand your question. You can:

• Enter a difference equation:
  Example: y[n] = x[n] + 0.5y[n-1]

• Ask about concepts:
  - IIR vs FIR difference
  - Z or Laplace transform
  - System stability
  - Sampling and Nyquist
  - PID controller
  - Bode plot`,
        };
      }
    }

    setIsTyping(false);
    setMessages(prev => [...prev, aiResponse]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      processMessage(input.trim());
    }
  };

  const quickExamples = lang === 'fa' ? [
    'y[k] + 2y[k-1] = x[k]',
    'y[n] = x[n] + x[n-1] + x[n-2]',
    'تفاوت IIR و FIR',
    'تبدیل Z',
    'پایداری سیستم',
    'کنترلر PID',
  ] : [
    'y[k] + 2y[k-1] = x[k]',
    'y[n] = x[n] + x[n-1] + x[n-2]',
    'IIR vs FIR difference',
    'Z transform',
    'System stability',
    'PID controller',
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-800/60 backdrop-blur rounded-2xl border border-slate-700/50 overflow-hidden flex flex-col h-[650px]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-slate-700/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-xl">🧠</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {lang === 'fa' ? 'تحلیلگر هوشمند سیستم' : 'Smart System Analyzer'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'fa' ? 'تشخیص IIR/FIR • تحلیل پایداری • توضیح مفاهیم' : 'IIR/FIR Detection • Stability Analysis • Concept Explanation'}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[90%] rounded-2xl px-4 py-3 ${
                  msg.type === 'user'
                    ? 'bg-blue-500 text-white rounded-br-md'
                    : 'bg-slate-700/80 text-slate-200 rounded-bl-md'
                }`}
              >
                {/* System Analysis Badge */}
                {msg.analysis?.type === 'system' && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      msg.analysis.systemType === 'IIR' 
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' 
                        : 'bg-green-500/20 text-green-400 border border-green-500/30'
                    }`}>
                      {msg.analysis.systemType}
                    </span>
                    {msg.analysis.isLinear && (
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        {lang === 'fa' ? 'خطی' : 'Linear'}
                      </span>
                    )}
                    {msg.analysis.isCausal && (
                      <span className="px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30">
                        {lang === 'fa' ? 'علّی' : 'Causal'}
                      </span>
                    )}
                    {msg.analysis.isTimeInvariant && (
                      <span className="px-2 py-1 rounded-full text-xs bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                        {lang === 'fa' ? 'LTI' : 'Time-Inv'}
                      </span>
                    )}
                    <span className="px-2 py-1 rounded-full text-xs bg-slate-500/20 text-slate-400 border border-slate-500/30">
                      {lang === 'fa' ? `مرتبه ${msg.analysis.order}` : `Order ${msg.analysis.order}`}
                    </span>
                  </div>
                )}

                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                  {msg.content.split('**').map((part, i) => 
                    i % 2 === 1 ? <strong key={i} className="text-white">{part}</strong> : part
                  )}
                </div>

                {/* Transfer Function */}
                {msg.analysis?.type === 'system' && msg.analysis.transferFunction && (
                  <div className="mt-3 p-2 bg-slate-900/50 rounded-lg">
                    <div className="text-xs text-slate-400 mb-1">
                      {lang === 'fa' ? 'تابع تبدیل:' : 'Transfer Function:'}
                    </div>
                    <div className="font-mono text-sm text-cyan-300" dir="ltr">
                      {msg.analysis.transferFunction}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-700/80 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Examples */}
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickExamples.map((example, idx) => (
              <button
                key={idx}
                onClick={() => setInput(example)}
                className="flex-shrink-0 px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700/80 text-slate-300 text-xs rounded-full transition-all whitespace-nowrap border border-slate-600/30"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700/40">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={lang === 'fa' ? 'معادله یا سوال خود را وارد کنید...' : 'Enter equation or question...'}
              className="flex-1 bg-slate-900/60 text-white border border-slate-700/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              dir="auto"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold text-sm hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {lang === 'fa' ? 'تحلیل' : 'Analyze'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
