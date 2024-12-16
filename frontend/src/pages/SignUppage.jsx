import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    cpassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.cpassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('https://travelagency-backend.onrender.com/api/signup', formData);
      console.log("Signup Response", response);

      // Redirect to login page after successful signup
      navigate('/login');
    } catch (error) {
      setError("Failed to sign up. Please try again.");
      console.error("Signup Error", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Signup</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="cpassword">
              Confirm Password
            </label>
            <input
              type="password"
              name="cpassword"
              id="cpassword"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={formData.cpassword}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
