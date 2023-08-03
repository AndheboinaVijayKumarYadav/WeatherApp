// variables
const submitButton = document.querySelector('.btn'),
      searchText = document.querySelector('.input-text');

// api object
const api = {
    key: 'bf2f85146afddb993cbdb9b87b484cbb',
    base: "https://api.openweathermap.org/data/2.5/"
}

// event listeners
submitButton.addEventListener('click', getWeather);

// function 

async function getWeather(event){
    event.preventDefault();

    if(searchText.value.length === 0){
        document.querySelector('.error').innerText = 'Please enter a valid city';
        return;
    }

    try {
        const response = await fetch(`${api.base}weather?q=${searchText.value}&units=metric&appid=${api.key}`);
        const data = await response.json();
        displayData(data);
    }
    catch(error) {
        console.log("Error", error);
    }
    
}



function displayData(data){
    console.log(data);

    // updating the city name
    const city = document.querySelector('.city');
    city.innerText = `${data.name},${data.sys.country}`;

    // updaing the date
    const today = new Date();
    const date = document.querySelector('.date');
    date.innerText = dateFunction(today);

    // updating tem
    const temp = document.querySelector('.temp');
    temp.innerHTML=`Temp: ${Math.round(data.main.temp)} <span>°C</span>`;

    // updating weather
    const weather = document.querySelector('.weather');
    weather.innerHTML=`Weather: ${data.weather[0].main}`;

    // updating temperature range
    const tempRange = document.querySelector(".temp-range");
    tempRange.innerText = `Temp Range: ${Math.round(data.main.temp_min)}°C / ${Math.round(data.main.temp_max)}°C`;

    // udpating the icon
    const weatherIcon = document.querySelector("img");
    const iconURL = "http://openweathermap.org/img/w/";
    weatherIcon.src = iconURL + data.weather[0].icon + ".png";
    searchText.value = "";
}


function dateFunction(d){

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}