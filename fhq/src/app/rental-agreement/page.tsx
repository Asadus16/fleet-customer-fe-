'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PolicyPageLayout } from '@/components/layout';
import { RentalAgreementPreview } from '@/components/sections';
import { useAgreementByBooking } from '@/hooks';
import { Spinner, ValidationModal } from '@/components/ui';
import { rentalAgreementContent } from '@/data/policies';
import type { AgreementData } from '@/services/agreementServices';

function RentalAgreementContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get('bookingId');

  // State for localStorage agreement data
  const [localAgreementData, setLocalAgreementData] = useState<AgreementData | null>(null);
  const [localDataLoaded, setLocalDataLoaded] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [validationModal, setValidationModal] = useState({ isOpen: false, title: '', message: '' });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('pendingAgreement');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setLocalAgreementData(parsed);
      } catch (e) {
        console.error('Failed to parse stored agreement:', e);
      }
    }
    setLocalDataLoaded(true);
  }, []);

  // If bookingId is provided, fetch the agreement dynamically
  const { data: apiAgreement, isLoading: apiLoading, isError } = useAgreementByBooking(bookingId || undefined);

  // Use localStorage data if available, otherwise API data
  const agreement = localAgreementData || apiAgreement;
  const isLoading = !localDataLoaded || (bookingId && apiLoading);

  const handleSave = () => {
    if (!signature) {
      setValidationModal({
        isOpen: true,
        title: 'Signature Required',
        message: 'Please sign the agreement before saving.',
      });
      return;
    }

    // Store signature in localStorage
    if (localAgreementData) {
      const signedAgreement = {
        ...localAgreementData,
        status: 'signed',
        signatureImage: signature,
        signedAt: new Date().toISOString(),
      };
      localStorage.setItem('pendingAgreement', JSON.stringify(signedAgreement));
      router.back();
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Spinner size="lg" />
          <p className="text-slate-500">Loading agreement...</p>
        </div>
      </div>
    );
  }

  // Error state when agreement not found
  if (bookingId && (isError || !agreement)) {
    return (
      <PolicyPageLayout
        title={rentalAgreementContent.title}
        description={rentalAgreementContent.description}
        primaryButtonLabel="Save"
      >
        <div className="text-center py-12">
          <h2 className="text-xl font-bold text-slate-900">Agreement not found</h2>
          <p className="mt-2 text-slate-600">
            No agreement found for this booking. Please contact support.
          </p>
        </div>
      </PolicyPageLayout>
    );
  }

  const isSigned = agreement?.status === 'signed' || !!agreement?.signatureImage;

  return (
    <>
      <PolicyPageLayout
        title={rentalAgreementContent.title}
        description={rentalAgreementContent.description}
        primaryButtonLabel={isSigned ? 'Signed' : 'Save'}
        onPrimaryAction={isSigned ? undefined : handleSave}
      >
        <RentalAgreementPreview
          data={agreement || undefined}
          onSignatureChange={setSignature}
        />
      </PolicyPageLayout>

      <ValidationModal
        isOpen={validationModal.isOpen}
        onClose={() => setValidationModal({ isOpen: false, title: '', message: '' })}
        title={validationModal.title}
        message={validationModal.message}
      />
    </>
  );
}

export default function RentalAgreementPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <RentalAgreementContent />
    </Suspense>
  );
}
