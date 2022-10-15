import storage from 'redux-persist/lib/storage';
import parkingReducer from './slice/parking';

const { combineReducers } = require('@reduxjs/toolkit');

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['vmostart'],
};

const rootReducer = combineReducers({
  parking: parkingReducer,
});

export { rootPersistConfig, rootReducer };
