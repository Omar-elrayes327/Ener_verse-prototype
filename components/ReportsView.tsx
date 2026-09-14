'use client';

import React, { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  TrendingDown,
  Building,
  Award,
} from 'lucide-react';

interface ReportsViewProps {
  isArabic: boolean;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ isArabic }) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
    }, 1200);
  };

  const reports = [
    {
      id: 'rep-esg-q3',
      title: 'Q3 University ESG & Decarbonization Audit',
      titleAr: 'تقرير الاستدامة والحوكمة البيئية والاجتماعية للربع الثالث (ESG)',
      period: 'July 1 – September 30, 2026',
      periodAr: '1 يوليو – 30 سبتمبر 2026',
      type: 'Executive PDF • 42 Pages',
      metrics: 'Scope 1 & 2 Emissions, Microgrid Offsets, EUI Ratings',
      metricsAr: 'انبعاثات النطاق 1 و 2، إزاحة الشبكة الشمسية، تصنيفات كثافة استخدام الطاقة EUI',
    },
    {
      id: 'rep-tariff-analysis',
      title: 'Peak Tariff Mitigation & Avoided Cost Analysis',
      titleAr: 'تحليل تخفيف تكلفة تعرفة الذروة والتكاليف المتجنبة',
      period: 'Monthly Rollup • August 2026',
      periodAr: 'الملخص الشهري • أغسطس 2026',
      type: 'Financial Audit • 18 Pages',
      metrics: '$84,200 Total Avoided Demand Penalties via Autonomous Shifting',
      metricsAr: '$84,200 إجمالي غرامات الطلب الأقصى المتجنبة عبر الإزاحة الذاتية للأحمال',
    },
    {
      id: 'rep-bldg-benchmarks',
      title: 'Facility Energy Intensity (EUI) Benchmarking',
      titleAr: 'المقارنة المعيارية لكثافة استهلاك الطاقة في منشآت الحرم (EUI)',
      period: 'Academic Year 2025-2026',
      periodAr: 'العام الأكاديمي 2025-2026',
      type: 'ASHRAE Level II Report',
      metrics: 'Comprehensive submeter audit across 18 campus buildings',
      metricsAr: 'تدقيق شامل للعدادات الفرعية عبر 18 مبنى في الحرم الجامعي',
    },
  ];

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#131b2e] p-5 rounded-2xl border border-[#1e293b]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#80d5cb] uppercase tracking-wider mb-1">
            <FileText className="h-4 w-4" />
            <span>{isArabic ? 'التقارير التنفيذية وسندات الكربون' : 'Executive Audits & ESG'}</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {isArabic ? 'تقارير الاستدامة والامتثال الطاقي' : 'Energy & Compliance Reports'}
          </h1>
        </div>
      </div>

      {/* ESG Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-[#131b2e] border border-[#1e293b]">
          <div className="flex items-center justify-between text-xs text-[#bdc9c6] font-bold">
            <span>{isArabic ? 'تصنيف الاستدامة الأكاديمي' : 'STARS Sustainability Rating'}</span>
            <Award className="h-4 w-4 text-[#80d5cb]" />
          </div>
          <div className="text-2xl font-black text-white my-2">Platinum (92.4 pts)</div>
          <div className="text-xs text-[#4edea3]">
            {isArabic ? 'المرتبة الأولى بين الجامعات الوطنية' : 'Ranked #1 among national research universities'}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#131b2e] border border-[#1e293b]">
          <div className="flex items-center justify-between text-xs text-[#bdc9c6] font-bold">
            <span>{isArabic ? 'تخفيض الكربون السنوي' : 'Annual GHG Reduction'}</span>
            <TrendingDown className="h-4 w-4 text-[#4edea3]" />
          </div>
          <div className="text-2xl font-black text-[#4edea3] my-2 font-mono">-18.4%</div>
          <div className="text-xs text-[#bdc9c6]">
            {isArabic ? 'متجاوز للهدف السنوي بـ 3.2%' : 'Exceeding 2026 target by 3.2%'}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#131b2e] border border-[#1e293b]">
          <div className="flex items-center justify-between text-xs text-[#bdc9c6] font-bold">
            <span>{isArabic ? 'سندات الكربون المعتمدة' : 'Verified Carbon Credits'}</span>
            <ShieldCheck className="h-4 w-4 text-[#4cd7f6]" />
          </div>
          <div className="text-2xl font-black text-white font-mono my-2">1,420 tCO2e</div>
          <div className="text-xs text-[#4cd7f6]">
            {isArabic ? 'جاهزة لإصدار الشهادات' : 'Eligible for Verra Registry monetization'}
          </div>
        </div>
      </div>

      {/* Reports Listing */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">
          {isArabic ? 'التقارير المتاحة للتصدير' : 'Published Audits & Statements'}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {reports.map((rep) => (
            <div
              key={rep.id}
              className="p-5 rounded-2xl bg-[#131b2e] border border-[#1e293b] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-base">
                    {isArabic ? rep.titleAr : rep.title}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#222a3d] text-[#80d5cb] font-mono">
                    {rep.type}
                  </span>
                </div>
                <div className="text-xs text-[#bdc9c6]">
                  {isArabic ? rep.periodAr : rep.period}
                </div>
                <div className="text-xs text-[#889391]">
                  {isArabic ? rep.metricsAr : rep.metrics}
                </div>
              </div>

              <button
                onClick={() => handleDownload(rep.id)}
                className="px-4 py-2 rounded-xl bg-[#0f766e] hover:bg-[#0d9488] text-[#a3faef] text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                {downloadingId === rep.id ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-[#4edea3]" />
                    <span>{isArabic ? 'جاري التحميل...' : 'Downloading...'}</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>{isArabic ? 'تصدير التقرير (PDF)' : 'Export PDF'}</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
