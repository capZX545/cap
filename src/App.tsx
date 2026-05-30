import { useState } from 'react';
import { LanguageProvider, useLang } from './context/LanguageContext';
import BasicCalculator from './components/BasicCalculator';
import EngineeringCalculator from './components/EngineeringCalculator';
import FormulaCalculator from './components/FormulaCalculator';
import AICalculator from './components/AICalculator';
import SmartAnalyzer from './components/SmartAnalyzer';
import GeometryLab from './components/GeometryLab';
import MathSolver from './components/MathSolver';
import ConstantsPanel from './components/ConstantsPanel';
import { totalFormulas } from './data/formulas';

type CalcMode = 'basic' | 'engineering' | 'formula' | 'ai' | 'analyzer' | 'geometry' | 'mathsolver';

function AppContent() {
  const { lang, setLang, t, dir } = useLang();
  const [mode, setMode] = useState<CalcMode>('formula');

  const modes: { id: CalcMode; label: string; icon: string }[] = [
    { id: 'basic', label: t('basicCalc'), icon: '🔢' },
    { id: 'engineering', label: t('engineeringCalc'), icon: '⚙️' },
    { id: 'formula', label: t('formulaCalc'), icon: '📐' },
    { id: 'ai', label: lang === 'fa' ? 'دستیار هوشمند' : 'AI Assistant', icon: '🤖' },
    { id: 'analyzer', label: lang === 'fa' ? 'تحلیلگر سیستم' : 'System Analyzer', icon: '🧠' },
    { id: 'geometry', label: lang === 'fa' ? 'آزمایشگاه هندسه' : 'Geometry Lab', icon: '📐' },
    { id: 'mathsolver', label: lang === 'fa' ? 'حل ریاضی' : 'Math Solver', icon: '∫' },
  ];

  return (
    <div dir={dir} className={`min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 ${lang === 'fa' ? 'font-sans' : ''}`}>
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/3 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        {/* Header */}
        <header className="mb-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-xl sm:text-2xl">🧮</span>
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-bold text-white">{t('title')}</h1>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-xs text-slate-500">
                    {totalFormulas} {t('formulas')}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  <span className="text-[10px] sm:text-xs text-blue-400/70">v3.0</span>
                </div>
              </div>
            </div>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}
              className="flex items-center gap-2 bg-slate-800/60 backdrop-blur border border-slate-700/50 rounded-xl px-3 sm:px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/80 transition-all"
            >
              <span className="text-base">{lang === 'fa' ? '🇬🇧' : '🇮🇷'}</span>
              <span className="text-xs sm:text-sm font-medium">{t('switchLang')}</span>
            </button>
          </div>

          {/* Mode Tabs */}
          <div className="flex gap-1.5 mt-3 bg-slate-800/40 backdrop-blur rounded-xl p-1.5 border border-slate-700/30 overflow-x-auto">
            {modes.map(m => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-1 sm:flex-none justify-center ${
                  mode === m.id
                    ? 'bg-blue-500/20 text-blue-400 shadow-inner'
                    : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/30'
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>
        </header>

        {/* Content */}
        <main className="pb-8">
          {mode === 'basic' && <BasicCalculator />}
          {mode === 'engineering' && <EngineeringCalculator />}
          {mode === 'formula' && <FormulaCalculator />}
          {mode === 'ai' && <AICalculator />}
          {mode === 'analyzer' && <SmartAnalyzer />}
          {mode === 'geometry' && <GeometryLab />}
          {mode === 'mathsolver' && <MathSolver />}
        </main>

        {/* Footer */}
        <footer className="text-center py-4 border-t border-slate-800/50">
          <p className="text-slate-600 text-xs">
            {lang === 'fa'
              ? `ماشین حساب مهندسی پیشرفته | ${totalFormulas} فرمول در ${14} دسته‌بندی`
              : `Advanced Engineering Calculator | ${totalFormulas} formulas across ${14} categories`}
          </p>
        </footer>
      </div>

      {/* Floating Constants Panel - Available everywhere */}
      <ConstantsPanel isFloating={true} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
