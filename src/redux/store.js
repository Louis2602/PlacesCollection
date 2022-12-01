import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './features/counterSlice';
import themeReducer from './features/themeSlice';
import highlightReducer from './features/highlightSlice';
import { collectionsAPI } from './services/fetchAPI';

export const store = configureStore({
    reducer: { [collectionsAPI.reducerPath]: collectionsAPI.reducer, counter: counterReducer, theme: themeReducer, highlight: highlightReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(collectionsAPI.middleware)
});
