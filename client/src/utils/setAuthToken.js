import axios from 'axios';

// function that takes in a token, if its there add it to header otherwise delete it from header
// setting a global header

const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common['x-auth-token'] = token;
	} else {
		delete axios.defaults.headers.common['x-auth-token'];
	}
};

export default setAuthToken;
