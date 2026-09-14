'use client';

import React, { useState } from 'react';
import {
  Wrench,
  AlertTriangle,
  Activity,
  CheckCircle2,
  Calendar,
  Gauge,
  Thermometer,
  Zap,
  Clock,
  Search,
} from 'lucide-react';

interface PredictiveMaintenanceViewProps {
  isArabic: boolean;
}

export const PredictiveMaintenanceView: React.FC<PredictiveMaintenanceViewProps> = ({
  isArabic,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'warning' | 'normal'>('all');
  const [scheduledInterventions, setScheduledInterventions] = useState<Record<string, boolean>>({});

  const handleSchedule = (id: string) => {
    setScheduledInterventions((prev) => ({ ...prev, [id]: true }));
  };

  const assets = [
    {
      id: 'ahu-08',
      name: 'AHU-08 Supply Fan',
      nameAr: 'مروحة تزويد الهواء AHU-08',
      location: 'Engineering Hall - Penthouse Mechanical Room',
      locationAr: 'كلية الهندسة - غرفة الميكانيكا العلوية',
      health: 64,
      status: 'warning',
      vibration: '4.2 mm/s (Threshold: 3.5 mm/s)',
      temp: '68°C',
      anomaly: isArabic
        ? 'اهتزاز غير طبيعي بمحمل المحرك ينبئ بتآكل مبكر خلال 14 يوماً'
        : 'Incipient bearing outer-race defect detected by spectral vibration analysis.',
    },
    {
      id: 'chiller-02',
      name: 'Centrifugal Chiller #2 (450 TR)',
      nameAr: 'مبرد الطرد المركزي رقم 2',
      location: 'Central Energy Plant - Bay 2',
      locationAr: 'محطة الطاقة المركزية - الجناح 2',
      health: 58,
      status: 'warning',
      vibration: '2.1 mm/s (Normal)',
      temp: '76°C (Elevated)',
      anomaly: isArabic
        ? 'انحراف طور التيار الكهربائي L2-L3 بنسبة 8.2% وارتفاع حرارة الضاغط'
        : 'Phase current imbalance L2-L3 (8.2%) accompanied by condenser approach temperature spike.',
    },
    {
      id: 'pv-inv-03',
      name: 'Solar String Inverter #3 (120 kW)',
      nameAr: 'محول سلاسل الألواح الشمسية رقم 3',
      location: 'Science Complex - Rooftop Array A',
      locationAr: 'مجمع العلوم - مصفوفة السطح أ',
      health: 72,
      status: 'warning',
      vibration: '0.2 mm/s (Normal)',
      temp: '54°C',
      anomaly: isArabic
        ? 'انخفاض في كفاءة التوليد بنسبة 14% بسبب عطل ثنائي دايود في السلسلة 4'
        : 'String 4 MPPT clipping indicating suspected bypass diode failure.',
    },
    {
      id: 'sub-t4',
      name: 'Transformer Substation T-4 (2.5 MVA)',
      nameAr: 'محطة المحول الكهربائي الفرعي T-4',
      location: 'East Substation Yard',
      locationAr: 'فناء محطة التحويل الشرقية',
      health: 61,
      status: 'warning',
      vibration: '1.4 mm/s',
      temp: '78°C (High)',
      anomaly: isArabic
        ? 'حرارة الزيت العازل تتجاوز حدود الأمان التشغيلية تحت الحمل الكامل'
        : 'Transformer winding and dielectric oil temperature exceeding 75°C threshold.',
    },
    {
      id: 'ct-01',
      name: 'Cooling Tower #1 Induced Fan',
      nameAr: 'برج التبريد رقم 1 - مروحة السحب',
      location: 'Central Plant Yard',
      locationAr: 'محطة الطاقة المركزية',
      health: 95,
      status: 'normal',
      vibration: '1.1 mm/s',
      temp: '32°C',
      anomaly: isArabic ? 'يعمل بكفاءة هيدروليكية وميكانيكية ممتازة' : 'All telemetry within optimal baseline.',
    },
  ];

  const filteredAssets = assets.filter((asset) => {
    if (filterType === 'warning') return asset.status === 'warning';
    if (filterType === 'normal') return asset.status === 'normal';
    return true;
  });

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#131b2e] p-5 rounded-2xl border border-[#1e293b]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#4cd7f6] uppercase tracking-wider mb-1">
            <Wrench className="h-4 w-4" />
            <span>{isArabic ? 'إدارة صحة الأصول والمعدات' : 'Asset Health & Telemetry'}</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {isArabic ? 'الصيانة التنبؤية والمعدات الحرجة' : 'Predictive Maintenance'}
          </h1>
        </div>

        {/* Filter Pills */}
        <div className="flex bg-[#060e20] p-1 rounded-xl border border-[#1e293b]">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
              filterType === 'all' ? 'bg-[#0f766e] text-[#a3faef]' : 'text-[#bdc9c6]'
            }`}
          >
            {isArabic ? 'الكل' : 'All Equipment'}
          </button>
          <button
            onClick={() => setFilterType('warning')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
              filterType === 'warning' ? 'bg-[#93000a] text-[#ffdad6]' : 'text-[#bdc9c6]'
            }`}
          >
            {isArabic ? 'تحذيرات نشطة' : 'Active Warnings (4)'}
          </button>
          <button
            onClick={() => setFilterType('normal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
              filterType === 'normal' ? 'bg-[#007952] text-[#99ffcd]' : 'text-[#bdc9c6]'
            }`}
          >
            {isArabic ? 'سليم' : 'Healthy'}
          </button>
        </div>
      </div>

      {/* Equipment List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="p-5 rounded-2xl bg-[#131b2e] border border-[#1e293b] hover:border-[#334155] transition flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-md"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-bold text-base text-white">
                  {isArabic ? asset.nameAr : asset.name}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    asset.status === 'warning'
                      ? 'bg-[#93000a]/20 text-[#ffb4ab] border border-[#ffb4ab]/30'
                      : 'bg-[#007952]/20 text-[#4edea3] border border-[#4edea3]/30'
                  }`}
                >
                  {asset.status === 'warning'
                    ? isArabic ? 'مطلوب فحص وقائي' : 'Attention Required'
                    : isArabic ? 'حالة مثالية' : 'Optimal'}
                </span>
              </div>

              <div className="text-xs text-[#bdc9c6]">
                {isArabic ? asset.locationAr : asset.location}
              </div>

              <p className="text-xs text-[#dae2fd] bg-[#060e20] p-3 rounded-xl border border-[#1e293b]">
                {asset.anomaly}
              </p>

              {/* Telemetry Chips */}
              <div className="flex items-center gap-4 text-xs font-mono text-[#bdc9c6] pt-1">
                <span>{isArabic ? 'الاهتزاز:' : 'Vibration:'} <strong className="text-white">{asset.vibration}</strong></span>
                <span>{isArabic ? 'الحرارة:' : 'Temp:'} <strong className="text-white">{asset.temp}</strong></span>
              </div>
            </div>

            {/* Health Score & Action */}
            <div className="flex flex-col sm:flex-row md:flex-col items-end sm:items-center md:items-end justify-between gap-3 shrink-0">
              <div className="text-right rtl:text-left">
                <div className="text-[10px] uppercase font-bold text-[#889391]">
                  {isArabic ? 'مؤشر الصحة' : 'Health Score'}
                </div>
                <div
                  className={`text-2xl font-black font-mono ${
                    asset.health < 70 ? 'text-[#ffb4ab]' : 'text-[#4edea3]'
                  }`}
                >
                  {asset.health}%
                </div>
              </div>

              <button
                onClick={() => handleSchedule(asset.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  scheduledInterventions[asset.id]
                    ? 'bg-[#007952] text-[#99ffcd]'
                    : 'bg-[#0f766e] hover:bg-[#0d9488] text-[#a3faef]'
                }`}
              >
                {scheduledInterventions[asset.id]
                  ? isArabic ? 'تمت جدولة الفني ✓' : 'Dispatch Scheduled ✓'
                  : isArabic ? 'جدولة فحص ميداني' : 'Schedule Inspection'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
