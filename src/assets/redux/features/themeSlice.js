import { createSlice } from '@reduxjs/toolkit';

const localStorageKey = 'theme';
const persistedTheme = localStorage.getItem(localStorageKey);

const initialState = {
    value: persistedTheme ? JSON.parse(persistedTheme) : false
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        themePreferences: (state, action) => {
            state.value = action.payload;
            localStorage.setItem(localStorageKey, JSON.stringify(state.value));
        }
    }
});

export const { themePreferences } = themeSlice.actions;

export default themeSlice.reducer;
