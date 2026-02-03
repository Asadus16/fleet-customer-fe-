'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { AnnouncementBar, Header, Footer } from '@/components/layout';
import {
  CustomerDetailsSection,
  InsuranceSection,
  ExtrasSection,
  PaymentDetailsSection,
  BookingSidebar,
} from '@/components/sections/booking';
import { ValidationModal } from '@/components/ui';
import {
  useFleet,
  useInsuranceOptions,
  useFleetExtras,
  useCreateBooking,
  useCompanySettings,
  useDefaultAgreementTemplate,
} from '@/hooks';
import { extras as defaultExtras } from '@/data/booking';

// Helper to format date for display
function formatDateForDisplay(dateStr: string): string {
  const date = new Date(dateStr);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${days[date.getDay()]}. ${date.getDate().toString().padStart(2, '0')} ${months[date.getMonth()]}, ${date.getFullYear()}`;
}

// Helper to calculate days between dates
function calculateDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays || 1;
}

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const vehicleId = params.id as string;

  // Get dates from URL params or use defaults
  const getDefaultDate = (daysFromNow: number = 0): string => {
    const date = new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000);
    return date.toISOString().split('T')[0] as string;
  };
  const pickupDate = searchParams.get('pickupDate') || getDefaultDate(0);
  const dropoffDate = searchParams.get('dropoffDate') || getDefaultDate(2);
  const pickupTime = searchParams.get('pickupTime') || '09:00';
  const dropoffTime = searchParams.get('dropoffTime') || '09:00';

  // Fetch vehicle data from API
  const { data: vehicleData, isLoading, isError } = useFleet(vehicleId);

  // Fetch insurance options, extras, company settings, and agreement template
  const { data: insuranceOptions = [] } = useInsuranceOptions();
  const { data: fleetExtras = [] } = useFleetExtras(vehicleId);
  const { data: companySettings } = useCompanySettings();
  const { data: agreementTemplate } = useDefaultAgreementTemplate();

  // Create booking mutation
  const { mutate: createBookingMutation, isPending: isCreatingBooking } = useCreateBooking();

  // Use fleet extras if available, otherwise fall back to default
  const extras = fleetExtras.length > 0 ? fleetExtras : defaultExtras;

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

  // Validation Modal State
  const [validationModal, setValidationModal] = useState({ isOpen: false, title: '', message: '' });

  // Check for terms acceptance from sessionStorage
  useEffect(() => {
    const acceptedCheckbox = sessionStorage.getItem('termsAccepted');
    if (acceptedCheckbox === 'payment') {
      setPaymentTermsAccepted(true);
      sessionStorage.removeItem('termsAccepted');
    }
  }, []);

  // Discount State
  const [discountCode, setDiscountCode] = useState<string | undefined>(undefined);
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Calculate rental days
  const rentalDays = useMemo(() => calculateDays(pickupDate, dropoffDate), [pickupDate, dropoffDate]);

  // Calculate pricing
  const pricing = useMemo(() => {
    if (!vehicleData) return { subtotal: 0, discount: 0, tax: 0, total: 0, deposit: 0 };

    const subtotal = vehicleData.pricePerDay * rentalDays;
    const discount = appliedDiscount;
    const tax = 0; // Would come from API based on location
    const total = subtotal - discount + tax;
    const deposit = total * 0.8;

    return { subtotal, discount, tax, total, deposit };
  }, [vehicleData, rentalDays, appliedDiscount]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <AnnouncementBar
          message="Looking for Essential Oils? Head on"
          linkText="Here Now!"
          linkHref="#"
        />
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-20 text-center flex-1 flex items-center justify-center">
          <div className="text-slate-500">Loading vehicle details...</div>
        </main>
        <Footer />
      </div>
    );
  }

  // If vehicle not found or error, show error
  if (isError || !vehicleData) {
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

  // Shared sidebar props
  const sidebarVehicle = {
    name: vehicleData.name,
    year: vehicleData.year,
    description: vehicleData.description,
    totalPrice: pricing.subtotal,
    images: vehicleData.images,
  };

  const sidebarPickUp = {
    address: vehicleData.location || 'Pickup Location',
    date: formatDateForDisplay(pickupDate),
    time: pickupTime,
  };

  const sidebarDropOff = {
    address: vehicleData.location || 'Drop-off Location',
    date: formatDateForDisplay(dropoffDate),
    time: dropoffTime,
  };

  const sidebarInvoiceProps = {
    invoiceNumber: String(Math.floor(1000 + Math.random() * 9000)),
    invoiceDescription: vehicleData.description,
    items: [
      {
        image: vehicleData.image,
        name: `${vehicleData.name}${vehicleData.licensePlate ? ` - ${vehicleData.licensePlate}` : ''}`,
        licensePlate: vehicleData.licensePlate,
        quantity: rentalDays,
        pricePerDay: vehicleData.pricePerDay,
      },
    ],
    subtotal: pricing.subtotal,
    discount: pricing.discount,
    discountCode,
    tax: pricing.tax,
    total: pricing.total,
    deposit: pricing.deposit,
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
    // In a real app, validate discount code via API
    if (code.toUpperCase() === 'FLEETHQSALE') {
      setDiscountCode(code);
      setAppliedDiscount(2);
    } else {
      setDiscountCode(code);
      setAppliedDiscount(0);
    }
  };

  const handleReserve = () => {
    // Validate customer details
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      setValidationModal({
        isOpen: true,
        title: 'Customer Details Required',
        message: 'Please fill in all customer details before proceeding with your reservation.',
      });
      return;
    }

    // Validate insurance is selected
    if (!selectedInsurance) {
      setValidationModal({
        isOpen: true,
        title: 'Insurance Required',
        message: 'Please select an insurance option to protect your rental.',
      });
      return;
    }

    // Build pickup and dropoff datetime strings
    const pickupDatetime = `${pickupDate}T${pickupTime}:00`;
    const dropoffDatetime = `${dropoffDate}T${dropoffTime}:00`;

    // Get selected extras IDs
    const selectedExtraIds = Object.entries(selectedExtras)
      .filter(([, value]) => value.enabled)
      .map(([id]) => Number(id))
      .filter((id) => !isNaN(id));

    // Get the first available location for this vehicle
    const pickupLocationId = vehicleData.availableLocations?.[0];
    if (!pickupLocationId) {
      setValidationModal({
        isOpen: true,
        title: 'Location Not Available',
        message: 'This vehicle does not have any pickup locations configured. Please contact support.',
      });
      return;
    }

    // Generate temp ID for localStorage fallback
    const tempBookingId = `temp-${Date.now()}`;
    const bookingData = {
      id: tempBookingId,
      status: 'pending',
      vehicle: {
        name: vehicleData.name,
        licensePlate: vehicleData.licensePlate || 'N/A',
        vin: vehicleData.vin || 'N/A',
        image: vehicleData.images?.[0] || '/images/vehicles/car_placeholder.png',
        year: vehicleData.year,
      },
      customer: {
        name: `${firstName.trim()} ${lastName.trim()}`,
        email: email.trim(),
        phone: `${countryCode}${phone.trim()}`,
      },
      bookedOn: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
      pickUp: {
        address: vehicleData.location || 'Pickup Location',
        date: formatDateForDisplay(pickupDate),
        time: pickupTime,
      },
      dropOff: {
        address: vehicleData.location || 'Drop-off Location',
        date: formatDateForDisplay(dropoffDate),
        time: dropoffTime,
      },
      invoice: {
        number: tempBookingId,
        items: [
          {
            name: `${vehicleData.name} - ${vehicleData.licensePlate || 'N/A'}`,
            image: vehicleData.images?.[0] || '/images/vehicles/car_placeholder.png',
            quantity: rentalDays,
            pricePerDay: vehicleData.pricePerDay,
          },
        ],
        subtotal: pricing.subtotal,
        discount: pricing.discount,
        discountCode: discountCode || '',
        tax: pricing.tax,
        total: pricing.total,
        deposit: pricing.deposit,
        balance: pricing.total - pricing.deposit,
      },
      verifications: {
        idVerification: 'pending',
        insuranceVerification: 'pending',
      },
      agreementId: `temp-agreement-${Date.now()}`,
    };

    // Store agreement data for rental agreement page
    const agreementData = {
      id: bookingData.agreementId,
      status: 'pending',
      signedAt: null,
      signatureImage: null,
      company: {
        name: companySettings?.name || 'Fleet HQ',
        address: companySettings?.address || 'United States',
        email: companySettings?.email || 'support@fleethq.com',
        phone: companySettings?.phone || '+1 (555) 000-0000',
        logo: companySettings?.logo || null,
      },
      customer: {
        name: `${firstName.trim()} ${lastName.trim()}`,
        homeAddress: 'N/A',
        city: 'N/A',
        state: 'N/A',
        zip: 'N/A',
        phone: `${countryCode}${phone.trim()}`,
        birthDate: 'N/A',
        licenseNumber: 'N/A',
        licenseExpiry: 'N/A',
      },
      insurance: {
        carrierName: selectedInsurance === 'own' ? 'Own Insurance' : 'Selected Coverage',
        policyNumber: 'N/A',
        expires: 'N/A',
        policyDetails: selectedInsurance === 'own' ? 'Customer provided own insurance' : 'Coverage selected during booking',
      },
      vehicle: {
        pickupDateTime: `${formatDateForDisplay(pickupDate)} at ${pickupTime}`,
        dropoffDateTime: `${formatDateForDisplay(dropoffDate)} at ${dropoffTime}`,
        bookedAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        vin: vehicleData.vin || 'N/A',
        vehicleName: `${vehicleData.year} ${vehicleData.name}`,
        minimumMiles: vehicleData.milesPerDay ? `${vehicleData.milesPerDay} miles/day` : 'Unlimited',
        maximumMiles: vehicleData.milesPerDay ? `${vehicleData.milesPerDay * rentalDays} miles total` : 'Unlimited',
        overageFee: vehicleData.milesOverageRate ? `$${Number(vehicleData.milesOverageRate).toFixed(2)}/mile` : '$0.00',
      },
      invoice: {
        carrierName: companySettings?.name || 'Fleet HQ',
        policyNumber: `INV-${tempBookingId}`,
        expires: 'N/A',
        policyDetails: 'Invoice details',
      },
      clauses: agreementTemplate?.clauses || [],
      template: {
        title: agreementTemplate?.title || 'Vehicle Rental Agreement',
        description: agreementTemplate?.description || 'Please review and sign this rental agreement before pickup.',
      },
    };

    // Store in localStorage as fallback for agreement page
    localStorage.setItem('pendingBooking', JSON.stringify(bookingData));
    localStorage.setItem('pendingAgreement', JSON.stringify(agreementData));

    // Create booking via API (registers customer first, then creates booking)
    createBookingMutation(
      {
        fleet_id: Number(vehicleId),
        customer: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          phone_no: `${countryCode}${phone.trim()}`,
        },
        pickup_datetime: pickupDatetime,
        dropoff_datetime: dropoffDatetime,
        pickup_location_id: pickupLocationId,
        insurance_option_id: selectedInsurance !== 'own' ? Number(selectedInsurance) : undefined,
        extras: selectedExtraIds.length > 0 ? selectedExtraIds : undefined,
        discount_code: discountCode,
      },
      {
        onSuccess: (data) => {
          router.push(`/booking/${data.id}` as never);
        },
        onError: (error) => {
          console.error('Booking creation failed:', error);
          // Fall back to temp booking on error
          router.push(`/booking/${tempBookingId}` as never);
        },
      }
    );
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
          href={'/fleet' as const}
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
                  isLoading={isCreatingBooking}
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
                isLoading={isCreatingBooking}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Hidden on mobile */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Validation Modal */}
      <ValidationModal
        isOpen={validationModal.isOpen}
        onClose={() => setValidationModal({ isOpen: false, title: '', message: '' })}
        title={validationModal.title}
        message={validationModal.message}
      />
    </div>
  );
}
