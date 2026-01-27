import { TestimonialCard } from './testimonial-card';

interface Testimonial {
  rating: number;
  quote: string;
  content: string;
  author: string;
  location: string;
  date: string;
}

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

export function TestimonialsSection({
  title = 'What Our Customers Say',
  subtitle = 'Hear directly from our Customers',
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <section className="bg-[#141543] px-16 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-bold tracking-tight-2 text-primary-light">{title}</p>
          <h2 className="mt-2 text-[36px] font-bold leading-[1.17] tracking-tight-2 text-white">
            {subtitle}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-20 flex justify-evenly">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              rating={testimonial.rating}
              quote={testimonial.quote}
              content={testimonial.content}
              author={testimonial.author}
              location={testimonial.location}
              date={testimonial.date}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
