import { configureStore } from '@reduxjs/toolkit';
import converterReducer from './converterSlice';

export default configureStore({
    reducer: {
        converter: converterReducer
    }
});