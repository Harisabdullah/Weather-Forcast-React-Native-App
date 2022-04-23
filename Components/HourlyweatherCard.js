import React from 'react';
import {ActivityIndicator, Card, Colors, Title, Headline} from 'react-native-paper';
import {FlatList, Image} from 'react-native';

export default function HourlyWeatherCard (props) {
    if(!props.data){
        return (
            <Card>
                <Card.Content>
                    <ActivityIndicator animating={true} color={Colors.blue800} />
                </Card.Content>
            </Card>
        )
    }
    return(
        <FlatList
            data={props.data}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            renderItem={({item}) => {
                return(
                    <Card style={{padding:40}}>
                        <Title>{item.timeString}</Title>
                        <Image
                            style={{width: 40, height: 40}}
                            source={{uri: `https://openweathermap.org/img/wn/${item.weatherIcon}@2x.png`}}
                        />
                        <Headline>{`${item.temp}\u00b0C`}</Headline>
                        <Title>{item.weatherMain}</Title>
                    </Card>
                )
            }}
        />
    )
}