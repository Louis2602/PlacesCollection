import React from 'react';
import { useNavigate } from 'react-router';
import NewPlaceForm from '../components/Form/NewPlaceForm';

const NewPlace = () => {
	const navigate = useNavigate();

	const addPlaceHandler = (placesData) => {
		fetch(
			`https://food-collections-test-default-rtdb.firebaseio.com/places/${placesData.type}s.json`,
			{
				method: 'POST',
				body: JSON.stringify(placesData),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		).then(() => {
			navigate(`/${placesData.type}s`);
		});
	};
	return (
		<section>
			<h1>Add New Place</h1>
			<NewPlaceForm onAddPlace={addPlaceHandler} />
		</section>
	);
};

export default NewPlace;
