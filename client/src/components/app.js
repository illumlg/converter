import React, {useEffect, useState} from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Converter from "./converter";
import Currency from "./currency";
import Graph from './graph';
import Elastic from './elastic'
import { useDispatch } from 'react-redux';
import { refreshRates } from '../redux/rate_slice';
import { refreshPriceInterval } from '../redux/price_interval_slice';
import M from 'materialize-css/dist/js/materialize.min';

function App() {
    const dispatch = useDispatch();
    const location = useLocation().pathname.substring(1);
    const [selected, setSelected] = useState(location.length > 0 ? location : "rate");
    useEffect(() => {
        dispatch(refreshRates());
        dispatch(refreshPriceInterval())
        setInterval(() => {
            console.log("refreshing");
            dispatch(refreshRates());
            dispatch(refreshPriceInterval())
        }, 60000);
        let el = document.querySelector(".sidenav");
        M.Sidenav.init(el, {});
    }, [dispatch]);

    return (
        <div className="app">
            <ul id="slide-out" className="sidenav">
                <li className={`sidenav-close${selected === "rate" ? " active" : ""}`}
                    onClick={() => setSelected("rate")}><Link to="/rate">Rate</Link></li>
                <li className={`sidenav-close${selected === "converter" ? " active" : ""}`}
                    onClick={() => setSelected("converter")}><Link to="/converter">Converter</Link></li>
                <li className={`sidenav-close${selected === "graph" ? " active" : ""}`}
                    onClick={() => setSelected("graph")}><Link to="/graph">Graph</Link></li>
                <li className={`sidenav-close${selected === "elastic" ? " active" : ""}`}
                    onClick={() => setSelected("elastic")}><Link to="/elastic">Elastic</Link></li>
            </ul>
            <nav className="nav-wrapper">
                <a href="." className="brand-logo">Currency</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li className={selected === "rate" ? "active" : undefined}
                        onClick={() => setSelected("rate")}><Link to="/rate">Rate</Link></li>
                    <li className={selected === "converter" ? "active" : undefined}
                        onClick={() => setSelected("converter")}><Link to="/converter">Converter</Link></li>
                    <li className={selected === "graph" ? "active" : undefined}
                        onClick={() => setSelected("graph")}><Link to="/graph">Graph</Link></li>
                    <li className={selected === "elastic" ? "active" : undefined}
                        onClick={() => setSelected("elastic")}><Link to="/elastic">Elastic</Link></li>
                </ul>
                <a href="/#" data-target="slide-out" className="sidenav-trigger"><i
                    className="material-icons">menu</i></a>
            </nav>
            <div className="content">
                <Routes>
                    <Route path="/rate" element={<Currency />} />
                    <Route path="/converter" element={<Converter />} />
                    <Route path="/graph" element={<Graph />} />
                    <Route path="/elastic" element={<Elastic />} />
                    <Route path="*" element={<Navigate to="/rate" />} />
                </Routes>
            </div>
            <footer>Currency converter 2022</footer>
        </div>
    );
}

export default App;