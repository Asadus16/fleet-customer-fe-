'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Location {
  id: string;
  name: string;
  type: 'city' | 'airport';
}

const locations: Location[] = [
  { id: '1', name: 'Ketchikan', type: 'city' },
  { id: '2', name: 'Ketchikan International Airport (KTN)', type: 'airport' },
  { id: '3', name: 'Juneau', type: 'city' },
  { id: '4', name: 'Juneau International Airport (JNU)', type: 'airport' },
  { id: '5', name: 'Sitka', type: 'city' },
  { id: '6', name: 'Sitka Rocky Gutierrez Airport (SIT)', type: 'airport' },
];

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
  pickupLocation: initialPickupLocation = 'Select City or Airport',
  dropoffLocation = 'Select City or Airport',
  pickupDate = 'Select Date',
  pickupTime = 'Select Date',
  returnDate = 'Select Date',
  returnTime = 'Select Date',
  onEdit,
}: BookingBarProps) {
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  const [mobileLocationDropdownOpen, setMobileLocationDropdownOpen] = useState(false);
  const [differentLocation, setDifferentLocation] = useState(false);
  const [formData, setFormData] = useState({
    pickupLocation: initialPickupLocation === 'Select City or Airport' ? '' : initialPickupLocation,
    dropoffLocation: dropoffLocation === 'Select City or Airport' ? '' : dropoffLocation,
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
  });

  // Prevent body scroll when mobile panel is open
  useEffect(() => {
    if (mobilePanelOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [mobilePanelOpen]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    const parts = timeString.split(':');
    const hours = parts[0] ?? '0';
    const minutes = parts[1] ?? '00';
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const handleSwapLocations = () => {
    setFormData({
      ...formData,
      pickupLocation: formData.dropoffLocation,
      dropoffLocation: formData.pickupLocation,
    });
  };

  return (
    <>
      {/* Mobile Layout */}
      <div className="mt-4 md:hidden">
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4">
          <div className="flex flex-col">
            <p className="text-2xs font-normal text-slate-500">Pick-up</p>
            <div className="mt-2 flex items-center gap-3">
              <Image
                src="/icons/home/hero/pin.svg"
                alt="Location"
                width={24}
                height={24}
                className="shrink-0"
              />
              <span className="text-sm text-slate-700">
                {formData.pickupLocation || 'Select City or Airport'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobilePanelOpen(true)}
            className="flex h-12 w-12 items-center justify-center"
          >
            <Image
              src="/icons/fleet/pen.svg"
              alt="Edit"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Panel */}
      <div
        className={`fixed inset-x-0 top-20 z-40 overflow-hidden md:hidden transition-all duration-300 ease-out ${
          mobilePanelOpen ? (differentLocation ? 'max-h-175' : 'max-h-140') : 'max-h-0'
        }`}
      >
        <div className="rounded-b-2xl bg-white px-8 pt-10 pb-4 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.15)]">
          <div className="flex flex-col gap-6">
            {/* Pick-up Location */}
            <div className="relative">
              <label className="block font-manrope text-2xs font-normal text-neutral-label">Pick-up</label>
              <button
                type="button"
                onClick={() => setMobileLocationDropdownOpen(!mobileLocationDropdownOpen)}
                className="mt-2 flex w-full items-center gap-3"
              >
                <Image
                  src="/icons/home/hero/pin.svg"
                  alt="Location"
                  width={24}
                  height={24}
                  className="shrink-0"
                />
                <span className="flex-1 text-left text-sm text-slate-700">
                  {formData.pickupLocation || <span className="text-neutral-placeholder">Select City or Airport</span>}
                </span>
              </button>
              {/* Mobile Location Dropdown */}
              <div
                className={`absolute left-0 right-0 top-full z-50 mt-2 origin-top rounded-lg border border-slate-200 bg-white shadow-lg transition-all duration-200 ${
                  mobileLocationDropdownOpen ? 'scale-y-100 opacity-100' : 'pointer-events-none scale-y-0 opacity-0'
                }`}
              >
                <div className="max-h-48 overflow-y-auto py-2">
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, pickupLocation: location.name });
                        setMobileLocationDropdownOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-slate-50 ${
                        formData.pickupLocation === location.name ? 'bg-slate-100 text-primary' : 'text-slate-700'
                      }`}
                    >
                      <Image
                        src={location.type === 'airport' ? '/icons/home/hero/plane.svg' : '/icons/home/hero/pin.svg'}
                        alt={location.type}
                        width={20}
                        height={20}
                        className="shrink-0 opacity-60"
                      />
                      {location.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Drop-off Location - Only shown when checkbox is checked */}
            {differentLocation && (
              <>
                <div className="-my-2 border-t border-slate-200" />
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSwapLocations}
                    className="flex h-6 w-6 shrink-0 items-center justify-center"
                  >
                    <Image
                      src="/icons/home/hero/inverse-phone.svg"
                      alt="Swap"
                      width={20}
                      height={20}
                    />
                  </button>
                  <div className="h-10 w-px bg-slate-200" />
                  <div className="flex-1 pl-1">
                    <label className="block font-manrope text-2xs font-normal text-neutral-label">Drop-off</label>
                    <button
                      type="button"
                      className="mt-2 flex w-full items-center gap-3"
                    >
                      <Image
                        src="/icons/home/hero/pin.svg"
                        alt="Location"
                        width={24}
                        height={24}
                        className="shrink-0"
                      />
                      <span className="flex-1 text-left text-sm text-slate-700">
                        {formData.dropoffLocation || <span className="text-neutral-placeholder">Select City or Airport</span>}
                      </span>
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Checkbox */}
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={differentLocation}
                onChange={(e) => setDifferentLocation(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-slate-600">Return car to different location</span>
            </label>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block font-manrope text-2xs font-normal text-neutral-label">Pick-up Date & Time</span>
                <label className="relative mt-3 flex cursor-pointer items-center gap-2 pb-3">
                  <Image src="/icons/home/hero/calendar.svg" alt="Calendar" width={24} height={24} className="shrink-0" />
                  <input
                    type="date"
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                  />
                  <span className={`text-sm ${formData.pickupDate ? 'text-slate-700' : 'text-neutral-placeholder'}`}>
                    {formData.pickupDate ? formatDate(formData.pickupDate) : 'Select Date'}
                  </span>
                </label>
                <div className="border-t border-slate-200" />
                <label className="relative flex cursor-pointer items-center gap-2 pt-3">
                  <Image src="/icons/home/hero/clock.svg" alt="Clock" width={20} height={20} className="shrink-0" />
                  <input
                    type="time"
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    value={formData.pickupTime}
                    onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                  />
                  <span className={`text-sm ${formData.pickupTime ? 'text-slate-700' : 'text-neutral-placeholder'}`}>
                    {formData.pickupTime ? formatTime(formData.pickupTime) : 'Select Time'}
                  </span>
                </label>
              </div>

              <div>
                <span className="block font-manrope text-2xs font-normal text-neutral-label">Return Date & Time</span>
                <label className="relative mt-3 flex cursor-pointer items-center gap-2 pb-3">
                  <Image src="/icons/home/hero/calendar.svg" alt="Calendar" width={24} height={24} className="shrink-0" />
                  <input
                    type="date"
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    value={formData.returnDate}
                    onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                  />
                  <span className={`text-sm ${formData.returnDate ? 'text-slate-700' : 'text-neutral-placeholder'}`}>
                    {formData.returnDate ? formatDate(formData.returnDate) : 'Select Date'}
                  </span>
                </label>
                <div className="border-t border-slate-200" />
                <label className="relative flex cursor-pointer items-center gap-2 pt-3">
                  <Image src="/icons/home/hero/clock.svg" alt="Clock" width={20} height={20} className="shrink-0" />
                  <input
                    type="time"
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    value={formData.returnTime}
                    onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })}
                  />
                  <span className={`text-sm ${formData.returnTime ? 'text-slate-700' : 'text-neutral-placeholder'}`}>
                    {formData.returnTime ? formatTime(formData.returnTime) : 'Select Time'}
                  </span>
                </label>
              </div>
            </div>

            {/* Apply Button */}
            <button
              type="button"
              onClick={() => {
                setMobilePanelOpen(false);
                setMobileLocationDropdownOpen(false);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-xs font-medium text-white transition-colors hover:bg-primary-hover"
            >
              Apply Filters
            </button>
          </div>
          {/* Drag Handle */}
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-12 rounded-full bg-slate-300" />
          </div>
        </div>
      </div>

      {/* Backdrop for mobile panel */}
      <div
        className={`fixed inset-0 top-20 z-30 bg-black/60 md:hidden transition-opacity duration-300 ${
          mobilePanelOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => {
          setMobilePanelOpen(false);
          setMobileLocationDropdownOpen(false);
        }}
      />

      {/* Desktop Layout */}
      <div className="hidden border-y border-slate-200 bg-slate-50 md:block">
        <div className="mx-auto flex max-w-6xl items-center px-4 py-4">
          {/* Pick-up */}
          <div className="flex flex-1 items-center gap-3 border-r border-slate-200 pr-6">
            <Image
              src="/icons/home/hero/pin.svg"
              alt="Location"
              width={24}
              height={24}
              className="shrink-0"
            />
            <div>
              <p className="text-2xs font-normal text-slate-400">Pick-up</p>
              <span className="text-sm text-slate-700">{formData.pickupLocation || 'Select City or Airport'}</span>
            </div>
          </div>

          {/* Drop-off */}
          <div className="flex flex-1 items-center gap-3 border-r border-slate-200 px-6">
            <Image
              src="/icons/home/hero/pin.svg"
              alt="Location"
              width={24}
              height={24}
              className="shrink-0"
            />
            <div>
              <p className="text-2xs font-normal text-slate-400">Drop-off</p>
              <span className="text-sm text-slate-700">{formData.dropoffLocation || 'Select City or Airport'}</span>
            </div>
          </div>

          {/* Pick-up Date & Time */}
          <div className="flex flex-1 items-center gap-3 border-r border-slate-200 px-6">
            <Image
              src="/icons/home/hero/calendar.svg"
              alt="Calendar"
              width={24}
              height={24}
              className="shrink-0"
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
              className="shrink-0"
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
    </>
  );
}
