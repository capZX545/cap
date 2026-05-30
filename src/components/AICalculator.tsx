import { useState, useRef, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import { allFormulas as formulas, type Formula } from '../data/formulas';
import * as math from 'mathjs';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  formula?: Formula;
  result?: {
    value: number;
    variable: string;
    inputs: Record<string, number>;
  };
  error?: boolean;
}

// Keywords for detecting variables and formulas
const variableKeywords: Record<string, string[]> = {
  // Physics - Mechanics
  'F': ['force', 'نیرو', 'نیروی', 'f'],
  'm': ['mass', 'جرم', 'وزن', 'kg', 'کیلوگرم'],
  'a': ['acceleration', 'شتاب', 'شتابش'],
  'v': ['velocity', 'speed', 'سرعت', 'سرعتش'],
  'v0': ['initial velocity', 'سرعت اولیه', 'v0', 'اولیه'],
  't': ['time', 'زمان', 'ثانیه', 'second', 'sec', 's'],
  's': ['displacement', 'distance', 'جابجایی', 'فاصله', 'مسافت'],
  'p': ['momentum', 'تکانه'],
  'KE': ['kinetic energy', 'انرژی جنبشی'],
  'PE': ['potential energy', 'انرژی پتانسیل'],
  'W': ['work', 'کار'],
  'P': ['power', 'توان', 'pressure', 'فشار'],
  'g': ['gravity', 'گرانش', '9.8', '10'],
  'h': ['height', 'ارتفاع'],
  'r': ['radius', 'شعاع'],
  
  // Electricity
  'V_elec': ['voltage', 'ولتاژ', 'volt', 'ولت'],
  'I': ['current', 'جریان', 'آمپر', 'ampere'],
  'R': ['resistance', 'مقاومت', 'اهم', 'ohm'],
  'C': ['capacitance', 'ظرفیت', 'خازن'],
  'L': ['inductance', 'اندوکتانس', 'سلف'],
  
  // Chemistry
  'n': ['moles', 'مول', 'تعداد مول'],
  'M': ['molar mass', 'جرم مولی', 'molarity', 'مولاریته'],
  'pH': ['ph', 'اسیدیته'],
  'T': ['temperature', 'دما', 'کلوین', 'kelvin'],
  
  // Math
  'A': ['area', 'مساحت', 'سطح'],
  'V': ['volume', 'حجم'],
  'b': ['base', 'قاعده'],
  'pi': ['pi', 'پی', 'π'],
};

// Formula detection keywords
const formulaKeywords: Record<string, string[]> = {
  'p1': ['newton', 'نیوتن', 'f=ma', 'نیرو جرم شتاب', 'force mass'],
  'p2': ['velocity time', 'سرعت زمان', 'v=v0+at'],
  'p6': ['kinetic', 'جنبشی', 'ke'],
  'p7': ['potential', 'پتانسیل', 'pe', 'mgh'],
  'p9': ['power work', 'توان کار', 'p=w/t'],
  'e1': ['ohm', 'اهم', 'v=ir', 'ولتاژ جریان مقاومت'],
  'e2': ['electrical power', 'توان الکتریکی', 'p=vi'],
  'm2': ['circle area', 'مساحت دایره', 'πr²'],
  'm3': ['circumference', 'محیط دایره', '2πr'],
  'm4': ['sphere volume', 'حجم کره'],
  'm8': ['triangle area', 'مساحت مثلث'],
  'm9': ['pythagorean', 'فیثاغورث', 'a²+b²'],
  'p25': ['density', 'چگالی', 'ρ=m/v'],
  'c1': ['moles', 'مول', 'n=m/M'],
  'c5': ['ph', 'اسیدیته'],
};

