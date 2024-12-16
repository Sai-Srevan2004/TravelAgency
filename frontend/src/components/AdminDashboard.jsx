import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', price: '', availableDates: '', image: '' });
  const [editForm, setEditForm] = useState(null); // To handle the edit form state
  const token = localStorage.getItem('token');
  const [role, setRole] = useState('');
  const decodedUser = jwtDecode(token);

  useEffect(() => {
    setRole(decodedUser.role);
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
    const formattedForm = {
      ...form,
      availableDates: form.availableDates.split(',').map(date => date.trim()),
    };

    try {
      await axios.post('http://localhost:2000/api/packages', formattedForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Package added!');
      setForm({ title: '', description: '', price: '', availableDates: '', image: '' });
      const res = await axios.get('http://localhost:2000/api/packages');
      setPackages(res.data.data);
    } catch (error) {
      console.error('Error adding package:', error);
      alert('Error adding package!');
    }
  };

  const handleEditClick = (pkg) => {
    setEditForm({ ...pkg, availableDates: pkg.availableDates.join(', ') });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formattedEditForm = {
      ...editForm,
      availableDates: editForm.availableDates.split(',').map(date => date.trim()),
    };

    try {
      await axios.put(`http://localhost:2000/api/packages/${editForm._id}`, formattedEditForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Package updated!');
      setEditForm(null);
      const res = await axios.get('http://localhost:2000/api/packages');
      setPackages(res.data.data);
    } catch (error) {
      console.error('Error updating package:', error);
      alert('Error updating package!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/api/packages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Package deleted!');
      const res = await axios.get('http://localhost:2000/api/packages');
      setPackages(res.data.data);
    } catch (error) {
      console.error('Error deleting package:', error);
      alert('Error deleting package!');
    }
  };

  if (role !== 'admin') {
    navigate('/');
    return null;
  }

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
          placeholder="Image URL"
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
            <button
              onClick={() => handleEditClick(pkg)}
              className="bg-blue-500 text-white px-2 py-1 ml-4 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(pkg._id)}
              className="bg-red-500 text-white px-2 py-1 ml-2 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Edit Package Form */}
      {editForm && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Edit Package</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              placeholder="Title"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Description"
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              placeholder="Price"
              value={editForm.price}
              onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="url"
              placeholder="Image URL"
              value={editForm.image}
              onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Available Dates (comma-separated)"
              value={editForm.availableDates}
              onChange={(e) => setEditForm({ ...editForm, availableDates: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update Package</button>
            <button
              onClick={() => setEditForm(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
