document.addEventListener('DOMContentLoaded', function () {

    // ===============================
    // 💰 CLICK TRACKING (АНАЛИТИКА)
    // ===============================
    const trackedLinks = document.querySelectorAll('.track');

    trackedLinks.forEach(link => {
        link.addEventListener('click', () => {
            const url = link.getAttribute('href');

            let clicks = JSON.parse(localStorage.getItem('nebularq_clicks')) || {};

            clicks[url] = (clicks[url] || 0) + 1;

            localStorage.setItem('nebularq_clicks', JSON.stringify(clicks));

            console.log("💰 Клик:", url, "| Всего:", clicks[url]);
        });
    });


    // ===============================
    // 🚀 SMART REDIRECT EFFECT
    // ===============================
    trackedLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const url = link.getAttribute('href');

            link.innerText = "⏳ Переход...";
            link.style.opacity = "0.7";

            setTimeout(() => {
                window.location.href = url;
            }, 250);
        });
    });


    // ===============================
    // 🔥 FLASH DEAL
    // ===============================
const flashDeal = document.querySelector('.flash-deal');
const closeBtn = document.querySelector('.close-btn');

if (flashDeal && closeBtn) {

    const ONE_HOUR = 60 * 60 * 1000;

    let closedTime = null;

    // 👇 всегда показываем через 4 секунды при загрузке
    setTimeout(() => {
        flashDeal.classList.remove('hidden');
    }, 4000);

    // закрытие
    closeBtn.addEventListener('click', () => {
        flashDeal.classList.add('hidden');
        closedTime = Date.now();

        // 👇 через час снова появится (если пользователь не обновил страницу)
        setTimeout(() => {
            flashDeal.classList.remove('hidden');
        }, ONE_HOUR);
    });
}


    // ===============================
    // ✨ SCROLL REVEAL
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
    revealOnScroll();


    // ===============================
    // 😏 TILT ЭФФЕКТ (ПК)
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


    // ===============================
    // 💣 BEST OFFER HIGHLIGHT
    // ===============================
    const clicks = JSON.parse(localStorage.getItem('nebularq_clicks')) || {};

    let max = 0;
    let best = null;

    for (let key in clicks) {
        if (clicks[key] > max) {
            max = clicks[key];
            best = key;
        }
    }

    if (best) {
        const bestLink = document.querySelector(`a[href="${best}"]`);

        if (bestLink) {
            bestLink.style.boxShadow = "0 0 20px #0aff9d";
        }
    }

});