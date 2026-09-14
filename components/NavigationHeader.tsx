'use client';

import React from 'react';
import { ScreenType } from '../lib/types';
import { Zap, Building2, LayoutGrid, BellRing, Globe, Play, Pause, ChevronRight } from 'lucide-react';

interface NavigationHeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  selectedBuildingName?: string;
  selectedBuildingNameAr?: string;
  selectedRoomName?: string;
  selectedRoomNameAr?: string;
  activeAlertsCount: number;
  isArabic: boolean;
  onToggleLanguage: () => void;
  isLiveSimulating: boolean;
  onToggleLiveSimulation: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentScreen,
  onNavigate,
  selectedBuildingName,
  selectedBuildingNameAr,
  selectedRoomName,
  selectedRoomNameAr,
  activeAlertsCount,
  isArabic,
  onToggleLanguage,
  isLiveSimulating,
  onToggleLiveSimulation,
}) => {
  const screens = [
    {
      id: 'central' as ScreenType,
      num: 1,
      name: 'Central University View',
      nameAr: 'نظرة الحرم الجامعي المركزية',
      icon: Zap,
    },
    {
      id: 'building' as ScreenType,
      num: 2,
      name: 'Building Overview',
      nameAr: 'نظرة عامة على المبنى',
      icon: Building2,
    },
    {
      id: 'room' as ScreenType,
      num: 3,
      name: 'Room Details',
      nameAr: 'تفاصيل الغرفة والتحكم',
      icon: LayoutGrid,
    },
    {
      id: 'alerts' as ScreenType,
      num: 4,
      name: 'Alerts',
      nameAr: 'التنبيهات والأعطال',
      icon: BellRing,
      badge: activeAlertsCount,
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95 transition-colors">
      {/* Top Bar: Brand + Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Platform Name */}
          <div
            onClick={() => onNavigate('central')}
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="brand-logo-btn"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Zap className="h-5 w-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">
                  Ener<span className="text-emerald-600 dark:text-emerald-400">Verse</span>
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  Campus v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                {isArabic ? 'المنظومة الذكية لإدارة وكفاءة طاقة الحرم الجامعي' : 'University Smart Energy & Sustainability Suite'}
              </p>
            </div>
          </div>

          {/* Center: Screen Navigation Pills (Desktop & Tablet) */}
          <nav className="hidden md:flex items-center p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 gap-1">
            {screens.map((s) => {
              const Icon = s.icon;
              const isActive = currentScreen === s.id;
              return (
                <button
                  key={s.id}
                  id={`nav-tab-${s.id}`}
                  onClick={() => onNavigate(s.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className="h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-700 text-[10px] flex items-center justify-center font-bold">
                    {s.num}
                  </span>
                  <Icon className="h-3.5 w-3.5" />
                  <span>{isArabic ? s.nameAr : s.name}</span>

                  {s.badge !== undefined && s.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold animate-pulse">
                      {s.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools: Simulation, Language Switcher */}
          <div className="flex items-center gap-2">
            {/* Live Telemetry Ticker Toggle */}
            <button
              id="btn-toggle-telemetry"
              onClick={onToggleLiveSimulation}
              title={isArabic ? 'تشغيل/إيقاف المحاكاة الحية' : 'Toggle Live Telemetry Simulation'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                isLiveSimulating
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800'
              }`}
            >
              {isLiveSimulating ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  <Pause className="h-3 w-3" />
                  <span className="hidden sm:inline">{isArabic ? 'بث مباشر' : 'Live Mode'}</span>
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 text-slate-400" />
                  <span className="hidden sm:inline">{isArabic ? 'متوقف' : 'Paused'}</span>
                </>
              )}
            </button>

            {/* Language Switcher */}
            <button
              id="btn-language-toggle"
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 transition cursor-pointer"
            >
              <Globe className="h-3.5 w-3.5 text-slate-500" />
              <span>{isArabic ? 'English' : 'العربية'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row (Horizontal Scrollable Tabs) */}
        <div className="flex md:hidden items-center overflow-x-auto pb-2 gap-1.5 pt-1 scrollbar-none">
          {screens.map((s) => {
            const Icon = s.icon;
            const isActive = currentScreen === s.id;
            return (
              <button
                key={`mobile-${s.id}`}
                onClick={() => onNavigate(s.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{isArabic ? s.nameAr : s.name}</span>
                {s.badge !== undefined && s.badge > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                    {s.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Breadcrumb Bar */}
        <div className="py-2 border-t border-slate-100 dark:border-slate-900 flex items-center text-xs text-slate-500 dark:text-slate-400 gap-1 overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => onNavigate('central')}
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition font-medium cursor-pointer"
          >
            {isArabic ? 'جامعة إينرفيرس' : 'EnerVerse Campus'}
          </button>

          {(currentScreen === 'building' || currentScreen === 'room') && (
            <>
              <ChevronRight className={`h-3 w-3 ${isArabic ? 'rotate-180' : ''}`} />
              <button
                onClick={() => onNavigate('building')}
                className={`transition font-medium cursor-pointer ${
                  currentScreen === 'building'
                    ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'hover:text-emerald-600'
                }`}
              >
                {isArabic ? selectedBuildingNameAr || 'المبنى' : selectedBuildingName || 'Building'}
              </button>
            </>
          )}

          {currentScreen === 'room' && (
            <>
              <ChevronRight className={`h-3 w-3 ${isArabic ? 'rotate-180' : ''}`} />
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                {isArabic ? selectedRoomNameAr || 'الغرفة' : selectedRoomName || 'Room'}
              </span>
            </>
          )}

          {currentScreen === 'alerts' && (
            <>
              <ChevronRight className={`h-3 w-3 ${isArabic ? 'rotate-180' : ''}`} />
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                {isArabic ? 'مركز التنبيهات وإدارة الهدر' : 'Alerts & Anomaly Center'}
              </span>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
