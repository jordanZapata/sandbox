const express = require('express');
const app = express();
app.use(express.json());

// Endpoint para simular la consulta a TransUnion
app.post('/api/transunion/check', (req, res) => {
    const { nombre, identificacion, fecha_nacimiento } = req.body;

    let response;
    switch (identificacion) {
        case '1234567890':
            response = {
                success: false,
                detalles: 'El usuario está en la lista de OFAC (Office of Foreign Assets Control).'
            };
            break;
        case '9876543210':
            response = {
                success: false,
                detalles: 'El usuario está en la lista de PEP (Personas Expuestas Políticamente).'
            };
            break;
        case '1122334455':
            response = {
                success: true,
                detalles: 'El usuario no está en ninguna lista restrictiva.'
            };
            break;
        default:
            response = {
                success: false,
                detalles: 'El usuario está en una lista restrictiva general.'
            };
            break;
    }

    res.json(response);
});

// Endpoint para simular la validación de identidad con Experian
app.post('/api/experian/validate', (req, res) => {
    const { nombre, identificacion, direccion, fecha_nacimiento } = req.body;

    let response;
    switch (identificacion) {
        case '1234567890':
            response = {
                success: true,
                detalles: 'Identidad validada exitosamente. El usuario tiene un crédito de alto riesgo.'
            };
            break;
        case '9876543210':
            response = {
                success: true,
                detalles: 'Identidad validada exitosamente. El usuario tiene un historial crediticio impecable.'
            };
            break;
        case '1122334455':
            response = {
                success: false,
                detalles: 'Error en la validación de identidad. El documento no coincide con el nombre proporcionado.'
            };
            break;
        default:
            response = {
                success: false,
                detalles: 'Error en la validación de identidad. Datos insuficientes.'
            };
            break;
    }

    res.json(response);
});

// Endpoint para verificar el estado de la aplicación
app.get('/api/status', (req, res) => {
    res.json({ status: 'API está en funcionamiento en modo sandbox.' });
});

// Escuchar en el puerto 3000
app.listen(3000, () => {
    console.log('API sandbox corriendo en el puerto 3000');
});
