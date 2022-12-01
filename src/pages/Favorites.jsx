import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ItemsList from '../components/PlacesList/ItemsList/ItemsList';

const Favorites = () => {
    const username = useSelector((state) => state.counter.username);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedItems, setloadedItems] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const favList = [];
        const itemList = [];
        fetch(`https://food-collections-test-default-rtdb.firebaseio.com/accounts/${username}/favorites.json`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                for (const i in data) favList.push(data[i]);
            });
        fetch(`https://food-collections-test-default-rtdb.firebaseio.com/places.json`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                for (const i in data) {
                    for (const j in data[i]) {
                        for (const k in favList) {
                            if (favList[k] === j) itemList.push(data[i][j]);
                        }
                    }
                }
                setloadedItems(itemList);
                setIsLoading(false);
            });
    }, [username]);

    return (
        <>
            {isLoading ? (
                <div className="loader"></div>
            ) : (
                <section>
                    <h1>{username ? `${username}'s Favorites` : 'Please sign in to access favorites'}</h1>
                    {loadedItems.length === 0 ? (
                        <Typography textAlign="center">There is no places stored yet! Add some more</Typography>
                    ) : (
                        <ItemsList items={loadedItems} />
                    )}
                </section>
            )}
        </>
    );
};

export default Favorites;
