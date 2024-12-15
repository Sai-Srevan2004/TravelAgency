import { useState, useEffect } from "react";
import { getBookingById} from "../services/bookingService";  // You can modify to get specific booking details
import ReactModal from "react-modal"; // React Modal library for the modal UI

const InvoiceModal = ({ bookingId, isOpen, onRequestClose }) => {
  const [booking, setBooking] = useState(null);
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    if (bookingId) {
      const fetchBooking = async () => {
        setLoading(true)
        const data = await getBookingById(bookingId);
        setBooking(data);
        setLoading(false)
      };

      fetchBooking();
    }
  }, [bookingId]);

  if(loading)
  {
    return <p>Loading!</p>
  }

  console.log("--->",booking)

  if (!booking) return null;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Invoice Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <h2 className="text-xl font-bold mb-4">Invoice</h2>

        <div className="mb-4">
          <h3 className="font-semibold">Customer Information</h3>
          <p><strong>Name:</strong> {booking.customerName}</p>
          <p><strong>Email:</strong> {booking.email}</p>
          <p><strong>Phone:</strong> {booking.phone}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Package Information</h3>
          <p><strong>Package Title:</strong> {booking.packageId.title}</p>
          <p><strong>Price per Traveler:</strong> ${booking.packageId.price}</p>
          <p><strong>Number of Travelers:</strong> {booking.numberOfTravelers}</p>
          <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
        </div>

        <button
          onClick={onRequestClose}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </ReactModal>
  );
};

export default InvoiceModal;
