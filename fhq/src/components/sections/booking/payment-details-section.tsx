'use client';

import Image from 'next/image';

interface PaymentDetailsSectionProps {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  onCardNumberChange: (value: string) => void;
  onExpiryDateChange: (value: string) => void;
  onCvvChange: (value: string) => void;
}

export function PaymentDetailsSection({
  cardNumber,
  expiryDate,
  cvv,
  onCardNumberChange,
  onExpiryDateChange,
  onCvvChange,
}: PaymentDetailsSectionProps) {
  return (
    <section>
      <h2 className="font-manrope text-base font-semibold leading-none tracking-tight-2 text-[#141543]">Payment Details</h2>

      <div className="mt-5 -mx-4 rounded-lg border border-slate-200 p-3 md:mx-0 md:p-6">
        {/* Payment Method */}
        <div className="flex items-center gap-3">
          <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-300">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          </div>
          <span className="text-sm font-medium text-slate-900">Credit or Debit Card</span>
        </div>

        {/* Card Number */}
        <div className="mt-6">
          <label className="block text-xs text-slate-500">Card Number</label>
          <div className="mt-2 flex items-center justify-between border-b border-slate-200 pb-2">
            <input
              type="text"
              placeholder="123 123 123 123"
              value={cardNumber}
              onChange={(e) => onCardNumberChange(e.target.value)}
              className="flex-1 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
            <div className="flex items-center gap-1">
              <Image src="/icons/booking/cards/VISA.svg" alt="Visa" width={24} height={16} />
              <Image src="/icons/booking/cards/Mastercard.svg" alt="Mastercard" width={24} height={16} />
              <Image src="/icons/booking/cards/AMEX.svg" alt="Amex" width={24} height={16} />
              <Image src="/icons/booking/cards/Discover.svg" alt="Discover" width={24} height={16} />
            </div>
          </div>
        </div>

        {/* Date and CVV */}
        <div className="mt-6 grid grid-cols-2 gap-8">
          <div>
            <label className="block text-xs text-slate-500">Expiry Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => onExpiryDateChange(e.target.value)}
              className="mt-2 w-full border-b border-slate-200 pb-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500">CVV</label>
            <input
              type="text"
              placeholder="123"
              value={cvv}
              onChange={(e) => onCvvChange(e.target.value)}
              className="mt-2 w-full border-b border-slate-200 pb-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-xs text-slate-400">
          The renter must be the cardholder, you may be asked to present the card upon pickup.
        </p>
      </div>
    </section>
  );
}
