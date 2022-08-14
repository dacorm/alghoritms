import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AlgoContext from "./utils/AlgoContext";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <AlgoContext>
            <App/>
        </AlgoContext>
    </React.StrictMode>
);
