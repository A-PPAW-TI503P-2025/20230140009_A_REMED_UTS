const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config');
const { Book, BorrowLog } = require('./models');
const { verifyAdmin, verifyUser } = require('./middleware');

const app = express();
const PORT = 3000;

// Menyajikan file statis dari folder 'public' (untuk HTML/Frontend)
app.use(express.static('public'));

// Middleware parsing body request
app.use(bodyParser.json());

// ==========================================
// PUBLIC ENDPOINTS (Bisa diakses siapa saja)
// ==========================================

// GET /api/books: Melihat semua buku
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/books/:id: Detail buku
app.get('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Buku tidak ditemukan' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// ADMIN ENDPOINTS (Header x-user-role: admin)
// ==========================================

// POST /api/books: Tambah buku baru
app.post('/api/books', verifyAdmin, async (req, res) => {
    try {
        const { title, author, stock } = req.body;

        // Validasi sederhana
        if (!title || !author) {
            return res.status(400).json({ message: 'Title dan Author wajib diisi' });
        }

        const newBook = await Book.create({ title, author, stock });
        res.status(201).json({
            message: 'Buku berhasil ditambahkan',
            data: newBook
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/books/:id: Update buku
app.put('/api/books/:id', verifyAdmin, async (req, res) => {
    try {
        const { title, author, stock } = req.body;
        const book = await Book.findByPk(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Buku tidak ditemukan' });
        }

        await book.update({ title, author, stock });
        res.json({
            message: 'Buku berhasil diperbarui',
            data: book
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/books/:id: Hapus buku
app.delete('/api/books/:id', verifyAdmin, async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Buku tidak ditemukan' });
        }

        await book.destroy();
        res.json({ message: 'Buku berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/admin/borrow-logs: Melihat riwayat peminjaman
app.get('/api/admin/borrow-logs', verifyAdmin, async (req, res) => {
    try {
        // Mengambil data BorrowLog beserta data Bukunya (Join)
        const logs = await BorrowLog.findAll({
            include: [{
                model: Book,
                attributes: ['title', 'author'] // Kita ambil Judul & Penulis saja
            }],
            order: [['borrowDate', 'DESC']] // Urutkan dari yang terbaru
        });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// =========================================================
// USER ENDPOINTS (Header x-user-role: user & x-user-id: ...)
// =========================================================

// POST /api/borrow: Meminjam buku
app.post('/api/borrow', verifyUser, async (req, res) => {
    try {
        const { bookId, latitude, longitude } = req.body;
        const userId = req.userId; // Didapat dari middleware verifyUser

        // 1. Cek validasi input lokasi
        if (!latitude || !longitude) {
            return res.status(400).json({ message: 'Lokasi (latitude & longitude) diperlukan' });
        }

        // 2. Cari buku
        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Buku tidak ditemukan' });
        }

        // 3. Cek stok buku
        if (book.stock <= 0) {
            return res.status(400).json({ message: 'Stok buku habis' });
        }

        // 4. Logic: Kurangi stok dan catat log
        book.stock -= 1;
        await book.save();

        const log = await BorrowLog.create({
            userId: userId,
            bookId: book.id,
            latitude: latitude,
            longitude: longitude
            // borrowDate otomatis terisi default NOW
        });

        res.status(200).json({
            message: 'Peminjaman berhasil dicatat',
            sisa_stok: book.stock,
            transaksi: log
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// SERVER INITIALIZATION
// ==========================================

// Sinkronisasi Database dan Jalankan Server
// { force: false } mencegah data hilang saat server restart
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database & Tabel berhasil disinkronisasi.');
        app.listen(PORT, () => {
            console.log(`Server berjalan di http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Gagal koneksi database:', err);
    });