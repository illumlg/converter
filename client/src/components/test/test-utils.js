import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import rateReducer from "../../redux/rate_slice";
import priceIntervalReducer from "../../redux/price_interval_slice";

function render(
    ui,
    {
        preloadedState,
        store = configureStore({
            reducer: {
                rates: rateReducer,
                priceInterval: priceIntervalReducer
            }
        , preloadedState}),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }