import { createSlice } from '@reduxjs/toolkit'

interface UserState {
	username: string,
	first_name: string,
	last_name: string,
	email: string,
	is_staff: boolean
}

const initialState: UserState = {
	username: '',
	first_name: '',
	last_name: '',
	email: '',
	is_staff: false
}

export const userSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		loadProfile: (state, action) => {
			const auth = action.payload
			state.username = auth.username
			state.first_name = auth.first_name
			state.last_name = auth.last_name
			state.email = auth.email
			state.is_staff = auth.is_staff
		},
		dumpProfile: (state) => {
			state.username = ''
			state.first_name = ''
			state.last_name = ''
			state.email = ''
			state.is_staff = false
		}
	},
});

export const { loadProfile, dumpProfile } = userSlice.actions;

export default userSlice.reducer;