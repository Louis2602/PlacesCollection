import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { themePreferences } from '../redux/features/themeSlice';
import NewPlaceForm from '../components/Form/NewPlaceForm';

const NewPlace = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addPlaceHandler = (placesData) => {
        fetch(`https://food-collections-test-default-rtdb.firebaseio.com/places/${placesData.type}s.json`, {
            method: 'POST',
            body: JSON.stringify(placesData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            navigate(`/${placesData.type}s`);
            dispatch(themePreferences(''));
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
