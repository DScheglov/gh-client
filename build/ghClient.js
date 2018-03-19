import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import reactDom from 'react-dom';
import { Provider } from 'react-redux';

import { configStore } from '../src/utils/config-store';
import App, { reducers, middlewares } from '../src';

const store = configStore(reducers, middlewares, {});

const mountPoint = document.createElement('div');
document.body.appendChild(mountPoint);

reactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  mountPoint
);
