import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Data } from './reducer.js';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      data: Data
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};