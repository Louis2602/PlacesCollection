import React from 'react';
import { useMemo } from 'react';
import Geocode from 'react-geocode';
import { useLocation } from 'react-router-dom';

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import './mapStyle.css';

const LoadedMap = ({ address, tittle }) => {
	const center = useMemo(() => ({ lat: 10, lng: 106 }), []);
	return (
		<>
			<h1>
				This feature cannot be implemented due to GoogleMapsAPI fees,
				this will be updated in the future soon
			</h1>
			<h3>Name: {tittle}</h3>
			<p>Address: {address}</p>
			<GoogleMap
				zoom={10}
				center={center}
				mapContainerClassName='map-container'
			>
				<Marker position={center} />
			</GoogleMap>
		</>
	);
};

const Map = () => {
	const location = useLocation();
	const address = location.state.address;
	const tittle = location.state.tittle;
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	});
	Geocode.fromAddress({ address }).then(
		(response) => {
			const { lat, lng } = response.results[0].geometry.location;
			console.log(lat, lng);
		},
		(error) => {
			console.log(error);
		}
	);
	// navigator.geolocation.getCurrentPosition(
	// 	({ coords: { latitude, longitude } }) => {
	// 		console.log(latitude, longitude);
	// 	}
	// );
	if (!isLoaded) return <div>Loading...</div>;
	return <LoadedMap address={address} tittle={tittle} />;
};

export default Map;
