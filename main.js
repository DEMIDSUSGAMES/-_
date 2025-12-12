document.addEventListener('DOMContentLoaded', function() {
    console.log('Система поиска данных загружена! Telegram: @Demid_Ca');
    
    // Получаем элементы
    const mainScreen = document.getElementById('mainScreen');
    const loadingScreen = document.getElementById('loadingScreen');
    const resultScreen = document.getElementById('resultScreen');
    const searchBtn = document.getElementById('searchBtn');
    const skipBtn = document.getElementById('skipBtn');
    const tryAgainBtn = document.getElementById('tryAgainBtn');
    const exitBtn = document.getElementById('exitBtn');
    const loadingBar = document.getElementById('loadingBar');
    const loadingStatus = document.getElementById('loadingStatus');
    const phoneInput = document.getElementById('phoneNumber');
    const ipAddress = document.getElementById('ipAddress');
    
    // Переменные состояния
    let loadingInterval;
    let loadingProgress = 0;
    let isSearching = false;
    
    // Маска для номера телефона
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.startsWith('7') || value.startsWith('8')) {
            value = '7' + value.substring(1);
        }
        
        if (value.length > 0) {
            let formatted = '+7';
            if (value.length > 1) formatted += ' (' + value.substring(1, 4);
            if (value.length > 4) formatted += ') ' + value.substring(4, 7);
            if (value.length > 7) formatted += '-' + value.substring(7, 9);
            if (value.length > 9) formatted += '-' + value.substring(9, 11);
            
            e.target.value = formatted;
        }
    });
    
    // Кнопка "Начать поиск"
    searchBtn.addEventListener('click', function() {
        if (isSearching) return;
        
        const phoneValue = phoneInput.value.replace(/\D/g, '');
        
        if (!phoneValue || phoneValue.length < 10) {
            alert('Введите корректный номер телефона (минимум 10 цифр)');
            return;
        }
        
        isSearching = true;
        startSearch();
    });
    
    // Кнопка "Ускорить поиск"
    skipBtn.addEventListener('click', function() {
        if (loadingInterval) {
            clearInterval(loadingInterval);
            loadingProgress = 90;
            loadingBar.style.width = '90%';
            loadingStatus.textContent = "Завершение поиска...";
            
            setTimeout(function() {
                showResults();
            }, 800);
        }
    });
    
    // Кнопка "Попробовать ещё раз"
    tryAgainBtn.addEventListener('click', function() {
        startQuickSearch();
    });
    
    // Кнопка "В главное меню"
    exitBtn.addEventListener('click', function() {
        resultScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
        
        // Сброс состояния
        phoneInput.value = '';
        isSearching = false;
        ipAddress.textContent = '';
    });
    
    // Функция начала поиска
    function startSearch() {
        mainScreen.classList.add('hidden');
        loadingScreen.classList.remove('hidden');
        
        loadingProgress = 0;
        loadingBar.style.width = '0%';
        
        const statusMessages = [
            "Подключение к операторам связи...",
            "Доступ к геолокационной базе...",
            "Поиск в Таганроге...",
            "Сканирование IP-сети...",
            "Определение местоположения...",
            "Формирование отчёта..."
        ];
        
        let statusIndex = 0;
        loadingStatus.textContent = statusMessages[statusIndex];
        
        // Нормальная загрузка
        loadingInterval = setInterval(function() {
            loadingProgress += Math.random() * 3 + 1;
            
            if (loadingProgress >= 100) {
                loadingProgress = 100;
                clearInterval(loadingInterval);
                loadingBar.style.width = '100%';
                loadingStatus.textContent = "Поиск завершён!";
                
                setTimeout(function() {
                    showResults();
                }, 500);
            } else {
                loadingBar.style.width = loadingProgress + '%';
                
                // Меняем статус каждые 15%
                if (loadingProgress > (statusIndex + 1) * 17 && statusIndex < statusMessages.length - 1) {
                    statusIndex++;
                    loadingStatus.textContent = statusMessages[statusIndex];
                }
            }
        }, 200);
    }
    
    // Быстрый поиск для повторных попыток
    function startQuickSearch() {
        loadingProgress = 0;
        loadingBar.style.width = '0%';
        loadingStatus.textContent = "Быстрый поиск...";
        
        clearInterval(loadingInterval);
        
        loadingInterval = setInterval(function() {
            loadingProgress += 25;
            loadingBar.style.width = loadingProgress + '%';
            
            if (loadingProgress >= 100) {
                clearInterval(loadingInterval);
                loadingBar.style.width = '100%';
                
                setTimeout(function() {
                    showResults();
                }, 300);
            }
        }, 200);
    }
    
    // Показ результатов
    function showResults() {
        loadingScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        
        // Генерируем случайный результат
        const results = [
            "Улица Пушкина, дом Колотушкина",
            "Проспект Ленина, дом 42, кв. 17",
            "Улица Чехова, дом 15, подъезд 3",
            "Петровская улица, дом 88",
            "Улица Фрунзе, дом 33, этаж 5"
        ];
        
        // Показываем результат с задержкой
        setTimeout(function() {
            const randomResult = results[Math.floor(Math.random() * results.length)];
            ipAddress.textContent = randomResult;
        }, 300);
        
        isSearching = false;
    }
    
    // Обработчик Enter
    phoneInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
    
    // Telegram ссылка
    document.querySelector('.telegram-link').addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://t.me/Demid_Ca', '_blank');
    });
    
    // Предотвращаем скролл
    document.addEventListener('touchmove', function(e) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    }, { passive: false });
});