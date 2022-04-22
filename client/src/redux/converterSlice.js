import { createSlice } from '@reduxjs/toolkit';
import socket from '../socket';

export const converterSlice = createSlice({
    name: "converter",
    initialState: {
        rates: [],
        priceInterval: [],
        elastic: []
    },
    reducers: {
        _refreshRates: (state, action) => {
            state.rates = action.payload;
        },
        _refreshPriceInterval: (state, action) => {
            state.priceInterval = action.payload;
        },
        refreshElastic: (state, action) => {
            state.elastic = action.payload;
        }
    }
});

const { _refreshRates, _refreshPriceInterval, refreshElastic } = converterSlice.actions;

export const refreshRates = () => dispatch => {
    socket.emit("currency", (res) => {dispatch(_refreshRates(res))});
};

export const refreshPriceInterval = () => dispatch => {
    socket.emit("price_interval", (res) => {dispatch(_refreshPriceInterval(res))});
};

export {refreshElastic};
export default converterSlice.reducer;