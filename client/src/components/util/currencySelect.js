import React from "react";

function CurrencySelect(props) {
    return (
        <select defaultValue=""
                required
                className="browser-default"
                onChange={(event) =>
                    props.setForm({...props.form, [props.name]: event.target.value})}>
            <option value="" disabled hidden>{props.desc}</option>
            {
                props.rates.length ?
                    props.rates.map((item, i) => {
                        return (
                            <option key={i} value={item.code}>{item.code}</option>
                        );
                    })
                    : <option disabled value="">loading...</option>
            }
        </select>
    );
}

export default CurrencySelect;