const getToken = async (email, password) => {
    try {
        const response = await fetch("https://ajax.test-danit.com/api/v2/cards/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const token = await response.text();

        localStorage.setItem('authToken', token);

        return token;
    } catch (error) {
        console.error("Помилка при отриманні токену:", error);
    }
};



const fetchAllCards = async () => {
    const token = localStorage.getItem('authToken'); // Отримуємо токен з LocalStorage

    if (!token) {
        console.error("Токен не знайдено. Будь ласка, увійдіть.");
        return;
    }

    try {
        const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Передаємо токен у заголовку
            }
        });

        if (!response.ok) {
            throw new Error('Помилка при отриманні карток');
        }

        const cards = await response.json();
        return cards;
    } catch (error) {
        console.error("Помилка при отриманні карток:", error);
    }
};



const loadCards = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        console.error("Токен не знайдено. Спочатку виконайте вхід.");
        return;
    }

    try {
        const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Не вдалося завантажити картки');
        }

        const cards = await response.json();
    } catch (error) {
        console.error("Помилка:", error);
    }
};

window.addEventListener('load', loadCards);
