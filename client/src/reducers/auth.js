import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

const initialState = {
	// jwt webtoken, stored in localstorage
	token           : localStorage.getItem('token'),
	isAuthenticated : null,
	loading         : true,
	user            : null
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case REGISTER_SUCCESS:
			// if its a success when they login, we get that jwt token back
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated : true,
				loading         : false
			};
		case REGISTER_FAIL:
			// we want to remove the jwt token if it fails
			localStorage.removeItem('token');
			return {
				...state,
				token           : null,
				isAuthenticated : false,
				loading         : false
			};
		default:
			return state;
	}
}
