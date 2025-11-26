<div align="center">

# CAMPUS LOST FOUND

...

</div>

| Nama             | NRP        |
| ---------------  | ---------- |
| Ica Zika Hamizah | 5027241058 |

[](https://opensource.org/licenses/MIT)

Aplikasi web fullstack (MERN) yang didesain untuk memusatkan dan mempermudah proses pelaporan dan pelacakan barang hilang atau temuan di lingkungan kampus secara real-time.

## 💡 Masalah yang Diselesaikan (Problem Statement)

Masalah umum di lingkungan kampus adalah hilangnya barang berharga, di mana informasi pelaporan seringkali tersebar di grup chat WhatsApp atau *timeline* media sosial.

  * **Penyebaran Informasi:** Informasi barang hilang cepat tenggelam oleh chat atau postingan lain.
  * **Kurangnya Bukti:** Sulit memverifikasi klaim barang tanpa adanya foto bukti.
  * **Privasi:** Tidak ada jalur komunikasi privat antara penemu dan pemilik barang.

## 🚀 Solusi yang Dibuat (Solution Overview)

**CAMPUS LOST FOUND** adalah *centralized digital board* yang menyediakan satu sumber terpercaya untuk semua laporan barang hilang/temuan di kampus. Pengguna dapat langsung mengunggah foto barang temuan, dan pengguna lain dapat mencari atau mengklaim kepemilikan.

## ⚙️ Tech Stack & Fitur Utama

### 1\. Teknologi Dasar (MERN Stack)

| Bagian | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Database** | MongoDB Atlas | Penyimpanan data pengguna dan laporan barang. |
| **Backend** | Node.js (Express.js) | Server API, Autentikasi, dan File Handling. |
| **Frontend** | React.js (via Vite) | Antarmuka pengguna yang dinamis dan modular. |
| **Styling** | Pure CSS (Custom Theme) | Desain bersih, *light mode*, dan terpusat (menggantikan Tailwind). |
| **Tools** | JWT, Multer, Bcrypt.js | Keamanan sesi, *password hashing*, dan penanganan *file upload*. |

### 2\. Fitur Utama (Fungsionalitas)

1.  **Akses Terproteksi (Authentication & JWT):**
      * Registrasi dan Login pengguna dengan *password hashing* (`bcrypt`).
      * Pengelolaan sesi menggunakan Token JWT yang disimpan di *localStorage*.
2.  **CRUD Lengkap pada Item:**
      * **CREATE:** Pengguna dapat membuat laporan barang baru via form *upload* (`/add`).
      * **READ:** Menampilkan semua laporan di Dashboard.
      * **DELETE:** Hanya **pembuat laporan** (founder) yang diizinkan menghapus laporan (diverifikasi oleh JWT di *backend*).
3.  **Advanced Filtering & Search:**
      * **Filter Tabs:** Memisahkan tampilan menjadi "Semua Laporan" dan "Laporan Saya".
      * **Search Bar:** Memungkinkan pencarian *client-side* berdasarkan nama, lokasi, dan deskripsi barang.
4.  **Image Handling (Multer):** Laporan wajib menyertakan foto barang temuan.
5.  **User Experience (UX) Polished:**
      * *Custom Modal* konfirmasi saat berhasil melaporkan barang.
      * *Custom Modal* konfirmasi sebelum *logout* (mencegah *logout* tidak disengaja).

-----

## 📸 Galeri Aplikasi (Screenshots)

| Halaman | Deskripsi | Screenshot |
| :--- | :--- | :--- |
| **Login / Register** | Tampilan *Card* terpusat untuk autentikasi. | ![register](assets/register.png)![login](assets/login.png) |
| **Dashboard Utama** | Tampilan *grid* semua barang temuan, lengkap dengan *Search Bar* dan *Filter Tabs*. | ![dashboard](assets/dashboard.png) |
| **Item Card Detail** | Tampilan detail kartu barang yang menampilkan gambar, lokasi (📍), dan tombol Hapus (jika milik sendiri). | ![detail](assets/detail.png) |
| **Lapor Barang** | Tampilan form untuk mengunggah detail barang dan foto. | ![laporbarang](assets/laporbarang.png) |
| **Logout** | Validasi menggunakan modal. | ![logout](assets/logout.png) |

-----

## 📦 Cara Menjalankan Project (Setup Instructions)

Pastikan Anda memiliki Node.js, npm, dan MongoDB Atlas yang sudah diatur.

### A. Persiapan Database & Environment

1.  **Buat File `.env`:** Di dalam folder `backend/`, buat file `.env` dan isi dengan kunci rahasia Anda:
    ```env
    MONGO_URI=mongodb+srv://[username]:[password]@cluster0.../[db_name]
    JWT_SECRET=YOUR_VERY_SECRET_KEY
    PORT=5000
    ```

### B. Menjalankan Backend (Server API)

1.  Masuk ke folder backend: `cd backend`
2.  Instal dependensi: `npm install`
3.  Jalankan server: `npm run dev` (API akan berjalan di `http://localhost:5000`)

### C. Menjalankan Frontend (React App)

1.  Buka terminal baru, masuk ke folder frontend: `cd frontend`
2.  Instal dependensi: `npm install`
3.  Jalankan aplikasi React: `npm run dev` (Aplikasi akan berjalan di `http://localhost:5173`)