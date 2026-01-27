import type { BaseEntity } from './common';

export type MaintenanceType = 'routine' | 'repair' | 'inspection' | 'emergency';

export type MaintenanceStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export interface Maintenance extends BaseEntity {
  vehicleId: string;
  type: MaintenanceType;
  status: MaintenanceStatus;
  description: string;
  scheduledDate: Date;
  completedDate: Date | null;
  cost: number | null;
  vendor: string;
  notes: string;
  mileageAtService: number;
  nextServiceMileage: number | null;
  parts: MaintenancePart[];
}

export interface MaintenancePart {
  name: string;
  quantity: number;
  unitCost: number;
}

export interface MaintenanceFormData {
  vehicleId: string;
  type: MaintenanceType;
  description: string;
  scheduledDate: string;
  vendor: string;
  notes: string;
  estimatedCost: number;
}
