const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { body, validationResult } = require('express-validator');
const dbConfig = require('../../config/db.config');

// @route    GET api/auth
// @desc     Test route
// @access   Public

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

// @route    POST api/auth
// @desc     authenticate user and get token
// @access   Public

router.post(
	'/',
	[ body('email', 'please include a valid email').isEmail(), body('password', 'password is required').exists() ],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			// see if the user exists
			if (!user) {
				// if the user exists, send an error
				res.status(400).json({ errors: [ { msg: 'invalid credentials' } ] });
			}
			// need to match email & password
			// you can compare using bcryptjs
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				res.status(400).json({ errors: [ { msg: 'invalid credentials' } ] });
			}
			// return jsonwebtoken
			// create a payload with object of user, and an id of user.id (from mongoose created the user)
			// mongo usually has an underscore before id, but mongoose uses an abstraction to get rid of it
			const payload = {
				user : {
					id : user.id
				}
			};
			jwt.sign(payload, dbConfig.jwtToken, { expiresIn: '5 days' }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
