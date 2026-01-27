'use client';

import Image from 'next/image';

interface BookingBarProps {
  pickupLocation?: string;
  dropoffLocation?: string;
  pickupDate?: string;
  pickupTime?: string;
  returnDate?: string;
  returnTime?: string;
  onEdit?: () => void;
}

export function BookingBar({
  pickupLocation = 'Select City or Airport',
  dropoffLocation = 'Select City or Airport',
  pickupDate = 'Select Date',
  pickupTime = 'Select Date',
  returnDate = 'Select Date',
  returnTime = 'Select Date',
  onEdit,
}: BookingBarProps) {
  return (
    <div className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl items-center px-4 py-4">
        {/* Pick-up */}
        <div className="flex flex-1 items-center gap-3 border-r border-slate-200 pr-6">
          <Image
            src="/icons/home/hero/pin.svg"
            alt="Location"
            width={24}
            height={24}
            className="flex-shrink-0"
          />
          <div>
            <p className="text-2xs font-normal text-slate-400">Pick-up</p>
            <span className="text-sm text-slate-700">{pickupLocation}</span>
          </div>
        </div>

        {/* Drop-off */}
        <div className="flex flex-1 items-center gap-3 border-r border-slate-200 px-6">
          <Image
            src="/icons/home/hero/pin.svg"
            alt="Location"
            width={24}
            height={24}
            className="flex-shrink-0"
          />
          <div>
            <p className="text-2xs font-normal text-slate-400">Drop-off</p>
            <span className="text-sm text-slate-700">{dropoffLocation}</span>
          </div>
        </div>

        {/* Pick-up Date & Time */}
        <div className="flex flex-1 items-center gap-3 border-r border-slate-200 px-6">
          <Image
            src="/icons/home/hero/calendar.svg"
            alt="Calendar"
            width={24}
            height={24}
            className="flex-shrink-0"
          />
          <div>
            <p className="text-2xs font-normal text-slate-400">Pick-up Date & Time</p>
            <div className="flex gap-4">
              <span className="text-sm text-slate-700">{pickupDate}</span>
              <span className="text-sm text-slate-700">{pickupTime}</span>
            </div>
          </div>
        </div>

        {/* Return Date & Time */}
        <div className="flex flex-1 items-center gap-3 px-6">
          <Image
            src="/icons/home/hero/calendar.svg"
            alt="Calendar"
            width={24}
            height={24}
            className="flex-shrink-0"
          />
          <div>
            <p className="text-2xs font-normal text-slate-400">Return Date & Time</p>
            <div className="flex gap-4">
              <span className="text-sm text-slate-700">{returnDate}</span>
              <span className="text-sm text-slate-700">{returnTime}</span>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <button
          type="button"
          onClick={onEdit}
          className="ml-4 flex h-12 w-12 items-center justify-center rounded-lg border border-slate-200 transition-colors hover:bg-slate-50"
        >
          <Image
            src="/icons/fleet/edit.svg"
            alt="Edit"
            width={18}
            height={17}
          />
        </button>
      </div>
    </div>
  );
}
