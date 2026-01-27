import { FeatureCard } from './feature-card';

interface Feature {
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
}

export function FeaturesSection({
  title = 'Why Choose Kings Car Rental',
  subtitle = "We're not just a car rental company — we're your local partner in Ketchikan",
  features,
}: FeaturesSectionProps) {
  return (
    <section className="bg-white pb-4 pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold tracking-tight-2 text-primary-light">{title}</p>
          <h2 className="mt-2 text-[36px] font-bold leading-[1.17] tracking-tight-2 text-slate-900">
            {subtitle}
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="mt-12 flex flex-wrap justify-center gap-5">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
