import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Your Bookings
      </Typography>
      <List>
        {bookings.map(booking => (
          <ListItem key={booking.id}>
            <ListItemText
              primary={`Booking ID: ${booking.id}`}
              secondary={`Restaurant ID: ${booking.restaurantId}, Table ID: ${booking.tableId}, Time: ${new Date(
                booking.bookingTime
              ).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default UserBookings;
