// src/models/sensorModel.js

const databaseService = require('../services/databaseService');

class SensorModel {
  constructor(nombre = null) {
    this.nombre = nombre;
  }

  // Method to get all sensors from the database
  static async getAllSensors() {
    const db = databaseService.getDb();
    const collection = db.collection('sensores');
    return await collection.find({}).toArray();
  }

  // Method to get specific sensor data by name
  async getSensorData() {
    const db = databaseService.getDb();
    const collection = db.collection('sensores');
    return await collection.findOne({ nombre: this.nombre });
  }

  // Method to update sensor data in the database
  async updateSensorData(data) {
    const db = databaseService.getDb();
    const collection = db.collection('sensores');
    await collection.updateOne({ nombre: this.nombre }, { $set: data });
  }
}

// Función independiente para el control de umbrales
function controlUmbrales(umbral_minimo, umbral_maximo, medida_actual, eventos_actual) {
  let eventos_umbral = eventos_actual || 0;
  if (medida_actual > umbral_maximo) {
    eventos_umbral += 1;
  } else if (medida_actual < umbral_minimo) {
    eventos_umbral += 1;
  } else {
    eventos_umbral = 0;
  }
  
  return eventos_umbral;
}


module.exports = SensorModel, controlUmbrales;
