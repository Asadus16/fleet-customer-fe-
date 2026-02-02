'use client';

import { useQuery } from '@tanstack/react-query';
import { listFleets, getFleetById } from '@/services/fleetServices';

export const useFleets = (page: number = 1, name: string = '') =>
  useQuery({
    queryKey: ['fleets', { page, name }],
    queryFn: () => listFleets({ page, name }),
  });

export const useFleet = (id?: string | number, enabled: boolean = true) =>
  useQuery({
    queryKey: ['fleet', id],
    queryFn: () => getFleetById(id!),
    enabled: !!id && enabled,
  });
