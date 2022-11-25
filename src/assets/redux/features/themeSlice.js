import { createSlice } from '@reduxjs/toolkit';

const localStorageKey = 'theme';
const persistedTheme = localStorage.getItem(localStorageKey);

const initialState = {
    value: persistedTheme ? JSON.parse(persistedTheme) : {}
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        preferences: (state) => {
            state.value = !state.value;
        },
        subscribe: (state) => {
            localStorage.setItem(localStorageKey, JSON.stringify(state.value));
        }
    }
});

export const { preferences, subscribe } = themeSlice.actions;

export default themeSlice.reducer;
