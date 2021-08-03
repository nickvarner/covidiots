import { GET_SUBMISSIONS, SUBMISSION_ERROR } from '../actions/types';

const initialState = {
	submissions : [],
	submission  : null,
	loading     : true,
	error       : {}
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_SUBMISSIONS:
			return {
				...state,
				submissions : payload,
				loading     : false
			};
		case SUBMISSION_ERROR:
			return {
				...state,
				error   : payload,
				loading : false
			};
		default:
			return state;
	}
}
