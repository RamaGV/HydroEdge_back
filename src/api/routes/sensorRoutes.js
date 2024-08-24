// src/api/routes/sensorRoutes.js

const express = require('express');
const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    // Acceder a la colección 'sensores'
    const collection = req.db.collection('sensores');
    
    // Realizar una consulta simple, como encontrar todos los documentos
    const sensores = await collection.find({}).toArray();
    
    // Enviar los datos como respuesta
    res.json(sensores);
  } catch (error) {
    console.error('Error accessing database:', error);
    res.status(500).json({ error: 'Failed to access database' });
  }
});

module.exports = router;
