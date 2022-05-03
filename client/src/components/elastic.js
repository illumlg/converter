import React, {useState} from "react";
import socket from "../socket";
import {useDispatch, useSelector} from "react-redux";
import CurrencySelect from "./util/currencySelect";
import CurrencyTable from "./util/currencyTable";
import {Store} from "react-notifications-component";
import {Error, Success, Warning} from "./util/notification"
import Loader from "./util/loader";
import {refreshElastic} from "../redux/converterSlice";

function Elastic() {
    const dispatch = useDispatch();
    const elasticData = useSelector((state) => state.converter.elastic);
    const [hidden, setHidden] = useState(true);
    const [form, setForm] = useState({code: ""});
    const rates = useSelector((state) => state.converter.rates);
    return (
      <div className="elastic_parent">
          <div className="title">Elastic Search</div>
          <div className="elastic">
              <div className="read">
                  <div className="title">Get</div>
                  {elasticData && elasticData.length > 0
                      ? <div className="tableCont">
                          <CurrencyTable colNames={["Code", "Rate (to BTC)", "Date"]} data={elasticData} />
                        </div>
                      : <Loader hidden={hidden} />
                  }
                  <button onClick={() => {
                      if(socket.disconnected) {
                          Store.addNotification(Warning("No connection with server"));
                          return;
                      }
                      setHidden(false);
                      socket.emit("getDoc", res => {
                          setHidden(true);
                          res && res.length > 0
                              ? dispatch(refreshElastic(res))
                              : Store.addNotification(Warning("Elasticsearch is unavailable"));
                      })
                  }}>Get</button>
              </div>
              <div className="form_container">
                  <div className="title">Post</div>
                  <form id="form" onSubmit={(event) => {
                      event.preventDefault();
                      if(socket.disconnected) {
                          Store.addNotification(Warning("No connection with server"));
                          return;
                      }
                      let cur = rates.find(item => item.code === form.code);
                      if(!cur) {
                          Store.addNotification(Error("Incorrect input"));
                          return;
                      }
                      cur = {code: cur.code, rate: cur.rate, date: new Date().toLocaleString("uk-UA")};
                      socket.emit("postDoc", cur, (res) => {
                          Store.addNotification(res.success
                                  ? Success("Saved to elastic")
                                  : Warning("Elasticsearch is unavailable")
                          );
                      });
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