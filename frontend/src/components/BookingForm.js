import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Alert,
} from '@mui/material';

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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Book a Table
        </Typography>
        <Box component="form" onSubmit={handleBooking} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="tableId"
            label="Table ID"
            name="tableId"
            autoFocus
            value={tableId}
            onChange={(e) => setTableId(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="bookingTime"
            label="Booking Time"
            type="datetime-local"
            id="bookingTime"
            InputLabelProps={{
              shrink: true,
            }}
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
          />
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">Booking successful!</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Book Now
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default BookingForm;
