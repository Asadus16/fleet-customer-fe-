'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getInsuranceOptions,
  getFleetExtras,
  getBookingById,
  createBooking,
  type CreateBookingPayload,
} from '@/services/bookingServices';

export const useInsuranceOptions = () =>
  useQuery({
    queryKey: ['insuranceOptions'],
    queryFn: getInsuranceOptions,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

export const useFleetExtras = (fleetId?: string | number) =>
  useQuery({
    queryKey: ['fleetExtras', fleetId],
    queryFn: () => getFleetExtras(fleetId!),
    enabled: !!fleetId,
  });

export const useBookingDetails = (bookingId?: string | number) =>
  useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBookingById(bookingId!),
    enabled: !!bookingId,
  });

export const useCreateBooking = () =>
  useMutation({
    mutationFn: (payload: CreateBookingPayload) => createBooking(payload),
  });
