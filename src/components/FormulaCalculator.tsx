import { useState, useMemo } from 'react';
import { useLang } from '../context/LanguageContext';
import { allFormulas as formulas, categories, type Formula } from '../data/formulas';

interface CalculationStep {
  step: number;
  description: { en: string; fa: string };
  expression: string;
  value?: string;
}

export default function FormulaCalculator() {
  const { lang, t } = useLang();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);
  const [unknownVar, setUnknownVar] = useState<string>('');
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ value: number; variable: string; steps: CalculationStep[] } | null>(null);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSteps, setShowSteps] = useState(true);

  const filteredFormulas = useMemo(() => {
    let filtered = formulas;
    if (selectedCategory) {
      filtered = filtered.filter(f => f.category === selectedCategory);
    }
    if (selectedSubcategory) {
      filtered = filtered.filter(f => f.subcategory === selectedSubcategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(f =>
        f.name.en.toLowerCase().includes(q) ||
        f.name.fa.includes(q) ||
        f.equation.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [selectedCategory, selectedSubcategory, searchQuery]);

  const currentCategory = categories.find(c => c.id === selectedCategory);

  const selectFormula = (formula: Formula) => {
    setSelectedFormula(formula);
    setUnknownVar(formula.variables[0]?.name || '');
    setValues({});
    setResult(null);
    setError('');
  };

  const formatNumber = (num: number): string => {
    if (Math.abs(num) > 1e6 || (Math.abs(num) < 1e-3 && num !== 0)) {
      return num.toExponential(6);
    }
    return parseFloat(num.toFixed(8)).toString();
  };

  const generateSteps = (formula: Formula, numVars: Record<string, number>, unknown: string, resultValue: number): CalculationStep[] => {
    const steps: CalculationStep[] = [];
    const unknownVarInfo = formula.variables.find(v => v.name === unknown);
    
    // Step 1: Show original formula
    steps.push({
      step: 1,
      description: {
        en: 'Original Formula',
        fa: 'فرمول اصلی'
      },
      expression: formula.equation
    });

    // Step 2: Rearranging for unknown (conceptual)
    steps.push({
      step: 2,
      description: {
        en: `Solving for ${unknownVarInfo?.label.en || unknown}`,
        fa: `حل برای ${unknownVarInfo?.label.fa || unknown}`
      },
      expression: `${unknown} = ?`
    });

    // Step 3: Substituting known values
    const knownVars = formula.variables.filter(v => v.name !== unknown);
    
    let substitutionDesc = '';
    knownVars.forEach((v, idx) => {
      const val = numVars[v.name];
      if (val !== undefined) {
        substitutionDesc += `${v.label[lang]} = ${formatNumber(val)}${v.unit ? ' ' + v.unit : ''}`;
        if (idx < knownVars.length - 1) substitutionDesc += ', ';
      }
    });

    steps.push({
      step: 3,
      description: {
        en: 'Substitute known values',
        fa: 'جایگذاری مقادیر معلوم'
      },
      expression: substitutionDesc || 'All values substituted'
    });

    // Step 4: Show calculation with actual numbers
    let calcExpression = '';
    knownVars.forEach((v, idx) => {
      const val = numVars[v.name];
      if (val !== undefined) {
        calcExpression += `${v.name} = ${formatNumber(val)}`;
        if (idx < knownVars.length - 1) calcExpression += ', ';
      }
    });

    steps.push({
      step: 4,
      description: {
        en: 'Perform calculation',
        fa: 'انجام محاسبه'
      },
      expression: calcExpression || 'Computing...'
    });

    // Step 5: Final result
    steps.push({
      step: 5,
      description: {
        en: 'Final Result',
        fa: 'نتیجه نهایی'
      },
      expression: `${unknown} = ${formatNumber(resultValue)}`,
      value: `${formatNumber(resultValue)} ${unknownVarInfo?.unit || ''}`
    });

    return steps;
  };

  const calculate = () => {
    if (!selectedFormula || !unknownVar) return;
    setError('');
    try {
      const numVars: Record<string, number> = {};
      for (const v of selectedFormula.variables) {
        if (v.name === unknownVar) continue;
        const val = parseFloat(values[v.name] || '0');
        if (isNaN(val)) {
          setError(lang === 'fa' ? `مقدار ${v.label.fa} نامعتبر است` : `Invalid value for ${v.label.en}`);
          return;
        }
        numVars[v.name] = val;
      }
      const resultValue = selectedFormula.solve(numVars, unknownVar);
      if (isNaN(resultValue) || !isFinite(resultValue)) {
        setError(lang === 'fa' ? 'محاسبه ممکن نیست' : 'Cannot calculate');
        return;
      }
      
      const steps = generateSteps(selectedFormula, numVars, unknownVar, resultValue);
      setResult({ value: resultValue, variable: unknownVar, steps });
    } catch {
      setError(lang === 'fa' ? 'خطا در محاسبه' : 'Calculation error');
    }
  };

  const clearAll = () => {
    setValues({});
    setResult(null);
    setError('');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full">
      {/* Left Panel - Categories & Formula List */}
      <div className="lg:w-80 flex-shrink-0 space-y-3">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('search')}
            className="w-full bg-slate-800/80 text-white border border-slate-700/50 rounded-xl px-4 py-2.5 pr-10 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
          />
          <span className="absolute top-2.5 right-3 text-slate-500">🔍</span>
        </div>

        {/* Category Filter */}
        <div className="bg-slate-800/60 backdrop-blur rounded-xl border border-slate-700/50 overflow-hidden">
          <div className="p-2.5 border-b border-slate-700/40">
            <h3 className="text-sm font-semibold text-slate-300">{t('categories')}</h3>
          </div>
          <div className="max-h-48 overflow-y-auto p-1.5 space-y-0.5">
            <button
              onClick={() => { setSelectedCategory(''); setSelectedSubcategory(''); }}
              className={`w-full text-right px-3 py-1.5 rounded-lg text-xs transition-all ${
                !selectedCategory ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400 hover:bg-slate-700/50'
              }`}
            >
              {t('all')} ({formulas.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); setSelectedSubcategory(''); }}
                className={`w-full text-right px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400 hover:bg-slate-700/50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name[lang]}</span>
                <span className="text-[10px] text-slate-500 mr-auto">
                  ({formulas.filter(f => f.category === cat.id).length})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Subcategory Filter */}
        {currentCategory && (
          <div className="bg-slate-800/60 backdrop-blur rounded-xl border border-slate-700/50 overflow-hidden">
            <div className="p-2.5 border-b border-slate-700/40">
              <h3 className="text-sm font-semibold text-slate-300">{t('subcategory')}</h3>
            </div>
            <div className="max-h-36 overflow-y-auto p-1.5 space-y-0.5">
              <button
                onClick={() => setSelectedSubcategory('')}
                className={`w-full text-right px-3 py-1.5 rounded-lg text-xs transition-all ${
                  !selectedSubcategory ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400 hover:bg-slate-700/50'
                }`}
              >
                {t('allSubcategories')}
              </button>
              {currentCategory.subcategories.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubcategory(sub.id)}
                  className={`w-full text-right px-3 py-1.5 rounded-lg text-xs transition-all ${
                    selectedSubcategory === sub.id ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400 hover:bg-slate-700/50'
                  }`}
                >
                  {sub.name[lang]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Formula List */}
        <div className="bg-slate-800/60 backdrop-blur rounded-xl border border-slate-700/50 overflow-hidden">
          <div className="p-2.5 border-b border-slate-700/40 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-300">{t('formulas')}</h3>
            <span className="text-[10px] text-slate-500 bg-slate-700/50 px-2 py-0.5 rounded-full">
              {filteredFormulas.length}
            </span>
          </div>
          <div className="max-h-64 lg:max-h-96 overflow-y-auto p-1.5 space-y-0.5">
            {filteredFormulas.length === 0 ? (
              <div className="text-center py-6 text-slate-500 text-xs">{t('noResults')}</div>
            ) : (
              filteredFormulas.map(formula => (
                <button
                  key={formula.id}
                  onClick={() => selectFormula(formula)}
                  className={`w-full text-right px-3 py-2 rounded-lg text-xs transition-all ${
                    selectedFormula?.id === formula.id
                      ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30'
                      : 'text-slate-400 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="font-medium">{formula.name[lang]}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5" dir="ltr">{formula.equation}</div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right Panel - Formula Calculator */}
      <div className="flex-1 min-w-0">
        {selectedFormula ? (
          <div className="bg-slate-800/60 backdrop-blur rounded-2xl border border-slate-700/50 overflow-hidden">
            {/* Formula Header */}
            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-slate-700/40">
              <h2 className="text-lg font-bold text-white">{selectedFormula.name[lang]}</h2>
              <div className="text-blue-300 font-mono text-base mt-1 bg-slate-900/50 rounded-lg px-3 py-2 inline-block" dir="ltr">
                {selectedFormula.equation}
              </div>
            </div>

            {/* Unknown Variable Selection */}
            <div className="p-4 border-b border-slate-700/40">
              <label className="text-sm font-semibold text-slate-300 block mb-2">
                🎯 {t('selectUnknown')}
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedFormula.variables.map(v => (
                  <button
                    key={v.name}
                    onClick={() => {
                      setUnknownVar(v.name);
                      setResult(null);
                      setError('');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      unknownVar === v.name
                        ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                        : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700/70'
                    }`}
                  >
                    {v.label[lang]}
                    {v.unit && <span className="text-[10px] opacity-70 ml-1">({v.unit})</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Fields */}
            <div className="p-4 space-y-3">
              <h3 className="text-sm font-semibold text-slate-300">{t('enterValues')}</h3>
              {selectedFormula.variables
                .filter(v => v.name !== unknownVar)
                .map(v => (
                  <div key={v.name} className="flex items-center gap-3">
                    <label className="text-sm text-slate-400 w-32 flex-shrink-0">
                      {v.label[lang]}
                      {v.unit && (
                        <span className="text-[10px] text-slate-500 block">({v.unit})</span>
                      )}
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={values[v.name] || ''}
                      onChange={(e) => setValues(prev => ({ ...prev, [v.name]: e.target.value }))}
                      placeholder="0"
                      className="flex-1 bg-slate-900/60 text-white border border-slate-700/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono"
                      dir="ltr"
                    />
                  </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="p-4 border-t border-slate-700/40 flex gap-3">
              <button
                onClick={calculate}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl py-2.5 font-semibold text-sm hover:from-blue-600 hover:to-blue-700 transition-all active:scale-[0.98] shadow-lg shadow-blue-500/30"
              >
                ⚡ {t('calculate')}
              </button>
              <button
                onClick={clearAll}
                className="px-6 bg-slate-700/50 text-slate-300 rounded-xl py-2.5 font-semibold text-sm hover:bg-slate-700/70 transition-all"
              >
                {t('clear')}
              </button>
            </div>

            {/* Result with Calculation Steps */}
            {result && (
              <div className="mx-4 mb-4 space-y-3">
                {/* Final Result Box */}
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                  <div className="text-emerald-400 text-sm font-medium">{t('result')}</div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-white font-semibold">
                      {selectedFormula.variables.find(v => v.name === result.variable)?.label[lang]}
                    </span>
                    <span className="text-emerald-300 text-xl font-bold font-mono" dir="ltr">
                      = {formatNumber(result.value)}
                    </span>
                    <span className="text-slate-500 text-sm">
                      {selectedFormula.variables.find(v => v.name === result.variable)?.unit}
                    </span>
                  </div>
                </div>

                {/* Calculation Steps Toggle */}
                <button
                  onClick={() => setShowSteps(!showSteps)}
                  className="w-full flex items-center justify-between px-4 py-2 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition-all text-sm"
                >
                  <span className="text-slate-300 font-medium">
                    📝 {lang === 'fa' ? 'مراحل محاسبه' : 'Calculation Steps'}
                  </span>
                  <span className={`text-slate-400 transition-transform ${showSteps ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {/* Steps Details */}
                {showSteps && (
                  <div className="bg-slate-900/50 rounded-xl border border-slate-700/30 overflow-hidden">
                    {result.steps.map((step, idx) => (
                      <div
                        key={step.step}
                        className={`p-3 ${idx !== result.steps.length - 1 ? 'border-b border-slate-700/30' : ''} ${
                          step.step === 5 ? 'bg-emerald-500/5' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                            step.step === 5 
                              ? 'bg-emerald-500/20 text-emerald-400' 
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {step.step}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-slate-400 mb-1">
                              {step.description[lang]}
                            </div>
                            <div className={`font-mono text-sm break-all ${
                              step.step === 5 ? 'text-emerald-300 font-semibold' : 'text-slate-300'
                            }`} dir="ltr">
                              {step.expression}
                            </div>
                            {step.value && (
                              <div className="mt-1 text-emerald-400 font-semibold text-base" dir="ltr">
                                ✓ {step.value}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Variable Summary Table */}
                <div className="bg-slate-900/50 rounded-xl border border-slate-700/30 p-3">
                  <div className="text-xs text-slate-400 mb-2 font-semibold">
                    {lang === 'fa' ? '📊 خلاصه متغیرها' : '📊 Variable Summary'}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-slate-500 text-xs">
                          <th className="text-right py-1 pr-2">{lang === 'fa' ? 'متغیر' : 'Variable'}</th>
                          <th className="text-right py-1">{lang === 'fa' ? 'مقدار' : 'Value'}</th>
                          <th className="text-right py-1">{lang === 'fa' ? 'واحد' : 'Unit'}</th>
                          <th className="text-right py-1">{lang === 'fa' ? 'نوع' : 'Type'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedFormula.variables.map(v => {
                          const isUnknown = v.name === unknownVar;
                          const value = isUnknown ? result.value : parseFloat(values[v.name] || '0');
                          return (
                            <tr key={v.name} className={`border-t border-slate-700/30 ${isUnknown ? 'bg-emerald-500/5' : ''}`}>
                              <td className="py-1.5 pr-2 text-slate-300">{v.label[lang]}</td>
                              <td className="py-1.5 font-mono text-slate-200" dir="ltr">{formatNumber(value)}</td>
                              <td className="py-1.5 text-slate-500 text-xs">{v.unit || '-'}</td>
                              <td className="py-1.5">
                                {isUnknown ? (
                                  <span className="text-emerald-400 text-xs px-1.5 py-0.5 bg-emerald-500/10 rounded">
                                    {lang === 'fa' ? 'مجهول' : 'Unknown'}
                                  </span>
                                ) : (
                                  <span className="text-blue-400 text-xs px-1.5 py-0.5 bg-blue-500/10 rounded">
                                    {lang === 'fa' ? 'معلوم' : 'Known'}
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mx-4 mb-4 bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                <span className="text-red-400 text-sm">⚠️ {error}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-800/40 backdrop-blur rounded-2xl border border-slate-700/30 p-12 text-center">
            <div className="text-6xl mb-4">📐</div>
            <h3 className="text-xl font-bold text-slate-300 mb-2">{t('selectFormula')}</h3>
            <p className="text-slate-500 text-sm">
              {t('totalFormulas')}: <span className="text-blue-400 font-bold">{formulas.length}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
