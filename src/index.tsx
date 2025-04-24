import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';
import './global.scss';
import reportWebVitals from './reportWebVitals';
import {Home} from "./pages";
import './fonts/Gilroy/Gilroy-Bold.ttf';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div>
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
          </Routes>
      </Router>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
