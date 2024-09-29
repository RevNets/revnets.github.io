// Background shapes
function createAbstractBackground() {
    const canvas = document.getElementById('abstract-bg');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const shapes = [];
    const numShapes = 5;

    class Shape {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 100 + 50;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.hue = Math.random() * 60 + 180; // Blue to purple range
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, 0.1)`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < numShapes; i++) {
        shapes.push(new Shape());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        shapes.forEach(shape => {
            shape.update();
            shape.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Loading screen
function hideLoadingScreen() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.style.opacity = '0';
    setTimeout(() => {
        loadingOverlay.style.display = 'none';
        showTitleScreen();
    }, 500);
}

// Title screen
// Make sure to include GSAP in your HTML file:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>

function showTitleScreen() {
    const titleScreen = document.querySelector('.title-screen');
    const mainTitle = document.querySelector('.main-title');
    titleScreen.style.display = 'flex';
    
    // Create a GSAP timeline for better control
    const tl = gsap.timeline();
    
    // Reset main title position and scale
    tl.set(mainTitle, {
        fontSize: '2rem',
        x: 0,
        y: 0,
        scale: 1,
        opacity: 0
    });
    
    // Fade in the main title
    tl.to(mainTitle, {
        duration: 0.5,
        opacity: 1
    });
    
    // Wait for 2 seconds before starting the hide animation
    tl.to({}, { duration: 2 });
    
    // Start the hide animation
    tl.call(hideTitleScreen);
}

function hideTitleScreen() {
    const titleScreen = document.querySelector('.title-screen');
    const mainTitle = document.querySelector('.main-title');
    const headerTitle = document.querySelector('.header-title');
    const header = document.querySelector('.header');

    const headerRect = header.getBoundingClientRect();
    const headerTitleRect = headerTitle.getBoundingClientRect();

    // Calculate the center position of the header title
    const targetX = headerTitleRect.left + headerTitleRect.width / 2 - window.innerWidth / 2;
    const targetY = headerTitleRect.top + headerTitleRect.height / 2 - window.innerHeight / 2;

    // Create a GSAP timeline for the hide animation
    const tl = gsap.timeline({
        onComplete: () => {
            titleScreen.style.display = 'none';
            headerTitle.style.opacity = '1';
        }
    });

    // Animate main title to header position
    tl.to(mainTitle, {
        duration: 0.5,
        x: targetX,
        y: targetY,
        scale: headerTitleRect.height / mainTitle.offsetHeight,
        ease: "power2.inOut"
    });

    // Fade out the main title and the background simultaneously
    tl.to([mainTitle, titleScreen], {
        duration: 0.3,
        opacity: 0
    }, "-=0.1"); // Start slightly before the previous animation ends
}

// Call this function when the page loads
function init() {
    // ... (other initialization code)
    showTitleScreen();
}

// Run initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);

// Scroll snapping
function setupSmoothScroll() {
    const sections = document.querySelectorAll('.section');
    let currentSectionIndex = 0;

    window.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
        } else if (e.deltaY < 0 && currentSectionIndex > 0) {
            currentSectionIndex--;
        }
        sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
    }, { passive: false });
}

// Section animation
function animateSections() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Download modal
const downloadLinks = document.querySelectorAll('.download-link');
const modal = document.getElementById('download-modal');
const confirmButton = document.getElementById('confirm-download');
const cancelButton = document.getElementById('cancel-download');
let currentDownloadUrl = '';

downloadLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        currentDownloadUrl = link.getAttribute('data-url');
        modal.style.display = 'block';
    });
});

confirmButton.addEventListener('click', () => {
    window.open(currentDownloadUrl, '_blank');
    modal.style.display = 'none';
});

cancelButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Initialize everything
function init() {
    createAbstractBackground();
    setupSmoothScroll();
    animateSections();

    // Simulate loading time
    setTimeout(hideLoadingScreen, 2000);
}

// Run initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
