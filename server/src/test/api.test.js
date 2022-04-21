import axios from "axios";
import {getBtcCurrent, getPriceInterval} from "../api.js";

describe("api tests", () => {
    test('api is alive', async () => {
        let res = await axios.get("https://api.coingecko.com/api/v3/ping");
        expect(res.status).toBe(200);
    });

    test('correct fetching of current btc rates', async () => {
        let res = await getBtcCurrent();
        expect(res.length).not.toBe(0);
        expect(res[0].code).toBe("USD");
    });

    test('correct fetching of crypto price in month time interval', async () => {
        let res = await getPriceInterval();
        expect(res).not.toEqual({});
        expect(Object.keys(res)).toContain("bitcoin");
        expect(Object.keys(res)).toContain("ethereum");
        expect(Object.keys(res)).toContain("litecoin");
        expect(Object.keys(res)).toContain("solana");
        Object.keys(res).forEach(item => expect(item.length).not.toBe(0));
    });
});
