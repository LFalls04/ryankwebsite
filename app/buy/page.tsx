import { useEffect, useState } from 'react';

const BuyPage = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch('/api/fetchProperties');
                const data = await response.json();
                setProperties(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    return (
        <div>
            <h1>Buy Page</h1>
            <div>
                {properties.length > 0 ? (
                    properties.map((property, index) => (
                        <div key={index}>
                            <h2>{property.address}</h2>
                            <p>{property.price}</p>
                            {/* Add more property details as needed */}
                        </div>
                    ))
                ) : (
                    <p>No properties found</p>
                )}
            </div>
        </div>
    );
};

export default BuyPage;
