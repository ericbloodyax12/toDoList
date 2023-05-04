import React from 'react';
import './index.css';


import { createRoot } from 'react-dom/client';
import {AppWithReducers} from "./AppWithReducers";

const container  = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(<AppWithReducers />);




