/**
 * Created by Kyle on 6/4/2017.
 */
import { getAsyncInjectors } from 'asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err);
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Home/reducer'),
          import('containers/Home/sagas'),
          import('containers/Home'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('home', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/summary',
      name: 'summary',
      getComponent(nextState, cb) {
        import('containers/Summary')
          .then(loadModule(cb))
          .catch(errorLoading);
      }
    }
  ];
}