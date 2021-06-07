const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

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

module.exports = router;
