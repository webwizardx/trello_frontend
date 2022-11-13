import { configureStore } from '@reduxjs/toolkit';
import { alert } from '../components/Alert';

export const store = configureStore({
	reducer: {
		alert,
	},
});

export const getStore = () =>
	configureStore({
		reducer: {
			alert,
		},
	});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

