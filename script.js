document.addEventListener('DOMContentLoaded', () => {
  // 1. Generator 32 Gelembung Kaca Putih Kecil & Cepat
  const bubbleContainer = document.createElement('div');
  bubbleContainer.className = 'bubble-container';
  document.body.prepend(bubbleContainer);

  const jumlahGelembung = 32;
  for (let i = 0; i < jumlahGelembung; i++) {
    const bubble = document.createElement('span');
    bubble.className = 'bubble';

    const ukuran = Math.floor(Math.random() * 18) + 8;   // Ukuran kecil: 8px - 26px
    const posisiKiri = Math.floor(Math.random() * 98);   // Posisi: 0% - 98%
    const durasi = (Math.random() * 5 + 6).toFixed(1);   // Cepat: 6.0s - 11.0s
    const delay = (Math.random() * 6).toFixed(1);        // Delay acak: 0s - 6s

    bubble.style.width = `${ukuran}px`;
    bubble.style.height = `${ukuran}px`;
    bubble.style.left = `${posisiKiri}%`;
    bubble.style.animationDuration = `${durasi}s`;
    bubble.style.animationDelay = `${delay}s`;

    bubbleContainer.appendChild(bubble);
  }

  // 2. Deteksi Otomatis Ekstensi Foto (foto1, foto2, foto3, foto4 -> .jpg / .jpeg / .png / .webp)
  const semuaGambar = document.querySelectorAll('img[data-foto]');
  semuaGambar.forEach(img => {
    const namaDasar = img.getAttribute('data-foto');
    const daftarEkstensi = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG'];
    let indeks = 0;

    function cobaBerikutnya() {
      if (indeks < daftarEkstensi.length) {
        img.src = namaDasar + daftarEkstensi[indeks];
        indeks++;
      } else {
        img.onerror = null;
      }
    }

    img.onerror = cobaBerikutnya;
    cobaBerikutnya();
  });

  // 3. Animasi Muncul Halus Saat Scroll (Scroll Reveal)
  const elemenAnimasi = document.querySelectorAll('.card, .step-card, .section-header, .info-panel, .form-box');
  elemenAnimasi.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    elemenAnimasi.forEach(el => observer.observe(el));
  } else {
    elemenAnimasi.forEach(el => el.classList.add('active'));
  }

  // 4. Toggle Menu Navigasi Mobile
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // 5. Filter & Live Search Halaman Katalog SOP
  const searchInput = document.getElementById('searchSop');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const sopCards = document.querySelectorAll('.sop-item');

  function filterSOP() {
    const keyword = searchInput ? searchInput.value.toLowerCase() : '';
    const activeBtn = document.querySelector('.filter-btn.active');
    const kategori = activeBtn ? activeBtn.getAttribute('data-filter') : 'semua';

    sopCards.forEach(card => {
      const teks = card.textContent.toLowerCase();
      const cardKat = card.getAttribute('data-kategori');
      const cocokTeks = teks.includes(keyword);
      const cocokKat = kategori === 'semua' || cardKat === kategori;

      card.style.display = (cocokTeks && cocokKat) ? 'flex' : 'none';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterSOP);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterSOP();
    });
  });

  // 6. Pengiriman Formulir Halaman Kontak
  const formPengajuan = document.getElementById('formPengajuan');
  if (formPengajuan) {
    formPengajuan.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputNama = document.getElementById('namaPengirim');
      const nama = inputNama ? inputNama.value : 'Pengguna';
      alert(`Terima kasih, ${nama}! Usulan/pertanyaan SOP PKBM ISESW telah berhasil dikirim.`);
      formPengajuan.reset();
    });
  }
});

