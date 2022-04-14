import {getBtcCurrent} from "./api.js";

test('api is alive', async () => {
    let res = await getBtcCurrent();
    expect(res).toBeDefined();
})
