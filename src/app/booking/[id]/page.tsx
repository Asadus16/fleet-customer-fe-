'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';

// Mock data - in a real app this would come from API/database
const bookingData = {
  id: '13214',
  status: 'successful',
  vehicle: {
    name: 'BMW i8',
    licensePlate: 'LEE-67-889A',
    vin: 'Z812AHSD812',
    image: '/images/vehicles/bmw-i8.jpg',
  },
  customer: {
    name: 'Zaid Irfan',
    email: 'zaid@gmail.com',
    phone: '+1 (321) 213-9874',
  },
  bookedOn: '21st June 2025',
  pickUp: {
    address: 'Am Isfeld 19, 22981, NY, New York',
    date: 'Tue. 02 Dec, 2025',
    time: '09:00 AM',
  },
  dropOff: {
    address: 'Am Isfeld 19, 22981, NY, New York',
    date: 'Tue. 02 Dec, 2025',
    time: '09:00 AM',
  },
  invoice: {
    number: '3522',
    items: [
      {
        name: 'BMW i8 - LEE-67-889A',
        image: '/images/vehicles/bmw-i8.jpg',
        quantity: 2,
        pricePerDay: 50.99,
      },
    ],
    subtotal: 52,
    discount: 2,
    discountCode: 'FLEETHQSALE',
    tax: 0,
    total: 50.99,
    deposit: 40.99,
    balance: 10.0,
  },
  verifications: {
    idVerification: 'pending',
    insuranceVerification: 'pending',
  },
};

