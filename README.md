# 📁 File URL Checker

**File URL Checker** adalah aplikasi Node.js sederhana untuk memverifikasi apakah sebuah file yang direferensikan oleh URL tersedia (mengembalikan status 200) atau tidak ditemukan (status 404). Proyek ini berguna untuk validasi URL secara massal dari file JSON.

---

## ✨ Fitur

- Membaca data dari file `file_url.json`
- Mengecek apakah file di setiap URL tersedia
- Pembatasan concurrency menggunakan [`p-limit`](https://www.npmjs.com/package/p-limit)
- Menyimpan hasil pengecekan ke file `results.json`

---

## 📦 Prasyarat

- [Node.js](https://nodejs.org/) v14 atau lebih baru
- [npm](https://www.npmjs.com/) (sudah termasuk dengan Node.js)

---

## 🚀 Instalasi

1. **Clone repositori ini**
   ```bash
   git clone https://github.com/fifinal/file-url-checker.git
   cd file-url-checker
   ```

2. **Inisialisasi proyek dan install dependensi**
   ```bash
   npm install
   ```

---

## 🛠️ Penggunaan

1. **Siapkan file `file_url.json`**
   Buat file `file_url.json` di root proyek dengan format berikut:
   ```json
   [
     {
        ...
       "url": "http://contoh.com/file1.json"
     },
     {
        ...
       "url": "http://contoh.com/file2.json"
     }
   ]
   ```

2. **Jalankan aplikasi**
   Gunakan perintah berikut untuk memulai pengecekan URL:
   ```bash
   node index.js
   ```

3. **Hasil pengecekan**
   Hasil pengecekan akan disimpan dalam file `results.json` dengan format berikut:
   ```json
   [
     {
       "url": "http://contoh.com/file1.json",
       "exists": true
     },
     {
       "url": "http://contoh.com/file2.json",
       "exists": false
     }
   ]
   ```

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
