// backend/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
const authRoutes = require('./routes/auth');
const clientesRoutes = require('./routes/clientes');
const comprasRoutes = require('./routes/compras');

app.use('/api/auth', authRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/compras', comprasRoutes);

// Ruta raíz para prueba
app.get('/', (req, res) => {
  res.send('¡Servidor backend funcionando correctamente!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
