import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

type AlertState = {
	isOpen: boolean;
	type: 'Success' | 'Error';
	message?: string;
	redirectOnOkTo?: string;
	redirectOnCancelTo?: string;
};

type SetAlert = Pick<
	AlertState,
	'message' | 'redirectOnOkTo' | 'redirectOnCancelTo'
>;

const initialState: AlertState = {
	isOpen: false,
	type: 'Success',
};

export const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		onOpen: state => {
			state.isOpen = true;
		},
		onClose: state => {
			state.isOpen = false;
			state.redirectOnOkTo = '';
			state.redirectOnCancelTo = '';
		},
		setSuccessAlert: (state, action: PayloadAction<SetAlert>) => {
			state.isOpen = true;
			state.type = 'Success';
			state.message = action.payload.message;
			state.redirectOnOkTo = action.payload.redirectOnOkTo;
			state.redirectOnCancelTo = action.payload.redirectOnCancelTo;
		},
		setErrorAlert: (state, action: PayloadAction<SetAlert>) => {
			state.isOpen = true;
			state.type = 'Error';
			state.message = action.payload.message;
			state.redirectOnOkTo = action.payload.redirectOnOkTo;
			state.redirectOnCancelTo = action.payload.redirectOnCancelTo;
		},
	},
});

export const { onOpen, onClose, setSuccessAlert, setErrorAlert } =
	alertSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAlert = (state: RootState) => state.alert;

export default alertSlice.reducer;

