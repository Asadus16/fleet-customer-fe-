import type { BaseEntity } from './common';

export type TripStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export interface Trip extends BaseEntity {
  vehicleId: string;
  driverId: string;
  startLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  endLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  scheduledStartTime: Date;
  scheduledEndTime: Date;
  actualStartTime: Date | null;
  actualEndTime: Date | null;
  status: TripStatus;
  distance: number;
  fuelConsumed: number | null;
  notes: string;
}

export interface TripFormData {
  vehicleId: string;
  driverId: string;
  startAddress: string;
  endAddress: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
  notes: string;
}
