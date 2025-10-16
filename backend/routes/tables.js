const router = require('express').Router();
const admin = require('../firebaseAdmin');
const db = admin.firestore();

// Get all tables for a restaurant
router.get('/restaurant/:restaurantId', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const snapshot = await db.collection('restaurants').doc(restaurantId).collection('tables').get();
    const tables = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(tables);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Create a new table for a restaurant
router.post('/restaurant/:restaurantId', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { capacity, isAvailable } = req.body;
    const docRef = await db.collection('restaurants').doc(restaurantId).collection('tables').add({ capacity, isAvailable });
    res.status(201).send({ id: docRef.id });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;