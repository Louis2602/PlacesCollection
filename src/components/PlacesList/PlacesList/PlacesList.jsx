import React from 'react';
import classes from './PlacesList.module.css';
import PlaceItem from '../PlaceItem/PlaceItem';

const PlacesList = ({ favorites }) => {
	return (
		<ul className={classes.list}>
			{favorites.map((fav) => (
				<PlaceItem
					key={fav.id}
					id={fav.id}
					image={fav.image}
					title={fav.title}
					address={fav.address}
					description={fav.description}
				/>
			))}
		</ul>
	);
};

export default PlacesList;
