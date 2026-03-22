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
        const adminNumber = '625817252525';
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
