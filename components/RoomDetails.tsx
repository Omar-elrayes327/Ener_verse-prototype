'use client';

import React, { useState } from 'react';
import { RoomData, BuildingData } from '../lib/types';
import {
  LayoutGrid,
  ArrowLeft,
  Zap,
  Thermometer,
  Droplets,
  Wind,
  Volume2,
  Sun,
  Users,
  DoorClosed,
  DoorOpen,
  Power,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  Fan,
  Moon,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

interface RoomDetailsProps {
  room: RoomData;
  building: BuildingData;
  onBackToBuilding: () => void;
  onBackToCentral: () => void;
  onUpdateRoomControls: (roomId: string, newControls: Partial<RoomData['controls']>) => void;
  isArabic: boolean;
}

export const RoomDetails: React.FC<RoomDetailsProps> = ({
  room,
  building,
  onBackToBuilding,
  onBackToCentral,
  onUpdateRoomControls,
  isArabic,
}) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const controls = room.controls;
  const telemetry = room.telemetry;

  const handleSetpointChange = (delta: number) => {
    const nextVal = Math.round((controls.thermostatSetpoint + delta) * 10) / 10;
    if (nextVal >= 18 && nextVal <= 28) {
      onUpdateRoomControls(room.id, { thermostatSetpoint: nextVal });
      triggerFeedback(
        isArabic
          ? `تم ضبط منظم الحرارة على ${nextVal}°C`
          : `Thermostat setpoint adjusted to ${nextVal}°C`
      );
    }
  };

  const handleHvacMode = (mode: 'cool' | 'heat' | 'eco' | 'auto' | 'off') => {
    onUpdateRoomControls(room.id, { hvacMode: mode });
    triggerFeedback(
      isArabic ? `تم تبديل وضع التكييف إلى ${mode}` : `HVAC mode set to ${mode.toUpperCase()}`
    );
  };

  const handleLightingLevel = (level: number) => {
    onUpdateRoomControls(room.id, { lightingLevel: level });
  };

  const handleLightingMode = (mode: 'circadian' | 'manual' | 'eco_sensor' | 'schedule') => {
    onUpdateRoomControls(room.id, { lightingMode: mode });
    triggerFeedback(
      isArabic ? `تم تفعيل نمط الإضاءة: ${mode}` : `Lighting mode updated: ${mode}`
    );
  };

  const handleToggleSocketCut = () => {
    const next = !controls.socketPowerCut;
    onUpdateRoomControls(room.id, { socketPowerCut: next });
    triggerFeedback(
      next
        ? isArabic ? 'تم قطع طاقة الانتظار عن المقابس الخاملة' : 'Idle standby socket power disconnected'
        : isArabic ? 'تمت إعادة تشغيل كافة المقابس' : 'All socket power restored'
    );
  };

  const handleToggleEcoSchedule = () => {
    const next = !controls.ecoScheduleActive;
    onUpdateRoomControls(room.id, { ecoScheduleActive: next });
    triggerFeedback(
      next
        ? isArabic ? 'تم تفعيل جدول الاستشعار البيئي الذكي' : 'Smart eco-occupancy schedule enabled'
        : isArabic ? 'تم إلغاء تفعيل الجدول الذكي' : 'Smart schedule disabled'
    );
  };

  const triggerFeedback = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  // Quick apply recommended eco settings
  const applyRecommendedEco = () => {
    onUpdateRoomControls(room.id, {
      thermostatSetpoint: 23.0,
      hvacMode: 'eco',
      fanSpeed: 'auto',
      lightingLevel: 65,
      lightingMode: 'eco_sensor',
      socketPowerCut: true,
      ecoScheduleActive: true,
    });
    triggerFeedback(
      isArabic
        ? 'تم تطبيق إعدادات الطاقة الموصى بها بنجاح (-22% استهلاك)'
        : 'Recommended Eco-Profile deployed (-22% load reduction)'
    );
  };

  const isOverBaseline = room.powerKw > room.baselineKw;

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Breadcrumbs and Return Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <button
              onClick={onBackToCentral}
              className="hover:text-emerald-600 font-medium cursor-pointer"
            >
              {isArabic ? 'الحرم الجامعي' : 'Campus'}
            </button>
            <span>/</span>
            <button
              onClick={onBackToBuilding}
              className="hover:text-emerald-600 font-medium cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className={`h-3 w-3 ${isArabic ? 'rotate-180' : ''}`} />
              <span>{isArabic ? building.nameAr : building.name}</span>
            </button>
            <span>/</span>
            <span className="font-mono text-slate-400">{room.floorName}</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
              {isArabic ? 'الشاشة 3: تفاصيل الغرفة والتحكم' : 'Screen 3: Room Details & Telemetry'}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <LayoutGrid className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            <span>{isArabic ? room.nameAr : room.name}</span>
          </h1>

          <p className="text-xs text-slate-500">
            {room.code} • {room.areaSqm} m² • {isArabic ? building.nameAr : building.name}
          </p>
        </div>

        {/* Quick Nav back to building */}
        <div className="flex items-center gap-2">
          <button
            id="btn-back-to-building"
            onClick={onBackToBuilding}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <ArrowLeft className={`h-3.5 w-3.5 ${isArabic ? 'rotate-180' : ''}`} />
            <span>{isArabic ? 'العودة لنظرة المبنى (الشاشة 2)' : 'Return to Building (Screen 2)'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-500 text-slate-950 text-xs font-bold flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 fill-slate-950 text-emerald-300" />
            <span>{successMessage}</span>
          </div>
          <span className="text-[10px] uppercase font-mono tracking-wider opacity-80">
            {isArabic ? 'تم التحديث لحظياً' : 'Updated Live'}
          </span>
        </div>
      )}

      {/* 2. Room Power Meter Hero & Sub-loads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Main Live Power Gauge Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    {isArabic ? 'استهلاك الطاقة اللحظي' : 'Active Room Power'}
                  </span>
                  <span className="text-xs text-slate-400">
                    {isArabic ? 'الهدف المرجعي:' : 'Baseline Target:'} {room.baselineKw} kW
                  </span>
                </div>
              </div>

              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  isOverBaseline
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                }`}
              >
                {isOverBaseline
                  ? isArabic ? 'تجاوز الهدف' : 'Above Target'
                  : isArabic ? 'ضمن المعدل' : 'Optimal'}
              </span>
            </div>

            <div className="text-center my-4">
              <div className="text-5xl font-black font-mono text-slate-900 dark:text-white">
                {room.powerKw}
                <span className="text-base font-normal text-slate-500 ml-1">kW</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {Math.round((room.powerKw / (room.areaSqm || 1)) * 1000)} W/m² {isArabic ? 'كثافة الطاقة للمساحة' : 'power density'}
              </p>
            </div>

            {/* Gauge bar */}
            <div className="space-y-1.5 my-2">
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>0 kW</span>
                <span>{room.baselineKw} kW (Target)</span>
                <span>{room.baselineKw * 1.5} kW</span>
              </div>
              <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isOverBaseline ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min((room.powerKw / (room.baselineKw * 1.3)) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Recommend Button */}
          <button
            id="btn-apply-recommended-eco"
            onClick={applyRecommendedEco}
            className="w-full mt-4 py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span>{isArabic ? 'تطبيق إعدادات الطاقة الموصى بها' : 'Apply Recommended Eco-Settings'}</span>
          </button>
        </div>

        {/* Sub-system Power Breakdown */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              {isArabic ? 'تفكيك أحمال أجهزة الغرفة' : 'Room Loads & Equipment Breakdown'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {isArabic ? 'المقاييس اللحظية لأجهزة التكييف والإضاءة والمعدات' : 'Individual sub-metering feeds from smart breaker circuits'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* HVAC */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[11px] font-semibold">{isArabic ? 'التكييف والحرارة' : 'HVAC'}</span>
                  <Fan className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                  {room.powerBreakdown.hvac} <span className="text-xs font-normal">kW</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {Math.round((room.powerBreakdown.hvac / room.powerKw) * 100)}% {isArabic ? 'من الحمل' : 'of room'}
                </span>
              </div>

              {/* Lighting */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[11px] font-semibold">{isArabic ? 'الإضاءة' : 'Lighting'}</span>
                  <Sun className="h-4 w-4 text-amber-500" />
                </div>
                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                  {room.powerBreakdown.lighting} <span className="text-xs font-normal">kW</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {Math.round((room.powerBreakdown.lighting / room.powerKw) * 100)}% {isArabic ? 'من الحمل' : 'of room'}
                </span>
              </div>

              {/* Equipment / Lab work */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[11px] font-semibold">{isArabic ? 'المعدات والأجهزة' : 'Equipment'}</span>
                  <Zap className="h-4 w-4 text-indigo-500" />
                </div>
                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                  {room.powerBreakdown.equipment} <span className="text-xs font-normal">kW</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {Math.round((room.powerBreakdown.equipment / room.powerKw) * 100)}% {isArabic ? 'من الحمل' : 'of room'}
                </span>
              </div>

              {/* Standby */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-[11px] font-semibold">{isArabic ? 'وضع الانتظار' : 'Standby'}</span>
                  <Moon className="h-4 w-4 text-cyan-500" />
                </div>
                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                  {room.powerBreakdown.standby} <span className="text-xs font-normal">kW</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {controls.socketPowerCut
                    ? isArabic ? 'مفصول' : 'Isolated'
                    : isArabic ? 'نشط' : 'Drawing'}
                </span>
              </div>
            </div>
          </div>

          {/* Door / Window Contact Sensor Bar */}
          <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              {telemetry.doorOpen ? (
                <DoorOpen className="h-4 w-4 text-amber-500" />
              ) : (
                <DoorClosed className="h-4 w-4 text-emerald-500" />
              )}
              <span className="text-slate-600 dark:text-slate-300">
                {isArabic ? 'حساس الباب والنافذة المغناطيسي:' : 'Magnetic Window/Door Contact:'}{' '}
                <strong className={telemetry.doorOpen ? 'text-amber-600 font-bold' : 'text-emerald-600 font-bold'}>
                  {telemetry.doorOpen
                    ? isArabic ? 'مفتوح (احتمال تسريب تكييف)' : 'Open (Potential thermal loss)'
                    : isArabic ? 'محكم الإغلاق' : 'Securely Sealed'}
                </strong>
              </span>
            </div>

            <span className="text-[10px] font-mono text-slate-400">IoT Sensor ID: 92-D0</span>
          </div>
        </div>
      </div>

      {/* 3. Live IoT Environmental Telemetry Grid */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {isArabic ? 'مصفوفة الحساسات البيئية اللحظية (IoT Telemetry)' : 'Real-Time Environmental IoT Telemetry'}
            </h3>
            <p className="text-xs text-slate-500">
              {isArabic ? 'بيانات الراحة الحرارية وجودة الهواء ومستويات الإشغال' : 'High-precision room climate, acoustic, and occupant telemetry'}
            </p>
          </div>
          <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            {isArabic ? 'تحديث كل ثانية' : '1s Stream'}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Temperature */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 text-center">
            <Thermometer className="h-5 w-5 text-rose-500 mx-auto mb-1" />
            <span className="text-[11px] text-slate-400 block">{isArabic ? 'درجة الحرارة' : 'Temperature'}</span>
            <span className="text-xl font-black font-mono text-slate-900 dark:text-white">
              {telemetry.temperature}°C
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-0.5">
              {isArabic ? 'نطاق مريح' : 'Comfortable'}
            </span>
          </div>

          {/* Humidity */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 text-center">
            <Droplets className="h-5 w-5 text-sky-500 mx-auto mb-1" />
            <span className="text-[11px] text-slate-400 block">{isArabic ? 'الرطوبة النسبية' : 'Rel. Humidity'}</span>
            <span className="text-xl font-black font-mono text-slate-900 dark:text-white">
              {telemetry.humidity}%
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">{isArabic ? 'مثالية 40-50%' : 'Optimal'}</span>
          </div>

          {/* CO2 Air Quality */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 text-center">
            <Wind className="h-5 w-5 text-teal-500 mx-auto mb-1" />
            <span className="text-[11px] text-slate-400 block">{isArabic ? 'جودة الهواء CO2' : 'Indoor CO2'}</span>
            <span className="text-xl font-black font-mono text-slate-900 dark:text-white">
              {telemetry.co2Ppm} <span className="text-[10px] font-normal">ppm</span>
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-0.5">
              {telemetry.co2Ppm < 600 ? (isArabic ? 'هواء نقي جداً' : 'Fresh Clean') : (isArabic ? 'معتدل' : 'Moderate')}
            </span>
          </div>

          {/* Occupancy */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 text-center">
            <Users className="h-5 w-5 text-indigo-500 mx-auto mb-1" />
            <span className="text-[11px] text-slate-400 block">{isArabic ? 'الشاغلون الحاليون' : 'Occupancy'}</span>
            <span className="text-xl font-black font-mono text-slate-900 dark:text-white">
              {telemetry.occupancy} <span className="text-[10px] font-normal">/ {telemetry.capacity}</span>
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {Math.round((telemetry.occupancy / telemetry.capacity) * 100)}% {isArabic ? 'استيعاب' : 'Capacity'}
            </span>
          </div>

          {/* Illuminance Lux */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 text-center">
            <Sun className="h-5 w-5 text-amber-500 mx-auto mb-1" />
            <span className="text-[11px] text-slate-400 block">{isArabic ? 'شدة الإضاءة' : 'Illuminance'}</span>
            <span className="text-xl font-black font-mono text-slate-900 dark:text-white">
              {telemetry.lightLux} <span className="text-[10px] font-normal">lux</span>
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">{isArabic ? 'معايير العمل' : 'Standard'}</span>
          </div>

          {/* Acoustic Sound */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 text-center">
            <Volume2 className="h-5 w-5 text-purple-500 mx-auto mb-1" />
            <span className="text-[11px] text-slate-400 block">{isArabic ? 'مستوى الضجيج' : 'Acoustic'}</span>
            <span className="text-xl font-black font-mono text-slate-900 dark:text-white">
              {telemetry.noiseDb} <span className="text-[10px] font-normal">dB</span>
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {telemetry.noiseDb < 50 ? (isArabic ? 'هادئ' : 'Quiet') : (isArabic ? 'نشاط عمل' : 'Active')}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Interactive Room Controls Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Climate & Thermostat Controls */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <Fan className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isArabic ? 'التحكم بالحرارة والتكييف الذكي' : 'Smart Climate & Thermostat'}
              </h3>
            </div>

            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {controls.hvacMode.toUpperCase()}
            </span>
          </div>

          {/* Setpoint Adjuster */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 block">{isArabic ? 'درجة الحرارة المستهدفة' : 'Target Setpoint'}</span>
              <span className="text-3xl font-black font-mono text-slate-900 dark:text-white">
                {controls.thermostatSetpoint.toFixed(1)}°C
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-temp-minus"
                onClick={() => handleSetpointChange(-0.5)}
                className="h-10 w-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-lg font-bold flex items-center justify-center transition cursor-pointer"
              >
                -
              </button>
              <button
                id="btn-temp-plus"
                onClick={() => handleSetpointChange(0.5)}
                className="h-10 w-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-lg font-bold flex items-center justify-center transition cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* HVAC Modes */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-500 block">{isArabic ? 'وضع التشغيل' : 'Operating Mode'}</span>
            <div className="grid grid-cols-4 gap-2">
              {(['cool', 'heat', 'eco', 'auto'] as const).map((mode) => (
                <button
                  key={mode}
                  id={`btn-mode-${mode}`}
                  onClick={() => handleHvacMode(mode)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold uppercase transition cursor-pointer ${
                    controls.hvacMode === mode
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Fan Speed */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-500 block">{isArabic ? 'سرعة المروحة' : 'Fan Speed'}</span>
            <div className="grid grid-cols-4 gap-2">
              {(['low', 'med', 'high', 'auto'] as const).map((speed) => (
                <button
                  key={speed}
                  onClick={() => onUpdateRoomControls(room.id, { fanSpeed: speed })}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                    controls.fanSpeed === speed
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {speed.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Smart Lighting & Standby Outlets Control */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                <Sun className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isArabic ? 'الإضاءة والمقابس الذكية' : 'Smart Lighting & Power Outlets'}
              </h3>
            </div>

            <span className="text-xs font-mono font-bold text-amber-500">
              {controls.lightingLevel}%
            </span>
          </div>

          {/* Dimmer Slider */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>{isArabic ? 'مستوى شدة الإضاءة' : 'Light Dimming Level'}</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{controls.lightingLevel}%</span>
            </div>
            <input
              id="slider-light-dimmer"
              type="range"
              min="0"
              max="100"
              value={controls.lightingLevel}
              onChange={(e) => handleLightingLevel(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0% ({isArabic ? 'إطفاء' : 'Off'})</span>
              <span>50%</span>
              <span>100% ({isArabic ? 'كامل' : 'Full'})</span>
            </div>
          </div>

          {/* Lighting Mode Selector */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-500 block">{isArabic ? 'نمط الإضاءة' : 'Lighting Automation Mode'}</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleLightingMode('circadian')}
                className={`p-2.5 rounded-xl border text-start transition cursor-pointer ${
                  controls.lightingMode === 'circadian'
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span className="block font-semibold">{isArabic ? 'المزامنة الحيوية (Circadian)' : 'Circadian Sync'}</span>
                <span className="text-[10px] text-slate-400 block">{isArabic ? 'يحاكي نور الشمس الطبيعي' : 'Syncs with sunlight'}</span>
              </button>

              <button
                onClick={() => handleLightingMode('eco_sensor')}
                className={`p-2.5 rounded-xl border text-start transition cursor-pointer ${
                  controls.lightingMode === 'eco_sensor'
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span className="block font-semibold">{isArabic ? 'حساس الحركة البيئي' : 'Occupancy Sensor'}</span>
                <span className="text-[10px] text-slate-400 block">{isArabic ? 'إطفاء عند الخلو' : 'Auto off when vacant'}</span>
              </button>
            </div>
          </div>

          {/* Standby Socket Kill Switch */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                {isArabic ? 'عزل أحمال الانتظار للمقابس' : 'Isolate Standby Socket Outlets'}
              </span>
              <span className="text-[11px] text-slate-500 block">
                {isArabic ? 'فصل الشاشات والمعدات الخاملة عن بُعد' : 'Cut parasitic power to idle workstations'}
              </span>
            </div>

            <button
              id="btn-toggle-socket-cut"
              onClick={handleToggleSocketCut}
              className={`p-2 rounded-xl transition cursor-pointer ${
                controls.socketPowerCut
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Power className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Hourly Room Profile Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {isArabic ? 'سجل استهلاك الغرفة اليومي (kW)' : 'Room Hourly Energy Profile (Actual vs Baseline)'}
            </h3>
            <p className="text-xs text-slate-500">
              {isArabic ? 'مقارنة الاستهلاك بالسقف المرجعي المخصص للغرفة' : 'Tracking power draw across scheduled hours with IoT readings'}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <span className="h-3 w-3 rounded-sm bg-emerald-500" />
              {isArabic ? 'الاستهلاك الفعلي' : 'Actual Draw'}
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="h-3 w-3 rounded-sm bg-slate-300 dark:bg-slate-700" />
              {isArabic ? 'المعدل المستهدف' : 'Target Baseline'}
            </span>
          </div>
        </div>

        {/* Bar comparison chart */}
        <div className="grid grid-cols-6 gap-3 pt-4">
          {room.historyHourly.map((pt) => {
            const maxVal = 40;
            const actualHeight = Math.min((pt.actualKw / maxVal) * 120, 120);
            const baselineHeight = Math.min((pt.baselineKw / maxVal) * 120, 120);

            return (
              <div key={pt.time} className="flex flex-col items-center gap-2">
                <div className="h-32 w-full flex items-end justify-center gap-1.5 bg-slate-50 dark:bg-slate-950/60 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                  {/* Baseline column */}
                  <div
                    style={{ height: `${baselineHeight}px` }}
                    className="w-3 bg-slate-300 dark:bg-slate-700 rounded-t-sm"
                    title={`Baseline: ${pt.baselineKw} kW`}
                  />
                  {/* Actual column */}
                  <div
                    style={{ height: `${actualHeight}px` }}
                    className={`w-3.5 rounded-t-sm ${
                      pt.actualKw > pt.baselineKw ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    title={`Actual: ${pt.actualKw} kW`}
                  />
                </div>
                <span className="text-[11px] font-mono text-slate-500">{pt.time}</span>
                <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">
                  {pt.actualKw} kW
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
