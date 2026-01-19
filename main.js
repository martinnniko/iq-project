document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.page-section');
    const track = document.getElementById('programTrack');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    let currentIndex = 0;

    // --- NAVIGATION LOGIC ---
    navItems.forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove("active"));
            sections.forEach(sec => sec.classList.remove("js-page-section"));
            this.classList.add("active");
            
            const text = this.textContent.trim();
            let targetId = text === "Programs" ? "programs-home" : text.toLowerCase();
            
            const targetSection = document.getElementById(targetId);
            if (targetSection) targetSection.classList.add("js-page-section");
            
            // Reset slider
            currentIndex = 0;
            if(track) track.style.transform = `translateX(0)`;
        });
    });

    // --- SLIDER LOGIC ---
    function updateSlider() {
        if (!track) return;
        const cards = document.querySelectorAll('.program-card');
        const cardWidth = 330 + 50; // Card width + gap
        
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Disable arrows
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= (cards.length - 3);
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            const cards = document.querySelectorAll('.program-card');
            if (currentIndex < cards.length - 3) {
                currentIndex++;
                updateSlider();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }
});

const tTrack = document.getElementById('testimonialTrack');
const tNext = document.getElementById('testimonialNext');
const tPrev = document.getElementById('testimonialPrev');

let tIndex = 0;

function updateTestimonials() {
    if (!tTrack) return;
    const slides = document.querySelectorAll('.testimonial-slide');
    
    // Slide by 100% of the wrapper width
    tTrack.style.transform = `translateX(-${tIndex * 100}%)`;

    // Disable arrows at start/end
    tPrev.disabled = tIndex === 0;
    tNext.disabled = tIndex === slides.length - 1;
}

if (tNext && tPrev) {
    tNext.addEventListener('click', () => {
        tIndex++;
        updateTestimonials();
    });

    tPrev.addEventListener('click', () => {
        tIndex--;
        updateTestimonials();
    });
}

// Initialize button states
updateTestimonials();