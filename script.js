const apiKey = '9e03284219d5c6d252a17057';
const apiUrl = 'https://v6.exchangerate-api.com/v6/'+apiKey+'latest/KZT';
const defaultRate = document.getElementById('def_rate');

async function getExchangeRates() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Ошибка при получении данных');
        }
        const data = await response.json();
        showExchangeRates(data.conversion_rates);
    } catch (error) {
        defaultRate.textContent = 'Ошибка: ' + error.message;
    }
}

function showExchangeRates(rates) {
    const defRate = `1 KZT = ${rates.USD} USD, ${rates.EUR} EUR`;
    console.log(defRate);
    defaultRate.textContent = defRate;
}

getExchangeRates();

