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

            // UX эффект
            const originalText = link.innerText;
            link.innerText = "⏳ Переход...";
            link.style.opacity = "0.7";

            setTimeout(() => {
                window.location.href = url;
            }, 250);

            // возврат текста если вдруг не ушли
            setTimeout(() => {
                link.innerText = originalText;
                link.style.opacity = "1";
            }, 2000);
        });
    });


    // ===============================
    // 🔥 FLASH DEAL (PRO ЛОГИКА)
    // ===============================
    const flashDeal = document.querySelector('.flash-deal');
    const closeBtn = document.querySelector('.close-btn');

    if (flashDeal && closeBtn) {

        const ONE_HOUR = 60 * 60 * 1000;

        let isClosed = false;
        let reopenTimer = null;

        // 👉 ВСЕГДА показываем через 4 сек после загрузки
        const showTimer = setTimeout(() => {
            if (!isClosed) {
                flashDeal.classList.remove('hidden');
            }
        }, 4000);

        // 👉 закрытие
        closeBtn.addEventListener('click', () => {

            flashDeal.classList.add('hidden');
            isClosed = true;

            // сбрасываем предыдущий таймер если был
            if (reopenTimer) clearTimeout(reopenTimer);

            // 👉 через 60 минут снова показать (если вкладка не закрыта)
            reopenTimer = setTimeout(() => {
                flashDeal.classList.remove('hidden');
                isClosed = false;
            }, ONE_HOUR);
        });
    }


    // ===============================
    // ✨ SCROLL REVEAL (АНИМАЦИЯ)
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

// ===============================
// 📩 EMAIL CAPTURE + ANALYTICS
// ===============================
const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('emailInput');

if (emailForm) {
    emailForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = emailInput.value.trim();

        if (!email) return;

        // сохраняем email
        let emails = JSON.parse(localStorage.getItem('nebularq_emails')) || [];
        emails.push(email);

        localStorage.setItem('nebularq_emails', JSON.stringify(emails));

        // счётчик подписок
        let subs = parseInt(localStorage.getItem('nebularq_subs')) || 0;
        subs++;

        localStorage.setItem('nebularq_subs', subs);

        emailInput.value = "";
        alert("🔥 Готово! Ты получишь лучшие скидки первым");
    });
}


// ===============================
// 📊 SIMPLE ANALYTICS DASHBOARD
// ===============================
function showStats() {

    const clicks = JSON.parse(localStorage.getItem('nebularq_clicks')) || {};
    const subs = parseInt(localStorage.getItem('nebularq_subs')) || 0;

    let totalClicks = 0;

    for (let key in clicks) {
        totalClicks += clicks[key];
    }

    const conversion = totalClicks > 0 
        ? ((subs / totalClicks) * 100).toFixed(2)
        : 0;

    console.log("📊 ===== NEBULARQ STATS =====");
    console.log("Клики:", totalClicks);
    console.log("Подписки:", subs);
    console.log("Конверсия:", conversion + "%");
}

// запуск при загрузке
showStats();

// ===============================
// 📊 LIVE STATS PANEL
// ===============================
function updateStatsUI() {

    const clicks = JSON.parse(localStorage.getItem('nebularq_clicks')) || {};
    const subs = parseInt(localStorage.getItem('nebularq_subs')) || 0;

    let totalClicks = 0;

    for (let key in clicks) {
        totalClicks += clicks[key];
    }

    const conversion = totalClicks > 0
        ? ((subs / totalClicks) * 100).toFixed(2)
        : 0;

    document.getElementById('statClicks').innerText = totalClicks;
    document.getElementById('statSubs').innerText = subs;
    document.getElementById('statConv').innerText = conversion + "%";
}

function showEmails() {
    const emails = JSON.parse(localStorage.getItem('nebularq_emails')) || [];

    if (emails.length === 0) {
        alert("Нет email");
        return;
    }

    alert("📩 Emails:\n\n" + emails.join("\n"));
}

// обновление при загрузке
updateStatsUI();