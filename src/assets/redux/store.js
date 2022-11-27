import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './features/counterSlice';
import themeReducer from './features/themeSlice';
import highlightReducer from './features/highlightSlice';

export const store = configureStore({
    reducer: { counter: counterReducer, theme: themeReducer, highlight: highlightReducer }
});
