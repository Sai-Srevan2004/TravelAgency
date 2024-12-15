import React from 'react';

const PackageCard = ({ pkg, onBook }) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover rounded" />
      <h2 className="text-xl font-semibold mt-2">{pkg.title}</h2>
      <p className="text-gray-600">{pkg.description}</p>
      <p className="text-green-600 font-bold">₹{pkg.price}</p>
      <button
        onClick={() => onBook(pkg._id)}
        className="bg-blue-500 text-white px-4 py-2 mt-3 rounded"
      >
        Book Now
      </button>
    </div>
  );
};

export default PackageCard;
