const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = 5000; // Puerto para el backend

// Configuración de la conexión a SQL Server
const config = {
    user: 'tu_usuario',
    password: 'tu_contraseña',
    server: 'localhost',
    database: 'nombre_de_tu_base_de_datos',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

// Middleware para permitir solicitudes desde el frontend
app.use(cors());
app.use(express.json()); // Para parsear JSON en las solicitudes

// Ruta para obtener datos de la base de datos
app.get('/api/datos', async (req, res) => {
    try {
        // Conectar a la base de datos
        await sql.connect(config);

        // Ejecutar una consulta
        const result = await sql.query`SELECT * FROM tu_tabla`;

        // Enviar los resultados como respuesta
        res.json(result.recordset);
    } catch (err) {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).send('Error en el servidor');
    } finally {
        // Cerrar la conexión
        await sql.close();
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor backend escuchando en http://localhost:${port}`);
});