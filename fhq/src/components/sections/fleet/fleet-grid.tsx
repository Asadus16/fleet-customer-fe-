import { VehicleCard } from './vehicle-card';

interface Vehicle {
  id: string;
  name: string;
  image: string;
  location: string;
  seats: number;
  transmission: string;
  fuelType: string;
  pricePerDay: number;
}

interface FleetGridProps {
  vehicles: Vehicle[];
}

export function FleetGrid({ vehicles }: FleetGridProps) {
  return (
    <div className="flex flex-col items-center gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {vehicles.map((vehicle) => (
        <div key={vehicle.id} className="w-full max-w-70 sm:max-w-none">
          <VehicleCard
            id={vehicle.id}
            name={vehicle.name}
            image={vehicle.image}
            location={vehicle.location}
            seats={vehicle.seats}
            transmission={vehicle.transmission}
            fuelType={vehicle.fuelType}
            pricePerDay={vehicle.pricePerDay}
          />
        </div>
      ))}
    </div>
  );
}
