/**
 * Created by Kyle on 6/4/2017.
 */

import { fromJS } from 'immutable';
import {
  FETCH_ITEMS,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_ERROR,
  UPDATE_ORDER,
  PLACE_ORDER,
  PLACE_ORDER_ERROR,
} from './constants';

const initialState = fromJS({
  items: false,
  order: false,
  loading: false,
  error: false,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return state
        .set('loading', true)
        .set('error', false);
    case FETCH_ITEMS_SUCCESS:
      return state
        .set('loading', false)
        .set('items', action.items);
    case FETCH_ITEMS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case UPDATE_ORDER:
      return state
        .set('order', action.order);
    case PLACE_ORDER:
      return state
        .set('loading', true);
    case PLACE_ORDER_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default homeReducer;