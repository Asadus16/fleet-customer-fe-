'use client';

import { Suspense } from 'react';
import { PolicyPageLayout } from '@/components/layout';
import { RentalAgreementPreview } from '@/components/sections';
import { rentalAgreementContent } from '@/data/policies';

function RentalAgreementContent() {
  return (
    <PolicyPageLayout
      title={rentalAgreementContent.title}
      description={rentalAgreementContent.description}
      primaryButtonLabel="Save"
    >
      <RentalAgreementPreview />
    </PolicyPageLayout>
  );
}

export default function RentalAgreementPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <RentalAgreementContent />
    </Suspense>
  );
}
