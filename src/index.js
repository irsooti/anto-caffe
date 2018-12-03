import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App';
import { Provider } from 'react-redux';
import configStore from './store/configStore';
import { unregister } from './serviceWorker';
import 'reset-css';
import './global.css';

import { initializeApp } from 'firebase/app';
import { getAllProducts, addProduct, addDailyCheckout } from './api/products';
var config = {
  apiKey: 'AIzaSyD_C59csA_uJ5Z2YERhSeV9zg49RkaPz0c',
  authDomain: 'anto-caffe.firebaseapp.com',
  databaseURL: 'https://anto-caffe.firebaseio.com',
  projectId: 'anto-caffe',
  storageBucket: 'anto-caffe.appspot.com',
  messagingSenderId: '217614003103'
};

initializeApp(config);

// console.log(addDailyCheckout([{"id":"-LSoIts-SsLbg9b-Zji8","descr":"Caffe"}]))

ReactDOM.render(
  <Provider store={configStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);

unregister();
