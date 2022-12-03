import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { useParams } from 'react-router-dom';

import PlaceItemDetails from '../components/PlacesList/PlaceItemDetails/PlaceItemDetails';
import { db } from '../firebase/firebaseConfig';

const ItemDetails = () => {
    const { collection, id } = useParams();

    const [data, setData] = useState({});

    useEffect(() => {
        const dataRef = ref(db, `/places/${collection}s/${id}`);
        return onValue(dataRef, (dbData) => {
            const loadedData = dbData.val();
            setData(loadedData);
        });
    });

    return (
        <section>
            <h1>{data.title}</h1>
            <PlaceItemDetails
                id={id}
                address={data.address}
                description={data.description}
                rating={data.rating}
                image={data.image}
                title={data.title}
                type={data.type}
            />
        </section>
    );
};

export default ItemDetails;
