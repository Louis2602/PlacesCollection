import { createSlice } from '@reduxjs/toolkit';

const localStorageKey = 'highlight';
const persistedHighlight = localStorage.getItem(localStorageKey);

const initialState = {
    value: persistedHighlight ? JSON.parse(persistedHighlight) : true
};

const highlightSlice = createSlice({
    name: 'highlight',
    initialState,
    reducers: {
        highlightPreferences: (state, action) => {
            state.value = action.payload;
            localStorage.setItem(localStorageKey, JSON.stringify(state.value));
        }
    }
});

export const { highlightPreferences } = highlightSlice.actions;

export default highlightSlice.reducer;
