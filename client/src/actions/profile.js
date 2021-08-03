import axios from 'axios';
import { setAlert } from './alert';

import { GET_PROFILE, GET_PROFILES, PROFILE_ERROR, CLEAR_PROFILE, ACCOUNT_DELETED } from './types';

// Get current users profile
// must use async dispatch when were dispatching stuff from the types, which is dispatched to find cases in their respective reducers
export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/profile/me');

		dispatch({
			type    : GET_PROFILE,
			payload : res.data
		});
	} catch (err) {
		dispatch({ type: CLEAR_PROFILE });
		dispatch({
			type    : PROFILE_ERROR,
			payload : { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Get all users profile
export const getProfiles = () => async (dispatch) => {
	dispatch({
		type : CLEAR_PROFILE
	});
	try {
		const res = await axios.get('/api/profile');
		dispatch({
			type    : GET_PROFILES,
			payload : res.data
		});
		console.log(res.data);
	} catch (err) {
		dispatch({
			type    : PROFILE_ERROR,
			payload : { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Get a users profile
// must use async dispatch when were dispatching stuff from the types, which is dispatched to find cases in their respective reducers
export const getProfileById = (userId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profile/user/${userId}`);
		dispatch({
			type    : GET_PROFILE,
			payload : res.data
		});
	} catch (err) {
		dispatch({
			type    : PROFILE_ERROR,
			payload : { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// create or update a profile
export const createProfile = (formData, history, edit = false) => async (dispatch) => {
	try {
		const config = {
			headers : {
				'Content-Type' : 'application/json'
			}
		};

		const res = await axios.post('/api/profile', formData, config);

		dispatch({
			type    : GET_PROFILE,
			payload : res.data
		});

		dispatch(
			setAlert(

					edit ? 'profile updated' :
					'profile created',
				'success'
			)
		);
		if (!edit) {
			history.push('/dashboard');
		}
	} catch (err) {
		console.log(err);
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type    : PROFILE_ERROR,
			payload : { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// delete profile and account
export const deleteAccount = () => async (dispatch) => {
	if (window.confirm('are you sure? this action cannot be undone')) {
		try {
			await axios.delete('/api/profile');
			dispatch({ type: CLEAR_PROFILE });
			dispatch({ type: ACCOUNT_DELETED });
			dispatch(setAlert('your account has been permanently deleted', 'info'));
		} catch (err) {
			dispatch({
				TYPE    : PROFILE_ERROR,
				payload : { msg: err.response.statusText, status: err.response.status }
			});
		}
	}
};

// delete experience
// export const deleteExperience = id => async dispatch => {
// 	try {
// 		const res = await axios.delete(`/api/profile/experience/${id}`)

// 		dispatch({
// 			type: UPDATE_PROFILE,
// 			payload: res.data
// 		})
// dispatch(setAlert('education removed', 'success'))
// 	} catch (err) {
// 		dispatch({
// 			type: PROFILE_ERROR,
// 			payload: {msg: err.response.statusText, status: err.response.status}
// 		})
// 	}
// }
