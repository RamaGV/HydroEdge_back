// src/api/routes/sensorRoutes.js

const express = require('express');
const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const collection = req.db.collection('sensores');
    
    const sensores = await collection.find({}).toArray();
    
    res.json(sensores);
  } catch (error) {
    console.error('Error accessing database:', error);
    res.status(500).json({ error: 'Failed to access database' });
  }
});

module.exports = router;
