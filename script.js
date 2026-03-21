// ========== ADMIN PANEL ==========
const ADMIN_PASSWORD = 'admin123';

// Ambil elemen
const emergencyOpenBtn = document.getElementById('emergencyOpenBtn');
const emergencyAdminBtn = document.getElementById('emergencyAdminBtn');
const adminLoginModal = document.getElementById('adminLoginModal');
const adminPanelBox = document.getElementById('adminPanelBox');
const adminPassInput = document.getElementById('adminPassInput');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const loginErrorMsg = document.getElementById('loginErrorMsg');
const closePanelBtn = document.getElementById('closePanelBtn');
const openSiteBtnPanel = document.getElementById('openSiteBtnPanel');
const closeSiteBtnPanel = document.getElementById('closeSiteBtnPanel');
const statusIconDisplay = document.getElementById('statusIconDisplay');
const statusTextDisplay = document.getElementById('statusTextDisplay');
const maintenancePage = document.getElementById('maintenancePage');
const emergencyOpenFromMaintenance = document.getElementById('emergencyOpenFromMaintenance');

// Ambil status dari localStorage, default ke 'open'
let websiteStatus = localStorage.getItem('websiteStatus');
if (websiteStatus === null || websiteStatus === undefined || websiteStatus === 'closed') {
    websiteStatus = 'open';
    localStorage.setItem('websiteStatus', 'open');
}

// Fungsi update tampilan
function updateDisplay() {
    if (websiteStatus === 'open') {
        if (statusIconDisplay) statusIconDisplay.innerHTML = '🟢';
        if (statusTextDisplay) statusTextDisplay.innerHTML = 'Website BUKA';
        if (maintenancePage) maintenancePage.style.display = 'none';
        document.body.style.overflow = 'auto';
    } else {
        if (statusIconDisplay) statusIconDisplay.innerHTML = '🔴';
        if (statusTextDisplay) statusTextDisplay.innerHTML = 'Website TUTUP';
        if (maintenancePage) maintenancePage.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    localStorage.setItem('websiteStatus', websiteStatus);
}

// Fungsi notifikasi
function showNotif(msg, color) {
    const n = document.createElement('div');
    n.innerHTML = msg;
    n.style.cssText = `position:fixed; top:20px; right:20px; background:${color}; color:white; padding:12px 20px; border-radius:12px; z-index:100001; font-weight:bold;`;
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 2500);
}

// ========== TOMBOL BUKA DARURAT ==========
if (emergencyOpenBtn) {
    emergencyOpenBtn.addEventListener('click', () => {
        websiteStatus = 'open';
        updateDisplay();
        showNotif('✅ Website telah DIBUKA!', '#34A853');
    });
}

// Tombol buka dari halaman maintenance
if (emergencyOpenFromMaintenance) {
    emergencyOpenFromMaintenance.addEventListener('click', () => {
        websiteStatus = 'open';
        updateDisplay();
        showNotif('✅ Website telah DIBUKA!', '#34A853');
    });
}

// ========== TOMBOL ADMIN ==========
if (emergencyAdminBtn) {
    emergencyAdminBtn.addEventListener('click', () => {
        if (adminPanelBox && adminPanelBox.style.display === 'block') {
            adminPanelBox.style.display = 'none';
        } else {
            adminLoginModal.style.display = 'flex';
            if (adminPassInput) adminPassInput.value = '';
            if (loginErrorMsg) loginErrorMsg.innerHTML = '';
        }
    });
}

// ========== LOGIN ==========
if (adminLoginBtn) {
    adminLoginBtn.addEventListener('click', () => {
        const pass = adminPassInput ? adminPassInput.value : '';
        if (pass === ADMIN_PASSWORD) {
            adminLoginModal.style.display = 'none';
            adminPanelBox.style.display = 'block';
            updateDisplay();
        } else {
            if (loginErrorMsg) loginErrorMsg.innerHTML = 'Password salah!';
        }
    });
}

// ========== TUTUP PANEL ==========
if (closePanelBtn) {
    closePanelBtn.addEventListener('click', () => {
        adminPanelBox.style.display = 'none';
    });
}

// ========== BUKA WEBSITE DARI PANEL ==========
if (openSiteBtnPanel) {
    openSiteBtnPanel.addEventListener('click', () => {
        websiteStatus = 'open';
        updateDisplay();
        showNotif('✅ Website telah DIBUKA!', '#34A853');
    });
}

// ========== TUTUP WEBSITE ==========
if (closeSiteBtnPanel) {
    closeSiteBtnPanel.addEventListener('click', () => {
        websiteStatus = 'closed';
        updateDisplay();
        showNotif('🔒 Website telah DITUTUP!', '#EA4335');
    });
}

// Tutup modal jika klik di luar
window.addEventListener('click', (e) => {
    if (e.target === adminLoginModal) {
        adminLoginModal.style.display = 'none';
    }
});

// Terapkan status awal
updateDisplay();

// ========== BOOKING FORM ==========
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        const notes = document.getElementById('notes').value.trim();
        
        if (!name || !phone || !date || !time) {
            alert('Harap lengkapi semua data!');
            return;
        }
        
        const phoneClean = phone.replace(/\D/g, '');
        if (phoneClean.length < 10) {
            alert('Nomor WhatsApp tidak valid!');
            return;
        }
        
        const formattedDate = date.split('-').reverse().join('/');
        const adminNumber = '6281234567890';
        const message = `🔔 RESERVASI BARU 🔔%0A%0A👤 Nama: ${name}%0A📞 No. WA: ${phone}%0A📅 Tanggal: ${formattedDate}%0A⏰ Jam: ${time}%0A👥 Tamu: ${guests}%0A📝 Catatan: ${notes || '-'}`;
        
        window.open(`https://wa.me/${adminNumber}?text=${message}`, '_blank');
        alert(`✅ Reservasi berhasil dikirim! Admin akan konfirmasi.`);
        bookingForm.reset();
    });
}

// Set minimum date
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        if (navLinks) navLinks.classList.toggle('active');
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            if (navLinks) navLinks.classList.remove('active');
        }
    });
});

// Menu preview click
const menuPreviewClick = document.getElementById('menuPreviewClick');
if (menuPreviewClick) {
    menuPreviewClick.addEventListener('click', () => {
        window.open('https://drive.google.com/file/d/1PEi9_h3hIg3l9pW_wEIcdWBeE8aG_qmN/view', '_blank');
    });
}

console.log('✅ Website siap! Status: ' + websiteStatus);