export default function AICalculator() {
  const { lang } = useLang();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      type: 'ai',
      content: lang === 'fa' 
        ? '👋 سلام! من دستیار محاسباتی شما هستم. می‌توانید با زبان طبیعی از من بخواهید محاسبه کنم.\n\nمثال‌ها:\n• "نیرو برابر چند است اگر جرم 10 کیلوگرم و شتاب 5 متر بر مجذور ثانیه باشد؟"\n• "اگر ولتاژ 12 ولت و مقاومت 4 اهم باشد جریان چقدر است؟"\n• "محاسبه کن 25 + 30 * 2"\n• "مساحت دایره با شعاع 5"'
        : '👋 Hello! I\'m your calculation assistant. You can ask me to calculate using natural language.\n\nExamples:\n• "What is the force if mass is 10 kg and acceleration is 5 m/s²?"\n• "If voltage is 12V and resistance is 4 ohms, what is the current?"\n• "Calculate 25 + 30 * 2"\n• "Area of circle with radius 5"'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Extract numbers from text
  const extractNumbers = (text: string): number[] => {
    const matches = text.match(/[-+]?\d*\.?\d+/g);
    return matches ? matches.map(Number) : [];
  };

  // Find matching formula based on keywords
  const findFormula = (text: string): Formula | null => {
    const lowerText = text.toLowerCase();
    
    // First try exact formula keywords
    for (const [formulaId, keywords] of Object.entries(formulaKeywords)) {
      for (const keyword of keywords) {
        if (lowerText.includes(keyword.toLowerCase())) {
          const formula = formulas.find(f => f.id === formulaId);
          if (formula) return formula;
        }
      }
    }

    // Then try to match by variable mentions
    const mentionedVars: string[] = [];
    for (const [varName, keywords] of Object.entries(variableKeywords)) {
      for (const keyword of keywords) {
        if (lowerText.includes(keyword.toLowerCase())) {
          mentionedVars.push(varName);
          break;
        }
      }
    }

    // Find formula with most matching variables
    if (mentionedVars.length >= 2) {
      let bestMatch: Formula | null = null;
      let bestScore = 0;

      for (const formula of formulas) {
        const formulaVars = formula.variables.map(v => v.name);
        const matchCount = mentionedVars.filter(v => 
          formulaVars.some(fv => fv.toLowerCase() === v.toLowerCase() || fv.includes(v))
        ).length;
        
        if (matchCount > bestScore) {
          bestScore = matchCount;
          bestMatch = formula;
        }
      }

      if (bestMatch && bestScore >= 2) {
        return bestMatch;
      }
    }

    return null;
  };

  // Extract variable values from text
  const extractVariables = (text: string, formula: Formula): Record<string, number> => {
    const values: Record<string, number> = {};
    const lowerText = text.toLowerCase();
    
    const numbers = extractNumbers(text);
    
    // Try to match numbers with variables based on context
    for (const variable of formula.variables) {
      const varKeywords = variableKeywords[variable.name] || [variable.name.toLowerCase()];
      
      for (const keyword of varKeywords) {
        const keywordLower = keyword.toLowerCase();
        const idx = lowerText.indexOf(keywordLower);
        
        if (idx !== -1) {
          // Find nearest number to this keyword
          const nearbyText = text.substring(Math.max(0, idx - 30), Math.min(text.length, idx + 50));
          const nearbyNumbers = extractNumbers(nearbyText);
          
          if (nearbyNumbers.length > 0) {
            values[variable.name] = nearbyNumbers[0];
            break;
          }
        }
      }
    }

    // If we have unassigned numbers and unassigned variables, try to match them
    const assignedVars = Object.keys(values);
    const unassignedVars = formula.variables.filter(v => !assignedVars.includes(v.name));
    const usedNumbers = Object.values(values);
    const unusedNumbers = numbers.filter(n => !usedNumbers.includes(n));

    for (let i = 0; i < Math.min(unassignedVars.length - 1, unusedNumbers.length); i++) {
      values[unassignedVars[i].name] = unusedNumbers[i];
    }

    return values;
  };

  // Detect which variable is the unknown
  const detectUnknown = (text: string, formula: Formula, knownVars: Record<string, number>): string => {
    const lowerText = text.toLowerCase();
    
    // Keywords indicating what we're looking for
    const unknownIndicators = [
      'what is', 'find', 'calculate', 'چقدر', 'چند', 'برابر', 'محاسبه', 'پیدا کن', 'بده',
      'چیست', 'چه مقدار', 'مقدار', '?', '؟'
    ];

    // Check which variable is being asked about
    for (const variable of formula.variables) {
      const varKeywords = variableKeywords[variable.name] || [variable.name.toLowerCase()];
      
      for (const keyword of varKeywords) {
        for (const indicator of unknownIndicators) {
          if (lowerText.includes(indicator) && lowerText.includes(keyword.toLowerCase())) {
            // Check if this appears before or near the indicator
            const indicatorIdx = lowerText.indexOf(indicator);
            const keywordIdx = lowerText.indexOf(keyword.toLowerCase());
            
            if (Math.abs(indicatorIdx - keywordIdx) < 30) {
              return variable.name;
            }
          }
        }
      }
    }

    // Default: return the first variable not in knownVars
    const unknownVar = formula.variables.find(v => !(v.name in knownVars));
    return unknownVar?.name || formula.variables[0].name;
  };

  // Process direct math expressions
  const processDirectMath = (text: string): string | null => {
    // Check if it's a direct calculation request
    const mathPatterns = [
      /(?:محاسبه|حساب|calculate|compute|eval)[:\s]*([\d\s\+\-\*\/\^\(\)\.\,]+)/i,
      /^([\d\s\+\-\*\/\^\(\)\.]+)$/,
      /([\d]+\s*[\+\-\*\/\^]\s*[\d\s\+\-\*\/\^\(\)\.]+)/,
    ];

    for (const pattern of mathPatterns) {
      const match = text.match(pattern);
      if (match) {
        try {
          const expr = match[1].replace(/,/g, '.').replace(/×/g, '*').replace(/÷/g, '/');
          const result = math.evaluate(expr);
          return `${expr} = ${result}`;
        } catch {
          continue;
        }
      }
    }
    return null;
  };

  // Format number nicely
  const formatNumber = (num: number): string => {
    if (Math.abs(num) > 1e6 || (Math.abs(num) < 1e-3 && num !== 0)) {
      return num.toExponential(4);
    }
    return parseFloat(num.toFixed(6)).toString();
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

    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));

    let aiResponse: Message;

    // First check for direct math
    const directMathResult = processDirectMath(userMessage);
    if (directMathResult) {
      aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: lang === 'fa' 
          ? `✅ نتیجه محاسبه:\n\n**${directMathResult}**`
          : `✅ Calculation result:\n\n**${directMathResult}**`,
      };
    } else {
      // Try to find a formula
      const formula = findFormula(userMessage);
      
      if (formula) {
        const extractedVars = extractVariables(userMessage, formula);
        const unknownVar = detectUnknown(userMessage, formula, extractedVars);
        
        // Ensure we have enough variables
        const neededVars = formula.variables.filter(v => v.name !== unknownVar);
        const missingVars = neededVars.filter(v => !(v.name in extractedVars));

        if (missingVars.length > 0) {
          // Not enough information
          aiResponse = {
            id: Date.now() + 1,
            type: 'ai',
            content: lang === 'fa'
              ? `🔍 فرمول "${formula.name.fa}" را شناسایی کردم:\n\n**${formula.equation}**\n\nاما برای محاسبه ${formula.variables.find(v => v.name === unknownVar)?.label.fa || unknownVar}، به این مقادیر نیاز دارم:\n${missingVars.map(v => `• ${v.label.fa} (${v.unit || '-'})`).join('\n')}\n\nلطفاً مقادیر را وارد کنید.`
              : `🔍 I identified the formula "${formula.name.en}":\n\n**${formula.equation}**\n\nBut to calculate ${formula.variables.find(v => v.name === unknownVar)?.label.en || unknownVar}, I need:\n${missingVars.map(v => `• ${v.label.en} (${v.unit || '-'})`).join('\n')}\n\nPlease provide the values.`,
            formula,
            error: true,
          };
        } else {
          // We have enough info, calculate!
          try {
            const result = formula.solve(extractedVars, unknownVar);
            
            if (isNaN(result) || !isFinite(result)) {
              throw new Error('Invalid result');
            }

            const unknownVarInfo = formula.variables.find(v => v.name === unknownVar);
            
            aiResponse = {
              id: Date.now() + 1,
              type: 'ai',
              content: lang === 'fa'
                ? `✅ **فرمول:** ${formula.name.fa}\n\n📐 **معادله:** ${formula.equation}\n\n📊 **مقادیر ورودی:**\n${Object.entries(extractedVars).map(([k, v]) => {
                    const varInfo = formula.variables.find(va => va.name === k);
                    return `• ${varInfo?.label.fa || k} = ${formatNumber(v)} ${varInfo?.unit || ''}`;
                  }).join('\n')}\n\n🎯 **نتیجه:**\n**${unknownVarInfo?.label.fa || unknownVar} = ${formatNumber(result)} ${unknownVarInfo?.unit || ''}**`
                : `✅ **Formula:** ${formula.name.en}\n\n📐 **Equation:** ${formula.equation}\n\n📊 **Input values:**\n${Object.entries(extractedVars).map(([k, v]) => {
                    const varInfo = formula.variables.find(va => va.name === k);
                    return `• ${varInfo?.label.en || k} = ${formatNumber(v)} ${varInfo?.unit || ''}`;
                  }).join('\n')}\n\n🎯 **Result:**\n**${unknownVarInfo?.label.en || unknownVar} = ${formatNumber(result)} ${unknownVarInfo?.unit || ''}**`,
              formula,
              result: {
                value: result,
                variable: unknownVar,
                inputs: extractedVars,
              },
            };
          } catch {
            aiResponse = {
              id: Date.now() + 1,
              type: 'ai',
              content: lang === 'fa'
                ? `❌ متأسفم، در محاسبه خطایی رخ داد. لطفاً مقادیر را بررسی کنید.`
                : `❌ Sorry, an error occurred during calculation. Please check the values.`,
              error: true,
            };
          }
        }
      } else {
        // No formula found, try simple calculations or give help
        aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: lang === 'fa'
            ? `🤔 متوجه نشدم چه محاسبه‌ای می‌خواهید.\n\nمی‌توانید اینگونه بپرسید:\n• "نیرو چقدر است اگر جرم 5 کیلو و شتاب 10 باشد؟"\n• "ولتاژ 12 ولت، مقاومت 3 اهم، جریان؟"\n• "مساحت دایره با شعاع 7"\n• "25 + 30 * 2"\n\nیا نام فرمول را ذکر کنید مثل "نیوتن"، "اهم"، "فیثاغورث"...`
            : `🤔 I didn't understand what calculation you want.\n\nYou can ask like:\n• "What is the force if mass is 5kg and acceleration is 10?"\n• "Voltage 12V, resistance 3 ohms, current?"\n• "Area of circle with radius 7"\n• "25 + 30 * 2"\n\nOr mention a formula name like "Newton", "Ohm", "Pythagorean"...`,
          error: true,
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Example quick prompts
  const quickPrompts = lang === 'fa' ? [
    'نیرو با جرم 10 و شتاب 5',
    'ولتاژ 24، مقاومت 8، جریان؟',
    'مساحت دایره شعاع 10',
    'sin(30) + cos(60)',
    'انرژی جنبشی جرم 2 سرعت 10',
  ] : [
    'Force with mass 10 and acceleration 5',
    'Voltage 24, resistance 8, current?',
    'Circle area radius 10',
    'sin(30) + cos(60)',
    'Kinetic energy mass 2 velocity 10',
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-800/60 backdrop-blur rounded-2xl border border-slate-700/50 overflow-hidden flex flex-col h-[600px]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-slate-700/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {lang === 'fa' ? 'دستیار محاسباتی هوشمند' : 'Smart Calculation Assistant'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'fa' ? 'با زبان طبیعی محاسبه کنید' : 'Calculate using natural language'}
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
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.type === 'user'
                    ? 'bg-blue-500 text-white rounded-br-md'
                    : msg.error
                    ? 'bg-slate-700/80 text-slate-200 rounded-bl-md border border-amber-500/30'
                    : 'bg-slate-700/80 text-slate-200 rounded-bl-md'
                }`}
              >
                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                  {msg.content.split('**').map((part, i) => 
                    i % 2 === 1 ? <strong key={i} className="text-white">{part}</strong> : part
                  )}
                </div>
                {msg.result && (
                  <div className="mt-3 pt-3 border-t border-slate-600/50">
                    <div className="bg-emerald-500/20 rounded-lg p-2 text-center">
                      <span className="text-emerald-300 font-mono text-lg font-bold">
                        {formatNumber(msg.result.value)} {msg.formula?.variables.find(v => v.name === msg.result?.variable)?.unit || ''}
                      </span>
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

        {/* Quick Prompts */}
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => setInput(prompt)}
                className="flex-shrink-0 px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700/80 text-slate-300 text-xs rounded-full transition-all whitespace-nowrap"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700/40">
          <div className="flex gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={lang === 'fa' ? 'پیام خود را بنویسید... (Enter برای ارسال)' : 'Type your message... (Enter to send)'}
              className="flex-1 bg-slate-900/60 text-white border border-slate-700/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-sm hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {lang === 'fa' ? 'ارسال' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
