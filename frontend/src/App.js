import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import RestaurantList from './components/RestaurantList';
import UserBookings from './components/UserBookings';
import BookingForm from './components/BookingForm';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline } from '@mui/material';
import './App.css';

// Initialize Firebase
import './firebase';

function App() {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Restaurant Booking
          </Typography>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
          <Button color="inherit" component={Link} to="/">Restaurants</Button>
          <Button color="inherit" component={Link} to="/bookings">My Bookings</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/bookings" element={<UserBookings />} />
          <Route path="/" element={<RestaurantList />} />
          {/* Example of how to render the booking form for a specific restaurant */}
          <Route path="/book/:restaurantId" element={<BookingFormWrapper />} />
        </Routes>
      </Container>
    </Router>
  );
}

// Wrapper component to extract restaurantId from URL params
const BookingFormWrapper = () => {
  const { restaurantId } = useParams();
  return <BookingForm restaurantId={restaurantId} />;
};

export default App;