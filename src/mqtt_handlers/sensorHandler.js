// src/utils/mqtt_handlers/sensorHandler.js
const databaseService = require('../services/databaseService');

async function handleSensorMessage(topic, message) {
  const sensorName = topic.split('/').pop(); // Extraer el nombre del sensor desde el topic
  const sensorValue = parseFloat(message); // Convertir el valor recibido a número

  try {
    const db = databaseService.getDb();
    const collection = db.collection('sensores');

    const result = await collection.updateOne(
      { "sensores.nombre": sensorName },
      { $set: { "sensores.$.medida_actual": sensorValue } }
    );

    if (result.modifiedCount > 0) {
      console.log(`Sensor ${sensorName} updated with value ${sensorValue}`);
    } else {
      console.log(`No sensor found for ${sensorName}`);
    }
  } catch (error) {
    console.error('Failed to update sensor value:', error);
  }
}

module.exports = { handleSensorMessage };
