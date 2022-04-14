import React, { useState } from "react";
import { useSelector } from "react-redux";
import socket from '../socket';

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
            <form className="converter_form" onSubmit={(event) => {
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
                        date: new Date().toLocaleString()
                    });
                }
            }>
                <label className="title">Converter</label>
                <div>
                    <label htmlFor="value">Value</label>
                    <input id="value"
                           name="value"
                           className="form_field"
                           type="number"
                           required
                           defaultValue="0"
                           step="0.01"
                           min="0"
                           max="1000000"
                           onChange={(event) =>
                               setForm({...form, [event.target.name]: event.target.value})} />
                </div>
                <div>
                    <select name="firstCode"
                            defaultValue=""
                            required
                            className="browser-default"
                            onChange={(event) =>
                                setForm({...form, [event.target.name]: event.target.value})}>
                        <option value="" disabled hidden>Select currency 1</option>
                        {
                            rates.length ?
                                rates.map((item, i) => {
                                    return (
                                        <option key={i} value={item.code}>{item.code}</option>
                                    );
                                })
                                : <option disabled value="">loading...</option>
                        }
                    </select>
                </div>
                <div>
                    <select name="secondCode"
                            defaultValue=""
                            required
                            className="browser-default"
                            onChange={(event) =>
                                setForm({...form, [event.target.name]: event.target.value})}>
                        <option value="" disabled hidden>Select currency 2</option>
                        {
                            rates.length ?
                                rates.map((item, i) => {
                                    return (
                                        <option key={i} value={item.code}>{item.code}</option>
                                    );
                                })
                                : <option disabled value="">loading...</option>

                        }
                    </select>
                </div>
                <input type="submit" value="convert" />
                <div>
                    <label>Result: </label>
                    <div>{result.fiat.toFixed(2)} {form.secondCode}</div>
                    <div>{result.btc.toFixed(8)} BTC</div>
                </div>
            </form>
        </div>
    )
}

export default Converter;