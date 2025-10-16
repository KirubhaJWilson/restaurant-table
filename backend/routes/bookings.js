const router = require('express').Router();
const admin = require('../firebaseAdmin');
const db = admin.firestore();

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const { userId, restaurantId, tableId, bookingTime } = req.body;
    // You might want to add logic here to check if the table is available at the requested time
    const docRef = await db.collection('bookings').add({ userId, restaurantId, tableId, bookingTime });
    res.status(201).send({ id: docRef.id });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get all bookings for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const snapshot = await db.collection('bookings').where('userId', '==', userId).get();
    const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;