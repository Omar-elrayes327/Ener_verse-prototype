export type ScreenType =
  | 'dashboard'
  | 'university-central'
  | 'buildings'
  | 'rooms'
  | 'analytics'
  | 'ai-insights'
  | 'maintenance'
  | 'alerts'
  | 'reports'
  | 'settings'
  // Legacy aliases for backward compatibility with existing handlers
  | 'central'
  | 'building'
  | 'room';

export type UserRole = 'university_admin' | 'building_manager' | 'facility_manager';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  nameAr: string;
  title: string;
  titleAr: string;
  role: UserRole;
  assignedBuildingId?: string; // e.g., 'eng-hall' for building manager
  avatarUrl: string;
}

export type AlertSeverity = 'critical' | 'warning' | 'info';
export type AlertCategory = 'hvac' | 'electrical' | 'solar' | 'sensor' | 'occupancy';
export type AlertStatus = 'active' | 'acknowledged' | 'resolved';

export interface AlertItem {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  severity: AlertSeverity;
  category: AlertCategory;
  buildingId: string;
  buildingName: string;
  buildingNameAr: string;
  roomId?: string;
  roomName?: string;
  roomNameAr?: string;
  timestamp: string;
  timestampAr: string;
  status: AlertStatus;
  potentialSavingsKwh: number;
  suggestedAction: string;
  suggestedActionAr: string;
}

export interface RoomTelemetry {
  temperature: number; // Celsius
  humidity: number; // percentage
  co2Ppm: number; // ppm
  noiseDb: number; // decibels
  lightLux: number; // lux
  occupancy: number; // current headcount
  capacity: number; // room max capacity
  doorOpen: boolean;
}

export interface RoomControls {
  thermostatSetpoint: number; // Celsius
  hvacMode: 'cool' | 'heat' | 'eco' | 'auto' | 'off';
  fanSpeed: 'low' | 'med' | 'high' | 'auto';
  lightingLevel: number; // 0 - 100%
  lightingMode: 'circadian' | 'manual' | 'eco_sensor' | 'schedule';
  socketPowerCut: boolean;
  ecoScheduleActive: boolean;
}

export interface HourlyDataPoint {
  time: string;
  actualKw: number;
  baselineKw: number;
  solarKw?: number;
}

export interface RoomData {
  id: string;
  code: string;
  name: string;
  nameAr: string;
  type: 'lab' | 'classroom' | 'lecture_hall' | 'office' | 'server_room' | 'auditorium';
  floorNumber: number;
  floorName: string;
  floorNameAr: string;
  buildingId: string;
  areaSqm: number;
  powerKw: number;
  baselineKw: number;
  powerBreakdown: {
    hvac: number;
    lighting: number;
    equipment: number;
    standby: number;
  };
  telemetry: RoomTelemetry;
  controls: RoomControls;
  historyHourly: HourlyDataPoint[];
}

export interface FloorData {
  floorNumber: number;
  name: string;
  nameAr: string;
  powerKw: number;
  roomsCount: number;
  rooms: RoomData[];
}

export interface BuildingData {
  id: string;
  code: string;
  name: string;
  nameAr: string;
  zone: 'North Campus' | 'Central Campus' | 'South Campus' | 'Innovation Quad';
  zoneAr: string;
  areaSqm: number;
  floorsCount: number;
  occupancyCurrent: number;
  occupancyMax: number;
  currentPowerKw: number;
  baselineKw: number;
  solarRoofKw: number;
  status: 'optimal' | 'warning' | 'critical';
  eui: number; // kWh/m²/year
  hvacMode: 'Standard' | 'Eco-Setback' | 'Peak-Shaving';
  hvacModeAr: string;
  systemsBreakdown: {
    hvac: number;
    lighting: number;
    plugs: number;
    specialized: number;
  };
  temperatureAvg: number;
  co2PpmAvg: number;
  activeAlertsCount: number;
  floors: FloorData[];
  hourlyTrend: HourlyDataPoint[];
}

export interface UniversityCampusStats {
  campusName: string;
  campusNameAr: string;
  totalLoadKw: number;
  baselineLoadKw: number;
  solarGenerationKw: number;
  gridImportKw: number;
  batteryStoragePct: number;
  batteryStorageKw: number;
  co2OffsetTodayKg: number;
  dailyConsumptionMwh: number;
  dailyBudgetMwh: number;
  totalBuildingsCount: number;
  totalMonitoredRooms: number;
  activeOccupancy: number;
  renewableSharePct: number;
  outdoorTempC: number;
  solarIrradianceWm2: number;
  activeAlertsTotal: number;
  criticalAlertsCount: number;
}
