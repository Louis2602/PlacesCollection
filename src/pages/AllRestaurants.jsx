import { useState, useEffect } from 'react';

import RestaurantsList from '../components/PlacesList/RestaurantsList/RestaurantsList';

const AllRestaurants = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [loadedRestaurants, setLoadedRestaurants] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		fetch(
			'https://food-collections-test-default-rtdb.firebaseio.com/places/restaurants.json'
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				const restaurants = [];

				for (const key in data) {
					const restaurant = {
						id: key,
						...data[key],
					};

					restaurants.push(restaurant);
				}

				setIsLoading(false);
				setLoadedRestaurants(restaurants);
			});
	}, []);
	return (
		<>
			{isLoading ? (
				<div className='loader'></div>
			) : (
				<section>
					<h1>All Restaurants</h1>
					{loadedRestaurants.length === 0 ? (
						<p>There is no restaurants stored yet! Add some more</p>
					) : (
						<RestaurantsList restaurants={loadedRestaurants} />
					)}
				</section>
			)}
		</>
	);
};

export default AllRestaurants;
