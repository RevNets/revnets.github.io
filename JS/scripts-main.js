 // Particle background
 const canvas = document.getElementById('particles-canvas');
 const ctx = canvas.getContext('2d');

 let width = canvas.width = window.innerWidth;
 let height = canvas.height = window.innerHeight;

 const particles = [];
 const numParticles = 50;
 const mainColor = '#8A2BE2'; // BlueViolet

 class Particle {
     constructor() {
         this.x = Math.random() * width;
         this.y = Math.random() * height;
         this.size = Math.random() * 3 + 1;
         this.speedX = Math.random() * 1 - 0.5;
         this.speedY = Math.random() * 1 - 0.5;
     }

     update() {
         this.x += this.speedX;
         this.y += this.speedY;

         if (this.x < 0 || this.x > width) this.speedX *= -1;
         if (this.y < 0 || this.y > height) this.speedY *= -1;
     }

     draw() {
         ctx.fillStyle = mainColor;
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
         ctx.fill();
     }
 }

 function createParticles() {
     for (let i = 0; i < numParticles; i++) {
         particles.push(new Particle());
     }
 }

 function connectParticles() {
     const maxDistance = 150;
     particles.forEach((particle, index) => {
         for (let j = index + 1; j < particles.length; j++) {
             const dx = particle.x - particles[j].x;
             const dy = particle.y - particles[j].y;
             const distance = Math.sqrt(dx * dx + dy * dy);

             if (distance < maxDistance) {
                 ctx.strokeStyle = mainColor;
                 ctx.lineWidth = 0.5;
                 ctx.globalAlpha = 1 - (distance / maxDistance);
                 ctx.beginPath();
                 ctx.moveTo(particle.x, particle.y);
                 ctx.lineTo(particles[j].x, particles[j].y);
                 ctx.stroke();
             }
         }
     });
     ctx.globalAlpha = 1;
 }

 function animate() {
     ctx.clearRect(0, 0, width, height);

     particles.forEach(particle => {
         particle.update();
         particle.draw();
     });

     connectParticles();
     requestAnimationFrame(animate);
 }

 createParticles();
 animate();

 window.addEventListener('resize', () => {
     width = canvas.width = window.innerWidth;
     height = canvas.height = window.innerHeight;
 });


        // Wait until the page is fully loaded
        window.onload = function() {
            // Hide the loading overlay
            const loadingOverlay = document.querySelector('.loading-overlay');
            loadingOverlay.classList.add('hidden');
            // Animate sections when they appear on the screen
            const sections = document.querySelectorAll('.section');
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, { threshold: 0.1 });

            sections.forEach(section => {
                observer.observe(section);
            });

            // Re-enable scrolling after page load
            document.body.style.overflow = 'auto';
        };
document.addEventListener('DOMContentLoaded', () => {
    const projects = document.querySelectorAll('.project');
    let activeProject = null;
    let isAnimating = false;

    function hideProjectLink(project) {
        return new Promise((resolve) => {
            const link = project.querySelector('.project-link');
            link.classList.add('hidden');
            project.classList.remove('expanded');
            setTimeout(() => {
                link.style.display = 'none';
                resolve();
            }, 300); // Match this with your CSS transition duration
        });
    }

    function showProjectLink(project) {
        return new Promise((resolve) => {
            const link = project.querySelector('.project-link');
            link.style.display = 'block';
            
            // Force reflow
            void project.offsetWidth;

            project.classList.add('expanded');
            link.classList.remove('hidden');

            setTimeout(() => {
                resolve();
            }, 300); // Match this with your CSS transition duration
        });
    }

    async function toggleProjectLink(project) {
        if (isAnimating) return;
        isAnimating = true;

        try {
            if (activeProject === project) {
                await hideProjectLink(project);
                activeProject = null;
            } else {
                if (activeProject) {
                    await hideProjectLink(activeProject);
                }
                await showProjectLink(project);
                activeProject = project;
            }
        } finally {
            isAnimating = false;
        }
    }

    projects.forEach(project => {
        project.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleProjectLink(project);
        });
    });

    document.addEventListener('click', () => {
        if (activeProject && !isAnimating) {
            toggleProjectLink(activeProject);
        }
    });

    // Animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                projectObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    projects.forEach(project => {
        projectObserver.observe(project);
    });
});
