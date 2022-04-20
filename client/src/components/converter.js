import React, { useState } from "react";
import { useSelector } from "react-redux";
import socket from '../socket';
import CurrencySelect from "./util/currencySelect";

function Converter() {
    const rates = useSelector((state) => state.rates.value);
    const convert = (req) => {
        let curFrom = rates.find((item) => item.code === req.firstCode);
            let curTo = rates.find((item) => item.code === req.secondCode);
            if(!curFrom || !curTo) {
                return {status: "nok"};
            }
            let diff = curTo.rate/curFrom.rate;
            console.log(req.value*diff);
            return {status: "ok", fiat: req.value*diff, btc: req.value*(1/curFrom.rate)};
    }
    const [form, setForm] = useState({value: 0, firstCode: "", secondCode: ""});
    const [result, setResult] = useState({fiat: 0, btc:0});
    return (
        <div className="converter_box">
            <div className="title">Converter</div>
            <form onSubmit={(event) => {
                    event.preventDefault();
                    let res = convert({...form});
                    if(res.status==="nok") {
                        alert("incorrect input");
                        return;
                    }
                    setResult({...result, ...res});
                    socket.emit("save_conversion", {
                        input_value: form.value,
                        input_currency: form.firstCode,
                        result_value: res.fiat,
                        result_currency: form.secondCode,
                        bitcoin_rate: res.btc,
                        date: new Date().toLocaleString("uk-UA")
                    });
                }
            }>
                <div>
                    <label htmlFor="value">Value</label>
                    <input id="value"
                           name="value"
                           type="number"
                           required
                           defaultValue="0"
                           step="0.01"
                           min="0"
                           max="1000000"
                           onChange={(event) =>
                               setForm({...form, [event.target.name]: event.target.value})} />
                </div>
                <CurrencySelect name="firstCode"
                                form={form}
                                setForm={setForm}
                                rates={rates}
                                desc="Select currency 1" />
                <CurrencySelect name="secondCode"
                                form={form}
                                setForm={setForm}
                                rates={rates}
                                desc="Select currency 2"/>
                <input type="submit" value="convert" />
            </form>
            <div className="hl" />
            <div className="result">
                <div>Result: </div>
                <div><span>{result.fiat.toFixed(2)}</span><span>{form.secondCode}</span></div>
                <div><span>{result.btc.toFixed(8)}</span><span>BTC</span></div>
            </div>
        </div>
    )
}

export default Converter;