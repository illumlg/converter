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

/**
 * Retrieves up-to-date bitcoin to fiat rates
 * @returns {(function(*): void)|*}
 */
export const refreshRates = () => dispatch => {
    socket.emit("currency", (res) => {dispatch(_refreshRates(res))});
};

/**
 * Retrieves up-to-date bitcoin, ethereum, litecoin, solana prices in USD for last 30 days
 * @returns {(function(*): void)|*}
 */
export const refreshPriceInterval = () => dispatch => {
    socket.emit("price_interval", (res) => {dispatch(_refreshPriceInterval(res))});
};

export {refreshElastic};
export default converterSlice.reducer;