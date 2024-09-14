 // Particle background
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#5865F2' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: '#5865F2', opacity: 0.4, width: 1 },
                move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
                modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
            },
            retina_detect: true
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
