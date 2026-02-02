// API response types (from backend)
export interface ApiVehicleImage {
  id: number;
  image: string;
  is_thumbnail: boolean;
}

export interface ApiBookingPrice {
  id?: number;
  price_per_day?: number;
  discounts?: {
    number_of_days: number;
    discount_percentage: number;
    is_active: boolean;
  }[];
}

export interface ApiBookingRule {
  id?: number;
  available_at?: number[];
  miles_per_day?: number;
  miles_overage_rate?: number;
}

export interface ApiVehicle {
  id: number;
  name: string;
  year?: number;
  plate_number?: string;
  vin_number?: string;
  seats?: number;
  doors?: number;
  transmission?: string;
  fuel_type?: string;
  location?: string;
  description?: string;
  status?: string;
  images?: ApiVehicleImage[];
  company?: number;
  // Nested objects from detail endpoint
  booking_price?: ApiBookingPrice;
  booking_rule?: ApiBookingRule;
  // Flat fields from list endpoint (if included)
  price_per_day?: number;
}

export interface ApiPaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Frontend types (for UI)
export interface Vehicle {
  id: string;
  name: string;
  year: number;
  image: string;
  images: string[];
  location: string;
  seats: number;
  transmission: string;
  fuelType: string;
  pricePerDay: number;
  licensePlate: string;
  vin: string;
  description: string;
  status?: string;
  availableLocations?: number[];
  // Mileage rules
  milesPerDay?: number;
  milesOverageRate?: number;
}

const PLACEHOLDER_IMAGE = '/images/vehicles/car_placeholder.png';

// Transformer function to convert API data to frontend format
export function transformApiVehicle(apiVehicle: ApiVehicle): Vehicle {
  const thumbnailImage = apiVehicle.images?.find((img) => img.is_thumbnail);
  const mainImage =
    thumbnailImage?.image ||
    apiVehicle.images?.[0]?.image ||
    PLACEHOLDER_IMAGE;

  // Price can be nested in booking_price or flat at top level
  const pricePerDay =
    apiVehicle.booking_price?.price_per_day ??
    apiVehicle.price_per_day ??
    0;

  return {
    id: String(apiVehicle.id),
    name: apiVehicle.name || 'Unknown Vehicle',
    year: apiVehicle.year || new Date().getFullYear(),
    image: mainImage,
    images: apiVehicle.images?.map((img) => img.image) || [mainImage],
    location: apiVehicle.location || '',
    seats: apiVehicle.seats || 4,
    transmission: apiVehicle.transmission || 'Automatic',
    fuelType: apiVehicle.fuel_type || 'Gasoline',
    pricePerDay,
    licensePlate: apiVehicle.plate_number || '',
    vin: apiVehicle.vin_number || '',
    description: apiVehicle.description || '',
    status: apiVehicle.status,
    availableLocations: apiVehicle.booking_rule?.available_at || [],
    milesPerDay: apiVehicle.booking_rule?.miles_per_day,
    milesOverageRate: apiVehicle.booking_rule?.miles_overage_rate,
  };
}
