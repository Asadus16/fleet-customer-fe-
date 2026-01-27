import Image from 'next/image';

interface AboutSectionProps {
  greeting?: string;
  founders?: {
    name1: string;
    name2: string;
  };
  paragraphs: string[];
  image?: string;
  imageAlt?: string;
}

export function AboutSection({
  greeting = 'Hi,',
  founders = { name1: 'Dominique', name2: 'Cade King' },
  paragraphs,
  image = '/images/founders.jpg',
  imageAlt = 'Dominique and Cade King',
}: AboutSectionProps) {
  return (
    <section className="bg-white pb-20 pt-4">
      <div className="mx-auto max-w-[888px]">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:justify-between lg:gap-16">
          {/* Text Content */}
          <div className="max-w-[380px]">
            <p className="text-xs font-light leading-[1.61] text-slate-600">{greeting}</p>
            <p className="mt-4 text-xs font-light leading-[1.61] text-slate-600">
              We are{' '}
              <span className="font-semibold text-[#1a2332]">{founders.name1}</span> and{' '}
              <span className="font-semibold text-[#1a2332]">{founders.name2}</span>.
            </p>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="mt-4 text-xs font-light leading-[1.61] text-slate-600">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Image */}
          <div className="relative h-[285px] w-[381px] flex-shrink-0 overflow-hidden">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
