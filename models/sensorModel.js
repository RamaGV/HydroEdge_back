const { MongoClient, ObjectId } = require('mongodb');

// URL de conexión a la base de datos MongoDB
const url = 'mongodb://localhost:27017';
// Nombre de la base de datos
const dbName = 'data_db';

// Función para conectar a la base de datos
async function connectToDatabase() {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  await client.connect();
  console.log('Conectado a la base de datos');
  return client.db(dbName);
}

// Función para obtener un sensor por nombre
async function getSensorByName(sensorName) {
  const db = await connectToDatabase();
  const collection = db.collection('sensores');
  return collection.findOne({ "sensores.nombre": sensorName });
}

// Función para actualizar la medida actual de un sensor
async function updateSensorMeasure(sensorName, newMeasure) {
  const db = await connectToDatabase();
  const collection = db.collection('sensores');

  const sensor = await collection.findOne({ "sensores.nombre": sensorName });

  if (sensor) {
    const updatedSensores = sensor.sensores.map(s => {
      if (s.nombre === sensorName) {
        s.medida_actual = newMeasure;
      }
      return s;
    });

    await collection.updateOne(
      { _id: sensor._id },
      { $set: { sensores: updatedSensores } }
    );

    return true;
  }

  return false;
}

// Exportar las funciones del modelo
module.exports = {
  getSensorByName,
  updateSensorMeasure
};
