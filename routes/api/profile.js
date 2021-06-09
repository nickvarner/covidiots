const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const axios = require('axios');
const config = require('../../config/db.config');

// @route    GET api/profile/me
// @desc     get current users profile
// @access   Private

router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate('user', [ 'username', 'avatar' ]);
		if (!profile) {
			return res.status(400).json({ msg: 'there is no profile for this user' });
		}
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

// @route    POST api/profile
// @desc     create or update a user profile
// @access   Private

router.post('/', auth, async (req, res) => {
	const { age, gender, politicalParty, bio, personalityTags, youtube, twitter, facebook, instagram } = req.body;
	// build profile object
	const profileFields = {};
	profileFields.user = req.user.id;
	if (age) profileFields.age = age;
	if (gender) profileFields.gender = gender;
	if (politicalParty) profileFields.politicalParty = politicalParty;
	if (bio) profileFields.bio = bio;
	if (personalityTags) {
		profileFields.personalityTags = personalityTags.split(',').map((skill) => skill.trim());
	}
	// build social(s) object
	profileFields.social = {};
	if (youtube) profileFields.social.youtube = youtube;
	if (twitter) profileFields.social.twitter = twitter;
	if (facebook) profileFields.social.facebook = facebook;
	if (instagram) profileFields.social.instagram = instagram;

	try {
		let profile = await Profile.findByIdAndUpdate(
			profileFields.user,
			{ $set: profileFields },
			{ new: true, upsert: true }
		);
		res.json(profile);
	} catch (err) {
		res.status(500).send('server error');
	}
});

// @route    GET api/profile
// @desc     get all profiles
// @access   Public

router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', [ 'username', 'avatar' ]);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

// @route    GET api/user/:user_id
// @desc     get profile by userid
// @access   Public

router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', [ 'username', 'avatar' ]);
		if (!profile) return res.status(400).json({ msg: 'profile not found' });
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') return res.status(400).json({ msg: 'profile not found' });
		res.status(500).send('server error');
	}
});

// @route    DELETE api/profile
// @desc     delete profile, user and submissions
// @access   Private

router.delete('/', auth, async (req, res) => {
	const id = req.user.id;
	try {
		// @todo - remove users submissions

		// remove profile
		await Profile.findByIdAndDelete(id);
		// remove user
		await User.findByIdAndDelete(id);
		res.json({ msg: 'user deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

// what if we wanted to make sure that part of their profile was filled out? like political party
// router.post('/', [
//   // add our first custom middlewaare
//   auth,
//   [
//     // then add express validation middleware (note this in a nested array, in an array for the middleware)
//     check('politicalParty', 'political affiliation is required')
//     .not()
//     .isEmpty()
//   ]
// ],
// async (req, res) => {
//   const errors = validationResult(req);
//   if(!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array })
//   }
// })

// @route    PUT api/profile/experience
// @desc     adding profile 'experience' **not included in my app, but an option for adding experience with dates for other app ideas**
// @access   Private
// @note		 **!! NOT tested !!**

// need validation, because some of the fields will be required, so we'll need express validator
// and we add validation to the middleware, changing just 'auth' to be an array with auth and the validation
// router.put('/experience', [auth, [
// 	check('title', 'title is required').not().isEmpty(),
// 	check('company', 'company is required').not().isEmpty(),
// 	check('from', 'from date is required').not().isEmpty()
// ]], async (req, res) => {
// 	const errors = validationResult(req);
// 	if(!errors.isEmpty()) {
// 		return res.status(400).json({ errors: errors.array() });
// 	}
// 	// destructure given data
// const {
// 	title,
// 	company,
// 	location,
// 	from,
// 	to,
// 	current,
// 	description } = req.body;

// 	const newExp ={
// 		title,
// 		company,
// 		location,
// 		from,
// 		to,
// 		current,
// 		description
// 	};

// 	try {
// 		const profile = await Profile.findById(req.user.id);
// 		profile.experience.unshift(newExp);
// 		await profile.save();
// 		res.json(profile);
// 	} catch (err) {
// 		console.error(err.message).res.status(500).send('server error')
// 	}
//  }
// )

// @route    DELETE api/profile/experience/:exp_id
// @desc     deleting profile 'experience' **not included in my app, but an option for deleting experience with dates for other app ideas**
// @access   Private
// @note		 **!! NOT tested !!**

// router.delete('/experience/:exp_id', auth, async (req, res) => {
// 	try {
// 		const profile = await Profile.findById(req.user.id);
// 		// get remove index
// 		const removeIdx = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
// 		profile.experience.splice(removeIdx, 1);
// 		await profile.save();
// 		res.json(profile);
// 	} catch (err) {
// 		console.error(err.message)
// 	}

// })
// @route    GET api/profile/github/:username
// @desc     get user repos from github
// @access   Public
// @note		 **!! NOT tested !!**

router.get('/github/:username', async (req, res) => {
	try {
		// construct options object
		const uri = encodeURI(`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`);
		const headers = {
			'user-agent'  : 'node.js',
			Authorization : `token ${config.gitHubAccessToken}`
		};

		const gitHubResponse = await axios.get(uri, { headers });
		return res.json(gitHubResponse.data);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

module.exports = router;
