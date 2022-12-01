import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const collectionsAPI = createApi({
    reducerPath: 'collectionsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://food-collections-test-default-rtdb.firebaseio.com'
    }),
    endpoints: (builder) => ({
        getAvatar: builder.query({ query: (username) => `/accounts/${username}/avatar.json` }),
        getAccount: builder.query({ query: (username) => `/accounts/${username}.json` }),
        getAllAccounts: builder.query({ query: () => `/accounts.json` }),
        getCollection: builder.query({ query: (collection) => `/places/${collection}.json` }),
        getAllCollections: builder.query({ query: () => `/places.json` }),
        getCollectionDetails: builder.query({ query: ({ collection, id }) => `/places/${collection}/${id}.json` }),
        getFavorites: builder.query({ query: (username) => `/accounts/${username}/favorites.json` })
    })
});

export const {
    useGetAvatarQuery,
    useGetCollectionQuery,
    useGetFavoritesQuery,
    useGetAllCollectionsQuery,
    useGetAllAccountsQuery,
    useGetAccountQuery,
    useGetCollectionDetailsQuery
} = collectionsAPI;
