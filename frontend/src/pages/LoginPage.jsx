import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data", formData);

    try {
      const response = await axios.post('https://travelagency-backend.onrender.com/api/user/login', formData);
      console.log("Login Response", response);


      
      // Save token to localStorage or state if login is successful
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId',response.data.data._id)
      if(response.data.data.role!=="admin")
      {
        navigate('/user');  // Redirect to dashboard after login

      }
      else{
        navigate('/admin');  // Redirect to dashboard after login

      }
    } catch (error) {
      setError("Invalid credentials or server error.");
      console.error("Login Error", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
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
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>
        <p>Don't have an account?</p>
        <Link to='/signup'>Signup</Link>
      </div>
    </div>
  );
};

export default Login;
