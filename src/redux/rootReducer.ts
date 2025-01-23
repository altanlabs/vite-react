import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import tablesReducer from './slices/tables.ts';


// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};


const rootReducer = combineReducers({
  tables: tablesReducer,
});

export default rootReducer;
