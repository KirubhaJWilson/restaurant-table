import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // This assumes you have the userId from your auth context
        const userId = 'test-user-id'; // Replace with actual user ID
        const response = await axios.get(`http://localhost:5000/api/bookings/user/${userId}`);
        setBookings(response.data);
      } catch (error) {
        setError('Error fetching bookings');
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Your Bookings</h2>
      {error && <p>{error}</p>}
      <ul>
        {bookings.map(booking => (
          <li key={booking.id}>
            Restaurant ID: {booking.restaurantId}, Table ID: {booking.tableId}, Time: {booking.bookingTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserBookings;