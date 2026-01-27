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

// Mock data for insurance and extras
const insuranceOptions = [
  {
    id: 'own',
    title: 'I have my own insurance',
    price: 0,
    features: ['Use your personal coverage'],
  },
  {
    id: 'basic',
    title: 'Basic Protection',
    price: 14.99,
    features: ['Collision damage waiver', 'Theft protection'],
  },
  {
    id: 'premium',
    title: 'Premium Protection',
    price: 29.99,
    features: [
      'Collision damage waiver',
      'Theft protection',
      'Personal accident insurance',
      'Roadside assistance 24/7',
    ],
  },
];

const extras = [
  {
    id: 'driver',
    title: 'Additional Driver',
    description: 'Add another driver to your rental',
    price: 12.99,
    priceUnit: '/day & driver',
    hasQuantity: true,
  },
  {
    id: 'gps',
    title: 'GPS Navigation',
    description: 'Never get lost with our GPS system',
    price: 9.99,
    priceUnit: '/day',
    hasQuantity: false,
  },
  {
    id: 'child-seat',
    title: 'Child Seat',
    description: 'Safety seat for children under 12',
    price: 7.99,
    priceUnit: '/day',
    hasQuantity: true,
  },
  {
    id: 'wifi',
    title: 'Mobile WiFi Hotspot',
    description: 'Stay connected on the go',
    price: 5.99,
    priceUnit: '/day',
    hasQuantity: false,
  },
];

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
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [paymentTermsAccepted, setPaymentTermsAccepted] = useState(false);

  // Check for terms acceptance from sessionStorage
  useEffect(() => {
    const acceptedCheckbox = sessionStorage.getItem('termsAccepted');
    if (acceptedCheckbox) {
      if (acceptedCheckbox === 'terms') {
        setTermsAccepted(true);
      } else if (acceptedCheckbox === 'payment') {
        setPaymentTermsAccepted(true);
      }
      // Clear the sessionStorage after reading
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
    // Navigate to booking details page with a generated booking ID
    const bookingId = Math.floor(10000 + Math.random() * 90000).toString();
    router.push(`/booking/${bookingId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar
        message="Looking for Essential Oils? Head on"
        linkText="Here Now!"
        linkHref="#"
      />

      <Header showBorderBottom />

      <main className="mx-auto max-w-7xl px-8 pt-8 pb-20">
        {/* Main Content */}
        <div className="flex gap-12">
          {/* Left Column - Forms */}
          <div className="flex-1 max-w-[640px]">
            {/* Go Back Link */}
            <Link
              href="/fleet"
              className="inline-flex items-center text-sm font-medium text-slate-900 underline hover:text-primary"
            >
              Go Back
            </Link>

            <div className="mt-6 space-y-8">
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
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="w-[520px] flex-shrink-0">
            <div className="sticky top-8">
              <BookingSidebar
                vehicle={{
                  name: vehicleData.name,
                  year: vehicleData.year,
                  description: vehicleData.description,
                  totalPrice: subtotal,
                  images: vehicleData.images,
                }}
                pickUp={{
                  address: vehicleData.location,
                  date: 'Tue. 02 Dec, 2025',
                  time: '09:00 AM',
                }}
                dropOff={{
                  address: vehicleData.location,
                  date: 'Thu. 04 Dec, 2025',
                  time: '09:00 AM',
                }}
                invoiceNumber="3522"
                invoiceDescription={vehicleData.description}
                items={[
                  {
                    image: vehicleData.image,
                    name: `${vehicleData.name} - ${vehicleData.licensePlate}`,
                    licensePlate: vehicleData.licensePlate,
                    quantity: rentalDays,
                    pricePerDay: vehicleData.pricePerDay,
                  },
                ]}
                subtotal={subtotal}
                discount={discount}
                discountCode={discountCode}
                tax={tax}
                total={total}
                deposit={deposit}
                onApplyDiscount={handleApplyDiscount}
                onEditPickUp={() => {}}
                onEditDropOff={() => {}}
                termsAccepted={termsAccepted}
                paymentTermsAccepted={paymentTermsAccepted}
                onTermsChange={setTermsAccepted}
                onPaymentTermsChange={setPaymentTermsAccepted}
                onReserve={handleReserve}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
