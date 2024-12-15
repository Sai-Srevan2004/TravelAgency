import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', price: '', availableDates: '' ,image:''});
  const token = localStorage.getItem('token');

  // Fetch available packages on component mount
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get('http://localhost:2000/api/packages');
        setPackages(res.data.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };
    fetchPackages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure that availableDates is an array of strings (dates)
    const formattedForm = {
      ...form,
      availableDates: form.availableDates.split(',').map(date => date.trim()), // Ensure no leading/trailing spaces
    };

    try {
      await axios.post('http://localhost:2000/api/packages', formattedForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Package added!');
      // Clear the form after submission
      setForm({ title: '', description: '', price: '', availableDates: '' });
      // Re-fetch the packages after adding a new one
      const res = await axios.get('http://localhost:2000/api/packages');
      setPackages(res.data.data);
    } catch (error) {
      console.error('Error adding package:', error);
      alert('Error adding package!');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>

      {/* Add Package Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="url"
          placeholder="image"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Available Dates (comma-separated)"
          value={form.availableDates}
          onChange={(e) => setForm({ ...form, availableDates: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Package</button>
      </form>

      {/* Display Available Packages */}
      <h2 className="text-2xl font-semibold mb-4">Available Packages</h2>
      <ul className="list-disc pl-6">
        {packages.map((pkg) => (
          <li key={pkg._id} className="mb-2">
            <strong>{pkg.title}</strong>: {pkg.description} | Price: ${pkg.price} | Available Dates: {pkg.availableDates.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
