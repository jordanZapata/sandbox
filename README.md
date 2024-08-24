# Compliance Check API

Esta aplicación proporciona una API para simular la verificación de usuarios en listas restrictivas mediante TransUnion y la validación de identidad utilizando Experian. Esta API está diseñada para funcionar en un entorno de pruebas (sandbox).

## Requisitos

- Node.js 18 o superior
- npm (Node Package Manager)

## Instalación

1. Clona este repositorio o descarga los archivos.
2. Navega hasta el directorio del proyecto.
3. Instala las dependencias necesarias:

   ```bash
   npm install

Ejecución
Para iniciar la aplicación, utiliza el siguiente comando:

node index.js

Esto iniciará la API en el puerto 3000.

Endpoints
1. Consulta a TransUnion - Listas Restrictivas
URL: /api/transunion/check

Método: POST

Descripción: Este endpoint simula la consulta a TransUnion para verificar si un usuario aparece en listas restrictivas.

Cuerpo de la Solicitud (JSON):

{
    "nombre": "string",
    "identificacion": "string",
    "fecha_nacimiento": "string"
}

Ejemplo de Solicitud:

{
    "nombre": "Juan Perez",
    "identificacion": "1234567890",
    "fecha_nacimiento": "1985-05-15"
}

Posibles Respuestas:

Caso 1: Usuario en la lista de OFAC

{
    "success": false,
    "detalles": "El usuario está en la lista de OFAC (Office of Foreign Assets Control)."
}

Caso 2: Usuario en la lista de PEP
{
    "success": false,
    "detalles": "El usuario está en la lista de PEP (Personas Expuestas Políticamente)."
}

Caso 3: Usuario no está en ninguna lista restrictiva

{
    "success": true,
    "detalles": "El usuario no está en ninguna lista restrictiva."
}

Caso 4: Usuario en una lista restrictiva general
{
    "success": false,
    "detalles": "El usuario está en una lista restrictiva general."
}

2. Validación de Identidad - Experian
URL: /api/experian/validate

Método: POST

Descripción: Este endpoint simula la validación de identidad de un usuario utilizando Experian.

Cuerpo de la Solicitud (JSON):
{
    "nombre": "string",
    "identificacion": "string",
    "direccion": "string",
    "fecha_nacimiento": "string"
}

Ejemplo de Solicitud:
{
    "nombre": "Juan Perez",
    "identificacion": "1234567890",
    "direccion": "123 Main St, Ciudad",
    "fecha_nacimiento": "1985-05-15"
}

Posibles Respuestas:

Caso 1: Identidad validada con crédito de alto riesgo
{
    "success": true,
    "detalles": "Identidad validada exitosamente. El usuario tiene un crédito de alto riesgo."
}

Caso 2: Identidad validada con historial impecable
{
    "success": true,
    "detalles": "Identidad validada exitosamente. El usuario tiene un historial crediticio impecable."
}

Caso 3: Error en la validación - Documento no coincide

{
    "success": false,
    "detalles": "Error en la validación de identidad. El documento no coincide con el nombre proporcionado."
}

Caso 4: Error en la validación - Datos insuficientes

{
    "success": false,
    "detalles": "Error en la validación de identidad. Datos insuficientes."
}


3. Verificación de Estado de la API
URL: /api/status

Método: GET

Descripción: Este endpoint verifica el estado de la API y confirma que está en funcionamiento.

Ejemplo de Respuesta:

{
    "status": "API está en funcionamiento en modo sandbox."
}
