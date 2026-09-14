/**
 * DEMO AUTHENTICATION — NOT PRODUCTION SECURITY
 * 
 * This module provides simulated client-side authentication and role-based
 * access control for the EnerVerse prototype. In a production deployment,
 * this would be integrated with a secure backend OAuth 2.0 / SAML identity provider.
 */

import { UserProfile, UserRole, ScreenType } from './types';

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'user-univ-admin',
    email: 'omarelrayes3600@gmail.com',
    name: 'Dr. Evelyn Vance',
    nameAr: 'د. إيفلين فانس',
    title: 'VP Campus Operations & Sustainability',
    titleAr: 'نائب رئيس عمليات الحرم الجامعي والاستدامة',
    role: 'university_admin',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD3JuHDbA8wYpwxGVfV9v-bA8LIwgtz4Dh2v4i1fB_wMNGpBGSwMgSjTxt672Klrmhcp18X4VrqUopZUTKqySQa6s67CoJZDLDYrpRuN-GLlcYFVWMzn_-gG2vElTrguIIsnG7wyUaTxTp4JMGvTEfVbrYhNwyhcr-XwB-mhSynGe78MwPc9iBBv50NYsH4cnBJHgHnOL8BBwE7SkZR5GxlBkpQyKTWLvPlrNxWRju8RgArBOIoqILV',
  },
  {
    id: 'user-bldg-manager',
    email: 'building.manager@enerverse.edu',
    name: 'Eng. Tariq Al-Mansoor',
    nameAr: 'م. طارق المنصور',
    title: 'Engineering Hall Facility Manager',
    titleAr: 'مدير منشآت كلية الهندسة',
    role: 'building_manager',
    assignedBuildingId: 'eng-hall',
    avatarUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'user-fac-manager',
    email: 'facility.manager@enerverse.edu',
    name: 'Sarah Jenkins',
    nameAr: 'سارة جينكينز',
    title: 'Operations & Anomaly Dispatch Lead',
    titleAr: 'مسؤولة العمليات والاستجابة الميدانية للأعطال',
    role: 'facility_manager',
    avatarUrl:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  },
];

export const DEMO_PASSWORD_DEFAULT = 'demo2026';

/**
 * Check if a user role is permitted to view a specific screen
 */
export function isScreenPermittedForRole(role: UserRole, screen: ScreenType): boolean {
  // Normalize screen
  const normalizedScreen = screen === 'central' ? 'dashboard' : screen === 'building' ? 'buildings' : screen === 'room' ? 'rooms' : screen;

  switch (role) {
    case 'university_admin':
      // University Admin has unrestricted access to all screens
      return true;

    case 'building_manager':
      // Restricted from university-level executive dashboard and global audit reports
      if (normalizedScreen === 'university-central' || normalizedScreen === 'reports') {
        return false;
      }
      return true;

    case 'facility_manager':
      // Restricted from executive university administration and corporate reports
      if (normalizedScreen === 'university-central' || normalizedScreen === 'reports') {
        return false;
      }
      return true;

    default:
      return false;
  }
}

/**
 * Get readable role label
 */
export function getRoleLabel(role: UserRole, isArabic: boolean): string {
  switch (role) {
    case 'university_admin':
      return isArabic ? 'مدير إدارة الحرم الجامعي' : 'University Admin';
    case 'building_manager':
      return isArabic ? 'مدير منشأة المبنى' : 'Building Manager';
    case 'facility_manager':
      return isArabic ? 'مسؤول صيانة وتشغيل المرافق' : 'Facility Manager';
  }
}
