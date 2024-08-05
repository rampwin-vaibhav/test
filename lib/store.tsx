import { configureStore } from '@reduxjs/toolkit';
import globalReducer from '../lib/global.slice';
import warrantReducer from '../lib/vas/warranty-flow/warranty.slice';
import selfListingReducer from '../lib/self-listing/selfListing.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      warranty: warrantReducer,
      selfListing: selfListingReducer,
      global: globalReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
