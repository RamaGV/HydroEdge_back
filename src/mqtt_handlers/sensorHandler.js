// src/utils/mqtt_handlers/sensorHandler.js
const databaseService = require('../services/databaseService');

async function handleSensorMessage(topic, message) {
  const sensorName = topic.split('/').pop().toUpperCase();
  const db = databaseService.getDb();
  const sensorCollection = db.collection('sensores');
  
  if (message === '?') {
    await sensorCollection.updateOne(
      { nombre: sensorName },
      { $set: { estado_sensor: 'MEASURING' } }
    );
  } else if (message.toUpperCase() === 'OFF') {
    await sensorCollection.updateOne(
      { nombre: sensorName },
      { $set: { estado_sensor: 'OFF' } }
    );
  } else { // El mensaje debe ser un numero.
    const sensor = await sensorCollection.findOne({ nombre: sensorName });
    console.log(sensor);

    sensor.medida_actual = parseFloat(message);
    sensor.ultima_medida = new Date().toISOString();
    sensor.estado_sensor = 'ON';
    //const eventos_umbral = controlUmbrales(sensor.umbral_minimo, sensor.umbral_maximo, sensor.medida_actual, sensor.eventos_umbral);
    
    await sensorCollection.updateOne(
      { nombre: sensorName },
      { 
        $set: { 
          medida_actual: sensor.medida_actual, 
          ultima_medida: sensor.ultima_medida, 
          estado_sensor: sensor.estado_sensor,
          //eventos_umbral: eventos_umbral
        } 
      }
    );
  }
}

module.exports = { handleSensorMessage };
