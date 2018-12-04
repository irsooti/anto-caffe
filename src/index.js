import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App';
import { Provider } from 'react-redux';
import configStore from './store/configStore';
import { unregister } from './serviceWorker';
import 'reset-css';
import './global.css';
import { initializeApp } from 'firebase/app';
// import dotenv from 'dotenv';
// import dotenvExpand from 'dotenv-expand';
import { getDailyCheckout } from './api/orders';


const {
  REACT_APP_APIKEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_PROJECTID,
  REACT_APP_DATABASE_URL,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MSGING_SENDER
} = process.env;
console.log(process.env);

var config = {
  apiKey: REACT_APP_APIKEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  databaseURL: REACT_APP_DATABASE_URL,
  projectId: REACT_APP_PROJECTID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MSGING_SENDER
};

initializeApp(config);
console.log(getDailyCheckout());

// console.log(addDailyCheckout([{"id":"-LSoIts-SsLbg9b-Zji8","descr":"Caffe"}]))

ReactDOM.render(
  <Provider store={configStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);

unregister();
