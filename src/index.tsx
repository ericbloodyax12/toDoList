import React, {StrictMode} from 'react';
import './index.css';


import { createRoot } from 'react-dom/client';

import {Provider} from "react-redux";
import {store} from "./state/store";
import {App} from "./app/App";
import {BrowserRouter} from "react-router-dom";

const container  = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
);




