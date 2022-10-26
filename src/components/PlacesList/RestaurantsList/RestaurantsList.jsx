import React from 'react';
import PlaceItem from '../PlaceItem/PlaceItem';
import { Grid } from '@mui/material';

const RestaurantsList = ({ restaurants }) => {
	return (
		<Grid container spacing={1}>
			{restaurants.map((restaurant) => (
				<Grid item xs={12} sm={6} md={3} key={restaurant.id}>
					<PlaceItem
						id={restaurant.id}
						image={restaurant.image}
						title={restaurant.title}
						rating={restaurant.rating}
						address={restaurant.address}
						description={restaurant.description}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default RestaurantsList;
