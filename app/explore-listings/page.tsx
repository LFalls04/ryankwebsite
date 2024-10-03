"use client"
import React, { useState, useEffect } from 'react';



const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '83fb3fb2ddmshb53ff5d54c36e01p1f857ajsncefe4e2a5c68',
    'x-rapidapi-host': 'zillow56.p.rapidapi.com'
  }
};

const ExploreListings = () => {
  const [listings, setListings] = useState([]); // Ensure listings starts as an array
  const [loading, setLoading] = useState(true); // Loading state

 
  const longitude = -87.5711;
  const latitude = 37.9716;

  // Fetch data using longitude and latitude
  useEffect(() => {
    const fetchListingsByCoordinates = async () => {
      setLoading(true); // Set loading to true before fetching

      try {
        const url = 'https://zillow56.p.rapidapi.com/search_coordinates?status=forSale&output=json&sort=priorityscore&listing_type=by_agent&isLotLand=false&doz=any&long=-87.5711&lat=37.9716&d=120' // Build URL using lat and lon
        const response = await fetch(url, options);
        const result = await response.json();

        // Log the full result to understand its structure
        console.log(Array.isArray(result.results));
        console.log(result);
        
        // Check if result is an array and set it to listings
        if (result.results) {
          // If listings are nested inside the result object, extract them
          setListings(result.results);
        } else {
          // If the result structure is unexpected, set listings to an empty array
          setListings([]);
        }

        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchListingsByCoordinates();
  }, []); // Run effect only once when the component mounts

  return (
    <div>
      <h1>Explore Listings Near Coordinates: Lat {latitude}, Lon {longitude}</h1>
      <p>Browse listings from properties near this area.</p>

      {/* Display listings or loading indicator */}
      {loading ? (
        <p>Loading listings...</p>
      ) : (
        <ul>
          {Array.isArray(listings) && listings.length > 0 ? (
            listings.map((listing, index) => (
              <li key={index}>
                <p><strong>Address:</strong> {listing.streetAddress}</p>
                <p><strong>Price:</strong> {listing.price}</p>
                <div>
                  <strong>Images:</strong>
                  {listing.imgSrc && 1 ? (
                    <div>
                    
                    <img src={listing.imgSrc} width="200px" />
                  
                    </div>
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
      )}
    </div>
  );
};

export default ExploreListings;
