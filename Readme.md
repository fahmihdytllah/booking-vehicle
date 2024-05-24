# Aplikasi Pemesanan Kendaraan

## Daftar Isi
- [Daftar Username dan Password](#daftar-username-dan-password)
- [Versi Database](#versi-database)
- [Versi Node](#versi-node)
- [Framework](#framework)
- [Panduan Penggunaan Aplikasi](#panduan-penggunaan-aplikasi)
  - [Persyaratan Sistem](#persyaratan-sistem)
  - [Instalasi](#instalasi)
  - [Menjalankan Aplikasi](#menjalankan-aplikasi)
  - [Penggunaan](#penggunaan)
    - [Login](#login)
    - [Membuat Pemesanan Kendaraan](#membuat-pemesanan-kendaraan)
    - [Persetujuan Pemesanan](#persetujuan-pemesanan)
    - [Melihat Status Pemesanan](#melihat-status-pemesanan)
  - [Laporan Pemesanan](#laporan-pemesanan)

## Daftar Username dan Password
- **Admin**
  - Username: `admin`
  - Password: `123456`
- **Approver Level 1**
  - Username: `approver1`
  - Password: `123456`
- **Approver Level 2**
  - Username: `approver2`
  - Password: `123456`

## Versi Database
- MongoDB: `4.4`

## Versi Node
- Node: `18.x`

## Framework
- Backend: Node.js `14.x`, Express `4.x`
- Frontend: EJS `3.x`

## Panduan Penggunaan Aplikasi

### Persyaratan Sistem
- Node.js `14.x` atau lebih tinggi
- MongoDB `4.4` atau lebih tinggi

### Instalasi
1. Clone repository ini:
   ```sh
   git clone https://github.com/fahmihdytllah/booking-vehicle.git
   cd booking-vehicle
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

3. Konfigurasi environment variables:
   Buat file `.env` di root directory dengan konten sebagai berikut:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/vehicle_booking
   SECRET=your_secret
   ```

### Menjalankan Aplikasi
1. Jalankan server:
   ```sh
   npm start
   ```

2. Akses aplikasi di browser:
   ```
   http://localhost:5000
   ```

### Penggunaan

#### Login
1. Buka halaman login di `http://localhost:5000/auth/login`.
2. Masukkan username dan password yang telah diberikan.

#### Membuat Pemesanan Kendaraan
1. Login sebagai admin.
2. Akses halaman pemesanan di `http://localhost:5000/u/booking-vehicle`.
3. Isi form pemesanan dengan memilih kendaraan, driver, approvers, serta tanggal mulai dan akhir pemesanan.
4. Klik tombol "Booking" untuk mengirimkan pemesanan.

#### Persetujuan Pemesanan
1. Login sebagai approver.
2. Akses halaman persetujuan di `http://localhost:5000/u/bookings`.
3. Lihat daftar pemesanan yang perlu disetujui.
4. Klik tombol "Setujui" atau "Tolak" untuk setiap pemesanan.

#### Melihat Status Pemesanan
1. Login sebagai admin.
2. Akses halaman dashboard di `http://localhost:5000/u/history`.
3. Lihat status dari setiap pemesanan yang telah dibuat.

### Laporan Pemesanan
1. Akses halaman laporan pemesanan di `http://localhost:5000/u/report`.
2. Pilih periode waktu yang diinginkan.
4. Klik tombol "Export" untuk mengunduh laporan dalam format PDF, Excel, dll.

## Logging
- Setiap proses pemesanan, persetujuan, dan penolakan akan tercatat di log aplikasi yang disimpan di folder `logs`.

## UI/UX
- Aplikasi ini dirancang dengan antarmuka yang responsif untuk memastikan pengalaman pengguna yang baik di berbagai perangkat.

---

Harap memastikan semua environment variables telah dikonfigurasi dengan benar dan semua dependencies telah diinstal sebelum menjalankan aplikasi. Untuk informasi lebih lanjut atau bantuan, silakan hubungi tim pengembang.