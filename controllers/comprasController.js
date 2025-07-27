const pool = require('../db');

const registrarCompra = async (req, res) => {
  const { cliente_id, cantidad } = req.body;
  if (!cliente_id || !cantidad) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    // Insertar compra
    await pool.query(
      'INSERT INTO compras (cliente_id, cantidad) VALUES (?, ?)',
      [cliente_id, cantidad]
    );

    // Actualizar contador en clientes
    await pool.query(
      'UPDATE clientes SET compras = compras + 1 WHERE id = ?',
      [cliente_id]
    );

    res.status(201).json({ mensaje: 'Compra registrada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const historialCompras = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.nombre, c.apellido, SUM(co.cantidad) AS total_botellas, COUNT(co.id) AS compras_realizadas
      FROM clientes c
      LEFT JOIN compras co ON c.id = co.cliente_id
      GROUP BY c.id
      ORDER BY total_botellas DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = { registrarCompra, historialCompras };
