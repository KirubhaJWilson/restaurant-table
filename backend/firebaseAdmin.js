const admin = require('firebase-admin');

// IMPORTANT: Replace this with your actual Firebase service account credentials
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;