import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider  } from 'react-redux';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import App from 'containers/App';
import configureStore from './store';
import createRoutes from './routes';
import { makeSelectLocationState } from 'containers/Home/selectors';

const initialState = {};
const store = configureStore(initialState, browserHistory);

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: makeSelectLocationState(),
});

const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
};

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} routes={rootRoute} />
    </Provider>,
    document.getElementById('app')
  )
};

render();