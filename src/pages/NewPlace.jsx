import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { ref, update } from 'firebase/database';
import { v4 as uuid } from 'uuid';

import { themePreferences } from '../redux/features/themeSlice';
import { db } from '../firebase/firebaseConfig';
import NewPlaceForm from '../components/Form/NewPlaceForm';

const NewPlace = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addPlaceHandler = async (placesData) => {
        const key = uuid();
        const updates = {
            [`/places/${placesData.type}s/${key}`]: { ...placesData }
        };
        await update(ref(db), updates);
        navigate(`/${placesData.type}s`);
        dispatch(themePreferences(''));
    };
    return (
        <section>
            <h1>Add New Place</h1>
            <NewPlaceForm onAddPlace={addPlaceHandler} />
        </section>
    );
};

export default NewPlace;
