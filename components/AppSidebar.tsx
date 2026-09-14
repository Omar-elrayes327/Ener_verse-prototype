'use client';

import React from 'react';
import { ScreenType, UserProfile } from '../lib/types';
import { isScreenPermittedForRole, getRoleLabel } from '../lib/auth';
import {
  LayoutDashboard,
  Building2,
  DoorOpen,
  LineChart,
  Sparkles,
  Wrench,
  BellRing,
  FileText,
  Zap,
  Settings,
  X,
  LogOut,
  Lock,
  Bolt,
  ShieldCheck,
} from 'lucide-react';

interface AppSidebarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  currentUser: UserProfile;
  onLogout: () => void;
  activeAlertsCount: number;
  isArabic: boolean;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  currentScreen,
  onNavigate,
  currentUser,
  onLogout,
  activeAlertsCount,
  isArabic,
  isOpenMobile,
  onCloseMobile,
}) => {
  // Normalize screen representation
  const activeKey =
    currentScreen === 'central'
      ? 'dashboard'
      : currentScreen === 'building'
      ? 'buildings'
      : currentScreen === 'room'
      ? 'rooms'
      : currentScreen;

  const navItems = [
    {
      id: 'dashboard' as ScreenType,
      label: isArabic ? 'لوحة التحكم الرئيسية' : 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'buildings' as ScreenType,
      label: isArabic ? 'المباني الجامعية' : 'Buildings',
      icon: Building2,
    },
    {
      id: 'rooms' as ScreenType,
      label: isArabic ? 'الغرف والمختبرات' : 'Rooms',
      icon: DoorOpen,
    },
    {
      id: 'analytics' as ScreenType,
      label: isArabic ? 'تحليلات الطاقة' : 'Energy Analytics',
      icon: LineChart,
    },
    {
      id: 'ai-insights' as ScreenType,
      label: isArabic ? 'رؤى الذكاء الاصطناعي' : 'AI Insights',
      icon: Sparkles,
    },
    {
      id: 'maintenance' as ScreenType,
      label: isArabic ? 'الصيانة التنبؤية' : 'Predictive Maintenance',
      icon: Wrench,
    },
    {
      id: 'alerts' as ScreenType,
      label: isArabic ? 'التنبيهات والأعطال' : 'Alerts',
      icon: BellRing,
      badge: activeAlertsCount,
    },
    {
      id: 'reports' as ScreenType,
      label: isArabic ? 'التقارير وسندات الكربون' : 'Reports',
      icon: FileText,
      restrictedForRoles: ['building_manager', 'facility_manager'],
    },
    {
      id: 'university-central' as ScreenType,
      label: isArabic ? 'إدارة الحرم الجامعي المركزية' : 'University Central',
      icon: Zap,
      isHighlighted: true,
      restrictedForRoles: ['building_manager', 'facility_manager'],
    },
    {
      id: 'settings' as ScreenType,
      label: isArabic ? 'الإعدادات والمنظومة' : 'Settings',
      icon: Settings,
    },
  ];

  const handleItemClick = (screen: ScreenType) => {
    onNavigate(screen);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="app-left-sidebar"
        dir={isArabic ? 'rtl' : 'ltr'}
        className={`fixed top-0 bottom-0 ${
          isArabic ? 'right-0' : 'left-0'
        } z-50 w-72 bg-[#131b2e] border-[#1e293b] ${
          isArabic ? 'border-l' : 'border-r'
        } flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-in-out ${
          isOpenMobile
            ? 'translate-x-0'
            : isArabic
            ? 'translate-x-full lg:translate-x-0'
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Segment: Logo & Core Telemetry */}
        <div className="flex flex-col">
          {/* Header Branding */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-[#1e293b]/80">
            <div
              onClick={() => handleItemClick('dashboard')}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#0f766e] to-[#06b6d4] flex items-center justify-center text-white shadow-md shadow-[#0f766e]/30 group-hover:scale-105 transition-transform">
                <Zap className="h-5 w-5 fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-white leading-none">
                  Ener<span className="text-[#80d5cb]">Verse</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#80d5cb] font-bold mt-1">
                  {isArabic ? 'ذكاء الحرم الجامعي' : 'CAMPUS INTELLIGENCE'}
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-[#bdc9c6] hover:bg-[#1e293b] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Core Telemetry Box (Matches Screenshot) */}
          <div className="px-3 py-2.5">
            <div className="bg-[#060e20] border border-[#1e293b] rounded-xl p-2.5 flex flex-col gap-1.5 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#bdc9c6] font-bold">
                  {isArabic ? 'المؤشرات الحيوية' : 'Core Telemetry'}
                </span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]"></span>
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-[#bdc9c6] text-[11px]">
                  {isArabic ? 'الشبكة الحية' : 'Live Grid'}
                </span>
                <span className="text-[#4edea3] font-bold text-[11px] font-mono">
                  98.4% Normal
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-[#bdc9c6] text-[11px]">
                  {isArabic ? 'الشبكة الشمسية' : 'Solar Microgrid'}
                </span>
                <span className="text-[#4cd7f6] font-bold text-[11px] font-mono">
                  Active (4.2 MW)
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 px-2.5 mt-1 overflow-y-auto max-h-[calc(100vh-320px)] scrollbar-thin">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeKey === item.id;
              const isPermitted = isScreenPermittedForRole(currentUser.role, item.id);

              return (
                <button
                  key={item.id}
                  id={`sidebar-link-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0f766e] text-white font-bold shadow-md shadow-[#0f766e]/30'
                      : item.isHighlighted
                      ? 'bg-[#171f33] hover:bg-[#222a3d] text-[#80d5cb] border border-[#0f766e]/40'
                      : 'text-[#bdc9c6] hover:bg-[#222a3d] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`h-4 w-4 ${
                        isActive
                          ? 'text-white'
                          : item.isHighlighted
                          ? 'text-[#80d5cb]'
                          : 'text-[#889391]'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {!isPermitted && (
                      <span
                        title={isArabic ? 'يتطلب صلاحية الإدارة' : 'Restricted for this role'}
                        className="p-1 rounded bg-[#060e20] text-[#889391]"
                      >
                        <Lock className="h-3 w-3" />
                      </span>
                    )}

                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-[#93000a] text-[#ffdad6] text-[10px] font-bold font-mono">
                        {item.badge}
                      </span>
                    )}

                    {item.isHighlighted && !isActive && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#0f766e]/30 text-[#80d5cb] font-bold uppercase">
                        PRO
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Segment: Baseload, Carbon & User Profile (Matches Screenshot) */}
        <div className="p-3 border-t border-[#1e293b]/80 space-y-2.5">
          {/* Quick Metrics Widget */}
          <div className="bg-[#171f33] border border-[#1e293b] rounded-xl p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bolt className="h-4 w-4 text-[#4edea3]" />
              <div>
                <div className="text-[9px] uppercase tracking-wider text-[#bdc9c6] font-bold">
                  {isArabic ? 'الحمل الأساسي' : 'BASELOAD'}
                </div>
                <div className="text-xs font-bold text-white font-mono">14.88 MW</div>
              </div>
            </div>

            <div className="text-right rtl:text-left">
              <div className="text-[9px] uppercase tracking-wider text-[#bdc9c6] font-bold">
                {isArabic ? 'الكربون' : 'CARBON'}
              </div>
              <div className="text-xs font-bold text-[#4edea3] font-mono">-8.4% YoY</div>
            </div>
          </div>

          {/* User Profile Snippet */}
          <div className="bg-[#060e20] border border-[#1e293b] rounded-xl p-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="h-8 w-8 rounded-full object-cover ring-2 ring-[#0f766e]/40 shrink-0"
              />
              <div className="truncate">
                <div className="text-xs font-bold text-white truncate">
                  {isArabic ? currentUser.nameAr : currentUser.name}
                </div>
                <div className="text-[10px] text-[#80d5cb] truncate font-medium">
                  {getRoleLabel(currentUser.role, isArabic)}
                </div>
              </div>
            </div>

            <button
              id="btn-sidebar-logout"
              onClick={onLogout}
              title={isArabic ? 'تسجيل الخروج' : 'Logout'}
              className="p-1.5 rounded-lg text-[#889391] hover:text-[#ffb4ab] hover:bg-[#222a3d] transition cursor-pointer shrink-0"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
