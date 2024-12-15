const API_URL = import.meta.env.VITE_API_URL;  // The base URL for your backend API
import axios from 'axios'

// Submit a booking for a selected tour package
export const bookPackage = async (bookingData) => {
  try {
    console.log("bk===>",bookingData)
    const response = await axios.post(`http://localhost:2000/api/bookings`, {bookingData});

    if (!response.data.success) {
      throw new Error("Failed to book package");
    }

    return await response.data.data;  // Return the response data after a successful booking
  } catch (error) {
    console.error("Error booking package:", error.message);
    return null;  // Return null if an error occurs
  }
};


export const getBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:2000/api/bookings`);
      if (!response.data.success) {
        throw new Error("Failed to fetch bookings");
      }
      return await response.data.data;  // Return bookings data
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return [];  // Return empty array in case of error
    }
  };

  export const getBookingById = async (bookingId) => {
    try {
      const response = await axios.get(`http://localhost:2000/api/bookings/${bookingId}`);
      console.log(",,,,,,,,,,",response.data)
      if (!response.data.success) {
        throw new Error("Failed to fetch booking details");
      }
      return await response.data.data;  // Return booking data
    } catch (error) {
      console.error("Error fetching booking details:", error);
      return null;  // Return null if an error occurs
    }
  };