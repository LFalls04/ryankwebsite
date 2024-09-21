import { useEffect, useState } from 'react';

interface Property {
  id: number;
  title: string;
  address: string;
  price: string;
}

function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    // Fetch property data from your backend or API
    fetch('/api/properties') // You should implement an API route to fetch this data
      .then(response => response.json())
      .then(data => setProperties(data))
      .catch(error => console.error('Error fetching properties:', error));
  }, []);

  return (
    <div>
      <h1>Property Listings</h1>
      {properties.length > 0 ? (
        <ul>
          {properties.map((property) => (
            <li key={property.id}>
              <h2>{property.title}</h2>
              <p>{property.address}</p>
              <p>{property.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No properties available</p>
      )}
    </div>
  );
}

export default PropertyList;
