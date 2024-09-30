// src/mqtt_handlers/databaseService.js

const { MongoClient, ServerApiVersion } = require('mongodb');

class DatabaseService {
  constructor() {
    this.db = null;
    this.client = null;
  }
  
  // Método para conectar a la base de datos
  async connect(uri) {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    
    try {
      await this.client.connect(); // Intenta conectarse al servidor MongoDB
      console.log('Connected to MongoDB');
      this.db = this.client.db('HydroEdge_db'); // Conecta a la base de datos predeterminada
      return this.db; // Retorna la instancia de la base de datos conectada
    } catch (err) {
      console.error('No se pudo conectar a MongoDB:', err);
      throw err;
    }
  }

  // Método para obtener la instancia de la base de datos
  getDb() {
    if (!this.db) {
      throw new Error('Base de datos no inicializada.');
    }
    return this.db;
  }

  // Método para cerrar la conexión
  close() {
    if (this.client) {
      this.client.close();
    }
  }
}

module.exports = new DatabaseService(); // Exportar una instancia de la clase
