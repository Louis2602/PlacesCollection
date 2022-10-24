import React from "react";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./mapStyle.css";

const Map = () => {
	const center = useMemo(() => ({ lat: 10.762622, lng: 106.660172 }), []);

	return (
		<GoogleMap
			zoom={10}
			center={center}
			mapContainerClassName="map-container"
		>
			<Marker position={center} />
		</GoogleMap>
	);
};

const HomePage = () => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	});

	if (!isLoaded) return <div>Loading...</div>;
	return <Map />;
};

export default HomePage;
