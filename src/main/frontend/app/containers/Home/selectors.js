/**
 * Created by Kyle on 6/4/2017.
 */
import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectItems = () => createSelector(
  selectHome,
  (homeState) => {
    console.log('selector: ', homeState.get('items'));
    return homeState.get('items');
  },
);

const makeSelectOrder = () => createSelector(
  selectHome,
  (homeState) => homeState.get('order'),
);

const makeSelectLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.get('loading'),
);

const makeSelectError = () => createSelector(
  selectHome,
  (homeState) => homeState.get('error'),
);


const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route');

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectHome,
  makeSelectOrder,
  makeSelectItems,
  makeSelectLocationState,
  makeSelectError,
  makeSelectLoading,
};