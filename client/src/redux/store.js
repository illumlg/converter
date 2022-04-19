import { configureStore } from '@reduxjs/toolkit';
import rateReducer from './rate_slice';
import priceIntervalReducer from './price_interval_slice';

export default configureStore({
    reducer: {
        rates: rateReducer,
        priceInterval: priceIntervalReducer
    }
});