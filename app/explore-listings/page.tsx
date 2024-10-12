"use client";
import React, { useState, useEffect } from 'react';

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '83fb3fb2ddmshb53ff5d54c36e01p1f857ajsncefe4e2a5c68',
    'x-rapidapi-host': 'zillow56.p.rapidapi.com'
  }
};

const ExploreListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(0); // Track the total number of pages

  const longitude = -87.5711;
  const latitude = 37.9716;

  useEffect(() => {
    const fetchListingsByCoordinates = async (page) => {
      setLoading(true);

      try {
        const url = `https://zillow56.p.rapidapi.com/search_coordinates?status=forSale&output=json&sort=priorityscore&listing_type=by_agent&isLotLand=false&doz=any&long=${longitude}&lat=${latitude}&d=120&page=${page}`;
        const response = await fetch(url, options);
        const result = await response.json();

        console.log(result); // Log the full result to understand its structure

        if (result.results) {
          setListings(result.results);
          setTotalPages(result.totalPages); // Set total pages from the API response
        } else {
          setListings([]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchListingsByCoordinates(currentPage); // Pass currentPage to the fetch function
  }, [currentPage]); // Run effect whenever currentPage changes

  // Function to handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
  <div className="container">
    <h1>Explore Listings Near Coordinates: Lat {latitude}, Lon {longitude}</h1>
    <p>Browse listings from properties near this area.</p>

    {loading ? (
      <p>Loading listings...</p>
    ) : (
      <>
        <ul>
          {Array.isArray(listings) && listings.length > 0 ? (
            listings.map((listing, index) => (
              <li key={index}>
                <p><strong>Address:</strong> {listing.streetAddress}</p>
                <p><strong>Price:</strong> {listing.price}</p>
                <div>
                  <strong>Images:</strong>
                  {listing.imgSrc ? (
                    <a href={`https://www.zillow.com/homedetails/${listing.zpid}_zpid`} target="_blank" rel="noopener noreferrer">
                      <img src={listing.imgSrc} alt="Listing" />
                    </a>
                  ) : (
                    <p>No images available</p>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p>No listings found</p>
          )}
        </ul>

        {/* Enhanced pagination controls */}
        <div className="pagination">
          {(() => {
            const pageNumbers = [];
            const maxPagesToShow = 5; // Number of pages before and after current page
            const startPage = Math.max(1, currentPage - maxPagesToShow);
            const endPage = Math.min(totalPages, currentPage + maxPagesToShow);

            // Add "..." to indicate skipped pages when needed
            if (startPage > 1) {
              pageNumbers.push(1);
              if (startPage > 2) pageNumbers.push('...'); // Indicate skipped pages
            }

            for (let i = startPage; i <= endPage; i++) {
              pageNumbers.push(i);
            }

            if (endPage < totalPages) {
              if (endPage < totalPages - 1) pageNumbers.push('...'); // Indicate skipped pages
              pageNumbers.push(totalPages);
            }

            return pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                disabled={currentPage === number}
              >
                {number}
              </button>
            ));
          })()}

          <span className="page-indicator">Page {currentPage} of {totalPages}</span>
        </div>
      </>
    )}
  </div>
);
};

export default ExploreListings;