'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { AnnouncementBar, Header, Footer } from '@/components/layout';
import {
  CustomerDetailsSection,
  InsuranceSection,
  ExtrasSection,
  PaymentDetailsSection,
  BookingSidebar,
} from '@/components/sections/booking';
import { getVehicleById } from '@/data/vehicles';
import { insuranceOptions, extras } from '@/data/booking';

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const vehicleId = params.id as string;

  // Get vehicle data
  const vehicleData = getVehicleById(vehicleId);

  // Customer Details State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');

  // Insurance State
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(null);

  // Extras State
  const [selectedExtras, setSelectedExtras] = useState<Record<string, { enabled: boolean; quantity: number }>>({});

  // Payment State
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Terms State
  const [paymentTermsAccepted, setPaymentTermsAccepted] = useState(false);

  // Check for terms acceptance from sessionStorage
  useEffect(() => {
    const acceptedCheckbox = sessionStorage.getItem('termsAccepted');
    if (acceptedCheckbox === 'payment') {
      setPaymentTermsAccepted(true);
      sessionStorage.removeItem('termsAccepted');
    }
  }, []);

  // Discount State
  const [discountCode, setDiscountCode] = useState<string | undefined>('FLEETHQSALE');

  // If vehicle not found, show error
  if (!vehicleData) {
    return (
      <div className="min-h-screen bg-white">
        <AnnouncementBar
          message="Looking for Essential Oils? Head on"
          linkText="Here Now!"
          linkHref="#"
        />
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Vehicle not found</h1>
          <p className="mt-4 text-slate-600">The vehicle you are looking for does not exist.</p>
          <Link href="/fleet" className="mt-6 inline-block text-primary underline">
            Back to Fleet
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate rental days (mock: 2 days)
  const rentalDays = 2;
  const subtotal = vehicleData.pricePerDay * rentalDays;
  const discount = 2;
  const tax = 0;
  const total = subtotal - discount + tax;
  const deposit = total * 0.8;

  // Shared sidebar props
  const sidebarVehicle = {
    name: vehicleData.name,
    year: vehicleData.year,
    description: vehicleData.description,
    totalPrice: subtotal,
    images: vehicleData.images,
  };

  const sidebarPickUp = {
    address: vehicleData.location,
    date: 'Tue. 02 Dec, 2025',
    time: '09:00 AM',
  };

  const sidebarDropOff = {
    address: vehicleData.location,
    date: 'Thu. 04 Dec, 2025',
    time: '09:00 AM',
  };

  const sidebarInvoiceProps = {
    invoiceNumber: '3522',
    invoiceDescription: vehicleData.description,
    items: [
      {
        image: vehicleData.image,
        name: `${vehicleData.name} - ${vehicleData.licensePlate}`,
        licensePlate: vehicleData.licensePlate,
        quantity: rentalDays,
        pricePerDay: vehicleData.pricePerDay,
      },
    ],
    subtotal,
    discount,
    discountCode,
    tax,
    total,
    deposit,
  };

  const handleExtraToggle = (id: string) => {
    setSelectedExtras((prev) => ({
      ...prev,
      [id]: {
        enabled: !prev[id]?.enabled,
        quantity: prev[id]?.quantity || 1,
      },
    }));
  };

  const handleExtraQuantityChange = (id: string, quantity: number) => {
    setSelectedExtras((prev) => ({
      ...prev,
      [id]: {
        enabled: true,
        quantity,
      },
    }));
  };

  const handleApplyDiscount = (code: string) => {
    setDiscountCode(code);
  };

  const handleReserve = () => {
    const bookingId = Math.floor(10000 + Math.random() * 90000).toString();
    router.push(`/booking/${bookingId}`);
  };

  const handleEditPickUp = () => {};
  const handleEditDropOff = () => {};

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar
        message="Looking for Essential Oils? Head on"
        linkText="Here Now!"
        linkHref="#"
      />

      <Header showBorderBottom />

      <main className="mx-auto max-w-7xl mobile-section-padding pt-6 pb-0 md:px-8 md:pt-8 md:pb-20">
        {/* Go Back Link */}
        <Link
          href={'/fleet' as never}
          className="inline-flex items-center text-sm font-medium text-primary underline hover:text-primary-hover"
        >
          Go Back
        </Link>

        {/* Mobile Vehicle Header - Shows on mobile only */}
        <div className="mt-6 -mx-8 md:hidden">
          <BookingSidebar
            variant="mobile-header"
            vehicle={sidebarVehicle}
            pickUp={sidebarPickUp}
            dropOff={sidebarDropOff}
            onEditPickUp={handleEditPickUp}
            onEditDropOff={handleEditDropOff}
          />
        </div>

        {/* Main Content */}
        <div className="mt-6 flex flex-col gap-8 md:flex-row md:gap-12">
          {/* Left Column - Forms */}
          <div className="flex-1 max-w-full md:max-w-[640px]">
            <div className="space-y-8">
              <CustomerDetailsSection
                firstName={firstName}
                lastName={lastName}
                email={email}
                phone={phone}
                countryCode={countryCode}
                onFirstNameChange={setFirstName}
                onLastNameChange={setLastName}
                onEmailChange={setEmail}
                onPhoneChange={setPhone}
                onCountryCodeChange={setCountryCode}
              />

              <InsuranceSection
                options={insuranceOptions}
                selectedId={selectedInsurance}
                onSelect={setSelectedInsurance}
              />

              <ExtrasSection
                extras={extras}
                selectedExtras={selectedExtras}
                onToggle={handleExtraToggle}
                onQuantityChange={handleExtraQuantityChange}
              />

              <PaymentDetailsSection
                cardNumber={cardNumber}
                expiryDate={expiryDate}
                cvv={cvv}
                onCardNumberChange={setCardNumber}
                onExpiryDateChange={setExpiryDate}
                onCvvChange={setCvv}
              />

              {/* Mobile Invoice Footer - Shows on mobile only */}
              <div className="-mx-8 md:hidden">
                <BookingSidebar
                  variant="mobile-footer"
                  vehicle={sidebarVehicle}
                  pickUp={sidebarPickUp}
                  dropOff={sidebarDropOff}
                  {...sidebarInvoiceProps}
                  onApplyDiscount={handleApplyDiscount}
                  onEditPickUp={handleEditPickUp}
                  onEditDropOff={handleEditDropOff}
                  paymentTermsAccepted={paymentTermsAccepted}
                  onPaymentTermsChange={setPaymentTermsAccepted}
                  onReserve={handleReserve}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar (Desktop only) */}
          <div className="hidden w-[520px] flex-shrink-0 md:block">
            <div className="sticky top-8">
              <BookingSidebar
                vehicle={sidebarVehicle}
                pickUp={sidebarPickUp}
                dropOff={sidebarDropOff}
                {...sidebarInvoiceProps}
                onApplyDiscount={handleApplyDiscount}
                onEditPickUp={handleEditPickUp}
                onEditDropOff={handleEditDropOff}
                paymentTermsAccepted={paymentTermsAccepted}
                onPaymentTermsChange={setPaymentTermsAccepted}
                onReserve={handleReserve}
              />
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
