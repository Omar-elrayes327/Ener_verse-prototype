'use client';

import React from 'react';
import { BuildingData } from '../lib/types';
import { Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface CampusMapSvgProps {
  buildings: BuildingData[];
  selectedBuildingId: string | null;
  onSelectBuilding: (id: string) => void;
  onNavigateToBuilding: (id: string) => void;
  isArabic: boolean;
}

// Coordinates for isometric campus map
const buildingPositions: Record<string, { x: number; y: number; label: string }> = {
  'eng-hall': { x: 180, y: 130, label: 'ENG-01' },
  'sci-complex': { x: 420, y: 140, label: 'SCI-02' },
  'cent-lib': { x: 300, y: 240, label: 'LIB-03' },
  'innov-hub': { x: 550, y: 220, label: 'INN-04' },
  'stud-union': { x: 190, y: 310, label: 'STU-05' },
  'dorm-north': { x: 440, y: 330, label: 'DRM-06' },
};

export const CampusMapSvg: React.FC<CampusMapSvgProps> = ({
  buildings,
  selectedBuildingId,
  onSelectBuilding,
  onNavigateToBuilding,
  isArabic,
}) => {
  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/40 p-4 border border-slate-800/80 text-white overflow-hidden shadow-xl">
      {/* Background grid / ambient tech lines */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Map Header Overlay */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <h3 className="text-sm font-semibold tracking-wide text-slate-200">
            {isArabic ? 'خريطة الحرم الجامعي الذكي التفاعلية' : 'Interactive Campus Microgrid & Energy Map'}
          </h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 font-mono">
            {isArabic ? 'مباشر • 6 مباني متصلة' : 'LIVE • 6 Connected Nodes'}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {isArabic ? 'مثالي' : 'Optimal'}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            {isArabic ? 'تنبيه حمل' : 'Load Warning'}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            {isArabic ? 'طاقة شمسية نشطة' : 'Solar Active'}
          </span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full aspect-[16/9] max-h-[380px]">
        <svg
          viewBox="0 0 740 420"
          className="w-full h-full select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="gridLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
            </linearGradient>

            <filter id="glowOptimal" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="glowWarning" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Microgrid Power Transmission Pathways */}
          <path
            d="M 180 130 L 300 240 L 420 140 L 550 220 L 440 330 L 190 310 Z"
            fill="none"
            stroke="url(#gridLineGrad)"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="animate-[dash_20s_linear_infinite]"
          />
          <path
            d="M 300 240 L 190 310"
            fill="none"
            stroke="#10b981"
            strokeOpacity="0.3"
            strokeWidth="1.5"
          />
          <path
            d="M 300 240 L 440 330"
            fill="none"
            stroke="#10b981"
            strokeOpacity="0.3"
            strokeWidth="1.5"
          />
          <path
            d="M 180 130 L 420 140"
            fill="none"
            stroke="#0284c7"
            strokeOpacity="0.25"
            strokeWidth="1.5"
          />

          {/* Campus Central Green Quad Park in Center */}
          <ellipse cx="330" cy="220" rx="90" ry="50" fill="#064e3b" fillOpacity="0.25" stroke="#10b981" strokeOpacity="0.2" strokeWidth="1" />
          <text x="330" y="215" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="500" opacity="0.6">
            {isArabic ? 'الواحة الخضراء المركزية' : 'Campus Eco-Quad'}
          </text>

          {/* Buildings Nodes */}
          {buildings.map((b) => {
            const pos = buildingPositions[b.id] || { x: 300, y: 200, label: b.code };
            const isSelected = selectedBuildingId === b.id;
            const isWarning = b.status === 'warning' || b.status === 'critical';
            const nodeColor = isWarning ? '#f59e0b' : '#10b981';
            const nodeFill = isWarning ? '#451a03' : '#064e3b';

            return (
              <g
                key={b.id}
                className="cursor-pointer transition-transform duration-200 hover:scale-105"
                onClick={() => onSelectBuilding(b.id)}
              >
                {/* Selection pulse ring */}
                {isSelected && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="46"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeDasharray="6 3"
                    className="animate-spin origin-[center] [transform-origin:var(--origin)]"
                    style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                  />
                )}

                {/* Building Footprint Hexagon / Card Base */}
                <rect
                  x={pos.x - 42}
                  y={pos.y - 32}
                  width="84"
                  height="64"
                  rx="10"
                  fill={isSelected ? '#0f172a' : nodeFill}
                  stroke={isSelected ? '#38bdf8' : nodeColor}
                  strokeWidth={isSelected ? '2.5' : '1.5'}
                  filter={isWarning ? 'url(#glowWarning)' : 'url(#glowOptimal)'}
                  fillOpacity={isSelected ? 0.95 : 0.8}
                />

                {/* Solar roof badge icon */}
                {b.solarRoofKw > 0 && (
                  <circle
                    cx={pos.x + 34}
                    cy={pos.y - 24}
                    r="8"
                    fill="#0284c7"
                    stroke="#38bdf8"
                    strokeWidth="1"
                  />
                )}
                {b.solarRoofKw > 0 && (
                  <text
                    x={pos.x + 34}
                    y={pos.y - 21}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="8"
                    fontWeight="bold"
                  >
                    ☀
                  </text>
                )}

                {/* Building Code */}
                <text
                  x={pos.x}
                  y={pos.y - 12}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="12"
                  fontWeight="bold"
                  letterSpacing="0.5"
                >
                  {pos.label}
                </text>

                {/* Power draw in kW */}
                <text
                  x={pos.x}
                  y={pos.y + 6}
                  textAnchor="middle"
                  fill={isWarning ? '#fcd34d' : '#a7f3d0'}
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {b.currentPowerKw} <tspan fontSize="9">kW</tspan>
                </text>

                {/* Small status indicator pill */}
                <rect
                  x={pos.x - 30}
                  y={pos.y + 14}
                  width="60"
                  height="12"
                  rx="6"
                  fill={isWarning ? '#b45309' : '#047857'}
                  fillOpacity="0.8"
                />
                <text
                  x={pos.x}
                  y={pos.y + 23}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="8"
                  fontWeight="600"
                >
                  {isWarning ? 'ALERT' : `${b.solarRoofKw} kW PV`}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Building Quick Hover / Action Drawer Overlay */}
        {selectedBuildingId && (() => {
          const selected = buildings.find((b) => b.id === selectedBuildingId);
          if (!selected) return null;
          return (
            <div className="absolute bottom-2 left-2 right-2 sm:left-auto sm:right-2 sm:max-w-xs bg-slate-900/95 backdrop-blur-md p-3.5 rounded-xl border border-emerald-500/40 shadow-2xl flex flex-col gap-2 z-20">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                    {selected.code} • {isArabic ? selected.zoneAr : selected.zone}
                  </span>
                  <h4 className="text-sm font-bold text-white line-clamp-1">
                    {isArabic ? selected.nameAr : selected.name}
                  </h4>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    selected.status === 'optimal'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                      : 'bg-amber-950 text-amber-300 border border-amber-700'
                  }`}
                >
                  {selected.status === 'optimal'
                    ? isArabic ? 'مستقر' : 'Optimal'
                    : isArabic ? 'تحت الملاحظة' : 'Warning'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 block">{isArabic ? 'الحمل' : 'Load'}</span>
                  <span className="font-mono font-bold text-emerald-400">{selected.currentPowerKw} kW</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">{isArabic ? 'الطاقة الشمسية' : 'Solar'}</span>
                  <span className="font-mono font-bold text-cyan-400">{selected.solarRoofKw} kW</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">{isArabic ? 'الإشغال' : 'Occupancy'}</span>
                  <span className="font-mono font-bold text-slate-200">{selected.occupancyCurrent}</span>
                </div>
              </div>

              <button
                id={`btn-drilldown-${selected.id}`}
                onClick={() => onNavigateToBuilding(selected.id)}
                className="w-full mt-1 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition shadow-sm cursor-pointer"
              >
                <span>{isArabic ? 'فتح نظرة عامة على المبنى' : 'Open Building Overview'}</span>
                <span className={isArabic ? 'rotate-180 inline-block' : ''}>→</span>
              </button>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
