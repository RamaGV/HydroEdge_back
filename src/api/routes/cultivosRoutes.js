// src/api/routes/cultivosRoutes.js

const express = require('express');
const router = express.Router();
const { updateCultivo } = require('../../mqtt_handlers/cultivosHandler');

router.get('/all', async (req, res) => {
  try {
    const collection = req.db.collection('cultivos');
    
    const cultivos = await collection.find({}).toArray();
    //console.log('cultivos:', cultivos);
    
    res.json(cultivos);
  } catch (error) {
    console.error('Error accessing database:', error);
    res.status(500).json({ error: 'Failed to access database' });
  }
});

router.post('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const collection = req.db.collection('cultivos');
    const cultivo = await collection.findOne({ _id: id });
    
    if (cultivo) {
      updateCultivo(id);      
      res.json(cultivo);
    } else {
      res.status(404).json({ error: 'Cultivo no encontrado' });
    }
  } catch (error) {
    console.error('Error fetching cultivo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
