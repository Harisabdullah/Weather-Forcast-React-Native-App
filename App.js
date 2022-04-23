import React from 'react';  
import {Text, View, ScrollView} from 'react-native';
import CurrentWeatherCard from "./Components/CurrentWeather";

import getLocation from "./Components/getLocation";
import {getCurrentForecast, getForecast} from "./Components/weather";
import {Headline} from "react-native-paper";
import HourlyWeatherCard from "./Components/HourlyweatherCard";
import DailyWeatherCard from "./Components/DailyWeatherCard";

export default function App () {
    const [errorMsg, setErrorMsg] = React.useState(null);
    const [locationString, setLocationString] = React.useState(null);
    const [currentWeatherData, setCurrentWeatherData] = React.useState(null);

    const [hourlyWeatherData, setHourlyWeatherData] = React.useState(null);
    const [dailyWeatherData, setDailyWeatherData] = React.useState(null);

    React.useEffect(() => {
        ( async () => {
            const response = await getLocation();
            if(response.errorMsg){
                setErrorMsg(errorMsg);
            }
            if(response.location){
                const currentForecast = await getCurrentForecast(response.location);
                setCurrentWeatherData(currentForecast[0]);
                setLocationString(`${currentForecast[1].city}, ${currentForecast[1].country}.`);

                const forecast = await getForecast(response.location);
                setHourlyWeatherData(forecast[0]);
                setDailyWeatherData(forecast[1]);
            }
        })()
    }, [])

    if(errorMsg){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>{errorMsg}</Text>
            </View>
        )
    }


    return (
        <View style={{marginTop: 100, marginLeft: 20, marginRight:20}}>
            <Headline>{locationString}</Headline>
            <CurrentWeatherCard weather ={currentWeatherData}/>
            <HourlyWeatherCard data = {hourlyWeatherData}/>
            <DailyWeatherCard data = {dailyWeatherData} />
        </View>
    );  
};
  