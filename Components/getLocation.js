import React from 'react';
import * as Location from 'expo-location'

const getLocation = async () => {
    let response = {location: null, errorMsg: null};
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        response.errorMsg = 'Permission to access location was denied';
        return response;
    }

    let location = await Location.getCurrentPositionAsync({});
    response.location = {latitude: location.coords.latitude, longitude: location.coords.longitude};
    return response;
};

export default getLocation
