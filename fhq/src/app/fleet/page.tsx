'use client';

import { useState } from 'react';
import { AnnouncementBar, Header, Footer } from '@/components/layout';
import {
  BookingBar,
  FleetSearch,
  FleetGrid,
  Pagination,
} from '@/components/sections/fleet';
import { useFleets } from '@/hooks/useFleets';

const ITEMS_PER_PAGE = 12;

export default function FleetPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const { data, isLoading, error } = useFleets(currentPage, searchValue);

  const vehicles = data?.results || [];
  const totalResults = data?.count || 0;
  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Announcement Bar */}
      <AnnouncementBar
        message="Looking for Essential Oils? Head on"
        linkText="Here Now!"
        linkHref="#"
      />

      {/* Header */}
      <Header />

      {/* Booking Bar */}
      <BookingBar />

      {/* Main Content */}
      <main className="mx-auto max-w-6xl mobile-section-padding py-8 md:py-12 min-h-[60vh]">
        {/* Search Header */}
        <FleetSearch
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />

        {/* Loading State */}
        {isLoading && (
          <div className="mt-10 flex justify-center items-center min-h-[40vh]">
            <div className="text-slate-500">Loading vehicles...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-10 flex justify-center">
            <div className="text-red-500">
              Failed to load vehicles. Please try again.
            </div>
          </div>
        )}

        {/* Vehicle Grid */}
        {!isLoading && !error && (
          <>
            <div className="mt-10">
              <FleetGrid vehicles={vehicles} />
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalResults={totalResults}
                  resultsPerPage={ITEMS_PER_PAGE}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
