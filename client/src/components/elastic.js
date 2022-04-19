import React, {useState} from "react";
import socket from "../socket";
import {useSelector} from "react-redux";
import CurrencySelect from "./util/currencySelect";
import CurrencyTable from "./util/currencyTable";

function Elastic() {
    const [elasticData, setElasticData] = useState([]);
    const [form, setForm] = useState({code: ""});
    const rates = useSelector((state) => state.rates.value);
    return (
      <div className="elastic_parent">
          <label className="title">Elastic Search</label>
          <div className="elastic">
              <div className="read">
                  <label className="title">Get</label>
                  {elasticData && elasticData.length > 0
                      && <div><CurrencyTable colNames={["Code", "Price", "Date"]} data={elasticData} /></div>
                  }
                  <button onClick={() => socket.emit("getDoc", res => {setElasticData(res)})}>Get</button>
              </div>
              <div className="form_container">
                  <label className="title">Post</label>
                  <form id="form" onSubmit={(event) => {
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
                  </form>
                  <input form="form" type="submit" value="post" />
              </div>
          </div>
      </div>
    );
}

export default Elastic;