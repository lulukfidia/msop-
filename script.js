
// Menampilkan ikon Lucide
function refreshIcons() {
  if (window.lucide) {
    lucide.createIcons();
  }
}
refreshIcons();

// Tahun otomatis pada footer
document.querySelectorAll(".year").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// Menu navigasi untuk perangkat mobile
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    const icon = menuToggle.querySelector("i");
    if (icon) {
      icon.setAttribute(
        "data-lucide",
        navMenu.classList.contains("open") ? "x" : "menu"
      );
      refreshIcons();
    }
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
  });
}

// Data contoh SOP
const sopData = {
  1: {
    code: "SOP-001",
    title: "Pengelolaan Dokumen dan Arsip",
    purpose: "Menjadi pedoman dalam pencatatan, penyimpanan, pemeliharaan, dan pencarian dokumen agar tertata dengan baik.",
    scope: "Berlaku untuk seluruh bagian yang melakukan pengelolaan dokumen dan arsip.",
    steps: [
      "Petugas menerima dokumen yang akan diarsipkan.",
      "Dokumen diperiksa kelengkapan dan kebenaran informasinya.",
      "Dokumen dicatat dalam daftar atau sistem arsip.",
      "Dokumen dikelompokkan berdasarkan jenis dan tanggal.",
      "Dokumen disimpan pada tempat yang telah ditentukan.",
      "Petugas melakukan pembaruan data apabila terdapat perubahan."
    ],
    responsibility: "Petugas administrasi dan bagian terkait."
  },
  2: {
    code: "SOP-002",
    title: "Pelaksanaan Kegiatan Operasional",
    purpose: "Memberikan pedoman pelaksanaan kegiatan agar berjalan sesuai rencana dan standar yang telah ditetapkan.",
    scope: "Berlaku bagi seluruh bagian yang terlibat dalam kegiatan operasional.",
    steps: [
      "Koordinator menetapkan rencana dan tujuan kegiatan.",
      "Petugas mempersiapkan kebutuhan dan sumber daya.",
      "Koordinator membagi tugas kepada anggota.",
      "Kegiatan dilaksanakan sesuai prosedur.",
      "Setiap kendala dicatat dan dilaporkan.",
      "Hasil kegiatan disampaikan kepada koordinator."
    ],
    responsibility: "Koordinator dan petugas operasional."
  },
  3: {
    code: "SOP-003",
    title: "Monitoring dan Evaluasi",
    purpose: "Memastikan kegiatan berjalan sesuai prosedur serta menemukan peluang perbaikan.",
    scope: "Berlaku untuk kegiatan dan proses kerja yang telah memiliki standar operasional.",
    steps: [
      "Petugas menetapkan aspek yang akan dipantau.",
      "Data pelaksanaan kegiatan dikumpulkan.",
      "Pelaksanaan dibandingkan dengan standar yang berlaku.",
      "Ketidaksesuaian dicatat dan dianalisis.",
      "Hasil evaluasi disampaikan kepada koordinator.",
      "Tindakan perbaikan ditetapkan dan dipantau."
    ],
    responsibility: "Petugas pengawasan dan koordinator MSOP."
  },
  4: {
    code: "SOP-004",
    title: "Pengelolaan Surat Masuk dan Keluar",
    purpose: "Menjamin surat masuk dan keluar tercatat, tersampaikan, dan tersimpan dengan tertib.",
    scope: "Berlaku untuk seluruh kegiatan surat-menyurat organisasi.",
    steps: [
      "Petugas menerima surat atau menyiapkan surat keluar.",
      "Surat diperiksa kelengkapan dan tujuannya.",
      "Surat dicatat dalam buku atau sistem agenda.",
      "Surat diteruskan kepada pihak yang dituju.",
      "Bukti penerimaan atau pengiriman disimpan.",
      "Salinan surat diarsipkan sesuai ketentuan."
    ],
    responsibility: "Petugas administrasi."
  },
  5: {
    code: "SOP-005",
    title: "Koordinasi dan Komunikasi Internal",
    purpose: "Menciptakan komunikasi yang jelas dan koordinasi yang efektif antarbagian.",
    scope: "Berlaku bagi seluruh anggota dan bagian dalam organisasi.",
    steps: [
      "Pihak terkait menentukan informasi yang perlu disampaikan.",
      "Informasi disampaikan melalui saluran komunikasi resmi.",
      "Penerima memastikan informasi telah dipahami.",
      "Jika diperlukan, koordinasi dilakukan melalui rapat.",
      "Keputusan dan hasil koordinasi dicatat.",
      "Tindak lanjut disampaikan kepada pihak terkait."
    ],
    responsibility: "Koordinator dan seluruh bagian terkait."
  },
  6: {
    code: "SOP-006",
    title: "Penanganan Kendala dan Tindak Lanjut",
    purpose: "Memberikan langkah penanganan kendala agar masalah dapat diselesaikan secara terarah.",
    scope: "Berlaku untuk kendala yang terjadi dalam pelaksanaan kegiatan operasional.",
    steps: [
      "Petugas mengidentifikasi kendala yang terjadi.",
      "Kendala dicatat beserta waktu dan dampaknya.",
      "Laporan disampaikan kepada koordinator.",
      "Penyebab masalah dianalisis bersama pihak terkait.",
      "Tindakan penyelesaian ditetapkan dan dilaksanakan.",
      "Hasil penyelesaian dievaluasi dan didokumentasikan."
    ],
    responsibility: "Petugas terkait dan koordinator MSOP."
  }
};

