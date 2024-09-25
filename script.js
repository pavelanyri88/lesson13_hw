const apiKey = 'YOUR_API_KEY';
const apiUrl = 'https://v6.exchangerate-api.com/v6/' + apiKey + '/latest/KZT';

async function getExchangeRates() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Ошибка при получении данных');
        }
        const data = await response.json();
        showExchangeRates(data.conversion_rates);
    } catch (error) {
        document.getElementById('def_rate').textContent = 'Ошибка: ' + error.message;
    }
}

function showExchangeRates(rates) {
    const defRate = `1 KZT = ${rates.USD} USD, ${rates.EUR} EUR`;
    document.getElementById('def_rate').textContent = defRate;
}

