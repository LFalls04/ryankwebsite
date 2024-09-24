"use client";
import { useEffect, useState } from "react";
interface Property {
  zpid: string;
  address: {
    streetAddress: string;
    city: string;
    state: string;
    zipcode: string;
  };
  price: number;
  bathrooms: number;
  bedrooms: number;
}
export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // This is just an example. You'd need to implement a way to get multiple property IDs.
        const propertyIds = ["124523", "2345678", "3456789"];
        const fetchedProperties = await Promise.all(
          propertyIds.map(async (zpid) => {
            const response = await fetch(`/api/property?zpid=${zpid}`);
            if (!response.ok) throw new Error(`Failed to fetch property with zpid: ${zpid}`);
            const data: Property = await response.json();
            return data;
          })
        );
        setProperties(fetchedProperties);
      } catch (err) {
        setError(err.message || "Error fetching properties");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <h1>Property Listings</h1>
      {properties.length > 0 ? (
        <ul>
          {properties.map((property) => (
            <li key={property.zpid}>
              <h2>{property.address.streetAddress}</h2>
              <p>{`${property.address.city}, ${property.address.state} ${property.address.zipcode}`}</p>
              <p>Price: ${property.price.toLocaleString()}</p>
              <p>{`${property.bedrooms} bed, ${property.bathrooms} bath`}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No properties available</p>
      )}
    </div>
  );
}
