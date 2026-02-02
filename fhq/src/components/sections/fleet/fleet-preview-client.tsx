'use client';

import { useFleets } from '@/hooks/useFleets';
import { FleetPreviewSection } from './fleet-preview-section';

interface FleetPreviewClientProps {
  title?: string;
  subtitle?: string;
  description?: string;
  showExploreButton?: boolean;
}

export function FleetPreviewClient({
  title,
  subtitle,
  description,
  showExploreButton = true,
}: FleetPreviewClientProps) {
  const { data, isLoading } = useFleets(1, '');

  // Show first 3 vehicles for preview
  const vehicles = data?.results?.slice(0, 3) || [];

  if (isLoading) {
    return (
      <section className="py-20 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl text-center">
          <div className="text-slate-500">Loading vehicles...</div>
        </div>
      </section>
    );
  }

  // If no vehicles from API, show empty state or fallback
  if (vehicles.length === 0) {
    return null;
  }

  return (
    <FleetPreviewSection
      title={title}
      subtitle={subtitle}
      description={description}
      vehicles={vehicles}
      showExploreButton={showExploreButton}
    />
  );
}
