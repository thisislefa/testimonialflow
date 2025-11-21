// --- DATA ---
        const testimonials = [
            {
                id: 1,
                quote: "Working with Forma Studio has completely transformed our online presence. From the very beginning, their team took the time to understand our brand, audience, and long-term goals.",
                name: "Elena M.",
                role: "Marketing Director at Green Leaf"
                // Images are now hardcoded in HTML for cleaner sliding
            },
            {
                id: 2,
                quote: "The attention to detail was simply outstanding. They didn't just build a website; they built a digital experience that resonates with our core values.",
                name: "Marcus Chen",
                role: "CTO at Nova Dynamics"
            },
            {
                id: 3,
                quote: "Fast, efficient, and incredibly creative. The team at Forma turned our vague ideas into a concrete, beautiful reality faster than we thought possible.",
                name: "Sarah Jenkins",
                role: "Founder of ArtFlow"
            }
        ];

        // --- DOM ELEMENTS ---
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const sliderTrack = document.getElementById('slider-track');
        const quoteText = document.getElementById('featured-quote');
        const authorName = document.querySelector('#featured-author .author-name');
        const authorRole = document.querySelector('#featured-author .author-role');
        const sliderIndex = document.getElementById('slider-index');
        const clientCounter = document.getElementById('client-counter');

        // --- STATE ---
        let currentIndex = 0;

        // --- FUNCTIONS ---

        function updateSlide(index) {
            const data = testimonials[index];
            
            // 1. Animate Text Out
            quoteText.style.opacity = '0';
            quoteText.style.transform = 'translateY(10px)';
            
            const authorBlock = document.getElementById('featured-author');
            authorBlock.style.opacity = '0';
            authorBlock.style.transform = 'translateY(10px)';
            
            // 2. Move the Slider Track
            // Because each image is 100% width, we translate by -100% * index
            sliderTrack.style.transform = `translateX(-${index * 100}%)`;

            // 3. Update Content after short delay to match fade out
            setTimeout(() => {
                quoteText.textContent = `"${data.quote}"`;
                authorName.textContent = data.name;
                authorRole.textContent = data.role;
                
                // Update Index: padStart adds the leading zero
                sliderIndex.textContent = `[${String(data.id).padStart(2, '0')}]`;

                // 4. Animate Text In
                quoteText.style.opacity = '1';
                quoteText.style.transform = 'translateY(0)';
                authorBlock.style.opacity = '1';
                authorBlock.style.transform = 'translateY(0)';
            }, 300);
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            updateSlide(currentIndex);
        }

        // --- COUNTER ANIMATION ---
        function animateValue(obj, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                obj.innerHTML = Math.floor(progress * (end - start) + start);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        // --- EVENT LISTENERS ---
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        });

        // Start animations on load
        window.addEventListener('load', () => {
            // Animate the "100+" counter
            animateValue(clientCounter, 0, 100, 2000);
        });