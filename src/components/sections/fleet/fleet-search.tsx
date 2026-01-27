'use client';

import Image from 'next/image';

interface FleetSearchProps {
  title?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onFilterClick?: () => void;
}

export function FleetSearch({
  title = 'Pick your next ride from our fleet.',
  searchValue = '',
  onSearchChange,
  onFilterClick,
}: FleetSearchProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>

      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="flex items-center gap-3 border-b border-slate-300 pb-2">
          <Image
            src="/icons/fleet/search.svg"
            alt="Search"
            width={20}
            height={20}
          />
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-48 border-none bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        {/* Filter Button */}
        <button
          type="button"
          onClick={onFilterClick}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 transition-colors hover:bg-slate-50"
        >
          <Image
            src="/icons/fleet/filters.svg"
            alt="Filters"
            width={13}
            height={13}
          />
        </button>
      </div>
    </div>
  );
}
