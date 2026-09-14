'use client';

import React from 'react';
import { UserProfile, ScreenType } from '../lib/types';
import {
  Menu,
  Search,
  BellRing,
  Globe,
  Play,
  Pause,
  MapPin,
  Activity,
  LogOut,
  ChevronDown,
} from 'lucide-react';

interface TopHeaderProps {
  currentUser: UserProfile;
  onLogout: () => void;
  activeAlertsCount: number;
  onOpenAlerts: () => void;
  isArabic: boolean;
  onToggleLanguage: () => void;
  isLiveSimulating: boolean;
  onToggleLiveSimulation: () => void;
  onOpenMobileSidebar: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentUser,
  onLogout,
  activeAlertsCount,
  onOpenAlerts,
  isArabic,
  onToggleLanguage,
  isLiveSimulating,
  onToggleLiveSimulation,
  onOpenMobileSidebar,
}) => {
  return (
    <header
      dir={isArabic ? 'rtl' : 'ltr'}
      className="sticky top-0 z-30 h-16 bg-[#060e20]/90 backdrop-blur-xl border-b border-[#1e293b]/80 flex items-center justify-between px-4 sm:px-6 transition-all"
    >
      {/* Left: Mobile Menu Trigger + Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        {/* Hamburger Menu (Mobile/Tablet) */}
        <button
          id="btn-mobile-sidebar-toggle"
          onClick={onOpenMobileSidebar}
          aria-label="Open Navigation"
          className="lg:hidden p-2 rounded-xl bg-[#171f33] text-[#dae2fd] hover:bg-[#222a3d] border border-[#334155]/60 cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Global Search Input */}
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#889391] pointer-events-none" />
          <input
            type="text"
            placeholder={
              isArabic
                ? 'ابحث عن محطات التحويل، المبردات، أو مباني الحرم الجامعي...'
                : 'Search campus substations, chillers, AHUs, or buildings...'
            }
            className="w-full bg-[#171f33] text-[#dae2fd] placeholder:text-[#889391] text-xs pl-9 pr-4 py-2 rounded-xl border border-[#334155]/60 focus:outline-none focus:border-[#80d5cb] transition"
          />
        </div>
      </div>

      {/* Right Controls & User Info */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live Grid Status Capsule (Hidden on small mobile) */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-[#131b2e] border border-[#1e293b] text-xs">
          <span className="h-2 w-2 rounded-full bg-[#4edea3] animate-pulse" />
          <span className="text-[#dae2fd] font-medium text-[11px]">
            {isArabic ? 'النظام حي — طبيعي' : 'System Live - Normal'}
          </span>
        </div>

        {/* Campus Location Tag */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#131b2e] border border-[#1e293b] text-xs text-[#bdc9c6]">
          <MapPin className="h-3.5 w-3.5 text-[#80d5cb]" />
          <span className="text-[11px] font-medium">
            {isArabic ? 'الحرم الرئيسي' : 'Main Campus'}
          </span>
        </div>

        {/* Live Simulation Play/Pause */}
        <button
          onClick={onToggleLiveSimulation}
          title={isArabic ? 'تبديل المحاكاة اللحظية' : 'Toggle Live Telemetry'}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
            isLiveSimulating
              ? 'bg-[#0f766e]/20 text-[#80d5cb] border-[#0f766e]/50'
              : 'bg-[#171f33] text-[#889391] border-[#334155]/60'
          }`}
        >
          {isLiveSimulating ? (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-[#4edea3] animate-ping" />
              <Pause className="h-3.5 w-3.5" />
              <span className="hidden lg:inline text-[11px]">{isArabic ? 'مباشر' : 'Live'}</span>
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5" />
              <span className="hidden lg:inline text-[11px]">{isArabic ? 'إيقاف' : 'Paused'}</span>
            </>
          )}
        </button>

        {/* Notifications / Alerts Button */}
        <button
          id="btn-header-alerts"
          onClick={onOpenAlerts}
          title={isArabic ? 'التنبيهات والأعطال النشطة' : 'Active Alerts Queue'}
          className="relative p-2 rounded-xl bg-[#171f33] hover:bg-[#222a3d] text-[#bdc9c6] hover:text-white border border-[#334155]/60 transition cursor-pointer"
        >
          <BellRing className="h-4 w-4" />
          {activeAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#93000a] text-[#ffdad6] text-[10px] font-bold font-mono">
              {activeAlertsCount}
            </span>
          )}
        </button>

        {/* Language Switcher */}
        <button
          id="btn-header-language"
          onClick={onToggleLanguage}
          title={isArabic ? 'Switch to English' : 'التحويل إلى العربية'}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#171f33] hover:bg-[#222a3d] text-[#dae2fd] border border-[#334155]/60 text-xs font-semibold transition cursor-pointer"
        >
          <Globe className="h-3.5 w-3.5 text-[#80d5cb]" />
          <span className="text-[11px]">{isArabic ? 'EN' : 'عربي'}</span>
        </button>

        {/* Vertical Divider */}
        <div className="h-6 w-px bg-[#334155]/60 hidden sm:block" />

        {/* User Profile Info (Matches Screenshot) */}
        <div className="flex items-center gap-2">
          <div className="text-right rtl:text-left hidden sm:block leading-tight">
            <div className="text-xs font-bold text-white">
              {isArabic ? currentUser.nameAr : currentUser.name}
            </div>
            <div className="text-[10px] text-[#bdc9c6] truncate max-w-[180px]">
              {isArabic ? currentUser.titleAr : currentUser.title}
            </div>
          </div>

          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-[#0f766e]/40 shrink-0"
          />

          <button
            onClick={onLogout}
            title={isArabic ? 'تسجيل الخروج' : 'Logout'}
            className="sm:hidden p-1.5 rounded-lg text-[#889391] hover:text-[#ffb4ab]"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
