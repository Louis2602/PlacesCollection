import { createContext, useState } from 'react';

const FavoritesContext = createContext({
    favorites: [],
    totalFavorites: 0,
    addFavorite: (favoriteMeetup) => {},
    removeFavorite: (meetupId) => {},
    itemIsFavorite: (meetupId) => {}
});

export const FavoritesContextProvider = (props) => {
    const [userFavorites, setUserFavorites] = useState([]);

    const addFavoriteHandler = (favoriteMeetup) => {
        setUserFavorites((prevUserFavorites) => {
            return prevUserFavorites.concat(favoriteMeetup);
        });
        localStorage.setItem(favoriteMeetup.id, JSON.stringify(favoriteMeetup));
    };

    const removeFavoriteHandler = (meetupId) => {
        setUserFavorites((prevUserFavorites) => {
            return prevUserFavorites.filter((meetup) => meetup.id !== meetupId);
        });
        localStorage.removeItem(meetupId);
    };

    const itemIsFavoriteHandler = (meetupId) => {
        return (
            userFavorites.some((meetup) => meetup.id === meetupId) || localStorage.getItem(meetupId) !== null
        );
    };

    const context = {
        favorites: userFavorites,
        totalFavorites: userFavorites.length,
        addFavorite: addFavoriteHandler,
        removeFavorite: removeFavoriteHandler,
        itemIsFavorite: itemIsFavoriteHandler
    };

    return <FavoritesContext.Provider value={context}>{props.children}</FavoritesContext.Provider>;
};

export default FavoritesContext;
