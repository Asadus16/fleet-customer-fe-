import { BookingForm } from './booking-form';

interface HeroSectionProps {
  backgroundImage?: string;
}

export function HeroSection({ backgroundImage = '/images/hero-bg.jpg' }: HeroSectionProps) {
  return (
    <section className="relative pb-8 sm:pb-0">
      {/* Background Image */}
      <div
        className="relative h-112.5 bg-cover bg-center bg-no-repeat md:h-135"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Overlay for better text readability if needed */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Booking Form - Positioned to overlap */}
      <div className="relative mx-auto max-w-6xl px-0 sm:px-6 lg:px-8">
        <div className="-mt-16 md:-mt-20">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
