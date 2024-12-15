import { useState, useEffect } from 'react';
import { addPackage, updatePackage } from '../services/packageService';

const PackageForm = ({ packageData, onClose, onUpdatePackage }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [availableDates, setAvailableDates] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (packageData) {
      setTitle(packageData.title);
      setDescription(packageData.description);
      setPrice(packageData.price);
      setAvailableDates(packageData.availableDates.join(', ')); // Convert array to string
      setImage(packageData.image);
    }
  }, [packageData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const packageObj = {
      title,
      description,
      price,
      availableDates: availableDates.split(', ').map((date) => date.trim()),  // Convert string to array
      image,
    };

    try {
      if (packageData) {
        // If editing an existing package
        const updatedPackage = await updatePackage(packageData._id, packageObj);
        onUpdatePackage(updatedPackage);
      } else {
        // If adding a new package
        const newPackage = await addPackage(packageObj);
        onUpdatePackage(newPackage);
      }
      onClose();  // Close the form after submitting
    } catch (error) {
      console.error('Error saving package:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">{packageData ? 'Edit Package' : 'Add Package'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Package Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full p-2 border rounded mb-4"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="block w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="text"
            placeholder="Available Dates (comma separated)"
            value={availableDates}
            onChange={(e) => setAvailableDates(e.target.value)}
            className="block w-full p-2 border rounded mb-4"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="block w-full p-2 border rounded mb-4"
          />
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PackageForm;
