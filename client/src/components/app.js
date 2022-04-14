import React, {useEffect, useState} from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Converter from "./converter";
import Currency from "./currency";
import { useDispatch } from 'react-redux';
import { refreshRates } from '../redux/rate_slice';
import M from 'materialize-css/dist/js/materialize.min';
import Graph from './graph';
import { refreshPriceInterval } from '../redux/price_interval_slice';

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
            </ul>
            <nav className="nav-wrapper navig">
                <a href="." className="brand-logo">Currency</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li className={selected === "rate" ? "active" : undefined}
                        onClick={() => setSelected("rate")}><Link to="/rate">Rate</Link></li>
                    <li className={selected === "converter" ? "active" : undefined}
                        onClick={() => setSelected("converter")}><Link to="/converter">Converter</Link></li>
                    <li className={selected === "graph" ? "active" : undefined}
                        onClick={() => setSelected("graph")}><Link to="/graph">Graph</Link></li>
                </ul>
                <a href="/#" data-target="slide-out" className="sidenav-trigger"><i
                    className="material-icons">menu</i></a>
            </nav>
            <Routes>
                <Route path="/rate" element={<Currency />} />
                <Route path="/converter" element={<Converter />} />
                <Route path="/graph" element={<Graph />} />
                <Route path="*" element={<Navigate to="/rate" />} />
            </Routes>
            <footer>Currency converter 2022</footer>
        </div>
    );
}

export default App;