/**
 * Created by Kyle on 6/4/2017.
 */
import {
  PLACE_ORDER,
  PLACE_ORDER_ERROR,
  PLACE_ORDER_SUCCESS,
  FETCH_ITEMS,
  FETCH_ITEMS_ERROR,
  FETCH_ITEMS_SUCCESS,
  UPDATE_ORDER,
  UPDATE_ORDER_ERROR,
  UPDATE_ORDER_SUCCESS,
} from './constants';

export function placeOrder() {
  return {
    type: PLACE_ORDER,
  }
}

export function placeOrderSuccess() {
  return {
    type: PLACE_ORDER_SUCCESS,
  }
}

export function placeOrderError(error) {
  return {
    type: PLACE_ORDER_ERROR,
    error
  }
}

export function fetchItems() {
  return {
    type: FETCH_ITEMS,
  }
}

export function fetchItemsSuccess(items) {
  console.log('action: ', items);
  return {
    type: FETCH_ITEMS_SUCCESS,
    items,
  }
}

export function fetchItemsError(error) {
  return {
    type: FETCH_ITEMS_ERROR,
    error
  }
}

export function updateOrder(order) {
  return {
    type:UPDATE_ORDER,
    order,
  }
}

export function updateOrderError(error) {
  return {
    type: UPDATE_ORDER_ERROR,
    error,
  }
}
