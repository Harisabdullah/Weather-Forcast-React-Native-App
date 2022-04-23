import React from 'react';
import {ActivityIndicator, Card, Colors, Paragraph, Title, Avatar, Subheading, Headline} from 'react-native-paper';
import { Image } from 'react-native';

export default function CurrentWeatherCard (props) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if(!props.weather){
        return (
            <Card>
                <Card.Content>
                    <Title>Loading ...</Title>
                    <ActivityIndicator animating={true} color={Colors.blue500} />
                </Card.Content>
            </Card>
        );
    }
    return(
        // Return the current weather card
        <Card>
            <Card.Content>
                <Headline>{props.weather.currTemp + '\u00b0C'}</Headline>
                <Subheading>{props.weather.maxTemp + '\u00b0C'} / {props.weather.minTemp-1 + '\u00b0C'}</Subheading>
                <Title>{props.weather.weatherDescription}</Title>
                <Image
                    style={{width: 70, height: 70}}
                    source={{uri: `https://openweathermap.org/img/wn/${props.weather.weatherIcon}@2x.png`}}
                />
                <Subheading>
                    {daysOfWeek[new Date().getDay()]}
                </Subheading>
            </Card.Content>
        </Card>
)
}