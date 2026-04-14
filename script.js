



document.addEventListener('DOMContentLoaded', function() {

    // ===============================
    // 🔥 FLASH DEAL (твоя логика)
    // ===============================
    const flashDeal = document.querySelector('.flash-deal');
    const closeBtn = document.querySelector('.close-btn');

    if (flashDeal && closeBtn) {
        if (localStorage.getItem('flashDealClosed') !== 'true') {
            flashDeal.classList.remove('hidden');
        }

        closeBtn.addEventListener('click', function() {
            flashDeal.classList.add('hidden');
            localStorage.setItem('flashDealClosed', 'true');
        });
    }


    // ===============================
    // 🚀 SCROLL REVEAL (анимация появления)
    // ===============================
    const reveals = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;

        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < windowHeight - 80) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);

    // запуск при загрузке
    revealOnScroll();


    // ===============================
    // 😏 TILT ЭФФЕКТ (только ПК)
    // ===============================
    if (window.innerWidth > 768) {
        const cards = document.querySelectorAll('.deal-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();

                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = -(y - centerY) / 12;
                const rotateY = (x - centerX) / 12;

                card.style.transform = `
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.03)
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

});