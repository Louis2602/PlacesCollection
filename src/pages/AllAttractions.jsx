import { useState, useEffect } from 'react';

import AttractionsList from '../components/PlacesList/AttractionsList/AttractionsList';

const AllAttractions = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [loadedAttractions, setloadedAttractions] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		fetch(
			'https://food-collections-test-default-rtdb.firebaseio.com/places/attractions.json'
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				const attractions = [];

				for (const key in data) {
					const attraction = {
						id: key,
						...data[key],
					};

					attractions.push(attraction);
				}

				setIsLoading(false);
				setloadedAttractions(attractions);
			});
	}, []);
	return (
		<>
			{isLoading ? (
				<div className='loader'></div>
			) : (
				<section>
					<h1>All Attractions</h1>
					{loadedAttractions.length === 0 ? (
						<p>There is no attractions stored yet! Add some more</p>
					) : (
						<AttractionsList attractions={loadedAttractions} />
					)}
				</section>
			)}
		</>
	);
};

export default AllAttractions;
