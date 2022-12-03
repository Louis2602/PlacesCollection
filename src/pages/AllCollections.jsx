import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { onValue, ref } from 'firebase/database';

import ItemsList from '../components/PlacesList/ItemsList/ItemsList';
import { db } from '../firebase/firebaseConfig';

const AllCollections = ({ collection }) => {
    const [data, setData] = useState({});

    useEffect(() => {
        const dataRef = ref(db, `/places/${collection}`);
        return onValue(dataRef, (dbData) => {
            const loadedData = dbData.val();
            setData(loadedData);
        });
    });

    const items = [];
    for (const key in data) {
        const item = {
            id: key,
            ...data[key]
        };
        items.push(item);
    }

    return (
        <section>
            <h1>{`All ${collection[0].toUpperCase()}${collection.slice(1)}`}</h1>
            {items.length === 0 ? (
                <Typography textAlign="center">There is no {collection} stored yet! Add some more</Typography>
            ) : (
                <ItemsList items={items} />
            )}
        </section>
    );
};

export default AllCollections;
