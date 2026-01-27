'use client';

import { useState } from 'react';
import { AnnouncementBar, Header, Footer } from '@/components/layout';
import { BookingBar, FleetSearch, FleetGrid, Pagination } from '@/components/sections/fleet';
import { vehicles } from '@/data/vehicles';

const ITEMS_PER_PAGE = 12;

export default function FleetPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const totalResults = vehicles.length;
  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);

  // Get vehicles for current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentVehicles = vehicles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
      <main className="mx-auto max-w-6xl px-4 py-12">
        {/* Search Header */}
        <FleetSearch
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />

        {/* Vehicle Grid */}
        <div className="mt-10">
          <FleetGrid vehicles={currentVehicles} />
        </div>

        {/* Pagination */}
        <div className="mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={totalResults}
            resultsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
