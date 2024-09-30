// src/handlers/cultivosHandler.js

const mqttService = require('../services/mqttService');

let currentCultivoId = null;

async function updateCultivo(cultivoId) {
  if (currentCultivoId) {
    // Desuscribirse de los temas anteriores
    mqttService.unsubscribe(`HydroEdge/${currentCultivoId}/sensores/#`);
    mqttService.unsubscribe(`HydroEdge/${currentCultivoId}/actuadores/#`);
  }

  currentCultivoId = cultivoId;

  // Suscribirse a los nuevos temas
  mqttService.subscribe(`HydroEdge/${currentCultivoId}/sensores/#`);
  mqttService.subscribe(`HydroEdge/${currentCultivoId}/actuadores/#`);

  // Actualizar cultivoId en mqttService
  mqttService.setCultivoId(currentCultivoId);
}

module.exports = { updateCultivo };
