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
        fetch(`https://food-collections-test-default-rtdb.firebaseio.com/places/${collection}/${id}.json`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setLoadedItem(data);
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
                                id={id}
                                address={loadedItem.address}
                                description={loadedItem.description}
                                rating={loadedItem.rating}
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
