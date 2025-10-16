const router = require('express').Router();
const admin = require('../firebaseAdmin');
const db = admin.firestore();

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('restaurants').get();
    const restaurants = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(restaurants);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get a single restaurant by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('restaurants').doc(id).get();
    if (!doc.exists) {
      return res.status(404).send({ error: 'Restaurant not found' });
    }
    res.status(200).send({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Create a new restaurant
router.post('/', async (req, res) => {
  try {
    const { name, address, cuisine } = req.body;
    const docRef = await db.collection('restaurants').add({ name, address, cuisine });
    res.status(201).send({ id: docRef.id });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;