const apiKey = '9e03284219d5c6d252a17057';
const apiUrl = 'https://v6.exchangerate-api.com/v6/'+apiKey+'latest/KZT';
const defaultRate = document.getElementById('def_rate');
const convertRateBtn = document.getElementById('convert');


async function getExchangeRates() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Ошибка при получении данных');
        }
        const data = await response.json();
        showExchangeRates(data.conversion_rates);
        return data.conversion_rates;
    } catch (error) {
        defaultRate.textContent = 'Ошибка: ' + error.message;
    }
}

function showExchangeRates(rates) {
    const defRate = `1 KZT = ${rates.USD} USD, ${rates.EUR} EUR`;
    defaultRate.textContent = defRate;
}

function convert(input_cur, a_cur, b_cur, rates) {
    if (a_cur === b_cur) return input_cur;

    let convertedAmount;
    if (a_cur=== 'KZT') {
        convertedAmount = input_cur * rates[b_cur];
    } else if (b_cur === 'KZT') {
        convertedAmount = input_cur / rates[a_cur];
    } else {
        convertedAmount = (input_cur * rates[a_cur]) / rates[b_cur];
    }
    return convertedAmount.toFixed(2);
}

convertRateBtn.addEventListener('click', async() => {
    var input_cur = parseFloat(document.getElementById('input_cur').value);
    const a_cur = document.getElementById('a_cur').value;
    const b_cur = document.getElementById('b_cur').value;

    const rates = await getExchangeRates();
    console.log(rates);
    if (rates) {
        const convert_result = convert(input_cur, a_cur, b_cur, rates);
        console.log(convert_result);
        document.getElementById('result').innerHTML = 'Результат '+input_cur+' '+a_cur+' равно '+convert_result+' '+b_cur;
        document.getElementById('result').style.display="block";
    }
});

getExchangeRates();

