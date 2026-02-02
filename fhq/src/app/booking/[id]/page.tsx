'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { Button, Spinner } from '@/components/ui';
import { useBookingDetails } from '@/hooks/useBooking';
import type { BookingDetails } from '@/services/bookingServices';

const PLACEHOLDER_IMAGE = '/images/vehicles/car_placeholder.png';

export default function BookingDetailsPage() {
  const params = useParams();
  const bookingId = params.id as string;

  // Check if this is a temp booking (stored in localStorage)
  const isTempBooking = bookingId.startsWith('temp-');

  // State for localStorage booking data
  const [localBookingData, setLocalBookingData] = useState<BookingDetails | null>(null);
  const [localDataLoaded, setLocalDataLoaded] = useState(false);

  // Load from localStorage for temp bookings
  useEffect(() => {
    if (isTempBooking) {
      const stored = localStorage.getItem('pendingBooking');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setLocalBookingData(parsed);
        } catch (e) {
          console.error('Failed to parse stored booking:', e);
        }
      }
      setLocalDataLoaded(true);
    }
  }, [isTempBooking]);

  // Only fetch from API if not a temp booking
  const { data: apiBookingData, isLoading: apiLoading, isError: apiError } = useBookingDetails(
    isTempBooking ? undefined : bookingId
  );

  // Use local data for temp bookings, API data otherwise
  const bookingData = isTempBooking ? localBookingData : apiBookingData;
  const isLoading = isTempBooking ? !localDataLoaded : apiLoading;
  const isError = isTempBooking ? (localDataLoaded && !localBookingData) : apiError;

  const [preTripPhotos, setPreTripPhotos] = useState<string[]>([]);
  const [postTripPhotos, setPostTripPhotos] = useState<string[]>([]);
  const preTripInputRef = useRef<HTMLInputElement>(null);
  const postTripInputRef = useRef<HTMLInputElement>(null);

  const handlePreTripUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreTripPhotos((prev) => [...prev, ...newPhotos]);
    }
  };

  const handlePostTripUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map((file) => URL.createObjectURL(file));
      setPostTripPhotos((prev) => [...prev, ...newPhotos]);
    }
  };

  const removePreTripPhoto = (index: number) => {
    setPreTripPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const removePostTripPhoto = (index: number) => {
    setPostTripPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header showBorderBottom />
        <main className="mx-auto max-w-6xl px-8 py-20 flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Spinner size="lg" />
            <p className="text-slate-500">Loading booking details...</p>
          </div>
        </main>
        <div className="hidden md:block">
          <Footer />
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !bookingData) {
    return (
      <div className="min-h-screen bg-white">
        <Header showBorderBottom />
        <main className="mx-auto max-w-6xl px-8 py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Booking not found</h1>
          <p className="mt-4 text-slate-600">The booking you are looking for does not exist.</p>
          <Link href="/fleet" className="mt-6 inline-block text-primary underline">
            Browse Fleet
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Get verification statuses
  const isIdVerified = bookingData.verifications.idVerification === 'verified';
  const isInsuranceVerified = bookingData.verifications.insuranceVerification === 'verified';
  const isBookingSuccessful = bookingData.status === 'confirmed' || bookingData.status === 'successful';

  // Status Timeline Component
  const StatusTimeline = () => (
    <div className="flex">
      <div className="flex flex-col items-center">
        <Image
          src={isBookingSuccessful ? '/icons/review-booking/completed.svg' : '/icons/review-booking/pending.svg'}
          alt={isBookingSuccessful ? 'Completed' : 'Pending'}
          width={24}
          height={24}
          className="shrink-0"
        />
        <div className="h-full w-px bg-slate-200" style={{ minHeight: '140px' }} />
        <Image
          src={isIdVerified ? '/icons/review-booking/completed.svg' : '/icons/review-booking/pending.svg'}
          alt={isIdVerified ? 'Completed' : 'Pending'}
          width={24}
          height={24}
          className="shrink-0"
        />
        <div className="h-full w-px bg-slate-200" style={{ minHeight: '120px' }} />
        <Image
          src={isInsuranceVerified ? '/icons/review-booking/completed.svg' : '/icons/review-booking/pending.svg'}
          alt={isInsuranceVerified ? 'Completed' : 'Pending'}
          width={24}
          height={24}
          className="shrink-0"
        />
      </div>

      <div className="ml-3 space-y-6">
        {/* Vehicle Booking */}
        <div>
          <p className={`text-sm font-semibold ${isBookingSuccessful ? 'text-green-600' : 'text-red-500'}`}>
            {isBookingSuccessful ? 'Successful' : 'Pending'}
          </p>
          <h3 className="mt-1 text-2xl font-normal leading-none tracking-tight-2 text-[#141543]">
            Vehicle Booking
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            Booking details have been emailed to you on the provided email.
          </p>
          <Link
            href={bookingData.agreementId ? `/rental-agreement/${bookingData.agreementId}` : '/rental-agreement'}
            className="mt-2 inline-block font-manrope text-[10px] font-bold leading-none text-primary underline"
          >
            View Rental Agreement
          </Link>
        </div>

        {/* ID Verification */}
        <div className="pt-4">
          <p className={`text-sm font-semibold ${isIdVerified ? 'text-green-600' : 'text-red-500'}`}>
            {isIdVerified ? 'Verified' : 'Pending'}
          </p>
          <h3 className="mt-1 text-2xl font-normal leading-none tracking-tight-2 text-[#141543]">
            ID Verification
          </h3>
          {!isIdVerified && (
            <Button variant="primary" className="mt-4">
              Complete Verification
            </Button>
          )}
        </div>

        {/* Insurance Verification */}
        <div className="pt-4">
          <p className={`text-sm font-semibold ${isInsuranceVerified ? 'text-green-600' : 'text-red-500'}`}>
            {isInsuranceVerified ? 'Verified' : 'Pending'}
          </p>
          <h3 className="mt-1 text-2xl font-normal leading-none tracking-tight-2 text-[#141543]">
            Insurance Verification
          </h3>
          {!isInsuranceVerified && (
            <Button variant="primary" className="mt-4">
              Complete Verification
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  // Location Details Component
  const LocationDetails = ({ className = '' }: { className?: string }) => (
    <div className={className}>
      <h3 className="text-base font-semibold text-[#141543]">Location Details</h3>
      <div className="mt-3">
        {/* Pick Up */}
        <div className="flex gap-2">
          <div className="flex flex-col items-center pt-1.5">
            <Image
              src="/icons/review-booking/pickup.svg"
              alt="Pickup"
              width={7}
              height={7}
              className="shrink-0"
            />
            <div className="flex-1 w-px border-l border-dashed border-slate-300" />
          </div>
          <div className="flex-1 pb-4">
            <p className="text-xs text-slate-500">Pick up</p>
            <p className="mt-0.5 text-sm font-bold text-[#141543]">{bookingData.pickUp.address}</p>
            <p className="text-xs text-slate-500">
              {bookingData.pickUp.date}, {bookingData.pickUp.time}
            </p>
          </div>
        </div>

        {/* Drop Off */}
        <div className="flex gap-2">
          <div className="pt-1.5">
            <Image
              src="/icons/review-booking/drop-off.svg"
              alt="Drop off"
              width={7}
              height={7}
              className="shrink-0"
            />
          </div>
          <div className="flex-1">
            <p className="text-xs text-slate-500">Drop off</p>
            <p className="mt-0.5 text-sm font-bold text-[#141543]">{bookingData.dropOff.address}</p>
            <p className="text-xs text-slate-500">
              {bookingData.dropOff.date}, {bookingData.dropOff.time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Invoice Component
  const InvoiceCard = ({ className = '' }: { className?: string }) => (
    <div className={`rounded-lg border border-[#f4f4f4] bg-[#fafafa] px-8 py-4 md:p-6 ${className}`}>
      {/* Invoice Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-[#141543]">Invoice</h3>
            <span className="text-xs text-slate-500">#{bookingData.invoice.number}</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">{bookingData.vehicle.name}</p>
        </div>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50"
        >
          <Image src="/icons/booking/download-outline.svg" alt="Download" width={20} height={20} />
        </button>
      </div>

      {/* Divider */}
      <div className="my-4 h-px w-full border-t border-[#cecece]" />

      {/* Invoice Items */}
      {bookingData.invoice.items.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-16 overflow-hidden rounded bg-slate-200">
              <Image
                src={item.image || PLACEHOLDER_IMAGE}
                alt={item.name}
                fill
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                }}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#141543]">{item.name}</p>
              <p className="text-xs text-slate-500">
                <span className="font-semibold text-[#141543]">{item.quantity}x</span> Base price per day
              </p>
            </div>
          </div>
          <p className="text-base font-semibold text-[#141543]">${item.pricePerDay.toFixed(2)}</p>
        </div>
      ))}

      {/* Divider */}
      <div className="my-4 h-px w-full border-t border-[#cecece]" />

      {/* Totals */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Subtotal</span>
          <span className="text-[#141543]">${bookingData.invoice.subtotal.toFixed(2)}</span>
        </div>
        {bookingData.invoice.discountCode && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Discount</span>
              <span className="flex items-center gap-1 text-sm font-medium text-[#141543]">
                <Image src="/icons/booking/discount.svg" alt="Discount" width={16} height={16} />
                {bookingData.invoice.discountCode}
              </span>
            </div>
            <span className="text-[#141543]">-${bookingData.invoice.discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Tax</span>
          <span className="text-[#141543]">${bookingData.invoice.tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 h-px w-full border-t border-[#cecece]" />

      {/* Total */}
      <div className="flex justify-between">
        <span className="text-base font-semibold text-[#141543]">Total</span>
        <div className="text-right">
          <span className="text-xs text-slate-500">USD </span>
          <span className="text-xl font-bold text-[#141543]">${bookingData.invoice.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 h-px w-full border-t border-[#cecece]" />

      {/* Deposit */}
      <div className="flex justify-between">
        <span className="text-base font-semibold text-[#141543]">Deposit</span>
        <div className="text-right">
          <span className="text-xs text-slate-500">USD </span>
          <span className="text-xl font-bold text-[#141543]">${bookingData.invoice.deposit.toFixed(2)}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 h-px w-full border-t border-[#cecece]" />

      {/* Balance */}
      <div className="flex justify-between">
        <span className="text-base font-semibold text-[#141543]">Balance</span>
        <div className="text-right">
          <span className="text-xs text-slate-500">USD </span>
          <span className="text-xl font-bold text-[#141543]">${bookingData.invoice.balance.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  // Photo Upload Card Component
  const PhotoUploadCard = ({
    title,
    description,
    photos,
    onUpload,
    onRemove,
    inputRef,
    className = '',
  }: {
    title: string;
    description: string;
    photos: string[];
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: (index: number) => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
    className?: string;
  }) => (
    <div className={`rounded-lg border border-[#f4f4f4] bg-[#fafafa] px-8 py-4 md:p-6 ${className}`}>
      <h3 className="text-base font-semibold text-[#141543]">{title}</h3>
      <p className="mt-1 text-xs text-slate-500">{description}</p>

      {/* Photo Grid */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {photos.map((photo, index) => (
          <div key={index} className="group relative aspect-square overflow-hidden rounded-lg">
            <Image src={photo} alt={`${title} ${index + 1}`} fill className="object-cover" />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        ))}
      </div>

      {photos.length === 0 && <div className="mt-4 min-h-20" />}

      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={onUpload}
        className="hidden"
      />
      <Button
        variant="primary"
        className="mt-4 gap-2"
        onClick={() => inputRef.current?.click()}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 3.33334V12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Upload
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header showBorderBottom />

      <main className="mx-auto max-w-6xl px-8 py-6 pb-8 md:py-8 md:pb-28">
        {/* Go Back Link */}
        <Link
          href="/fleet"
          className="inline-flex items-center text-sm font-medium text-primary underline hover:text-primary-hover"
        >
          Go Back
        </Link>

        {/* Title Section */}
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-0">
          <h1 className="font-manrope text-2xl font-semibold leading-none tracking-tight-2 text-[#141543]">
            Booking Details
          </h1>
          <Button variant="primary" className="w-full gap-2.5 md:w-auto">
            <Image src="/icons/download.svg" alt="Download" width={15} height={17} />
            Download PDF
          </Button>
        </div>

        {/* Mobile Layout */}
        <div className="mt-8 space-y-6 md:hidden">
          {/* Success Card with Location Details - Mobile */}
          <div className="-mx-8 relative mt-16 rounded-lg border border-[#f4f4f4] bg-[#fafafa] px-8 pb-4 pt-16">
            {/* Success Icon */}
            <div className="absolute -top-11 left-8">
              <Image
                src="/icons/review-booking/success-tick.svg"
                alt="Success"
                width={88}
                height={88}
              />
            </div>

            {/* Vehicle Image */}
            <div className="relative h-24 w-36 overflow-hidden rounded-lg bg-slate-200">
              <Image
                src={bookingData.vehicle.image || PLACEHOLDER_IMAGE}
                alt={bookingData.vehicle.name}
                fill
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                }}
              />
            </div>

            {/* Booking Info */}
            <div className="mt-4">
              <p className="text-xs text-slate-500">
                Booking ID <span className="font-semibold text-[#141543]">#{bookingData.id}</span>
              </p>
              <h2 className="mt-1 font-manrope text-[28px] font-bold leading-none tracking-tight-2 text-[#141543]">
                {isBookingSuccessful ? 'Booking Successful' : 'Booking Pending'}
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-600">
                {bookingData.vehicle.name} - {bookingData.vehicle.licensePlate}
              </p>
            </div>

            {/* Customer Details - Single Column */}
            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs text-slate-500">Booked by</p>
                <p className="mt-1 text-base font-normal leading-none tracking-tight-2 text-[#141543]">
                  {bookingData.customer.name}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Booked On</p>
                <p className="mt-1 text-base font-normal leading-none tracking-tight-2 text-[#141543]">
                  {bookingData.bookedOn}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Vehicle Vin</p>
                <p className="mt-1 text-base font-normal leading-none tracking-tight-2 text-[#141543]">
                  {bookingData.vehicle.vin}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Email</p>
                <p className="mt-1 text-base font-normal leading-none tracking-tight-2 text-[#141543]">
                  {bookingData.customer.email}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Phone no.</p>
                <p className="mt-1 text-base font-normal leading-none tracking-tight-2 text-[#141543]">
                  {bookingData.customer.phone}
                </p>
              </div>
            </div>

            {/* Location Details - Inside gray card */}
            <div className="mt-6 border-t border-slate-200 pt-6">
              <LocationDetails />
            </div>
          </div>

          {/* Status Timeline - Mobile */}
          <div className="pt-6 pl-8">
            <StatusTimeline />
          </div>

          {/* Invoice - Mobile */}
          <div className="-mx-8 pt-4">
            <InvoiceCard className="rounded-lg" />
          </div>

          {/* Photo Upload Cards - Mobile */}
          <div className="-mx-8">
            <PhotoUploadCard
              title="Add Pre-Trip Photos"
              description="Upload photos of the vehicle before the trip"
              photos={preTripPhotos}
              onUpload={handlePreTripUpload}
              onRemove={removePreTripPhoto}
              inputRef={preTripInputRef}
              className="rounded-lg"
            />
          </div>
          <div className="-mx-8">
            <PhotoUploadCard
              title="Add Post-Trip Photos"
              description="Upload photos of the vehicle after the trip"
              photos={postTripPhotos}
              onUpload={handlePostTripUpload}
              onRemove={removePostTripPhoto}
              inputRef={postTripInputRef}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="mt-8 hidden gap-6 md:flex">
          {/* Left Sidebar - Status Steps */}
          <div className="w-60 shrink-0">
            <StatusTimeline />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-6">
            {/* Booking Success Card */}
            <div className="relative rounded-lg border border-[#f4f4f4] bg-[#fafafa] px-6 pb-6 pt-12">
              {/* Success Icon */}
              <div className="absolute -top-11 left-6">
                <Image
                  src="/icons/review-booking/success-tick.svg"
                  alt="Success"
                  width={88}
                  height={88}
                />
              </div>

              {/* Content Layout */}
              <div className="flex gap-6">
                {/* Left Section */}
                <div className="flex-1">
                  {/* Top Row */}
                  <div className="flex gap-6">
                    {/* Vehicle Image */}
                    <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-lg bg-slate-200">
                      <Image
                        src={bookingData.vehicle.image || PLACEHOLDER_IMAGE}
                        alt={bookingData.vehicle.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                        }}
                      />
                    </div>

                    {/* Booking Info */}
                    <div className="flex-1">
                      <p className="text-xs text-slate-500">
                        Booking ID <span className="font-semibold text-[#141543]">#{bookingData.id}</span>
                      </p>
                      <h2 className="mt-1 font-manrope text-[32px] font-bold leading-none tracking-tight-2 text-[#141543]">
                        {isBookingSuccessful ? 'Booking Successful' : 'Booking Pending'}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-slate-600">
                        {bookingData.vehicle.name} - {bookingData.vehicle.licensePlate}
                      </p>
                    </div>
                  </div>

                  {/* Customer Details Grid */}
                  <div className="mt-6 grid grid-cols-2 gap-x-12 gap-y-4">
                    <div>
                      <p className="text-xs text-slate-500">Booked by</p>
                      <p className="mt-1 text-base font-normal leading-none tracking-tight-2 text-[#141543]">
                        {bookingData.customer.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Booked On</p>
                      <p className="mt-1 text-base font-normal leading-none tracking-tight-2 text-[#141543]">
                        {bookingData.bookedOn}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Email</p>
                      <p className="mt-1 text-base font-normal leading-none tracking-tight-2 text-[#141543]">
                        {bookingData.customer.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Vehicle Vin</p>
                      <p className="mt-1 text-base font-normal leading-none tracking-tight-2 text-[#141543]">
                        {bookingData.vehicle.vin}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Phone no.</p>
                      <p className="mt-1 text-base font-normal leading-none tracking-tight-2 text-[#141543]">
                        {bookingData.customer.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Section - Location Details */}
                <LocationDetails className="w-60 shrink-0" />
              </div>
            </div>

            {/* Bottom Row - Invoice and Photo Cards */}
            <div className="flex gap-6">
              {/* Invoice Card */}
              <InvoiceCard className="flex-1" />

              {/* Right Column - Photo Upload Cards */}
              <div className="w-[280px] shrink-0 space-y-6">
                <PhotoUploadCard
                  title="Add Pre-Trip Photos"
                  description="Upload photos of the vehicle before the trip"
                  photos={preTripPhotos}
                  onUpload={handlePreTripUpload}
                  onRemove={removePreTripPhoto}
                  inputRef={preTripInputRef}
                />
                <PhotoUploadCard
                  title="Add Post-Trip Photos"
                  description="Upload photos of the vehicle after the trip"
                  photos={postTripPhotos}
                  onUpload={handlePostTripUpload}
                  onRemove={removePostTripPhoto}
                  inputRef={postTripInputRef}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Hidden on mobile */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
}
