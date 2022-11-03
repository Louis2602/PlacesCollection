import { useState, useEffect } from 'react';

import HotelsList from '../components/PlacesList/HotelsList/HotelsList';

const AllHotels = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [loadedHotels, setLoadedHotels] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		fetch(
			'https://food-collections-test-default-rtdb.firebaseio.com/places/hotels.json'
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				const hotels = [];

				for (const key in data) {
					const hotel = {
						id: key,
						...data[key],
					};

					hotels.push(hotel);
				}

				setIsLoading(false);
				setLoadedHotels(hotels);
			});
	}, []);
	return (
		<>
			{isLoading ? (
				<div className='loader'></div>
			) : (
				<section>
					<h1>All Hotels</h1>
					{loadedHotels.length === 0 ? (
						<p>There is no hotels stored yet! Add some more</p>
					) : (
						<HotelsList hotels={loadedHotels} />
					)}
				</section>
			)}
		</>
	);
};

export default AllHotels;
