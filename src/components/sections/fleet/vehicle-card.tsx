import Image from 'next/image';
import Link from 'next/link';

interface VehicleCardProps {
  id: string;
  name: string;
  image: string;
  location: string;
  seats: number;
  transmission: string;
  fuelType: string;
  pricePerDay: number;
}

export function VehicleCard({
  id,
  name,
  image,
  location,
  seats,
  transmission,
  fuelType,
  pricePerDay,
}: VehicleCardProps) {
  return (
    <Link href={`/fleet/${id}/book`} className="group block">
      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white transition-shadow hover:shadow-lg">
        {/* Image */}
        <div className="relative aspect-[262/183] w-full overflow-hidden bg-slate-100">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="px-4 py-3 text-center">
          <h3 className="text-lg font-medium tracking-tight-3 text-slate-900">{name}</h3>
          <p className="text-2xs tracking-tight-3 text-slate-500">{location}</p>

          {/* Specs */}
          <div className="mt-2 flex items-center justify-center gap-2 border-t border-slate-100 pt-2">
            <div className="flex items-center gap-1">
              <Image src="/icons/home/choose-us/avatar.svg" alt="Seats" width={10} height={10} />
              <span className="text-[8px] font-normal leading-none text-slate-500">{seats} Seats</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1">
              <Image src="/icons/home/choose-us/transmission.svg" alt="Transmission" width={10} height={10} />
              <span className="text-[8px] font-normal leading-none text-slate-500">{transmission}</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1">
              <Image src="/icons/home/choose-us/circles.svg" alt="Fuel" width={10} height={10} />
              <span className="text-[8px] font-normal leading-none text-slate-500">{fuelType}</span>
            </div>
          </div>

          {/* Price */}
          <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2">
            <span className="text-xs font-semibold text-slate-900">Standard Price</span>
            <div>
              <span className="text-xl font-bold text-slate-900">${pricePerDay.toFixed(2)}</span>
              <span className="text-2xs text-slate-500">/day</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
