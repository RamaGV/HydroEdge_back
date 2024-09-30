// src/api/routes/actuadorRoutes.js

const express = require('express');
const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const collection = req.db.collection('actuadores');

    const actuadores = await collection.find({}).toArray();

    res.json(actuadores);
  } catch (error) {
    console.error('Error al obtener los actuadores:', error);
    res.status(500).json({ error: 'Error al obtener actuadores' });
  }
});

module.exports = router;
