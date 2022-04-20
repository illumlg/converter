import { createSlice } from '@reduxjs/toolkit';

export const elasticSlice = createSlice({
    name: "elastic",
    initialState: {
        value: []
    },
    reducers: {
        refresh: (state, action) => {
            state.value = action.payload;
        },
    }
});

export const { refresh } = elasticSlice.actions;

export default elasticSlice.reducer;