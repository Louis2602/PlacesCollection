import React from 'react';
import classes from '../PlacesList/PlacesList.module.css';
import PlaceItem from '../PlaceItem/PlaceItem';

const AttractionsList = ({ attractions }) => {
	return (
		<ul className={classes.list}>
			{attractions.map((attraction) => (
				<PlaceItem
					key={attraction.id}
					id={attraction.id}
					image={attraction.image}
					title={attraction.title}
					address={attraction.address}
					description={attraction.description}
				/>
			))}
		</ul>
	);
};

export default AttractionsList;
