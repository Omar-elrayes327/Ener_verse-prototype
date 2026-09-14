'use client';

import React from 'react';
import { UserProfile, ScreenType } from '../lib/types';
import { getRoleLabel } from '../lib/auth';
import { ShieldAlert, Sparkles, ArrowLeft, Building2 } from 'lucide-react';

interface AccessRestrictedProps {
  currentUser: UserProfile;
  attemptedScreen: ScreenType;
  onSwitchToAdmin: () => void;
  onReturnToAllowed: () => void;
  isArabic: boolean;
}

export const AccessRestricted: React.FC<AccessRestrictedProps> = ({
  currentUser,
  attemptedScreen,
  onSwitchToAdmin,
  onReturnToAllowed,
  isArabic,
}) => {
  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className="min-h-[500px] flex items-center justify-center p-6"
    >
      <div className="max-w-md w-full bg-[#131b2e] rounded-2xl border border-[#334155]/80 p-6 sm:p-8 shadow-2xl text-center space-y-5">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-[#93000a]/20 border border-[#ffb4ab]/30 flex items-center justify-center text-[#ffb4ab]">
          <ShieldAlert className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#ffb4ab] px-2.5 py-1 rounded-full bg-[#93000a]/30 border border-[#ffb4ab]/20 inline-block">
            {isArabic ? 'صلاحيات وصول محددة' : 'Role-Based Authorization Required'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {isArabic
              ? 'الوصول مقتصر على إدارة الحرم الجامعي المركزية'
              : 'University Central Access Restricted'}
          </h2>
          <p className="text-xs text-[#bdc9c6] leading-relaxed">
            {isArabic ? (
              <>
                أنت مسجل حالياً بصفة{' '}
                <strong className="text-white">
                  {getRoleLabel(currentUser.role, isArabic)}
                </strong>
                . هذا القسم يتطلب صلاحيات «مدير الحرم الجامعي (University Admin)» لإدارة الميزانيات، عقود الطاقة المركزية، والتقارير التنفيذية.
              </>
            ) : (
              <>
                You are currently signed in as{' '}
                <strong className="text-white">
                  {getRoleLabel(currentUser.role, isArabic)}
                </strong>
                . This view requires «University Admin» privileges to manage campus-wide budgets, executive curtailment, and macro grid dispatch.
              </>
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col gap-2.5">
          <button
            id="btn-restricted-switch-admin"
            onClick={onSwitchToAdmin}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#0f766e] to-[#03b5d3] hover:from-[#0d9488] hover:to-[#06b6d4] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#0f766e]/30 transition flex items-center justify-center gap-2 cursor-pointer border border-[#80d5cb]/40"
          >
            <Sparkles className="h-4 w-4 text-[#80d5cb]" />
            <span>
              {isArabic
                ? 'التبديل إلى حساب مدير الحرم (Omar Elrayes)'
                : 'Switch to University Admin (Omar Elrayes)'}
            </span>
          </button>

          <button
            id="btn-restricted-back"
            onClick={onReturnToAllowed}
            className="w-full py-2.5 px-4 rounded-xl bg-[#171f33] hover:bg-[#222a3d] text-[#dae2fd] border border-[#3e4947] text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-2"
          >
            <ArrowLeft className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
            <span>
              {isArabic ? 'العودة إلى مباني المنشأة المخصصة' : 'Return to Assigned Operations'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
