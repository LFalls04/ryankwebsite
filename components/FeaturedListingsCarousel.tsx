"use client"

import React from "react";
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



interface Listing {
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
}

const listings: Listing[] = [];

const fetchListingsByCoordinates = async () => {

  try {
    const url = 'https://zillow56.p.rapidapi.com/search_coordinates?status=forSale&output=json&sort=featured&listing_type=by_agent&isLotLand=false&doz=any&long=-87.5711&lat=37.9716&d=120' // Build URL using lat and lon
    const response = await fetch(url, options);
    const result = await response.json();

    // Log the full result to understand its structure
    console.log(Array.isArray(result.results));
    console.log(result);
    
    // Check if result is an array and set it to listings
    if (result.results) {
      // If listings are nested inside the result object, extract them
    for (let i = 0; i < 3; i++) {
      listings.push(new listings(i, result.results[i].imgSrc, result.results[i].streetAddress, result.results[i].homeType, result.results[i].price));
      listings[i].image = result.results[i].imgSrc;
      
      }
    } else {
      // If the result structure is unexpected, set listings to an empty array
     
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchListingsByCoordinates();

const FeaturedListingsCarousel: React.FC = () => {
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
                <img src={listing.image}  />
                </div>
                <div className="p-4 mb-12">
                  <h3 className="text-xl font-bold text-[#002352] mb-2">
                    {listing.title}
                  </h3>
                  <p className="text-gray-600">{listing.description}</p>
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
