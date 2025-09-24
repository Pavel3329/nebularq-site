document.addEventListener('DOMContentLoaded', function() {
    const flashDeal = document.querySelector('.flash-deal');
    const closeBtn = document.querySelector('.close-btn');
    
    // Проверяем, было ли окно закрыто
    if (localStorage.getItem('flashDealClosed') !== 'true') {
        flashDeal.classList.remove('hidden');
    }
    
    // Обработчик закрытия
    closeBtn.addEventListener('click', function() {
        flashDeal.classList.add('hidden');
        localStorage.setItem('flashDealClosed', 'true');
    });
});