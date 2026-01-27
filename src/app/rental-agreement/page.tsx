'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';

export default function RentalAgreementPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const checkbox = searchParams.get('checkbox');

  const handleSave = () => {
    if (checkbox) {
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
              Rental Agreement
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

        {/* Paper Preview Area */}
        <div className="rounded-lg bg-[#f9fafb] p-8">
          <div className="mx-auto max-w-3xl space-y-8">
            {/* Page 1 */}
            <div
              className="relative bg-white"
              style={{
                aspectRatio: '8.5/11',
                boxShadow: '4px 4px 12px rgba(0, 0, 0, 0.15), -4px 0 12px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div className="absolute inset-0 overflow-auto p-12">
                <div className="font-kameron text-xs leading-none tracking-wide-12 text-black">
                  {/* Page Number */}
                  <div className="mb-8 text-right">
                    <span>1.</span>
                  </div>

                  {/* Scene Heading */}
                  <p className="mb-6 uppercase">EXT. KINGS CAR RENTAL - KETCHIKAN, ALASKA - DAY</p>

                  {/* Action */}
                  <p className="mb-6">
                    A pristine rental lot sits at the edge of the harbor. Mountains rise in the distance, their peaks dusted with snow. VEHICLES of various makes line the lot in neat rows.
                  </p>

                  {/* Character and Dialogue */}
                  <p className="mb-1 text-center uppercase">RENTAL AGENT</p>
                  <p className="mx-auto mb-6 max-w-md text-center">
                    Welcome to Kings Car Rental. Before we hand over the keys, we need to go over the rental agreement.
                  </p>

                  {/* Transition */}
                  <p className="mb-6 text-right">CUT TO:</p>

                  {/* Scene Heading */}
                  <p className="mb-6 uppercase">INT. RENTAL OFFICE - CONTINUOUS</p>

                  {/* Action */}
                  <p className="mb-6">
                    The RENTER sits across from the Agent at a wooden desk. Documents spread between them. A map of Revillagigedo Island hangs on the wall.
                  </p>

                  {/* Character and Dialogue */}
                  <p className="mb-1 text-center uppercase">RENTAL AGENT (CONT&apos;D)</p>
                  <p className="mx-auto mb-6 max-w-md text-center">
                    This agreement is between Kings Car Rental and yourself. By signing, you agree to all terms stated within.
                  </p>

                  {/* Character and Dialogue */}
                  <p className="mb-1 text-center uppercase">RENTER</p>
                  <p className="mx-auto mb-6 max-w-md text-center">
                    What are the main requirements I should know about?
                  </p>

                  {/* Character and Dialogue */}
                  <p className="mb-1 text-center uppercase">RENTAL AGENT</p>
                  <p className="mx-auto mb-6 max-w-md text-center">
                    All drivers must be at least twenty-one years old with a valid license held for minimum one year. Under twenty-five? There&apos;s a surcharge.
                  </p>

                  {/* Transition */}
                  <p className="text-right">BACK TO:</p>
                </div>
              </div>
            </div>

            {/* Page 2 */}
            <div
              className="relative bg-white"
              style={{
                aspectRatio: '8.5/11',
                boxShadow: '4px 4px 12px rgba(0, 0, 0, 0.15), -4px 0 12px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div className="absolute inset-0 overflow-auto p-12">
                <div className="font-kameron text-xs leading-none tracking-wide-12 text-black">
                  {/* Page Number */}
                  <div className="mb-8 text-right">
                    <span>2.</span>
                  </div>

                  {/* Scene Heading */}
                  <p className="mb-6 uppercase">INT. RENTAL OFFICE - CONTINUOUS</p>

                  {/* Action */}
                  <p className="mb-6">
                    The Agent pulls out a laminated map showing the island&apos;s road network. Red lines mark the boundaries.
                  </p>

                  {/* Character and Dialogue */}
                  <p className="mb-1 text-center uppercase">RENTAL AGENT</p>
                  <p className="mx-auto mb-6 max-w-md text-center">
                    The vehicle stays on Revillagigedo Island. Paved roads and designated gravel roads only. No ferrying off-island without written consent.
                  </p>

                  {/* Character and Dialogue */}
                  <p className="mb-1 text-center uppercase">RENTER</p>
                  <p className="mx-auto mb-6 max-w-md text-center">
                    What about insurance coverage?
                  </p>

                  {/* Character and Dialogue */}
                  <p className="mb-1 text-center uppercase">RENTAL AGENT</p>
                  <p className="mx-auto mb-6 max-w-md text-center">
                    Basic liability is included per Alaska law. Covers third-party injury and property damage. You&apos;re responsible for vehicle damage unless you purchase the Collision Damage Waiver.
                  </p>

                  {/* Action */}
                  <p className="mb-6">
                    The Agent slides a brochure across the desk showing Premium Protection options.
                  </p>

                  {/* Character and Dialogue */}
                  <p className="mb-1 text-center uppercase">RENTAL AGENT (CONT&apos;D)</p>
                  <p className="mx-auto mb-6 max-w-md text-center">
                    Premium Protection includes CDW, theft protection, personal accident insurance, and twenty-four-seven roadside assistance.
                  </p>

                  {/* Transition */}
                  <p className="mb-6 text-right">CUT TO:</p>

                  {/* Scene Heading */}
                  <p className="mb-6 uppercase">EXT. RENTAL LOT - LATER</p>

                  {/* Action */}
                  <p className="mb-6">
                    The Renter and Agent walk toward a vehicle. The Agent carries a clipboard and performs a walk-around inspection.
                  </p>
                </div>
              </div>
            </div>

            {/* Page 3 */}
            <div
              className="relative bg-white"
              style={{
                aspectRatio: '8.5/11',
                boxShadow: '4px 4px 12px rgba(0, 0, 0, 0.15), -4px 0 12px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div className="absolute inset-0 overflow-auto p-12">
                <div className="font-kameron text-xs leading-none tracking-wide-12 text-black">
                  {/* Page Number */}
                  <div className="mb-8 text-right">
                    <span>3.</span>
                  </div>

                  {/* Character and Dialogue */}
                  <p className="mb-1 text-center uppercase">RENTAL AGENT</p>
                  <p className="mx-auto mb-6 max-w-md text-center">
                    Payment terms are straightforward. Valid credit card required at pickup. Security deposit held and released within seven to ten business days after satisfactory return.
                  </p>

                  {/* Character and Dialogue */}
                  <p className="mb-1 text-center uppercase">RENTER</p>
                  <p className="mx-auto mb-6 max-w-md text-center">
                    And if I need to cancel?
                  </p>

                  {/* Character and Dialogue */}
                  <p className="mb-1 text-center uppercase">RENTAL AGENT</p>
                  <p className="mx-auto mb-6 max-w-md text-center">
                    Forty-eight hours notice gets you a full refund. Less than that, one day charge. No-shows pay full reservation amount.
                  </p>

                  {/* Action */}
                  <p className="mb-6">
                    The Agent hands the Renter the keys. Both stand beside the vehicle.
                  </p>

                  {/* Character and Dialogue */}
                  <p className="mb-1 text-center uppercase">RENTAL AGENT (CONT&apos;D)</p>
                  <p className="mx-auto mb-6 max-w-md text-center">
                    Return it here, same fuel level as now. Late returns charged at one-point-five times daily rate per hour.
                  </p>

                  {/* Action */}
                  <p className="mb-6">
                    The Renter nods, signs the agreement, and accepts the keys.
                  </p>

                  {/* Character and Dialogue */}
                  <p className="mb-1 text-center uppercase">RENTER</p>
                  <p className="mx-auto mb-6 max-w-md text-center">
                    I understand and agree to all terms.
                  </p>

                  {/* Character and Dialogue */}
                  <p className="mb-1 text-center uppercase">RENTAL AGENT</p>
                  <p className="mx-auto mb-6 max-w-md text-center">
                    Welcome to Kings Car Rental. Enjoy Alaska.
                  </p>

                  {/* Transition */}
                  <p className="mb-6 text-right">FADE OUT.</p>

                  {/* Footer */}
                  <p className="mt-12 text-center uppercase">THE END</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex justify-end gap-4">
          <Button variant="dark" onClick={handleCancel} className="min-w-[180px] px-12 py-4">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} className="min-w-[180px] px-12 py-4">
            Save
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
