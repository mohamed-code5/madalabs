'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'ar'

const en = {
  nav: {
    features: 'Features',
    pricing: 'Pricing',
    architecture: 'Architecture',
    docs: 'Docs',
    showcase: 'Showcase',
    launch: 'Launch Workspace',
    landing: 'Landing',
    workspace: 'Workspace',
    viewLabel: 'Switch view',
    menu: 'Open menu',
  },
  hero: {
    badge: 'Next-Gen AI Code Engine • Powered by WebContainers',
    title1: 'Prompt to Production.',
    title2: 'Infinite Possibilities.',
    sub: 'من الفكرة إلى التطبيق في ثوانٍ معدودة',
    paragraph:
      'Mada Labs transforms natural language prompts into full-stack Web apps in real-time inside your browser. Built for founders, creators, and modern engineering teams across Silicon Valley and the MENA region.',
    primary: 'Start Building Free',
    secondary: 'Watch 1-Min Demo',
    stats: [
      { value: '120k+', label: 'Apps generated' },
      { value: '< 4s', label: 'Median first render' },
      { value: '2', label: 'Native languages' },
    ],
  },
  features: {
    eyebrow: 'Capabilities',
    title: 'Everything you need to ship, in one tab.',
    subtitle:
      'A complete AI engineering stack that runs where you work — your browser. No servers to babysit, no setup to wrestle.',
    items: [
      {
        title: 'In-Browser Runtime',
        desc: 'Real Node.js execution powered by WebContainers. Zero server latency.',
      },
      {
        title: 'Intelligent Agent Engine',
        desc: 'Powered by Claude 3.7 & GPT-4o with auto-healing error repair.',
      },
      {
        title: 'Bilingual Code Generation',
        desc: 'Seamless support for English & Arabic UI generation, RTL layouts, and localized database schemas.',
      },
      {
        title: 'One-Click Supabase Integration',
        desc: 'Instantly provisions PostgreSQL databases, authentication, and security rules.',
      },
      {
        title: 'GitHub Sync & Deploy',
        desc: 'Push clean Next.js 16 + Tailwind CSS repositories directly to Vercel or Netlify.',
      },
      {
        title: 'Visual Canvas Inspector',
        desc: 'Click any UI component on screen to ask the AI to modify its styling or logic.',
      },
    ],
  },
  architecture: {
    eyebrow: 'Architecture',
    title: 'From a sentence to a deployed stack.',
    steps: [
      { title: 'Prompt', desc: 'Describe your app in English or Arabic.' },
      { title: 'Plan', desc: 'The agent drafts routes, schema, and components.' },
      { title: 'Run', desc: 'Code executes live in a sandboxed WebContainer.' },
      { title: 'Ship', desc: 'Sync to GitHub and deploy globally in one click.' },
    ],
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'Start free. Scale when you are ready.',
    subtitle: 'Every plan includes the full in-browser runtime and bilingual generation.',
    monthly: 'Monthly',
    annual: 'Annual',
    save: 'Save 20%',
    perMonth: '/mo',
    billedAnnually: 'Billed annually',
    billedMonthly: 'Billed monthly',
    popular: 'Most popular',
    plans: [
      {
        name: 'Free',
        desc: 'For exploring ideas and weekend builds.',
        features: ['5 daily credits', 'Public projects', '"Built with Mada" watermark', 'Basic templates'],
        cta: 'Start for free',
      },
      {
        name: 'Pro',
        desc: 'For founders shipping real products.',
        features: ['150 monthly credits', 'Private projects', 'GitHub sync', 'Custom domains', 'No watermark'],
        cta: 'Upgrade to Pro',
      },
      {
        name: 'Agency',
        desc: 'For studios building for many clients.',
        features: ['500 pooled credits', 'Team workspaces', 'Live collaboration', 'Custom brand design systems'],
        cta: 'Talk to sales',
      },
    ],
  },
  footer: {
    tagline: 'The AI application builder for the bilingual web.',
    cols: [
      { title: 'Product', links: ['Features', 'Pricing', 'Showcase', 'Changelog'] },
      { title: 'Developers', links: ['API Docs', 'CLI', 'Templates', 'Status'] },
      { title: 'Community', links: ['Discord', 'X / Twitter', 'GitHub', 'Blog'] },
      { title: 'Company', links: ['About', 'Careers', 'Privacy', 'Terms'] },
    ],
    copyright:
      '© 2026 Mada Labs Inc. All rights reserved. Crafted with precision in Silicon Valley & the MENA region.',
  },
  workspace: {
    recent: 'Recent projects',
    newProject: 'New project',
    credits: 'Free Daily Credits',
    remaining: 'remaining',
    upgrade: 'Upgrade',
    explorer: 'Explorer',
    preview: 'Preview',
    desktop: 'Desktop',
    mobile: 'Mobile',
    placeholder: 'Describe a change, e.g. "Add an Arabic checkout page with Mada Pay"…',
    attach: 'Attach Design',
    database: 'Add Database',
    generate: 'Generate App',
    generating: 'Generating…',
    noCredits: 'No credits left',
  },
}

