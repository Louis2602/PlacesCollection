import { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const mapStyle = {
    width: '200vh',
    height: '80vh'
};
const Map = () => {
    const location = useLocation();
    const address = location.state.address;
    const tittle = location.state.tittle;
    // const API = 'AIzaSyAx3usH0OxGDYgBSR0jzMe3H2DwJ3Ia8Rc';
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    });

    const [latitude, setLatitude] = useState(10.8231);
    const [longitude, setLongitude] = useState(106.6297);
    const [found, setFound] = useState(true);

    const arrAddress = address.split(', ');
    let state, street, city, country;
    if (arrAddress.length === 3) {
        street = arrAddress[0].concat(' ', arrAddress[1]);
        city = arrAddress[2];
        state = '';
        country = '';
    } else if (arrAddress[3] !== 'Vietnam') {
        street = arrAddress[0];
        state = arrAddress[1].concat(' ', arrAddress[2]);
        city = arrAddress[3];
        country = '';
    } else {
        street = arrAddress[0];
        state = arrAddress[1];
        city = arrAddress[2];
        country = '';
    }
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/forward',
            params: {
                format: 'json',
                street: `${street}`,
                state: `${state})`,
                city: `${city}`,
                country: 'VN' || `${country}`,
                'accept-language': 'en, vi',
                namedetails: '1',
                polygon_threshold: '0.0'
            },
            headers: {
                'X-RapidAPI-Key': '95df62b76emsh7839734175309a2p12ecbajsn854d90fc81f7',
                'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com'
            }
        };
        axios
            .request(options)
            .then(function (response) {
                setFound(true);
                setLatitude(response.data[0].lat);
                setLongitude(response.data[0].lon);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, [city, state, country, street]);
    const center = useMemo(() => ({ lat: Number(latitude), lng: Number(longitude) }), [latitude, longitude]);
    if (!isLoaded) return <div>Loading...</div>;
    return (
        <>
            <h1>This feature cannot be implemented due to GoogleMapsAPI fees, this will be updated in the future soon</h1>
            <h3>Name: {tittle}</h3>
            <p>Address: {address}</p>
            {!found ? (
                <p>Cannot find your place!!</p>
            ) : (
                <p>
                    Coordinates
                    <br />
                    Latitude: {latitude}
                    <br />
                    Longitude: {longitude}
                </p>
            )}
            <GoogleMap zoom={15} center={center} mapContainerStyle={mapStyle}>
                <MarkerF draggable position={center} />
            </GoogleMap>
        </>
    );
};

export default Map;
