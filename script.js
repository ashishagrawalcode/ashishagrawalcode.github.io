/* =========================================
   1. MOBILE MENU LOGIC
   ========================================= */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.close-menu');
const menuLinks = document.querySelectorAll('.mobile-menu a');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop scrolling
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto'; // Resume scrolling
    });
}

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

/* =========================================
   2. SCROLL PROGRESS BAR
   ========================================= */
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    const bar = document.querySelector('.scroll-progress');
    if (bar) bar.style.width = `${scrolled}%`;
});

/* =========================================
   3. TYPEWRITER EFFECT (Home Page)
   ========================================= */
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];
        
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        this.txtElement.innerHTML = `<span class="typewriter">${this.txt}</span>`;
        
        let typeSpeed = 100;
        if (this.isDeleting) { typeSpeed /= 2; }
        
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const txtElement = document.querySelector('.txt-type');
    if (txtElement) {
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        new TypeWriter(txtElement, words, wait);
    }
});

/* =========================================
   4. 3D TILT EFFECT (Projects Page)
   ========================================= */
if (window.matchMedia("(min-width: 768px)").matches) {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

/* =========================================
   5. GALLERY FILTERING
   ========================================= */
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.masonry-item');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to click
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                // Show if 'all' or matches category
                if (filterValue === 'all' || filterValue === category) {
                    item.classList.remove('hide');
                    setTimeout(() => item.style.opacity = '1', 50); // Small delay for smooth fade
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.classList.add('hide'), 300); // Wait for fade out
                }
            });
        });
    });
}

/* =========================================
   6. LIGHTBOX & CAPTIONS
   ========================================= */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption'); // Matches new HTML
const masonryImages = document.querySelectorAll('.masonry-item img');
const closeLightboxBtn = document.querySelector('.close-lightbox');

if (lightbox && masonryImages.length > 0) {
    masonryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
            
            // New Logic: Find the .caption-overlay inside the parent div
            const captionDiv = img.parentElement.querySelector('.caption-overlay');
            
            if (captionDiv) {
                lightboxCaption.innerText = captionDiv.innerText;
            } else {
                lightboxCaption.innerText = "";
            }
        });
    });
    
    // Close on X button
    if(closeLightboxBtn) {
        closeLightboxBtn.addEventListener('click', () => {
            lightbox.style.display = "none";
        });
    }

    // Close on clicking background
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
}