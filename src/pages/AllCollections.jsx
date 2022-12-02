import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetCollectionQuery } from '../redux/services/fetchAPI';
import ItemsList from '../components/PlacesList/ItemsList/ItemsList';

const AllCollections = ({ collection }) => {
    const { data, isFetching } = useGetCollectionQuery(collection);
    const username = useSelector((state) => state.counter.username);

    const items = [];
    for (const key in data) {
        const item = {
            id: key,
            ...data[key]
        };
        items.push(item);
    }

    if (isFetching) return <div className="loader" />;

    return (
        <section>
            <h1>
                {collection !== 'favorites'
                    ? `All ${collection[0].toUpperCase()}${collection.slice(1)}`
                    : `${username ? `${username}'s Favorites` : 'Please sign in to access favorites'}`}
            </h1>
            {items.length === 0 ? (
                <Typography textAlign="center">There is no {collection} stored yet! Add some more</Typography>
            ) : (
                <ItemsList items={items} />
            )}
        </section>
    );
};

export default AllCollections;
