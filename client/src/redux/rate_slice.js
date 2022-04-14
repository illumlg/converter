import { createSlice } from '@reduxjs/toolkit';
import socket from '../socket';

export const rateSlice = createSlice({
    name: "rates",
    initialState: {
        value: []
    },
    reducers: {
        refresh: (state, action) => {
            state.value = action.payload;
        },
    }
});

const { refresh } = rateSlice.actions;
export const refreshRates = () => dispatch => {
    socket.emit("currency", (res) => {dispatch(refresh(res))});
};
export default rateSlice.reducer;