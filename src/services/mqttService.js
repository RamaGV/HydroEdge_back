// src/services/mqttService.js

const mqtt = require('mqtt');
const { handleSensorMessage } = require('../mqtt_handlers/sensorHandler');
const { handleActuatorMessage } = require('../mqtt_handlers/actuatorHandler');

class MqttService {
  constructor(brokerUrl) {
    this.client = mqtt.connect(`mqtt://${brokerUrl}`);
  }

  connect() {
    this.client.on('connect', () => {
      console.log('Connected to MQTT Broker');
      this.client.subscribe('HYDRO/inv_1/sensores/#', (err) => {
        if (!err) {
          console.log('Subscribed to topic HYDRO/inv_1/sensores/#');
        }
      });
      this.client.subscribe('HYDRO/inv_1/actuadores/#', (err) => {
        if (!err) {
          console.log('Subscribed to topic HYDRO/inv_1/actuadores/#');
        }
      });
    });
    
    this.client.on('message', (topic, message) => {
      if (topic.startsWith('HYDRO/inv_1/sensores/')) {
        handleSensorMessage(topic, message.toString());
      } else 
      if (topic.startsWith('HYDRO/inv_1/actuadores/')) {
        handleActuatorMessage(topic, message.toString());
      }
    });

    this.client.on('error', (err) => {
      console.error('MQTT Connection error:', err);
    });
  }
}

module.exports = MqttService;
