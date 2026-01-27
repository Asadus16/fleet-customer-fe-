'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';

export default function TermsAndConditionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const checkbox = searchParams.get('checkbox');

  const handleAccept = () => {
    if (checkbox) {
      // Use sessionStorage to pass the acceptance state
      sessionStorage.setItem('termsAccepted', checkbox);
    }
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-white">
      <Header showBorderBottom />

      <main className="mx-auto max-w-7xl px-8 py-8">
        {/* Go Back Link */}
        <Link
          href="/fleet"
          className="inline-flex items-center text-sm font-medium text-primary underline hover:text-primary-hover"
        >
          Go Back
        </Link>

        {/* Title Section */}
        <div className="mt-6 flex items-start justify-between">
          <div>
            <h1 className="font-manrope text-2xl font-semibold leading-none tracking-tight-2 text-[#141543]">
              Terms and Conditions
            </h1>
            <p className="mt-2 text-xs font-light leading-[1.61] text-slate-500">
              Our Practical Fleet is clean, reliable vehicles for real Alaska adventures. No luxury markup, just honest transportation. We know these roads. We know these islands.
            </p>
          </div>
          <Button variant="primary" className="gap-2.5">
            <Image src="/icons/download.svg" alt="Download" width={15} height={17} />
            Download PDF
          </Button>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-slate-200" />

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Section 1 - Rental Agreement */}
          <section>
            <h2 className="font-manrope text-base font-semibold leading-none tracking-tight-2 text-[#141543]">1. Rental Agreement</h2>
            <div className="mt-4 space-y-4 text-xs font-light leading-[1.61] text-slate-600">
              <p>
                This Rental Agreement is entered into between Kings Car Rental (&quot;Company&quot;) and the individual or entity identified as the Renter. By signing this agreement or completing a reservation, the Renter agrees to be bound by all terms and conditions stated herein. The rental period begins at the time of vehicle pickup and ends upon return to the designated Kings Car Rental location in Ketchikan, Alaska.
              </p>
              <p>
                The Renter acknowledges receipt of the vehicle in good operating condition and agrees to return it in the same condition, subject to normal wear and tear. Any damage, missing parts, or excessive dirt will be assessed and charged to the Renter at current repair or replacement rates.
              </p>
            </div>
          </section>

          {/* Section 2 - Driver Requirements */}
          <section>
            <h2 className="font-manrope text-base font-semibold leading-none tracking-tight-2 text-[#141543]">2. Driver Requirements</h2>
            <div className="mt-4 space-y-4 text-xs font-light leading-[1.61] text-slate-600">
              <p>
                All drivers must be at least 21 years of age and possess a valid driver&apos;s license that has been held for a minimum of one year. Drivers under 25 years of age may be subject to a young driver surcharge. International renters must present a valid passport and international driving permit in addition to their home country license.
              </p>
              <p>
                Additional drivers must be registered at the time of rental and meet all driver requirements. An additional driver fee applies per driver per day. Only authorized drivers listed on the rental agreement are permitted to operate the vehicle. Unauthorized drivers void all insurance coverage.
              </p>
            </div>
          </section>

          {/* Section 3 - Vehicle Use & Restrictions */}
          <section>
            <h2 className="font-manrope text-base font-semibold leading-none tracking-tight-2 text-[#141543]">3. Vehicle Use & Restrictions</h2>
            <div className="mt-4 space-y-4 text-xs font-light leading-[1.61] text-slate-600">
              <p>
                The vehicle may only be driven on paved roads and designated gravel roads within the Ketchikan area unless specifically authorized for off-road use. The vehicle must remain within the designated rental area and may not be transported off Revillagigedo Island without prior written consent from Kings Car Rental.
              </p>
              <p>
                The following uses are strictly prohibited: driving under the influence of alcohol or drugs, racing or reckless driving, towing or pushing any vehicle, transporting hazardous materials, smoking in the vehicle, transporting more passengers than the vehicle is designed to carry, and using the vehicle for any illegal purpose.
              </p>
              <p>
                Given Alaska&apos;s unique driving conditions, Renters should exercise extra caution during winter months. Chains may be required during certain conditions and are available for rental. The Renter is responsible for checking road conditions before travel.
              </p>
            </div>
          </section>

          {/* Section 4 - Insurance & Liability */}
          <section>
            <h2 className="font-manrope text-base font-semibold leading-none tracking-tight-2 text-[#141543]">4. Insurance & Liability</h2>
            <div className="mt-4 space-y-4 text-xs font-light leading-[1.61] text-slate-600">
              <p>
                Basic liability insurance is included with all rentals as required by Alaska state law. This coverage provides minimum protection for third-party bodily injury and property damage. The Renter remains responsible for any damage to the rental vehicle up to the full value of the vehicle unless additional coverage is purchased.
              </p>
              <p>
                Optional Collision Damage Waiver (CDW) reduces the Renter&apos;s liability for damage to the rental vehicle. Premium Protection packages include CDW, theft protection, personal accident insurance, and 24/7 roadside assistance. Insurance does not cover damage caused by prohibited uses, driving on unauthorized roads, or negligence.
              </p>
              <p>
                In the event of an accident, the Renter must immediately contact local authorities and Kings Car Rental. A police report is required for all accidents. Failure to report an accident may void insurance coverage and result in full liability to the Renter.
              </p>
            </div>
          </section>

          {/* Section 5 - Payment & Cancellation */}
          <section>
            <h2 className="font-manrope text-base font-semibold leading-none tracking-tight-2 text-[#141543]">5. Payment & Cancellation</h2>
            <div className="mt-4 space-y-4 text-xs font-light leading-[1.61] text-slate-600">
              <p>
                A valid credit card in the Renter&apos;s name is required at the time of pickup. A security deposit will be held on the card and released within 7-10 business days after the vehicle is returned in satisfactory condition. Debit cards may be accepted with additional verification and a higher deposit requirement.
              </p>
              <p>
                Cancellations made more than 48 hours before the scheduled pickup time will receive a full refund. Cancellations within 48 hours are subject to a one-day rental charge. No-shows will be charged the full reservation amount. Early returns are not eligible for refunds of unused rental days.
              </p>
              <p>
                Late returns will be charged at 1.5 times the daily rate for each hour past the scheduled return time, up to a maximum of one additional day. Extensions must be requested and approved before the scheduled return time and are subject to vehicle availability.
              </p>
            </div>
          </section>

          {/* Section 6 - Vehicle Return */}
          <section>
            <h2 className="font-manrope text-base font-semibold leading-none tracking-tight-2 text-[#141543]">6. Vehicle Return</h2>
            <div className="mt-4 space-y-4 text-xs font-light leading-[1.61] text-slate-600">
              <p>
                The vehicle must be returned to the Kings Car Rental location specified in the rental agreement by the agreed-upon date and time. The vehicle should be returned with the same fuel level as at pickup; otherwise, a refueling charge plus service fee will apply.
              </p>
              <p>
                A walk-around inspection will be conducted upon return. The Renter is encouraged to be present during this inspection. Any new damage not documented at pickup will be the responsibility of the Renter. Interior cleaning fees apply if the vehicle is returned excessively dirty.
              </p>
              <p>
                By accepting these terms, the Renter acknowledges understanding and agreement to all conditions. Kings Car Rental reserves the right to modify these terms with reasonable notice. Alaska state law governs this agreement.
              </p>
            </div>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex justify-end gap-4">
          <Button variant="dark" onClick={handleCancel} className="min-w-[180px] px-12 py-4">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAccept} className="min-w-[180px] px-12 py-4">
            Accept
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
