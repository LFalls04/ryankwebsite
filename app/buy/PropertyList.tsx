import { useEffect, useState } from 'react';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching properties when the component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Making a GET request to the API route you set up
        const response = await fetch('/api/zillow?endpoint=search&location=Los Angeles');
        const data = await response.json();

        if (response.ok) {
          // Setting the properties data if the fetch was successful
          setProperties(data.results || []);
        } else {
          throw new Error(data.error || 'Error fetching properties');
        }
      } catch (error) {
        // Handling errors during fetching
        setError(error.message);
      } finally {
        // Set loading to false after fetching is complete
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Conditional rendering based on loading or error states
  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>Error: {error}</p>;

  // Displaying the list of properties after data has been successfully fetched
  return (
    <div>
      <h1>Properties in Los Angeles</h1>
      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            <h3>{property.name}</h3>
            <p>Price: {property.price}</p>
            <p>Address: {property.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;
