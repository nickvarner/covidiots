import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOG_OUT,
	ACCOUNT_DELETED
} from '../actions/types';

const initialState = {
	// jwt webtoken, stored in localstorage
	token           : localStorage.getItem('token'),
	isAuthenticated : null,
	loading         : true,
	user            : null
};

function auth (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated : true,
				loading         : false,
				user            : payload
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			// if its a success when they login, we get that jwt token back
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated : true,
				loading         : false
			};
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOG_OUT:
		case ACCOUNT_DELETED:
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

export default auth;
