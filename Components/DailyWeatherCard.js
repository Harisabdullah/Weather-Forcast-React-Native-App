import React from 'react';
import {ActivityIndicator, Card, Colors, Title, Headline, Subheading, Divider} from 'react-native-paper';
import {FlatList, Image, View} from 'react-native';

export default function DailyWeatherCard (props) {
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
        <Card>
            <FlatList
                data={props.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                    return(
                        <View style={{padding:10 ,display: "flex", flexDirection:"row", justifyContent: "space-between"}}>
                            <Title style={{width:"30%"}}>{item.day}</Title>

                            <View style={{width:"30%", display: "flex", flexDirection:"row"}}>
                                <Image
                                    style={{width: 40, height: 40}}
                                    source={{uri: `https://openweathermap.org/img/wn/${item.weatherIcon}@2x.png`}}
                                />
                                <Title>{item.weatherMain}</Title>
                            </View>

                            <Subheading style={{width:"30%"}}>{item.maxTemp + '\u00b0C'} / {item.minTemp-1 + '\u00b0C'}</Subheading>
                            <Divider />
                        </View>
                    )
                }}
            />
        </Card>

    )
}