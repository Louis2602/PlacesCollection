import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import ItemsList from '../components/PlacesList/ItemsList/ItemsList';
import { useGetAllCollectionsQuery, useGetFavoritesQuery } from '../redux/services/fetchAPI';

const Favorites = () => {
    const username = useSelector((state) => state.counter.username);
    const { data: favData, isFetching: favFetch } = useGetFavoritesQuery(username || '');
    const { data: placesData, isFetching: placeFetch } = useGetAllCollectionsQuery();

    const favList = [];
    const itemList = [];

    for (const i in favData) favList.push(favData[i]);

    for (const i in placesData) {
        for (const j in placesData[i]) {
            for (const k in favList) {
                if (favList[k] === j) itemList.push(placesData[i][j]);
            }
        }
    }

    if (favFetch || placeFetch) return <div className="loader" />;

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
