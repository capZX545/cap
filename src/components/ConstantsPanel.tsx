import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { elements as allElements, elementCategories as allElementCats } from '../data/elements';

export interface PhysicalConstant {
  symbol: string;
  name: { en: string; fa: string };
  value: number;
  displayValue: string;
  unit: string;
  category: string;
}

export const physicalConstants: PhysicalConstant[] = [
  // Universal
  { symbol: 'c', name: { en: 'Speed of Light', fa: 'سرعت نور' }, value: 299792458, displayValue: '2.998 × 10⁸', unit: 'm/s', category: 'universal' },
  { symbol: 'G', name: { en: 'Gravitational Constant', fa: 'ثابت گرانش' }, value: 6.674e-11, displayValue: '6.674 × 10⁻¹¹', unit: 'N·m²/kg²', category: 'universal' },
  { symbol: 'h', name: { en: 'Planck Constant', fa: 'ثابت پلانک' }, value: 6.626e-34, displayValue: '6.626 × 10⁻³⁴', unit: 'J·s', category: 'universal' },
  { symbol: 'ℏ', name: { en: 'Reduced Planck', fa: 'ثابت پلانک کاهش‌یافته' }, value: 1.0546e-34, displayValue: '1.055 × 10⁻³⁴', unit: 'J·s', category: 'universal' },
  { symbol: 'k_B', name: { en: 'Boltzmann Constant', fa: 'ثابت بولتزمن' }, value: 1.381e-23, displayValue: '1.381 × 10⁻²³', unit: 'J/K', category: 'universal' },
  { symbol: 'σ', name: { en: 'Stefan-Boltzmann', fa: 'ثابت استفان-بولتزمن' }, value: 5.670e-8, displayValue: '5.670 × 10⁻⁸', unit: 'W/(m²·K⁴)', category: 'universal' },
  { symbol: 'R', name: { en: 'Gas Constant', fa: 'ثابت گاز' }, value: 8.314, displayValue: '8.314', unit: 'J/(mol·K)', category: 'universal' },
  { symbol: 'N_A', name: { en: 'Avogadro Number', fa: 'عدد آووگادرو' }, value: 6.022e23, displayValue: '6.022 × 10²³', unit: '1/mol', category: 'universal' },

  // Electromagnetic
  { symbol: 'e', name: { en: 'Elementary Charge', fa: 'بار بنیادی' }, value: 1.602e-19, displayValue: '1.602 × 10⁻¹⁹', unit: 'C', category: 'electromagnetic' },
  { symbol: 'μ₀', name: { en: 'Vacuum Permeability', fa: 'تراوایی خلأ' }, value: 1.2566e-6, displayValue: '4π × 10⁻⁷', unit: 'H/m', category: 'electromagnetic' },
  { symbol: 'ε₀', name: { en: 'Vacuum Permittivity', fa: 'گذردهی خلأ' }, value: 8.854e-12, displayValue: '8.854 × 10⁻¹²', unit: 'F/m', category: 'electromagnetic' },
  { symbol: 'k_e', name: { en: 'Coulomb Constant', fa: 'ثابت کولن' }, value: 8.988e9, displayValue: '8.988 × 10⁹', unit: 'N·m²/C²', category: 'electromagnetic' },
  { symbol: 'Φ₀', name: { en: 'Magnetic Flux Quantum', fa: 'کوانتوم شار مغناطیسی' }, value: 2.068e-15, displayValue: '2.068 × 10⁻¹⁵', unit: 'Wb', category: 'electromagnetic' },
  { symbol: 'Z₀', name: { en: 'Impedance of Free Space', fa: 'امپدانس فضای آزاد' }, value: 376.73, displayValue: '376.7', unit: 'Ω', category: 'electromagnetic' },

  // Atomic & Nuclear
  { symbol: 'm_e', name: { en: 'Electron Mass', fa: 'جرم الکترون' }, value: 9.109e-31, displayValue: '9.109 × 10⁻³¹', unit: 'kg', category: 'atomic' },
  { symbol: 'm_p', name: { en: 'Proton Mass', fa: 'جرم پروتون' }, value: 1.673e-27, displayValue: '1.673 × 10⁻²⁷', unit: 'kg', category: 'atomic' },
  { symbol: 'm_n', name: { en: 'Neutron Mass', fa: 'جرم نوترون' }, value: 1.675e-27, displayValue: '1.675 × 10⁻²⁷', unit: 'kg', category: 'atomic' },
  { symbol: 'u', name: { en: 'Atomic Mass Unit', fa: 'واحد جرم اتمی' }, value: 1.661e-27, displayValue: '1.661 × 10⁻²⁷', unit: 'kg', category: 'atomic' },
  { symbol: 'a₀', name: { en: 'Bohr Radius', fa: 'شعاع بور' }, value: 5.292e-11, displayValue: '5.292 × 10⁻¹¹', unit: 'm', category: 'atomic' },
  { symbol: 'R_∞', name: { en: 'Rydberg Constant', fa: 'ثابت ریدبرگ' }, value: 1.097e7, displayValue: '1.097 × 10⁷', unit: '1/m', category: 'atomic' },
  { symbol: 'μ_B', name: { en: 'Bohr Magneton', fa: 'مگنتون بور' }, value: 9.274e-24, displayValue: '9.274 × 10⁻²⁴', unit: 'J/T', category: 'atomic' },
  { symbol: 'α', name: { en: 'Fine Structure Constant', fa: 'ثابت ساختار ریز' }, value: 7.297e-3, displayValue: '1/137.036', unit: '', category: 'atomic' },
  { symbol: 'λ_C', name: { en: 'Compton Wavelength', fa: 'طول موج کامپتون' }, value: 2.426e-12, displayValue: '2.426 × 10⁻¹²', unit: 'm', category: 'atomic' },

  // Thermodynamic
  { symbol: 'T₀', name: { en: 'Absolute Zero', fa: 'صفر مطلق' }, value: -273.15, displayValue: '-273.15', unit: '°C', category: 'thermo' },
  { symbol: 'atm', name: { en: 'Standard Atmosphere', fa: 'اتمسفر استاندارد' }, value: 101325, displayValue: '101325', unit: 'Pa', category: 'thermo' },
  { symbol: 'R_atm', name: { en: 'Gas Constant (atm)', fa: 'ثابت گاز (atm)' }, value: 0.08206, displayValue: '0.08206', unit: 'L·atm/(mol·K)', category: 'thermo' },
  { symbol: 'cal', name: { en: 'Calorie', fa: 'کالری' }, value: 4.184, displayValue: '4.184', unit: 'J', category: 'thermo' },
  { symbol: 'Vm', name: { en: 'Molar Volume (STP)', fa: 'حجم مولی (STP)' }, value: 22.414, displayValue: '22.414', unit: 'L/mol', category: 'thermo' },

  // Earth & Astro
  { symbol: 'g', name: { en: 'Gravity (Earth)', fa: 'شتاب گرانش زمین' }, value: 9.80665, displayValue: '9.807', unit: 'm/s²', category: 'earth' },
  { symbol: 'M_E', name: { en: 'Earth Mass', fa: 'جرم زمین' }, value: 5.972e24, displayValue: '5.972 × 10²⁴', unit: 'kg', category: 'earth' },
  { symbol: 'R_E', name: { en: 'Earth Radius', fa: 'شعاع زمین' }, value: 6.371e6, displayValue: '6.371 × 10⁶', unit: 'm', category: 'earth' },
  { symbol: 'M_S', name: { en: 'Sun Mass', fa: 'جرم خورشید' }, value: 1.989e30, displayValue: '1.989 × 10³⁰', unit: 'kg', category: 'earth' },
  { symbol: 'AU', name: { en: 'Astronomical Unit', fa: 'واحد نجومی' }, value: 1.496e11, displayValue: '1.496 × 10¹¹', unit: 'm', category: 'earth' },
  { symbol: 'ly', name: { en: 'Light Year', fa: 'سال نوری' }, value: 9.461e15, displayValue: '9.461 × 10¹⁵', unit: 'm', category: 'earth' },

  // Mathematical
  { symbol: 'π', name: { en: 'Pi', fa: 'عدد پی' }, value: Math.PI, displayValue: '3.14159265...', unit: '', category: 'math' },
  { symbol: 'e', name: { en: 'Euler Number', fa: 'عدد اویلر' }, value: Math.E, displayValue: '2.71828182...', unit: '', category: 'math' },
  { symbol: '√2', name: { en: 'Square Root of 2', fa: 'رادیکال ۲' }, value: Math.SQRT2, displayValue: '1.41421356...', unit: '', category: 'math' },
  { symbol: '√3', name: { en: 'Square Root of 3', fa: 'رادیکال ۳' }, value: Math.sqrt(3), displayValue: '1.73205080...', unit: '', category: 'math' },
  { symbol: 'φ', name: { en: 'Golden Ratio', fa: 'نسبت طلایی' }, value: (1 + Math.sqrt(5)) / 2, displayValue: '1.61803398...', unit: '', category: 'math' },
  { symbol: 'ln2', name: { en: 'Natural Log of 2', fa: 'لگاریتم طبیعی ۲' }, value: Math.LN2, displayValue: '0.69314718...', unit: '', category: 'math' },
  { symbol: 'ln10', name: { en: 'Natural Log of 10', fa: 'لگاریتم طبیعی ۱۰' }, value: Math.LN10, displayValue: '2.30258509...', unit: '', category: 'math' },
  { symbol: 'γ', name: { en: 'Euler-Mascheroni', fa: 'ثابت اویلر-ماسکرونی' }, value: 0.5772156649, displayValue: '0.57721566...', unit: '', category: 'math' },

  // Electronics / Signals
  { symbol: 'eV', name: { en: 'Electron Volt', fa: 'الکترون‌ولت' }, value: 1.602e-19, displayValue: '1.602 × 10⁻¹⁹', unit: 'J', category: 'electronics' },
  { symbol: 'F', name: { en: 'Faraday Constant', fa: 'ثابت فارادی' }, value: 96485, displayValue: '96485', unit: 'C/mol', category: 'electronics' },
  { symbol: 'V_T', name: { en: 'Thermal Voltage (25°C)', fa: 'ولتاژ حرارتی (25°C)' }, value: 0.02585, displayValue: '25.85', unit: 'mV', category: 'electronics' },
  { symbol: 'Eg_Si', name: { en: 'Si Band Gap', fa: 'گاف انرژی سیلیکون' }, value: 1.12, displayValue: '1.12', unit: 'eV', category: 'electronics' },
  { symbol: 'Eg_Ge', name: { en: 'Ge Band Gap', fa: 'گاف انرژی ژرمانیوم' }, value: 0.67, displayValue: '0.67', unit: 'eV', category: 'electronics' },
  { symbol: 'ni_Si', name: { en: 'Si Intrinsic Conc.', fa: 'غلظت ذاتی Si' }, value: 1.5e10, displayValue: '1.5 × 10¹⁰', unit: 'cm⁻³', category: 'electronics' },

  // Chemistry
  { symbol: 'K_w', name: { en: 'Water Ion Product', fa: 'ثابت یونی آب' }, value: 1e-14, displayValue: '1.0 × 10⁻¹⁴', unit: 'mol²/L²', category: 'chemistry' },
  { symbol: 'ΔH_f_H₂O', name: { en: 'ΔHf° Water', fa: 'آنتالپی تشکیل آب' }, value: -285.8, displayValue: '-285.8', unit: 'kJ/mol', category: 'chemistry' },
  { symbol: 'ΔH_f_CO₂', name: { en: 'ΔHf° CO₂', fa: 'آنتالپی تشکیل CO₂' }, value: -393.5, displayValue: '-393.5', unit: 'kJ/mol', category: 'chemistry' },
  { symbol: 'ρ_H₂O', name: { en: 'Water Density', fa: 'چگالی آب' }, value: 1000, displayValue: '1000', unit: 'kg/m³', category: 'chemistry' },
  { symbol: 'c_H₂O', name: { en: 'Water Specific Heat', fa: 'گرمای ویژه آب' }, value: 4186, displayValue: '4186', unit: 'J/(kg·K)', category: 'chemistry' },

  // Biology
  { symbol: 'pH_blood', name: { en: 'Blood pH', fa: 'pH خون' }, value: 7.4, displayValue: '7.4', unit: '', category: 'biology' },
  { symbol: 'T_body', name: { en: 'Body Temperature', fa: 'دمای بدن' }, value: 37, displayValue: '37', unit: '°C', category: 'biology' },
  { symbol: 'BP_sys', name: { en: 'Normal Systolic BP', fa: 'فشار سیستولی نرمال' }, value: 120, displayValue: '120', unit: 'mmHg', category: 'biology' },
  { symbol: 'BP_dia', name: { en: 'Normal Diastolic BP', fa: 'فشار دیاستولی نرمال' }, value: 80, displayValue: '80', unit: 'mmHg', category: 'biology' },
  { symbol: 'HR', name: { en: 'Resting Heart Rate', fa: 'ضربان قلب استراحت' }, value: 72, displayValue: '72', unit: 'bpm', category: 'biology' },
];

