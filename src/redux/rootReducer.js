import storage from 'redux-persist/lib/storage';
import parkingsReducer from './slice/parking';

const { combineReducers } = require('@reduxjs/toolkit');

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['parkings'],
};

const rootReducer = combineReducers({
  parkings: parkingsReducer,
});

export { rootPersistConfig, rootReducer };
