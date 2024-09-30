// src/services/mqttService.js

require('dotenv').config(); // Asegurarse de que las variables de entorno estén disponibles
const mqtt = require('mqtt');
const { handleSensorMessage } = require('../mqtt_handlers/sensorHandler');
const { handleActuatorMessage } = require('../mqtt_handlers/actuadorHandler');

class MqttService {
  constructor(brokerUrl) {
    this.brokerUrl = brokerUrl;
    this.client = null;
    this.cultivoId = "cultivo_001";
  }

  connect() {
    this.client = mqtt.connect(`mqtt://${this.brokerUrl}`);
    this.client.on('connect', this.onConnect.bind(this));
    this.client.on('message', this.onMessage.bind(this));
  }

  onConnect() {
    console.log('Conectado al Broker MQTT');
  }

  onMessage(topic, message) {
    if (this.cultivoId) {
      if (topic.startsWith(`HydroEdge/${this.cultivoId}/sensores/`)) {
        handleSensorMessage(topic, message.toString());
      } else if (topic.startsWith(`HydroEdge/${this.cultivoId}/actuadores/`)) {
        handleActuatorMessage(topic, message.toString());
      }
    }
  }

  subscribe(topic) {
    if (this.client) {
      this.client.subscribe(topic, (err) => {
        if (err) console.error('Error de suscripción:', err);
      });
    } else {
      console.error('Cliente MQTT no conectado.');
    }
  }

  unsubscribe(topic) {
    if (this.client) {
      this.client.unsubscribe(topic, (err) => {
        if (err) console.error('Error al desuscribirse:', err);
      });
    } else {
      console.error('Cliente MQTT no conectado.');
    }
  }

  publish(topic, message) {
    if (this.client) {
      this.client.publish(topic, message);
    } else {
      console.error('Cliente MQTT no conectado.');
    }
  }

  setCultivoId(cultivoId) {
    this.cultivoId = cultivoId;
  }
}

// Crear una instancia única de MqttService
const mqttUrl = process.env.MQTT_URL;
const mqttService = new MqttService(mqttUrl);

// Exportar la instancia única
module.exports = mqttService;
