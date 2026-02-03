import axios from 'axios';
import {
  ApiVehicle,
  ApiPaginatedResponse,
  Vehicle,
  transformApiVehicle,
} from '@/types/vehicle';
import { getDomainParams } from '@/utils/company';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

// Fetch fleets using public endpoint with domain param
export async function listFleets(
  params?: ListFleetsParams,
): Promise<ListFleetsResponse> {
  const domainParams = getDomainParams();

  const res = await axios.get<ApiPaginatedResponse<ApiVehicle>>(
    `${API_URL}/api/fleets/public/`,
    {
      params: {
        ...params,
        ...domainParams,
      },
      headers: {
        'Content-Type': 'application/json',
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
  const domainParams = getDomainParams();

  const res = await axios.get<ApiVehicle>(`${API_URL}/api/fleets/public/${id}/`, {
    params: domainParams,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return transformApiVehicle(res.data);
}
