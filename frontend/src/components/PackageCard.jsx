import React from 'react';

const PackageCard = ({ pkg }) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover rounded" />
      <h2 className="text-xl font-semibold mt-2">{pkg.title}</h2>
      <p className="text-gray-600">{pkg.description}</p>
      <p className="text-green-600 font-bold">₹{pkg.price}</p>
    </div>
  );
};

export default PackageCard;
