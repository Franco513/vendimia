const pool = require('../db');

// Crear cliente (POST)
const registrarCliente = async (req, res) => {
  const { nombre, apellido, correo, telefono } = req.body;

  if (!nombre || !apellido || !correo || !telefono) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    await pool.query(
      'INSERT INTO clientes (nombre, apellido, correo, telefono) VALUES (?, ?, ?, ?)',
      [nombre, apellido, correo, telefono]
    );

    res.status(201).json({ mensaje: 'Cliente registrado' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Correo ya registrado' });
    }
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Listar clientes (GET)
const listarClientes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nombre, apellido, correo, telefono FROM clientes');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Eliminar cliente (DELETE)
const eliminarCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM clientes WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json({ mensaje: 'Cliente eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Actualizar cliente (PUT)
const actualizarCliente = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, correo, telefono } = req.body;

  if (!nombre || !apellido || !correo || !telefono) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    const [result] = await pool.query(
      'UPDATE clientes SET nombre = ?, apellido = ?, correo = ?, telefono = ? WHERE id = ?',
      [nombre, apellido, correo, telefono, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.json({ mensaje: 'Cliente actualizado' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Correo ya registrado' });
    }
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = {
  registrarCliente,
  listarClientes,
  eliminarCliente,
  actualizarCliente
};
