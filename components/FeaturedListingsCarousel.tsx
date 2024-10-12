"use client"

import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import Image from "next/image";

// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '83fb3fb2ddmshb53ff5d54c36e01p1f857ajsncefe4e2a5c68',
    'x-rapidapi-host': 'zillow56.p.rapidapi.com'
  }
};

const FeaturedListingsCarousel: React.FC = () => {
    const [listings, setListings] = useState([]); // Ensure listings starts as an array
    const [loading, setLoading] = useState(true); // Loading state


    const longitude = -87.5711;
    const latitude = 37.9716;

    useEffect(() => {
    const fetchListingsByCoordinates = async () => {
      setLoading(true); // Set loading to true before fetching

      try {
        const url = `https://zillow56.p.rapidapi.com/search_coordinates?status=forSale&output=json&sort=featured&listing_type=by_agent&isLotLand=false&doz=any&long=${longitude}&lat=${latitude}&d=120`
        const response = await fetch(url, options);
        const result = await response.json();
        
        // Check if result is an array and set it to listings
        if (result.results) {
          result.results.length = 3;
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
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3, // Number of cards to show at once
    slidesToScroll: 1, // Number of cards to scroll at once
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


  return (
    <section id="featuredlistings" className="bg-gray-100 py-4">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#002352]">
          Featured Listings
        </h2>
        <Slider {...settings}>
          {listings.map((listing) => (
            <div key={listing.id} className="p-4">
              <div className="card hover:shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
                <div className="relative h-65">
                <a href={`https://www.zillow.com/homedetails/${listing.zpid}_zpid`} target="_blank" rel="noopener noreferrer">
                      <img src={listing.imgSrc} alt="Listing" />
                    </a>
                </div>
                <div className="p-4 mb-12">
                  <h3 className="text-xl font-bold text-[#002352] mb-2">
                    {listing.streetAddress}
                  </h3>
                  <p className="text-gray-600">{listing.streetAddress}</p>
                  <p className="text-lg font-semibold text-[#87b3ff] mt-4">
                    {listing.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default FeaturedListingsCarousel;
