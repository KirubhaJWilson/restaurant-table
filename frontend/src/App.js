import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import RestaurantList from './components/RestaurantList';
import UserBookings from './components/UserBookings';
import BookingForm from './components/BookingForm';
import './App.css';

// Initialize Firebase
import './firebase';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/">Restaurants</Link></li>
            <li><Link to="/bookings">My Bookings</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/bookings" element={<UserBookings />} />
          <Route path="/" element={<RestaurantList />} />
          {/* Example of how to render the booking form for a specific restaurant */}
          <Route path="/book/:restaurantId" element={<BookingFormWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

// Wrapper component to extract restaurantId from URL params
const BookingFormWrapper = () => {
  const { restaurantId } = useParams();
  return <BookingForm restaurantId={restaurantId} />;
};

export default App;