interface FeatureCardProps {
  title: string;
  description: string;
}

export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="h-[108px] w-[288px] rounded-md bg-[#f8f8f9] p-4">
      <h3 className="text-xs font-bold leading-[1.08] tracking-tight-2 text-slate-900">{title}</h3>
      <p className="mt-2 text-xs font-light leading-none text-slate-600">{description}</p>
    </div>
  );
}
