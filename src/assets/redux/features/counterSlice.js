import { createSlice } from '@reduxjs/toolkit';

const localStorageKey = 'counter';
const persistedUser = localStorage.getItem(localStorageKey);

const initialState = {
    username: persistedUser ? JSON.parse(persistedUser) : null
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        signin: (state, action) => {
            state.username = action.payload;
            localStorage.setItem(localStorageKey, JSON.stringify(state.username));
        },
        logout: (state) => {
            state.username = '';
            localStorage.setItem(localStorageKey, JSON.stringify(state.username));
        }
    }
});

export const { signin, logout } = counterSlice.actions;

export default counterSlice.reducer;
