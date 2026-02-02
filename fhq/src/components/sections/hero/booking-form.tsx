'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useMobilePanel } from '@/contexts';

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

export function BookingForm({ onSubmit }: BookingFormProps) {
  const router = useRouter();
  const { isMobilePanelOpen: mobilePanelOpen, setIsMobilePanelOpen: setMobilePanelOpen } = useMobilePanel();
  const [differentLocation, setDifferentLocation] = useState(false);
  const [mobileLocationDropdownOpen, setMobileLocationDropdownOpen] = useState(false);
  const [pickupDropdownOpen, setPickupDropdownOpen] = useState(false);
  const [dropoffDropdownOpen, setDropoffDropdownOpen] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    differentLocation: false,
  });

  // Refs for desktop dropdowns
  const desktopPickupRef = useRef<HTMLDivElement>(null);
  const desktopDropoffRef = useRef<HTMLDivElement>(null);
  const pickupDateRef = useRef<HTMLInputElement>(null);
  const pickupTimeRef = useRef<HTMLInputElement>(null);
  const returnDateRef = useRef<HTMLInputElement>(null);
  const returnTimeRef = useRef<HTMLInputElement>(null);

  // Prevent body scroll when mobile panel is open (iOS fix)
  useEffect(() => {
    if (mobilePanelOpen) {
      // Scroll to top first so the sticky header remains visible
      window.scrollTo(0, 0);
      document.body.style.position = 'fixed';
      document.body.style.top = '0';
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [mobilePanelOpen]);

  // Close desktop dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      // Check desktop pickup ref
      if (desktopPickupRef.current && !desktopPickupRef.current.contains(target)) {
        setPickupDropdownOpen(false);
      }
      // Check desktop dropoff ref
      if (desktopDropoffRef.current && !desktopDropoffRef.current.contains(target)) {
        setDropoffDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    router.push('/fleet' as never);
  };

  const handlePickupSelect = (location: Location) => {
    setFormData({ ...formData, pickupLocation: location.name });
    setPickupDropdownOpen(false);
  };

  const handleDropoffSelect = (location: Location) => {
    setFormData({ ...formData, dropoffLocation: location.name });
    setDropoffDropdownOpen(false);
  };

  const handleSwapLocations = () => {
    setFormData({
      ...formData,
      pickupLocation: formData.dropoffLocation,
      dropoffLocation: formData.pickupLocation,
    });
  };

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

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-neutral-border bg-white px-8 py-4 sm:px-6">
      {/* Mobile Layout */}
      <div className="flex flex-col gap-6 lg:hidden">
        {/* Pick-up Location - Trigger */}
        <div className="pt-2">
          <label className="block font-manrope text-2xs font-normal text-neutral-label">Pick-up</label>
          <button
            type="button"
            onClick={() => {
              setMobilePanelOpen(true);
              setMobileLocationDropdownOpen(false);
            }}
            className="mt-2 flex w-full items-center gap-3"
          >
            <Image
              src="/icons/home/hero/pin.svg"
              alt="Location"
              width={24}
              height={24}
              className="shrink-0"
            />
            <span className="flex-1 text-left text-base text-slate-700">
              {formData.pickupLocation || <span className="text-neutral-placeholder">Select City or Airport</span>}
            </span>
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-xs font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Show Available Cars
          <ArrowRightIcon />
        </button>
      </div>

      {/* Mobile Slide-Down Panel - Below header */}
      <div
        className={`fixed inset-x-0 top-20 z-40 overflow-hidden lg:hidden transition-all duration-300 ease-out ${
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
                {/* Full-width Horizontal Divider between Pick-up and Drop-off */}
                <div className="-my-2 border-t border-slate-200" />

                <div className="flex items-center gap-3">
                  {/* Swap Arrows - centered vertically */}
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
                  {/* Vertical Divider */}
                  <div className="h-10 w-px bg-slate-200" />
                  {/* Drop-off Field */}
                  <div className="flex-1 pl-1">
                    <label className="block font-manrope text-2xs font-normal text-neutral-label">Drop-off</label>
                    <button
                      type="button"
                      onClick={() => setDropoffDropdownOpen(!dropoffDropdownOpen)}
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
                onChange={(e) => {
                  setDifferentLocation(e.target.checked);
                  setFormData({ ...formData, differentLocation: e.target.checked });
                }}
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

            {/* Submit in panel */}
            <button
              type="submit"
              onClick={() => {
                setMobilePanelOpen(false);
                setMobileLocationDropdownOpen(false);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-xs font-medium text-white transition-colors hover:bg-primary-hover"
            >
              Show Available Cars
              <ArrowRightIcon />
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
        className={`fixed inset-0 top-20 z-30 bg-black/60 lg:hidden transition-opacity duration-300 ${
          mobilePanelOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => {
          setMobilePanelOpen(false);
          setMobileLocationDropdownOpen(false);
        }}
      />

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="flex gap-4">
          {/* Pick-up Location */}
          <div className="relative min-w-0 flex-1 space-y-3" ref={desktopPickupRef}>
            <label className="block font-manrope text-2xs font-normal text-neutral-label">Pick-up</label>
            <div className="flex items-center gap-3 border-r border-slate-200 pr-4">
              <Image
                src="/icons/home/hero/pin.svg"
                alt="Location"
                width={24}
                height={24}
                className="shrink-0"
              />
              <button
                type="button"
                onClick={() => setPickupDropdownOpen(!pickupDropdownOpen)}
                className="min-w-0 flex-1 truncate text-left text-sm text-slate-700"
              >
                {formData.pickupLocation || <span className="text-neutral-placeholder">Select City or Airport</span>}
              </button>
              {differentLocation && (
                <div className="border-l border-slate-200 pl-3">
                  <button type="button" onClick={handleSwapLocations} className="block">
                    <Image
                      src="/icons/home/hero/inverse-arrows.svg"
                      alt="Swap"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              )}
            </div>
            {/* Dropdown */}
            {/* Dropdown */}
            <div
              className={`absolute left-0 right-0 top-full z-50 mt-2 origin-top rounded-lg border border-slate-200 bg-white shadow-lg transition-all duration-300 ease-out ${
                pickupDropdownOpen ? 'scale-y-100 opacity-100' : 'pointer-events-none scale-y-0 opacity-0'
              }`}
            >
              <div className="max-h-64 overflow-y-auto py-2">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    type="button"
                    onClick={() => handlePickupSelect(location)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50"
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

          {/* Drop-off Location - Animated show/hide */}
          <div
            className={`relative min-w-0 space-y-3 overflow-hidden transition-all duration-300 ease-out ${
              differentLocation ? 'flex-1 opacity-100' : 'w-0 flex-none opacity-0'
            }`}
            ref={desktopDropoffRef}
          >
            <label className="block whitespace-nowrap font-manrope text-2xs font-normal text-neutral-label">Drop-off</label>
            <div className="flex items-center gap-3 border-r border-slate-200 pr-4">
              <Image
                src="/icons/home/hero/pin.svg"
                alt="Location"
                width={24}
                height={24}
                className="shrink-0"
              />
              <button
                type="button"
                onClick={() => setDropoffDropdownOpen(!dropoffDropdownOpen)}
                className="min-w-0 flex-1 truncate text-left text-sm text-slate-700"
              >
                {formData.dropoffLocation || <span className="text-neutral-placeholder">Select City or Airport</span>}
              </button>
            </div>
            {/* Dropdown */}
            <div
              className={`absolute left-0 right-0 top-full z-50 mt-2 origin-top rounded-lg border border-slate-200 bg-white shadow-lg transition-all duration-300 ease-out ${
                dropoffDropdownOpen ? 'scale-y-100 opacity-100' : 'pointer-events-none scale-y-0 opacity-0'
              }`}
            >
              <div className="max-h-64 overflow-y-auto py-2">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    type="button"
                    onClick={() => handleDropoffSelect(location)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50"
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

          {/* Pick-up Date & Time */}
          <div className="min-w-0 flex-1 space-y-3">
            <span className="block font-manrope text-2xs font-normal text-neutral-label">Pick-up Date & Time</span>
            <div className="flex items-center gap-2 border-r border-slate-200 pr-4">
              <label className="relative flex flex-1 cursor-pointer items-center gap-2">
                <Image
                  src="/icons/home/hero/calendar.svg"
                  alt="Calendar"
                  width={24}
                  height={24}
                  className="shrink-0"
                />
                <input
                  ref={pickupDateRef}
                  type="date"
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  value={formData.pickupDate}
                  onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                />
                <span className={`text-sm ${formData.pickupDate ? 'text-slate-700' : 'text-neutral-placeholder'}`}>
                  {formData.pickupDate ? formatDate(formData.pickupDate) : 'Select Date'}
                </span>
              </label>
              <label className="relative flex flex-1 cursor-pointer items-center gap-2">
                <Image
                  src="/icons/home/hero/clock.svg"
                  alt="Clock"
                  width={20}
                  height={20}
                  className="shrink-0"
                />
                <input
                  ref={pickupTimeRef}
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
          </div>

          {/* Return Date & Time */}
          <div className="min-w-0 flex-1 space-y-3">
            <span className="block font-manrope text-2xs font-normal text-neutral-label">Return Date & Time</span>
            <div className="flex items-center gap-2">
              <label className="relative flex flex-1 cursor-pointer items-center gap-2">
                <Image
                  src="/icons/home/hero/calendar.svg"
                  alt="Calendar"
                  width={24}
                  height={24}
                  className="shrink-0"
                />
                <input
                  ref={returnDateRef}
                  type="date"
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  value={formData.returnDate}
                  onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                />
                <span className={`text-sm ${formData.returnDate ? 'text-slate-700' : 'text-neutral-placeholder'}`}>
                  {formData.returnDate ? formatDate(formData.returnDate) : 'Select Date'}
                </span>
              </label>
              <label className="relative flex flex-1 cursor-pointer items-center gap-2">
                <Image
                  src="/icons/home/hero/clock.svg"
                  alt="Clock"
                  width={20}
                  height={20}
                  className="shrink-0"
                />
                <input
                  ref={returnTimeRef}
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
        </div>

        {/* Bottom Row */}
        <div className="mt-6 flex items-center justify-between">
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
            className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-xs font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Show Available Cars
            <ArrowRightIcon />
          </button>
        </div>
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
