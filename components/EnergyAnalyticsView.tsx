'use client';

import React, { useState } from 'react';
import {
  LineChart,
  BarChart3,
  Zap,
  TrendingDown,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  Sliders,
} from 'lucide-react';

interface EnergyAnalyticsViewProps {
  isArabic: boolean;
}

export const EnergyAnalyticsView: React.FC<EnergyAnalyticsViewProps> = ({ isArabic }) => {
  const [selectedSubsystem, setSelectedSubsystem] = useState<string>('all');
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('day');

  const subsystems = [
    { id: 'hvac', name: isArabic ? 'التكييف والتهوية (HVAC)' : 'HVAC & Thermal', share: '51.4%', kw: '9,457 kW', color: '#80d5cb' },
    { id: 'lighting', name: isArabic ? 'الإضاءة الذكية' : 'Smart Lighting', share: '21.8%', kw: '4,011 kW', color: '#4cd7f6' },
    { id: 'plug', name: isArabic ? 'الأجهزة والمقابس' : 'Plug & Server Loads', share: '18.2%', kw: '3,348 kW', color: '#4edea3' },
    { id: 'lab', name: isArabic ? 'المختبرات والمعدات الثقيلة' : 'Specialized Lab Equip', share: '8.6%', kw: '1,582 kW', color: '#ffb4ab' },
  ];

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className="space-y-6 pb-12">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#131b2e] p-5 rounded-2xl border border-[#1e293b]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#80d5cb] uppercase tracking-wider mb-1">
            <LineChart className="h-4 w-4" />
            <span>{isArabic ? 'تحليلات الطاقة العميقة' : 'Submetering & Tariff Analytics'}</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {isArabic ? 'تحليلات استهلاك وتوزيع الطاقة' : 'Campus Energy Analytics'}
          </h1>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <div className="flex bg-[#060e20] p-1 rounded-xl border border-[#1e293b]">
            <button
              onClick={() => setPeriod('day')}
              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                period === 'day' ? 'bg-[#0f766e] text-[#a3faef]' : 'text-[#bdc9c6]'
              }`}
            >
              {isArabic ? '24 ساعة' : '24h'}
            </button>
            <button
              onClick={() => setPeriod('week')}
              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                period === 'week' ? 'bg-[#0f766e] text-[#a3faef]' : 'text-[#bdc9c6]'
              }`}
            >
              {isArabic ? 'أسبوع' : '7d'}
            </button>
            <button
              onClick={() => setPeriod('month')}
              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                period === 'month' ? 'bg-[#0f766e] text-[#a3faef]' : 'text-[#bdc9c6]'
              }`}
            >
              {isArabic ? 'شهر' : '30d'}
            </button>
          </div>
        </div>
      </div>

      {/* Submetering Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {subsystems.map((sub) => (
          <div
            key={sub.id}
            onClick={() => setSelectedSubsystem(sub.id)}
            className={`p-4 rounded-2xl bg-[#131b2e] border transition cursor-pointer flex flex-col justify-between ${
              selectedSubsystem === sub.id ? 'border-[#80d5cb] shadow-lg shadow-[#0f766e]/20' : 'border-[#1e293b] hover:border-[#334155]'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-[#bdc9c6]">
              <span>{sub.name}</span>
              <span style={{ color: sub.color }}>{sub.share}</span>
            </div>
            <div className="text-2xl font-bold font-mono text-white my-2">{sub.kw}</div>
            <div className="w-full bg-[#060e20] h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: sub.share, backgroundColor: sub.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Load Distribution SVG Chart */}
        <div className="lg:col-span-2 bg-[#131b2e] p-5 sm:p-6 rounded-2xl border border-[#1e293b] flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">
                {isArabic ? 'منحنى الأحمال التراكمي حسب المنظومة' : 'Cumulative Hourly Load Profile by Subsystem'}
              </h2>
              <p className="text-xs text-[#bdc9c6] mt-0.5">
                {isArabic ? 'مقارنة الأحمال الحرارية والأحمال الميكانيكية' : 'Dynamic multi-channel power curve (kW)'}
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#4edea3] bg-[#222a3d] px-2.5 py-1 rounded-lg border border-[#4edea3]/30">
              {isArabic ? 'معامل القدرة: 0.96 PF' : 'Power Factor: 0.96 PF'}
            </span>
          </div>

          <div className="h-64 bg-[#060e20] rounded-xl p-4 border border-[#1e293b] flex flex-col justify-between">
            <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
              <line opacity="0.15" stroke="#889391" strokeDasharray="3 3" x1="0" x2="600" y1="40" y2="40" />
              <line opacity="0.15" stroke="#889391" strokeDasharray="3 3" x1="0" x2="600" y1="90" y2="90" />
              <line opacity="0.15" stroke="#889391" strokeDasharray="3 3" x1="0" x2="600" y1="140" y2="140" />

              {/* Stacked curves */}
              <path
                d="M 0,170 Q 150,150 300,90 T 600,120 L 600,200 L 0,200 Z"
                fill="#80d5cb"
                opacity="0.3"
              />
              <path
                d="M 0,170 Q 150,150 300,90 T 600,120"
                stroke="#80d5cb"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M 0,185 Q 150,170 300,130 T 600,155"
                stroke="#4cd7f6"
                strokeWidth="2.5"
                fill="none"
              />
            </svg>
            <div className="flex justify-between text-[11px] font-mono text-[#bdc9c6]">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00 (Peak Window)</span>
              <span>18:00</span>
              <span>23:59</span>
            </div>
          </div>
        </div>

        {/* Peak Shaving Performance */}
        <div className="bg-[#131b2e] p-5 sm:p-6 rounded-2xl border border-[#1e293b] flex flex-col justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-white">
              {isArabic ? 'كفاءة تفادي رسوم الذروة' : 'Peak Shaving Metrics'}
            </h2>
            <p className="text-xs text-[#bdc9c6]">
              {isArabic ? 'التوفير الناتج عن تشغيل البطاريات والشمسية' : 'Battery + Solar peak curtailment'}
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-[#171f33] border border-[#1e293b]">
              <div className="text-xs text-[#bdc9c6]">
                {isArabic ? 'الحد الأقصى للطلب المتجنب' : 'Avoided Peak Demand'}
              </div>
              <div className="text-2xl font-bold text-[#4edea3] font-mono">3.6 MW</div>
              <div className="text-[10px] text-[#80d5cb] mt-1">
                {isArabic ? 'وفر قدره $8,420 في بند الطلب الأقصى' : 'Saved $8,420 in capacity surcharges'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#171f33] border border-[#1e293b]">
              <div className="text-xs text-[#bdc9c6]">
                {isArabic ? 'تفريغ بطارية الحرم الجامعي BESS' : 'Campus BESS Battery Discharge'}
              </div>
              <div className="text-2xl font-bold text-white font-mono">1.8 MWh</div>
              <div className="text-[10px] text-[#4cd7f6] mt-1">
                {isArabic ? 'مستوى الشحن الحالي: 84%' : 'State of Charge: 84% Available'}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#060e20] text-xs text-[#bdc9c6] border border-[#1e293b]">
            <span className="font-bold text-white block mb-0.5">
              {isArabic ? 'توصية التعرفة اللحظية' : 'Dynamic Tariff Advisory'}
            </span>
            {isArabic
              ? 'تبدأ تعرفة الذروة الصباحية في 13:00. سيتولى النظام تفريغ 1.2 ميجاواط تلقائياً.'
              : 'Next tariff escalation at 13:00 ($0.22/kWh). Auto-dispatch scheduled.'}
          </div>
        </div>
      </div>
    </div>
  );
};
