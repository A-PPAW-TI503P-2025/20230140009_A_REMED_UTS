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

## 📚 Dokumentasi Endpoint API

| Method | Endpoint | Akses (Header) | Deskripsi |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/books` | Public | Melihat daftar semua buku |
| `GET` | `/api/books/:id` | Public | Melihat detail buku spesifik |
| `POST` | `/api/books` | `x-user-role: admin` | Menambah data buku baru |
| `PUT` | `/api/books/:id` | `x-user-role: admin` | Mengupdate data buku |
| `DELETE` | `/api/books/:id` | `x-user-role: admin` | Menghapus buku |
| `GET` | `/api/admin/borrow-logs` | `x-user-role: admin` | Melihat riwayat peminjaman & lokasi |
| `POST` | `/api/borrow` | `x-user-role: user` | Meminjam buku (mengurangi stok & catat lokasi) |

SCREENSHOT ENDPOINT API
### 1. Screenshot Menambah buku baru
<img width="1920" height="1080" alt="Screenshot 2026-01-30 095636" src="https://github.com/user-attachments/assets/e831d9d7-f0f4-4a04-ada4-205f2edcda76" />
### 2. Screenshot Melihat daftar semua buku
<img width="1920" height="1080" alt="Screenshot 2026-01-30 100018" src="https://github.com/user-attachments/assets/cc6fabb1-9109-4a24-a04f-c65155fb544e" />
### 3. Melihat detail buku spesifik
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e4e0dcea-4730-455f-a77b-a386ccfacf3b" />
### 4. Mengupdate data buku
<img width="1920" height="1080" alt="Screenshot 2026-01-30 100452" src="https://github.com/user-attachments/assets/bd0397f2-b8a1-4e6b-8018-d7f4ee79c065" />
### 5. Menghapus data buku
<img width="1920" height="1080" alt="Screenshot 2026-01-30 100556" src="https://github.com/user-attachments/assets/0c080c5b-d6e7-4561-a6aa-447c90687f91" />
### 6. Meminjam buku (mengurangi stok dan catat lokasi)
<img width="1920" height="1080" alt="Screenshot 2026-01-30 101040" src="https://github.com/user-attachments/assets/d2068035-b1e8-43cf-82a4-5fbcc4103a71" />
### 7. Melihat riwayat peminjaman dan lokasi
<img width="1920" height="1080" alt="Screenshot 2026-01-30 100644" src="https://github.com/user-attachments/assets/91e1ba8c-66eb-4d78-b817-88d607a7535a" />






