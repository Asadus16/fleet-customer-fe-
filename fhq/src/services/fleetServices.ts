import axios from 'axios';
import {
  ApiVehicle,
  ApiPaginatedResponse,
  Vehicle,
  transformApiVehicle,
} from '@/types/vehicle';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

export interface ListFleetsParams {
  page?: number;
  name?: string;
}

export interface ListFleetsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Vehicle[];
}

// Use service token for fleet endpoints
export async function listFleets(
  params?: ListFleetsParams,
): Promise<ListFleetsResponse> {
  const res = await axios.get<ApiPaginatedResponse<ApiVehicle>>(
    `${API_URL}/api/fleets/list/`,
    {
      params: {
        ...params,
        company: COMPANY_ID,
      },
      headers: {
        'Content-Type': 'application/json',
        ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
      },
    },
  );

  // Debug: log raw API response
  console.log('🔵 Fleet API Response:', res.data.results);

  return {
    count: res.data.count,
    next: res.data.next,
    previous: res.data.previous,
    results: res.data.results.map(transformApiVehicle),
  };
}

export async function getFleetById(id: number | string): Promise<Vehicle> {
  const res = await axios.get<ApiVehicle>(`${API_URL}/api/fleets/list/${id}/`, {
    headers: {
      'Content-Type': 'application/json',
      ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
    },
  });
  return transformApiVehicle(res.data);
}
