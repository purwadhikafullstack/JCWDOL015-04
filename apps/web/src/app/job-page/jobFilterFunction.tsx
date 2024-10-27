import Flag from 'react-world-flags';
import { countryOptions } from '@/utils/format';

export const mappedCountryOptions = countryOptions.map((country) => ({
    value: country.code,
    label: (
      <div className="flex items-center p-2.5">
        <Flag
          code={country.code || 'XX'}
          alt={country.name}
          className="mr-2 w-6 h-4"
        />
        <span>{country.name}</span>
      </div>
    ),
  }));