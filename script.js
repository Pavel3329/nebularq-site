document.addEventListener('DOMContentLoaded', function () {

    // ===============================
    // 💰 CLICK TRACKING
    // ===============================
    const trackedLinks = document.querySelectorAll('.track');

    trackedLinks.forEach(link => {
        link.addEventListener('click', () => {
            const url = link.getAttribute('href');

            let clicks = JSON.parse(localStorage.getItem('nebularq_clicks')) || {};
            clicks[url] = (clicks[url] || 0) + 1;

            localStorage.setItem('nebularq_clicks', JSON.stringify(clicks));
        });
    });


    // ===============================
    // 🚀 SMART REDIRECT
    // ===============================
    trackedLinks.forEach(link => {
        link.addEventListener('click', function (e) {

            e.preventDefault();

            const url = link.getAttribute('href');

            const originalText = link.innerText;
            link.innerText = "⏳ Переход...";
            link.style.opacity = "0.7";

            setTimeout(() => {
                window.location.href = url;
            }, 250);

            setTimeout(() => {
                link.innerText = originalText;
                link.style.opacity = "1";
            }, 2000);
        });
    });


    // ===============================
    // 🔥 FLASH DEAL
    // ===============================
    const flashDeal = document.querySelector('.flash-deal');
    const closeBtn = document.querySelector('.close-btn');

    if (flashDeal && closeBtn) {

        const ONE_HOUR = 60 * 60 * 1000;

        let isClosed = false;
        let reopenTimer = null;

        setTimeout(() => {
            if (!isClosed) {
                flashDeal.classList.remove('hidden');
            }
        }, 4000);

        closeBtn.addEventListener('click', () => {

            flashDeal.classList.add('hidden');
            isClosed = true;

            if (reopenTimer) clearTimeout(reopenTimer);

            reopenTimer = setTimeout(() => {
                flashDeal.classList.remove('hidden');
                isClosed = false;
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
    // 😏 TILT EFFECT (PC ONLY)
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


    // ===============================
    // 📩 EMAIL → TELEGRAM (ULTRA DATA)
    // ===============================
    const emailForm = document.getElementById('emailForm');
    const emailInput = document.getElementById('emailInput');

    const BOT_TOKEN = "8478118705:AAFNbXH97kGjrxdsqU6-QodJnRPvOO8JeYc";
    const CHAT_ID = "2103334794";

    function getUTM() {
        const params = new URLSearchParams(window.location.search);
        return params.get('utm_source') || 'direct';
    }

    function getDevice() {
        const ua = navigator.userAgent;

        if (/mobile/i.test(ua)) return "📱 Mobile";
        if (/tablet/i.test(ua)) return "📲 Tablet";
        return "💻 Desktop";
    }

    if (emailForm) {
        emailForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const email = emailInput.value.trim();
            if (!email) return;

            const message = `
🔥 НОВЫЙ ЛИД NEBULARQ

📧 Email: ${email}

🌍 Страница:
${window.location.href}

📊 Источник:
${getUTM()}

📱 Устройство:
${getDevice()}

🌐 Язык:
${navigator.language}

🧠 Платформа:
${navigator.platform}

🕒 Время:
${new Date().toLocaleString()}
`;

            try {
                await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        chat_id: CHAT_ID,
                        text: message
                    })
                });

                emailInput.value = "";
                alert("🔥 Доступ открыт! Проверь Telegram");

            } catch (err) {
                alert("Ошибка 😢");
                console.error(err);
            }
        });
    }

});