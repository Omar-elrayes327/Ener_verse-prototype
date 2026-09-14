'use client';

import React, { useState } from 'react';
import { BuildingData, RoomData, AlertItem } from '../lib/types';
import {
  Building2,
  Zap,
  Sun,
  Layers,
  Users,
  Gauge,
  Thermometer,
  Wind,
  ShieldAlert,
  ArrowLeft,
  ChevronRight,
  Sliders,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Fan,
  Activity,
} from 'lucide-react';

interface BuildingOverviewProps {
  building: BuildingData;
  allBuildings: BuildingData[];
  alerts: AlertItem[];
  onSelectBuilding: (id: string) => void;
  onSelectRoom: (roomId: string) => void;
  onBackToCentral: () => void;
  onNavigateToAlerts: () => void;
  onToggleBuildingEcoMode: (buildingId: string) => void;
  isArabic: boolean;
}

export const BuildingOverview: React.FC<BuildingOverviewProps> = ({
  building,
  allBuildings,
  alerts,
  onSelectBuilding,
  onSelectRoom,
  onBackToCentral,
  onNavigateToAlerts,
  onToggleBuildingEcoMode,
  isArabic,
}) => {
  const [selectedFloorNumber, setSelectedFloorNumber] = useState<number>(
    building.floors[0]?.floorNumber || 1
  );
  const [roomFilterType, setRoomFilterType] = useState<string>('all');
  const [daylightHarvesting, setDaylightHarvesting] = useState<boolean>(true);
  const [peakDemandLimiter, setPeakDemandLimiter] = useState<boolean>(
    building.hvacMode === 'Peak-Shaving'
  );

  // Active floor
  const currentFloor =
    building.floors.find((f) => f.floorNumber === selectedFloorNumber) ||
    building.floors[0];

  // Filtered rooms on this floor
  const filteredRooms = currentFloor
    ? currentFloor.rooms.filter((r) => {
        if (roomFilterType === 'all') return true;
        return r.type === roomFilterType;
      })
    : [];

  // Building specific alerts
  const buildingAlerts = alerts.filter(
    (a) => a.buildingId === building.id && a.status === 'active'
  );

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header with Breadcrumbs, Switcher & Navigation back */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button
              onClick={onBackToCentral}
              className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              <ArrowLeft className={`h-3.5 w-3.5 ${isArabic ? 'rotate-180' : ''}`} />
              <span>{isArabic ? 'العودة لنظرة الحرم (الشاشة 1)' : 'Back to Central University View'}</span>
            </button>
            <span>/</span>
            <span className="text-slate-400 font-mono">{building.code}</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold text-[10px]">
              {isArabic ? 'الشاشة 2: نظرة عامة على المبنى' : 'Screen 2: Building Overview'}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <Building2 className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            <span>{isArabic ? building.nameAr : building.name}</span>
          </h1>

          <p className="text-xs text-slate-500">
            {isArabic ? building.zoneAr : building.zone} • {building.areaSqm.toLocaleString()} m² •{' '}
            {building.floorsCount} {isArabic ? 'طوابق مجهزة بأنظمة IoT' : 'IoT-Monitored Floors'}
          </p>
        </div>

        {/* Building Selector Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-slate-500 whitespace-nowrap hidden sm:inline">
            {isArabic ? 'تبديل المبنى:' : 'Switch Building:'}
          </label>
          <select
            id="select-building-switcher"
            value={building.id}
            onChange={(e) => onSelectBuilding(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
          >
            {allBuildings.map((b) => (
              <option key={b.id} value={b.id}>
                {b.code} - {isArabic ? b.nameAr : b.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Building Hero Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        {/* Current Power */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 block">{isArabic ? 'الحمل اللحظي' : 'Active Power'}</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1">
            {building.currentPowerKw} <span className="text-xs font-normal text-slate-500">kW</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1 font-mono">
            {isArabic ? 'المخطط:' : 'Target:'} {building.baselineKw} kW
          </span>
        </div>

        {/* Solar Roof PV */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 block">{isArabic ? 'طاقة السطح الشمسية' : 'Rooftop Solar PV'}</span>
          <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400 font-mono mt-1">
            {building.solarRoofKw} <span className="text-xs font-normal text-slate-500">kW</span>
          </div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-1 font-semibold">
            {Math.round((building.solarRoofKw / building.currentPowerKw) * 100)}% {isArabic ? 'اكتفاء ذاتي' : 'Self-supplied'}
          </span>
        </div>

        {/* Energy Use Intensity (EUI) */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 block">{isArabic ? 'كثافة الطاقة EUI' : 'Energy Intensity'}</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1">
            {building.eui} <span className="text-xs font-normal text-slate-500">kWh/m²</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">
            {building.eui < 120 ? (isArabic ? 'تصنيف A+ أخضر' : 'LEED Gold Level') : (isArabic ? 'تحت التدقيق' : 'Standard')}
          </span>
        </div>

        {/* Average Temperature */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 block">{isArabic ? 'متوسط الحرارة' : 'Avg Temperature'}</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1">
            {building.temperatureAvg}°C
          </div>
          <span className="text-[10px] text-slate-400 block mt-1 flex items-center gap-1">
            <Thermometer className="h-3 w-3 text-amber-500" />
            {isArabic ? 'ضبط مريح 22-23°' : 'Set to comfort band'}
          </span>
        </div>

        {/* Indoor Air Quality CO2 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 block">{isArabic ? 'جودة الهواء CO2' : 'Indoor Air CO2'}</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1">
            {building.co2PpmAvg} <span className="text-xs font-normal text-slate-500">ppm</span>
          </div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-1 font-semibold">
            {building.co2PpmAvg < 600 ? (isArabic ? 'نقاء ممتاز' : 'Optimal Fresh Air') : (isArabic ? 'مقبول' : 'Acceptable')}
          </span>
        </div>

        {/* Current Occupancy */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 block">{isArabic ? 'الإشغال الحالي' : 'Live Occupants'}</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1">
            {building.occupancyCurrent} <span className="text-xs font-normal text-slate-500">/ {building.occupancyMax}</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">
            {Math.round((building.occupancyCurrent / building.occupancyMax) * 100)}% {isArabic ? 'إشغال المساحات' : 'Occupancy Rate'}
          </span>
        </div>
      </div>

      {/* 3. Building Automation & Demand Response Controls Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-500/30 text-white shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                {isArabic ? 'التحكم الذكي واستجابة الطلب للمبنى' : 'Building Intelligent Energy Setback & Demand Response'}
              </h3>
            </div>
            <p className="text-xs text-slate-300">
              {isArabic
                ? 'تفعيل خوارزميات التعديل اللحظي لدرجات حرارة التكييف وحصاد ضوء النهار لخفض الحمل بمعدل 12% دون التأثير على راحة الطلاب.'
                : 'Automated campus setback dynamically modulates HVAC setpoints and dims perimeter fixtures according to ambient solar flux.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Eco Setback Toggle */}
            <button
              id={`btn-toggle-eco-${building.id}`}
              onClick={() => onToggleBuildingEcoMode(building.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm ${
                building.hvacMode === 'Eco-Setback'
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              <Fan className="h-3.5 w-3.5" />
              <span>
                {building.hvacMode === 'Eco-Setback'
                  ? isArabic ? 'التحكم التوفيري: مفعّل (-12%)' : 'Eco-Setback: Active (-12%)'
                  : isArabic ? 'تفعيل التحكم التوفيري' : 'Enable Eco-Setback'}
              </span>
            </button>

            {/* Daylight Harvesting */}
            <button
              id="btn-toggle-daylight-harvest"
              onClick={() => setDaylightHarvesting(!daylightHarvesting)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                daylightHarvesting
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              <Lightbulb className="h-3.5 w-3.5" />
              <span>{isArabic ? 'حصاد ضوء النهار' : 'Daylight Harvesting'}</span>
            </button>

            {/* Peak Demand Limiter */}
            <button
              id="btn-toggle-peak-limiter"
              onClick={() => setPeakDemandLimiter(!peakDemandLimiter)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                peakDemandLimiter
                  ? 'bg-amber-950 text-amber-300 border border-amber-700'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>{isArabic ? 'حماية سقف الذروة' : 'Peak Shaving'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Subsystems Energy Breakdown Bar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {isArabic ? 'توزيع استهلاك الطاقة حسب المنظومات الفرعية' : 'Subsystems Electrical Load Distribution'}
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            {isArabic ? 'إجمالي الحمل:' : 'Total:'} {building.currentPowerKw} kW
          </span>
        </div>

        {/* Stacked multi-color bar */}
        <div className="h-4 w-full rounded-full overflow-hidden flex shadow-inner bg-slate-100 dark:bg-slate-800">
          <div
            style={{ width: `${building.systemsBreakdown.hvac}%` }}
            className="bg-emerald-500 hover:opacity-90 transition-all"
            title={`HVAC: ${building.systemsBreakdown.hvac}%`}
          />
          <div
            style={{ width: `${building.systemsBreakdown.plugs}%` }}
            className="bg-indigo-500 hover:opacity-90 transition-all"
            title={`Equipment & Plugs: ${building.systemsBreakdown.plugs}%`}
          />
          <div
            style={{ width: `${building.systemsBreakdown.lighting}%` }}
            className="bg-amber-400 hover:opacity-90 transition-all"
            title={`Smart Lighting: ${building.systemsBreakdown.lighting}%`}
          />
          <div
            style={{ width: `${building.systemsBreakdown.specialized}%` }}
            className="bg-cyan-400 hover:opacity-90 transition-all"
            title={`Specialized / Servers: ${building.systemsBreakdown.specialized}%`}
          />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded bg-emerald-500" />
            <span className="text-slate-600 dark:text-slate-400 font-medium">
              {isArabic ? 'التكييف والتهوية' : 'HVAC Chillers'}: {building.systemsBreakdown.hvac}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded bg-indigo-500" />
            <span className="text-slate-600 dark:text-slate-400 font-medium">
              {isArabic ? 'المقابس والأجهزة' : 'Plug Loads'}: {building.systemsBreakdown.plugs}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded bg-amber-400" />
            <span className="text-slate-600 dark:text-slate-400 font-medium">
              {isArabic ? 'الإضاءة الذكية' : 'Lighting'}: {building.systemsBreakdown.lighting}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded bg-cyan-400" />
            <span className="text-slate-600 dark:text-slate-400 font-medium">
              {isArabic ? 'معامل ومعدات خاصة' : 'Research / IT'}: {building.systemsBreakdown.specialized}%
            </span>
          </div>
        </div>
      </div>

      {/* 5. Active Building Alerts banner (if any) */}
      {buildingAlerts.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-500">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500">
                {isArabic ? 'تنبيهات استهلاك تخص هذا المبنى' : 'Active Anomaly in this Building'}
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                {isArabic ? buildingAlerts[0].titleAr : buildingAlerts[0].title}
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToAlerts}
            className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition cursor-pointer whitespace-nowrap"
          >
            {isArabic ? 'معاينة في التنبيهات (الشاشة 4)' : 'Review in Alerts (Screen 4)'}
          </button>
        </div>
      )}

      {/* 6. Floor Selector & Room Telemetry Matrix */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span>{isArabic ? 'مخطط الطوابق والغرف والمختبرات' : 'Floor Plans & Monitored Rooms'}</span>
            </h2>
            <p className="text-xs text-slate-500">
              {isArabic
                ? 'حدد الطابق والغرفة للانتقال إلى تفاصيل الحساسات والتحكم (الشاشة 3)'
                : 'Select any room below to transition into Screen 3 (Room Details & Telemetry)'}
            </p>
          </div>

          {/* Room type filter */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {[
              { id: 'all', label: isArabic ? 'كافة الغرف' : 'All' },
              { id: 'lab', label: isArabic ? 'معامل' : 'Labs' },
              { id: 'classroom', label: isArabic ? 'قاعات' : 'Halls' },
              { id: 'auditorium', label: isArabic ? 'مدرجات' : 'Auditorium' },
              { id: 'server_room', label: isArabic ? 'خوادم' : 'Servers' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setRoomFilterType(t.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  roomFilterType === t.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Floor Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800">
          {building.floors.map((floor) => {
            const isFloorActive = floor.floorNumber === selectedFloorNumber;
            return (
              <button
                key={floor.floorNumber}
                id={`tab-floor-${floor.floorNumber}`}
                onClick={() => setSelectedFloorNumber(floor.floorNumber)}
                className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer whitespace-nowrap border-b-2 ${
                  isFloorActive
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>
                  {isArabic ? `الدور ${floor.floorNumber}` : `Floor ${floor.floorNumber}`}
                </span>
                <span className="px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-700 text-[10px] font-mono">
                  {floor.rooms.length} {isArabic ? 'غرف' : 'rooms'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Floor Title and Load */}
        <div className="flex items-center justify-between py-1 text-xs text-slate-500 font-medium">
          <span>{isArabic ? currentFloor?.nameAr : currentFloor?.name}</span>
          <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
            {isArabic ? 'حمل الطابق:' : 'Floor Load:'} {currentFloor?.powerKw} kW
          </span>
        </div>

        {/* Rooms Grid for this floor */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRooms.map((room) => {
            const isWarning = room.powerKw > room.baselineKw;

            return (
              <div
                key={room.id}
                id={`card-room-${room.id}`}
                className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                        {room.code} • {room.areaSqm} m²
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-600 transition">
                        {isArabic ? room.nameAr : room.name}
                      </h4>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isWarning
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                      }`}
                    >
                      {isWarning
                        ? isArabic ? 'استهلاك مرتفع' : 'Over Target'
                        : isArabic ? 'طبيعي' : 'Optimal'}
                    </span>
                  </div>

                  {/* Room telemetry preview */}
                  <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 text-center my-3">
                    <div>
                      <span className="text-[10px] text-slate-400 block">{isArabic ? 'القدرة' : 'Power'}</span>
                      <span className="text-xs font-black font-mono text-slate-900 dark:text-white">
                        {room.powerKw} kW
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">{isArabic ? 'الحرارة' : 'Temp'}</span>
                      <span className="text-xs font-black font-mono text-emerald-600 dark:text-emerald-400">
                        {room.telemetry.temperature}°C
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">{isArabic ? 'الإشغال' : 'Users'}</span>
                      <span className="text-xs font-black font-mono text-slate-700 dark:text-slate-300">
                        {room.telemetry.occupancy}/{room.telemetry.capacity}
                      </span>
                    </div>
                  </div>

                  {/* Controls preview */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3 px-1">
                    <span>
                      {isArabic ? 'وضع التكييف:' : 'HVAC:'}{' '}
                      <strong className="text-slate-700 dark:text-slate-300 uppercase">
                        {room.controls.hvacMode} ({room.controls.thermostatSetpoint}°C)
                      </strong>
                    </span>
                    <span>
                      {isArabic ? 'الإضاءة:' : 'Light:'}{' '}
                      <strong className="text-slate-700 dark:text-slate-300">
                        {room.controls.lightingLevel}%
                      </strong>
                    </span>
                  </div>
                </div>

                {/* Drilldown CTA into Screen 3 */}
                <button
                  id={`btn-open-room-${room.id}`}
                  onClick={() => onSelectRoom(room.id)}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>{isArabic ? 'تفاصيل الغرفة والتحكم (الشاشة 3)' : 'Open Room Details (Screen 3)'}</span>
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
