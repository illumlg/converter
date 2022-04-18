import { createSlice } from '@reduxjs/toolkit';
import socket from '../socket';

export const priceIntervalSlice = createSlice({
    name: "price_interval",
    initialState: {
        value: {}
    },
    reducers: {
        refresh: (state, action) => {
            state.value = action.payload;
        },
    }
});

export const { refresh } = priceIntervalSlice.actions;
export const refreshPriceInterval = () => dispatch => {
    socket.emit("price_interval", (res) => {dispatch(refresh(res))});
};
export default priceIntervalSlice.reducer;