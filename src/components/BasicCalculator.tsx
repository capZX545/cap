import { useState } from 'react';


export default function BasicCalculator() {

  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [hasResult, setHasResult] = useState(false);

  const handleNumber = (num: string) => {
    if (hasResult) {
      setDisplay(num);
      setEquation('');
      setHasResult(false);
    } else {
      setDisplay(prev => prev === '0' ? num : prev + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setHasResult(false);
    setDisplay('0');
  };

  const handleEquals = () => {
    try {
      const expr = equation + display;
      const sanitized = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
      const result = new Function('return ' + sanitized)();
      setDisplay(String(parseFloat(Number(result).toFixed(10))));
      setEquation(expr + ' =');
      setHasResult(true);
    } catch {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setHasResult(false);
  };

  const handleDot = () => {
    if (!display.includes('.')) {
      setDisplay(prev => prev + '.');
    }
  };

  const handleBackspace = () => {
    setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
  };

  const handlePercent = () => {
    setDisplay(prev => String(parseFloat(prev) / 100));
  };

  const handlePlusMinus = () => {
    setDisplay(prev => prev.startsWith('-') ? prev.slice(1) : '-' + prev);
  };

  const buttons = [
    { label: 'C', action: handleClear, cls: 'bg-red-500/20 text-red-400 hover:bg-red-500/30' },
    { label: '±', action: handlePlusMinus, cls: 'bg-slate-600/50 text-slate-300 hover:bg-slate-600/70' },
    { label: '%', action: handlePercent, cls: 'bg-slate-600/50 text-slate-300 hover:bg-slate-600/70' },
    { label: '÷', action: () => handleOperator('÷'), cls: 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' },
    { label: '7', action: () => handleNumber('7'), cls: 'bg-slate-700/50 text-white hover:bg-slate-700/70' },
    { label: '8', action: () => handleNumber('8'), cls: 'bg-slate-700/50 text-white hover:bg-slate-700/70' },
    { label: '9', action: () => handleNumber('9'), cls: 'bg-slate-700/50 text-white hover:bg-slate-700/70' },
    { label: '×', action: () => handleOperator('×'), cls: 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' },
    { label: '4', action: () => handleNumber('4'), cls: 'bg-slate-700/50 text-white hover:bg-slate-700/70' },
    { label: '5', action: () => handleNumber('5'), cls: 'bg-slate-700/50 text-white hover:bg-slate-700/70' },
    { label: '6', action: () => handleNumber('6'), cls: 'bg-slate-700/50 text-white hover:bg-slate-700/70' },
    { label: '−', action: () => handleOperator('−'), cls: 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' },
    { label: '1', action: () => handleNumber('1'), cls: 'bg-slate-700/50 text-white hover:bg-slate-700/70' },
    { label: '2', action: () => handleNumber('2'), cls: 'bg-slate-700/50 text-white hover:bg-slate-700/70' },
    { label: '3', action: () => handleNumber('3'), cls: 'bg-slate-700/50 text-white hover:bg-slate-700/70' },
    { label: '+', action: () => handleOperator('+'), cls: 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' },
    { label: '⌫', action: handleBackspace, cls: 'bg-slate-700/50 text-white hover:bg-slate-700/70' },
    { label: '0', action: () => handleNumber('0'), cls: 'bg-slate-700/50 text-white hover:bg-slate-700/70' },
    { label: '.', action: handleDot, cls: 'bg-slate-700/50 text-white hover:bg-slate-700/70' },
    { label: '=', action: handleEquals, cls: 'bg-blue-500 text-white hover:bg-blue-600' },
  ];

  return (
    <div className="max-w-sm mx-auto">
      <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-4 shadow-2xl border border-slate-700/50">
        <div className="bg-slate-900/80 rounded-xl p-4 mb-4">
          <div className="text-slate-400 text-sm h-6 text-right font-mono overflow-hidden" dir="ltr">
            {equation}
          </div>
          <div className="text-white text-3xl font-bold text-right font-mono overflow-hidden" dir="ltr">
            {display}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={btn.action}
              className={`${btn.cls} rounded-xl py-3 text-lg font-semibold transition-all active:scale-95 select-none`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
