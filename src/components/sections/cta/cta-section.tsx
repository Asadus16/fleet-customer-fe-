import Link from 'next/link';

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  backgroundImage?: string;
}

export function CTASection({
  title = 'Book your ride today!',
  description = "Ready to hit the road? Booking with Kings Car Rentals, LLC is fast and simple. Browse our fleet online, choose your vehicle, and reserve it within minutes. For personalized assistance, feel free to contact our team directly.",
  buttonText = 'Book Now',
  buttonHref = '/book',
  backgroundImage = '/images/cta-bg.jpg',
}: CTASectionProps) {
  return (
    <section className="relative z-10 mx-auto -mb-44 max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div
        className="relative overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Content */}
        <div className="relative px-8 py-16 text-center md:px-16 md:py-24">
          <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white">{description}</p>
          <div className="mt-8">
            <Link
              href={buttonHref}
              className="inline-block rounded-lg bg-[#1a75bc] px-10 py-4 text-sm font-medium text-white transition-colors hover:bg-[#155a8a]"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
