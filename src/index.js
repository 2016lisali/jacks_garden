import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { store } from './redux/store.js';
import { Provider } from 'react-redux';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration.js';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// serviceWorkerRegistration.register();

