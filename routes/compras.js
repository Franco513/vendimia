// backend/routes/compras.js
const express = require('express');
const router = express.Router();
const validarToken = require('../middlewares/authMiddleware');
const { registrarCompra, historialCompras } = require('../controllers/comprasController');

router.post('/', validarToken, registrarCompra);
router.get('/historial', validarToken, historialCompras);

module.exports = router;
