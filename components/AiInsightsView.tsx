'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Cpu,
  CheckCircle2,
  Sliders,
  TrendingUp,
  BrainCircuit,
  Zap,
  Clock,
  ShieldCheck,
} from 'lucide-react';

interface AiInsightsViewProps {
  isArabic: boolean;
}

export const AiInsightsView: React.FC<AiInsightsViewProps> = ({ isArabic }) => {
  const [autonomousMode, setAutonomousMode] = useState<boolean>(true);
  const [activeStrategies, setActiveStrategies] = useState<Record<string, boolean>>({
    precool: true,
    daylight: true,
    chiller_opt: true,
    ventilation: false,
  });

  const toggleStrategy = (key: string) => {
    setActiveStrategies((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#131b2e] p-5 sm:p-6 rounded-2xl border border-[#1e293b]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#80d5cb] uppercase tracking-wider mb-1">
            <Sparkles className="h-4 w-4" />
            <span>{isArabic ? 'محرك الاستدامة والذكاء الاصطناعي' : 'Autonomous AI Dispatch Engine'}</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {isArabic ? 'رؤى وتوصيات الذكاء الاصطناعي' : 'AI Optimization & Microgrid Insights'}
          </h1>
          <p className="text-xs text-[#bdc9c6] mt-1 max-w-2xl">
            {isArabic
              ? 'نماذج التعلم العميق للتنبؤ بالأحوال الجوية، إشغال القاعات، والتحكم الاستباقي بأنظمة التدفئة والتهوية.'
              : 'Continuous reinforcement learning models optimizing HVAC chillers, solar generation forecasting, and peak-shaving schedules.'}
          </p>
        </div>

        {/* Autonomous Mode Toggle */}
        <div className="flex items-center gap-3 bg-[#060e20] p-3 rounded-2xl border border-[#1e293b]">
          <div className="text-right rtl:text-left">
            <div className="text-xs font-bold text-white">
              {isArabic ? 'التحكم الذاتي الآلي' : 'Autonomous Mode'}
            </div>
            <div className="text-[10px] text-[#4edea3]">
              {autonomousMode
                ? isArabic ? 'مفعل (تنفيذ فوري)' : 'Active (Direct Dispatch)'
                : isArabic ? 'يدوي (يتطلب موافقة)' : 'Manual Approval Required'}
            </div>
          </div>
          <button
            onClick={() => setAutonomousMode(!autonomousMode)}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              autonomousMode ? 'bg-[#0f766e]' : 'bg-[#334155]'
            }`}
          >
            <span
              className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                autonomousMode
                  ? isArabic ? '-translate-x-7' : 'translate-x-7'
                  : isArabic ? '-translate-x-1' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 3 AI Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#131b2e] p-5 rounded-2xl border border-[#1e293b] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-[#bdc9c6]">
              {isArabic ? 'دقة التنبؤ بالأحمال' : 'Model Accuracy'}
            </span>
            <BrainCircuit className="h-4 w-4 text-[#80d5cb]" />
          </div>
          <div className="text-3xl font-black text-white font-mono my-2">97.8%</div>
          <div className="text-xs text-[#4edea3] font-medium">
            {isArabic ? 'انحراف معياري ±0.4 ميجاواط' : '±0.4 MW Variance across 12k points'}
          </div>
        </div>

        <div className="bg-[#131b2e] p-5 rounded-2xl border border-[#1e293b] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-[#bdc9c6]">
              {isArabic ? 'ساعات التبريد المسبق' : 'Thermal Pre-Cooling'}
            </span>
            <Clock className="h-4 w-4 text-[#4cd7f6]" />
          </div>
          <div className="text-3xl font-black text-white font-mono my-2">3.5 hrs</div>
          <div className="text-xs text-[#4cd7f6] font-medium">
            {isArabic ? 'تمت جدولتها قبل ذروة 14:00' : 'Scheduled ahead of peak tariff window'}
          </div>
        </div>

        <div className="bg-[#131b2e] p-5 rounded-2xl border border-[#1e293b] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-[#bdc9c6]">
              {isArabic ? 'الكربون المتجنب هذا الشهر' : 'Carbon Abatement'}
            </span>
            <ShieldCheck className="h-4 w-4 text-[#4edea3]" />
          </div>
          <div className="text-3xl font-black text-[#4edea3] font-mono my-2">48.2 t</div>
          <div className="text-xs text-[#bdc9c6] font-medium">
            {isArabic ? 'ما يعادل زراعة 2,140 شجرة' : 'Equivalent to 2,140 mature trees'}
          </div>
        </div>
      </div>

      {/* Active AI Autonomous Strategies */}
      <div className="bg-[#131b2e] p-6 rounded-2xl border border-[#1e293b] space-y-4">
        <h2 className="text-base font-bold text-white">
          {isArabic ? 'خوارزميات التحكم والترشيد النشطة' : 'Active Optimization Strategies'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              id: 'precool',
              title: isArabic ? 'التبريد المسبق للكتلة الحرارية' : 'Thermal Mass Pre-Cooling',
              desc: isArabic
                ? 'استغلال تعرفة الطاقة المنخفضة في الصباح الباكر لتبريد مجمعات العلوم وقاعات المحاضرات قبل وصول الطلاب.'
                : 'Cools heavy structural slabs during low-tariff off-peak hours, allowing chillers to cycle down during peak rates.',
              saving: '~$1,200 / day',
            },
            {
              id: 'daylight',
              title: isArabic ? 'حصاد ضوء النهار الديناميكي' : 'Dynamic Daylight Harvesting',
              desc: isArabic
                ? 'تعتيم تلقائي للإضاءة المحيطة بنسبة 40% بالقرب من النوافذ والواجهات الزجاجية عند تجاوز الإشعاع الشمسي 450 لكس.'
                : 'Dims perimeter lighting banks proportionally with ambient solar illuminance sensors.',
              saving: '420 kWh / day',
            },
            {
              id: 'chiller_opt',
              title: isArabic ? 'توزيع أحمال مبردات المياه المركزية' : 'Chiller Plant Sequencer',
              desc: isArabic
                ? 'تشغيل المبردات متغيرة السرعة (VFD) عند نقطة الكفاءة القصوى وتوزيع التدفق الهيدروليكي الذكي.'
                : 'Selects optimal COP staging for centrifugal chillers, minimizing lift under high wet-bulb conditions.',
              saving: '850 kWh / day',
            },
            {
              id: 'ventilation',
              title: isArabic ? 'التهوية الخاضعة لمستويات CO2' : 'Demand-Controlled Ventilation (DCV)',
              desc: isArabic
                ? 'تعديل سحب الهواء الخارجي بناء على حساسات ثاني أكسيد الكربون اللحظية داخل القاعات والمدرجات.'
                : 'Regulates fresh-air dampers based on real-time CO2 ppm readings per lecture hall.',
              saving: '310 kWh / day',
            },
          ].map((strat) => (
            <div
              key={strat.id}
              className="p-4 rounded-xl bg-[#171f33] border border-[#1e293b] flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">{strat.title}</span>
                  <button
                    onClick={() => toggleStrategy(strat.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      activeStrategies[strat.id]
                        ? 'bg-[#0f766e] text-[#a3faef]'
                        : 'bg-[#222a3d] text-[#889391]'
                    }`}
                  >
                    {activeStrategies[strat.id]
                      ? isArabic ? 'نشط' : 'Enabled'
                      : isArabic ? 'معطل' : 'Disabled'}
                  </button>
                </div>
                <p className="text-xs text-[#bdc9c6] mt-1.5 leading-relaxed">{strat.desc}</p>
              </div>

              <div className="pt-2 border-t border-[#1e293b] flex items-center justify-between text-xs">
                <span className="text-[#889391]">{isArabic ? 'الوفر المقدر:' : 'Estimated Impact:'}</span>
                <span className="font-bold text-[#4edea3] font-mono">{strat.saving}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
