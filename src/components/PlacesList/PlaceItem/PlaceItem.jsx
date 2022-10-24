import React from 'react';
import Card from '../../UI/Card';
import { useContext } from 'react';
import FavoritesContext from '../../../contexts/FavoritesContext';

import classes from './PlaceItem.module.css';

const PlaceItem = ({ id, image, title, address, description }) => {
	const favoriteCtx = useContext(FavoritesContext);

	const itemIsFavorite = favoriteCtx.itemIsFavorite(id);

	const toggleFavoriteStatusHandler = () => {
		if (itemIsFavorite) {
			favoriteCtx.removeFavorite(id);
		} else {
			favoriteCtx.addFavorite({
				id: id,
				title: title,
				description: description,
				image: image,
				address: address,
			});
		}
	};
	return (
		<li className={classes.item}>
			<Card>
				<div className={classes.image}>
					<img src={image} alt='error' />
				</div>
				<div className={classes.content}>
					<h3>{title}</h3>
					<address>{address}</address>
					<p>{description}</p>
				</div>
				<div className={classes.actions}>
					<button onClick={toggleFavoriteStatusHandler}>
						{itemIsFavorite
							? 'Remove from Favorites'
							: 'Add to Favorites'}
					</button>
				</div>
			</Card>
		</li>
	);
};

export default PlaceItem;