// 7. Database Detail SOP & Fungsi Pop-up Modal
const sopDetails = {
  ppdb: {
    kode: "SOP-ISESW-01",
    judul: "Penerimaan Peserta Didik Baru (PPDB) & Kursus",
    langkah: [
      "Calon warga belajar mengisi formulir pendaftaran dan memilih program (Paket A, B, C, atau Kursus Komputer/Bahasa).",
      "Petugas administrasi memverifikasi berkas wajib: Fotokopi Ijazah terakhir, Rapor, KK, dan Akta Kelahiran.",
      "Operator melakukan input dan validasi data peserta ke sistem Dapodik untuk penerbitan NISN.",
      "Koordinator program menetapkan rombongan belajar serta jadwal kelas."
    ]
  },
  kbm: {
    kode: "SOP-ISESW-02",
    judul: "Pelaksanaan Kegiatan Belajar Mengajar (KBM)",
    langkah: [
      "Tutor menyiapkan modul ajar, rencana pembelajaran, dan daftar hadir sebelum sesi dimulai.",
      "Pembelajaran dilaksanakan melalui metode tatap muka terjadwal, tutorial, dan penugasan mandiri.",
      "Tutor mencatat perkembangan penyelesaian Satuan Kredit Kompetensi (SKK) setiap warga belajar.",
      "Peserta kursus komputer wajib mematuhi prosedur pemakaian perangkat dan menjaga kebersihan lab."
    ]
  },
  ujian: {
    kode: "SOP-ISESW-03",
    judul: "Evaluasi Modul & Ujian Pendidikan Kesetaraan (UPK)",
    langkah: [
      "Warga belajar wajib memenuhi minimal kehadiran 75% untuk mengikuti evaluasi akhir.",
      "Tutor menyelenggarakan uji kompetensi modul setiap kali satu unit materi selesai.",
      "Peserta tingkat akhir mengikuti UPK berbasis komputer sesuai jadwal nasional.",
      "Lembaga menerbitkan rapor, sertifikat kursus, dan memproses ijazah resmi negara."
    ]
  },
  bop: {
    kode: "SOP-ISESW-04",
    judul: "Pengelolaan Keuangan & Dana BOP Kesetaraan",
    langkah: [
      "Bendahara bersama Ketua PKBM menyusun Rencana Kegiatan dan Anggaran Sekolah (RKAS).",
      "Pencairan dan penggunaan anggaran disesuaikan dengan petunjuk teknis BOP Kesetaraan.",
      "Setiap transaksi wajib dilengkapi bukti kuitansi sah, nota, dan dokumentasi kegiatan.",
      "Pelaporan keuangan disusun berkala untuk audit internal dan pelaporan dinas terkait."
    ]
  },
  dapodik: {
    kode: "SOP-ISESW-05",
    judul: "Tata Kelola Data Pokok Pendidikan (Dapodik)",
    langkah: [
      "Operator melakukan pemutakhiran data warga belajar, tutor, dan sarana prasarana setiap semester.",
      "Validasi nomor induk kependudukan (NIK) dan NISN dilakukan sebelum batas waktu cut-off.",
      "Sinkronisasi data dilakukan atas persetujuan Ketua PKBM ISESW.",
      "Arsip salinan profil sekolah dan berita acara sinkronisasi disimpan secara digital."
    ]
  },
  sarpras: {
    kode: "SOP-ISESW-06",
    judul: "Penggunaan & Pemeliharaan Sarana Prasarana",
    langkah: [
      "Peminjaman ruang kelas atau perangkat komputer di luar jadwal wajib dicatat di buku log.",
      "Pengguna memastikan seluruh perangkat elektronik dan pendingin ruangan dimatikan setelah selesai.",
      "Petugas sarpras melakukan pengecekan rutin kondisi komputer, jaringan internet, dan meja belajar.",
      "Kerusakan alat segera dilaporkan kepada pengelola untuk tindak lanjut perbaikan."
    ]
  }
};

function bukaModal(id) {
  const modal = document.getElementById('sopModal');
  const data = sopDetails[id];
  if (!modal || !data) return;

  const modalKode = document.getElementById('modalKode');
  const modalJudul = document.getElementById('modalJudul');
  const listEl = document.getElementById('modalLangkah');

  if (modalKode) modalKode.textContent = data.kode;
  if (modalJudul) modalJudul.textContent = data.judul;

  if (listEl) {
    listEl.innerHTML = '';
    data.langkah.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      listEl.appendChild(li);
    });
  }

  modal.style.display = 'flex';
}

function tutupModal() {
  const modal = document.getElementById('sopModal');
  if (modal) modal.style.display = 'none';
}

window.addEventListener('click', (e) => {
  const modal = document.getElementById('sopModal');
  if (e.target === modal) {
    tutupModal();
  }
});
