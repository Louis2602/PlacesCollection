import { Typography } from '@mui/material';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ItemsList from '../components/PlacesList/ItemsList/ItemsList';
import { db } from '../firebase/firebaseConfig';

const Favorites = () => {
    const username = useSelector((state) => state.counter.username);

    const [placesData, setPlacesData] = useState({});
    const [favData, setFavData] = useState({});

    useEffect(() => {
        const dataRef = ref(db, '/places');
        return onValue(dataRef, (dbData) => {
            const loadedData = dbData.val();
            setPlacesData(loadedData);
        });
    });
    useEffect(() => {
        const dataRef = ref(db, `/accounts/${username}/favorites`);
        return onValue(dataRef, (dbData) => {
            const loadedData = dbData.val();
            setFavData(loadedData);
        });
    });

    const itemList = [];

    for (const i in placesData) {
        for (const j in placesData[i]) {
            for (const k in favData) {
                if (k === j) {
                    const item = {
                        id: k,
                        ...placesData[i][j]
                    };
                    itemList.push(item);
                }
            }
        }
    }

    return (
        <section>
            <h1>{username ? `${username}'s Favorites` : 'Please sign in to access favorites'}</h1>
            {itemList.length === 0 ? (
                <Typography textAlign="center">There is no places stored yet! Add some more</Typography>
            ) : (
                <ItemsList items={itemList} />
            )}
        </section>
    );
};

export default Favorites;
