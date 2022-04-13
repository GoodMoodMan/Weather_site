const changeCityInput = document.querySelector('.cityNameInput');
const changeCityBtn = document.querySelector('.changeCityBtn');
const loadingContent = document.querySelector('.loadingContent');

const loadDOM = (collectedData) => {
    let cityName = document.querySelector('.cityName');
    let actualTemp = document.querySelector('.actualTemp');
    let skyStatus = document.querySelector('.skyStatus');
    let pressure = document.querySelector('.pressure');
    let humidity = document.querySelector('.humidity');
    let wind = document.querySelector('.wind');

    cityName.textContent = collectedData[0];
    actualTemp.textContent = `${Math.round(collectedData[1].temp)} °C`;
    skyStatus.textContent = `${collectedData[2].description}`;

    pressure.textContent = `Pressure: ${collectedData[1].pressure} hPa`;
    humidity.textContent = `Humidity: ${collectedData[1].humidity} %`;
    wind.textContent = `Wind speed: ${collectedData[3].speed} km/h`;
};

async function getData(city) {
    loadingContent.classList.add('active');
    if (city == null) {
        city = 'Haifa'
    }
    const fetched = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=68dde8d7b57ab6b29fc6ed1545f11cec&units=metric`, {
        mode: 'cors',
    })
    try {
        const Data = await fetched.json();
        let collectedData =
            [
                Data.name,
                Data.main,
                Data.weather[0],
                Data.wind
            ];
        console.log(collectedData);
        loadDOM(collectedData);
        loadingContent.classList.remove('active');
    } catch (error) {
        if (fetched.status == '404') {
            alert('City name was not found');
        }
        else {
            alert('Value has to be a proper name');
        }
        loadingContent.classList.remove('active');
    }
};
getData();

const changeCity = () => {
    getData(changeCityInput.value);
    changeCityInput.value = '';
}

changeCityBtn.addEventListener('click', changeCity);