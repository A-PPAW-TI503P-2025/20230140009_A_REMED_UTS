const { DataTypes } = require('sequelize');
const sequelize = require('./config');

// --- 1. Model Book ---
// Sesuai PDF Poin 76: id, title, author, stock (integer)
const Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true // Validasi sederhana agar tidak kosong
        }
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

// --- 2. Model BorrowLog ---
// Sesuai PDF Poin 77: id, userId, bookId, borrowDate, latitude, longitude
const BorrowLog = sequelize.define('BorrowLog', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
        // Note: Tabel User opsional (PDF Poin 80), jadi userId disimpan langsung
    },
    borrowDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

// Relasi antar tabel
// Satu buku bisa memiliki banyak log peminjaman
Book.hasMany(BorrowLog, { foreignKey: 'bookId' });
BorrowLog.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = { Book, BorrowLog };