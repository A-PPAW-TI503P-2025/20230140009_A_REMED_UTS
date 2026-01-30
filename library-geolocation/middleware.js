// Middleware untuk proteksi fitur Admin
// Sesuai PDF Poin 55: Jika x-user-role = 'admin', boleh akses
const verifyAdmin = (req, res, next) => {
    const role = req.headers['x-user-role'];

    if (role === 'admin') {
        next();
    } else {
        res.status(403).json({ 
            message: 'Forbidden: Akses khusus Admin (Header x-user-role: admin diperlukan)' 
        });
    }
};

// Middleware untuk proteksi fitur User (Peminjaman)
// Sesuai PDF Poin 56: Jika x-user-role = 'user', boleh akses
const verifyUser = (req, res, next) => {
    const role = req.headers['x-user-role'];
    const userId = req.headers['x-user-id']; // Simulasi User ID dari header (Poin 52)

    if (role === 'user' && userId) {
        req.userId = userId; // Simpan userId ke object request agar bisa dipakai di controller
        next();
    } else {
        res.status(403).json({ 
            message: 'Forbidden: Akses khusus User. Pastikan header x-user-role: user dan x-user-id disertakan.' 
        });
    }
};

module.exports = { verifyAdmin, verifyUser };