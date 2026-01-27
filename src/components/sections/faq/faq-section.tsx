import { FAQItem } from './faq-item';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  faqs: FAQ[];
}

export function FAQSection({
  title = 'Got any questions?',
  subtitle = 'Frequently Asked Questions',
  description = "Our Practical Fleet is clean, reliable vehicles for real Alaska adventures. No luxury markup, just honest transportation. We know these roads. We know these islands.",
  faqs,
}: FAQSectionProps) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[888px] px-4">
        <div className="flex gap-12">
          {/* Left Side - Title & Description */}
          <div className="w-[320px] flex-shrink-0">
            <p className="text-sm font-bold tracking-tight-2 text-primary-light">{title}</p>
            <h2 className="mt-2 text-[36px] font-bold leading-[1.17] tracking-tight-2 text-slate-900">
              {subtitle}
            </h2>
            <p className="mt-4 text-xs font-light leading-[1.61] text-slate-600">{description}</p>
          </div>

          {/* Right Side - FAQ Accordion */}
          <div className="flex-1">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                defaultOpen={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
