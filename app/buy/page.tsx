import React, { useState, useEffect } from 'react';
import PropertyCard from '../../components/PropertyCard'; // Adjusted import path
import axios from 'axios';

const BuyPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/fetchProperties'); // Calling the Next.js API route
        setProperties(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch properties:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>Error fetching properties: {error.message}</p>;

  return (
    <div className="buy-page">
      <h1>Properties for Sale</h1>
      <div className="property-list">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default BuyPage;

