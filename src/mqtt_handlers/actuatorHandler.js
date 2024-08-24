// src/mqtt_handlers/actuatorHandler.js

function handleActuatorMessage(topic, message) {
    const actuatorName = topic.split('/').pop();
    console.log(`Actuator ${actuatorName} received command: ${message}`);
  
    // Aquí puedes agregar la lógica para manejar el actuador, como activar o desactivar un dispositivo.
  }
  
  module.exports = { handleActuatorMessage };
  