import { Grid } from '@mui/material';
import React from 'react';
import PlaceItem from '../PlaceItem/PlaceItem';

const AttractionsList = ({ attractions }) => {
	return (
		<Grid container spacing={1}>
			{attractions.map((attraction) => (
				<Grid item xs={12} sm={6} md={3} key={attraction.id}>
					<PlaceItem
						id={attraction.id}
						image={attraction.image}
						title={attraction.title}
						rating={attraction.rating}
						address={attraction.address}
						description={attraction.description}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default AttractionsList;
