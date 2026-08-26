document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const backToTop = document.getElementById('back-to-top');
    const form = document.getElementById('contact-form');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

    const element = document.querySelector('.typewriter');
    if (element) {
        const text = element.textContent.trim();
        element.textContent = '';
        let i = 0;
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        element.appendChild(cursor);

        function typeWriter() {
            if (i < text.length) {
                element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
                i++;
                setTimeout(typeWriter, 35 + Math.random() * 30);
            }
        }

        setTimeout(typeWriter, 500);
    }

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const button = form.querySelector('button[type="submit"]');
            const original = button.textContent;

            button.textContent = 'Enviando...';
            button.disabled = true;
            button.classList.add('opacity-80');

            setTimeout(() => {
                button.textContent = '✅ Mensagem enviada!';
                button.style.background = '#22c55e';
                button.disabled = false;
                button.classList.remove('opacity-80');

                setTimeout(() => {
                    button.textContent = original;
                    button.style.background = '';
                    form.reset();
                }, 2500);
            }, 1200);
        });
    }

    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = Number(entry.target.dataset.target || 0);
                const suffix = entry.target.dataset.suffix || '';
                const duration = 1800;
                const start = performance.now();

                function animateCounter(now) {
                    const progress = Math.min((now - start) / duration, 1);
                    const current = Math.floor(progress * target);
                    entry.target.textContent = current + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(animateCounter);
                    } else {
                        entry.target.textContent = target + suffix;
                    }
                }

                requestAnimationFrame(animateCounter);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    const handleScroll = () => {
        const header = document.querySelector('header');
        if (header) {
            header.classList.toggle('shadow-lg', window.scrollY > 30);
            header.classList.toggle('shadow-[#2d7dd2]/10', window.scrollY > 30);
        }

        if (backToTop) {
            backToTop.classList.toggle('visible', window.scrollY > 300);
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (event) => event.preventDefault());
    });
});
