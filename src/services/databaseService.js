// src/mqtt_handlers/databaseService.js

const { MongoClient } = require('mongodb');

class DatabaseService {
  constructor() {
    this.db = null;
    this.client = null;
  }

  // Método para conectar a la base de datos
  async connect(uri) {
    this.client = new MongoClient(uri);

    try {
      await this.client.connect();
      console.log('Connected to MongoDB');
      this.db = this.client.db(); // Conecta a la base de datos especificada en la URI
      return this.db;
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err);
      throw err;
    }
  }

  // Método para obtener la instancia de la base de datos
  getDb() {
    if (!this.db) {
      throw new Error("Database not initialized. Call connect first!");
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
