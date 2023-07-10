import React from 'react';
import './index.css';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


