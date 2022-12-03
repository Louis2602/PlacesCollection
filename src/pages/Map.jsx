/* eslint-disable no-undef */
import { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import {
	GoogleMap,
	useJsApiLoader,
	MarkerF,
	DirectionsRenderer,
} from '@react-google-maps/api';
import {
	Box,
	Grid,
	Typography,
	styled,
	Button,
	CardActions,
	CardContent,
	Card,
	Stack,
} from '@mui/material';
import { LocationSearching } from '@mui/icons-material';
const StyledBox = styled(Box)({
	width: '100%',
	height: '100%',
});
const StyledGrid = styled(Grid)({
	padding: '0 4rem',
});
const mapStyle = {
	width: '100%',
	height: '80vh',
};
const Map = () => {
	const location = useLocation();
	const address = location.state.address;
	const title = location.state.title;

	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: 'AIzaSyDghm3D-kB2ORehHDChWzO0GuSPfq-2y30',
		libraries: ['places'],
	});
	const [latitude, setLatitude] = useState(10.8231);
	const [longitude, setLongitude] = useState(106.6297);

	const [map, setMap] = useState(/** @type google.maps.Map */ null);
	const [directionsResponse, setDirectionsResponse] = useState(null);
	const [distance, setDistance] = useState('');
	const [duration, setDuration] = useState('');

	// const [lat, setLat] = useState(null);
	// const [lng, setLng] = useState(null);

	// navigator.geolocation.getCurrentPosition((position) => {
	// 	setLat(position.coords.latitude);
	// 	setLng(position.coords.longitude);
	// });

	const calculateRoute = async () => {
		const directionsService = new google.maps.DirectionsService();
		const results = await directionsService.route({
			origin: 'Liverpool, UK',
			destination: 'Oxford, UK',
			travelMode: google.maps.TravelMode.DRIVING,
		});
		setDirectionsResponse(results);
		setDistance(resutls.routes[0].legs[0].distance.text);
		setDuration(results.routes[0].legs[0].duration.text);
	};

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
				polygon_threshold: '0.0',
			},
			headers: {
				'X-RapidAPI-Key':
					'95df62b76emsh7839734175309a2p12ecbajsn854d90fc81f7',
				'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com',
			},
		};
		axios
			.request(options)
			.then(function (response) {
				setLatitude(response.data[0].lat);
				setLongitude(response.data[0].lon);
			})
			.catch(function (error) {
				console.error(error);
			});
	}, [city, state, country, street]);

	const center = useMemo(
		() => ({ lat: Number(latitude), lng: Number(longitude) }),
		[latitude, longitude]
	);

	if (!isLoaded) return <div>Loading...</div>;
	if (loadError) {
		return <div>Map cannot be loaded right now, sorry.</div>;
	}
	return (
		<Stack spacing={2} sx={{ width: '100%' }}>
			<h1>Journey to your location</h1>
			<StyledGrid container spacing={2}>
				<Grid item xs={12} md={4}>
					<Card sx={{ minWidth: 275 }}>
						<CardContent>
							<Typography
								sx={{ fontSize: '2rem' }}
								color='text.secondary'
								gutterBottom
								textAlign='center'
							>
								{title}
							</Typography>
							<Typography
								variant='body2'
								sx={{
									fontStyle: 'italic',
								}}
							>
								Address: {address}
							</Typography>
							<Typography variant='body2'>
								Distance: {distance}
							</Typography>
							<Typography variant='body2'>
								Duration: {duration}
							</Typography>
						</CardContent>
						<CardActions>
							<Button
								size='small'
								sx={{ marginLeft: 'auto', marginRight: '1rem' }}
								onClick={calculateRoute}
							>
								Find Way
							</Button>
							<LocationSearching
								sx={{ cursor: 'pointer' }}
								onClick={() => {
									map.panTo(center);
									map.setZoom(18);
								}}
							/>
						</CardActions>
					</Card>
				</Grid>
				<Grid item xs={12} md={8}>
					<StyledBox>
						<GoogleMap
							zoom={18}
							center={center}
							mapContainerStyle={mapStyle}
							options={{
								fullscreenControl: false,
							}}
							onLoad={(map) => setMap(map)}
						>
							<MarkerF draggable position={center} />
							{directionsResponse && (
								<DirectionsRenderer
									directions={directionsResponse}
								/>
							)}
						</GoogleMap>
					</StyledBox>
				</Grid>
			</StyledGrid>
		</Stack>
	);
};

export default Map;
