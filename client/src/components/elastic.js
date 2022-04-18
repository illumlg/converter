import React, {useState} from "react";
import socket from "../socket";
import {useSelector} from "react-redux";
import CurrencySelect from "./currencySelect";
import CurrencyTable from "./currencyTable";

function Elastic() {
    const [elasticData, setElasticData] = useState([]);
    const [form, setForm] = useState({code: ""});
    const rates = useSelector((state) => state.rates.value);
    return (
      <div className="converter_box">
          <label className="title">Elastic Search</label>
          <div className="elastic">
              <div className="read">
                  {elasticData && elasticData.length > 0
                      && <div><CurrencyTable colNames={["Code", "Price", "Date"]} data={elasticData} /></div>
                  }
                  <button onClick={() => socket.emit("getDoc", "USD", res => {setElasticData(res)})}>Get</button>
              </div>
              <div className="form_container">
                  <form onSubmit={(event) => {
                      event.preventDefault();
                      socket.emit("postDoc",
                          rates
                              .filter(item => item.code === form.code)
                              .map(item => {
                                  return {
                                      code: item.code,
                                      price: item.rate,
                                      date: new Date().toLocaleString("uk-UA")
                                  }
                              })
                      )
                  }}>
                      <CurrencySelect name="code" form={form} setForm={setForm} rates={rates} desc="Select currency" />
                      <input type="submit" value="post" />
                  </form>
              </div>
          </div>
      </div>
    );
}

export default Elastic;