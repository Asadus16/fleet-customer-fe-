'use client';

import Image from 'next/image';

interface CustomerDetailsSectionProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onCountryCodeChange: (value: string) => void;
}

export function CustomerDetailsSection({
  firstName,
  lastName,
  email,
  phone,
  countryCode,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPhoneChange,
  onCountryCodeChange,
}: CustomerDetailsSectionProps) {
  return (
    <section>
      <h2 className="font-manrope text-base font-semibold leading-none tracking-tight-2 text-[#141543]">Customer Details</h2>

      <div className="mt-5 grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-8">
        {/* First Name */}
        <div>
          <label className="block text-xs text-slate-500">First Name</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={firstName}
            onChange={(e) => onFirstNameChange(e.target.value)}
            className="mt-3 w-full border-b border-slate-200 pb-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-xs text-slate-500">Last Name</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={lastName}
            onChange={(e) => onLastNameChange(e.target.value)}
            className="mt-3 w-full border-b border-slate-200 pb-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs text-slate-500">Email Address</label>
          <div className="mt-3 flex h-9 items-end border-b border-slate-200 pb-2">
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              className="w-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs text-slate-500">Phone Number</label>
          <div className="mt-3 flex h-9 items-end gap-2 border-b border-slate-200 pb-2">
            <div className="flex items-center gap-1.5 rounded-[3px] bg-[#eeeeee] px-2 py-1.5">
              <Image
                src="/icons/booking/country/usa.svg"
                alt="US"
                width={20}
                height={20}
                className="rounded-full"
              />
              <select
                value={countryCode}
                onChange={(e) => onCountryCodeChange(e.target.value)}
                className="bg-transparent text-sm text-slate-700 focus:outline-none w-12"
              >
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+91">+91</option>
              </select>
            </div>
            <input
              type="tel"
              placeholder="Enter Your Phone"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              className="flex-1 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
