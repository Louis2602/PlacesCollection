import React from 'react';
import classes from '../PlacesList/PlacesList.module.css';
import PlaceItem from '../PlaceItem/PlaceItem';

const RestaurantsList = ({ restaurants }) => {
	return (
		<ul className={classes.list}>
			{restaurants.map((restaurant) => (
				<PlaceItem
					key={restaurant.id}
					id={restaurant.id}
					image={restaurant.image}
					title={restaurant.title}
					address={restaurant.address}
					description={restaurant.description}
				/>
			))}
		</ul>
	);
};

export default RestaurantsList;
