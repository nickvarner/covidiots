// reducer boilerplate
// bring combine reducers

import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
// import submission from './submission';

export default combineReducers({
	alert,
	auth,
	profile
	// submission
});
