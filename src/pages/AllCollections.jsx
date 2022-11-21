import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ItemsList from '../components/PlacesList/ItemsList/ItemsList';

const AllCollections = () => {
    const { collection } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [loadedItems, setloadedItems] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://food-collections-test-default-rtdb.firebaseio.com/places/${collection}.json`)
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
    }, [collection]);

    return (
        <>
            {isLoading ? (
                <div className="loader"></div>
            ) : (
                <section>
                    <h1>
                        All {collection[0].toUpperCase()}
                        {collection.slice(1)}
                    </h1>
                    {loadedItems.length === 0 ? <p>There is no {collection} stored yet! Add some more</p> : <ItemsList items={loadedItems} />}
                </section>
            )}
        </>
    );
};

export default AllCollections;
