# Library System with Geolocation (Remedial UTS PAW)

Proyek ini adalah sistem backend dan frontend sederhana untuk manajemen perpustakaan yang mengimplementasikan fitur pencatatan lokasi peminjaman (Geolocation). Sistem ini dibangun untuk memenuhi tugas remedial mata kuliah **Pengembangan Aplikasi Web**.

---

## 🛠️ Teknologi yang Digunakan
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MySQL
* **ORM:** Sequelize
* **Frontend:** HTML5, CSS3 (Classic Academia Theme), Vanilla JS

---

## 🚀 Cara Menjalankan Aplikasi

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer lokal (localhost):

### 1. Persiapan Database
1.  Pastikan **XAMPP** (atau MySQL Server) sudah berjalan.
2.  Buka **phpMyAdmin** (`http://localhost/phpmyadmin`).
3.  Buat database baru dengan nama persis:
    ```sql
    library_db
    ```
    *(Anda tidak perlu membuat tabel/kolom secara manual. Aplikasi akan melakukan sinkronisasi otomatis menggunakan Sequelize saat pertama kali dijalankan).*

### 2. Instalasi Dependensi
Buka terminal (Command Prompt/Git Bash) di dalam folder proyek, lalu jalankan perintah:
```bash
npm install
```

### 3. Menjalankan Server
Jalankan server dengan perintah:

```bash
node server.js
```
Jika berhasil, terminal akan menampilkan pesan:

Database & Tabel berhasil disinkronisasi. Server berjalan di http://localhost:3000

4. Mengakses Aplikasi
Buka browser dan akses alamat berikut:
http://localhost:3000

📚 Dokumentasi Endpoint API
MethodEndpointAkses (Header)DeskripsiGET/api/booksPublicMelihat daftar semua buku
GET/api/books/:idPublicMelihat detail buku spesifik
POST/api/booksadminMenambah data buku baru
PUT/api/books/:idadminMengupdate data buku
DELETE/api/books/:idadminMenghapus buku
GET/api/admin/borrow-logsadminMelihat riwayat peminjaman & lokasi
POST/api/borrowuserMeminjam buku (mengurangi stok & catat lokasi)
