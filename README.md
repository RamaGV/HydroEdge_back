# HydroEdge Backend

Este repositorio contiene el backend del sistema hidropónico automatizado, responsable de gestionar la lógica del negocio, la comunicación con sensores y actuadores, y el procesamiento y almacenamiento de datos críticos como temperatura, humedad, pH, electroconductividad (EC) y niveles de CO₂. Este backend garantiza un control eficiente y en tiempo real del entorno hidropónico, asegurando condiciones óptimas para el crecimiento de las plantas.

## Tecnologías Utilizadas

- **Node.js con Express**: Proporciona una estructura sólida y escalable para construir una API RESTful eficiente y modular.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar y gestionar grandes volúmenes de datos sensoriales y registros históricos de manera flexible.
- **MQTT**: Protocolo de mensajería ligero que facilita la comunicación en tiempo real entre el sistema y los dispositivos IoT conectados.
- **Socket.IO**: Permite actualizaciones bidireccionales en tiempo real entre el servidor y el cliente para una monitorización instantánea.
- **JWT (JSON Web Tokens)**: Implementado para autenticación y autorización seguras, protegiendo el acceso a los recursos del sistema.
- **Docker**: Conteneriza la aplicación para facilitar el despliegue, escalabilidad y consistencia en diferentes entornos.
- **Jest**: Framework de pruebas utilizado para garantizar la fiabilidad y estabilidad del código mediante pruebas unitarias y de integración.

## Funcionalidades Clave

- **Gestión de Sensores y Actuadores**: Recopila datos de diversos sensores y controla actuadores de manera automática o manual según configuraciones predefinidas.
- **API RESTful**: Provee endpoints seguros y bien estructurados para interactuar con el frontend y otros servicios externos.
- **Procesamiento de Datos en Tiempo Real**: Analiza y procesa datos sensoriales al instante para permitir respuestas rápidas a cambios en el entorno.
- **Alertas y Notificaciones**: Genera alertas en tiempo real ante condiciones anómalas, permitiendo una intervención oportuna.
- **Registro y Auditoría**: Mantiene un historial detallado de todas las operaciones y cambios realizados para seguimiento y análisis posteriores.
- **Configuración Personalizable**: Permite ajustar parámetros y umbrales según las necesidades específicas de diferentes cultivos y entornos.
- **Seguridad y Control de Acceso**: Implementa protocolos de seguridad robustos para proteger la integridad y confidencialidad de los datos.
