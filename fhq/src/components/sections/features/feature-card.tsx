interface FeatureCardProps {
  title: string;
  description: string;
}

export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="w-full rounded-lg bg-[#f8f8f9] px-6 py-5 sm:h-27 sm:w-72 sm:rounded-md sm:p-4">
      <h3 className="text-sm font-bold leading-[1.17] tracking-tight-2 text-slate-900 sm:text-xs sm:leading-[1.08]">{title}</h3>
      <p className="feature-description mt-2">{description}</p>
    </div>
  );
}
