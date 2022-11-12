import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material';

import PlaceItemDetails from '../components/PlacesList/PlaceItemDetails/PlaceItemDetails';

const Styledh1 = styled('h1')(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        padding: 0
    }
}));

const ItemDetails = () => {
    const { collection, id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [loadedItem, setLoadedItem] = useState({});

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://food-collections-test-default-rtdb.firebaseio.com/places/${collection}.json`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                for (const key in data) {
                    const item = {
                        id: key,
                        ...data[key]
                    };
                    if (item.id === id) setLoadedItem(item);
                }
                setIsLoading(false);
            });
    }, [collection, id]);

    return (
        <>
            {isLoading ? (
                <div className="loader"></div>
            ) : (
                <section>
                    {loadedItem.length === 0 ? (
                        <p>Error loading {collection}!</p>
                    ) : (
                        <>
                            <Styledh1>{loadedItem.title}</Styledh1>
                            <PlaceItemDetails
                                id={loadedItem.id}
                                address={loadedItem.address}
                                description={loadedItem.description}
                                image={loadedItem.image}
                                title={loadedItem.title}
                                type={loadedItem.type}
                            />
                        </>
                    )}
                </section>
            )}
        </>
    );
};

export default ItemDetails;
