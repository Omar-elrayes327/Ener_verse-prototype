'use client';

import React, { useState } from 'react';
import { BuildingData, UniversityCampusStats, AlertItem } from '../lib/types';
import { CampusMapSvg } from './CampusMapSvg';
import {
  Zap,
  Sun,
  BatteryCharging,
  Leaf,
  Users,
  Search,
  Filter,
  ArrowUpRight,
  AlertTriangle,
  Flame,
  ShieldCheck,
  Building,
  TrendingDown,
  ChevronRight,
  Clock,
  Sparkles,
} from 'lucide-react';

interface CentralUniversityViewProps {
  stats: UniversityCampusStats;
  buildings: BuildingData[];
  alerts: AlertItem[];
  onSelectBuilding: (buildingId: string) => void;
  onNavigateToAlerts: () => void;
  isArabic: boolean;
}

export const CentralUniversityView: React.FC<CentralUniversityViewProps> = ({
  stats,
  buildings,
  alerts,
  onSelectBuilding,
  onNavigateToAlerts,
  isArabic,
}) => {
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [highlightedBuildingId, setHighlightedBuildingId] = useState<string | null>(buildings[0]?.id || null);

  const zones = [
    { id: 'all', label: isArabic ? 'كافة المناطق' : 'All Zones' },
    { id: 'North Campus', label: isArabic ? 'المنطقة الشمالية' : 'North Campus' },
    { id: 'Central Campus', label: isArabic ? 'المنطقة المركزية' : 'Central Campus' },
    { id: 'South Campus', label: isArabic ? 'المنطقة الجنوبية' : 'South Campus' },
    { id: 'Innovation Quad', label: isArabic ? 'واحة الابتكار' : 'Innovation Quad' },
  ];

  // Filter buildings
  const filteredBuildings = buildings.filter((b) => {
    const matchesZone = selectedZone === 'all' || b.zone === selectedZone;
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.nameAr.includes(searchQuery) ||
      b.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesZone && matchesSearch;
  });

  // Calculate 24h peak campus power from hourly trend
  const hours = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
  const campusLoadPoints = [1420, 1890, 2350, 2680, 2468, 2210, 1920, 1740, 1510];
  const solarPoints = [80, 320, 680, 890, 742, 510, 140, 0, 0];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. University Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 md:p-8 text-white shadow-xl border border-slate-700/60">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                {isArabic ? 'الشاشة 1: نظرة الحرم الجامعي المركزية' : 'Screen 1: Central University View'}
              </span>
              <span className="text-xs text-slate-300">
                {isArabic ? 'الشبكة الكهروضوئية الذكية' : 'Campus Smart Microgrid'}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white">
              {isArabic ? stats.campusNameAr : stats.campusName}
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {isArabic
                ? 'لوحة المراقبة الشاملة لاستهلاك الطاقة المتجددة، إدارة أحمال المباني، وتفادي هدر الموارد عبر تقنيات الاستشعار اللحظي والذكاء الاصطناعي.'
                : 'Central telemetry command center monitoring renewable microgrid balance, building energy intensities (EUI), and real-time automated anomaly dispatch.'}
            </p>
          </div>

          {/* Quick Anomaly / Alerts CTA pill */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              id="btn-central-alerts-cta"
              onClick={onNavigateToAlerts}
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition text-rose-300 cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
                  <AlertTriangle className="h-5 w-5 animate-bounce" />
                </div>
                <div className="text-start">
                  <div className="text-xs font-bold uppercase tracking-wider text-rose-400">
                    {isArabic ? 'تنبيهات نشطة' : 'Active Anomalies'}
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {alerts.filter((a) => a.status === 'active').length} {isArabic ? 'تنبيه يحتاج متابعة' : 'Pending Actions'}
                  </div>
                </div>
              </div>
              <ChevronRight className={`h-4 w-4 text-rose-400 group-hover:translate-x-1 transition ${isArabic ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. Key Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
        
        {/* Total Campus Power */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">{isArabic ? 'إجمالي حمل الحرم' : 'Total Campus Load'}</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Zap className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {stats.totalLoadKw.toLocaleString()} <span className="text-xs font-normal text-slate-500">kW</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <TrendingDown className="h-3.5 w-3.5" />
            <span>5.4% {isArabic ? 'أقل من المخطط' : 'under baseline'}</span>
          </div>
        </div>

        {/* Solar PV Generation */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">{isArabic ? 'توليد الطاقة الشمسية' : 'Solar PV Output'}</span>
            <div className="p-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
              <Sun className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {stats.solarGenerationKw.toLocaleString()} <span className="text-xs font-normal text-slate-500">kW</span>
          </div>
          <div className="mt-2 text-xs font-medium text-cyan-600 dark:text-cyan-400">
            {stats.renewableSharePct}% {isArabic ? 'من طاقة الحرم الحالية' : 'of current demand'}
          </div>
        </div>

        {/* Battery & Microgrid */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">{isArabic ? 'سعة تخزين البطاريات' : 'Battery Storage'}</span>
            <div className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
              <BatteryCharging className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {stats.batteryStoragePct}% <span className="text-xs font-normal text-slate-500">({stats.batteryStorageKw} kW)</span>
          </div>
          <div className="mt-2 text-xs font-medium text-teal-600 dark:text-teal-400">
            {isArabic ? 'تفريغ ذكي للذروة' : 'Peak shaving ready'}
          </div>
        </div>

        {/* Carbon Offset Today */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">{isArabic ? 'انبعاثات CO2 الموفرة' : 'Carbon Abatement'}</span>
            <div className="p-1.5 rounded-lg bg-lime-50 dark:bg-lime-950/60 text-lime-600 dark:text-lime-400">
              <Leaf className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {stats.co2OffsetTodayKg.toLocaleString()} <span className="text-xs font-normal text-slate-500">kg</span>
          </div>
          <div className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            {isArabic ? 'يعادل زراعة 190 شجرة' : 'Eq. 190 trees today'}
          </div>
        </div>

        {/* Campus Occupancy */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">{isArabic ? 'إشغال الحرم الحالي' : 'Live Occupancy'}</span>
            <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {stats.activeOccupancy.toLocaleString()} <span className="text-xs font-normal text-slate-500">{isArabic ? 'شخص' : 'users'}</span>
          </div>
          <div className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            {stats.totalMonitoredRooms} {isArabic ? 'غرفة مراقبة' : 'monitored rooms'}
          </div>
        </div>

      </div>

      {/* 3. Interactive Campus Microgrid & Energy Map Component */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <span>{isArabic ? 'تخطيط الحرم الجامعي وشبكة الطاقة الذكية' : 'Interactive Campus Microgrid & Building Nodes'}</span>
          </h2>
          <span className="text-xs text-slate-500">
            {isArabic ? 'انقر على أي مبنى للانتقال إلى تفاصيله' : 'Click any node to navigate to Building Overview'}
          </span>
        </div>

        <CampusMapSvg
          buildings={buildings}
          selectedBuildingId={highlightedBuildingId}
          onSelectBuilding={(id) => setHighlightedBuildingId(id)}
          onNavigateToBuilding={(id) => onSelectBuilding(id)}
          isArabic={isArabic}
        />
      </div>

      {/* 4. Real-time Campus Hourly Curve (Load vs Solar) */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {isArabic ? 'منحنى الحمل الكهربائي وتوليد الطاقة الشمسية (24 ساعة)' : '24-Hour Campus Demand & Solar Generation Curve'}
            </h3>
            <p className="text-xs text-slate-500">
              {isArabic ? 'مقارنة الأحمال الفعلية مع سقف الذروة التعاقدي وإنتاج الخلايا الكهروضوئية' : 'Real-time grid draw vs solar microgrid generation vs baseline tariff peak'}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <span className="h-3 w-3 rounded-sm bg-emerald-500" />
              {isArabic ? 'الحمل الإجمالي (kW)' : 'Campus Load (kW)'}
            </span>
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <span className="h-3 w-3 rounded-sm bg-cyan-400" />
              {isArabic ? 'إنتاج الطاقة الشمسية (kW)' : 'Solar PV (kW)'}
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="h-0.5 w-4 bg-rose-400 border-t border-dashed border-rose-500" />
              {isArabic ? 'سقف ذروة التعرفة (2,750 kW)' : 'Peak Tariff Cap (2,750 kW)'}
            </span>
          </div>
        </div>

        {/* Responsive Custom SVG Area / Bar Chart */}
        <div className="h-56 w-full pt-4">
          <svg viewBox="0 0 800 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="loadAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="solarAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal grid lines */}
            {[0, 50, 100, 150].map((y) => (
              <line
                key={y}
                x1="40"
                y1={y}
                x2="780"
                y2={y}
                stroke="#94a3b8"
                strokeOpacity="0.2"
                strokeDasharray="4 4"
              />
            ))}

            {/* Peak cap line at 2750 kW (Y ~ 20) */}
            <line
              x1="40"
              y1="22"
              x2="780"
              y2="22"
              stroke="#f43f5e"
              strokeWidth="2"
              strokeDasharray="6 3"
            />
            <text x="770" y="16" textAnchor="end" fill="#f43f5e" fontSize="10" fontWeight="bold">
              2,750 kW PEAK
            </text>

            {/* Solar Generation Area */}
            <path
              d={`M 40 180 ${solarPoints
                .map((val, idx) => {
                  const x = 40 + idx * ((780 - 40) / (solarPoints.length - 1));
                  const y = 180 - (val / 3000) * 160;
                  return `L ${x} ${y}`;
                })
                .join(' ')} L 780 180 Z`}
              fill="url(#solarAreaGrad)"
            />
            <path
              d={`M 40 180 ${solarPoints
                .map((val, idx) => {
                  const x = 40 + idx * ((780 - 40) / (solarPoints.length - 1));
                  const y = 180 - (val / 3000) * 160;
                  return `L ${x} ${y}`;
                })
                .join(' ')}`}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2.5"
            />

            {/* Campus Load Area */}
            <path
              d={`M 40 180 ${campusLoadPoints
                .map((val, idx) => {
                  const x = 40 + idx * ((780 - 40) / (campusLoadPoints.length - 1));
                  const y = 180 - (val / 3000) * 160;
                  return `L ${x} ${y}`;
                })
                .join(' ')} L 780 180 Z`}
              fill="url(#loadAreaGrad)"
            />
            <path
              d={`M 40 180 ${campusLoadPoints
                .map((val, idx) => {
                  const x = 40 + idx * ((780 - 40) / (campusLoadPoints.length - 1));
                  const y = 180 - (val / 3000) * 160;
                  return `L ${x} ${y}`;
                })
                .join(' ')}`}
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
            />

            {/* Time labels on X Axis */}
            {hours.map((hr, idx) => {
              const x = 40 + idx * ((780 - 40) / (hours.length - 1));
              return (
                <text
                  key={hr}
                  x={x}
                  y="196"
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {hr}
                </text>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 5. Building Directory & Navigation Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              {isArabic ? 'مباني الحرم الجامعي والمرافق' : 'Campus Buildings Directory'}
            </h2>
            <p className="text-xs text-slate-500">
              {isArabic
                ? 'استكشف معدلات كفاءة الطاقة EUI، أحمال التكييف، والطاقة الشمسية لكل مبنى'
                : 'Drill down into individual buildings to review floor layouts and room telemetry'}
            </p>
          </div>

          {/* Search & Zone Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[200px]">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                id="input-building-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isArabic ? 'بحث باسم المبنى أو الكود...' : 'Search building or code...'}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
              />
            </div>

            {/* Zones pills */}
            <div className="flex items-center gap-1 overflow-x-auto">
              {zones.map((z) => (
                <button
                  key={z.id}
                  onClick={() => setSelectedZone(z.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    selectedZone === z.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {z.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Building Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBuildings.map((building) => {
            const isWarning = building.status === 'warning' || building.status === 'critical';
            const loadPercentOfBaseline = Math.round((building.currentPowerKw / building.baselineKw) * 100);

            return (
              <div
                key={building.id}
                id={`card-building-${building.id}`}
                className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-lg hover:border-emerald-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Code, Zone, Status */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                        {building.code} • {isArabic ? building.zoneAr : building.zone}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition line-clamp-1">
                        {isArabic ? building.nameAr : building.name}
                      </h3>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                        isWarning
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                      }`}
                    >
                      {isWarning
                        ? isArabic ? 'تنبيه استهلاك' : 'High Load'
                        : isArabic ? 'كفاءة مثالية' : 'Optimal'}
                    </span>
                  </div>

                  {/* Power & Solar Telemetry Numbers */}
                  <div className="grid grid-cols-3 gap-2 my-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 text-center">
                    <div>
                      <span className="text-[10px] text-slate-400 block">{isArabic ? 'الحمل الحالي' : 'Live Load'}</span>
                      <span className="text-sm font-black font-mono text-slate-900 dark:text-white">
                        {building.currentPowerKw} <span className="text-[10px] font-normal">kW</span>
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block">{isArabic ? 'الطاقة الشمسية' : 'Solar PV'}</span>
                      <span className="text-sm font-black font-mono text-cyan-600 dark:text-cyan-400">
                        {building.solarRoofKw} <span className="text-[10px] font-normal">kW</span>
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block">{isArabic ? 'مؤشر EUI' : 'EUI'}</span>
                      <span className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400">
                        {building.eui} <span className="text-[10px] font-normal">kWh/m²</span>
                      </span>
                    </div>
                  </div>

                  {/* Progress vs Baseline */}
                  <div className="space-y-1 my-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{isArabic ? 'مستوى الحمل مقابل المخطط' : 'Demand vs Baseline'}</span>
                      <span className={`font-mono font-bold ${loadPercentOfBaseline > 100 ? 'text-amber-500' : 'text-emerald-500'}`}>
                        {loadPercentOfBaseline}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          loadPercentOfBaseline > 100 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(loadPercentOfBaseline, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Metadata Chips: Floors, Occupancy, HVAC */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mb-4">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
                      {building.floorsCount} {isArabic ? 'طوابق' : 'Floors'}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
                      {building.occupancyCurrent}/{building.occupancyMax} {isArabic ? 'شخص' : 'Occupants'}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-medium">
                      {isArabic ? building.hvacModeAr : building.hvacMode}
                    </span>
                  </div>
                </div>

                {/* Navigation CTA: Go to Screen 2 */}
                <button
                  id={`btn-open-building-${building.id}`}
                  onClick={() => onSelectBuilding(building.id)}
                  className="w-full mt-2 py-2 px-4 rounded-xl bg-slate-100 hover:bg-emerald-600 text-slate-700 hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-emerald-600 dark:hover:text-white font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:bg-emerald-600 group-hover:text-white"
                >
                  <span>{isArabic ? 'نظرة عامة على المبنى (الشاشة 2)' : 'Open Building Overview (Screen 2)'}</span>
                  <ChevronRight className={`h-3.5 w-3.5 ${isArabic ? 'rotate-180' : ''}`} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
