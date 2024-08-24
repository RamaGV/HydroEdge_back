// server.js
require('dotenv').config();

const express = require('express');
const databaseService = require('./src/services/databaseService');
const MqttService = require('./src/services/mqttService');
const sensorRoutes = require('./src/api/routes/sensorRoutes');

const app = express();

const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;
const mqttUrl = process.env.MQTT_URL;

// Conectar a MongoDB
databaseService.connect(uri)
  .then(() => {
    // Iniciar MQTT
    const mqttService = new MqttService(mqttUrl);
    mqttService.connect();
    
    // Hacer disponible la db en todas las rutas
    app.use((req, res, next) => {
      req.db = databaseService.getDb();
      next();
    });
    
    // Registrar las rutas
    app.use('/api/sensors', sensorRoutes);
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB:', error);
  });



















/* 
const port = 5000;

// Conectar al broker MQTT
const mqttClient = mqtt.connect('mqtt://localhost:1883');

// Variable para almacenar datos del sensor
let sensorData = {};

// Conectar a MongoDB
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

client.connect(err => {
    if (err) {
        console.error('Error al conectar a MongoDB:', err);
    } else {
        console.log('Conectado a MongoDB');
    }
});

// Cuando se conecte el cliente MQTT
mqttClient.on('connect', () => {
  console.log('Conectado al broker MQTT');
  
  // Suscribirse a un tema, por ejemplo: "sensores/lecturas"
  mqttClient.subscribe('sensores/lecturas', (err) => {
    if (err) {
      console.error('Error al suscribirse:', err);
    } else {
      console.log('Suscrito a "sensores/lecturas"');
    }
  });

  mqttClient.publish('hydro','Tomaco conectado.');
});

// Cuando se reciba un mensaje MQTT
mqttClient.on('message', (topic, message) => {
  // Suponiendo que el mensaje es un JSON
  try {
    const data = JSON.parse(message.toString());
    sensorData = data;
    console.log('Datos recibidos:', data);
  } catch (error) {
    console.error('Error al parsear mensaje:', error);
  }
});

// Endpoint para obtener datos del sensor desde MongoDB
app.get('/api/sensores', async (req, res) => {
    try {
      const db = client.db('data_db');
      const collection = db.collection('sensores');
  
      // Obtener todos los documentos de la colección "sensores"
      const sensores = await collection.find().toArray();
  
      res.json(sensores);
    } catch (error) {
      console.error('Error al obtener datos de MongoDB:', error);
      res.status(500).send('Error al obtener datos de MongoDB');
    }
  });
  
// Iniciar el servidor HTTP
app.listen(port, () => {
  console.log(`Servidor HTTP escuchando en http://localhost:${port}`);
});

// Ruta para obtener un sensor específico por su nombre
app.get('/api/sensores/:nombre', async (req, res) => {
    try {
      const db = client.db('data_db');
      const collection = db.collection('sensores');
  
      const sensorNombre = req.params.nombre;
  
      // Encuentra el documento que contiene un sensor con el nombre especificado
      const documento = await collection.findOne({'sensores.nombre': sensorNombre,});
  
      if (!documento) return res.status(404).send('Sensor no encontrado');
  
      // Extrae el sensor específico del array de sensores
      const sensor = documento.sensores.find(s => s.nombre === sensorNombre);
  
      if (!sensor) {
        return res.status(404).send('Sensor no encontrado');
      }
  
      res.json(sensor);
    } catch (error) {
      console.error('Error al obtener el sensor:', error);
      res.status(500).send('Error al obtener el sensor');
    }
  });
*/