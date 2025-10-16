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
import { Link } from 'react-router-dom';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/restaurants');
        setRestaurants(response.data);
      } catch (error) {
        setError('Error fetching restaurants');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
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
        Restaurants
      </Typography>
      <List>
        {restaurants.map(restaurant => (
          <ListItem
            key={restaurant.id}
            button
            component={Link}
            to={`/book/${restaurant.id}`}
          >
            <ListItemText
              primary={restaurant.name}
              secondary={`${restaurant.cuisine} - ${restaurant.address}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default RestaurantList;