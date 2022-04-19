import React from 'react';
import { useSelector } from 'react-redux';
import Loader from './util/loader';
import CurrencyTable from "./util/currencyTable";

function Currency() {
    const currency = useSelector((state) => state.rates.value);
    return (
        currency && currency.length > 0 ?
            <CurrencyTable colNames={["Code", "Rate (to BTC)", "Description"]} data={currency} />
            : <Loader />
    );  
}

export default Currency;