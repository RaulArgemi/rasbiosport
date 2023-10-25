const express = require('express');
const app = express();
const db = require('./connection');
const cors = require('cors');

// Configura CORS para permitir solicitudes desde cualquier origen
app.use(cors());

app.get('/api/users', async (req, res) => {
  try {
    const data = await db.any('SELECT * FROM usuari'); // Corregí el nombre de la tabla a 'usuarios'
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener datos de usuarios' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

