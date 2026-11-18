document.addEventListener('DOMContentLoaded', () => {
  // 1. Generator 32 Gelembung Kaca Putih Kecil & Cepat
  const bubbleContainer = document.createElement('div');
  bubbleContainer.className = 'bubble-container';
  document.body.prepend(bubbleContainer);

  const jumlahGelembung = 32;
  for (let i = 0; i < jumlahGelembung; i++) {
    const bubble = document.createElement('span');
    bubble.className = 'bubble';

    const ukuran = Math.floor(Math.random() * 18) + 8;
    const posisiKiri = Math.floor(Math.random() * 98);
    const durasi = (Math.random() * 5 + 6).toFixed(1);
    const delay = (Math.random() * 6).toFixed(1);

    bubble.style.width = `${ukuran}px`;
    bubble.style.height = `${ukuran}px`;
    bubble.style.left = `${posisiKiri}%`;
    bubble.style.animationDuration = `${durasi}s`;
    bubble.style.animationDelay = `${delay}s`;

    bubbleContainer.appendChild(bubble);
  }

  // 2. Deteksi Otomatis Ekstensi Foto (foto1, foto2, foto3, foto4)
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

  // 3. Animasi Scroll Reveal
  const elemenAnimasi = document.querySelectorAll('.card, .step-card, .section-header, .pro-info-card, .pro-form-card');
  elemenAnimasi.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    elemenAnimasi.forEach(el => observer.observe(el));
  } else {
    elemenAnimasi.forEach(el => el.classList.add('active'));
  }

  // 4. Menu Mobile
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => navLinks.classList.toggle('show'));
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

  if (searchInput) searchInput.addEventListener('input', filterSOP);
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterSOP();
    });
  });

  // 6. Form Kontak & Usulan
  const formPengajuan = document.getElementById('formPengajuan');
  if (formPengajuan) {
    formPengajuan.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputNama = document.getElementById('namaPengirim');
      const nama = inputNama ? inputNama.value : 'Pengguna';
      alert(`Terima kasih, ${nama}! Tiket usulan/pertanyaan Anda telah tercatat di Aplikasi MSOP.`);
      formPengajuan.reset();
    });
  }
});

// 7. Database Detail SOP Aplikasi MSOP untuk Pop-up Modal
const sopDetails = {
  rekrutmen: {
    kode: "SOP-MSOP-01",
    judul: "Rekrutmen & Onboarding Anggota Baru",
    langkah: [
      "Kepala unit mengajukan formulir kebutuhan tenaga kerja melalui modul pengajuan di Aplikasi MSOP.",
      "Tim SDM melakukan penyaringan berkas, wawancara kompetensi, dan tes teknis kandidat.",
      "Kandidat terpilih menandatangani kontrak kerja dan menerima akun login Aplikasi MSOP.",
      "Tim SDM melaksanakan orientasi pengenalan alur kerja dan SOP unit pada hari pertama."
    ]
  },
  operasional: {
    kode: "SOP-MSOP-02",
    judul: "Pelaksanaan Proyek & Kontrol Kualitas",
    langkah: [
      "Penanggung jawab proyek menyusun jadwal kerja dan pembagian tugas tim sesuai target.",
      "Pelaksana menjalankan pekerjaan dengan berpedoman pada standar mutu di Aplikasi MSOP.",
      "Supervisor melakukan pemeriksaan kualitas (Quality Control) pada setiap tahapan pekerjaan.",
      "Laporan penyelesaian pekerjaan diunggah ke sistem sebelum serah terima hasil."
    ]
  },
  layanan: {
    kode: "SOP-MSOP-03",
    judul: "Penanganan Keluhan & Layanan Pengguna",
    langkah: [
      "Tim layanan menerima laporan atau pertanyaan pengguna dan mencatatnya sebagai tiket resmi.",
      "Kendala diklasifikasikan berdasarkan tingkat urgensi dan diteruskan ke tim terkait.",
      "Tim teknis menyelesaikan masalah sesuai batas waktu layanan (SLA) yang ditetapkan.",
      "Tim layanan mengonfirmasi penyelesaian kepada pengguna dan menutup tiket."
    ]
  },
  keuangan: {
    kode: "SOP-MSOP-04",
    judul: "Pengajuan Anggaran & Klaim Biaya",
    langkah: [
      "Pemohon mengisi formulir pengajuan dana dan melampirkan rincian kebutuhan biaya.",
      "Kepala unit memverifikasi kesesuaian anggaran dengan rencana kerja.",
      "Tim keuangan memeriksa kelengkapan kuitansi/nota asli sebelum memproses pencairan.",
      "Bukti transfer dan laporan pertanggungjawaban diarsipkan secara digital."
    ]
  },
  keamanan: {
    kode: "SOP-MSOP-05",
    judul: "Keamanan Data & Hak Akses Aplikasi",
    langkah: [
      "Admin sistem mengatur level hak akses (Admin, Approver, atau User) sesuai peran pengguna.",
      "Setiap pengguna wajib menjaga kerahasiaan kata sandi dan memperbaruinya secara berkala.",
      "Dokumen internal berstatus rahasia hanya dapat diunduh oleh pihak yang memiliki otorisasi.",
      "Sistem melakukan pencadangan (backup) database MSOP secara otomatis setiap minggu."
    ]
  },
  aset: {
    kode: "SOP-MSOP-06",
    judul: "Pengadaan & Pemeliharaan Inventaris",
    langkah: [
      "Unit kerja mengajukan permintaan pengadaan perangkat kerja melalui form inventaris.",
      "Setiap barang yang diterima dicatat dalam sistem aset dan diberi label kode inventaris.",
      "Pengguna wajib merawat perangkat kerja dan melaporkan kerusakan sesegera mungkin.",
      "Tim pengelola melakukan pengecekan kondisi inventaris secara rutin setiap 6 bulan."
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
  if (e.target === modal) tutupModal();
});
