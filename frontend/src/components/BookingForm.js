import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ restaurantId }) => {
  const [tableId, setTableId] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      // This assumes you have the userId from your auth context
      const userId = 'test-user-id'; // Replace with actual user ID
      await axios.post('http://localhost:5000/api/bookings', {
        userId,
        restaurantId,
        tableId,
        bookingTime,
      });
      setSuccess(true);
    } catch (error) {
      setError('Error creating booking');
    }
  };

  return (
    <div>
      <h3>Book a Table</h3>
      <form onSubmit={handleBooking}>
        {/* In a real app, you'd fetch and display available tables */}
        <input
          type="text"
          value={tableId}
          onChange={(e) => setTableId(e.target.value)}
          placeholder="Table ID"
        />
        <input
          type="datetime-local"
          value={bookingTime}
          onChange={(e) => setBookingTime(e.target.value)}
        />
        <button type="submit">Book Now</button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>Booking successful!</p>}
    </div>
  );
};

export default BookingForm;