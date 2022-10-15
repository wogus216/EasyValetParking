import parkingReducer from './slice/parking';

const { combineReducers } = require('@reduxjs/toolkit');

const rootReducer = combineReducers({
  parking: parkingReducer,
});

export { rootReducer };
