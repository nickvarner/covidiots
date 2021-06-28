import axios from 'axios';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOG_OUT,
	CLEAR_PROFILE
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// load user
export const loadUser = () => async (dispatch) => {
	// going to run this a bunch to make sure the user is authenticated and has proper permissions
	// we want to make sure we continue to send that auth token in the header
	// check local storage
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const res = await axios.get('/api/auth');
		dispatch({
			type    : USER_LOADED,
			payload : res.data
		});
	} catch (err) {
		dispatch({
			type : AUTH_ERROR
		});
	}
};

// register a user
export const register = ({ username, email, password }) => async (dispatch) => {
	const config = {
		headers : {
			'Content-Type' : 'application/json'
		}
	};

	const body = JSON.stringify({ username, email, password });

	try {
		const res = await axios.post('/api/users', body, config);
		dispatch({
			type    : REGISTER_SUCCESS,
			// the payload after a successful register is the token, which we'll send as the payload
			payload : res.data
		});
		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((e) => dispatch(setAlert(e.msg, 'danger')));
		}
		dispatch({
			type : REGISTER_FAIL
		});
	}
};

// login a user
export const login = (email, password) => async (dispatch) => {
	const config = {
		headers : {
			'Content-Type' : 'application/json'
		}
	};

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post('/api/auth', body, config);
		dispatch({
			type    : LOGIN_SUCCESS,
			// the payload after a successful register is the token, which we'll send as the payload
			payload : res.data
		});
		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((e) => dispatch(setAlert(e.msg, 'danger')));
		}
		dispatch({
			type : LOGIN_FAIL
		});
	}
};

// logout a user / clear profile
export const logout = () => (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: LOG_OUT });
};
