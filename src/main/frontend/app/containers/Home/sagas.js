/**
 * Created by Kyle on 6/4/2017.
 */
import {
  call,
  put,
  takeLatest,
  cancel,
  select,
  take
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';

import request from 'utils/request';
import {
  FETCH_ITEMS,
  HOST,
  API_PLACE_ORDER,
  API_QUERY,
  PLACE_ORDER,
} from './constants';
import {
  fetchItemsSuccess,
  fetchItemsError,
  placeOrderError,
} from './actions';
import { makeSelectOrder } from './selectors';


export function* fetchItems() {
  const requestURL = HOST + API_QUERY;

  try {
    const items = yield call(request, requestURL);
    console.log(items);
    yield put(fetchItemsSuccess(items));
  } catch (err) {
    yield put(fetchItemsError(err));
  }
}

export function* itemsData() {
  const watcher = yield takeLatest(FETCH_ITEMS, fetchItems);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* placeOrder() {
  const requestURL = HOST + API_PLACE_ORDER;
  const order = yield select(makeSelectOrder());
  console.log('sagas', order);
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order),
  };

  try {
    const response = yield call(request, requestURL, options);
    console.log(response);
    yield put(fetchItemsSuccess(response));
    browserHistory.push('/summary');
  } catch (err) {
    console.log(err.message);
    yield put(placeOrderError(err.message));
    yield fetchItems();
  }
}

export function* placeOrderData() {
  const watcher = yield takeLatest(PLACE_ORDER, placeOrder);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  itemsData,
  placeOrderData,
]