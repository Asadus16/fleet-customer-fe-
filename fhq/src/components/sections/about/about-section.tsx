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
    <section id="about" className="bg-white pb-24 pt-8 sm:pb-16 sm:pt-4 lg:pb-20 scroll-mt-20">
      <div className="mx-auto max-w-222 mobile-section-padding lg:px-0">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:justify-between lg:gap-16">
          {/* Text Content */}
          <div className="w-full lg:max-w-95">
            <p className="section-paragraph text-slate-600">{greeting}</p>
            <p className="mt-4 section-paragraph text-slate-600">
              We are{' '}
              <span className="font-semibold text-[#1a2332]">{founders.name1}</span> and{' '}
              <span className="font-semibold text-[#1a2332]">{founders.name2}</span>.
            </p>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="mt-4 section-paragraph text-slate-600">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Image */}
          <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden lg:aspect-auto lg:h-71.25 lg:w-95.25">
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
