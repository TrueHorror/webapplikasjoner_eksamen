import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import theStore from './utils/store'
import { createStore} from "redux";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {checkTokenInStorage} from "./utils/authentication";

export const store = createStore(theStore)

checkTokenInStorage()

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
