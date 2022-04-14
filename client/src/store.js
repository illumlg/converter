import { configureStore } from '@reduxjs/toolkit';
import rateReducer from './redux/rate_slice';
import priceIntervalReducer from './redux/price_interval_slice';

export default configureStore({
    reducer: {
        rates: rateReducer,
        priceInterval: priceIntervalReducer
    }
});