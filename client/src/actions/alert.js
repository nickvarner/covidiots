import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (msg, alertType) => (dispatch) => {
	const id = uuidv4();
	dispatch({
		type    : SET_ALERT,
		payload : { msg, alertType, id }
	});
	// remove the alert after a certain amount of time (10s)
	setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 10000);
};
