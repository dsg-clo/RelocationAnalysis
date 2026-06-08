# BRI Geo-AI Analysis for Relocations (v4.2)

> **Channel Location Optimization Matrix & Geo-Intelligence Framework**

BRI Geo-AI Analysis for Relocations adalah platform analisis geo-spasial internal yang dirancang khusus untuk mensimulasikan, menguji, dan membandingkan indeks kelayakan lokasi jaringan kantor eksisting (_Existing Node_) terhadap target lokasi ekspansi baru (_Candidate Node_).

Aplikasi ini mengadopsi pendekatan **Weighted Scoring Matrix** multidimensi guna memitigasi risiko kanibalisme pasar internal (_internal market erosion_), mendeteksi _blindspot_ kompetitor (_Peers_), serta mengoptimalkan _yield_ produktivitas operasional jaringan kantor Bank BRI.

---

## 🏛️ Strategic Scoring Architecture

Aplikasi ini berjalan murni menggunakan matriks pembobotan geo-intelligence struktural yang terbagi ke dalam dua model utama:

### 1. Modelling Existing Location (Bobot Model: 40%)

Fokus pada evaluasi ketahanan jaringan operasional aktif saat ini berdasarkan tingkat kejenuhan wilayah dan produktivitas unit kerja.

- **Kehadiran UKO BRI (20%)**
  - _Volume Density_ dalam radius 2 km (Bobot 80%): `> 1 UKO (100%)` | `Tidak ada UKO (25%)`
  - _Proximity Jarak_ ke UKO terdekat (Bobot 20%): `< 1 km (KC: 100%, KCP: 60%, Unit: 30%, KK: 10%)` | `> 1 km (25%)`
- **Kehadiran UKO Peers / Kompetitor (20%)**
  - _Volume Density_ dalam radius 2 km (Bobot 80%): `Terdapat peers (25%)` | `Tidak ada peers (100%)`
  - _Proximity Jarak_ ke Peers terdekat (Bobot 20%): `< 1 km (25%)` | `> 1 km (100%)`
- **Potensi Wilayah / Network Optimization Grid (40%)**
  - `Star (25%)` | `Growth (50%)` | `Saturated (75%)` | `Laggard (100%)`
- **Performance Unit Saat Ini (20%)**
  - `High (25%)` | `Medium (50%)` | `Low (100%)`

### 2. Modelling Candidate Location (Bobot Model: 60%)

Fokus pada proyeksi kelayakan wilayah ekspansi baru untuk menangkap pangsa pasar ofensif dengan risiko minimum.

- **Kehadiran UKO BRI (20%)**
  - _Volume Density_ dalam radius 2 km (Bobot 20%): `> 1 UKO (0%)` | `Tidak ada UKO (100%)`
  - _Proximity Jarak_ ke UKO terdekat (Bobot 80%): `< 1 km (KC: 25%, KCP: 50%, Unit: 75%, KK: 90%)` | `> 1 km / Tidak ada UKO (100%)`
- **Kehadiran UKO Peers / Kompetitor (20%)**
  - _Volume Density_ dalam radius 2 km (Bobot 20%): `Terdapat peers (100%)` | `Tidak ada peers (25%)`
  - _Proximity Jarak_ ke Peers terdekat (Bobot 80%): `< 1 km (100%)` | `> 1 km (25%)`
- **Potensi Wilayah Baru (60%)**
  - `Star (100%)` | `Growth (75%)` | `Saturated (50%)` | `Laggard (25%)`

---

## 🛠️ Tech Stack & Architecture

Aplikasi ini dibangun menggunakan arsitektur modern web frontend yang ringan, cepat, dan responsif:

- **Core Framework:** React 18+ (Vite)
- **Design Language / Styling:** Tailwind CSS v4 (Menggunakan arsitektur `@import` kompilator Lightningcss terbaru)
- **State Management & Logic:** Pure Client-Side JavaScript Component Routing
- **Visual Components:** Custom SVG Radial Gauge Performance Ring & CSS Grid Analytics Card

---

## 🚀 Panduan Menjalankan Aplikasi di Lokal

### Prasyarat (Prerequisites)

Pastikan komputer Anda sudah terpasang **Node.js** (Versi 18 ke atas direkomendasikan).

### Langkah Instalasi

1. **Clone Repositori**

```bash
   git clone [https://github.com/dsg-clo/RelocationAnalysis.git](https://github.com/dsg-clo/RelocationAnalysis.git)
   cd RelocationAnalysis
```