const constantCategories = [
  { id: 'all', name: { en: 'All', fa: 'همه' }, icon: '🌐' },
  { id: 'universal', name: { en: 'Universal', fa: 'جهانی' }, icon: '🌌' },
  { id: 'electromagnetic', name: { en: 'Electromagnetic', fa: 'الکترومغناطیس' }, icon: '⚡' },
  { id: 'atomic', name: { en: 'Atomic & Nuclear', fa: 'اتمی و هسته‌ای' }, icon: '⚛️' },
  { id: 'thermo', name: { en: 'Thermodynamic', fa: 'ترمودینامیک' }, icon: '🌡️' },
  { id: 'earth', name: { en: 'Earth & Astro', fa: 'زمین و نجوم' }, icon: '🌍' },
  { id: 'math', name: { en: 'Mathematical', fa: 'ریاضی' }, icon: '🔢' },
  { id: 'electronics', name: { en: 'Electronics', fa: 'الکترونیک' }, icon: '💡' },
  { id: 'chemistry', name: { en: 'Chemistry', fa: 'شیمی' }, icon: '🧪' },
  { id: 'biology', name: { en: 'Biology', fa: 'زیست' }, icon: '🧬' },
];

interface ConstantsPanelProps {
  onInsert?: (value: number, symbol: string) => void;
  isFloating?: boolean;
}

