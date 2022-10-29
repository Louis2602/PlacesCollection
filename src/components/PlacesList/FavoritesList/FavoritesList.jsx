import React from 'react';
import PlaceItem from '../PlaceItem/PlaceItem';
import { Grid } from '@mui/material';

const FavoritesList = ({ favorites }) => {
	return (
		<Grid container spacing={1} sx={{width: '100%'}}>
			{favorites.map((fav) => (
				<Grid item xs={12} sm={6} md={3} key={fav.id}>
					<PlaceItem
						id={fav.id}
						image={fav.image}
						title={fav.title}
						rating={fav.rating}
						address={fav.address}
						description={fav.description}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default FavoritesList;
