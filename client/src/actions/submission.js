import axios from 'axios';

import { GET_SUBMISSIONS, SUBMISSION_ERROR } from './types';

// get submissions
export const getSubmissions = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/submissions');
		dispatch({
			type    : GET_SUBMISSIONS,
			payload : res.data
		});
	} catch (err) {
		dispatch({
			type    : SUBMISSION_ERROR,
			payload : { msg: err.response.statusText, status: err.response.status }
		});
	}
};
