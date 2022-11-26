import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: null
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        signin: (state, action) => {
            state.username = action.payload;
        },
        logout: (state) => {
            state.username = '';
        }
    }
});

export const { signin, logout } = counterSlice.actions;

export default counterSlice.reducer;
