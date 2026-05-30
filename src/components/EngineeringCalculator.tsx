import { useState } from 'react';
import * as math from 'mathjs';

export default function EngineeringCalculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [hasResult, setHasResult] = useState(false);
  const [isDeg, setIsDeg] = useState(true);
  const [isSecond, setIsSecond] = useState(false);

  const append = (val: string) => {
    if (hasResult) {
      setDisplay(val);
      setEquation('');
      setHasResult(false);
    } else {
      setDisplay(prev => prev === '0' ? val : prev + val);
    }
  };

  const handleFunc = (fn: string) => {
    if (hasResult) setHasResult(false);
    setDisplay(prev => prev === '0' ? fn + '(' : prev + fn + '(');
  };

  const handleEquals = () => {
    try {
      let expr = display;
      // Convert degree-based trig
      if (isDeg) {
        expr = expr.replace(/sin\(/g, 'sin(pi/180*')
          .replace(/cos\(/g, 'cos(pi/180*')
          .replace(/tan\(/g, 'tan(pi/180*');
      }
      if (isDeg) {
        expr = expr.replace(/asin\(pi\/180\*/g, '(180/pi)*asin(')
          .replace(/acos\(pi\/180\*/g, '(180/pi)*acos(')
          .replace(/atan\(pi\/180\*/g, '(180/pi)*atan(');
      }
      const result = math.evaluate(expr);
      const numResult = typeof result === 'object' ? result.toString() : String(parseFloat(Number(result).toFixed(12)));
      setEquation(display + ' =');
      setDisplay(numResult);
      setHasResult(true);
    } catch {
      setDisplay('Error');
      setHasResult(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setHasResult(false);
  };

  const sciButtons = [
    { label: isSecond ? 'sin⁻¹' : 'sin', action: () => handleFunc(isSecond ? 'asin' : 'sin') },
    { label: isSecond ? 'cos⁻¹' : 'cos', action: () => handleFunc(isSecond ? 'acos' : 'cos') },
    { label: isSecond ? 'tan⁻¹' : 'tan', action: () => handleFunc(isSecond ? 'atan' : 'tan') },
    { label: 'π', action: () => append('pi') },
    { label: 'e', action: () => append('e') },
    { label: isSecond ? '10ˣ' : 'log', action: () => isSecond ? append('10^') : handleFunc('log10') },
    { label: isSecond ? 'eˣ' : 'ln', action: () => isSecond ? handleFunc('exp') : handleFunc('log') },
    { label: 'x²', action: () => append('^2') },
    { label: 'xⁿ', action: () => append('^') },
    { label: '√', action: () => handleFunc('sqrt') },
    { label: isSecond ? '³√' : '∛', action: () => handleFunc('cbrt') },
    { label: 'n!', action: () => append('!') },
    { label: '(', action: () => append('(') },
    { label: ')', action: () => append(')') },
    { label: '2nd', action: () => setIsSecond(!isSecond), highlight: isSecond },
    { label: isDeg ? 'DEG' : 'RAD', action: () => setIsDeg(!isDeg), highlight: true },
    { label: '|x|', action: () => handleFunc('abs') },
    { label: '1/x', action: () => { setDisplay(prev => `1/(${prev})`); } },
    { label: 'mod', action: () => append(' mod ') },
    { label: 'EE', action: () => append('e') },
  ];

  const numButtons = [
    { label: 'C', action: handleClear, cls: 'bg-red-500/20 text-red-400' },
    { label: '⌫', action: () => setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0'), cls: 'bg-slate-600/50 text-slate-300' },
    { label: '%', action: () => append('/100'), cls: 'bg-slate-600/50 text-slate-300' },
    { label: '÷', action: () => append('/'), cls: 'bg-amber-500/20 text-amber-400' },
    { label: '7', action: () => append('7'), cls: 'bg-slate-700/50 text-white' },
    { label: '8', action: () => append('8'), cls: 'bg-slate-700/50 text-white' },
    { label: '9', action: () => append('9'), cls: 'bg-slate-700/50 text-white' },
    { label: '×', action: () => append('*'), cls: 'bg-amber-500/20 text-amber-400' },
    { label: '4', action: () => append('4'), cls: 'bg-slate-700/50 text-white' },
    { label: '5', action: () => append('5'), cls: 'bg-slate-700/50 text-white' },
    { label: '6', action: () => append('6'), cls: 'bg-slate-700/50 text-white' },
    { label: '−', action: () => append('-'), cls: 'bg-amber-500/20 text-amber-400' },
    { label: '1', action: () => append('1'), cls: 'bg-slate-700/50 text-white' },
    { label: '2', action: () => append('2'), cls: 'bg-slate-700/50 text-white' },
    { label: '3', action: () => append('3'), cls: 'bg-slate-700/50 text-white' },
    { label: '+', action: () => append('+'), cls: 'bg-amber-500/20 text-amber-400' },
    { label: '±', action: () => setDisplay(prev => prev.startsWith('-') ? prev.slice(1) : '-' + prev), cls: 'bg-slate-700/50 text-white' },
    { label: '0', action: () => append('0'), cls: 'bg-slate-700/50 text-white' },
    { label: '.', action: () => { if (!display.includes('.')) append('.'); }, cls: 'bg-slate-700/50 text-white' },
    { label: '=', action: handleEquals, cls: 'bg-blue-500 text-white' },
  ];

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-4 shadow-2xl border border-slate-700/50">
        <div className="bg-slate-900/80 rounded-xl p-4 mb-3">
          <div className="text-slate-400 text-sm h-6 text-right font-mono overflow-x-auto" dir="ltr">
            {equation}
          </div>
          <div className="text-white text-2xl font-bold text-right font-mono overflow-x-auto whitespace-nowrap" dir="ltr">
            {display}
          </div>
        </div>
        {/* Scientific Functions */}
        <div className="grid grid-cols-5 gap-1.5 mb-2">
          {sciButtons.map((btn, i) => (
            <button
              key={i}
              onClick={btn.action}
              className={`${
                (btn as any).highlight
                  ? 'bg-blue-500/30 text-blue-300'
                  : 'bg-slate-600/40 text-slate-300'
              } rounded-lg py-2 text-xs font-semibold transition-all active:scale-95 hover:bg-slate-600/60 select-none`}
            >
              {btn.label}
            </button>
          ))}
        </div>
        {/* Number Pad */}
        <div className="grid grid-cols-4 gap-1.5">
          {numButtons.map((btn, i) => (
            <button
              key={i}
              onClick={btn.action}
              className={`${btn.cls} rounded-lg py-3 text-base font-semibold transition-all active:scale-95 hover:brightness-110 select-none`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
