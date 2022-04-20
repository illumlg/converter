import React, {useState} from "react";
import socket from "../socket";
import {useDispatch, useSelector} from "react-redux";
import CurrencySelect from "./util/currencySelect";
import CurrencyTable from "./util/currencyTable";
import {Store} from "react-notifications-component";
import {Error, Success, Warning} from "./util/notification"
import Loader from "./util/loader";
import {refresh} from "../redux/elastic_slice";

function Elastic() {
    const dispatch = useDispatch();
    const elasticData = useSelector((state) => state.elastic.value);
    const [hidden, setHidden] = useState(true);
    const [form, setForm] = useState({code: ""});
    const rates = useSelector((state) => state.rates.value);
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
                              ? dispatch(refresh(res))
                              : Store.addNotification(Warning("Server returned empty response"));
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
                      let cur = rates.filter(item => item.code === form.code)
                          .map(item => {
                              return {
                                  code: item.code,
                                  rate: item.rate,
                                  date: new Date().toLocaleString("uk-UA")
                              }
                          });
                      if(!cur || cur.length < 1) {
                          Store.addNotification(Error("Incorrect input"));
                          return;
                      }
                      socket.emit("postDoc", cur);
                      Store.addNotification(Success("Saved to elastic"));
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