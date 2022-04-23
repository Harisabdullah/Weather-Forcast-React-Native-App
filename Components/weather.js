import * as Location from 'expo-location'

const apikey = "597abb7d2ced7b969059775d88e1801e";
const API = "https://api.openweathermap.org/data/2.5/";


export const getCurrentForecast = async (location) => {
    const response = await fetch(`${API}weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apikey}&units=metric`);
    let data = await response.json();

    const locationString = await Location.reverseGeocodeAsync(location);
    return [
        {
            currTemp: data.main.temp.toFixed(0),
            maxTemp: data.main.temp_max.toFixed(0),
            minTemp: data.main.temp_min.toFixed(0),
            feelsLike: data.main.feels_like.toFixed(0),
            weatherDescription: data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1),
            weatherIcon: data.weather[0].icon,
            weatherMain: data.weather[0].main,
            currHumidity: data.main.humidity,
            currWind: (data.wind.speed * 18 / 5).toFixed(2)
        },
        {
            city: locationString[0].city,
            country: locationString[0].country
        }
    ]
}




const fetchForecast = async (location) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const response = await fetch(`${API}forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${apikey}&units=metric`);
    let data = await response.json();
    return data.list.map(item => {
        let hour = item["dt_txt"].split(" ")[1].split(":")[0];
        hour = (hour > 12) ? hour - 12 : hour;
        hour = (hour === "00") ? 12 : hour;
        const timeString = `${hour}:00`;
        let day = daysOfWeek[new Date(item["dt_txt"].split(" ")[0]).getDay()];
        const temp = item.main.temp.toFixed(0);
        const maxTemp = item.main.temp_max.toFixed(0);
        const minTemp = item.main.temp_min.toFixed(0);
        const weatherIcon = item.weather[0].icon;
        const weatherMain = item.weather[0].main;

        return {
            day,
            timeString,
            temp,
            maxTemp,
            minTemp,
            weatherIcon,
            weatherMain,
        }
    });
}

export const getForecast = async (location) => {
    const data = await fetchForecast(location);
    const firstTwentyFourHourForecast = data.slice(0,8);

    const dailyForecast = data.filter((item, index) => {
        if (index % 8 === 0) {
            return item;
        }
    });
    await dailyForecast.shift(); // Remove current day
    await firstTwentyFourHourForecast.shift(); // Remove current hour
    return [firstTwentyFourHourForecast, dailyForecast];
}
