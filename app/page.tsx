'use client';

import React, { useState, useEffect } from 'react';
import {
  ScreenType,
  BuildingData,
  RoomData,
  AlertItem,
  UniversityCampusStats,
  UserProfile,
} from '../lib/types';
import { DEMO_USERS, isScreenPermittedForRole } from '../lib/auth';
import { initialCampusStats, initialBuildings, initialAlerts } from '../lib/mock-data';
import { AppSidebar } from '../components/AppSidebar';
import { TopHeader } from '../components/TopHeader';
import { LoginView } from '../components/LoginView';
import { AccessRestricted } from '../components/AccessRestricted';
import { CentralUniversityView } from '../components/CentralUniversityView';
import { UniversityCentralDashboard } from '../components/UniversityCentralDashboard';
import { BuildingOverview } from '../components/BuildingOverview';
import { RoomDetails } from '../components/RoomDetails';
import { AlertsView } from '../components/AlertsView';
import { EnergyAnalyticsView } from '../components/EnergyAnalyticsView';
import { AiInsightsView } from '../components/AiInsightsView';
import { PredictiveMaintenanceView } from '../components/PredictiveMaintenanceView';
import { ReportsView } from '../components/ReportsView';
import { SettingsView } from '../components/SettingsView';

export default function EnerVerseApp() {
  // Authentication State (defaults to University Admin for instant live demo access)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(DEMO_USERS[0]);

  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('university-central');
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>('eng-hall');
  const [selectedRoomId, setSelectedRoomId] = useState<string>('eng-101');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Core Data State
  const [campusStats, setCampusStats] = useState<UniversityCampusStats>(initialCampusStats);
  const [buildings, setBuildings] = useState<BuildingData[]>(initialBuildings);
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);

  // Experience Options
  const [isArabic, setIsArabic] = useState<boolean>(false); // English default matching the reference screenshot, with full instant Arabic toggle
  const [isLiveSimulating, setIsLiveSimulating] = useState<boolean>(true);

  // Active Building and Room
  const activeBuilding = buildings.find((b) => b.id === selectedBuildingId) || buildings[0];
  const allRoomsInActiveBuilding = activeBuilding.floors.flatMap((f) => f.rooms);
  const activeRoom =
    allRoomsInActiveBuilding.find((r) => r.id === selectedRoomId) || allRoomsInActiveBuilding[0];

  // Telemetry Simulation Timer
  useEffect(() => {
    if (!isLiveSimulating) return;

    const interval = setInterval(() => {
      // Fluctuations in total campus load
      setCampusStats((prev) => {
        const delta = Math.round((Math.random() - 0.48) * 15);
        const solarDelta = Math.round((Math.random() - 0.5) * 8);
        const newLoad = Math.max(2100, Math.min(2900, prev.totalLoadKw + delta));
        const newSolar = Math.max(650, Math.min(850, prev.solarGenerationKw + solarDelta));
        return {
          ...prev,
          totalLoadKw: newLoad,
          solarGenerationKw: newSolar,
          gridImportKw: newLoad - newSolar,
          renewableSharePct: Math.round((newSolar / newLoad) * 1000) / 10,
        };
      });

      // Subtle fluctuation in buildings & rooms
      setBuildings((prevBuildings) =>
        prevBuildings.map((b) => {
          const delta = Math.round((Math.random() - 0.49) * 4);
          const newPower = Math.max(120, b.currentPowerKw + delta);
          return {
            ...b,
            currentPowerKw: newPower,
            floors: b.floors.map((f) => ({
              ...f,
              rooms: f.rooms.map((r) => {
                if (r.id === selectedRoomId) {
                  const rDelta = Math.round((Math.random() - 0.5) * 0.4 * 10) / 10;
                  const newRPower = Math.max(2, Math.round((r.powerKw + rDelta) * 10) / 10);
                  return {
                    ...r,
                    powerKw: newRPower,
                    telemetry: {
                      ...r.telemetry,
                      co2Ppm: Math.max(400, r.telemetry.co2Ppm + (Math.random() > 0.5 ? 2 : -2)),
                      noiseDb: Math.max(30, r.telemetry.noiseDb + (Math.random() > 0.5 ? 1 : -1)),
                    },
                  };
                }
                return r;
              }),
            })),
          };
        })
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [isLiveSimulating, selectedRoomId]);

  // If user is not authenticated, render Login Screen
  if (!currentUser) {
    return (
      <LoginView
        onLogin={(user) => {
          setCurrentUser(user);
          // If building manager, default to assigned building
          if (user.assignedBuildingId) {
            setSelectedBuildingId(user.assignedBuildingId);
          }
          // Redirect to appropriate initial screen based on role
          if (user.role === 'university_admin') {
            setCurrentScreen('university-central');
          } else {
            setCurrentScreen('buildings');
          }
        }}
        isArabic={isArabic}
        onToggleLanguage={() => setIsArabic(!isArabic)}
      />
    );
  }

  // Navigation Handlers
  const handleSelectBuilding = (buildingId: string) => {
    setSelectedBuildingId(buildingId);
    const targetBuilding = buildings.find((b) => b.id === buildingId);
    if (targetBuilding && targetBuilding.floors[0]?.rooms[0]) {
      setSelectedRoomId(targetBuilding.floors[0].rooms[0].id);
    }
    setCurrentScreen('buildings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
    setCurrentScreen('rooms');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToRoomDirect = (buildingId: string, roomId: string) => {
    setSelectedBuildingId(buildingId);
    setSelectedRoomId(roomId);
    setCurrentScreen('rooms');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Building Eco-Setback Toggle Handler
  const handleToggleBuildingEcoMode = (buildingId: string) => {
    setBuildings((prev) =>
      prev.map((b) => {
        if (b.id === buildingId) {
          const isEco = b.hvacMode === 'Eco-Setback';
          const newMode = isEco ? 'Standard' : 'Eco-Setback';
          const newModeAr = isEco ? 'الوضع التشغيلي القياسي' : 'التحكم الذكي التوفيري';
          const powerReductionFactor = isEco ? 1.12 : 0.88;
          return {
            ...b,
            hvacMode: newMode,
            hvacModeAr: newModeAr,
            currentPowerKw: Math.round(b.currentPowerKw * powerReductionFactor),
          };
        }
        return b;
      })
    );
  };

  // Room Controls Update Handler
  const handleUpdateRoomControls = (roomId: string, newControls: Partial<RoomData['controls']>) => {
    setBuildings((prev) =>
      prev.map((b) => ({
        ...b,
        floors: b.floors.map((f) => ({
          ...f,
          rooms: f.rooms.map((r) => {
            if (r.id === roomId) {
              const updatedControls = { ...r.controls, ...newControls };
              let hvacLoad = r.powerBreakdown.hvac;
              let lightingLoad = r.powerBreakdown.lighting;
              let standbyLoad = r.powerBreakdown.standby;

              if (newControls.thermostatSetpoint !== undefined) {
                const diff = newControls.thermostatSetpoint - 21.0;
                hvacLoad = Math.max(3.0, Math.round((7.5 - diff * 0.8) * 10) / 10);
              }

              if (newControls.hvacMode === 'eco') {
                hvacLoad = Math.round(hvacLoad * 0.85 * 10) / 10;
              } else if (newControls.hvacMode === 'off') {
                hvacLoad = 0.5;
              }

              if (newControls.lightingLevel !== undefined) {
                lightingLoad = Math.round((newControls.lightingLevel / 100) * 3.2 * 10) / 10;
              }

              if (newControls.socketPowerCut !== undefined) {
                standbyLoad = newControls.socketPowerCut ? 0.1 : 0.8;
              }

              const newPower = Math.round(
                (hvacLoad + lightingLoad + r.powerBreakdown.equipment + standbyLoad) * 10
              ) / 10;

              return {
                ...r,
                powerKw: newPower,
                powerBreakdown: {
                  ...r.powerBreakdown,
                  hvac: hvacLoad,
                  lighting: lightingLoad,
                  standby: standbyLoad,
                },
                controls: updatedControls,
              };
            }
            return r;
          }),
        })),
      }))
    );
  };

  // Alert Handlers
  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: 'acknowledged' } : a))
    );
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: 'resolved' } : a))
    );
  };

  const handleAutoFixAlert = (alertId: string) => {
    const alert = alerts.find((a) => a.id === alertId);
    if (!alert) return;

    if (alert.roomId) {
      handleUpdateRoomControls(alert.roomId, {
        thermostatSetpoint: 23.0,
        hvacMode: 'eco',
        lightingLevel: 60,
        socketPowerCut: true,
      });
    } else if (alert.buildingId) {
      handleToggleBuildingEcoMode(alert.buildingId);
    }

    handleResolveAlert(alertId);
  };

  const handleSimulateNewAnomaly = () => {
    const randomBuilding = buildings[Math.floor(Math.random() * buildings.length)];
    const newId = `alt-${Date.now().toString().slice(-4)}`;
    const newAlert: AlertItem = {
      id: newId,
      title: `Unscheduled High Draw Detected in ${randomBuilding.code}`,
      titleAr: `تم رصد استهلاك غير معتاد في ${randomBuilding.nameAr}`,
      description: `Surge in baseline draw detected (+18 kW). Secondary circulation pump vibration anomaly.`,
      descriptionAr: `ارتفاع مفاجئ في استهلاك الأحمال الأساسية (+18 كيلوواط). اشتباه في خلل بمضخة التدوير الثانوية.`,
      severity: 'warning',
      category: 'electrical',
      buildingId: randomBuilding.id,
      buildingName: randomBuilding.name,
      buildingNameAr: randomBuilding.nameAr,
      timestamp: 'Just now',
      timestampAr: 'الآن',
      status: 'active',
      potentialSavingsKwh: 45,
      suggestedAction: 'Dispatch mechanical technician to inspect balance valve and frequency drive',
      suggestedActionAr: 'إرسال فني صيانة لفحص صمام الموازنة ومغير السرعة',
    };

    setAlerts((prev) => [newAlert, ...prev]);
  };

  const activeAlertsCount = alerts.filter((a) => a.status === 'active').length;

  // Authorization check for current active screen
  const isAuthorizedForCurrentScreen = isScreenPermittedForRole(currentUser.role, currentScreen);

  // Normalize screen for rendering
  const normalizedScreen =
    currentScreen === 'central'
      ? 'dashboard'
      : currentScreen === 'building'
      ? 'buildings'
      : currentScreen === 'room'
      ? 'rooms'
      : currentScreen;

  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#0b1326] text-[#dae2fd] font-sans selection:bg-[#0f766e] selection:text-[#a3faef] flex"
    >
      {/* 1. Collapsible Left Sidebar */}
      <AppSidebar
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
        activeAlertsCount={activeAlertsCount}
        isArabic={isArabic}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Wrapper */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isArabic ? 'lg:mr-72' : 'lg:ml-72'
        }`}
      >
        {/* Top Header */}
        <TopHeader
          currentUser={currentUser}
          onLogout={() => setCurrentUser(null)}
          activeAlertsCount={activeAlertsCount}
          onOpenAlerts={() => setCurrentScreen('alerts')}
          isArabic={isArabic}
          onToggleLanguage={() => setIsArabic(!isArabic)}
          isLiveSimulating={isLiveSimulating}
          onToggleLiveSimulation={() => setIsLiveSimulating(!isLiveSimulating)}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Dynamic Screen Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* Route Protection Fallback if access is restricted */}
          {!isAuthorizedForCurrentScreen ? (
            <AccessRestricted
              currentUser={currentUser}
              attemptedScreen={currentScreen}
              onSwitchToAdmin={() => {
                setCurrentUser(DEMO_USERS[0]); // Switch to University Admin
              }}
              onReturnToAllowed={() => {
                setCurrentScreen('buildings');
              }}
              isArabic={isArabic}
            />
          ) : (
            <>
              {/* Screen: University Central Dashboard (Matches Reference Screenshot) */}
              {normalizedScreen === 'university-central' && (
                <UniversityCentralDashboard
                  onNavigateToBuilding={handleSelectBuilding}
                  onNavigateToRoom={handleNavigateToRoomDirect}
                  onNavigateToAlerts={() => setCurrentScreen('alerts')}
                  isArabic={isArabic}
                />
              )}

              {/* Screen 1: Dashboard / Central University View (Campus Map & Microgrid) */}
              {normalizedScreen === 'dashboard' && (
                <CentralUniversityView
                  stats={campusStats}
                  buildings={buildings}
                  alerts={alerts}
                  onSelectBuilding={handleSelectBuilding}
                  onNavigateToAlerts={() => setCurrentScreen('alerts')}
                  isArabic={isArabic}
                />
              )}

              {/* Screen 2: Buildings Overview */}
              {normalizedScreen === 'buildings' && (
                <BuildingOverview
                  building={activeBuilding}
                  allBuildings={buildings}
                  alerts={alerts}
                  onSelectBuilding={(id) => {
                    setSelectedBuildingId(id);
                    const target = buildings.find((b) => b.id === id);
                    if (target?.floors[0]?.rooms[0]) {
                      setSelectedRoomId(target.floors[0].rooms[0].id);
                    }
                  }}
                  onSelectRoom={handleSelectRoom}
                  onBackToCentral={() => setCurrentScreen('dashboard')}
                  onNavigateToAlerts={() => setCurrentScreen('alerts')}
                  onToggleBuildingEcoMode={handleToggleBuildingEcoMode}
                  isArabic={isArabic}
                />
              )}

              {/* Screen 3: Rooms Telemetry & Controls */}
              {normalizedScreen === 'rooms' && (
                <RoomDetails
                  room={activeRoom}
                  building={activeBuilding}
                  onBackToBuilding={() => setCurrentScreen('buildings')}
                  onBackToCentral={() => setCurrentScreen('dashboard')}
                  onUpdateRoomControls={handleUpdateRoomControls}
                  isArabic={isArabic}
                />
              )}

              {/* Screen 4: Alerts & Anomaly Remediation */}
              {normalizedScreen === 'alerts' && (
                <AlertsView
                  alerts={alerts}
                  onAcknowledgeAlert={handleAcknowledgeAlert}
                  onResolveAlert={handleResolveAlert}
                  onAutoFixAlert={handleAutoFixAlert}
                  onNavigateToBuilding={handleSelectBuilding}
                  onNavigateToRoom={handleNavigateToRoomDirect}
                  onSimulateNewAnomaly={handleSimulateNewAnomaly}
                  isArabic={isArabic}
                />
              )}

              {/* Screen 5: Energy Analytics */}
              {normalizedScreen === 'analytics' && (
                <EnergyAnalyticsView isArabic={isArabic} />
              )}

              {/* Screen 6: AI Insights */}
              {normalizedScreen === 'ai-insights' && (
                <AiInsightsView isArabic={isArabic} />
              )}

              {/* Screen 7: Predictive Maintenance */}
              {normalizedScreen === 'maintenance' && (
                <PredictiveMaintenanceView isArabic={isArabic} />
              )}

              {/* Screen 8: Reports & Carbon Audits */}
              {normalizedScreen === 'reports' && (
                <ReportsView isArabic={isArabic} />
              )}

              {/* Screen 9: Settings */}
              {normalizedScreen === 'settings' && (
                <SettingsView currentUser={currentUser} isArabic={isArabic} />
              )}
            </>
          )}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-[#1e293b]/60 bg-[#060e20]/80 py-4 px-6 text-center text-xs text-[#889391] flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#4edea3]" />
            <span className="text-[#dae2fd] font-semibold">
              EnerVerse Smart University Microgrid Platform
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#171f33] text-[#80d5cb]">
              v2.4
            </span>
          </div>

          <div className="text-[11px] text-[#889391]">
            DEMO AUTHENTICATION — NOT PRODUCTION SECURITY • {currentUser.email} ({currentUser.role})
          </div>
        </footer>
      </div>
    </div>
  );
}
