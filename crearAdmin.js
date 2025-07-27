// backend/crearAdmin.js
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function crearAdmin(usuario, password) {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'vendimia',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      'INSERT INTO administrador (usuario, password) VALUES (?, ?)',
      [usuario, hashedPassword]
    );

    console.log(`Administrador creado con ID: ${result.insertId}`);

    await pool.end();
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.log('Error: El usuario ya existe.');
    } else {
      console.error('Error al crear administrador:', error);
    }
  }
}

// Aquí cambias los datos de usuario y contraseña que quieres crear:
const usuario = 'franco';
const password = '123';

crearAdmin(usuario, password);
