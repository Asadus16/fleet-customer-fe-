import axios from 'axios';
import axiosInstance from '@/utils/axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID;

// Insurance option from API
export interface ApiInsuranceOption {
  id: number;
  name: string;
  description?: string;
  price_per_day: number;
  coverage_type?: string;
  features?: string[];
}

// Transformed for frontend
export interface InsuranceOption {
  id: string;
  title: string;
  price: number;
  description?: string;
  features: string[];
}

// Transform API response to frontend format
function transformInsuranceOption(api: ApiInsuranceOption): InsuranceOption {
  return {
    id: String(api.id),
    title: api.name,
    price: api.price_per_day ?? 0,
    description: api.description,
    features: api.features ?? [],
  };
}

// Fetch insurance options from API
export async function getInsuranceOptions(): Promise<InsuranceOption[]> {
  try {
    const res = await axiosInstance.get<ApiInsuranceOption[]>('/api/bookings/insurance_options/');
    console.log('🔵 Insurance Options API Response:', res.data);

    // Add "I have my own insurance" option
    const ownInsurance: InsuranceOption = {
      id: 'own',
      title: 'I have my own insurance',
      price: 0,
      features: ['Use your personal coverage'],
    };

    const apiOptions = Array.isArray(res.data)
      ? res.data.map(transformInsuranceOption)
      : [];

    return [ownInsurance, ...apiOptions];
  } catch (error) {
    console.error('Failed to fetch insurance options:', error);
    // Return default options on error
    return [
      {
        id: 'own',
        title: 'I have my own insurance',
        price: 0,
        features: ['Use your personal coverage'],
      },
    ];
  }
}

// Fetch extras for a fleet
export interface ApiExtra {
  id: number;
  description: string;
  price: number;
  period: 'per_day' | 'per_trip';
}

export interface Extra {
  id: string;
  title: string;
  description: string;
  price: number;
  priceUnit: string;
  hasQuantity: boolean;
}

function transformExtra(api: ApiExtra): Extra {
  return {
    id: String(api.id),
    title: api.description,
    description: api.description,
    price: api.price,
    priceUnit: api.period === 'per_day' ? '/day' : '/trip',
    hasQuantity: false,
  };
}

export async function getFleetExtras(fleetId: number | string): Promise<Extra[]> {
  try {
    const res = await axiosInstance.get<ApiExtra[]>(`/api/fleets/${fleetId}/extras/`);
    console.log('🔵 Fleet Extras API Response:', res.data);
    return Array.isArray(res.data) ? res.data.map(transformExtra) : [];
  } catch (error) {
    console.error('Failed to fetch fleet extras:', error);
    return [];
  }
}

// Booking Details Types
export interface ApiBooking {
  id: number;
  status: string;
  customer: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_no: string;
  };
  fleet: {
    id: number;
    name: string;
    license_plate: string;
    vin: string;
    image: string;
    images: string[];
    price_per_day: number;
    year: number;
  };
  pickup_datetime: string;
  dropoff_datetime: string;
  pickup_location: {
    id: number;
    name: string;
    address: string;
  };
  dropoff_location: {
    id: number;
    name: string;
    address: string;
  };
  insurance_option?: {
    id: number;
    name: string;
    price_per_day: number;
  };
  extras?: {
    id: number;
    name: string;
    price: number;
  }[];
  total_price: number;
  deposit_amount: number;
  discount_amount: number;
  discount_code?: string;
  tax_amount: number;
  created_at: string;
  updated_at: string;
  id_verification_status: string;
  insurance_verification_status: string;
  agreement?: {
    id: number;
    status: string;
  };
}

export interface BookingDetails {
  id: string;
  status: string;
  vehicle: {
    name: string;
    licensePlate: string;
    vin: string;
    image: string;
    year: number;
  };
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  bookedOn: string;
  pickUp: {
    address: string;
    date: string;
    time: string;
  };
  dropOff: {
    address: string;
    date: string;
    time: string;
  };
  invoice: {
    number: string;
    items: {
      name: string;
      image: string;
      quantity: number;
      pricePerDay: number;
    }[];
    subtotal: number;
    discount: number;
    discountCode: string;
    tax: number;
    total: number;
    deposit: number;
    balance: number;
  };
  verifications: {
    idVerification: string;
    insuranceVerification: string;
  };
  agreementId?: number;
  agreementStatus?: string;
}

