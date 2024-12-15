import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [packages, setPackages] = useState([]);
  const [userBookings, setUserBookings] = useState([]); // State to store user bookings
  const [form, setForm] = useState({
    customerName: '',
    email: '',
    phone: '',
    numberOfTravelers: '',
    specialRequests: '',
    totalPrice: 0,
  });
  const [selectedPackageId, setSelectedPackageId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage

  // Fetch available packages on component mount
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:2000/api/packages');
        setPackages(res.data.data);
        setLoading(false);
      } catch (error) {
        setErrorMessage('Failed to load packages.');
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Fetch user bookings
  useEffect(() => {
    const fetchUserBookings = async () => {
      if (!userId) return;

      try {
        const res = await axios.get(`http://localhost:2000/api/bookings/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserBookings(res.data.data); // Store user bookings in state
      } catch (error) {
        setErrorMessage('Failed to load user bookings.');
      }
    };

    fetchUserBookings();
  }, [userId, token]);

  // Handle form submission for booking
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPackageId) {
      setErrorMessage('Please select a package.');
      return;
    }

    const bookingData = {
      packageId: selectedPackageId,
      customerName: form.customerName,
      email: form.email,
      phone: form.phone,
      numberOfTravelers: form.numberOfTravelers,
      specialRequests: form.specialRequests,
      totalPrice: form.totalPrice,
    };

    try {
      await axios.post('http://localhost:2000/api/bookings', bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Booking created successfully!');
    } catch (error) {
      setErrorMessage('Error creating booking: ' + error.message);
    }
  };

  // Handle changes in form fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle package selection
  const handlePackageSelect = (packageId, price) => {
    setSelectedPackageId(packageId);
    setForm((prevForm) => ({ ...prevForm, totalPrice: price }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">User Dashboard</h1>

      {/* Display user bookings */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Your Bookings</h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <ul className="list-disc pl-6">
          {userBookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            userBookings.map((booking) => (
              <li key={booking._id} className="mb-4">
                <div>
                  <strong>{booking.packageId.title}</strong> - ${booking.totalPrice}
                  <div>
                    <span>Customer: {booking.customerName}</span><br />
                    <span>Email: {booking.email}</span><br />
                    <span>Phone: {booking.phone}</span><br />
                    <span>Number of Travelers: {booking.numberOfTravelers}</span><br />
                    <span>Special Requests: {booking.specialRequests}</span>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Package selection and booking form */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Select a Package</h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <ul className="list-disc pl-6">
          {packages.map((pkg) => (
            <li key={pkg._id} className="mb-4">
              <div>
                <strong>{pkg.title}</strong> - ${pkg.price}
                <button
                  onClick={() => handlePackageSelect(pkg._id, pkg.price)}
                  className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Select Package
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedPackageId && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Booking Form</h2>
          <form onSubmit={handleBookingSubmit}>
            <input
              type="text"
              name="customerName"
              placeholder="Your Name"
              value={form.customerName}
              onChange={handleChange}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={form.phone}
              onChange={handleChange}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              name="numberOfTravelers"
              placeholder="Number of Travelers"
              value={form.numberOfTravelers}
              onChange={handleChange}
              className="border p-2 mb-2 w-full"
            />
            <textarea
              name="specialRequests"
              placeholder="Special Requests"
              value={form.specialRequests}
              onChange={handleChange}
              className="border p-2 mb-2 w-full"
            />
            <div className="mb-2">
              <strong>Total Price: </strong>${form.totalPrice}
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Book Now
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