export default function ConstantsPanel({ onInsert, isFloating = false }: ConstantsPanelProps) {
  const { lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState('all');
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState('');
  const [tab, setTab] = useState<'constants' | 'elements'>('constants');

  const filtered = physicalConstants.filter(c => {
    const matchesCat = selectedCat === 'all' || c.category === selectedCat;
    const matchesSearch = !search || 
      c.symbol.toLowerCase().includes(search.toLowerCase()) ||
      c.name.en.toLowerCase().includes(search.toLowerCase()) ||
      c.name.fa.includes(search);
    return matchesCat && matchesSearch;
  });

  const handleUse = (constant: PhysicalConstant) => {
    if (onInsert) {
      onInsert(constant.value, constant.symbol);
    }
    navigator.clipboard.writeText(String(constant.value));
    setCopied(constant.symbol);
    setTimeout(() => setCopied(''), 1500);
  };

  if (isFloating) {
    return (
      <>
        {/* Floating Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed bottom-6 z-50 w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-xl transition-all hover:scale-110 ${
            isOpen 
              ? 'bg-red-500 text-white right-[370px]' 
              : 'bg-gradient-to-br from-amber-500 to-orange-500 text-white right-6'
          }`}
          title={lang === 'fa' ? 'اعداد ثابت' : 'Constants'}
        >
          {isOpen ? '✕' : '📌'}
        </button>

        {/* Floating Panel */}
        {isOpen && (
          <div className="fixed bottom-6 right-6 z-40 w-[350px] max-h-[80vh] bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl flex flex-col overflow-hidden">
            <PanelContent
              lang={lang}
              filtered={filtered}
              selectedCat={selectedCat}
              setSelectedCat={setSelectedCat}
              search={search}
              setSearch={setSearch}
              copied={copied}
              handleUse={handleUse}
              tab={tab}
              setTab={setTab}
            />
          </div>
        )}
      </>
    );
  }

  // Inline panel (non-floating)
  return (
    <div className="bg-slate-800/60 backdrop-blur rounded-2xl border border-slate-700/50 overflow-hidden">
      <PanelContent
        lang={lang}
        filtered={filtered}
        selectedCat={selectedCat}
        setSelectedCat={setSelectedCat}
        search={search}
        setSearch={setSearch}
        copied={copied}
        handleUse={handleUse}
        tab={tab}
        setTab={setTab}
      />
    </div>
  );
}

function PanelContent({
  lang, filtered, selectedCat, setSelectedCat, search, setSearch, copied, handleUse, tab, setTab
}: {
  lang: 'en' | 'fa';
  filtered: PhysicalConstant[];
  selectedCat: string;
  setSelectedCat: (c: string) => void;
  search: string;
  setSearch: (s: string) => void;
  copied: string;
  handleUse: (c: PhysicalConstant) => void;
  tab: 'constants' | 'elements';
  setTab: (t: 'constants' | 'elements') => void;
}) {
  const [selectedElement, setSelectedElement] = useState<any>(null);

  const filteredElements = allElements.filter((el: any) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return el.symbol.toLowerCase().includes(q) ||
      el.name.en.toLowerCase().includes(q) ||
      el.name.fa.includes(q) ||
      String(el.z).includes(q);
  });

  return (
    <>
      {/* Header with Main Tabs */}
      <div className="p-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-b border-slate-700/40">
        <div className="flex gap-1 mb-2">
          <button onClick={() => setTab('constants')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${tab === 'constants' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:bg-slate-700/30'}`}>
            📌 {lang === 'fa' ? 'اعداد ثابت' : 'Constants'} <span className="text-[10px] opacity-60">({physicalConstants.length})</span>
          </button>
          <button onClick={() => setTab('elements')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${tab === 'elements' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:bg-slate-700/30'}`}>
            ⚛️ {lang === 'fa' ? 'جدول تناوبی' : 'Periodic Table'} <span className="text-[10px] opacity-60">(118)</span>
          </button>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={tab === 'constants'
            ? (lang === 'fa' ? 'جستجوی ثابت...' : 'Search constants...')
            : (lang === 'fa' ? 'جستجوی عنصر (نام، نماد، عدد اتمی)...' : 'Search element (name, symbol, Z)...')}
          className="w-full bg-slate-900/60 text-white border border-slate-700/50 rounded-lg px-3 py-1.5 text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
        />
      </div>

      {tab === 'constants' ? (
        <>
          {/* Category Tabs */}
          <div className="flex gap-1 p-2 overflow-x-auto border-b border-slate-700/30">
            {constantCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`flex-shrink-0 px-2 py-1 rounded-md text-[10px] transition-all ${
                  selectedCat === cat.id
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-700/30'
                }`}
              >
                <span className="mr-0.5">{cat.icon}</span> {cat.name[lang]}
              </button>
            ))}
          </div>

          {/* Constants List */}
          <div className="flex-1 overflow-y-auto max-h-[50vh] p-2 space-y-1">
            {filtered.map(c => (
              <button
                key={c.symbol + c.category}
                onClick={() => handleUse(c)}
                className={`w-full text-right p-2 rounded-lg transition-all hover:bg-slate-700/50 ${
                  copied === c.symbol ? 'bg-emerald-500/20 ring-1 ring-emerald-500/40' : 'bg-slate-900/30'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-amber-400 font-mono text-sm font-bold w-10 text-center flex-shrink-0">{c.symbol}</span>
                    <div className="min-w-0">
                      <div className="text-xs text-slate-300 truncate">{c.name[lang]}</div>
                      <div className="text-[10px] text-slate-500">{c.unit}</div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs font-mono text-cyan-400">{c.displayValue}</div>
                    {copied === c.symbol && <span className="text-[10px] text-emerald-400">{lang === 'fa' ? '✓ کپی شد' : '✓ Copied'}</span>}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Element Detail */}
          {selectedElement && (
            <div className="p-3 border-b border-slate-700/30 bg-slate-900/40">
              <div className="flex items-start gap-3">
                <div className="w-16 h-16 rounded-xl flex flex-col items-center justify-center flex-shrink-0" style={{ backgroundColor: (allElementCats[selectedElement.category]?.color || '#666') + '22', border: `1px solid ${allElementCats[selectedElement.category]?.color || '#666'}55` }}>
                  <span className="text-[10px] text-slate-400">{selectedElement.z}</span>
                  <span className="text-lg font-bold text-white">{selectedElement.symbol}</span>
                  <span className="text-[9px] text-slate-400">{selectedElement.mass}</span>
                </div>
                <div className="flex-1 min-w-0 text-xs space-y-0.5">
                  <div className="text-sm font-bold text-white">{selectedElement.name[lang]}</div>
                  <div className="text-slate-400">{lang === 'fa' ? 'جرم اتمی:' : 'Mass:'} <span className="text-cyan-400 font-mono">{selectedElement.mass} u</span></div>
                  <div className="text-slate-400">{lang === 'fa' ? 'آرایش الکترونی:' : 'Config:'} <span className="text-amber-400 font-mono text-[10px]">{selectedElement.electron}</span></div>
                  {selectedElement.density && <div className="text-slate-400">{lang === 'fa' ? 'چگالی:' : 'Density:'} <span className="text-emerald-400 font-mono">{selectedElement.density} g/cm³</span></div>}
                  {selectedElement.melt !== undefined && <div className="text-slate-400">{lang === 'fa' ? 'ذوب:' : 'Melt:'} <span className="text-red-400 font-mono">{selectedElement.melt}°C</span> {selectedElement.boil !== undefined && <>{lang === 'fa' ? 'جوش:' : 'Boil:'} <span className="text-orange-400 font-mono">{selectedElement.boil}°C</span></>}</div>}
                  {selectedElement.electronegativity && <div className="text-slate-400">{lang === 'fa' ? 'الکترونگاتیوی:' : 'EN:'} <span className="text-purple-400 font-mono">{selectedElement.electronegativity}</span></div>}
                </div>
              </div>
              <button onClick={() => setSelectedElement(null)} className="w-full mt-2 text-[10px] text-slate-500 hover:text-slate-300">
                {lang === 'fa' ? '✕ بستن' : '✕ Close'}
              </button>
            </div>
          )}

          {/* Elements List */}
          <div className="flex-1 overflow-y-auto max-h-[50vh] p-2 space-y-0.5">
            {filteredElements.map((el: any) => {
              const catInfo = allElementCats[el.category];
              return (
                <button
                  key={el.z}
                  onClick={() => {
                    setSelectedElement(el);
                    navigator.clipboard.writeText(String(el.mass));
                  }}
                  className="w-full text-right p-1.5 rounded-lg transition-all hover:bg-slate-700/50 bg-slate-900/30"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md flex flex-col items-center justify-center flex-shrink-0" style={{ backgroundColor: (catInfo?.color || '#666') + '22' }}>
                      <span className="text-[8px] text-slate-500">{el.z}</span>
                      <span className="text-xs font-bold text-white">{el.symbol}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-slate-300 truncate">{el.name[lang]}</div>
                      <div className="text-[10px] text-slate-500">{catInfo?.fa || catInfo?.en}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs font-mono text-cyan-400">{el.mass}</div>
                      <div className="text-[10px] text-slate-500">u</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Footer */}
      <div className="p-2 border-t border-slate-700/30 text-center">
        <span className="text-[10px] text-slate-500">
          {lang === 'fa' ? 'کلیک = کپی مقدار | جرم اتمی' : 'Click = copy value | atomic mass'}
        </span>
      </div>
    </>
  );
}
