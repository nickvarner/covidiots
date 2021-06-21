import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import { setAlert } from './alert';

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