// Pencarian dan filter SOP
const searchInput = document.getElementById("sopSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const sopCards = document.querySelectorAll(".sop-card");
const emptyState = document.getElementById("emptyState");

let activeCategory = "semua";

function filterSop() {
  if (!searchInput) return;

  const keyword = searchInput.value.toLowerCase().trim();
  let visibleCount = 0;

  sopCards.forEach((card) => {
    const title = (card.dataset.title || "").toLowerCase();
    const category = card.dataset.category || "";
    const code = card.querySelector(".sop-code")?.textContent.toLowerCase() || "";

    const matchesKeyword =
      title.includes(keyword) || code.includes(keyword);
    const matchesCategory =
      activeCategory === "semua" || category === activeCategory;

    const visible = matchesKeyword && matchesCategory;
    card.hidden = !visible;

    if (visible) visibleCount++;
  });

  if (emptyState) {
    emptyState.hidden = visibleCount !== 0;
  }
}

if (searchInput) {
  searchInput.addEventListener("input", filterSop);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeCategory = button.dataset.filter;
    filterSop();
  });
});

// Modal untuk melihat detail SOP
const sopModal = document.getElementById("sopModal");
const modalTitle = document.getElementById("modalTitle");
const modalCode = document.getElementById("modalCode");
const modalBody = document.getElementById("modalBody");
let currentSop = null;

function openSop(id) {
  const data = sopData[id];
  if (!data || !sopModal) return;

  currentSop = data;
  modalTitle.textContent = data.title;
  modalCode.textContent = data.code;

  modalBody.innerHTML = `
    <h3>1. Tujuan</h3>
    <p>${data.purpose}</p>
    <h3>2. Ruang Lingkup</h3>
    <p>${data.scope}</p>
    <h3>3. Langkah-Langkah Prosedur</h3>
    <ol>${data.steps.map(step => `<li>${step}</li>`).join("")}</ol>
    <h3>4. Penanggung Jawab</h3>
    <p>${data.responsibility}</p>
  `;

  sopModal.classList.add("open");
  sopModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeSop() {
  if (!sopModal) return;
  sopModal.classList.remove("open");
  sopModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".view-sop").forEach((button) => {
  button.addEventListener("click", () => {
    openSop(button.dataset.sop);
  });
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", closeSop);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeSop();
});

// Tombol cetak SOP
const printButton = document.getElementById("printSop");
if (printButton) {
  printButton.addEventListener("click", () => {
    window.print();
  });
}

// Tombol salin isi SOP
const copyButton = document.getElementById("copySop");
if (copyButton) {
  copyButton.addEventListener("click", async () => {
    if (!currentSop) return;

    const text = [
      currentSop.code,
      currentSop.title,
      "",
      "TUJUAN",
      currentSop.purpose,
      "",
      "RUANG LINGKUP",
      currentSop.scope,
      "",
      "LANGKAH-LANGKAH",
      ...currentSop.steps.map((step, index) => `${index + 1}. ${step}`),
      "",
      "PENANGGUNG JAWAB",
      currentSop.responsibility
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      copyButton.innerHTML = "Berhasil disalin!";
      setTimeout(() => {
        copyButton.innerHTML = '<i data-lucide="copy"></i> Salin teks';
        refreshIcons();
      }, 1800);
    } catch (error) {
      alert("Tidak dapat menyalin otomatis. Silakan salin teks secara manual.");
    }
  });
}
