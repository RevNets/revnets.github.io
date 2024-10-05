let searchData = [];

        // Memuat data pencarian dari file JSON
        fetch('search-data.json')
            .then(response => response.json())
            .then(data => {
                searchData = data.suggestions;
            })
            .catch(error => console.error('Error loading search data:', error));

        const searchInput = document.getElementById('search-input');
        const suggestionsContainer = document.getElementById('suggestions');
        const searchIcon = document.querySelector('.lordicon-container');

        searchInput.addEventListener('input', showSuggestions);

        searchIcon.addEventListener('click', function() {
            performSearch(searchInput.value);
        });

        function showSuggestions() {
            const query = searchInput.value.trim().toLowerCase();
            if (query.length === 0) {
                hideSuggestions();
                return;
            }

            const matchedSuggestions = searchData.filter(item => {
                return item.query.toLowerCase().includes(query) ||
                       item.keywords.some(keyword => keyword.toLowerCase().includes(query));
            });

            displaySuggestions(matchedSuggestions);
        }

        function displaySuggestions(suggestions) {
            suggestionsContainer.innerHTML = '';
            if (suggestions.length > 0) {
                suggestions.forEach(suggestion => {
                    const div = document.createElement('div');
                    div.textContent = suggestion.query;
                    div.className = 'suggestion';
                    div.onclick = function() {
                        searchInput.value = suggestion.query;
                        hideSuggestions();
                        performSearch(suggestion.query);
                    };
                    suggestionsContainer.appendChild(div);
                });
                suggestionsContainer.style.display = 'block';
                setTimeout(() => {
                    suggestionsContainer.style.opacity = 1;
                }, 0);
            } else {
                hideSuggestions();
            }
        }

        function hideSuggestions() {
            suggestionsContainer.style.opacity = 0;
            setTimeout(() => {
                suggestionsContainer.style.display = 'none';
            }, 300);
        }

        function performSearch(query) {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }

        document.addEventListener('click', function(event) {
            if (!event.target.closest('.search-container')) {
                hideSuggestions();
            }
        });

        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });

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

        // Initialize everything
        document.addEventListener('DOMContentLoaded', () => {
            createAbstractBackground();
        });
