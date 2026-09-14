'use client';

import React, { useState } from 'react';
import { AlertItem, AlertSeverity, AlertCategory } from '../lib/types';
import {
  BellRing,
  AlertTriangle,
  Flame,
  Info,
  CheckCircle2,
  Filter,
  ArrowRight,
  Sparkles,
  Zap,
  Building,
  RotateCcw,
  Check,
  Clock,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

interface AlertsViewProps {
  alerts: AlertItem[];
  onAcknowledgeAlert: (id: string) => void;
  onResolveAlert: (id: string) => void;
  onAutoFixAlert: (id: string) => void;
  onNavigateToBuilding: (buildingId: string) => void;
  onNavigateToRoom: (buildingId: string, roomId: string) => void;
  onSimulateNewAnomaly: () => void;
  isArabic: boolean;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  alerts,
  onAcknowledgeAlert,
  onResolveAlert,
  onAutoFixAlert,
  onNavigateToBuilding,
  onNavigateToRoom,
  onSimulateNewAnomaly,
  isArabic,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'critical' | 'warning' | 'info' | 'resolved'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Filtering
  const filteredAlerts = alerts.filter((item) => {
    // Tab filter
    if (activeTab === 'resolved' && item.status !== 'resolved') return false;
    if (activeTab !== 'resolved' && activeTab !== 'all') {
      if (item.severity !== activeTab || item.status === 'resolved') return false;
    }
    if (activeTab === 'all' && item.status === 'resolved') return false;

    // Category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

    // Search query
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      const match =
        item.title.toLowerCase().includes(q) ||
        item.titleAr.includes(q) ||
        item.buildingName.toLowerCase().includes(q) ||
        item.buildingNameAr.includes(q);
      if (!match) return false;
    }

    return true;
  });

  // Calculate metrics
  const activeAlerts = alerts.filter((a) => a.status === 'active');
  const criticalCount = alerts.filter((a) => a.severity === 'critical' && a.status === 'active').length;
  const warningCount = alerts.filter((a) => a.severity === 'warning' && a.status === 'active').length;
  const totalPotentialWasteKwh = activeAlerts.reduce((acc, curr) => acc + curr.potentialSavingsKwh, 0);
  const totalEstimatedCost = Math.round(totalPotentialWasteKwh * 0.18);

  const getSeverityBadge = (sev: AlertSeverity) => {
    switch (sev) {
      case 'critical':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800 flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
            {isArabic ? 'حرج جداً' : 'CRITICAL'}
          </span>
        );
      case 'warning':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            {isArabic ? 'تحذير تشغيلي' : 'WARNING'}
          </span>
        );
      case 'info':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border border-sky-300 dark:border-sky-800 flex items-center gap-1">
            <Info className="h-3 w-3" />
            {isArabic ? 'ملاحظة' : 'INFO'}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold text-xs">
              {isArabic ? 'الشاشة 4: إدارة التنبيهات وهدر الطاقة' : 'Screen 4: Alerts & Anomaly Center'}
            </span>
            <span className="text-xs text-slate-400">
              {isArabic ? 'اكتشاف فوري عبر الذكاء الاصطناعي' : 'Real-time AI telemetry diagnostics'}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <BellRing className="h-7 w-7 text-rose-500" />
            <span>{isArabic ? 'مركز إدارة التنبيهات وهدر الطاقة' : 'Campus Energy Alerts & Anomaly Operations'}</span>
          </h1>

          <p className="text-xs text-slate-500">
            {isArabic
              ? 'مراقبة التجاوزات اللحظية لأحمال التكييف، أعطال الخلايا الشمسية، وهدر الطاقة خارج أوقات الاستخدام مع مسارات معالجة فورية.'
              : 'Automated monitoring of thermal anomalies, PV inverter mismatch, and unoccupied space wastage.'}
          </p>
        </div>

        {/* Simulate New Anomaly Prototype Trigger */}
        <button
          id="btn-simulate-anomaly"
          onClick={onSimulateNewAnomaly}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition cursor-pointer self-start md:self-center"
        >
          <Sparkles className="h-4 w-4" />
          <span>{isArabic ? 'محاكاة عطل طاقة جديد' : 'Simulate New Energy Anomaly'}</span>
        </button>
      </div>

      {/* 2. Key Anomaly Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Active Anomalies */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 block">{isArabic ? 'إجمالي التنبيهات النشطة' : 'Active Anomalies'}</span>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
            {activeAlerts.length}
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">
            {isArabic ? 'تحت متابعة مهندسي المنشآت' : 'Under operations tracking'}
          </span>
        </div>

        {/* Critical Alerts */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 block">{isArabic ? 'تنبيهات حرجة جداً' : 'Critical Escalations'}</span>
          <div className="text-2xl font-black font-mono text-rose-600 dark:text-rose-400 mt-1">
            {criticalCount}
          </div>
          <span className="text-[10px] text-rose-500 font-semibold block mt-1">
            {isArabic ? 'تتطلب تدخلاً فورياً' : 'Requires immediate action'}
          </span>
        </div>

        {/* Potential Energy Waste */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 block">{isArabic ? 'فرصة الوفر الطاقي' : 'Energy Waste Potential'}</span>
          <div className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400 mt-1">
            {totalPotentialWasteKwh} <span className="text-xs font-normal">kWh/day</span>
          </div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-1">
            {isArabic ? 'عند تطبيق الحلول الآلية' : 'Recoverable upon eco-fix'}
          </span>
        </div>

        {/* Cost Impact */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 block">{isArabic ? 'التكلفة التقديرية للهدر' : 'Estimated Cost Loss'}</span>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
            ${totalEstimatedCost} <span className="text-xs font-normal">/day</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">
            {isArabic ? 'بناءً على تعرفة الذروة' : 'Based on campus peak tariff'}
          </span>
        </div>
      </div>

      {/* 3. Filters and Tabs Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Severity Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {[
            { id: 'all', label: isArabic ? 'كافة التنبيهات' : 'All', count: activeAlerts.length },
            { id: 'critical', label: isArabic ? 'حرجة' : 'Critical', count: criticalCount },
            { id: 'warning', label: isArabic ? 'تحذير' : 'Warnings', count: warningCount },
            { id: 'info', label: isArabic ? 'معلومات' : 'Info', count: alerts.filter((a) => a.severity === 'info' && a.status === 'active').length },
            { id: 'resolved', label: isArabic ? 'تم حلها' : 'Resolved', count: alerts.filter((a) => a.status === 'resolved').length },
          ].map((tab) => (
            <button
              key={tab.id}
              id={`tab-alert-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-700 text-[10px] font-mono">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-slate-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="all">{isArabic ? 'كافة المنظومات' : 'All Categories'}</option>
            <option value="hvac">{isArabic ? 'التكييف والتهوية' : 'HVAC'}</option>
            <option value="solar">{isArabic ? 'الطاقة الشمسية' : 'Solar'}</option>
            <option value="electrical">{isArabic ? 'الأحمال الكهربائية' : 'Electrical'}</option>
            <option value="occupancy">{isArabic ? 'الإشغال والاستشعار' : 'Occupancy'}</option>
          </select>
        </div>
      </div>

      {/* 4. Alert Cards List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {isArabic ? 'لا توجد تنبيهات نشطة في هذا القسم' : 'No Active Anomalies in this Category'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {isArabic
                ? 'كافة أنظمة الحرم الجامعي تعمل بكفاءة مستقرة وضمن المعدلات المخططة.'
                : 'All monitored equipment and microgrid strings are currently performing within expected baseline limits.'}
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isResolved = alert.status === 'resolved';
            const isAck = alert.status === 'acknowledged';

            return (
              <div
                key={alert.id}
                id={`alert-card-${alert.id}`}
                className={`p-5 rounded-3xl border transition-all ${
                  isResolved
                    ? 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-70'
                    : alert.severity === 'critical'
                    ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Column: Severity, Title, Description, Location */}
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      {getSeverityBadge(alert.severity)}

                      {/* Location Tags: Building and Room */}
                      <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <Building className="h-3.5 w-3.5 text-emerald-600" />
                        {isArabic ? alert.buildingNameAr : alert.buildingName}
                      </span>

                      {alert.roomName && (
                        <>
                          <span className="text-slate-400">/</span>
                          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            {isArabic ? alert.roomNameAr : alert.roomName}
                          </span>
                        </>
                      )}

                      <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto sm:ml-0">
                        <Clock className="h-3 w-3" />
                        {isArabic ? alert.timestampAr : alert.timestamp}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {isArabic ? alert.titleAr : alert.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {isArabic ? alert.descriptionAr : alert.description}
                    </p>

                    {/* Suggested Action box */}
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <Sparkles className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>
                        <strong className="text-emerald-600 dark:text-emerald-400">
                          {isArabic ? 'الإجراء المقترح:' : 'Remediation:'}
                        </strong>{' '}
                        {isArabic ? alert.suggestedActionAr : alert.suggestedAction}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Savings metric and Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3 shrink-0">
                    {/* Potential savings pill */}
                    <div className="text-start sm:text-end">
                      <span className="text-[10px] text-slate-400 block uppercase font-mono">
                        {isArabic ? 'الوفر المتوقع' : 'Potential Savings'}
                      </span>
                      <span className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-400">
                        {alert.potentialSavingsKwh} kWh
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                      {!isResolved ? (
                        <>
                          {/* Automated Eco-Fix button */}
                          <button
                            id={`btn-autofix-${alert.id}`}
                            onClick={() => onAutoFixAlert(alert.id)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center gap-1 cursor-pointer shadow-sm"
                          >
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>{isArabic ? 'تطبيق الحل التلقائي' : 'Execute Eco-Fix'}</span>
                          </button>

                          {/* Acknowledge button */}
                          {!isAck && (
                            <button
                              id={`btn-ack-${alert.id}`}
                              onClick={() => onAcknowledgeAlert(alert.id)}
                              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition cursor-pointer"
                            >
                              {isArabic ? 'تأكيد الاستلام' : 'Acknowledge'}
                            </button>
                          )}

                          {/* Direct Navigation Links to Screen 2 or Screen 3! */}
                          {alert.roomId ? (
                            <button
                              id={`btn-goto-room-${alert.id}`}
                              onClick={() => onNavigateToRoom(alert.buildingId, alert.roomId!)}
                              className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 font-semibold text-xs transition flex items-center gap-1 cursor-pointer"
                            >
                              <span>{isArabic ? 'معاينة الغرفة (الشاشة 3)' : 'Inspect Room (Screen 3)'}</span>
                              <ChevronRight className={`h-3 w-3 ${isArabic ? 'rotate-180' : ''}`} />
                            </button>
                          ) : (
                            <button
                              id={`btn-goto-building-${alert.id}`}
                              onClick={() => onNavigateToBuilding(alert.buildingId)}
                              className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 font-semibold text-xs transition flex items-center gap-1 cursor-pointer"
                            >
                              <span>{isArabic ? 'معاينة المبنى (الشاشة 2)' : 'Inspect Building (Screen 2)'}</span>
                              <ChevronRight className={`h-3 w-3 ${isArabic ? 'rotate-180' : ''}`} />
                            </button>
                          )}

                          {/* Mark Resolved */}
                          <button
                            id={`btn-resolve-${alert.id}`}
                            onClick={() => onResolveAlert(alert.id)}
                            title={isArabic ? 'وضع علامة تم الحل' : 'Mark Resolved'}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-emerald-500 transition cursor-pointer"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>{isArabic ? 'تمت معالجة العطل' : 'Resolved & Normal'}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
