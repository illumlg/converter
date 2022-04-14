import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'materialize-css/dist/css/materialize.min.css';
import App from './components/app'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);