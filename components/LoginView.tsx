'use client';

import React, { useState } from 'react';
import { UserProfile, UserRole } from '../lib/types';
import { DEMO_USERS, DEMO_PASSWORD_DEFAULT } from '../lib/auth';
import { Zap, ShieldCheck, Lock, Mail, ArrowRight, Sparkles, Check, Globe } from 'lucide-react';

interface LoginViewProps {
  onLogin: (user: UserProfile) => void;
  isArabic: boolean;
  onToggleLanguage: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLogin,
  isArabic,
  onToggleLanguage,
}) => {
  const [email, setEmail] = useState<string>('omarelrayes3600@gmail.com');
  const [password, setPassword] = useState<string>(DEMO_PASSWORD_DEFAULT);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = DEMO_USERS.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (user) {
      setErrorMessage('');
      onLogin(user);
    } else {
      // Default to university admin for any entered email in demo mode with notice
      setErrorMessage(
        isArabic
          ? 'تنبيه: هذا النموذج تجريبي. يمكنك استخدام زر الدخول كمدير الحرم الجامعي أدناه.'
          : 'Demo notice: Please select one of the designated demo accounts below.'
      );
    }
  };

  const handleDemoLogin = (role: UserRole) => {
    const user = DEMO_USERS.find((u) => u.role === role);
    if (user) {
      setEmail(user.email);
      setPassword(DEMO_PASSWORD_DEFAULT);
      onLogin(user);
    }
  };

  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className="min-h-screen w-full bg-[#0b1326] text-[#dae2fd] flex flex-col justify-between selection:bg-[#0f766e] selection:text-[#a3faef]"
    >
      {/* Top Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-[#1e293b]/60 bg-[#0b0f19]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#0f766e] to-[#06b6d4] flex items-center justify-center text-white shadow-lg shadow-[#0f766e]/30">
            <Zap className="h-5 w-5 fill-white" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-white">
              Ener<span className="text-[#80d5cb]">Verse</span>
            </span>
            <span className="text-[10px] ml-2 px-2 py-0.5 rounded-full bg-[#0f766e]/30 text-[#80d5cb] border border-[#0f766e]/50 font-bold uppercase tracking-wider">
              {isArabic ? 'ذكاء الحرم الجامعي' : 'Campus Intelligence'}
            </span>
          </div>
        </div>

        <button
          onClick={onToggleLanguage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#171f33] hover:bg-[#222a3d] text-[#dae2fd] border border-[#334155]/60 transition"
        >
          <Globe className="h-3.5 w-3.5 text-[#80d5cb]" />
          <span>{isArabic ? 'English' : 'العربية'}</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-[#131b2e] rounded-2xl border border-[#334155]/60 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#0f766e]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#06b6d4]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Heading */}
          <div className="relative z-10 text-center space-y-2 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0f766e]/20 border border-[#0f766e]/40 text-[#80d5cb] text-xs font-bold mb-1">
              <span className="h-2 w-2 rounded-full bg-[#4edea3] animate-ping" />
              <span>{isArabic ? 'بوابة تشغيل وإدارة الطاقة' : 'Executive Energy Portal'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {isArabic ? 'تسجيل الدخول إلى EnerVerse' : 'Sign in to EnerVerse'}
            </h1>
            <p className="text-xs text-[#bdc9c6]">
              {isArabic
                ? 'إدارة الأحمال الكهروضوئية، كفاءة المباني، والتحكم الذاتي اللحظي'
                : 'Campus microgrid telemetry, building optimization & automated dispatch'}
            </p>
          </div>

          {/* Demo Notice Banner */}
          <div className="relative z-10 mb-6 p-3 rounded-xl bg-[#171f33] border border-[#0f766e]/40 flex items-start gap-2.5 text-xs text-[#bdc9c6]">
            <ShieldCheck className="h-4 w-4 text-[#80d5cb] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#80d5cb] block uppercase tracking-wider text-[10px]">
                {isArabic ? 'نظام مصادقة تجريبي — نموذج العرض' : 'DEMO AUTHENTICATION — NOT PRODUCTION SECURITY'}
              </span>
              <span>
                {isArabic
                  ? 'هذا الإصدار معد للاختبار والتحقق التجريبي مع أدوار وصلاحيات تحكم متعددة.'
                  : 'Prototype verification mode with pre-configured role-based authorization.'}
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleManualLogin} className="relative z-10 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#bdc9c6] mb-1.5">
                {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#889391]" />
                <input
                  id="input-login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full bg-[#0b0f19] border border-[#3e4947] text-white text-sm rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#80d5cb] focus:ring-1 focus:ring-[#80d5cb] transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#bdc9c6] mb-1.5">
                {isArabic ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#889391]" />
                <input
                  id="input-login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0b0f19] border border-[#3e4947] text-white text-sm rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#80d5cb] focus:ring-1 focus:ring-[#80d5cb] transition"
                  required
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-xs text-[#ffb4ab] bg-[#93000a]/20 border border-[#ffb4ab]/30 p-2 rounded-lg">
                {errorMessage}
              </p>
            )}

            <button
              id="btn-login-submit"
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#0f766e] hover:bg-[#0d9488] text-white font-bold text-sm shadow-md shadow-[#0f766e]/30 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isArabic ? 'تسجيل الدخول' : 'Login'}</span>
              <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
            </button>
          </form>

          {/* Quick Demo Access Options */}
          <div className="relative z-10 mt-6 pt-5 border-t border-[#334155]/60 space-y-3">
            <div className="text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#bdc9c6]">
                {isArabic ? 'أو الوصول السريع للحسابات النموذجية:' : 'Quick Demo Access by Persona:'}
              </span>
            </div>

            {/* Primary Action: University Admin */}
            <button
              id="btn-login-univ-admin"
              onClick={() => handleDemoLogin('university_admin')}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0f766e] to-[#03b5d3] hover:from-[#0d9488] hover:to-[#06b6d4] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#0f766e]/30 transition flex items-center justify-between cursor-pointer border border-[#80d5cb]/40 group"
            >
              <div className="flex items-center gap-2.5 text-left rtl:text-right">
                <div className="h-7 w-7 rounded-lg bg-black/25 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-[#80d5cb]" />
                </div>
                <div>
                  <span className="block font-bold">
                    {isArabic ? 'الدخول كمدير الحرم الجامعي (University Admin)' : 'Login as University Admin'}
                  </span>
                  <span className="block text-[10px] text-[#a3faef]/80 font-mono">
                    omarelrayes3600@gmail.com
                  </span>
                </div>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-white/20 font-bold group-hover:translate-x-0.5 transition-transform">
                {isArabic ? 'دخول كامل' : 'Full Access'}
              </span>
            </button>

            {/* Secondary Roles to test authorization restrictions */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                id="btn-login-bldg-manager"
                onClick={() => handleDemoLogin('building_manager')}
                className="p-2.5 rounded-xl bg-[#171f33] hover:bg-[#222a3d] border border-[#3e4947] text-left rtl:text-right transition cursor-pointer"
              >
                <span className="block text-[11px] font-bold text-white leading-tight">
                  {isArabic ? 'مدير المبنى' : 'Building Manager'}
                </span>
                <span className="block text-[9px] text-[#bdc9c6] mt-0.5">
                  {isArabic ? 'صلاحية مبنى الهندسة' : 'Assigned Bldg Only'}
                </span>
              </button>

              <button
                id="btn-login-fac-manager"
                onClick={() => handleDemoLogin('facility_manager')}
                className="p-2.5 rounded-xl bg-[#171f33] hover:bg-[#222a3d] border border-[#3e4947] text-left rtl:text-right transition cursor-pointer"
              >
                <span className="block text-[11px] font-bold text-white leading-tight">
                  {isArabic ? 'مسؤول الصيانة' : 'Facility Manager'}
                </span>
                <span className="block text-[9px] text-[#bdc9c6] mt-0.5">
                  {isArabic ? 'الأعطال والمعدات' : 'Alerts & Repairs'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-4 border-t border-[#1e293b]/60 text-center text-xs text-[#889391]">
        <span>EnerVerse Smart University Microgrid Management Suite • Prototype v2.4</span>
      </footer>
    </div>
  );
};
