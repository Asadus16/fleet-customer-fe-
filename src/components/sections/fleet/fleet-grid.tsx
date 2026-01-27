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
    <div className="grid grid-cols-4 gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          id={vehicle.id}
          name={vehicle.name}
          image={vehicle.image}
          location={vehicle.location}
          seats={vehicle.seats}
          transmission={vehicle.transmission}
          fuelType={vehicle.fuelType}
          pricePerDay={vehicle.pricePerDay}
        />
      ))}
    </div>
  );
}
