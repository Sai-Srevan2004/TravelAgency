import { useState } from "react";
import { bookPackage } from "../services/bookingService";

const BookingForm = ({ packageId }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    numberOfTravelers: 1,
    specialRequests: "",
  });
  console.log("pppppp-------->",packageId)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await bookPackage({ ...formData, packageId });
    if (response) {
      alert("Booking successful!");
    } else {
      alert("Booking failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <input
        type="text"
        name="customerName"
        placeholder="Name"
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-2"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-2"
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-2"
        required
      />
      <input
        type="number"
        name="numberOfTravelers"
        placeholder="Number of Travelers"
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-2"
        required
      />
      <textarea
        name="specialRequests"
        placeholder="Special Requests"
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-2"
      ></textarea>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Book Now
      </button>
    </form>
  );
};

export default BookingForm;
