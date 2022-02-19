/* eslint-disable */
import { Store, createStore, applyMiddleware } from 'redux';
import { Middleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { RootState, rootReducer } from 'app/store/reducers';

/** Logger */
export const logger: Middleware = (store) => (next) => (action) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(action);
  }
  return next(action);
};

export function configureStore(initialState?: RootState): Store<RootState> {
  let middleware = applyMiddleware(thunk, logger);

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer as any, initialState as any, middleware) as Store<RootState>;

  if (module.hot) {
    module.hot.accept('app/reducers', () => {
      const nextReducer = require('app/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
