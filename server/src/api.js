import axios from 'axios';

export function getBtcCurrent() {
    return axios.get("https://api.coingecko.com/api/v3/exchange_rates")
        .then(axiosRes => {
            let curArr = Object.entries(axiosRes.data.rates).filter(item => item[1].type === "fiat");
            return curArr.map(item => {
                return {code: item[0].toUpperCase(), rate: item[1].value, description: item[1].name};
            });
        }).catch(() => {
            console.error("Can't reach api");
            return [];
        });
}

export async function getPriceInterval() {
    let currencies = ["bitcoin", "ethereum", "litecoin", "solana"];
    let response = {};
    let promises = currencies.map(cur => {
        return axios.get(`https://api.coingecko.com/api/v3/coins/${cur}/market_chart?vs_currency=usd&days=30`)
            .then((axiosRes) => response[cur] = axiosRes.data.prices);
    });
    await Promise.all(promises).catch(e => console.error(`Can't reach api, error code ${e.code}`));
    return response;
}