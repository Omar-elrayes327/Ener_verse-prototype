'use client';

import React, { useState } from 'react';
import { AlertItem } from '../lib/types';
import {
  Zap,
  DollarSign,
  Gauge,
  Leaf,
  TrendingUp,
  Building2,
  AlertTriangle,
  DoorOpen,
  Sparkles,
  Wrench,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Clock,
  ArrowUpRight,
} from 'lucide-react';

interface UniversityCentralDashboardProps {
  onNavigateToBuilding: (buildingId: string) => void;
  onNavigateToRoom: (buildingId: string, roomId: string) => void;
  onNavigateToAlerts: () => void;
  isArabic: boolean;
}

export const UniversityCentralDashboard: React.FC<UniversityCentralDashboardProps> = ({
  onNavigateToBuilding,
  onNavigateToRoom,
  onNavigateToAlerts,
  isArabic,
}) => {
  // Interactive filters
  const [activeCampus, setActiveCampus] = useState<'main' | 'health' | 'tech'>('main');
  const [activeTimeframe, setActiveTimeframe] = useState<'today' | 'week' | 'month'>('today');

  // Interactive action states for demo responsiveness
  const [roomActions, setRoomActions] = useState<Record<string, boolean>>({});
  const [aiRecommendations, setAiRecommendations] = useState<Record<string, 'approved' | 'rejected' | null>>({
    'precool': null,
    'curtail': null,
  });
  const [maintenanceActions, setMaintenanceActions] = useState<Record<string, boolean>>({});

  const handleRoomAction = (roomId: string) => {
    setRoomActions((prev) => ({ ...prev, [roomId]: true }));
  };

  const handleAiAction = (id: string, action: 'approved' | 'rejected') => {
    setAiRecommendations((prev) => ({ ...prev, [id]: action }));
  };

  const handleMaintenanceAction = (id: string) => {
    setMaintenanceActions((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className="space-y-6 pb-12 transition-colors font-sans"
    >
      {/* 1. Header Bar with Breadcrumb and Selectors (Exact match to Screenshot) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#131b2e] p-4 sm:p-5 rounded-2xl border border-[#1e293b] shadow-lg">
        <div className="flex flex-col gap-1">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-[10px] uppercase tracking-widest text-[#bdc9c6] font-bold">
              {isArabic ? 'إدارة حرم إينرفيرس' : 'ENERVERSE CAMPUS CONTROL'}
            </span>
            <span className="text-[#3e4947]">/</span>
            <span className="text-[10px] uppercase tracking-widest text-[#80d5cb] font-bold">
              {isArabic ? 'نظرة عامة تنفيذية' : 'EXECUTIVE OVERVIEW'}
            </span>
          </div>

          {/* Screen Title + Live Status */}
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {isArabic
                ? 'الإدارة المركزية لطاقة الحرم الجامعي'
                : 'University Central Energy Management'}
            </h1>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#222a3d] text-[#4edea3] text-xs font-bold border border-[#4edea3]/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]"></span>
              </span>
              <span>{isArabic ? 'النظام حي — طبيعي' : 'System Live — Normal'}</span>
            </div>
          </div>
        </div>

        {/* Campus & Timeframe Selectors */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Campus Selector */}
          <div className="flex items-center bg-[#060e20] p-1 rounded-xl border border-[#1e293b]">
            <button
              onClick={() => setActiveCampus('main')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeCampus === 'main'
                  ? 'bg-[#0f766e] text-[#a3faef] shadow-sm'
                  : 'text-[#bdc9c6] hover:text-white'
              }`}
            >
              {isArabic ? 'الحرم الرئيسي' : 'Main Campus'}
            </button>
            <button
              onClick={() => setActiveCampus('health')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeCampus === 'health'
                  ? 'bg-[#0f766e] text-[#a3faef] shadow-sm'
                  : 'text-[#bdc9c6] hover:text-white'
              }`}
            >
              {isArabic ? 'المجمع الطبي' : 'Health Complex'}
            </button>
            <button
              onClick={() => setActiveCampus('tech')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeCampus === 'tech'
                  ? 'bg-[#0f766e] text-[#a3faef] shadow-sm'
                  : 'text-[#bdc9c6] hover:text-white'
              }`}
            >
              {isArabic ? 'واحة التقنية' : 'Tech Park'}
            </button>
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center bg-[#060e20] p-1 rounded-xl border border-[#1e293b]">
            <button
              onClick={() => setActiveTimeframe('today')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTimeframe === 'today'
                  ? 'bg-[#222a3d] text-white shadow-sm'
                  : 'text-[#bdc9c6] hover:text-white'
              }`}
            >
              {isArabic ? 'اليوم' : 'Today'}
            </button>
            <button
              onClick={() => setActiveTimeframe('week')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTimeframe === 'week'
                  ? 'bg-[#222a3d] text-white shadow-sm'
                  : 'text-[#bdc9c6] hover:text-white'
              }`}
            >
              {isArabic ? 'الأسبوع' : 'Week'}
            </button>
            <button
              onClick={() => setActiveTimeframe('month')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTimeframe === 'month'
                  ? 'bg-[#222a3d] text-white shadow-sm'
                  : 'text-[#bdc9c6] hover:text-white'
              }`}
            >
              {isArabic ? 'الشهر' : 'Month'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top 4 Core KPI Cards (Exact match to Screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* TOTAL ENERGY */}
        <div className="bg-[#131b2e] p-5 rounded-2xl border border-[#1e293b] shadow-md flex flex-col justify-between border-b-2 border-b-[#80d5cb] relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#bdc9c6] font-bold">
              {isArabic ? 'إجمالي استهلاك الطاقة' : 'TOTAL ENERGY'}
            </span>
            <div className="h-8 w-8 rounded-lg bg-[#0f766e]/20 flex items-center justify-center text-[#80d5cb]">
              <Zap className="h-4 w-4" />
            </div>
          </div>

          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight flex items-baseline gap-1.5">
              <span>142.8</span>
              <span className="text-xl font-bold text-[#80d5cb]">MWh</span>
            </div>
          </div>

          <div className="text-[#bdc9c6] text-xs flex items-center justify-between pt-1 border-t border-[#1e293b]/60 font-medium">
            <span className="text-[#4edea3] font-bold">{isArabic ? 'اليوم' : 'Today'}</span>
            <span>{isArabic ? 'المرجع: 164.4 ميجاواط' : 'Baseline: 164.4 MWh'}</span>
          </div>
        </div>

        {/* ENERGY COST */}
        <div className="bg-[#131b2e] p-5 rounded-2xl border border-[#1e293b] shadow-md flex flex-col justify-between border-b-2 border-b-[#4cd7f6] relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#bdc9c6] font-bold">
              {isArabic ? 'تكلفة الطاقة الكهربائية' : 'ENERGY COST'}
            </span>
            <div className="h-8 w-8 rounded-lg bg-[#03b5d3]/20 flex items-center justify-center text-[#4cd7f6]">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>

          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
              $16,240
            </div>
          </div>

          <div className="text-[#bdc9c6] text-xs flex items-center justify-between pt-1 border-t border-[#1e293b]/60 font-medium">
            <span className="text-[#4edea3] font-bold flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{isArabic ? 'ضمن الميزانية' : 'Budget Normal'}</span>
            </span>
            <span>$0.114/kWh</span>
          </div>
        </div>

        {/* CURRENT POWER */}
        <div className="bg-[#131b2e] p-5 rounded-2xl border border-[#1e293b] shadow-md flex flex-col justify-between border-b-2 border-b-[#03b5d3] relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#bdc9c6] font-bold">
              {isArabic ? 'الحمل اللحظي الحالي' : 'CURRENT POWER'}
            </span>
            <div className="h-8 w-8 rounded-lg bg-[#03b5d3]/20 flex items-center justify-center text-[#03b5d3]">
              <Gauge className="h-4 w-4" />
            </div>
          </div>

          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight flex items-baseline gap-1.5">
              <span>18.4</span>
              <span className="text-xl font-bold text-[#4cd7f6]">MW</span>
            </div>
          </div>

          <div className="text-[#bdc9c6] text-xs flex items-center justify-between pt-1 border-t border-[#1e293b]/60 font-medium">
            <span className="text-[#4cd7f6] font-bold">
              {isArabic ? 'حمل الذروة 82%' : 'Peak Demand 82%'}
            </span>
            <span>{isArabic ? 'السعة: 22.0 ميجاواط' : 'Cap: 22.0 MW'}</span>
          </div>
        </div>

        {/* ENERGY SAVED */}
        <div className="bg-[#131b2e] p-5 rounded-2xl border border-[#1e293b] shadow-md flex flex-col justify-between border-b-2 border-b-[#4edea3] relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#bdc9c6] font-bold">
              {isArabic ? 'الطاقة الموفرة' : 'ENERGY SAVED'}
            </span>
            <div className="h-8 w-8 rounded-lg bg-[#007952]/20 flex items-center justify-center text-[#4edea3]">
              <Leaf className="h-4 w-4" />
            </div>
          </div>

          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-black text-[#4edea3] font-mono tracking-tight flex items-baseline gap-1.5">
              <span>21.6</span>
              <span className="text-xl font-bold text-[#4edea3]">MWh</span>
            </div>
          </div>

          <div className="text-[#bdc9c6] text-xs flex items-center justify-between pt-1 border-t border-[#1e293b]/60 font-medium">
            <span className="text-[#4edea3] font-bold">
              {isArabic ? '+15.2% مقارنة بالأساس' : '+15.2% vs Baseline'}
            </span>
            <span className="text-[#80d5cb] font-bold">
              {isArabic ? 'عبر الذكاء الاصطناعي' : 'via AI Optimization'}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Middle Section: Energy Consumption Trend Chart (8 cols) + Building Status & Active Alerts (4 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left 8 Cols: Energy Consumption Trend */}
        <div className="xl:col-span-8 bg-[#131b2e] p-5 sm:p-6 rounded-2xl border border-[#1e293b] shadow-lg flex flex-col justify-between gap-4">
          {/* Chart Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#80d5cb]" />
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {isArabic ? 'منحنى استهلاك الطاقة والتنبؤ' : 'Energy Consumption Trend'}
                </h2>
              </div>
              <p className="text-xs text-[#bdc9c6] mt-0.5">
                {isArabic
                  ? 'الملف الساعي على مدار 24 ساعة (00:00 - 24:00): الحمل الفعلي (MW) مقابل خط الأساس للذكاء الاصطناعي'
                  : 'Today 24-hour profile (00:00 - 24:00): Actual Power (MW) vs AI Baseline'}
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-6 rounded bg-[#80d5cb]"></span>
                <span className="text-white text-[11px]">
                  {isArabic ? 'الحمل الفعلي (MW)' : 'Actual Power (MW)'}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-0.5 w-6 border-b-2 border-dashed border-[#889391]"></span>
                <span className="text-[#bdc9c6] text-[11px]">
                  {isArabic ? 'خط أساس الذكاء الاصطناعي' : 'AI Baseline'}
                </span>
              </div>
            </div>
          </div>

          {/* SVG Custom High-Precision Chart (Exact Match to Screenshot) */}
          <div className="relative w-full h-72 bg-[#060e20] rounded-xl p-4 flex flex-col justify-between overflow-hidden border border-[#1e293b]">
            <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 800 240">
              <defs>
                <linearGradient id="centralTrendGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#80d5cb" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#80d5cb" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Gridlines */}
              <line opacity="0.15" stroke="#889391" strokeDasharray="3 3" x1="0" x2="800" y1="50" y2="50" />
              <line opacity="0.15" stroke="#889391" strokeDasharray="3 3" x1="0" x2="800" y1="110" y2="110" />
              <line opacity="0.15" stroke="#889391" strokeDasharray="3 3" x1="0" x2="800" y1="170" y2="170" />

              {/* AI Baseline Dashed Curve (Grey) */}
              <path
                d="M 0,165 C 100,160 200,140 300,105 C 400,90 500,80 600,95 C 700,110 750,140 800,150"
                fill="none"
                opacity="0.6"
                stroke="#889391"
                strokeDasharray="6 4"
                strokeWidth="2.5"
              />

              {/* Gradient Area under Actual Curve */}
              <path
                d="M 0,185 C 100,180 200,155 300,120 C 370,105 440,95 500,100 L 500,240 L 0,240 Z"
                fill="url(#centralTrendGrad)"
              />

              {/* Actual Power Line Curve (Cyan-Teal) */}
              <path
                d="M 0,185 C 100,180 200,155 300,120 C 370,105 440,95 500,100"
                stroke="#80d5cb"
                strokeLinecap="round"
                strokeWidth="4"
              />

              {/* Projected / Remaining Forecast Dashed Curve */}
              <path
                d="M 500,100 C 560,105 620,115 700,135 C 750,150 780,165 800,175"
                stroke="#80d5cb"
                strokeLinecap="round"
                strokeDasharray="4 4"
                strokeWidth="2"
                opacity="0.6"
              />

              {/* Vertical Indicator at 15:00 Now */}
              <line stroke="#4edea3" strokeDasharray="3 3" strokeWidth="2" x1="500" x2="500" y1="20" y2="240" />

              {/* Current Point Rings */}
              <circle cx="500" cy="100" fill="#4edea3" r="6" />
              <circle cx="500" cy="100" opacity="0.5" r="13" stroke="#4edea3" strokeWidth="2" />
            </svg>

            {/* X-Axis Timestamps */}
            <div className="flex items-center justify-between text-[#bdc9c6] text-[11px] font-mono pt-2 font-semibold">
              <span>00:00</span>
              <span>04:00</span>
              <span>08:00</span>
              <span>12:00</span>
              <span className="text-[#4edea3] font-bold bg-[#131b2e] px-2 py-0.5 rounded border border-[#4edea3]/40">
                15:00 ({isArabic ? 'الآن' : 'Now'}: 18.4 MW)
              </span>
              <span>18:00</span>
              <span>21:00</span>
              <span>24:00</span>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Building Status & Active Alerts */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          {/* Building Status (5 Key Facilities) */}
          <div className="bg-[#131b2e] p-5 rounded-2xl border border-[#1e293b] shadow-md flex flex-col gap-2.5">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-[#4cd7f6]" />
                <h3 className="text-sm font-bold text-white">
                  {isArabic ? 'حالة المباني الرئيسية' : 'Building Status'}
                </h3>
              </div>
              <span className="text-[10px] text-[#bdc9c6] uppercase tracking-wider font-bold">
                {isArabic ? '5 منشآت رئيسية' : '5 KEY FACILITIES'}
              </span>
            </div>

            {/* Facilities List */}
            <div className="flex flex-col gap-1.5">
              {[
                { id: 'sci-complex', name: 'Science Complex', nameAr: 'مجمع العلوم والمختبرات', power: '4.8 MW', status: 'error', color: '#ffb4ab' },
                { id: 'med-center', name: 'Medical Center', nameAr: 'المجمع الطبي ومختبرات الأبحاث', power: '3.9 MW', status: 'secondary', color: '#4cd7f6' },
                { id: 'central-lib', name: 'Central Library', nameAr: 'المكتبة المركزية', power: '1.2 MW', status: 'tertiary', color: '#4edea3' },
                { id: 'student-union', name: 'Student Union', nameAr: 'مبنى اتحاد الطلاب والأنشطة', power: '1.8 MW', status: 'tertiary', color: '#4edea3' },
                { id: 'eng-hall', name: 'Engineering Hall', nameAr: 'كلية الهندسة والتقنية', power: '2.1 MW', status: 'tertiary', color: '#4edea3' },
              ].map((facility) => (
                <div
                  key={facility.id}
                  onClick={() => onNavigateToBuilding(facility.id === 'eng-hall' ? 'eng-hall' : 'sci-complex')}
                  className="p-2.5 rounded-xl bg-[#171f33] hover:bg-[#222a3d] border border-transparent hover:border-[#334155] flex items-center justify-between transition cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: facility.color }}
                    />
                    <span className="text-xs font-bold text-white group-hover:text-[#80d5cb] transition-colors">
                      {isArabic ? facility.nameAr : facility.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white font-mono">{facility.power}</span>
                    <ChevronRight className={`h-3 w-3 text-[#889391] ${isArabic ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Alerts (2 Urgent - Exact Match) */}
          <div className="bg-[#131b2e] p-5 rounded-2xl border border-[#1e293b] shadow-md flex flex-col gap-2.5">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-[#ffb4ab]" />
                <h3 className="text-sm font-bold text-white">
                  {isArabic ? 'التنبيهات النشطة الفورية' : 'Active Alerts'}
                </h3>
              </div>
              <span className="bg-[#93000a] text-[#ffdad6] px-2 py-0.5 rounded-full text-[10px] font-bold font-mono">
                {isArabic ? '2 حرجة جداً' : '2 Urgent'}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {/* Alert 1 */}
              <div className="p-3 rounded-xl bg-[#171f33] flex items-center justify-between gap-2 border-b-2 border-[#93000a]">
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-white truncate">
                    {isArabic ? 'عدم اتزان في طور المبرد رقم 2' : 'Chiller #2 Phase Imbalance'}
                  </span>
                  <span className="text-[10px] text-[#ffb4ab] font-medium mt-0.5">
                    {isArabic ? 'قاعة العلوم • حرارة مرتفعة' : 'Science Hall • Elevated Temp'}
                  </span>
                </div>

                <button
                  id="btn-alert-chiller"
                  onClick={onNavigateToAlerts}
                  className="px-3 py-1.5 rounded-lg bg-[#93000a] text-[#ffdad6] hover:bg-[#ffb4ab] hover:text-[#690005] text-[11px] font-bold transition whitespace-nowrap cursor-pointer"
                >
                  {isArabic ? 'معاينة' : 'View Alert'}
                </button>
              </div>

              {/* Alert 2 */}
              <div className="p-3 rounded-xl bg-[#171f33] flex items-center justify-between gap-2 border-b-2 border-[#93000a]">
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-white truncate">
                    {isArabic ? 'حرارة مرتفعة في محول T-4' : 'Substation T-4 High Temp'}
                  </span>
                  <span className="text-[10px] text-[#ffb4ab] font-medium mt-0.5">
                    {isArabic ? 'محطة الشرق • تحذير 78°C' : 'East Substation • 78°C Warning'}
                  </span>
                </div>

                <button
                  id="btn-alert-substation"
                  onClick={onNavigateToAlerts}
                  className="px-3 py-1.5 rounded-lg bg-[#93000a] text-[#ffdad6] hover:bg-[#ffb4ab] hover:text-[#690005] text-[11px] font-bold transition whitespace-nowrap cursor-pointer"
                >
                  {isArabic ? 'معاينة' : 'View Alert'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom 3-Column Operational Row (Exact Match to Screenshot) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Top Energy-Wasting Rooms */}
        <div className="bg-[#131b2e] p-5 rounded-2xl border border-[#1e293b] shadow-md flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DoorOpen className="h-4 w-4 text-[#ffb4ab]" />
              <h3 className="text-sm font-bold text-white">
                {isArabic ? 'أعلى الغرف هدراً للطاقة' : 'Top Energy-Wasting Rooms'}
              </h3>
            </div>
            <span className="text-[#ffb4ab] text-[10px] uppercase font-bold tracking-wider">
              {isArabic ? 'مطلوب إجراء' : 'Action Needed'}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {/* Room 1 */}
            <div className="p-3 rounded-xl bg-[#171f33] flex items-center justify-between gap-2 border border-[#1e293b]">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">
                  {isArabic ? 'غرفة 310' : 'Room 310'}
                </span>
                <span className="text-[11px] text-[#bdc9c6]">
                  {isArabic ? 'مبنى العلوم • ' : 'Science Hall • '}
                  <strong className="text-[#ffb4ab]">
                    {isArabic ? '+45% تجاوز للجدول' : '+45% over schedule'}
                  </strong>
                </span>
              </div>

              <button
                onClick={() => handleRoomAction('room-310')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  roomActions['room-310']
                    ? 'bg-[#007952] text-[#99ffcd]'
                    : 'bg-[#0f766e] text-[#a3faef] hover:bg-[#0d9488]'
                }`}
              >
                {roomActions['room-310']
                  ? isArabic ? 'تم الخفض ✓' : 'Setback Applied ✓'
                  : isArabic ? 'تطبيق التوفير' : 'Apply Setback'}
              </button>
            </div>

            {/* Room 2 */}
            <div className="p-3 rounded-xl bg-[#171f33] flex items-center justify-between gap-2 border border-[#1e293b]">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">
                  {isArabic ? 'مختبر 204' : 'Lab 204'}
                </span>
                <span className="text-[11px] text-[#bdc9c6]">
                  {isArabic ? 'مبنى الأحياء • ' : 'Bio Bldg • '}
                  <strong className="text-[#4cd7f6]">
                    {isArabic ? 'إضاءة قيد التشغيل في فراغ خالي' : 'Lights on empty'}
                  </strong>
                </span>
              </div>

              <button
                onClick={() => handleRoomAction('lab-204')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  roomActions['lab-204']
                    ? 'bg-[#007952] text-[#99ffcd]'
                    : 'bg-[#222a3d] text-[#dae2fd] hover:bg-[#31394d]'
                }`}
              >
                {roomActions['lab-204']
                  ? isArabic ? 'تم الإطفاء ✓' : 'Turned Off ✓'
                  : isArabic ? 'إطفاء' : 'Turn Off'}
              </button>
            </div>

            {/* Room 3 */}
            <div className="p-3 rounded-xl bg-[#171f33] flex items-center justify-between gap-2 border border-[#1e293b]">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">
                  {isArabic ? 'قاعة المحاضرات أ' : 'Lecture Hall A'}
                </span>
                <span className="text-[11px] text-[#bdc9c6]">
                  {isArabic ? 'مركز الطلاب • ' : 'Student Center • '}
                  <strong className="text-[#4cd7f6]">
                    {isArabic ? 'تبريد مفرط 66°F' : 'Overcooling 66°F'}
                  </strong>
                </span>
              </div>

              <button
                onClick={() => handleRoomAction('lec-hall-a')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  roomActions['lec-hall-a']
                    ? 'bg-[#007952] text-[#99ffcd]'
                    : 'bg-[#0f766e] text-[#a3faef] hover:bg-[#0d9488]'
                }`}
              >
                {roomActions['lec-hall-a']
                  ? isArabic ? 'تم الضبط ✓' : 'Adjusted ✓'
                  : isArabic ? 'تطبيق التوفير' : 'Apply Setback'}
              </button>
            </div>
          </div>
        </div>

        {/* Column 2: AI Recommendations */}
        <div className="bg-[#131b2e] p-5 rounded-2xl border border-[#1e293b] shadow-md flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#80d5cb]" />
              <h3 className="text-sm font-bold text-white">
                {isArabic ? 'توصيات الذكاء الاصطناعي' : 'AI Recommendations'}
              </h3>
            </div>
            <span className="text-[#80d5cb] text-[10px] uppercase font-bold tracking-wider">
              {isArabic ? 'تحكم ذاتي' : 'Autonomous'}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {/* Recommendation 1 */}
            <div className="p-3 rounded-xl bg-[#171f33] flex flex-col gap-2 border border-[#1e293b]">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">
                  {isArabic ? 'تبريد استباقي لمجمع العلوم' : 'Pre-cool Science Complex'}
                </span>
                <p className="text-[11px] text-[#bdc9c6] mt-0.5">
                  {isArabic
                    ? 'التشغيل قبل ذروة تعرفة 14:00. '
                    : 'Run before 14:00 peak tariff. '}
                  <span className="text-[#4edea3] font-bold">
                    {isArabic ? 'يوفر ~$1,200' : 'Saves ~$1,200'}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                {aiRecommendations['precool'] === 'approved' ? (
                  <span className="text-xs font-bold text-[#4edea3] flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {isArabic ? 'تم اعتماد التبريد المسبق' : 'Approved & Queued'}
                  </span>
                ) : aiRecommendations['precool'] === 'rejected' ? (
                  <span className="text-xs font-bold text-[#889391]">
                    {isArabic ? 'تم الرفض' : 'Dismissed'}
                  </span>
                ) : (
                  <>
                    <button
                      onClick={() => handleAiAction('precool', 'approved')}
                      className="px-3 py-1 rounded-lg bg-[#0f766e] text-[#a3faef] hover:bg-[#0d9488] text-xs font-bold transition cursor-pointer"
                    >
                      {isArabic ? 'موافقة' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleAiAction('precool', 'rejected')}
                      className="px-3 py-1 rounded-lg bg-[#222a3d] text-[#bdc9c6] hover:bg-[#31394d] text-xs font-bold transition cursor-pointer"
                    >
                      {isArabic ? 'رفض' : 'Reject'}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Recommendation 2 */}
            <div className="p-3 rounded-xl bg-[#171f33] flex flex-col gap-2 border border-[#1e293b]">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">
                  {isArabic ? 'خفض تشغيل وحدات مناولة الهواء غير المشغولة' : 'Curtail Unassigned AHUs'}
                </span>
                <p className="text-[11px] text-[#bdc9c6] mt-0.5">
                  {isArabic
                    ? 'خفض أحمال الفصول غير المجدولة بدءاً من 18:00. '
                    : 'Curtail unassigned classroom AHUs from 18:00. '}
                  <span className="text-[#4edea3] font-bold">
                    {isArabic ? 'يوفر 380 كيلوواط/ساعة' : 'Saves 380 kWh'}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                {aiRecommendations['curtail'] === 'approved' ? (
                  <span className="text-xs font-bold text-[#4edea3] flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {isArabic ? 'تم الاعتماد والتفعيل' : 'Curtailment Active'}
                  </span>
                ) : aiRecommendations['curtail'] === 'rejected' ? (
                  <span className="text-xs font-bold text-[#889391]">
                    {isArabic ? 'تم الرفض' : 'Dismissed'}
                  </span>
                ) : (
                  <>
                    <button
                      onClick={() => handleAiAction('curtail', 'approved')}
                      className="px-3 py-1 rounded-lg bg-[#0f766e] text-[#a3faef] hover:bg-[#0d9488] text-xs font-bold transition cursor-pointer"
                    >
                      {isArabic ? 'موافقة' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleAiAction('curtail', 'rejected')}
                      className="px-3 py-1 rounded-lg bg-[#222a3d] text-[#bdc9c6] hover:bg-[#31394d] text-xs font-bold transition cursor-pointer"
                    >
                      {isArabic ? 'رفض' : 'Reject'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Equipment Maintenance */}
        <div className="bg-[#131b2e] p-5 rounded-2xl border border-[#1e293b] shadow-md flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-[#4cd7f6]" />
              <h3 className="text-sm font-bold text-white">
                {isArabic ? 'صيانة المعدات التنبؤية' : 'Equipment Maintenance'}
              </h3>
            </div>
            <span className="text-[#4cd7f6] text-[10px] uppercase font-bold tracking-wider">
              {isArabic ? 'تنبؤية' : 'Predictive'}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {/* Maintenance Item 1 */}
            <div className="p-3 rounded-xl bg-[#171f33] flex flex-col gap-2 border border-[#1e293b]">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">
                  {isArabic ? 'اهتزاز محمل مروحة AHU-08' : 'AHU-08 Bearing Vibration'}
                </span>
                <p className="text-[11px] text-[#bdc9c6] mt-0.5">
                  {isArabic
                    ? 'اهتزاز غير طبيعي في محمل مروحة تزويد كلية الهندسة ب (4.2 مم/ث).'
                    : 'Engineering Hall B supply fan bearing vibration abnormal (4.2 mm/s).'}
                </p>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => handleMaintenanceAction('ahu-08')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    maintenanceActions['ahu-08']
                      ? 'bg-[#007952] text-[#99ffcd]'
                      : 'bg-[#222a3d] text-[#80d5cb] hover:bg-[#31394d]'
                  }`}
                >
                  {maintenanceActions['ahu-08']
                    ? isArabic ? 'تمت جدولة الفحص ✓' : 'Inspection Scheduled ✓'
                    : isArabic ? 'جدولة فحص ميداني' : 'Schedule Check'}
                </button>
              </div>
            </div>

            {/* Maintenance Item 2 */}
            <div className="p-3 rounded-xl bg-[#171f33] flex flex-col gap-2 border border-[#1e293b]">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">
                  {isArabic ? 'محول الطاقة الشمسية رقم 3' : 'Solar Microgrid Inverter 3'}
                </span>
                <p className="text-[11px] text-[#bdc9c6] mt-0.5">
                  {isArabic
                    ? 'انخفاض في الكفاءة بنسبة 14% مقارنة بمتوسط السلاسل أثناء ساعات الذروة.'
                    : 'Efficiency drop of 14% vs string average during peak sunlight hours.'}
                </p>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => handleMaintenanceAction('inverter-3')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    maintenanceActions['inverter-3']
                      ? 'bg-[#007952] text-[#99ffcd]'
                      : 'bg-[#222a3d] text-[#dae2fd] hover:bg-[#31394d]'
                  }`}
                >
                  {maintenanceActions['inverter-3']
                    ? isArabic ? 'تم ضبط المحول يدوياً ✓' : 'Override Engaged ✓'
                    : isArabic ? 'تجاوز تحكم يدوي' : 'Manual Override'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
