const express = require('express');
const cors = require('cors');
require('dotenv').config();

const admin = require('./firebaseAdmin');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const restaurantRoutes = require('./routes/restaurants');
app.use('/api/restaurants', restaurantRoutes);

const tableRoutes = require('./routes/tables');
app.use('/api/tables', tableRoutes);

const bookingRoutes = require('./routes/bookings');
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
  res.send('Restaurant booking API is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});