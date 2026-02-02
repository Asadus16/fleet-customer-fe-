import axiosInstance from '@/utils/axios';

const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID;

// API response types
export interface ApiClause {
  id: number;
  title: string;
  content: string;
}

export interface ApiTemplateClause {
  id: number;
  clause: ApiClause;
  order: number;
}

export interface ApiAgreement {
  id: number;
  booking: number;
  template: {
    id: number;
    title: string;
    description: string;
    header: string;
    footer: string;
    template_clauses: ApiTemplateClause[];
  };
  status: string;
  signed_at: string | null;
  signature_image: string | null;
  created_at: string;
  updated_at: string;
  // Populated from booking
  booking_details?: {
    id: number;
    customer: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      phone_no: string;
      address: string;
      city: string;
      state: string;
      zip_code: string;
      date_of_birth: string;
      license_number: string;
      license_expiry: string;
    };
    fleet: {
      id: number;
      name: string;
      vin: string;
      license_plate: string;
      year: number;
      image: string;
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
      name: string;
      description: string;
      price_per_day: number;
    };
    created_at: string;
  };
  company?: {
    id: number;
    name: string;
    email: string;
    phone_no: string;
    country: string;
    company_picture: string | null;
  };
}

// Transformed types for frontend
export interface AgreementData {
  id: number;
  status: string;
  signedAt: string | null;
  signatureImage: string | null;
  company: {
    name: string;
    address: string;
    email: string;
    phone: string;
    logo: string | null;
  };
  customer: {
    name: string;
    homeAddress: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    birthDate: string;
    licenseNumber: string;
    licenseExpiry: string;
  };
  insurance: {
    carrierName: string;
    policyNumber: string;
    expires: string;
    policyDetails: string;
  };
  vehicle: {
    pickupDateTime: string;
    dropoffDateTime: string;
    bookedAt: string;
    vin: string;
    vehicleName: string;
    minimumMiles: string;
    maximumMiles: string;
    overageFee: string;
  };
  clauses: {
    id: number;
    title: string;
    content: string;
  }[];
  template: {
    title: string;
    description: string;
  };
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatDateTime(dateStr: string | null): string {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function transformAgreement(api: ApiAgreement): AgreementData {
  const booking = api.booking_details;
  const customer = booking?.customer;
  const fleet = booking?.fleet;
  const company = api.company;

  return {
    id: api.id,
    status: api.status,
    signedAt: api.signed_at,
    signatureImage: api.signature_image,
    company: {
      name: company?.name || 'N/A',
      address: company?.country || 'N/A',
      email: company?.email || 'N/A',
      phone: company?.phone_no || 'N/A',
      logo: company?.company_picture || null,
    },
    customer: {
      name: customer ? `${customer.first_name} ${customer.last_name}` : 'N/A',
      homeAddress: customer?.address || 'N/A',
      city: customer?.city || 'N/A',
      state: customer?.state || 'N/A',
      zip: customer?.zip_code || 'N/A',
      phone: customer?.phone_no || 'N/A',
      birthDate: formatDate(customer?.date_of_birth || null),
      licenseNumber: customer?.license_number || 'N/A',
      licenseExpiry: formatDate(customer?.license_expiry || null),
    },
    insurance: {
      carrierName: booking?.insurance_option?.name || 'Own Insurance',
      policyNumber: 'N/A',
      expires: 'N/A',
      policyDetails: booking?.insurance_option?.description || 'Customer provided own insurance',
    },
    vehicle: {
      pickupDateTime: formatDateTime(booking?.pickup_datetime || null),
      dropoffDateTime: formatDateTime(booking?.dropoff_datetime || null),
      bookedAt: formatDate(booking?.created_at || null),
      vin: fleet?.vin || 'N/A',
      vehicleName: fleet ? `${fleet.year} ${fleet.name}` : 'N/A',
      minimumMiles: 'Unlimited',
      maximumMiles: 'Unlimited',
      overageFee: '$0.00',
    },
    clauses: api.template?.template_clauses?.map((tc) => ({
      id: tc.clause.id,
      title: tc.clause.title,
      content: tc.clause.content,
    })) || [],
    template: {
      title: api.template?.title || 'Rental Agreement',
      description: api.template?.description || '',
    },
  };
}

// Fetch agreement by ID
export async function getAgreementById(agreementId: number | string): Promise<AgreementData> {
  try {
    const res = await axiosInstance.get<ApiAgreement>(`/api/agreements/agreements/${agreementId}/`);
    console.log('🔵 Agreement API Response:', res.data);
    return transformAgreement(res.data);
  } catch (error) {
    console.error('Failed to fetch agreement:', error);
    throw error;
  }
}

// Fetch agreement by booking ID
export async function getAgreementByBookingId(bookingId: number | string): Promise<AgreementData | null> {
  try {
    const res = await axiosInstance.get<{ results: ApiAgreement[] }>('/api/agreements/agreements/', {
      params: { booking: bookingId },
    });
    console.log('🔵 Agreement by Booking API Response:', res.data);

    const firstResult = res.data.results?.[0];
    if (firstResult) {
      return transformAgreement(firstResult);
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch agreement by booking:', error);
    throw error;
  }
}

// Accept/sign agreement
export async function acceptAgreement(
  agreementId: number | string,
  signatureData: string
): Promise<AgreementData> {
  try {
    const res = await axiosInstance.post<ApiAgreement>(
      `/api/agreements/agreements/${agreementId}/accept-agreement/`,
      {
        template_variables: {},
        signature_image: signatureData,
      }
    );
    console.log('🔵 Accept Agreement API Response:', res.data);
    return transformAgreement(res.data);
  } catch (error) {
    console.error('Failed to accept agreement:', error);
    throw error;
  }
}

// Default company values when API is unavailable
const DEFAULT_COMPANY = {
  name: 'Fleet HQ',
  address: 'United States',
  email: 'support@fleethq.com',
  phone: '+1 (555) 000-0000',
  logo: null,
};

// Get company settings for agreement display
export async function getCompanySettings(): Promise<{
  name: string;
  address: string;
  email: string;
  phone: string;
  logo: string | null;
}> {
  // Return defaults if no company ID is configured
  if (!COMPANY_ID) {
    return DEFAULT_COMPANY;
  }

  try {
    const res = await axiosInstance.get(`/api/companies/${COMPANY_ID}/`);

    const company = res.data;
    return {
      name: company?.name || DEFAULT_COMPANY.name,
      address: company?.country || DEFAULT_COMPANY.address,
      email: company?.email || DEFAULT_COMPANY.email,
      phone: company?.phone_no || DEFAULT_COMPANY.phone,
      logo: company?.company_picture || null,
    };
  } catch {
    // Return default values if API fails
    return DEFAULT_COMPANY;
  }
}

// Get default agreement template with clauses
export interface AgreementTemplate {
  id: number;
  title: string;
  description: string;
  clauses: { id: number; title: string; content: string }[];
}

export async function getDefaultAgreementTemplate(): Promise<AgreementTemplate | null> {
  if (!COMPANY_ID) {
    return null;
  }

  try {
    // Step 1: Get templates for this company
    const res = await axiosInstance.get('/api/agreements/templates/', {
      params: { company: COMPANY_ID },
    });

    const templates = res.data?.results || res.data || [];
    if (templates.length === 0) {
      return null;
    }

    // Find the active (LIVE) template, or fall back to first template
    const activeTemplate = templates.find((t: { is_active: boolean }) => t.is_active) || templates[0];

    // Step 2: Fetch template clauses separately (list endpoint doesn't include them)
    const clausesRes = await axiosInstance.get(
      `/api/agreements/templates/${activeTemplate.id}/template-clauses/`
    );

    const templateClauses = clausesRes.data?.results || clausesRes.data || [];

    // Sort by order and extract clause data
    const sortedClauses = templateClauses
      .sort((a: { order: number }, b: { order: number }) => (a.order || 0) - (b.order || 0))
      .map((tc: { clause: { id: number; title: string; content: string } }) => ({
        id: tc.clause.id,
        title: tc.clause.title,
        content: tc.clause.content,
      }));

    return {
      id: activeTemplate.id,
      title: activeTemplate.title || 'Vehicle Rental Agreement',
      description: activeTemplate.description || 'Please review and sign this rental agreement before pickup.',
      clauses: sortedClauses,
    };
  } catch (error) {
    console.error('Failed to fetch agreement template:', error);
    return null;
  }
}
