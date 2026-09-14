'use client';

import React, { useState } from 'react';
import { UserProfile } from '../lib/types';
import { getRoleLabel } from '../lib/auth';
import {
  Settings,
  Sliders,
  Shield,
  Bell,
  Cpu,
  Save,
  CheckCircle2,
  Database,
  Radio,
} from 'lucide-react';

interface SettingsViewProps {
  currentUser: UserProfile;
  isArabic: boolean;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ currentUser, isArabic }) => {
  const [sampleRate, setSampleRate] = useState<string>('5');
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [autoEmailAlerts, setAutoEmailAlerts] = useState<boolean>(true);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2000);
  };

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#131b2e] p-5 rounded-2xl border border-[#1e293b]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#80d5cb] uppercase tracking-wider mb-1">
            <Settings className="h-4 w-4" />
            <span>{isArabic ? 'إعدادات المنظومة والشبكة' : 'System Configuration'}</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {isArabic ? 'إعدادات EnerVerse' : 'EnerVerse Platform Settings'}
          </h1>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-xl bg-[#0f766e] hover:bg-[#0d9488] text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
        >
          {savedSuccess ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-[#4edea3]" />
              <span>{isArabic ? 'تم الحفظ بنجاح ✓' : 'Settings Saved ✓'}</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>{isArabic ? 'حفظ التغييرات' : 'Save Changes'}</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account & Role Card */}
        <div className="bg-[#131b2e] p-6 rounded-2xl border border-[#1e293b] space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#80d5cb]" />
            <span>{isArabic ? 'بيانات الحساب والصلاحيات' : 'Account & Access Level'}</span>
          </h2>

          <div className="p-4 rounded-xl bg-[#060e20] border border-[#1e293b] flex items-center gap-3">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-[#0f766e]"
            />
            <div>
              <div className="font-bold text-white text-sm">
                {isArabic ? currentUser.nameAr : currentUser.name}
              </div>
              <div className="text-xs text-[#bdc9c6]">{currentUser.email}</div>
              <div className="mt-1 text-[11px] px-2 py-0.5 rounded bg-[#0f766e]/30 text-[#80d5cb] inline-block font-mono font-bold">
                {getRoleLabel(currentUser.role, isArabic)}
              </div>
            </div>
          </div>

          <div className="text-xs text-[#889391] leading-relaxed">
            {isArabic
              ? 'تدار الصلاحيات والمصادقة مركزياً عبر بوابة الحرم الجامعي الموحدة مع بروتوكولات الأمان المؤسسي.'
              : 'Role permissions determine access to university-wide curtailment controls, executive budget analytics, and equipment dispatch.'}
          </div>
        </div>

        {/* Telemetry & Gateway Protocols */}
        <div className="bg-[#131b2e] p-6 rounded-2xl border border-[#1e293b] space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Radio className="h-4 w-4 text-[#4cd7f6]" />
            <span>{isArabic ? 'بروتوكولات اتصال الحساسات (IoT)' : 'IoT Telemetry & Gateway'}</span>
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#171f33] border border-[#1e293b]">
              <div>
                <div className="text-xs font-bold text-white">
                  {isArabic ? 'معدل تحديث القياسات الحية' : 'Telemetry Polling Interval'}
                </div>
                <div className="text-[10px] text-[#bdc9c6]">
                  {isArabic ? 'زمن أخذ عينات الحساسات عبر BACnet/IP' : 'Sensor sampling frequency via BACnet/IP'}
                </div>
              </div>

              <select
                value={sampleRate}
                onChange={(e) => setSampleRate(e.target.value)}
                className="bg-[#060e20] text-white text-xs border border-[#3e4947] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#80d5cb]"
              >
                <option value="1">1s (High Speed)</option>
                <option value="5">5s (Optimal)</option>
                <option value="15">15s (Power Saving)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#171f33] border border-[#1e293b]">
              <div>
                <div className="text-xs font-bold text-white">
                  {isArabic ? 'وحدة قياس درجة الحرارة' : 'Temperature Unit'}
                </div>
                <div className="text-[10px] text-[#bdc9c6]">
                  {isArabic ? 'عرض درجات الحرارة بالمئوية أو الفهرنهايت' : 'Display thermal sensor data in Celsius or Fahrenheit'}
                </div>
              </div>

              <div className="flex bg-[#060e20] p-1 rounded-lg border border-[#1e293b]">
                <button
                  onClick={() => setTempUnit('C')}
                  className={`px-2.5 py-1 rounded text-xs font-bold ${
                    tempUnit === 'C' ? 'bg-[#0f766e] text-[#a3faef]' : 'text-[#bdc9c6]'
                  }`}
                >
                  °C
                </button>
                <button
                  onClick={() => setTempUnit('F')}
                  className={`px-2.5 py-1 rounded text-xs font-bold ${
                    tempUnit === 'F' ? 'bg-[#0f766e] text-[#a3faef]' : 'text-[#bdc9c6]'
                  }`}
                >
                  °F
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
