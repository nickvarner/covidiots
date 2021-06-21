// an alert reducer that takes in state
// and dispatches an action

import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [ {} ];

// takes in the initial state and an action
export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case SET_ALERT:
			return [ ...state, payload ];
		case REMOVE_ALERT:
			// remove an alert by id
			return state.filter((alert) => alert.id !== payload);
		default:
			return state;
	}
}
