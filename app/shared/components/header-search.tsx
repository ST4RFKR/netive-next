'use client';

import { usePathname } from 'next/navigation';

import { SearchInput } from './search-input';
import { Location, Vehicle } from '@/app/generated/prisma';
import Link from 'next/link';

const Api = {
  car: {
    search: (query: string) => fetch(`/api/vehicle/search?query=${query}`).then((res) => res.json()),
  },
  location: {
    search: (query: string) => fetch(`/api/location/search?query=${query}`).then((res) => res.json()),
  },
};

export const HeaderSearch = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/vehicle')) {
    return (
      <SearchInput<Vehicle>
        onSearch={(query) => Api.car.search(query)}
        placeholderExamples={['CC1245DD', 'AB123-34CD', 'AB9876CD', 'AB45657CD']}
        renderItem={(car, onClick) => (
          <Link
            href={`/cars/${car.id}`}
            onClick={onClick}
            className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
          >
            {car.plate && <span>{car.plate}</span>}
            <span>{car.model}</span>
          </Link>
        )}
      />
    );
  }

  if (pathname.startsWith('/location')) {
    return (
      <SearchInput<Location>
        onSearch={(query) => Api.location.search(query)}
        placeholderExamples={['ТМФ', 'Пекарня', 'Мʼясокомбінат']}
        renderItem={(location, onClick) => (
          <Link
            href={`/location/${location.id}`}
            onClick={onClick}
            className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
          >
            <span>{location.name}</span>
          </Link>
        )}
      />
    );
  }


  return null;
};
