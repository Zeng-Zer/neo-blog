import React from 'react';
import ReactDOM from 'react-dom';
import { ContractsProvider, createClient } from './neo-one';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const client = createClient();

const app = (
    <ContractsProvider client={client}>
        <App />
    </ContractsProvider>
);

ReactDOM.render(
    app, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
