import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import counter from './counter_slice';

export const store = configureStore({
	reducer: {
		counter,
	},
}) as Store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