type Dict = typeof en

const ar: Dict = {
  nav: {
    features: 'المزايا',
    pricing: 'الأسعار',
    architecture: 'البنية',
    docs: 'التوثيق',
    showcase: 'المعرض',
    launch: 'افتح مساحة العمل',
    landing: 'الرئيسية',
    workspace: 'مساحة العمل',
    viewLabel: 'تبديل العرض',
    menu: 'فتح القائمة',
  },
  hero: {
    badge: 'محرك برمجة ذكي من الجيل القادم • مدعوم بـ WebContainers',
    title1: 'من الفكرة إلى الإنتاج.',
    title2: 'إمكانيات بلا حدود.',
    sub: 'Prompt to Production. Infinite Possibilities.',
    paragraph:
      'تحوّل مَدى الأوامر المكتوبة باللغة الطبيعية إلى تطبيقات ويب متكاملة في الوقت الفعلي داخل متصفحك. صُممت لروّاد الأعمال والمبدعين وفرق الهندسة الحديثة في وادي السيليكون ومنطقة الشرق الأوسط وشمال أفريقيا.',
    primary: 'ابدأ البناء مجاناً',
    secondary: 'شاهد العرض في دقيقة',
    stats: [
      { value: '+120 ألف', label: 'تطبيق تم إنشاؤه' },
      { value: '< 4 ث', label: 'متوسط أول عرض' },
      { value: '2', label: 'لغتان أصليتان' },
    ],
  },
  features: {
    eyebrow: 'القدرات',
    title: 'كل ما تحتاجه للإطلاق، في تبويب واحد.',
    subtitle: 'منظومة هندسية ذكية متكاملة تعمل حيث تعمل أنت — في متصفحك. بلا خوادم تديرها وبلا إعدادات معقدة.',
    items: [
      { title: 'تشغيل داخل المتصفح', desc: 'تنفيذ Node.js حقيقي مدعوم بـ WebContainers. بدون أي تأخير من الخادم.' },
      { title: 'محرك وكيل ذكي', desc: 'مدعوم بـ Claude 3.7 و GPT-4o مع إصلاح ذاتي تلقائي للأخطاء.' },
      {
        title: 'توليد شيفرة ثنائي اللغة',
        desc: 'دعم سلس لواجهات عربية وإنجليزية، وتخطيطات من اليمين لليسار، ومخططات قواعد بيانات محلية.',
      },
      { title: 'تكامل Supabase بنقرة', desc: 'إنشاء فوري لقواعد PostgreSQL والمصادقة وقواعد الأمان.' },
      { title: 'مزامنة GitHub والنشر', desc: 'ادفع مستودعات Next.js 16 و Tailwind CSS نظيفة مباشرة إلى Vercel أو Netlify.' },
      { title: 'مفتش اللوحة المرئي', desc: 'انقر على أي مكوّن في الشاشة واطلب من الذكاء الاصطناعي تعديل تصميمه أو منطقه.' },
    ],
  },
  architecture: {
    eyebrow: 'البنية',
    title: 'من جملة واحدة إلى منظومة منشورة.',
    steps: [
      { title: 'اكتب', desc: 'صِف تطبيقك بالعربية أو الإنجليزية.' },
      { title: 'خطّط', desc: 'يصمم الوكيل المسارات والمخطط والمكونات.' },
      { title: 'شغّل', desc: 'تُنفَّذ الشيفرة مباشرة داخل WebContainer معزول.' },
      { title: 'أطلق', desc: 'زامن مع GitHub وانشر عالمياً بنقرة واحدة.' },
    ],
  },
  pricing: {
    eyebrow: 'الأسعار',
    title: 'ابدأ مجاناً. وتوسّع عندما تكون جاهزاً.',
    subtitle: 'كل الخطط تشمل بيئة التشغيل الكاملة داخل المتصفح والتوليد ثنائي اللغة.',
    monthly: 'شهري',
    annual: 'سنوي',
    save: 'وفّر 20%',
    perMonth: '/شهر',
    billedAnnually: 'يُدفع سنوياً',
    billedMonthly: 'يُدفع شهرياً',
    popular: 'الأكثر شيوعاً',
    plans: [
      {
        name: 'مجاني',
        desc: 'لاستكشاف الأفكار ومشاريع نهاية الأسبوع.',
        features: ['5 أرصدة يومية', 'مشاريع عامة', 'علامة "صُنع بواسطة مَدى"', 'قوالب أساسية'],
        cta: 'ابدأ مجاناً',
      },
      {
        name: 'احترافي',
        desc: 'لروّاد الأعمال الذين يطلقون منتجات حقيقية.',
        features: ['150 رصيداً شهرياً', 'مشاريع خاصة', 'مزامنة GitHub', 'نطاقات مخصصة', 'بدون علامة مائية'],
        cta: 'الترقية إلى الاحترافي',
      },
      {
        name: 'الوكالات',
        desc: 'للاستوديوهات التي تبني لعملاء متعددين.',
        features: ['500 رصيد مشترك', 'مساحات عمل للفرق', 'تعاون مباشر', 'أنظمة تصميم مخصصة للعلامة'],
        cta: 'تواصل مع المبيعات',
      },
    ],
  },
  footer: {
    tagline: 'منصة بناء التطبيقات الذكية للويب ثنائي اللغة.',
    cols: [
      { title: 'المنتج', links: ['المزايا', 'الأسعار', 'المعرض', 'سجل التحديثات'] },
      { title: 'المطورون', links: ['توثيق API', 'سطر الأوامر', 'القوالب', 'الحالة'] },
      { title: 'المجتمع', links: ['Discord', 'X / تويتر', 'GitHub', 'المدونة'] },
      { title: 'الشركة', links: ['من نحن', 'الوظائف', 'الخصوصية', 'الشروط'] },
    ],
    copyright: '© 2026 مَدى لابز. جميع الحقوق محفوظة. صُنع بإتقان في وادي السيليكون ومنطقة الشرق الأوسط وشمال أفريقيا.',
  },
  workspace: {
    recent: 'المشاريع الأخيرة',
    newProject: 'مشروع جديد',
    credits: 'أرصدة يومية مجانية',
    remaining: 'متبقية',
    upgrade: 'ترقية',
    explorer: 'المستكشف',
    preview: 'المعاينة',
    desktop: 'سطح المكتب',
    mobile: 'الجوال',
    placeholder: 'صِف التعديل، مثلاً: "أضف صفحة دفع عربية مع مدى باي"…',
    attach: 'إرفاق تصميم',
    database: 'إضافة قاعدة بيانات',
    generate: 'توليد التطبيق',
    generating: 'جارٍ التوليد…',
    noCredits: 'لا توجد أرصدة',
  },
}

const dictionaries: Record<Lang, Dict> = { en, ar }

type I18nValue = { lang: Lang; setLang: (lang: Lang) => void; t: Dict; dir: 'ltr' | 'rtl' }

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])

  return <I18nContext value={{ lang, setLang, t: dictionaries[lang], dir }}>{children}</I18nContext>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
