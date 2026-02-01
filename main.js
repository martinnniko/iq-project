document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    //  0. BURGER MENU TOGGLE
    // ==========================================
    const burgerBtn = document.getElementById('burgerBtn');
    const header = document.querySelector('header'); 

    if (burgerBtn && header) {
        burgerBtn.addEventListener('click', () => {
            header.classList.toggle('nav-open'); 
            burgerBtn.classList.toggle('active'); 
        });
    }

    // ==========================================
    //  1. PROGRAMS SLIDER (HYBRID: JS for Desktop, CSS for Mobile)
    // ==========================================
    const progTrack = document.getElementById('programTrack');
    const progNext = document.getElementById('nextBtn');
    const progPrev = document.getElementById('prevBtn');
    
    let progIndex = 0; 

    if (progTrack) {
        function updateProgramSlider() {
            // --- MOBILE CHECK (The new part) ---
            // If screen is smaller than 992px (Tablets & Phones)
            if (window.innerWidth < 992) {
                // 1. Clear the JS transform so CSS scroll-snap can work
                progTrack.style.transform = 'none'; 
                // 2. Stop the function here. Do not run desktop logic.
                return; 
            }

            // --- DESKTOP LOGIC (Runs only on large screens) ---
            const cards = document.querySelectorAll('.program-card');
            if (cards.length === 0) return;

            // We move 3 cards at a time on desktop
            const cardsPerSlide = 3; 

            // Calculate movement
            const cardWidth = cards[0].offsetWidth; 
            const style = window.getComputedStyle(progTrack);
            const gap = parseFloat(style.gap) || 0; 
            const singleItemWidth = cardWidth + gap;
            
            // Move the track
            progTrack.style.transform = `translateX(-${progIndex * (singleItemWidth * 3)}px)`;
            
            // Update Buttons State
            const totalPages = Math.ceil(cards.length / 3);
            
            if (progPrev) {
                progPrev.disabled = progIndex === 0;
                progPrev.style.opacity = progIndex === 0 ? "0.5" : "1";
            }
            if (progNext) {
                progNext.disabled = progIndex >= totalPages - 1;
                progNext.style.opacity = progIndex >= totalPages - 1 ? "0.5" : "1";
            }
        }

        if (progNext && progPrev) {
            progNext.addEventListener('click', () => {
                const cards = document.querySelectorAll('.program-card');
                const totalPages = Math.ceil(cards.length / 3);
                if (progIndex < totalPages - 1) { 
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
            
            // Update on resize
            window.addEventListener('resize', () => {
                progIndex = 0; 
                updateProgramSlider();
            });
            
            // Initial call
            setTimeout(updateProgramSlider, 100); 
        }
    }

    // ==========================================
    //  2. TESTIMONIAL SLIDER LOGIC
    // ==========================================
    const tTrack = document.getElementById('testimonialTrack');
    const tNext = document.getElementById('testimonialNext');
    const tPrev = document.getElementById('testimonialPrev');
    let tIndex = 0;

    if (tTrack) {
        function updateTestimonials() {
            const slides = document.querySelectorAll('.testimonial-slide');
            tTrack.style.transform = `translateX(-${tIndex * 100}%)`;

            if (tPrev) {
                tPrev.disabled = tIndex === 0;
                tPrev.style.opacity = tIndex === 0 ? "0.5" : "1";
            }
            if (tNext) {
                tNext.disabled = tIndex === slides.length - 1;
                tNext.style.opacity = tIndex === slides.length - 1 ? "0.5" : "1";
            }
        }

        if (tNext && tPrev) {
            tNext.addEventListener('click', () => {
                const slides = document.querySelectorAll('.testimonial-slide');
                if (tIndex < slides.length - 1) { tIndex++; updateTestimonials(); }
            });
            tPrev.addEventListener('click', () => {
                if (tIndex > 0) { tIndex--; updateTestimonials(); }
            });
            updateTestimonials();
        }
    }

    // ==========================================
    //  3. DYNAMIC MODAL LOGIC
    // ==========================================
    const programModal = document.querySelector('#program-modal');
    const openButtons = document.querySelectorAll('.js-open-program'); 
    const closeProgramBtn = programModal ? programModal.querySelector('.modal-close') : null;
    
    // Content Database
    const programsData = {
        'marketing': {
            title: "Digital Marketing Academy",
            image: "img/programs/digital-marketing.jpg",
            desc: "Master SEO, social media, content strategy, and analytics through expert-led online training designed to equip you with the skills to plan, execute, and optimize successful digital campaigns.",
            overview: "The program introduces you to the core areas of modern marketing, including SEO, social media, content, and analytics. Through guided lessons and practical exercises, you’ll gain the skills to design and manage campaigns that deliver measurable results.",
            price: "1,599€ + VAT",
            spots: "Only 2 spots left"
        },
        'graphic-design': {
            title: "Graphic Design Academy",
            image: "img/programs/graphic-design.jpg",
            desc: "Master branding, typography, and digital design through expert-led online training designed to equip you with the necessary skills to create, communicate, and elevate powerful visual identities.",
            overview: "The program covers key areas of modern design—from concept and layout to typography and digital media—preparing you to create professional, market-ready visuals.",
            price: "1,699€ + VAT",
            spots: "Only 2 spots left"
        },
        'ui-ux': {
            title: "UX/UI Academy",
            image: "img/programs/ui-ux.jpg",
            desc: "Master user experience and interface design through hands-on projects and expert mentorship designed to equip you with the skills to craft intuitive, engaging, and visually stunning digital products.",
            overview: "Learn the complete design process from research and wireframing to prototyping and testing. This program helps you build a strong foundation in design thinking, usability, and visual design to create seamless digital experiences.",
            price: "1,699€ + VAT",
            spots: "Only 5 spots left"
        },
        'motion': {
            title: "Motion Graphics Academy",
            image: "img/programs/motion-graphics.jpg",
            desc: "Master animation, storytelling, and visual effects through expert-led lessons, hands-on creative projects, and industry-standard tools designed to equip you with the skills to bring ideas to life with motion, rhythm, and visual impact.",
            overview: "Develop your creative and technical skills in animation, compositing, and visual storytelling. You’ll explore industry tools like After Effects and Premiere Pro while producing dynamic motion projects that showcase your style and creativity.",
            price: "2,099€ + VAT",
            spots: "Only 5 spots left"
        },
        'interior': {
            title: "Interior Design Academy",
            image: "img/programs/interior-design.jpg",
            desc: "Master spatial planning, color theory, and 3D visualization through expert-led training, creative studio projects, and real-world design challenges designed to equip you with the skills to craft functional, aesthetic, and inspiring interior spaces.",
            overview: "Explore the full interior design process — from concept and color theory to space planning and materials. Through practical projects, you’ll learn to design functional and visually captivating spaces for modern living.",
            price: "2,099€ + VAT",
            spots: "Only 2 spots left"
        },
        'frontend': {
            title: "Front-End Academy",
            image: "img/programs/front-end.jpg",
            desc: "Master web design, coding, and interactivity through practical training, real-world assignments, and expert mentorship designed to equip you with the skills to build responsive, user-centered, and visually dynamic digital experiences.",
            overview: "Master web design, coding, and interactivity through practical training and real-world projects designed to equip you with the skills to build responsive, user-focused, and visually dynamic websites.",
            price: "2,099€ + VAT",
            spots: "Only 4 spots left"
        }
    };

    if (openButtons.length > 0 && programModal) {
        openButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const programId = btn.getAttribute('data-id');
                const data = programsData[programId];

                if (data) {
                    programModal.querySelector('.program-title').textContent = data.title;
                    programModal.querySelector('.program-desc').textContent = data.desc;
                    programModal.querySelector('.section-text-max').textContent = data.overview;
                    programModal.querySelector('.price-amount').textContent = data.price;
                    
                    const spotsElement = programModal.querySelector('.js-spots');
                    if (spotsElement) {
                        spotsElement.textContent = data.spots;
                        spotsElement.style.color = data.spots === "Enrollment Closed" ? "red" : "";
                    }

                    programModal.querySelector('.modal-hero-image img').src = data.image;
                    programModal.querySelector('.modal-hero-image img').alt = data.title;

                    programModal.classList.add('is-visible');
                    document.body.style.overflow = 'hidden'; 
                    programModal.querySelector('.modal-container').scrollTop = 0;
                }
            });
        });
    }

    if (closeProgramBtn) {
        closeProgramBtn.addEventListener('click', () => {
            programModal.classList.remove('is-visible');
            document.body.style.overflow = 'auto'; 
        });
    }

    if (programModal) {
        programModal.addEventListener('click', (e) => {
            if (e.target === programModal) {
                programModal.classList.remove('is-visible');
                document.body.style.overflow = 'auto';
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && programModal && programModal.classList.contains('is-visible')) {
            programModal.classList.remove('is-visible');
            document.body.style.overflow = 'auto';
        }
    });

});