/**
 * Created by Kyle on 6/4/2017.
 */
import conformsTo from 'lodash/conformsTo';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import invariant from 'invariant';
import warning from 'warning';

import createReducer from 'reducers';

export function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    asyncReducers: isObject,
  };
  invariant(
    conformsTo(store, shape),
    'asyncInjectors: Expected a valid redux store'
  );
}

export function injectAsyncReducer(store, isValid) {
  return function injectReducer(name, asyncReducer) {
    console.log('****************injectAsyncReducer');
    if (!isValid) checkStore(store);

    console.log('**********injectAsyncReducer1');
    invariant(
      isString(name) && !isEmpty(name) && isFunction(asyncReducer),
      'injectAsyncReducer: Expected `asyncReducer` to be a reducer function'
    );

    if (Reflect.has(store.asyncReducers, name)) return;

    console.log('**************asy reducer:', store.asyncReducers);

    console.log('**************name:', name, asyncReducer);

    store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

export function injectAsyncSagas(store, isValid) {
  return function injectSagas(sagas) {
    if (!isValid) checkStore(store);

    invariant(
      Array.isArray(sagas),
      'injectAsyncSagas: Expected `sagas` to be an array of generator functions'
    );

    warning(
      !isEmpty(sagas),
      'injectAsyncSagas: Received an empty `sagas` array'
    );

    sagas.map(store.runSaga);
  };
}

export function getAsyncInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectAsyncReducer(store, true),
    injectSagas: injectAsyncSagas(store, true),
  };
}