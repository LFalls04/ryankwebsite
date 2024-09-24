import React from 'react';

interface Property {
  id: string;
  image: string;
  address: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="property-card border rounded shadow-md p-4">
      <img
        src={property.image}
        alt={property.address}
        className="w-full h-48 object-cover rounded"
      />
      <div className="mt-4">
        <h3 className="text-xl font-semibold">{property.address}</h3>
        <p className="text-gray-600">Price: {property.price}</p>
        <p className="text-gray-600">
          Beds: {property.bedrooms} | Baths: {property.bathrooms}
        </p>
        <p className="text-gray-600">Square Feet: {property.sqft}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
