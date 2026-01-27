import type { BaseEntity, Status } from './common';

export type DriverStatus = Status | 'on_trip' | 'on_leave';

export interface Driver extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: Date;
  status: DriverStatus;
  dateOfBirth: Date;
  hireDate: Date;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  assignedVehicleId: string | null;
  totalTrips: number;
  rating: number;
}

export interface DriverFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  dateOfBirth: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
}
