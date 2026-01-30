const { Sequelize } = require('sequelize');

// Konfigurasi koneksi database
// Sesuaikan 'root' dan password '' dengan setting MySQL/XAMPP Anda
const sequelize = new Sequelize('library_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false // Set true jika ingin melihat query SQL di terminal
});

module.exports = sequelize;