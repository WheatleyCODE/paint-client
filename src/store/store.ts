import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type TypedStore = ReturnType<typeof setupStore>;
export type TypedDispatch = TypedStore['dispatch'];
