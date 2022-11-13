import { useContext } from 'react';

import FavoritesContext from '../contexts/FavoritesContext';
import ItemsList from '../components/PlacesList/ItemsList/ItemsList';

const Favorites = () => {
    const favoritesCtx = useContext(FavoritesContext);

    const favorites = [];
    let content;
    if (favoritesCtx.totalFavorites === 0 && localStorage.length === 0) {
        content = <p>You have no favorites yet. Start adding some?</p>;
    } else {
        const keys = Object.keys(localStorage);
        keys.map((key) => {
            return favorites.push(JSON.parse(localStorage.getItem(key)));
        });

        content = <ItemsList items={favorites} />;
    }
    return (
        <section
            style={{
                width: '100%',
                textAlign: 'center'
            }}>
            <h1>My Favorites</h1>
            {content}
        </section>
    );
};

export default Favorites;
