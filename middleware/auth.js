const jwt = require('jsonwebtoken');
const dbConfig = require('../config/db.config');

module.exports = async function (req, res, next) {
	// Get the token from the header
	const token = req.header('x-auth-token');
	const decoded = jwt.verify(token, dbConfig.jwtToken);
	const user = await User.findById(decoded.user.id);
	if (!user) {
		return res.status(401).json({ msg: 'Token is not valid' });
	}
	// check if no token
	if (!token) {
		return res.status(401).json({ msg: 'no token, authorization denied' });
	}

	// verify token
	try {
		const decoded = jwt.verify(token, dbConfig.jwtToken);
		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'token is not valid' });
	}
};
