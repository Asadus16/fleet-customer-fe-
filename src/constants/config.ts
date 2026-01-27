export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'Fleet Management',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;

export const VEHICLE_TYPES = [
  { label: 'Truck', value: 'truck' },
  { label: 'Van', value: 'van' },
  { label: 'Car', value: 'car' },
  { label: 'Bus', value: 'bus' },
  { label: 'Motorcycle', value: 'motorcycle' },
] as const;

export const FUEL_TYPES = [
  { label: 'Gasoline', value: 'gasoline' },
  { label: 'Diesel', value: 'diesel' },
  { label: 'Electric', value: 'electric' },
  { label: 'Hybrid', value: 'hybrid' },
] as const;

export const MAINTENANCE_TYPES = [
  { label: 'Routine', value: 'routine' },
  { label: 'Repair', value: 'repair' },
  { label: 'Inspection', value: 'inspection' },
  { label: 'Emergency', value: 'emergency' },
] as const;
