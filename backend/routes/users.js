const router = require('express').Router();
const admin = require('../firebaseAdmin');

// User signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    res.status(201).send(userRecord);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// User login (client-side responsibility with Firebase SDK, but an endpoint can be created for custom tokens)
router.post('/login', async (req, res) => {
    // This endpoint is a placeholder.
    // Client-side Firebase SDK should be used for login to get an ID token.
    // That token can then be sent to the backend for verification.
    res.status(200).send({ message: 'Login endpoint placeholder. Use Firebase client-side SDK for login.' });
});


module.exports = router;