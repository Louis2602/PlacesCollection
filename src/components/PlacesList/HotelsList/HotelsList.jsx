import React from 'react';
import classes from '../PlacesList/PlacesList.module.css';
import PlaceItem from '../PlaceItem/PlaceItem';

const HotelsList = ({ hotels }) => {
	return (
		<ul className={classes.list}>
			{hotels.map((hotel) => (
				<PlaceItem
					key={hotel.id}
					id={hotel.id}
					image={hotel.image}
					title={hotel.title}
					address={hotel.address}
					description={hotel.description}
				/>
			))}
		</ul>
	);
};

export default HotelsList;