export default function BookingDetailsPage() {
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

  return (
    <div className="min-h-screen bg-white">
      <Header showBorderBottom />

      <main className="mx-auto max-w-6xl px-8 py-8 pb-28">
        {/* Go Back Link */}
        <Link
          href="/fleet"
          className="inline-flex items-center text-sm font-medium text-primary underline hover:text-primary-hover"
        >
          Go Back
        </Link>

        {/* Title Section */}
        <div className="mt-6 flex items-start justify-between">
          <h1 className="font-manrope text-2xl font-semibold leading-none tracking-tight-2 text-[#141543]">
            Booking Details
          </h1>
          <Button variant="primary" className="gap-2.5">
            <Image src="/icons/download.svg" alt="Download" width={15} height={17} />
            Download PDF
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="mt-8 flex gap-6">
          {/* Left Sidebar - Status Steps with connected line */}
          <div className="w-60 shrink-0">
            <div className="flex">
              {/* Vertical line with icons */}
              <div className="flex flex-col items-center">
                <Image
                  src="/icons/review-booking/completed.svg"
                  alt="Completed"
                  width={24}
                  height={24}
                  className="shrink-0"
                />
                <div className="h-full w-px bg-slate-200" style={{ minHeight: '140px' }} />
                <Image
                  src="/icons/review-booking/pending.svg"
                  alt="Pending"
                  width={24}
                  height={24}
                  className="shrink-0"
                />
                <div className="h-full w-px bg-slate-200" style={{ minHeight: '120px' }} />
                <Image
                  src="/icons/review-booking/pending.svg"
                  alt="Pending"
                  width={24}
                  height={24}
                  className="shrink-0"
                />
              </div>

              {/* Content */}
              <div className="ml-3 space-y-6">
                {/* Vehicle Booking - Successful */}
                <div>
                  <p className="text-sm font-semibold text-green-600">Successful</p>
                  <h3 className="mt-1 text-2xl font-normal leading-none tracking-tight-2 text-[#141543]">
                    Vehicle Booking
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    Booking details have been emailed to you on the provided email.
                  </p>
                  <Link
                    href="/rental-agreement"
                    className="mt-2 inline-block font-manrope text-[10px] font-bold leading-none text-primary underline"
                  >
                    View Rental Agreement
                  </Link>
                </div>

                {/* ID Verification - Pending */}
                <div className="pt-4">
                  <p className="text-sm font-semibold text-red-500">Pending</p>
                  <h3 className="mt-1 text-2xl font-normal leading-none tracking-tight-2 text-[#141543]">
                    ID Verification
                  </h3>
                  <Button variant="primary" className="mt-4">
                    Complete Verification
                  </Button>
                </div>

                {/* Insurance Verification - Pending */}
                <div className="pt-4">
                  <p className="text-sm font-semibold text-red-500">Pending</p>
                  <h3 className="mt-1 text-2xl font-normal leading-none tracking-tight-2 text-[#141543]">
                    Insurance Verification
                  </h3>
                  <Button variant="primary" className="mt-4">
                    Complete Verification
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-6">
            {/* Booking Success Card - Full Width */}
            <div className="relative rounded-lg border border-[#f4f4f4] bg-[#fafafa] px-6 pb-6 pt-12">
              {/* Success Icon - 50% in, 50% out */}
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
                {/* Left Section - Vehicle Image, Booking Info, Customer Details */}
                <div className="flex-1">
                  {/* Top Row - Vehicle Image and Booking Info */}
                  <div className="flex gap-6">
                    {/* Vehicle Image */}
                    <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-lg bg-slate-200">
                      <Image
                        src={bookingData.vehicle.image}
                        alt={bookingData.vehicle.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Booking Info */}
                    <div className="flex-1">
                      <p className="text-xs text-slate-500">
                        Booking ID <span className="font-semibold text-[#141543]">#{bookingData.id}</span>
                      </p>
                      <h2 className="mt-1 font-manrope text-[32px] font-bold leading-none tracking-tight-2 text-[#141543]">Booking Successful</h2>
                      <p className="mt-1 text-sm font-medium text-slate-600">
                        {bookingData.vehicle.name} - {bookingData.vehicle.licensePlate}
                      </p>
                    </div>
                  </div>

                  {/* Customer Details Grid */}
                  <div className="mt-6 grid grid-cols-2 gap-x-12 gap-y-4">
                    <div>
                      <p className="text-xs text-slate-500">Booked by</p>
                      <p className="mt-1 text-base font-normal leading-none tracking-tight-2 text-[#141543]">{bookingData.customer.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Booked On</p>
                      <p className="mt-1 text-base font-normal leading-none tracking-tight-2 text-[#141543]">{bookingData.bookedOn}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Email</p>
                      <p className="mt-1 text-base font-normal leading-none tracking-tight-2 text-[#141543]">{bookingData.customer.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Vehicle Vin</p>
                      <p className="mt-1 text-base font-normal leading-none tracking-tight-2 text-[#141543]">{bookingData.vehicle.vin}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Phone no.</p>
                      <p className="mt-1 text-base font-normal leading-none tracking-tight-2 text-[#141543]">{bookingData.customer.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Right Section - Location Details */}
                <div className="w-60 shrink-0">
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
              </div>
            </div>

            {/* Bottom Row - Invoice and Photo Cards */}
            <div className="flex gap-6">
              {/* Invoice Card */}
              <div className="flex-1 rounded-lg border border-[#f4f4f4] bg-[#fafafa] p-6">
                {/* Invoice Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-[#141543]">Invoice</h3>
                      <span className="text-xs text-slate-500">#{bookingData.invoice.number}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">Enter the name of your vehicle</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50"
                    >
                      <Image src="/icons/booking/download-outline.svg" alt="Download" width={20} height={20} />
                    </button>
                    <Button variant="primary">Make Payment</Button>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-4 h-px w-full border-t border-[#cecece]" />

                {/* Invoice Items */}
                {bookingData.invoice.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 overflow-hidden rounded bg-slate-200">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
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
                    <span className="text-[#141543]">${bookingData.invoice.subtotal}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">Discount</span>
                      <span className="flex items-center gap-1 text-sm font-medium text-[#141543]">
                        <Image src="/icons/booking/discount.svg" alt="Discount" width={16} height={16} />
                        {bookingData.invoice.discountCode}
                      </span>
                    </div>
                    <span className="text-[#141543]">-${bookingData.invoice.discount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Tax</span>
                    <span className="text-[#141543]">${bookingData.invoice.tax}</span>
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

              {/* Right Column - Photo Upload Cards */}
              <div className="w-[280px] shrink-0 space-y-6">
                {/* Pre-Trip Photos */}
                <div className="rounded-lg border border-[#f4f4f4] bg-[#fafafa] p-6">
                  <h3 className="text-base font-semibold text-[#141543]">Add Pre-Trip Photos</h3>
                  <p className="mt-1 text-xs text-slate-500">Upload photos of the vehicle before the trip</p>

                  {/* Photo Grid */}
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {preTripPhotos.map((photo, index) => (
                      <div key={index} className="group relative aspect-square overflow-hidden rounded-lg">
                        <Image src={photo} alt={`Pre-trip ${index + 1}`} fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => removePreTripPhoto(index)}
                          className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  {preTripPhotos.length === 0 && <div className="mt-4 min-h-20" />}

                  <input
                    ref={preTripInputRef}
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handlePreTripUpload}
                    className="hidden"
                  />
                  <Button
                    variant="primary"
                    className="mt-4 gap-2"
                    onClick={() => preTripInputRef.current?.click()}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 3.33334V12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Upload
                  </Button>
                </div>

                {/* Post-Trip Photos */}
                <div className="rounded-lg border border-[#f4f4f4] bg-[#fafafa] p-6">
                  <h3 className="text-base font-semibold text-[#141543]">Add Post-Trip Photos</h3>
                  <p className="mt-1 text-xs text-slate-500">Upload photos of the vehicle after the trip</p>

                  {/* Photo Grid */}
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {postTripPhotos.map((photo, index) => (
                      <div key={index} className="group relative aspect-square overflow-hidden rounded-lg">
                        <Image src={photo} alt={`Post-trip ${index + 1}`} fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => removePostTripPhoto(index)}
                          className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  {postTripPhotos.length === 0 && <div className="mt-4 min-h-20" />}

                  <input
                    ref={postTripInputRef}
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handlePostTripUpload}
                    className="hidden"
                  />
                  <Button
                    variant="primary"
                    className="mt-4 gap-2"
                    onClick={() => postTripInputRef.current?.click()}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 3.33334V12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Upload
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
