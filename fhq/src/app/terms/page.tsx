'use client';

import { Suspense } from 'react';
import { PolicyPageLayout } from '@/components/layout';
import { PolicySections } from '@/components/sections';
import { termsContent } from '@/data/policies';

function TermsAndConditionsContent() {
  return (
    <PolicyPageLayout
      title={termsContent.title}
      description={termsContent.description}
      primaryButtonLabel="Accept"
    >
      <PolicySections sections={termsContent.sections} />
    </PolicyPageLayout>
  );
}

export default function TermsAndConditionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <TermsAndConditionsContent />
    </Suspense>
  );
}
