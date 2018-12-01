import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App';
import { Provider } from 'react-redux';
import configStore from './store/configStore';
import { unregister } from './serviceWorker';
import 'reset-css';
import './global.css';

ReactDOM.render(
  <Provider store={configStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);

unregister();
