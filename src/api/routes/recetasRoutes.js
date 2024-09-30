// src/api/routes/recetasRoutes.js

const express = require('express');
const router = express.Router();

router.get('/all', async (req, res) => {
    try {
      const collection = req.db.collection('recetas');
      
      const recetas = await collection.find({}).toArray();
      
      res.json(recetas);
    } catch (error) {
      console.error('Error accessing database:', error);
      res.status(500).json({ error: 'Error accessing database' });
    }
});

module.exports = router;
