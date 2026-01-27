import Link from 'next/link';
import { VehicleCard } from './vehicle-card';

interface Vehicle {
  id: string;
  name: string;
  image: string;
  location: string;
  seats: number;
  transmission: string;
  fuelType: string;
  pricePerDay: number;
}

interface FleetPreviewSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  vehicles: Vehicle[];
  showExploreButton?: boolean;
}

export function FleetPreviewSection({
  title = 'Why Choose Kings Car Rental',
  subtitle = "We're not just a car rental company — we're your local partner in Ketchikan",
  description = "Our Practical Fleet is clean, reliable vehicles for real Alaska adventures. No luxury markup, just honest transportation. We know these roads. We know these islands. And we know that in a small town, trust and reliability matter more than flashy marketing. That's why we keep our fleet clean and dependable, our prices fair, and our service genuinely friendly.",
  vehicles,
  showExploreButton = true,
}: FleetPreviewSectionProps) {
  return (
    <section
      className="py-20"
      style={{ background: 'radial-gradient(65.36% 57.7% at 50% 57.7%, rgba(251, 251, 251, 0) 0%, #FBFBFB 100%)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold tracking-tight-2 text-primary-light">{title}</p>
          <h2 className="mt-2 text-[36px] font-bold leading-[1.17] tracking-tight-2 text-slate-900">
            {subtitle}
          </h2>
          <p className="mt-4 text-xs font-light leading-[1.61] text-slate-600">{description}</p>
        </div>

        {/* Vehicle Cards */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="w-[280px]">
              <VehicleCard {...vehicle} />
            </div>
          ))}
        </div>

        {/* Explore More Button */}
        {showExploreButton && (
          <div className="mt-12 text-center">
            <Link
              href="/fleet"
              className="inline-block rounded-lg bg-primary px-10 py-4 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
            >
              Explore More
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
