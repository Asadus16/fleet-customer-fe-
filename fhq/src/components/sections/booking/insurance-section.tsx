'use client';

import Image from 'next/image';

interface InsuranceOption {
  id: string;
  title: string;
  price: number;
  description?: string;
  features?: string[];
}

interface InsuranceSectionProps {
  options: InsuranceOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function InsuranceSection({ options, selectedId, onSelect }: InsuranceSectionProps) {
  return (
    <section>
      <h2 className="font-manrope text-base font-semibold leading-none tracking-tight-2 text-[#141543]">Insurance</h2>

      <div className="mt-5 -mx-4 px-4 overflow-x-auto md:mx-0 md:px-0 md:overflow-visible">
        <div className="flex gap-4 md:grid md:grid-cols-3">
        {options.map((option, index) => (
          <div
            key={option.id}
            className={`relative cursor-pointer rounded-lg border px-3 py-2 transition-colors min-w-[200px] min-h-[180px] flex-shrink-0 md:min-w-0 md:flex-shrink ${
              selectedId === option.id
                ? 'border-primary bg-primary/5'
                : 'border-[#f4f4f4] hover:border-slate-300'
            }`}
            onClick={() => onSelect(option.id)}
          >
            {/* Checkbox */}
            <div className="absolute right-2 top-2">
              <div
                className={`flex h-4 w-4 items-center justify-center rounded border ${
                  selectedId === option.id
                    ? 'border-primary bg-primary'
                    : 'border-slate-900 bg-white'
                }`}
              >
                {selectedId === option.id && (
                  <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* Shield Icon - reduced size */}
            <Image
              src="/icons/booking/shield.svg"
              alt="Insurance"
              width={14}
              height={14}
              className="mb-1"
            />

            {/* Title */}
            <h3 className="text-sm font-medium text-slate-900">{option.title}</h3>

            {/* Price - different colors based on option */}
            <div className="mt-1">
              <span className={`text-xl font-bold leading-none tracking-tight-3 ${
                index === 0 ? 'text-[#9d9ca3]' : 'text-[#2873ac]'
              }`}>
                ${option.price.toFixed(2)}
              </span>
              <span className="text-xs text-slate-500">/day</span>
            </div>

            {/* Breaker */}
            <div className="my-2 h-px w-full bg-[#f4f4f4]" />

            {/* Features */}
            {option.features && option.features.length > 0 && (
              <ul className="mt-2 space-y-0.5">
                {option.features.map((feature, idx) => (
                  <li key={idx} className="text-xs text-slate-500">
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
