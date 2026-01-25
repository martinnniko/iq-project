document.addEventListener('DOMContentLoaded', () => {

    // NAVIGATION LOGIC

    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.page-section');

    // navItems.forEach(item => {
    //     item.addEventListener("click", function (e) {
    //         e.preventDefault();

            
    //         navItems.forEach(nav => nav.classList.remove("active"));
    //         this.classList.add("active");

          
    //         sections.forEach(sec => sec.classList.remove("js-page-section"));

            
            
    //         const text = this.textContent.trim().toLowerCase();
    //         const targetSection = document.getElementById(text);

           
    //         if (targetSection) {
    //             targetSection.classList.add("js-page-section");
    //         }

            
    //         resetSliders();
    //     });
    // });

 
    // PROGRAMS SLIDER LOGIC
   
    const progTrack = document.getElementById('programTrack');
    const progNext = document.getElementById('nextBtn');
    const progPrev = document.getElementById('prevBtn');
    let progIndex = 0;

    function updateProgramSlider() {
        if (!progTrack) return;

        const cards = document.querySelectorAll('.program-card');
        if (cards.length === 0) return;

        
     
        const cardWidth = cards[0].offsetWidth; 
        
        const style = window.getComputedStyle(progTrack);
        const gap = parseFloat(style.gap) || 0; 
        
        // Calculate exact move distance
        const moveAmount = cardWidth + gap;

 
        progTrack.style.transform = `translateX(-${progIndex * moveAmount}px)`;

        // Update Button States
        if (progPrev) progPrev.disabled = progIndex === 0;
        
       
        const visibleCards = 3; 
        if (progNext) progNext.disabled = progIndex >= (cards.length - visibleCards);
    }

    if (progNext && progPrev) {
        progNext.addEventListener('click', () => {
            const cards = document.querySelectorAll('.program-card');
            // Ensure we don't scroll past the end
            if (progIndex < cards.length - 3) {
                progIndex++;
                updateProgramSlider();
            }
        });

        progPrev.addEventListener('click', () => {
            if (progIndex > 0) {
                progIndex--;
                updateProgramSlider();
            }
        });
    }

    
    // TESTIMONIAL SLIDER LOGIC
   
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
        if (tPrev) tPrev.disabled = tIndex === 0;
        if (tNext) tNext.disabled = tIndex === slides.length - 1;
    }

    if (tNext && tPrev) {
        tNext.addEventListener('click', () => {
            const slides = document.querySelectorAll('.testimonial-slide');
            if (tIndex < slides.length - 1) {
                tIndex++;
                updateTestimonials();
            }
        });

        tPrev.addEventListener('click', () => {
            if (tIndex > 0) {
                tIndex--;
                updateTestimonials();
            }
        });
    }

    
    updateProgramSlider();
    updateTestimonials();

    // Helper to reset sliders (used in navigation)
    function resetSliders() {
        progIndex = 0;
        tIndex = 0;
        updateProgramSlider();
        updateTestimonials();
    }
});

// 1. Get the specific elements
const programBtn = document.querySelector('.js-open-program');
const programModal = document.querySelector('#program-modal');
const closeProgramBtn = programModal ? programModal.querySelector('.modal-close') : null;

// 2. Open Function
if (programBtn && programModal) {
    programBtn.addEventListener('click', (e) => {
        e.preventDefault();
        programModal.classList.add('is-visible');
        // Prevent background scrolling when modal is open
        document.body.style.overflow = 'hidden'; 
    });
}

// 3. Close Function (X Button)
if (closeProgramBtn) {
    closeProgramBtn.addEventListener('click', () => {
        programModal.classList.remove('is-visible');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
}

// 4. Close Function (Click Outside)
if (programModal) {
    programModal.addEventListener('click', (e) => {
        if (e.target === programModal) {
            programModal.classList.remove('is-visible');
            document.body.style.overflow = 'auto';
        }
    });
}

// 5. Close with Escape Key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && programModal && programModal.classList.contains('is-visible')) {
        programModal.classList.remove('is-visible');
        document.body.style.overflow = 'auto';
    }
});