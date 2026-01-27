'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Fleet', href: '/fleet' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact', href: '/contact' },
];

interface HeaderProps {
  phoneNumber?: string;
  showBorderBottom?: boolean;
}

export function Header({ phoneNumber = '+1 907-617-3765', showBorderBottom = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={`bg-white ${showBorderBottom ? 'border-b border-[#c0c4c9]' : ''}`}>
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo + Navigation */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logos/website-logo.svg"
              alt="Kings Car Rental"
              width={72}
              height={72}
              className="h-18 w-auto"
            />
          </Link>

          {/* Desktop Navigation - Next to Logo */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-semibold tracking-tight-2 text-slate-700 transition-colors hover:text-primary-light"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Phone & Book Now */}
        <div className="hidden items-center gap-6 md:flex">
          <a
            href={`tel:${phoneNumber.replace(/\s/g, '')}`}
            className="text-xs font-semibold tracking-tight-2 text-slate-700 hover:text-primary-light"
          >
            {phoneNumber}
          </a>
          <div className="h-6 w-px bg-slate-200" />
          <Link
            href="/book"
            className="rounded-lg bg-primary px-10 py-3.5 text-xs font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="flex flex-col px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-xs font-semibold tracking-tight-2 text-slate-700 hover:text-primary-light"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${phoneNumber.replace(/\s/g, '')}`}
              className="py-3 text-xs font-semibold tracking-tight-2 text-slate-700 hover:text-primary-light"
            >
              {phoneNumber}
            </a>
            <Link
              href="/book"
              className="mt-2 rounded-lg bg-primary px-6 py-3 text-center text-xs font-medium text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
