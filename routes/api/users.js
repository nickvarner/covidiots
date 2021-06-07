const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const dbConfig = require('../../config/db.config');

// @route    post api/users
// @desc     register user
// @access   Public

// get the user model
const User = require('../../models/User');

router.post(
	'/',
	[
		body('username', 'username is required').not().isEmpty(),
		body('email', 'please include a valid email').isEmail(),
		body('password', 'enter a password with 6 or more characters').isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { username, email, password } = req.body;
		try {
			let user = await User.findOne({ username });
			let userEmail = await User.findOne({ email });

			// see if the user exists
			if (user) {
				// if the user exists, send an error
				res.status(400).json({ errors: [ { msg: 'user already exists ' } ] });
			}
			// see if the email exists
			if (userEmail) {
				// if the email exists, send an error
				res.status(400).json({ errors: [ { msg: 'email already exists ' } ] });
			}
			// get users gravatar
			const avatar = gravatar.url(email, {
				s : '200',
				r : 'pg',
				d : 'mm'
			});
			user = new User({
				username,
				email,
				avatar,
				password
			});
			// encrypt password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			// below will return a promise
			await user.save();
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
