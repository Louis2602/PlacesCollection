import React from 'react';
import PlaceItem from '../PlaceItem/PlaceItem';
import { Grid } from '@mui/material';

const HotelsList = ({ hotels }) => {
	return (
		<Grid container spacing={1}>
			{hotels.map((hotel) => (
				<Grid item xs={12} sm={6} md={3} key={hotel.id}>
					<PlaceItem
						id={hotel.id}
						image={hotel.image}
						title={hotel.title}
						rating={hotel.rating}
						address={hotel.address}
						description={hotel.description}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default HotelsList;
