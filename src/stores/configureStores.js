import { createStore, compose, applyMiddleware } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import { default as reduxThunk } from 'redux-thunk';

import rootReducer from './rootReducer';
import api from '../api/apiInterceptor';
import config from '../config';

const persistConfig = {
  key: config.STORAGE_KEY,
  storage,
  stateReconciler: autoMergeLevel1
};

// creating persistence storage. Localstorage will be used by redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux thunk is allowing custom api method in every action creators
const middlewares = [
  reduxThunk.withExtraArgument({ api }),
  reduxPackMiddleware
];

// adding redux thunk middleware
const storeEnhancers = [
  applyMiddleware(...middlewares)
];

export default (initialState) => (onComplete) => {
  const store = createStore(
    persistedReducer,
    initialState,
    compose(...storeEnhancers)
  );

  // calling the provided callback function once the store is ready
  const storePersisted = persistStore(store, null, onComplete);
  return { storePersisted, store };
};
