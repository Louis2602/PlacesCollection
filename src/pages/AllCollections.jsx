import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ItemsList from '../components/PlacesList/ItemsList/ItemsList';

const AllCollections = ({ collection }) => {
    const username = useSelector((state) => state.counter.username);
    const [isLoading, setIsLoading] = useState(false);
    const [loadedItems, setloadedItems] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch(
            collection === 'favorites'
                ? `https://food-collections-test-default-rtdb.firebaseio.com/accounts/${username}/favorites.json`
                : `https://food-collections-test-default-rtdb.firebaseio.com/places/${collection}.json`
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const items = [];

                for (const key in data) {
                    const item = {
                        id: key,
                        ...data[key]
                    };

                    items.push(item);
                }

                setIsLoading(false);
                setloadedItems(items);
            });
    }, [collection, username]);

    return (
        <>
            {isLoading ? (
                <div className="loader"></div>
            ) : (
                <section>
                    <h1>
                        {collection !== 'favorites'
                            ? `All ${collection[0].toUpperCase()}${collection.slice(1)}`
                            : `${username ? `${username}'s Favorites` : 'Please sign in to access favorites'}`}
                    </h1>
                    {loadedItems.length === 0 ? (
                        <Typography textAlign="center">There is no {collection} stored yet! Add some more</Typography>
                    ) : (
                        <ItemsList items={loadedItems} />
                    )}
                </section>
            )}
        </>
    );
};

export default AllCollections;
