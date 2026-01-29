'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Vehicle {
  name: string;
  year: number;
  description: string;
  totalPrice: number;
  images: string[];
}

interface Location {
  address: string;
  date: string;
  time: string;
}

interface InvoiceItem {
  image: string;
  name: string;
  licensePlate: string;
  quantity: number;
  pricePerDay: number;
}

interface BookingSidebarProps {
  variant?: 'desktop' | 'mobile-header' | 'mobile-footer';
  vehicle: Vehicle;
  pickUp: Location;
  dropOff: Location;
  invoiceNumber?: string;
  invoiceDescription?: string;
  items?: InvoiceItem[];
  subtotal?: number;
  discount?: number;
  discountCode?: string;
  tax?: number;
  total?: number;
  deposit?: number;
  onApplyDiscount?: (code: string) => void;
  onEditPickUp: () => void;
  onEditDropOff: () => void;
  paymentTermsAccepted?: boolean;
  onPaymentTermsChange?: (accepted: boolean) => void;
  onReserve?: () => void;
}

export function BookingSidebar({
  variant = 'desktop',
  vehicle,
  pickUp,
  dropOff,
  invoiceNumber,
  invoiceDescription,
  items,
  subtotal,
  discount,
  discountCode,
  tax,
  total,
  deposit,
  onApplyDiscount,
  onEditPickUp,
  onEditDropOff,
  paymentTermsAccepted,
  onPaymentTermsChange,
  onReserve,
}: BookingSidebarProps) {
  const [promoCode, setPromoCode] = useState('');
  const [mainImage, setMainImage] = useState(0);

  const showHeader = variant === 'desktop' || variant === 'mobile-header';
  const showInvoice = variant === 'desktop' || variant === 'mobile-footer';
  const isMobile = variant === 'mobile-header' || variant === 'mobile-footer';

  return (
    <div className={`bg-[#f9fafb] ${isMobile ? '' : 'rounded-lg border border-slate-200'}`}>
      {/* Vehicle Header - Only show for desktop and mobile-header */}
      {showHeader && (
        <>
          <div className={isMobile ? 'px-4 py-3' : 'p-6'}>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {vehicle.name} {vehicle.year}
                </h2>
                <p className="mt-1 text-sm text-slate-500">{vehicle.description}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900">${vehicle.totalPrice}</p>
                <p className="text-xs text-slate-500">Total before taxes</p>
              </div>
            </div>

            {/* Breaker */}
            <div className="my-4 h-px w-full bg-[#c0c4c9]" />

            {/* Image Gallery */}
            <div className="flex gap-2">
              <div className="relative aspect-[4/3] flex-1 overflow-hidden rounded-lg">
                {vehicle.images[mainImage] && (
                  <Image
                    src={vehicle.images[mainImage]}
                    alt={vehicle.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex w-24 flex-col gap-2">
                {vehicle.images.slice(0, 3).map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setMainImage(index)}
                    className={`relative aspect-[4/3] overflow-hidden rounded-lg ${
                      mainImage === index ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <Image src={img} alt={`${vehicle.name} ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Breaker */}
          <div className={`h-px bg-[#c0c4c9] ${isMobile ? 'mx-4 w-[calc(100%-32px)]' : 'mx-6 w-[calc(100%-48px)]'}`} />

          {/* Pick Up / Drop Off */}
          <div className={isMobile ? 'p-4' : 'p-6'}>
            <div className="flex gap-3">
              {/* Icons with dotted line */}
              <div className="flex flex-col items-center">
                <Image src="/icons/booking/pick-up.svg" alt="Pick up" width={8} height={8} />
                <div className="my-2 h-16 w-px border-l border-dashed border-slate-300" />
                <Image src="/icons/booking/drop-off.svg" alt="Drop off" width={8} height={8} />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-4">
                {/* Pick Up */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-medium leading-none tracking-tight-3 text-slate-500">Pick up</p>
                    <p className="mt-1 text-sm font-bold leading-[1.09] tracking-tight-2 text-[#141543]">{pickUp.address}</p>
                    <p className="mt-1 text-[10px] font-light leading-none tracking-tight-3 text-[#2d2d2d]">
                      {pickUp.date}, {pickUp.time}
                    </p>
                  </div>
                  <button type="button" onClick={onEditPickUp}>
                    <Image src="/icons/booking/edit.svg" alt="Edit" width={18} height={17} />
                  </button>
                </div>

                {/* Drop Off */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-medium leading-none tracking-tight-3 text-slate-500">Drop off</p>
                    <p className="mt-1 text-sm font-bold leading-[1.09] tracking-tight-2 text-[#141543]">{dropOff.address}</p>
                    <p className="mt-1 text-[10px] font-light leading-none tracking-tight-3 text-[#2d2d2d]">
                      {dropOff.date}, {dropOff.time}
                    </p>
                  </div>
                  <button type="button" onClick={onEditDropOff}>
                    <Image src="/icons/booking/edit.svg" alt="Edit" width={18} height={17} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Invoice - Only show for desktop and mobile-footer */}
      {showInvoice && (
        <>
          {/* Breaker - only needed if header is also shown */}
          {showHeader && <div className={`h-px bg-[#c0c4c9] ${isMobile ? 'mx-4 w-[calc(100%-32px)]' : 'mx-6 w-[calc(100%-48px)]'}`} />}

          <div className={isMobile ? 'p-4' : 'p-6'}>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-slate-900">Invoice</h3>
          <span className="text-[10px] font-light leading-none text-[#141543]">#{invoiceNumber}</span>
        </div>
        <p className="mt-1 text-sm text-slate-500">{invoiceDescription}</p>

        {/* Breaker */}
        <div className="my-4 h-px w-full bg-[#c0c4c9]" />

        {/* Items */}
        <div className="space-y-4">
          {items?.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-16 overflow-hidden rounded">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">
                    {item.quantity}x Base price per day
                  </p>
                </div>
              </div>
              <p className="font-medium text-slate-900">${item.pricePerDay.toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Breaker */}
        <div className="my-4 h-px w-full bg-[#c0c4c9]" />

        {/* Discount Code */}
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3">
          <Image src="/icons/booking/discount.svg" alt="Discount" width={20} height={20} />
          <input
            type="text"
            placeholder="Add Discount Code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => onApplyDiscount?.(promoCode)}
            className="text-sm font-semibold text-slate-900"
          >
            Apply
          </button>
        </div>

        {/* Breaker */}
        <div className="my-4 h-px w-full bg-[#c0c4c9]" />

        {/* Totals */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Subtotal</span>
            <span className="text-slate-900">${subtotal}</span>
          </div>
          {discountCode && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-600">Discount</span>
                <span className="text-sm font-medium text-slate-900">{discountCode}</span>
              </div>
              <span className="text-slate-900">-${discount}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Tax</span>
            <span className="text-slate-900">${tax}</span>
          </div>
        </div>

        {/* Breaker */}
        <div className="my-4 h-px w-full bg-[#c0c4c9]" />

        {/* Total */}
        <div className="flex justify-between">
          <span className="text-base font-semibold text-slate-900">Total</span>
          <div className="text-right">
            <span className="text-xs text-slate-500">USD </span>
            <span className="text-xl font-bold text-slate-900">${total?.toFixed(2)}</span>
          </div>
        </div>

        {/* Breaker */}
        <div className="my-4 h-px w-full bg-[#c0c4c9]" />

        {/* Deposit */}
        <div className="flex justify-between">
          <span className="text-base font-semibold text-slate-900">Deposit</span>
          <div className="text-right">
            <span className="text-xs text-slate-500">USD </span>
            <span className="text-xl font-bold text-slate-900">${deposit?.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Breaker */}
      <div className={`h-px bg-[#c0c4c9] ${isMobile ? 'mx-4 w-[calc(100%-32px)]' : 'mx-6 w-[calc(100%-48px)]'}`} />

      {/* Terms & Reserve */}
      <div className={isMobile ? 'p-4' : 'p-6'}>
        {/* Terms Checkbox */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={paymentTermsAccepted}
              onChange={(e) => onPaymentTermsChange?.(e.target.checked)}
              className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-slate-300 accent-primary"
            />
            <span className="font-manrope text-[10px] leading-[1.4] text-slate-600">
              I have read and accept the rental information , the{' '}
              <a href="/terms?checkbox=payment" className="font-extrabold text-slate-900 underline">
                terms and conditions
              </a>{' '}
              , and the{' '}
              <a href="/privacy?checkbox=payment" className="font-extrabold text-slate-900 underline">
                privacy policy
              </a>
              . I confirm that I am booking a prepaid rate, where the entire price of the
              reservation will be immediately debited from the payment method I have provided.
            </span>
          </label>
        </div>

        {/* Reserve Button */}
        <button
          type="button"
          onClick={onReserve}
          disabled={!paymentTermsAccepted}
          className="mt-6 w-full rounded-lg bg-[#5a6a7a] py-4 text-sm font-medium text-white transition-colors hover:bg-[#4a5a6a] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reserve
        </button>
      </div>
        </>
      )}
    </div>
  );
}
