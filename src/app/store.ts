import { combineReducers, configureStore } from '@reduxjs/toolkit';

import createCounter from '../features/counter/counterSlice';

const rootReducer = combineReducers({
  counterRoman: createCounter('counterRoman'),
  counterElizabeth: createCounter('counterElizabeth'),
  counterArseniy: createCounter('counterArseniy'),
  counterDmitriy: createCounter('counterDmitriy'),
  counterOksana: createCounter('counterOksana'),
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
