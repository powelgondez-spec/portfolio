# portfolio — Andreas Powel Sinaga

Situs portofolio satu halaman untuk menawarkan **jasa pembuatan website**
(landing page, company profile, website UMKM). Dibuat dengan HTML, CSS, dan
JavaScript murni — tanpa build tool dan tanpa dependency.

## Isi folder

| File | Fungsi |
|---|---|
| `index.html` | Struktur halaman, sprite ikon SVG, modal proyek, JSON-LD |
| `styles.css` | Design system, layout responsif, animasi, gaya modal |
| `script.js` | Menu mobile, header scroll, reveal on scroll, scrollspy, FAQ, modal |
| `README.md` | Dokumentasi ini |
| `robots.txt` | Arahan crawler + lokasi sitemap |
| `sitemap.xml` | Daftar URL untuk mesin pencari |
| `404.html` | Halaman error kustom (mandiri, CSS inline) |
| `og-image.png` | Gambar pratinjau 1200×630 untuk WhatsApp/LinkedIn/X |
| `proyek/ngeps/index.html` | Demo langsung landing page NgePS (proyek kedua), self-contained |

> Folder `proyek/ngeps` adalah salinan dari proyek NgePS. Kalau kamu memperbarui
> `rental-ps/index.html`, salin ulang file itu ke `proyek/ngeps/index.html`.
> Nomor WhatsApp di dalam demo NgePS sudah disamakan dengan nomor utama di atas.

## Menjalankan

Klik dua kali `index.html`, atau lewat PowerShell:

```powershell
Start-Process "$env:USERPROFILE\portfolio\index.html"
```

Tidak perlu server lokal. Semua fitur berjalan dari file langsung, termasuk tombol
**Buka demo** yang mengarah ke `proyek/ngeps/index.html`.

## Yang perlu diganti

| Bagian | Lokasi | Catatan |
|---|---|---|
| Nomor WhatsApp | Cari `6287789734353` di `index.html` | Ada di 7 tempat (header, hero, 3 layanan, kontak, tombol melayang) |
| Nomor tampil | Cari `0877-8973-4353` di `index.html` | Teks yang terlihat pengunjung di bagian kontak |
| Alamat GitHub | Cari `powelgondez-spec` di `index.html` | Ada di 3 tempat: kontak, footer, JSON-LD |
| Judul & deskripsi | `<title>`, `meta description`, `og:*` | Sesuaikan bila nama brand berubah |
| Detail proyek | `<template id="tpl-portfolio">` dan `<template id="tpl-ngeps">` | Isi modal yang muncul dari tombol **Lihat detail** |
| Demo NgePS | Cari `proyek/ngeps/index.html` di `index.html` | Ada di 2 tempat: kartu proyek dan modal NgePS |
| URL situs | Cari `powelgondez-spec.github.io/portfolio` di `index.html`, `robots.txt`, `sitemap.xml` | Ganti bila pakai domain sendiri |

> Untuk mengganti nomor WhatsApp, ganti **semua** kemunculan `6287789734353`
> dengan nomor format internasional tanpa `+` dan tanpa `0` di depan
> (contoh: `0812...` menjadi `62812...`).

## Struktur kode

- **Ikon** didefinisikan sekali sebagai `<symbol>` di awal `<body>`, lalu dipakai
  dengan `<use href="#i-...">`. Untuk menambah ikon, tambahkan `<symbol>` baru —
  jangan menyalin path SVG ke banyak tempat.
- **CSS** dibagi per komponen bernomor: token → base → utilities → buttons →
  header → hero → section → layanan → proyek → proses → why → FAQ → kontak →
  footer → WhatsApp float → modal → animasi → responsif → reduced-motion.
- **JS** berisi fungsi-fungsi kecil di dalam satu IIFE, dijalankan sekali saat
  halaman siap. Tidak ada global selain `window.__revealReady` (failsafe).
- **Modal** memakai elemen native `<dialog>`; isi detail diambil dari
  `<template>`, jadi tidak ada HTML proyek yang diduplikasi.
- **Demo proyek** disimpan sebagai file statis di `proyek/ngeps/` dan dibuka di
  tab baru. Tidak perlu hosting terpisah dan tetap jalan saat dibuka dari file lokal.

## Detail desain

- Warna utama: emerald `#0f9f6e` / `#10b981`, navy `#0a1626`, latar lembut `#f4f8f6`.
- Font: Plus Jakarta Sans (Google Fonts). Tanpa internet, browser memakai font sistem.
- Breakpoint: 1000px, 900px, 700px, 640px, 420px.
- Mendukung `prefers-reduced-motion`, navigasi keyboard, skip-link, dan
  kontras teks WCAG AA.
- Tanpa gambar eksternal di halaman: semua visual (avatar, mockup proyek) dibuat
  dengan CSS. Satu-satunya berkas gambar adalah `og-image.png` untuk pratinjau sosial.

## SEO & URL

Semua URL absolut di proyek ini memakai alamat GitHub Pages:

```
https://powelgondez-spec.github.io/portfolio/
```

URL tersebut muncul di `index.html` (canonical, `og:url`, `og:image`,
`twitter:image`, JSON-LD), `robots.txt`, dan `sitemap.xml`. Kalau nanti pindah ke
domain sendiri, ganti semuanya sekaligus. `404.html` memakai path `/portfolio/`
untuk tombol beranda — sesuaikan juga bila pindah domain.

`og-image.png` dibuat 1200×630 px (rasio yang dipakai WhatsApp, LinkedIn, X).
Kalau teks di hero berubah, gambar ini perlu dibuat ulang.

## Upload ke GitHub Pages

1. Buat repository baru, misalnya `portfolio`, di `https://github.com/powelgondez-spec`.
2. **Add file → Upload files**, tarik semua file (`index.html`, `styles.css`,
   `script.js`, `404.html`, `robots.txt`, `sitemap.xml`, `og-image.png`) dan
   folder `proyek` (beserta isinya), lalu commit. Struktur folder harus tetap
   sama supaya tombol **Buka demo** berfungsi.
3. Masuk **Settings → Pages**.
4. **Build and deployment** → Source: **Deploy from a branch**.
5. Branch **main**, folder **/ (root)** → **Save**.
6. Tunggu 1–2 menit, situs aktif di:
   `https://powelgondez-spec.github.io/portfolio/`

## Catatan

- Form kontak sengaja tidak dipakai; semua CTA langsung ke WhatsApp supaya tidak
  butuh backend dan tidak ada pesan yang hilang.
- Harga layanan tidak dicantumkan; penawaran dibahas saat konsultasi.
- Demo NgePS ada di `proyek/ngeps/index.html`; setelah online, alamatnya menjadi
  `https://powelgondez-spec.github.io/portfolio/proyek/ngeps/index.html`.
- Setelah situs online, cek pratinjau link di WhatsApp/LinkedIn. Kalau headline
  berubah, buat ulang `og-image.png` dengan rasio 1200×630.
