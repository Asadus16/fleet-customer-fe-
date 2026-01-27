'use client';

import { useState } from 'react';
import Image from 'next/image';

interface BookingFormProps {
  onSubmit?: (data: BookingFormData) => void;
}

interface BookingFormData {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  differentLocation: boolean;
}

export function BookingForm({ onSubmit }: BookingFormProps) {
  const [differentLocation, setDifferentLocation] = useState(true);
  const [formData, setFormData] = useState<BookingFormData>({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    differentLocation: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-neutral-border bg-white px-6 py-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Pick-up Location */}
        <div className="space-y-3">
          <label className="block font-manrope text-2xs font-normal text-neutral-label">Pick-up</label>
          <div className="flex items-center gap-3 border-r border-slate-200 pr-4">
            <Image
              src="/icons/home/hero/pin.svg"
              alt="Location"
              width={24}
              height={24}
              className="flex-shrink-0"
            />
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full text-sm text-slate-700 placeholder:text-neutral-placeholder focus:outline-none"
              value={formData.pickupLocation}
              onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
            />
            <div className="border-l border-slate-200 pl-3">
              <button type="button" className="block">
                <Image
                  src="/icons/home/hero/inverse-arrows.svg"
                  alt="Swap"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Drop-off Location */}
        <div className="space-y-3">
          <label className="block font-manrope text-2xs font-normal text-neutral-label">Drop-off</label>
          <div className="flex items-center gap-3 border-r border-slate-200 pr-4">
            <Image
              src="/icons/home/hero/pin.svg"
              alt="Location"
              width={24}
              height={24}
              className="flex-shrink-0"
            />
            <input
              type="text"
              placeholder="Select City or Airport"
              className="w-full text-sm text-slate-700 placeholder:text-neutral-placeholder focus:outline-none"
              value={formData.dropoffLocation}
              onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
            />
          </div>
        </div>

        {/* Pick-up Date & Time */}
        <div className="space-y-3">
          <label className="block font-manrope text-2xs font-normal text-neutral-label">Pick-up Date & Time</label>
          <div className="flex items-center gap-2 border-r border-slate-200 pr-4">
            <div className="flex flex-1 items-center gap-2">
              <Image
                src="/icons/home/hero/calendar.svg"
                alt="Calendar"
                width={24}
                height={24}
                className="flex-shrink-0"
              />
              <input
                type="text"
                placeholder="Select Date"
                className="w-full text-sm text-slate-700 placeholder:text-neutral-placeholder focus:outline-none"
                value={formData.pickupDate}
                onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
              />
            </div>
            <div className="flex flex-1 items-center gap-2">
              <Image
                src="/icons/home/hero/clock.svg"
                alt="Clock"
                width={20}
                height={20}
                className="flex-shrink-0"
              />
              <input
                type="text"
                placeholder="Select Time"
                className="w-full text-sm text-slate-700 placeholder:text-neutral-placeholder focus:outline-none"
                value={formData.pickupTime}
                onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Return Date & Time */}
        <div className="space-y-3">
          <label className="block font-manrope text-2xs font-normal text-neutral-label">Return Date & Time</label>
          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2">
              <Image
                src="/icons/home/hero/calendar.svg"
                alt="Calendar"
                width={24}
                height={24}
                className="flex-shrink-0"
              />
              <input
                type="text"
                placeholder="Select Date"
                className="w-full text-sm text-slate-700 placeholder:text-neutral-placeholder focus:outline-none"
                value={formData.returnDate}
                onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
              />
            </div>
            <div className="flex flex-1 items-center gap-2">
              <Image
                src="/icons/home/hero/clock.svg"
                alt="Clock"
                width={20}
                height={20}
                className="flex-shrink-0"
              />
              <input
                type="text"
                placeholder="Select Time"
                className="w-full text-sm text-slate-700 placeholder:text-neutral-placeholder focus:outline-none"
                value={formData.returnTime}
                onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={differentLocation}
            onChange={(e) => {
              setDifferentLocation(e.target.checked);
              setFormData({ ...formData, differentLocation: e.target.checked });
            }}
            className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-slate-600">Return car to different location</span>
        </label>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-xs font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Show Available Cars
          <ArrowRightIcon />
        </button>
      </div>
    </form>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}
