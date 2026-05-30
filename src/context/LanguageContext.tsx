import { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'en' | 'fa';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations: Record<string, Record<Lang, string>> = {
  title: { en: 'Advanced Engineering Calculator', fa: 'ماشین حساب مهندسی پیشرفته' },
  search: { en: 'Search formulas...', fa: 'جستجوی فرمول...' },
  categories: { en: 'Categories', fa: 'دسته‌بندی‌ها' },
  formula: { en: 'Formula', fa: 'فرمول' },
  formulas: { en: 'Formulas', fa: 'فرمول‌ها' },
  selectUnknown: { en: 'Select unknown variable', fa: 'متغیر مجهول را انتخاب کنید' },
  calculate: { en: 'Calculate', fa: 'محاسبه' },
  result: { en: 'Result', fa: 'نتیجه' },
  clear: { en: 'Clear', fa: 'پاک کردن' },
  unknown: { en: 'Unknown', fa: 'مجهول' },
  value: { en: 'Value', fa: 'مقدار' },
  variable: { en: 'Variable', fa: 'متغیر' },
  unit: { en: 'Unit', fa: 'واحد' },
  basicCalc: { en: 'Basic Calculator', fa: 'ماشین حساب پایه' },
  engineeringCalc: { en: 'Engineering Calculator', fa: 'ماشین حساب مهندسی' },
  formulaCalc: { en: 'Formula Calculator', fa: 'ماشین حساب فرمول' },
  totalFormulas: { en: 'Total Formulas', fa: 'تعداد کل فرمول‌ها' },
  enterValues: { en: 'Enter known values', fa: 'مقادیر معلوم را وارد کنید' },
  selectFormula: { en: 'Select a formula to begin', fa: 'یک فرمول انتخاب کنید' },
  error: { en: 'Calculation error', fa: 'خطای محاسبه' },
  all: { en: 'All', fa: 'همه' },
  mode: { en: 'Mode', fa: 'حالت' },
  history: { en: 'History', fa: 'تاریخچه' },
  noResults: { en: 'No formulas found', fa: 'فرمولی یافت نشد' },
  switchLang: { en: 'فارسی', fa: 'English' },
  deg: { en: 'DEG', fa: 'درجه' },
  rad: { en: 'RAD', fa: 'رادیان' },
  subcategory: { en: 'Subcategory', fa: 'زیردسته' },
  allSubcategories: { en: 'All Subcategories', fa: 'همه زیردسته‌ها' },
  back: { en: 'Back', fa: 'بازگشت' },
  about: { en: 'About', fa: 'درباره' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fa');

  const t = (key: string) => translations[key]?.[lang] || key;
  const dir = lang === 'fa' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLang must be used within LanguageProvider');
  return context;
}
