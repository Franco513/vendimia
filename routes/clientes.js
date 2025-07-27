const express = require('express');
const router = express.Router();
const validarToken = require('../middlewares/authMiddleware');

// Controladores
const {
  registrarCliente,
  listarClientes,
  actualizarCliente,
  eliminarCliente
} = require('../controllers/clientesController');

// 📌 Crear nuevo cliente (POST /api/clientes)
router.post('/', validarToken, registrarCliente);

// 📌 Obtener todos los clientes (GET /api/clientes)
router.get('/', validarToken, listarClientes);

// 📌 Actualizar cliente por ID (PUT /api/clientes/:id)
router.put('/:id', validarToken, actualizarCliente);

// 📌 Eliminar cliente por ID (DELETE /api/clientes/:id)
router.delete('/:id', validarToken, eliminarCliente);

module.exports = router;