function formatBookingDate(dateStr: string): string {
  const date = new Date(dateStr);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${days[date.getDay()]}. ${date.getDate().toString().padStart(2, '0')} ${months[date.getMonth()]}, ${date.getFullYear()}`;
}

function formatBookingTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function formatCreatedDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDate();
  const suffix = day === 1 || day === 21 || day === 31 ? 'st' : day === 2 || day === 22 ? 'nd' : day === 3 || day === 23 ? 'rd' : 'th';
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${day}${suffix} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function calculateDays(pickupDate: string, dropoffDate: string): number {
  const start = new Date(pickupDate);
  const end = new Date(dropoffDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays || 1;
}

function transformBooking(api: ApiBooking): BookingDetails {
  const rentalDays = calculateDays(api.pickup_datetime, api.dropoff_datetime);
  const subtotal = api.fleet.price_per_day * rentalDays;
  const total = api.total_price || subtotal - (api.discount_amount || 0) + (api.tax_amount || 0);
  const deposit = api.deposit_amount || total * 0.8;
  const balance = total - deposit;

  return {
    id: String(api.id),
    status: api.status,
    vehicle: {
      name: api.fleet.name,
      licensePlate: api.fleet.license_plate || 'N/A',
      vin: api.fleet.vin || 'N/A',
      image: api.fleet.image || api.fleet.images?.[0] || '/images/vehicles/car_placeholder.png',
      year: api.fleet.year,
    },
    customer: {
      name: `${api.customer.first_name} ${api.customer.last_name}`,
      email: api.customer.email,
      phone: api.customer.phone_no || 'N/A',
    },
    bookedOn: formatCreatedDate(api.created_at),
    pickUp: {
      address: api.pickup_location?.address || api.pickup_location?.name || 'N/A',
      date: formatBookingDate(api.pickup_datetime),
      time: formatBookingTime(api.pickup_datetime),
    },
    dropOff: {
      address: api.dropoff_location?.address || api.dropoff_location?.name || 'N/A',
      date: formatBookingDate(api.dropoff_datetime),
      time: formatBookingTime(api.dropoff_datetime),
    },
    invoice: {
      number: String(api.id),
      items: [
        {
          name: `${api.fleet.name} - ${api.fleet.license_plate || 'N/A'}`,
          image: api.fleet.image || api.fleet.images?.[0] || '/images/vehicles/car_placeholder.png',
          quantity: rentalDays,
          pricePerDay: api.fleet.price_per_day,
        },
      ],
      subtotal,
      discount: api.discount_amount || 0,
      discountCode: api.discount_code || '',
      tax: api.tax_amount || 0,
      total,
      deposit,
      balance,
    },
    verifications: {
      idVerification: api.id_verification_status || 'pending',
      insuranceVerification: api.insurance_verification_status || 'pending',
    },
    agreementId: api.agreement?.id,
    agreementStatus: api.agreement?.status,
  };
}

// Fetch booking by ID
export async function getBookingById(bookingId: number | string): Promise<BookingDetails> {
  try {
    const res = await axiosInstance.get<ApiBooking>(`/api/bookings/${bookingId}/`);
    console.log('🔵 Booking API Response:', res.data);
    return transformBooking(res.data);
  } catch (error) {
    console.error('Failed to fetch booking:', error);
    throw error;
  }
}

// Customer data for booking
export interface CustomerData {
  first_name: string;
  last_name: string;
  email: string;
  phone_no: string;
}

// Create booking request payload
export interface CreateBookingPayload {
  fleet_id: number;
  customer: CustomerData;
  pickup_datetime: string;
  dropoff_datetime: string;
  pickup_location_id: number;
  dropoff_location_id?: number;
  insurance_option_id?: number;
  extras?: number[];
  discount_code?: string;
}

// API booking payload (what the API actually expects)
interface ApiBookingPayload {
  customer: number;
  fleet_id: number;
  pickup_datetime: string;
  dropoff_datetime: string;
  pickup_location_id: number;
  dropoff_location_id: number;
  return_car_to_different_branch: boolean;
  extra_ids?: number[];
  insurance_selected: boolean;
  cdw_cover: boolean;
  rcli_cover: boolean;
  sli_cover: boolean;
  pai_cover: boolean;
  fuel_pre_purchase: boolean;
  notes: string;
  mile_used: number;
  fleet_settings: string;
}

// Generate a random password for guest checkout
function generateRandomPassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password + '1Aa!'; // Ensure it meets password requirements
}

// Create a customer via public registration API
// Note: Using plain axios to avoid custom headers that trigger CORS preflight
async function createCustomer(customer: CustomerData): Promise<number> {
  const password = generateRandomPassword();
  const res = await axios.post<{ id: number }>(
    `${API_URL}/api/users-auth/register/`,
    {
      email: customer.email,
      password: password,
      confirm_password: password,
      first_name: customer.first_name,
      last_name: customer.last_name,
      phone: customer.phone_no,
      company: COMPANY_ID ? Number(COMPANY_ID) : undefined,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  console.log('🔵 Create Customer API Response:', res.data);
  return res.data.id;
}

// Create a new booking (creates customer first, then booking)
export async function createBooking(payload: CreateBookingPayload): Promise<{ id: number }> {
  try {
    // Step 1: Create the customer
    const customerId = await createCustomer(payload.customer);
    console.log('🔵 Created customer with ID:', customerId);

    // Step 2: Create the booking with the customer ID
    const bookingPayload: ApiBookingPayload = {
      customer: customerId,
      fleet_id: payload.fleet_id,
      pickup_datetime: payload.pickup_datetime,
      dropoff_datetime: payload.dropoff_datetime,
      pickup_location_id: payload.pickup_location_id,
      dropoff_location_id: payload.dropoff_location_id || payload.pickup_location_id,
      return_car_to_different_branch: false,
      extra_ids: payload.extras,
      insurance_selected: !!payload.insurance_option_id,
      cdw_cover: false,
      rcli_cover: false,
      sli_cover: false,
      pai_cover: false,
      fuel_pre_purchase: false,
      notes: '',
      mile_used: 0,
      fleet_settings: '',
    };

    const res = await axiosInstance.post<ApiBooking>('/api/bookings/', bookingPayload);
    console.log('🔵 Create Booking API Response:', res.data);
    return { id: res.data.id };
  } catch (error) {
    console.error('Failed to create booking:', error);
    throw error;
  }
}
