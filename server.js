// server.js

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const databaseService = require('./src/services/databaseService');
const mqttService = require('./src/services/mqttService');
const sensorRoutes = require('./src/api/routes/sensorRoutes');
const actuadorRoutes = require('./src/api/routes/actuadorRoutes');
const cultivosRoutes = require('./src/api/routes/cultivosRoutes');
const recetasRoutes = require('./src/api/routes/recetasRoutes');

const app = express();

const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS para permitir solicitudes desde tu frontend
app.use(cors({
  origin: 'http://192.168.1.5:3000',
}));

// Conectar a MongoDB y luego iniciar el servidor
(async () => {
  try {
    await databaseService.connect(uri);
    console.log('Connected to MongoDB');
    
    // Iniciar MQTT
    mqttService.connect();  // Conectamos el cliente MQTT
    
    // Hacer disponible mqttService y db en todas las rutas
    app.use((req, res, next) => {
      req.mqttService = mqttService;
      req.db = databaseService.getDb();
      next();
    });
    
    // Registrar las rutas
    app.use('/api/sensores', sensorRoutes);
    app.use('/api/actuadores', actuadorRoutes);
    app.use('/api/recetas', recetasRoutes);
    app.use('/api/cultivos', cultivosRoutes);
    
    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
})();
