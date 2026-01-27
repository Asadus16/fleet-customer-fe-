import type { BaseEntity, Status } from './common';

export type VehicleType = 'truck' | 'van' | 'car' | 'bus' | 'motorcycle';

export type VehicleStatus = Status | 'in_maintenance' | 'in_transit';

export interface Vehicle extends BaseEntity {
  plateNumber: string;
  make: string;
  model: string;
  year: number;
  type: VehicleType;
  status: VehicleStatus;
  vin: string;
  color: string;
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  mileage: number;
  lastServiceDate: Date | null;
  nextServiceDue: Date | null;
  assignedDriverId: string | null;
  insuranceExpiry: Date;
  registrationExpiry: Date;
}

export interface VehicleFormData {
  plateNumber: string;
  make: string;
  model: string;
  year: number;
  type: VehicleType;
  vin: string;
  color: string;
  fuelType: Vehicle['fuelType'];
  mileage: number;
  insuranceExpiry: string;
  registrationExpiry: string;
}
